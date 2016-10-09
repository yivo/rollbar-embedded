(function() {
  var config, el, env, head, i, initialize, j, json, len, len1, meta, name, ref, ref1, token;

  initialize = (function() {
    var run;
    run = false;
    return function(arg) {
      var config, env, token;
      config = arg.config, token = arg.token, env = arg.env;
      if (!run) {
        run = true;
        if (!token && !(config != null ? config.token : void 0)) {
          throw new Error('Rollbar initializer: token not given');
        }
        try {
          
          !function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";function n(){var e="undefined"==typeof JSON?{}:JSON,t=r(11),n={};t(n),e=n,o.setupJSON(e)}var o=r(2),i=r(3);n();var a=window._rollbarConfig,s=a&&a.globalAlias||"Rollbar",u=window[s]&&"undefined"!=typeof window[s].shimId;!u&&a?o.wrapper.init(a):(window.Rollbar=o.wrapper,window.RollbarNotifier=i.Notifier),e.exports=o.wrapper},function(e,t,r){"use strict";function n(e,t,r){!r[4]&&window._rollbarWrappedError&&(r[4]=window._rollbarWrappedError,window._rollbarWrappedError=null),e.uncaughtError.apply(e,r),t&&t.apply(window,r)}function o(e,t){if(t.hasOwnProperty&&t.hasOwnProperty("addEventListener")){var r=t.addEventListener;t.addEventListener=function(t,n,o){r.call(this,t,e.wrap(n),o)};var n=t.removeEventListener;t.removeEventListener=function(e,t,r){n.call(this,e,t&&t._wrapped||t,r)}}}var i=r(3),a=r(8),s=i.Notifier;window._rollbarWrappedError=null;var u={};u.init=function(e,t){var r=new s(t);if(r.configure(e),e.captureUncaught){var i;t&&a.isType(t._rollbarOldOnError,"function")?i=t._rollbarOldOnError:window.onerror&&!window.onerror.belongsToShim&&(i=window.onerror),window.onerror=function(){var e=Array.prototype.slice.call(arguments,0);n(r,i,e)};var u,c,l=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"];for(u=0;u<l.length;++u)c=l[u],window[c]&&window[c].prototype&&o(r,window[c].prototype)}return e.captureUnhandledRejections&&(t&&a.isType(t._unhandledRejectionHandler,"function")&&window.removeEventListener("unhandledrejection",t._unhandledRejectionHandler),r._unhandledRejectionHandler=function(e){var t=e.reason,n=e.promise,o=e.detail;!t&&o&&(t=o.reason,n=o.promise),r.unhandledRejection(t,n)},window.addEventListener("unhandledrejection",r._unhandledRejectionHandler)),window.Rollbar=r,s.processPayloads(),r},e.exports={wrapper:u,setupJSON:i.setupJSON}},function(e,t,r){"use strict";function n(e){x=e,w.setupJSON(e)}function o(e,t){return function(){var r=t||this;try{return e.apply(r,arguments)}catch(n){console.error("[Rollbar]:",n)}}}function i(){h||(h=setTimeout(f,1e3))}function a(){return E}function s(e){E=E||this;var t="https://"+s.DEFAULT_ENDPOINT;this.options={enabled:!0,endpoint:t,environment:"production",scrubFields:g([],s.DEFAULT_SCRUB_FIELDS),checkIgnore:null,logLevel:s.DEFAULT_LOG_LEVEL,reportLevel:s.DEFAULT_REPORT_LEVEL,uncaughtErrorLevel:s.DEFAULT_UNCAUGHT_ERROR_LEVEL,payload:{}},this.lastError=null,this.plugins={},this.parentNotifier=e,e&&(e.hasOwnProperty("shimId")?e.notifier=this:this.configure(e.options))}function u(e){window._rollbarPayloadQueue.push(e),i()}function c(e){return o(function(){var t=this._getLogArgs(arguments);return this._log(e||t.level||this.options.logLevel||s.DEFAULT_LOG_LEVEL,t.message,t.err,t.custom,t.callback)})}function l(e,t){e||(e=t?x.stringify(t):"");var r={body:e};return t&&(r.extra=g(!0,{},t)),{message:r}}function p(e,t,r){var n=m.guessErrorClass(t.message),o=t.name||n[0],i=n[1],a={exception:{"class":o,message:i}};if(e&&(a.exception.description=e||"uncaught exception"),t.stack){var s,u,c,p,f,d,h,w;for(a.frames=[],h=0;h<t.stack.length;++h)s=t.stack[h],u={filename:s.url?v.sanitizeUrl(s.url):"(unknown)",lineno:s.line||null,method:s.func&&"?"!==s.func?s.func:"[anonymous]",colno:s.column},c=p=f=null,d=s.context?s.context.length:0,d&&(w=Math.floor(d/2),p=s.context.slice(0,w),c=s.context[w],f=s.context.slice(w)),c&&(u.code=c),(p||f)&&(u.context={},p&&p.length&&(u.context.pre=p),f&&f.length&&(u.context.post=f)),s.args&&(u.args=s.args),a.frames.push(u);return a.frames.reverse(),r&&(a.extra=g(!0,{},r)),{trace:a}}return l(o+": "+i,r)}function f(){var e;try{for(;e=window._rollbarPayloadQueue.shift();)d(e)}finally{h=void 0}}function d(e){var t=e.endpointUrl,r=e.accessToken,n=e.payload,o=e.callback||function(){},i=(new Date).getTime();i-L>=6e4&&(L=i,O=0);var a=window._globalRollbarOptions.maxItems,c=window._globalRollbarOptions.itemsPerMinute,l=function(){return!n.ignoreRateLimit&&a>=1&&T>=a},p=function(){return!n.ignoreRateLimit&&c>=1&&O>=c};return l()?void o(new Error(a+" max items reached")):p()?void o(new Error(c+" items per minute reached")):(T++,O++,l()&&E._log(E.options.uncaughtErrorLevel,"maxItems has been hit. Ignoring errors for the remainder of the current page load.",null,{maxItems:a},null,!1,!0),n.ignoreRateLimit&&delete n.ignoreRateLimit,void y.post(t,r,n,function(t,r){return t?(t instanceof b&&(e.callback=function(){},setTimeout(function(){u(e)},s.RETRY_DELAY)),o(t)):o(null,r)}))}var h,g=r(4),m=r(5),v=r(8),w=r(10),y=w.XHR,b=w.ConnectionError,x=null;s.NOTIFIER_VERSION="1.9.2",s.DEFAULT_ENDPOINT="api.rollbar.com/api/1/",s.DEFAULT_SCRUB_FIELDS=["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken"],s.DEFAULT_LOG_LEVEL="debug",s.DEFAULT_REPORT_LEVEL="debug",s.DEFAULT_UNCAUGHT_ERROR_LEVEL="error",s.DEFAULT_ITEMS_PER_MIN=60,s.DEFAULT_MAX_ITEMS=0,s.LEVELS={debug:0,info:1,warning:2,error:3,critical:4},s.RETRY_DELAY=1e4,window._rollbarPayloadQueue=window._rollbarPayloadQueue||[],window._globalRollbarOptions={startTime:(new Date).getTime(),maxItems:s.DEFAULT_MAX_ITEMS,itemsPerMinute:s.DEFAULT_ITEMS_PER_MIN};var E,_=s.prototype;_._getLogArgs=function(e){for(var t,r,n,i,a,u,c=this.options.logLevel||s.DEFAULT_LOG_LEVEL,l=[],p=0;p<e.length;++p)u=e[p],a=v.typeName(u),"string"===a?t?l.push(u):t=u:"function"===a?i=o(u,this):"date"===a?l.push(u):"error"===a||u instanceof Error||"undefined"!=typeof DOMException&&u instanceof DOMException?r?l.push(u):r=u:"object"!==a&&"array"!==a||(n?l.push(u):n=u);return l.length&&(n=n||{},n.extraArgs=l),{level:c,message:t,err:r,custom:n,callback:i}},_._route=function(e){var t=this.options.endpoint,r=/\/$/.test(t),n=/^\//.test(e);return r&&n?e=e.substring(1):r||n||(e="/"+e),t+e},_._processShimQueue=function(e){for(var t,r,n,o,i,a,u,c={};r=e.shift();)t=r.shim,n=r.method,o=r.args,i=t.parentShim,u=c[t.shimId],u||(i?(a=c[i.shimId],u=new s(a)):u=this,c[t.shimId]=u),u[n]&&v.isType(u[n],"function")&&u[n].apply(u,o)},_._buildPayload=function(e,t,r,n,o){var i=this.options.accessToken,a=this.options.environment,u=g(!0,{},this.options.payload),c=v.uuid4();if(void 0===s.LEVELS[t])throw new Error("Invalid level");if(!r&&!n&&!o)throw new Error("No message, stack info or custom data");var l={environment:a,endpoint:this.options.endpoint,uuid:c,level:t,platform:"browser",framework:"browser-js",language:"javascript",body:this._buildBody(r,n,o),request:{url:window.location.href,query_string:window.location.search,user_ip:"$remote_ip"},client:{runtime_ms:e.getTime()-window._globalRollbarOptions.startTime,timestamp:Math.round(e.getTime()/1e3),javascript:{browser:window.navigator.userAgent,language:window.navigator.language,cookie_enabled:window.navigator.cookieEnabled,screen:{width:window.screen.width,height:window.screen.height},plugins:this._getBrowserPlugins()}},server:{},notifier:{name:"rollbar-browser-js",version:s.NOTIFIER_VERSION}};u.body&&delete u.body;var p={access_token:i,data:g(!0,l,u)};return this._scrub(p.data),p},_._buildBody=function(e,t,r){var n;return n=t?p(e,t,r):l(e,r)},_._getBrowserPlugins=function(){if(!this._browserPlugins){var e,t,r=window.navigator.plugins||[],n=r.length,o=[];for(t=0;t<n;++t)e=r[t],o.push({name:e.name,description:e.description});this._browserPlugins=o}return this._browserPlugins},_._scrub=function(e){function t(e,t,r,n,o,i){return t+v.redact(i)}function r(e){var r;if(v.isType(e,"string"))for(r=0;r<s.length;++r)e=e.replace(s[r],t);return e}function n(e,t){var r;for(r=0;r<a.length;++r)if(a[r].test(e)){t=v.redact(t);break}return t}function o(e,t){var o=n(e,t);return o===t?r(o):o}var i=this.options.scrubFields,a=this._getScrubFieldRegexs(i),s=this._getScrubQueryParamRegexs(i);return v.traverse(e,o),e},_._getScrubFieldRegexs=function(e){for(var t,r=[],n=0;n<e.length;++n)t="\\[?(%5[bB])?"+e[n]+"\\[?(%5[bB])?\\]?(%5[dD])?",r.push(new RegExp(t,"i"));return r},_._getScrubQueryParamRegexs=function(e){for(var t,r=[],n=0;n<e.length;++n)t="\\[?(%5[bB])?"+e[n]+"\\[?(%5[bB])?\\]?(%5[dD])?",r.push(new RegExp("("+t+"=)([^&\\n]+)","igm"));return r},_._urlIsWhitelisted=function(e){var t,r,n,o,i,a,s,u,c,l;try{if(t=this.options.hostWhiteList,r=e&&e.data&&e.data.body&&e.data.body.trace,!t||0===t.length)return!0;if(!r)return!0;for(s=t.length,i=r.frames.length,c=0;c<i;c++){if(n=r.frames[c],o=n.filename,!v.isType(o,"string"))return!0;for(l=0;l<s;l++)if(a=t[l],u=new RegExp(a),u.test(o))return!0}}catch(p){return this.configure({hostWhiteList:null}),console.error("[Rollbar]: Error while reading your configuration's hostWhiteList option. Removing custom hostWhiteList.",p),!0}return!1},_._messageIsIgnored=function(e){var t,r,n,o,i,a,s,u,c;try{if(i=!1,n=this.options.ignoredMessages,!n||0===n.length)return!1;if(s=e&&e.data&&e.data.body,u=s&&s.trace&&s.trace.exception&&s.trace.exception.message,c=s&&s.message&&s.message.body,t=u||c,!t)return!1;for(o=n.length,r=0;r<o&&(a=new RegExp(n[r],"gi"),!(i=a.test(t)));r++);}catch(l){this.configure({ignoredMessages:null}),console.error("[Rollbar]: Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.")}return i},_._enqueuePayload=function(e,t,r,n){var o={callback:n,accessToken:this.options.accessToken,endpointUrl:this._route("item/"),payload:e},i=function(){if(n){var e="This item was not sent to Rollbar because it was ignored. This can happen if a custom checkIgnore() function was used or if the item's level was less than the notifier' reportLevel. See https://rollbar.com/docs/notifier/rollbar.js/configuration for more details.";n(null,{err:0,result:{id:null,uuid:null,message:e}})}};if(this._internalCheckIgnore(t,r,e))return void i();try{if(v.isType(this.options.checkIgnore,"function")&&this.options.checkIgnore(t,r,e))return void i()}catch(a){this.configure({checkIgnore:null}),console.error("[Rollbar]: Error while calling custom checkIgnore() function. Removing custom checkIgnore().",a)}if(this._urlIsWhitelisted(e)&&!this._messageIsIgnored(e)){if(this.options.verbose){if(e.data&&e.data.body&&e.data.body.trace){var s=e.data.body.trace,c=s.exception.message;console.error("[Rollbar]: ",c)}console.info("[Rollbar]: ",o)}v.isType(this.options.logFunction,"function")&&this.options.logFunction(o);try{v.isType(this.options.transform,"function")&&this.options.transform(e)}catch(a){this.configure({transform:null}),console.error("[Rollbar]: Error while calling custom transform() function. Removing custom transform().",a)}this.options.enabled&&u(o)}},_._internalCheckIgnore=function(e,t,r){var n=t[0],o=s.LEVELS[n]||0,i=s.LEVELS[this.options.reportLevel]||0;if(o<i)return!0;var a=this.options?this.options.plugins:{};if(a&&a.jquery&&a.jquery.ignoreAjaxErrors)try{return!!r.data.body.message.extra.isAjax}catch(u){return!1}return!1},_._log=function(e,t,r,n,o,i,a){var s=null;if(r)try{if(s=r._savedStackTrace?r._savedStackTrace:m.parse(r),r===this.lastError)return;this.lastError=r}catch(u){console.error("[Rollbar]: Error while parsing the error object.",u),t=r.message||r.description||t||String(r),r=null}var c=this._buildPayload(new Date,e,t,s,n);a&&(c.ignoreRateLimit=!0),this._enqueuePayload(c,!!i,[e,t,r,n],o)},_.log=c(),_.debug=c("debug"),_.info=c("info"),_.warn=c("warning"),_.warning=c("warning"),_.error=c("error"),_.critical=c("critical"),_.uncaughtError=o(function(e,t,r,n,o,i){if(i=i||null,o&&v.isType(o,"error"))return void this._log(this.options.uncaughtErrorLevel,e,o,i,null,!0);if(t&&v.isType(t,"error"))return void this._log(this.options.uncaughtErrorLevel,e,t,i,null,!0);var a={url:t||"",line:r};a.func=m.guessFunctionName(a.url,a.line),a.context=m.gatherContext(a.url,a.line);var s={mode:"onerror",message:o?String(o):e||"uncaught exception",url:document.location.href,stack:[a],useragent:navigator.userAgent},u=this._buildPayload(new Date,this.options.uncaughtErrorLevel,e,s,i);this._enqueuePayload(u,!0,[this.options.uncaughtErrorLevel,e,t,r,n,o])}),_.unhandledRejection=o(function(e,t){if(null==e)return void E._log(E.options.uncaughtErrorLevel,"unhandled rejection was null or undefined!",null,{},null,!1,!1);var r=e.message||(e?String(e):"unhandled rejection"),n=e._rollbarContext||t._rollbarContext||null;if(e&&v.isType(e,"error"))return void this._log(this.options.uncaughtErrorLevel,r,e,n,null,!0);var o={url:"",line:0};o.func=m.guessFunctionName(o.url,o.line),o.context=m.gatherContext(o.url,o.line);var i={mode:"unhandledrejection",message:r,url:document.location.href,stack:[o],useragent:navigator.userAgent},a=this._buildPayload(new Date,this.options.uncaughtErrorLevel,r,i,n);this._enqueuePayload(a,!0,[this.options.uncaughtErrorLevel,r,o.url,o.line,0,e,t])}),_.global=o(function(e){e=e||{};var t={startTime:e.startTime,maxItems:e.maxItems,itemsPerMinute:e.itemsPerMinute};g(!0,window._globalRollbarOptions,t),void 0!==e.maxItems&&(T=0),void 0!==e.itemsPerMinute&&(O=0)}),_.configure=o(function(e,t){var r=g(!0,{},e);g(!t,this.options,r),this.global(r)}),_.scope=o(function(e){var t=new s(this);return g(!0,t.options.payload,e),t}),_.wrap=function(e,t){try{var r;if(r=v.isType(t,"function")?t:function(){return t||{}},!v.isType(e,"function"))return e;if(e._isWrap)return e;if(!e._wrapped){e._wrapped=function(){try{return e.apply(this,arguments)}catch(t){throw"string"==typeof t&&(t=new String(t)),t.stack||(t._savedStackTrace=m.parse(t)),t._rollbarContext=r()||{},t._rollbarContext._wrappedSource=e.toString(),window._rollbarWrappedError=t,t}},e._wrapped._isWrap=!0;for(var n in e)e.hasOwnProperty(n)&&(e._wrapped[n]=e[n])}return e._wrapped}catch(o){return e}},_.loadFull=function(){console.error("[Rollbar]: Unexpected Rollbar.loadFull() called on a Notifier instance")},s.processPayloads=function(e){return e?void f():void i()};var L=(new Date).getTime(),T=0,O=0;e.exports={Notifier:s,setupJSON:n,topLevelNotifier:a}},function(e,t){"use strict";var r=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===n.call(e)},i=function(e){if(!e||"[object Object]"!==n.call(e))return!1;var t=r.call(e,"constructor"),o=e.constructor&&e.constructor.prototype&&r.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!t&&!o)return!1;var i;for(i in e);return"undefined"==typeof i||r.call(e,i)};e.exports=function a(){var e,t,r,n,s,u,c=arguments[0],l=1,p=arguments.length,f=!1;for("boolean"==typeof c?(f=c,c=arguments[1]||{},l=2):("object"!=typeof c&&"function"!=typeof c||null==c)&&(c={});l<p;++l)if(e=arguments[l],null!=e)for(t in e)r=c[t],n=e[t],c!==n&&(f&&n&&(i(n)||(s=o(n)))?(s?(s=!1,u=r&&o(r)?r:[]):u=r&&i(r)?r:{},c[t]=a(f,u,n)):"undefined"!=typeof n&&(c[t]=n));return c}},function(e,t,r){"use strict";function n(){return l}function o(){return null}function i(e){var t={};return t._stackFrame=e,t.url=e.fileName,t.line=e.lineNumber,t.func=e.functionName,t.column=e.columnNumber,t.args=e.args,t.context=o(t.url,t.line),t}function a(e){function t(){var t=[];try{t=c.parse(e)}catch(r){t=[]}for(var n=[],o=0;o<t.length;o++)n.push(new i(t[o]));return n}return{stack:t(),message:e.message,name:e.name}}function s(e){return new a(e)}function u(e){if(!e)return["Unknown error. There was no error message to display.",""];var t=e.match(p),r="(unknown)";return t&&(r=t[t.length-1],e=e.replace((t[t.length-2]||"")+r+":",""),e=e.replace(/(^[\s]+|[\s]+$)/g,"")),[r,e]}var c=r(6),l="?",p=new RegExp("^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ");e.exports={guessFunctionName:n,guessErrorClass:u,gatherContext:o,parse:s,Stack:a,Frame:i}},function(e,t,r){var n,o,i;!function(a,s){"use strict";o=[r(7)],n=s,i="function"==typeof n?n.apply(t,o):n,!(void 0!==i&&(e.exports=i))}(this,function(e){"use strict";function t(e,t,r){if("function"==typeof Array.prototype.map)return e.map(t,r);for(var n=new Array(e.length),o=0;o<e.length;o++)n[o]=t.call(r,e[o]);return n}function r(e,t,r){if("function"==typeof Array.prototype.filter)return e.filter(t,r);for(var n=[],o=0;o<e.length;o++)t.call(r,e[o])&&n.push(e[o]);return n}var n=/(^|@)\S+\:\d+/,o=/^\s*at .*(\S+\:\d+|\(native\))/m,i=/^(eval@)?(\[native code\])?$/;return{parse:function(e){if("undefined"!=typeof e.stacktrace||"undefined"!=typeof e["opera#sourceloc"])return this.parseOpera(e);if(e.stack&&e.stack.match(o))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];var t=e.replace(/[\(\)\s]/g,"").split(":"),r=t.pop(),n=t[t.length-1];if(!isNaN(parseFloat(n))&&isFinite(n)){var o=t.pop();return[t.join(":"),o,r]}return[t.join(":"),r,void 0]},parseV8OrIE:function(n){var i=r(n.stack.split("\n"),function(e){return!!e.match(o)},this);return t(i,function(t){t.indexOf("(eval ")>-1&&(t=t.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var r=t.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),n=this.extractLocation(r.pop()),o=r.join(" ")||void 0,i="eval"===n[0]?void 0:n[0];return new e(o,(void 0),i,n[1],n[2],t)},this)},parseFFOrSafari:function(n){var o=r(n.stack.split("\n"),function(e){return!e.match(i)},this);return t(o,function(t){if(t.indexOf(" > eval")>-1&&(t=t.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":          ")),t.indexOf("@")===-1&&t.indexOf(":")===-1)return new e(t);var r=t.split("@"),n=this.extractLocation(r.pop()),o=r.shift()||void 0;return new e(o,(void 0),n[0],n[1],n[2],t)},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(t){for(var r=/Line (\d+).*script (?:in )?(\S+)/i,n=t.message.split("\n"),o=[],i=2,a=n.length;i<a;i+=2){var s=r.exec(n[i]);s&&o.push(new e((void 0),(void 0),s[2],s[1],(void 0),n[i]))}return o},parseOpera10:function(t){for(var r=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,n=t.stacktrace.split("\n"),o=[],i=0,a=n.length;i<a;i+=2){var s=r.exec(n[i]);s&&o.push(new e(s[3]||void 0,(void 0),s[2],s[1],(void 0),n[i]))}return o},parseOpera11:function(o){var i=r(o.stack.split("\n"),function(e){return!!e.match(n)&&!e.match(/^Error created at/)},this);return t(i,function(t){var r,n=t.split("@"),o=this.extractLocation(n.pop()),i=n.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(r=i.replace(/^[^\(]+\(([^\)]*)\)$/,"          "));var s=void 0===r||"[arguments not available]"===r?void 0:r.split(",");return new e(a,s,o[0],o[1],o[2],t)},this)}}})},function(e,t,r){var n,o,i;!function(r,a){"use strict";o=[],n=a,i="function"==typeof n?n.apply(t,o):n,!(void 0!==i&&(e.exports=i))}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function t(e,t,r,n,o,i){void 0!==e&&this.setFunctionName(e),void 0!==t&&this.setArgs(t),void 0!==r&&this.setFileName(r),void 0!==n&&this.setLineNumber(n),void 0!==o&&this.setColumnNumber(o),void 0!==i&&this.setSource(i)}return t.prototype={getFunctionName:function(){return this.functionName},setFunctionName:function(e){this.functionName=String(e)},getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getFileName:function(){return this.fileName},setFileName:function(e){this.fileName=String(e)},getLineNumber:function(){return this.lineNumber},setLineNumber:function(t){if(!e(t))throw new TypeError("Line Number must be a Number");this.lineNumber=Number(t)},getColumnNumber:function(){return this.columnNumber},setColumnNumber:function(t){if(!e(t))throw new TypeError("Column Number must be a Number");this.columnNumber=Number(t)},getSource:function(){return this.source},setSource:function(e){this.source=String(e)},toString:function(){var t=this.getFunctionName()||"{anonymous}",r="("+(this.getArgs()||[]).join(",")+")",n=this.getFileName()?"@"+this.getFileName():"",o=e(this.getLineNumber())?":"+this.getLineNumber():"",i=e(this.getColumnNumber())?":"+this.getColumnNumber():"";return t+r+n+o+i}},t})},function(e,t,r){"use strict";function n(e){return{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function o(e,t){return n(e)===t}function i(e){if(!o(e,"string"))throw new Error("received invalid input");for(var t=l,r=t.parser[t.strictMode?"strict":"loose"].exec(e),n={},i=14;i--;)n[t.key[i]]=r[i]||"";return n[t.q.name]={},n[t.key[12]].replace(t.q.parser,function(e,r,o){r&&(n[t.q.name][r]=o)}),n}function a(e){var t=i(e);return""===t.anchor&&(t.source=t.source.replace("#","")),e=t.source.replace("?"+t.query,"")}function s(e,t){var r,n,i,a=o(e,"object"),u=o(e,"array"),c=[];if(a)for(r in e)e.hasOwnProperty(r)&&c.push(r);else if(u)for(i=0;i<e.length;++i)c.push(i);for(i=0;i<c.length;++i)r=c[i],n=e[r],a=o(n,"object"),u=o(n,"array"),a||u?e[r]=s(n,t):e[r]=t(r,n);return e}function u(e){return e=String(e),new Array(e.length+1).join("*")}function c(){var e=(new Date).getTime(),t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var r=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===t?r:7&r|8).toString(16)});return t}r(9);var l={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},p={isType:o,parseUri:i,parseUriOptions:l,redact:u,sanitizeUrl:a,traverse:s,typeName:n,uuid4:c};e.exports=p},function(e,t){!function(e){"use strict";e.console=e.console||{};for(var t,r,n=e.console,o={},i=function(){},a="memory".split(","),s="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");t=a.pop();)n[t]||(n[t]=o);for(;r=s.pop();)n[r]||(n[r]=i)}("undefined"==typeof window?this:window)},function(e,t,r){"use strict";function n(e){a=e}function o(e){this.name="Connection Error",this.message=e,this.stack=(new Error).stack}var i=r(8),a=null;o.prototype=Object.create(Error.prototype),o.prototype.constructor=o;var s={XMLHttpFactories:[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],createXMLHTTPObject:function(){var e,t=!1,r=s.XMLHttpFactories,n=r.length;for(e=0;e<n;e++)try{t=r[e]();break}catch(o){}return t},post:function(e,t,r,n){if(!i.isType(r,"object"))throw new Error("Expected an object to POST");r=a.stringify(r),n=n||function(){};var u=s.createXMLHTTPObject();if(u)try{try{var c=function(){try{if(c&&4===u.readyState){c=void 0;var e=a.parse(u.responseText);200===u.status?n(null,e):i.isType(u.status,"number")&&u.status>=400&&u.status<600?(403==u.status&&console.error("[Rollbar]:"+e.message),n(new Error(String(u.status)))):n(new o("XHR response had no status code (likely connection failure)"))}}catch(t){var r;r=t&&t.stack?t:new Error(t),n(r)}};u.open("POST",e,!0),u.setRequestHeader&&(u.setRequestHeader("Content-Type","application/json"),u.setRequestHeader("X-Rollbar-Access-Token",t)),u.onreadystatechange=c,u.send(r)}catch(l){if("undefined"!=typeof XDomainRequest){"http:"===window.location.href.substring(0,5)&&"https"===e.substring(0,5)&&(e="http"+e.substring(5));var p=function(){n(new o("Request timed out"))},f=function(){n(new Error("Error during request"))},d=function(){n(null,a.parse(u.responseText))};u=new XDomainRequest,u.onprogress=function(){},u.ontimeout=p,u.onerror=f,u.onload=d,u.open("POST",e,!0),u.send(r)}}}catch(h){n(h)}}};e.exports={XHR:s,setupJSON:n,ConnectionError:o}},function(module,exports){var setupCustomJSON=function(JSON){function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var r,n,o,i,a,s=gap,u=t[e];switch("function"==typeof rep&&(u=rep.call(t,e,u)),typeof u){case"string":return quote(u);case"number":return isFinite(u)?String(u):"null";case"boolean":case"null":return String(u);case"object":if(!u)return"null";if(gap+=indent,a=[],"[object Array]"===Object.prototype.toString.apply(u)){for(i=u.length,r=0;r<i;r+=1)a[r]=str(r,u)||"null";return o=0===a.length?"[]":gap?"[\n"+gap+a.join(",\n"+gap)+"\n"+s+"]":"["+a.join(",")+"]",gap=s,o}if(rep&&"object"==typeof rep)for(i=rep.length,r=0;r<i;r+=1)"string"==typeof rep[r]&&(n=rep[r],o=str(n,u),o&&a.push(quote(n)+(gap?": ":":")+o));else for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(o=str(n,u),o&&a.push(quote(n)+(gap?": ":":")+o));return o=0===a.length?"{}":gap?"{\n"+gap+a.join(",\n"+gap)+"\n"+s+"}":"{"+a.join(",")+"}",gap=s,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;"function"!=typeof JSON.stringify&&(JSON.stringify=function(e,t,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=t,t&&"function"!=typeof t&&("object"!=typeof t||"number"!=typeof t.length))throw new Error("JSON.stringify");return str("",{"":e})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){function walk(e,t){var r,n,o=e[t];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(n=walk(o,r),void 0!==n?o[r]=n:delete o[r]);return reviver.call(e,t,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})};module.exports=setupCustomJSON}])});
        ;
          Rollbar.init(config != null ? config : {
            accessToken: token,
            captureUncaught: true,
            captureUnhandledRejections: true,
            verbose: true,
            payload: {
              environment: env
            }
          });
        } catch (error) {}
      }
    };
  })();

  if ((head = document.getElementsByTagName('head')[0]) != null) {
    meta = head.getElementsByTagName('meta');
    env = null;
    for (i = 0, len = meta.length; i < len; i++) {
      el = meta[i];
      if ((ref = el.getAttribute('name')) === 'app:environment' || ref === 'environment' || ref === 'app:env' || ref === 'rails:env' || ref === 'env') {
        if (env = el.getAttribute('content')) {
          break;
        }
      }
    }
    env || (env = 'production');
    for (j = 0, len1 = meta.length; j < len1; j++) {
      el = meta[j];
      name = el.getAttribute('name');
      if (name === 'rollbar:config' && (json = el.getAttribute('content'))) {
        try {
          config = (ref1 = typeof JSON !== "undefined" && JSON !== null ? JSON.parse(json) : void 0) != null ? ref1 : typeof $ !== "undefined" && $ !== null ? $.parseJSON(json) : void 0;
        } catch (error) {}
        if (config != null) {
          initialize({
            config: config,
            env: env
          });
          break;
        }
      } else if (name === 'rollbar:access_token' && (token = el.getAttribute('content'))) {
        initialize({
          token: token,
          env: env
        });
        break;
      }
    }
  }

}).call(this);
