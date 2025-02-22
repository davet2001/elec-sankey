import {
  CSSResultGroup,
  LitElement,
  TemplateResult,
  css,
  html,
  nothing,
  svg,
} from "lit";

import { mdiTransmissionTower, mdiHelpRhombus } from "@mdi/js";
import { customElement, property } from "lit/decorators.js";

/**
 * Notes on graphical layout:
 *
 * The diagram contains elements that are fixed aspect ratio on the left,
 * and variable aspect ratio on the right. This is because the split of
 * renewables into two directions doesn't tend to stretch well and still
 * look good.
 *
 * The right side of the diagram shows the rates fanning out to consumers,
 * and this is much more easy to stretch. Changing the aspec ratio does not
 * adversely affect the diagram.
 *
 * The overall SVG is designed to fit within a bounding box, of 500px less
 * two 16px margins. Some experimentation with the value of
 * SVG_LHS_VISIBLE_WIDTH is needed to get the best fit.
 *
 * With the SVG_LHS_VISIBLE_WIDTH set, a scaling factor is automatically
 * calculated, and all other graphical elements are scaled by this factor.
 *
 * All other items in the diagram are an arbitrary scale, which is
 * multiplied by the scaling factor.
 *
 */

const TERMINATOR_BLOCK_LENGTH = 50;
const GENERATION_FAN_OUT_HORIZONTAL_GAP = 80;
const CONSUMERS_FAN_OUT_VERTICAL_GAP = 90;
const CONSUMER_LABEL_HEIGHT = 50;
const TARGET_SCALED_TRUNK_WIDTH = 90;
const PAD_MULTIPLIER = 1.0;

const GEN_COLOR = "#0d6a04";
const GRID_IN_COLOR = "#920e83";
const BATT_OUT_COLOR = "#01f4fc";

// The below two lengths must add up to 100.
const CONSUMER_BLEND_LENGTH = 80;
const CONSUMER_BLEND_LENGTH_PRE_FAN_OUT = 20;

const GRID_BLEND_LENGTH = 30;
const BATTERY_BLEND_LENGTH = 30;

const ARROW_HEAD_LENGTH = 10;
const TEXT_PADDING = 8;
const FONT_SIZE_PX = 16;
const ICON_SIZE_PX = 24;

const GEN_ORIGIN_X = 150;

const SVG_LHS_VISIBLE_WIDTH = 110;

export const PAD_ANTIALIAS = 0.5;

export interface ElecRoute {
  id?: string;
  text?: string;
  rate: number;
  icon?: string;
}

export interface ElecRoutePair {
  in: ElecRoute;
  out: ElecRoute;
}

function debugPoint(x: number, y: number, label: string): TemplateResult {
  return svg`
    <circle cx="${x}" cy="${y}" r="3" fill="#22DDDD" />
    <text x="${x - 13}" y="${y - 6}" font-size="10px">${label}</text>
`;
}

// Color mixing from here: https://stackoverflow.com/a/76752232
function hex2dec(hex: string) {
  const matched = hex.replace("#", "").match(/.{2}/g);
  if (!matched) throw new Error("Invalid hex string");
  return matched.map((n) => parseInt(n, 16));
}

function rgb2hex(r: number, g: number, b: number) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  r = Math.min(r, 255);
  g = Math.min(g, 255);
  b = Math.min(b, 255);
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

export function mixHexes(hex1: string, hex2: string, ratio: number = 0.5) {
  if (ratio > 1 || ratio < 0) {
    throw new Error("Invalid ratio: " + ratio);
  }
  const [r1, g1, b1] = hex2dec(hex1);
  const [r2, g2, b2] = hex2dec(hex2);
  const r = Math.round(r1 * ratio + r2 * (1 - ratio));
  const g = Math.round(g1 * ratio + g2 * (1 - ratio));
  const b = Math.round(b1 * ratio + b2 * (1 - ratio));
  return rgb2hex(r, g, b);
}
// End of color mixing code from SO.

export function mix3Hexes(
  hex1: string,
  hex2: string,
  hex3: string,
  ratio1: number,
  ratio2: number,
  ratio3: number
) {
  [ratio1, ratio2, ratio3].forEach((ratio) => {
    if (ratio > 1.0 || ratio < 0) {
      throw new Error("Invalid ratio: " + ratio);
    }
  });
  const [r1, g1, b1] = hex2dec(hex1);
  const [r2, g2, b2] = hex2dec(hex2);
  const [r3, g3, b3] = hex2dec(hex3);
  const r = Math.round(r1 * ratio1 + r2 * ratio2 + r3 * ratio3);
  const g = Math.round(g1 * ratio1 + g2 * ratio2 + g3 * ratio3);
  const b = Math.round(b1 * ratio1 + b2 * ratio2 + b3 * ratio3);
  return rgb2hex(r, g, b);
}

/**
 * Calculates the intersection point of two lines defined by their endpoints.
 * i.e. if the lines are defined by
 * (x1, y1) -> (x2, y2) and (x3, y3) -> (x4, y4),
 * As long as the two lines are not parallel, the function will return the
 * extrapolated intersection point of where the line x1,y1 -> x2,y2 intersects
 * the line x3,y3 -> x4,y4.
 */
function line_intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Based on https://stackoverflow.com/a/38977789

  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom === 0) {
    // eslint-disable-next-line no-console
    console.warn("Warning: Lines do not intersect.");
    return null;
  }
  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);
  const seg1 = ua >= 0 && ua <= 1;
  const seg2 = ub >= 0 && ub <= 1;
  return [x, y, seg1, seg2];
}

/**
 * Draws a flow based on the corners of the start and end.
 * Rather than draw a curve between two points, this function takes the
 * corners of a large stripe between two end lines, and constructs a 4-corner
 * bezier shape to join them. This is useful for creating a flow map where
 * there are significant changes in direction but we don't want curves to
 * overlap.
 * An extreme fan-out a spread out list could result in significant overlap
 * if this were to be constructed with curves of constant width.
 */
function renderFlowByCorners(
  startLX: number,
  startLY: number,
  startRX: number,
  startRY: number,
  endLX: number,
  endLY: number,
  endRX: number,
  endRY: number,
  classname: string = "",
  color: string | null = null
): TemplateResult {
  // Don't attempt to draw curves for very narrow lines
  if (
    Math.sqrt((startLX - startLY) ** 2 + (startRX - startRY) ** 2) < 1 ||
    Math.sqrt((endLX - endLY) ** 2 + (endRX - endRY) ** 2) < 1
  ) {
    return svg``;
  }

  // Find points to make a line along the the half way fold
  // between the start and the end ('Mirror' line).
  const pointAX = (startLX + endLX) / 2;
  const pointAY = (startLY + endLY) / 2;
  const pointBX = (startRX + endRX) / 2;
  const pointBY = (startRY + endRY) / 2;
  // The bezier points are defined by the intersection between:
  // - the lines perpendicular to the ends
  // - the mirror line.
  const ret1 = line_intersect(
    startLX,
    startLY,
    startLX - (startRY - startLY),
    startLY - (startLX - startRX),
    pointAX,
    pointAY,
    pointBX,
    pointBY
  );
  const ret2 = line_intersect(
    endLX,
    endLY,
    endLX + (endRY - endLY),
    endLY + (endLX - endRX),
    pointAX,
    pointAY,
    pointBX,
    pointBY
  );

  const ret3 = line_intersect(
    endRX,
    endRY,
    endRX + (endRY - endLY),
    endRY + (endLX - endRX),
    pointAX,
    pointAY,
    pointBX,
    pointBY
  );
  const ret4 = line_intersect(
    startRX,
    startRY,
    startRX - (startRY - startLY),
    startRY - (startLX - startRX),
    pointAX,
    pointAY,
    pointBX,
    pointBY
  );
  if (ret1 == null || ret2 == null || ret3 == null || ret4 == null) {
    // eslint-disable-next-line no-console
    console.warn("Warning: render flow failed.");
    return svg``;
  }
  const [bezierStartLX, bezierStartLY, ,] = ret1;
  const [bezierEndLX, bezierEndLY, ,] = ret2;
  const [bezierEndRX, bezierEndRY, ,] = ret3;
  const [bezierStartRX, bezierStartRY, ,] = ret4;
  const fillspec = color ? "fill:" + color : "";
  const svg_ret = svg`
  <path
      class="flow ${classname}"
      d="M ${startLX},${startLY}
      C ${bezierStartLX},${bezierStartLY} ${bezierEndLX},${bezierEndLY} ${endLX},${endLY}
      L ${endRX},${endRY}
      C ${bezierEndRX},${bezierEndRY} ${bezierStartRX},${bezierStartRY} ${startRX},${startRY} Z"
      style="${fillspec}"
  />
`;
  return svg_ret;
}

