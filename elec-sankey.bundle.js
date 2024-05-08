function t(t,e,i,o){var r,n=arguments.length,s=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,o);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(s=(n<3?r(s):n>3?r(e,i,s):r(e,i))||s);return n>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;class n{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}}const s=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const h=window,a=h.trustedTypes,d=a?a.emptyScript:"",c=h.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},p=(t,e)=>e!==t&&(e==e||t==t),$={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p},g="finalized";class _ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))})),t}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const r=this[t];this[e]=o,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||$}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const o=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{i?t.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):o.forEach((i=>{const o=document.createElement("style"),r=e.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,t.appendChild(o)}))})(o,this.constructor.elementStyles),o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=$){var o;const r=this.constructor._$Ep(t,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,r=o._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=o.getPropertyOptions(r),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=r,this[r]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var v;_[g]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:_}),(null!==(l=h.reactiveElementVersions)&&void 0!==l?l:h.reactiveElementVersions=[]).push("1.6.3");const f=window,y=f.trustedTypes,m=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",A=`lit$${(Math.random()+"").slice(9)}$`,x="?"+A,b=`<${x}>`,C=document,E=()=>C.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,S=Array.isArray,T="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,O=/>/g,P=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,M=/"/g,H=/^(?:script|style|textarea|title)$/i,U=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),W=U(1),F=U(2),N=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),j=new WeakMap,B=C.createTreeWalker(C,129,null,!1);function z(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==m?m.createHTML(e):e}const D=(t,e)=>{const i=t.length-1,o=[];let r,n=2===e?"<svg>":"",s=I;for(let e=0;e<i;e++){const i=t[e];let l,h,a=-1,d=0;for(;d<i.length&&(s.lastIndex=d,h=s.exec(i),null!==h);)d=s.lastIndex,s===I?"!--"===h[1]?s=k:void 0!==h[1]?s=O:void 0!==h[2]?(H.test(h[2])&&(r=RegExp("</"+h[2],"g")),s=P):void 0!==h[3]&&(s=P):s===P?">"===h[0]?(s=null!=r?r:I,a=-1):void 0===h[1]?a=-2:(a=s.lastIndex-h[2].length,l=h[1],s=void 0===h[3]?P:'"'===h[3]?M:L):s===M||s===L?s=P:s===k||s===O?s=I:(s=P,r=void 0);const c=s===P&&t[e+1].startsWith("/>")?" ":"";n+=s===I?i+b:a>=0?(o.push(l),i.slice(0,a)+w+i.slice(a)+A+c):i+A+(-2===a?(o.push(void 0),e):c)}return[z(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),o]};class V{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,n=0;const s=t.length-1,l=this.parts,[h,a]=D(t,e);if(this.el=V.createElement(h,i),B.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=B.nextNode())&&l.length<s;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(w)||e.startsWith(A)){const i=a[n++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+w).split(A),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?Q:"?"===e[1]?Y:"@"===e[1]?tt:J})}else l.push({type:6,index:r})}for(const e of t)o.removeAttribute(e)}if(H.test(o.tagName)){const t=o.textContent.split(A),e=t.length-1;if(e>0){o.textContent=y?y.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],E()),B.nextNode(),l.push({type:2,index:++r});o.append(t[e],E())}}}else if(8===o.nodeType)if(o.data===x)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(A,t+1));)l.push({type:7,index:r}),t+=A.length-1}r++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function q(t,e,i=t,o){var r,n,s,l;if(e===N)return e;let h=void 0!==o?null===(r=i._$Co)||void 0===r?void 0:r[o]:i._$Cl;const a=R(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,i,o)),void 0!==o?(null!==(s=(l=i)._$Co)&&void 0!==s?s:l._$Co=[])[o]=h:i._$Cl=h),void 0!==h&&(e=q(t,h._$AS(t,e.values),h,o)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);B.currentNode=r;let n=B.nextNode(),s=0,l=0,h=o[0];for(;void 0!==h;){if(s===h.index){let e;2===h.type?e=new K(n,n.nextSibling,this,t):1===h.type?e=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(e=new et(n,this,t)),this._$AV.push(e),h=o[++l]}s!==(null==h?void 0:h.index)&&(n=B.nextNode(),s++)}return B.currentNode=C,r}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,o){var r;this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(r=null==o?void 0:o.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),R(t)?t===G||null==t||""===t?(this._$AH!==G&&this._$AR(),this._$AH=G):t!==this._$AH&&t!==N&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>S(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==G&&R(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,r="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=V.createElement(z(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.v(i);else{const t=new Z(r,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=j.get(t.strings);return void 0===e&&j.set(t.strings,e=new V(t)),e}T(t){S(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const r of t)o===e.length?e.push(i=new K(this.k(E()),this.k(E()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,i,o,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const r=this.strings;let n=!1;if(void 0===r)t=q(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==N,n&&(this._$AH=t);else{const o=t;let s,l;for(t=r[0],s=0;s<r.length-1;s++)l=q(this,o[i+s],e,s),l===N&&(l=this._$AH[s]),n||(n=!R(l)||l!==this._$AH[s]),l===G?t=G:t!==G&&(t+=(null!=l?l:"")+r[s+1]),this._$AH[s]=l}n&&!o&&this.j(t)}j(t){t===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Q extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===G?void 0:t}}const X=y?y.emptyScript:"";class Y extends J{constructor(){super(...arguments),this.type=4}j(t){t&&t!==G?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class tt extends J{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=q(this,t,e,0))&&void 0!==i?i:G)===N)return;const o=this._$AH,r=t===G&&o!==G||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==G&&(o===G||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const it=f.litHtmlPolyfillSupport;null==it||it(V,K),(null!==(v=f.litHtmlVersions)&&void 0!==v?v:f.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ot,rt;class nt extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,r;const n=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let s=n._$litPart$;if(void 0===s){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;n._$litPart$=s=new K(e.insertBefore(E(),t),t,void 0,null!=i?i:{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return N}}nt.finalized=!0,nt._$litElement$=!0,null===(ot=globalThis.litElementHydrateSupport)||void 0===ot||ot.call(globalThis,{LitElement:nt});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:nt}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.3.3");var lt="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 6.95C14.7 7.06 15.87 9.78 14.28 11.81C13.86 12.31 13.19 12.64 12.85 13.07C12.5 13.5 12.5 14 12.5 14.5H11C11 13.65 11 12.94 11.35 12.44C11.68 11.94 12.35 11.64 12.77 11.31C14 10.18 13.68 8.59 12 8.46C11.18 8.46 10.5 9.13 10.5 9.97H9C9 8.3 10.35 6.95 12 6.95M11 15.5H12.5V17H11V15.5Z";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ht=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function at(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):ht(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var dt;null===(dt=window.HTMLSlotElement)||void 0===dt||dt.prototype.assignedElements;const ct=50,ut=10,pt=.5;function $t(t){const e=t.replace("#","").match(/.{2}/g);if(!e)throw new Error("Invalid hex string");return e.map((t=>parseInt(t,16)))}function gt(t,e,i=.5){if(i>1||i<0)throw new Error("Invalid ratio: "+i);const[o,r,n]=$t(t),[s,l,h]=$t(e);return function(t,e,i){return t=Math.round(t),e=Math.round(e),i=Math.round(i),"#"+[t=Math.min(t,255),e=Math.min(e,255),i=Math.min(i,255)].map((t=>t.toString(16).padStart(2,"0"))).join("")}(Math.round(o*i+s*(1-i)),Math.round(r*i+l*(1-i)),Math.round(n*i+h*(1-i)))}function _t(t,e,i,o,r,n,s,l){const h=(l-n)*(i-t)-(s-r)*(o-e);if(0===h)return console.log("Warning: Lines do not intersect."),null;const a=((s-r)*(e-n)-(l-n)*(t-r))/h,d=((i-t)*(e-n)-(o-e)*(t-r))/h;return[t+a*(i-t),e+a*(o-e),a>=0&&a<=1,d>=0&&d<=1]}function vt(t,e,i,o,r,n,s,l,h="",a=null){if(Math.sqrt((t-e)**2+(i-o)**2)<1||Math.sqrt((r-n)**2+(s-l)**2)<1)return F``;const d=(t+r)/2,c=(e+n)/2,u=(i+s)/2,p=(o+l)/2,$=_t(t,e,t-(o-e),e-(t-i),d,c,u,p),g=_t(r,n,r+(l-n),n+(r-s),d,c,u,p),_=_t(s,l,s+(l-n),l+(r-s),d,c,u,p),v=_t(i,o,i-(o-e),o-(t-i),d,c,u,p);if(null==$||null==g||null==_||null==v)return console.log("Warning: render flow failed."),F``;const[f,y,,]=$,[m,w,,]=g,[A,x,,]=_,[b,C,,]=v;return F`
  <path
      class="flow ${h}"
      d="M ${t},${e}
      C ${f},${y} ${m},${w} ${r},${n}
      L ${s},${l}
      C ${A},${x} ${b},${C} ${i},${o} Z"
      style="${a?"fill:"+a:""}"
  />
