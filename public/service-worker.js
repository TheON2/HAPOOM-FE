/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/sw-custom.js":
/*!*****************************!*\
  !*** ./public/sw-custom.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval(__webpack_require__.ts("importScripts(\"https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js\");\nif (workbox) {\n    console.log(\"Yay! Workbox is loaded \\uD83C\\uDF89\");\n} else {\n    console.log(\"Boo! Workbox didn't load \\uD83D\\uDE2C\");\n}\nself.addEventListener(\"push\", function(event) {\n    console.log(\"진입함 푸시\");\n    if (!(self.Notification && self.Notification.permission === \"granted\")) {\n        return;\n    }\n    const data = event.data.json();\n    console.log(data);\n    const options = {\n        body: data.content,\n        icon: \"./logomain.png\",\n        badge: \"./logomain.png\",\n        data: {\n            url: data.url\n        }\n    };\n    event.waitUntil(self.registration.showNotification(data.title, options));\n});\nself.addEventListener(\"notificationclick\", function(event) {\n    // 알림 클릭 이벤트 처리\n    event.notification.close(); // 클릭한 알림 닫기\n    // 알림 데이터에서 URL 가져오기 (서버에서 보낸 알림 데이터에 url을 포함시켜야 함)\n    var url = event.notification.data.url;\n    // 해당 URL로 이동\n    event.waitUntil(clients.matchAll({\n        type: \"window\"\n    }).then(function(clientList) {\n        for(var i = 0; i < clientList.length; i++){\n            var client = clientList[i];\n            if (client.url === url && \"focus\" in client) {\n                return client.focus();\n            }\n        }\n        if (clients.openWindow) {\n            return clients.openWindow(url);\n        }\n    }));\n});\nworkbox.precaching.precacheAndRoute([]);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvc3ctY3VzdG9tLmpzIiwibWFwcGluZ3MiOiJBQUFBQSxjQUNFO0FBR0YsSUFBSUMsU0FBUztJQUNYQyxRQUFRQyxHQUFHLENBQUU7QUFDZixPQUFPO0lBQ0xELFFBQVFDLEdBQUcsQ0FBRTtBQUNmO0FBRUFDLEtBQUtDLGdCQUFnQixDQUFDLFFBQVEsU0FBVUMsS0FBSztJQUMzQ0osUUFBUUMsR0FBRyxDQUFDO0lBQ1osSUFBSSxDQUFFQyxDQUFBQSxLQUFLRyxZQUFZLElBQUlILEtBQUtHLFlBQVksQ0FBQ0MsVUFBVSxLQUFLLFNBQVEsR0FBSTtRQUN0RTtJQUNGO0lBRUEsTUFBTUMsT0FBT0gsTUFBTUcsSUFBSSxDQUFDQyxJQUFJO0lBRTVCUixRQUFRQyxHQUFHLENBQUNNO0lBRVosTUFBTUUsVUFBVTtRQUNkQyxNQUFNSCxLQUFLSSxPQUFPO1FBQ2xCQyxNQUFNO1FBQ05DLE9BQU87UUFDUE4sTUFBTTtZQUFFTyxLQUFLUCxLQUFLTyxHQUFHO1FBQUM7SUFDeEI7SUFFQVYsTUFBTVcsU0FBUyxDQUFDYixLQUFLYyxZQUFZLENBQUNDLGdCQUFnQixDQUFDVixLQUFLVyxLQUFLLEVBQUVUO0FBQ2pFO0FBRUFQLEtBQUtDLGdCQUFnQixDQUFDLHFCQUFxQixTQUFVQyxLQUFLO0lBQ3hELGVBQWU7SUFDZkEsTUFBTWUsWUFBWSxDQUFDQyxLQUFLLElBQUksWUFBWTtJQUV4QyxtREFBbUQ7SUFDbkQsSUFBSU4sTUFBTVYsTUFBTWUsWUFBWSxDQUFDWixJQUFJLENBQUNPLEdBQUc7SUFFckMsYUFBYTtJQUNiVixNQUFNVyxTQUFTLENBQ2JNLFFBQ0dDLFFBQVEsQ0FBQztRQUNSQyxNQUFNO0lBQ1IsR0FDQ0MsSUFBSSxDQUFDLFNBQVVDLFVBQVU7UUFDeEIsSUFBSyxJQUFJQyxJQUFJLEdBQUdBLElBQUlELFdBQVdFLE1BQU0sRUFBRUQsSUFBSztZQUMxQyxJQUFJRSxTQUFTSCxVQUFVLENBQUNDLEVBQUU7WUFDMUIsSUFBSUUsT0FBT2QsR0FBRyxLQUFLQSxPQUFPLFdBQVdjLFFBQVE7Z0JBQzNDLE9BQU9BLE9BQU9DLEtBQUs7WUFDckI7UUFDRjtRQUNBLElBQUlSLFFBQVFTLFVBQVUsRUFBRTtZQUN0QixPQUFPVCxRQUFRUyxVQUFVLENBQUNoQjtRQUM1QjtJQUNGO0FBRU47QUFFQWYsUUFBUWdDLFVBQVUsQ0FBQ0MsZ0JBQWdCLENBQUM5QixLQUFLK0IsYUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wdWJsaWMvc3ctY3VzdG9tLmpzPzc5N2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0U2NyaXB0cyhcclxuICAnaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3dvcmtib3gtY2RuL3JlbGVhc2VzLzYuMS41L3dvcmtib3gtc3cuanMnXHJcbik7XHJcblxyXG5pZiAod29ya2JveCkge1xyXG4gIGNvbnNvbGUubG9nKGBZYXkhIFdvcmtib3ggaXMgbG9hZGVkIPCfjolgKTtcclxufSBlbHNlIHtcclxuICBjb25zb2xlLmxvZyhgQm9vISBXb3JrYm94IGRpZG4ndCBsb2FkIPCfmKxgKTtcclxufVxyXG5cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdwdXNoJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgY29uc29sZS5sb2coJ+ynhOyehe2VqCDtkbjsi5wnKTtcclxuICBpZiAoIShzZWxmLk5vdGlmaWNhdGlvbiAmJiBzZWxmLk5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uID09PSAnZ3JhbnRlZCcpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBkYXRhID0gZXZlbnQuZGF0YS5qc29uKCk7XHJcblxyXG4gIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgYm9keTogZGF0YS5jb250ZW50LFxyXG4gICAgaWNvbjogJy4vbG9nb21haW4ucG5nJyxcclxuICAgIGJhZGdlOiAnLi9sb2dvbWFpbi5wbmcnLFxyXG4gICAgZGF0YTogeyB1cmw6IGRhdGEudXJsIH0sIC8vIFVSTOydhCBvcHRpb25z7JeQIOy2lOqwgFxyXG4gIH07XHJcblxyXG4gIGV2ZW50LndhaXRVbnRpbChzZWxmLnJlZ2lzdHJhdGlvbi5zaG93Tm90aWZpY2F0aW9uKGRhdGEudGl0bGUsIG9wdGlvbnMpKTtcclxufSk7XHJcblxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ25vdGlmaWNhdGlvbmNsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgLy8g7JWM66a8IO2BtOumrSDsnbTrsqTtirgg7LKY66asXHJcbiAgZXZlbnQubm90aWZpY2F0aW9uLmNsb3NlKCk7IC8vIO2BtOumre2VnCDslYzrprwg64ur6riwXHJcblxyXG4gIC8vIOyVjOumvCDrjbDsnbTthLDsl5DshJwgVVJMIOqwgOyguOyYpOq4sCAo7ISc67KE7JeQ7IScIOuztOuCuCDslYzrprwg642w7J207YSw7JeQIHVybOydhCDtj6ztlajsi5zsvJzslbwg7ZWoKVxyXG4gIHZhciB1cmwgPSBldmVudC5ub3RpZmljYXRpb24uZGF0YS51cmw7XHJcblxyXG4gIC8vIO2VtOuLuSBVUkzroZwg7J2064+ZXHJcbiAgZXZlbnQud2FpdFVudGlsKFxyXG4gICAgY2xpZW50c1xyXG4gICAgICAubWF0Y2hBbGwoe1xyXG4gICAgICAgIHR5cGU6ICd3aW5kb3cnLFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbihmdW5jdGlvbiAoY2xpZW50TGlzdCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xpZW50TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIGNsaWVudCA9IGNsaWVudExpc3RbaV07XHJcbiAgICAgICAgICBpZiAoY2xpZW50LnVybCA9PT0gdXJsICYmICdmb2N1cycgaW4gY2xpZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjbGllbnQuZm9jdXMoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNsaWVudHMub3BlbldpbmRvdykge1xyXG4gICAgICAgICAgcmV0dXJuIGNsaWVudHMub3BlbldpbmRvdyh1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICApO1xyXG59KTtcclxuXHJcbndvcmtib3gucHJlY2FjaGluZy5wcmVjYWNoZUFuZFJvdXRlKHNlbGYuX19XQl9NQU5JRkVTVCk7XHJcbiJdLCJuYW1lcyI6WyJpbXBvcnRTY3JpcHRzIiwid29ya2JveCIsImNvbnNvbGUiLCJsb2ciLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiTm90aWZpY2F0aW9uIiwicGVybWlzc2lvbiIsImRhdGEiLCJqc29uIiwib3B0aW9ucyIsImJvZHkiLCJjb250ZW50IiwiaWNvbiIsImJhZGdlIiwidXJsIiwid2FpdFVudGlsIiwicmVnaXN0cmF0aW9uIiwic2hvd05vdGlmaWNhdGlvbiIsInRpdGxlIiwibm90aWZpY2F0aW9uIiwiY2xvc2UiLCJjbGllbnRzIiwibWF0Y2hBbGwiLCJ0eXBlIiwidGhlbiIsImNsaWVudExpc3QiLCJpIiwibGVuZ3RoIiwiY2xpZW50IiwiZm9jdXMiLCJvcGVuV2luZG93IiwicHJlY2FjaGluZyIsInByZWNhY2hlQW5kUm91dGUiLCJfX1dCX01BTklGRVNUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/sw-custom.js\n"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	!function() {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = function() {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: function(script) { return script; }
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	!function() {
/******/ 		__webpack_require__.ts = function(script) { return __webpack_require__.tt().createScript(script); };
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	!function() {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push(function(options) {
/******/ 			var originalFactory = options.factory;
/******/ 			options.factory = function(moduleObject, moduleExports, webpackRequire) {
/******/ 				var hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				var cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : function() {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/sw-custom.js");
/******/ 	
/******/ })()
;