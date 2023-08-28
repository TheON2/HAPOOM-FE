/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function () {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ './public/sw-custom.js':
      /*!*****************************!*\
  !*** ./public/sw-custom.js ***!
  \*****************************/
      /***/ function (module, __unused_webpack_exports, __webpack_require__) {
        eval(
          __webpack_require__.ts(
            "self.addEventListener(\"push\", function(event) {\n    if (!(self.Notification && self.Notification.permission === \"granted\")) {\n        return;\n    }\n    const data = event.data.json();\n    const options = {\n        body: data.content,\n        icon: \"icon.png\",\n        badge: \"badge.png\"\n    };\n    event.waitUntil(self.registration.showNotification(data.title, options));\n});\nworkbox.precaching.precacheAndRoute([]);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvc3ctY3VzdG9tLmpzIiwibWFwcGluZ3MiOiJBQUFBQSxLQUFLQyxnQkFBZ0IsQ0FBQyxRQUFRLFNBQVVDLEtBQUs7SUFDM0MsSUFBSSxDQUFFRixDQUFBQSxLQUFLRyxZQUFZLElBQUlILEtBQUtHLFlBQVksQ0FBQ0MsVUFBVSxLQUFLLFNBQVEsR0FBSTtRQUN0RTtJQUNGO0lBRUEsTUFBTUMsT0FBT0gsTUFBTUcsSUFBSSxDQUFDQyxJQUFJO0lBRTVCLE1BQU1DLFVBQVU7UUFDZEMsTUFBTUgsS0FBS0ksT0FBTztRQUNsQkMsTUFBTTtRQUNOQyxPQUFPO0lBQ1Q7SUFFQVQsTUFBTVUsU0FBUyxDQUFDWixLQUFLYSxZQUFZLENBQUNDLGdCQUFnQixDQUFDVCxLQUFLVSxLQUFLLEVBQUVSO0FBQ2pFO0FBRUFTLFFBQVFDLFVBQVUsQ0FBQ0MsZ0JBQWdCLENBQUNsQixLQUFLbUIsYUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wdWJsaWMvc3ctY3VzdG9tLmpzPzc5N2MiXSwic291cmNlc0NvbnRlbnQiOlsic2VsZi5hZGRFdmVudExpc3RlbmVyKCdwdXNoJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgaWYgKCEoc2VsZi5Ob3RpZmljYXRpb24gJiYgc2VsZi5Ob3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gJ2dyYW50ZWQnKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGF0YSA9IGV2ZW50LmRhdGEuanNvbigpO1xyXG5cclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgYm9keTogZGF0YS5jb250ZW50LFxyXG4gICAgaWNvbjogJ2ljb24ucG5nJyxcclxuICAgIGJhZGdlOiAnYmFkZ2UucG5nJyxcclxuICB9O1xyXG5cclxuICBldmVudC53YWl0VW50aWwoc2VsZi5yZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbihkYXRhLnRpdGxlLCBvcHRpb25zKSk7XHJcbn0pO1xyXG5cclxud29ya2JveC5wcmVjYWNoaW5nLnByZWNhY2hlQW5kUm91dGUoc2VsZi5fX1dCX01BTklGRVNUKTtcclxuIl0sIm5hbWVzIjpbInNlbGYiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJOb3RpZmljYXRpb24iLCJwZXJtaXNzaW9uIiwiZGF0YSIsImpzb24iLCJvcHRpb25zIiwiYm9keSIsImNvbnRlbnQiLCJpY29uIiwiYmFkZ2UiLCJ3YWl0VW50aWwiLCJyZWdpc3RyYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwidGl0bGUiLCJ3b3JrYm94IiwicHJlY2FjaGluZyIsInByZWNhY2hlQW5kUm91dGUiLCJfX1dCX01BTklGRVNUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./public/sw-custom.js\n"
          )
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ if (cachedModule.error !== undefined) throw cachedModule.error;
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ id: moduleId,
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ var threw = true;
    /******/ try {
      /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
      /******/ threw = false;
      /******/
    } finally {
      /******/ if (threw) delete __webpack_module_cache__[moduleId];
      /******/
    }
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/trusted types policy */
  /******/ !(function () {
    /******/ var policy;
    /******/ __webpack_require__.tt = function () {
      /******/ // Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
      /******/ if (policy === undefined) {
        /******/ policy = {
          /******/ createScript: function (script) {
            return script;
          },
          /******/
        };
        /******/ if (
          typeof trustedTypes !== 'undefined' &&
          trustedTypes.createPolicy
        ) {
          /******/ policy = trustedTypes.createPolicy('nextjs#bundler', policy);
          /******/
        }
        /******/
      }
      /******/ return policy;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/trusted types script */
  /******/ !(function () {
    /******/ __webpack_require__.ts = function (script) {
      return __webpack_require__.tt().createScript(script);
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/react refresh */
  /******/ !(function () {
    /******/ if (__webpack_require__.i) {
      /******/ __webpack_require__.i.push(function (options) {
        /******/ var originalFactory = options.factory;
        /******/ options.factory = function (
    moduleObject,
    moduleExports,
    webpackRequire
  ) {
          /******/ var hasRefresh =
        typeof self !== 'undefined' &&
        !!self.$RefreshInterceptModuleExecution$;
          /******/ var cleanup = hasRefresh
        ? self.$RefreshInterceptModuleExecution$(moduleObject.id)
        : function () { };
          /******/ try {
            /******/ originalFactory.call(
          this,
          moduleObject,
          moduleExports,
          webpackRequire
        );
        /******/
      } finally {
            /******/ cleanup();
        /******/
      }
      /******/
    };
    /******/
  });
      /******/
    }
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/compat */
  /******/
  /******/
  /******/ // noop fns to prevent runtime errors during initialization
  /******/ if (typeof self !== 'undefined') {
    /******/ self.$RefreshReg$ = function () { };
    /******/ self.$RefreshSig$ = function () {
      /******/ return function (type) {
        /******/ return type;
        /******/
      };
      /******/
    };
    /******/
  }
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval-source-map devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__(
    './public/sw-custom.js'
  );
  /******/
  /******/
})();