function renderRect(
  x: number,
  y: number,
  width: number,
  height: number,
  classname: string,
  color: string | null = null
): TemplateResult {
  return svg`
  <rect
  class=${classname}
  x="${x}"
  y="${y}"
  height="${height}"
  width="${width}"
  {color ? style="fill:${color};fill-opacity:1" : ""}
  />`;
}

/**
 * Generic render for rects where flow blends from one colour to another.
 */
function renderBlendRect(
  startLX: number,
  startLY: number,
  startRX: number,
  startRY: number,
  endLX: number,
  endLY: number,
  endRX: number,
  endRY: number,
  startColor: string,
  endColor: string,
  id: string
): TemplateResult | symbol {
  if (
    !(
      (startLX == startRX && endLX == endRX) ||
      (startLY == startRY && endLY == endRY)
    )
  ) {
    console.error(
      "Unsupported blend flow dimensions - only horiz/vert are implemented."
    );
    return nothing;
  }
  const horizontal: boolean = startLX == startRX;
  let height, width;
  let x1, y1, x2, y2;
  if (horizontal) {
    height = Math.abs(startLY - startRY);
    width = Math.abs(startLX - endLX);
    y1 = "0%";
    y2 = "0%";
    x1 = startLX < endLX ? "0%" : "100%"; // Left to right.
    x2 = startLX < endLX ? "100%" : "0%"; // Rigth to left.
  } else {
    height = Math.abs(startLY - endLY);
    width = Math.abs(startLX - startRX);
    x1 = "0%";
    x2 = "0%";
    y1 = startLY < endLY ? "0%" : "100%"; // Top to bottom.
    y2 = startLY < endLY ? "100%" : "0%"; // Bottom to top.
  }
  const topLeftX = Math.min(startLX, startRX, endLX, endRX);
  const topLeftY = Math.min(startLY, startRY, endLY, endRY);
  const svgRet = svg`
    <defs>
      <linearGradient id="${id}_grad" x1=${x1} y1=${y1} x2=${x2} y2=${y2}>
        <stop offset="0%" style="stop-color:${startColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${endColor};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect
      id="${id}"
      x="${topLeftX}"
      y="${topLeftY}"
      height="${height}"
      width="${width}"
      fill="url(#${id}_grad)"
      style="fill-opacity:1"
    />
  `;
  return svgRet;
}

/**
 * Creates a flow map graphic showing the flow of electricity.
 *
 * In general, the aim of this class is to display a coherent and informative
 * visual representation of the flow of electricity. If a strange occurence
 * occurs, such as consumption exceeding total input power, the class should
 * attempt to display a sensible visual, including phantom sources or
 * consumers to convey a complete diagram.
 *
 * The reason for this is that the class is likely to receive asynchronous
 * updates from different sensors. It must display a glitch-free best
 * approximation of the reality until more information becomes available.
 *
 * Internally, the class deliberately avoids making reference to power or
 * energy because it can be used for either. By populating with
 * power (W) values it represents power flow. By populating with energy (kWh)
 * values it represents the energy flow over a period of time.
 * 'rate' is used as a generic variable name that can be power/energy.
 *
 * Architecture note:
 * While written for home assistant, this class deliberately makes no reference
 * to HA and is decoupled from it. It is designed to be subclassed within HA.
 *
 * The block of code below is useful when debugging the svg layouts.

* function debugPoint(x: number, y: number, label: string): TemplateResult {
 *   return svg`
 *     <circle cx="${x}" cy="${y}" r="3" fill="#22DDDD" />
 *     <text x="${x - 13}" y="${y - 6}" font-size="10px">${label}</text>
 * `;
 * }
 * ${debugPoint(x0, y0, "x0,y0")}
*  ${debugPoint(x1 - 20, y1, "x1,y1")}
*  ${debugPoint(x2 - 20, y2, "x2,y2")}
*  ${debugPoint(x10, y10, "x10,y10")}
*  ${debugPoint(x1 - 20, y5, "x1,y5")}
*  ${debugPoint(x1 - 20, y4, "x1,y4")}
*  ${debugPoint(x14, y0, "x14,y0")} ${debugPoint(x15, y0, "x15,y0")}
*  ${debugPoint(x16, y0, "x16,y0")} ${debugPoint(x10, y2, "x10,y2")}
*  ${debugPoint(x10, y11, "x10,y11")}
*  ${debugPoint(x10, y5, "x10,y5")}
*  ${debugPoint(x10, y13, "x10,y13")}
*  ${debugPoint(x17, y17, "x17,y17")}
*  ${debugPoint(x14, y17, "x14,y17")}
*  ${debugPoint(x15, y17, "x15,y17")}
*  ${debugPoint(x20, y17, "x20,y17")}
*  ${debugPoint(x21, y17, "x21,y17")}
 */

@customElement("elec-sankey")
export class ElecSankey extends LitElement {
  @property()
  public unit: string = "kWh";

  @property({ attribute: false })
  public generationInRoutes: { [id: string]: ElecRoute } = {};

  @property({ attribute: false })
  public gridInRoute?: ElecRoute;

  @property({ attribute: false })
  public gridOutRoute?: ElecRoute;

  @property({ attribute: false })
  public consumerRoutes: { [id: string]: ElecRoute } = {};

  @property({ attribute: false })
  public batteryRoutes: { [id: string]: ElecRoutePair } = {};

  @property({ attribute: false })
  public maxConsumerBranches: number = 0;

  @property({ attribute: false })
  public hideConsumersBelow: number = 0;

  private _rateToWidthMultplier: number = 0.2;

  private _phantomGridInRoute?: ElecRoute;

  private _phantomGenerationInRoute?: ElecRoute;

  private _untrackedConsumerRoute: ElecRoute = {
    id: undefined,
    text: "Untracked",
    rate: 0,
  };

  private _gridExport: number = 0;

  private _batteriesToGridRate: number = 0;

  private _batteriesToConsumersRate: number = 0;

  private _gridToBatteriesRate = 0;

  private _gridToConsumersRate = 0;

  private _generationToBatteriesRate = 0;

  private _generationToGridRate = 0;

  private _generationToConsumersRate = 0;

  private _generationTrackedTotal(): number {
    let totalGen = 0;
    for (const key in this.generationInRoutes) {
      if (Object.prototype.hasOwnProperty.call(this.generationInRoutes, key)) {
        totalGen += this.generationInRoutes[key].rate || 0;
      }
    }
    return totalGen;
  }

  private _generationPhantom(): number {
    return this._phantomGenerationInRoute
      ? this._phantomGenerationInRoute.rate
      : 0;
  }

  private _generationTotal(): number {
    return this._generationTrackedTotal() + this._generationPhantom();
  }

