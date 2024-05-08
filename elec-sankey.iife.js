var ElecSankey=function(t){"use strict";function e(t,e,i,n){var o,r=arguments.length,s=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,i,n);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(s=(r<3?o(s):r>3?o(e,i,s):o(e,i))||s);return r>3&&s&&Object.defineProperty(e,i,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i=window,n=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;class s{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(n&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}}const l=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,o))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a;const h=window,d=h.trustedTypes,c=d?d.emptyScript:"",u=h.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:$},_="finalized";class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Ep(i,e);void 0!==n&&(this._$Ev.set(n,i),t.push(n))})),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const o=this[t];this[e]=n,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{n?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const n=document.createElement("style"),o=i.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,t.appendChild(n)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=g){var n;const o=this.constructor._$Ep(t,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const n=this.constructor,o=n._$Ev.get(t);if(void 0!==o&&this._$El!==o){const t=n.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=o,this[o]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||$)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;v[_]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:v}),(null!==(a=h.reactiveElementVersions)&&void 0!==a?a:h.reactiveElementVersions=[]).push("1.6.3");const y=window,m=y.trustedTypes,A=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,w="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,E="?"+x,b=`<${E}>`,C=document,R=()=>C.createComment(""),S=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,k="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,P=/>/g,L=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,H=/"/g,U=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),F=W(1),N=W(2),G=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),B=new WeakMap,D=C.createTreeWalker(C,129,null,!1);function z(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const V=(t,e)=>{const i=t.length-1,n=[];let o,r=2===e?"<svg>":"",s=I;for(let e=0;e<i;e++){const i=t[e];let l,a,h=-1,d=0;for(;d<i.length&&(s.lastIndex=d,a=s.exec(i),null!==a);)d=s.lastIndex,s===I?"!--"===a[1]?s=O:void 0!==a[1]?s=P:void 0!==a[2]?(U.test(a[2])&&(o=RegExp("</"+a[2],"g")),s=L):void 0!==a[3]&&(s=L):s===L?">"===a[0]?(s=null!=o?o:I,h=-1):void 0===a[1]?h=-2:(h=s.lastIndex-a[2].length,l=a[1],s=void 0===a[3]?L:'"'===a[3]?H:M):s===H||s===M?s=L:s===O||s===P?s=I:(s=L,o=void 0);const c=s===L&&t[e+1].startsWith("/>")?" ":"";r+=s===I?i+b:h>=0?(n.push(l),i.slice(0,h)+w+i.slice(h)+x+c):i+x+(-2===h?(n.push(void 0),e):c)}return[z(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};class q{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let o=0,r=0;const s=t.length-1,l=this.parts,[a,h]=V(t,e);if(this.el=q.createElement(a,i),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=D.nextNode())&&l.length<s;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith(w)||e.startsWith(x)){const i=h[r++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+w).split(x),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?X:"?"===e[1]?tt:"@"===e[1]?et:Q})}else l.push({type:6,index:o})}for(const e of t)n.removeAttribute(e)}if(U.test(n.tagName)){const t=n.textContent.split(x),e=t.length-1;if(e>0){n.textContent=m?m.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],R()),D.nextNode(),l.push({type:2,index:++o});n.append(t[e],R())}}}else if(8===n.nodeType)if(n.data===E)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=n.data.indexOf(x,t+1));)l.push({type:7,index:o}),t+=x.length-1}o++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,n){var o,r,s,l;if(e===G)return e;let a=void 0!==n?null===(o=i._$Co)||void 0===o?void 0:o[n]:i._$Cl;const h=S(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,i,n)),void 0!==n?(null!==(s=(l=i)._$Co)&&void 0!==s?s:l._$Co=[])[n]=a:i._$Cl=a),void 0!==a&&(e=Z(t,a._$AS(t,e.values),a,n)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:n}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:C).importNode(i,!0);D.currentNode=o;let r=D.nextNode(),s=0,l=0,a=n[0];for(;void 0!==a;){if(s===a.index){let e;2===a.type?e=new J(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=n[++l]}s!==(null==a?void 0:a.index)&&(r=D.nextNode(),s++)}return D.currentNode=C,o}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,n){var o;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cp=null===(o=null==n?void 0:n.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),S(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==j&&S(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:n}=t,o="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=q.createElement(z(n.h,n.h[0]),this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(i);else{const t=new K(o,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new q(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new J(this.k(R()),this.k(R()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Q{constructor(t,e,i,n,o){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const o=this.strings;let r=!1;if(void 0===o)t=Z(this,t,e,0),r=!S(t)||t!==this._$AH&&t!==G,r&&(this._$AH=t);else{const n=t;let s,l;for(t=o[0],s=0;s<o.length-1;s++)l=Z(this,n[i+s],e,s),l===G&&(l=this._$AH[s]),r||(r=!S(l)||l!==this._$AH[s]),l===j?t=j:t!==j&&(t+=(null!=l?l:"")+o[s+1]),this._$AH[s]=l}r&&!n&&this.j(t)}j(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===j?void 0:t}}const Y=m?m.emptyScript:"";class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==j?this.element.setAttribute(this.name,Y):this.element.removeAttribute(this.name)}}class et extends Q{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Z(this,t,e,0))&&void 0!==i?i:j)===G)return;const n=this._$AH,o=t===j&&n!==j||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==j&&(n===j||o);o&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const nt=y.litHtmlPolyfillSupport;null==nt||nt(q,J),(null!==(f=y.litHtmlVersions)&&void 0!==f?f:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ot,rt;class st extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var n,o;const r=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let s=r._$litPart$;if(void 0===s){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=s=new J(e.insertBefore(R(),t),t,void 0,null!=i?i:{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return G}}st.finalized=!0,st._$litElement$=!0,null===(ot=globalThis.litElementHydrateSupport)||void 0===ot||ot.call(globalThis,{LitElement:st});const lt=globalThis.litElementPolyfillSupport;null==lt||lt({LitElement:st}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.3.3");var at="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 6.95C14.7 7.06 15.87 9.78 14.28 11.81C13.86 12.31 13.19 12.64 12.85 13.07C12.5 13.5 12.5 14 12.5 14.5H11C11 13.65 11 12.94 11.35 12.44C11.68 11.94 12.35 11.64 12.77 11.31C14 10.18 13.68 8.59 12 8.46C11.18 8.46 10.5 9.13 10.5 9.97H9C9 8.3 10.35 6.95 12 6.95M11 15.5H12.5V17H11V15.5Z";
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
 */function dt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):ht(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var ct;null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements;const ut=50,pt=10,$t=.5;function gt(t){const e=t.replace("#","").match(/.{2}/g);if(!e)throw new Error("Invalid hex string");return e.map((t=>parseInt(t,16)))}function _t(t,e,i=.5){if(i>1||i<0)throw new Error("Invalid ratio: "+i);const[n,o,r]=gt(t),[s,l,a]=gt(e);return function(t,e,i){return t=Math.round(t),e=Math.round(e),i=Math.round(i),"#"+[t=Math.min(t,255),e=Math.min(e,255),i=Math.min(i,255)].map((t=>t.toString(16).padStart(2,"0"))).join("")}(Math.round(n*i+s*(1-i)),Math.round(o*i+l*(1-i)),Math.round(r*i+a*(1-i)))}function vt(t,e,i,n,o,r,s,l){const a=(l-r)*(i-t)-(s-o)*(n-e);if(0===a)return console.log("Warning: Lines do not intersect."),null;const h=((s-o)*(e-r)-(l-r)*(t-o))/a,d=((i-t)*(e-r)-(n-e)*(t-o))/a;return[t+h*(i-t),e+h*(n-e),h>=0&&h<=1,d>=0&&d<=1]}function ft(t,e,i,n,o,r,s,l,a="",h=null){if(Math.sqrt((t-e)**2+(i-n)**2)<1||Math.sqrt((o-r)**2+(s-l)**2)<1)return N``;const d=(t+o)/2,c=(e+r)/2,u=(i+s)/2,p=(n+l)/2,$=vt(t,e,t-(n-e),e-(t-i),d,c,u,p),g=vt(o,r,o+(l-r),r+(o-s),d,c,u,p),_=vt(s,l,s+(l-r),l+(o-s),d,c,u,p),v=vt(i,n,i-(n-e),n-(t-i),d,c,u,p);if(null==$||null==g||null==_||null==v)return console.log("Warning: render flow failed."),N``;const[f,y,,]=$,[m,A,,]=g,[w,x,,]=_,[E,b,,]=v;return N`
  <path
      class="flow ${a}"
      d="M ${t},${e}
      C ${f},${y} ${m},${A} ${o},${r}
      L ${s},${l}
      C ${w},${x} ${E},${b} ${i},${n} Z"
      style="${h?"fill:"+h:""}"
  />
`}return t.ElecSankey=class extends st{constructor(){super(...arguments),this.unit="kWh",this.generationInRoutes={},this.consumerRoutes={},this._rateToWidthMultplier=.2,this._untrackedConsumerRoute={id:void 0,text:"Untracked",rate:0}}_generationTrackedTotal(){let t=0;for(const e in this.generationInRoutes)Object.prototype.hasOwnProperty.call(this.generationInRoutes,e)&&(t+=this.generationInRoutes[e].rate);return t}_generationPhantom(){return this._phantomGenerationInRoute?this._phantomGenerationInRoute.rate:0}_generationTotal(){return this._generationTrackedTotal()+this._generationPhantom()}_gridImport(){return this.gridInRoute&&this.gridInRoute.rate>0?this.gridInRoute.rate:0}_gridExport(){return this.gridOutRoute?this.gridOutRoute.rate>0?this.gridOutRoute.rate:0:this.gridInRoute&&this.gridInRoute.rate<0?-this.gridInRoute.rate:0}_consumerTrackedTotal(){let t=0;for(const e in this.consumerRoutes)Object.prototype.hasOwnProperty.call(this.consumerRoutes,e)&&(t+=this.consumerRoutes[e].rate);return t}_recalculate(){const t=this._gridImport(),e=this._gridExport(),i=this._generationTrackedTotal(),n=this._consumerTrackedTotal();let o=0,r=0,s=0,l=e-i;l>0&&(r=l),l=n-t-i-r,l>0&&void 0===this.gridInRoute&&void 0===this.gridOutRoute&&(o=l),l=n-t-o-r-(i-e),l>0&&(r+=l),l=n-t-o-(i+r-e),l<0&&(s=-l),this._phantomGridInRoute=o>0?{text:"Unknown source",icon:at,rate:o}:void 0,this._phantomGenerationInRoute=r>0?{text:"Unknown source",icon:at,rate:r}:void 0,this._untrackedConsumerRoute.rate=s;const a=i+(this._phantomGenerationInRoute?this._phantomGenerationInRoute.rate:0),h=t+(this._phantomGridInRoute?this._phantomGridInRoute.rate:0),d=n+(this._untrackedConsumerRoute?this._untrackedConsumerRoute.rate:0),c=Math.max(a,h,d,1);this._rateToWidthMultplier=90/c}_generationToConsumers(){const t=this._gridExport();return t>0?this._generationTotal()-t:this._generationTotal()}_rateToWidth(t){const e=t*this._rateToWidthMultplier;return e>1?e:1}_generationInFlowWidth(){return this._rateToWidth(this._generationTrackedTotal()+this._generationPhantom())}_generationToConsumersFlowWidth(){return this._rateToWidth(this._generationToConsumers())}_generationToGridFlowWidth(){return this._gridExport()<=0?0:this.gridOutRoute?this._rateToWidth(this._gridExport()):this.gridInRoute?this.gridInRoute.rate>0?0:this._rateToWidth(-this.gridInRoute.rate):0}_gridInFlowWidth(){return void 0===this.gridInRoute?0:this.gridInRoute.rate>0?this._rateToWidth(this.gridInRoute.rate):0}_gridOutFlowWidth(){return void 0===this.gridOutRoute?0:this.gridOutRoute.rate>0?this._rateToWidth(this.gridOutRoute.rate):0}_consumersFanOutTotalHeight(){let t=0,e=0;for(const i in this.consumerRoutes)Object.prototype.hasOwnProperty.call(this.consumerRoutes,i)&&(t+=this._rateToWidth(this.consumerRoutes[i].rate),e++);const i=this._untrackedConsumerRoute.rate;return t+=this._rateToWidth(i),e++,e>0&&(t+=50*(e-1)),t}_genColor(){return getComputedStyle(this).getPropertyValue("--generation-color").trim()||"#0d6a04"}_gridColor(){return getComputedStyle(this).getPropertyValue("--grid-in-color").trim()||"#920e83"}_generateLabelDiv(t,e,i,n,o=void 0){const r=Math.round(10*n)/10,s=o?Math.round(10*o)/10:void 0;return F`
      <div class="label">
        <svg x="0" y="0" height=${24}>
          <path d=${e} />
        </svg>
        <br />
        ${s?F`
              OUT ${s} ${this.unit}<br />
              IN ${r} ${this.unit}
            `:F` ${r} ${this.unit} `}
      </div>
    `}_generationToConsumersRadius(){return 50+this._generationToConsumersFlowWidth()}renderGenerationToConsumersFlow(t,e,i,n,o,r=1){const s=this._generationInFlowWidth(),l=this._generationToConsumersFlowWidth();let a=150-(s+50*(Object.keys(this.generationInRoutes).length+(void 0!==this._phantomGenerationInRoute?1:0)-1))/2,h=150-s/2;const d=[],c=[],u=structuredClone(this.generationInRoutes);void 0!==this._phantomGenerationInRoute&&(u.phantom=this._phantomGenerationInRoute);let p=0;for(const t in u){if(Object.prototype.hasOwnProperty.call(u,t)){const e=u[t].rate,i=this._rateToWidth(e);d.push(ft(a+i,0,a,0,h+i,50,h,50,"generation")),d.push(N`
          <polygon points="${a+i},${0}
          ${a},${0},
          ${a+i/2},${10}"
          class="tint"/>
        `);const n=a+i/2,o=72,s=u[t].icon,l=u[t].id||void 0;s&&c.push(F`<div
              class="label elecroute-label-horiz"
              style="left: ${n*r-p*o/2}px; flex-basis: ${o}px; margin: 0 0 0 ${-o/2}px;"
            >
              ${this._generateLabelDiv(l,s,void 0,e)}
            </div>`),a+=i+50,h+=i}p++}const $=l>0?ft(t+s,49.5,t+s-l,49.5,e,i,n,o,"generation"):N``;return[c,N`
    ${d}
    ${$}
    `]}renderGenerationToGridFlow(t,e,i,n){const o=this._generationToGridFlowWidth();if(0===o)return N``;const r=ft(t+o,e,t,e,i,n+o,i,n,"generation");return N`
    ${r}
    <rect
      class="generation"
      x=${pt}
      y="${n}"
      height="${o}"
      width="${i-pt}"
    />
    <polygon
      class="generation"
      points="${pt},${n}
      ${pt},${n+o}
      0,${n+o/2}"
      />
  `}renderGridInFlow(t,e,i=1){if(!this.gridInRoute)return[j,j];const n=this._gridInFlowWidth(),o=this._gridInFlowWidth()+this._gridOutFlowWidth(),r=e,s=t,l=this._gridImport(),a=this._gridExport(),h=r-this._gridOutFlowWidth()+o/2;return[F`<div
      width=${48}
      class="label elecroute-label-grid"
      style="left: 0px; height:${64}px;
      top: ${h*i}px; margin: ${-32}px 0 0 0px;"
    >
      ${this._generateLabelDiv(this.gridInRoute.id,"M8.28,5.45L6.5,4.55L7.76,2H16.23L17.5,4.55L15.72,5.44L15,4H9L8.28,5.45M18.62,8H14.09L13.3,5H10.7L9.91,8H5.38L4.1,10.55L5.89,11.44L6.62,10H17.38L18.1,11.45L19.89,10.56L18.62,8M17.77,22H15.7L15.46,21.1L12,15.9L8.53,21.1L8.3,22H6.23L9.12,11H11.19L10.83,12.35L12,14.1L13.16,12.35L12.81,11H14.88L17.77,22M11.4,15L10.5,13.65L9.32,18.13L11.4,15M14.68,18.12L13.5,13.64L12.6,15L14.68,18.12Z",void 0,l,a)}
    </div>`,N`
    <rect
      class="grid"
      id="grid-in-rect"
      x="${0}"
      y="${r}"
      height="${n}"
      width="${s}"
    />
    <polygon points="${0},${r}
    ${0},${r+n}
    ${10},${r+n/2}"
    class="tint"/>
  `]}renderGenInBlendFlow(t,e){const i=this._generationToConsumersFlowWidth();return i?N`
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
  `:N``}renderGridInBlendFlow(t,e){const i=this._gridInFlowWidth(),n=t+i;return[N`
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
  `,n]}_renderBlendedFlowPreFanOut(t,e,i){return N`
    <rect
      id="blended-flow-pre-fan-out-rect"
      x=${80}
      y="${t}"
      height="${e-t}"
      width="${21}"
      style="fill:${i};fill-opacity:1"
    />
  `}_insertExtras(t,e,i,n,o){return[0,N``]}_renderConsumerFlow(t,e,i,n,o,r,s=1,l=1){const a=this._rateToWidth(o.rate),h=i,d=n+a/2,c=ft(t,e,t,e+a,i+$t,n,i+$t,n+a,"consumer",r),[u,p]=this._insertExtras(i,n,a,r,o);return[F`<div
      class="label elecroute-label-consumer"
      style="height:${50}px;
      top: ${d*s-50*l/2}px; margin: ${-25}px 0 0 0;"
    >
      ${this._generateLabelDiv(o.id,void 0,o.text,o.rate)}
    </div>`,N`
      ${c}
      ${p}
      <polygon points="${h+u},${d-a/2}
        ${h+u},${d+a/2}
        ${h+u+pt},${d}"
        style="fill:${r}" />
    `,e+(0!==o.rate?a:0),n+a]}_renderConsumerFlows(t,e,i,n){const o=[],r=[];let s=0;let l,a,h=t,d=(t+e)/2-this._consumersFanOutTotalHeight()/2;d<8&&(d=8);for(const t in this.consumerRoutes)Object.prototype.hasOwnProperty.call(this.consumerRoutes,t)&&([a,l,h,d]=this._renderConsumerFlow(0,h,90,d,this.consumerRoutes[t],i,n,s++),o.push(a),r.push(l),d+=50);return[a,l,h,d]=this._renderConsumerFlow(0,h,90,d,this._untrackedConsumerRoute,i,n,s++),o.push(a),r.push(l),d+=50,r.length>0&&(d+=50),[o,r,d]}_gridBlendRatio(){if(!this.gridInRoute)return 0;const t=this.gridInRoute.rate>0?this.gridInRoute.rate:0,e=t/(t+(this._generationTrackedTotal()+this._generationPhantom()-this._gridExport()));return e<0?0:e>1?1:e}_rateInBlendColor(){return _t(this._gridColor(),this._genColor(),this._gridBlendRatio())}_calc_xy(){const t=150-this._generationInFlowWidth()/2,e=this._generationToConsumersFlowWidth(),i=this._generationToGridFlowWidth(),n=50+e,o=50+i,r=Math.max(ut+n-e/2,ut+o-i/2),s=t+i+e/2+n,l=s,a=r+e,h=t+this._generationToGridFlowWidth()-(a-50);return[t,50,s,r,l,a,h>pt?h:pt,a-this._generationToGridFlowWidth()]}render(){this._recalculate();const[t,e,i,n,o,r,s,l]=this._calc_xy(),a=this.renderGenerationToGridFlow(t,e,s,l),h=this._rateInBlendColor(),d=this.renderGenInBlendFlow(n,h),[c,u]=this.renderGridInBlendFlow(r,h),p=this._renderBlendedFlowPreFanOut(n,u,h),$=i,g=350/$,[_,v]=this.renderGridInFlow(o,r,g),[f,y]=this.renderGenerationToConsumersFlow(t,i,n,o,r,g),[m,A,w]=this._renderConsumerFlows(n,u,h,g),x=Math.max(u,w);return F`<div class="card-content">
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
              ${y} ${a} ${v}
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
              ${A}
            </svg>
          </div>
        </div>
      </div>
      <div class="col3 container">
        <div class="col3top padding"></div>
        ${m}
      </div>
    </div>`}},t.ElecSankey.styles=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new s(i,t,o)})`
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
      align: top;
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
  `,e([dt()],t.ElecSankey.prototype,"unit",void 0),e([dt({attribute:!1})],t.ElecSankey.prototype,"generationInRoutes",void 0),e([dt({attribute:!1})],t.ElecSankey.prototype,"gridInRoute",void 0),e([dt({attribute:!1})],t.ElecSankey.prototype,"gridOutRoute",void 0),e([dt({attribute:!1})],t.ElecSankey.prototype,"consumerRoutes",void 0),t.ElecSankey=e([(t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){customElements.define(t,e)}}})(t,e))("elec-sankey")],t.ElecSankey),t.PAD_ANTIALIAS=$t,t.mixHexes=_t,Object.defineProperty(t,"__esModule",{value:!0}),t}({});