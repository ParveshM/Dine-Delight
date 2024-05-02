import{a5 as j,r as V}from"./index-B9ZM9xO7.js";var P={},q="Expected a function",L=NaN,G="[object Symbol]",z=/^\s+|\s+$/g,F=/^[-+]0x[0-9a-f]+$/i,H=/^0b[01]+$/i,X=/^0o[0-7]+$/i,J=parseInt,Q=typeof j=="object"&&j&&j.Object===Object&&j,Y=typeof self=="object"&&self&&self.Object===Object&&self,Z=Q||Y||Function("return this")(),ee=Object.prototype,te=ee.toString,ne=Math.max,re=Math.min,N=function(){return Z.Date.now()};function oe(e,n,o){var r,t,f,i,u,a,l=0,d=!1,m=!1,g=!0;if(typeof e!="function")throw new TypeError(q);n=K(n)||0,B(o)&&(d=!!o.leading,m="maxWait"in o,f=m?ne(K(o.maxWait)||0,n):f,g="trailing"in o?!!o.trailing:g);function p(c){var y=r,O=t;return r=t=void 0,l=c,i=e.apply(O,y),i}function h(c){return l=c,u=setTimeout(_,n),d?p(c):i}function w(c){var y=c-a,O=c-l,k=n-y;return m?re(k,f-O):k}function R(c){var y=c-a,O=c-l;return a===void 0||y>=n||y<0||m&&O>=f}function _(){var c=N();if(R(c))return x(c);u=setTimeout(_,w(c))}function x(c){return u=void 0,g&&r?p(c):(r=t=void 0,i)}function U(){u!==void 0&&clearTimeout(u),l=0,r=a=t=u=void 0}function A(){return u===void 0?i:x(N())}function T(){var c=N(),y=R(c);if(r=arguments,t=this,a=c,y){if(u===void 0)return h(a);if(m)return u=setTimeout(_,n),p(a)}return u===void 0&&(u=setTimeout(_,n)),i}return T.cancel=U,T.flush=A,T}function B(e){var n=typeof e;return!!e&&(n=="object"||n=="function")}function ie(e){return!!e&&typeof e=="object"}function ue(e){return typeof e=="symbol"||ie(e)&&te.call(e)==G}function K(e){if(typeof e=="number")return e;if(ue(e))return L;if(B(e)){var n=typeof e.valueOf=="function"?e.valueOf():e;e=B(n)?n+"":n}if(typeof e!="string")return e===0?e:+e;e=e.replace(z,"");var o=H.test(e);return o||X.test(e)?J(e.slice(2),o?2:8):F.test(e)?L:+e}var fe=oe;function S(e){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},S(e)}Object.defineProperty(P,"__esModule",{value:!0});P.DebounceInput=void 0;var C=$(V),ae=$(fe),ce=["element","onChange","value","minLength","debounceTimeout","forceNotifyByEnter","forceNotifyOnBlur","onKeyDown","onBlur","inputRef"];function $(e){return e&&e.__esModule?e:{default:e}}function le(e,n){if(e==null)return{};var o=se(e,n),r,t;if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(e);for(t=0;t<f.length;t++)r=f[t],!(n.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function se(e,n){if(e==null)return{};var o={},r=Object.keys(e),t,f;for(f=0;f<r.length;f++)t=r[f],!(n.indexOf(t)>=0)&&(o[t]=e[t]);return o}function W(e,n){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),o.push.apply(o,r)}return o}function s(e){for(var n=1;n<arguments.length;n++){var o=arguments[n]!=null?arguments[n]:{};n%2?W(Object(o),!0).forEach(function(r){b(e,r,o[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):W(Object(o)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(o,r))})}return e}function pe(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function ye(e,n){for(var o=0;o<n.length;o++){var r=n[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function be(e,n,o){return n&&ye(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function de(e,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),n&&E(e,n)}function E(e,n){return E=Object.setPrototypeOf||function(r,t){return r.__proto__=t,r},E(e,n)}function me(e){var n=he();return function(){var r=D(e),t;if(n){var f=D(this).constructor;t=Reflect.construct(r,arguments,f)}else t=r.apply(this,arguments);return ve(this,t)}}function ve(e,n){if(n&&(S(n)==="object"||typeof n=="function"))return n;if(n!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return v(e)}function v(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function he(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function D(e){return D=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)},D(e)}function b(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}var M=function(e){de(o,e);var n=me(o);function o(r){var t;pe(this,o),t=n.call(this,r),b(v(t),"onChange",function(i){i.persist();var u=t.state.value,a=t.props.minLength;t.setState({value:i.target.value},function(){var l=t.state.value;if(l.length>=a){t.notify(i);return}u.length>l.length&&t.notify(s(s({},i),{},{target:s(s({},i.target),{},{value:""})}))})}),b(v(t),"onKeyDown",function(i){i.key==="Enter"&&t.forceNotify(i);var u=t.props.onKeyDown;u&&(i.persist(),u(i))}),b(v(t),"onBlur",function(i){t.forceNotify(i);var u=t.props.onBlur;u&&(i.persist(),u(i))}),b(v(t),"createNotifier",function(i){if(i<0)t.notify=function(){return null};else if(i===0)t.notify=t.doNotify;else{var u=(0,ae.default)(function(a){t.isDebouncing=!1,t.doNotify(a)},i);t.notify=function(a){t.isDebouncing=!0,u(a)},t.flush=function(){return u.flush()},t.cancel=function(){t.isDebouncing=!1,u.cancel()}}}),b(v(t),"doNotify",function(){var i=t.props.onChange;i.apply(void 0,arguments)}),b(v(t),"forceNotify",function(i){var u=t.props.debounceTimeout;if(!(!t.isDebouncing&&u>0)){t.cancel&&t.cancel();var a=t.state.value,l=t.props.minLength;a.length>=l?t.doNotify(i):t.doNotify(s(s({},i),{},{target:s(s({},i.target),{},{value:a})}))}}),t.isDebouncing=!1,t.state={value:typeof r.value>"u"||r.value===null?"":r.value};var f=t.props.debounceTimeout;return t.createNotifier(f),t}return be(o,[{key:"componentDidUpdate",value:function(t){if(!this.isDebouncing){var f=this.props,i=f.value,u=f.debounceTimeout,a=t.debounceTimeout,l=t.value,d=this.state.value;typeof i<"u"&&l!==i&&d!==i&&this.setState({value:i}),u!==a&&this.createNotifier(u)}}},{key:"componentWillUnmount",value:function(){this.flush&&this.flush()}},{key:"render",value:function(){var t=this.props,f=t.element;t.onChange,t.value,t.minLength,t.debounceTimeout;var i=t.forceNotifyByEnter,u=t.forceNotifyOnBlur,a=t.onKeyDown,l=t.onBlur,d=t.inputRef,m=le(t,ce),g=this.state.value,p;i?p={onKeyDown:this.onKeyDown}:a?p={onKeyDown:a}:p={};var h;u?h={onBlur:this.onBlur}:l?h={onBlur:l}:h={};var w=d?{ref:d}:{};return C.default.createElement(f,s(s(s(s({},m),{},{onChange:this.onChange,value:g},p),h),w))}}]),o}(C.default.PureComponent);P.DebounceInput=M;b(M,"defaultProps",{element:"input",type:"text",onKeyDown:void 0,onBlur:void 0,value:void 0,minLength:0,debounceTimeout:100,forceNotifyByEnter:!0,forceNotifyOnBlur:!0,inputRef:void 0});var ge=P,I=ge.DebounceInput;I.DebounceInput=I;var _e=I;export{_e as l};