  private _gridImport(): number {
    if (this.gridInRoute) {
      return this.gridInRoute.rate > 0 ? this.gridInRoute.rate : 0;
    }
    return 0;
  }

  private _consumerTrackedTotal(): number {
    let total = 0;
    for (const id in this.consumerRoutes) {
      if (Object.prototype.hasOwnProperty.call(this.consumerRoutes, id)) {
        total += this.consumerRoutes[id].rate;
      }
    }
    return total;
  }

  private _batteryOutTotal(): number {
    let total = 0;
    for (const id in this.batteryRoutes) {
      if (Object.prototype.hasOwnProperty.call(this.batteryRoutes, id)) {
        total += this.batteryRoutes[id].out.rate;
      }
    }
    return total;
  }

  private _batteryInTotal(): number {
    let total = 0;
    for (const id in this.batteryRoutes) {
      if (Object.prototype.hasOwnProperty.call(this.batteryRoutes, id)) {
        total += this.batteryRoutes[id].in.rate;
      }
    }
    return total;
  }

  private _recalculate() {
    /**
     * Note that it is not 100% possible to fully determine the actual flow of
     * electrons in all secenarios.
     *
     * The goal of this strategy is to present a viable diagram given the
     * input data, with a leaning in specific directions where there is
     * uncertainty. The most complex version is for energy flow, which can
     * accumulate in both directions for certain flows (grid, batteries etc).
     * The calculation is based on energy. Power flow is a simpler case, with
     * each flow only possible to be in or out (not both), but they are both
     * calculated using the same algorithm, documented inline below.
     */
    const gridImport = this._gridImport();

    // Determine the grid import and export
    if (this.gridOutRoute) {
      this._gridExport =
        this.gridOutRoute.rate > 0 ? this.gridOutRoute.rate : 0;
    } else if (this.gridInRoute) {
      this._gridExport = this.gridInRoute.rate < 0 ? -this.gridInRoute.rate : 0;
    } else {
      this._gridExport = 0;
    }

    const generationTrackedTotal = this._generationTrackedTotal();
    const consumerTrackedTotal = this._consumerTrackedTotal();
    const batteryOutTotal = this._batteryOutTotal();
    const batteriesInTotal = this._batteryInTotal();

    // Balance the books.
    let phantomGridIn = 0;
    let phantomGeneration = 0;
    let untrackedConsumer = 0;
    let batteriesToGridTemp = 0;
    let generationToGridTemp = 0;
    let gridToBatteriesTemp = 0;
    let generationToBatteriesTemp = 0;
    let gridToConsumersTemp = 0;
    // Check if we are exporting more than we are generating plus flowing from
    // batteries.
    let x = this._gridExport - generationTrackedTotal - batteryOutTotal;
    if (x > 0) {
      // If this is the case, we create a phantom generation source
      // of sufficient value to balance thie equation, and assume that all
      // battery power is going to the grid.
      phantomGeneration = x;
      batteriesToGridTemp = batteryOutTotal;
    } else {
      // If we aren't exporting more than generating + discharging, the diagram
      // is provisionally viable without a phantom generation source.
      // *For now* we assume the maximum possible split of battery rate that
      // could go the grid is going to the grid, the rest goes to consumers.
      if (this._gridExport > batteryOutTotal) {
        batteriesToGridTemp = batteryOutTotal;
        generationToGridTemp = this._gridExport - batteryOutTotal;
      } else {
        batteriesToGridTemp = this._gridExport;
        generationToGridTemp = 0;
      }
    }
    // Whatever battery out is not going to the grid must be going to consumers.
    let batteriesToConsumersTemp = batteryOutTotal - batteriesToGridTemp;

    // We then proceed on the basis that the full flow into the battery is
    // coming from the grid (as far as the grid input allows). If there is
    // more flow coming into the batteries than the grid would allow, we
    // assume that the additional flow is coming from generation.
    if (gridImport > batteriesInTotal) {
      gridToBatteriesTemp = batteriesInTotal;
    } else {
      gridToBatteriesTemp = gridImport;
      generationToBatteriesTemp = batteriesInTotal - gridToBatteriesTemp;
    }
    // If we have exceeded the total generation by doing this, we must
    // recalculate the phantom generation source.
    x =
      this._gridExport +
      generationToBatteriesTemp -
      (generationTrackedTotal + gridToBatteriesTemp);
    if (x > 0) {
      phantomGeneration = x;
    }

    // All grid input that is not going to batteries must be going to
    // consumers, so we calculate that next.
    gridToConsumersTemp = gridImport - gridToBatteriesTemp;

    // Now that we have generation to grid & generation to batteries, the
    // remaining generation must be going to consumers, so we calculate that.
    let generationToConsumersTemp =
      generationTrackedTotal - generationToGridTemp - generationToBatteriesTemp;

    // Clip negative values.
    if (generationToConsumersTemp < 0) {
      generationToConsumersTemp = 0;
    }
    // If the generation to (grid + batteries + consumers) is more than
    // the total generation, we need to recalulate the phantom generation
    // source.
    x =
      generationToGridTemp +
      generationToBatteriesTemp +
      generationToConsumersTemp -
      generationTrackedTotal;
    if (x > 0) {
      phantomGeneration = x;
    }

    // The three items add together to give the consumer total.
    let consumerTotalA =
      generationToConsumersTemp +
      gridToConsumersTemp +
      batteriesToConsumersTemp;

    // Do we have an excess of consumption?
    x = consumerTrackedTotal - consumerTotalA;
    if (x > 0) {
      // There is an unknown energy source.
      if (this.gridInRoute === undefined && this.gridOutRoute === undefined) {
        // If we aren't tracking grid sources, create a phantom one.
        phantomGridIn = x;
        gridToConsumersTemp = x;
        consumerTotalA =
          generationToConsumersTemp +
          gridToConsumersTemp +
          batteriesToConsumersTemp;
      }
    }

    // If the generation to (grid + batteries + consumers) is more than
    // the total generation, we need to recalulate the phantom generation
    // source again
    x =
      generationToGridTemp +
      generationToBatteriesTemp +
      generationToConsumersTemp -
      generationTrackedTotal;
    if (x > 0) {
      phantomGeneration = x;
      // generationToConsumersTemp =
      //   generationTrackedTotal +
      //   phantomGeneration -
      //   (generationToGridTemp + generationToBatteriesTemp);
    }

    consumerTotalA =
      generationToConsumersTemp +
      gridToConsumersTemp +
      batteriesToConsumersTemp;

    // If we are still sending more to consumers than we are tracking, we must
    // have untracked consumers (which will almost always be the case).
    x = consumerTotalA - consumerTrackedTotal;
    if (x > 0) {
      // In this case, calculate the size of the untracked consumer.
      untrackedConsumer = x;
    } else {
      // Conversely, if we are consuming more than we are sending to consumers,
      // we have not balanced the books - there must be more generation, so add
      // add to the generationToConsumers flow path.
      generationToConsumersTemp += -x;
      // ... and recalculate the phantom generation.
      phantomGeneration =
        generationToConsumersTemp +
        generationToBatteriesTemp +
        generationToGridTemp -
        generationTrackedTotal;
    }

    this._phantomGridInRoute =
      phantomGridIn > 0
        ? {
            text: "Unknown source",
            icon: mdiHelpRhombus,
            rate: phantomGridIn,
          }
        : undefined;
    this._phantomGenerationInRoute =
      phantomGeneration > 0
        ? {
            text: "Unknown source",
            icon: mdiHelpRhombus,
            rate: phantomGeneration,
          }
        : undefined;
    if (untrackedConsumer > 0) {
      this._untrackedConsumerRoute = {
        id: "untracked",
        text: "Untracked",
        rate: untrackedConsumer,
      };
    }

    /**
     * Calculate and update a scaling factor to make the UI look sensible.
     * Since there is no limit to the value of input/output rates, the scaling
     * needs to be dynamic. This function calculates the scaling factor based
     * on a sensible maximum 'trunk' width.
     */
    const genTotal = generationTrackedTotal + phantomGeneration;
    const gridInTotal =
      gridImport +
      (this._phantomGridInRoute ? this._phantomGridInRoute.rate : 0);
    const consumerTotal =
      consumerTrackedTotal +
      (this._untrackedConsumerRoute ? this._untrackedConsumerRoute.rate : 0);

    this._batteriesToGridRate = batteriesToGridTemp;
    this._batteriesToConsumersRate = batteriesToConsumersTemp;

    this._generationToConsumersRate = generationToConsumersTemp;
    this._generationToBatteriesRate = generationToBatteriesTemp;
    this._generationToGridRate = generationToGridTemp;

    this._gridToBatteriesRate = gridToBatteriesTemp;
    this._gridToConsumersRate = gridToConsumersTemp;

    const widest_trunk = Math.max(genTotal, gridInTotal, consumerTotal, 1.0);
    this._rateToWidthMultplier = TARGET_SCALED_TRUNK_WIDTH / widest_trunk;
  }

