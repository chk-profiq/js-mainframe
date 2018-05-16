exports.id = "main";
exports.modules = {

/***/ "./src/main/index.js":
/*!***************************!*\
  !*** ./src/main/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ \"url\");\n/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);\n// @flow\n\n\n\nlet mainWindow;\nconst appWindows = {};\nconst requestChannel = 'ipc-request-channel';\nconst responseChannel = 'ipc-response-channel';\nconst isDevelopment = \"development\" !== 'production';\n\nconst createWindow = () => {\n  mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({\n    width: 800,\n    height: 600\n  });\n\n  if (isDevelopment) {\n    mainWindow.webContents.openDevTools();\n  }\n\n  if (isDevelopment) {\n    mainWindow.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);\n  } else {\n    mainWindow.loadURL(url__WEBPACK_IMPORTED_MODULE_2___default.a.format({\n      pathname: path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, 'ui', 'index.html'),\n      protocol: 'file:',\n      slashes: true\n    }));\n  } // Emitted when the window is closed.\n\n\n  mainWindow.on('closed', () => {\n    // TODO: fix below to not error on close\n    // const keys = Object.keys(appWindows)\n    // Object.keys(appWindows).forEach(w => {\n    //   appWindows[w].close()\n    // })\n    mainWindow = null;\n  });\n};\n\nconst launchApp = appId => {\n  const appWindow = new electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"]({\n    width: 800,\n    height: 600,\n    webPreferences: {\n      sandbox: true,\n      preload: path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, 'preload.js')\n    }\n  });\n  appWindow.loadURL(url__WEBPACK_IMPORTED_MODULE_2___default.a.format({\n    pathname: path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, 'applications', appId, `${appId}.asar`, 'index.html'),\n    protocol: 'file:',\n    slashes: true\n  }));\n  appWindows[appId] = appWindow;\n};\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('ready', createWindow); // Quit when all windows are closed.\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('window-all-closed', () => {\n  if (process.platform !== 'darwin') {\n    electron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].quit();\n  }\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"app\"].on('activate', () => {\n  // On macOS it's common to re-create a window in the app when the\n  // dock icon is clicked and there are no other windows open.\n  if (mainWindow === null) {\n    createWindow();\n  }\n});\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on('launchApp', (e, appId) => {\n  launchApp(appId);\n});\nconst simpleClient = {\n  getBalance: () => 1000,\n  getPublicKey: () => 'myKey'\n};\n\nconst handleRequest = request => {\n  if (request.data.method && simpleClient[request.data.method]) {\n    const args = request.data.args || [];\n\n    try {\n      const res = simpleClient[request.data.method](...args);\n      return {\n        id: request.id,\n        result: res\n      };\n    } catch (error) {\n      return {\n        error,\n        id: request.id\n      };\n    }\n  }\n\n  return {\n    error: {\n      message: 'Method not found',\n      code: 32601\n    },\n    id: request.id\n  };\n};\n\nelectron__WEBPACK_IMPORTED_MODULE_0__[\"ipcMain\"].on(requestChannel, async (event, request) => {\n  const window = electron__WEBPACK_IMPORTED_MODULE_0__[\"BrowserWindow\"].fromWebContents(event.sender);\n\n  const send = (channel, response) => {\n    if (!(window && window.isDestroyed())) {\n      event.sender.send(channel, response);\n    }\n  };\n\n  const res = handleRequest(request, window);\n  send(responseChannel, res);\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"src/main\"))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi9pbmRleC5qcz9lNTlhIl0sIm5hbWVzIjpbIm1haW5XaW5kb3ciLCJhcHBXaW5kb3dzIiwicmVxdWVzdENoYW5uZWwiLCJyZXNwb25zZUNoYW5uZWwiLCJpc0RldmVsb3BtZW50IiwiY3JlYXRlV2luZG93Iiwid2lkdGgiLCJoZWlnaHQiLCJ3ZWJDb250ZW50cyIsIm9wZW5EZXZUb29scyIsImxvYWRVUkwiLCJwcm9jZXNzIiwiZW52IiwiRUxFQ1RST05fV0VCUEFDS19XRFNfUE9SVCIsInVybCIsImZvcm1hdCIsInBhdGhuYW1lIiwicGF0aCIsImpvaW4iLCJfX2Rpcm5hbWUiLCJwcm90b2NvbCIsInNsYXNoZXMiLCJvbiIsImxhdW5jaEFwcCIsImFwcElkIiwiYXBwV2luZG93Iiwid2ViUHJlZmVyZW5jZXMiLCJzYW5kYm94IiwicHJlbG9hZCIsImFwcCIsInBsYXRmb3JtIiwicXVpdCIsImlwY01haW4iLCJlIiwic2ltcGxlQ2xpZW50IiwiZ2V0QmFsYW5jZSIsImdldFB1YmxpY0tleSIsImhhbmRsZVJlcXVlc3QiLCJyZXF1ZXN0IiwiZGF0YSIsIm1ldGhvZCIsImFyZ3MiLCJyZXMiLCJpZCIsInJlc3VsdCIsImVycm9yIiwibWVzc2FnZSIsImNvZGUiLCJldmVudCIsIndpbmRvdyIsIkJyb3dzZXJXaW5kb3ciLCJmcm9tV2ViQ29udGVudHMiLCJzZW5kZXIiLCJzZW5kIiwiY2hhbm5lbCIsInJlc3BvbnNlIiwiaXNEZXN0cm95ZWQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBRUEsSUFBSUEsVUFBSjtBQUNBLE1BQU1DLGFBQWEsRUFBbkI7QUFFQSxNQUFNQyxpQkFBaUIscUJBQXZCO0FBQ0EsTUFBTUMsa0JBQWtCLHNCQUF4QjtBQUVBLE1BQU1DLGdCQUFnQixrQkFBeUIsWUFBL0M7O0FBRUEsTUFBTUMsZUFBZSxNQUFNO0FBRXpCTCxlQUFhLElBQUksc0RBQUos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QUNELFNBQU87QUFDTEUsV0FBTztBQUNMQyxlQUFTLGtCQURKO0FBRUxDLFlBQU07QUFGRCxLQURGO0FBS0xKLFFBQUlMLFFBQVFLO0FBTFAsR0FBUDtBQU9ELENBdkJEOztBQXlCQSxnREFBQVgsQ0FBUVYsRUFBUixDQUFXcEIsY0FBWCxFQUEyQixPQUFPOEMsS0FBUCxFQUFjVixPQUFkLEtBQTBCO0FBQ25ELFFBQU1XLFNBQVMsc0RBQUFDLENBQWNDLGVBQWQsQ0FBOEJILE1BQU1JLE1BQXBDLENBQWY7O0FBQ0EsUUFBTUMsT0FBTyxDQUFDQyxPQUFELEVBQVVDLFFBQVYsS0FBdUI7QUFDbEMsUUFBSSxFQUFFTixVQUFVQSxPQUFPTyxXQUFQLEVBQVosQ0FBSixFQUF1QztBQUNyQ1IsWUFBTUksTUFBTixDQUFhQyxJQUFiLENBQWtCQyxPQUFsQixFQUEyQkMsUUFBM0I7QUFDRDtBQUNGLEdBSkQ7O0FBS0EsUUFBTWIsTUFBTUwsY0FBY0MsT0FBZCxFQUF1QlcsTUFBdkIsQ0FBWjtBQUNBSSxPQUFLbEQsZUFBTCxFQUFzQnVDLEdBQXRCO0FBQ0QsQ0FURCxFIiwiZmlsZSI6Ii4vc3JjL21haW4vaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQgeyBhcHAsIEJyb3dzZXJXaW5kb3csIGlwY01haW4gfSBmcm9tICdlbGVjdHJvbidcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgdXJsIGZyb20gJ3VybCdcblxubGV0IG1haW5XaW5kb3dcbmNvbnN0IGFwcFdpbmRvd3MgPSB7fVxuXG5jb25zdCByZXF1ZXN0Q2hhbm5lbCA9ICdpcGMtcmVxdWVzdC1jaGFubmVsJ1xuY29uc3QgcmVzcG9uc2VDaGFubmVsID0gJ2lwYy1yZXNwb25zZS1jaGFubmVsJ1xuXG5jb25zdCBpc0RldmVsb3BtZW50ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuXG5jb25zdCBjcmVhdGVXaW5kb3cgPSAoKSA9PiB7XG5cbiAgbWFpbldpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHt3aWR0aDogODAwLCBoZWlnaHQ6IDYwMH0pXG5cbiAgaWYgKGlzRGV2ZWxvcG1lbnQpIHtcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLm9wZW5EZXZUb29scygpXG4gIH1cblxuICBpZiAoaXNEZXZlbG9wbWVudCkge1xuICAgIG1haW5XaW5kb3cubG9hZFVSTChgaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LkVMRUNUUk9OX1dFQlBBQ0tfV0RTX1BPUlR9YClcbiAgfSBlbHNlIHtcbiAgICBtYWluV2luZG93LmxvYWRVUkwodXJsLmZvcm1hdCh7XG4gICAgICBwYXRobmFtZTogcGF0aC5qb2luKF9fZGlybmFtZSwgJ3VpJywgJ2luZGV4Lmh0bWwnKSxcbiAgICAgIHByb3RvY29sOiAnZmlsZTonLFxuICAgICAgc2xhc2hlczogdHJ1ZVxuICAgIH0pKVxuICB9XG5cbiAgLy8gRW1pdHRlZCB3aGVuIHRoZSB3aW5kb3cgaXMgY2xvc2VkLlxuICBtYWluV2luZG93Lm9uKCdjbG9zZWQnLCAoKSA9PiB7XG4gICAgLy8gVE9ETzogZml4IGJlbG93IHRvIG5vdCBlcnJvciBvbiBjbG9zZVxuICAgIC8vIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhhcHBXaW5kb3dzKVxuICAgIC8vIE9iamVjdC5rZXlzKGFwcFdpbmRvd3MpLmZvckVhY2godyA9PiB7XG4gICAgLy8gICBhcHBXaW5kb3dzW3ddLmNsb3NlKClcbiAgICAvLyB9KVxuICAgIG1haW5XaW5kb3cgPSBudWxsXG4gIH0pXG59XG5cbmNvbnN0IGxhdW5jaEFwcCA9IChhcHBJZCkgPT4ge1xuICBjb25zdCBhcHBXaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XG4gICAgd2lkdGg6IDgwMCxcbiAgICBoZWlnaHQ6IDYwMCxcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgc2FuZGJveDogdHJ1ZSxcbiAgICAgIHByZWxvYWQ6IHBhdGguam9pbihfX2Rpcm5hbWUsICdwcmVsb2FkLmpzJyksXG4gICAgfVxuICB9KVxuICBhcHBXaW5kb3cubG9hZFVSTCh1cmwuZm9ybWF0KHtcbiAgICBwYXRobmFtZTogcGF0aC5qb2luKF9fZGlybmFtZSwgJ2FwcGxpY2F0aW9ucycsIGFwcElkLCBgJHthcHBJZH0uYXNhcmAsICdpbmRleC5odG1sJyksXG4gICAgcHJvdG9jb2w6ICdmaWxlOicsXG4gICAgc2xhc2hlczogdHJ1ZVxuICB9KSlcbiAgYXBwV2luZG93c1thcHBJZF0gPSBhcHBXaW5kb3dcbn1cblxuYXBwLm9uKCdyZWFkeScsIGNyZWF0ZVdpbmRvdylcblxuLy8gUXVpdCB3aGVuIGFsbCB3aW5kb3dzIGFyZSBjbG9zZWQuXG5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgKCkgPT4ge1xuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicpIHtcbiAgICBhcHAucXVpdCgpXG4gIH1cbn0pXG5cbmFwcC5vbignYWN0aXZhdGUnLCAoKSA9PiB7XG4gIC8vIE9uIG1hY09TIGl0J3MgY29tbW9uIHRvIHJlLWNyZWF0ZSBhIHdpbmRvdyBpbiB0aGUgYXBwIHdoZW4gdGhlXG4gIC8vIGRvY2sgaWNvbiBpcyBjbGlja2VkIGFuZCB0aGVyZSBhcmUgbm8gb3RoZXIgd2luZG93cyBvcGVuLlxuICBpZiAobWFpbldpbmRvdyA9PT0gbnVsbCkge1xuICAgIGNyZWF0ZVdpbmRvdygpXG4gIH1cbn0pXG5cbmlwY01haW4ub24oJ2xhdW5jaEFwcCcsIChlLCBhcHBJZCkgPT4ge1xuICBsYXVuY2hBcHAoYXBwSWQpXG59KVxuXG5jb25zdCBzaW1wbGVDbGllbnQgPSB7XG4gIGdldEJhbGFuY2U6ICgpID0+IDEwMDAsXG4gIGdldFB1YmxpY0tleTogKCkgPT4gJ215S2V5Jyxcbn1cblxuY29uc3QgaGFuZGxlUmVxdWVzdCA9IChyZXF1ZXN0KSA9PiB7XG4gIGlmIChyZXF1ZXN0LmRhdGEubWV0aG9kICYmIHNpbXBsZUNsaWVudFtyZXF1ZXN0LmRhdGEubWV0aG9kXSkge1xuICAgIGNvbnN0IGFyZ3MgPSByZXF1ZXN0LmRhdGEuYXJncyB8fCBbXVxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBzaW1wbGVDbGllbnRbcmVxdWVzdC5kYXRhLm1ldGhvZF0oLi4uYXJncylcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgICByZXN1bHQ6IHJlcyxcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGlkOiByZXF1ZXN0LmlkLFxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGVycm9yOiB7XG4gICAgICBtZXNzYWdlOiAnTWV0aG9kIG5vdCBmb3VuZCcsXG4gICAgICBjb2RlOiAzMjYwMSxcbiAgICB9LFxuICAgIGlkOiByZXF1ZXN0LmlkLFxuICB9XG59XG5cbmlwY01haW4ub24ocmVxdWVzdENoYW5uZWwsIGFzeW5jIChldmVudCwgcmVxdWVzdCkgPT4ge1xuICBjb25zdCB3aW5kb3cgPSBCcm93c2VyV2luZG93LmZyb21XZWJDb250ZW50cyhldmVudC5zZW5kZXIpXG4gIGNvbnN0IHNlbmQgPSAoY2hhbm5lbCwgcmVzcG9uc2UpID0+IHtcbiAgICBpZiAoISh3aW5kb3cgJiYgd2luZG93LmlzRGVzdHJveWVkKCkpKSB7XG4gICAgICBldmVudC5zZW5kZXIuc2VuZChjaGFubmVsLCByZXNwb25zZSlcbiAgICB9XG4gIH1cbiAgY29uc3QgcmVzID0gaGFuZGxlUmVxdWVzdChyZXF1ZXN0LCB3aW5kb3cpXG4gIHNlbmQocmVzcG9uc2VDaGFubmVsLCByZXMpXG59KVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main/index.js\n");

/***/ })

};