`}let ft=class extends nt{constructor(){super(...arguments),this.unit="kWh",this.generationInRoutes={},this.consumerRoutes={},this._rateToWidthMultplier=.2,this._untrackedConsumerRoute={id:void 0,text:"Untracked",rate:0}}_generationTrackedTotal(){let t=0;for(const e in this.generationInRoutes)Object.prototype.hasOwnProperty.call(this.generationInRoutes,e)&&(t+=this.generationInRoutes[e].rate);return t}_generationPhantom(){return this._phantomGenerationInRoute?this._phantomGenerationInRoute.rate:0}_generationTotal(){return this._generationTrackedTotal()+this._generationPhantom()}_gridImport(){return this.gridInRoute&&this.gridInRoute.rate>0?this.gridInRoute.rate:0}_gridExport(){return this.gridOutRoute?this.gridOutRoute.rate>0?this.gridOutRoute.rate:0:this.gridInRoute&&this.gridInRoute.rate<0?-this.gridInRoute.rate:0}_consumerTrackedTotal(){let t=0;for(const e in this.consumerRoutes)Object.prototype.hasOwnProperty.call(this.consumerRoutes,e)&&(t+=this.consumerRoutes[e].rate);return t}_recalculate(){const t=this._gridImport(),e=this._gridExport(),i=this._generationTrackedTotal(),o=this._consumerTrackedTotal();let r=0,n=0,s=0,l=e-i;l>0&&(n=l),l=o-t-i-n,l>0&&void 0===this.gridInRoute&&void 0===this.gridOutRoute&&(r=l),l=o-t-r-n-(i-e),l>0&&(n+=l),l=o-t-r-(i+n-e),l<0&&(s=-l),this._phantomGridInRoute=r>0?{text:"Unknown source",icon:lt,rate:r}:void 0,this._phantomGenerationInRoute=n>0?{text:"Unknown source",icon:lt,rate:n}:void 0,this._untrackedConsumerRoute.rate=s;const h=i+(this._phantomGenerationInRoute?this._phantomGenerationInRoute.rate:0),a=t+(this._phantomGridInRoute?this._phantomGridInRoute.rate:0),d=o+(this._untrackedConsumerRoute?this._untrackedConsumerRoute.rate:0),c=Math.max(h,a,d,1);this._rateToWidthMultplier=90/c}_generationToConsumers(){const t=this._gridExport();return t>0?this._generationTotal()-t:this._generationTotal()}_rateToWidth(t){const e=t*this._rateToWidthMultplier;return e>1?e:1}_generationInFlowWidth(){return this._rateToWidth(this._generationTrackedTotal()+this._generationPhantom())}_generationToConsumersFlowWidth(){return this._rateToWidth(this._generationToConsumers())}_generationToGridFlowWidth(){return this._gridExport()<=0?0:this.gridOutRoute?this._rateToWidth(this._gridExport()):this.gridInRoute?this.gridInRoute.rate>0?0:this._rateToWidth(-this.gridInRoute.rate):0}_gridInFlowWidth(){return void 0===this.gridInRoute?0:this.gridInRoute.rate>0?this._rateToWidth(this.gridInRoute.rate):0}_gridOutFlowWidth(){return void 0===this.gridOutRoute?0:this.gridOutRoute.rate>0?this._rateToWidth(this.gridOutRoute.rate):0}_consumersFanOutTotalHeight(){let t=0,e=0;for(const i in this.consumerRoutes)Object.prototype.hasOwnProperty.call(this.consumerRoutes,i)&&(t+=this._rateToWidth(this.consumerRoutes[i].rate),e++);const i=this._untrackedConsumerRoute.rate;return t+=this._rateToWidth(i),e++,e>0&&(t+=50*(e-1)),t}_genColor(){return getComputedStyle(this).getPropertyValue("--generation-color").trim()||"#0d6a04"}_gridColor(){return getComputedStyle(this).getPropertyValue("--grid-in-color").trim()||"#920e83"}_generateLabelDiv(t,e,i,o,r=void 0){const n=Math.round(10*o)/10,s=r?Math.round(10*r)/10:void 0;return W`
      <div class="label">
        <svg x="0" y="0" height=${24}>
          <path d=${e} />
        </svg>
        <br />
        ${s?W`
              OUT ${s} ${this.unit}<br />
              IN ${n} ${this.unit}
            `:W` ${i}<br />${n} ${this.unit} `}
      </div>
    `}_generationToConsumersRadius(){return 50+this._generationToConsumersFlowWidth()}renderGenerationToConsumersFlow(t,e,i,o,r,n=1){const s=this._generationInFlowWidth(),l=this._generationToConsumersFlowWidth();let h=150-(s+50*(Object.keys(this.generationInRoutes).length+(void 0!==this._phantomGenerationInRoute?1:0)-1))/2,a=150-s/2;const d=[],c=[],u=structuredClone(this.generationInRoutes);void 0!==this._phantomGenerationInRoute&&(u.phantom=this._phantomGenerationInRoute);let p=0;for(const t in u){if(Object.prototype.hasOwnProperty.call(u,t)){const e=u[t].rate,i=this._rateToWidth(e);d.push(vt(h+i,0,h,0,a+i,50,a,50,"generation")),d.push(F`
          <polygon points="${h+i},${0}
          ${h},${0},
          ${h+i/2},${10}"
          class="tint"/>
        `);const o=h+i/2,r=72,s=u[t].icon,l=u[t].id||void 0;s&&c.push(W`<div
              class="label elecroute-label-horiz"
              style="left: ${o*n-p*r/2}px; flex-basis: ${r}px; margin: 0 0 0 ${-r/2}px;"
            >
              ${this._generateLabelDiv(l,s,void 0,e)}
            </div>`),h+=i+50,a+=i}p++}const $=l>0?vt(t+s,49.5,t+s-l,49.5,e,i,o,r,"generation"):F``;return[c,F`
    ${d}
    ${$}
    `]}renderGenerationToGridFlow(t,e,i,o){const r=this._generationToGridFlowWidth();if(0===r)return F``;const n=vt(t+r,e,t,e,i,o+r,i,o,"generation");return F`
    ${n}
    <rect
      class="generation"
      x=${ut}
      y="${o}"
      height="${r}"
      width="${i-ut}"
    />
    <polygon
      class="generation"
      points="${ut},${o}
      ${ut},${o+r}
      0,${o+r/2}"
      />
  `}renderGridInFlow(t,e,i=1){if(!this.gridInRoute)return[G,G];const o=this._gridInFlowWidth(),r=this._gridInFlowWidth()+this._gridOutFlowWidth(),n=e,s=t,l=this._gridImport(),h=this._gridExport(),a=n-this._gridOutFlowWidth()+r/2;return[W`<div
      width=${48}
      class="label elecroute-label-grid"
      style="left: 0px; height:${64}px;
      top: ${a*i}px; margin: ${-32}px 0 0 0px;"
    >
      ${this._generateLabelDiv(this.gridInRoute.id,"M8.28,5.45L6.5,4.55L7.76,2H16.23L17.5,4.55L15.72,5.44L15,4H9L8.28,5.45M18.62,8H14.09L13.3,5H10.7L9.91,8H5.38L4.1,10.55L5.89,11.44L6.62,10H17.38L18.1,11.45L19.89,10.56L18.62,8M17.77,22H15.7L15.46,21.1L12,15.9L8.53,21.1L8.3,22H6.23L9.12,11H11.19L10.83,12.35L12,14.1L13.16,12.35L12.81,11H14.88L17.77,22M11.4,15L10.5,13.65L9.32,18.13L11.4,15M14.68,18.12L13.5,13.64L12.6,15L14.68,18.12Z",void 0,l,h)}
    </div>`,F`
    <rect
      class="grid"
      id="grid-in-rect"
      x="${0}"
      y="${n}"
      height="${o}"
      width="${s}"
    />
    <polygon points="${0},${n}
    ${0},${n+o}
    ${10},${n+o/2}"
    class="tint"/>
  `]}renderGenInBlendFlow(t,e){const i=this._generationToConsumersFlowWidth();return i?F`
    <defs>
      <linearGradient id="grad_grid" 0="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${this._genColor()};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${e};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect
      id="gen-in-blend-rect"
      x=0
      y="${t}"
      height="${i}"
      width="${81}"
      fill="url(#grad_grid)"
    />
  `:F``}renderGridInBlendFlow(t,e){const i=this._gridInFlowWidth(),o=t+i;return[F`
    <defs>
      <linearGradient id="grad_gen" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${this._gridColor()};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${e};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect
      id="grid-in-blend-rect"
      x=0
      y="${t}"
      height="${i}"
      width="${81}"
      fill="url(#grad_gen)"
      style="fill-opacity:1"
    />
  `,o]}_renderBlendedFlowPreFanOut(t,e,i){return F`
    <rect
      id="blended-flow-pre-fan-out-rect"
      x=${80}
      y="${t}"
      height="${e-t}"
      width="${21}"
      style="fill:${i};fill-opacity:1"
    />
  `}_insertExtras(t,e,i,o,r){return[0,F``]}_renderConsumerFlow(t,e,i,o,r,n,s=1,l=1){const h=this._rateToWidth(r.rate),a=i,d=o+h/2,c=vt(t,e,t,e+h,i+pt,o,i+pt,o+h,"consumer",n),[u,p]=this._insertExtras(i,o,h,n,r);return[W`<div
      class="label elecroute-label-consumer"
      style="height:${50}px;
      top: ${d*s-50*l/2}px; margin: ${-25}px 0 0 0;"
    >
      ${this._generateLabelDiv(r.id,void 0,r.text,r.rate)}
    </div>`,F`
      ${c}
      ${p}
      <polygon points="${a+u},${d-h/2}
        ${a+u},${d+h/2}
        ${a+u+ut},${d}"
        style="fill:${n}" />
    `,e+(0!==r.rate?h:0),o+h]}_renderConsumerFlows(t,e,i,o){const r=[],n=[];let s=0;let l,h,a=t,d=(t+e)/2-this._consumersFanOutTotalHeight()/2;d<8&&(d=8);for(const t in this.consumerRoutes)Object.prototype.hasOwnProperty.call(this.consumerRoutes,t)&&([h,l,a,d]=this._renderConsumerFlow(0,a,90,d,this.consumerRoutes[t],i,o,s++),r.push(h),n.push(l),d+=50);return[h,l,a,d]=this._renderConsumerFlow(0,a,90,d,this._untrackedConsumerRoute,i,o,s++),r.push(h),n.push(l),d+=50,n.length>0&&(d+=50),[r,n,d]}_gridBlendRatio(){if(!this.gridInRoute)return 0;const t=this.gridInRoute.rate>0?this.gridInRoute.rate:0,e=t/(t+(this._generationTrackedTotal()+this._generationPhantom()-this._gridExport()));return e<0?0:e>1?1:e}_rateInBlendColor(){return gt(this._gridColor(),this._genColor(),this._gridBlendRatio())}_calc_xy(){const t=150-this._generationInFlowWidth()/2,e=this._generationToConsumersFlowWidth(),i=this._generationToGridFlowWidth(),o=50+e,r=50+i,n=Math.max(ct+o-e/2,ct+r-i/2),s=t+i+e/2+o,l=s,h=n+e,a=t+this._generationToGridFlowWidth()-(h-50);return[t,50,s,n,l,h,a>ut?a:ut,h-this._generationToGridFlowWidth()]}render(){this._recalculate();const[t,e,i,o,r,n,s,l]=this._calc_xy(),h=this.renderGenerationToGridFlow(t,e,s,l),a=this._rateInBlendColor(),d=this.renderGenInBlendFlow(o,a),[c,u]=this.renderGridInBlendFlow(n,a),p=this._renderBlendedFlowPreFanOut(o,u,a),$=i,g=350/$,[_,v]=this.renderGridInFlow(r,n,g),[f,y]=this.renderGenerationToConsumersFlow(t,i,o,r,n,g),[m,w,A]=this._renderConsumerFlows(o,u,a,g),x=Math.max(u,A);return W`<div class="card-content">
      <div class="col1 container">
        <div class="col1top padding"></div>
        ${_}
      </div>
      <div class="col2 container">
        <div class="col2top container">${f}</div>
        <div class="col2bottom container">
          <div class="sankey-left">
            <svg
              viewBox="0 0 ${$} ${x}"
              width="100%"
              style="min-width: ${350}px"
              height=${x*g}
              preserveAspectRatio="none"
            >
              ${y} ${h} ${v}
            </svg>
          </div>
          <div class="sankey-mid">
            <svg
              viewBox="0 0 100 ${x}"
              width="100%"
              height=${x*g}
              preserveAspectRatio="none"
            >
              ${d} ${c} ${p}
            </svg>
          </div>
          <div class="sankey-right">
            <svg
              viewBox="0 0 100 ${x}"
              width="100%"
              height=${x*g}
              preserveAspectRatio="none"
            >
              ${w}
            </svg>
          </div>
        </div>
      </div>
      <div class="col3 container">
        <div class="col3top padding"></div>
        ${m}
      </div>
    </div>`}};ft.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1]),t[0]);return new n(i,t,o)})`
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
      polygon {
        stroke: none;
      }
      polygon.generation {
        fill: var(--generation-color, #0d6a04);
      }
      polygon.tint {
        fill: #000000;
        opacity: 0.2;
      }
      path.flow {
        fill: gray;
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
    }
  `,t([at()],ft.prototype,"unit",void 0),t([at({attribute:!1})],ft.prototype,"generationInRoutes",void 0),t([at({attribute:!1})],ft.prototype,"gridInRoute",void 0),t([at({attribute:!1})],ft.prototype,"gridOutRoute",void 0),t([at({attribute:!1})],ft.prototype,"consumerRoutes",void 0),ft=t([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:o}=e;return{kind:i,elements:o,finisher(e){customElements.define(t,e)}}})(t,e))("elec-sankey")],ft);export{ft as ElecSankey,pt as PAD_ANTIALIAS,gt as mixHexes};