  private _rateToWidth(rate: number): number {
    const value = rate * this._rateToWidthMultplier;
    return value > 1 ? value : 1;
  }

  private _generationInFlowWidth(): number {
    const total = this._generationTrackedTotal() + this._generationPhantom();
    if (total === 0) {
      return 0;
    }
    return this._rateToWidth(total);
  }

  private _generationToConsumersFlowWidth(): number {
    if (
      this._generationToConsumersRate == 0 &&
      !this.generationInRoutes.length
    ) {
      return 0;
    }
    const rate = this._generationToConsumersRate;
    return rate ? this._rateToWidth(rate) : 0;
  }

  private _generationToGridFlowWidth(): number {
    const rate = this._generationToGridRate;
    return rate ? this._rateToWidth(rate) : 0;
  }

  private _gridOutFlowWidth(): number {
    if (this.gridOutRoute === undefined) {
      return 0;
    }
    if (this.gridOutRoute.rate > 0) {
      return this._rateToWidth(this.gridOutRoute.rate);
    }
  }

  private _gridToConsumersFlowWidth(): number {
    const rate = this._gridToConsumersRate;
    return rate ? this._rateToWidth(rate) : 0;
  }

  private _batteriesToGridFlowWidth(): number {
    const rate = this._batteriesToGridRate;
    return rate ? this._rateToWidth(rate) : 0;
  }

  private _batteryToConsumersFlowWidth(): number {
    const rate = this._batteriesToConsumersRate;
    return rate ? this._rateToWidth(rate) : 0;
  }

  private _generationToBatteryFlowWidth(): number {
    const rate = this._generationToBatteriesRate;
    return rate ? this._rateToWidth(rate) : 0;
  }

  private _gridToBatteriesFlowWidth(): number {
    const rate = this._gridToBatteriesRate;
    return rate ? this._rateToWidth(rate) : 0;
  }

  private _consumersFanOutTotalHeight(): number {
    let totalHeight = 0;
    let count = 0;
    for (const id in this.consumerRoutes) {
      if (Object.prototype.hasOwnProperty.call(this.consumerRoutes, id)) {
        totalHeight += this._rateToWidth(this.consumerRoutes[id].rate);
        count++;
      }
    }
    if (this.maxConsumerBranches !== 0) {
      if (count > this.maxConsumerBranches - 2) {
        count = this.maxConsumerBranches - 2;
      }
    }

    const untracked = this._untrackedConsumerRoute.rate;
    totalHeight += this._rateToWidth(untracked);
    count++;

    if (count > 0) {
      totalHeight += (count - 1) * CONSUMERS_FAN_OUT_VERTICAL_GAP;
    }
    return totalHeight;
  }

  private _genColor(): string {
    const computedStyles = getComputedStyle(this);
    const ret = computedStyles.getPropertyValue("--generation-color").trim();
    return ret || GEN_COLOR;
  }

  private _gridColor(): string {
    const computedStyles = getComputedStyle(this);
    const ret = computedStyles.getPropertyValue("--grid-in-color").trim();
    return ret || GRID_IN_COLOR;
  }

  private _battColor(): string {
    const computedStyles = getComputedStyle(this);
    const ret = computedStyles.getPropertyValue("--batt-out-color").trim();
    return ret || BATT_OUT_COLOR;
  }

  protected _generateLabelDiv(
    _id: string | undefined,
    icon: string | undefined,
    _name: string | undefined,
    valueA: number,
    valueB: number | undefined = undefined
  ): TemplateResult {
    const valueARounded = Math.round(valueA * 10) / 10;
    const valueBRounded = valueB ? Math.round(valueB * 10) / 10 : undefined;

    return html`
      <div class="label">
        <svg x="0" y="0" height=${ICON_SIZE_PX}>
          <path d=${icon} />
        </svg>
        <br />
        ${valueBRounded
          ? html`
              OUT ${valueBRounded} ${this.unit}<br />
              IN ${valueARounded} ${this.unit}
            `
          : html` ${_name}<br />${valueARounded} ${this.unit} `}
      </div>
    `;
  }

  protected _generationToConsumersRadius(): number {
    return 50 + this._generationToConsumersFlowWidth();
  }

  protected renderGenerationToConsumersFlow(
    x0: number,
    y0: number,
    x15: number,
    x16: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    svgScaleX: number = 1
  ): [TemplateResult[] | symbol[], TemplateResult | symbol] {
    const totalGenWidth = this._generationInFlowWidth();
    const genToConsWidth = this._generationToConsumersFlowWidth();

    if (genToConsWidth === 0 && !Object.keys(this.generationInRoutes)) {
      return [[nothing], nothing];
    }
    const count =
      Object.keys(this.generationInRoutes).length +
      (this._phantomGenerationInRoute !== undefined ? 1 : 0);
    const fanOutWidth =
      totalGenWidth + (count - 1) * GENERATION_FAN_OUT_HORIZONTAL_GAP;
    let xA = x0 + totalGenWidth / 2 - fanOutWidth / 2;
    let xB = x0;
    const svgArray: TemplateResult[] = [];
    const divArray: TemplateResult[] = [];

    const startTerminatorY = 0;
    let phantomRate = 0;
    const routes = structuredClone(this.generationInRoutes);
    if (this._phantomGenerationInRoute !== undefined) {
      routes.phantom = this._phantomGenerationInRoute;
      phantomRate = this._phantomGenerationInRoute.rate;
    }
    let i = 0;
    // eslint-disable-next-line guard-for-in
    for (const key in routes) {
      if (Object.prototype.hasOwnProperty.call(routes, key)) {
        // const friendlyName = routes.text;
        let width = 0;
        const rate = routes[key].rate || 0; // Handle undefined (NaN) rates.
        // Most of the time, if the rate is zero, we don't want to draw it.
        // Exception is if we have a >0 phantom source.
        if (rate || phantomRate > 0) {
          width = this._rateToWidth(rate);
          svgArray.push(
            renderFlowByCorners(
              xA + width,
              startTerminatorY,
              xA,
              startTerminatorY,
              xB + width,
              startTerminatorY + TERMINATOR_BLOCK_LENGTH,
              xB,
              startTerminatorY + TERMINATOR_BLOCK_LENGTH,
              "generation"
            )
          );
          svgArray.push(
            svg`
            <polygon points="${xA + width},${startTerminatorY}
            ${xA},${startTerminatorY},
            ${xA + width / 2},${startTerminatorY + ARROW_HEAD_LENGTH}"
            class="tint"/>
          `
          );
        }

        const midX = xA + width / 2;
        const LABEL_WIDTH = 72;
        const icon = routes[key].icon;
        const id = routes[key].id || undefined;
        if (icon) {
          divArray.push(
            html`<div
              class="label elecroute-label-horiz"
              style="left: ${midX * svgScaleX -
              (i * LABEL_WIDTH) /
                2}px; flex-basis: ${LABEL_WIDTH}px; margin: 0 0 0 ${-LABEL_WIDTH /
              2}px;"
            >
              ${this._generateLabelDiv(id, icon, undefined, rate)}
            </div>`
          );
        }
        xA += width + GENERATION_FAN_OUT_HORIZONTAL_GAP;
        xB += width;
      }
      i++;
    }

    const generatedFlowPath2 =
      genToConsWidth > 0
        ? renderFlowByCorners(
            x16,
            y0 - PAD_ANTIALIAS,
            x15,
            y0 - PAD_ANTIALIAS,
            x1,
            y1,
            x1,
            y2,
            "generation"
          )
        : svg``;
    const svgRet = svg`
    ${svgArray}
    ${generatedFlowPath2}
    `;
    return [divArray, svgRet];
  }

