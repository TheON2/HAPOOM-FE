"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/google":
/*!*********************************************!*\
  !*** external "next-auth/providers/google" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/google");

/***/ }),

/***/ "next-auth/providers/kakao":
/*!********************************************!*\
  !*** external "next-auth/providers/kakao" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/kakao");

/***/ }),

/***/ "next-auth/providers/naver":
/*!********************************************!*\
  !*** external "next-auth/providers/naver" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/naver");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].ts":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"next-auth/providers/google\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/kakao */ \"next-auth/providers/kakao\");\n/* harmony import */ var next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/naver */ \"next-auth/providers/naver\");\n/* harmony import */ var next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    providers: [\n        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1___default()({\n            clientId: \"305871425957-hgvbf3fdjga9cvbo00o9uh36sgf8auue.apps.googleusercontent.com\",\n            clientSecret: \"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\"\n        }),\n        next_auth_providers_kakao__WEBPACK_IMPORTED_MODULE_2___default()({\n            clientId: \"bfd587f21bee3c4013621c9d16b0b6d8\",\n            clientSecret: \"H9XIbYIzqsq3w6NZeT7kjAj2O8jw9Eas\"\n        }),\n        next_auth_providers_naver__WEBPACK_IMPORTED_MODULE_3___default()({\n            clientId: \"VeYNVSB0X3qWGYK7n8yS\",\n            clientSecret: \"9yS8Ddlssx\"\n        })\n    ],\n    secret: \"zheldsjanwoalTek\"\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFpQztBQUN1QjtBQUNGO0FBQ0E7QUFFdEQsaUVBQWVBLGdEQUFRQSxDQUFDO0lBQ3RCSSxXQUFXO1FBQ1RILGlFQUFjQSxDQUFDO1lBQ2JJLFVBQVVDLDBFQUF3QztZQUNsREcsY0FBY0gscUNBQTRDO1FBQzVEO1FBQ0FKLGdFQUFhQSxDQUFDO1lBQ1pHLFVBQVVDLGtDQUF1QztZQUNqREcsY0FBY0gsa0NBQTJDO1FBQzNEO1FBQ0FILGdFQUFhQSxDQUFDO1lBQ1pFLFVBQVVDLHNCQUF1QztZQUNqREcsY0FBY0gsWUFBMkM7UUFDM0Q7S0FDRDtJQUNEUyxRQUFRVCxrQkFBdUM7QUFDakQsRUFBRSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFwb29tLWZlLy4vcGFnZXMvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS50cz8yZThiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgUHJvdmlkZXJHb29nbGUgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGUnO1xyXG5pbXBvcnQgUHJvdmlkZXJLYUthbyBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2tha2FvJztcclxuaW1wb3J0IFByb3ZpZGVyTmF2ZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9uYXZlcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aCh7XHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBQcm92aWRlckdvb2dsZSh7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HT09HTEVfQ0xJRU5UX0lEIGFzIHN0cmluZyxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HT09HTEVfQ0xJRU5UX1NFQ1JFVCBhcyBzdHJpbmcsXHJcbiAgICB9KSxcclxuICAgIFByb3ZpZGVyS2FLYW8oe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfS0FLQU9fQ0xJRU5UX0lEIGFzIHN0cmluZyxcclxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19LQUtBT19DTElFTlRfU0VDUkVUIGFzIHN0cmluZyxcclxuICAgIH0pLFxyXG4gICAgUHJvdmlkZXJOYXZlcih7XHJcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19OQVZFUl9DTElFTlRfSUQgYXMgc3RyaW5nLFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX05BVkVSX0NMSUVOVF9TRUNSRVQgYXMgc3RyaW5nLFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX05FWFRBVVRIX1NFQ1JFVCxcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIlByb3ZpZGVyR29vZ2xlIiwiUHJvdmlkZXJLYUthbyIsIlByb3ZpZGVyTmF2ZXIiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19HT09HTEVfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiTkVYVF9QVUJMSUNfR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJORVhUX1BVQkxJQ19LQUtBT19DTElFTlRfSUQiLCJORVhUX1BVQkxJQ19LQUtBT19DTElFTlRfU0VDUkVUIiwiTkVYVF9QVUJMSUNfTkFWRVJfQ0xJRU5UX0lEIiwiTkVYVF9QVUJMSUNfTkFWRVJfQ0xJRU5UX1NFQ1JFVCIsInNlY3JldCIsIk5FWFRfUFVCTElDX05FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].ts"));
module.exports = __webpack_exports__;

})();