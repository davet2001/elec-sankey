import { CSSResultGroup, LitElement, TemplateResult } from "lit";
export declare const PAD_ANTIALIAS = 0.5;
export interface ElecRoute {
    id?: string;
    text?: string;
    rate: number;
    icon?: string;
}
export declare function mixHexes(hex1: string, hex2: string, ratio?: number): string;
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
 * ${debugPoint(x1, y1, "x1,y1")} ${debugPoint(x2, y2, "x2,y2")}
 * ${debugPoint(x3, y3, "x3,y3")} ${debugPoint(x4, y4, "x4,y4")}
 * ${debugPoint(x5, y5, "x5,y5")} ${debugPoint(x6, y6, "x6,y6")}
 * ${debugPoint(x7, y7, "x7,y7")} ${debugPoint(x10, y10, "x10,y10")}
 */
export declare class ElecSankey extends LitElement {
    unit: string;
    generationInRoutes: {
        [id: string]: ElecRoute;
    };
    gridInRoute?: ElecRoute;
    gridOutRoute?: ElecRoute;
    consumerRoutes: {
        [id: string]: ElecRoute;
    };
    private _rateToWidthMultplier;
    private _phantomGridInRoute?;
    private _phantomGenerationInRoute?;
    private _untrackedConsumerRoute;
    private _generationTrackedTotal;
    private _generationPhantom;
    private _generationTotal;
    private _gridImport;
    private _gridExport;
    private _consumerTrackedTotal;
    private _recalculate;
    private _generationToConsumers;
    private _rateToWidth;
    private _generationInFlowWidth;
    private _generationToConsumersFlowWidth;
    private _generationToGridFlowWidth;
    private _gridInFlowWidth;
    private _gridOutFlowWidth;
    private _consumersFanOutTotalHeight;
    private _genColor;
    private _gridColor;
    protected _generateLabelDiv(_id: string | undefined, icon: string | undefined, _name: string | undefined, valueA: number, valueB?: number | undefined): TemplateResult;
    protected _generationToConsumersRadius(): number;
    protected renderGenerationToConsumersFlow(x0: number, x1: number, y1: number, x2: number, y2: number, svgScaleX?: number): [TemplateResult[], TemplateResult];
    protected renderGenerationToGridFlow(x0: number, y0: number, x10: number, y10: number): TemplateResult;
    protected renderGridInFlow(topRightX: number, topRightY: number, svgScaleX?: number): [TemplateResult | symbol, TemplateResult | symbol];
    protected renderGenInBlendFlow(y1: number, endColor: string): TemplateResult;
    protected renderGridInBlendFlow(y2: number, endColor: string): [TemplateResult, number];
    protected _renderBlendedFlowPreFanOut(y4: number, y5: number, color: string): TemplateResult;
    protected _insertExtras(_topLeftX: number, _topLeftY: number, _width: number, _color: string, _route: ElecRoute): [number, TemplateResult];
    protected _renderConsumerFlow(topLeftX: number, topLeftY: number, topRightX: number, topRightY: number, consumer: ElecRoute, color: string, svgScaleX?: number, count?: number): [TemplateResult, TemplateResult, number, number];
    protected _renderConsumerFlows(y6: number, y7: number, color: string, svgScaleX: number): [Array<TemplateResult>, Array<TemplateResult>, number];
    protected _gridBlendRatio(): number;
    protected _rateInBlendColor(): string;
    protected _calc_xy(): [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    protected render(): TemplateResult;
    static styles: CSSResultGroup;
}
declare global {
    interface HTMLElementTagNameMap {
        "elec-sankey": ElecSankey;
    }
}