  protected renderGenerationToGridFlow(
    x0: number,
    y0: number,
    x11: number,
    y10: number,
    svgScaleX: number
  ): TemplateResult {
    const arrow_head_length = ARROW_HEAD_LENGTH / svgScaleX;
    const width = this._generationToGridFlowWidth();
    if (width === 0) {
      return svg``;
    }
    const generatedFlowPath = renderFlowByCorners(
      x0 + width,
      y0,
      x0,
      y0,
      x11,
      y10 + width,
      x11,
      y10,
      "generation"
    );

    return svg`
    ${generatedFlowPath}
    ${renderRect(
      arrow_head_length,
      y10,
      x11 - arrow_head_length,
      width,
      "generation"
    )}
  `;
  }

  protected renderGridOutFlowArrow(
    x10: number,
    y10: number,
    y2: number,
    svgScaleX: number,
    color: string
  ): TemplateResult | symbol {
    const arrow_head_length = ARROW_HEAD_LENGTH / svgScaleX;
    if (this._gridOutFlowWidth() === 0) {
      return nothing;
    }
    return svg`
    <polygon
      class="grid"
      points="${x10},${y10}
      ${x10},${y2}
      ${x10 - arrow_head_length},${(y10 + y2) / 2}"
      {color ? style="fill:${color};fill-opacity:1" : ""}
    />
  `;
  }

  protected renderGenerationToBatteriesFlow(
    x14: number,
    x15: number,
    y0: number,
    y17: number
  ): TemplateResult | symbol {
    if (this._generationToBatteryFlowWidth() === 0) {
      return nothing;
    }

    return svg`
    <rect
      class="generation"
      x="${x14}"
      y="${y0}"
      height="${y17 - y0}"
      width="${x15 - x14}"
    />
    `;
  }

  protected renderGridInFlow(
    y2: number,
    y5: number,
    y13: number,
    x10: number,
    y10: number,
    svgScaleX: number = 1
  ): [TemplateResult | symbol, TemplateResult | symbol] {
    if (!this.gridInRoute) {
      return [nothing, nothing];
    }
    const arrow_head_length = ARROW_HEAD_LENGTH / svgScaleX;
    const in_width = y13 - y2;

    const rateA = this._gridImport();
    const rateB = this._gridExport;

    const midY = (y10 + y13) / 2;
    const divHeight = ICON_SIZE_PX + TEXT_PADDING + FONT_SIZE_PX * 2;
    const divRet = html`<div
      width=${ICON_SIZE_PX * 2}
      class="label elecroute-label-grid"
      style="left: 0px; height:${divHeight}px;
      top: ${midY * svgScaleX}px; margin: ${-divHeight / 2}px 0 0 0px;"
    >
      ${this._generateLabelDiv(
        this.gridInRoute.id,
        mdiTransmissionTower,
        undefined,
        rateA,
        rateB
      )}
    </div>`;

    const svgRet = svg`
    <rect
      class="grid"
      id="grid-in-rect"
      x="${0}"
      y="${y2}"
      height="${in_width}"
      width="${arrow_head_length}"
    />
    <polygon points="${0},${y2}
    ${0},${y2 + in_width}
    ${arrow_head_length},${y2 + in_width / 2}"
    class="tint"/>
  `;
    return [divRet, svgRet];
  }

  protected renderGridToConsumersFlow(
    x10: number,
    y2: number,
    y5: number,
    x1: number
  ): TemplateResult | symbol {
    if (this._gridToConsumersFlowWidth() === 0) {
      return nothing;
    }
    return svg`
    <rect
      class="grid"
      id="grid-to-cons-rect"
      x="${x10}"
      y="${y2}"
      height="${y5 - y2}"
      width="${x1 - x10}"
    />`;
  }

  protected renderGridToBatteriesFlow(
    x10: number,
    y5: number,
    y13: number,
    x17: number,
    y17: number,
    x14: number
  ): TemplateResult | symbol {
    if (this._gridToBatteriesFlowWidth() === 0) {
      return nothing;
    }
    return renderFlowByCorners(x10, y5, x10, y13, x14, y17, x17, y17, "grid");
  }

  protected renderBatteriesToConsumersFlow(
    x1: number,
    y5: number,
    y4: number,
    x20: number,
    x21: number,
    y17: number
  ): TemplateResult | symbol {
    if (this._batteryToConsumersFlowWidth() === 0) {
      return nothing;
    }
    return renderFlowByCorners(x20, y17, x21, y17, x1, y5, x1, y4, "battery");
  }

  protected renderBatteriesToGridFlow(
    x15: number,
    y17: number,
    x20: number,
    x11: number,
    y2: number,
    y11: number
  ): TemplateResult | symbol {
    if (this._gridToBatteriesFlowWidth() === 0) {
      return nothing;
    }
    return renderFlowByCorners(
      x15,
      y17,
      x20,
      y17,
      x11,
      y2,
      x11,
      y11,
      "battery"
    );
  }

  protected renderGenToGridBlendFlow(
    x10: number,
    y10: number,
    x11: number,
    y11: number,
    endColor: string
  ): TemplateResult | symbol {
    if (!this._generationToGridFlowWidth()) {
      return nothing;
    }
    return renderBlendRect(
      x11,
      y11,
      x11,
      y10,
      x10,
      y11,
      x10,
      y10,
      this._genColor(),
      endColor,
      "gen-grid-in-blend-rect"
    );
  }

  protected renderBatteriesToGridBlendFlow(
    x10: number,
    y11: number,
    x11: number,
    y2: number,
    endColor: string
  ): TemplateResult | symbol {
    if (!this._batteriesToGridFlowWidth()) {
      return nothing;
    }
    return renderBlendRect(
      x11,
      y2,
      x11,
      y11,
      x10,
      y2,
      x10,
      y11,
      this._battColor(),
      endColor,
      "batt-grid-in-blend-rect"
    );
  }
  protected renderGenInBlendFlow(
    y1: number,
    y2: number,
    endColor: string
  ): TemplateResult | symbol {
    if (!this._generationToConsumersFlowWidth()) {
      return nothing;
    }
    return renderBlendRect(
      0,
      y1,
      0,
      y2,
      CONSUMER_BLEND_LENGTH + 1,
      y1,
      CONSUMER_BLEND_LENGTH + 1,
      y2,
      this._genColor(),
      endColor,
      "gen-in-blend-rect"
    );
  }

  protected renderGridInBlendFlow(
    y2: number,
    y5: number,
    endColor: string
  ): TemplateResult | symbol {
    return renderBlendRect(
      0,
      y2,
      0,
      y5,
      CONSUMER_BLEND_LENGTH + 1,
      y2,
      CONSUMER_BLEND_LENGTH + 1,
      y5,
      this._gridColor(),
      endColor,
      "grid-in-blend-rect"
    );
  }

  protected renderBatteriesToConsumersBlendFlow(
    y5: number,
    y4: number,
    endColor: string
  ): TemplateResult | symbol {
    if (this._batteryToConsumersFlowWidth() === 0) {
      return nothing;
    }

    return renderBlendRect(
      0,
      y5,
      0,
      y4,
      CONSUMER_BLEND_LENGTH + 1,
      y5,
      CONSUMER_BLEND_LENGTH + 1,
      y4,
      this._battColor(),
      endColor,
      "batt-in-blend-rect"
    );
  }

  protected _renderBlendedFlowPreFanOut(
    y1: number,
    y4: number,
    color: string
  ): TemplateResult {
    const svgRet = svg`
    <rect
      id="blended-flow-pre-fan-out-rect"
      x=${CONSUMER_BLEND_LENGTH}
      y="${y1}"
      height="${y4 - y1}"
      width="${CONSUMER_BLEND_LENGTH_PRE_FAN_OUT + 1}"
      style="fill:${color};fill-opacity:1"
    />
  `;
    return svgRet;
  }

  protected _insertExtras(
    _topLeftX: number,
    _topLeftY: number,
    _width: number,
    _color: string,
    _route: ElecRoute
  ): [number, TemplateResult] {
    return [0, svg``];
  }

  protected _renderConsumerFlow(
    topLeftX: number,
    topLeftY: number,
    topRightX: number,
    topRightY: number,
    consumer: ElecRoute,
    color: string,
    svgScaleX: number = 1,
    count: number = 1
  ): [TemplateResult, TemplateResult, number, number] {
    const width = this._rateToWidth(consumer.rate);
    const xEnd = topRightX;
    const yEnd = topRightY + width / 2;
    const svgFlow = renderFlowByCorners(
      topLeftX,
      topLeftY,
      topLeftX,
      topLeftY + width,
      topRightX + PAD_ANTIALIAS,
      topRightY,
      topRightX + PAD_ANTIALIAS,
      topRightY + width,
      "consumer",
      color
    );
    const [extrasLength, svgExtras] = this._insertExtras(
      topRightX,
      topRightY,
      width,
      color,
      consumer
    );

    const divHeight = CONSUMER_LABEL_HEIGHT;
    const divRet = html`<div
      class="label elecroute-label-consumer"
      style="height:${divHeight}px;
      top: ${yEnd - (count * divHeight) / 2}px; margin: ${-divHeight /
      2}px 0 0 0;"
    >
      ${this._generateLabelDiv(
        consumer.id,
        undefined,
        consumer.text,
        consumer.rate
      )}
    </div>`;

    const svgRet = svg`
      ${svgFlow}
      ${svgExtras}
      <polygon points="${xEnd + extrasLength},${yEnd - width / 2}
        ${xEnd + extrasLength},${yEnd + width / 2}
        ${xEnd + extrasLength + ARROW_HEAD_LENGTH},${yEnd}"
        style="fill:${color}" />
    `;

    const bottomLeftY = topLeftY + (consumer.rate !== 0 ? width : 0);
    const bottomRightY = topRightY + width;
    return [divRet, svgRet, bottomLeftY, bottomRightY];
  }

  private _getGroupedConsumerRoutes(): { [id: string]: ElecRoute } {
    let consumerRoutes: { [id: string]: ElecRoute } = {};
    consumerRoutes = structuredClone(this.consumerRoutes);

    let groupedConsumer: ElecRoute = {
      id: "other",
      text: "Other",
      rate: 0,
    };
    let groupedConsumerExists = false;

    if (this.hideConsumersBelow > 0) {
      for (const key in consumerRoutes) {
        if (consumerRoutes[key].rate < this.hideConsumersBelow) {
          groupedConsumer.rate += consumerRoutes[key].rate;
          groupedConsumerExists = true;
          delete consumerRoutes[key];
        }
      }
    }

    if (this.maxConsumerBranches !== 0) {
      const numConsumerRoutes = Object.keys(consumerRoutes).length;
      if (numConsumerRoutes > this.maxConsumerBranches - 1) {
        let otherCount = numConsumerRoutes + 2 - this.maxConsumerBranches;
        consumerRoutes = this.consumerRoutes;
        const sortedConsumerRoutes: ElecRoute[] = Object.values(
          this.consumerRoutes
        ).sort((a, b) => a.rate - b.rate);
        sortedConsumerRoutes.forEach((route) => {
          if (otherCount > 0) {
            groupedConsumer.rate += route.rate;
            groupedConsumerExists = true;
            if (route.id) {
              delete consumerRoutes[route.id];
            }
            otherCount--;
          }
        });
      }
    }
    if (groupedConsumerExists) {
      consumerRoutes[groupedConsumer.id!] = groupedConsumer;
    }
    return consumerRoutes;
  }

  protected _renderConsumerFlows(
    y1: number,
    y5: number,
    color: string,
    svgScaleX: number
  ): [Array<TemplateResult>, Array<TemplateResult>, number] {
    const divRetArray: Array<TemplateResult> = [];
    const svgRetArray: Array<TemplateResult> = [];
    const xLeft = 0;
    const xRight = 100 - ARROW_HEAD_LENGTH;
    let i = 0;
    const total_height = this._consumersFanOutTotalHeight();
    const gap = CONSUMERS_FAN_OUT_VERTICAL_GAP / svgScaleX;
    let yLeft = y1;
    let yRight = (y1 + y5) / 2 - total_height / 2;
    if (yRight < TEXT_PADDING) {
      yRight = TEXT_PADDING;
    }
    let svgRow: TemplateResult;
    let divRow: TemplateResult;

    const consumerRoutes = this._getGroupedConsumerRoutes();

    for (const key in consumerRoutes) {
      if (Object.prototype.hasOwnProperty.call(consumerRoutes, key)) {
        [divRow, svgRow, yLeft, yRight] = this._renderConsumerFlow(
          xLeft,
          yLeft,
          xRight,
          yRight,
          consumerRoutes[key],
          color,
          svgScaleX,
          i++
        );
        divRetArray.push(divRow);
        svgRetArray.push(svgRow);
        yRight += gap;
      }
    }

    [divRow, svgRow, yLeft, yRight] = this._renderConsumerFlow(
      xLeft,
      yLeft,
      xRight,
      yRight,
      this._untrackedConsumerRoute,
      color,
      svgScaleX,
      i++
    );
    divRetArray.push(divRow);
    svgRetArray.push(svgRow);
    yRight += gap;

    if (svgRetArray.length > 0) {
      yRight += gap;
    }
    return [divRetArray, svgRetArray, yRight];
  }

  protected renderBatteriesInOutFlow(
    x1: number,
    x17: number,
    x14: number,
    x15: number,
    x20: number,
    x21: number,
    y17: number,
    y18: number,
    svgScaleX
  ): [TemplateResult | symbol, number] {
    // Bottom layer
    const svgRetArray: Array<TemplateResult | symbol> = [];
    // Top layer
    const svgRetArray2: Array<TemplateResult | symbol> = [];

    const gap = CONSUMERS_FAN_OUT_VERTICAL_GAP / svgScaleX; // @todo if batteries aren't present, skip.
    const arrow_head_length = ARROW_HEAD_LENGTH / svgScaleX;
    // if (false * 1) {
    //   return nothing;
    // }
    const gridColor = this._gridColor();
    const genColor = this._genColor();

    const ratio = x14 - x17 < 1 ? 1 : (x14 - x17) / (x15 - x17);
    const battInBlendColor = mixHexes(gridColor, genColor, ratio);
    svgRetArray.push(
      renderBlendRect(
        x14,
        y17,
        x17,
        y17,
        x14,
        y18,
        x17,
        y18,
        gridColor,
        battInBlendColor,
        "grid-to-batt-blend"
      )
    );
    svgRetArray.push(
      renderBlendRect(
        x15,
        y17,
        x14,
        y17,
        x15,
        y18,
        x14,
        y18,
        genColor,
        battInBlendColor,
        "gen-to-batt-blend"
      )
    );
    svgRetArray.push(renderRect(x15, y17, x21 - x15, y18 - y17, "battery"));

    const batteryRoutes: { [id: string]: ElecRoutePair } = this.batteryRoutes;

    let xA: number = x21;
    let yA: number = y18;

    let xB: number = x15;

    let curvePadTemp = 0;
    for (const key in batteryRoutes) {
      if (!Object.prototype.hasOwnProperty.call(batteryRoutes, key)) {
        console.error("error fetching battery route: " + key);
        continue;
      }
      const batt = batteryRoutes[key];
      const widthIn = this._rateToWidth(batt.in.rate);
      const widthOut = this._rateToWidth(batt.out.rate);
      curvePadTemp = x1 - x21;
      svgRetArray.push(
        renderFlowByCorners(
          xA,
          yA,
          xA - widthOut,
          yA,
          x1,
          yA + curvePadTemp,
          x1,
          yA + curvePadTemp + widthOut,
          "battery"
        )
      );
      svgRetArray.push(
        svg`
        <polygon points="${x1},${yA + curvePadTemp}
        ${x1 - arrow_head_length},${yA + curvePadTemp + widthOut / 2},
        ${x1},${yA + curvePadTemp + widthOut}"
        class="tint"/>`
      );
      xA -= widthOut;
      if (xA - x15 > 1) {
        svgRetArray.push(
          renderRect(x15, yA, xA - x15, gap + widthIn + widthOut, "battery")
        );
      }

      svgRetArray2.push(
        renderFlowByCorners(
          xB,
          yA,
          xB - widthIn,
          yA,
          x1 - arrow_head_length,
          yA + curvePadTemp + widthOut,
          x1 - arrow_head_length,
          yA + curvePadTemp + widthOut + widthIn,
          "battery",
          battInBlendColor
        )
      );
      svgRetArray.push(
        svg`
        <polygon points="${x1 - arrow_head_length},${
          yA + curvePadTemp + widthOut
        }
        ${x1},${yA + curvePadTemp + widthOut + widthIn / 2},
        ${x1 - arrow_head_length},${yA + curvePadTemp + widthOut + widthIn}"
        style="fill:${battInBlendColor}" />`
      );
      xB -= widthIn;
      if (xB - x17 > 1) {
        svgRetArray.push(
          renderRect(
            x17,
            yA,
            xB - x17,
            gap + widthIn + widthOut,
            "battery-in",
            battInBlendColor
          )
        );
      }

      yA += gap + widthIn + widthOut;
    }

    return [
      svg`
      ${svgRetArray}
      ${svgRetArray2}
      `,
      yA - gap + curvePadTemp,
    ];
  }

  protected _gridBlendRatio(): number {
    if (!this.gridInRoute) {
      return 0;
    }
    const grid = this.gridInRoute.rate > 0 ? this.gridInRoute.rate : 0;
    const renewable =
      this._generationTrackedTotal() +
      this._generationPhantom() -
      this._gridExport;
    const ratio = grid / (grid + renewable);
    if (ratio < 0) {
      return 0;
    }
    if (ratio > 1) {
      return 1;
    }
    return ratio;
  }

  protected _toConsumersBlendColor(
    genToConsFlow: number,
    gridToConsFlow: number,
    battToConsFlow: number
  ): string {
    const total = genToConsFlow + gridToConsFlow + battToConsFlow;
    return mix3Hexes(
      this._genColor(),
      this._gridColor(),
      this._battColor(),
      genToConsFlow / total,
      gridToConsFlow / total,
      battToConsFlow / total
    );
  }

  protected _gridOutBlendColor(
    genToGridFlow: number,
    battToGridFlow: number
  ): string {
    return mixHexes(
      this._genColor(),
      this._battColor(),
      genToGridFlow / (genToGridFlow + battToGridFlow)
    );
  }

  protected _toBatteriesBlendColor(
    gridToBattFlow: number,
    genToBattFlow: number
  ): string {
    return mixHexes(
      this._gridColor(),
      this._battColor(),
      gridToBattFlow / (gridToBattFlow + genToBattFlow)
    );
  }

  protected _calc_xy(): [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    string,
    string,
    string
  ] {
    const widthGenToConsumers = this._generationToConsumersFlowWidth();
    const widthGenToGrid = this._generationToGridFlowWidth();
    const widthGenToBatteries = this._generationToBatteryFlowWidth();
    const widthBatteriesToGrid = this._batteriesToGridFlowWidth();
    const widthGridToBatteries = this._gridToBatteriesFlowWidth();
    const widthBatteriesToConsumers = this._batteryToConsumersFlowWidth();
    const widthGridToConsumers = this._gridToConsumersFlowWidth();

    const mostLeft = Math.min(-widthGenToGrid, -widthGridToBatteries);
    const mostRight =
      widthGenToBatteries +
      Math.max(
        widthGenToConsumers,
        widthBatteriesToGrid + widthBatteriesToConsumers
      );
    const width = mostRight - mostLeft;
    const padX =
      Math.max(
        widthGenToGrid,
        widthGenToConsumers,
        widthGridToBatteries,
        widthBatteriesToConsumers
      ) * PAD_MULTIPLIER;
    const midX = ARROW_HEAD_LENGTH + width / 2 + padX;

    const x0 =
      ARROW_HEAD_LENGTH + widthGenToGrid > widthGridToBatteries
        ? midX - width / 2
        : midX - width / 2 + widthGridToBatteries - widthGenToGrid;
    const y0 = TERMINATOR_BLOCK_LENGTH;

    const y1 =
      TERMINATOR_BLOCK_LENGTH +
      Math.max(
        padX,
        widthGenToConsumers,
        padX + widthGenToGrid + widthBatteriesToGrid - widthGenToConsumers,
        widthGenToGrid * 2 + widthBatteriesToGrid - widthGenToConsumers
      );
    const x1: number = midX + width / 2 + padX;

    const x2: number = x1;
    const y2: number = y1 + widthGenToConsumers;

    const y5 = y2 + widthGridToConsumers;
    const y10 = y2 - this._generationToGridFlowWidth() - widthBatteriesToGrid;

    const gridOutBlendColor = this._gridOutBlendColor(
      widthGenToGrid,
      widthBatteriesToGrid
    );
    const toConsumersBlendColor = this._toConsumersBlendColor(
      widthGenToConsumers,
      widthGridToConsumers,
      widthBatteriesToConsumers
    );
    const toBatteriesBlendColor = this._toBatteriesBlendColor(
      widthGridToBatteries,
      widthGenToBatteries
    );
    return [
      x0,
      y0,
      x1,
      y1,
      x2,
      y2,
      y5,
      y10,
      gridOutBlendColor,
      toConsumersBlendColor,
      toBatteriesBlendColor,
    ];
  }

  protected render(): TemplateResult {
    this._recalculate();
    const [
      x0,
      y0,
      x1,
      y1,
      x2,
      y2,
      y5,
      y10,
      gridOutBlendColor,
      toConsumersBlendColor,
      toBatteriesBlendColor, // TODO refactor this
    ] = this._calc_xy();

    const svgCanvasWidth = x1;
    const svgVisibleWidth = SVG_LHS_VISIBLE_WIDTH;
    const svgScaleX = svgVisibleWidth / svgCanvasWidth;
    const x10 = ARROW_HEAD_LENGTH / svgScaleX;
    const x11 = x10 + GRID_BLEND_LENGTH;

    const generationToGridFlowSvg = this.renderGenerationToGridFlow(
      x0,
      y0,
      x11,
      y10,
      svgScaleX
    );
    const gridOutArrowSvg = this.renderGridOutFlowArrow(
      x10,
      y10,
      y2,
      svgScaleX,
      gridOutBlendColor
    );

    const genInBlendFlowSvg = this.renderGenInBlendFlow(
      y1,
      y2,
      toConsumersBlendColor
    );

    const gridInBlendFlowSvg = this.renderGridInBlendFlow(
      y2,
      y5,
      toConsumersBlendColor
    );

    const y11 = y2 - this._batteriesToGridFlowWidth();
    const y13 = y5 + this._gridToBatteriesFlowWidth();

    const y17 = y13 + (y10 - y0);

    const x14 = x0 + this._generationToGridFlowWidth();
    const x15 = x14 + this._generationToBatteryFlowWidth();
    const x16 = x15 + this._generationToConsumersFlowWidth();
    const x17 = x14 - this._gridToBatteriesFlowWidth();
    const x20 = x15 + this._batteriesToGridFlowWidth();
    const x21 = x20 + this._batteryToConsumersFlowWidth();

    const y4 = y5 + this._batteryToConsumersFlowWidth();
    const y18 = y17 + BATTERY_BLEND_LENGTH;

    const genToGridBlendSvg = this.renderGenToGridBlendFlow(
      x10,
      y10,
      x11,
      y11,
      gridOutBlendColor
    );
    const [gridInDiv, gridInFlowSvg] = this.renderGridInFlow(
      y2,
      y5,
      y13,
      x10,
      y10,
      svgScaleX
    );
    const gridToConsumersFlowSvg = this.renderGridToConsumersFlow(
      x10,
      y2,
      y5,
      x1
    );

    const genToBattFlowSvg = this.renderGenerationToBatteriesFlow(
      x14,
      x15,
      y0,
      y17
    );
    const [genInFlowDiv, genInFlowSvg] = this.renderGenerationToConsumersFlow(
      x0,
      y0,
      x15,
      x16,
      x1,
      y1,
      x2, //@todo this is redundant and can be replaced with x1
      y2,
      svgScaleX
    );
    const [consOutFlowsDiv, consOutFlowsSvg, y8] = this._renderConsumerFlows(
      y1,
      y5,
      toConsumersBlendColor,
      svgScaleX
    );
    const gridToBattFlowSvg = this.renderGridToBatteriesFlow(
      x10,
      y5,
      y13,
      x17,
      y17,
      x14
    );
    const battToConsFlowSvg = this.renderBatteriesToConsumersFlow(
      x1,
      y5,
      y4,
      x20,
      x21,
      y17
    );
    const battToGridFlowSvg = this.renderBatteriesToGridFlow(
      x15,
      y17,
      x20,
      x11,
      y2,
      y11
    );
    const battToGridBlendFlowSvg = this.renderBatteriesToGridBlendFlow(
      x10,
      y11,
      x11,
      y2,
      gridOutBlendColor
    );
    const [battInOutBlendSvg, y22] = this.renderBatteriesInOutFlow(
      x1,
      x17,
      x14,
      x15,
      x20,
      x21,
      y17,
      y18,
      svgScaleX
    );

    const battToConsBlendFlowSvg = this.renderBatteriesToConsumersBlendFlow(
      y5,
      y4,
      toConsumersBlendColor
    );

    const blendedFlowPreFanOut = this._renderBlendedFlowPreFanOut(
      y1,
      y4,
      toConsumersBlendColor
    );
    const ymax = Math.max(y4, y8, y22 + 30);
    return html`<div class="card-content">
      <div class="col1 container">
        <div class="col1top padding"></div>
        ${gridInDiv}
      </div>
      <div class="col2 container">
        <div class="col2top container">${genInFlowDiv}</div>
        <div class="col2bottom container">
          <div class="sankey-left">
            <svg
              viewBox="0 0 ${svgCanvasWidth} ${ymax}"
              width="100%"
              style="min-width: ${svgVisibleWidth}px"
              height=${ymax * svgScaleX}
              preserveAspectRatio="none"
            >
              ${genInFlowSvg} ${generationToGridFlowSvg} ${genToGridBlendSvg}
              ${gridOutArrowSvg} ${genToBattFlowSvg} ${gridToBattFlowSvg}
              ${battToGridBlendFlowSvg} ${gridInFlowSvg}
              ${gridToConsumersFlowSvg} ${consOutFlowsDiv} ${battToConsFlowSvg}
              ${battToGridFlowSvg} ${battInOutBlendSvg}
            </svg>
          </div>
          <div class="sankey-mid">
            <svg
              viewBox="0 0 100 ${ymax}"
              width="100%"
              height=${ymax * svgScaleX}
              preserveAspectRatio="none"
            >
              ${genInBlendFlowSvg} ${gridInBlendFlowSvg}
              ${battToConsBlendFlowSvg} ${blendedFlowPreFanOut}
            </svg>
          </div>
          <div class="sankey-right">
            <svg
              viewBox="0 0 100 ${ymax}"
              width="100%"
              height=${ymax * svgScaleX}
              preserveAspectRatio="none"
            >
              ${consOutFlowsSvg}
            </svg>
          </div>
        </div>
      </div>
      <div class="col3 container">
        <div class="col3top padding"></div>
      </div>
    </div>`;
  }

  static styles: CSSResultGroup = css`
    .card-content {
      position: relative;
      direction: ltr;
      display: flex;
    }
    .col1 {
      flex: 1;
      min-width: 60px;
      max-width: 120px;
    }
    .col1top {
      height: 60px;
    }
    .col2 {
      justify-content: left;
      flex-grow: 1;
    }
    .col2top {
      height: 60px;
      display: flex;
      justify-content: left;
    }
    .col2bottom {
      display: flex;
      justify-content: left;
    }
    .sankey-left {
      flex: 1;
      flex-grow: 0;
    }
    .sankey-mid {
      flex: 1;
      flex-grow: 1;
      min-width: 20px;
    }
    .sankey-right {
      flex: 1;
      flex-grow: 2;
      min-width: 50px;
    }
    .col3 {
      flex: 1;
      min-width: 80px;
      max-width: 120px;
    }
    .col3top {
      height: 60px;
    }
    .label {
      flex: 1;
      position: relative;
    }
    .elecroute-label-grid {
      display: flex;
      text-align: center;
    }
    .elecroute-label-horiz {
      display: flex;
      flex: 0 0 auto;
      flex-grow: 0;
      flex-shrink: 0;
      text-align: center;
    }
    .elecroute-label-consumer {
      display: flex;
      align-items: center;
      flex-grow: 0;
      flex-shrink: 0;
      justify-content: left;
      padding-left: 6px;
      white-space: pre;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    svg {
      rect {
        stroke: none;
        stroke-width: 0;
      }
      path {
        stroke: none;
        stroke-width: 0;
      }
      path.grid {
        fill: var(--grid-in-color, #920e83);
      }
      path.battery {
        fill: var(--batt-out-color, #01f4fc);
      }
      polygon {
        stroke: none;
      }
      polygon.generation {
        fill: var(--generation-color, #0d6a04);
      }
      polygon.grid {
        fill: var(--grid-in-color, #920e83);
      }
      polygon.tint {
        fill: #000000;
        opacity: 0.2;
      }
      path.generation {
        fill: var(--generation-color, #0d6a04);
        stroke: var(--generation-color, #0d6a04);
        stroke-width: 0;
      }
      rect.generation {
        fill: var(--generation-color, #0d6a04);
        stroke-width: 0;
      }
      rect.grid {
        fill: var(--grid-in-color, #920e83);
      }
      rect.battery {
        fill: var(--batt-out-color, #01f4fc);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "elec-sankey": ElecSankey;
  }
}
