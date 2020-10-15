(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var $ = require('jquery-browserify');

var _require = require('./resources'),
    Resource = _require.Resource;

var Data = require('../shared/data.js');

module.exports = /*#__PURE__*/function () {
  function ResourceManager(onDone) {
    var _this = this;

    _classCallCheck(this, ResourceManager);

    this.resources = {};
    this.deferArr = [];
    this.loadResources(this.deferArr);
    $.when.apply($, _toConsumableArray(this.deferArr)).then(function () {
      onDone(_this);
    });
  }

  _createClass(ResourceManager, [{
    key: "get",
    value: function get(key) {
      var resource = this.resources[key];

      if (!resource) {
        console.error('Resource ' + key + ' not found!');
      }

      return resource;
    }
  }, {
    key: "loadResource",
    value: function loadResource(location, key, url, deferArr) {
      var deferred = new $.Deferred();
      location[key] = new Image();

      location[key].onload = function () {
        console.log('Resource loaded: ' + url);
        deferred.resolve();
      };

      location[key].onerror = function () {
        console.error('Couldn\'t load resource: ' + url);
      };

      location[key].src = url;
      deferArr.push(deferred);
    }
  }, {
    key: "loadResources",
    value: function loadResources(deferArr) {
      var resourcesToLoad = Object.values(Resource);

      for (var i = 0; i < resourcesToLoad.length; i++) {
        this.loadResource(this.resources, resourcesToLoad[i], '/' + resourcesToLoad[i], deferArr);
      }

      var structureNames = Object.keys(Data.structures);

      for (var _i = 0; _i < structureNames.length; _i++) {
        var name = structureNames[_i];
        var url = '/resources/structures/' + name.toLowerCase().replace(/[ ']/g, '') + '.png';
        this.loadResource(Data.structures[name], 'image', url, deferArr);
      }

      var unitNames = Object.keys(Data.units);

      for (var _i2 = 0; _i2 < unitNames.length; _i2++) {
        var _name = unitNames[_i2];

        var _url = '/resources/units/' + _name.toLowerCase().replace(/[ ']/g, '') + '.png';

        this.loadResource(Data.units[_name], 'image', _url, deferArr);
      }
    }
  }]);

  return ResourceManager;
}();

},{"../shared/data.js":35,"./resources":2,"jquery-browserify":31}],2:[function(require,module,exports){
"use strict";

module.exports.Resource = {
  BLUE_OVERLAY: 'resources/groundTexture/blueOverlay.png',
  RED_OVERLAY: 'resources/groundTexture/redOverlay.png',
  GREEN_OVERLAY: 'resources/groundTexture/greenOverlay.png',
  YELLOW_OVERLAY: 'resources/groundTexture/yellowOverlay.png',
  DEBUG_RING: 'resources/groundTexture/debugRing.png',
  FOG_OF_WAR: 'resources/groundTexture/fogOfWarTranslucent.png',
  DEFAULT_TILE: 'resources/groundTexture/defaultTile.png',
  BRUSH_TILE: 'resources/groundTexture/brushTile.png',
  MINERAL_TILE: 'resources/groundTexture/mineralTile.png',
  BIG_MINERAL_TILE: 'resources/groundTexture/bigMineralTile.png',
  ROCK: 'resources/groundTexture/rock.png',
  HIGH_TILE: 'resources/groundTexture/highTile.png',
  LOW_TILE: 'resources/groundTexture/lowTile.png',
  UI_TOP_RIGHT: 'resources/gui/topRight.png',
  UI_BOTTOM_LEFT: 'resources/gui/bottomLeft.png',
  UI_BOTTOM_RIGHT: 'resources/gui/bottomRight.png',
  UI_TOP: 'resources/gui/top.png',
  UI_TIMER_BAR: 'resources/gui/timerBar.png',
  UI_ICONS: 'resources/gui/icons.png',
  TIER_ICONS: 'resources/gui/tierIcons.png',
  CURSOR: 'resources/cursor.png',
  WIDTH_1_BUILD: 'resources/structures/width1Build.png',
  WIDTH_0_BUILD: 'resources/structures/width0Build.png',
  WIDTH_1_BUILD_ANIM: 'resources/structures/width1BuildAnimation.png',
  WIDTH_0_BUILD_ANIM: 'resources/structures/width0BuildAnimation.png',
  PROBE_ANIM: 'resources/structures/probeAnimation.png',
  ATTACK_PROJECTILE: 'resources/attack/attack.png',
  ATTACK_EXPLODING: 'resources/attack/exploding.png',
  MUZZLE_1: 'resources/muzzle/muzzle1.png',
  MUZZLE_2: 'resources/muzzle/muzzle2.png',
  MUZZLE_3: 'resources/muzzle/muzzle3.png',
  MUZZLE_4: 'resources/muzzle/muzzle4.png',
  MUZZLE_5: 'resources/muzzle/muzzle5.png'
};
module.exports.tiles = [module.exports.Resource.DEFAULT_TILE, module.exports.Resource.BRUSH_TILE, module.exports.Resource.MINERAL_TILE, module.exports.Resource.BIG_MINERAL_TILE, module.exports.Resource.ROCK, module.exports.Resource.HIGH_TILE, module.exports.Resource.LOW_TILE];

},{}],3:[function(require,module,exports){
"use strict";

var _require = require('../shared/coordinates'),
    Tuple = _require.Tuple;

var _require2 = require('../shared/constants'),
    MAP_TILE_DRAW_X_MULTIPLIER = _require2.MAP_TILE_DRAW_X_MULTIPLIER,
    MAP_TILE_DRAW_Y_MULTIPLIER = _require2.MAP_TILE_DRAW_Y_MULTIPLIER;

module.exports = {
  toRadians: function toRadians(angle) {
    return angle * (Math.PI / 180);
  },
  toDegrees: function toDegrees(angle) {
    return angle * (180 / Math.PI);
  },
  distance: function distance(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
  },
  toDrawCoord: function toDrawCoord(nodeOrX, maybeY) {
    if (maybeY !== undefined) {
      return new Tuple(nodeOrX * MAP_TILE_DRAW_X_MULTIPLIER, maybeY * MAP_TILE_DRAW_Y_MULTIPLIER + nodeOrX % 2 * Math.floor(MAP_TILE_DRAW_Y_MULTIPLIER / 2));
    }

    return new Tuple(nodeOrX.x * MAP_TILE_DRAW_X_MULTIPLIER, nodeOrX.y * MAP_TILE_DRAW_Y_MULTIPLIER + nodeOrX.x % 2 * Math.floor(MAP_TILE_DRAW_Y_MULTIPLIER / 2));
  },
  roundToNearest: function roundToNearest(n, roundTo) {
    return Math.round(n / roundTo) * roundTo;
  }
};

},{"../shared/constants":33,"../shared/coordinates":34}],4:[function(require,module,exports){
"use strict";

var axios = require('axios');

var $ = require('jquery-browserify');

var _require = require('../../shared/coordinates'),
    Tuple = _require.Tuple;

var _require2 = require('../../shared/map'),
    setupMap = _require2.setupMap,
    Tile = _require2.Tile;

var _require3 = require('../../client/resources'),
    tiles = _require3.tiles,
    Resource = _require3.Resource;

var _require4 = require('../../client/utils'),
    toDrawCoord = _require4.toDrawCoord;

var ResourceManager = require('../../client/resource-manager');

var Constants = require('../../shared/constants');

var resourceManager = new ResourceManager(mapTick);
var canvas = $('#map')[0];
var context = canvas.getContext('2d');
var map = undefined;
$('#map-option').change(function (data) {
  changeMap($('#map-option').val());
  $('#map-option').blur();
});
var inputState = {
  w: false,
  a: false,
  s: false,
  d: false,
  delta: 0
};
var mouseState = {
  position: new Tuple(0, 0),
  tile: new Tuple(0, 0)
};
var activeBrush = 0;
var KEY_W = 87;
var KEY_A = 65;
var KEY_S = 83;
var KEY_D = 68;
var DIGIT_KEYS = [49, 50, 51, 52, 53, 54, 55, 56];
var CAMERA_SPEED = 20;
$(document).keydown(function (e) {
  if (e.which === KEY_W) inputState.w = true;
  if (e.which === KEY_A) inputState.a = true;
  if (e.which === KEY_S) inputState.s = true;
  if (e.which === KEY_D) inputState.d = true;

  if (DIGIT_KEYS.includes(e.which)) {
    activeBrush = DIGIT_KEYS.indexOf(e.which);
  }
});
$(document).keyup(function (e) {
  if (e.which === KEY_W) inputState.w = false;
  if (e.which === KEY_A) inputState.a = false;
  if (e.which === KEY_S) inputState.s = false;
  if (e.which === KEY_D) inputState.d = false;
});
$(document).mousemove(function (e) {
  var rect = canvas.getBoundingClientRect();
  mouseState.position.x = e.clientX - rect.left;
  mouseState.position.y = e.clientY - rect.top;
  mouseState.tile = new Tuple((mouseState.position.x - width / 2) / cameraZoom + camera.x, (mouseState.position.y - height / 2) / cameraZoom + camera.y).toTileCoord();
});
$(document).mousedown(function (e) {
  mouseState.down = true;
});
$(document).mouseup(function (e) {
  mouseState.down = false;
});
$('#reset').click(function () {
  changeMap($('#map-option').val());
});
window.addEventListener("wheel", function (event) {
  console.log(event.deltaY);
  inputState.delta = event.deltaY;
});
var camera = new Tuple(0, 0);
var cameraZoom = 1.0;
axios.get('/tools/list-maps').then(function (result) {
  console.log(result.data);
  var options = '';
  result.data.forEach(function (option) {
    options += "<option value=\"".concat(option, "\">").concat(option, "</option>");
  });
  $('#map-option').html(options);
  changeMap($('#map-option').val());
})["catch"](function (error) {
  console.error(error);
});

function changeMap(mapName) {
  axios.get('/tools/get-map/' + mapName).then(function (result) {
    map = setupMap(result.data);
    var newCam = toDrawCoord(map.redCommandCenterLocation);
    camera.x = newCam.x;
    camera.y = newCam.y;
    $('#unsaved-changes').text('');
    updateMapData();
    console.log(map);
  })["catch"](function (error) {
    console.error(error);
  });
}

var width;
var height;

function onResize() {
  width = window.innerWidth;
  height = window.innerHeight - 200;
  canvas.width = width;
  canvas.height = height;
  context.width = width;
  context.height = height;
}

window.addEventListener('resize', onResize);
onResize();

function updateMapData() {
  $('#mapData').text(map.data.map(function (row) {
    return '"' + row.map(function (tile) {
      return tile.tileType;
    }).join(' ') + '"';
  }).join(',\n'));
}

function drawImage(img, x, y) {
  var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
  var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
  var angle = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  if (width === -1) width = img.width;
  if (height === -1) height = img.height;

  if (angle === 0) {
    context.drawImage(img, x - width / 2, y - height / 2);
  } else {
    context.translate(x, y);
    context.rotate(angle);
    context.drawImage(img, -width / 2, -height / 2, width, height);
    context.rotate(-angle);
    context.translate(-x, -y);
  }
}

function mapTick() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);
  if (inputState.w) camera.y -= CAMERA_SPEED;
  if (inputState.a) camera.x -= CAMERA_SPEED;
  if (inputState.s) camera.y += CAMERA_SPEED;
  if (inputState.d) camera.x += CAMERA_SPEED;

  if (mouseState.down) {
    if (map && map.data) {
      if (mouseState.tile.x >= 0 && mouseState.tile.y >= 0 && mouseState.tile.x < map.data[0].length && mouseState.tile.y < map.data.length) {
        map.data[mouseState.tile.y][mouseState.tile.x] = new Tile(activeBrush);
        $('#unsaved-changes').text('You have unsaved changes!');
        updateMapData();
      }
    }
  }

  var factor = 1 / cameraZoom;
  var offsetX = width / 2 * factor;
  var offsetY = height / 2 * factor;
  context.save();
  context.scale(cameraZoom, cameraZoom);
  context.translate(-(camera.x - offsetX), -(camera.y - offsetY));
  cameraZoom -= inputState.delta / 5000;
  if (cameraZoom < 0.3) cameraZoom = 0.3;
  if (cameraZoom > 1) cameraZoom = 1;
  inputState.delta *= 0.9;

  if (map !== undefined) {
    for (var y = 0; y < map.data.length; y++) {
      for (var x = 0; x < map.data[0].length; x++) {
        var drawCoord = toDrawCoord(x, y);
        var displayType = map.data[y][x].tileType;

        if (mouseState.tile.equals(new Tuple(x, y))) {
          displayType = activeBrush;
        }

        if (displayType !== 0) {
          drawImage(resourceManager.get(tiles[displayType - 1]), drawCoord.x, drawCoord.y);
        }

        if (mouseState.tile.equals(new Tuple(x, y))) {
          drawImage(resourceManager.get(Resource.DEBUG_RING), drawCoord.x, drawCoord.y);
        }

        context.font = "16px Consolas";
        context.fillText("".concat(x, ", ").concat(y), drawCoord.x - 30, drawCoord.y);
      }
    }
  }

  context.restore();
  requestAnimationFrame(mapTick);
}

},{"../../client/resource-manager":1,"../../client/resources":2,"../../client/utils":3,"../../shared/constants":33,"../../shared/coordinates":34,"../../shared/map":36,"axios":5,"jquery-browserify":31}],5:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":7}],6:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    if (
      (utils.isBlob(requestData) || utils.isFile(requestData)) &&
      requestData.type
    ) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = unescape(encodeURIComponent(config.auth.password)) || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"../core/buildFullPath":13,"../core/createError":14,"./../core/settle":18,"./../helpers/buildURL":22,"./../helpers/cookies":24,"./../helpers/isURLSameOrigin":26,"./../helpers/parseHeaders":28,"./../utils":30}],7:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":8,"./cancel/CancelToken":9,"./cancel/isCancel":10,"./core/Axios":11,"./core/mergeConfig":17,"./defaults":20,"./helpers/bind":21,"./helpers/spread":29,"./utils":30}],8:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],9:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":8}],10:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],11:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"../helpers/buildURL":22,"./../utils":30,"./InterceptorManager":12,"./dispatchRequest":15,"./mergeConfig":17}],12:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":30}],13:[function(require,module,exports){
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/combineURLs":23,"../helpers/isAbsoluteURL":25}],14:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":16}],15:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":10,"../defaults":20,"./../utils":30,"./transformData":19}],16:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],17:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

},{"../utils":30}],18:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":14}],19:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":30}],20:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this,require('_process'))

},{"./adapters/http":6,"./adapters/xhr":6,"./helpers/normalizeHeaderName":27,"./utils":30,"_process":32}],21:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],22:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":30}],23:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],24:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":30}],25:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],26:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":30}],27:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":30}],28:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":30}],29:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],30:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":21}],31:[function(require,module,exports){
// Uses Node, AMD or browser globals to create a module.

// If you want something that will work in other stricter CommonJS environments,
// or if you need to create a circular dependency, see commonJsStrict.js

// Defines a module "returnExports" that depends another module called "b".
// Note that the name of the module is implied by the file name. It is best
// if the file name and the exported global have matching names.

// If the 'b' module also uses this type of boilerplate, then
// in the browser, it will create a global .b that is used below.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.returnExports = factory();
    }
}(this, function () {/*!
 * jQuery JavaScript Library v1.8.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Aug 30 2012 17:17:22 GMT-0400 (Eastern Daylight Time)
 */
return (function( window, undefined ) {
var
	// A central reference to the root jQuery(document)
	rootjQuery,

	// The deferred used on DOM ready
	readyList,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,
	location = window.location,
	navigator = window.navigator,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// Save a reference to some core methods
	core_push = Array.prototype.push,
	core_slice = Array.prototype.slice,
	core_indexOf = Array.prototype.indexOf,
	core_toString = Object.prototype.toString,
	core_hasOwn = Object.prototype.hasOwnProperty,
	core_trim = String.prototype.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,

	// Used for detecting and trimming whitespace
	core_rnotwhite = /\S/,
	core_rspace = /\s+/,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// The ready event handler and self cleanup method
	DOMContentLoaded = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		} else if ( document.readyState === "complete" ) {
			// we're here because readyState === "complete" in oldIE
			// which is good enough for us to call the dom ready!
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	},

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context && context.nodeType ? context.ownerDocument || context : document );

					// scripts is true for back-compat
					selector = jQuery.parseHTML( match[1], doc, true );
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						this.attr.call( selector, context, true );
					}

					return jQuery.merge( this, selector );

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.8.1",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ),
			"slice", core_slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready, 1 );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ core_toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// scripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, scripts ) {
		var parsed;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			scripts = context;
			context = 0;
		}
		context = context || document;

		// Single tag
		if ( (parsed = rsingleTag.exec( data )) ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts ? null : [] );
		return jQuery.merge( [],
			(parsed.cacheable ? jQuery.clone( parsed.fragment ) : parsed.fragment).childNodes );
	},

	parseJSON: function( data ) {
		if ( !data || typeof data !== "string") {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && core_rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var name,
			i = 0,
			length = obj.length,
			isObj = length === undefined || jQuery.isFunction( obj );

		if ( args ) {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.apply( obj[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( obj[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in obj ) {
					if ( callback.call( obj[ name ], name, obj[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( obj[ i ], i, obj[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var type,
			ret = results || [];

		if ( arr != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			type = jQuery.type( arr );

			if ( arr.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( arr ) ) {
				core_push.call( ret, arr );
			} else {
				jQuery.merge( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key,
			ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
		var exec,
			bulk = key == null,
			i = 0,
			length = elems.length;

		// Sets many values
		if ( key && typeof key === "object" ) {
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
			}
			chainable = 1;

		// Sets one value
		} else if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = pass === undefined && jQuery.isFunction( value );

			if ( bulk ) {
				// Bulk operations only iterate when executing function values
				if ( exec ) {
					exec = fn;
					fn = function( elem, key, value ) {
						return exec.call( jQuery( elem ), value );
					};

				// Otherwise they run against the entire set
				} else {
					fn.call( elems, value );
					fn = null;
				}
			}

			if ( fn ) {
				for (; i < length; i++ ) {
					fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
				}
			}

			chainable = 1;
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready, 1 );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.split( core_rspace ), function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" && ( !options.unique || !self.has( arg ) ) ) {
								list.push( arg );
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return jQuery.inArray( fn, list ) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ]( jQuery.isFunction( fn ) ?
								function() {
									var returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								} :
								newDefer[ action ]
							);
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return typeof obj === "object" ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ] = list.fire
			deferred[ tuple[0] ] = list.fire;
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		fragment,
		eventName,
		i,
		isSupported,
		clickFn,
		div = document.createElement("div");

	// Preliminary tests
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName("*");
	a = div.getElementsByTagName("a")[ 0 ];
	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.5/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
		boxModel: ( document.compatMode === "CSS1Compat" ),

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true,
		boxSizingReliable: true,
		pixelPosition: false
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", clickFn = function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent("onclick");
		div.detachEvent( "onclick", clickFn );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	input.setAttribute( "checked", "checked" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "name", "t" );

	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for ( i in {
			submit: true,
			change: true,
			focusin: true
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, div, tds, marginDiv,
			divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
		support.boxSizing = ( div.offsetWidth === 4 );
		support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

		// NOTE: To any future maintainer, we've window.getComputedStyle
		// because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = document.createElement("div");
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";
			div.appendChild( marginDiv );
			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "block";
			div.style.overflow = "visible";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			container.style.zoom = 1;
		}

		// Null elements to avoid leaks in IE
		body.removeChild( container );
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	fragment.removeChild( div );
	all = a = select = opt = input = fragment = div = null;

	return support;
})();
var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	deletedIds: [],

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = jQuery.deletedIds.pop() || ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split(" ");
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject( cache[ id ] ) ) {
				return;
			}
		}

		// Destroy the cache
		if ( isNode ) {
			jQuery.cleanData( [ elem ], true );

		// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
		} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
			delete cache[ id ];

		// When all else fails, null
		} else {
			cache[ id ] = null;
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, part, attr, name, l,
			elem = this[0],
			i = 0,
			data = null;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attr = elem.attributes;
					for ( l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split( ".", 2 );
		parts[1] = parts[1] ? "." + parts[1] : "";
		part = parts[1] + "!";

		return jQuery.access( this, function( value ) {

			if ( value === undefined ) {
				data = this.triggerHandler( "getData" + part, [ parts[0] ] );

				// Try to fetch any internally stored data first
				if ( data === undefined && elem ) {
					data = jQuery.data( elem, key );
					data = dataAttr( elem, key, data );
				}

				return data === undefined && parts[1] ?
					this.data( parts[0] ) :
					data;
			}

			parts[1] = value;
			this.each(function() {
				var self = jQuery( this );

				self.triggerHandler( "setData" + part, parts );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + part, parts );
			});
		}, null, value, arguments.length > 1, null, false );
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				// Only convert to a number if it doesn't change the string
				+data + "" === data ? +data :
				rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery.removeData( elem, type + "queue", true );
				jQuery.removeData( elem, key, true );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook, fixSpecified,
	rclass = /[\t\r\n]/g,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea|)$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var removes, className, elem, c, cl, i, l;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}
		if ( (value && typeof value === "string") || value === undefined ) {
			removes = ( value || "" ).split( core_rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];
				if ( elem.nodeType === 1 && elem.className ) {

					className = (" " + elem.className + " ").replace( rclass, " " );

					// loop over each item in the removal list
					for ( c = 0, cl = removes.length; c < cl; c++ ) {
						// Remove until there is nothing to remove,
						while ( className.indexOf(" " + removes[ c ] + " ") > -1 ) {
							className = className.replace( " " + removes[ c ] + " " , " " );
						}
					}
					elem.className = value ? jQuery.trim( className ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( core_rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val,
				self = jQuery(this);

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	// Unused in 1.8, left in so attrFn-stabbers won't die; remove in 1.9
	attrFn: {},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && jQuery.isFunction( jQuery.fn[ name ] ) ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, isBool,
			i = 0;

		if ( value && elem.nodeType === 1 ) {

			attrNames = value.split( core_rspace );

			for ( ; i < attrNames.length; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;
					isBool = rboolean.test( name );

					// See #9699 for explanation of this approach (setting first, then removal)
					// Do not do this for boolean attributes (see #10870)
					if ( !isBool ) {
						jQuery.attr( elem, name, "" );
					}
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( isBool && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});
var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*|)(?:\.(.+)|)$/,
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var t, tns, type, origType, namespaces, origCount,
			j, events, special, eventType, handleObj,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, "events", true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType,
			type = event.type || event,
			namespaces = [];

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			for ( old = elem; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old === (elem.ownerDocument || document) ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var i, j, cur, ret, selMatch, matched, matches, handleObj, sel, related,
			handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments ),
			run_all = !event.exclusive && !event.namespace,
			special = jQuery.event.special[ event.type ] || {},
			handlerQueue = [];

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers that should run if there are delegated events
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !(event.button && event.type === "click") ) {

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {

				// Don't process clicks (ONLY) on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					selMatch = {};
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];
						sel = handleObj.selector;

						if ( selMatch[ sel ] === undefined ) {
							selMatch[ sel ] = jQuery( sel, this ).index( cur ) >= 0;
						}
						if ( selMatch[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, matches: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328; IE6/7/8)
		event.metaKey = !!event.metaKey;

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8 –
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "_submit_attached" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "_submit_attached", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "_change_attached" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "_change_attached", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) { // && selector != null
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012 jQuery Foundation and other contributors
 *  Released under the MIT license
 *  http://sizzlejs.com/
 */
(function( window, undefined ) {

var dirruns,
	cachedruns,
	assertGetIdNotName,
	Expr,
	getText,
	isXML,
	contains,
	compile,
	sortOrder,
	hasDuplicate,

	baseHasDuplicate = true,
	strundefined = "undefined",

	expando = ( "sizcache" + Math.random() ).replace( ".", "" ),

	document = window.document,
	docElem = document.documentElement,
	done = 0,
	slice = [].slice,
	push = [].push,

	// Augment a function for special use by Sizzle
	markFunction = function( fn, value ) {
		fn[ expando ] = value || true;
		return fn;
	},

	createCache = function() {
		var cache = {},
			keys = [];

		return markFunction(function( key, value ) {
			// Only keep the most recent entries
			if ( keys.push( key ) > Expr.cacheLength ) {
				delete cache[ keys.shift() ];
			}

			return (cache[ key ] = value);
		}, cache );
	},

	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),

	// Regex

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier (http://www.w3.org/TR/css3-selectors/#attribute-selectors)
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	operators = "([*^$|!~]?=)",
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:" + operators + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments not in parens/brackets,
	//   then attribute selectors and non-pseudos (denoted by :),
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + attributes + ")|[^:]|\\\\.)*|.*))\\)|)",

	// For matchExpr.POS and matchExpr.needsContext
	pos = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\(((?:-\\d)?\\d*)\\)|)(?=[^-]|$)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([\\x20\\t\\r\\n\\f>+~])" + whitespace + "*" ),
	rpseudo = new RegExp( pseudos ),

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,

	rnot = /^:not/,
	rsibling = /[\x20\t\r\n\f]*[+~]/,
	rendsWithNot = /:not\($/,

	rheader = /h\d/i,
	rinputs = /input|select|textarea|button/i,

	rbackslash = /\\(?!\\)/g,

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"NAME": new RegExp( "^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|nth|last|first)-child(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"POS": new RegExp( pos, "ig" ),
		// For use in libraries implementing .is()
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|" + pos, "i" )
	},

	// Support

	// Used for testing something on an element
	assert = function( fn ) {
		var div = document.createElement("div");

		try {
			return fn( div );
		} catch (e) {
			return false;
		} finally {
			// release memory in IE
			div = null;
		}
	},

	// Check if getElementsByTagName("*") returns only elements
	assertTagNameNoComments = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	}),

	// Check if getAttribute returns normalized href attributes
	assertHrefNotNormalized = assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
			div.firstChild.getAttribute("href") === "#";
	}),

	// Check if attributes should be retrieved by attribute nodes
	assertAttributes = assert(function( div ) {
		div.innerHTML = "<select></select>";
		var type = typeof div.lastChild.getAttribute("multiple");
		// IE8 returns a string for some attributes even when not present
		return type !== "boolean" && type !== "string";
	}),

	// Check if getElementsByClassName can be trusted
	assertUsableClassName = assert(function( div ) {
		// Opera can't find a second classname (in 9.6)
		div.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
		if ( !div.getElementsByClassName || !div.getElementsByClassName("e").length ) {
			return false;
		}

		// Safari 3.2 caches class attributes and doesn't catch changes
		div.lastChild.className = "e";
		return div.getElementsByClassName("e").length === 2;
	}),

	// Check if getElementById returns elements by name
	// Check if getElementsByName privileges form controls or returns elements by ID
	assertUsableName = assert(function( div ) {
		// Inject content
		div.id = expando + 0;
		div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
		docElem.insertBefore( div, docElem.firstChild );

		// Test
		var pass = document.getElementsByName &&
			// buggy browsers will return fewer than the correct 2
			document.getElementsByName( expando ).length === 2 +
			// buggy browsers will return more than the correct 0
			document.getElementsByName( expando + 0 ).length;
		assertGetIdNotName = !document.getElementById( expando );

		// Cleanup
		docElem.removeChild( div );

		return pass;
	});

// If slice is not available, provide a backup
try {
	slice.call( docElem.childNodes, 0 )[0].nodeType;
} catch ( e ) {
	slice = function( i ) {
		var elem, results = [];
		for ( ; (elem = this[i]); i++ ) {
			results.push( elem );
		}
		return results;
	};
}

function Sizzle( selector, context, results, seed ) {
	results = results || [];
	context = context || document;
	var match, elem, xml, m,
		nodeType = context.nodeType;

	if ( nodeType !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	xml = isXML( context );

	if ( !xml && !seed ) {
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, slice.call(context.getElementsByTagName( selector ), 0) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && assertUsableClassName && context.getElementsByClassName ) {
				push.apply( results, slice.call(context.getElementsByClassName( m ), 0) );
				return results;
			}
		}
	}

	// All others
	return select( selector, context, results, seed, xml );
}

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	return Sizzle( expr, null, null, [ elem ] ).length > 0;
};

// Returns a function to use in pseudos for input types
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

// Returns a function to use in pseudos for buttons
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (see #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	} else {

		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	}
	return ret;
};

isXML = Sizzle.isXML = function isXML( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Element contains another
contains = Sizzle.contains = docElem.contains ?
	function( a, b ) {
		var adown = a.nodeType === 9 ? a.documentElement : a,
			bup = b && b.parentNode;
		return a === bup || !!( bup && bup.nodeType === 1 && adown.contains && adown.contains(bup) );
	} :
	docElem.compareDocumentPosition ?
	function( a, b ) {
		return b && !!( a.compareDocumentPosition( b ) & 16 );
	} :
	function( a, b ) {
		while ( (b = b.parentNode) ) {
			if ( b === a ) {
				return true;
			}
		}
		return false;
	};

Sizzle.attr = function( elem, name ) {
	var attr,
		xml = isXML( elem );

	if ( !xml ) {
		name = name.toLowerCase();
	}
	if ( Expr.attrHandle[ name ] ) {
		return Expr.attrHandle[ name ]( elem );
	}
	if ( assertAttributes || xml ) {
		return elem.getAttribute( name );
	}
	attr = elem.getAttributeNode( name );
	return attr ?
		typeof elem[ name ] === "boolean" ?
			elem[ name ] ? name : null :
			attr.specified ? attr.value : null :
		null;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	order: new RegExp( "ID|TAG" +
		(assertUsableName ? "|NAME" : "") +
		(assertUsableClassName ? "|CLASS" : "")
	),

	// IE6/7 return a modified href
	attrHandle: assertHrefNotNormalized ?
		{} :
		{
			"href": function( elem ) {
				return elem.getAttribute( "href", 2 );
			},
			"type": function( elem ) {
				return elem.getAttribute("type");
			}
		},

	find: {
		"ID": assertGetIdNotName ?
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			} :
			function( id, context, xml ) {
				if ( typeof context.getElementById !== strundefined && !xml ) {
					var m = context.getElementById( id );

					return m ?
						m.id === id || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").value === id ?
							[m] :
							undefined :
						[];
				}
			},

		"TAG": assertTagNameNoComments ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					var elem,
						tmp = [],
						i = 0;

					for ( ; (elem = results[i]); i++ ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			},

		"NAME": function( tag, context ) {
			if ( typeof context.getElementsByName !== strundefined ) {
				return context.getElementsByName( name );
			}
		},

		"CLASS": function( className, context, xml ) {
			if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
				return context.getElementsByClassName( className );
			}
		}
	},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( rbackslash, "" );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr.CHILD
				1 type (only|nth|...)
				2 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				3 xn-component of xn+y argument ([+-]?\d*n|)
				4 sign of xn-component
				5 x of xn-component
				6 sign of y-component
				7 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1] === "nth" ) {
				// nth-child requires argument
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[3] = +( match[3] ? match[4] + (match[5] || 1) : 2 * ( match[2] === "even" || match[2] === "odd" ) );
				match[4] = +( ( match[6] + match[7] ) || match[2] === "odd" );

			// other types prohibit arguments
			} else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match, context, xml ) {
			var unquoted, excess;
			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			if ( match[3] ) {
				match[2] = match[3];
			} else if ( (unquoted = match[4]) ) {
				// Only check arguments that contain a pseudo
				if ( rpseudo.test(unquoted) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, context, xml, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					unquoted = unquoted.slice( 0, excess );
					match[0] = match[0].slice( 0, excess );
				}
				match[2] = unquoted;
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {
		"ID": assertGetIdNotName ?
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					return elem.getAttribute("id") === id;
				};
			} :
			function( id ) {
				id = id.replace( rbackslash, "" );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === id;
				};
			},

		"TAG": function( nodeName ) {
			if ( nodeName === "*" ) {
				return function() { return true; };
			}
			nodeName = nodeName.replace( rbackslash, "" ).toLowerCase();

			return function( elem ) {
				return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
			};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ expando ][ className ];
			if ( !pattern ) {
				pattern = classCache( className, new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)") );
			}
			return function( elem ) {
				return pattern.test( elem.className || (typeof elem.getAttribute !== strundefined && elem.getAttribute("class")) || "" );
			};
		},

		"ATTR": function( name, operator, check ) {
			if ( !operator ) {
				return function( elem ) {
					return Sizzle.attr( elem, name ) != null;
				};
			}

			return function( elem ) {
				var result = Sizzle.attr( elem, name ),
					value = result + "";

				if ( result == null ) {
					return operator === "!=";
				}

				switch ( operator ) {
					case "=":
						return value === check;
					case "!=":
						return value !== check;
					case "^=":
						return check && value.indexOf( check ) === 0;
					case "*=":
						return check && value.indexOf( check ) > -1;
					case "$=":
						return check && value.substr( value.length - check.length ) === check;
					case "~=":
						return ( " " + value + " " ).indexOf( check ) > -1;
					case "|=":
						return value === check || value.substr( 0, check.length + 1 ) === check + "-";
				}
			};
		},

		"CHILD": function( type, argument, first, last ) {

			if ( type === "nth" ) {
				var doneName = done++;

				return function( elem ) {
					var parent, diff,
						count = 0,
						node = elem;

					if ( first === 1 && last === 0 ) {
						return true;
					}

					parent = elem.parentNode;

					if ( parent && (parent[ expando ] !== doneName || !elem.sizset) ) {
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.sizset = ++count;
								if ( node === elem ) {
									break;
								}
							}
						}

						parent[ expando ] = doneName;
					}

					diff = elem.sizset - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
				};
			}

			return function( elem ) {
				var node = elem;

				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						if ( type === "first" ) {
							return true;
						}

						node = elem;

						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}

						return true;
				}
			};
		},

		"PSEUDO": function( pseudo, argument, context, xml ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.pseudos[ pseudo.toLowerCase() ];

			if ( !fn ) {
				Sizzle.error( "unsupported pseudo: " + pseudo );
			}

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( !fn[ expando ] ) {
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return function( elem ) {
						return fn( elem, 0, args );
					};
				}
				return fn;
			}

			return fn( argument, context, xml );
		}
	},

	pseudos: {
		"not": markFunction(function( selector, context, xml ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var matcher = compile( selector.replace( rtrim, "$1" ), context, xml );
			return function( elem ) {
				return !matcher( elem );
			};
		}),

		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			var nodeType;
			elem = elem.firstChild;
			while ( elem ) {
				if ( elem.nodeName > "@" || (nodeType = elem.nodeType) === 3 || nodeType === 4 ) {
					return false;
				}
				elem = elem.nextSibling;
			}
			return true;
		},

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"text": function( elem ) {
			var type, attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				(type = elem.type) === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === type );
		},

		// Input types
		"radio": createInputPseudo("radio"),
		"checkbox": createInputPseudo("checkbox"),
		"file": createInputPseudo("file"),
		"password": createInputPseudo("password"),
		"image": createInputPseudo("image"),

		"submit": createButtonPseudo("submit"),
		"reset": createButtonPseudo("reset"),

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"focus": function( elem ) {
			var doc = elem.ownerDocument;
			return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
		},

		"active": function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},

	setFilters: {
		"first": function( elements, argument, not ) {
			return not ? elements.slice( 1 ) : [ elements[0] ];
		},

		"last": function( elements, argument, not ) {
			var elem = elements.pop();
			return not ? elements : [ elem ];
		},

		"even": function( elements, argument, not ) {
			var results = [],
				i = not ? 1 : 0,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"odd": function( elements, argument, not ) {
			var results = [],
				i = not ? 0 : 1,
				len = elements.length;
			for ( ; i < len; i = i + 2 ) {
				results.push( elements[i] );
			}
			return results;
		},

		"lt": function( elements, argument, not ) {
			return not ? elements.slice( +argument ) : elements.slice( 0, +argument );
		},

		"gt": function( elements, argument, not ) {
			return not ? elements.slice( 0, +argument + 1 ) : elements.slice( +argument + 1 );
		},

		"eq": function( elements, argument, not ) {
			var elem = elements.splice( +argument, 1 );
			return not ? elements : elem;
		}
	}
};

function siblingCheck( a, b, ret ) {
	if ( a === b ) {
		return ret;
	}

	var cur = a.nextSibling;

	while ( cur ) {
		if ( cur === b ) {
			return -1;
		}

		cur = cur.nextSibling;
	}

	return 1;
}

sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		return ( !a.compareDocumentPosition || !b.compareDocumentPosition ?
			a.compareDocumentPosition :
			a.compareDocumentPosition(b) & 4
		) ? -1 : 1;
	} :
	function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

// Always assume the presence of duplicates if sort doesn't
// pass them to our comparison function (as in Google Chrome).
[0, 0].sort( sortOrder );
baseHasDuplicate = !hasDuplicate;

// Document sorting and removing duplicates
Sizzle.uniqueSort = function( results ) {
	var elem,
		i = 1;

	hasDuplicate = baseHasDuplicate;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		for ( ; (elem = results[i]); i++ ) {
			if ( elem === results[ i - 1 ] ) {
				results.splice( i--, 1 );
			}
		}
	}

	return results;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

function tokenize( selector, context, xml, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, group, i,
		preFilters, filters,
		checkContext = !xml && context !== document,
		// Token cache should maintain spaces
		key = ( checkContext ? "<s>" : "" ) + selector.replace( rtrim, "$1<s>" ),
		cached = tokenCache[ expando ][ key ];

	if ( cached ) {
		return parseOnly ? 0 : slice.call( cached, 0 );
	}

	soFar = selector;
	groups = [];
	i = 0;
	preFilters = Expr.preFilter;
	filters = Expr.filter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				soFar = soFar.slice( match[0].length );
				tokens.selector = group;
			}
			groups.push( tokens = [] );
			group = "";

			// Need to make sure we're within a narrower context if necessary
			// Adding a descendant combinator will generate what is needed
			if ( checkContext ) {
				soFar = " " + soFar;
			}
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			group += match[0];
			soFar = soFar.slice( match[0].length );

			// Cast descendant combinators to space
			matched = tokens.push({
				part: match.pop().replace( rtrim, " " ),
				string: match[0],
				captures: match
			});
		}

		// Filters
		for ( type in filters ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				( match = preFilters[ type ](match, context, xml) )) ) {

				group += match[0];
				soFar = soFar.slice( match[0].length );
				matched = tokens.push({
					part: type,
					string: match.shift(),
					captures: match
				});
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Attach the full group as a selector
	if ( group ) {
		tokens.selector = group;
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			slice.call( tokenCache(key, groups), 0 );
}

function addCombinator( matcher, combinator, context, xml ) {
	var dir = combinator.dir,
		doneName = done++;

	if ( !matcher ) {
		// If there is no matcher to check, check against the context
		matcher = function( elem ) {
			return elem === context;
		};
	}
	return combinator.first ?
		function( elem ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 ) {
					return matcher( elem ) && elem;
				}
			}
		} :
		xml ?
			function( elem ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 ) {
						if ( matcher( elem ) ) {
							return elem;
						}
					}
				}
			} :
			function( elem ) {
				var cache,
					dirkey = doneName + "." + dirruns,
					cachedkey = dirkey + "." + cachedruns;
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 ) {
						if ( (cache = elem[ expando ]) === cachedkey ) {
							return elem.sizset;
						} else if ( typeof cache === "string" && cache.indexOf(dirkey) === 0 ) {
							if ( elem.sizset ) {
								return elem;
							}
						} else {
							elem[ expando ] = cachedkey;
							if ( matcher( elem ) ) {
								elem.sizset = true;
								return elem;
							}
							elem.sizset = false;
						}
					}
				}
			};
}

function addMatcher( higher, deeper ) {
	return higher ?
		function( elem ) {
			var result = deeper( elem );
			return result && higher( result === true ? elem : result );
		} :
		deeper;
}

// ["TAG", ">", "ID", " ", "CLASS"]
function matcherFromTokens( tokens, context, xml ) {
	var token, matcher,
		i = 0;

	for ( ; (token = tokens[i]); i++ ) {
		if ( Expr.relative[ token.part ] ) {
			matcher = addCombinator( matcher, Expr.relative[ token.part ], context, xml );
		} else {
			matcher = addMatcher( matcher, Expr.filter[ token.part ].apply(null, token.captures.concat( context, xml )) );
		}
	}

	return matcher;
}

function matcherFromGroupMatchers( matchers ) {
	return function( elem ) {
		var matcher,
			j = 0;
		for ( ; (matcher = matchers[j]); j++ ) {
			if ( matcher(elem) ) {
				return true;
			}
		}
		return false;
	};
}

compile = Sizzle.compile = function( selector, context, xml ) {
	var group, i, len,
		cached = compilerCache[ expando ][ selector ];

	// Return a cached group function if already generated (context dependent)
	if ( cached && cached.context === context ) {
		return cached;
	}

	// Generate a function of recursive functions that can be used to check each element
	group = tokenize( selector, context, xml );
	for ( i = 0, len = group.length; i < len; i++ ) {
		group[i] = matcherFromTokens(group[i], context, xml);
	}

	// Cache the compiled function
	cached = compilerCache( selector, matcherFromGroupMatchers(group) );
	cached.context = context;
	cached.runs = cached.dirruns = 0;
	return cached;
};

function multipleContexts( selector, contexts, results, seed ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results, seed );
	}
}

function handlePOSGroup( selector, posfilter, argument, contexts, seed, not ) {
	var results,
		fn = Expr.setFilters[ posfilter.toLowerCase() ];

	if ( !fn ) {
		Sizzle.error( posfilter );
	}

	if ( selector || !(results = seed) ) {
		multipleContexts( selector || "*", contexts, (results = []), seed );
	}

	return results.length > 0 ? fn( results, argument, not ) : [];
}

function handlePOS( groups, context, results, seed ) {
	var group, part, j, groupLen, token, selector,
		anchor, elements, match, matched,
		lastIndex, currentContexts, not,
		i = 0,
		len = groups.length,
		rpos = matchExpr["POS"],
		// This is generated here in case matchExpr["POS"] is extended
		rposgroups = new RegExp( "^" + rpos.source + "(?!" + whitespace + ")", "i" ),
		// This is for making sure non-participating
		// matching groups are represented cross-browser (IE6-8)
		setUndefined = function() {
			var i = 1,
				len = arguments.length - 2;
			for ( ; i < len; i++ ) {
				if ( arguments[i] === undefined ) {
					match[i] = undefined;
				}
			}
		};

	for ( ; i < len; i++ ) {
		group = groups[i];
		part = "";
		elements = seed;
		for ( j = 0, groupLen = group.length; j < groupLen; j++ ) {
			token = group[j];
			selector = token.string;
			if ( token.part === "PSEUDO" ) {
				// Reset regex index to 0
				rpos.exec("");
				anchor = 0;
				while ( (match = rpos.exec( selector )) ) {
					matched = true;
					lastIndex = rpos.lastIndex = match.index + match[0].length;
					if ( lastIndex > anchor ) {
						part += selector.slice( anchor, match.index );
						anchor = lastIndex;
						currentContexts = [ context ];

						if ( rcombinators.test(part) ) {
							if ( elements ) {
								currentContexts = elements;
							}
							elements = seed;
						}

						if ( (not = rendsWithNot.test( part )) ) {
							part = part.slice( 0, -5 ).replace( rcombinators, "$&*" );
							anchor++;
						}

						if ( match.length > 1 ) {
							match[0].replace( rposgroups, setUndefined );
						}
						elements = handlePOSGroup( part, match[1], match[2], currentContexts, elements, not );
					}
					part = "";
				}

			}

			if ( !matched ) {
				part += selector;
			}
			matched = false;
		}

		if ( part ) {
			if ( rcombinators.test(part) ) {
				multipleContexts( part, elements || [ context ], results, seed );
			} else {
				Sizzle( part, context, results, seed ? seed.concat(elements) : elements );
			}
		} else {
			push.apply( results, elements );
		}
	}

	// Do not sort if this is a single filter
	return len === 1 ? results : Sizzle.uniqueSort( results );
}

function select( selector, context, results, seed, xml ) {
	// Remove excessive whitespace
	selector = selector.replace( rtrim, "$1" );
	var elements, matcher, cached, elem,
		i, tokens, token, lastToken, findContext, type,
		match = tokenize( selector, context, xml ),
		contextNodeType = context.nodeType;

	// POS handling
	if ( matchExpr["POS"].test(selector) ) {
		return handlePOS( match, context, results, seed );
	}

	if ( seed ) {
		elements = slice.call( seed, 0 );

	// To maintain document order, only narrow the
	// set if there is one group
	} else if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		if ( (tokens = slice.call( match[0], 0 )).length > 2 &&
				(token = tokens[0]).part === "ID" &&
				contextNodeType === 9 && !xml &&
				Expr.relative[ tokens[1].part ] ) {

			context = Expr.find["ID"]( token.captures[0].replace( rbackslash, "" ), context, xml )[0];
			if ( !context ) {
				return results;
			}

			selector = selector.slice( tokens.shift().string.length );
		}

		findContext = ( (match = rsibling.exec( tokens[0].string )) && !match.index && context.parentNode ) || context;

		// Reduce the set if possible
		lastToken = "";
		for ( i = tokens.length - 1; i >= 0; i-- ) {
			token = tokens[i];
			type = token.part;
			lastToken = token.string + lastToken;
			if ( Expr.relative[ type ] ) {
				break;
			}
			if ( Expr.order.test(type) ) {
				elements = Expr.find[ type ]( token.captures[0].replace( rbackslash, "" ), findContext, xml );
				if ( elements == null ) {
					continue;
				} else {
					selector = selector.slice( 0, selector.length - lastToken.length ) +
						lastToken.replace( matchExpr[ type ], "" );

					if ( !selector ) {
						push.apply( results, slice.call(elements, 0) );
					}

					break;
				}
			}
		}
	}

	// Only loop over the given elements once
	if ( selector ) {
		matcher = compile( selector, context, xml );
		dirruns = matcher.dirruns++;
		if ( elements == null ) {
			elements = Expr.find["TAG"]( "*", (rsibling.test( selector ) && context.parentNode) || context );
		}

		for ( i = 0; (elem = elements[i]); i++ ) {
			cachedruns = matcher.runs++;
			if ( matcher(elem) ) {
				results.push( elem );
			}
		}
	}

	return results;
}

if ( document.querySelectorAll ) {
	(function() {
		var disconnectedMatch,
			oldSelect = select,
			rescape = /'|\\/g,
			rattributeQuotes = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
			rbuggyQSA = [],
			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			// A support test would require too much code (would include document ready)
			// just skip matchesSelector for :active
			rbuggyMatches = [":active"],
			matches = docElem.matchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.webkitMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector;

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explictly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// IE8 - Some boolean attributes are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here (do not put tests after this one)
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Opera 10-12/IE9 - ^= $= *= and empty values
			// Should not select anything
			div.innerHTML = "<p test=''></p>";
			if ( div.querySelectorAll("[test^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:\"\"|'')" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here (do not put tests after this one)
			div.innerHTML = "<input type='hidden'/>";
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push(":enabled", ":disabled");
			}
		});

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );

		select = function( selector, context, results, seed, xml ) {
			// Only use querySelectorAll when not filtering,
			// when this is not xml,
			// and when no QSA bugs apply
			if ( !seed && !xml && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				if ( context.nodeType === 9 ) {
					try {
						push.apply( results, slice.call(context.querySelectorAll( selector ), 0) );
						return results;
					} catch(qsaError) {}
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var groups, i, len,
						old = context.getAttribute("id"),
						nid = old || expando,
						newContext = rsibling.test( selector ) && context.parentNode || context;

					if ( old ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}

					groups = tokenize(selector, context, xml);
					// Trailing space is unnecessary
					// There is always a context check
					nid = "[id='" + nid + "']";
					for ( i = 0, len = groups.length; i < len; i++ ) {
						groups[i] = nid + groups[i].selector;
					}
					try {
						push.apply( results, slice.call( newContext.querySelectorAll(
							groups.join(",")
						), 0 ) );
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}

			return oldSelect( selector, context, results, seed, xml );
		};

		if ( matches ) {
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				try {
					matches.call( div, "[test!='']:sizzle" );
					rbuggyMatches.push( matchExpr["PSEUDO"].source, matchExpr["POS"].source, "!=" );
				} catch ( e ) {}
			});

			// rbuggyMatches always contains :active, so no need for a length check
			rbuggyMatches = /* rbuggyMatches.length && */ new RegExp( rbuggyMatches.join("|") );

			Sizzle.matchesSelector = function( elem, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace( rattributeQuotes, "='$1']" );

				// rbuggyMatches always contains :active, so no need for an existence check
				if ( !isXML( elem ) && !rbuggyMatches.test( expr ) && (!rbuggyQSA || !rbuggyQSA.test( expr )) ) {
					try {
						var ret = matches.call( elem, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9
								elem.document && elem.document.nodeType !== 11 ) {
							return ret;
						}
					} catch(e) {}
				}

				return Sizzle( expr, null, null, [ elem ] ).length > 0;
			};
		}
	})();
}

// Deprecated
Expr.setFilters["nth"] = Expr.setFilters["eq"];

// Back-compat
Expr.filters = Expr.pseudos;

// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
var runtil = /Until$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	isSimple = /^.[^:#\[\.,]*$/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i, l, length, n, r, ret,
			self = this;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		ret = this.pushStack( "", "find", selector );

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && (
			typeof selector === "string" ?
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				rneedsContext.test( selector ) ?
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			cur = this[i];

			while ( cur && cur.ownerDocument && cur !== context && cur.nodeType !== 11 ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;
				}
				cur = cur.parentNode;
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

jQuery.fn.andSelf = jQuery.fn.addBack;

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( this.length > 1 && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, core_slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rcheckableType = /^(?:checkbox|radio)$/,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
// unless wrapped in a div with non-breaking characters in front of it.
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "X<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( set, this ), "before", this.selector );
		}
	},

	after: function() {
		if ( !isDisconnected( this[0] ) ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		}

		if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			return this.pushStack( jQuery.merge( this, set ), "after", this.selector );
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( elem.getElementsByTagName( "*" ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function( value ) {
		if ( !isDisconnected( this[0] ) ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		}

		return this.length ?
			this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
			this;
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {

		// Flatten any nested arrays
		args = [].concat.apply( [], args );

		var results, first, fragment, iNoClone,
			i = 0,
			value = args[0],
			scripts = [],
			l = this.length;

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && l > 1 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call( this, i, table ? self.html() : undefined );
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			results = jQuery.buildFragment( args, this, scripts );
			fragment = results.fragment;
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				// Fragments from the fragment cache must always be cloned and never used in place.
				for ( iNoClone = results.cacheable || l - 1; i < l; i++ ) {
					callback.call(
						table && jQuery.nodeName( this[i], "table" ) ?
							findOrAppend( this[i], "tbody" ) :
							this[i],
						i === iNoClone ?
							fragment :
							jQuery.clone( fragment, true, true )
					);
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;

			if ( scripts.length ) {
				jQuery.each( scripts, function( i, elem ) {
					if ( elem.src ) {
						if ( jQuery.ajax ) {
							jQuery.ajax({
								url: elem.src,
								type: "GET",
								dataType: "script",
								async: false,
								global: false,
								"throws": true
							});
						} else {
							jQuery.error("no ajax");
						}
					} else {
						jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "" ) );
					}

					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				});
			}
		}

		return this;
	}
});

function findOrAppend( elem, tag ) {
	return elem.getElementsByTagName( tag )[0] || elem.appendChild( elem.ownerDocument.createElement( tag ) );
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	if ( nodeName === "object" ) {
		// IE6-10 improperly clones children of object elements using classid.
		// IE10 throws NoModificationAllowedError if parent is null, #12132.
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML)) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;

	// IE blanks contents when cloning scripts
	} else if ( nodeName === "script" && dest.text !== src.text ) {
		dest.text = src.text;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, context, scripts ) {
	var fragment, cacheable, cachehit,
		first = args[ 0 ];

	// Set context from what may come in as undefined or a jQuery collection or a node
	// Updated to fix #12266 where accessing context[0] could throw an exception in IE9/10 &
	// also doubles as fix for #8950 where plain objects caused createDocumentFragment exception
	context = context || document;
	context = !context.nodeType && context[0] || context;
	context = context.ownerDocument || context;

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && context === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		// Mark cacheable and look for a hit
		cacheable = true;
		fragment = jQuery.fragments[ first ];
		cachehit = fragment !== undefined;
	}

	if ( !fragment ) {
		fragment = context.createDocumentFragment();
		jQuery.clean( args, context, fragment, scripts );

		// Update the cache, but only store false
		// unless this is a second parsing of the same content
		if ( cacheable ) {
			jQuery.fragments[ first ] = cachehit && fragment;
		}
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			l = insert.length,
			parent = this.length === 1 && this[0].parentNode;

		if ( (parent == null || parent && parent.nodeType === 11 && parent.childNodes.length === 1) && l === 1 ) {
			insert[ original ]( this[0] );
			return this;
		} else {
			for ( ; i < l; i++ ) {
				elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			clone;

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var i, j, elem, tag, wrap, depth, div, hasBody, tbody, len, handleScript, jsTags,
			safe = context === document && safeFragment,
			ret = [];

		// Ensure that context is a document
		if ( !context || typeof context.createDocumentFragment === "undefined" ) {
			context = document;
		}

		// Use the already-created safe fragment if context permits
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Ensure a safe container in which to render the html
					safe = safe || createSafeFragment( context );
					div = context.createElement("div");
					safe.appendChild( div );

					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Go to html and back, then peel off extra wrappers
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					depth = wrap[0];
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						hasBody = rtbody.test(elem);
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;

					// Take out of fragment container (we need a fresh div each time)
					div.parentNode.removeChild( div );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				jQuery.merge( ret, elem );
			}
		}

		// Fix #11356: Clear elements from safeFragment
		if ( div ) {
			elem = div = safe = null;
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				if ( jQuery.nodeName( elem, "input" ) ) {
					fixDefaultChecked( elem );
				} else if ( typeof elem.getElementsByTagName !== "undefined" ) {
					jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
				}
			}
		}

		// Append elements to a provided document fragment
		if ( fragment ) {
			// Special handling of each script element
			handleScript = function( elem ) {
				// Check if we consider it executable
				if ( !elem.type || rscriptType.test( elem.type ) ) {
					// Detach the script and store it in the scripts array (if provided) or the fragment
					// Return truthy to indicate that it has been handled
					return scripts ?
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :
						fragment.appendChild( elem );
				}
			};

			for ( i = 0; (elem = ret[i]) != null; i++ ) {
				// Check if we're done after handling an executable script
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {
					// Append to fragment and handle embedded scripts
					fragment.appendChild( elem );
					if ( typeof elem.getElementsByTagName !== "undefined" ) {
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript );

						// Splice the scripts into ret after their former ancestor and advance our index beyond them
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						i += jsTags.length;
					}
				}
			}
		}

		return ret;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var data, id, elem, type,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( elem.removeAttribute ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						jQuery.deletedIds.push( id );
					}
				}
			}
		}
	}
});
// Limit scope pollution from any deprecated API
(function() {

var matched, browser;

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// jQuery.uaMatch maintained for back-compat
jQuery.uaMatch = function( ua ) {
	ua = ua.toLowerCase();

	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
		/(msie) ([\w.]+)/.exec( ua ) ||
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
		[];

	return {
		browser: match[ 1 ] || "",
		version: match[ 2 ] || "0"
	};
};

matched = jQuery.uaMatch( navigator.userAgent );
browser = {};

if ( matched.browser ) {
	browser[ matched.browser ] = true;
	browser.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
	browser.webkit = true;
} else if ( browser.webkit ) {
	browser.safari = true;
}

jQuery.browser = browser;

jQuery.sub = function() {
	function jQuerySub( selector, context ) {
		return new jQuerySub.fn.init( selector, context );
	}
	jQuery.extend( true, jQuerySub, this );
	jQuerySub.superclass = this;
	jQuerySub.fn = jQuerySub.prototype = this();
	jQuerySub.fn.constructor = jQuerySub;
	jQuerySub.sub = this.sub;
	jQuerySub.fn.init = function init( selector, context ) {
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
			context = jQuerySub( context );
		}

		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
	};
	jQuerySub.fn.init.prototype = jQuerySub.fn;
	var rootjQuerySub = jQuerySub(document);
	return jQuerySub;
};

})();
var curCSS, iframe, iframeDoc,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([-+])=(" + core_pnum + ")", "i" ),
	elemdisplay = {},

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],

	eventsToggle = jQuery.fn.toggle;

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var elem, display,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		values[ index ] = jQuery._data( elem, "olddisplay" );
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && elem.style.display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {
			display = curCSS( elem, "display" );

			if ( !values[ index ] && display !== "none" ) {
				jQuery._data( elem, "olddisplay", display );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state, fn2 ) {
		var bool = typeof state === "boolean";

		if ( jQuery.isFunction( state ) && jQuery.isFunction( fn2 ) ) {
			return eventsToggle.apply( this, arguments );
		}

		return this.each(function() {
			if ( bool ? state : isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;

				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, numeric, extra ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( numeric || extra !== undefined ) {
			num = parseFloat( val );
			return numeric || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

// NOTE: To any future maintainer, we've window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	curCSS = function( elem, name ) {
		var ret, width, minWidth, maxWidth,
			computed = window.getComputedStyle( elem, null ),
			style = elem.style;

		if ( computed ) {

			ret = computed[ name ];
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	curCSS = function( elem, name ) {
		var left, rsLeft,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			// we use jQuery.css instead of curCSS here
			// because of the reliableMarginRight CSS hook!
			val += jQuery.css( elem, extra + cssExpand[ i ], true );
		}

		// From this point on we use curCSS for maximum performance (relevant in animations)
		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += parseFloat( curCSS( elem, "padding" + cssExpand[ i ] ) ) || 0;

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += parseFloat( curCSS( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		valueIsBorderBox = true,
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox
		)
	) + "px";
}


// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	if ( elemdisplay[ nodeName ] ) {
		return elemdisplay[ nodeName ];
	}

	var elem = jQuery( "<" + nodeName + ">" ).appendTo( document.body ),
		display = elem.css("display");
	elem.remove();

	// If the simple way fails,
	// get element's real default display by attaching it to a temp iframe
	if ( display === "none" || display === "" ) {
		// Use the already-created iframe if possible
		iframe = document.body.appendChild(
			iframe || jQuery.extend( document.createElement("iframe"), {
				frameBorder: 0,
				width: 0,
				height: 0
			})
		);

		// Create a cacheable copy of the iframe document on first call.
		// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
		// document to it; WebKit & Firefox won't allow reusing the iframe document.
		if ( !iframeDoc || !iframe.createElement ) {
			iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
			iframeDoc.write("<!doctype html><html><body>");
			iframeDoc.close();
		}

		elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

		display = curCSS( elem, "display" );
		document.body.removeChild( iframe );
	}

	// Store the correct default display
	elemdisplay[ nodeName ] = display;

	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				if ( elem.offsetWidth === 0 && rdisplayswap.test( curCSS( elem, "display" ) ) ) {
					return jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					});
				} else {
					return getWidthOrHeight( elem, name, extra );
				}
			}
		},

		set: function( elem, value, extra ) {
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing" ) === "border-box"
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
				style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						return curCSS( elem, "marginRight" );
					}
				});
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						var ret = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( ret ) ? jQuery( elem ).position()[ prop ] + "px" : ret;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		return ( elem.offsetWidth === 0 && elem.offsetHeight === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || curCSS( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i,

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ],
				expanded = {};

			for ( i = 0; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	rselectTextarea = /^(?:select|textarea)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
var // Document location
	ajaxLocation,
	// Document location segments
	ajaxLocParts,

	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType, list, placeBefore,
			dataTypes = dataTypeExpression.toLowerCase().split( core_rspace ),
			i = 0,
			length = dataTypes.length;

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var selection,
		list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters );

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	// Don't do a request if no elements are being requested
	if ( !this.length ) {
		return this;
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// Request the remote document
	jQuery.ajax({
		url: url,

		// if "type" variable is undefined, then "GET" method will be used
		type: type,
		dataType: "html",
		data: params,
		complete: function( jqXHR, status ) {
			if ( callback ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			}
		}
	}).done(function( responseText ) {

		// Save response for use in complete callback
		response = arguments;

		// See if a selector was specified
		self.html( selector ?

			// Create a dummy div to hold the results
			jQuery("<div>")

				// inject the contents of the document in, removing the scripts
				// to avoid any 'Permission Denied' errors in IE
				.append( responseText.replace( rscript, "" ) )

				// Locate the specified elements
				.find( selector ) :

			// If not, just inject the full result
			responseText );

	});

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // ifModified key
			ifModifiedKey,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || strAbort;
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ ifModifiedKey ] = modified;
					}
					modified = jqXHR.getResponseHeader("Etag");
					if ( modified ) {
						jQuery.etag[ ifModifiedKey ] = modified;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					isSuccess = ajaxConvert( s, response );
					statusText = isSuccess.state;
					success = isSuccess.data;
					error = isSuccess.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.always( tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( core_rspace );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();

		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	var conv, conv2, current, tmp,
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice(),
		prev = dataTypes[ 0 ],
		converters = {},
		i = 0;

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	// Convert to each sequential dataType, tolerating list modification
	for ( ; (current = dataTypes[++i]); ) {

		// There's only work to do if current dataType is non-auto
		if ( current !== "*" ) {

			// Convert response if prev dataType is non-auto and differs from current
			if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split(" ");
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.splice( i--, 0, current );
								}

								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s["throws"] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}

			// Update prev for next iteration
			prev = current;
		}
	}

	return { state: "success", data: response };
}
var oldCallbacks = [],
	rquestion = /\?/,
	rjsonp = /(=)\?(?=&|$)|\?\?/,
	nonce = jQuery.now();

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		data = s.data,
		url = s.url,
		hasCallback = s.jsonp !== false,
		replaceInUrl = hasCallback && rjsonp.test( url ),
		replaceInData = hasCallback && !replaceInUrl && typeof data === "string" &&
			!( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") &&
			rjsonp.test( data );

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( s.dataTypes[ 0 ] === "jsonp" || replaceInUrl || replaceInData ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;
		overwritten = window[ callbackName ];

		// Insert callback into url or form data
		if ( replaceInUrl ) {
			s.url = url.replace( rjsonp, "$1" + callbackName );
		} else if ( replaceInData ) {
			s.data = data.replace( rjsonp, "$1" + callbackName );
		} else if ( hasCallback ) {
			s.url += ( rquestion.test( url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});
var xhrCallbacks,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									try {
										responses.text = xhr.responseText;
									} catch( _ ) {
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback, 0 );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([-+])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var end, unit, prevScale,
				tween = this.createTween( prop, value ),
				parts = rfxnum.exec( value ),
				target = tween.cur(),
				start = +target || 0,
				scale = 1;

			if ( parts ) {
				end = +parts[2];
				unit = parts[3] || ( jQuery.cssNumber[ prop ] ? "" : "px" );

				// We need to compute starting value
				if ( unit !== "px" && start ) {
					// Iteratively approximate from a nonzero starting point
					// Prefer the current property, because this process will be trivial if it uses the same units
					// Fallback to end or a simple constant
					start = jQuery.css( tween.elem, prop, true ) || end || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						prevScale = scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

						// Update scale, tolerating zeroes from tween.cur()
						scale = tween.cur() / target;

					// Stop looping if we've hit the mark or scale is unchanged
					} while ( scale !== 1 && scale !== prevScale );
				}

				tween.unit = unit;
				tween.start = start;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
			}
			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	}, 0 );
	return ( fxNow = jQuery.now() );
}

function createTweens( animation, props ) {
	jQuery.each( props, function( prop, value ) {
		var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( collection[ index ].call( animation, prop, value ) ) {

				// we're done with this property
				return;
			}
		}
	});
}

function Animation( elem, properties, options ) {
	var result,
		index = 0,
		tweenerIndex = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				percent = 1 - ( remaining / animation.duration || 0 ),
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end, easing ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	createTweens( animation, props );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			anim: animation,
			queue: animation.opts.queue,
			elem: elem
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	var index, prop, value, length, dataShow, tween, hooks, oldfire,
		anim = this,
		style = elem.style,
		orig = {},
		handled = [],
		hidden = elem.nodeType && isHidden( elem );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.done(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( index in props ) {
		value = props[ index ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ index ];
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			handled.push( index );
		}
	}

	length = handled.length;
	if ( length ) {
		dataShow = jQuery._data( elem, "fxshow" ) || jQuery._data( elem, "fxshow", {} );
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery.removeData( elem, "fxshow", true );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( index = 0 ; index < length ; index++ ) {
			prop = handled[ index ];
			tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
			orig[ prop ] = dataShow[ prop ] || jQuery.style( elem, prop );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing any value as a 4th parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, false, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Remove in 2.0 - this supports IE8's panic based approach
// to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ||
			// special check for .toggle( handler, handler, ... )
			( !i && jQuery.isFunction( speed ) && jQuery.isFunction( easing ) ) ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations resolve immediately
				if ( empty ) {
					anim.stop( true );
				}
			};

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) && !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.interval = 13;

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
var rroot = /^(?:body|html)$/i;

jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var box, docElem, body, win, clientTop, clientLeft, scrollTop, scrollLeft, top, left,
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	if ( (body = doc.body) === elem ) {
		return jQuery.offset.bodyOffset( elem );
	}

	docElem = doc.documentElement;

	// Make sure we're not dealing with a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return { top: 0, left: 0 };
	}

	box = elem.getBoundingClientRect();
	win = getWindow( doc );
	clientTop  = docElem.clientTop  || body.clientTop  || 0;
	clientLeft = docElem.clientLeft || body.clientLeft || 0;
	scrollTop  = win.pageYOffset || docElem.scrollTop;
	scrollLeft = win.pageXOffset || docElem.scrollLeft;
	top  = box.top  + scrollTop  - clientTop;
	left = box.left + scrollLeft - clientLeft;

	return { top: top, left: left };
};

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || document.body;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					 top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, value, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}

return jQuery;

})( window ); }));

},{}],32:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],33:[function(require,module,exports){
(function (process){
"use strict";

var is_production = process.env.NODE_ENV === 'production';
module.exports = {
  RED_CHAT_COLOR: 'red',
  BLUE_CHAT_COLOR: 'dodgerblue',
  YELLOW_CHAT_COLOR: '#f0e130',
  STARTING_GOLD: is_production ? 1000 : 100000,
  BUILD_RANGE: 3,
  BUILDING_VISION_RANGE: 5,
  TIME_IN_SECONDS_BEFORE_GAME_START: is_production ? 10 : 3,
  IS_PRODUCTION: is_production,
  PROBE_RANGE: 1,
  BRUSH_VISION: 2,
  MAP_TILE_DRAW_X_MULTIPLIER: 96,
  MAP_TILE_DRAW_Y_MULTIPLIER: 111,
  PHASE_ACTION: 'phase_action',
  PHASE_PLANNING: 'phase_planning',
  PLANNING_TIME: is_production ? 20 : 5,
  ACTION_MAX_TIME: 10,
  PERCENTAGE_CLAIM_TO_WIN: 0.35,
  TIME_BEFORE_ACTION_TO_PLANNING: is_production ? 1 : 0
};

}).call(this,require('_process'))

},{"_process":32}],34:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Constants = require('./constants');

var Tuple = /*#__PURE__*/function () {
  function Tuple(x, y) {
    _classCallCheck(this, Tuple);

    this.x = x;
    this.y = y;
  }

  _createClass(Tuple, [{
    key: "toCubeCoordinates",
    value: function toCubeCoordinates() {
      var cubex = this.x;
      var cubez = this.y - (this.x - this.x % 2) / 2;
      var cubey = -cubex - cubez;
      return new Triple(cubex, cubey, cubez);
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this.x === other.x && this.y === other.y;
    }
  }, {
    key: "hash",
    value: function hash() {
      return JSON.stringify(this);
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Tuple(this.x, this.y);
    }
  }, {
    key: "distance",
    value: function distance(other) {
      return this.toCubeCoordinates().distance(new Tuple(other.x, other.y).toCubeCoordinates());
    }
  }, {
    key: "toTileCoord",
    value: function toTileCoord() {
      var XYVertex = false;
      var s = Constants.MAP_TILE_DRAW_X_MULTIPLIER * (2 / 3);
      var t = Constants.MAP_TILE_DRAW_X_MULTIPLIER / 3;
      var r = Constants.MAP_TILE_DRAW_Y_MULTIPLIER / 2;
      var h = Constants.MAP_TILE_DRAW_Y_MULTIPLIER;
      var mx = parseInt(this.x) + 64;
      var my = parseInt(this.y) + 55; //correction for BORDERS and XYVertex

      if (XYVertex) mx += t;
      var x = parseInt(mx / (s + t)); //this gives a quick value for x. It works only on odd cols and doesn't handle the triangle sections. It assumes that the hexagon is a rectangle with width s+t (=1.5*s).

      var y = parseInt((my - x % 2 * r) / h); //this gives the row easily. It needs to be offset by h/2 (=r)if it is in an even column

      /******FIX for clicking in the triangle spaces (on the left side only)*******/
      //dx,dy are the number of pixels from the hex boundary. (ie. relative to the hex clicked in)

      var dx = mx - x * (s + t);
      var dy = my - y * h;
      var result = Tuple.NEG_ONE;

      if (my - x % 2 * r > 0) {
        //prevent clicking half empty
        if (x % 2 === 0) {
          if (dy > r) {
            //bottom half of hexes
            if (dx * r / t < dy - r) {
              x--;
            }
          }

          if (dy < r) {
            //top half of hexes
            if ((t - dx) * r / t > dy) {
              x--;
              y--;
            }
          }
        } else {
          // odd columns
          if (dy > h) {
            //bottom half of hexes
            if (dx * r / t < dy - h) {
              x--;
              y++;
            }
          }

          if (dy < h) {
            //top half of hexes
            if ((t - dx) * r / t > dy - r) {
              x--;
            }
          }
        }

        result = new Tuple(x, y);
      }

      return result;
    }
  }]);

  return Tuple;
}();

Tuple.ZERO = new Tuple(0, 0);
Tuple.NEG_ONE = new Tuple(-1, -1);
module.exports.Tuple = Tuple;

var Triple = /*#__PURE__*/function () {
  function Triple(x, y, z) {
    _classCallCheck(this, Triple);

    this.x = x;
    this.y = y;
    this.z = z;
  }

  _createClass(Triple, [{
    key: "toOffsetCoordinates",
    value: function toOffsetCoordinates() {
      var cubex = this.x;
      var cubey = this.z + (this.x - this.x % 2) / 2;
      return new Tuple(cubex, cubey);
    }
  }, {
    key: "getNeighbours",
    value: function getNeighbours() {
      return surroundingTriple(this, 1);
    }
  }, {
    key: "equals",
    value: function equals(other) {
      return this.x === other.x && this.y === other.y && this.z === other.z;
    }
  }, {
    key: "hash",
    value: function hash() {
      return JSON.stringify(this);
    }
  }, {
    key: "distance",
    value: function distance(other) {
      return (Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z)) / 2;
    }
  }]);

  return Triple;
}();

module.exports.Triple = Triple;

function surroundingTriple(a, width) {
  var results = [];

  for (var dx = -width; dx <= width; dx++) {
    for (var dy = Math.max(-width, -dx - width); dy <= Math.min(width, -dx + width); dy++) {
      var dz = -dx - dy;
      results.push(new Triple(a.x + dx, a.y + dy, a.z + dz));
    }
  }

  return results;
}

module.exports.getSurrounding = function (a, width) {
  a = new Tuple(a.x, a.y).toCubeCoordinates();
  return surroundingTriple(a, width).map(function (n) {
    return n.toOffsetCoordinates();
  });
};

module.exports.getReachable = function (start, max, isBlock) {
  start = new Tuple(start.x, start.y).toCubeCoordinates();
  /* Distance limited flood fill */

  var visited = new Set();
  var result = [];
  visited.add(JSON.stringify(start));
  result.push(start.toOffsetCoordinates());
  var fringes = [];
  fringes.push([start]);

  var _loop = function _loop(i) {
    fringes.push([]);
    fringes[i].forEach(function (hex) {
      hex.getNeighbours().forEach(function (neighbour) {
        var neighbourString = JSON.stringify(neighbour);

        if (!visited.has(neighbourString) && !isBlock(neighbour.toOffsetCoordinates())) {
          visited.add(neighbourString);
          result.push(neighbour.toOffsetCoordinates());
          fringes[i + 1].push(neighbour);
        }
      });
    });
  };

  for (var i = 0; i < max; i++) {
    _loop(i);
  }

  return result;
};

module.exports.tupleDistance = function (a, b) {
  return new Tuple(a.x, a.y).distance(b);
};

},{"./constants":33}],35:[function(require,module,exports){
"use strict";

var Constants = require('./constants');

var structures = {
  'Command Base': {
    'description': 'Main Base. Defend yours while destroying opponent\'s.',
    'health': 250,
    'shield': 0,
    'width': 1,
    'turnsToBuild': 0,
    'options': [{
      'title': 'Spawn Scout',
      'cost': 100,
      'prereq': [],
      'type': 'Unit',
      'description': '{Scout}',
      'icon': '{Scout}',
      'command': 'spawn-Scout'
    }, {
      'title': 'Spawn Engineer',
      'cost': 300,
      'prereq': [],
      'type': 'Unit',
      'description': '{Engineer}',
      'icon': '{Engineer}',
      'command': 'spawn-Engineer'
    }],
    'targetable': false
  },
  'Barracks': {
    'description': 'Unit production building, trains tier 2 units.',
    'health': 200,
    'shield': 0,
    'width': 0,
    'turnsToBuild': 1,
    'options': [{
      'title': 'Spawn Marine',
      'cost': 250,
      'prereq': [],
      'type': 'Unit',
      'description': '{Marine}',
      'icon': '{Marine}',
      'command': 'spawn-Marine'
    }, {
      'title': 'Spawn Golem',
      'cost': 250,
      'prereq': [],
      'type': 'Unit',
      'description': '{Golem}',
      'icon': '{Golem}',
      'command': 'spawn-Golem'
    }, {
      'title': 'Spawn Reaver',
      'cost': 500,
      'prereq': ['Automation Factory'],
      'type': 'Unit',
      'description': '{Reaver}',
      'icon': '{Reaver}',
      'command': 'spawn-Reaver'
    }]
  },
  'Automation Factory': {
    'description': 'Support facility, required for building turrets and reavers.',
    'health': 75,
    'shield': 0,
    'width': 0,
    'turnsToBuild': 1,
    'options': []
  },
  'Tech Lab': {
    'description': 'Support facility, used for accessing tier 3 units.',
    'health': 100,
    'shield': 0,
    'width': 0,
    'turnsToBuild': 1,
    'options': []
  },
  'Military Academy': {
    'description': 'Support facility, used for accessing tier 4 units.',
    'health': 100,
    'shield': 0,
    'width': 0,
    'turnsToBuild': 1,
    'options': []
  },
  'Deployment Outpost': {
    'description': 'Claims territory and allows expansion of buildings away from the command center.',
    'health': 200,
    'shield': 0,
    'width': 0,
    'turnsToBuild': 1,
    'options': []
  },
  'Ether Harvester': {
    // The harvester health represents amount of gold provided.
    'description': 'Harvester for small, blue minerals.',
    'health': 10000,
    'shield': 0,
    'width': 0,
    'turnsToBuild': 0,
    'options': [],
    'custom': {
      'value': 100
    },
    'targetable': false
  },
  'Gem Harvester': {
    'description': 'Harvester for large, purple minerals.',
    'health': 15000,
    'shield': 0,
    'width': 0,
    'turnsToBuild': 0,
    'options': [],
    'custom': {
      'value': 200
    },
    'targetable': false
  },
  'Stim Lab': {
    'description': 'Takes 2 turns to build. Enhances attack speed of all allies by 25%.',
    'health': 250,
    'shield': 0,
    'width': 0,
    'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
    'options': [],
    'custom': {
      'attackSpeedMultiplier': 1.25
    }
  },
  "Thieves' Cave": {
    'description': 'Takes 2 turns to build. Ally attacks generate gold equal to 150% of damage dealt.',
    'health': 250,
    'shield': 0,
    'width': 0,
    'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
    'options': [],
    'custom': {
      'attackGoldGen': 1.50
    }
  },
  "Artillery Bay": {
    'description': 'Takes 2 turns to build. Enhances attack damage of all allies by 25%.',
    'health': 250,
    'shield': 0,
    'width': 0,
    'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
    'options': [],
    'custom': {
      'attackDamageMultiplier': 1.25
    }
  },
  "Cloud Gate": {
    'description': 'Takes 2 turns to build. Enhances movement range of all allies by 3.',
    'health': 250,
    'shield': 0,
    'width': 0,
    'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
    'options': [],
    'custom': {
      'moveRangeDelta': 3
    }
  },
  "Vitality Fountain": {
    'description': 'Takes 2 turns to build. Enhances health of all allies by 50%.',
    'health': 250,
    'shield': 0,
    'width': 0,
    'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
    'options': [],
    'custom': {
      'healthMultiplier': 1.50
    }
  },
  "Turret": {
    'description': 'Requires Automation Factory. Stationary, single-target ranged turret.',
    // The health is irrelevant because this gets converted to an Armed Turret on action
    //   start
    'health': 1,
    'shield': 0,
    'width': 0,
    'turnsToBuild': 1,
    'options': []
  }
};
var units = {
  'Scout': {
    'attackRange': 0,
    'attackSpeed': 0,
    'damage': 0,
    'description': 'Scouting unit, high movement range, cannot attack.',
    'health': 15,
    'moveRange': 8,
    'shield': 0,
    'sightRange': 5,
    'tier': 1,
    'turnsToBuild': 1,
    'options': []
  },
  'Marine': {
    'attackRange': 2,
    'attackSpeed': 0.8,
    'damage': 5,
    'description': 'Sturdy and cheap-to-produce infantry unit.',
    'health': 40,
    'moveRange': 5,
    'shield': 0,
    'sightRange': 3,
    'tier': 1,
    'turnsToBuild': 1,
    'options': [],
    'custom': {
      'muzzle': {
        'x': 0,
        'y': -65
      }
    }
  },
  'Engineer': {
    'attackRange': 0,
    'attackSpeed': 0,
    'damage': 0,
    'description': 'Constructs buildings during the planning phase.',
    'health': 12,
    'moveRange': 3,
    'shield': 0,
    'sightRange': 3,
    'tier': 1,
    'turnsToBuild': 1,
    'options': [{
      'title': 'Build Deployment Outpost',
      'cost': 400,
      'prereq': [],
      'type': 'Structure',
      'description': '{Deployment Outpost}',
      'icon': '{Deployment Outpost}',
      'command': 'build-Deployment Outpost'
    }, {
      'title': 'Build Barracks',
      'cost': 400,
      'prereq': [],
      'type': 'Structure',
      'description': '{Barracks}',
      'icon': '{Barracks}',
      'command': 'build-Barracks'
    }, {
      'title': 'Build Automation Factory',
      'cost': 100,
      'prereq': [],
      'type': 'Structure',
      'description': '{Automation Factory}',
      'icon': '{Automation Factory}',
      'command': 'build-Automation Factory'
    }, {
      'title': 'Build Turret',
      'cost': 350,
      'prereq': ['Automation Factory'],
      'type': 'Structure',
      'description': '{Turret}',
      'icon': '{Turret}',
      'command': 'build-Turret'
    }, {
      'title': 'Build Stim Lab',
      'cost': 2000,
      'prereq': [],
      'type': 'Structure',
      'description': '{Stim Lab}',
      'icon': '{Stim Lab}',
      'command': 'build-Stim Lab'
    }, {
      'title': "Build Thieves' Cave",
      'cost': 2000,
      'prereq': [],
      'type': 'Structure',
      'description': "{Thieves' Cave}",
      'icon': "{Thieves' Cave}",
      'command': "build-Thieves' Cave"
    }, {
      'title': 'Build Artillery Bay',
      'cost': 2000,
      'prereq': [],
      'type': 'Structure',
      'description': '{Artillery Bay}',
      'icon': '{Artillery Bay}',
      'command': 'build-Artillery Bay'
    }, {
      'title': 'Build Cloud Gate',
      'cost': 2000,
      'prereq': [],
      'type': 'Structure',
      'description': '{Cloud Gate}',
      'icon': '{Cloud Gate}',
      'command': 'build-Cloud Gate'
    }, {
      'title': 'Build Vitality Fountain',
      'cost': 2000,
      'prereq': [],
      'type': 'Structure',
      'description': '{Vitality Fountain}',
      'icon': '{Vitality Fountain}',
      'command': 'build-Vitality Fountain'
    }]
  },
  'Reaver': {
    'attackRange': 0,
    'attackSpeed': 0,
    'damage': 0,
    'description': 'Requires Automation Factory. The reaver explodes when dying, dealing 50 damage to all units around it.',
    'health': 20,
    'moveRange': 4,
    'shield': 0,
    'sightRange': 2,
    'squadsize': 1,
    'tier': 1,
    'turnsToBuild': 1,
    'options': [],
    'custom': {
      'explodeDamage': 50
    }
  },
  'Armed Turret': {
    'attackRange': 3,
    'attackSpeed': 1.5,
    'damage': 3,
    'description': 'This is constructed by the Turret building.',
    'health': 100,
    'moveRange': 0,
    'shield': 0,
    'sightRange': 4,
    'squadsize': 1,
    'tier': 1,
    'turnsToBuild': 0,
    'options': []
  },
  'Golem': {
    'attackRange': 1,
    'attackSpeed': 0.5,
    'damage': 10,
    'description': 'Slow-moving melee unit.',
    'health': 120,
    'moveRange': 3,
    'shield': 0,
    'sightRange': 2,
    'squadsize': 1,
    'tier': 1,
    'turnsToBuild': 1,
    'options': []
  }
};
module.exports.structures = structures;
module.exports.units = units;
module.exports.structureList = Object.keys(structures);
module.exports.unitList = Object.keys(units);

module.exports.getBaseObject = function (name) {
  if (name in structures) {
    return structures[name];
  } else if (name in units) {
    return units[name];
  } else {
    throw 'Cannot find map object ' + name;
  }
};

},{"./constants":33}],36:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function Tile(item) {
  _classCallCheck(this, Tile);

  this.tileType = parseInt(item);
  this.displayType = this.tileType;
  this.isHighGround = false;
  this.highGroundGroup = -1;
  this.jungleDist = -1;
};

var Constants = require('./constants');

var _require = require('./coordinates'),
    Tuple = _require.Tuple,
    getSurrounding = _require.getSurrounding;

var Tiles = {
  NONE: 0,
  DEFAULT: 1,
  BRUSH: 2,
  MINERAL: 3,
  BIG_MINERAL: 4,
  ROCK: 5,
  HIGH: 6,
  LOW: 7
};

var setupMap = function setupMap(map) {
  console.log('Loading map...');

  if (typeof map.data[0] === 'string') {
    map.data = map.data.map(function (row) {
      return row.split(' ').map(function (tile) {
        return new Tile(tile);
      });
    });

    map.withinMap = function (tile) {
      return !(tile.x < 0 || tile.y < 0 || tile.x >= map.data[0].length || tile.y >= map.data.length);
    };
    /* Initial Setup for Map Data */


    map.territorialTiles = 0;
    map.bigMineralLocations = [];
    map.smallMineralLocations = [];
    var nextGroup = 0;

    for (var y = 0; y < map.data.length; y++) {
      for (var x = 0; x < map.data[0].length; x++) {
        var type = map.data[y][x].displayType;

        if (type === Tiles.HIGH && map.data[y][x].highGroundGroup <= 0) {
          applyHighGroundGroup(map, new Tuple(x, y), nextGroup);
          nextGroup += 1;
        }

        if (type !== Tiles.BRUSH && type !== Tiles.ROCK) {
          map.territorialTiles += 1;
        }

        if (type === Tiles.BIG_MINERAL) {
          map.bigMineralLocations.push(new Tuple(x, y));
          map.data[y][x].displayType = Tiles.DEFAULT;
        } else if (type === Tiles.MINERAL) {
          map.smallMineralLocations.push(new Tuple(x, y));
          map.data[y][x].displayType = Tiles.DEFAULT;
        }
      }
    }
  }

  return map;
}; // let map = setupMap(Constants.IS_PRODUCTION ? require('./maps/big') : require('./maps/small'));


var map = setupMap(require('./maps/redesign'));
/* Recursively applies the group to any high ground surrounding */

var applyHighGroundGroup = function applyHighGroundGroup(map, start, group) {
  var nodes = [start];

  while (nodes.length !== 0) {
    var current = nodes[0];
    nodes.splice(0, 1);
    var tile = map.data[current.y][current.x];

    if (tile.displayType === Tiles.NONE || tile.displayType === Tiles.ROCK || tile.displayType === Tiles.LOW || tile.highGroundGroup >= 0) {
      continue;
    }

    Array.prototype.push.apply(nodes, getSurrounding(current, 1).filter(map.withinMap));

    if (tile.displayType !== Tiles.DEFAULT) {
      tile.isHighGround = true;
    }

    tile.highGroundGroup = group;
  }
};

var getVisible = function getVisible(point, sightRange) {
  /* Returns visibility map of a given point */

  /* Checks for Brush, High Ground and High Ground Groups */
  if (map.data[point.y][point.x].displayType === Tiles.BRUSH) {
    sightRange = Constants.BRUSH_VISION;
  }

  var start = new Tuple(point.x, point.y).toCubeCoordinates();
  var visited = new Set();
  var result = [];
  var jungDist = {};
  visited.add(JSON.stringify(start));
  result.push(start.toOffsetCoordinates());
  var fringes = [];
  fringes.push([start]);

  var _loop = function _loop(i) {
    fringes.push([]);
    fringes[i].forEach(function (hex) {
      var curString = JSON.stringify(hex);
      hex.getNeighbours().forEach(function (neighbour) {
        var n_coord = neighbour.toOffsetCoordinates();

        if (!map.withinMap(n_coord) || map.data[n_coord.y][n_coord.x].displayType === Tiles.NONE) {
          // Don't explore
          return;
        }

        var neighbourString = JSON.stringify(neighbour);

        if (!visited.has(neighbourString)) {
          var keepExplore = true;

          if (map.data[n_coord.y][n_coord.x].displayType === Tiles.BRUSH) {
            jungDist[neighbourString] = curString in jungDist ? jungDist[curString] + 1 : 0;

            if (jungDist[neighbourString] >= Constants.BRUSH_VISION) {
              keepExplore = false;
            }
          }

          if (map.data[point.y][point.x].displayType === Tiles.LOW && map.data[n_coord.y][n_coord.x].isHighGround) {
            // Trying to see high ground from low ground
            keepExplore = false;
          } else if (map.data[n_coord.y][n_coord.x].isHighGround && map.data[n_coord.y][n_coord.x].highGroundGroup !== map.data[point.y][point.x].highGroundGroup) {
            // Trying to see high ground from different high ground group
            keepExplore = false;
          }

          visited.add(neighbourString);

          if (keepExplore) {
            result.push(n_coord);
            fringes[i + 1].push(neighbour);
          }
        }
      });
    });
  };

  for (var i = 0; i < sightRange; i++) {
    _loop(i);
  }

  return result;
};

var findTargetPos = function findTargetPos(state, pos) {
  var target = state.mapObjects[pos.y][pos.x];

  if (target === undefined) {
    /* No direct target, check for occupied mapping */
    var occupiedPoint = state.occupied[pos.y][pos.x];

    if (occupiedPoint && occupiedPoint !== true) {
      return occupiedPoint;
    }
  }

  return pos;
};

var findTarget = function findTarget(state, pos) {
  if (!map.withinMap(pos)) {
    return undefined;
  }

  var targetPos = findTargetPos(state, pos);
  var target = state.mapObjects[targetPos.y][targetPos.x];
  return target;
};

var replenishShield = function replenishShield(mapObject) {
  var shieldToReplenish = Math.ceil(mapObject.maxShield / 10);
  mapObject.currentShield += shieldToReplenish;

  if (mapObject.currentShield > mapObject.maxShield) {
    mapObject.currentShield = mapObject.maxShield;
  }
};

module.exports = {
  map: map,
  Tiles: Tiles,
  getVisible: getVisible,
  findTargetPos: findTargetPos,
  findTarget: findTarget,
  replenishShield: replenishShield,
  setupMap: setupMap,
  Tile: Tile
};

},{"./constants":33,"./coordinates":34,"./maps/redesign":37}],37:[function(require,module,exports){
"use strict";

var _require = require('../coordinates'),
    Tuple = _require.Tuple;

module.exports = {
  data: ["0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0", "0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0", "1 1 1 7 1 1 1 1 1 1 1 1 1 1 1 4 1 1 1 1 1 1 1 1 1 1 1 7 1 1 1", "1 1 7 7 7 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 7 7 7 1 1", "1 1 7 7 7 1 1 1 1 1 1 5 5 1 1 1 1 1 5 5 1 1 1 1 1 1 7 7 7 1 1", "1 1 1 1 1 1 1 1 1 1 1 1 5 1 1 1 1 1 5 1 1 1 1 1 1 1 1 1 1 1 1", "0 0 1 1 1 1 1 1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1 1 1 1 1 1 0 0", "0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0", "0 0 1 1 1 1 1 1 1 1 1 1 4 1 1 1 1 1 4 1 1 1 1 1 1 1 1 1 1 0 0", "0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0", "0 0 1 1 1 1 1 1 5 5 1 1 1 1 1 1 1 1 1 1 1 5 5 1 1 1 1 1 1 0 0", "0 0 1 1 1 4 1 1 5 5 1 3 1 1 1 4 1 1 1 3 1 5 5 1 1 4 1 1 1 0 0", "0 0 1 1 1 1 1 1 5 5 1 1 1 1 1 1 1 1 1 1 1 5 5 1 1 1 1 1 1 0 0", "0 0 1 1 1 1 1 1 5 1 1 1 1 1 1 1 1 1 1 1 1 1 5 1 1 1 1 1 1 0 0", "0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0", "0 0 1 1 1 1 1 1 1 1 1 1 4 1 1 1 1 1 4 1 1 1 1 1 1 1 1 1 1 0 0", "0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0", "0 1 1 1 1 1 1 1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 3 1 1 1 1 1 1 1 0", "1 1 1 7 1 1 1 1 1 1 1 5 5 1 1 1 1 1 5 5 1 1 1 1 1 1 1 7 1 1 1", "1 1 7 7 7 1 1 1 1 1 1 1 5 1 1 1 1 1 5 1 1 1 1 1 1 1 7 7 7 1 1", "1 1 7 7 7 1 1 1 1 1 1 1 1 1 1 4 1 1 1 1 1 1 1 1 1 1 7 7 7 1 1", "1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", "0 0 1 1 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 0 1 1 1 0 0", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"],
  commandCenterLocations: [new Tuple(3, 3), new Tuple(27, 19), new Tuple(27, 3), new Tuple(3, 19)],
  movement: [new Tuple(500, 500), new Tuple(2500, 1700), new Tuple(500, 1700), new Tuple(2500, 500)],
  movementIndex: 0
};

},{"../coordinates":34}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvcmVzb3VyY2UtbWFuYWdlci5qcyIsImNsaWVudC9yZXNvdXJjZXMuanMiLCJjbGllbnQvdXRpbHMuanMiLCIvbW50L2YvbHVtZW4tYXN0cnVtLWpzL2RldnRvb2xzL21hcC1lZGl0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwibm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIm5vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2pxdWVyeS1icm93c2VyaWZ5L2xpYi9qcXVlcnkuanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwic2hhcmVkL2NvbnN0YW50cy5qcyIsIi9tbnQvZi9sdW1lbi1hc3RydW0tanMvc2hhcmVkL2Nvb3JkaW5hdGVzLmpzIiwic2hhcmVkL2RhdGEuanMiLCIvbW50L2YvbHVtZW4tYXN0cnVtLWpzL3NoYXJlZC9tYXAuanMiLCJzaGFyZWQvbWFwcy9yZWRlc2lnbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsSUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLG1CQUFELENBQWpCOztlQUNxQixPQUFPLENBQUMsYUFBRCxDO0lBQXBCLFEsWUFBQSxROztBQUVSLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxtQkFBRCxDQUFwQjs7QUFFQSxNQUFNLENBQUMsT0FBUDtBQUNJLDJCQUFZLE1BQVosRUFBb0I7QUFBQTs7QUFBQTs7QUFDaEIs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BuU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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RCxFQUFzQixJQUFJLEtBQUosQ0FBVSxJQUFWLEVBQWdCLElBQWhCLENBQXRCLEVBQTZDLElBQUksS0FBSixDQUFVLEdBQVYsRUFBZSxJQUFmLENBQTdDLEVBQW1FLElBQUksS0FBSixDQUFVLElBQVYsRUFBZ0IsR0FBaEIsQ0FBbkUsQ0E1Qkc7QUE2QmIsRUFBQSxhQUFhLEVBQUU7QUE3QkYsQ0FBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCAkID0gcmVxdWlyZSgnanF1ZXJ5LWJyb3dzZXJpZnknKTtcbmNvbnN0IHsgUmVzb3VyY2UgfSA9IHJlcXVpcmUoJy4vcmVzb3VyY2VzJyk7XG5cbmNvbnN0IERhdGEgPSByZXF1aXJlKCcuLi9zaGFyZWQvZGF0YS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFJlc291cmNlTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3Iob25Eb25lKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VzID0ge307XG4gICAgICAgIHRoaXMuZGVmZXJBcnIgPSBbXTtcbiAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2VzKHRoaXMuZGVmZXJBcnIpO1xuICAgICAgICAkLndoZW4oLi4udGhpcy5kZWZlckFycikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBvbkRvbmUodGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgY29uc3QgcmVzb3VyY2UgPSB0aGlzLnJlc291cmNlc1trZXldO1xuICAgICAgICBpZiAoIXJlc291cmNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdSZXNvdXJjZSAnICsga2V5ICsgJyBub3QgZm91bmQhJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc291cmNlO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZShsb2NhdGlvbiwga2V5LCB1cmwsIGRlZmVyQXJyKSB7XG4gICAgICAgIGNvbnN0IGRlZmVycmVkID0gbmV3ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgbG9jYXRpb25ba2V5XSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBsb2NhdGlvbltrZXldLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdSZXNvdXJjZSBsb2FkZWQ6ICcgKyB1cmwpO1xuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICBsb2NhdGlvbltrZXldLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdDb3VsZG5cXCd0IGxvYWQgcmVzb3VyY2U6ICcgKyB1cmwpO1xuICAgICAgICB9O1xuICAgICAgICBsb2NhdGlvbltrZXldLnNyYyA9IHVybDtcbiAgICAgICAgZGVmZXJBcnIucHVzaChkZWZlcnJlZCk7XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcyhkZWZlckFycikge1xuICAgICAgICBjb25zdCByZXNvdXJjZXNUb0xvYWQgPSBPYmplY3QudmFsdWVzKFJlc291cmNlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNvdXJjZXNUb0xvYWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKHRoaXMucmVzb3VyY2VzLCByZXNvdXJjZXNUb0xvYWRbaV0sICcvJyArIHJlc291cmNlc1RvTG9hZFtpXSwgZGVmZXJBcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3RydWN0dXJlTmFtZXMgPSBPYmplY3Qua2V5cyhEYXRhLnN0cnVjdHVyZXMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cnVjdHVyZU5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gc3RydWN0dXJlTmFtZXNbaV07XG4gICAgICAgICAgICBjb25zdCB1cmwgPSAnL3Jlc291cmNlcy9zdHJ1Y3R1cmVzLycgKyBuYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWyAnXS9nLCAnJykgKyAnLnBuZyc7XG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShEYXRhLnN0cnVjdHVyZXNbbmFtZV0sICdpbWFnZScsIHVybCwgZGVmZXJBcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdW5pdE5hbWVzID0gT2JqZWN0LmtleXMoRGF0YS51bml0cyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pdE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gdW5pdE5hbWVzW2ldO1xuICAgICAgICAgICAgY29uc3QgdXJsID0gJy9yZXNvdXJjZXMvdW5pdHMvJyArIG5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bICddL2csICcnKSArICcucG5nJztcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKERhdGEudW5pdHNbbmFtZV0sICdpbWFnZScsIHVybCwgZGVmZXJBcnIpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG4iLCJtb2R1bGUuZXhwb3J0cy5SZXNvdXJjZSA9IHtcbiAgICBCTFVFX09WRVJMQVk6ICdyZXNvdXJjZXMvZ3JvdW5kVGV4dHVyZS9ibHVlT3ZlcmxheS5wbmcnLFxuICAgIFJFRF9PVkVSTEFZOiAncmVzb3VyY2VzL2dyb3VuZFRleHR1cmUvcmVkT3ZlcmxheS5wbmcnLFxuICAgIEdSRUVOX09WRVJMQVk6ICdyZXNvdXJjZXMvZ3JvdW5kVGV4dHVyZS9ncmVlbk92ZXJsYXkucG5nJyxcbiAgICBZRUxMT1dfT1ZFUkxBWTogJ3Jlc291cmNlcy9ncm91bmRUZXh0dXJlL3llbGxvd092ZXJsYXkucG5nJyxcbiAgICBERUJVR19SSU5HOiAncmVzb3VyY2VzL2dyb3VuZFRleHR1cmUvZGVidWdSaW5nLnBuZycsXG4gICAgRk9HX09GX1dBUjogJ3Jlc291cmNlcy9ncm91bmRUZXh0dXJlL2ZvZ09mV2FyVHJhbnNsdWNlbnQucG5nJyxcbiAgICBERUZBVUxUX1RJTEU6ICdyZXNvdXJjZXMvZ3JvdW5kVGV4dHVyZS9kZWZhdWx0VGlsZS5wbmcnLFxuICAgIEJSVVNIX1RJTEU6ICdyZXNvdXJjZXMvZ3JvdW5kVGV4dHVyZS9icnVzaFRpbGUucG5nJyxcbiAgICBNSU5FUkFMX1RJTEU6ICdyZXNvdXJjZXMvZ3JvdW5kVGV4dHVyZS9taW5lcmFsVGlsZS5wbmcnLFxuICAgIEJJR19NSU5FUkFMX1RJTEU6ICdyZXNvdXJjZXMvZ3JvdW5kVGV4dHVyZS9iaWdNaW5lcmFsVGlsZS5wbmcnLFxuICAgIFJPQ0s6ICdyZXNvdXJjZXMvZ3JvdW5kVGV4dHVyZS9yb2NrLnBuZycsXG4gICAgSElHSF9USUxFOiAncmVzb3VyY2VzL2dyb3VuZFRleHR1cmUvaGlnaFRpbGUucG5nJyxcbiAgICBMT1dfVElMRTogJ3Jlc291cmNlcy9ncm91bmRUZXh0dXJlL2xvd1RpbGUucG5nJyxcbiAgICBVSV9UT1BfUklHSFQ6ICdyZXNvdXJjZXMvZ3VpL3RvcFJpZ2h0LnBuZycsXG4gICAgVUlfQk9UVE9NX0xFRlQ6ICdyZXNvdXJjZXMvZ3VpL2JvdHRvbUxlZnQucG5nJyxcbiAgICBVSV9CT1RUT01fUklHSFQ6ICdyZXNvdXJjZXMvZ3VpL2JvdHRvbVJpZ2h0LnBuZycsXG4gICAgVUlfVE9QOiAncmVzb3VyY2VzL2d1aS90b3AucG5nJyxcbiAgICBVSV9USU1FUl9CQVI6ICdyZXNvdXJjZXMvZ3VpL3RpbWVyQmFyLnBuZycsXG4gICAgVUlfSUNPTlM6ICdyZXNvdXJjZXMvZ3VpL2ljb25zLnBuZycsXG4gICAgVElFUl9JQ09OUzogJ3Jlc291cmNlcy9ndWkvdGllckljb25zLnBuZycsXG4gICAgQ1VSU09SOiAncmVzb3VyY2VzL2N1cnNvci5wbmcnLFxuICAgIFdJRFRIXzFfQlVJTEQ6ICdyZXNvdXJjZXMvc3RydWN0dXJlcy93aWR0aDFCdWlsZC5wbmcnLFxuICAgIFdJRFRIXzBfQlVJTEQ6ICdyZXNvdXJjZXMvc3RydWN0dXJlcy93aWR0aDBCdWlsZC5wbmcnLFxuICAgIFdJRFRIXzFfQlVJTERfQU5JTTogJ3Jlc291cmNlcy9zdHJ1Y3R1cmVzL3dpZHRoMUJ1aWxkQW5pbWF0aW9uLnBuZycsXG4gICAgV0lEVEhfMF9CVUlMRF9BTklNOiAncmVzb3VyY2VzL3N0cnVjdHVyZXMvd2lkdGgwQnVpbGRBbmltYXRpb24ucG5nJyxcbiAgICBQUk9CRV9BTklNOiAncmVzb3VyY2VzL3N0cnVjdHVyZXMvcHJvYmVBbmltYXRpb24ucG5nJyxcbiAgICBBVFRBQ0tfUFJPSkVDVElMRTogJ3Jlc291cmNlcy9hdHRhY2svYXR0YWNrLnBuZycsXG4gICAgQVRUQUNLX0VYUExPRElORzogJ3Jlc291cmNlcy9hdHRhY2svZXhwbG9kaW5nLnBuZycsXG4gICAgTVVaWkxFXzE6ICdyZXNvdXJjZXMvbXV6emxlL211enpsZTEucG5nJyxcbiAgICBNVVpaTEVfMjogJ3Jlc291cmNlcy9tdXp6bGUvbXV6emxlMi5wbmcnLFxuICAgIE1VWlpMRV8zOiAncmVzb3VyY2VzL211enpsZS9tdXp6bGUzLnBuZycsXG4gICAgTVVaWkxFXzQ6ICdyZXNvdXJjZXMvbXV6emxlL211enpsZTQucG5nJyxcbiAgICBNVVpaTEVfNTogJ3Jlc291cmNlcy9tdXp6bGUvbXV6emxlNS5wbmcnLFxufTtcblxubW9kdWxlLmV4cG9ydHMudGlsZXMgPSBbXG4gICAgbW9kdWxlLmV4cG9ydHMuUmVzb3VyY2UuREVGQVVMVF9USUxFLFxuICAgIG1vZHVsZS5leHBvcnRzLlJlc291cmNlLkJSVVNIX1RJTEUsXG4gICAgbW9kdWxlLmV4cG9ydHMuUmVzb3VyY2UuTUlORVJBTF9USUxFLFxuICAgIG1vZHVsZS5leHBvcnRzLlJlc291cmNlLkJJR19NSU5FUkFMX1RJTEUsXG4gICAgbW9kdWxlLmV4cG9ydHMuUmVzb3VyY2UuUk9DSyxcbiAgICBtb2R1bGUuZXhwb3J0cy5SZXNvdXJjZS5ISUdIX1RJTEUsXG4gICAgbW9kdWxlLmV4cG9ydHMuUmVzb3VyY2UuTE9XX1RJTEVcbl07XG4iLCJjb25zdCB7IFR1cGxlIH0gPSByZXF1aXJlKCcuLi9zaGFyZWQvY29vcmRpbmF0ZXMnKTtcbmNvbnN0IHsgTUFQX1RJTEVfRFJBV19YX01VTFRJUExJRVIsIE1BUF9USUxFX0RSQVdfWV9NVUxUSVBMSUVSfSA9IHJlcXVpcmUoJy4uL3NoYXJlZC9jb25zdGFudHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdG9SYWRpYW5zKGFuZ2xlKSB7XG4gICAgICAgIHJldHVybiBhbmdsZSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICB9LFxuXG4gICAgdG9EZWdyZWVzKGFuZ2xlKSB7XG4gICAgICAgIHJldHVybiBhbmdsZSAqICgxODAgLyBNYXRoLlBJKTtcbiAgICB9LFxuXG4gICAgZGlzdGFuY2UocG9zMSwgcG9zMikge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHBvczEueCAtIHBvczIueCwgMikgKyBNYXRoLnBvdyhwb3MxLnkgLSBwb3MyLnksIDIpKTtcbiAgICB9LFxuXG4gICAgdG9EcmF3Q29vcmQobm9kZU9yWCwgbWF5YmVZKSB7XG4gICAgICAgIGlmIChtYXliZVkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBUdXBsZShub2RlT3JYICogTUFQX1RJTEVfRFJBV19YX01VTFRJUExJRVIsXG4gICAgICAgICAgICAgICAgKG1heWJlWSAqIE1BUF9USUxFX0RSQVdfWV9NVUxUSVBMSUVSKSArIChub2RlT3JYICUgMikgKiBNYXRoLmZsb29yKE1BUF9USUxFX0RSQVdfWV9NVUxUSVBMSUVSIC8gMikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgVHVwbGUobm9kZU9yWC54ICogTUFQX1RJTEVfRFJBV19YX01VTFRJUExJRVIsXG4gICAgICAgICAgICAobm9kZU9yWC55ICogTUFQX1RJTEVfRFJBV19ZX01VTFRJUExJRVIpICsgKG5vZGVPclgueCAlIDIpICogTWF0aC5mbG9vcihNQVBfVElMRV9EUkFXX1lfTVVMVElQTElFUiAvIDIpKTtcbiAgICB9LFxuICAgIFxuICAgIHJvdW5kVG9OZWFyZXN0KG4sIHJvdW5kVG8pIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQobiAvIHJvdW5kVG8pICogcm91bmRUbztcbiAgICB9XG59O1xuIiwiY29uc3QgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xyXG5jb25zdCAkID0gcmVxdWlyZSgnanF1ZXJ5LWJyb3dzZXJpZnknKTtcclxuY29uc3QgeyBUdXBsZSB9ID0gcmVxdWlyZSgnLi4vLi4vc2hhcmVkL2Nvb3JkaW5hdGVzJyk7XHJcbmNvbnN0IHsgc2V0dXBNYXAsIFRpbGUgfSA9IHJlcXVpcmUoJy4uLy4uL3NoYXJlZC9tYXAnKTtcclxuY29uc3QgeyB0aWxlcywgUmVzb3VyY2UgfSA9IHJlcXVpcmUoJy4uLy4uL2NsaWVudC9yZXNvdXJjZXMnKTtcclxuY29uc3QgeyB0b0RyYXdDb29yZCB9ID0gcmVxdWlyZSgnLi4vLi4vY2xpZW50L3V0aWxzJyk7XHJcbmNvbnN0IFJlc291cmNlTWFuYWdlciA9IHJlcXVpcmUoJy4uLy4uL2NsaWVudC9yZXNvdXJjZS1tYW5hZ2VyJyk7XHJcbmNvbnN0IENvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL3NoYXJlZC9jb25zdGFudHMnKTtcclxuXHJcbmNvbnN0IHJlc291cmNlTWFuYWdlciA9IG5ldyBSZXNvdXJjZU1hbmFnZXIobWFwVGljayk7XHJcblxyXG5cclxuY29uc3QgY2FudmFzID0gJCgnI21hcCcpWzBdO1xyXG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG5sZXQgbWFwID0gdW5kZWZpbmVkO1xyXG5cclxuJCgnI21hcC1vcHRpb24nKS5jaGFuZ2UoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgIGNoYW5nZU1hcCgkKCcjbWFwLW9wdGlvbicpLnZhbCgpKTtcclxuICAgICQoJyNtYXAtb3B0aW9uJykuYmx1cigpO1xyXG59KTtcclxuXHJcbmNvbnN0IGlucHV0U3RhdGUgPSB7XHJcbiAgICB3OiBmYWxzZSxcclxuICAgIGE6IGZhbHNlLFxyXG4gICAgczogZmFsc2UsXHJcbiAgICBkOiBmYWxzZSxcclxuICAgIGRlbHRhOiAwXHJcbn07XHJcblxyXG5jb25zdCBtb3VzZVN0YXRlID0ge1xyXG4gICAgcG9zaXRpb246IG5ldyBUdXBsZSgwLCAwKSxcclxuICAgIHRpbGU6IG5ldyBUdXBsZSgwLCAwKVxyXG59O1xyXG5cclxubGV0IGFjdGl2ZUJydXNoID0gMDtcclxuY29uc3QgS0VZX1cgPSA4NztcclxuY29uc3QgS0VZX0EgPSA2NTtcclxuY29uc3QgS0VZX1MgPSA4MztcclxuY29uc3QgS0VZX0QgPSA2ODtcclxuY29uc3QgRElHSVRfS0VZUyA9IFs0OSwgNTAsIDUxLCA1MiwgNTMsIDU0LCA1NSwgNTZdO1xyXG5cclxuY29uc3QgQ0FNRVJBX1NQRUVEID0gMjA7XHJcblxyXG4kKGRvY3VtZW50KS5rZXlkb3duKChlKSA9PiB7XHJcbiAgICBpZiAoZS53aGljaCA9PT0gS0VZX1cpIGlucHV0U3RhdGUudyA9IHRydWU7XHJcbiAgICBpZiAoZS53aGljaCA9PT0gS0VZX0EpIGlucHV0U3RhdGUuYSA9IHRydWU7XHJcbiAgICBpZiAoZS53aGljaCA9PT0gS0VZX1MpIGlucHV0U3RhdGUucyA9IHRydWU7XHJcbiAgICBpZiAoZS53aGljaCA9PT0gS0VZX0QpIGlucHV0U3RhdGUuZCA9IHRydWU7XHJcbiAgICBpZiAoRElHSVRfS0VZUy5pbmNsdWRlcyhlLndoaWNoKSkge1xyXG4gICAgICAgIGFjdGl2ZUJydXNoID0gRElHSVRfS0VZUy5pbmRleE9mKGUud2hpY2gpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLmtleXVwKChlKSA9PiB7XHJcbiAgICBpZiAoZS53aGljaCA9PT0gS0VZX1cpIGlucHV0U3RhdGUudyA9IGZhbHNlO1xyXG4gICAgaWYgKGUud2hpY2ggPT09IEtFWV9BKSBpbnB1dFN0YXRlLmEgPSBmYWxzZTtcclxuICAgIGlmIChlLndoaWNoID09PSBLRVlfUykgaW5wdXRTdGF0ZS5zID0gZmFsc2U7XHJcbiAgICBpZiAoZS53aGljaCA9PT0gS0VZX0QpIGlucHV0U3RhdGUuZCA9IGZhbHNlO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm1vdXNlbW92ZSgoZSkgPT4ge1xyXG4gICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIG1vdXNlU3RhdGUucG9zaXRpb24ueCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcclxuICAgIG1vdXNlU3RhdGUucG9zaXRpb24ueSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xyXG4gICAgXHJcbiAgICBtb3VzZVN0YXRlLnRpbGUgPSBuZXcgVHVwbGUoXHJcbiAgICAgICAgKG1vdXNlU3RhdGUucG9zaXRpb24ueCAtIHdpZHRoIC8gMikgLyBjYW1lcmFab29tICsgY2FtZXJhLngsXHJcbiAgICAgICAgKG1vdXNlU3RhdGUucG9zaXRpb24ueSAtIGhlaWdodCAvIDIpIC8gY2FtZXJhWm9vbSArIGNhbWVyYS55XHJcbiAgICApLnRvVGlsZUNvb3JkKCk7XHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkubW91c2Vkb3duKChlKSA9PiB7XHJcbiAgICBtb3VzZVN0YXRlLmRvd24gPSB0cnVlO1xyXG59KTtcclxuXHJcbiQoZG9jdW1lbnQpLm1vdXNldXAoKGUpID0+IHtcclxuICAgIG1vdXNlU3RhdGUuZG93biA9IGZhbHNlO1xyXG59KTtcclxuXHJcbiQoJyNyZXNldCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgY2hhbmdlTWFwKCQoJyNtYXAtb3B0aW9uJykudmFsKCkpO1xyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhldmVudC5kZWx0YVkpO1xyXG4gICAgaW5wdXRTdGF0ZS5kZWx0YSA9IGV2ZW50LmRlbHRhWTtcclxufSk7XHJcblxyXG5jb25zdCBjYW1lcmEgPSBuZXcgVHVwbGUoMCwgMCk7XHJcbmxldCBjYW1lcmFab29tID0gMS4wO1xyXG5cclxuYXhpb3MuZ2V0KCcvdG9vbHMvbGlzdC1tYXBzJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcclxuICAgIGxldCBvcHRpb25zID0gJyc7XHJcbiAgICByZXN1bHQuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKG9wdGlvbikge1xyXG4gICAgICAgIG9wdGlvbnMgKz0gYDxvcHRpb24gdmFsdWU9XCIke29wdGlvbn1cIj4ke29wdGlvbn08L29wdGlvbj5gXHJcbiAgICB9KTtcclxuICAgICQoJyNtYXAtb3B0aW9uJykuaHRtbChvcHRpb25zKTtcclxuICAgIGNoYW5nZU1hcCgkKCcjbWFwLW9wdGlvbicpLnZhbCgpKTtcclxufSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VNYXAobWFwTmFtZSkge1xyXG4gICAgYXhpb3MuZ2V0KCcvdG9vbHMvZ2V0LW1hcC8nICsgbWFwTmFtZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICBtYXAgPSBzZXR1cE1hcChyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgY29uc3QgbmV3Q2FtID0gdG9EcmF3Q29vcmQobWFwLnJlZENvbW1hbmRDZW50ZXJMb2NhdGlvbik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2FtZXJhLnggPSBuZXdDYW0ueDtcclxuICAgICAgICBjYW1lcmEueSA9IG5ld0NhbS55O1xyXG5cclxuICAgICAgICAkKCcjdW5zYXZlZC1jaGFuZ2VzJykudGV4dCgnJyk7XHJcbiAgICAgICAgdXBkYXRlTWFwRGF0YSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1hcCk7XHJcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5sZXQgd2lkdGg7XHJcbmxldCBoZWlnaHQ7XHJcblxyXG5mdW5jdGlvbiBvblJlc2l6ZSgpIHtcclxuICAgIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyMDA7XHJcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICBjb250ZXh0LndpZHRoID0gd2lkdGg7XHJcbiAgICBjb250ZXh0LmhlaWdodCA9IGhlaWdodDtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKTtcclxub25SZXNpemUoKTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZU1hcERhdGEoKSB7XHJcbiAgICAkKCcjbWFwRGF0YScpLnRleHQobWFwLmRhdGEubWFwKHJvdyA9PiB7XHJcbiAgICAgICAgcmV0dXJuICdcIicgKyByb3cubWFwKHRpbGUgPT4gdGlsZS50aWxlVHlwZSkuam9pbignICcpICsgJ1wiJztcclxuICAgIH0pLmpvaW4oJyxcXG4nKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYXdJbWFnZShpbWcsIHgsIHksIHdpZHRoID0gLTEsIGhlaWdodCA9IC0xLCBhbmdsZSA9IDApIHtcclxuICAgIGlmICh3aWR0aCA9PT0gLTEpIHdpZHRoID0gaW1nLndpZHRoO1xyXG4gICAgaWYgKGhlaWdodCA9PT0gLTEpIGhlaWdodCA9IGltZy5oZWlnaHQ7XHJcbiAgICBpZiAoYW5nbGUgPT09IDApIHtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWcsIHggLSB3aWR0aCAvIDIsIHkgLSBoZWlnaHQgLyAyKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKHgsIHkpO1xyXG4gICAgICAgIGNvbnRleHQucm90YXRlKGFuZ2xlKTtcclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWcsIC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBjb250ZXh0LnJvdGF0ZSgtYW5nbGUpO1xyXG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKC14LCAteSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcFRpY2soKSB7XHJcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMDAwJztcclxuICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICBpZiAoaW5wdXRTdGF0ZS53KSBjYW1lcmEueSAtPSBDQU1FUkFfU1BFRUQ7XHJcbiAgICBpZiAoaW5wdXRTdGF0ZS5hKSBjYW1lcmEueCAtPSBDQU1FUkFfU1BFRUQ7XHJcbiAgICBpZiAoaW5wdXRTdGF0ZS5zKSBjYW1lcmEueSArPSBDQU1FUkFfU1BFRUQ7XHJcbiAgICBpZiAoaW5wdXRTdGF0ZS5kKSBjYW1lcmEueCArPSBDQU1FUkFfU1BFRUQ7XHJcbiAgICBpZiAobW91c2VTdGF0ZS5kb3duKSB7XHJcbiAgICAgICAgaWYgKG1hcCAmJiBtYXAuZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAobW91c2VTdGF0ZS50aWxlLnggPj0gMCAmJiBtb3VzZVN0YXRlLnRpbGUueSA+PSAwICYmXHJcbiAgICAgICAgICAgICAgICBtb3VzZVN0YXRlLnRpbGUueCA8IG1hcC5kYXRhWzBdLmxlbmd0aCAmJiBtb3VzZVN0YXRlLnRpbGUueSA8IG1hcC5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbWFwLmRhdGFbbW91c2VTdGF0ZS50aWxlLnldW21vdXNlU3RhdGUudGlsZS54XSA9IG5ldyBUaWxlKGFjdGl2ZUJydXNoKTtcclxuICAgICAgICAgICAgICAgICQoJyN1bnNhdmVkLWNoYW5nZXMnKS50ZXh0KCdZb3UgaGF2ZSB1bnNhdmVkIGNoYW5nZXMhJyk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVNYXBEYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmFjdG9yID0gMSAvIGNhbWVyYVpvb207XHJcbiAgICBjb25zdCBvZmZzZXRYID0gKCh3aWR0aCAvIDIpICogZmFjdG9yKTtcclxuICAgIGNvbnN0IG9mZnNldFkgPSAoKGhlaWdodCAvIDIpICogZmFjdG9yKTtcclxuICAgIGNvbnRleHQuc2F2ZSgpO1xyXG4gICAgY29udGV4dC5zY2FsZShjYW1lcmFab29tLCBjYW1lcmFab29tKTtcclxuICAgIGNvbnRleHQudHJhbnNsYXRlKC0oY2FtZXJhLnggLSBvZmZzZXRYKSwgLShjYW1lcmEueSAtIG9mZnNldFkpKTtcclxuICAgIGNhbWVyYVpvb20gLT0gaW5wdXRTdGF0ZS5kZWx0YSAvIDUwMDA7XHJcbiAgICBpZiAoY2FtZXJhWm9vbSA8IDAuMykgY2FtZXJhWm9vbSA9IDAuMztcclxuICAgIGlmIChjYW1lcmFab29tID4gMSkgY2FtZXJhWm9vbSA9IDE7XHJcbiAgICBpbnB1dFN0YXRlLmRlbHRhICo9IDAuOTtcclxuICAgIGlmIChtYXAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgbWFwLmRhdGEubGVuZ3RoOyB5KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBtYXAuZGF0YVswXS5sZW5ndGg7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHJhd0Nvb3JkID0gdG9EcmF3Q29vcmQoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlzcGxheVR5cGUgPSBtYXAuZGF0YVt5XVt4XS50aWxlVHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChtb3VzZVN0YXRlLnRpbGUuZXF1YWxzKG5ldyBUdXBsZSh4LCB5KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5VHlwZSA9IGFjdGl2ZUJydXNoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaXNwbGF5VHlwZSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdJbWFnZShyZXNvdXJjZU1hbmFnZXIuZ2V0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWxlc1tkaXNwbGF5VHlwZSAtIDFdXHJcbiAgICAgICAgICAgICAgICAgICAgKSwgZHJhd0Nvb3JkLngsIGRyYXdDb29yZC55KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKG1vdXNlU3RhdGUudGlsZS5lcXVhbHMobmV3IFR1cGxlKHgsIHkpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdJbWFnZShyZXNvdXJjZU1hbmFnZXIuZ2V0KFJlc291cmNlLkRFQlVHX1JJTkcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmF3Q29vcmQueCwgZHJhd0Nvb3JkLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29udGV4dC5mb250ID0gXCIxNnB4IENvbnNvbGFzXCI7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGAke3h9LCAke3l9YCwgZHJhd0Nvb3JkLnggLSAzMCwgZHJhd0Nvb3JkLnkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29udGV4dC5yZXN0b3JlKCk7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFwVGljayk7XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIGlmIChcbiAgICAgICh1dGlscy5pc0Jsb2IocmVxdWVzdERhdGEpIHx8IHV0aWxzLmlzRmlsZShyZXF1ZXN0RGF0YSkpICYmXG4gICAgICByZXF1ZXN0RGF0YS50eXBlXG4gICAgKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcblxuICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH1cblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5JywgJ3BhcmFtcyddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd0aW1lb3V0TWVzc2FnZScsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdkZWNvbXByZXNzJyxcbiAgICAnbWF4Q29udGVudExlbmd0aCcsICdtYXhCb2R5TGVuZ3RoJywgJ21heFJlZGlyZWN0cycsICd0cmFuc3BvcnQnLCAnaHR0cEFnZW50JyxcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJywgJ3Jlc3BvbnNlRW5jb2RpbmcnXG4gIF07XG4gIHZhciBkaXJlY3RNZXJnZUtleXMgPSBbJ3ZhbGlkYXRlU3RhdHVzJ107XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGlyZWN0TWVyZ2VLZXlzLCBmdW5jdGlvbiBtZXJnZShwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpXG4gICAgLmNvbmNhdChkaXJlY3RNZXJnZUtleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcxKVxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gICAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NXG59O1xuIiwiLy8gVXNlcyBOb2RlLCBBTUQgb3IgYnJvd3NlciBnbG9iYWxzIHRvIGNyZWF0ZSBhIG1vZHVsZS5cblxuLy8gSWYgeW91IHdhbnQgc29tZXRoaW5nIHRoYXQgd2lsbCB3b3JrIGluIG90aGVyIHN0cmljdGVyIENvbW1vbkpTIGVudmlyb25tZW50cyxcbi8vIG9yIGlmIHlvdSBuZWVkIHRvIGNyZWF0ZSBhIGNpcmN1bGFyIGRlcGVuZGVuY3ksIHNlZSBjb21tb25Kc1N0cmljdC5qc1xuXG4vLyBEZWZpbmVzIGEgbW9kdWxlIFwicmV0dXJuRXhwb3J0c1wiIHRoYXQgZGVwZW5kcyBhbm90aGVyIG1vZHVsZSBjYWxsZWQgXCJiXCIuXG4vLyBOb3RlIHRoYXQgdGhlIG5hbWUgb2YgdGhlIG1vZHVsZSBpcyBpbXBsaWVkIGJ5IHRoZSBmaWxlIG5hbWUuIEl0IGlzIGJlc3Rcbi8vIGlmIHRoZSBmaWxlIG5hbWUgYW5kIHRoZSBleHBvcnRlZCBnbG9iYWwgaGF2ZSBtYXRjaGluZyBuYW1lcy5cblxuLy8gSWYgdGhlICdiJyBtb2R1bGUgYWxzbyB1c2VzIHRoaXMgdHlwZSBvZiBib2lsZXJwbGF0ZSwgdGhlblxuLy8gaW4gdGhlIGJyb3dzZXIsIGl0IHdpbGwgY3JlYXRlIGEgZ2xvYmFsIC5iIHRoYXQgaXMgdXNlZCBiZWxvdy5cblxuLy8gSWYgeW91IGRvIG5vdCB3YW50IHRvIHN1cHBvcnQgdGhlIGJyb3dzZXIgZ2xvYmFsIHBhdGgsIHRoZW4geW91XG4vLyBjYW4gcmVtb3ZlIHRoZSBgcm9vdGAgdXNlIGFuZCB0aGUgcGFzc2luZyBgdGhpc2AgYXMgdGhlIGZpcnN0IGFyZyB0b1xuLy8gdGhlIHRvcCBmdW5jdGlvbi5cblxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAgLy8gbGlrZSBOb2RlLlxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgICAgIHJvb3QucmV0dXJuRXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHsvKiFcbiAqIGpRdWVyeSBKYXZhU2NyaXB0IExpYnJhcnkgdjEuOC4xXG4gKiBodHRwOi8vanF1ZXJ5LmNvbS9cbiAqXG4gKiBJbmNsdWRlcyBTaXp6bGUuanNcbiAqIGh0dHA6Ly9zaXp6bGVqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IDIwMTIgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKlxuICogRGF0ZTogVGh1IEF1ZyAzMCAyMDEyIDE3OjE3OjIyIEdNVC0wNDAwIChFYXN0ZXJuIERheWxpZ2h0IFRpbWUpXG4gKi9cbnJldHVybiAoZnVuY3Rpb24oIHdpbmRvdywgdW5kZWZpbmVkICkge1xudmFyXG5cdC8vIEEgY2VudHJhbCByZWZlcmVuY2UgdG8gdGhlIHJvb3QgalF1ZXJ5KGRvY3VtZW50KVxuXHRyb290alF1ZXJ5LFxuXG5cdC8vIFRoZSBkZWZlcnJlZCB1c2VkIG9uIERPTSByZWFkeVxuXHRyZWFkeUxpc3QsXG5cblx0Ly8gVXNlIHRoZSBjb3JyZWN0IGRvY3VtZW50IGFjY29yZGluZ2x5IHdpdGggd2luZG93IGFyZ3VtZW50IChzYW5kYm94KVxuXHRkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcblx0bG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24sXG5cdG5hdmlnYXRvciA9IHdpbmRvdy5uYXZpZ2F0b3IsXG5cblx0Ly8gTWFwIG92ZXIgalF1ZXJ5IGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF9qUXVlcnkgPSB3aW5kb3cualF1ZXJ5LFxuXG5cdC8vIE1hcCBvdmVyIHRoZSAkIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG5cdF8kID0gd2luZG93LiQsXG5cblx0Ly8gU2F2ZSBhIHJlZmVyZW5jZSB0byBzb21lIGNvcmUgbWV0aG9kc1xuXHRjb3JlX3B1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaCxcblx0Y29yZV9zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcblx0Y29yZV9pbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YsXG5cdGNvcmVfdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuXHRjb3JlX2hhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG5cdGNvcmVfdHJpbSA9IFN0cmluZy5wcm90b3R5cGUudHJpbSxcblxuXHQvLyBEZWZpbmUgYSBsb2NhbCBjb3B5IG9mIGpRdWVyeVxuXHRqUXVlcnkgPSBmdW5jdGlvbiggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cdFx0Ly8gVGhlIGpRdWVyeSBvYmplY3QgaXMgYWN0dWFsbHkganVzdCB0aGUgaW5pdCBjb25zdHJ1Y3RvciAnZW5oYW5jZWQnXG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuZm4uaW5pdCggc2VsZWN0b3IsIGNvbnRleHQsIHJvb3RqUXVlcnkgKTtcblx0fSxcblxuXHQvLyBVc2VkIGZvciBtYXRjaGluZyBudW1iZXJzXG5cdGNvcmVfcG51bSA9IC9bXFwtK10/KD86XFxkKlxcLnwpXFxkKyg/OltlRV1bXFwtK10/XFxkK3wpLy5zb3VyY2UsXG5cblx0Ly8gVXNlZCBmb3IgZGV0ZWN0aW5nIGFuZCB0cmltbWluZyB3aGl0ZXNwYWNlXG5cdGNvcmVfcm5vdHdoaXRlID0gL1xcUy8sXG5cdGNvcmVfcnNwYWNlID0gL1xccysvLFxuXG5cdC8vIE1ha2Ugc3VyZSB3ZSB0cmltIEJPTSBhbmQgTkJTUCAoaGVyZSdzIGxvb2tpbmcgYXQgeW91LCBTYWZhcmkgNS4wIGFuZCBJRSlcblx0cnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csXG5cblx0Ly8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3Ncblx0Ly8gUHJpb3JpdGl6ZSAjaWQgb3ZlciA8dGFnPiB0byBhdm9pZCBYU1MgdmlhIGxvY2F0aW9uLmhhc2ggKCM5NTIxKVxuXHRycXVpY2tFeHByID0gL14oPzpbXiM8XSooPFtcXHdcXFddKz4pW14+XSokfCMoW1xcd1xcLV0qKSQpLyxcblxuXHQvLyBNYXRjaCBhIHN0YW5kYWxvbmUgdGFnXG5cdHJzaW5nbGVUYWcgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sXG5cblx0Ly8gSlNPTiBSZWdFeHBcblx0cnZhbGlkY2hhcnMgPSAvXltcXF0sOnt9XFxzXSokLyxcblx0cnZhbGlkYnJhY2VzID0gLyg/Ol58OnwsKSg/OlxccypcXFspKy9nLFxuXHRydmFsaWRlc2NhcGUgPSAvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVtcXGRhLWZBLUZdezR9KS9nLFxuXHRydmFsaWR0b2tlbnMgPSAvXCJbXlwiXFxcXFxcclxcbl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/KD86XFxkXFxkKlxcLnwpXFxkKyg/OltlRV1bXFwtK10/XFxkK3wpL2csXG5cblx0Ly8gTWF0Y2hlcyBkYXNoZWQgc3RyaW5nIGZvciBjYW1lbGl6aW5nXG5cdHJtc1ByZWZpeCA9IC9eLW1zLS8sXG5cdHJkYXNoQWxwaGEgPSAvLShbXFxkYS16XSkvZ2ksXG5cblx0Ly8gVXNlZCBieSBqUXVlcnkuY2FtZWxDYXNlIGFzIGNhbGxiYWNrIHRvIHJlcGxhY2UoKVxuXHRmY2FtZWxDYXNlID0gZnVuY3Rpb24oIGFsbCwgbGV0dGVyICkge1xuXHRcdHJldHVybiAoIGxldHRlciArIFwiXCIgKS50b1VwcGVyQ2FzZSgpO1xuXHR9LFxuXG5cdC8vIFRoZSByZWFkeSBldmVudCBoYW5kbGVyIGFuZCBzZWxmIGNsZWFudXAgbWV0aG9kXG5cdERPTUNvbnRlbnRMb2FkZWQgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgRE9NQ29udGVudExvYWRlZCwgZmFsc2UgKTtcblx0XHRcdGpRdWVyeS5yZWFkeSgpO1xuXHRcdH0gZWxzZSBpZiAoIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIiApIHtcblx0XHRcdC8vIHdlJ3JlIGhlcmUgYmVjYXVzZSByZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgaW4gb2xkSUVcblx0XHRcdC8vIHdoaWNoIGlzIGdvb2QgZW5vdWdoIGZvciB1cyB0byBjYWxsIHRoZSBkb20gcmVhZHkhXG5cdFx0XHRkb2N1bWVudC5kZXRhY2hFdmVudCggXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiwgRE9NQ29udGVudExvYWRlZCApO1xuXHRcdFx0alF1ZXJ5LnJlYWR5KCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIFtbQ2xhc3NdXSAtPiB0eXBlIHBhaXJzXG5cdGNsYXNzMnR5cGUgPSB7fTtcblxualF1ZXJ5LmZuID0galF1ZXJ5LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IGpRdWVyeSxcblx0aW5pdDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByb290alF1ZXJ5ICkge1xuXHRcdHZhciBtYXRjaCwgZWxlbSwgcmV0LCBkb2M7XG5cblx0XHQvLyBIYW5kbGUgJChcIlwiKSwgJChudWxsKSwgJCh1bmRlZmluZWQpLCAkKGZhbHNlKVxuXHRcdGlmICggIXNlbGVjdG9yICkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlICQoRE9NRWxlbWVudClcblx0XHRpZiAoIHNlbGVjdG9yLm5vZGVUeXBlICkge1xuXHRcdFx0dGhpcy5jb250ZXh0ID0gdGhpc1swXSA9IHNlbGVjdG9yO1xuXHRcdFx0dGhpcy5sZW5ndGggPSAxO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gSGFuZGxlIEhUTUwgc3RyaW5nc1xuXHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0aWYgKCBzZWxlY3Rvci5jaGFyQXQoMCkgPT09IFwiPFwiICYmIHNlbGVjdG9yLmNoYXJBdCggc2VsZWN0b3IubGVuZ3RoIC0gMSApID09PSBcIj5cIiAmJiBzZWxlY3Rvci5sZW5ndGggPj0gMyApIHtcblx0XHRcdFx0Ly8gQXNzdW1lIHRoYXQgc3RyaW5ncyB0aGF0IHN0YXJ0IGFuZCBlbmQgd2l0aCA8PiBhcmUgSFRNTCBhbmQgc2tpcCB0aGUgcmVnZXggY2hlY2tcblx0XHRcdFx0bWF0Y2ggPSBbIG51bGwsIHNlbGVjdG9yLCBudWxsIF07XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYXRjaCBodG1sIG9yIG1ha2Ugc3VyZSBubyBjb250ZXh0IGlzIHNwZWNpZmllZCBmb3IgI2lkXG5cdFx0XHRpZiAoIG1hdGNoICYmIChtYXRjaFsxXSB8fCAhY29udGV4dCkgKSB7XG5cblx0XHRcdFx0Ly8gSEFORExFOiAkKGh0bWwpIC0+ICQoYXJyYXkpXG5cdFx0XHRcdGlmICggbWF0Y2hbMV0gKSB7XG5cdFx0XHRcdFx0Y29udGV4dCA9IGNvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgPyBjb250ZXh0WzBdIDogY29udGV4dDtcblx0XHRcdFx0XHRkb2MgPSAoIGNvbnRleHQgJiYgY29udGV4dC5ub2RlVHlwZSA/IGNvbnRleHQub3duZXJEb2N1bWVudCB8fCBjb250ZXh0IDogZG9jdW1lbnQgKTtcblxuXHRcdFx0XHRcdC8vIHNjcmlwdHMgaXMgdHJ1ZSBmb3IgYmFjay1jb21wYXRcblx0XHRcdFx0XHRzZWxlY3RvciA9IGpRdWVyeS5wYXJzZUhUTUwoIG1hdGNoWzFdLCBkb2MsIHRydWUgKTtcblx0XHRcdFx0XHRpZiAoIHJzaW5nbGVUYWcudGVzdCggbWF0Y2hbMV0gKSAmJiBqUXVlcnkuaXNQbGFpbk9iamVjdCggY29udGV4dCApICkge1xuXHRcdFx0XHRcdFx0dGhpcy5hdHRyLmNhbGwoIHNlbGVjdG9yLCBjb250ZXh0LCB0cnVlICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGpRdWVyeS5tZXJnZSggdGhpcywgc2VsZWN0b3IgKTtcblxuXHRcdFx0XHQvLyBIQU5ETEU6ICQoI2lkKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggbWF0Y2hbMl0gKTtcblxuXHRcdFx0XHRcdC8vIENoZWNrIHBhcmVudE5vZGUgdG8gY2F0Y2ggd2hlbiBCbGFja2JlcnJ5IDQuNiByZXR1cm5zXG5cdFx0XHRcdFx0Ly8gbm9kZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAjNjk2M1xuXHRcdFx0XHRcdGlmICggZWxlbSAmJiBlbGVtLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgSUUgYW5kIE9wZXJhIHJldHVybiBpdGVtc1xuXHRcdFx0XHRcdFx0Ly8gYnkgbmFtZSBpbnN0ZWFkIG9mIElEXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0uaWQgIT09IG1hdGNoWzJdICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcm9vdGpRdWVyeS5maW5kKCBzZWxlY3RvciApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBPdGhlcndpc2UsIHdlIGluamVjdCB0aGUgZWxlbWVudCBkaXJlY3RseSBpbnRvIHRoZSBqUXVlcnkgb2JqZWN0XG5cdFx0XHRcdFx0XHR0aGlzLmxlbmd0aCA9IDE7XG5cdFx0XHRcdFx0XHR0aGlzWzBdID0gZWxlbTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLmNvbnRleHQgPSBkb2N1bWVudDtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gSEFORExFOiAkKGV4cHIsICQoLi4uKSlcblx0XHRcdH0gZWxzZSBpZiAoICFjb250ZXh0IHx8IGNvbnRleHQuanF1ZXJ5ICkge1xuXHRcdFx0XHRyZXR1cm4gKCBjb250ZXh0IHx8IHJvb3RqUXVlcnkgKS5maW5kKCBzZWxlY3RvciApO1xuXG5cdFx0XHQvLyBIQU5ETEU6ICQoZXhwciwgY29udGV4dClcblx0XHRcdC8vICh3aGljaCBpcyBqdXN0IGVxdWl2YWxlbnQgdG86ICQoY29udGV4dCkuZmluZChleHByKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IoIGNvbnRleHQgKS5maW5kKCBzZWxlY3RvciApO1xuXHRcdFx0fVxuXG5cdFx0Ly8gSEFORExFOiAkKGZ1bmN0aW9uKVxuXHRcdC8vIFNob3J0Y3V0IGZvciBkb2N1bWVudCByZWFkeVxuXHRcdH0gZWxzZSBpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBzZWxlY3RvciApICkge1xuXHRcdFx0cmV0dXJuIHJvb3RqUXVlcnkucmVhZHkoIHNlbGVjdG9yICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBzZWxlY3Rvci5zZWxlY3RvciAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yLnNlbGVjdG9yO1xuXHRcdFx0dGhpcy5jb250ZXh0ID0gc2VsZWN0b3IuY29udGV4dDtcblx0XHR9XG5cblx0XHRyZXR1cm4galF1ZXJ5Lm1ha2VBcnJheSggc2VsZWN0b3IsIHRoaXMgKTtcblx0fSxcblxuXHQvLyBTdGFydCB3aXRoIGFuIGVtcHR5IHNlbGVjdG9yXG5cdHNlbGVjdG9yOiBcIlwiLFxuXG5cdC8vIFRoZSBjdXJyZW50IHZlcnNpb24gb2YgalF1ZXJ5IGJlaW5nIHVzZWRcblx0anF1ZXJ5OiBcIjEuOC4xXCIsXG5cblx0Ly8gVGhlIGRlZmF1bHQgbGVuZ3RoIG9mIGEgalF1ZXJ5IG9iamVjdCBpcyAwXG5cdGxlbmd0aDogMCxcblxuXHQvLyBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIGNvbnRhaW5lZCBpbiB0aGUgbWF0Y2hlZCBlbGVtZW50IHNldFxuXHRzaXplOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5sZW5ndGg7XG5cdH0sXG5cblx0dG9BcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGNvcmVfc2xpY2UuY2FsbCggdGhpcyApO1xuXHR9LFxuXG5cdC8vIEdldCB0aGUgTnRoIGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgZWxlbWVudCBzZXQgT1Jcblx0Ly8gR2V0IHRoZSB3aG9sZSBtYXRjaGVkIGVsZW1lbnQgc2V0IGFzIGEgY2xlYW4gYXJyYXlcblx0Z2V0OiBmdW5jdGlvbiggbnVtICkge1xuXHRcdHJldHVybiBudW0gPT0gbnVsbCA/XG5cblx0XHRcdC8vIFJldHVybiBhICdjbGVhbicgYXJyYXlcblx0XHRcdHRoaXMudG9BcnJheSgpIDpcblxuXHRcdFx0Ly8gUmV0dXJuIGp1c3QgdGhlIG9iamVjdFxuXHRcdFx0KCBudW0gPCAwID8gdGhpc1sgdGhpcy5sZW5ndGggKyBudW0gXSA6IHRoaXNbIG51bSBdICk7XG5cdH0sXG5cblx0Ly8gVGFrZSBhbiBhcnJheSBvZiBlbGVtZW50cyBhbmQgcHVzaCBpdCBvbnRvIHRoZSBzdGFja1xuXHQvLyAocmV0dXJuaW5nIHRoZSBuZXcgbWF0Y2hlZCBlbGVtZW50IHNldClcblx0cHVzaFN0YWNrOiBmdW5jdGlvbiggZWxlbXMsIG5hbWUsIHNlbGVjdG9yICkge1xuXG5cdFx0Ly8gQnVpbGQgYSBuZXcgalF1ZXJ5IG1hdGNoZWQgZWxlbWVudCBzZXRcblx0XHR2YXIgcmV0ID0galF1ZXJ5Lm1lcmdlKCB0aGlzLmNvbnN0cnVjdG9yKCksIGVsZW1zICk7XG5cblx0XHQvLyBBZGQgdGhlIG9sZCBvYmplY3Qgb250byB0aGUgc3RhY2sgKGFzIGEgcmVmZXJlbmNlKVxuXHRcdHJldC5wcmV2T2JqZWN0ID0gdGhpcztcblxuXHRcdHJldC5jb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuXG5cdFx0aWYgKCBuYW1lID09PSBcImZpbmRcIiApIHtcblx0XHRcdHJldC5zZWxlY3RvciA9IHRoaXMuc2VsZWN0b3IgKyAoIHRoaXMuc2VsZWN0b3IgPyBcIiBcIiA6IFwiXCIgKSArIHNlbGVjdG9yO1xuXHRcdH0gZWxzZSBpZiAoIG5hbWUgKSB7XG5cdFx0XHRyZXQuc2VsZWN0b3IgPSB0aGlzLnNlbGVjdG9yICsgXCIuXCIgKyBuYW1lICsgXCIoXCIgKyBzZWxlY3RvciArIFwiKVwiO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiB0aGUgbmV3bHktZm9ybWVkIGVsZW1lbnQgc2V0XG5cdFx0cmV0dXJuIHJldDtcblx0fSxcblxuXHQvLyBFeGVjdXRlIGEgY2FsbGJhY2sgZm9yIGV2ZXJ5IGVsZW1lbnQgaW4gdGhlIG1hdGNoZWQgc2V0LlxuXHQvLyAoWW91IGNhbiBzZWVkIHRoZSBhcmd1bWVudHMgd2l0aCBhbiBhcnJheSBvZiBhcmdzLCBidXQgdGhpcyBpc1xuXHQvLyBvbmx5IHVzZWQgaW50ZXJuYWxseS4pXG5cdGVhY2g6IGZ1bmN0aW9uKCBjYWxsYmFjaywgYXJncyApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmVhY2goIHRoaXMsIGNhbGxiYWNrLCBhcmdzICk7XG5cdH0sXG5cblx0cmVhZHk6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHQvLyBBZGQgdGhlIGNhbGxiYWNrXG5cdFx0alF1ZXJ5LnJlYWR5LnByb21pc2UoKS5kb25lKCBmbiApO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZXE6IGZ1bmN0aW9uKCBpICkge1xuXHRcdGkgPSAraTtcblx0XHRyZXR1cm4gaSA9PT0gLTEgP1xuXHRcdFx0dGhpcy5zbGljZSggaSApIDpcblx0XHRcdHRoaXMuc2xpY2UoIGksIGkgKyAxICk7XG5cdH0sXG5cblx0Zmlyc3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmVxKCAwICk7XG5cdH0sXG5cblx0bGFzdDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZXEoIC0xICk7XG5cdH0sXG5cblx0c2xpY2U6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnB1c2hTdGFjayggY29yZV9zbGljZS5hcHBseSggdGhpcywgYXJndW1lbnRzICksXG5cdFx0XHRcInNsaWNlXCIsIGNvcmVfc2xpY2UuY2FsbChhcmd1bWVudHMpLmpvaW4oXCIsXCIpICk7XG5cdH0sXG5cblx0bWFwOiBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWFwKHRoaXMsIGZ1bmN0aW9uKCBlbGVtLCBpICkge1xuXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwoIGVsZW0sIGksIGVsZW0gKTtcblx0XHR9KSk7XG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wcmV2T2JqZWN0IHx8IHRoaXMuY29uc3RydWN0b3IobnVsbCk7XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHQvLyBCZWhhdmVzIGxpa2UgYW4gQXJyYXkncyBtZXRob2QsIG5vdCBsaWtlIGEgalF1ZXJ5IG1ldGhvZC5cblx0cHVzaDogY29yZV9wdXNoLFxuXHRzb3J0OiBbXS5zb3J0LFxuXHRzcGxpY2U6IFtdLnNwbGljZVxufTtcblxuLy8gR2l2ZSB0aGUgaW5pdCBmdW5jdGlvbiB0aGUgalF1ZXJ5IHByb3RvdHlwZSBmb3IgbGF0ZXIgaW5zdGFudGlhdGlvblxualF1ZXJ5LmZuLmluaXQucHJvdG90eXBlID0galF1ZXJ5LmZuO1xuXG5qUXVlcnkuZXh0ZW5kID0galF1ZXJ5LmZuLmV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzBdIHx8IHt9LFxuXHRcdGkgPSAxLFxuXHRcdGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdFx0ZGVlcCA9IGZhbHNlO1xuXG5cdC8vIEhhbmRsZSBhIGRlZXAgY29weSBzaXR1YXRpb25cblx0aWYgKCB0eXBlb2YgdGFyZ2V0ID09PSBcImJvb2xlYW5cIiApIHtcblx0XHRkZWVwID0gdGFyZ2V0O1xuXHRcdHRhcmdldCA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcblx0XHQvLyBza2lwIHRoZSBib29sZWFuIGFuZCB0aGUgdGFyZ2V0XG5cdFx0aSA9IDI7XG5cdH1cblxuXHQvLyBIYW5kbGUgY2FzZSB3aGVuIHRhcmdldCBpcyBhIHN0cmluZyBvciBzb21ldGhpbmcgKHBvc3NpYmxlIGluIGRlZXAgY29weSlcblx0aWYgKCB0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiICYmICFqUXVlcnkuaXNGdW5jdGlvbih0YXJnZXQpICkge1xuXHRcdHRhcmdldCA9IHt9O1xuXHR9XG5cblx0Ly8gZXh0ZW5kIGpRdWVyeSBpdHNlbGYgaWYgb25seSBvbmUgYXJndW1lbnQgaXMgcGFzc2VkXG5cdGlmICggbGVuZ3RoID09PSBpICkge1xuXHRcdHRhcmdldCA9IHRoaXM7XG5cdFx0LS1pO1xuXHR9XG5cblx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0Ly8gT25seSBkZWFsIHdpdGggbm9uLW51bGwvdW5kZWZpbmVkIHZhbHVlc1xuXHRcdGlmICggKG9wdGlvbnMgPSBhcmd1bWVudHNbIGkgXSkgIT0gbnVsbCApIHtcblx0XHRcdC8vIEV4dGVuZCB0aGUgYmFzZSBvYmplY3Rcblx0XHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRcdFx0c3JjID0gdGFyZ2V0WyBuYW1lIF07XG5cdFx0XHRcdGNvcHkgPSBvcHRpb25zWyBuYW1lIF07XG5cblx0XHRcdFx0Ly8gUHJldmVudCBuZXZlci1lbmRpbmcgbG9vcFxuXHRcdFx0XHRpZiAoIHRhcmdldCA9PT0gY29weSApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlY3Vyc2UgaWYgd2UncmUgbWVyZ2luZyBwbGFpbiBvYmplY3RzIG9yIGFycmF5c1xuXHRcdFx0XHRpZiAoIGRlZXAgJiYgY29weSAmJiAoIGpRdWVyeS5pc1BsYWluT2JqZWN0KGNvcHkpIHx8IChjb3B5SXNBcnJheSA9IGpRdWVyeS5pc0FycmF5KGNvcHkpKSApICkge1xuXHRcdFx0XHRcdGlmICggY29weUlzQXJyYXkgKSB7XG5cdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgalF1ZXJ5LmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xuXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNsb25lID0gc3JjICYmIGpRdWVyeS5pc1BsYWluT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBOZXZlciBtb3ZlIG9yaWdpbmFsIG9iamVjdHMsIGNsb25lIHRoZW1cblx0XHRcdFx0XHR0YXJnZXRbIG5hbWUgXSA9IGpRdWVyeS5leHRlbmQoIGRlZXAsIGNsb25lLCBjb3B5ICk7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgYnJpbmcgaW4gdW5kZWZpbmVkIHZhbHVlc1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBjb3B5ICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdFx0dGFyZ2V0WyBuYW1lIF0gPSBjb3B5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBtb2RpZmllZCBvYmplY3Rcblx0cmV0dXJuIHRhcmdldDtcbn07XG5cbmpRdWVyeS5leHRlbmQoe1xuXHRub0NvbmZsaWN0OiBmdW5jdGlvbiggZGVlcCApIHtcblx0XHRpZiAoIHdpbmRvdy4kID09PSBqUXVlcnkgKSB7XG5cdFx0XHR3aW5kb3cuJCA9IF8kO1xuXHRcdH1cblxuXHRcdGlmICggZGVlcCAmJiB3aW5kb3cualF1ZXJ5ID09PSBqUXVlcnkgKSB7XG5cdFx0XHR3aW5kb3cualF1ZXJ5ID0gX2pRdWVyeTtcblx0XHR9XG5cblx0XHRyZXR1cm4galF1ZXJ5O1xuXHR9LFxuXG5cdC8vIElzIHRoZSBET00gcmVhZHkgdG8gYmUgdXNlZD8gU2V0IHRvIHRydWUgb25jZSBpdCBvY2N1cnMuXG5cdGlzUmVhZHk6IGZhbHNlLFxuXG5cdC8vIEEgY291bnRlciB0byB0cmFjayBob3cgbWFueSBpdGVtcyB0byB3YWl0IGZvciBiZWZvcmVcblx0Ly8gdGhlIHJlYWR5IGV2ZW50IGZpcmVzLiBTZWUgIzY3ODFcblx0cmVhZHlXYWl0OiAxLFxuXG5cdC8vIEhvbGQgKG9yIHJlbGVhc2UpIHRoZSByZWFkeSBldmVudFxuXHRob2xkUmVhZHk6IGZ1bmN0aW9uKCBob2xkICkge1xuXHRcdGlmICggaG9sZCApIHtcblx0XHRcdGpRdWVyeS5yZWFkeVdhaXQrKztcblx0XHR9IGVsc2Uge1xuXHRcdFx0alF1ZXJ5LnJlYWR5KCB0cnVlICk7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIEhhbmRsZSB3aGVuIHRoZSBET00gaXMgcmVhZHlcblx0cmVhZHk6IGZ1bmN0aW9uKCB3YWl0ICkge1xuXG5cdFx0Ly8gQWJvcnQgaWYgdGhlcmUgYXJlIHBlbmRpbmcgaG9sZHMgb3Igd2UncmUgYWxyZWFkeSByZWFkeVxuXHRcdGlmICggd2FpdCA9PT0gdHJ1ZSA/IC0talF1ZXJ5LnJlYWR5V2FpdCA6IGpRdWVyeS5pc1JlYWR5ICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSBib2R5IGV4aXN0cywgYXQgbGVhc3QsIGluIGNhc2UgSUUgZ2V0cyBhIGxpdHRsZSBvdmVyemVhbG91cyAodGlja2V0ICM1NDQzKS5cblx0XHRpZiAoICFkb2N1bWVudC5ib2R5ICkge1xuXHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoIGpRdWVyeS5yZWFkeSwgMSApO1xuXHRcdH1cblxuXHRcdC8vIFJlbWVtYmVyIHRoYXQgdGhlIERPTSBpcyByZWFkeVxuXHRcdGpRdWVyeS5pc1JlYWR5ID0gdHJ1ZTtcblxuXHRcdC8vIElmIGEgbm9ybWFsIERPTSBSZWFkeSBldmVudCBmaXJlZCwgZGVjcmVtZW50LCBhbmQgd2FpdCBpZiBuZWVkIGJlXG5cdFx0aWYgKCB3YWl0ICE9PSB0cnVlICYmIC0talF1ZXJ5LnJlYWR5V2FpdCA+IDAgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlcmUgYXJlIGZ1bmN0aW9ucyBib3VuZCwgdG8gZXhlY3V0ZVxuXHRcdHJlYWR5TGlzdC5yZXNvbHZlV2l0aCggZG9jdW1lbnQsIFsgalF1ZXJ5IF0gKTtcblxuXHRcdC8vIFRyaWdnZXIgYW55IGJvdW5kIHJlYWR5IGV2ZW50c1xuXHRcdGlmICggalF1ZXJ5LmZuLnRyaWdnZXIgKSB7XG5cdFx0XHRqUXVlcnkoIGRvY3VtZW50ICkudHJpZ2dlcihcInJlYWR5XCIpLm9mZihcInJlYWR5XCIpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBTZWUgdGVzdC91bml0L2NvcmUuanMgZm9yIGRldGFpbHMgY29uY2VybmluZyBpc0Z1bmN0aW9uLlxuXHQvLyBTaW5jZSB2ZXJzaW9uIDEuMywgRE9NIG1ldGhvZHMgYW5kIGZ1bmN0aW9ucyBsaWtlIGFsZXJ0XG5cdC8vIGFyZW4ndCBzdXBwb3J0ZWQuIFRoZXkgcmV0dXJuIGZhbHNlIG9uIElFICgjMjk2OCkuXG5cdGlzRnVuY3Rpb246IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS50eXBlKG9iaikgPT09IFwiZnVuY3Rpb25cIjtcblx0fSxcblxuXHRpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS50eXBlKG9iaikgPT09IFwiYXJyYXlcIjtcblx0fSxcblxuXHRpc1dpbmRvdzogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRyZXR1cm4gb2JqICE9IG51bGwgJiYgb2JqID09IG9iai53aW5kb3c7XG5cdH0sXG5cblx0aXNOdW1lcmljOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiAhaXNOYU4oIHBhcnNlRmxvYXQob2JqKSApICYmIGlzRmluaXRlKCBvYmogKTtcblx0fSxcblxuXHR0eXBlOiBmdW5jdGlvbiggb2JqICkge1xuXHRcdHJldHVybiBvYmogPT0gbnVsbCA/XG5cdFx0XHRTdHJpbmcoIG9iaiApIDpcblx0XHRcdGNsYXNzMnR5cGVbIGNvcmVfdG9TdHJpbmcuY2FsbChvYmopIF0gfHwgXCJvYmplY3RcIjtcblx0fSxcblxuXHRpc1BsYWluT2JqZWN0OiBmdW5jdGlvbiggb2JqICkge1xuXHRcdC8vIE11c3QgYmUgYW4gT2JqZWN0LlxuXHRcdC8vIEJlY2F1c2Ugb2YgSUUsIHdlIGFsc28gaGF2ZSB0byBjaGVjayB0aGUgcHJlc2VuY2Ugb2YgdGhlIGNvbnN0cnVjdG9yIHByb3BlcnR5LlxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IERPTSBub2RlcyBhbmQgd2luZG93IG9iamVjdHMgZG9uJ3QgcGFzcyB0aHJvdWdoLCBhcyB3ZWxsXG5cdFx0aWYgKCAhb2JqIHx8IGpRdWVyeS50eXBlKG9iaikgIT09IFwib2JqZWN0XCIgfHwgb2JqLm5vZGVUeXBlIHx8IGpRdWVyeS5pc1dpbmRvdyggb2JqICkgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIE5vdCBvd24gY29uc3RydWN0b3IgcHJvcGVydHkgbXVzdCBiZSBPYmplY3Rcblx0XHRcdGlmICggb2JqLmNvbnN0cnVjdG9yICYmXG5cdFx0XHRcdCFjb3JlX2hhc093bi5jYWxsKG9iaiwgXCJjb25zdHJ1Y3RvclwiKSAmJlxuXHRcdFx0XHQhY29yZV9oYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCBcImlzUHJvdG90eXBlT2ZcIikgKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdC8vIElFOCw5IFdpbGwgdGhyb3cgZXhjZXB0aW9ucyBvbiBjZXJ0YWluIGhvc3Qgb2JqZWN0cyAjOTg5N1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIE93biBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhdGVkIGZpcnN0bHksIHNvIHRvIHNwZWVkIHVwLFxuXHRcdC8vIGlmIGxhc3Qgb25lIGlzIG93biwgdGhlbiBhbGwgcHJvcGVydGllcyBhcmUgb3duLlxuXG5cdFx0dmFyIGtleTtcblx0XHRmb3IgKCBrZXkgaW4gb2JqICkge31cblxuXHRcdHJldHVybiBrZXkgPT09IHVuZGVmaW5lZCB8fCBjb3JlX2hhc093bi5jYWxsKCBvYmosIGtleSApO1xuXHR9LFxuXG5cdGlzRW1wdHlPYmplY3Q6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0dmFyIG5hbWU7XG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9LFxuXG5cdGVycm9yOiBmdW5jdGlvbiggbXNnICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cdH0sXG5cblx0Ly8gZGF0YTogc3RyaW5nIG9mIGh0bWxcblx0Ly8gY29udGV4dCAob3B0aW9uYWwpOiBJZiBzcGVjaWZpZWQsIHRoZSBmcmFnbWVudCB3aWxsIGJlIGNyZWF0ZWQgaW4gdGhpcyBjb250ZXh0LCBkZWZhdWx0cyB0byBkb2N1bWVudFxuXHQvLyBzY3JpcHRzIChvcHRpb25hbCk6IElmIHRydWUsIHdpbGwgaW5jbHVkZSBzY3JpcHRzIHBhc3NlZCBpbiB0aGUgaHRtbCBzdHJpbmdcblx0cGFyc2VIVE1MOiBmdW5jdGlvbiggZGF0YSwgY29udGV4dCwgc2NyaXB0cyApIHtcblx0XHR2YXIgcGFyc2VkO1xuXHRcdGlmICggIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0aWYgKCB0eXBlb2YgY29udGV4dCA9PT0gXCJib29sZWFuXCIgKSB7XG5cdFx0XHRzY3JpcHRzID0gY29udGV4dDtcblx0XHRcdGNvbnRleHQgPSAwO1xuXHRcdH1cblx0XHRjb250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuXHRcdC8vIFNpbmdsZSB0YWdcblx0XHRpZiAoIChwYXJzZWQgPSByc2luZ2xlVGFnLmV4ZWMoIGRhdGEgKSkgKSB7XG5cdFx0XHRyZXR1cm4gWyBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoIHBhcnNlZFsxXSApIF07XG5cdFx0fVxuXG5cdFx0cGFyc2VkID0galF1ZXJ5LmJ1aWxkRnJhZ21lbnQoIFsgZGF0YSBdLCBjb250ZXh0LCBzY3JpcHRzID8gbnVsbCA6IFtdICk7XG5cdFx0cmV0dXJuIGpRdWVyeS5tZXJnZSggW10sXG5cdFx0XHQocGFyc2VkLmNhY2hlYWJsZSA/IGpRdWVyeS5jbG9uZSggcGFyc2VkLmZyYWdtZW50ICkgOiBwYXJzZWQuZnJhZ21lbnQpLmNoaWxkTm9kZXMgKTtcblx0fSxcblxuXHRwYXJzZUpTT046IGZ1bmN0aW9uKCBkYXRhICkge1xuXHRcdGlmICggIWRhdGEgfHwgdHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSBsZWFkaW5nL3RyYWlsaW5nIHdoaXRlc3BhY2UgaXMgcmVtb3ZlZCAoSUUgY2FuJ3QgaGFuZGxlIGl0KVxuXHRcdGRhdGEgPSBqUXVlcnkudHJpbSggZGF0YSApO1xuXG5cdFx0Ly8gQXR0ZW1wdCB0byBwYXJzZSB1c2luZyB0aGUgbmF0aXZlIEpTT04gcGFyc2VyIGZpcnN0XG5cdFx0aWYgKCB3aW5kb3cuSlNPTiAmJiB3aW5kb3cuSlNPTi5wYXJzZSApIHtcblx0XHRcdHJldHVybiB3aW5kb3cuSlNPTi5wYXJzZSggZGF0YSApO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGUgaW5jb21pbmcgZGF0YSBpcyBhY3R1YWwgSlNPTlxuXHRcdC8vIExvZ2ljIGJvcnJvd2VkIGZyb20gaHR0cDovL2pzb24ub3JnL2pzb24yLmpzXG5cdFx0aWYgKCBydmFsaWRjaGFycy50ZXN0KCBkYXRhLnJlcGxhY2UoIHJ2YWxpZGVzY2FwZSwgXCJAXCIgKVxuXHRcdFx0LnJlcGxhY2UoIHJ2YWxpZHRva2VucywgXCJdXCIgKVxuXHRcdFx0LnJlcGxhY2UoIHJ2YWxpZGJyYWNlcywgXCJcIikpICkge1xuXG5cdFx0XHRyZXR1cm4gKCBuZXcgRnVuY3Rpb24oIFwicmV0dXJuIFwiICsgZGF0YSApICkoKTtcblxuXHRcdH1cblx0XHRqUXVlcnkuZXJyb3IoIFwiSW52YWxpZCBKU09OOiBcIiArIGRhdGEgKTtcblx0fSxcblxuXHQvLyBDcm9zcy1icm93c2VyIHhtbCBwYXJzaW5nXG5cdHBhcnNlWE1MOiBmdW5jdGlvbiggZGF0YSApIHtcblx0XHR2YXIgeG1sLCB0bXA7XG5cdFx0aWYgKCAhZGF0YSB8fCB0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0aWYgKCB3aW5kb3cuRE9NUGFyc2VyICkgeyAvLyBTdGFuZGFyZFxuXHRcdFx0XHR0bXAgPSBuZXcgRE9NUGFyc2VyKCk7XG5cdFx0XHRcdHhtbCA9IHRtcC5wYXJzZUZyb21TdHJpbmcoIGRhdGEgLCBcInRleHQveG1sXCIgKTtcblx0XHRcdH0gZWxzZSB7IC8vIElFXG5cdFx0XHRcdHhtbCA9IG5ldyBBY3RpdmVYT2JqZWN0KCBcIk1pY3Jvc29mdC5YTUxET01cIiApO1xuXHRcdFx0XHR4bWwuYXN5bmMgPSBcImZhbHNlXCI7XG5cdFx0XHRcdHhtbC5sb2FkWE1MKCBkYXRhICk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCggZSApIHtcblx0XHRcdHhtbCA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKCAheG1sIHx8ICF4bWwuZG9jdW1lbnRFbGVtZW50IHx8IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJwYXJzZXJlcnJvclwiICkubGVuZ3RoICkge1xuXHRcdFx0alF1ZXJ5LmVycm9yKCBcIkludmFsaWQgWE1MOiBcIiArIGRhdGEgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHhtbDtcblx0fSxcblxuXHRub29wOiBmdW5jdGlvbigpIHt9LFxuXG5cdC8vIEV2YWx1YXRlcyBhIHNjcmlwdCBpbiBhIGdsb2JhbCBjb250ZXh0XG5cdC8vIFdvcmthcm91bmRzIGJhc2VkIG9uIGZpbmRpbmdzIGJ5IEppbSBEcmlzY29sbFxuXHQvLyBodHRwOi8vd2VibG9ncy5qYXZhLm5ldC9ibG9nL2RyaXNjb2xsL2FyY2hpdmUvMjAwOS8wOS8wOC9ldmFsLWphdmFzY3JpcHQtZ2xvYmFsLWNvbnRleHRcblx0Z2xvYmFsRXZhbDogZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0aWYgKCBkYXRhICYmIGNvcmVfcm5vdHdoaXRlLnRlc3QoIGRhdGEgKSApIHtcblx0XHRcdC8vIFdlIHVzZSBleGVjU2NyaXB0IG9uIEludGVybmV0IEV4cGxvcmVyXG5cdFx0XHQvLyBXZSB1c2UgYW4gYW5vbnltb3VzIGZ1bmN0aW9uIHNvIHRoYXQgY29udGV4dCBpcyB3aW5kb3dcblx0XHRcdC8vIHJhdGhlciB0aGFuIGpRdWVyeSBpbiBGaXJlZm94XG5cdFx0XHQoIHdpbmRvdy5leGVjU2NyaXB0IHx8IGZ1bmN0aW9uKCBkYXRhICkge1xuXHRcdFx0XHR3aW5kb3dbIFwiZXZhbFwiIF0uY2FsbCggd2luZG93LCBkYXRhICk7XG5cdFx0XHR9ICkoIGRhdGEgKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8gQ29udmVydCBkYXNoZWQgdG8gY2FtZWxDYXNlOyB1c2VkIGJ5IHRoZSBjc3MgYW5kIGRhdGEgbW9kdWxlc1xuXHQvLyBNaWNyb3NvZnQgZm9yZ290IHRvIGh1bXAgdGhlaXIgdmVuZG9yIHByZWZpeCAoIzk1NzIpXG5cdGNhbWVsQ2FzZTogZnVuY3Rpb24oIHN0cmluZyApIHtcblx0XHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoIHJtc1ByZWZpeCwgXCJtcy1cIiApLnJlcGxhY2UoIHJkYXNoQWxwaGEsIGZjYW1lbENhc2UgKTtcblx0fSxcblxuXHRub2RlTmFtZTogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09PSBuYW1lLnRvVXBwZXJDYXNlKCk7XG5cdH0sXG5cblx0Ly8gYXJncyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRlYWNoOiBmdW5jdGlvbiggb2JqLCBjYWxsYmFjaywgYXJncyApIHtcblx0XHR2YXIgbmFtZSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bGVuZ3RoID0gb2JqLmxlbmd0aCxcblx0XHRcdGlzT2JqID0gbGVuZ3RoID09PSB1bmRlZmluZWQgfHwgalF1ZXJ5LmlzRnVuY3Rpb24oIG9iaiApO1xuXG5cdFx0aWYgKCBhcmdzICkge1xuXHRcdFx0aWYgKCBpc09iaiApIHtcblx0XHRcdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRcdFx0aWYgKCBjYWxsYmFjay5hcHBseSggb2JqWyBuYW1lIF0sIGFyZ3MgKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgKSB7XG5cdFx0XHRcdFx0aWYgKCBjYWxsYmFjay5hcHBseSggb2JqWyBpKysgXSwgYXJncyApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0Ly8gQSBzcGVjaWFsLCBmYXN0LCBjYXNlIGZvciB0aGUgbW9zdCBjb21tb24gdXNlIG9mIGVhY2hcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCBpc09iaiApIHtcblx0XHRcdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRcdFx0aWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIG5hbWUgXSwgbmFtZSwgb2JqWyBuYW1lIF0gKSA9PT0gZmFsc2UgKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoIDsgaSA8IGxlbmd0aDsgKSB7XG5cdFx0XHRcdFx0aWYgKCBjYWxsYmFjay5jYWxsKCBvYmpbIGkgXSwgaSwgb2JqWyBpKysgXSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0Ly8gVXNlIG5hdGl2ZSBTdHJpbmcudHJpbSBmdW5jdGlvbiB3aGVyZXZlciBwb3NzaWJsZVxuXHR0cmltOiBjb3JlX3RyaW0gJiYgIWNvcmVfdHJpbS5jYWxsKFwiXFx1RkVGRlxceEEwXCIpID9cblx0XHRmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdHJldHVybiB0ZXh0ID09IG51bGwgP1xuXHRcdFx0XHRcIlwiIDpcblx0XHRcdFx0Y29yZV90cmltLmNhbGwoIHRleHQgKTtcblx0XHR9IDpcblxuXHRcdC8vIE90aGVyd2lzZSB1c2Ugb3VyIG93biB0cmltbWluZyBmdW5jdGlvbmFsaXR5XG5cdFx0ZnVuY3Rpb24oIHRleHQgKSB7XG5cdFx0XHRyZXR1cm4gdGV4dCA9PSBudWxsID9cblx0XHRcdFx0XCJcIiA6XG5cdFx0XHRcdHRleHQudG9TdHJpbmcoKS5yZXBsYWNlKCBydHJpbSwgXCJcIiApO1xuXHRcdH0sXG5cblx0Ly8gcmVzdWx0cyBpcyBmb3IgaW50ZXJuYWwgdXNhZ2Ugb25seVxuXHRtYWtlQXJyYXk6IGZ1bmN0aW9uKCBhcnIsIHJlc3VsdHMgKSB7XG5cdFx0dmFyIHR5cGUsXG5cdFx0XHRyZXQgPSByZXN1bHRzIHx8IFtdO1xuXG5cdFx0aWYgKCBhcnIgIT0gbnVsbCApIHtcblx0XHRcdC8vIFRoZSB3aW5kb3csIHN0cmluZ3MgKGFuZCBmdW5jdGlvbnMpIGFsc28gaGF2ZSAnbGVuZ3RoJ1xuXHRcdFx0Ly8gVHdlYWtlZCBsb2dpYyBzbGlnaHRseSB0byBoYW5kbGUgQmxhY2tiZXJyeSA0LjcgUmVnRXhwIGlzc3VlcyAjNjkzMFxuXHRcdFx0dHlwZSA9IGpRdWVyeS50eXBlKCBhcnIgKTtcblxuXHRcdFx0aWYgKCBhcnIubGVuZ3RoID09IG51bGwgfHwgdHlwZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlID09PSBcImZ1bmN0aW9uXCIgfHwgdHlwZSA9PT0gXCJyZWdleHBcIiB8fCBqUXVlcnkuaXNXaW5kb3coIGFyciApICkge1xuXHRcdFx0XHRjb3JlX3B1c2guY2FsbCggcmV0LCBhcnIgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGpRdWVyeS5tZXJnZSggcmV0LCBhcnIgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9LFxuXG5cdGluQXJyYXk6IGZ1bmN0aW9uKCBlbGVtLCBhcnIsIGkgKSB7XG5cdFx0dmFyIGxlbjtcblxuXHRcdGlmICggYXJyICkge1xuXHRcdFx0aWYgKCBjb3JlX2luZGV4T2YgKSB7XG5cdFx0XHRcdHJldHVybiBjb3JlX2luZGV4T2YuY2FsbCggYXJyLCBlbGVtLCBpICk7XG5cdFx0XHR9XG5cblx0XHRcdGxlbiA9IGFyci5sZW5ndGg7XG5cdFx0XHRpID0gaSA/IGkgPCAwID8gTWF0aC5tYXgoIDAsIGxlbiArIGkgKSA6IGkgOiAwO1xuXG5cdFx0XHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcblx0XHRcdFx0Ly8gU2tpcCBhY2Nlc3NpbmcgaW4gc3BhcnNlIGFycmF5c1xuXHRcdFx0XHRpZiAoIGkgaW4gYXJyICYmIGFyclsgaSBdID09PSBlbGVtICkge1xuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIC0xO1xuXHR9LFxuXG5cdG1lcmdlOiBmdW5jdGlvbiggZmlyc3QsIHNlY29uZCApIHtcblx0XHR2YXIgbCA9IHNlY29uZC5sZW5ndGgsXG5cdFx0XHRpID0gZmlyc3QubGVuZ3RoLFxuXHRcdFx0aiA9IDA7XG5cblx0XHRpZiAoIHR5cGVvZiBsID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0Zm9yICggOyBqIDwgbDsgaisrICkge1xuXHRcdFx0XHRmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGogXTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR3aGlsZSAoIHNlY29uZFtqXSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRmaXJzdFsgaSsrIF0gPSBzZWNvbmRbIGorKyBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZpcnN0Lmxlbmd0aCA9IGk7XG5cblx0XHRyZXR1cm4gZmlyc3Q7XG5cdH0sXG5cblx0Z3JlcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgaW52ICkge1xuXHRcdHZhciByZXRWYWwsXG5cdFx0XHRyZXQgPSBbXSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuXHRcdGludiA9ICEhaW52O1xuXG5cdFx0Ly8gR28gdGhyb3VnaCB0aGUgYXJyYXksIG9ubHkgc2F2aW5nIHRoZSBpdGVtc1xuXHRcdC8vIHRoYXQgcGFzcyB0aGUgdmFsaWRhdG9yIGZ1bmN0aW9uXG5cdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRyZXRWYWwgPSAhIWNhbGxiYWNrKCBlbGVtc1sgaSBdLCBpICk7XG5cdFx0XHRpZiAoIGludiAhPT0gcmV0VmFsICkge1xuXHRcdFx0XHRyZXQucHVzaCggZWxlbXNbIGkgXSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0Ly8gYXJnIGlzIGZvciBpbnRlcm5hbCB1c2FnZSBvbmx5XG5cdG1hcDogZnVuY3Rpb24oIGVsZW1zLCBjYWxsYmFjaywgYXJnICkge1xuXHRcdHZhciB2YWx1ZSwga2V5LFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRpID0gMCxcblx0XHRcdGxlbmd0aCA9IGVsZW1zLmxlbmd0aCxcblx0XHRcdC8vIGpxdWVyeSBvYmplY3RzIGFyZSB0cmVhdGVkIGFzIGFycmF5c1xuXHRcdFx0aXNBcnJheSA9IGVsZW1zIGluc3RhbmNlb2YgalF1ZXJ5IHx8IGxlbmd0aCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBsZW5ndGggPT09IFwibnVtYmVyXCIgJiYgKCAoIGxlbmd0aCA+IDAgJiYgZWxlbXNbIDAgXSAmJiBlbGVtc1sgbGVuZ3RoIC0xIF0gKSB8fCBsZW5ndGggPT09IDAgfHwgalF1ZXJ5LmlzQXJyYXkoIGVsZW1zICkgKSA7XG5cblx0XHQvLyBHbyB0aHJvdWdoIHRoZSBhcnJheSwgdHJhbnNsYXRpbmcgZWFjaCBvZiB0aGUgaXRlbXMgdG8gdGhlaXJcblx0XHRpZiAoIGlzQXJyYXkgKSB7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGkgXSwgaSwgYXJnICk7XG5cblx0XHRcdFx0aWYgKCB2YWx1ZSAhPSBudWxsICkge1xuXHRcdFx0XHRcdHJldFsgcmV0Lmxlbmd0aCBdID0gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdC8vIEdvIHRocm91Z2ggZXZlcnkga2V5IG9uIHRoZSBvYmplY3QsXG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIGtleSBpbiBlbGVtcyApIHtcblx0XHRcdFx0dmFsdWUgPSBjYWxsYmFjayggZWxlbXNbIGtleSBdLCBrZXksIGFyZyApO1xuXG5cdFx0XHRcdGlmICggdmFsdWUgIT0gbnVsbCApIHtcblx0XHRcdFx0XHRyZXRbIHJldC5sZW5ndGggXSA9IHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmxhdHRlbiBhbnkgbmVzdGVkIGFycmF5c1xuXHRcdHJldHVybiByZXQuY29uY2F0LmFwcGx5KCBbXSwgcmV0ICk7XG5cdH0sXG5cblx0Ly8gQSBnbG9iYWwgR1VJRCBjb3VudGVyIGZvciBvYmplY3RzXG5cdGd1aWQ6IDEsXG5cblx0Ly8gQmluZCBhIGZ1bmN0aW9uIHRvIGEgY29udGV4dCwgb3B0aW9uYWxseSBwYXJ0aWFsbHkgYXBwbHlpbmcgYW55XG5cdC8vIGFyZ3VtZW50cy5cblx0cHJveHk6IGZ1bmN0aW9uKCBmbiwgY29udGV4dCApIHtcblx0XHR2YXIgdG1wLCBhcmdzLCBwcm94eTtcblxuXHRcdGlmICggdHlwZW9mIGNvbnRleHQgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR0bXAgPSBmblsgY29udGV4dCBdO1xuXHRcdFx0Y29udGV4dCA9IGZuO1xuXHRcdFx0Zm4gPSB0bXA7XG5cdFx0fVxuXG5cdFx0Ly8gUXVpY2sgY2hlY2sgdG8gZGV0ZXJtaW5lIGlmIHRhcmdldCBpcyBjYWxsYWJsZSwgaW4gdGhlIHNwZWNcblx0XHQvLyB0aGlzIHRocm93cyBhIFR5cGVFcnJvciwgYnV0IHdlIHdpbGwganVzdCByZXR1cm4gdW5kZWZpbmVkLlxuXHRcdGlmICggIWpRdWVyeS5pc0Z1bmN0aW9uKCBmbiApICkge1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cblx0XHQvLyBTaW11bGF0ZWQgYmluZFxuXHRcdGFyZ3MgPSBjb3JlX3NsaWNlLmNhbGwoIGFyZ3VtZW50cywgMiApO1xuXHRcdHByb3h5ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gZm4uYXBwbHkoIGNvbnRleHQsIGFyZ3MuY29uY2F0KCBjb3JlX3NsaWNlLmNhbGwoIGFyZ3VtZW50cyApICkgKTtcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHRoZSBndWlkIG9mIHVuaXF1ZSBoYW5kbGVyIHRvIHRoZSBzYW1lIG9mIG9yaWdpbmFsIGhhbmRsZXIsIHNvIGl0IGNhbiBiZSByZW1vdmVkXG5cdFx0cHJveHkuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IHByb3h5Lmd1aWQgfHwgalF1ZXJ5Lmd1aWQrKztcblxuXHRcdHJldHVybiBwcm94eTtcblx0fSxcblxuXHQvLyBNdWx0aWZ1bmN0aW9uYWwgbWV0aG9kIHRvIGdldCBhbmQgc2V0IHZhbHVlcyBvZiBhIGNvbGxlY3Rpb25cblx0Ly8gVGhlIHZhbHVlL3MgY2FuIG9wdGlvbmFsbHkgYmUgZXhlY3V0ZWQgaWYgaXQncyBhIGZ1bmN0aW9uXG5cdGFjY2VzczogZnVuY3Rpb24oIGVsZW1zLCBmbiwga2V5LCB2YWx1ZSwgY2hhaW5hYmxlLCBlbXB0eUdldCwgcGFzcyApIHtcblx0XHR2YXIgZXhlYyxcblx0XHRcdGJ1bGsgPSBrZXkgPT0gbnVsbCxcblx0XHRcdGkgPSAwLFxuXHRcdFx0bGVuZ3RoID0gZWxlbXMubGVuZ3RoO1xuXG5cdFx0Ly8gU2V0cyBtYW55IHZhbHVlc1xuXHRcdGlmICgga2V5ICYmIHR5cGVvZiBrZXkgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRmb3IgKCBpIGluIGtleSApIHtcblx0XHRcdFx0alF1ZXJ5LmFjY2VzcyggZWxlbXMsIGZuLCBpLCBrZXlbaV0sIDEsIGVtcHR5R2V0LCB2YWx1ZSApO1xuXHRcdFx0fVxuXHRcdFx0Y2hhaW5hYmxlID0gMTtcblxuXHRcdC8vIFNldHMgb25lIHZhbHVlXG5cdFx0fSBlbHNlIGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdC8vIE9wdGlvbmFsbHksIGZ1bmN0aW9uIHZhbHVlcyBnZXQgZXhlY3V0ZWQgaWYgZXhlYyBpcyB0cnVlXG5cdFx0XHRleGVjID0gcGFzcyA9PT0gdW5kZWZpbmVkICYmIGpRdWVyeS5pc0Z1bmN0aW9uKCB2YWx1ZSApO1xuXG5cdFx0XHRpZiAoIGJ1bGsgKSB7XG5cdFx0XHRcdC8vIEJ1bGsgb3BlcmF0aW9ucyBvbmx5IGl0ZXJhdGUgd2hlbiBleGVjdXRpbmcgZnVuY3Rpb24gdmFsdWVzXG5cdFx0XHRcdGlmICggZXhlYyApIHtcblx0XHRcdFx0XHRleGVjID0gZm47XG5cdFx0XHRcdFx0Zm4gPSBmdW5jdGlvbiggZWxlbSwga2V5LCB2YWx1ZSApIHtcblx0XHRcdFx0XHRcdHJldHVybiBleGVjLmNhbGwoIGpRdWVyeSggZWxlbSApLCB2YWx1ZSApO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHRoZXkgcnVuIGFnYWluc3QgdGhlIGVudGlyZSBzZXRcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmbi5jYWxsKCBlbGVtcywgdmFsdWUgKTtcblx0XHRcdFx0XHRmbiA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBmbiApIHtcblx0XHRcdFx0Zm9yICg7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0XHRmbiggZWxlbXNbaV0sIGtleSwgZXhlYyA/IHZhbHVlLmNhbGwoIGVsZW1zW2ldLCBpLCBmbiggZWxlbXNbaV0sIGtleSApICkgOiB2YWx1ZSwgcGFzcyApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNoYWluYWJsZSA9IDE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNoYWluYWJsZSA/XG5cdFx0XHRlbGVtcyA6XG5cblx0XHRcdC8vIEdldHNcblx0XHRcdGJ1bGsgP1xuXHRcdFx0XHRmbi5jYWxsKCBlbGVtcyApIDpcblx0XHRcdFx0bGVuZ3RoID8gZm4oIGVsZW1zWzBdLCBrZXkgKSA6IGVtcHR5R2V0O1xuXHR9LFxuXG5cdG5vdzogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICggbmV3IERhdGUoKSApLmdldFRpbWUoKTtcblx0fVxufSk7XG5cbmpRdWVyeS5yZWFkeS5wcm9taXNlID0gZnVuY3Rpb24oIG9iaiApIHtcblx0aWYgKCAhcmVhZHlMaXN0ICkge1xuXG5cdFx0cmVhZHlMaXN0ID0galF1ZXJ5LkRlZmVycmVkKCk7XG5cblx0XHQvLyBDYXRjaCBjYXNlcyB3aGVyZSAkKGRvY3VtZW50KS5yZWFkeSgpIGlzIGNhbGxlZCBhZnRlciB0aGUgYnJvd3NlciBldmVudCBoYXMgYWxyZWFkeSBvY2N1cnJlZC5cblx0XHQvLyB3ZSBvbmNlIHRyaWVkIHRvIHVzZSByZWFkeVN0YXRlIFwiaW50ZXJhY3RpdmVcIiBoZXJlLCBidXQgaXQgY2F1c2VkIGlzc3VlcyBsaWtlIHRoZSBvbmVcblx0XHQvLyBkaXNjb3ZlcmVkIGJ5IENocmlzUyBoZXJlOiBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjI4MiNjb21tZW50OjE1XG5cdFx0aWYgKCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgKSB7XG5cdFx0XHQvLyBIYW5kbGUgaXQgYXN5bmNocm9ub3VzbHkgdG8gYWxsb3cgc2NyaXB0cyB0aGUgb3Bwb3J0dW5pdHkgdG8gZGVsYXkgcmVhZHlcblx0XHRcdHNldFRpbWVvdXQoIGpRdWVyeS5yZWFkeSwgMSApO1xuXG5cdFx0Ly8gU3RhbmRhcmRzLWJhc2VkIGJyb3dzZXJzIHN1cHBvcnQgRE9NQ29udGVudExvYWRlZFxuXHRcdH0gZWxzZSBpZiAoIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cdFx0XHQvLyBVc2UgdGhlIGhhbmR5IGV2ZW50IGNhbGxiYWNrXG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgRE9NQ29udGVudExvYWRlZCwgZmFsc2UgKTtcblxuXHRcdFx0Ly8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcblx0XHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBcImxvYWRcIiwgalF1ZXJ5LnJlYWR5LCBmYWxzZSApO1xuXG5cdFx0Ly8gSWYgSUUgZXZlbnQgbW9kZWwgaXMgdXNlZFxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBFbnN1cmUgZmlyaW5nIGJlZm9yZSBvbmxvYWQsIG1heWJlIGxhdGUgYnV0IHNhZmUgYWxzbyBmb3IgaWZyYW1lc1xuXHRcdFx0ZG9jdW1lbnQuYXR0YWNoRXZlbnQoIFwib25yZWFkeXN0YXRlY2hhbmdlXCIsIERPTUNvbnRlbnRMb2FkZWQgKTtcblxuXHRcdFx0Ly8gQSBmYWxsYmFjayB0byB3aW5kb3cub25sb2FkLCB0aGF0IHdpbGwgYWx3YXlzIHdvcmtcblx0XHRcdHdpbmRvdy5hdHRhY2hFdmVudCggXCJvbmxvYWRcIiwgalF1ZXJ5LnJlYWR5ICk7XG5cblx0XHRcdC8vIElmIElFIGFuZCBub3QgYSBmcmFtZVxuXHRcdFx0Ly8gY29udGludWFsbHkgY2hlY2sgdG8gc2VlIGlmIHRoZSBkb2N1bWVudCBpcyByZWFkeVxuXHRcdFx0dmFyIHRvcCA9IGZhbHNlO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0b3AgPSB3aW5kb3cuZnJhbWVFbGVtZW50ID09IG51bGwgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXHRcdFx0fSBjYXRjaChlKSB7fVxuXG5cdFx0XHRpZiAoIHRvcCAmJiB0b3AuZG9TY3JvbGwgKSB7XG5cdFx0XHRcdChmdW5jdGlvbiBkb1Njcm9sbENoZWNrKCkge1xuXHRcdFx0XHRcdGlmICggIWpRdWVyeS5pc1JlYWR5ICkge1xuXG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHQvLyBVc2UgdGhlIHRyaWNrIGJ5IERpZWdvIFBlcmluaVxuXHRcdFx0XHRcdFx0XHQvLyBodHRwOi8vamF2YXNjcmlwdC5ud2JveC5jb20vSUVDb250ZW50TG9hZGVkL1xuXHRcdFx0XHRcdFx0XHR0b3AuZG9TY3JvbGwoXCJsZWZ0XCIpO1xuXHRcdFx0XHRcdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBzZXRUaW1lb3V0KCBkb1Njcm9sbENoZWNrLCA1MCApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBhbmQgZXhlY3V0ZSBhbnkgd2FpdGluZyBmdW5jdGlvbnNcblx0XHRcdFx0XHRcdGpRdWVyeS5yZWFkeSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlYWR5TGlzdC5wcm9taXNlKCBvYmogKTtcbn07XG5cbi8vIFBvcHVsYXRlIHRoZSBjbGFzczJ0eXBlIG1hcFxualF1ZXJ5LmVhY2goXCJCb29sZWFuIE51bWJlciBTdHJpbmcgRnVuY3Rpb24gQXJyYXkgRGF0ZSBSZWdFeHAgT2JqZWN0XCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbihpLCBuYW1lKSB7XG5cdGNsYXNzMnR5cGVbIFwiW29iamVjdCBcIiArIG5hbWUgKyBcIl1cIiBdID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbi8vIEFsbCBqUXVlcnkgb2JqZWN0cyBzaG91bGQgcG9pbnQgYmFjayB0byB0aGVzZVxucm9vdGpRdWVyeSA9IGpRdWVyeShkb2N1bWVudCk7XG4vLyBTdHJpbmcgdG8gT2JqZWN0IG9wdGlvbnMgZm9ybWF0IGNhY2hlXG52YXIgb3B0aW9uc0NhY2hlID0ge307XG5cbi8vIENvbnZlcnQgU3RyaW5nLWZvcm1hdHRlZCBvcHRpb25zIGludG8gT2JqZWN0LWZvcm1hdHRlZCBvbmVzIGFuZCBzdG9yZSBpbiBjYWNoZVxuZnVuY3Rpb24gY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApIHtcblx0dmFyIG9iamVjdCA9IG9wdGlvbnNDYWNoZVsgb3B0aW9ucyBdID0ge307XG5cdGpRdWVyeS5lYWNoKCBvcHRpb25zLnNwbGl0KCBjb3JlX3JzcGFjZSApLCBmdW5jdGlvbiggXywgZmxhZyApIHtcblx0XHRvYmplY3RbIGZsYWcgXSA9IHRydWU7XG5cdH0pO1xuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG4vKlxuICogQ3JlYXRlIGEgY2FsbGJhY2sgbGlzdCB1c2luZyB0aGUgZm9sbG93aW5nIHBhcmFtZXRlcnM6XG4gKlxuICpcdG9wdGlvbnM6IGFuIG9wdGlvbmFsIGxpc3Qgb2Ygc3BhY2Utc2VwYXJhdGVkIG9wdGlvbnMgdGhhdCB3aWxsIGNoYW5nZSBob3dcbiAqXHRcdFx0dGhlIGNhbGxiYWNrIGxpc3QgYmVoYXZlcyBvciBhIG1vcmUgdHJhZGl0aW9uYWwgb3B0aW9uIG9iamVjdFxuICpcbiAqIEJ5IGRlZmF1bHQgYSBjYWxsYmFjayBsaXN0IHdpbGwgYWN0IGxpa2UgYW4gZXZlbnQgY2FsbGJhY2sgbGlzdCBhbmQgY2FuIGJlXG4gKiBcImZpcmVkXCIgbXVsdGlwbGUgdGltZXMuXG4gKlxuICogUG9zc2libGUgb3B0aW9uczpcbiAqXG4gKlx0b25jZTpcdFx0XHR3aWxsIGVuc3VyZSB0aGUgY2FsbGJhY2sgbGlzdCBjYW4gb25seSBiZSBmaXJlZCBvbmNlIChsaWtlIGEgRGVmZXJyZWQpXG4gKlxuICpcdG1lbW9yeTpcdFx0XHR3aWxsIGtlZXAgdHJhY2sgb2YgcHJldmlvdXMgdmFsdWVzIGFuZCB3aWxsIGNhbGwgYW55IGNhbGxiYWNrIGFkZGVkXG4gKlx0XHRcdFx0XHRhZnRlciB0aGUgbGlzdCBoYXMgYmVlbiBmaXJlZCByaWdodCBhd2F5IHdpdGggdGhlIGxhdGVzdCBcIm1lbW9yaXplZFwiXG4gKlx0XHRcdFx0XHR2YWx1ZXMgKGxpa2UgYSBEZWZlcnJlZClcbiAqXG4gKlx0dW5pcXVlOlx0XHRcdHdpbGwgZW5zdXJlIGEgY2FsbGJhY2sgY2FuIG9ubHkgYmUgYWRkZWQgb25jZSAobm8gZHVwbGljYXRlIGluIHRoZSBsaXN0KVxuICpcbiAqXHRzdG9wT25GYWxzZTpcdGludGVycnVwdCBjYWxsaW5ncyB3aGVuIGEgY2FsbGJhY2sgcmV0dXJucyBmYWxzZVxuICpcbiAqL1xualF1ZXJ5LkNhbGxiYWNrcyA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG5cdC8vIENvbnZlcnQgb3B0aW9ucyBmcm9tIFN0cmluZy1mb3JtYXR0ZWQgdG8gT2JqZWN0LWZvcm1hdHRlZCBpZiBuZWVkZWRcblx0Ly8gKHdlIGNoZWNrIGluIGNhY2hlIGZpcnN0KVxuXHRvcHRpb25zID0gdHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgP1xuXHRcdCggb3B0aW9uc0NhY2hlWyBvcHRpb25zIF0gfHwgY3JlYXRlT3B0aW9ucyggb3B0aW9ucyApICkgOlxuXHRcdGpRdWVyeS5leHRlbmQoIHt9LCBvcHRpb25zICk7XG5cblx0dmFyIC8vIExhc3QgZmlyZSB2YWx1ZSAoZm9yIG5vbi1mb3JnZXR0YWJsZSBsaXN0cylcblx0XHRtZW1vcnksXG5cdFx0Ly8gRmxhZyB0byBrbm93IGlmIGxpc3Qgd2FzIGFscmVhZHkgZmlyZWRcblx0XHRmaXJlZCxcblx0XHQvLyBGbGFnIHRvIGtub3cgaWYgbGlzdCBpcyBjdXJyZW50bHkgZmlyaW5nXG5cdFx0ZmlyaW5nLFxuXHRcdC8vIEZpcnN0IGNhbGxiYWNrIHRvIGZpcmUgKHVzZWQgaW50ZXJuYWxseSBieSBhZGQgYW5kIGZpcmVXaXRoKVxuXHRcdGZpcmluZ1N0YXJ0LFxuXHRcdC8vIEVuZCBvZiB0aGUgbG9vcCB3aGVuIGZpcmluZ1xuXHRcdGZpcmluZ0xlbmd0aCxcblx0XHQvLyBJbmRleCBvZiBjdXJyZW50bHkgZmlyaW5nIGNhbGxiYWNrIChtb2RpZmllZCBieSByZW1vdmUgaWYgbmVlZGVkKVxuXHRcdGZpcmluZ0luZGV4LFxuXHRcdC8vIEFjdHVhbCBjYWxsYmFjayBsaXN0XG5cdFx0bGlzdCA9IFtdLFxuXHRcdC8vIFN0YWNrIG9mIGZpcmUgY2FsbHMgZm9yIHJlcGVhdGFibGUgbGlzdHNcblx0XHRzdGFjayA9ICFvcHRpb25zLm9uY2UgJiYgW10sXG5cdFx0Ly8gRmlyZSBjYWxsYmFja3Ncblx0XHRmaXJlID0gZnVuY3Rpb24oIGRhdGEgKSB7XG5cdFx0XHRtZW1vcnkgPSBvcHRpb25zLm1lbW9yeSAmJiBkYXRhO1xuXHRcdFx0ZmlyZWQgPSB0cnVlO1xuXHRcdFx0ZmlyaW5nSW5kZXggPSBmaXJpbmdTdGFydCB8fCAwO1xuXHRcdFx0ZmlyaW5nU3RhcnQgPSAwO1xuXHRcdFx0ZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRmaXJpbmcgPSB0cnVlO1xuXHRcdFx0Zm9yICggOyBsaXN0ICYmIGZpcmluZ0luZGV4IDwgZmlyaW5nTGVuZ3RoOyBmaXJpbmdJbmRleCsrICkge1xuXHRcdFx0XHRpZiAoIGxpc3RbIGZpcmluZ0luZGV4IF0uYXBwbHkoIGRhdGFbIDAgXSwgZGF0YVsgMSBdICkgPT09IGZhbHNlICYmIG9wdGlvbnMuc3RvcE9uRmFsc2UgKSB7XG5cdFx0XHRcdFx0bWVtb3J5ID0gZmFsc2U7IC8vIFRvIHByZXZlbnQgZnVydGhlciBjYWxscyB1c2luZyBhZGRcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZmlyaW5nID0gZmFsc2U7XG5cdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdGlmICggc3RhY2sgKSB7XG5cdFx0XHRcdFx0aWYgKCBzdGFjay5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRmaXJlKCBzdGFjay5zaGlmdCgpICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0bGlzdCA9IFtdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbGYuZGlzYWJsZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBBY3R1YWwgQ2FsbGJhY2tzIG9iamVjdFxuXHRcdHNlbGYgPSB7XG5cdFx0XHQvLyBBZGQgYSBjYWxsYmFjayBvciBhIGNvbGxlY3Rpb24gb2YgY2FsbGJhY2tzIHRvIHRoZSBsaXN0XG5cdFx0XHRhZGQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIGxpc3QgKSB7XG5cdFx0XHRcdFx0Ly8gRmlyc3QsIHdlIHNhdmUgdGhlIGN1cnJlbnQgbGVuZ3RoXG5cdFx0XHRcdFx0dmFyIHN0YXJ0ID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIGFkZCggYXJncyApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5lYWNoKCBhcmdzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdHlwZSA9IGpRdWVyeS50eXBlKCBhcmcgKTtcblx0XHRcdFx0XHRcdFx0aWYgKCB0eXBlID09PSBcImZ1bmN0aW9uXCIgJiYgKCAhb3B0aW9ucy51bmlxdWUgfHwgIXNlbGYuaGFzKCBhcmcgKSApICkge1xuXHRcdFx0XHRcdFx0XHRcdGxpc3QucHVzaCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGFyZyAmJiBhcmcubGVuZ3RoICYmIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gSW5zcGVjdCByZWN1cnNpdmVseVxuXHRcdFx0XHRcdFx0XHRcdGFkZCggYXJnICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pKCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHQvLyBEbyB3ZSBuZWVkIHRvIGFkZCB0aGUgY2FsbGJhY2tzIHRvIHRoZVxuXHRcdFx0XHRcdC8vIGN1cnJlbnQgZmlyaW5nIGJhdGNoP1xuXHRcdFx0XHRcdGlmICggZmlyaW5nICkge1xuXHRcdFx0XHRcdFx0ZmlyaW5nTGVuZ3RoID0gbGlzdC5sZW5ndGg7XG5cdFx0XHRcdFx0Ly8gV2l0aCBtZW1vcnksIGlmIHdlJ3JlIG5vdCBmaXJpbmcgdGhlblxuXHRcdFx0XHRcdC8vIHdlIHNob3VsZCBjYWxsIHJpZ2h0IGF3YXlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKCBtZW1vcnkgKSB7XG5cdFx0XHRcdFx0XHRmaXJpbmdTdGFydCA9IHN0YXJ0O1xuXHRcdFx0XHRcdFx0ZmlyZSggbWVtb3J5ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIFJlbW92ZSBhIGNhbGxiYWNrIGZyb20gdGhlIGxpc3Rcblx0XHRcdHJlbW92ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggbGlzdCApIHtcblx0XHRcdFx0XHRqUXVlcnkuZWFjaCggYXJndW1lbnRzLCBmdW5jdGlvbiggXywgYXJnICkge1xuXHRcdFx0XHRcdFx0dmFyIGluZGV4O1xuXHRcdFx0XHRcdFx0d2hpbGUoICggaW5kZXggPSBqUXVlcnkuaW5BcnJheSggYXJnLCBsaXN0LCBpbmRleCApICkgPiAtMSApIHtcblx0XHRcdFx0XHRcdFx0bGlzdC5zcGxpY2UoIGluZGV4LCAxICk7XG5cdFx0XHRcdFx0XHRcdC8vIEhhbmRsZSBmaXJpbmcgaW5kZXhlc1xuXHRcdFx0XHRcdFx0XHRpZiAoIGZpcmluZyApIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoIGluZGV4IDw9IGZpcmluZ0xlbmd0aCApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZpcmluZ0xlbmd0aC0tO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZiAoIGluZGV4IDw9IGZpcmluZ0luZGV4ICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZmlyaW5nSW5kZXgtLTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBDb250cm9sIGlmIGEgZ2l2ZW4gY2FsbGJhY2sgaXMgaW4gdGhlIGxpc3Rcblx0XHRcdGhhczogZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0XHRyZXR1cm4galF1ZXJ5LmluQXJyYXkoIGZuLCBsaXN0ICkgPiAtMTtcblx0XHRcdH0sXG5cdFx0XHQvLyBSZW1vdmUgYWxsIGNhbGxiYWNrcyBmcm9tIHRoZSBsaXN0XG5cdFx0XHRlbXB0eTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGxpc3QgPSBbXTtcblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gSGF2ZSB0aGUgbGlzdCBkbyBub3RoaW5nIGFueW1vcmVcblx0XHRcdGRpc2FibGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRsaXN0ID0gc3RhY2sgPSBtZW1vcnkgPSB1bmRlZmluZWQ7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fSxcblx0XHRcdC8vIElzIGl0IGRpc2FibGVkP1xuXHRcdFx0ZGlzYWJsZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gIWxpc3Q7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gTG9jayB0aGUgbGlzdCBpbiBpdHMgY3VycmVudCBzdGF0ZVxuXHRcdFx0bG9jazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHN0YWNrID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRpZiAoICFtZW1vcnkgKSB7XG5cdFx0XHRcdFx0c2VsZi5kaXNhYmxlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9LFxuXHRcdFx0Ly8gSXMgaXQgbG9ja2VkP1xuXHRcdFx0bG9ja2VkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICFzdGFjaztcblx0XHRcdH0sXG5cdFx0XHQvLyBDYWxsIGFsbCBjYWxsYmFja3Mgd2l0aCB0aGUgZ2l2ZW4gY29udGV4dCBhbmQgYXJndW1lbnRzXG5cdFx0XHRmaXJlV2l0aDogZnVuY3Rpb24oIGNvbnRleHQsIGFyZ3MgKSB7XG5cdFx0XHRcdGFyZ3MgPSBhcmdzIHx8IFtdO1xuXHRcdFx0XHRhcmdzID0gWyBjb250ZXh0LCBhcmdzLnNsaWNlID8gYXJncy5zbGljZSgpIDogYXJncyBdO1xuXHRcdFx0XHRpZiAoIGxpc3QgJiYgKCAhZmlyZWQgfHwgc3RhY2sgKSApIHtcblx0XHRcdFx0XHRpZiAoIGZpcmluZyApIHtcblx0XHRcdFx0XHRcdHN0YWNrLnB1c2goIGFyZ3MgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZmlyZSggYXJncyApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBDYWxsIGFsbCB0aGUgY2FsbGJhY2tzIHdpdGggdGhlIGdpdmVuIGFyZ3VtZW50c1xuXHRcdFx0ZmlyZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNlbGYuZmlyZVdpdGgoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH0sXG5cdFx0XHQvLyBUbyBrbm93IGlmIHRoZSBjYWxsYmFja3MgaGF2ZSBhbHJlYWR5IGJlZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2Vcblx0XHRcdGZpcmVkOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICEhZmlyZWQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRyZXR1cm4gc2VsZjtcbn07XG5qUXVlcnkuZXh0ZW5kKHtcblxuXHREZWZlcnJlZDogZnVuY3Rpb24oIGZ1bmMgKSB7XG5cdFx0dmFyIHR1cGxlcyA9IFtcblx0XHRcdFx0Ly8gYWN0aW9uLCBhZGQgbGlzdGVuZXIsIGxpc3RlbmVyIGxpc3QsIGZpbmFsIHN0YXRlXG5cdFx0XHRcdFsgXCJyZXNvbHZlXCIsIFwiZG9uZVwiLCBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksIFwicmVzb2x2ZWRcIiBdLFxuXHRcdFx0XHRbIFwicmVqZWN0XCIsIFwiZmFpbFwiLCBqUXVlcnkuQ2FsbGJhY2tzKFwib25jZSBtZW1vcnlcIiksIFwicmVqZWN0ZWRcIiBdLFxuXHRcdFx0XHRbIFwibm90aWZ5XCIsIFwicHJvZ3Jlc3NcIiwgalF1ZXJ5LkNhbGxiYWNrcyhcIm1lbW9yeVwiKSBdXG5cdFx0XHRdLFxuXHRcdFx0c3RhdGUgPSBcInBlbmRpbmdcIixcblx0XHRcdHByb21pc2UgPSB7XG5cdFx0XHRcdHN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFsd2F5czogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0ZGVmZXJyZWQuZG9uZSggYXJndW1lbnRzICkuZmFpbCggYXJndW1lbnRzICk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRoZW46IGZ1bmN0aW9uKCAvKiBmbkRvbmUsIGZuRmFpbCwgZm5Qcm9ncmVzcyAqLyApIHtcblx0XHRcdFx0XHR2YXIgZm5zID0gYXJndW1lbnRzO1xuXHRcdFx0XHRcdHJldHVybiBqUXVlcnkuRGVmZXJyZWQoZnVuY3Rpb24oIG5ld0RlZmVyICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmVhY2goIHR1cGxlcywgZnVuY3Rpb24oIGksIHR1cGxlICkge1xuXHRcdFx0XHRcdFx0XHR2YXIgYWN0aW9uID0gdHVwbGVbIDAgXSxcblx0XHRcdFx0XHRcdFx0XHRmbiA9IGZuc1sgaSBdO1xuXHRcdFx0XHRcdFx0XHQvLyBkZWZlcnJlZFsgZG9uZSB8IGZhaWwgfCBwcm9ncmVzcyBdIGZvciBmb3J3YXJkaW5nIGFjdGlvbnMgdG8gbmV3RGVmZXJcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWRbIHR1cGxlWzFdIF0oIGpRdWVyeS5pc0Z1bmN0aW9uKCBmbiApID9cblx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciByZXR1cm5lZCA9IGZuLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICggcmV0dXJuZWQgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJldHVybmVkLnByb21pc2UgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuZWQucHJvbWlzZSgpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmRvbmUoIG5ld0RlZmVyLnJlc29sdmUgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5mYWlsKCBuZXdEZWZlci5yZWplY3QgKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5wcm9ncmVzcyggbmV3RGVmZXIubm90aWZ5ICk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRuZXdEZWZlclsgYWN0aW9uICsgXCJXaXRoXCIgXSggdGhpcyA9PT0gZGVmZXJyZWQgPyBuZXdEZWZlciA6IHRoaXMsIFsgcmV0dXJuZWQgXSApO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gOlxuXHRcdFx0XHRcdFx0XHRcdG5ld0RlZmVyWyBhY3Rpb24gXVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRmbnMgPSBudWxsO1xuXHRcdFx0XHRcdH0pLnByb21pc2UoKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Ly8gR2V0IGEgcHJvbWlzZSBmb3IgdGhpcyBkZWZlcnJlZFxuXHRcdFx0XHQvLyBJZiBvYmogaXMgcHJvdmlkZWQsIHRoZSBwcm9taXNlIGFzcGVjdCBpcyBhZGRlZCB0byB0aGUgb2JqZWN0XG5cdFx0XHRcdHByb21pc2U6IGZ1bmN0aW9uKCBvYmogKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgPyBqUXVlcnkuZXh0ZW5kKCBvYmosIHByb21pc2UgKSA6IHByb21pc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRkZWZlcnJlZCA9IHt9O1xuXG5cdFx0Ly8gS2VlcCBwaXBlIGZvciBiYWNrLWNvbXBhdFxuXHRcdHByb21pc2UucGlwZSA9IHByb21pc2UudGhlbjtcblxuXHRcdC8vIEFkZCBsaXN0LXNwZWNpZmljIG1ldGhvZHNcblx0XHRqUXVlcnkuZWFjaCggdHVwbGVzLCBmdW5jdGlvbiggaSwgdHVwbGUgKSB7XG5cdFx0XHR2YXIgbGlzdCA9IHR1cGxlWyAyIF0sXG5cdFx0XHRcdHN0YXRlU3RyaW5nID0gdHVwbGVbIDMgXTtcblxuXHRcdFx0Ly8gcHJvbWlzZVsgZG9uZSB8IGZhaWwgfCBwcm9ncmVzcyBdID0gbGlzdC5hZGRcblx0XHRcdHByb21pc2VbIHR1cGxlWzFdIF0gPSBsaXN0LmFkZDtcblxuXHRcdFx0Ly8gSGFuZGxlIHN0YXRlXG5cdFx0XHRpZiAoIHN0YXRlU3RyaW5nICkge1xuXHRcdFx0XHRsaXN0LmFkZChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQvLyBzdGF0ZSA9IFsgcmVzb2x2ZWQgfCByZWplY3RlZCBdXG5cdFx0XHRcdFx0c3RhdGUgPSBzdGF0ZVN0cmluZztcblxuXHRcdFx0XHQvLyBbIHJlamVjdF9saXN0IHwgcmVzb2x2ZV9saXN0IF0uZGlzYWJsZTsgcHJvZ3Jlc3NfbGlzdC5sb2NrXG5cdFx0XHRcdH0sIHR1cGxlc1sgaSBeIDEgXVsgMiBdLmRpc2FibGUsIHR1cGxlc1sgMiBdWyAyIF0ubG9jayApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBkZWZlcnJlZFsgcmVzb2x2ZSB8IHJlamVjdCB8IG5vdGlmeSBdID0gbGlzdC5maXJlXG5cdFx0XHRkZWZlcnJlZFsgdHVwbGVbMF0gXSA9IGxpc3QuZmlyZTtcblx0XHRcdGRlZmVycmVkWyB0dXBsZVswXSArIFwiV2l0aFwiIF0gPSBsaXN0LmZpcmVXaXRoO1xuXHRcdH0pO1xuXG5cdFx0Ly8gTWFrZSB0aGUgZGVmZXJyZWQgYSBwcm9taXNlXG5cdFx0cHJvbWlzZS5wcm9taXNlKCBkZWZlcnJlZCApO1xuXG5cdFx0Ly8gQ2FsbCBnaXZlbiBmdW5jIGlmIGFueVxuXHRcdGlmICggZnVuYyApIHtcblx0XHRcdGZ1bmMuY2FsbCggZGVmZXJyZWQsIGRlZmVycmVkICk7XG5cdFx0fVxuXG5cdFx0Ly8gQWxsIGRvbmUhXG5cdFx0cmV0dXJuIGRlZmVycmVkO1xuXHR9LFxuXG5cdC8vIERlZmVycmVkIGhlbHBlclxuXHR3aGVuOiBmdW5jdGlvbiggc3Vib3JkaW5hdGUgLyogLCAuLi4sIHN1Ym9yZGluYXRlTiAqLyApIHtcblx0XHR2YXIgaSA9IDAsXG5cdFx0XHRyZXNvbHZlVmFsdWVzID0gY29yZV9zbGljZS5jYWxsKCBhcmd1bWVudHMgKSxcblx0XHRcdGxlbmd0aCA9IHJlc29sdmVWYWx1ZXMubGVuZ3RoLFxuXG5cdFx0XHQvLyB0aGUgY291bnQgb2YgdW5jb21wbGV0ZWQgc3Vib3JkaW5hdGVzXG5cdFx0XHRyZW1haW5pbmcgPSBsZW5ndGggIT09IDEgfHwgKCBzdWJvcmRpbmF0ZSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggc3Vib3JkaW5hdGUucHJvbWlzZSApICkgPyBsZW5ndGggOiAwLFxuXG5cdFx0XHQvLyB0aGUgbWFzdGVyIERlZmVycmVkLiBJZiByZXNvbHZlVmFsdWVzIGNvbnNpc3Qgb2Ygb25seSBhIHNpbmdsZSBEZWZlcnJlZCwganVzdCB1c2UgdGhhdC5cblx0XHRcdGRlZmVycmVkID0gcmVtYWluaW5nID09PSAxID8gc3Vib3JkaW5hdGUgOiBqUXVlcnkuRGVmZXJyZWQoKSxcblxuXHRcdFx0Ly8gVXBkYXRlIGZ1bmN0aW9uIGZvciBib3RoIHJlc29sdmUgYW5kIHByb2dyZXNzIHZhbHVlc1xuXHRcdFx0dXBkYXRlRnVuYyA9IGZ1bmN0aW9uKCBpLCBjb250ZXh0cywgdmFsdWVzICkge1xuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0XHRcdGNvbnRleHRzWyBpIF0gPSB0aGlzO1xuXHRcdFx0XHRcdHZhbHVlc1sgaSBdID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBjb3JlX3NsaWNlLmNhbGwoIGFyZ3VtZW50cyApIDogdmFsdWU7XG5cdFx0XHRcdFx0aWYoIHZhbHVlcyA9PT0gcHJvZ3Jlc3NWYWx1ZXMgKSB7XG5cdFx0XHRcdFx0XHRkZWZlcnJlZC5ub3RpZnlXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggISggLS1yZW1haW5pbmcgKSApIHtcblx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmVXaXRoKCBjb250ZXh0cywgdmFsdWVzICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblxuXHRcdFx0cHJvZ3Jlc3NWYWx1ZXMsIHByb2dyZXNzQ29udGV4dHMsIHJlc29sdmVDb250ZXh0cztcblxuXHRcdC8vIGFkZCBsaXN0ZW5lcnMgdG8gRGVmZXJyZWQgc3Vib3JkaW5hdGVzOyB0cmVhdCBvdGhlcnMgYXMgcmVzb2x2ZWRcblx0XHRpZiAoIGxlbmd0aCA+IDEgKSB7XG5cdFx0XHRwcm9ncmVzc1ZhbHVlcyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG5cdFx0XHRwcm9ncmVzc0NvbnRleHRzID0gbmV3IEFycmF5KCBsZW5ndGggKTtcblx0XHRcdHJlc29sdmVDb250ZXh0cyA9IG5ldyBBcnJheSggbGVuZ3RoICk7XG5cdFx0XHRmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRcdFx0aWYgKCByZXNvbHZlVmFsdWVzWyBpIF0gJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIHJlc29sdmVWYWx1ZXNbIGkgXS5wcm9taXNlICkgKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZVZhbHVlc1sgaSBdLnByb21pc2UoKVxuXHRcdFx0XHRcdFx0LmRvbmUoIHVwZGF0ZUZ1bmMoIGksIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApIClcblx0XHRcdFx0XHRcdC5mYWlsKCBkZWZlcnJlZC5yZWplY3QgKVxuXHRcdFx0XHRcdFx0LnByb2dyZXNzKCB1cGRhdGVGdW5jKCBpLCBwcm9ncmVzc0NvbnRleHRzLCBwcm9ncmVzc1ZhbHVlcyApICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LS1yZW1haW5pbmc7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBpZiB3ZSdyZSBub3Qgd2FpdGluZyBvbiBhbnl0aGluZywgcmVzb2x2ZSB0aGUgbWFzdGVyXG5cdFx0aWYgKCAhcmVtYWluaW5nICkge1xuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIHJlc29sdmVDb250ZXh0cywgcmVzb2x2ZVZhbHVlcyApO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XG5cdH1cbn0pO1xualF1ZXJ5LnN1cHBvcnQgPSAoZnVuY3Rpb24oKSB7XG5cblx0dmFyIHN1cHBvcnQsXG5cdFx0YWxsLFxuXHRcdGEsXG5cdFx0c2VsZWN0LFxuXHRcdG9wdCxcblx0XHRpbnB1dCxcblx0XHRmcmFnbWVudCxcblx0XHRldmVudE5hbWUsXG5cdFx0aSxcblx0XHRpc1N1cHBvcnRlZCxcblx0XHRjbGlja0ZuLFxuXHRcdGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cblx0Ly8gUHJlbGltaW5hcnkgdGVzdHNcblx0ZGl2LnNldEF0dHJpYnV0ZSggXCJjbGFzc05hbWVcIiwgXCJ0XCIgKTtcblx0ZGl2LmlubmVySFRNTCA9IFwiICA8bGluay8+PHRhYmxlPjwvdGFibGU+PGEgaHJlZj0nL2EnPmE8L2E+PGlucHV0IHR5cGU9J2NoZWNrYm94Jy8+XCI7XG5cblx0YWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKTtcblx0YSA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFcIilbIDAgXTtcblx0YS5zdHlsZS5jc3NUZXh0ID0gXCJ0b3A6MXB4O2Zsb2F0OmxlZnQ7b3BhY2l0eTouNVwiO1xuXG5cdC8vIENhbid0IGdldCBiYXNpYyB0ZXN0IHN1cHBvcnRcblx0aWYgKCAhYWxsIHx8ICFhbGwubGVuZ3RoIHx8ICFhICkge1xuXHRcdHJldHVybiB7fTtcblx0fVxuXG5cdC8vIEZpcnN0IGJhdGNoIG9mIHN1cHBvcnRzIHRlc3RzXG5cdHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG5cdG9wdCA9IHNlbGVjdC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSApO1xuXHRpbnB1dCA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWyAwIF07XG5cblx0c3VwcG9ydCA9IHtcblx0XHQvLyBJRSBzdHJpcHMgbGVhZGluZyB3aGl0ZXNwYWNlIHdoZW4gLmlubmVySFRNTCBpcyB1c2VkXG5cdFx0bGVhZGluZ1doaXRlc3BhY2U6ICggZGl2LmZpcnN0Q2hpbGQubm9kZVR5cGUgPT09IDMgKSxcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHRib2R5IGVsZW1lbnRzIGFyZW4ndCBhdXRvbWF0aWNhbGx5IGluc2VydGVkXG5cdFx0Ly8gSUUgd2lsbCBpbnNlcnQgdGhlbSBpbnRvIGVtcHR5IHRhYmxlc1xuXHRcdHRib2R5OiAhZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGJvZHlcIikubGVuZ3RoLFxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgbGluayBlbGVtZW50cyBnZXQgc2VyaWFsaXplZCBjb3JyZWN0bHkgYnkgaW5uZXJIVE1MXG5cdFx0Ly8gVGhpcyByZXF1aXJlcyBhIHdyYXBwZXIgZWxlbWVudCBpbiBJRVxuXHRcdGh0bWxTZXJpYWxpemU6ICEhZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKS5sZW5ndGgsXG5cblx0XHQvLyBHZXQgdGhlIHN0eWxlIGluZm9ybWF0aW9uIGZyb20gZ2V0QXR0cmlidXRlXG5cdFx0Ly8gKElFIHVzZXMgLmNzc1RleHQgaW5zdGVhZClcblx0XHRzdHlsZTogL3RvcC8udGVzdCggYS5nZXRBdHRyaWJ1dGUoXCJzdHlsZVwiKSApLFxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgVVJMcyBhcmVuJ3QgbWFuaXB1bGF0ZWRcblx0XHQvLyAoSUUgbm9ybWFsaXplcyBpdCBieSBkZWZhdWx0KVxuXHRcdGhyZWZOb3JtYWxpemVkOiAoIGEuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIvYVwiICksXG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCBlbGVtZW50IG9wYWNpdHkgZXhpc3RzXG5cdFx0Ly8gKElFIHVzZXMgZmlsdGVyIGluc3RlYWQpXG5cdFx0Ly8gVXNlIGEgcmVnZXggdG8gd29yayBhcm91bmQgYSBXZWJLaXQgaXNzdWUuIFNlZSAjNTE0NVxuXHRcdG9wYWNpdHk6IC9eMC41Ly50ZXN0KCBhLnN0eWxlLm9wYWNpdHkgKSxcblxuXHRcdC8vIFZlcmlmeSBzdHlsZSBmbG9hdCBleGlzdGVuY2Vcblx0XHQvLyAoSUUgdXNlcyBzdHlsZUZsb2F0IGluc3RlYWQgb2YgY3NzRmxvYXQpXG5cdFx0Y3NzRmxvYXQ6ICEhYS5zdHlsZS5jc3NGbG9hdCxcblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IGlmIG5vIHZhbHVlIGlzIHNwZWNpZmllZCBmb3IgYSBjaGVja2JveFxuXHRcdC8vIHRoYXQgaXQgZGVmYXVsdHMgdG8gXCJvblwiLlxuXHRcdC8vIChXZWJLaXQgZGVmYXVsdHMgdG8gXCJcIiBpbnN0ZWFkKVxuXHRcdGNoZWNrT246ICggaW5wdXQudmFsdWUgPT09IFwib25cIiApLFxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgYSBzZWxlY3RlZC1ieS1kZWZhdWx0IG9wdGlvbiBoYXMgYSB3b3JraW5nIHNlbGVjdGVkIHByb3BlcnR5LlxuXHRcdC8vIChXZWJLaXQgZGVmYXVsdHMgdG8gZmFsc2UgaW5zdGVhZCBvZiB0cnVlLCBJRSB0b28sIGlmIGl0J3MgaW4gYW4gb3B0Z3JvdXApXG5cdFx0b3B0U2VsZWN0ZWQ6IG9wdC5zZWxlY3RlZCxcblxuXHRcdC8vIFRlc3Qgc2V0QXR0cmlidXRlIG9uIGNhbWVsQ2FzZSBjbGFzcy4gSWYgaXQgd29ya3MsIHdlIG5lZWQgYXR0ckZpeGVzIHdoZW4gZG9pbmcgZ2V0L3NldEF0dHJpYnV0ZSAoaWU2LzcpXG5cdFx0Z2V0U2V0QXR0cmlidXRlOiBkaXYuY2xhc3NOYW1lICE9PSBcInRcIixcblxuXHRcdC8vIFRlc3RzIGZvciBlbmN0eXBlIHN1cHBvcnQgb24gYSBmb3JtKCM2NzQzKVxuXHRcdGVuY3R5cGU6ICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIikuZW5jdHlwZSxcblxuXHRcdC8vIE1ha2VzIHN1cmUgY2xvbmluZyBhbiBodG1sNSBlbGVtZW50IGRvZXMgbm90IGNhdXNlIHByb2JsZW1zXG5cdFx0Ly8gV2hlcmUgb3V0ZXJIVE1MIGlzIHVuZGVmaW5lZCwgdGhpcyBzdGlsbCB3b3Jrc1xuXHRcdGh0bWw1Q2xvbmU6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIikuY2xvbmVOb2RlKCB0cnVlICkub3V0ZXJIVE1MICE9PSBcIjw6bmF2PjwvOm5hdj5cIixcblxuXHRcdC8vIGpRdWVyeS5zdXBwb3J0LmJveE1vZGVsIERFUFJFQ0FURUQgaW4gMS44IHNpbmNlIHdlIGRvbid0IHN1cHBvcnQgUXVpcmtzIE1vZGVcblx0XHRib3hNb2RlbDogKCBkb2N1bWVudC5jb21wYXRNb2RlID09PSBcIkNTUzFDb21wYXRcIiApLFxuXG5cdFx0Ly8gV2lsbCBiZSBkZWZpbmVkIGxhdGVyXG5cdFx0c3VibWl0QnViYmxlczogdHJ1ZSxcblx0XHRjaGFuZ2VCdWJibGVzOiB0cnVlLFxuXHRcdGZvY3VzaW5CdWJibGVzOiBmYWxzZSxcblx0XHRkZWxldGVFeHBhbmRvOiB0cnVlLFxuXHRcdG5vQ2xvbmVFdmVudDogdHJ1ZSxcblx0XHRpbmxpbmVCbG9ja05lZWRzTGF5b3V0OiBmYWxzZSxcblx0XHRzaHJpbmtXcmFwQmxvY2tzOiBmYWxzZSxcblx0XHRyZWxpYWJsZU1hcmdpblJpZ2h0OiB0cnVlLFxuXHRcdGJveFNpemluZ1JlbGlhYmxlOiB0cnVlLFxuXHRcdHBpeGVsUG9zaXRpb246IGZhbHNlXG5cdH07XG5cblx0Ly8gTWFrZSBzdXJlIGNoZWNrZWQgc3RhdHVzIGlzIHByb3Blcmx5IGNsb25lZFxuXHRpbnB1dC5jaGVja2VkID0gdHJ1ZTtcblx0c3VwcG9ydC5ub0Nsb25lQ2hlY2tlZCA9IGlucHV0LmNsb25lTm9kZSggdHJ1ZSApLmNoZWNrZWQ7XG5cblx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIG9wdGlvbnMgaW5zaWRlIGRpc2FibGVkIHNlbGVjdHMgYXJlbid0IG1hcmtlZCBhcyBkaXNhYmxlZFxuXHQvLyAoV2ViS2l0IG1hcmtzIHRoZW0gYXMgZGlzYWJsZWQpXG5cdHNlbGVjdC5kaXNhYmxlZCA9IHRydWU7XG5cdHN1cHBvcnQub3B0RGlzYWJsZWQgPSAhb3B0LmRpc2FibGVkO1xuXG5cdC8vIFRlc3QgdG8gc2VlIGlmIGl0J3MgcG9zc2libGUgdG8gZGVsZXRlIGFuIGV4cGFuZG8gZnJvbSBhbiBlbGVtZW50XG5cdC8vIEZhaWxzIGluIEludGVybmV0IEV4cGxvcmVyXG5cdHRyeSB7XG5cdFx0ZGVsZXRlIGRpdi50ZXN0O1xuXHR9IGNhdGNoKCBlICkge1xuXHRcdHN1cHBvcnQuZGVsZXRlRXhwYW5kbyA9IGZhbHNlO1xuXHR9XG5cblx0aWYgKCAhZGl2LmFkZEV2ZW50TGlzdGVuZXIgJiYgZGl2LmF0dGFjaEV2ZW50ICYmIGRpdi5maXJlRXZlbnQgKSB7XG5cdFx0ZGl2LmF0dGFjaEV2ZW50KCBcIm9uY2xpY2tcIiwgY2xpY2tGbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gQ2xvbmluZyBhIG5vZGUgc2hvdWxkbid0IGNvcHkgb3ZlciBhbnlcblx0XHRcdC8vIGJvdW5kIGV2ZW50IGhhbmRsZXJzIChJRSBkb2VzIHRoaXMpXG5cdFx0XHRzdXBwb3J0Lm5vQ2xvbmVFdmVudCA9IGZhbHNlO1xuXHRcdH0pO1xuXHRcdGRpdi5jbG9uZU5vZGUoIHRydWUgKS5maXJlRXZlbnQoXCJvbmNsaWNrXCIpO1xuXHRcdGRpdi5kZXRhY2hFdmVudCggXCJvbmNsaWNrXCIsIGNsaWNrRm4gKTtcblx0fVxuXG5cdC8vIENoZWNrIGlmIGEgcmFkaW8gbWFpbnRhaW5zIGl0cyB2YWx1ZVxuXHQvLyBhZnRlciBiZWluZyBhcHBlbmRlZCB0byB0aGUgRE9NXG5cdGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRpbnB1dC52YWx1ZSA9IFwidFwiO1xuXHRpbnB1dC5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCBcInJhZGlvXCIgKTtcblx0c3VwcG9ydC5yYWRpb1ZhbHVlID0gaW5wdXQudmFsdWUgPT09IFwidFwiO1xuXG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiICk7XG5cblx0Ly8gIzExMjE3IC0gV2ViS2l0IGxvc2VzIGNoZWNrIHdoZW4gdGhlIG5hbWUgaXMgYWZ0ZXIgdGhlIGNoZWNrZWQgYXR0cmlidXRlXG5cdGlucHV0LnNldEF0dHJpYnV0ZSggXCJuYW1lXCIsIFwidFwiICk7XG5cblx0ZGl2LmFwcGVuZENoaWxkKCBpbnB1dCApO1xuXHRmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRpdi5sYXN0Q2hpbGQgKTtcblxuXHQvLyBXZWJLaXQgZG9lc24ndCBjbG9uZSBjaGVja2VkIHN0YXRlIGNvcnJlY3RseSBpbiBmcmFnbWVudHNcblx0c3VwcG9ydC5jaGVja0Nsb25lID0gZnJhZ21lbnQuY2xvbmVOb2RlKCB0cnVlICkuY2xvbmVOb2RlKCB0cnVlICkubGFzdENoaWxkLmNoZWNrZWQ7XG5cblx0Ly8gQ2hlY2sgaWYgYSBkaXNjb25uZWN0ZWQgY2hlY2tib3ggd2lsbCByZXRhaW4gaXRzIGNoZWNrZWRcblx0Ly8gdmFsdWUgb2YgdHJ1ZSBhZnRlciBhcHBlbmRlZCB0byB0aGUgRE9NIChJRTYvNylcblx0c3VwcG9ydC5hcHBlbmRDaGVja2VkID0gaW5wdXQuY2hlY2tlZDtcblxuXHRmcmFnbWVudC5yZW1vdmVDaGlsZCggaW5wdXQgKTtcblx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRpdiApO1xuXG5cdC8vIFRlY2huaXF1ZSBmcm9tIEp1cml5IFpheXRzZXZcblx0Ly8gaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vZGV0ZWN0aW5nLWV2ZW50LXN1cHBvcnQtd2l0aG91dC1icm93c2VyLXNuaWZmaW5nL1xuXHQvLyBXZSBvbmx5IGNhcmUgYWJvdXQgdGhlIGNhc2Ugd2hlcmUgbm9uLXN0YW5kYXJkIGV2ZW50IHN5c3RlbXNcblx0Ly8gYXJlIHVzZWQsIG5hbWVseSBpbiBJRS4gU2hvcnQtY2lyY3VpdGluZyBoZXJlIGhlbHBzIHVzIHRvXG5cdC8vIGF2b2lkIGFuIGV2YWwgY2FsbCAoaW4gc2V0QXR0cmlidXRlKSB3aGljaCBjYW4gY2F1c2UgQ1NQXG5cdC8vIHRvIGdvIGhheXdpcmUuIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vU2VjdXJpdHkvQ1NQXG5cdGlmICggZGl2LmF0dGFjaEV2ZW50ICkge1xuXHRcdGZvciAoIGkgaW4ge1xuXHRcdFx0c3VibWl0OiB0cnVlLFxuXHRcdFx0Y2hhbmdlOiB0cnVlLFxuXHRcdFx0Zm9jdXNpbjogdHJ1ZVxuXHRcdH0pIHtcblx0XHRcdGV2ZW50TmFtZSA9IFwib25cIiArIGk7XG5cdFx0XHRpc1N1cHBvcnRlZCA9ICggZXZlbnROYW1lIGluIGRpdiApO1xuXHRcdFx0aWYgKCAhaXNTdXBwb3J0ZWQgKSB7XG5cdFx0XHRcdGRpdi5zZXRBdHRyaWJ1dGUoIGV2ZW50TmFtZSwgXCJyZXR1cm47XCIgKTtcblx0XHRcdFx0aXNTdXBwb3J0ZWQgPSAoIHR5cGVvZiBkaXZbIGV2ZW50TmFtZSBdID09PSBcImZ1bmN0aW9uXCIgKTtcblx0XHRcdH1cblx0XHRcdHN1cHBvcnRbIGkgKyBcIkJ1YmJsZXNcIiBdID0gaXNTdXBwb3J0ZWQ7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUnVuIHRlc3RzIHRoYXQgbmVlZCBhIGJvZHkgYXQgZG9jIHJlYWR5XG5cdGpRdWVyeShmdW5jdGlvbigpIHtcblx0XHR2YXIgY29udGFpbmVyLCBkaXYsIHRkcywgbWFyZ2luRGl2LFxuXHRcdFx0ZGl2UmVzZXQgPSBcInBhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MDtkaXNwbGF5OmJsb2NrO292ZXJmbG93OmhpZGRlbjtcIixcblx0XHRcdGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF07XG5cblx0XHRpZiAoICFib2R5ICkge1xuXHRcdFx0Ly8gUmV0dXJuIGZvciBmcmFtZXNldCBkb2NzIHRoYXQgZG9uJ3QgaGF2ZSBhIGJvZHlcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gXCJ2aXNpYmlsaXR5OmhpZGRlbjtib3JkZXI6MDt3aWR0aDowO2hlaWdodDowO3Bvc2l0aW9uOnN0YXRpYzt0b3A6MDttYXJnaW4tdG9wOjFweFwiO1xuXHRcdGJvZHkuaW5zZXJ0QmVmb3JlKCBjb250YWluZXIsIGJvZHkuZmlyc3RDaGlsZCApO1xuXG5cdFx0Ly8gQ29uc3RydWN0IHRoZSB0ZXN0IGVsZW1lbnRcblx0XHRkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggZGl2ICk7XG5cblx0XHQvLyBDaGVjayBpZiB0YWJsZSBjZWxscyBzdGlsbCBoYXZlIG9mZnNldFdpZHRoL0hlaWdodCB3aGVuIHRoZXkgYXJlIHNldFxuXHRcdC8vIHRvIGRpc3BsYXk6bm9uZSBhbmQgdGhlcmUgYXJlIHN0aWxsIG90aGVyIHZpc2libGUgdGFibGUgY2VsbHMgaW4gYVxuXHRcdC8vIHRhYmxlIHJvdzsgaWYgc28sIG9mZnNldFdpZHRoL0hlaWdodCBhcmUgbm90IHJlbGlhYmxlIGZvciB1c2Ugd2hlblxuXHRcdC8vIGRldGVybWluaW5nIGlmIGFuIGVsZW1lbnQgaGFzIGJlZW4gaGlkZGVuIGRpcmVjdGx5IHVzaW5nXG5cdFx0Ly8gZGlzcGxheTpub25lIChpdCBpcyBzdGlsbCBzYWZlIHRvIHVzZSBvZmZzZXRzIGlmIGEgcGFyZW50IGVsZW1lbnQgaXNcblx0XHQvLyBoaWRkZW47IGRvbiBzYWZldHkgZ29nZ2xlcyBhbmQgc2VlIGJ1ZyAjNDUxMiBmb3IgbW9yZSBpbmZvcm1hdGlvbikuXG5cdFx0Ly8gKG9ubHkgSUUgOCBmYWlscyB0aGlzIHRlc3QpXG5cdFx0ZGl2LmlubmVySFRNTCA9IFwiPHRhYmxlPjx0cj48dGQ+PC90ZD48dGQ+dDwvdGQ+PC90cj48L3RhYmxlPlwiO1xuXHRcdHRkcyA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpO1xuXHRcdHRkc1sgMCBdLnN0eWxlLmNzc1RleHQgPSBcInBhZGRpbmc6MDttYXJnaW46MDtib3JkZXI6MDtkaXNwbGF5Om5vbmVcIjtcblx0XHRpc1N1cHBvcnRlZCA9ICggdGRzWyAwIF0ub2Zmc2V0SGVpZ2h0ID09PSAwICk7XG5cblx0XHR0ZHNbIDAgXS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblx0XHR0ZHNbIDEgXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cblx0XHQvLyBDaGVjayBpZiBlbXB0eSB0YWJsZSBjZWxscyBzdGlsbCBoYXZlIG9mZnNldFdpZHRoL0hlaWdodFxuXHRcdC8vIChJRSA8PSA4IGZhaWwgdGhpcyB0ZXN0KVxuXHRcdHN1cHBvcnQucmVsaWFibGVIaWRkZW5PZmZzZXRzID0gaXNTdXBwb3J0ZWQgJiYgKCB0ZHNbIDAgXS5vZmZzZXRIZWlnaHQgPT09IDAgKTtcblxuXHRcdC8vIENoZWNrIGJveC1zaXppbmcgYW5kIG1hcmdpbiBiZWhhdmlvclxuXHRcdGRpdi5pbm5lckhUTUwgPSBcIlwiO1xuXHRcdGRpdi5zdHlsZS5jc3NUZXh0ID0gXCJib3gtc2l6aW5nOmJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7cGFkZGluZzoxcHg7Ym9yZGVyOjFweDtkaXNwbGF5OmJsb2NrO3dpZHRoOjRweDttYXJnaW4tdG9wOjElO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxJTtcIjtcblx0XHRzdXBwb3J0LmJveFNpemluZyA9ICggZGl2Lm9mZnNldFdpZHRoID09PSA0ICk7XG5cdFx0c3VwcG9ydC5kb2VzTm90SW5jbHVkZU1hcmdpbkluQm9keU9mZnNldCA9ICggYm9keS5vZmZzZXRUb3AgIT09IDEgKTtcblxuXHRcdC8vIE5PVEU6IFRvIGFueSBmdXR1cmUgbWFpbnRhaW5lciwgd2UndmUgd2luZG93LmdldENvbXB1dGVkU3R5bGVcblx0XHQvLyBiZWNhdXNlIGpzZG9tIG9uIG5vZGUuanMgd2lsbCBicmVhayB3aXRob3V0IGl0LlxuXHRcdGlmICggd2luZG93LmdldENvbXB1dGVkU3R5bGUgKSB7XG5cdFx0XHRzdXBwb3J0LnBpeGVsUG9zaXRpb24gPSAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKCBkaXYsIG51bGwgKSB8fCB7fSApLnRvcCAhPT0gXCIxJVwiO1xuXHRcdFx0c3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSA9ICggd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGRpdiwgbnVsbCApIHx8IHsgd2lkdGg6IFwiNHB4XCIgfSApLndpZHRoID09PSBcIjRweFwiO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBkaXYgd2l0aCBleHBsaWNpdCB3aWR0aCBhbmQgbm8gbWFyZ2luLXJpZ2h0IGluY29ycmVjdGx5XG5cdFx0XHQvLyBnZXRzIGNvbXB1dGVkIG1hcmdpbi1yaWdodCBiYXNlZCBvbiB3aWR0aCBvZiBjb250YWluZXIuIEZvciBtb3JlXG5cdFx0XHQvLyBpbmZvIHNlZSBidWcgIzMzMzNcblx0XHRcdC8vIEZhaWxzIGluIFdlYktpdCBiZWZvcmUgRmViIDIwMTEgbmlnaHRsaWVzXG5cdFx0XHQvLyBXZWJLaXQgQnVnIDEzMzQzIC0gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHdyb25nIHZhbHVlIGZvciBtYXJnaW4tcmlnaHRcblx0XHRcdG1hcmdpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRtYXJnaW5EaXYuc3R5bGUuY3NzVGV4dCA9IGRpdi5zdHlsZS5jc3NUZXh0ID0gZGl2UmVzZXQ7XG5cdFx0XHRtYXJnaW5EaXYuc3R5bGUubWFyZ2luUmlnaHQgPSBtYXJnaW5EaXYuc3R5bGUud2lkdGggPSBcIjBcIjtcblx0XHRcdGRpdi5zdHlsZS53aWR0aCA9IFwiMXB4XCI7XG5cdFx0XHRkaXYuYXBwZW5kQ2hpbGQoIG1hcmdpbkRpdiApO1xuXHRcdFx0c3VwcG9ydC5yZWxpYWJsZU1hcmdpblJpZ2h0ID1cblx0XHRcdFx0IXBhcnNlRmxvYXQoICggd2luZG93LmdldENvbXB1dGVkU3R5bGUoIG1hcmdpbkRpdiwgbnVsbCApIHx8IHt9ICkubWFyZ2luUmlnaHQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiBkaXYuc3R5bGUuem9vbSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdC8vIENoZWNrIGlmIG5hdGl2ZWx5IGJsb2NrLWxldmVsIGVsZW1lbnRzIGFjdCBsaWtlIGlubGluZS1ibG9ja1xuXHRcdFx0Ly8gZWxlbWVudHMgd2hlbiBzZXR0aW5nIHRoZWlyIGRpc3BsYXkgdG8gJ2lubGluZScgYW5kIGdpdmluZ1xuXHRcdFx0Ly8gdGhlbSBsYXlvdXRcblx0XHRcdC8vIChJRSA8IDggZG9lcyB0aGlzKVxuXHRcdFx0ZGl2LmlubmVySFRNTCA9IFwiXCI7XG5cdFx0XHRkaXYuc3R5bGUuY3NzVGV4dCA9IGRpdlJlc2V0ICsgXCJ3aWR0aDoxcHg7cGFkZGluZzoxcHg7ZGlzcGxheTppbmxpbmU7em9vbToxXCI7XG5cdFx0XHRzdXBwb3J0LmlubGluZUJsb2NrTmVlZHNMYXlvdXQgPSAoIGRpdi5vZmZzZXRXaWR0aCA9PT0gMyApO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBlbGVtZW50cyB3aXRoIGxheW91dCBzaHJpbmstd3JhcCB0aGVpciBjaGlsZHJlblxuXHRcdFx0Ly8gKElFIDYgZG9lcyB0aGlzKVxuXHRcdFx0ZGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdFx0XHRkaXYuc3R5bGUub3ZlcmZsb3cgPSBcInZpc2libGVcIjtcblx0XHRcdGRpdi5pbm5lckhUTUwgPSBcIjxkaXY+PC9kaXY+XCI7XG5cdFx0XHRkaXYuZmlyc3RDaGlsZC5zdHlsZS53aWR0aCA9IFwiNXB4XCI7XG5cdFx0XHRzdXBwb3J0LnNocmlua1dyYXBCbG9ja3MgPSAoIGRpdi5vZmZzZXRXaWR0aCAhPT0gMyApO1xuXG5cdFx0XHRjb250YWluZXIuc3R5bGUuem9vbSA9IDE7XG5cdFx0fVxuXG5cdFx0Ly8gTnVsbCBlbGVtZW50cyB0byBhdm9pZCBsZWFrcyBpbiBJRVxuXHRcdGJvZHkucmVtb3ZlQ2hpbGQoIGNvbnRhaW5lciApO1xuXHRcdGNvbnRhaW5lciA9IGRpdiA9IHRkcyA9IG1hcmdpbkRpdiA9IG51bGw7XG5cdH0pO1xuXG5cdC8vIE51bGwgZWxlbWVudHMgdG8gYXZvaWQgbGVha3MgaW4gSUVcblx0ZnJhZ21lbnQucmVtb3ZlQ2hpbGQoIGRpdiApO1xuXHRhbGwgPSBhID0gc2VsZWN0ID0gb3B0ID0gaW5wdXQgPSBmcmFnbWVudCA9IGRpdiA9IG51bGw7XG5cblx0cmV0dXJuIHN1cHBvcnQ7XG59KSgpO1xudmFyIHJicmFjZSA9IC8oPzpcXHtbXFxzXFxTXSpcXH18XFxbW1xcc1xcU10qXFxdKSQvLFxuXHRybXVsdGlEYXNoID0gLyhbQS1aXSkvZztcblxualF1ZXJ5LmV4dGVuZCh7XG5cdGNhY2hlOiB7fSxcblxuXHRkZWxldGVkSWRzOiBbXSxcblxuXHQvLyBQbGVhc2UgdXNlIHdpdGggY2F1dGlvblxuXHR1dWlkOiAwLFxuXG5cdC8vIFVuaXF1ZSBmb3IgZWFjaCBjb3B5IG9mIGpRdWVyeSBvbiB0aGUgcGFnZVxuXHQvLyBOb24tZGlnaXRzIHJlbW92ZWQgdG8gbWF0Y2ggcmlubGluZWpRdWVyeVxuXHRleHBhbmRvOiBcImpRdWVyeVwiICsgKCBqUXVlcnkuZm4uanF1ZXJ5ICsgTWF0aC5yYW5kb20oKSApLnJlcGxhY2UoIC9cXEQvZywgXCJcIiApLFxuXG5cdC8vIFRoZSBmb2xsb3dpbmcgZWxlbWVudHMgdGhyb3cgdW5jYXRjaGFibGUgZXhjZXB0aW9ucyBpZiB5b3Vcblx0Ly8gYXR0ZW1wdCB0byBhZGQgZXhwYW5kbyBwcm9wZXJ0aWVzIHRvIHRoZW0uXG5cdG5vRGF0YToge1xuXHRcdFwiZW1iZWRcIjogdHJ1ZSxcblx0XHQvLyBCYW4gYWxsIG9iamVjdHMgZXhjZXB0IGZvciBGbGFzaCAod2hpY2ggaGFuZGxlIGV4cGFuZG9zKVxuXHRcdFwib2JqZWN0XCI6IFwiY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwXCIsXG5cdFx0XCJhcHBsZXRcIjogdHJ1ZVxuXHR9LFxuXG5cdGhhc0RhdGE6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdGVsZW0gPSBlbGVtLm5vZGVUeXBlID8galF1ZXJ5LmNhY2hlWyBlbGVtW2pRdWVyeS5leHBhbmRvXSBdIDogZWxlbVsgalF1ZXJ5LmV4cGFuZG8gXTtcblx0XHRyZXR1cm4gISFlbGVtICYmICFpc0VtcHR5RGF0YU9iamVjdCggZWxlbSApO1xuXHR9LFxuXG5cdGRhdGE6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBkYXRhLCBwdnQgLyogSW50ZXJuYWwgVXNlIE9ubHkgKi8gKSB7XG5cdFx0aWYgKCAhalF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR2YXIgdGhpc0NhY2hlLCByZXQsXG5cdFx0XHRpbnRlcm5hbEtleSA9IGpRdWVyeS5leHBhbmRvLFxuXHRcdFx0Z2V0QnlOYW1lID0gdHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIsXG5cblx0XHRcdC8vIFdlIGhhdmUgdG8gaGFuZGxlIERPTSBub2RlcyBhbmQgSlMgb2JqZWN0cyBkaWZmZXJlbnRseSBiZWNhdXNlIElFNi03XG5cdFx0XHQvLyBjYW4ndCBHQyBvYmplY3QgcmVmZXJlbmNlcyBwcm9wZXJseSBhY3Jvc3MgdGhlIERPTS1KUyBib3VuZGFyeVxuXHRcdFx0aXNOb2RlID0gZWxlbS5ub2RlVHlwZSxcblxuXHRcdFx0Ly8gT25seSBET00gbm9kZXMgbmVlZCB0aGUgZ2xvYmFsIGpRdWVyeSBjYWNoZTsgSlMgb2JqZWN0IGRhdGEgaXNcblx0XHRcdC8vIGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBvYmplY3Qgc28gR0MgY2FuIG9jY3VyIGF1dG9tYXRpY2FsbHlcblx0XHRcdGNhY2hlID0gaXNOb2RlID8galF1ZXJ5LmNhY2hlIDogZWxlbSxcblxuXHRcdFx0Ly8gT25seSBkZWZpbmluZyBhbiBJRCBmb3IgSlMgb2JqZWN0cyBpZiBpdHMgY2FjaGUgYWxyZWFkeSBleGlzdHMgYWxsb3dzXG5cdFx0XHQvLyB0aGUgY29kZSB0byBzaG9ydGN1dCBvbiB0aGUgc2FtZSBwYXRoIGFzIGEgRE9NIG5vZGUgd2l0aCBubyBjYWNoZVxuXHRcdFx0aWQgPSBpc05vZGUgPyBlbGVtWyBpbnRlcm5hbEtleSBdIDogZWxlbVsgaW50ZXJuYWxLZXkgXSAmJiBpbnRlcm5hbEtleTtcblxuXHRcdC8vIEF2b2lkIGRvaW5nIGFueSBtb3JlIHdvcmsgdGhhbiB3ZSBuZWVkIHRvIHdoZW4gdHJ5aW5nIHRvIGdldCBkYXRhIG9uIGFuXG5cdFx0Ly8gb2JqZWN0IHRoYXQgaGFzIG5vIGRhdGEgYXQgYWxsXG5cdFx0aWYgKCAoIWlkIHx8ICFjYWNoZVtpZF0gfHwgKCFwdnQgJiYgIWNhY2hlW2lkXS5kYXRhKSkgJiYgZ2V0QnlOYW1lICYmIGRhdGEgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoICFpZCApIHtcblx0XHRcdC8vIE9ubHkgRE9NIG5vZGVzIG5lZWQgYSBuZXcgdW5pcXVlIElEIGZvciBlYWNoIGVsZW1lbnQgc2luY2UgdGhlaXIgZGF0YVxuXHRcdFx0Ly8gZW5kcyB1cCBpbiB0aGUgZ2xvYmFsIGNhY2hlXG5cdFx0XHRpZiAoIGlzTm9kZSApIHtcblx0XHRcdFx0ZWxlbVsgaW50ZXJuYWxLZXkgXSA9IGlkID0galF1ZXJ5LmRlbGV0ZWRJZHMucG9wKCkgfHwgKytqUXVlcnkudXVpZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlkID0gaW50ZXJuYWxLZXk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCAhY2FjaGVbIGlkIF0gKSB7XG5cdFx0XHRjYWNoZVsgaWQgXSA9IHt9O1xuXG5cdFx0XHQvLyBBdm9pZHMgZXhwb3NpbmcgalF1ZXJ5IG1ldGFkYXRhIG9uIHBsYWluIEpTIG9iamVjdHMgd2hlbiB0aGUgb2JqZWN0XG5cdFx0XHQvLyBpcyBzZXJpYWxpemVkIHVzaW5nIEpTT04uc3RyaW5naWZ5XG5cdFx0XHRpZiAoICFpc05vZGUgKSB7XG5cdFx0XHRcdGNhY2hlWyBpZCBdLnRvSlNPTiA9IGpRdWVyeS5ub29wO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEFuIG9iamVjdCBjYW4gYmUgcGFzc2VkIHRvIGpRdWVyeS5kYXRhIGluc3RlYWQgb2YgYSBrZXkvdmFsdWUgcGFpcjsgdGhpcyBnZXRzXG5cdFx0Ly8gc2hhbGxvdyBjb3BpZWQgb3ZlciBvbnRvIHRoZSBleGlzdGluZyBjYWNoZVxuXHRcdGlmICggdHlwZW9mIG5hbWUgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIG5hbWUgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdGlmICggcHZ0ICkge1xuXHRcdFx0XHRjYWNoZVsgaWQgXSA9IGpRdWVyeS5leHRlbmQoIGNhY2hlWyBpZCBdLCBuYW1lICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjYWNoZVsgaWQgXS5kYXRhID0galF1ZXJ5LmV4dGVuZCggY2FjaGVbIGlkIF0uZGF0YSwgbmFtZSApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXNDYWNoZSA9IGNhY2hlWyBpZCBdO1xuXG5cdFx0Ly8galF1ZXJ5IGRhdGEoKSBpcyBzdG9yZWQgaW4gYSBzZXBhcmF0ZSBvYmplY3QgaW5zaWRlIHRoZSBvYmplY3QncyBpbnRlcm5hbCBkYXRhXG5cdFx0Ly8gY2FjaGUgaW4gb3JkZXIgdG8gYXZvaWQga2V5IGNvbGxpc2lvbnMgYmV0d2VlbiBpbnRlcm5hbCBkYXRhIGFuZCB1c2VyLWRlZmluZWRcblx0XHQvLyBkYXRhLlxuXHRcdGlmICggIXB2dCApIHtcblx0XHRcdGlmICggIXRoaXNDYWNoZS5kYXRhICkge1xuXHRcdFx0XHR0aGlzQ2FjaGUuZGF0YSA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzQ2FjaGUgPSB0aGlzQ2FjaGUuZGF0YTtcblx0XHR9XG5cblx0XHRpZiAoIGRhdGEgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHRoaXNDYWNoZVsgalF1ZXJ5LmNhbWVsQ2FzZSggbmFtZSApIF0gPSBkYXRhO1xuXHRcdH1cblxuXHRcdC8vIENoZWNrIGZvciBib3RoIGNvbnZlcnRlZC10by1jYW1lbCBhbmQgbm9uLWNvbnZlcnRlZCBkYXRhIHByb3BlcnR5IG5hbWVzXG5cdFx0Ly8gSWYgYSBkYXRhIHByb3BlcnR5IHdhcyBzcGVjaWZpZWRcblx0XHRpZiAoIGdldEJ5TmFtZSApIHtcblxuXHRcdFx0Ly8gRmlyc3QgVHJ5IHRvIGZpbmQgYXMtaXMgcHJvcGVydHkgZGF0YVxuXHRcdFx0cmV0ID0gdGhpc0NhY2hlWyBuYW1lIF07XG5cblx0XHRcdC8vIFRlc3QgZm9yIG51bGx8dW5kZWZpbmVkIHByb3BlcnR5IGRhdGFcblx0XHRcdGlmICggcmV0ID09IG51bGwgKSB7XG5cblx0XHRcdFx0Ly8gVHJ5IHRvIGZpbmQgdGhlIGNhbWVsQ2FzZWQgcHJvcGVydHlcblx0XHRcdFx0cmV0ID0gdGhpc0NhY2hlWyBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICkgXTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0ID0gdGhpc0NhY2hlO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIHB2dCAvKiBJbnRlcm5hbCBVc2UgT25seSAqLyApIHtcblx0XHRpZiAoICFqUXVlcnkuYWNjZXB0RGF0YSggZWxlbSApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciB0aGlzQ2FjaGUsIGksIGwsXG5cblx0XHRcdGlzTm9kZSA9IGVsZW0ubm9kZVR5cGUsXG5cblx0XHRcdC8vIFNlZSBqUXVlcnkuZGF0YSBmb3IgbW9yZSBpbmZvcm1hdGlvblxuXHRcdFx0Y2FjaGUgPSBpc05vZGUgPyBqUXVlcnkuY2FjaGUgOiBlbGVtLFxuXHRcdFx0aWQgPSBpc05vZGUgPyBlbGVtWyBqUXVlcnkuZXhwYW5kbyBdIDogalF1ZXJ5LmV4cGFuZG87XG5cblx0XHQvLyBJZiB0aGVyZSBpcyBhbHJlYWR5IG5vIGNhY2hlIGVudHJ5IGZvciB0aGlzIG9iamVjdCwgdGhlcmUgaXMgbm9cblx0XHQvLyBwdXJwb3NlIGluIGNvbnRpbnVpbmdcblx0XHRpZiAoICFjYWNoZVsgaWQgXSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIG5hbWUgKSB7XG5cblx0XHRcdHRoaXNDYWNoZSA9IHB2dCA/IGNhY2hlWyBpZCBdIDogY2FjaGVbIGlkIF0uZGF0YTtcblxuXHRcdFx0aWYgKCB0aGlzQ2FjaGUgKSB7XG5cblx0XHRcdFx0Ly8gU3VwcG9ydCBhcnJheSBvciBzcGFjZSBzZXBhcmF0ZWQgc3RyaW5nIG5hbWVzIGZvciBkYXRhIGtleXNcblx0XHRcdFx0aWYgKCAhalF1ZXJ5LmlzQXJyYXkoIG5hbWUgKSApIHtcblxuXHRcdFx0XHRcdC8vIHRyeSB0aGUgc3RyaW5nIGFzIGEga2V5IGJlZm9yZSBhbnkgbWFuaXB1bGF0aW9uXG5cdFx0XHRcdFx0aWYgKCBuYW1lIGluIHRoaXNDYWNoZSApIHtcblx0XHRcdFx0XHRcdG5hbWUgPSBbIG5hbWUgXTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHQvLyBzcGxpdCB0aGUgY2FtZWwgY2FzZWQgdmVyc2lvbiBieSBzcGFjZXMgdW5sZXNzIGEga2V5IHdpdGggdGhlIHNwYWNlcyBleGlzdHNcblx0XHRcdFx0XHRcdG5hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICk7XG5cdFx0XHRcdFx0XHRpZiAoIG5hbWUgaW4gdGhpc0NhY2hlICkge1xuXHRcdFx0XHRcdFx0XHRuYW1lID0gWyBuYW1lIF07XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRuYW1lID0gbmFtZS5zcGxpdChcIiBcIik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBuYW1lLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRkZWxldGUgdGhpc0NhY2hlWyBuYW1lW2ldIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiB0aGVyZSBpcyBubyBkYXRhIGxlZnQgaW4gdGhlIGNhY2hlLCB3ZSB3YW50IHRvIGNvbnRpbnVlXG5cdFx0XHRcdC8vIGFuZCBsZXQgdGhlIGNhY2hlIG9iamVjdCBpdHNlbGYgZ2V0IGRlc3Ryb3llZFxuXHRcdFx0XHRpZiAoICEoIHB2dCA/IGlzRW1wdHlEYXRhT2JqZWN0IDogalF1ZXJ5LmlzRW1wdHlPYmplY3QgKSggdGhpc0NhY2hlICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2VlIGpRdWVyeS5kYXRhIGZvciBtb3JlIGluZm9ybWF0aW9uXG5cdFx0aWYgKCAhcHZ0ICkge1xuXHRcdFx0ZGVsZXRlIGNhY2hlWyBpZCBdLmRhdGE7XG5cblx0XHRcdC8vIERvbid0IGRlc3Ryb3kgdGhlIHBhcmVudCBjYWNoZSB1bmxlc3MgdGhlIGludGVybmFsIGRhdGEgb2JqZWN0XG5cdFx0XHQvLyBoYWQgYmVlbiB0aGUgb25seSB0aGluZyBsZWZ0IGluIGl0XG5cdFx0XHRpZiAoICFpc0VtcHR5RGF0YU9iamVjdCggY2FjaGVbIGlkIF0gKSApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIERlc3Ryb3kgdGhlIGNhY2hlXG5cdFx0aWYgKCBpc05vZGUgKSB7XG5cdFx0XHRqUXVlcnkuY2xlYW5EYXRhKCBbIGVsZW0gXSwgdHJ1ZSApO1xuXG5cdFx0Ly8gVXNlIGRlbGV0ZSB3aGVuIHN1cHBvcnRlZCBmb3IgZXhwYW5kb3Mgb3IgYGNhY2hlYCBpcyBub3QgYSB3aW5kb3cgcGVyIGlzV2luZG93ICgjMTAwODApXG5cdFx0fSBlbHNlIGlmICggalF1ZXJ5LnN1cHBvcnQuZGVsZXRlRXhwYW5kbyB8fCBjYWNoZSAhPSBjYWNoZS53aW5kb3cgKSB7XG5cdFx0XHRkZWxldGUgY2FjaGVbIGlkIF07XG5cblx0XHQvLyBXaGVuIGFsbCBlbHNlIGZhaWxzLCBudWxsXG5cdFx0fSBlbHNlIHtcblx0XHRcdGNhY2hlWyBpZCBdID0gbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0Ly8gRm9yIGludGVybmFsIHVzZSBvbmx5LlxuXHRfZGF0YTogZnVuY3Rpb24oIGVsZW0sIG5hbWUsIGRhdGEgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5kYXRhKCBlbGVtLCBuYW1lLCBkYXRhLCB0cnVlICk7XG5cdH0sXG5cblx0Ly8gQSBtZXRob2QgZm9yIGRldGVybWluaW5nIGlmIGEgRE9NIG5vZGUgY2FuIGhhbmRsZSB0aGUgZGF0YSBleHBhbmRvXG5cdGFjY2VwdERhdGE6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBub0RhdGEgPSBlbGVtLm5vZGVOYW1lICYmIGpRdWVyeS5ub0RhdGFbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0Ly8gbm9kZXMgYWNjZXB0IGRhdGEgdW5sZXNzIG90aGVyd2lzZSBzcGVjaWZpZWQ7IHJlamVjdGlvbiBjYW4gYmUgY29uZGl0aW9uYWxcblx0XHRyZXR1cm4gIW5vRGF0YSB8fCBub0RhdGEgIT09IHRydWUgJiYgZWxlbS5nZXRBdHRyaWJ1dGUoXCJjbGFzc2lkXCIpID09PSBub0RhdGE7XG5cdH1cbn0pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0ZGF0YTogZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XG5cdFx0dmFyIHBhcnRzLCBwYXJ0LCBhdHRyLCBuYW1lLCBsLFxuXHRcdFx0ZWxlbSA9IHRoaXNbMF0sXG5cdFx0XHRpID0gMCxcblx0XHRcdGRhdGEgPSBudWxsO1xuXG5cdFx0Ly8gR2V0cyBhbGwgdmFsdWVzXG5cdFx0aWYgKCBrZXkgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggdGhpcy5sZW5ndGggKSB7XG5cdFx0XHRcdGRhdGEgPSBqUXVlcnkuZGF0YSggZWxlbSApO1xuXG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAhalF1ZXJ5Ll9kYXRhKCBlbGVtLCBcInBhcnNlZEF0dHJzXCIgKSApIHtcblx0XHRcdFx0XHRhdHRyID0gZWxlbS5hdHRyaWJ1dGVzO1xuXHRcdFx0XHRcdGZvciAoIGwgPSBhdHRyLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRcdG5hbWUgPSBhdHRyW2ldLm5hbWU7XG5cblx0XHRcdFx0XHRcdGlmICggbmFtZS5pbmRleE9mKCBcImRhdGEtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0XHRcdFx0bmFtZSA9IGpRdWVyeS5jYW1lbENhc2UoIG5hbWUuc3Vic3RyaW5nKDUpICk7XG5cblx0XHRcdFx0XHRcdFx0ZGF0YUF0dHIoIGVsZW0sIG5hbWUsIGRhdGFbIG5hbWUgXSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRqUXVlcnkuX2RhdGEoIGVsZW0sIFwicGFyc2VkQXR0cnNcIiwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH1cblxuXHRcdC8vIFNldHMgbXVsdGlwbGUgdmFsdWVzXG5cdFx0aWYgKCB0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5LmRhdGEoIHRoaXMsIGtleSApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cGFydHMgPSBrZXkuc3BsaXQoIFwiLlwiLCAyICk7XG5cdFx0cGFydHNbMV0gPSBwYXJ0c1sxXSA/IFwiLlwiICsgcGFydHNbMV0gOiBcIlwiO1xuXHRcdHBhcnQgPSBwYXJ0c1sxXSArIFwiIVwiO1xuXG5cdFx0cmV0dXJuIGpRdWVyeS5hY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRkYXRhID0gdGhpcy50cmlnZ2VySGFuZGxlciggXCJnZXREYXRhXCIgKyBwYXJ0LCBbIHBhcnRzWzBdIF0gKTtcblxuXHRcdFx0XHQvLyBUcnkgdG8gZmV0Y2ggYW55IGludGVybmFsbHkgc3RvcmVkIGRhdGEgZmlyc3Rcblx0XHRcdFx0aWYgKCBkYXRhID09PSB1bmRlZmluZWQgJiYgZWxlbSApIHtcblx0XHRcdFx0XHRkYXRhID0galF1ZXJ5LmRhdGEoIGVsZW0sIGtleSApO1xuXHRcdFx0XHRcdGRhdGEgPSBkYXRhQXR0ciggZWxlbSwga2V5LCBkYXRhICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkICYmIHBhcnRzWzFdID9cblx0XHRcdFx0XHR0aGlzLmRhdGEoIHBhcnRzWzBdICkgOlxuXHRcdFx0XHRcdGRhdGE7XG5cdFx0XHR9XG5cblx0XHRcdHBhcnRzWzFdID0gdmFsdWU7XG5cdFx0XHR0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzZWxmID0galF1ZXJ5KCB0aGlzICk7XG5cblx0XHRcdFx0c2VsZi50cmlnZ2VySGFuZGxlciggXCJzZXREYXRhXCIgKyBwYXJ0LCBwYXJ0cyApO1xuXHRcdFx0XHRqUXVlcnkuZGF0YSggdGhpcywga2V5LCB2YWx1ZSApO1xuXHRcdFx0XHRzZWxmLnRyaWdnZXJIYW5kbGVyKCBcImNoYW5nZURhdGFcIiArIHBhcnQsIHBhcnRzICk7XG5cdFx0XHR9KTtcblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEsIG51bGwsIGZhbHNlICk7XG5cdH0sXG5cblx0cmVtb3ZlRGF0YTogZnVuY3Rpb24oIGtleSApIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LnJlbW92ZURhdGEoIHRoaXMsIGtleSApO1xuXHRcdH0pO1xuXHR9XG59KTtcblxuZnVuY3Rpb24gZGF0YUF0dHIoIGVsZW0sIGtleSwgZGF0YSApIHtcblx0Ly8gSWYgbm90aGluZyB3YXMgZm91bmQgaW50ZXJuYWxseSwgdHJ5IHRvIGZldGNoIGFueVxuXHQvLyBkYXRhIGZyb20gdGhlIEhUTUw1IGRhdGEtKiBhdHRyaWJ1dGVcblx0aWYgKCBkYXRhID09PSB1bmRlZmluZWQgJiYgZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblxuXHRcdHZhciBuYW1lID0gXCJkYXRhLVwiICsga2V5LnJlcGxhY2UoIHJtdWx0aURhc2gsIFwiLSQxXCIgKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0ZGF0YSA9IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICk7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0ZGF0YSA9IGRhdGEgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6XG5cdFx0XHRcdGRhdGEgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDpcblx0XHRcdFx0ZGF0YSA9PT0gXCJudWxsXCIgPyBudWxsIDpcblx0XHRcdFx0Ly8gT25seSBjb252ZXJ0IHRvIGEgbnVtYmVyIGlmIGl0IGRvZXNuJ3QgY2hhbmdlIHRoZSBzdHJpbmdcblx0XHRcdFx0K2RhdGEgKyBcIlwiID09PSBkYXRhID8gK2RhdGEgOlxuXHRcdFx0XHRyYnJhY2UudGVzdCggZGF0YSApID8galF1ZXJ5LnBhcnNlSlNPTiggZGF0YSApIDpcblx0XHRcdFx0XHRkYXRhO1xuXHRcdFx0fSBjYXRjaCggZSApIHt9XG5cblx0XHRcdC8vIE1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGRhdGEgc28gaXQgaXNuJ3QgY2hhbmdlZCBsYXRlclxuXHRcdFx0alF1ZXJ5LmRhdGEoIGVsZW0sIGtleSwgZGF0YSApO1xuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGE7XG59XG5cbi8vIGNoZWNrcyBhIGNhY2hlIG9iamVjdCBmb3IgZW1wdGluZXNzXG5mdW5jdGlvbiBpc0VtcHR5RGF0YU9iamVjdCggb2JqICkge1xuXHR2YXIgbmFtZTtcblx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cblx0XHQvLyBpZiB0aGUgcHVibGljIGRhdGEgb2JqZWN0IGlzIGVtcHR5LCB0aGUgcHJpdmF0ZSBpcyBzdGlsbCBlbXB0eVxuXHRcdGlmICggbmFtZSA9PT0gXCJkYXRhXCIgJiYgalF1ZXJ5LmlzRW1wdHlPYmplY3QoIG9ialtuYW1lXSApICkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGlmICggbmFtZSAhPT0gXCJ0b0pTT05cIiApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cbmpRdWVyeS5leHRlbmQoe1xuXHRxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGRhdGEgKSB7XG5cdFx0dmFyIHF1ZXVlO1xuXG5cdFx0aWYgKCBlbGVtICkge1xuXHRcdFx0dHlwZSA9ICggdHlwZSB8fCBcImZ4XCIgKSArIFwicXVldWVcIjtcblx0XHRcdHF1ZXVlID0galF1ZXJ5Ll9kYXRhKCBlbGVtLCB0eXBlICk7XG5cblx0XHRcdC8vIFNwZWVkIHVwIGRlcXVldWUgYnkgZ2V0dGluZyBvdXQgcXVpY2tseSBpZiB0aGlzIGlzIGp1c3QgYSBsb29rdXBcblx0XHRcdGlmICggZGF0YSApIHtcblx0XHRcdFx0aWYgKCAhcXVldWUgfHwgalF1ZXJ5LmlzQXJyYXkoZGF0YSkgKSB7XG5cdFx0XHRcdFx0cXVldWUgPSBqUXVlcnkuX2RhdGEoIGVsZW0sIHR5cGUsIGpRdWVyeS5tYWtlQXJyYXkoZGF0YSkgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRxdWV1ZS5wdXNoKCBkYXRhICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBxdWV1ZSB8fCBbXTtcblx0XHR9XG5cdH0sXG5cblx0ZGVxdWV1ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0dmFyIHF1ZXVlID0galF1ZXJ5LnF1ZXVlKCBlbGVtLCB0eXBlICksXG5cdFx0XHRzdGFydExlbmd0aCA9IHF1ZXVlLmxlbmd0aCxcblx0XHRcdGZuID0gcXVldWUuc2hpZnQoKSxcblx0XHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCB0eXBlICksXG5cdFx0XHRuZXh0ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5kZXF1ZXVlKCBlbGVtLCB0eXBlICk7XG5cdFx0XHR9O1xuXG5cdFx0Ly8gSWYgdGhlIGZ4IHF1ZXVlIGlzIGRlcXVldWVkLCBhbHdheXMgcmVtb3ZlIHRoZSBwcm9ncmVzcyBzZW50aW5lbFxuXHRcdGlmICggZm4gPT09IFwiaW5wcm9ncmVzc1wiICkge1xuXHRcdFx0Zm4gPSBxdWV1ZS5zaGlmdCgpO1xuXHRcdFx0c3RhcnRMZW5ndGgtLTtcblx0XHR9XG5cblx0XHRpZiAoIGZuICkge1xuXG5cdFx0XHQvLyBBZGQgYSBwcm9ncmVzcyBzZW50aW5lbCB0byBwcmV2ZW50IHRoZSBmeCBxdWV1ZSBmcm9tIGJlaW5nXG5cdFx0XHQvLyBhdXRvbWF0aWNhbGx5IGRlcXVldWVkXG5cdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiApIHtcblx0XHRcdFx0cXVldWUudW5zaGlmdCggXCJpbnByb2dyZXNzXCIgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2xlYXIgdXAgdGhlIGxhc3QgcXVldWUgc3RvcCBmdW5jdGlvblxuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRmbi5jYWxsKCBlbGVtLCBuZXh0LCBob29rcyApO1xuXHRcdH1cblxuXHRcdGlmICggIXN0YXJ0TGVuZ3RoICYmIGhvb2tzICkge1xuXHRcdFx0aG9va3MuZW1wdHkuZmlyZSgpO1xuXHRcdH1cblx0fSxcblxuXHQvLyBub3QgaW50ZW5kZWQgZm9yIHB1YmxpYyBjb25zdW1wdGlvbiAtIGdlbmVyYXRlcyBhIHF1ZXVlSG9va3Mgb2JqZWN0LCBvciByZXR1cm5zIHRoZSBjdXJyZW50IG9uZVxuXHRfcXVldWVIb29rczogZnVuY3Rpb24oIGVsZW0sIHR5cGUgKSB7XG5cdFx0dmFyIGtleSA9IHR5cGUgKyBcInF1ZXVlSG9va3NcIjtcblx0XHRyZXR1cm4galF1ZXJ5Ll9kYXRhKCBlbGVtLCBrZXkgKSB8fCBqUXVlcnkuX2RhdGEoIGVsZW0sIGtleSwge1xuXHRcdFx0ZW1wdHk6IGpRdWVyeS5DYWxsYmFja3MoXCJvbmNlIG1lbW9yeVwiKS5hZGQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVEYXRhKCBlbGVtLCB0eXBlICsgXCJxdWV1ZVwiLCB0cnVlICk7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVEYXRhKCBlbGVtLCBrZXksIHRydWUgKTtcblx0XHRcdH0pXG5cdFx0fSk7XG5cdH1cbn0pO1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0cXVldWU6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHZhciBzZXR0ZXIgPSAyO1xuXG5cdFx0aWYgKCB0eXBlb2YgdHlwZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGRhdGEgPSB0eXBlO1xuXHRcdFx0dHlwZSA9IFwiZnhcIjtcblx0XHRcdHNldHRlci0tO1xuXHRcdH1cblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA8IHNldHRlciApIHtcblx0XHRcdHJldHVybiBqUXVlcnkucXVldWUoIHRoaXNbMF0sIHR5cGUgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMgOlxuXHRcdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgcXVldWUgPSBqUXVlcnkucXVldWUoIHRoaXMsIHR5cGUsIGRhdGEgKTtcblxuXHRcdFx0XHQvLyBlbnN1cmUgYSBob29rcyBmb3IgdGhpcyBxdWV1ZVxuXHRcdFx0XHRqUXVlcnkuX3F1ZXVlSG9va3MoIHRoaXMsIHR5cGUgKTtcblxuXHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiZnhcIiAmJiBxdWV1ZVswXSAhPT0gXCJpbnByb2dyZXNzXCIgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmRlcXVldWUoIHRoaXMsIHR5cGUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH0sXG5cdGRlcXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdH0pO1xuXHR9LFxuXHQvLyBCYXNlZCBvZmYgb2YgdGhlIHBsdWdpbiBieSBDbGludCBIZWxmZXJzLCB3aXRoIHBlcm1pc3Npb24uXG5cdC8vIGh0dHA6Ly9ibGluZHNpZ25hbHMuY29tL2luZGV4LnBocC8yMDA5LzA3L2pxdWVyeS1kZWxheS9cblx0ZGVsYXk6IGZ1bmN0aW9uKCB0aW1lLCB0eXBlICkge1xuXHRcdHRpbWUgPSBqUXVlcnkuZnggPyBqUXVlcnkuZnguc3BlZWRzWyB0aW1lIF0gfHwgdGltZSA6IHRpbWU7XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0cmV0dXJuIHRoaXMucXVldWUoIHR5cGUsIGZ1bmN0aW9uKCBuZXh0LCBob29rcyApIHtcblx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dCggbmV4dCwgdGltZSApO1xuXHRcdFx0aG9va3Muc3RvcCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblx0XHRcdH07XG5cdFx0fSk7XG5cdH0sXG5cdGNsZWFyUXVldWU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdHJldHVybiB0aGlzLnF1ZXVlKCB0eXBlIHx8IFwiZnhcIiwgW10gKTtcblx0fSxcblx0Ly8gR2V0IGEgcHJvbWlzZSByZXNvbHZlZCB3aGVuIHF1ZXVlcyBvZiBhIGNlcnRhaW4gdHlwZVxuXHQvLyBhcmUgZW1wdGllZCAoZnggaXMgdGhlIHR5cGUgYnkgZGVmYXVsdClcblx0cHJvbWlzZTogZnVuY3Rpb24oIHR5cGUsIG9iaiApIHtcblx0XHR2YXIgdG1wLFxuXHRcdFx0Y291bnQgPSAxLFxuXHRcdFx0ZGVmZXIgPSBqUXVlcnkuRGVmZXJyZWQoKSxcblx0XHRcdGVsZW1lbnRzID0gdGhpcyxcblx0XHRcdGkgPSB0aGlzLmxlbmd0aCxcblx0XHRcdHJlc29sdmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhKCAtLWNvdW50ICkgKSB7XG5cdFx0XHRcdFx0ZGVmZXIucmVzb2x2ZVdpdGgoIGVsZW1lbnRzLCBbIGVsZW1lbnRzIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRvYmogPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0dHlwZSA9IHR5cGUgfHwgXCJmeFwiO1xuXG5cdFx0d2hpbGUoIGktLSApIHtcblx0XHRcdHRtcCA9IGpRdWVyeS5fZGF0YSggZWxlbWVudHNbIGkgXSwgdHlwZSArIFwicXVldWVIb29rc1wiICk7XG5cdFx0XHRpZiAoIHRtcCAmJiB0bXAuZW1wdHkgKSB7XG5cdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdHRtcC5lbXB0eS5hZGQoIHJlc29sdmUgKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmVzb2x2ZSgpO1xuXHRcdHJldHVybiBkZWZlci5wcm9taXNlKCBvYmogKTtcblx0fVxufSk7XG52YXIgbm9kZUhvb2ssIGJvb2xIb29rLCBmaXhTcGVjaWZpZWQsXG5cdHJjbGFzcyA9IC9bXFx0XFxyXFxuXS9nLFxuXHRycmV0dXJuID0gL1xcci9nLFxuXHRydHlwZSA9IC9eKD86YnV0dG9ufGlucHV0KSQvaSxcblx0cmZvY3VzYWJsZSA9IC9eKD86YnV0dG9ufGlucHV0fG9iamVjdHxzZWxlY3R8dGV4dGFyZWEpJC9pLFxuXHRyY2xpY2thYmxlID0gL15hKD86cmVhfCkkL2ksXG5cdHJib29sZWFuID0gL14oPzphdXRvZm9jdXN8YXV0b3BsYXl8YXN5bmN8Y2hlY2tlZHxjb250cm9sc3xkZWZlcnxkaXNhYmxlZHxoaWRkZW58bG9vcHxtdWx0aXBsZXxvcGVufHJlYWRvbmx5fHJlcXVpcmVkfHNjb3BlZHxzZWxlY3RlZCkkL2ksXG5cdGdldFNldEF0dHJpYnV0ZSA9IGpRdWVyeS5zdXBwb3J0LmdldFNldEF0dHJpYnV0ZTtcblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGF0dHI6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmFjY2VzcyggdGhpcywgalF1ZXJ5LmF0dHIsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZUF0dHI6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkucmVtb3ZlQXR0ciggdGhpcywgbmFtZSApO1xuXHRcdH0pO1xuXHR9LFxuXG5cdHByb3A6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmFjY2VzcyggdGhpcywgalF1ZXJ5LnByb3AsIG5hbWUsIHZhbHVlLCBhcmd1bWVudHMubGVuZ3RoID4gMSApO1xuXHR9LFxuXG5cdHJlbW92ZVByb3A6IGZ1bmN0aW9uKCBuYW1lICkge1xuXHRcdG5hbWUgPSBqUXVlcnkucHJvcEZpeFsgbmFtZSBdIHx8IG5hbWU7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdC8vIHRyeS9jYXRjaCBoYW5kbGVzIGNhc2VzIHdoZXJlIElFIGJhbGtzIChzdWNoIGFzIHJlbW92aW5nIGEgcHJvcGVydHkgb24gd2luZG93KVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpc1sgbmFtZSBdID0gdW5kZWZpbmVkO1xuXHRcdFx0XHRkZWxldGUgdGhpc1sgbmFtZSBdO1xuXHRcdFx0fSBjYXRjaCggZSApIHt9XG5cdFx0fSk7XG5cdH0sXG5cblx0YWRkQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHR2YXIgY2xhc3NOYW1lcywgaSwgbCwgZWxlbSxcblx0XHRcdHNldENsYXNzLCBjLCBjbDtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBqICkge1xuXHRcdFx0XHRqUXVlcnkoIHRoaXMgKS5hZGRDbGFzcyggdmFsdWUuY2FsbCh0aGlzLCBqLCB0aGlzLmNsYXNzTmFtZSkgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0Y2xhc3NOYW1lcyA9IHZhbHVlLnNwbGl0KCBjb3JlX3JzcGFjZSApO1xuXG5cdFx0XHRmb3IgKCBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRlbGVtID0gdGhpc1sgaSBdO1xuXG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRpZiAoICFlbGVtLmNsYXNzTmFtZSAmJiBjbGFzc05hbWVzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdFx0XHRcdGVsZW0uY2xhc3NOYW1lID0gdmFsdWU7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2V0Q2xhc3MgPSBcIiBcIiArIGVsZW0uY2xhc3NOYW1lICsgXCIgXCI7XG5cblx0XHRcdFx0XHRcdGZvciAoIGMgPSAwLCBjbCA9IGNsYXNzTmFtZXMubGVuZ3RoOyBjIDwgY2w7IGMrKyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCAhfnNldENsYXNzLmluZGV4T2YoIFwiIFwiICsgY2xhc3NOYW1lc1sgYyBdICsgXCIgXCIgKSApIHtcblx0XHRcdFx0XHRcdFx0XHRzZXRDbGFzcyArPSBjbGFzc05hbWVzWyBjIF0gKyBcIiBcIjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxlbS5jbGFzc05hbWUgPSBqUXVlcnkudHJpbSggc2V0Q2xhc3MgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRyZW1vdmVDbGFzczogZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdHZhciByZW1vdmVzLCBjbGFzc05hbWUsIGVsZW0sIGMsIGNsLCBpLCBsO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGogKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnJlbW92ZUNsYXNzKCB2YWx1ZS5jYWxsKHRoaXMsIGosIHRoaXMuY2xhc3NOYW1lKSApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmICggKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJlbW92ZXMgPSAoIHZhbHVlIHx8IFwiXCIgKS5zcGxpdCggY29yZV9yc3BhY2UgKTtcblxuXHRcdFx0Zm9yICggaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0ZWxlbSA9IHRoaXNbIGkgXTtcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICYmIGVsZW0uY2xhc3NOYW1lICkge1xuXG5cdFx0XHRcdFx0Y2xhc3NOYW1lID0gKFwiIFwiICsgZWxlbS5jbGFzc05hbWUgKyBcIiBcIikucmVwbGFjZSggcmNsYXNzLCBcIiBcIiApO1xuXG5cdFx0XHRcdFx0Ly8gbG9vcCBvdmVyIGVhY2ggaXRlbSBpbiB0aGUgcmVtb3ZhbCBsaXN0XG5cdFx0XHRcdFx0Zm9yICggYyA9IDAsIGNsID0gcmVtb3Zlcy5sZW5ndGg7IGMgPCBjbDsgYysrICkge1xuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIHVudGlsIHRoZXJlIGlzIG5vdGhpbmcgdG8gcmVtb3ZlLFxuXHRcdFx0XHRcdFx0d2hpbGUgKCBjbGFzc05hbWUuaW5kZXhPZihcIiBcIiArIHJlbW92ZXNbIGMgXSArIFwiIFwiKSA+IC0xICkge1xuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWUgPSBjbGFzc05hbWUucmVwbGFjZSggXCIgXCIgKyByZW1vdmVzWyBjIF0gKyBcIiBcIiAsIFwiIFwiICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsZW0uY2xhc3NOYW1lID0gdmFsdWUgPyBqUXVlcnkudHJpbSggY2xhc3NOYW1lICkgOiBcIlwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0dG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uKCB2YWx1ZSwgc3RhdGVWYWwgKSB7XG5cdFx0dmFyIHR5cGUgPSB0eXBlb2YgdmFsdWUsXG5cdFx0XHRpc0Jvb2wgPSB0eXBlb2Ygc3RhdGVWYWwgPT09IFwiYm9vbGVhblwiO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oIGkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnRvZ2dsZUNsYXNzKCB2YWx1ZS5jYWxsKHRoaXMsIGksIHRoaXMuY2xhc3NOYW1lLCBzdGF0ZVZhbCksIHN0YXRlVmFsICk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCB0eXBlID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHQvLyB0b2dnbGUgaW5kaXZpZHVhbCBjbGFzcyBuYW1lc1xuXHRcdFx0XHR2YXIgY2xhc3NOYW1lLFxuXHRcdFx0XHRcdGkgPSAwLFxuXHRcdFx0XHRcdHNlbGYgPSBqUXVlcnkoIHRoaXMgKSxcblx0XHRcdFx0XHRzdGF0ZSA9IHN0YXRlVmFsLFxuXHRcdFx0XHRcdGNsYXNzTmFtZXMgPSB2YWx1ZS5zcGxpdCggY29yZV9yc3BhY2UgKTtcblxuXHRcdFx0XHR3aGlsZSAoIChjbGFzc05hbWUgPSBjbGFzc05hbWVzWyBpKysgXSkgKSB7XG5cdFx0XHRcdFx0Ly8gY2hlY2sgZWFjaCBjbGFzc05hbWUgZ2l2ZW4sIHNwYWNlIHNlcGFyYXRlZCBsaXN0XG5cdFx0XHRcdFx0c3RhdGUgPSBpc0Jvb2wgPyBzdGF0ZSA6ICFzZWxmLmhhc0NsYXNzKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0XHRzZWxmWyBzdGF0ZSA/IFwiYWRkQ2xhc3NcIiA6IFwicmVtb3ZlQ2xhc3NcIiBdKCBjbGFzc05hbWUgKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGUgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdFx0XHRpZiAoIHRoaXMuY2xhc3NOYW1lICkge1xuXHRcdFx0XHRcdC8vIHN0b3JlIGNsYXNzTmFtZSBpZiBzZXRcblx0XHRcdFx0XHRqUXVlcnkuX2RhdGEoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiLCB0aGlzLmNsYXNzTmFtZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gdG9nZ2xlIHdob2xlIGNsYXNzTmFtZVxuXHRcdFx0XHR0aGlzLmNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lIHx8IHZhbHVlID09PSBmYWxzZSA/IFwiXCIgOiBqUXVlcnkuX2RhdGEoIHRoaXMsIFwiX19jbGFzc05hbWVfX1wiICkgfHwgXCJcIjtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRoYXNDbGFzczogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBjbGFzc05hbWUgPSBcIiBcIiArIHNlbGVjdG9yICsgXCIgXCIsXG5cdFx0XHRpID0gMCxcblx0XHRcdGwgPSB0aGlzLmxlbmd0aDtcblx0XHRmb3IgKCA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRpZiAoIHRoaXNbaV0ubm9kZVR5cGUgPT09IDEgJiYgKFwiIFwiICsgdGhpc1tpXS5jbGFzc05hbWUgKyBcIiBcIikucmVwbGFjZShyY2xhc3MsIFwiIFwiKS5pbmRleE9mKCBjbGFzc05hbWUgKSA+IC0xICkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0dmFsOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0dmFyIGhvb2tzLCByZXQsIGlzRnVuY3Rpb24sXG5cdFx0XHRlbGVtID0gdGhpc1swXTtcblxuXHRcdGlmICggIWFyZ3VtZW50cy5sZW5ndGggKSB7XG5cdFx0XHRpZiAoIGVsZW0gKSB7XG5cdFx0XHRcdGhvb2tzID0galF1ZXJ5LnZhbEhvb2tzWyBlbGVtLnR5cGUgXSB8fCBqUXVlcnkudmFsSG9va3NbIGVsZW0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKSBdO1xuXG5cdFx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBcInZhbHVlXCIgKSkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHRyZXR1cm4gcmV0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0ID0gZWxlbS52YWx1ZTtcblxuXHRcdFx0XHRyZXR1cm4gdHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdFx0Ly8gaGFuZGxlIG1vc3QgY29tbW9uIHN0cmluZyBjYXNlc1xuXHRcdFx0XHRcdHJldC5yZXBsYWNlKHJyZXR1cm4sIFwiXCIpIDpcblx0XHRcdFx0XHQvLyBoYW5kbGUgY2FzZXMgd2hlcmUgdmFsdWUgaXMgbnVsbC91bmRlZiBvciBudW1iZXJcblx0XHRcdFx0XHRyZXQgPT0gbnVsbCA/IFwiXCIgOiByZXQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIHZhbHVlICk7XG5cblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0dmFyIHZhbCxcblx0XHRcdFx0c2VsZiA9IGpRdWVyeSh0aGlzKTtcblxuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlICE9PSAxICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICggaXNGdW5jdGlvbiApIHtcblx0XHRcdFx0dmFsID0gdmFsdWUuY2FsbCggdGhpcywgaSwgc2VsZi52YWwoKSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dmFsID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRyZWF0IG51bGwvdW5kZWZpbmVkIGFzIFwiXCI7IGNvbnZlcnQgbnVtYmVycyB0byBzdHJpbmdcblx0XHRcdGlmICggdmFsID09IG51bGwgKSB7XG5cdFx0XHRcdHZhbCA9IFwiXCI7XG5cdFx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHR2YWwgKz0gXCJcIjtcblx0XHRcdH0gZWxzZSBpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWwgKSApIHtcblx0XHRcdFx0dmFsID0galF1ZXJ5Lm1hcCh2YWwsIGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKyBcIlwiO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aG9va3MgPSBqUXVlcnkudmFsSG9va3NbIHRoaXMudHlwZSBdIHx8IGpRdWVyeS52YWxIb29rc1sgdGhpcy5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpIF07XG5cblx0XHRcdC8vIElmIHNldCByZXR1cm5zIHVuZGVmaW5lZCwgZmFsbCBiYWNrIHRvIG5vcm1hbCBzZXR0aW5nXG5cdFx0XHRpZiAoICFob29rcyB8fCAhKFwic2V0XCIgaW4gaG9va3MpIHx8IGhvb2tzLnNldCggdGhpcywgdmFsLCBcInZhbHVlXCIgKSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTtcblxualF1ZXJ5LmV4dGVuZCh7XG5cdHZhbEhvb2tzOiB7XG5cdFx0b3B0aW9uOiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHQvLyBhdHRyaWJ1dGVzLnZhbHVlIGlzIHVuZGVmaW5lZCBpbiBCbGFja2JlcnJ5IDQuNyBidXRcblx0XHRcdFx0Ly8gdXNlcyAudmFsdWUuIFNlZSAjNjkzMlxuXHRcdFx0XHR2YXIgdmFsID0gZWxlbS5hdHRyaWJ1dGVzLnZhbHVlO1xuXHRcdFx0XHRyZXR1cm4gIXZhbCB8fCB2YWwuc3BlY2lmaWVkID8gZWxlbS52YWx1ZSA6IGVsZW0udGV4dDtcblx0XHRcdH1cblx0XHR9LFxuXHRcdHNlbGVjdDoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0dmFyIHZhbHVlLCBpLCBtYXgsIG9wdGlvbixcblx0XHRcdFx0XHRpbmRleCA9IGVsZW0uc2VsZWN0ZWRJbmRleCxcblx0XHRcdFx0XHR2YWx1ZXMgPSBbXSxcblx0XHRcdFx0XHRvcHRpb25zID0gZWxlbS5vcHRpb25zLFxuXHRcdFx0XHRcdG9uZSA9IGVsZW0udHlwZSA9PT0gXCJzZWxlY3Qtb25lXCI7XG5cblx0XHRcdFx0Ly8gTm90aGluZyB3YXMgc2VsZWN0ZWRcblx0XHRcdFx0aWYgKCBpbmRleCA8IDAgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBzZWxlY3RlZCBvcHRpb25zXG5cdFx0XHRcdGkgPSBvbmUgPyBpbmRleCA6IDA7XG5cdFx0XHRcdG1heCA9IG9uZSA/IGluZGV4ICsgMSA6IG9wdGlvbnMubGVuZ3RoO1xuXHRcdFx0XHRmb3IgKCA7IGkgPCBtYXg7IGkrKyApIHtcblx0XHRcdFx0XHRvcHRpb24gPSBvcHRpb25zWyBpIF07XG5cblx0XHRcdFx0XHQvLyBEb24ndCByZXR1cm4gb3B0aW9ucyB0aGF0IGFyZSBkaXNhYmxlZCBvciBpbiBhIGRpc2FibGVkIG9wdGdyb3VwXG5cdFx0XHRcdFx0aWYgKCBvcHRpb24uc2VsZWN0ZWQgJiYgKGpRdWVyeS5zdXBwb3J0Lm9wdERpc2FibGVkID8gIW9wdGlvbi5kaXNhYmxlZCA6IG9wdGlvbi5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSA9PT0gbnVsbCkgJiZcblx0XHRcdFx0XHRcdFx0KCFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZCB8fCAhalF1ZXJ5Lm5vZGVOYW1lKCBvcHRpb24ucGFyZW50Tm9kZSwgXCJvcHRncm91cFwiICkpICkge1xuXG5cdFx0XHRcdFx0XHQvLyBHZXQgdGhlIHNwZWNpZmljIHZhbHVlIGZvciB0aGUgb3B0aW9uXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGpRdWVyeSggb3B0aW9uICkudmFsKCk7XG5cblx0XHRcdFx0XHRcdC8vIFdlIGRvbid0IG5lZWQgYW4gYXJyYXkgZm9yIG9uZSBzZWxlY3RzXG5cdFx0XHRcdFx0XHRpZiAoIG9uZSApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBNdWx0aS1TZWxlY3RzIHJldHVybiBhbiBhcnJheVxuXHRcdFx0XHRcdFx0dmFsdWVzLnB1c2goIHZhbHVlICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRml4ZXMgQnVnICMyNTUxIC0tIHNlbGVjdC52YWwoKSBicm9rZW4gaW4gSUUgYWZ0ZXIgZm9ybS5yZXNldCgpXG5cdFx0XHRcdGlmICggb25lICYmICF2YWx1ZXMubGVuZ3RoICYmIG9wdGlvbnMubGVuZ3RoICkge1xuXHRcdFx0XHRcdHJldHVybiBqUXVlcnkoIG9wdGlvbnNbIGluZGV4IF0gKS52YWwoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZXM7XG5cdFx0XHR9LFxuXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdFx0dmFyIHZhbHVlcyA9IGpRdWVyeS5tYWtlQXJyYXkoIHZhbHVlICk7XG5cblx0XHRcdFx0alF1ZXJ5KGVsZW0pLmZpbmQoXCJvcHRpb25cIikuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkID0galF1ZXJ5LmluQXJyYXkoIGpRdWVyeSh0aGlzKS52YWwoKSwgdmFsdWVzICkgPj0gMDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKCAhdmFsdWVzLmxlbmd0aCApIHtcblx0XHRcdFx0XHRlbGVtLnNlbGVjdGVkSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvLyBVbnVzZWQgaW4gMS44LCBsZWZ0IGluIHNvIGF0dHJGbi1zdGFiYmVycyB3b24ndCBkaWU7IHJlbW92ZSBpbiAxLjlcblx0YXR0ckZuOiB7fSxcblxuXHRhdHRyOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUsIHBhc3MgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsIG5vdHhtbCxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIGRvbid0IGdldC9zZXQgYXR0cmlidXRlcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoICFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggcGFzcyAmJiBqUXVlcnkuaXNGdW5jdGlvbiggalF1ZXJ5LmZuWyBuYW1lIF0gKSApIHtcblx0XHRcdHJldHVybiBqUXVlcnkoIGVsZW0gKVsgbmFtZSBdKCB2YWx1ZSApO1xuXHRcdH1cblxuXHRcdC8vIEZhbGxiYWNrIHRvIHByb3Agd2hlbiBhdHRyaWJ1dGVzIGFyZSBub3Qgc3VwcG9ydGVkXG5cdFx0aWYgKCB0eXBlb2YgZWxlbS5nZXRBdHRyaWJ1dGUgPT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5LnByb3AoIGVsZW0sIG5hbWUsIHZhbHVlICk7XG5cdFx0fVxuXG5cdFx0bm90eG1sID0gblR5cGUgIT09IDEgfHwgIWpRdWVyeS5pc1hNTERvYyggZWxlbSApO1xuXG5cdFx0Ly8gQWxsIGF0dHJpYnV0ZXMgYXJlIGxvd2VyY2FzZVxuXHRcdC8vIEdyYWIgbmVjZXNzYXJ5IGhvb2sgaWYgb25lIGlzIGRlZmluZWRcblx0XHRpZiAoIG5vdHhtbCApIHtcblx0XHRcdG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRob29rcyA9IGpRdWVyeS5hdHRySG9va3NbIG5hbWUgXSB8fCAoIHJib29sZWFuLnRlc3QoIG5hbWUgKSA/IGJvb2xIb29rIDogbm9kZUhvb2sgKTtcblx0XHR9XG5cblx0XHRpZiAoIHZhbHVlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGlmICggdmFsdWUgPT09IG51bGwgKSB7XG5cdFx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0XHRcdHJldHVybjtcblxuXHRcdFx0fSBlbHNlIGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJiBub3R4bWwgJiYgKHJldCA9IGhvb2tzLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKSkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIFwiXCIgKyB2YWx1ZSApO1xuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2UgaWYgKCBob29rcyAmJiBcImdldFwiIGluIGhvb2tzICYmIG5vdHhtbCAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkpICE9PSBudWxsICkge1xuXHRcdFx0cmV0dXJuIHJldDtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHJldCA9IGVsZW0uZ2V0QXR0cmlidXRlKCBuYW1lICk7XG5cblx0XHRcdC8vIE5vbi1leGlzdGVudCBhdHRyaWJ1dGVzIHJldHVybiBudWxsLCB3ZSBub3JtYWxpemUgdG8gdW5kZWZpbmVkXG5cdFx0XHRyZXR1cm4gcmV0ID09PSBudWxsID9cblx0XHRcdFx0dW5kZWZpbmVkIDpcblx0XHRcdFx0cmV0O1xuXHRcdH1cblx0fSxcblxuXHRyZW1vdmVBdHRyOiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0dmFyIHByb3BOYW1lLCBhdHRyTmFtZXMsIG5hbWUsIGlzQm9vbCxcblx0XHRcdGkgPSAwO1xuXG5cdFx0aWYgKCB2YWx1ZSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXG5cdFx0XHRhdHRyTmFtZXMgPSB2YWx1ZS5zcGxpdCggY29yZV9yc3BhY2UgKTtcblxuXHRcdFx0Zm9yICggOyBpIDwgYXR0ck5hbWVzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRuYW1lID0gYXR0ck5hbWVzWyBpIF07XG5cblx0XHRcdFx0aWYgKCBuYW1lICkge1xuXHRcdFx0XHRcdHByb3BOYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuXHRcdFx0XHRcdGlzQm9vbCA9IHJib29sZWFuLnRlc3QoIG5hbWUgKTtcblxuXHRcdFx0XHRcdC8vIFNlZSAjOTY5OSBmb3IgZXhwbGFuYXRpb24gb2YgdGhpcyBhcHByb2FjaCAoc2V0dGluZyBmaXJzdCwgdGhlbiByZW1vdmFsKVxuXHRcdFx0XHRcdC8vIERvIG5vdCBkbyB0aGlzIGZvciBib29sZWFuIGF0dHJpYnV0ZXMgKHNlZSAjMTA4NzApXG5cdFx0XHRcdFx0aWYgKCAhaXNCb29sICkge1xuXHRcdFx0XHRcdFx0alF1ZXJ5LmF0dHIoIGVsZW0sIG5hbWUsIFwiXCIgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxlbS5yZW1vdmVBdHRyaWJ1dGUoIGdldFNldEF0dHJpYnV0ZSA/IG5hbWUgOiBwcm9wTmFtZSApO1xuXG5cdFx0XHRcdFx0Ly8gU2V0IGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgdG8gZmFsc2UgZm9yIGJvb2xlYW4gYXR0cmlidXRlc1xuXHRcdFx0XHRcdGlmICggaXNCb29sICYmIHByb3BOYW1lIGluIGVsZW0gKSB7XG5cdFx0XHRcdFx0XHRlbGVtWyBwcm9wTmFtZSBdID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGF0dHJIb29rczoge1xuXHRcdHR5cGU6IHtcblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHQvLyBXZSBjYW4ndCBhbGxvdyB0aGUgdHlwZSBwcm9wZXJ0eSB0byBiZSBjaGFuZ2VkIChzaW5jZSBpdCBjYXVzZXMgcHJvYmxlbXMgaW4gSUUpXG5cdFx0XHRcdGlmICggcnR5cGUudGVzdCggZWxlbS5ub2RlTmFtZSApICYmIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXJyb3IoIFwidHlwZSBwcm9wZXJ0eSBjYW4ndCBiZSBjaGFuZ2VkXCIgKTtcblx0XHRcdFx0fSBlbHNlIGlmICggIWpRdWVyeS5zdXBwb3J0LnJhZGlvVmFsdWUgJiYgdmFsdWUgPT09IFwicmFkaW9cIiAmJiBqUXVlcnkubm9kZU5hbWUoZWxlbSwgXCJpbnB1dFwiKSApIHtcblx0XHRcdFx0XHQvLyBTZXR0aW5nIHRoZSB0eXBlIG9uIGEgcmFkaW8gYnV0dG9uIGFmdGVyIHRoZSB2YWx1ZSByZXNldHMgdGhlIHZhbHVlIGluIElFNi05XG5cdFx0XHRcdFx0Ly8gUmVzZXQgdmFsdWUgdG8gaXQncyBkZWZhdWx0IGluIGNhc2UgdHlwZSBpcyBzZXQgYWZ0ZXIgdmFsdWVcblx0XHRcdFx0XHQvLyBUaGlzIGlzIGZvciBlbGVtZW50IGNyZWF0aW9uXG5cdFx0XHRcdFx0dmFyIHZhbCA9IGVsZW0udmFsdWU7XG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIFwidHlwZVwiLCB2YWx1ZSApO1xuXHRcdFx0XHRcdGlmICggdmFsICkge1xuXHRcdFx0XHRcdFx0ZWxlbS52YWx1ZSA9IHZhbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvLyBVc2UgdGhlIHZhbHVlIHByb3BlcnR5IGZvciBiYWNrIGNvbXBhdFxuXHRcdC8vIFVzZSB0aGUgbm9kZUhvb2sgZm9yIGJ1dHRvbiBlbGVtZW50cyBpbiBJRTYvNyAoIzE5NTQpXG5cdFx0dmFsdWU6IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0XHRcdGlmICggbm9kZUhvb2sgJiYgalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImJ1dHRvblwiICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5vZGVIb29rLmdldCggZWxlbSwgbmFtZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBuYW1lIGluIGVsZW0gP1xuXHRcdFx0XHRcdGVsZW0udmFsdWUgOlxuXHRcdFx0XHRcdG51bGw7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG5cdFx0XHRcdGlmICggbm9kZUhvb2sgJiYgalF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImJ1dHRvblwiICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG5vZGVIb29rLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBEb2VzIG5vdCByZXR1cm4gc28gdGhhdCBzZXRBdHRyaWJ1dGUgaXMgYWxzbyB1c2VkXG5cdFx0XHRcdGVsZW0udmFsdWUgPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0cHJvcEZpeDoge1xuXHRcdHRhYmluZGV4OiBcInRhYkluZGV4XCIsXG5cdFx0cmVhZG9ubHk6IFwicmVhZE9ubHlcIixcblx0XHRcImZvclwiOiBcImh0bWxGb3JcIixcblx0XHRcImNsYXNzXCI6IFwiY2xhc3NOYW1lXCIsXG5cdFx0bWF4bGVuZ3RoOiBcIm1heExlbmd0aFwiLFxuXHRcdGNlbGxzcGFjaW5nOiBcImNlbGxTcGFjaW5nXCIsXG5cdFx0Y2VsbHBhZGRpbmc6IFwiY2VsbFBhZGRpbmdcIixcblx0XHRyb3dzcGFuOiBcInJvd1NwYW5cIixcblx0XHRjb2xzcGFuOiBcImNvbFNwYW5cIixcblx0XHR1c2VtYXA6IFwidXNlTWFwXCIsXG5cdFx0ZnJhbWVib3JkZXI6IFwiZnJhbWVCb3JkZXJcIixcblx0XHRjb250ZW50ZWRpdGFibGU6IFwiY29udGVudEVkaXRhYmxlXCJcblx0fSxcblxuXHRwcm9wOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0dmFyIHJldCwgaG9va3MsIG5vdHhtbCxcblx0XHRcdG5UeXBlID0gZWxlbS5ub2RlVHlwZTtcblxuXHRcdC8vIGRvbid0IGdldC9zZXQgcHJvcGVydGllcyBvbiB0ZXh0LCBjb21tZW50IGFuZCBhdHRyaWJ1dGUgbm9kZXNcblx0XHRpZiAoICFlbGVtIHx8IG5UeXBlID09PSAzIHx8IG5UeXBlID09PSA4IHx8IG5UeXBlID09PSAyICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdG5vdHhtbCA9IG5UeXBlICE9PSAxIHx8ICFqUXVlcnkuaXNYTUxEb2MoIGVsZW0gKTtcblxuXHRcdGlmICggbm90eG1sICkge1xuXHRcdFx0Ly8gRml4IG5hbWUgYW5kIGF0dGFjaCBob29rc1xuXHRcdFx0bmFtZSA9IGpRdWVyeS5wcm9wRml4WyBuYW1lIF0gfHwgbmFtZTtcblx0XHRcdGhvb2tzID0galF1ZXJ5LnByb3BIb29rc1sgbmFtZSBdO1xuXHRcdH1cblxuXHRcdGlmICggdmFsdWUgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGlmICggaG9va3MgJiYgXCJzZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3Muc2V0KCBlbGVtLCB2YWx1ZSwgbmFtZSApKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gKCBlbGVtWyBuYW1lIF0gPSB2YWx1ZSApO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBuYW1lICkpICE9PSBudWxsICkge1xuXHRcdFx0XHRyZXR1cm4gcmV0O1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZWxlbVsgbmFtZSBdO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRwcm9wSG9va3M6IHtcblx0XHR0YWJJbmRleDoge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRcdFx0Ly8gZWxlbS50YWJJbmRleCBkb2Vzbid0IGFsd2F5cyByZXR1cm4gdGhlIGNvcnJlY3QgdmFsdWUgd2hlbiBpdCBoYXNuJ3QgYmVlbiBleHBsaWNpdGx5IHNldFxuXHRcdFx0XHQvLyBodHRwOi8vZmx1aWRwcm9qZWN0Lm9yZy9ibG9nLzIwMDgvMDEvMDkvZ2V0dGluZy1zZXR0aW5nLWFuZC1yZW1vdmluZy10YWJpbmRleC12YWx1ZXMtd2l0aC1qYXZhc2NyaXB0L1xuXHRcdFx0XHR2YXIgYXR0cmlidXRlTm9kZSA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZShcInRhYmluZGV4XCIpO1xuXG5cdFx0XHRcdHJldHVybiBhdHRyaWJ1dGVOb2RlICYmIGF0dHJpYnV0ZU5vZGUuc3BlY2lmaWVkID9cblx0XHRcdFx0XHRwYXJzZUludCggYXR0cmlidXRlTm9kZS52YWx1ZSwgMTAgKSA6XG5cdFx0XHRcdFx0cmZvY3VzYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgfHwgcmNsaWNrYWJsZS50ZXN0KCBlbGVtLm5vZGVOYW1lICkgJiYgZWxlbS5ocmVmID9cblx0XHRcdFx0XHRcdDAgOlxuXHRcdFx0XHRcdFx0dW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSk7XG5cbi8vIEhvb2sgZm9yIGJvb2xlYW4gYXR0cmlidXRlc1xuYm9vbEhvb2sgPSB7XG5cdGdldDogZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0Ly8gQWxpZ24gYm9vbGVhbiBhdHRyaWJ1dGVzIHdpdGggY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzXG5cdFx0Ly8gRmFsbCBiYWNrIHRvIGF0dHJpYnV0ZSBwcmVzZW5jZSB3aGVyZSBzb21lIGJvb2xlYW5zIGFyZSBub3Qgc3VwcG9ydGVkXG5cdFx0dmFyIGF0dHJOb2RlLFxuXHRcdFx0cHJvcGVydHkgPSBqUXVlcnkucHJvcCggZWxlbSwgbmFtZSApO1xuXHRcdHJldHVybiBwcm9wZXJ0eSA9PT0gdHJ1ZSB8fCB0eXBlb2YgcHJvcGVydHkgIT09IFwiYm9vbGVhblwiICYmICggYXR0ck5vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUobmFtZSkgKSAmJiBhdHRyTm9kZS5ub2RlVmFsdWUgIT09IGZhbHNlID9cblx0XHRcdG5hbWUudG9Mb3dlckNhc2UoKSA6XG5cdFx0XHR1bmRlZmluZWQ7XG5cdH0sXG5cdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuXHRcdHZhciBwcm9wTmFtZTtcblx0XHRpZiAoIHZhbHVlID09PSBmYWxzZSApIHtcblx0XHRcdC8vIFJlbW92ZSBib29sZWFuIGF0dHJpYnV0ZXMgd2hlbiBzZXQgdG8gZmFsc2Vcblx0XHRcdGpRdWVyeS5yZW1vdmVBdHRyKCBlbGVtLCBuYW1lICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHZhbHVlIGlzIHRydWUgc2luY2Ugd2Uga25vdyBhdCB0aGlzIHBvaW50IGl0J3MgdHlwZSBib29sZWFuIGFuZCBub3QgZmFsc2Vcblx0XHRcdC8vIFNldCBib29sZWFuIGF0dHJpYnV0ZXMgdG8gdGhlIHNhbWUgbmFtZSBhbmQgc2V0IHRoZSBET00gcHJvcGVydHlcblx0XHRcdHByb3BOYW1lID0galF1ZXJ5LnByb3BGaXhbIG5hbWUgXSB8fCBuYW1lO1xuXHRcdFx0aWYgKCBwcm9wTmFtZSBpbiBlbGVtICkge1xuXHRcdFx0XHQvLyBPbmx5IHNldCB0aGUgSURMIHNwZWNpZmljYWxseSBpZiBpdCBhbHJlYWR5IGV4aXN0cyBvbiB0aGUgZWxlbWVudFxuXHRcdFx0XHRlbGVtWyBwcm9wTmFtZSBdID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoIG5hbWUsIG5hbWUudG9Mb3dlckNhc2UoKSApO1xuXHRcdH1cblx0XHRyZXR1cm4gbmFtZTtcblx0fVxufTtcblxuLy8gSUU2LzcgZG8gbm90IHN1cHBvcnQgZ2V0dGluZy9zZXR0aW5nIHNvbWUgYXR0cmlidXRlcyB3aXRoIGdldC9zZXRBdHRyaWJ1dGVcbmlmICggIWdldFNldEF0dHJpYnV0ZSApIHtcblxuXHRmaXhTcGVjaWZpZWQgPSB7XG5cdFx0bmFtZTogdHJ1ZSxcblx0XHRpZDogdHJ1ZSxcblx0XHRjb29yZHM6IHRydWVcblx0fTtcblxuXHQvLyBVc2UgdGhpcyBmb3IgYW55IGF0dHJpYnV0ZSBpbiBJRTYvN1xuXHQvLyBUaGlzIGZpeGVzIGFsbW9zdCBldmVyeSBJRTYvNyBpc3N1ZVxuXHRub2RlSG9vayA9IGpRdWVyeS52YWxIb29rcy5idXR0b24gPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgbmFtZSApIHtcblx0XHRcdHZhciByZXQ7XG5cdFx0XHRyZXQgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKTtcblx0XHRcdHJldHVybiByZXQgJiYgKCBmaXhTcGVjaWZpZWRbIG5hbWUgXSA/IHJldC52YWx1ZSAhPT0gXCJcIiA6IHJldC5zcGVjaWZpZWQgKSA/XG5cdFx0XHRcdHJldC52YWx1ZSA6XG5cdFx0XHRcdHVuZGVmaW5lZDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBuYW1lICkge1xuXHRcdFx0Ly8gU2V0IHRoZSBleGlzdGluZyBvciBjcmVhdGUgYSBuZXcgYXR0cmlidXRlIG5vZGVcblx0XHRcdHZhciByZXQgPSBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoIG5hbWUgKTtcblx0XHRcdGlmICggIXJldCApIHtcblx0XHRcdFx0cmV0ID0gZG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlKCBuYW1lICk7XG5cdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlTm9kZSggcmV0ICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gKCByZXQudmFsdWUgPSB2YWx1ZSArIFwiXCIgKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gU2V0IHdpZHRoIGFuZCBoZWlnaHQgdG8gYXV0byBpbnN0ZWFkIG9mIDAgb24gZW1wdHkgc3RyaW5nKCBCdWcgIzgxNTAgKVxuXHQvLyBUaGlzIGlzIGZvciByZW1vdmFsc1xuXHRqUXVlcnkuZWFjaChbIFwid2lkdGhcIiwgXCJoZWlnaHRcIiBdLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0XHRqUXVlcnkuYXR0ckhvb2tzWyBuYW1lIF0gPSBqUXVlcnkuZXh0ZW5kKCBqUXVlcnkuYXR0ckhvb2tzWyBuYW1lIF0sIHtcblx0XHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0XHRpZiAoIHZhbHVlID09PSBcIlwiICkge1xuXHRcdFx0XHRcdGVsZW0uc2V0QXR0cmlidXRlKCBuYW1lLCBcImF1dG9cIiApO1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyBTZXQgY29udGVudGVkaXRhYmxlIHRvIGZhbHNlIG9uIHJlbW92YWxzKCMxMDQyOSlcblx0Ly8gU2V0dGluZyB0byBlbXB0eSBzdHJpbmcgdGhyb3dzIGFuIGVycm9yIGFzIGFuIGludmFsaWQgdmFsdWVcblx0alF1ZXJ5LmF0dHJIb29rcy5jb250ZW50ZWRpdGFibGUgPSB7XG5cdFx0Z2V0OiBub2RlSG9vay5nZXQsXG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUsIG5hbWUgKSB7XG5cdFx0XHRpZiAoIHZhbHVlID09PSBcIlwiICkge1xuXHRcdFx0XHR2YWx1ZSA9IFwiZmFsc2VcIjtcblx0XHRcdH1cblx0XHRcdG5vZGVIb29rLnNldCggZWxlbSwgdmFsdWUsIG5hbWUgKTtcblx0XHR9XG5cdH07XG59XG5cblxuLy8gU29tZSBhdHRyaWJ1dGVzIHJlcXVpcmUgYSBzcGVjaWFsIGNhbGwgb24gSUVcbmlmICggIWpRdWVyeS5zdXBwb3J0LmhyZWZOb3JtYWxpemVkICkge1xuXHRqUXVlcnkuZWFjaChbIFwiaHJlZlwiLCBcInNyY1wiLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdFx0alF1ZXJ5LmF0dHJIb29rc1sgbmFtZSBdID0galF1ZXJ5LmV4dGVuZCggalF1ZXJ5LmF0dHJIb29rc1sgbmFtZSBdLCB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHR2YXIgcmV0ID0gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUsIDIgKTtcblx0XHRcdFx0cmV0dXJuIHJldCA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IHJldDtcblx0XHRcdH1cblx0XHR9KTtcblx0fSk7XG59XG5cbmlmICggIWpRdWVyeS5zdXBwb3J0LnN0eWxlICkge1xuXHRqUXVlcnkuYXR0ckhvb2tzLnN0eWxlID0ge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHQvLyBSZXR1cm4gdW5kZWZpbmVkIGluIHRoZSBjYXNlIG9mIGVtcHR5IHN0cmluZ1xuXHRcdFx0Ly8gTm9ybWFsaXplIHRvIGxvd2VyY2FzZSBzaW5jZSBJRSB1cHBlcmNhc2VzIGNzcyBwcm9wZXJ0eSBuYW1lc1xuXHRcdFx0cmV0dXJuIGVsZW0uc3R5bGUuY3NzVGV4dC50b0xvd2VyQ2FzZSgpIHx8IHVuZGVmaW5lZDtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlICkge1xuXHRcdFx0cmV0dXJuICggZWxlbS5zdHlsZS5jc3NUZXh0ID0gXCJcIiArIHZhbHVlICk7XG5cdFx0fVxuXHR9O1xufVxuXG4vLyBTYWZhcmkgbWlzLXJlcG9ydHMgdGhlIGRlZmF1bHQgc2VsZWN0ZWQgcHJvcGVydHkgb2YgYW4gb3B0aW9uXG4vLyBBY2Nlc3NpbmcgdGhlIHBhcmVudCdzIHNlbGVjdGVkSW5kZXggcHJvcGVydHkgZml4ZXMgaXRcbmlmICggIWpRdWVyeS5zdXBwb3J0Lm9wdFNlbGVjdGVkICkge1xuXHRqUXVlcnkucHJvcEhvb2tzLnNlbGVjdGVkID0galF1ZXJ5LmV4dGVuZCggalF1ZXJ5LnByb3BIb29rcy5zZWxlY3RlZCwge1xuXHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXG5cdFx0XHRpZiAoIHBhcmVudCApIHtcblx0XHRcdFx0cGFyZW50LnNlbGVjdGVkSW5kZXg7XG5cblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgaXQgYWxzbyB3b3JrcyB3aXRoIG9wdGdyb3Vwcywgc2VlICM1NzAxXG5cdFx0XHRcdGlmICggcGFyZW50LnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdFx0cGFyZW50LnBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9KTtcbn1cblxuLy8gSUU2LzcgY2FsbCBlbmN0eXBlIGVuY29kaW5nXG5pZiAoICFqUXVlcnkuc3VwcG9ydC5lbmN0eXBlICkge1xuXHRqUXVlcnkucHJvcEZpeC5lbmN0eXBlID0gXCJlbmNvZGluZ1wiO1xufVxuXG4vLyBSYWRpb3MgYW5kIGNoZWNrYm94ZXMgZ2V0dGVyL3NldHRlclxuaWYgKCAhalF1ZXJ5LnN1cHBvcnQuY2hlY2tPbiApIHtcblx0alF1ZXJ5LmVhY2goWyBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiBdLCBmdW5jdGlvbigpIHtcblx0XHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IHtcblx0XHRcdGdldDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSBpbiBXZWJraXQgXCJcIiBpcyByZXR1cm5lZCBpbnN0ZWFkIG9mIFwib25cIiBpZiBhIHZhbHVlIGlzbid0IHNwZWNpZmllZFxuXHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSA9PT0gbnVsbCA/IFwib25cIiA6IGVsZW0udmFsdWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSk7XG59XG5qUXVlcnkuZWFjaChbIFwicmFkaW9cIiwgXCJjaGVja2JveFwiIF0sIGZ1bmN0aW9uKCkge1xuXHRqUXVlcnkudmFsSG9va3NbIHRoaXMgXSA9IGpRdWVyeS5leHRlbmQoIGpRdWVyeS52YWxIb29rc1sgdGhpcyBdLCB7XG5cdFx0c2V0OiBmdW5jdGlvbiggZWxlbSwgdmFsdWUgKSB7XG5cdFx0XHRpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdFx0XHRyZXR1cm4gKCBlbGVtLmNoZWNrZWQgPSBqUXVlcnkuaW5BcnJheSggalF1ZXJ5KGVsZW0pLnZhbCgpLCB2YWx1ZSApID49IDAgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufSk7XG52YXIgcmZvcm1FbGVtcyA9IC9eKD86dGV4dGFyZWF8aW5wdXR8c2VsZWN0KSQvaSxcblx0cnR5cGVuYW1lc3BhY2UgPSAvXihbXlxcLl0qfCkoPzpcXC4oLispfCkkLyxcblx0cmhvdmVySGFjayA9IC8oPzpefFxccylob3ZlcihcXC5cXFMrfClcXGIvLFxuXHRya2V5RXZlbnQgPSAvXmtleS8sXG5cdHJtb3VzZUV2ZW50ID0gL14oPzptb3VzZXxjb250ZXh0bWVudSl8Y2xpY2svLFxuXHRyZm9jdXNNb3JwaCA9IC9eKD86Zm9jdXNpbmZvY3VzfGZvY3Vzb3V0Ymx1cikkLyxcblx0aG92ZXJIYWNrID0gZnVuY3Rpb24oIGV2ZW50cyApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmV2ZW50LnNwZWNpYWwuaG92ZXIgPyBldmVudHMgOiBldmVudHMucmVwbGFjZSggcmhvdmVySGFjaywgXCJtb3VzZWVudGVyJDEgbW91c2VsZWF2ZSQxXCIgKTtcblx0fTtcblxuLypcbiAqIEhlbHBlciBmdW5jdGlvbnMgZm9yIG1hbmFnaW5nIGV2ZW50cyAtLSBub3QgcGFydCBvZiB0aGUgcHVibGljIGludGVyZmFjZS5cbiAqIFByb3BzIHRvIERlYW4gRWR3YXJkcycgYWRkRXZlbnQgbGlicmFyeSBmb3IgbWFueSBvZiB0aGUgaWRlYXMuXG4gKi9cbmpRdWVyeS5ldmVudCA9IHtcblxuXHRhZGQ6IGZ1bmN0aW9uKCBlbGVtLCB0eXBlcywgaGFuZGxlciwgZGF0YSwgc2VsZWN0b3IgKSB7XG5cblx0XHR2YXIgZWxlbURhdGEsIGV2ZW50SGFuZGxlLCBldmVudHMsXG5cdFx0XHR0LCB0bnMsIHR5cGUsIG5hbWVzcGFjZXMsIGhhbmRsZU9iaixcblx0XHRcdGhhbmRsZU9iakluLCBoYW5kbGVycywgc3BlY2lhbDtcblxuXHRcdC8vIERvbid0IGF0dGFjaCBldmVudHMgdG8gbm9EYXRhIG9yIHRleHQvY29tbWVudCBub2RlcyAoYWxsb3cgcGxhaW4gb2JqZWN0cyB0aG8pXG5cdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAzIHx8IGVsZW0ubm9kZVR5cGUgPT09IDggfHwgIXR5cGVzIHx8ICFoYW5kbGVyIHx8ICEoZWxlbURhdGEgPSBqUXVlcnkuX2RhdGEoIGVsZW0gKSkgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gQ2FsbGVyIGNhbiBwYXNzIGluIGFuIG9iamVjdCBvZiBjdXN0b20gZGF0YSBpbiBsaWV1IG9mIHRoZSBoYW5kbGVyXG5cdFx0aWYgKCBoYW5kbGVyLmhhbmRsZXIgKSB7XG5cdFx0XHRoYW5kbGVPYmpJbiA9IGhhbmRsZXI7XG5cdFx0XHRoYW5kbGVyID0gaGFuZGxlT2JqSW4uaGFuZGxlcjtcblx0XHRcdHNlbGVjdG9yID0gaGFuZGxlT2JqSW4uc2VsZWN0b3I7XG5cdFx0fVxuXG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIGhhbmRsZXIgaGFzIGEgdW5pcXVlIElELCB1c2VkIHRvIGZpbmQvcmVtb3ZlIGl0IGxhdGVyXG5cdFx0aWYgKCAhaGFuZGxlci5ndWlkICkge1xuXHRcdFx0aGFuZGxlci5ndWlkID0galF1ZXJ5Lmd1aWQrKztcblx0XHR9XG5cblx0XHQvLyBJbml0IHRoZSBlbGVtZW50J3MgZXZlbnQgc3RydWN0dXJlIGFuZCBtYWluIGhhbmRsZXIsIGlmIHRoaXMgaXMgdGhlIGZpcnN0XG5cdFx0ZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzO1xuXHRcdGlmICggIWV2ZW50cyApIHtcblx0XHRcdGVsZW1EYXRhLmV2ZW50cyA9IGV2ZW50cyA9IHt9O1xuXHRcdH1cblx0XHRldmVudEhhbmRsZSA9IGVsZW1EYXRhLmhhbmRsZTtcblx0XHRpZiAoICFldmVudEhhbmRsZSApIHtcblx0XHRcdGVsZW1EYXRhLmhhbmRsZSA9IGV2ZW50SGFuZGxlID0gZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdC8vIERpc2NhcmQgdGhlIHNlY29uZCBldmVudCBvZiBhIGpRdWVyeS5ldmVudC50cmlnZ2VyKCkgYW5kXG5cdFx0XHRcdC8vIHdoZW4gYW4gZXZlbnQgaXMgY2FsbGVkIGFmdGVyIGEgcGFnZSBoYXMgdW5sb2FkZWRcblx0XHRcdFx0cmV0dXJuIHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIgJiYgKCFlIHx8IGpRdWVyeS5ldmVudC50cmlnZ2VyZWQgIT09IGUudHlwZSkgP1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5kaXNwYXRjaC5hcHBseSggZXZlbnRIYW5kbGUuZWxlbSwgYXJndW1lbnRzICkgOlxuXHRcdFx0XHRcdHVuZGVmaW5lZDtcblx0XHRcdH07XG5cdFx0XHQvLyBBZGQgZWxlbSBhcyBhIHByb3BlcnR5IG9mIHRoZSBoYW5kbGUgZm4gdG8gcHJldmVudCBhIG1lbW9yeSBsZWFrIHdpdGggSUUgbm9uLW5hdGl2ZSBldmVudHNcblx0XHRcdGV2ZW50SGFuZGxlLmVsZW0gPSBlbGVtO1xuXHRcdH1cblxuXHRcdC8vIEhhbmRsZSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIGJ5IGEgc3BhY2Vcblx0XHQvLyBqUXVlcnkoLi4uKS5iaW5kKFwibW91c2VvdmVyIG1vdXNlb3V0XCIsIGZuKTtcblx0XHR0eXBlcyA9IGpRdWVyeS50cmltKCBob3ZlckhhY2sodHlwZXMpICkuc3BsaXQoIFwiIFwiICk7XG5cdFx0Zm9yICggdCA9IDA7IHQgPCB0eXBlcy5sZW5ndGg7IHQrKyApIHtcblxuXHRcdFx0dG5zID0gcnR5cGVuYW1lc3BhY2UuZXhlYyggdHlwZXNbdF0gKSB8fCBbXTtcblx0XHRcdHR5cGUgPSB0bnNbMV07XG5cdFx0XHRuYW1lc3BhY2VzID0gKCB0bnNbMl0gfHwgXCJcIiApLnNwbGl0KCBcIi5cIiApLnNvcnQoKTtcblxuXHRcdFx0Ly8gSWYgZXZlbnQgY2hhbmdlcyBpdHMgdHlwZSwgdXNlIHRoZSBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgY2hhbmdlZCB0eXBlXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblxuXHRcdFx0Ly8gSWYgc2VsZWN0b3IgZGVmaW5lZCwgZGV0ZXJtaW5lIHNwZWNpYWwgZXZlbnQgYXBpIHR5cGUsIG90aGVyd2lzZSBnaXZlbiB0eXBlXG5cdFx0XHR0eXBlID0gKCBzZWxlY3RvciA/IHNwZWNpYWwuZGVsZWdhdGVUeXBlIDogc3BlY2lhbC5iaW5kVHlwZSApIHx8IHR5cGU7XG5cblx0XHRcdC8vIFVwZGF0ZSBzcGVjaWFsIGJhc2VkIG9uIG5ld2x5IHJlc2V0IHR5cGVcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXG5cdFx0XHQvLyBoYW5kbGVPYmogaXMgcGFzc2VkIHRvIGFsbCBldmVudCBoYW5kbGVyc1xuXHRcdFx0aGFuZGxlT2JqID0galF1ZXJ5LmV4dGVuZCh7XG5cdFx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRcdG9yaWdUeXBlOiB0bnNbMV0sXG5cdFx0XHRcdGRhdGE6IGRhdGEsXG5cdFx0XHRcdGhhbmRsZXI6IGhhbmRsZXIsXG5cdFx0XHRcdGd1aWQ6IGhhbmRsZXIuZ3VpZCxcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZXMuam9pbihcIi5cIilcblx0XHRcdH0sIGhhbmRsZU9iakluICk7XG5cblx0XHRcdC8vIEluaXQgdGhlIGV2ZW50IGhhbmRsZXIgcXVldWUgaWYgd2UncmUgdGhlIGZpcnN0XG5cdFx0XHRoYW5kbGVycyA9IGV2ZW50c1sgdHlwZSBdO1xuXHRcdFx0aWYgKCAhaGFuZGxlcnMgKSB7XG5cdFx0XHRcdGhhbmRsZXJzID0gZXZlbnRzWyB0eXBlIF0gPSBbXTtcblx0XHRcdFx0aGFuZGxlcnMuZGVsZWdhdGVDb3VudCA9IDA7XG5cblx0XHRcdFx0Ly8gT25seSB1c2UgYWRkRXZlbnRMaXN0ZW5lci9hdHRhY2hFdmVudCBpZiB0aGUgc3BlY2lhbCBldmVudHMgaGFuZGxlciByZXR1cm5zIGZhbHNlXG5cdFx0XHRcdGlmICggIXNwZWNpYWwuc2V0dXAgfHwgc3BlY2lhbC5zZXR1cC5jYWxsKCBlbGVtLCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHQvLyBCaW5kIHRoZSBnbG9iYWwgZXZlbnQgaGFuZGxlciB0byB0aGUgZWxlbWVudFxuXHRcdFx0XHRcdGlmICggZWxlbS5hZGRFdmVudExpc3RlbmVyICkge1xuXHRcdFx0XHRcdFx0ZWxlbS5hZGRFdmVudExpc3RlbmVyKCB0eXBlLCBldmVudEhhbmRsZSwgZmFsc2UgKTtcblxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIGVsZW0uYXR0YWNoRXZlbnQgKSB7XG5cdFx0XHRcdFx0XHRlbGVtLmF0dGFjaEV2ZW50KCBcIm9uXCIgKyB0eXBlLCBldmVudEhhbmRsZSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHNwZWNpYWwuYWRkICkge1xuXHRcdFx0XHRzcGVjaWFsLmFkZC5jYWxsKCBlbGVtLCBoYW5kbGVPYmogKTtcblxuXHRcdFx0XHRpZiAoICFoYW5kbGVPYmouaGFuZGxlci5ndWlkICkge1xuXHRcdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyLmd1aWQgPSBoYW5kbGVyLmd1aWQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHRvIHRoZSBlbGVtZW50J3MgaGFuZGxlciBsaXN0LCBkZWxlZ2F0ZXMgaW4gZnJvbnRcblx0XHRcdGlmICggc2VsZWN0b3IgKSB7XG5cdFx0XHRcdGhhbmRsZXJzLnNwbGljZSggaGFuZGxlcnMuZGVsZWdhdGVDb3VudCsrLCAwLCBoYW5kbGVPYmogKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhhbmRsZXJzLnB1c2goIGhhbmRsZU9iaiApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBLZWVwIHRyYWNrIG9mIHdoaWNoIGV2ZW50cyBoYXZlIGV2ZXIgYmVlbiB1c2VkLCBmb3IgZXZlbnQgb3B0aW1pemF0aW9uXG5cdFx0XHRqUXVlcnkuZXZlbnQuZ2xvYmFsWyB0eXBlIF0gPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIE51bGxpZnkgZWxlbSB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcyBpbiBJRVxuXHRcdGVsZW0gPSBudWxsO1xuXHR9LFxuXG5cdGdsb2JhbDoge30sXG5cblx0Ly8gRGV0YWNoIGFuIGV2ZW50IG9yIHNldCBvZiBldmVudHMgZnJvbSBhbiBlbGVtZW50XG5cdHJlbW92ZTogZnVuY3Rpb24oIGVsZW0sIHR5cGVzLCBoYW5kbGVyLCBzZWxlY3RvciwgbWFwcGVkVHlwZXMgKSB7XG5cblx0XHR2YXIgdCwgdG5zLCB0eXBlLCBvcmlnVHlwZSwgbmFtZXNwYWNlcywgb3JpZ0NvdW50LFxuXHRcdFx0aiwgZXZlbnRzLCBzcGVjaWFsLCBldmVudFR5cGUsIGhhbmRsZU9iaixcblx0XHRcdGVsZW1EYXRhID0galF1ZXJ5Lmhhc0RhdGEoIGVsZW0gKSAmJiBqUXVlcnkuX2RhdGEoIGVsZW0gKTtcblxuXHRcdGlmICggIWVsZW1EYXRhIHx8ICEoZXZlbnRzID0gZWxlbURhdGEuZXZlbnRzKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBPbmNlIGZvciBlYWNoIHR5cGUubmFtZXNwYWNlIGluIHR5cGVzOyB0eXBlIG1heSBiZSBvbWl0dGVkXG5cdFx0dHlwZXMgPSBqUXVlcnkudHJpbSggaG92ZXJIYWNrKCB0eXBlcyB8fCBcIlwiICkgKS5zcGxpdChcIiBcIik7XG5cdFx0Zm9yICggdCA9IDA7IHQgPCB0eXBlcy5sZW5ndGg7IHQrKyApIHtcblx0XHRcdHRucyA9IHJ0eXBlbmFtZXNwYWNlLmV4ZWMoIHR5cGVzW3RdICkgfHwgW107XG5cdFx0XHR0eXBlID0gb3JpZ1R5cGUgPSB0bnNbMV07XG5cdFx0XHRuYW1lc3BhY2VzID0gdG5zWzJdO1xuXG5cdFx0XHQvLyBVbmJpbmQgYWxsIGV2ZW50cyAob24gdGhpcyBuYW1lc3BhY2UsIGlmIHByb3ZpZGVkKSBmb3IgdGhlIGVsZW1lbnRcblx0XHRcdGlmICggIXR5cGUgKSB7XG5cdFx0XHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKyB0eXBlc1sgdCBdLCBoYW5kbGVyLCBzZWxlY3RvciwgdHJ1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRzcGVjaWFsID0galF1ZXJ5LmV2ZW50LnNwZWNpYWxbIHR5cGUgXSB8fCB7fTtcblx0XHRcdHR5cGUgPSAoIHNlbGVjdG9yPyBzcGVjaWFsLmRlbGVnYXRlVHlwZSA6IHNwZWNpYWwuYmluZFR5cGUgKSB8fCB0eXBlO1xuXHRcdFx0ZXZlbnRUeXBlID0gZXZlbnRzWyB0eXBlIF0gfHwgW107XG5cdFx0XHRvcmlnQ291bnQgPSBldmVudFR5cGUubGVuZ3RoO1xuXHRcdFx0bmFtZXNwYWNlcyA9IG5hbWVzcGFjZXMgPyBuZXcgUmVnRXhwKFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLnNwbGl0KFwiLlwiKS5zb3J0KCkuam9pbihcIlxcXFwuKD86LipcXFxcLnwpXCIpICsgXCIoXFxcXC58JClcIikgOiBudWxsO1xuXG5cdFx0XHQvLyBSZW1vdmUgbWF0Y2hpbmcgZXZlbnRzXG5cdFx0XHRmb3IgKCBqID0gMDsgaiA8IGV2ZW50VHlwZS5sZW5ndGg7IGorKyApIHtcblx0XHRcdFx0aGFuZGxlT2JqID0gZXZlbnRUeXBlWyBqIF07XG5cblx0XHRcdFx0aWYgKCAoIG1hcHBlZFR5cGVzIHx8IG9yaWdUeXBlID09PSBoYW5kbGVPYmoub3JpZ1R5cGUgKSAmJlxuXHRcdFx0XHRcdCAoICFoYW5kbGVyIHx8IGhhbmRsZXIuZ3VpZCA9PT0gaGFuZGxlT2JqLmd1aWQgKSAmJlxuXHRcdFx0XHRcdCAoICFuYW1lc3BhY2VzIHx8IG5hbWVzcGFjZXMudGVzdCggaGFuZGxlT2JqLm5hbWVzcGFjZSApICkgJiZcblx0XHRcdFx0XHQgKCAhc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGhhbmRsZU9iai5zZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gXCIqKlwiICYmIGhhbmRsZU9iai5zZWxlY3RvciApICkge1xuXHRcdFx0XHRcdGV2ZW50VHlwZS5zcGxpY2UoIGotLSwgMSApO1xuXG5cdFx0XHRcdFx0aWYgKCBoYW5kbGVPYmouc2VsZWN0b3IgKSB7XG5cdFx0XHRcdFx0XHRldmVudFR5cGUuZGVsZWdhdGVDb3VudC0tO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIHNwZWNpYWwucmVtb3ZlICkge1xuXHRcdFx0XHRcdFx0c3BlY2lhbC5yZW1vdmUuY2FsbCggZWxlbSwgaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBnZW5lcmljIGV2ZW50IGhhbmRsZXIgaWYgd2UgcmVtb3ZlZCBzb21ldGhpbmcgYW5kIG5vIG1vcmUgaGFuZGxlcnMgZXhpc3Rcblx0XHRcdC8vIChhdm9pZHMgcG90ZW50aWFsIGZvciBlbmRsZXNzIHJlY3Vyc2lvbiBkdXJpbmcgcmVtb3ZhbCBvZiBzcGVjaWFsIGV2ZW50IGhhbmRsZXJzKVxuXHRcdFx0aWYgKCBldmVudFR5cGUubGVuZ3RoID09PSAwICYmIG9yaWdDb3VudCAhPT0gZXZlbnRUeXBlLmxlbmd0aCApIHtcblx0XHRcdFx0aWYgKCAhc3BlY2lhbC50ZWFyZG93biB8fCBzcGVjaWFsLnRlYXJkb3duLmNhbGwoIGVsZW0sIG5hbWVzcGFjZXMsIGVsZW1EYXRhLmhhbmRsZSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0XHRqUXVlcnkucmVtb3ZlRXZlbnQoIGVsZW0sIHR5cGUsIGVsZW1EYXRhLmhhbmRsZSApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGVsZXRlIGV2ZW50c1sgdHlwZSBdO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSB0aGUgZXhwYW5kbyBpZiBpdCdzIG5vIGxvbmdlciB1c2VkXG5cdFx0aWYgKCBqUXVlcnkuaXNFbXB0eU9iamVjdCggZXZlbnRzICkgKSB7XG5cdFx0XHRkZWxldGUgZWxlbURhdGEuaGFuZGxlO1xuXG5cdFx0XHQvLyByZW1vdmVEYXRhIGFsc28gY2hlY2tzIGZvciBlbXB0aW5lc3MgYW5kIGNsZWFycyB0aGUgZXhwYW5kbyBpZiBlbXB0eVxuXHRcdFx0Ly8gc28gdXNlIGl0IGluc3RlYWQgb2YgZGVsZXRlXG5cdFx0XHRqUXVlcnkucmVtb3ZlRGF0YSggZWxlbSwgXCJldmVudHNcIiwgdHJ1ZSApO1xuXHRcdH1cblx0fSxcblxuXHQvLyBFdmVudHMgdGhhdCBhcmUgc2FmZSB0byBzaG9ydC1jaXJjdWl0IGlmIG5vIGhhbmRsZXJzIGFyZSBhdHRhY2hlZC5cblx0Ly8gTmF0aXZlIERPTSBldmVudHMgc2hvdWxkIG5vdCBiZSBhZGRlZCwgdGhleSBtYXkgaGF2ZSBpbmxpbmUgaGFuZGxlcnMuXG5cdGN1c3RvbUV2ZW50OiB7XG5cdFx0XCJnZXREYXRhXCI6IHRydWUsXG5cdFx0XCJzZXREYXRhXCI6IHRydWUsXG5cdFx0XCJjaGFuZ2VEYXRhXCI6IHRydWVcblx0fSxcblxuXHR0cmlnZ2VyOiBmdW5jdGlvbiggZXZlbnQsIGRhdGEsIGVsZW0sIG9ubHlIYW5kbGVycyApIHtcblx0XHQvLyBEb24ndCBkbyBldmVudHMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuXHRcdGlmICggZWxlbSAmJiAoZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4KSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBFdmVudCBvYmplY3Qgb3IgZXZlbnQgdHlwZVxuXHRcdHZhciBjYWNoZSwgZXhjbHVzaXZlLCBpLCBjdXIsIG9sZCwgb250eXBlLCBzcGVjaWFsLCBoYW5kbGUsIGV2ZW50UGF0aCwgYnViYmxlVHlwZSxcblx0XHRcdHR5cGUgPSBldmVudC50eXBlIHx8IGV2ZW50LFxuXHRcdFx0bmFtZXNwYWNlcyA9IFtdO1xuXG5cdFx0Ly8gZm9jdXMvYmx1ciBtb3JwaHMgdG8gZm9jdXNpbi9vdXQ7IGVuc3VyZSB3ZSdyZSBub3QgZmlyaW5nIHRoZW0gcmlnaHQgbm93XG5cdFx0aWYgKCByZm9jdXNNb3JwaC50ZXN0KCB0eXBlICsgalF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZS5pbmRleE9mKCBcIiFcIiApID49IDAgKSB7XG5cdFx0XHQvLyBFeGNsdXNpdmUgZXZlbnRzIHRyaWdnZXIgb25seSBmb3IgdGhlIGV4YWN0IGV2ZW50IChubyBuYW1lc3BhY2VzKVxuXHRcdFx0dHlwZSA9IHR5cGUuc2xpY2UoMCwgLTEpO1xuXHRcdFx0ZXhjbHVzaXZlID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGUuaW5kZXhPZiggXCIuXCIgKSA+PSAwICkge1xuXHRcdFx0Ly8gTmFtZXNwYWNlZCB0cmlnZ2VyOyBjcmVhdGUgYSByZWdleHAgdG8gbWF0Y2ggZXZlbnQgdHlwZSBpbiBoYW5kbGUoKVxuXHRcdFx0bmFtZXNwYWNlcyA9IHR5cGUuc3BsaXQoXCIuXCIpO1xuXHRcdFx0dHlwZSA9IG5hbWVzcGFjZXMuc2hpZnQoKTtcblx0XHRcdG5hbWVzcGFjZXMuc29ydCgpO1xuXHRcdH1cblxuXHRcdGlmICggKCFlbGVtIHx8IGpRdWVyeS5ldmVudC5jdXN0b21FdmVudFsgdHlwZSBdKSAmJiAhalF1ZXJ5LmV2ZW50Lmdsb2JhbFsgdHlwZSBdICkge1xuXHRcdFx0Ly8gTm8galF1ZXJ5IGhhbmRsZXJzIGZvciB0aGlzIGV2ZW50IHR5cGUsIGFuZCBpdCBjYW4ndCBoYXZlIGlubGluZSBoYW5kbGVyc1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENhbGxlciBjYW4gcGFzcyBpbiBhbiBFdmVudCwgT2JqZWN0LCBvciBqdXN0IGFuIGV2ZW50IHR5cGUgc3RyaW5nXG5cdFx0ZXZlbnQgPSB0eXBlb2YgZXZlbnQgPT09IFwib2JqZWN0XCIgP1xuXHRcdFx0Ly8galF1ZXJ5LkV2ZW50IG9iamVjdFxuXHRcdFx0ZXZlbnRbIGpRdWVyeS5leHBhbmRvIF0gPyBldmVudCA6XG5cdFx0XHQvLyBPYmplY3QgbGl0ZXJhbFxuXHRcdFx0bmV3IGpRdWVyeS5FdmVudCggdHlwZSwgZXZlbnQgKSA6XG5cdFx0XHQvLyBKdXN0IHRoZSBldmVudCB0eXBlIChzdHJpbmcpXG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCB0eXBlICk7XG5cblx0XHRldmVudC50eXBlID0gdHlwZTtcblx0XHRldmVudC5pc1RyaWdnZXIgPSB0cnVlO1xuXHRcdGV2ZW50LmV4Y2x1c2l2ZSA9IGV4Y2x1c2l2ZTtcblx0XHRldmVudC5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmpvaW4oIFwiLlwiICk7XG5cdFx0ZXZlbnQubmFtZXNwYWNlX3JlID0gZXZlbnQubmFtZXNwYWNlPyBuZXcgUmVnRXhwKFwiKF58XFxcXC4pXCIgKyBuYW1lc3BhY2VzLmpvaW4oXCJcXFxcLig/Oi4qXFxcXC58KVwiKSArIFwiKFxcXFwufCQpXCIpIDogbnVsbDtcblx0XHRvbnR5cGUgPSB0eXBlLmluZGV4T2YoIFwiOlwiICkgPCAwID8gXCJvblwiICsgdHlwZSA6IFwiXCI7XG5cblx0XHQvLyBIYW5kbGUgYSBnbG9iYWwgdHJpZ2dlclxuXHRcdGlmICggIWVsZW0gKSB7XG5cblx0XHRcdC8vIFRPRE86IFN0b3AgdGF1bnRpbmcgdGhlIGRhdGEgY2FjaGU7IHJlbW92ZSBnbG9iYWwgZXZlbnRzIGFuZCBhbHdheXMgYXR0YWNoIHRvIGRvY3VtZW50XG5cdFx0XHRjYWNoZSA9IGpRdWVyeS5jYWNoZTtcblx0XHRcdGZvciAoIGkgaW4gY2FjaGUgKSB7XG5cdFx0XHRcdGlmICggY2FjaGVbIGkgXS5ldmVudHMgJiYgY2FjaGVbIGkgXS5ldmVudHNbIHR5cGUgXSApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggZXZlbnQsIGRhdGEsIGNhY2hlWyBpIF0uaGFuZGxlLmVsZW0sIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIENsZWFuIHVwIHRoZSBldmVudCBpbiBjYXNlIGl0IGlzIGJlaW5nIHJldXNlZFxuXHRcdGV2ZW50LnJlc3VsdCA9IHVuZGVmaW5lZDtcblx0XHRpZiAoICFldmVudC50YXJnZXQgKSB7XG5cdFx0XHRldmVudC50YXJnZXQgPSBlbGVtO1xuXHRcdH1cblxuXHRcdC8vIENsb25lIGFueSBpbmNvbWluZyBkYXRhIGFuZCBwcmVwZW5kIHRoZSBldmVudCwgY3JlYXRpbmcgdGhlIGhhbmRsZXIgYXJnIGxpc3Rcblx0XHRkYXRhID0gZGF0YSAhPSBudWxsID8galF1ZXJ5Lm1ha2VBcnJheSggZGF0YSApIDogW107XG5cdFx0ZGF0YS51bnNoaWZ0KCBldmVudCApO1xuXG5cdFx0Ly8gQWxsb3cgc3BlY2lhbCBldmVudHMgdG8gZHJhdyBvdXRzaWRlIHRoZSBsaW5lc1xuXHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbFsgdHlwZSBdIHx8IHt9O1xuXHRcdGlmICggc3BlY2lhbC50cmlnZ2VyICYmIHNwZWNpYWwudHJpZ2dlci5hcHBseSggZWxlbSwgZGF0YSApID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgZXZlbnQgcHJvcGFnYXRpb24gcGF0aCBpbiBhZHZhbmNlLCBwZXIgVzNDIGV2ZW50cyBzcGVjICgjOTk1MSlcblx0XHQvLyBCdWJibGUgdXAgdG8gZG9jdW1lbnQsIHRoZW4gdG8gd2luZG93OyB3YXRjaCBmb3IgYSBnbG9iYWwgb3duZXJEb2N1bWVudCB2YXIgKCM5NzI0KVxuXHRcdGV2ZW50UGF0aCA9IFtbIGVsZW0sIHNwZWNpYWwuYmluZFR5cGUgfHwgdHlwZSBdXTtcblx0XHRpZiAoICFvbmx5SGFuZGxlcnMgJiYgIXNwZWNpYWwubm9CdWJibGUgJiYgIWpRdWVyeS5pc1dpbmRvdyggZWxlbSApICkge1xuXG5cdFx0XHRidWJibGVUeXBlID0gc3BlY2lhbC5kZWxlZ2F0ZVR5cGUgfHwgdHlwZTtcblx0XHRcdGN1ciA9IHJmb2N1c01vcnBoLnRlc3QoIGJ1YmJsZVR5cGUgKyB0eXBlICkgPyBlbGVtIDogZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0Zm9yICggb2xkID0gZWxlbTsgY3VyOyBjdXIgPSBjdXIucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0ZXZlbnRQYXRoLnB1c2goWyBjdXIsIGJ1YmJsZVR5cGUgXSk7XG5cdFx0XHRcdG9sZCA9IGN1cjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT25seSBhZGQgd2luZG93IGlmIHdlIGdvdCB0byBkb2N1bWVudCAoZS5nLiwgbm90IHBsYWluIG9iaiBvciBkZXRhY2hlZCBET00pXG5cdFx0XHRpZiAoIG9sZCA9PT0gKGVsZW0ub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCkgKSB7XG5cdFx0XHRcdGV2ZW50UGF0aC5wdXNoKFsgb2xkLmRlZmF1bHRWaWV3IHx8IG9sZC5wYXJlbnRXaW5kb3cgfHwgd2luZG93LCBidWJibGVUeXBlIF0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEZpcmUgaGFuZGxlcnMgb24gdGhlIGV2ZW50IHBhdGhcblx0XHRmb3IgKCBpID0gMDsgaSA8IGV2ZW50UGF0aC5sZW5ndGggJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCk7IGkrKyApIHtcblxuXHRcdFx0Y3VyID0gZXZlbnRQYXRoW2ldWzBdO1xuXHRcdFx0ZXZlbnQudHlwZSA9IGV2ZW50UGF0aFtpXVsxXTtcblxuXHRcdFx0aGFuZGxlID0gKCBqUXVlcnkuX2RhdGEoIGN1ciwgXCJldmVudHNcIiApIHx8IHt9IClbIGV2ZW50LnR5cGUgXSAmJiBqUXVlcnkuX2RhdGEoIGN1ciwgXCJoYW5kbGVcIiApO1xuXHRcdFx0aWYgKCBoYW5kbGUgKSB7XG5cdFx0XHRcdGhhbmRsZS5hcHBseSggY3VyLCBkYXRhICk7XG5cdFx0XHR9XG5cdFx0XHQvLyBOb3RlIHRoYXQgdGhpcyBpcyBhIGJhcmUgSlMgZnVuY3Rpb24gYW5kIG5vdCBhIGpRdWVyeSBoYW5kbGVyXG5cdFx0XHRoYW5kbGUgPSBvbnR5cGUgJiYgY3VyWyBvbnR5cGUgXTtcblx0XHRcdGlmICggaGFuZGxlICYmIGpRdWVyeS5hY2NlcHREYXRhKCBjdXIgKSAmJiBoYW5kbGUuYXBwbHkoIGN1ciwgZGF0YSApID09PSBmYWxzZSApIHtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZXZlbnQudHlwZSA9IHR5cGU7XG5cblx0XHQvLyBJZiBub2JvZHkgcHJldmVudGVkIHRoZSBkZWZhdWx0IGFjdGlvbiwgZG8gaXQgbm93XG5cdFx0aWYgKCAhb25seUhhbmRsZXJzICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblxuXHRcdFx0aWYgKCAoIXNwZWNpYWwuX2RlZmF1bHQgfHwgc3BlY2lhbC5fZGVmYXVsdC5hcHBseSggZWxlbS5vd25lckRvY3VtZW50LCBkYXRhICkgPT09IGZhbHNlKSAmJlxuXHRcdFx0XHQhKHR5cGUgPT09IFwiY2xpY2tcIiAmJiBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiYVwiICkpICYmIGpRdWVyeS5hY2NlcHREYXRhKCBlbGVtICkgKSB7XG5cblx0XHRcdFx0Ly8gQ2FsbCBhIG5hdGl2ZSBET00gbWV0aG9kIG9uIHRoZSB0YXJnZXQgd2l0aCB0aGUgc2FtZSBuYW1lIG5hbWUgYXMgdGhlIGV2ZW50LlxuXHRcdFx0XHQvLyBDYW4ndCB1c2UgYW4gLmlzRnVuY3Rpb24oKSBjaGVjayBoZXJlIGJlY2F1c2UgSUU2LzcgZmFpbHMgdGhhdCB0ZXN0LlxuXHRcdFx0XHQvLyBEb24ndCBkbyBkZWZhdWx0IGFjdGlvbnMgb24gd2luZG93LCB0aGF0J3Mgd2hlcmUgZ2xvYmFsIHZhcmlhYmxlcyBiZSAoIzYxNzApXG5cdFx0XHRcdC8vIElFPDkgZGllcyBvbiBmb2N1cy9ibHVyIHRvIGhpZGRlbiBlbGVtZW50ICgjMTQ4Nilcblx0XHRcdFx0aWYgKCBvbnR5cGUgJiYgZWxlbVsgdHlwZSBdICYmICgodHlwZSAhPT0gXCJmb2N1c1wiICYmIHR5cGUgIT09IFwiYmx1clwiKSB8fCBldmVudC50YXJnZXQub2Zmc2V0V2lkdGggIT09IDApICYmICFqUXVlcnkuaXNXaW5kb3coIGVsZW0gKSApIHtcblxuXHRcdFx0XHRcdC8vIERvbid0IHJlLXRyaWdnZXIgYW4gb25GT08gZXZlbnQgd2hlbiB3ZSBjYWxsIGl0cyBGT08oKSBtZXRob2Rcblx0XHRcdFx0XHRvbGQgPSBlbGVtWyBvbnR5cGUgXTtcblxuXHRcdFx0XHRcdGlmICggb2xkICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSBudWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFByZXZlbnQgcmUtdHJpZ2dlcmluZyBvZiB0aGUgc2FtZSBldmVudCwgc2luY2Ugd2UgYWxyZWFkeSBidWJibGVkIGl0IGFib3ZlXG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHR5cGU7XG5cdFx0XHRcdFx0ZWxlbVsgdHlwZSBdKCk7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnRyaWdnZXJlZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdGlmICggb2xkICkge1xuXHRcdFx0XHRcdFx0ZWxlbVsgb250eXBlIF0gPSBvbGQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHRkaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXG5cdFx0Ly8gTWFrZSBhIHdyaXRhYmxlIGpRdWVyeS5FdmVudCBmcm9tIHRoZSBuYXRpdmUgZXZlbnQgb2JqZWN0XG5cdFx0ZXZlbnQgPSBqUXVlcnkuZXZlbnQuZml4KCBldmVudCB8fCB3aW5kb3cuZXZlbnQgKTtcblxuXHRcdHZhciBpLCBqLCBjdXIsIHJldCwgc2VsTWF0Y2gsIG1hdGNoZWQsIG1hdGNoZXMsIGhhbmRsZU9iaiwgc2VsLCByZWxhdGVkLFxuXHRcdFx0aGFuZGxlcnMgPSAoIChqUXVlcnkuX2RhdGEoIHRoaXMsIFwiZXZlbnRzXCIgKSB8fCB7fSApWyBldmVudC50eXBlIF0gfHwgW10pLFxuXHRcdFx0ZGVsZWdhdGVDb3VudCA9IGhhbmRsZXJzLmRlbGVnYXRlQ291bnQsXG5cdFx0XHRhcmdzID0gW10uc2xpY2UuY2FsbCggYXJndW1lbnRzICksXG5cdFx0XHRydW5fYWxsID0gIWV2ZW50LmV4Y2x1c2l2ZSAmJiAhZXZlbnQubmFtZXNwYWNlLFxuXHRcdFx0c3BlY2lhbCA9IGpRdWVyeS5ldmVudC5zcGVjaWFsWyBldmVudC50eXBlIF0gfHwge30sXG5cdFx0XHRoYW5kbGVyUXVldWUgPSBbXTtcblxuXHRcdC8vIFVzZSB0aGUgZml4LWVkIGpRdWVyeS5FdmVudCByYXRoZXIgdGhhbiB0aGUgKHJlYWQtb25seSkgbmF0aXZlIGV2ZW50XG5cdFx0YXJnc1swXSA9IGV2ZW50O1xuXHRcdGV2ZW50LmRlbGVnYXRlVGFyZ2V0ID0gdGhpcztcblxuXHRcdC8vIENhbGwgdGhlIHByZURpc3BhdGNoIGhvb2sgZm9yIHRoZSBtYXBwZWQgdHlwZSwgYW5kIGxldCBpdCBiYWlsIGlmIGRlc2lyZWRcblx0XHRpZiAoIHNwZWNpYWwucHJlRGlzcGF0Y2ggJiYgc3BlY2lhbC5wcmVEaXNwYXRjaC5jYWxsKCB0aGlzLCBldmVudCApID09PSBmYWxzZSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBEZXRlcm1pbmUgaGFuZGxlcnMgdGhhdCBzaG91bGQgcnVuIGlmIHRoZXJlIGFyZSBkZWxlZ2F0ZWQgZXZlbnRzXG5cdFx0Ly8gQXZvaWQgbm9uLWxlZnQtY2xpY2sgYnViYmxpbmcgaW4gRmlyZWZveCAoIzM4NjEpXG5cdFx0aWYgKCBkZWxlZ2F0ZUNvdW50ICYmICEoZXZlbnQuYnV0dG9uICYmIGV2ZW50LnR5cGUgPT09IFwiY2xpY2tcIikgKSB7XG5cblx0XHRcdGZvciAoIGN1ciA9IGV2ZW50LnRhcmdldDsgY3VyICE9IHRoaXM7IGN1ciA9IGN1ci5wYXJlbnROb2RlIHx8IHRoaXMgKSB7XG5cblx0XHRcdFx0Ly8gRG9uJ3QgcHJvY2VzcyBjbGlja3MgKE9OTFkpIG9uIGRpc2FibGVkIGVsZW1lbnRzICgjNjkxMSwgIzgxNjUsICMxMTM4MiwgIzExNzY0KVxuXHRcdFx0XHRpZiAoIGN1ci5kaXNhYmxlZCAhPT0gdHJ1ZSB8fCBldmVudC50eXBlICE9PSBcImNsaWNrXCIgKSB7XG5cdFx0XHRcdFx0c2VsTWF0Y2ggPSB7fTtcblx0XHRcdFx0XHRtYXRjaGVzID0gW107XG5cdFx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBkZWxlZ2F0ZUNvdW50OyBpKysgKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVPYmogPSBoYW5kbGVyc1sgaSBdO1xuXHRcdFx0XHRcdFx0c2VsID0gaGFuZGxlT2JqLnNlbGVjdG9yO1xuXG5cdFx0XHRcdFx0XHRpZiAoIHNlbE1hdGNoWyBzZWwgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0XHRzZWxNYXRjaFsgc2VsIF0gPSBqUXVlcnkoIHNlbCwgdGhpcyApLmluZGV4KCBjdXIgKSA+PSAwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKCBzZWxNYXRjaFsgc2VsIF0gKSB7XG5cdFx0XHRcdFx0XHRcdG1hdGNoZXMucHVzaCggaGFuZGxlT2JqICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICggbWF0Y2hlcy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVyUXVldWUucHVzaCh7IGVsZW06IGN1ciwgbWF0Y2hlczogbWF0Y2hlcyB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBZGQgdGhlIHJlbWFpbmluZyAoZGlyZWN0bHktYm91bmQpIGhhbmRsZXJzXG5cdFx0aWYgKCBoYW5kbGVycy5sZW5ndGggPiBkZWxlZ2F0ZUNvdW50ICkge1xuXHRcdFx0aGFuZGxlclF1ZXVlLnB1c2goeyBlbGVtOiB0aGlzLCBtYXRjaGVzOiBoYW5kbGVycy5zbGljZSggZGVsZWdhdGVDb3VudCApIH0pO1xuXHRcdH1cblxuXHRcdC8vIFJ1biBkZWxlZ2F0ZXMgZmlyc3Q7IHRoZXkgbWF5IHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBiZW5lYXRoIHVzXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBoYW5kbGVyUXVldWUubGVuZ3RoICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpOyBpKysgKSB7XG5cdFx0XHRtYXRjaGVkID0gaGFuZGxlclF1ZXVlWyBpIF07XG5cdFx0XHRldmVudC5jdXJyZW50VGFyZ2V0ID0gbWF0Y2hlZC5lbGVtO1xuXG5cdFx0XHRmb3IgKCBqID0gMDsgaiA8IG1hdGNoZWQubWF0Y2hlcy5sZW5ndGggJiYgIWV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCk7IGorKyApIHtcblx0XHRcdFx0aGFuZGxlT2JqID0gbWF0Y2hlZC5tYXRjaGVzWyBqIF07XG5cblx0XHRcdFx0Ly8gVHJpZ2dlcmVkIGV2ZW50IG11c3QgZWl0aGVyIDEpIGJlIG5vbi1leGNsdXNpdmUgYW5kIGhhdmUgbm8gbmFtZXNwYWNlLCBvclxuXHRcdFx0XHQvLyAyKSBoYXZlIG5hbWVzcGFjZShzKSBhIHN1YnNldCBvciBlcXVhbCB0byB0aG9zZSBpbiB0aGUgYm91bmQgZXZlbnQgKGJvdGggY2FuIGhhdmUgbm8gbmFtZXNwYWNlKS5cblx0XHRcdFx0aWYgKCBydW5fYWxsIHx8ICghZXZlbnQubmFtZXNwYWNlICYmICFoYW5kbGVPYmoubmFtZXNwYWNlKSB8fCBldmVudC5uYW1lc3BhY2VfcmUgJiYgZXZlbnQubmFtZXNwYWNlX3JlLnRlc3QoIGhhbmRsZU9iai5uYW1lc3BhY2UgKSApIHtcblxuXHRcdFx0XHRcdGV2ZW50LmRhdGEgPSBoYW5kbGVPYmouZGF0YTtcblx0XHRcdFx0XHRldmVudC5oYW5kbGVPYmogPSBoYW5kbGVPYmo7XG5cblx0XHRcdFx0XHRyZXQgPSAoIChqUXVlcnkuZXZlbnQuc3BlY2lhbFsgaGFuZGxlT2JqLm9yaWdUeXBlIF0gfHwge30pLmhhbmRsZSB8fCBoYW5kbGVPYmouaGFuZGxlciApXG5cdFx0XHRcdFx0XHRcdC5hcHBseSggbWF0Y2hlZC5lbGVtLCBhcmdzICk7XG5cblx0XHRcdFx0XHRpZiAoIHJldCAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdFx0ZXZlbnQucmVzdWx0ID0gcmV0O1xuXHRcdFx0XHRcdFx0aWYgKCByZXQgPT09IGZhbHNlICkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDYWxsIHRoZSBwb3N0RGlzcGF0Y2ggaG9vayBmb3IgdGhlIG1hcHBlZCB0eXBlXG5cdFx0aWYgKCBzcGVjaWFsLnBvc3REaXNwYXRjaCApIHtcblx0XHRcdHNwZWNpYWwucG9zdERpc3BhdGNoLmNhbGwoIHRoaXMsIGV2ZW50ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50LnJlc3VsdDtcblx0fSxcblxuXHQvLyBJbmNsdWRlcyBzb21lIGV2ZW50IHByb3BzIHNoYXJlZCBieSBLZXlFdmVudCBhbmQgTW91c2VFdmVudFxuXHQvLyAqKiogYXR0ckNoYW5nZSBhdHRyTmFtZSByZWxhdGVkTm9kZSBzcmNFbGVtZW50ICBhcmUgbm90IG5vcm1hbGl6ZWQsIG5vbi1XM0MsIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiAxLjggKioqXG5cdHByb3BzOiBcImF0dHJDaGFuZ2UgYXR0ck5hbWUgcmVsYXRlZE5vZGUgc3JjRWxlbWVudCBhbHRLZXkgYnViYmxlcyBjYW5jZWxhYmxlIGN0cmxLZXkgY3VycmVudFRhcmdldCBldmVudFBoYXNlIG1ldGFLZXkgcmVsYXRlZFRhcmdldCBzaGlmdEtleSB0YXJnZXQgdGltZVN0YW1wIHZpZXcgd2hpY2hcIi5zcGxpdChcIiBcIiksXG5cblx0Zml4SG9va3M6IHt9LFxuXG5cdGtleUhvb2tzOiB7XG5cdFx0cHJvcHM6IFwiY2hhciBjaGFyQ29kZSBrZXkga2V5Q29kZVwiLnNwbGl0KFwiIFwiKSxcblx0XHRmaWx0ZXI6IGZ1bmN0aW9uKCBldmVudCwgb3JpZ2luYWwgKSB7XG5cblx0XHRcdC8vIEFkZCB3aGljaCBmb3Iga2V5IGV2ZW50c1xuXHRcdFx0aWYgKCBldmVudC53aGljaCA9PSBudWxsICkge1xuXHRcdFx0XHRldmVudC53aGljaCA9IG9yaWdpbmFsLmNoYXJDb2RlICE9IG51bGwgPyBvcmlnaW5hbC5jaGFyQ29kZSA6IG9yaWdpbmFsLmtleUNvZGU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBldmVudDtcblx0XHR9XG5cdH0sXG5cblx0bW91c2VIb29rczoge1xuXHRcdHByb3BzOiBcImJ1dHRvbiBidXR0b25zIGNsaWVudFggY2xpZW50WSBmcm9tRWxlbWVudCBvZmZzZXRYIG9mZnNldFkgcGFnZVggcGFnZVkgc2NyZWVuWCBzY3JlZW5ZIHRvRWxlbWVudFwiLnNwbGl0KFwiIFwiKSxcblx0XHRmaWx0ZXI6IGZ1bmN0aW9uKCBldmVudCwgb3JpZ2luYWwgKSB7XG5cdFx0XHR2YXIgZXZlbnREb2MsIGRvYywgYm9keSxcblx0XHRcdFx0YnV0dG9uID0gb3JpZ2luYWwuYnV0dG9uLFxuXHRcdFx0XHRmcm9tRWxlbWVudCA9IG9yaWdpbmFsLmZyb21FbGVtZW50O1xuXG5cdFx0XHQvLyBDYWxjdWxhdGUgcGFnZVgvWSBpZiBtaXNzaW5nIGFuZCBjbGllbnRYL1kgYXZhaWxhYmxlXG5cdFx0XHRpZiAoIGV2ZW50LnBhZ2VYID09IG51bGwgJiYgb3JpZ2luYWwuY2xpZW50WCAhPSBudWxsICkge1xuXHRcdFx0XHRldmVudERvYyA9IGV2ZW50LnRhcmdldC5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuXHRcdFx0XHRkb2MgPSBldmVudERvYy5kb2N1bWVudEVsZW1lbnQ7XG5cdFx0XHRcdGJvZHkgPSBldmVudERvYy5ib2R5O1xuXG5cdFx0XHRcdGV2ZW50LnBhZ2VYID0gb3JpZ2luYWwuY2xpZW50WCArICggZG9jICYmIGRvYy5zY3JvbGxMZWZ0IHx8IGJvZHkgJiYgYm9keS5zY3JvbGxMZWZ0IHx8IDAgKSAtICggZG9jICYmIGRvYy5jbGllbnRMZWZ0IHx8IGJvZHkgJiYgYm9keS5jbGllbnRMZWZ0IHx8IDAgKTtcblx0XHRcdFx0ZXZlbnQucGFnZVkgPSBvcmlnaW5hbC5jbGllbnRZICsgKCBkb2MgJiYgZG9jLnNjcm9sbFRvcCAgfHwgYm9keSAmJiBib2R5LnNjcm9sbFRvcCAgfHwgMCApIC0gKCBkb2MgJiYgZG9jLmNsaWVudFRvcCAgfHwgYm9keSAmJiBib2R5LmNsaWVudFRvcCAgfHwgMCApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgcmVsYXRlZFRhcmdldCwgaWYgbmVjZXNzYXJ5XG5cdFx0XHRpZiAoICFldmVudC5yZWxhdGVkVGFyZ2V0ICYmIGZyb21FbGVtZW50ICkge1xuXHRcdFx0XHRldmVudC5yZWxhdGVkVGFyZ2V0ID0gZnJvbUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCA/IG9yaWdpbmFsLnRvRWxlbWVudCA6IGZyb21FbGVtZW50O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgd2hpY2ggZm9yIGNsaWNrOiAxID09PSBsZWZ0OyAyID09PSBtaWRkbGU7IDMgPT09IHJpZ2h0XG5cdFx0XHQvLyBOb3RlOiBidXR0b24gaXMgbm90IG5vcm1hbGl6ZWQsIHNvIGRvbid0IHVzZSBpdFxuXHRcdFx0aWYgKCAhZXZlbnQud2hpY2ggJiYgYnV0dG9uICE9PSB1bmRlZmluZWQgKSB7XG5cdFx0XHRcdGV2ZW50LndoaWNoID0gKCBidXR0b24gJiAxID8gMSA6ICggYnV0dG9uICYgMiA/IDMgOiAoIGJ1dHRvbiAmIDQgPyAyIDogMCApICkgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGV2ZW50O1xuXHRcdH1cblx0fSxcblxuXHRmaXg6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRpZiAoIGV2ZW50WyBqUXVlcnkuZXhwYW5kbyBdICkge1xuXHRcdFx0cmV0dXJuIGV2ZW50O1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSBhIHdyaXRhYmxlIGNvcHkgb2YgdGhlIGV2ZW50IG9iamVjdCBhbmQgbm9ybWFsaXplIHNvbWUgcHJvcGVydGllc1xuXHRcdHZhciBpLCBwcm9wLFxuXHRcdFx0b3JpZ2luYWxFdmVudCA9IGV2ZW50LFxuXHRcdFx0Zml4SG9vayA9IGpRdWVyeS5ldmVudC5maXhIb29rc1sgZXZlbnQudHlwZSBdIHx8IHt9LFxuXHRcdFx0Y29weSA9IGZpeEhvb2sucHJvcHMgPyB0aGlzLnByb3BzLmNvbmNhdCggZml4SG9vay5wcm9wcyApIDogdGhpcy5wcm9wcztcblxuXHRcdGV2ZW50ID0galF1ZXJ5LkV2ZW50KCBvcmlnaW5hbEV2ZW50ICk7XG5cblx0XHRmb3IgKCBpID0gY29weS5sZW5ndGg7IGk7ICkge1xuXHRcdFx0cHJvcCA9IGNvcHlbIC0taSBdO1xuXHRcdFx0ZXZlbnRbIHByb3AgXSA9IG9yaWdpbmFsRXZlbnRbIHByb3AgXTtcblx0XHR9XG5cblx0XHQvLyBGaXggdGFyZ2V0IHByb3BlcnR5LCBpZiBuZWNlc3NhcnkgKCMxOTI1LCBJRSA2LzcvOCAmIFNhZmFyaTIpXG5cdFx0aWYgKCAhZXZlbnQudGFyZ2V0ICkge1xuXHRcdFx0ZXZlbnQudGFyZ2V0ID0gb3JpZ2luYWxFdmVudC5zcmNFbGVtZW50IHx8IGRvY3VtZW50O1xuXHRcdH1cblxuXHRcdC8vIFRhcmdldCBzaG91bGQgbm90IGJlIGEgdGV4dCBub2RlICgjNTA0LCBTYWZhcmkpXG5cdFx0aWYgKCBldmVudC50YXJnZXQubm9kZVR5cGUgPT09IDMgKSB7XG5cdFx0XHRldmVudC50YXJnZXQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHQvLyBGb3IgbW91c2Uva2V5IGV2ZW50cywgbWV0YUtleT09ZmFsc2UgaWYgaXQncyB1bmRlZmluZWQgKCMzMzY4LCAjMTEzMjg7IElFNi83LzgpXG5cdFx0ZXZlbnQubWV0YUtleSA9ICEhZXZlbnQubWV0YUtleTtcblxuXHRcdHJldHVybiBmaXhIb29rLmZpbHRlcj8gZml4SG9vay5maWx0ZXIoIGV2ZW50LCBvcmlnaW5hbEV2ZW50ICkgOiBldmVudDtcblx0fSxcblxuXHRzcGVjaWFsOiB7XG5cdFx0bG9hZDoge1xuXHRcdFx0Ly8gUHJldmVudCB0cmlnZ2VyZWQgaW1hZ2UubG9hZCBldmVudHMgZnJvbSBidWJibGluZyB0byB3aW5kb3cubG9hZFxuXHRcdFx0bm9CdWJibGU6IHRydWVcblx0XHR9LFxuXG5cdFx0Zm9jdXM6IHtcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c2luXCJcblx0XHR9LFxuXHRcdGJsdXI6IHtcblx0XHRcdGRlbGVnYXRlVHlwZTogXCJmb2N1c291dFwiXG5cdFx0fSxcblxuXHRcdGJlZm9yZXVubG9hZDoge1xuXHRcdFx0c2V0dXA6IGZ1bmN0aW9uKCBkYXRhLCBuYW1lc3BhY2VzLCBldmVudEhhbmRsZSApIHtcblx0XHRcdFx0Ly8gV2Ugb25seSB3YW50IHRvIGRvIHRoaXMgc3BlY2lhbCBjYXNlIG9uIHdpbmRvd3Ncblx0XHRcdFx0aWYgKCBqUXVlcnkuaXNXaW5kb3coIHRoaXMgKSApIHtcblx0XHRcdFx0XHR0aGlzLm9uYmVmb3JldW5sb2FkID0gZXZlbnRIYW5kbGU7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdHRlYXJkb3duOiBmdW5jdGlvbiggbmFtZXNwYWNlcywgZXZlbnRIYW5kbGUgKSB7XG5cdFx0XHRcdGlmICggdGhpcy5vbmJlZm9yZXVubG9hZCA9PT0gZXZlbnRIYW5kbGUgKSB7XG5cdFx0XHRcdFx0dGhpcy5vbmJlZm9yZXVubG9hZCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0c2ltdWxhdGU6IGZ1bmN0aW9uKCB0eXBlLCBlbGVtLCBldmVudCwgYnViYmxlICkge1xuXHRcdC8vIFBpZ2d5YmFjayBvbiBhIGRvbm9yIGV2ZW50IHRvIHNpbXVsYXRlIGEgZGlmZmVyZW50IG9uZS5cblx0XHQvLyBGYWtlIG9yaWdpbmFsRXZlbnQgdG8gYXZvaWQgZG9ub3IncyBzdG9wUHJvcGFnYXRpb24sIGJ1dCBpZiB0aGVcblx0XHQvLyBzaW11bGF0ZWQgZXZlbnQgcHJldmVudHMgZGVmYXVsdCB0aGVuIHdlIGRvIHRoZSBzYW1lIG9uIHRoZSBkb25vci5cblx0XHR2YXIgZSA9IGpRdWVyeS5leHRlbmQoXG5cdFx0XHRuZXcgalF1ZXJ5LkV2ZW50KCksXG5cdFx0XHRldmVudCxcblx0XHRcdHsgdHlwZTogdHlwZSxcblx0XHRcdFx0aXNTaW11bGF0ZWQ6IHRydWUsXG5cdFx0XHRcdG9yaWdpbmFsRXZlbnQ6IHt9XG5cdFx0XHR9XG5cdFx0KTtcblx0XHRpZiAoIGJ1YmJsZSApIHtcblx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBlLCBudWxsLCBlbGVtICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGpRdWVyeS5ldmVudC5kaXNwYXRjaC5jYWxsKCBlbGVtLCBlICk7XG5cdFx0fVxuXHRcdGlmICggZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSApIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG59O1xuXG4vLyBTb21lIHBsdWdpbnMgYXJlIHVzaW5nLCBidXQgaXQncyB1bmRvY3VtZW50ZWQvZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkLlxuLy8gVGhlIDEuNyBzcGVjaWFsIGV2ZW50IGludGVyZmFjZSBzaG91bGQgcHJvdmlkZSBhbGwgdGhlIGhvb2tzIG5lZWRlZCBub3cuXG5qUXVlcnkuZXZlbnQuaGFuZGxlID0galF1ZXJ5LmV2ZW50LmRpc3BhdGNoO1xuXG5qUXVlcnkucmVtb3ZlRXZlbnQgPSBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyID9cblx0ZnVuY3Rpb24oIGVsZW0sIHR5cGUsIGhhbmRsZSApIHtcblx0XHRpZiAoIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcblx0XHRcdGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgaGFuZGxlLCBmYWxzZSApO1xuXHRcdH1cblx0fSA6XG5cdGZ1bmN0aW9uKCBlbGVtLCB0eXBlLCBoYW5kbGUgKSB7XG5cdFx0dmFyIG5hbWUgPSBcIm9uXCIgKyB0eXBlO1xuXG5cdFx0aWYgKCBlbGVtLmRldGFjaEV2ZW50ICkge1xuXG5cdFx0XHQvLyAjODU0NSwgIzcwNTQsIHByZXZlbnRpbmcgbWVtb3J5IGxlYWtzIGZvciBjdXN0b20gZXZlbnRzIGluIElFNi04IOKAk1xuXHRcdFx0Ly8gZGV0YWNoRXZlbnQgbmVlZGVkIHByb3BlcnR5IG9uIGVsZW1lbnQsIGJ5IG5hbWUgb2YgdGhhdCBldmVudCwgdG8gcHJvcGVybHkgZXhwb3NlIGl0IHRvIEdDXG5cdFx0XHRpZiAoIHR5cGVvZiBlbGVtWyBuYW1lIF0gPT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRcdGVsZW1bIG5hbWUgXSA9IG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdGVsZW0uZGV0YWNoRXZlbnQoIG5hbWUsIGhhbmRsZSApO1xuXHRcdH1cblx0fTtcblxualF1ZXJ5LkV2ZW50ID0gZnVuY3Rpb24oIHNyYywgcHJvcHMgKSB7XG5cdC8vIEFsbG93IGluc3RhbnRpYXRpb24gd2l0aG91dCB0aGUgJ25ldycga2V5d29yZFxuXHRpZiAoICEodGhpcyBpbnN0YW5jZW9mIGpRdWVyeS5FdmVudCkgKSB7XG5cdFx0cmV0dXJuIG5ldyBqUXVlcnkuRXZlbnQoIHNyYywgcHJvcHMgKTtcblx0fVxuXG5cdC8vIEV2ZW50IG9iamVjdFxuXHRpZiAoIHNyYyAmJiBzcmMudHlwZSApIHtcblx0XHR0aGlzLm9yaWdpbmFsRXZlbnQgPSBzcmM7XG5cdFx0dGhpcy50eXBlID0gc3JjLnR5cGU7XG5cblx0XHQvLyBFdmVudHMgYnViYmxpbmcgdXAgdGhlIGRvY3VtZW50IG1heSBoYXZlIGJlZW4gbWFya2VkIGFzIHByZXZlbnRlZFxuXHRcdC8vIGJ5IGEgaGFuZGxlciBsb3dlciBkb3duIHRoZSB0cmVlOyByZWZsZWN0IHRoZSBjb3JyZWN0IHZhbHVlLlxuXHRcdHRoaXMuaXNEZWZhdWx0UHJldmVudGVkID0gKCBzcmMuZGVmYXVsdFByZXZlbnRlZCB8fCBzcmMucmV0dXJuVmFsdWUgPT09IGZhbHNlIHx8XG5cdFx0XHRzcmMuZ2V0UHJldmVudERlZmF1bHQgJiYgc3JjLmdldFByZXZlbnREZWZhdWx0KCkgKSA/IHJldHVyblRydWUgOiByZXR1cm5GYWxzZTtcblxuXHQvLyBFdmVudCB0eXBlXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50eXBlID0gc3JjO1xuXHR9XG5cblx0Ly8gUHV0IGV4cGxpY2l0bHkgcHJvdmlkZWQgcHJvcGVydGllcyBvbnRvIHRoZSBldmVudCBvYmplY3Rcblx0aWYgKCBwcm9wcyApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0aGlzLCBwcm9wcyApO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgdGltZXN0YW1wIGlmIGluY29taW5nIGV2ZW50IGRvZXNuJ3QgaGF2ZSBvbmVcblx0dGhpcy50aW1lU3RhbXAgPSBzcmMgJiYgc3JjLnRpbWVTdGFtcCB8fCBqUXVlcnkubm93KCk7XG5cblx0Ly8gTWFyayBpdCBhcyBmaXhlZFxuXHR0aGlzWyBqUXVlcnkuZXhwYW5kbyBdID0gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIHJldHVybkZhbHNlKCkge1xuXHRyZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiByZXR1cm5UcnVlKCkge1xuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuLy8galF1ZXJ5LkV2ZW50IGlzIGJhc2VkIG9uIERPTTMgRXZlbnRzIGFzIHNwZWNpZmllZCBieSB0aGUgRUNNQVNjcmlwdCBMYW5ndWFnZSBCaW5kaW5nXG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAzL1dELURPTS1MZXZlbC0zLUV2ZW50cy0yMDAzMDMzMS9lY21hLXNjcmlwdC1iaW5kaW5nLmh0bWxcbmpRdWVyeS5FdmVudC5wcm90b3R5cGUgPSB7XG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XG5cblx0XHR2YXIgZSA9IHRoaXMub3JpZ2luYWxFdmVudDtcblx0XHRpZiAoICFlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIGlmIHByZXZlbnREZWZhdWx0IGV4aXN0cyBydW4gaXQgb24gdGhlIG9yaWdpbmFsIGV2ZW50XG5cdFx0aWYgKCBlLnByZXZlbnREZWZhdWx0ICkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0Ly8gb3RoZXJ3aXNlIHNldCB0aGUgcmV0dXJuVmFsdWUgcHJvcGVydHkgb2YgdGhlIG9yaWdpbmFsIGV2ZW50IHRvIGZhbHNlIChJRSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXHRcdH1cblx0fSxcblx0c3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblxuXHRcdHZhciBlID0gdGhpcy5vcmlnaW5hbEV2ZW50O1xuXHRcdGlmICggIWUgKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIGlmIHN0b3BQcm9wYWdhdGlvbiBleGlzdHMgcnVuIGl0IG9uIHRoZSBvcmlnaW5hbCBldmVudFxuXHRcdGlmICggZS5zdG9wUHJvcGFnYXRpb24gKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH1cblx0XHQvLyBvdGhlcndpc2Ugc2V0IHRoZSBjYW5jZWxCdWJibGUgcHJvcGVydHkgb2YgdGhlIG9yaWdpbmFsIGV2ZW50IHRvIHRydWUgKElFKVxuXHRcdGUuY2FuY2VsQnViYmxlID0gdHJ1ZTtcblx0fSxcblx0c3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcblx0XHR0aGlzLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9LFxuXHRpc0RlZmF1bHRQcmV2ZW50ZWQ6IHJldHVybkZhbHNlLFxuXHRpc1Byb3BhZ2F0aW9uU3RvcHBlZDogcmV0dXJuRmFsc2UsXG5cdGlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkOiByZXR1cm5GYWxzZVxufTtcblxuLy8gQ3JlYXRlIG1vdXNlZW50ZXIvbGVhdmUgZXZlbnRzIHVzaW5nIG1vdXNlb3Zlci9vdXQgYW5kIGV2ZW50LXRpbWUgY2hlY2tzXG5qUXVlcnkuZWFjaCh7XG5cdG1vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsXG5cdG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIlxufSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblx0alF1ZXJ5LmV2ZW50LnNwZWNpYWxbIG9yaWcgXSA9IHtcblx0XHRkZWxlZ2F0ZVR5cGU6IGZpeCxcblx0XHRiaW5kVHlwZTogZml4LFxuXG5cdFx0aGFuZGxlOiBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHR2YXIgcmV0LFxuXHRcdFx0XHR0YXJnZXQgPSB0aGlzLFxuXHRcdFx0XHRyZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldCxcblx0XHRcdFx0aGFuZGxlT2JqID0gZXZlbnQuaGFuZGxlT2JqLFxuXHRcdFx0XHRzZWxlY3RvciA9IGhhbmRsZU9iai5zZWxlY3RvcjtcblxuXHRcdFx0Ly8gRm9yIG1vdXNlbnRlci9sZWF2ZSBjYWxsIHRoZSBoYW5kbGVyIGlmIHJlbGF0ZWQgaXMgb3V0c2lkZSB0aGUgdGFyZ2V0LlxuXHRcdFx0Ly8gTkI6IE5vIHJlbGF0ZWRUYXJnZXQgaWYgdGhlIG1vdXNlIGxlZnQvZW50ZXJlZCB0aGUgYnJvd3NlciB3aW5kb3dcblx0XHRcdGlmICggIXJlbGF0ZWQgfHwgKHJlbGF0ZWQgIT09IHRhcmdldCAmJiAhalF1ZXJ5LmNvbnRhaW5zKCB0YXJnZXQsIHJlbGF0ZWQgKSkgKSB7XG5cdFx0XHRcdGV2ZW50LnR5cGUgPSBoYW5kbGVPYmoub3JpZ1R5cGU7XG5cdFx0XHRcdHJldCA9IGhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdFx0ZXZlbnQudHlwZSA9IGZpeDtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXQ7XG5cdFx0fVxuXHR9O1xufSk7XG5cbi8vIElFIHN1Ym1pdCBkZWxlZ2F0aW9uXG5pZiAoICFqUXVlcnkuc3VwcG9ydC5zdWJtaXRCdWJibGVzICkge1xuXG5cdGpRdWVyeS5ldmVudC5zcGVjaWFsLnN1Ym1pdCA9IHtcblx0XHRzZXR1cDogZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBPbmx5IG5lZWQgdGhpcyBmb3IgZGVsZWdhdGVkIGZvcm0gc3VibWl0IGV2ZW50c1xuXHRcdFx0aWYgKCBqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiZm9ybVwiICkgKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTGF6eS1hZGQgYSBzdWJtaXQgaGFuZGxlciB3aGVuIGEgZGVzY2VuZGFudCBmb3JtIG1heSBwb3RlbnRpYWxseSBiZSBzdWJtaXR0ZWRcblx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIFwiY2xpY2suX3N1Ym1pdCBrZXlwcmVzcy5fc3VibWl0XCIsIGZ1bmN0aW9uKCBlICkge1xuXHRcdFx0XHQvLyBOb2RlIG5hbWUgY2hlY2sgYXZvaWRzIGEgVk1MLXJlbGF0ZWQgY3Jhc2ggaW4gSUUgKCM5ODA3KVxuXHRcdFx0XHR2YXIgZWxlbSA9IGUudGFyZ2V0LFxuXHRcdFx0XHRcdGZvcm0gPSBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaW5wdXRcIiApIHx8IGpRdWVyeS5ub2RlTmFtZSggZWxlbSwgXCJidXR0b25cIiApID8gZWxlbS5mb3JtIDogdW5kZWZpbmVkO1xuXHRcdFx0XHRpZiAoIGZvcm0gJiYgIWpRdWVyeS5fZGF0YSggZm9ybSwgXCJfc3VibWl0X2F0dGFjaGVkXCIgKSApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuYWRkKCBmb3JtLCBcInN1Ym1pdC5fc3VibWl0XCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0XHRcdGV2ZW50Ll9zdWJtaXRfYnViYmxlID0gdHJ1ZTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRqUXVlcnkuX2RhdGEoIGZvcm0sIFwiX3N1Ym1pdF9hdHRhY2hlZFwiLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0Ly8gcmV0dXJuIHVuZGVmaW5lZCBzaW5jZSB3ZSBkb24ndCBuZWVkIGFuIGV2ZW50IGxpc3RlbmVyXG5cdFx0fSxcblxuXHRcdHBvc3REaXNwYXRjaDogZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0Ly8gSWYgZm9ybSB3YXMgc3VibWl0dGVkIGJ5IHRoZSB1c2VyLCBidWJibGUgdGhlIGV2ZW50IHVwIHRoZSB0cmVlXG5cdFx0XHRpZiAoIGV2ZW50Ll9zdWJtaXRfYnViYmxlICkge1xuXHRcdFx0XHRkZWxldGUgZXZlbnQuX3N1Ym1pdF9idWJibGU7XG5cdFx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICYmICFldmVudC5pc1RyaWdnZXIgKSB7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBcInN1Ym1pdFwiLCB0aGlzLnBhcmVudE5vZGUsIGV2ZW50LCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dGVhcmRvd246IGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gT25seSBuZWVkIHRoaXMgZm9yIGRlbGVnYXRlZCBmb3JtIHN1Ym1pdCBldmVudHNcblx0XHRcdGlmICggalF1ZXJ5Lm5vZGVOYW1lKCB0aGlzLCBcImZvcm1cIiApICkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBkZWxlZ2F0ZWQgaGFuZGxlcnM7IGNsZWFuRGF0YSBldmVudHVhbGx5IHJlYXBzIHN1Ym1pdCBoYW5kbGVycyBhdHRhY2hlZCBhYm92ZVxuXHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgXCIuX3N1Ym1pdFwiICk7XG5cdFx0fVxuXHR9O1xufVxuXG4vLyBJRSBjaGFuZ2UgZGVsZWdhdGlvbiBhbmQgY2hlY2tib3gvcmFkaW8gZml4XG5pZiAoICFqUXVlcnkuc3VwcG9ydC5jaGFuZ2VCdWJibGVzICkge1xuXG5cdGpRdWVyeS5ldmVudC5zcGVjaWFsLmNoYW5nZSA9IHtcblxuXHRcdHNldHVwOiBmdW5jdGlvbigpIHtcblxuXHRcdFx0aWYgKCByZm9ybUVsZW1zLnRlc3QoIHRoaXMubm9kZU5hbWUgKSApIHtcblx0XHRcdFx0Ly8gSUUgZG9lc24ndCBmaXJlIGNoYW5nZSBvbiBhIGNoZWNrL3JhZGlvIHVudGlsIGJsdXI7IHRyaWdnZXIgaXQgb24gY2xpY2tcblx0XHRcdFx0Ly8gYWZ0ZXIgYSBwcm9wZXJ0eWNoYW5nZS4gRWF0IHRoZSBibHVyLWNoYW5nZSBpbiBzcGVjaWFsLmNoYW5nZS5oYW5kbGUuXG5cdFx0XHRcdC8vIFRoaXMgc3RpbGwgZmlyZXMgb25jaGFuZ2UgYSBzZWNvbmQgdGltZSBmb3IgY2hlY2svcmFkaW8gYWZ0ZXIgYmx1ci5cblx0XHRcdFx0aWYgKCB0aGlzLnR5cGUgPT09IFwiY2hlY2tib3hcIiB8fCB0aGlzLnR5cGUgPT09IFwicmFkaW9cIiApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuYWRkKCB0aGlzLCBcInByb3BlcnR5Y2hhbmdlLl9jaGFuZ2VcIiwgZnVuY3Rpb24oIGV2ZW50ICkge1xuXHRcdFx0XHRcdFx0aWYgKCBldmVudC5vcmlnaW5hbEV2ZW50LnByb3BlcnR5TmFtZSA9PT0gXCJjaGVja2VkXCIgKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2p1c3RfY2hhbmdlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgXCJjbGljay5fY2hhbmdlXCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0XHRcdGlmICggdGhpcy5fanVzdF9jaGFuZ2VkICYmICFldmVudC5pc1RyaWdnZXIgKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2p1c3RfY2hhbmdlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gQWxsb3cgdHJpZ2dlcmVkLCBzaW11bGF0ZWQgY2hhbmdlIGV2ZW50cyAoIzExNTAwKVxuXHRcdFx0XHRcdFx0alF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBcImNoYW5nZVwiLCB0aGlzLCBldmVudCwgdHJ1ZSApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdC8vIERlbGVnYXRlZCBldmVudDsgbGF6eS1hZGQgYSBjaGFuZ2UgaGFuZGxlciBvbiBkZXNjZW5kYW50IGlucHV0c1xuXHRcdFx0alF1ZXJ5LmV2ZW50LmFkZCggdGhpcywgXCJiZWZvcmVhY3RpdmF0ZS5fY2hhbmdlXCIsIGZ1bmN0aW9uKCBlICkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IGUudGFyZ2V0O1xuXG5cdFx0XHRcdGlmICggcmZvcm1FbGVtcy50ZXN0KCBlbGVtLm5vZGVOYW1lICkgJiYgIWpRdWVyeS5fZGF0YSggZWxlbSwgXCJfY2hhbmdlX2F0dGFjaGVkXCIgKSApIHtcblx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuYWRkKCBlbGVtLCBcImNoYW5nZS5fY2hhbmdlXCIsIGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0XHRcdGlmICggdGhpcy5wYXJlbnROb2RlICYmICFldmVudC5pc1NpbXVsYXRlZCAmJiAhZXZlbnQuaXNUcmlnZ2VyICkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuZXZlbnQuc2ltdWxhdGUoIFwiY2hhbmdlXCIsIHRoaXMucGFyZW50Tm9kZSwgZXZlbnQsIHRydWUgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRqUXVlcnkuX2RhdGEoIGVsZW0sIFwiX2NoYW5nZV9hdHRhY2hlZFwiLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRoYW5kbGU6IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdHZhciBlbGVtID0gZXZlbnQudGFyZ2V0O1xuXG5cdFx0XHQvLyBTd2FsbG93IG5hdGl2ZSBjaGFuZ2UgZXZlbnRzIGZyb20gY2hlY2tib3gvcmFkaW8sIHdlIGFscmVhZHkgdHJpZ2dlcmVkIHRoZW0gYWJvdmVcblx0XHRcdGlmICggdGhpcyAhPT0gZWxlbSB8fCBldmVudC5pc1NpbXVsYXRlZCB8fCBldmVudC5pc1RyaWdnZXIgfHwgKGVsZW0udHlwZSAhPT0gXCJyYWRpb1wiICYmIGVsZW0udHlwZSAhPT0gXCJjaGVja2JveFwiKSApIHtcblx0XHRcdFx0cmV0dXJuIGV2ZW50LmhhbmRsZU9iai5oYW5kbGVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0dGVhcmRvd246IGZ1bmN0aW9uKCkge1xuXHRcdFx0alF1ZXJ5LmV2ZW50LnJlbW92ZSggdGhpcywgXCIuX2NoYW5nZVwiICk7XG5cblx0XHRcdHJldHVybiAhcmZvcm1FbGVtcy50ZXN0KCB0aGlzLm5vZGVOYW1lICk7XG5cdFx0fVxuXHR9O1xufVxuXG4vLyBDcmVhdGUgXCJidWJibGluZ1wiIGZvY3VzIGFuZCBibHVyIGV2ZW50c1xuaWYgKCAhalF1ZXJ5LnN1cHBvcnQuZm9jdXNpbkJ1YmJsZXMgKSB7XG5cdGpRdWVyeS5lYWNoKHsgZm9jdXM6IFwiZm9jdXNpblwiLCBibHVyOiBcImZvY3Vzb3V0XCIgfSwgZnVuY3Rpb24oIG9yaWcsIGZpeCApIHtcblxuXHRcdC8vIEF0dGFjaCBhIHNpbmdsZSBjYXB0dXJpbmcgaGFuZGxlciB3aGlsZSBzb21lb25lIHdhbnRzIGZvY3VzaW4vZm9jdXNvdXRcblx0XHR2YXIgYXR0YWNoZXMgPSAwLFxuXHRcdFx0aGFuZGxlciA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0alF1ZXJ5LmV2ZW50LnNpbXVsYXRlKCBmaXgsIGV2ZW50LnRhcmdldCwgalF1ZXJ5LmV2ZW50LmZpeCggZXZlbnQgKSwgdHJ1ZSApO1xuXHRcdFx0fTtcblxuXHRcdGpRdWVyeS5ldmVudC5zcGVjaWFsWyBmaXggXSA9IHtcblx0XHRcdHNldHVwOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCBhdHRhY2hlcysrID09PSAwICkge1xuXHRcdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHRlYXJkb3duOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAtLWF0dGFjaGVzID09PSAwICkge1xuXHRcdFx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIG9yaWcsIGhhbmRsZXIsIHRydWUgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xufVxuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblxuXHRvbjogZnVuY3Rpb24oIHR5cGVzLCBzZWxlY3RvciwgZGF0YSwgZm4sIC8qSU5URVJOQUwqLyBvbmUgKSB7XG5cdFx0dmFyIG9yaWdGbiwgdHlwZTtcblxuXHRcdC8vIFR5cGVzIGNhbiBiZSBhIG1hcCBvZiB0eXBlcy9oYW5kbGVyc1xuXHRcdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0Ly8gKCB0eXBlcy1PYmplY3QsIHNlbGVjdG9yLCBkYXRhIClcblx0XHRcdGlmICggdHlwZW9mIHNlbGVjdG9yICE9PSBcInN0cmluZ1wiICkgeyAvLyAmJiBzZWxlY3RvciAhPSBudWxsXG5cdFx0XHRcdC8vICggdHlwZXMtT2JqZWN0LCBkYXRhIClcblx0XHRcdFx0ZGF0YSA9IGRhdGEgfHwgc2VsZWN0b3I7XG5cdFx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICggdHlwZSBpbiB0eXBlcyApIHtcblx0XHRcdFx0dGhpcy5vbiggdHlwZSwgc2VsZWN0b3IsIGRhdGEsIHR5cGVzWyB0eXBlIF0sIG9uZSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0aWYgKCBkYXRhID09IG51bGwgJiYgZm4gPT0gbnVsbCApIHtcblx0XHRcdC8vICggdHlwZXMsIGZuIClcblx0XHRcdGZuID0gc2VsZWN0b3I7XG5cdFx0XHRkYXRhID0gc2VsZWN0b3IgPSB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIGlmICggZm4gPT0gbnVsbCApIHtcblx0XHRcdGlmICggdHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHQvLyAoIHR5cGVzLCBzZWxlY3RvciwgZm4gKVxuXHRcdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyAoIHR5cGVzLCBkYXRhLCBmbiApXG5cdFx0XHRcdGZuID0gZGF0YTtcblx0XHRcdFx0ZGF0YSA9IHNlbGVjdG9yO1xuXHRcdFx0XHRzZWxlY3RvciA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCBmbiA9PT0gZmFsc2UgKSB7XG5cdFx0XHRmbiA9IHJldHVybkZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoICFmbiApIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdGlmICggb25lID09PSAxICkge1xuXHRcdFx0b3JpZ0ZuID0gZm47XG5cdFx0XHRmbiA9IGZ1bmN0aW9uKCBldmVudCApIHtcblx0XHRcdFx0Ly8gQ2FuIHVzZSBhbiBlbXB0eSBzZXQsIHNpbmNlIGV2ZW50IGNvbnRhaW5zIHRoZSBpbmZvXG5cdFx0XHRcdGpRdWVyeSgpLm9mZiggZXZlbnQgKTtcblx0XHRcdFx0cmV0dXJuIG9yaWdGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0XHR9O1xuXHRcdFx0Ly8gVXNlIHNhbWUgZ3VpZCBzbyBjYWxsZXIgY2FuIHJlbW92ZSB1c2luZyBvcmlnRm5cblx0XHRcdGZuLmd1aWQgPSBvcmlnRm4uZ3VpZCB8fCAoIG9yaWdGbi5ndWlkID0galF1ZXJ5Lmd1aWQrKyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5lYWNoKCBmdW5jdGlvbigpIHtcblx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIHRoaXMsIHR5cGVzLCBmbiwgZGF0YSwgc2VsZWN0b3IgKTtcblx0XHR9KTtcblx0fSxcblx0b25lOiBmdW5jdGlvbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiwgMSApO1xuXHR9LFxuXHRvZmY6IGZ1bmN0aW9uKCB0eXBlcywgc2VsZWN0b3IsIGZuICkge1xuXHRcdHZhciBoYW5kbGVPYmosIHR5cGU7XG5cdFx0aWYgKCB0eXBlcyAmJiB0eXBlcy5wcmV2ZW50RGVmYXVsdCAmJiB0eXBlcy5oYW5kbGVPYmogKSB7XG5cdFx0XHQvLyAoIGV2ZW50ICkgIGRpc3BhdGNoZWQgalF1ZXJ5LkV2ZW50XG5cdFx0XHRoYW5kbGVPYmogPSB0eXBlcy5oYW5kbGVPYmo7XG5cdFx0XHRqUXVlcnkoIHR5cGVzLmRlbGVnYXRlVGFyZ2V0ICkub2ZmKFxuXHRcdFx0XHRoYW5kbGVPYmoubmFtZXNwYWNlID8gaGFuZGxlT2JqLm9yaWdUeXBlICsgXCIuXCIgKyBoYW5kbGVPYmoubmFtZXNwYWNlIDogaGFuZGxlT2JqLm9yaWdUeXBlLFxuXHRcdFx0XHRoYW5kbGVPYmouc2VsZWN0b3IsXG5cdFx0XHRcdGhhbmRsZU9iai5oYW5kbGVyXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggdHlwZW9mIHR5cGVzID09PSBcIm9iamVjdFwiICkge1xuXHRcdFx0Ly8gKCB0eXBlcy1vYmplY3QgWywgc2VsZWN0b3JdIClcblx0XHRcdGZvciAoIHR5cGUgaW4gdHlwZXMgKSB7XG5cdFx0XHRcdHRoaXMub2ZmKCB0eXBlLCBzZWxlY3RvciwgdHlwZXNbIHR5cGUgXSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGlmICggc2VsZWN0b3IgPT09IGZhbHNlIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0Ly8gKCB0eXBlcyBbLCBmbl0gKVxuXHRcdFx0Zm4gPSBzZWxlY3Rvcjtcblx0XHRcdHNlbGVjdG9yID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRpZiAoIGZuID09PSBmYWxzZSApIHtcblx0XHRcdGZuID0gcmV0dXJuRmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQucmVtb3ZlKCB0aGlzLCB0eXBlcywgZm4sIHNlbGVjdG9yICk7XG5cdFx0fSk7XG5cdH0sXG5cblx0YmluZDogZnVuY3Rpb24oIHR5cGVzLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIG51bGwsIGRhdGEsIGZuICk7XG5cdH0sXG5cdHVuYmluZDogZnVuY3Rpb24oIHR5cGVzLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vZmYoIHR5cGVzLCBudWxsLCBmbiApO1xuXHR9LFxuXG5cdGxpdmU6IGZ1bmN0aW9uKCB0eXBlcywgZGF0YSwgZm4gKSB7XG5cdFx0alF1ZXJ5KCB0aGlzLmNvbnRleHQgKS5vbiggdHlwZXMsIHRoaXMuc2VsZWN0b3IsIGRhdGEsIGZuICk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cdGRpZTogZnVuY3Rpb24oIHR5cGVzLCBmbiApIHtcblx0XHRqUXVlcnkoIHRoaXMuY29udGV4dCApLm9mZiggdHlwZXMsIHRoaXMuc2VsZWN0b3IgfHwgXCIqKlwiLCBmbiApO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBkYXRhLCBmbiApIHtcblx0XHRyZXR1cm4gdGhpcy5vbiggdHlwZXMsIHNlbGVjdG9yLCBkYXRhLCBmbiApO1xuXHR9LFxuXHR1bmRlbGVnYXRlOiBmdW5jdGlvbiggc2VsZWN0b3IsIHR5cGVzLCBmbiApIHtcblx0XHQvLyAoIG5hbWVzcGFjZSApIG9yICggc2VsZWN0b3IsIHR5cGVzIFssIGZuXSApXG5cdFx0cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPT0gMT8gdGhpcy5vZmYoIHNlbGVjdG9yLCBcIioqXCIgKSA6IHRoaXMub2ZmKCB0eXBlcywgc2VsZWN0b3IgfHwgXCIqKlwiLCBmbiApO1xuXHR9LFxuXG5cdHRyaWdnZXI6IGZ1bmN0aW9uKCB0eXBlLCBkYXRhICkge1xuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggdHlwZSwgZGF0YSwgdGhpcyApO1xuXHRcdH0pO1xuXHR9LFxuXHR0cmlnZ2VySGFuZGxlcjogZnVuY3Rpb24oIHR5cGUsIGRhdGEgKSB7XG5cdFx0aWYgKCB0aGlzWzBdICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5ldmVudC50cmlnZ2VyKCB0eXBlLCBkYXRhLCB0aGlzWzBdLCB0cnVlICk7XG5cdFx0fVxuXHR9LFxuXG5cdHRvZ2dsZTogZnVuY3Rpb24oIGZuICkge1xuXHRcdC8vIFNhdmUgcmVmZXJlbmNlIHRvIGFyZ3VtZW50cyBmb3IgYWNjZXNzIGluIGNsb3N1cmVcblx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cyxcblx0XHRcdGd1aWQgPSBmbi5ndWlkIHx8IGpRdWVyeS5ndWlkKyssXG5cdFx0XHRpID0gMCxcblx0XHRcdHRvZ2dsZXIgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG5cdFx0XHRcdC8vIEZpZ3VyZSBvdXQgd2hpY2ggZnVuY3Rpb24gdG8gZXhlY3V0ZVxuXHRcdFx0XHR2YXIgbGFzdFRvZ2dsZSA9ICggalF1ZXJ5Ll9kYXRhKCB0aGlzLCBcImxhc3RUb2dnbGVcIiArIGZuLmd1aWQgKSB8fCAwICkgJSBpO1xuXHRcdFx0XHRqUXVlcnkuX2RhdGEoIHRoaXMsIFwibGFzdFRvZ2dsZVwiICsgZm4uZ3VpZCwgbGFzdFRvZ2dsZSArIDEgKTtcblxuXHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBjbGlja3Mgc3RvcFxuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdC8vIGFuZCBleGVjdXRlIHRoZSBmdW5jdGlvblxuXHRcdFx0XHRyZXR1cm4gYXJnc1sgbGFzdFRvZ2dsZSBdLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKSB8fCBmYWxzZTtcblx0XHRcdH07XG5cblx0XHQvLyBsaW5rIGFsbCB0aGUgZnVuY3Rpb25zLCBzbyBhbnkgb2YgdGhlbSBjYW4gdW5iaW5kIHRoaXMgY2xpY2sgaGFuZGxlclxuXHRcdHRvZ2dsZXIuZ3VpZCA9IGd1aWQ7XG5cdFx0d2hpbGUgKCBpIDwgYXJncy5sZW5ndGggKSB7XG5cdFx0XHRhcmdzWyBpKysgXS5ndWlkID0gZ3VpZDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5jbGljayggdG9nZ2xlciApO1xuXHR9LFxuXG5cdGhvdmVyOiBmdW5jdGlvbiggZm5PdmVyLCBmbk91dCApIHtcblx0XHRyZXR1cm4gdGhpcy5tb3VzZWVudGVyKCBmbk92ZXIgKS5tb3VzZWxlYXZlKCBmbk91dCB8fCBmbk92ZXIgKTtcblx0fVxufSk7XG5cbmpRdWVyeS5lYWNoKCAoXCJibHVyIGZvY3VzIGZvY3VzaW4gZm9jdXNvdXQgbG9hZCByZXNpemUgc2Nyb2xsIHVubG9hZCBjbGljayBkYmxjbGljayBcIiArXG5cdFwibW91c2Vkb3duIG1vdXNldXAgbW91c2Vtb3ZlIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZWVudGVyIG1vdXNlbGVhdmUgXCIgK1xuXHRcImNoYW5nZSBzZWxlY3Qgc3VibWl0IGtleWRvd24ga2V5cHJlc3Mga2V5dXAgZXJyb3IgY29udGV4dG1lbnVcIikuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblxuXHQvLyBIYW5kbGUgZXZlbnQgYmluZGluZ1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBkYXRhLCBmbiApIHtcblx0XHRpZiAoIGZuID09IG51bGwgKSB7XG5cdFx0XHRmbiA9IGRhdGE7XG5cdFx0XHRkYXRhID0gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDAgP1xuXHRcdFx0dGhpcy5vbiggbmFtZSwgbnVsbCwgZGF0YSwgZm4gKSA6XG5cdFx0XHR0aGlzLnRyaWdnZXIoIG5hbWUgKTtcblx0fTtcblxuXHRpZiAoIHJrZXlFdmVudC50ZXN0KCBuYW1lICkgKSB7XG5cdFx0alF1ZXJ5LmV2ZW50LmZpeEhvb2tzWyBuYW1lIF0gPSBqUXVlcnkuZXZlbnQua2V5SG9va3M7XG5cdH1cblxuXHRpZiAoIHJtb3VzZUV2ZW50LnRlc3QoIG5hbWUgKSApIHtcblx0XHRqUXVlcnkuZXZlbnQuZml4SG9va3NbIG5hbWUgXSA9IGpRdWVyeS5ldmVudC5tb3VzZUhvb2tzO1xuXHR9XG59KTtcbi8qIVxyXG4gKiBTaXp6bGUgQ1NTIFNlbGVjdG9yIEVuZ2luZVxyXG4gKiAgQ29weXJpZ2h0IDIwMTIgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xyXG4gKiAgUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXHJcbiAqICBodHRwOi8vc2l6emxlanMuY29tL1xyXG4gKi9cclxuKGZ1bmN0aW9uKCB3aW5kb3csIHVuZGVmaW5lZCApIHtcclxuXHJcbnZhciBkaXJydW5zLFxyXG5cdGNhY2hlZHJ1bnMsXHJcblx0YXNzZXJ0R2V0SWROb3ROYW1lLFxyXG5cdEV4cHIsXHJcblx0Z2V0VGV4dCxcclxuXHRpc1hNTCxcclxuXHRjb250YWlucyxcclxuXHRjb21waWxlLFxyXG5cdHNvcnRPcmRlcixcclxuXHRoYXNEdXBsaWNhdGUsXHJcblxyXG5cdGJhc2VIYXNEdXBsaWNhdGUgPSB0cnVlLFxyXG5cdHN0cnVuZGVmaW5lZCA9IFwidW5kZWZpbmVkXCIsXHJcblxyXG5cdGV4cGFuZG8gPSAoIFwic2l6Y2FjaGVcIiArIE1hdGgucmFuZG9tKCkgKS5yZXBsYWNlKCBcIi5cIiwgXCJcIiApLFxyXG5cclxuXHRkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudCxcclxuXHRkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG5cdGRvbmUgPSAwLFxyXG5cdHNsaWNlID0gW10uc2xpY2UsXHJcblx0cHVzaCA9IFtdLnB1c2gsXHJcblxyXG5cdC8vIEF1Z21lbnQgYSBmdW5jdGlvbiBmb3Igc3BlY2lhbCB1c2UgYnkgU2l6emxlXHJcblx0bWFya0Z1bmN0aW9uID0gZnVuY3Rpb24oIGZuLCB2YWx1ZSApIHtcclxuXHRcdGZuWyBleHBhbmRvIF0gPSB2YWx1ZSB8fCB0cnVlO1xyXG5cdFx0cmV0dXJuIGZuO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZUNhY2hlID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgY2FjaGUgPSB7fSxcclxuXHRcdFx0a2V5cyA9IFtdO1xyXG5cclxuXHRcdHJldHVybiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIGtleSwgdmFsdWUgKSB7XHJcblx0XHRcdC8vIE9ubHkga2VlcCB0aGUgbW9zdCByZWNlbnQgZW50cmllc1xyXG5cdFx0XHRpZiAoIGtleXMucHVzaCgga2V5ICkgPiBFeHByLmNhY2hlTGVuZ3RoICkge1xyXG5cdFx0XHRcdGRlbGV0ZSBjYWNoZVsga2V5cy5zaGlmdCgpIF07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAoY2FjaGVbIGtleSBdID0gdmFsdWUpO1xyXG5cdFx0fSwgY2FjaGUgKTtcclxuXHR9LFxyXG5cclxuXHRjbGFzc0NhY2hlID0gY3JlYXRlQ2FjaGUoKSxcclxuXHR0b2tlbkNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcclxuXHRjb21waWxlckNhY2hlID0gY3JlYXRlQ2FjaGUoKSxcclxuXHJcblx0Ly8gUmVnZXhcclxuXHJcblx0Ly8gV2hpdGVzcGFjZSBjaGFyYWN0ZXJzIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtc2VsZWN0b3JzLyN3aGl0ZXNwYWNlXHJcblx0d2hpdGVzcGFjZSA9IFwiW1xcXFx4MjBcXFxcdFxcXFxyXFxcXG5cXFxcZl1cIixcclxuXHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXN5bnRheC8jY2hhcmFjdGVyc1xyXG5cdGNoYXJhY3RlckVuY29kaW5nID0gXCIoPzpcXFxcXFxcXC58Wy1cXFxcd118W15cXFxceDAwLVxcXFx4YTBdKStcIixcclxuXHJcblx0Ly8gTG9vc2VseSBtb2RlbGVkIG9uIENTUyBpZGVudGlmaWVyIGNoYXJhY3RlcnNcclxuXHQvLyBBbiB1bnF1b3RlZCB2YWx1ZSBzaG91bGQgYmUgYSBDU1MgaWRlbnRpZmllciAoaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1zZWxlY3RvcnMvI2F0dHJpYnV0ZS1zZWxlY3RvcnMpXHJcblx0Ly8gUHJvcGVyIHN5bnRheDogaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvc3luZGF0YS5odG1sI3ZhbHVlLWRlZi1pZGVudGlmaWVyXHJcblx0aWRlbnRpZmllciA9IGNoYXJhY3RlckVuY29kaW5nLnJlcGxhY2UoIFwid1wiLCBcIncjXCIgKSxcclxuXHJcblx0Ly8gQWNjZXB0YWJsZSBvcGVyYXRvcnMgaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNhdHRyaWJ1dGUtc2VsZWN0b3JzXHJcblx0b3BlcmF0b3JzID0gXCIoWypeJHwhfl0/PSlcIixcclxuXHRhdHRyaWJ1dGVzID0gXCJcXFxcW1wiICsgd2hpdGVzcGFjZSArIFwiKihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIgKyB3aGl0ZXNwYWNlICtcclxuXHRcdFwiKig/OlwiICsgb3BlcmF0b3JzICsgd2hpdGVzcGFjZSArIFwiKig/OihbJ1xcXCJdKSgoPzpcXFxcXFxcXC58W15cXFxcXFxcXF0pKj8pXFxcXDN8KFwiICsgaWRlbnRpZmllciArIFwiKXwpfClcIiArIHdoaXRlc3BhY2UgKyBcIipcXFxcXVwiLFxyXG5cclxuXHQvLyBQcmVmZXIgYXJndW1lbnRzIG5vdCBpbiBwYXJlbnMvYnJhY2tldHMsXHJcblx0Ly8gICB0aGVuIGF0dHJpYnV0ZSBzZWxlY3RvcnMgYW5kIG5vbi1wc2V1ZG9zIChkZW5vdGVkIGJ5IDopLFxyXG5cdC8vICAgdGhlbiBhbnl0aGluZyBlbHNlXHJcblx0Ly8gVGhlc2UgcHJlZmVyZW5jZXMgYXJlIGhlcmUgdG8gcmVkdWNlIHRoZSBudW1iZXIgb2Ygc2VsZWN0b3JzXHJcblx0Ly8gICBuZWVkaW5nIHRva2VuaXplIGluIHRoZSBQU0VVRE8gcHJlRmlsdGVyXHJcblx0cHNldWRvcyA9IFwiOihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpKD86XFxcXCgoPzooWydcXFwiXSkoKD86XFxcXFxcXFwufFteXFxcXFxcXFxdKSo/KVxcXFwyfChbXigpW1xcXFxdXSp8KD86KD86XCIgKyBhdHRyaWJ1dGVzICsgXCIpfFteOl18XFxcXFxcXFwuKSp8LiopKVxcXFwpfClcIixcclxuXHJcblx0Ly8gRm9yIG1hdGNoRXhwci5QT1MgYW5kIG1hdGNoRXhwci5uZWVkc0NvbnRleHRcclxuXHRwb3MgPSBcIjoobnRofGVxfGd0fGx0fGZpcnN0fGxhc3R8ZXZlbnxvZGQpKD86XFxcXCgoKD86LVxcXFxkKT9cXFxcZCopXFxcXCl8KSg/PVteLV18JClcIixcclxuXHJcblx0Ly8gTGVhZGluZyBhbmQgbm9uLWVzY2FwZWQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgY2FwdHVyaW5nIHNvbWUgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVycyBwcmVjZWRpbmcgdGhlIGxhdHRlclxyXG5cdHJ0cmltID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIrfCgoPzpefFteXFxcXFxcXFxdKSg/OlxcXFxcXFxcLikqKVwiICsgd2hpdGVzcGFjZSArIFwiKyRcIiwgXCJnXCIgKSxcclxuXHJcblx0cmNvbW1hID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqLFwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXHJcblx0cmNvbWJpbmF0b3JzID0gbmV3IFJlZ0V4cCggXCJeXCIgKyB3aGl0ZXNwYWNlICsgXCIqKFtcXFxceDIwXFxcXHRcXFxcclxcXFxuXFxcXGY+K35dKVwiICsgd2hpdGVzcGFjZSArIFwiKlwiICksXHJcblx0cnBzZXVkbyA9IG5ldyBSZWdFeHAoIHBzZXVkb3MgKSxcclxuXHJcblx0Ly8gRWFzaWx5LXBhcnNlYWJsZS9yZXRyaWV2YWJsZSBJRCBvciBUQUcgb3IgQ0xBU1Mgc2VsZWN0b3JzXHJcblx0cnF1aWNrRXhwciA9IC9eKD86IyhbXFx3XFwtXSspfChcXHcrKXxcXC4oW1xcd1xcLV0rKSkkLyxcclxuXHJcblx0cm5vdCA9IC9eOm5vdC8sXHJcblx0cnNpYmxpbmcgPSAvW1xceDIwXFx0XFxyXFxuXFxmXSpbK35dLyxcclxuXHRyZW5kc1dpdGhOb3QgPSAvOm5vdFxcKCQvLFxyXG5cclxuXHRyaGVhZGVyID0gL2hcXGQvaSxcclxuXHRyaW5wdXRzID0gL2lucHV0fHNlbGVjdHx0ZXh0YXJlYXxidXR0b24vaSxcclxuXHJcblx0cmJhY2tzbGFzaCA9IC9cXFxcKD8hXFxcXCkvZyxcclxuXHJcblx0bWF0Y2hFeHByID0ge1xyXG5cdFx0XCJJRFwiOiBuZXcgUmVnRXhwKCBcIl4jKFwiICsgY2hhcmFjdGVyRW5jb2RpbmcgKyBcIilcIiApLFxyXG5cdFx0XCJDTEFTU1wiOiBuZXcgUmVnRXhwKCBcIl5cXFxcLihcIiArIGNoYXJhY3RlckVuY29kaW5nICsgXCIpXCIgKSxcclxuXHRcdFwiTkFNRVwiOiBuZXcgUmVnRXhwKCBcIl5cXFxcW25hbWU9WydcXFwiXT8oXCIgKyBjaGFyYWN0ZXJFbmNvZGluZyArIFwiKVsnXFxcIl0/XFxcXF1cIiApLFxyXG5cdFx0XCJUQUdcIjogbmV3IFJlZ0V4cCggXCJeKFwiICsgY2hhcmFjdGVyRW5jb2RpbmcucmVwbGFjZSggXCJ3XCIsIFwidypcIiApICsgXCIpXCIgKSxcclxuXHRcdFwiQVRUUlwiOiBuZXcgUmVnRXhwKCBcIl5cIiArIGF0dHJpYnV0ZXMgKSxcclxuXHRcdFwiUFNFVURPXCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgcHNldWRvcyApLFxyXG5cdFx0XCJDSElMRFwiOiBuZXcgUmVnRXhwKCBcIl46KG9ubHl8bnRofGxhc3R8Zmlyc3QpLWNoaWxkKD86XFxcXChcIiArIHdoaXRlc3BhY2UgK1xyXG5cdFx0XHRcIiooZXZlbnxvZGR8KChbKy1dfCkoXFxcXGQqKW58KVwiICsgd2hpdGVzcGFjZSArIFwiKig/OihbKy1dfClcIiArIHdoaXRlc3BhY2UgK1xyXG5cdFx0XHRcIiooXFxcXGQrKXwpKVwiICsgd2hpdGVzcGFjZSArIFwiKlxcXFwpfClcIiwgXCJpXCIgKSxcclxuXHRcdFwiUE9TXCI6IG5ldyBSZWdFeHAoIHBvcywgXCJpZ1wiICksXHJcblx0XHQvLyBGb3IgdXNlIGluIGxpYnJhcmllcyBpbXBsZW1lbnRpbmcgLmlzKClcclxuXHRcdFwibmVlZHNDb250ZXh0XCI6IG5ldyBSZWdFeHAoIFwiXlwiICsgd2hpdGVzcGFjZSArIFwiKls+K35dfFwiICsgcG9zLCBcImlcIiApXHJcblx0fSxcclxuXHJcblx0Ly8gU3VwcG9ydFxyXG5cclxuXHQvLyBVc2VkIGZvciB0ZXN0aW5nIHNvbWV0aGluZyBvbiBhbiBlbGVtZW50XHJcblx0YXNzZXJ0ID0gZnVuY3Rpb24oIGZuICkge1xyXG5cdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cmV0dXJuIGZuKCBkaXYgKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fSBmaW5hbGx5IHtcclxuXHRcdFx0Ly8gcmVsZWFzZSBtZW1vcnkgaW4gSUVcclxuXHRcdFx0ZGl2ID0gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50c0J5VGFnTmFtZShcIipcIikgcmV0dXJucyBvbmx5IGVsZW1lbnRzXHJcblx0YXNzZXJ0VGFnTmFtZU5vQ29tbWVudHMgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcclxuXHRcdGRpdi5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlQ29tbWVudChcIlwiKSApO1xyXG5cdFx0cmV0dXJuICFkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpLmxlbmd0aDtcclxuXHR9KSxcclxuXHJcblx0Ly8gQ2hlY2sgaWYgZ2V0QXR0cmlidXRlIHJldHVybnMgbm9ybWFsaXplZCBocmVmIGF0dHJpYnV0ZXNcclxuXHRhc3NlcnRIcmVmTm90Tm9ybWFsaXplZCA9IGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xyXG5cdFx0ZGl2LmlubmVySFRNTCA9IFwiPGEgaHJlZj0nIyc+PC9hPlwiO1xyXG5cdFx0cmV0dXJuIGRpdi5maXJzdENoaWxkICYmIHR5cGVvZiBkaXYuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUgIT09IHN0cnVuZGVmaW5lZCAmJlxyXG5cdFx0XHRkaXYuZmlyc3RDaGlsZC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIiNcIjtcclxuXHR9KSxcclxuXHJcblx0Ly8gQ2hlY2sgaWYgYXR0cmlidXRlcyBzaG91bGQgYmUgcmV0cmlldmVkIGJ5IGF0dHJpYnV0ZSBub2Rlc1xyXG5cdGFzc2VydEF0dHJpYnV0ZXMgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcclxuXHRcdGRpdi5pbm5lckhUTUwgPSBcIjxzZWxlY3Q+PC9zZWxlY3Q+XCI7XHJcblx0XHR2YXIgdHlwZSA9IHR5cGVvZiBkaXYubGFzdENoaWxkLmdldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIpO1xyXG5cdFx0Ly8gSUU4IHJldHVybnMgYSBzdHJpbmcgZm9yIHNvbWUgYXR0cmlidXRlcyBldmVuIHdoZW4gbm90IHByZXNlbnRcclxuXHRcdHJldHVybiB0eXBlICE9PSBcImJvb2xlYW5cIiAmJiB0eXBlICE9PSBcInN0cmluZ1wiO1xyXG5cdH0pLFxyXG5cclxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIGNhbiBiZSB0cnVzdGVkXHJcblx0YXNzZXJ0VXNhYmxlQ2xhc3NOYW1lID0gYXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XHJcblx0XHQvLyBPcGVyYSBjYW4ndCBmaW5kIGEgc2Vjb25kIGNsYXNzbmFtZSAoaW4gOS42KVxyXG5cdFx0ZGl2LmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0naGlkZGVuIGUnPjwvZGl2PjxkaXYgY2xhc3M9J2hpZGRlbic+PC9kaXY+XCI7XHJcblx0XHRpZiAoICFkaXYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSB8fCAhZGl2LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlXCIpLmxlbmd0aCApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFNhZmFyaSAzLjIgY2FjaGVzIGNsYXNzIGF0dHJpYnV0ZXMgYW5kIGRvZXNuJ3QgY2F0Y2ggY2hhbmdlc1xyXG5cdFx0ZGl2Lmxhc3RDaGlsZC5jbGFzc05hbWUgPSBcImVcIjtcclxuXHRcdHJldHVybiBkaXYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVcIikubGVuZ3RoID09PSAyO1xyXG5cdH0pLFxyXG5cclxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50QnlJZCByZXR1cm5zIGVsZW1lbnRzIGJ5IG5hbWVcclxuXHQvLyBDaGVjayBpZiBnZXRFbGVtZW50c0J5TmFtZSBwcml2aWxlZ2VzIGZvcm0gY29udHJvbHMgb3IgcmV0dXJucyBlbGVtZW50cyBieSBJRFxyXG5cdGFzc2VydFVzYWJsZU5hbWUgPSBhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcclxuXHRcdC8vIEluamVjdCBjb250ZW50XHJcblx0XHRkaXYuaWQgPSBleHBhbmRvICsgMDtcclxuXHRcdGRpdi5pbm5lckhUTUwgPSBcIjxhIG5hbWU9J1wiICsgZXhwYW5kbyArIFwiJz48L2E+PGRpdiBuYW1lPSdcIiArIGV4cGFuZG8gKyBcIic+PC9kaXY+XCI7XHJcblx0XHRkb2NFbGVtLmluc2VydEJlZm9yZSggZGl2LCBkb2NFbGVtLmZpcnN0Q2hpbGQgKTtcclxuXHJcblx0XHQvLyBUZXN0XHJcblx0XHR2YXIgcGFzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lICYmXHJcblx0XHRcdC8vIGJ1Z2d5IGJyb3dzZXJzIHdpbGwgcmV0dXJuIGZld2VyIHRoYW4gdGhlIGNvcnJlY3QgMlxyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSggZXhwYW5kbyApLmxlbmd0aCA9PT0gMiArXHJcblx0XHRcdC8vIGJ1Z2d5IGJyb3dzZXJzIHdpbGwgcmV0dXJuIG1vcmUgdGhhbiB0aGUgY29ycmVjdCAwXHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKCBleHBhbmRvICsgMCApLmxlbmd0aDtcclxuXHRcdGFzc2VydEdldElkTm90TmFtZSA9ICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggZXhwYW5kbyApO1xyXG5cclxuXHRcdC8vIENsZWFudXBcclxuXHRcdGRvY0VsZW0ucmVtb3ZlQ2hpbGQoIGRpdiApO1xyXG5cclxuXHRcdHJldHVybiBwYXNzO1xyXG5cdH0pO1xyXG5cclxuLy8gSWYgc2xpY2UgaXMgbm90IGF2YWlsYWJsZSwgcHJvdmlkZSBhIGJhY2t1cFxyXG50cnkge1xyXG5cdHNsaWNlLmNhbGwoIGRvY0VsZW0uY2hpbGROb2RlcywgMCApWzBdLm5vZGVUeXBlO1xyXG59IGNhdGNoICggZSApIHtcclxuXHRzbGljZSA9IGZ1bmN0aW9uKCBpICkge1xyXG5cdFx0dmFyIGVsZW0sIHJlc3VsdHMgPSBbXTtcclxuXHRcdGZvciAoIDsgKGVsZW0gPSB0aGlzW2ldKTsgaSsrICkge1xyXG5cdFx0XHRyZXN1bHRzLnB1c2goIGVsZW0gKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKSB7XHJcblx0cmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XHJcblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XHJcblx0dmFyIG1hdGNoLCBlbGVtLCB4bWwsIG0sXHJcblx0XHRub2RlVHlwZSA9IGNvbnRleHQubm9kZVR5cGU7XHJcblxyXG5cdGlmICggbm9kZVR5cGUgIT09IDEgJiYgbm9kZVR5cGUgIT09IDkgKSB7XHJcblx0XHRyZXR1cm4gW107XHJcblx0fVxyXG5cclxuXHRpZiAoICFzZWxlY3RvciB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XHJcblx0XHRyZXR1cm4gcmVzdWx0cztcclxuXHR9XHJcblxyXG5cdHhtbCA9IGlzWE1MKCBjb250ZXh0ICk7XHJcblxyXG5cdGlmICggIXhtbCAmJiAhc2VlZCApIHtcclxuXHRcdGlmICggKG1hdGNoID0gcnF1aWNrRXhwci5leGVjKCBzZWxlY3RvciApKSApIHtcclxuXHRcdFx0Ly8gU3BlZWQtdXA6IFNpenpsZShcIiNJRFwiKVxyXG5cdFx0XHRpZiAoIChtID0gbWF0Y2hbMV0pICkge1xyXG5cdFx0XHRcdGlmICggbm9kZVR5cGUgPT09IDkgKSB7XHJcblx0XHRcdFx0XHRlbGVtID0gY29udGV4dC5nZXRFbGVtZW50QnlJZCggbSApO1xyXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgcGFyZW50Tm9kZSB0byBjYXRjaCB3aGVuIEJsYWNrYmVycnkgNC42IHJldHVybnNcclxuXHRcdFx0XHRcdC8vIG5vZGVzIHRoYXQgYXJlIG5vIGxvbmdlciBpbiB0aGUgZG9jdW1lbnQgIzY5NjNcclxuXHRcdFx0XHRcdGlmICggZWxlbSAmJiBlbGVtLnBhcmVudE5vZGUgKSB7XHJcblx0XHRcdFx0XHRcdC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSBJRSwgT3BlcmEsIGFuZCBXZWJraXQgcmV0dXJuIGl0ZW1zXHJcblx0XHRcdFx0XHRcdC8vIGJ5IG5hbWUgaW5zdGVhZCBvZiBJRFxyXG5cdFx0XHRcdFx0XHRpZiAoIGVsZW0uaWQgPT09IG0gKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBDb250ZXh0IGlzIG5vdCBhIGRvY3VtZW50XHJcblx0XHRcdFx0XHRpZiAoIGNvbnRleHQub3duZXJEb2N1bWVudCAmJiAoZWxlbSA9IGNvbnRleHQub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZCggbSApKSAmJlxyXG5cdFx0XHRcdFx0XHRjb250YWlucyggY29udGV4dCwgZWxlbSApICYmIGVsZW0uaWQgPT09IG0gKSB7XHJcblx0XHRcdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbSApO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTcGVlZC11cDogU2l6emxlKFwiVEFHXCIpXHJcblx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWzJdICkge1xyXG5cdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNsaWNlLmNhbGwoY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSggc2VsZWN0b3IgKSwgMCkgKTtcclxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0cztcclxuXHJcblx0XHRcdC8vIFNwZWVkLXVwOiBTaXp6bGUoXCIuQ0xBU1NcIilcclxuXHRcdFx0fSBlbHNlIGlmICggKG0gPSBtYXRjaFszXSkgJiYgYXNzZXJ0VXNhYmxlQ2xhc3NOYW1lICYmIGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSApIHtcclxuXHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzbGljZS5jYWxsKGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSggbSApLCAwKSApO1xyXG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBBbGwgb3RoZXJzXHJcblx0cmV0dXJuIHNlbGVjdCggc2VsZWN0b3IsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQsIHhtbCApO1xyXG59XHJcblxyXG5TaXp6bGUubWF0Y2hlcyA9IGZ1bmN0aW9uKCBleHByLCBlbGVtZW50cyApIHtcclxuXHRyZXR1cm4gU2l6emxlKCBleHByLCBudWxsLCBudWxsLCBlbGVtZW50cyApO1xyXG59O1xyXG5cclxuU2l6emxlLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uKCBlbGVtLCBleHByICkge1xyXG5cdHJldHVybiBTaXp6bGUoIGV4cHIsIG51bGwsIG51bGwsIFsgZWxlbSBdICkubGVuZ3RoID4gMDtcclxufTtcclxuXHJcbi8vIFJldHVybnMgYSBmdW5jdGlvbiB0byB1c2UgaW4gcHNldWRvcyBmb3IgaW5wdXQgdHlwZXNcclxuZnVuY3Rpb24gY3JlYXRlSW5wdXRQc2V1ZG8oIHR5cGUgKSB7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRyZXR1cm4gbmFtZSA9PT0gXCJpbnB1dFwiICYmIGVsZW0udHlwZSA9PT0gdHlwZTtcclxuXHR9O1xyXG59XHJcblxyXG4vLyBSZXR1cm5zIGEgZnVuY3Rpb24gdG8gdXNlIGluIHBzZXVkb3MgZm9yIGJ1dHRvbnNcclxuZnVuY3Rpb24gY3JlYXRlQnV0dG9uUHNldWRvKCB0eXBlICkge1xyXG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdHZhciBuYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0cmV0dXJuIChuYW1lID09PSBcImlucHV0XCIgfHwgbmFtZSA9PT0gXCJidXR0b25cIikgJiYgZWxlbS50eXBlID09PSB0eXBlO1xyXG5cdH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIGZvciByZXRyaWV2aW5nIHRoZSB0ZXh0IHZhbHVlIG9mIGFuIGFycmF5IG9mIERPTSBub2Rlc1xyXG4gKiBAcGFyYW0ge0FycmF5fEVsZW1lbnR9IGVsZW1cclxuICovXHJcbmdldFRleHQgPSBTaXp6bGUuZ2V0VGV4dCA9IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdHZhciBub2RlLFxyXG5cdFx0cmV0ID0gXCJcIixcclxuXHRcdGkgPSAwLFxyXG5cdFx0bm9kZVR5cGUgPSBlbGVtLm5vZGVUeXBlO1xyXG5cclxuXHRpZiAoIG5vZGVUeXBlICkge1xyXG5cdFx0aWYgKCBub2RlVHlwZSA9PT0gMSB8fCBub2RlVHlwZSA9PT0gOSB8fCBub2RlVHlwZSA9PT0gMTEgKSB7XHJcblx0XHRcdC8vIFVzZSB0ZXh0Q29udGVudCBmb3IgZWxlbWVudHNcclxuXHRcdFx0Ly8gaW5uZXJUZXh0IHVzYWdlIHJlbW92ZWQgZm9yIGNvbnNpc3RlbmN5IG9mIG5ldyBsaW5lcyAoc2VlICMxMTE1MylcclxuXHRcdFx0aWYgKCB0eXBlb2YgZWxlbS50ZXh0Q29udGVudCA9PT0gXCJzdHJpbmdcIiApIHtcclxuXHRcdFx0XHRyZXR1cm4gZWxlbS50ZXh0Q29udGVudDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBUcmF2ZXJzZSBpdHMgY2hpbGRyZW5cclxuXHRcdFx0XHRmb3IgKCBlbGVtID0gZWxlbS5maXJzdENoaWxkOyBlbGVtOyBlbGVtID0gZWxlbS5uZXh0U2libGluZyApIHtcclxuXHRcdFx0XHRcdHJldCArPSBnZXRUZXh0KCBlbGVtICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKCBub2RlVHlwZSA9PT0gMyB8fCBub2RlVHlwZSA9PT0gNCApIHtcclxuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZVZhbHVlO1xyXG5cdFx0fVxyXG5cdFx0Ly8gRG8gbm90IGluY2x1ZGUgY29tbWVudCBvciBwcm9jZXNzaW5nIGluc3RydWN0aW9uIG5vZGVzXHJcblx0fSBlbHNlIHtcclxuXHJcblx0XHQvLyBJZiBubyBub2RlVHlwZSwgdGhpcyBpcyBleHBlY3RlZCB0byBiZSBhbiBhcnJheVxyXG5cdFx0Zm9yICggOyAobm9kZSA9IGVsZW1baV0pOyBpKysgKSB7XHJcblx0XHRcdC8vIERvIG5vdCB0cmF2ZXJzZSBjb21tZW50IG5vZGVzXHJcblx0XHRcdHJldCArPSBnZXRUZXh0KCBub2RlICk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5pc1hNTCA9IFNpenpsZS5pc1hNTCA9IGZ1bmN0aW9uIGlzWE1MKCBlbGVtICkge1xyXG5cdC8vIGRvY3VtZW50RWxlbWVudCBpcyB2ZXJpZmllZCBmb3IgY2FzZXMgd2hlcmUgaXQgZG9lc24ndCB5ZXQgZXhpc3RcclxuXHQvLyAoc3VjaCBhcyBsb2FkaW5nIGlmcmFtZXMgaW4gSUUgLSAjNDgzMylcclxuXHR2YXIgZG9jdW1lbnRFbGVtZW50ID0gZWxlbSAmJiAoZWxlbS5vd25lckRvY3VtZW50IHx8IGVsZW0pLmRvY3VtZW50RWxlbWVudDtcclxuXHRyZXR1cm4gZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIiA6IGZhbHNlO1xyXG59O1xyXG5cclxuLy8gRWxlbWVudCBjb250YWlucyBhbm90aGVyXHJcbmNvbnRhaW5zID0gU2l6emxlLmNvbnRhaW5zID0gZG9jRWxlbS5jb250YWlucyA/XHJcblx0ZnVuY3Rpb24oIGEsIGIgKSB7XHJcblx0XHR2YXIgYWRvd24gPSBhLm5vZGVUeXBlID09PSA5ID8gYS5kb2N1bWVudEVsZW1lbnQgOiBhLFxyXG5cdFx0XHRidXAgPSBiICYmIGIucGFyZW50Tm9kZTtcclxuXHRcdHJldHVybiBhID09PSBidXAgfHwgISEoIGJ1cCAmJiBidXAubm9kZVR5cGUgPT09IDEgJiYgYWRvd24uY29udGFpbnMgJiYgYWRvd24uY29udGFpbnMoYnVwKSApO1xyXG5cdH0gOlxyXG5cdGRvY0VsZW0uY29tcGFyZURvY3VtZW50UG9zaXRpb24gP1xyXG5cdGZ1bmN0aW9uKCBhLCBiICkge1xyXG5cdFx0cmV0dXJuIGIgJiYgISEoIGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oIGIgKSAmIDE2ICk7XHJcblx0fSA6XHJcblx0ZnVuY3Rpb24oIGEsIGIgKSB7XHJcblx0XHR3aGlsZSAoIChiID0gYi5wYXJlbnROb2RlKSApIHtcclxuXHRcdFx0aWYgKCBiID09PSBhICkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fTtcclxuXHJcblNpenpsZS5hdHRyID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XHJcblx0dmFyIGF0dHIsXHJcblx0XHR4bWwgPSBpc1hNTCggZWxlbSApO1xyXG5cclxuXHRpZiAoICF4bWwgKSB7XHJcblx0XHRuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdH1cclxuXHRpZiAoIEV4cHIuYXR0ckhhbmRsZVsgbmFtZSBdICkge1xyXG5cdFx0cmV0dXJuIEV4cHIuYXR0ckhhbmRsZVsgbmFtZSBdKCBlbGVtICk7XHJcblx0fVxyXG5cdGlmICggYXNzZXJ0QXR0cmlidXRlcyB8fCB4bWwgKSB7XHJcblx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoIG5hbWUgKTtcclxuXHR9XHJcblx0YXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlTm9kZSggbmFtZSApO1xyXG5cdHJldHVybiBhdHRyID9cclxuXHRcdHR5cGVvZiBlbGVtWyBuYW1lIF0gPT09IFwiYm9vbGVhblwiID9cclxuXHRcdFx0ZWxlbVsgbmFtZSBdID8gbmFtZSA6IG51bGwgOlxyXG5cdFx0XHRhdHRyLnNwZWNpZmllZCA/IGF0dHIudmFsdWUgOiBudWxsIDpcclxuXHRcdG51bGw7XHJcbn07XHJcblxyXG5FeHByID0gU2l6emxlLnNlbGVjdG9ycyA9IHtcclxuXHJcblx0Ly8gQ2FuIGJlIGFkanVzdGVkIGJ5IHRoZSB1c2VyXHJcblx0Y2FjaGVMZW5ndGg6IDUwLFxyXG5cclxuXHRjcmVhdGVQc2V1ZG86IG1hcmtGdW5jdGlvbixcclxuXHJcblx0bWF0Y2g6IG1hdGNoRXhwcixcclxuXHJcblx0b3JkZXI6IG5ldyBSZWdFeHAoIFwiSUR8VEFHXCIgK1xyXG5cdFx0KGFzc2VydFVzYWJsZU5hbWUgPyBcInxOQU1FXCIgOiBcIlwiKSArXHJcblx0XHQoYXNzZXJ0VXNhYmxlQ2xhc3NOYW1lID8gXCJ8Q0xBU1NcIiA6IFwiXCIpXHJcblx0KSxcclxuXHJcblx0Ly8gSUU2LzcgcmV0dXJuIGEgbW9kaWZpZWQgaHJlZlxyXG5cdGF0dHJIYW5kbGU6IGFzc2VydEhyZWZOb3ROb3JtYWxpemVkID9cclxuXHRcdHt9IDpcclxuXHRcdHtcclxuXHRcdFx0XCJocmVmXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZSggXCJocmVmXCIsIDIgKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0XCJ0eXBlXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHRcdHJldHVybiBlbGVtLmdldEF0dHJpYnV0ZShcInR5cGVcIik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdGZpbmQ6IHtcclxuXHRcdFwiSURcIjogYXNzZXJ0R2V0SWROb3ROYW1lID9cclxuXHRcdFx0ZnVuY3Rpb24oIGlkLCBjb250ZXh0LCB4bWwgKSB7XHJcblx0XHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gc3RydW5kZWZpbmVkICYmICF4bWwgKSB7XHJcblx0XHRcdFx0XHR2YXIgbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XHJcblx0XHRcdFx0XHQvLyBDaGVjayBwYXJlbnROb2RlIHRvIGNhdGNoIHdoZW4gQmxhY2tiZXJyeSA0LjYgcmV0dXJuc1xyXG5cdFx0XHRcdFx0Ly8gbm9kZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIGluIHRoZSBkb2N1bWVudCAjNjk2M1xyXG5cdFx0XHRcdFx0cmV0dXJuIG0gJiYgbS5wYXJlbnROb2RlID8gW21dIDogW107XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IDpcclxuXHRcdFx0ZnVuY3Rpb24oIGlkLCBjb250ZXh0LCB4bWwgKSB7XHJcblx0XHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50QnlJZCAhPT0gc3RydW5kZWZpbmVkICYmICF4bWwgKSB7XHJcblx0XHRcdFx0XHR2YXIgbSA9IGNvbnRleHQuZ2V0RWxlbWVudEJ5SWQoIGlkICk7XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIG0gP1xyXG5cdFx0XHRcdFx0XHRtLmlkID09PSBpZCB8fCB0eXBlb2YgbS5nZXRBdHRyaWJ1dGVOb2RlICE9PSBzdHJ1bmRlZmluZWQgJiYgbS5nZXRBdHRyaWJ1dGVOb2RlKFwiaWRcIikudmFsdWUgPT09IGlkID9cclxuXHRcdFx0XHRcdFx0XHRbbV0gOlxyXG5cdFx0XHRcdFx0XHRcdHVuZGVmaW5lZCA6XHJcblx0XHRcdFx0XHRcdFtdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHJcblx0XHRcIlRBR1wiOiBhc3NlcnRUYWdOYW1lTm9Db21tZW50cyA/XHJcblx0XHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XHJcblx0XHRcdFx0aWYgKCB0eXBlb2YgY29udGV4dC5nZXRFbGVtZW50c0J5VGFnTmFtZSAhPT0gc3RydW5kZWZpbmVkICkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSA6XHJcblx0XHRcdGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XHJcblx0XHRcdFx0dmFyIHJlc3VsdHMgPSBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCB0YWcgKTtcclxuXHJcblx0XHRcdFx0Ly8gRmlsdGVyIG91dCBwb3NzaWJsZSBjb21tZW50c1xyXG5cdFx0XHRcdGlmICggdGFnID09PSBcIipcIiApIHtcclxuXHRcdFx0XHRcdHZhciBlbGVtLFxyXG5cdFx0XHRcdFx0XHR0bXAgPSBbXSxcclxuXHRcdFx0XHRcdFx0aSA9IDA7XHJcblxyXG5cdFx0XHRcdFx0Zm9yICggOyAoZWxlbSA9IHJlc3VsdHNbaV0pOyBpKysgKSB7XHJcblx0XHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcclxuXHRcdFx0XHRcdFx0XHR0bXAucHVzaCggZWxlbSApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHRtcDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHJlc3VsdHM7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XCJOQU1FXCI6IGZ1bmN0aW9uKCB0YWcsIGNvbnRleHQgKSB7XHJcblx0XHRcdGlmICggdHlwZW9mIGNvbnRleHQuZ2V0RWxlbWVudHNCeU5hbWUgIT09IHN0cnVuZGVmaW5lZCApIHtcclxuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5nZXRFbGVtZW50c0J5TmFtZSggbmFtZSApO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdFwiQ0xBU1NcIjogZnVuY3Rpb24oIGNsYXNzTmFtZSwgY29udGV4dCwgeG1sICkge1xyXG5cdFx0XHRpZiAoIHR5cGVvZiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUgIT09IHN0cnVuZGVmaW5lZCAmJiAheG1sICkge1xyXG5cdFx0XHRcdHJldHVybiBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoIGNsYXNzTmFtZSApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVsYXRpdmU6IHtcclxuXHRcdFwiPlwiOiB7IGRpcjogXCJwYXJlbnROb2RlXCIsIGZpcnN0OiB0cnVlIH0sXHJcblx0XHRcIiBcIjogeyBkaXI6IFwicGFyZW50Tm9kZVwiIH0sXHJcblx0XHRcIitcIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIsIGZpcnN0OiB0cnVlIH0sXHJcblx0XHRcIn5cIjogeyBkaXI6IFwicHJldmlvdXNTaWJsaW5nXCIgfVxyXG5cdH0sXHJcblxyXG5cdHByZUZpbHRlcjoge1xyXG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBtYXRjaCApIHtcclxuXHRcdFx0bWF0Y2hbMV0gPSBtYXRjaFsxXS5yZXBsYWNlKCByYmFja3NsYXNoLCBcIlwiICk7XHJcblxyXG5cdFx0XHQvLyBNb3ZlIHRoZSBnaXZlbiB2YWx1ZSB0byBtYXRjaFszXSB3aGV0aGVyIHF1b3RlZCBvciB1bnF1b3RlZFxyXG5cdFx0XHRtYXRjaFszXSA9ICggbWF0Y2hbNF0gfHwgbWF0Y2hbNV0gfHwgXCJcIiApLnJlcGxhY2UoIHJiYWNrc2xhc2gsIFwiXCIgKTtcclxuXHJcblx0XHRcdGlmICggbWF0Y2hbMl0gPT09IFwifj1cIiApIHtcclxuXHRcdFx0XHRtYXRjaFszXSA9IFwiIFwiICsgbWF0Y2hbM10gKyBcIiBcIjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCA0ICk7XHJcblx0XHR9LFxyXG5cclxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIG1hdGNoICkge1xyXG5cdFx0XHQvKiBtYXRjaGVzIGZyb20gbWF0Y2hFeHByLkNISUxEXHJcblx0XHRcdFx0MSB0eXBlIChvbmx5fG50aHwuLi4pXHJcblx0XHRcdFx0MiBhcmd1bWVudCAoZXZlbnxvZGR8XFxkKnxcXGQqbihbKy1dXFxkKyk/fC4uLilcclxuXHRcdFx0XHQzIHhuLWNvbXBvbmVudCBvZiB4bit5IGFyZ3VtZW50IChbKy1dP1xcZCpufClcclxuXHRcdFx0XHQ0IHNpZ24gb2YgeG4tY29tcG9uZW50XHJcblx0XHRcdFx0NSB4IG9mIHhuLWNvbXBvbmVudFxyXG5cdFx0XHRcdDYgc2lnbiBvZiB5LWNvbXBvbmVudFxyXG5cdFx0XHRcdDcgeSBvZiB5LWNvbXBvbmVudFxyXG5cdFx0XHQqL1xyXG5cdFx0XHRtYXRjaFsxXSA9IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0XHRpZiAoIG1hdGNoWzFdID09PSBcIm50aFwiICkge1xyXG5cdFx0XHRcdC8vIG50aC1jaGlsZCByZXF1aXJlcyBhcmd1bWVudFxyXG5cdFx0XHRcdGlmICggIW1hdGNoWzJdICkge1xyXG5cdFx0XHRcdFx0U2l6emxlLmVycm9yKCBtYXRjaFswXSApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gbnVtZXJpYyB4IGFuZCB5IHBhcmFtZXRlcnMgZm9yIEV4cHIuZmlsdGVyLkNISUxEXHJcblx0XHRcdFx0Ly8gcmVtZW1iZXIgdGhhdCBmYWxzZS90cnVlIGNhc3QgcmVzcGVjdGl2ZWx5IHRvIDAvMVxyXG5cdFx0XHRcdG1hdGNoWzNdID0gKyggbWF0Y2hbM10gPyBtYXRjaFs0XSArIChtYXRjaFs1XSB8fCAxKSA6IDIgKiAoIG1hdGNoWzJdID09PSBcImV2ZW5cIiB8fCBtYXRjaFsyXSA9PT0gXCJvZGRcIiApICk7XHJcblx0XHRcdFx0bWF0Y2hbNF0gPSArKCAoIG1hdGNoWzZdICsgbWF0Y2hbN10gKSB8fCBtYXRjaFsyXSA9PT0gXCJvZGRcIiApO1xyXG5cclxuXHRcdFx0Ly8gb3RoZXIgdHlwZXMgcHJvaGliaXQgYXJndW1lbnRzXHJcblx0XHRcdH0gZWxzZSBpZiAoIG1hdGNoWzJdICkge1xyXG5cdFx0XHRcdFNpenpsZS5lcnJvciggbWF0Y2hbMF0gKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG1hdGNoO1xyXG5cdFx0fSxcclxuXHJcblx0XHRcIlBTRVVET1wiOiBmdW5jdGlvbiggbWF0Y2gsIGNvbnRleHQsIHhtbCApIHtcclxuXHRcdFx0dmFyIHVucXVvdGVkLCBleGNlc3M7XHJcblx0XHRcdGlmICggbWF0Y2hFeHByW1wiQ0hJTERcIl0udGVzdCggbWF0Y2hbMF0gKSApIHtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBtYXRjaFszXSApIHtcclxuXHRcdFx0XHRtYXRjaFsyXSA9IG1hdGNoWzNdO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCAodW5xdW90ZWQgPSBtYXRjaFs0XSkgKSB7XHJcblx0XHRcdFx0Ly8gT25seSBjaGVjayBhcmd1bWVudHMgdGhhdCBjb250YWluIGEgcHNldWRvXHJcblx0XHRcdFx0aWYgKCBycHNldWRvLnRlc3QodW5xdW90ZWQpICYmXHJcblx0XHRcdFx0XHQvLyBHZXQgZXhjZXNzIGZyb20gdG9rZW5pemUgKHJlY3Vyc2l2ZWx5KVxyXG5cdFx0XHRcdFx0KGV4Y2VzcyA9IHRva2VuaXplKCB1bnF1b3RlZCwgY29udGV4dCwgeG1sLCB0cnVlICkpICYmXHJcblx0XHRcdFx0XHQvLyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNsb3NpbmcgcGFyZW50aGVzaXNcclxuXHRcdFx0XHRcdChleGNlc3MgPSB1bnF1b3RlZC5pbmRleE9mKCBcIilcIiwgdW5xdW90ZWQubGVuZ3RoIC0gZXhjZXNzICkgLSB1bnF1b3RlZC5sZW5ndGgpICkge1xyXG5cclxuXHRcdFx0XHRcdC8vIGV4Y2VzcyBpcyBhIG5lZ2F0aXZlIGluZGV4XHJcblx0XHRcdFx0XHR1bnF1b3RlZCA9IHVucXVvdGVkLnNsaWNlKCAwLCBleGNlc3MgKTtcclxuXHRcdFx0XHRcdG1hdGNoWzBdID0gbWF0Y2hbMF0uc2xpY2UoIDAsIGV4Y2VzcyApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRtYXRjaFsyXSA9IHVucXVvdGVkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZXR1cm4gb25seSBjYXB0dXJlcyBuZWVkZWQgYnkgdGhlIHBzZXVkbyBmaWx0ZXIgbWV0aG9kICh0eXBlIGFuZCBhcmd1bWVudClcclxuXHRcdFx0cmV0dXJuIG1hdGNoLnNsaWNlKCAwLCAzICk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZmlsdGVyOiB7XHJcblx0XHRcIklEXCI6IGFzc2VydEdldElkTm90TmFtZSA/XHJcblx0XHRcdGZ1bmN0aW9uKCBpZCApIHtcclxuXHRcdFx0XHRpZCA9IGlkLnJlcGxhY2UoIHJiYWNrc2xhc2gsIFwiXCIgKTtcclxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gaWQ7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSA6XHJcblx0XHRcdGZ1bmN0aW9uKCBpZCApIHtcclxuXHRcdFx0XHRpZCA9IGlkLnJlcGxhY2UoIHJiYWNrc2xhc2gsIFwiXCIgKTtcclxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdFx0XHR2YXIgbm9kZSA9IHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUgIT09IHN0cnVuZGVmaW5lZCAmJiBlbGVtLmdldEF0dHJpYnV0ZU5vZGUoXCJpZFwiKTtcclxuXHRcdFx0XHRcdHJldHVybiBub2RlICYmIG5vZGUudmFsdWUgPT09IGlkO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XCJUQUdcIjogZnVuY3Rpb24oIG5vZGVOYW1lICkge1xyXG5cdFx0XHRpZiAoIG5vZGVOYW1lID09PSBcIipcIiApIHtcclxuXHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xyXG5cdFx0XHR9XHJcblx0XHRcdG5vZGVOYW1lID0gbm9kZU5hbWUucmVwbGFjZSggcmJhY2tzbGFzaCwgXCJcIiApLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdFx0cmV0dXJuIGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBub2RlTmFtZTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblxyXG5cdFx0XCJDTEFTU1wiOiBmdW5jdGlvbiggY2xhc3NOYW1lICkge1xyXG5cdFx0XHR2YXIgcGF0dGVybiA9IGNsYXNzQ2FjaGVbIGV4cGFuZG8gXVsgY2xhc3NOYW1lIF07XHJcblx0XHRcdGlmICggIXBhdHRlcm4gKSB7XHJcblx0XHRcdFx0cGF0dGVybiA9IGNsYXNzQ2FjaGUoIGNsYXNzTmFtZSwgbmV3IFJlZ0V4cChcIihefFwiICsgd2hpdGVzcGFjZSArIFwiKVwiICsgY2xhc3NOYW1lICsgXCIoXCIgKyB3aGl0ZXNwYWNlICsgXCJ8JClcIikgKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdFx0cmV0dXJuIHBhdHRlcm4udGVzdCggZWxlbS5jbGFzc05hbWUgfHwgKHR5cGVvZiBlbGVtLmdldEF0dHJpYnV0ZSAhPT0gc3RydW5kZWZpbmVkICYmIGVsZW0uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikpIHx8IFwiXCIgKTtcclxuXHRcdFx0fTtcclxuXHRcdH0sXHJcblxyXG5cdFx0XCJBVFRSXCI6IGZ1bmN0aW9uKCBuYW1lLCBvcGVyYXRvciwgY2hlY2sgKSB7XHJcblx0XHRcdGlmICggIW9wZXJhdG9yICkge1xyXG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdFx0XHRcdHJldHVybiBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApICE9IG51bGw7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHRcdHZhciByZXN1bHQgPSBTaXp6bGUuYXR0ciggZWxlbSwgbmFtZSApLFxyXG5cdFx0XHRcdFx0dmFsdWUgPSByZXN1bHQgKyBcIlwiO1xyXG5cclxuXHRcdFx0XHRpZiAoIHJlc3VsdCA9PSBudWxsICkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG9wZXJhdG9yID09PSBcIiE9XCI7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRzd2l0Y2ggKCBvcGVyYXRvciApIHtcclxuXHRcdFx0XHRcdGNhc2UgXCI9XCI6XHJcblx0XHRcdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gY2hlY2s7XHJcblx0XHRcdFx0XHRjYXNlIFwiIT1cIjpcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlICE9PSBjaGVjaztcclxuXHRcdFx0XHRcdGNhc2UgXCJePVwiOlxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY2hlY2sgJiYgdmFsdWUuaW5kZXhPZiggY2hlY2sgKSA9PT0gMDtcclxuXHRcdFx0XHRcdGNhc2UgXCIqPVwiOlxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gY2hlY2sgJiYgdmFsdWUuaW5kZXhPZiggY2hlY2sgKSA+IC0xO1xyXG5cdFx0XHRcdFx0Y2FzZSBcIiQ9XCI6XHJcblx0XHRcdFx0XHRcdHJldHVybiBjaGVjayAmJiB2YWx1ZS5zdWJzdHIoIHZhbHVlLmxlbmd0aCAtIGNoZWNrLmxlbmd0aCApID09PSBjaGVjaztcclxuXHRcdFx0XHRcdGNhc2UgXCJ+PVwiOlxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gKCBcIiBcIiArIHZhbHVlICsgXCIgXCIgKS5pbmRleE9mKCBjaGVjayApID4gLTE7XHJcblx0XHRcdFx0XHRjYXNlIFwifD1cIjpcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHZhbHVlID09PSBjaGVjayB8fCB2YWx1ZS5zdWJzdHIoIDAsIGNoZWNrLmxlbmd0aCArIDEgKSA9PT0gY2hlY2sgKyBcIi1cIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9LFxyXG5cclxuXHRcdFwiQ0hJTERcIjogZnVuY3Rpb24oIHR5cGUsIGFyZ3VtZW50LCBmaXJzdCwgbGFzdCApIHtcclxuXHJcblx0XHRcdGlmICggdHlwZSA9PT0gXCJudGhcIiApIHtcclxuXHRcdFx0XHR2YXIgZG9uZU5hbWUgPSBkb25lKys7XHJcblxyXG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdFx0XHRcdHZhciBwYXJlbnQsIGRpZmYsXHJcblx0XHRcdFx0XHRcdGNvdW50ID0gMCxcclxuXHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBmaXJzdCA9PT0gMSAmJiBsYXN0ID09PSAwICkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBwYXJlbnQgJiYgKHBhcmVudFsgZXhwYW5kbyBdICE9PSBkb25lTmFtZSB8fCAhZWxlbS5zaXpzZXQpICkge1xyXG5cdFx0XHRcdFx0XHRmb3IgKCBub2RlID0gcGFyZW50LmZpcnN0Q2hpbGQ7IG5vZGU7IG5vZGUgPSBub2RlLm5leHRTaWJsaW5nICkge1xyXG5cdFx0XHRcdFx0XHRcdGlmICggbm9kZS5ub2RlVHlwZSA9PT0gMSApIHtcclxuXHRcdFx0XHRcdFx0XHRcdG5vZGUuc2l6c2V0ID0gKytjb3VudDtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICggbm9kZSA9PT0gZWxlbSApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRwYXJlbnRbIGV4cGFuZG8gXSA9IGRvbmVOYW1lO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGRpZmYgPSBlbGVtLnNpenNldCAtIGxhc3Q7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBmaXJzdCA9PT0gMCApIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGRpZmYgPT09IDA7XHJcblxyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuICggZGlmZiAlIGZpcnN0ID09PSAwICYmIGRpZmYgLyBmaXJzdCA+PSAwICk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHRcdHZhciBub2RlID0gZWxlbTtcclxuXHJcblx0XHRcdFx0c3dpdGNoICggdHlwZSApIHtcclxuXHRcdFx0XHRcdGNhc2UgXCJvbmx5XCI6XHJcblx0XHRcdFx0XHRjYXNlIFwiZmlyc3RcIjpcclxuXHRcdFx0XHRcdFx0d2hpbGUgKCAobm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nKSApIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIG5vZGUubm9kZVR5cGUgPT09IDEgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIHR5cGUgPT09IFwiZmlyc3RcIiApIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0bm9kZSA9IGVsZW07XHJcblxyXG5cdFx0XHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXHJcblx0XHRcdFx0XHRjYXNlIFwibGFzdFwiOlxyXG5cdFx0XHRcdFx0XHR3aGlsZSAoIChub2RlID0gbm9kZS5uZXh0U2libGluZykgKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCBub2RlLm5vZGVUeXBlID09PSAxICkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fSxcclxuXHJcblx0XHRcIlBTRVVET1wiOiBmdW5jdGlvbiggcHNldWRvLCBhcmd1bWVudCwgY29udGV4dCwgeG1sICkge1xyXG5cdFx0XHQvLyBwc2V1ZG8tY2xhc3MgbmFtZXMgYXJlIGNhc2UtaW5zZW5zaXRpdmVcclxuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvc2VsZWN0b3JzLyNwc2V1ZG8tY2xhc3Nlc1xyXG5cdFx0XHQvLyBQcmlvcml0aXplIGJ5IGNhc2Ugc2Vuc2l0aXZpdHkgaW4gY2FzZSBjdXN0b20gcHNldWRvcyBhcmUgYWRkZWQgd2l0aCB1cHBlcmNhc2UgbGV0dGVyc1xyXG5cdFx0XHR2YXIgYXJncyxcclxuXHRcdFx0XHRmbiA9IEV4cHIucHNldWRvc1sgcHNldWRvIF0gfHwgRXhwci5wc2V1ZG9zWyBwc2V1ZG8udG9Mb3dlckNhc2UoKSBdO1xyXG5cclxuXHRcdFx0aWYgKCAhZm4gKSB7XHJcblx0XHRcdFx0U2l6emxlLmVycm9yKCBcInVuc3VwcG9ydGVkIHBzZXVkbzogXCIgKyBwc2V1ZG8gKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gVGhlIHVzZXIgbWF5IHVzZSBjcmVhdGVQc2V1ZG8gdG8gaW5kaWNhdGUgdGhhdFxyXG5cdFx0XHQvLyBhcmd1bWVudHMgYXJlIG5lZWRlZCB0byBjcmVhdGUgdGhlIGZpbHRlciBmdW5jdGlvblxyXG5cdFx0XHQvLyBqdXN0IGFzIFNpenpsZSBkb2VzXHJcblx0XHRcdGlmICggIWZuWyBleHBhbmRvIF0gKSB7XHJcblx0XHRcdFx0aWYgKCBmbi5sZW5ndGggPiAxICkge1xyXG5cdFx0XHRcdFx0YXJncyA9IFsgcHNldWRvLCBwc2V1ZG8sIFwiXCIsIGFyZ3VtZW50IF07XHJcblx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmbiggZWxlbSwgMCwgYXJncyApO1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZm4oIGFyZ3VtZW50LCBjb250ZXh0LCB4bWwgKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRwc2V1ZG9zOiB7XHJcblx0XHRcIm5vdFwiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCB4bWwgKSB7XHJcblx0XHRcdC8vIFRyaW0gdGhlIHNlbGVjdG9yIHBhc3NlZCB0byBjb21waWxlXHJcblx0XHRcdC8vIHRvIGF2b2lkIHRyZWF0aW5nIGxlYWRpbmcgYW5kIHRyYWlsaW5nXHJcblx0XHRcdC8vIHNwYWNlcyBhcyBjb21iaW5hdG9yc1xyXG5cdFx0XHR2YXIgbWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxXCIgKSwgY29udGV4dCwgeG1sICk7XHJcblx0XHRcdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdFx0XHRyZXR1cm4gIW1hdGNoZXIoIGVsZW0gKTtcclxuXHRcdFx0fTtcclxuXHRcdH0pLFxyXG5cclxuXHRcdFwiZW5hYmxlZFwiOiBmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdFx0cmV0dXJuIGVsZW0uZGlzYWJsZWQgPT09IGZhbHNlO1xyXG5cdFx0fSxcclxuXHJcblx0XHRcImRpc2FibGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbS5kaXNhYmxlZCA9PT0gdHJ1ZTtcclxuXHRcdH0sXHJcblxyXG5cdFx0XCJjaGVja2VkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHQvLyBJbiBDU1MzLCA6Y2hlY2tlZCBzaG91bGQgcmV0dXJuIGJvdGggY2hlY2tlZCBhbmQgc2VsZWN0ZWQgZWxlbWVudHNcclxuXHRcdFx0Ly8gaHR0cDovL3d3dy53My5vcmcvVFIvMjAxMS9SRUMtY3NzMy1zZWxlY3RvcnMtMjAxMTA5MjkvI2NoZWNrZWRcclxuXHRcdFx0dmFyIG5vZGVOYW1lID0gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRyZXR1cm4gKG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgISFlbGVtLmNoZWNrZWQpIHx8IChub2RlTmFtZSA9PT0gXCJvcHRpb25cIiAmJiAhIWVsZW0uc2VsZWN0ZWQpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRcInNlbGVjdGVkXCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHQvLyBBY2Nlc3NpbmcgdGhpcyBwcm9wZXJ0eSBtYWtlcyBzZWxlY3RlZC1ieS1kZWZhdWx0XHJcblx0XHRcdC8vIG9wdGlvbnMgaW4gU2FmYXJpIHdvcmsgcHJvcGVybHlcclxuXHRcdFx0aWYgKCBlbGVtLnBhcmVudE5vZGUgKSB7XHJcblx0XHRcdFx0ZWxlbS5wYXJlbnROb2RlLnNlbGVjdGVkSW5kZXg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBlbGVtLnNlbGVjdGVkID09PSB0cnVlO1xyXG5cdFx0fSxcclxuXHJcblx0XHRcInBhcmVudFwiOiBmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdFx0cmV0dXJuICFFeHByLnBzZXVkb3NbXCJlbXB0eVwiXSggZWxlbSApO1xyXG5cdFx0fSxcclxuXHJcblx0XHRcImVtcHR5XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHQvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9zZWxlY3RvcnMvI2VtcHR5LXBzZXVkb1xyXG5cdFx0XHQvLyA6ZW1wdHkgaXMgb25seSBhZmZlY3RlZCBieSBlbGVtZW50IG5vZGVzIGFuZCBjb250ZW50IG5vZGVzKGluY2x1ZGluZyB0ZXh0KDMpLCBjZGF0YSg0KSksXHJcblx0XHRcdC8vICAgbm90IGNvbW1lbnQsIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25zLCBvciBvdGhlcnNcclxuXHRcdFx0Ly8gVGhhbmtzIHRvIERpZWdvIFBlcmluaSBmb3IgdGhlIG5vZGVOYW1lIHNob3J0Y3V0XHJcblx0XHRcdC8vICAgR3JlYXRlciB0aGFuIFwiQFwiIG1lYW5zIGFscGhhIGNoYXJhY3RlcnMgKHNwZWNpZmljYWxseSBub3Qgc3RhcnRpbmcgd2l0aCBcIiNcIiBvciBcIj9cIilcclxuXHRcdFx0dmFyIG5vZGVUeXBlO1xyXG5cdFx0XHRlbGVtID0gZWxlbS5maXJzdENoaWxkO1xyXG5cdFx0XHR3aGlsZSAoIGVsZW0gKSB7XHJcblx0XHRcdFx0aWYgKCBlbGVtLm5vZGVOYW1lID4gXCJAXCIgfHwgKG5vZGVUeXBlID0gZWxlbS5ub2RlVHlwZSkgPT09IDMgfHwgbm9kZVR5cGUgPT09IDQgKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fSxcclxuXHJcblx0XHRcImNvbnRhaW5zXCI6IG1hcmtGdW5jdGlvbihmdW5jdGlvbiggdGV4dCApIHtcclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHRcdHJldHVybiAoIGVsZW0udGV4dENvbnRlbnQgfHwgZWxlbS5pbm5lclRleHQgfHwgZ2V0VGV4dCggZWxlbSApICkuaW5kZXhPZiggdGV4dCApID4gLTE7XHJcblx0XHRcdH07XHJcblx0XHR9KSxcclxuXHJcblx0XHRcImhhc1wiOiBtYXJrRnVuY3Rpb24oZnVuY3Rpb24oIHNlbGVjdG9yICkge1xyXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdFx0cmV0dXJuIFNpenpsZSggc2VsZWN0b3IsIGVsZW0gKS5sZW5ndGggPiAwO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSksXHJcblxyXG5cdFx0XCJoZWFkZXJcIjogZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdHJldHVybiByaGVhZGVyLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0XCJ0ZXh0XCI6IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHR2YXIgdHlwZSwgYXR0cjtcclxuXHRcdFx0Ly8gSUU2IGFuZCA3IHdpbGwgbWFwIGVsZW0udHlwZSB0byAndGV4dCcgZm9yIG5ldyBIVE1MNSB0eXBlcyAoc2VhcmNoLCBldGMpXHJcblx0XHRcdC8vIHVzZSBnZXRBdHRyaWJ1dGUgaW5zdGVhZCB0byB0ZXN0IHRoaXMgY2FzZVxyXG5cdFx0XHRyZXR1cm4gZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIgJiZcclxuXHRcdFx0XHQodHlwZSA9IGVsZW0udHlwZSkgPT09IFwidGV4dFwiICYmXHJcblx0XHRcdFx0KCAoYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKFwidHlwZVwiKSkgPT0gbnVsbCB8fCBhdHRyLnRvTG93ZXJDYXNlKCkgPT09IHR5cGUgKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gSW5wdXQgdHlwZXNcclxuXHRcdFwicmFkaW9cIjogY3JlYXRlSW5wdXRQc2V1ZG8oXCJyYWRpb1wiKSxcclxuXHRcdFwiY2hlY2tib3hcIjogY3JlYXRlSW5wdXRQc2V1ZG8oXCJjaGVja2JveFwiKSxcclxuXHRcdFwiZmlsZVwiOiBjcmVhdGVJbnB1dFBzZXVkbyhcImZpbGVcIiksXHJcblx0XHRcInBhc3N3b3JkXCI6IGNyZWF0ZUlucHV0UHNldWRvKFwicGFzc3dvcmRcIiksXHJcblx0XHRcImltYWdlXCI6IGNyZWF0ZUlucHV0UHNldWRvKFwiaW1hZ2VcIiksXHJcblxyXG5cdFx0XCJzdWJtaXRcIjogY3JlYXRlQnV0dG9uUHNldWRvKFwic3VibWl0XCIpLFxyXG5cdFx0XCJyZXNldFwiOiBjcmVhdGVCdXR0b25Qc2V1ZG8oXCJyZXNldFwiKSxcclxuXHJcblx0XHRcImJ1dHRvblwiOiBmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdFx0dmFyIG5hbWUgPSBlbGVtLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdHJldHVybiBuYW1lID09PSBcImlucHV0XCIgJiYgZWxlbS50eXBlID09PSBcImJ1dHRvblwiIHx8IG5hbWUgPT09IFwiYnV0dG9uXCI7XHJcblx0XHR9LFxyXG5cclxuXHRcdFwiaW5wdXRcIjogZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdHJldHVybiByaW5wdXRzLnRlc3QoIGVsZW0ubm9kZU5hbWUgKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0XCJmb2N1c1wiOiBmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdFx0dmFyIGRvYyA9IGVsZW0ub3duZXJEb2N1bWVudDtcclxuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGRvYy5hY3RpdmVFbGVtZW50ICYmICghZG9jLmhhc0ZvY3VzIHx8IGRvYy5oYXNGb2N1cygpKSAmJiAhIShlbGVtLnR5cGUgfHwgZWxlbS5ocmVmKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0XCJhY3RpdmVcIjogZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdHJldHVybiBlbGVtID09PSBlbGVtLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRzZXRGaWx0ZXJzOiB7XHJcblx0XHRcImZpcnN0XCI6IGZ1bmN0aW9uKCBlbGVtZW50cywgYXJndW1lbnQsIG5vdCApIHtcclxuXHRcdFx0cmV0dXJuIG5vdCA/IGVsZW1lbnRzLnNsaWNlKCAxICkgOiBbIGVsZW1lbnRzWzBdIF07XHJcblx0XHR9LFxyXG5cclxuXHRcdFwibGFzdFwiOiBmdW5jdGlvbiggZWxlbWVudHMsIGFyZ3VtZW50LCBub3QgKSB7XHJcblx0XHRcdHZhciBlbGVtID0gZWxlbWVudHMucG9wKCk7XHJcblx0XHRcdHJldHVybiBub3QgPyBlbGVtZW50cyA6IFsgZWxlbSBdO1xyXG5cdFx0fSxcclxuXHJcblx0XHRcImV2ZW5cIjogZnVuY3Rpb24oIGVsZW1lbnRzLCBhcmd1bWVudCwgbm90ICkge1xyXG5cdFx0XHR2YXIgcmVzdWx0cyA9IFtdLFxyXG5cdFx0XHRcdGkgPSBub3QgPyAxIDogMCxcclxuXHRcdFx0XHRsZW4gPSBlbGVtZW50cy5sZW5ndGg7XHJcblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSA9IGkgKyAyICkge1xyXG5cdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbWVudHNbaV0gKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcclxuXHRcdH0sXHJcblxyXG5cdFx0XCJvZGRcIjogZnVuY3Rpb24oIGVsZW1lbnRzLCBhcmd1bWVudCwgbm90ICkge1xyXG5cdFx0XHR2YXIgcmVzdWx0cyA9IFtdLFxyXG5cdFx0XHRcdGkgPSBub3QgPyAwIDogMSxcclxuXHRcdFx0XHRsZW4gPSBlbGVtZW50cy5sZW5ndGg7XHJcblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSA9IGkgKyAyICkge1xyXG5cdFx0XHRcdHJlc3VsdHMucHVzaCggZWxlbWVudHNbaV0gKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0cztcclxuXHRcdH0sXHJcblxyXG5cdFx0XCJsdFwiOiBmdW5jdGlvbiggZWxlbWVudHMsIGFyZ3VtZW50LCBub3QgKSB7XHJcblx0XHRcdHJldHVybiBub3QgPyBlbGVtZW50cy5zbGljZSggK2FyZ3VtZW50ICkgOiBlbGVtZW50cy5zbGljZSggMCwgK2FyZ3VtZW50ICk7XHJcblx0XHR9LFxyXG5cclxuXHRcdFwiZ3RcIjogZnVuY3Rpb24oIGVsZW1lbnRzLCBhcmd1bWVudCwgbm90ICkge1xyXG5cdFx0XHRyZXR1cm4gbm90ID8gZWxlbWVudHMuc2xpY2UoIDAsICthcmd1bWVudCArIDEgKSA6IGVsZW1lbnRzLnNsaWNlKCArYXJndW1lbnQgKyAxICk7XHJcblx0XHR9LFxyXG5cclxuXHRcdFwiZXFcIjogZnVuY3Rpb24oIGVsZW1lbnRzLCBhcmd1bWVudCwgbm90ICkge1xyXG5cdFx0XHR2YXIgZWxlbSA9IGVsZW1lbnRzLnNwbGljZSggK2FyZ3VtZW50LCAxICk7XHJcblx0XHRcdHJldHVybiBub3QgPyBlbGVtZW50cyA6IGVsZW07XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2libGluZ0NoZWNrKCBhLCBiLCByZXQgKSB7XHJcblx0aWYgKCBhID09PSBiICkge1xyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9XHJcblxyXG5cdHZhciBjdXIgPSBhLm5leHRTaWJsaW5nO1xyXG5cclxuXHR3aGlsZSAoIGN1ciApIHtcclxuXHRcdGlmICggY3VyID09PSBiICkge1xyXG5cdFx0XHRyZXR1cm4gLTE7XHJcblx0XHR9XHJcblxyXG5cdFx0Y3VyID0gY3VyLm5leHRTaWJsaW5nO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIDE7XHJcbn1cclxuXHJcbnNvcnRPcmRlciA9IGRvY0VsZW0uY29tcGFyZURvY3VtZW50UG9zaXRpb24gP1xyXG5cdGZ1bmN0aW9uKCBhLCBiICkge1xyXG5cdFx0aWYgKCBhID09PSBiICkge1xyXG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gKCAhYS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiB8fCAhYi5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiA/XHJcblx0XHRcdGEuY29tcGFyZURvY3VtZW50UG9zaXRpb24gOlxyXG5cdFx0XHRhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGIpICYgNFxyXG5cdFx0KSA/IC0xIDogMTtcclxuXHR9IDpcclxuXHRmdW5jdGlvbiggYSwgYiApIHtcclxuXHRcdC8vIFRoZSBub2RlcyBhcmUgaWRlbnRpY2FsLCB3ZSBjYW4gZXhpdCBlYXJseVxyXG5cdFx0aWYgKCBhID09PSBiICkge1xyXG5cdFx0XHRoYXNEdXBsaWNhdGUgPSB0cnVlO1xyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHJcblx0XHQvLyBGYWxsYmFjayB0byB1c2luZyBzb3VyY2VJbmRleCAoaW4gSUUpIGlmIGl0J3MgYXZhaWxhYmxlIG9uIGJvdGggbm9kZXNcclxuXHRcdH0gZWxzZSBpZiAoIGEuc291cmNlSW5kZXggJiYgYi5zb3VyY2VJbmRleCApIHtcclxuXHRcdFx0cmV0dXJuIGEuc291cmNlSW5kZXggLSBiLnNvdXJjZUluZGV4O1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBhbCwgYmwsXHJcblx0XHRcdGFwID0gW10sXHJcblx0XHRcdGJwID0gW10sXHJcblx0XHRcdGF1cCA9IGEucGFyZW50Tm9kZSxcclxuXHRcdFx0YnVwID0gYi5wYXJlbnROb2RlLFxyXG5cdFx0XHRjdXIgPSBhdXA7XHJcblxyXG5cdFx0Ly8gSWYgdGhlIG5vZGVzIGFyZSBzaWJsaW5ncyAob3IgaWRlbnRpY2FsKSB3ZSBjYW4gZG8gYSBxdWljayBjaGVja1xyXG5cdFx0aWYgKCBhdXAgPT09IGJ1cCApIHtcclxuXHRcdFx0cmV0dXJuIHNpYmxpbmdDaGVjayggYSwgYiApO1xyXG5cclxuXHRcdC8vIElmIG5vIHBhcmVudHMgd2VyZSBmb3VuZCB0aGVuIHRoZSBub2RlcyBhcmUgZGlzY29ubmVjdGVkXHJcblx0XHR9IGVsc2UgaWYgKCAhYXVwICkge1xyXG5cdFx0XHRyZXR1cm4gLTE7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggIWJ1cCApIHtcclxuXHRcdFx0cmV0dXJuIDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gT3RoZXJ3aXNlIHRoZXkncmUgc29tZXdoZXJlIGVsc2UgaW4gdGhlIHRyZWUgc28gd2UgbmVlZFxyXG5cdFx0Ly8gdG8gYnVpbGQgdXAgYSBmdWxsIGxpc3Qgb2YgdGhlIHBhcmVudE5vZGVzIGZvciBjb21wYXJpc29uXHJcblx0XHR3aGlsZSAoIGN1ciApIHtcclxuXHRcdFx0YXAudW5zaGlmdCggY3VyICk7XHJcblx0XHRcdGN1ciA9IGN1ci5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGN1ciA9IGJ1cDtcclxuXHJcblx0XHR3aGlsZSAoIGN1ciApIHtcclxuXHRcdFx0YnAudW5zaGlmdCggY3VyICk7XHJcblx0XHRcdGN1ciA9IGN1ci5wYXJlbnROb2RlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGFsID0gYXAubGVuZ3RoO1xyXG5cdFx0YmwgPSBicC5sZW5ndGg7XHJcblxyXG5cdFx0Ly8gU3RhcnQgd2Fsa2luZyBkb3duIHRoZSB0cmVlIGxvb2tpbmcgZm9yIGEgZGlzY3JlcGFuY3lcclxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGFsICYmIGkgPCBibDsgaSsrICkge1xyXG5cdFx0XHRpZiAoIGFwW2ldICE9PSBicFtpXSApIHtcclxuXHRcdFx0XHRyZXR1cm4gc2libGluZ0NoZWNrKCBhcFtpXSwgYnBbaV0gKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFdlIGVuZGVkIHNvbWVwbGFjZSB1cCB0aGUgdHJlZSBzbyBkbyBhIHNpYmxpbmcgY2hlY2tcclxuXHRcdHJldHVybiBpID09PSBhbCA/XHJcblx0XHRcdHNpYmxpbmdDaGVjayggYSwgYnBbaV0sIC0xICkgOlxyXG5cdFx0XHRzaWJsaW5nQ2hlY2soIGFwW2ldLCBiLCAxICk7XHJcblx0fTtcclxuXHJcbi8vIEFsd2F5cyBhc3N1bWUgdGhlIHByZXNlbmNlIG9mIGR1cGxpY2F0ZXMgaWYgc29ydCBkb2Vzbid0XHJcbi8vIHBhc3MgdGhlbSB0byBvdXIgY29tcGFyaXNvbiBmdW5jdGlvbiAoYXMgaW4gR29vZ2xlIENocm9tZSkuXHJcblswLCAwXS5zb3J0KCBzb3J0T3JkZXIgKTtcclxuYmFzZUhhc0R1cGxpY2F0ZSA9ICFoYXNEdXBsaWNhdGU7XHJcblxyXG4vLyBEb2N1bWVudCBzb3J0aW5nIGFuZCByZW1vdmluZyBkdXBsaWNhdGVzXHJcblNpenpsZS51bmlxdWVTb3J0ID0gZnVuY3Rpb24oIHJlc3VsdHMgKSB7XHJcblx0dmFyIGVsZW0sXHJcblx0XHRpID0gMTtcclxuXHJcblx0aGFzRHVwbGljYXRlID0gYmFzZUhhc0R1cGxpY2F0ZTtcclxuXHRyZXN1bHRzLnNvcnQoIHNvcnRPcmRlciApO1xyXG5cclxuXHRpZiAoIGhhc0R1cGxpY2F0ZSApIHtcclxuXHRcdGZvciAoIDsgKGVsZW0gPSByZXN1bHRzW2ldKTsgaSsrICkge1xyXG5cdFx0XHRpZiAoIGVsZW0gPT09IHJlc3VsdHNbIGkgLSAxIF0gKSB7XHJcblx0XHRcdFx0cmVzdWx0cy5zcGxpY2UoIGktLSwgMSApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcmVzdWx0cztcclxufTtcclxuXHJcblNpenpsZS5lcnJvciA9IGZ1bmN0aW9uKCBtc2cgKSB7XHJcblx0dGhyb3cgbmV3IEVycm9yKCBcIlN5bnRheCBlcnJvciwgdW5yZWNvZ25pemVkIGV4cHJlc3Npb246IFwiICsgbXNnICk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiB0b2tlbml6ZSggc2VsZWN0b3IsIGNvbnRleHQsIHhtbCwgcGFyc2VPbmx5ICkge1xyXG5cdHZhciBtYXRjaGVkLCBtYXRjaCwgdG9rZW5zLCB0eXBlLFxyXG5cdFx0c29GYXIsIGdyb3VwcywgZ3JvdXAsIGksXHJcblx0XHRwcmVGaWx0ZXJzLCBmaWx0ZXJzLFxyXG5cdFx0Y2hlY2tDb250ZXh0ID0gIXhtbCAmJiBjb250ZXh0ICE9PSBkb2N1bWVudCxcclxuXHRcdC8vIFRva2VuIGNhY2hlIHNob3VsZCBtYWludGFpbiBzcGFjZXNcclxuXHRcdGtleSA9ICggY2hlY2tDb250ZXh0ID8gXCI8cz5cIiA6IFwiXCIgKSArIHNlbGVjdG9yLnJlcGxhY2UoIHJ0cmltLCBcIiQxPHM+XCIgKSxcclxuXHRcdGNhY2hlZCA9IHRva2VuQ2FjaGVbIGV4cGFuZG8gXVsga2V5IF07XHJcblxyXG5cdGlmICggY2FjaGVkICkge1xyXG5cdFx0cmV0dXJuIHBhcnNlT25seSA/IDAgOiBzbGljZS5jYWxsKCBjYWNoZWQsIDAgKTtcclxuXHR9XHJcblxyXG5cdHNvRmFyID0gc2VsZWN0b3I7XHJcblx0Z3JvdXBzID0gW107XHJcblx0aSA9IDA7XHJcblx0cHJlRmlsdGVycyA9IEV4cHIucHJlRmlsdGVyO1xyXG5cdGZpbHRlcnMgPSBFeHByLmZpbHRlcjtcclxuXHJcblx0d2hpbGUgKCBzb0ZhciApIHtcclxuXHJcblx0XHQvLyBDb21tYSBhbmQgZmlyc3QgcnVuXHJcblx0XHRpZiAoICFtYXRjaGVkIHx8IChtYXRjaCA9IHJjb21tYS5leGVjKCBzb0ZhciApKSApIHtcclxuXHRcdFx0aWYgKCBtYXRjaCApIHtcclxuXHRcdFx0XHRzb0ZhciA9IHNvRmFyLnNsaWNlKCBtYXRjaFswXS5sZW5ndGggKTtcclxuXHRcdFx0XHR0b2tlbnMuc2VsZWN0b3IgPSBncm91cDtcclxuXHRcdFx0fVxyXG5cdFx0XHRncm91cHMucHVzaCggdG9rZW5zID0gW10gKTtcclxuXHRcdFx0Z3JvdXAgPSBcIlwiO1xyXG5cclxuXHRcdFx0Ly8gTmVlZCB0byBtYWtlIHN1cmUgd2UncmUgd2l0aGluIGEgbmFycm93ZXIgY29udGV4dCBpZiBuZWNlc3NhcnlcclxuXHRcdFx0Ly8gQWRkaW5nIGEgZGVzY2VuZGFudCBjb21iaW5hdG9yIHdpbGwgZ2VuZXJhdGUgd2hhdCBpcyBuZWVkZWRcclxuXHRcdFx0aWYgKCBjaGVja0NvbnRleHQgKSB7XHJcblx0XHRcdFx0c29GYXIgPSBcIiBcIiArIHNvRmFyO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0bWF0Y2hlZCA9IGZhbHNlO1xyXG5cclxuXHRcdC8vIENvbWJpbmF0b3JzXHJcblx0XHRpZiAoIChtYXRjaCA9IHJjb21iaW5hdG9ycy5leGVjKCBzb0ZhciApKSApIHtcclxuXHRcdFx0Z3JvdXAgKz0gbWF0Y2hbMF07XHJcblx0XHRcdHNvRmFyID0gc29GYXIuc2xpY2UoIG1hdGNoWzBdLmxlbmd0aCApO1xyXG5cclxuXHRcdFx0Ly8gQ2FzdCBkZXNjZW5kYW50IGNvbWJpbmF0b3JzIHRvIHNwYWNlXHJcblx0XHRcdG1hdGNoZWQgPSB0b2tlbnMucHVzaCh7XHJcblx0XHRcdFx0cGFydDogbWF0Y2gucG9wKCkucmVwbGFjZSggcnRyaW0sIFwiIFwiICksXHJcblx0XHRcdFx0c3RyaW5nOiBtYXRjaFswXSxcclxuXHRcdFx0XHRjYXB0dXJlczogbWF0Y2hcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRmlsdGVyc1xyXG5cdFx0Zm9yICggdHlwZSBpbiBmaWx0ZXJzICkge1xyXG5cdFx0XHRpZiAoIChtYXRjaCA9IG1hdGNoRXhwclsgdHlwZSBdLmV4ZWMoIHNvRmFyICkpICYmICghcHJlRmlsdGVyc1sgdHlwZSBdIHx8XHJcblx0XHRcdFx0KCBtYXRjaCA9IHByZUZpbHRlcnNbIHR5cGUgXShtYXRjaCwgY29udGV4dCwgeG1sKSApKSApIHtcclxuXHJcblx0XHRcdFx0Z3JvdXAgKz0gbWF0Y2hbMF07XHJcblx0XHRcdFx0c29GYXIgPSBzb0Zhci5zbGljZSggbWF0Y2hbMF0ubGVuZ3RoICk7XHJcblx0XHRcdFx0bWF0Y2hlZCA9IHRva2Vucy5wdXNoKHtcclxuXHRcdFx0XHRcdHBhcnQ6IHR5cGUsXHJcblx0XHRcdFx0XHRzdHJpbmc6IG1hdGNoLnNoaWZ0KCksXHJcblx0XHRcdFx0XHRjYXB0dXJlczogbWF0Y2hcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggIW1hdGNoZWQgKSB7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gQXR0YWNoIHRoZSBmdWxsIGdyb3VwIGFzIGEgc2VsZWN0b3JcclxuXHRpZiAoIGdyb3VwICkge1xyXG5cdFx0dG9rZW5zLnNlbGVjdG9yID0gZ3JvdXA7XHJcblx0fVxyXG5cclxuXHQvLyBSZXR1cm4gdGhlIGxlbmd0aCBvZiB0aGUgaW52YWxpZCBleGNlc3NcclxuXHQvLyBpZiB3ZSdyZSBqdXN0IHBhcnNpbmdcclxuXHQvLyBPdGhlcndpc2UsIHRocm93IGFuIGVycm9yIG9yIHJldHVybiB0b2tlbnNcclxuXHRyZXR1cm4gcGFyc2VPbmx5ID9cclxuXHRcdHNvRmFyLmxlbmd0aCA6XHJcblx0XHRzb0ZhciA/XHJcblx0XHRcdFNpenpsZS5lcnJvciggc2VsZWN0b3IgKSA6XHJcblx0XHRcdC8vIENhY2hlIHRoZSB0b2tlbnNcclxuXHRcdFx0c2xpY2UuY2FsbCggdG9rZW5DYWNoZShrZXksIGdyb3VwcyksIDAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkQ29tYmluYXRvciggbWF0Y2hlciwgY29tYmluYXRvciwgY29udGV4dCwgeG1sICkge1xyXG5cdHZhciBkaXIgPSBjb21iaW5hdG9yLmRpcixcclxuXHRcdGRvbmVOYW1lID0gZG9uZSsrO1xyXG5cclxuXHRpZiAoICFtYXRjaGVyICkge1xyXG5cdFx0Ly8gSWYgdGhlcmUgaXMgbm8gbWF0Y2hlciB0byBjaGVjaywgY2hlY2sgYWdhaW5zdCB0aGUgY29udGV4dFxyXG5cdFx0bWF0Y2hlciA9IGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHRyZXR1cm4gZWxlbSA9PT0gY29udGV4dDtcclxuXHRcdH07XHJcblx0fVxyXG5cdHJldHVybiBjb21iaW5hdG9yLmZpcnN0ID9cclxuXHRcdGZ1bmN0aW9uKCBlbGVtICkge1xyXG5cdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xyXG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcclxuXHRcdFx0XHRcdHJldHVybiBtYXRjaGVyKCBlbGVtICkgJiYgZWxlbTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gOlxyXG5cdFx0eG1sID9cclxuXHRcdFx0ZnVuY3Rpb24oIGVsZW0gKSB7XHJcblx0XHRcdFx0d2hpbGUgKCAoZWxlbSA9IGVsZW1bIGRpciBdKSApIHtcclxuXHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcclxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtICkgKSB7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGVsZW07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gOlxyXG5cdFx0XHRmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdFx0XHR2YXIgY2FjaGUsXHJcblx0XHRcdFx0XHRkaXJrZXkgPSBkb25lTmFtZSArIFwiLlwiICsgZGlycnVucyxcclxuXHRcdFx0XHRcdGNhY2hlZGtleSA9IGRpcmtleSArIFwiLlwiICsgY2FjaGVkcnVucztcclxuXHRcdFx0XHR3aGlsZSAoIChlbGVtID0gZWxlbVsgZGlyIF0pICkge1xyXG5cdFx0XHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlID09PSAxICkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIChjYWNoZSA9IGVsZW1bIGV4cGFuZG8gXSkgPT09IGNhY2hlZGtleSApIHtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZWxlbS5zaXpzZXQ7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBjYWNoZSA9PT0gXCJzdHJpbmdcIiAmJiBjYWNoZS5pbmRleE9mKGRpcmtleSkgPT09IDAgKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCBlbGVtLnNpenNldCApIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBlbGVtO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRlbGVtWyBleHBhbmRvIF0gPSBjYWNoZWRrZXk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCBtYXRjaGVyKCBlbGVtICkgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRlbGVtLnNpenNldCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZWxlbTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZWxlbS5zaXpzZXQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkTWF0Y2hlciggaGlnaGVyLCBkZWVwZXIgKSB7XHJcblx0cmV0dXJuIGhpZ2hlciA/XHJcblx0XHRmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdFx0dmFyIHJlc3VsdCA9IGRlZXBlciggZWxlbSApO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0ICYmIGhpZ2hlciggcmVzdWx0ID09PSB0cnVlID8gZWxlbSA6IHJlc3VsdCApO1xyXG5cdFx0fSA6XHJcblx0XHRkZWVwZXI7XHJcbn1cclxuXHJcbi8vIFtcIlRBR1wiLCBcIj5cIiwgXCJJRFwiLCBcIiBcIiwgXCJDTEFTU1wiXVxyXG5mdW5jdGlvbiBtYXRjaGVyRnJvbVRva2VucyggdG9rZW5zLCBjb250ZXh0LCB4bWwgKSB7XHJcblx0dmFyIHRva2VuLCBtYXRjaGVyLFxyXG5cdFx0aSA9IDA7XHJcblxyXG5cdGZvciAoIDsgKHRva2VuID0gdG9rZW5zW2ldKTsgaSsrICkge1xyXG5cdFx0aWYgKCBFeHByLnJlbGF0aXZlWyB0b2tlbi5wYXJ0IF0gKSB7XHJcblx0XHRcdG1hdGNoZXIgPSBhZGRDb21iaW5hdG9yKCBtYXRjaGVyLCBFeHByLnJlbGF0aXZlWyB0b2tlbi5wYXJ0IF0sIGNvbnRleHQsIHhtbCApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bWF0Y2hlciA9IGFkZE1hdGNoZXIoIG1hdGNoZXIsIEV4cHIuZmlsdGVyWyB0b2tlbi5wYXJ0IF0uYXBwbHkobnVsbCwgdG9rZW4uY2FwdHVyZXMuY29uY2F0KCBjb250ZXh0LCB4bWwgKSkgKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiBtYXRjaGVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXRjaGVyRnJvbUdyb3VwTWF0Y2hlcnMoIG1hdGNoZXJzICkge1xyXG5cdHJldHVybiBmdW5jdGlvbiggZWxlbSApIHtcclxuXHRcdHZhciBtYXRjaGVyLFxyXG5cdFx0XHRqID0gMDtcclxuXHRcdGZvciAoIDsgKG1hdGNoZXIgPSBtYXRjaGVyc1tqXSk7IGorKyApIHtcclxuXHRcdFx0aWYgKCBtYXRjaGVyKGVsZW0pICkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fTtcclxufVxyXG5cclxuY29tcGlsZSA9IFNpenpsZS5jb21waWxlID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCB4bWwgKSB7XHJcblx0dmFyIGdyb3VwLCBpLCBsZW4sXHJcblx0XHRjYWNoZWQgPSBjb21waWxlckNhY2hlWyBleHBhbmRvIF1bIHNlbGVjdG9yIF07XHJcblxyXG5cdC8vIFJldHVybiBhIGNhY2hlZCBncm91cCBmdW5jdGlvbiBpZiBhbHJlYWR5IGdlbmVyYXRlZCAoY29udGV4dCBkZXBlbmRlbnQpXHJcblx0aWYgKCBjYWNoZWQgJiYgY2FjaGVkLmNvbnRleHQgPT09IGNvbnRleHQgKSB7XHJcblx0XHRyZXR1cm4gY2FjaGVkO1xyXG5cdH1cclxuXHJcblx0Ly8gR2VuZXJhdGUgYSBmdW5jdGlvbiBvZiByZWN1cnNpdmUgZnVuY3Rpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gY2hlY2sgZWFjaCBlbGVtZW50XHJcblx0Z3JvdXAgPSB0b2tlbml6ZSggc2VsZWN0b3IsIGNvbnRleHQsIHhtbCApO1xyXG5cdGZvciAoIGkgPSAwLCBsZW4gPSBncm91cC5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdGdyb3VwW2ldID0gbWF0Y2hlckZyb21Ub2tlbnMoZ3JvdXBbaV0sIGNvbnRleHQsIHhtbCk7XHJcblx0fVxyXG5cclxuXHQvLyBDYWNoZSB0aGUgY29tcGlsZWQgZnVuY3Rpb25cclxuXHRjYWNoZWQgPSBjb21waWxlckNhY2hlKCBzZWxlY3RvciwgbWF0Y2hlckZyb21Hcm91cE1hdGNoZXJzKGdyb3VwKSApO1xyXG5cdGNhY2hlZC5jb250ZXh0ID0gY29udGV4dDtcclxuXHRjYWNoZWQucnVucyA9IGNhY2hlZC5kaXJydW5zID0gMDtcclxuXHRyZXR1cm4gY2FjaGVkO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gbXVsdGlwbGVDb250ZXh0cyggc2VsZWN0b3IsIGNvbnRleHRzLCByZXN1bHRzLCBzZWVkICkge1xyXG5cdHZhciBpID0gMCxcclxuXHRcdGxlbiA9IGNvbnRleHRzLmxlbmd0aDtcclxuXHRmb3IgKCA7IGkgPCBsZW47IGkrKyApIHtcclxuXHRcdFNpenpsZSggc2VsZWN0b3IsIGNvbnRleHRzW2ldLCByZXN1bHRzLCBzZWVkICk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBoYW5kbGVQT1NHcm91cCggc2VsZWN0b3IsIHBvc2ZpbHRlciwgYXJndW1lbnQsIGNvbnRleHRzLCBzZWVkLCBub3QgKSB7XHJcblx0dmFyIHJlc3VsdHMsXHJcblx0XHRmbiA9IEV4cHIuc2V0RmlsdGVyc1sgcG9zZmlsdGVyLnRvTG93ZXJDYXNlKCkgXTtcclxuXHJcblx0aWYgKCAhZm4gKSB7XHJcblx0XHRTaXp6bGUuZXJyb3IoIHBvc2ZpbHRlciApO1xyXG5cdH1cclxuXHJcblx0aWYgKCBzZWxlY3RvciB8fCAhKHJlc3VsdHMgPSBzZWVkKSApIHtcclxuXHRcdG11bHRpcGxlQ29udGV4dHMoIHNlbGVjdG9yIHx8IFwiKlwiLCBjb250ZXh0cywgKHJlc3VsdHMgPSBbXSksIHNlZWQgKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHRzLmxlbmd0aCA+IDAgPyBmbiggcmVzdWx0cywgYXJndW1lbnQsIG5vdCApIDogW107XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhhbmRsZVBPUyggZ3JvdXBzLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkICkge1xyXG5cdHZhciBncm91cCwgcGFydCwgaiwgZ3JvdXBMZW4sIHRva2VuLCBzZWxlY3RvcixcclxuXHRcdGFuY2hvciwgZWxlbWVudHMsIG1hdGNoLCBtYXRjaGVkLFxyXG5cdFx0bGFzdEluZGV4LCBjdXJyZW50Q29udGV4dHMsIG5vdCxcclxuXHRcdGkgPSAwLFxyXG5cdFx0bGVuID0gZ3JvdXBzLmxlbmd0aCxcclxuXHRcdHJwb3MgPSBtYXRjaEV4cHJbXCJQT1NcIl0sXHJcblx0XHQvLyBUaGlzIGlzIGdlbmVyYXRlZCBoZXJlIGluIGNhc2UgbWF0Y2hFeHByW1wiUE9TXCJdIGlzIGV4dGVuZGVkXHJcblx0XHRycG9zZ3JvdXBzID0gbmV3IFJlZ0V4cCggXCJeXCIgKyBycG9zLnNvdXJjZSArIFwiKD8hXCIgKyB3aGl0ZXNwYWNlICsgXCIpXCIsIFwiaVwiICksXHJcblx0XHQvLyBUaGlzIGlzIGZvciBtYWtpbmcgc3VyZSBub24tcGFydGljaXBhdGluZ1xyXG5cdFx0Ly8gbWF0Y2hpbmcgZ3JvdXBzIGFyZSByZXByZXNlbnRlZCBjcm9zcy1icm93c2VyIChJRTYtOClcclxuXHRcdHNldFVuZGVmaW5lZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR2YXIgaSA9IDEsXHJcblx0XHRcdFx0bGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XHJcblx0XHRcdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xyXG5cdFx0XHRcdGlmICggYXJndW1lbnRzW2ldID09PSB1bmRlZmluZWQgKSB7XHJcblx0XHRcdFx0XHRtYXRjaFtpXSA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdGZvciAoIDsgaSA8IGxlbjsgaSsrICkge1xyXG5cdFx0Z3JvdXAgPSBncm91cHNbaV07XHJcblx0XHRwYXJ0ID0gXCJcIjtcclxuXHRcdGVsZW1lbnRzID0gc2VlZDtcclxuXHRcdGZvciAoIGogPSAwLCBncm91cExlbiA9IGdyb3VwLmxlbmd0aDsgaiA8IGdyb3VwTGVuOyBqKysgKSB7XHJcblx0XHRcdHRva2VuID0gZ3JvdXBbal07XHJcblx0XHRcdHNlbGVjdG9yID0gdG9rZW4uc3RyaW5nO1xyXG5cdFx0XHRpZiAoIHRva2VuLnBhcnQgPT09IFwiUFNFVURPXCIgKSB7XHJcblx0XHRcdFx0Ly8gUmVzZXQgcmVnZXggaW5kZXggdG8gMFxyXG5cdFx0XHRcdHJwb3MuZXhlYyhcIlwiKTtcclxuXHRcdFx0XHRhbmNob3IgPSAwO1xyXG5cdFx0XHRcdHdoaWxlICggKG1hdGNoID0gcnBvcy5leGVjKCBzZWxlY3RvciApKSApIHtcclxuXHRcdFx0XHRcdG1hdGNoZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0bGFzdEluZGV4ID0gcnBvcy5sYXN0SW5kZXggPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcclxuXHRcdFx0XHRcdGlmICggbGFzdEluZGV4ID4gYW5jaG9yICkge1xyXG5cdFx0XHRcdFx0XHRwYXJ0ICs9IHNlbGVjdG9yLnNsaWNlKCBhbmNob3IsIG1hdGNoLmluZGV4ICk7XHJcblx0XHRcdFx0XHRcdGFuY2hvciA9IGxhc3RJbmRleDtcclxuXHRcdFx0XHRcdFx0Y3VycmVudENvbnRleHRzID0gWyBjb250ZXh0IF07XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIHJjb21iaW5hdG9ycy50ZXN0KHBhcnQpICkge1xyXG5cdFx0XHRcdFx0XHRcdGlmICggZWxlbWVudHMgKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjdXJyZW50Q29udGV4dHMgPSBlbGVtZW50cztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZWxlbWVudHMgPSBzZWVkO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIChub3QgPSByZW5kc1dpdGhOb3QudGVzdCggcGFydCApKSApIHtcclxuXHRcdFx0XHRcdFx0XHRwYXJ0ID0gcGFydC5zbGljZSggMCwgLTUgKS5yZXBsYWNlKCByY29tYmluYXRvcnMsIFwiJCYqXCIgKTtcclxuXHRcdFx0XHRcdFx0XHRhbmNob3IrKztcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0aWYgKCBtYXRjaC5sZW5ndGggPiAxICkge1xyXG5cdFx0XHRcdFx0XHRcdG1hdGNoWzBdLnJlcGxhY2UoIHJwb3Nncm91cHMsIHNldFVuZGVmaW5lZCApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsZW1lbnRzID0gaGFuZGxlUE9TR3JvdXAoIHBhcnQsIG1hdGNoWzFdLCBtYXRjaFsyXSwgY3VycmVudENvbnRleHRzLCBlbGVtZW50cywgbm90ICk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRwYXJ0ID0gXCJcIjtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoICFtYXRjaGVkICkge1xyXG5cdFx0XHRcdHBhcnQgKz0gc2VsZWN0b3I7XHJcblx0XHRcdH1cclxuXHRcdFx0bWF0Y2hlZCA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggcGFydCApIHtcclxuXHRcdFx0aWYgKCByY29tYmluYXRvcnMudGVzdChwYXJ0KSApIHtcclxuXHRcdFx0XHRtdWx0aXBsZUNvbnRleHRzKCBwYXJ0LCBlbGVtZW50cyB8fCBbIGNvbnRleHQgXSwgcmVzdWx0cywgc2VlZCApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFNpenpsZSggcGFydCwgY29udGV4dCwgcmVzdWx0cywgc2VlZCA/IHNlZWQuY29uY2F0KGVsZW1lbnRzKSA6IGVsZW1lbnRzICk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIGVsZW1lbnRzICk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBEbyBub3Qgc29ydCBpZiB0aGlzIGlzIGEgc2luZ2xlIGZpbHRlclxyXG5cdHJldHVybiBsZW4gPT09IDEgPyByZXN1bHRzIDogU2l6emxlLnVuaXF1ZVNvcnQoIHJlc3VsdHMgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0KCBzZWxlY3RvciwgY29udGV4dCwgcmVzdWx0cywgc2VlZCwgeG1sICkge1xyXG5cdC8vIFJlbW92ZSBleGNlc3NpdmUgd2hpdGVzcGFjZVxyXG5cdHNlbGVjdG9yID0gc2VsZWN0b3IucmVwbGFjZSggcnRyaW0sIFwiJDFcIiApO1xyXG5cdHZhciBlbGVtZW50cywgbWF0Y2hlciwgY2FjaGVkLCBlbGVtLFxyXG5cdFx0aSwgdG9rZW5zLCB0b2tlbiwgbGFzdFRva2VuLCBmaW5kQ29udGV4dCwgdHlwZSxcclxuXHRcdG1hdGNoID0gdG9rZW5pemUoIHNlbGVjdG9yLCBjb250ZXh0LCB4bWwgKSxcclxuXHRcdGNvbnRleHROb2RlVHlwZSA9IGNvbnRleHQubm9kZVR5cGU7XHJcblxyXG5cdC8vIFBPUyBoYW5kbGluZ1xyXG5cdGlmICggbWF0Y2hFeHByW1wiUE9TXCJdLnRlc3Qoc2VsZWN0b3IpICkge1xyXG5cdFx0cmV0dXJuIGhhbmRsZVBPUyggbWF0Y2gsIGNvbnRleHQsIHJlc3VsdHMsIHNlZWQgKTtcclxuXHR9XHJcblxyXG5cdGlmICggc2VlZCApIHtcclxuXHRcdGVsZW1lbnRzID0gc2xpY2UuY2FsbCggc2VlZCwgMCApO1xyXG5cclxuXHQvLyBUbyBtYWludGFpbiBkb2N1bWVudCBvcmRlciwgb25seSBuYXJyb3cgdGhlXHJcblx0Ly8gc2V0IGlmIHRoZXJlIGlzIG9uZSBncm91cFxyXG5cdH0gZWxzZSBpZiAoIG1hdGNoLmxlbmd0aCA9PT0gMSApIHtcclxuXHJcblx0XHQvLyBUYWtlIGEgc2hvcnRjdXQgYW5kIHNldCB0aGUgY29udGV4dCBpZiB0aGUgcm9vdCBzZWxlY3RvciBpcyBhbiBJRFxyXG5cdFx0aWYgKCAodG9rZW5zID0gc2xpY2UuY2FsbCggbWF0Y2hbMF0sIDAgKSkubGVuZ3RoID4gMiAmJlxyXG5cdFx0XHRcdCh0b2tlbiA9IHRva2Vuc1swXSkucGFydCA9PT0gXCJJRFwiICYmXHJcblx0XHRcdFx0Y29udGV4dE5vZGVUeXBlID09PSA5ICYmICF4bWwgJiZcclxuXHRcdFx0XHRFeHByLnJlbGF0aXZlWyB0b2tlbnNbMV0ucGFydCBdICkge1xyXG5cclxuXHRcdFx0Y29udGV4dCA9IEV4cHIuZmluZFtcIklEXCJdKCB0b2tlbi5jYXB0dXJlc1swXS5yZXBsYWNlKCByYmFja3NsYXNoLCBcIlwiICksIGNvbnRleHQsIHhtbCApWzBdO1xyXG5cdFx0XHRpZiAoICFjb250ZXh0ICkge1xyXG5cdFx0XHRcdHJldHVybiByZXN1bHRzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxlY3RvciA9IHNlbGVjdG9yLnNsaWNlKCB0b2tlbnMuc2hpZnQoKS5zdHJpbmcubGVuZ3RoICk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZmluZENvbnRleHQgPSAoIChtYXRjaCA9IHJzaWJsaW5nLmV4ZWMoIHRva2Vuc1swXS5zdHJpbmcgKSkgJiYgIW1hdGNoLmluZGV4ICYmIGNvbnRleHQucGFyZW50Tm9kZSApIHx8IGNvbnRleHQ7XHJcblxyXG5cdFx0Ly8gUmVkdWNlIHRoZSBzZXQgaWYgcG9zc2libGVcclxuXHRcdGxhc3RUb2tlbiA9IFwiXCI7XHJcblx0XHRmb3IgKCBpID0gdG9rZW5zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tICkge1xyXG5cdFx0XHR0b2tlbiA9IHRva2Vuc1tpXTtcclxuXHRcdFx0dHlwZSA9IHRva2VuLnBhcnQ7XHJcblx0XHRcdGxhc3RUb2tlbiA9IHRva2VuLnN0cmluZyArIGxhc3RUb2tlbjtcclxuXHRcdFx0aWYgKCBFeHByLnJlbGF0aXZlWyB0eXBlIF0gKSB7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCBFeHByLm9yZGVyLnRlc3QodHlwZSkgKSB7XHJcblx0XHRcdFx0ZWxlbWVudHMgPSBFeHByLmZpbmRbIHR5cGUgXSggdG9rZW4uY2FwdHVyZXNbMF0ucmVwbGFjZSggcmJhY2tzbGFzaCwgXCJcIiApLCBmaW5kQ29udGV4dCwgeG1sICk7XHJcblx0XHRcdFx0aWYgKCBlbGVtZW50cyA9PSBudWxsICkge1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHNlbGVjdG9yID0gc2VsZWN0b3Iuc2xpY2UoIDAsIHNlbGVjdG9yLmxlbmd0aCAtIGxhc3RUb2tlbi5sZW5ndGggKSArXHJcblx0XHRcdFx0XHRcdGxhc3RUb2tlbi5yZXBsYWNlKCBtYXRjaEV4cHJbIHR5cGUgXSwgXCJcIiApO1xyXG5cclxuXHRcdFx0XHRcdGlmICggIXNlbGVjdG9yICkge1xyXG5cdFx0XHRcdFx0XHRwdXNoLmFwcGx5KCByZXN1bHRzLCBzbGljZS5jYWxsKGVsZW1lbnRzLCAwKSApO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gT25seSBsb29wIG92ZXIgdGhlIGdpdmVuIGVsZW1lbnRzIG9uY2VcclxuXHRpZiAoIHNlbGVjdG9yICkge1xyXG5cdFx0bWF0Y2hlciA9IGNvbXBpbGUoIHNlbGVjdG9yLCBjb250ZXh0LCB4bWwgKTtcclxuXHRcdGRpcnJ1bnMgPSBtYXRjaGVyLmRpcnJ1bnMrKztcclxuXHRcdGlmICggZWxlbWVudHMgPT0gbnVsbCApIHtcclxuXHRcdFx0ZWxlbWVudHMgPSBFeHByLmZpbmRbXCJUQUdcIl0oIFwiKlwiLCAocnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiBjb250ZXh0LnBhcmVudE5vZGUpIHx8IGNvbnRleHQgKTtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKCBpID0gMDsgKGVsZW0gPSBlbGVtZW50c1tpXSk7IGkrKyApIHtcclxuXHRcdFx0Y2FjaGVkcnVucyA9IG1hdGNoZXIucnVucysrO1xyXG5cdFx0XHRpZiAoIG1hdGNoZXIoZWxlbSkgKSB7XHJcblx0XHRcdFx0cmVzdWx0cy5wdXNoKCBlbGVtICk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiByZXN1bHRzO1xyXG59XHJcblxyXG5pZiAoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKSB7XHJcblx0KGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGRpc2Nvbm5lY3RlZE1hdGNoLFxyXG5cdFx0XHRvbGRTZWxlY3QgPSBzZWxlY3QsXHJcblx0XHRcdHJlc2NhcGUgPSAvJ3xcXFxcL2csXHJcblx0XHRcdHJhdHRyaWJ1dGVRdW90ZXMgPSAvXFw9W1xceDIwXFx0XFxyXFxuXFxmXSooW14nXCJcXF1dKilbXFx4MjBcXHRcXHJcXG5cXGZdKlxcXS9nLFxyXG5cdFx0XHRyYnVnZ3lRU0EgPSBbXSxcclxuXHRcdFx0Ly8gbWF0Y2hlc1NlbGVjdG9yKDphY3RpdmUpIHJlcG9ydHMgZmFsc2Ugd2hlbiB0cnVlIChJRTkvT3BlcmEgMTEuNSlcclxuXHRcdFx0Ly8gQSBzdXBwb3J0IHRlc3Qgd291bGQgcmVxdWlyZSB0b28gbXVjaCBjb2RlICh3b3VsZCBpbmNsdWRlIGRvY3VtZW50IHJlYWR5KVxyXG5cdFx0XHQvLyBqdXN0IHNraXAgbWF0Y2hlc1NlbGVjdG9yIGZvciA6YWN0aXZlXHJcblx0XHRcdHJidWdneU1hdGNoZXMgPSBbXCI6YWN0aXZlXCJdLFxyXG5cdFx0XHRtYXRjaGVzID0gZG9jRWxlbS5tYXRjaGVzU2VsZWN0b3IgfHxcclxuXHRcdFx0XHRkb2NFbGVtLm1vek1hdGNoZXNTZWxlY3RvciB8fFxyXG5cdFx0XHRcdGRvY0VsZW0ud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XHJcblx0XHRcdFx0ZG9jRWxlbS5vTWF0Y2hlc1NlbGVjdG9yIHx8XHJcblx0XHRcdFx0ZG9jRWxlbS5tc01hdGNoZXNTZWxlY3RvcjtcclxuXHJcblx0XHQvLyBCdWlsZCBRU0EgcmVnZXhcclxuXHRcdC8vIFJlZ2V4IHN0cmF0ZWd5IGFkb3B0ZWQgZnJvbSBEaWVnbyBQZXJpbmlcclxuXHRcdGFzc2VydChmdW5jdGlvbiggZGl2ICkge1xyXG5cdFx0XHQvLyBTZWxlY3QgaXMgc2V0IHRvIGVtcHR5IHN0cmluZyBvbiBwdXJwb3NlXHJcblx0XHRcdC8vIFRoaXMgaXMgdG8gdGVzdCBJRSdzIHRyZWF0bWVudCBvZiBub3QgZXhwbGljdGx5XHJcblx0XHRcdC8vIHNldHRpbmcgYSBib29sZWFuIGNvbnRlbnQgYXR0cmlidXRlLFxyXG5cdFx0XHQvLyBzaW5jZSBpdHMgcHJlc2VuY2Ugc2hvdWxkIGJlIGVub3VnaFxyXG5cdFx0XHQvLyBodHRwOi8vYnVncy5qcXVlcnkuY29tL3RpY2tldC8xMjM1OVxyXG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gXCI8c2VsZWN0PjxvcHRpb24gc2VsZWN0ZWQ9Jyc+PC9vcHRpb24+PC9zZWxlY3Q+XCI7XHJcblxyXG5cdFx0XHQvLyBJRTggLSBTb21lIGJvb2xlYW4gYXR0cmlidXRlcyBhcmUgbm90IHRyZWF0ZWQgY29ycmVjdGx5XHJcblx0XHRcdGlmICggIWRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiW3NlbGVjdGVkXVwiKS5sZW5ndGggKSB7XHJcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiXFxcXFtcIiArIHdoaXRlc3BhY2UgKyBcIiooPzpjaGVja2VkfGRpc2FibGVkfGlzbWFwfG11bHRpcGxlfHJlYWRvbmx5fHNlbGVjdGVkfHZhbHVlKVwiICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFdlYmtpdC9PcGVyYSAtIDpjaGVja2VkIHNob3VsZCByZXR1cm4gc2VsZWN0ZWQgb3B0aW9uIGVsZW1lbnRzXHJcblx0XHRcdC8vIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtc2VsZWN0b3JzLTIwMTEwOTI5LyNjaGVja2VkXHJcblx0XHRcdC8vIElFOCB0aHJvd3MgZXJyb3IgaGVyZSAoZG8gbm90IHB1dCB0ZXN0cyBhZnRlciB0aGlzIG9uZSlcclxuXHRcdFx0aWYgKCAhZGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCI6Y2hlY2tlZFwiKS5sZW5ndGggKSB7XHJcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goXCI6Y2hlY2tlZFwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0YXNzZXJ0KGZ1bmN0aW9uKCBkaXYgKSB7XHJcblxyXG5cdFx0XHQvLyBPcGVyYSAxMC0xMi9JRTkgLSBePSAkPSAqPSBhbmQgZW1wdHkgdmFsdWVzXHJcblx0XHRcdC8vIFNob3VsZCBub3Qgc2VsZWN0IGFueXRoaW5nXHJcblx0XHRcdGRpdi5pbm5lckhUTUwgPSBcIjxwIHRlc3Q9Jyc+PC9wPlwiO1xyXG5cdFx0XHRpZiAoIGRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiW3Rlc3RePScnXVwiKS5sZW5ndGggKSB7XHJcblx0XHRcdFx0cmJ1Z2d5UVNBLnB1c2goIFwiWypeJF09XCIgKyB3aGl0ZXNwYWNlICsgXCIqKD86XFxcIlxcXCJ8JycpXCIgKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRkYgMy41IC0gOmVuYWJsZWQvOmRpc2FibGVkIGFuZCBoaWRkZW4gZWxlbWVudHMgKGhpZGRlbiBlbGVtZW50cyBhcmUgc3RpbGwgZW5hYmxlZClcclxuXHRcdFx0Ly8gSUU4IHRocm93cyBlcnJvciBoZXJlIChkbyBub3QgcHV0IHRlc3RzIGFmdGVyIHRoaXMgb25lKVxyXG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gXCI8aW5wdXQgdHlwZT0naGlkZGVuJy8+XCI7XHJcblx0XHRcdGlmICggIWRpdi5xdWVyeVNlbGVjdG9yQWxsKFwiOmVuYWJsZWRcIikubGVuZ3RoICkge1xyXG5cdFx0XHRcdHJidWdneVFTQS5wdXNoKFwiOmVuYWJsZWRcIiwgXCI6ZGlzYWJsZWRcIik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHJidWdneVFTQSA9IHJidWdneVFTQS5sZW5ndGggJiYgbmV3IFJlZ0V4cCggcmJ1Z2d5UVNBLmpvaW4oXCJ8XCIpICk7XHJcblxyXG5cdFx0c2VsZWN0ID0gZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkLCB4bWwgKSB7XHJcblx0XHRcdC8vIE9ubHkgdXNlIHF1ZXJ5U2VsZWN0b3JBbGwgd2hlbiBub3QgZmlsdGVyaW5nLFxyXG5cdFx0XHQvLyB3aGVuIHRoaXMgaXMgbm90IHhtbCxcclxuXHRcdFx0Ly8gYW5kIHdoZW4gbm8gUVNBIGJ1Z3MgYXBwbHlcclxuXHRcdFx0aWYgKCAhc2VlZCAmJiAheG1sICYmICghcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggc2VsZWN0b3IgKSkgKSB7XHJcblx0XHRcdFx0aWYgKCBjb250ZXh0Lm5vZGVUeXBlID09PSA5ICkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0cHVzaC5hcHBseSggcmVzdWx0cywgc2xpY2UuY2FsbChjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoIHNlbGVjdG9yICksIDApICk7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xyXG5cdFx0XHRcdFx0fSBjYXRjaChxc2FFcnJvcikge31cclxuXHRcdFx0XHQvLyBxU0Egd29ya3Mgc3RyYW5nZWx5IG9uIEVsZW1lbnQtcm9vdGVkIHF1ZXJpZXNcclxuXHRcdFx0XHQvLyBXZSBjYW4gd29yayBhcm91bmQgdGhpcyBieSBzcGVjaWZ5aW5nIGFuIGV4dHJhIElEIG9uIHRoZSByb290XHJcblx0XHRcdFx0Ly8gYW5kIHdvcmtpbmcgdXAgZnJvbSB0aGVyZSAoVGhhbmtzIHRvIEFuZHJldyBEdXBvbnQgZm9yIHRoZSB0ZWNobmlxdWUpXHJcblx0XHRcdFx0Ly8gSUUgOCBkb2Vzbid0IHdvcmsgb24gb2JqZWN0IGVsZW1lbnRzXHJcblx0XHRcdFx0fSBlbHNlIGlmICggY29udGV4dC5ub2RlVHlwZSA9PT0gMSAmJiBjb250ZXh0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwib2JqZWN0XCIgKSB7XHJcblx0XHRcdFx0XHR2YXIgZ3JvdXBzLCBpLCBsZW4sXHJcblx0XHRcdFx0XHRcdG9sZCA9IGNvbnRleHQuZ2V0QXR0cmlidXRlKFwiaWRcIiksXHJcblx0XHRcdFx0XHRcdG5pZCA9IG9sZCB8fCBleHBhbmRvLFxyXG5cdFx0XHRcdFx0XHRuZXdDb250ZXh0ID0gcnNpYmxpbmcudGVzdCggc2VsZWN0b3IgKSAmJiBjb250ZXh0LnBhcmVudE5vZGUgfHwgY29udGV4dDtcclxuXHJcblx0XHRcdFx0XHRpZiAoIG9sZCApIHtcclxuXHRcdFx0XHRcdFx0bmlkID0gbmlkLnJlcGxhY2UoIHJlc2NhcGUsIFwiXFxcXCQmXCIgKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNvbnRleHQuc2V0QXR0cmlidXRlKCBcImlkXCIsIG5pZCApO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGdyb3VwcyA9IHRva2VuaXplKHNlbGVjdG9yLCBjb250ZXh0LCB4bWwpO1xyXG5cdFx0XHRcdFx0Ly8gVHJhaWxpbmcgc3BhY2UgaXMgdW5uZWNlc3NhcnlcclxuXHRcdFx0XHRcdC8vIFRoZXJlIGlzIGFsd2F5cyBhIGNvbnRleHQgY2hlY2tcclxuXHRcdFx0XHRcdG5pZCA9IFwiW2lkPSdcIiArIG5pZCArIFwiJ11cIjtcclxuXHRcdFx0XHRcdGZvciAoIGkgPSAwLCBsZW4gPSBncm91cHMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XHJcblx0XHRcdFx0XHRcdGdyb3Vwc1tpXSA9IG5pZCArIGdyb3Vwc1tpXS5zZWxlY3RvcjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHB1c2guYXBwbHkoIHJlc3VsdHMsIHNsaWNlLmNhbGwoIG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbChcclxuXHRcdFx0XHRcdFx0XHRncm91cHMuam9pbihcIixcIilcclxuXHRcdFx0XHRcdFx0KSwgMCApICk7XHJcblx0XHRcdFx0XHRcdHJldHVybiByZXN1bHRzO1xyXG5cdFx0XHRcdFx0fSBjYXRjaChxc2FFcnJvcikge1xyXG5cdFx0XHRcdFx0fSBmaW5hbGx5IHtcclxuXHRcdFx0XHRcdFx0aWYgKCAhb2xkICkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBvbGRTZWxlY3QoIHNlbGVjdG9yLCBjb250ZXh0LCByZXN1bHRzLCBzZWVkLCB4bWwgKTtcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKCBtYXRjaGVzICkge1xyXG5cdFx0XHRhc3NlcnQoZnVuY3Rpb24oIGRpdiApIHtcclxuXHRcdFx0XHQvLyBDaGVjayB0byBzZWUgaWYgaXQncyBwb3NzaWJsZSB0byBkbyBtYXRjaGVzU2VsZWN0b3JcclxuXHRcdFx0XHQvLyBvbiBhIGRpc2Nvbm5lY3RlZCBub2RlIChJRSA5KVxyXG5cdFx0XHRcdGRpc2Nvbm5lY3RlZE1hdGNoID0gbWF0Y2hlcy5jYWxsKCBkaXYsIFwiZGl2XCIgKTtcclxuXHJcblx0XHRcdFx0Ly8gVGhpcyBzaG91bGQgZmFpbCB3aXRoIGFuIGV4Y2VwdGlvblxyXG5cdFx0XHRcdC8vIEdlY2tvIGRvZXMgbm90IGVycm9yLCByZXR1cm5zIGZhbHNlIGluc3RlYWRcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0bWF0Y2hlcy5jYWxsKCBkaXYsIFwiW3Rlc3QhPScnXTpzaXp6bGVcIiApO1xyXG5cdFx0XHRcdFx0cmJ1Z2d5TWF0Y2hlcy5wdXNoKCBtYXRjaEV4cHJbXCJQU0VVRE9cIl0uc291cmNlLCBtYXRjaEV4cHJbXCJQT1NcIl0uc291cmNlLCBcIiE9XCIgKTtcclxuXHRcdFx0XHR9IGNhdGNoICggZSApIHt9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0Ly8gcmJ1Z2d5TWF0Y2hlcyBhbHdheXMgY29udGFpbnMgOmFjdGl2ZSwgc28gbm8gbmVlZCBmb3IgYSBsZW5ndGggY2hlY2tcclxuXHRcdFx0cmJ1Z2d5TWF0Y2hlcyA9IC8qIHJidWdneU1hdGNoZXMubGVuZ3RoICYmICovIG5ldyBSZWdFeHAoIHJidWdneU1hdGNoZXMuam9pbihcInxcIikgKTtcclxuXHJcblx0XHRcdFNpenpsZS5tYXRjaGVzU2VsZWN0b3IgPSBmdW5jdGlvbiggZWxlbSwgZXhwciApIHtcclxuXHRcdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBhdHRyaWJ1dGUgc2VsZWN0b3JzIGFyZSBxdW90ZWRcclxuXHRcdFx0XHRleHByID0gZXhwci5yZXBsYWNlKCByYXR0cmlidXRlUXVvdGVzLCBcIj0nJDEnXVwiICk7XHJcblxyXG5cdFx0XHRcdC8vIHJidWdneU1hdGNoZXMgYWx3YXlzIGNvbnRhaW5zIDphY3RpdmUsIHNvIG5vIG5lZWQgZm9yIGFuIGV4aXN0ZW5jZSBjaGVja1xyXG5cdFx0XHRcdGlmICggIWlzWE1MKCBlbGVtICkgJiYgIXJidWdneU1hdGNoZXMudGVzdCggZXhwciApICYmICghcmJ1Z2d5UVNBIHx8ICFyYnVnZ3lRU0EudGVzdCggZXhwciApKSApIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHZhciByZXQgPSBtYXRjaGVzLmNhbGwoIGVsZW0sIGV4cHIgKTtcclxuXHJcblx0XHRcdFx0XHRcdC8vIElFIDkncyBtYXRjaGVzU2VsZWN0b3IgcmV0dXJucyBmYWxzZSBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcclxuXHRcdFx0XHRcdFx0aWYgKCByZXQgfHwgZGlzY29ubmVjdGVkTWF0Y2ggfHxcclxuXHRcdFx0XHRcdFx0XHRcdC8vIEFzIHdlbGwsIGRpc2Nvbm5lY3RlZCBub2RlcyBhcmUgc2FpZCB0byBiZSBpbiBhIGRvY3VtZW50XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBmcmFnbWVudCBpbiBJRSA5XHJcblx0XHRcdFx0XHRcdFx0XHRlbGVtLmRvY3VtZW50ICYmIGVsZW0uZG9jdW1lbnQubm9kZVR5cGUgIT09IDExICkge1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZXQ7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0gY2F0Y2goZSkge31cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiBTaXp6bGUoIGV4cHIsIG51bGwsIG51bGwsIFsgZWxlbSBdICkubGVuZ3RoID4gMDtcclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHR9KSgpO1xyXG59XHJcblxyXG4vLyBEZXByZWNhdGVkXHJcbkV4cHIuc2V0RmlsdGVyc1tcIm50aFwiXSA9IEV4cHIuc2V0RmlsdGVyc1tcImVxXCJdO1xyXG5cclxuLy8gQmFjay1jb21wYXRcclxuRXhwci5maWx0ZXJzID0gRXhwci5wc2V1ZG9zO1xyXG5cclxuLy8gT3ZlcnJpZGUgc2l6emxlIGF0dHJpYnV0ZSByZXRyaWV2YWxcblNpenpsZS5hdHRyID0galF1ZXJ5LmF0dHI7XG5qUXVlcnkuZmluZCA9IFNpenpsZTtcbmpRdWVyeS5leHByID0gU2l6emxlLnNlbGVjdG9ycztcbmpRdWVyeS5leHByW1wiOlwiXSA9IGpRdWVyeS5leHByLnBzZXVkb3M7XG5qUXVlcnkudW5pcXVlID0gU2l6emxlLnVuaXF1ZVNvcnQ7XG5qUXVlcnkudGV4dCA9IFNpenpsZS5nZXRUZXh0O1xualF1ZXJ5LmlzWE1MRG9jID0gU2l6emxlLmlzWE1MO1xualF1ZXJ5LmNvbnRhaW5zID0gU2l6emxlLmNvbnRhaW5zO1xuXHJcblxyXG59KSggd2luZG93ICk7XHJcbnZhciBydW50aWwgPSAvVW50aWwkLyxcblx0cnBhcmVudHNwcmV2ID0gL14oPzpwYXJlbnRzfHByZXYoPzpVbnRpbHxBbGwpKS8sXG5cdGlzU2ltcGxlID0gL14uW146I1xcW1xcLixdKiQvLFxuXHRybmVlZHNDb250ZXh0ID0galF1ZXJ5LmV4cHIubWF0Y2gubmVlZHNDb250ZXh0LFxuXHQvLyBtZXRob2RzIGd1YXJhbnRlZWQgdG8gcHJvZHVjZSBhIHVuaXF1ZSBzZXQgd2hlbiBzdGFydGluZyBmcm9tIGEgdW5pcXVlIHNldFxuXHRndWFyYW50ZWVkVW5pcXVlID0ge1xuXHRcdGNoaWxkcmVuOiB0cnVlLFxuXHRcdGNvbnRlbnRzOiB0cnVlLFxuXHRcdG5leHQ6IHRydWUsXG5cdFx0cHJldjogdHJ1ZVxuXHR9O1xuXG5qUXVlcnkuZm4uZXh0ZW5kKHtcblx0ZmluZDogZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBpLCBsLCBsZW5ndGgsIG4sIHIsIHJldCxcblx0XHRcdHNlbGYgPSB0aGlzO1xuXG5cdFx0aWYgKCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRyZXR1cm4galF1ZXJ5KCBzZWxlY3RvciApLmZpbHRlcihmdW5jdGlvbigpIHtcblx0XHRcdFx0Zm9yICggaSA9IDAsIGwgPSBzZWxmLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRpZiAoIGpRdWVyeS5jb250YWlucyggc2VsZlsgaSBdLCB0aGlzICkgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHJldCA9IHRoaXMucHVzaFN0YWNrKCBcIlwiLCBcImZpbmRcIiwgc2VsZWN0b3IgKTtcblxuXHRcdGZvciAoIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRsZW5ndGggPSByZXQubGVuZ3RoO1xuXHRcdFx0alF1ZXJ5LmZpbmQoIHNlbGVjdG9yLCB0aGlzW2ldLCByZXQgKTtcblxuXHRcdFx0aWYgKCBpID4gMCApIHtcblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgdGhlIHJlc3VsdHMgYXJlIHVuaXF1ZVxuXHRcdFx0XHRmb3IgKCBuID0gbGVuZ3RoOyBuIDwgcmV0Lmxlbmd0aDsgbisrICkge1xuXHRcdFx0XHRcdGZvciAoIHIgPSAwOyByIDwgbGVuZ3RoOyByKysgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIHJldFtyXSA9PT0gcmV0W25dICkge1xuXHRcdFx0XHRcdFx0XHRyZXQuc3BsaWNlKG4tLSwgMSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0aGFzOiBmdW5jdGlvbiggdGFyZ2V0ICkge1xuXHRcdHZhciBpLFxuXHRcdFx0dGFyZ2V0cyA9IGpRdWVyeSggdGFyZ2V0LCB0aGlzICksXG5cdFx0XHRsZW4gPSB0YXJnZXRzLmxlbmd0aDtcblxuXHRcdHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbigpIHtcblx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdGlmICggalF1ZXJ5LmNvbnRhaW5zKCB0aGlzLCB0YXJnZXRzW2ldICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRub3Q6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5wdXNoU3RhY2soIHdpbm5vdyh0aGlzLCBzZWxlY3RvciwgZmFsc2UpLCBcIm5vdFwiLCBzZWxlY3Rvcik7XG5cdH0sXG5cblx0ZmlsdGVyOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCB3aW5ub3codGhpcywgc2VsZWN0b3IsIHRydWUpLCBcImZpbHRlclwiLCBzZWxlY3RvciApO1xuXHR9LFxuXG5cdGlzOiBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG5cdFx0cmV0dXJuICEhc2VsZWN0b3IgJiYgKFxuXHRcdFx0dHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiID9cblx0XHRcdFx0Ly8gSWYgdGhpcyBpcyBhIHBvc2l0aW9uYWwvcmVsYXRpdmUgc2VsZWN0b3IsIGNoZWNrIG1lbWJlcnNoaXAgaW4gdGhlIHJldHVybmVkIHNldFxuXHRcdFx0XHQvLyBzbyAkKFwicDpmaXJzdFwiKS5pcyhcInA6bGFzdFwiKSB3b24ndCByZXR1cm4gdHJ1ZSBmb3IgYSBkb2Mgd2l0aCB0d28gXCJwXCIuXG5cdFx0XHRcdHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3IgKSA/XG5cdFx0XHRcdFx0alF1ZXJ5KCBzZWxlY3RvciwgdGhpcy5jb250ZXh0ICkuaW5kZXgoIHRoaXNbMF0gKSA+PSAwIDpcblx0XHRcdFx0XHRqUXVlcnkuZmlsdGVyKCBzZWxlY3RvciwgdGhpcyApLmxlbmd0aCA+IDAgOlxuXHRcdFx0XHR0aGlzLmZpbHRlciggc2VsZWN0b3IgKS5sZW5ndGggPiAwICk7XG5cdH0sXG5cblx0Y2xvc2VzdDogZnVuY3Rpb24oIHNlbGVjdG9ycywgY29udGV4dCApIHtcblx0XHR2YXIgY3VyLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsID0gdGhpcy5sZW5ndGgsXG5cdFx0XHRyZXQgPSBbXSxcblx0XHRcdHBvcyA9IHJuZWVkc0NvbnRleHQudGVzdCggc2VsZWN0b3JzICkgfHwgdHlwZW9mIHNlbGVjdG9ycyAhPT0gXCJzdHJpbmdcIiA/XG5cdFx0XHRcdGpRdWVyeSggc2VsZWN0b3JzLCBjb250ZXh0IHx8IHRoaXMuY29udGV4dCApIDpcblx0XHRcdFx0MDtcblxuXHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdGN1ciA9IHRoaXNbaV07XG5cblx0XHRcdHdoaWxlICggY3VyICYmIGN1ci5vd25lckRvY3VtZW50ICYmIGN1ciAhPT0gY29udGV4dCAmJiBjdXIubm9kZVR5cGUgIT09IDExICkge1xuXHRcdFx0XHRpZiAoIHBvcyA/IHBvcy5pbmRleChjdXIpID4gLTEgOiBqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoY3VyLCBzZWxlY3RvcnMpICkge1xuXHRcdFx0XHRcdHJldC5wdXNoKCBjdXIgKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRjdXIgPSBjdXIucGFyZW50Tm9kZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXQgPSByZXQubGVuZ3RoID4gMSA/IGpRdWVyeS51bmlxdWUoIHJldCApIDogcmV0O1xuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQsIFwiY2xvc2VzdFwiLCBzZWxlY3RvcnMgKTtcblx0fSxcblxuXHQvLyBEZXRlcm1pbmUgdGhlIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgd2l0aGluXG5cdC8vIHRoZSBtYXRjaGVkIHNldCBvZiBlbGVtZW50c1xuXHRpbmRleDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cblx0XHQvLyBObyBhcmd1bWVudCwgcmV0dXJuIGluZGV4IGluIHBhcmVudFxuXHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRyZXR1cm4gKCB0aGlzWzBdICYmIHRoaXNbMF0ucGFyZW50Tm9kZSApID8gdGhpcy5wcmV2QWxsKCkubGVuZ3RoIDogLTE7XG5cdFx0fVxuXG5cdFx0Ly8gaW5kZXggaW4gc2VsZWN0b3Jcblx0XHRpZiAoIHR5cGVvZiBlbGVtID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5pbkFycmF5KCB0aGlzWzBdLCBqUXVlcnkoIGVsZW0gKSApO1xuXHRcdH1cblxuXHRcdC8vIExvY2F0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGRlc2lyZWQgZWxlbWVudFxuXHRcdHJldHVybiBqUXVlcnkuaW5BcnJheShcblx0XHRcdC8vIElmIGl0IHJlY2VpdmVzIGEgalF1ZXJ5IG9iamVjdCwgdGhlIGZpcnN0IGVsZW1lbnQgaXMgdXNlZFxuXHRcdFx0ZWxlbS5qcXVlcnkgPyBlbGVtWzBdIDogZWxlbSwgdGhpcyApO1xuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24oIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHZhciBzZXQgPSB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIgP1xuXHRcdFx0XHRqUXVlcnkoIHNlbGVjdG9yLCBjb250ZXh0ICkgOlxuXHRcdFx0XHRqUXVlcnkubWFrZUFycmF5KCBzZWxlY3RvciAmJiBzZWxlY3Rvci5ub2RlVHlwZSA/IFsgc2VsZWN0b3IgXSA6IHNlbGVjdG9yICksXG5cdFx0XHRhbGwgPSBqUXVlcnkubWVyZ2UoIHRoaXMuZ2V0KCksIHNldCApO1xuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBpc0Rpc2Nvbm5lY3RlZCggc2V0WzBdICkgfHwgaXNEaXNjb25uZWN0ZWQoIGFsbFswXSApID9cblx0XHRcdGFsbCA6XG5cdFx0XHRqUXVlcnkudW5pcXVlKCBhbGwgKSApO1xuXHR9LFxuXG5cdGFkZEJhY2s6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5hZGQoIHNlbGVjdG9yID09IG51bGwgP1xuXHRcdFx0dGhpcy5wcmV2T2JqZWN0IDogdGhpcy5wcmV2T2JqZWN0LmZpbHRlcihzZWxlY3Rvcilcblx0XHQpO1xuXHR9XG59KTtcblxualF1ZXJ5LmZuLmFuZFNlbGYgPSBqUXVlcnkuZm4uYWRkQmFjaztcblxuLy8gQSBwYWluZnVsbHkgc2ltcGxlIGNoZWNrIHRvIHNlZSBpZiBhbiBlbGVtZW50IGlzIGRpc2Nvbm5lY3RlZFxuLy8gZnJvbSBhIGRvY3VtZW50IChzaG91bGQgYmUgaW1wcm92ZWQsIHdoZXJlIGZlYXNpYmxlKS5cbmZ1bmN0aW9uIGlzRGlzY29ubmVjdGVkKCBub2RlICkge1xuXHRyZXR1cm4gIW5vZGUgfHwgIW5vZGUucGFyZW50Tm9kZSB8fCBub2RlLnBhcmVudE5vZGUubm9kZVR5cGUgPT09IDExO1xufVxuXG5mdW5jdGlvbiBzaWJsaW5nKCBjdXIsIGRpciApIHtcblx0ZG8ge1xuXHRcdGN1ciA9IGN1clsgZGlyIF07XG5cdH0gd2hpbGUgKCBjdXIgJiYgY3VyLm5vZGVUeXBlICE9PSAxICk7XG5cblx0cmV0dXJuIGN1cjtcbn1cblxualF1ZXJ5LmVhY2goe1xuXHRwYXJlbnQ6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cdFx0cmV0dXJuIHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgIT09IDExID8gcGFyZW50IDogbnVsbDtcblx0fSxcblx0cGFyZW50czogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5kaXIoIGVsZW0sIFwicGFyZW50Tm9kZVwiICk7XG5cdH0sXG5cdHBhcmVudHNVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInBhcmVudE5vZGVcIiwgdW50aWwgKTtcblx0fSxcblx0bmV4dDogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIHNpYmxpbmcoIGVsZW0sIFwibmV4dFNpYmxpbmdcIiApO1xuXHR9LFxuXHRwcmV2OiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4gc2libGluZyggZWxlbSwgXCJwcmV2aW91c1NpYmxpbmdcIiApO1xuXHR9LFxuXHRuZXh0QWxsOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmRpciggZWxlbSwgXCJuZXh0U2libGluZ1wiICk7XG5cdH0sXG5cdHByZXZBbGw6IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiICk7XG5cdH0sXG5cdG5leHRVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcIm5leHRTaWJsaW5nXCIsIHVudGlsICk7XG5cdH0sXG5cdHByZXZVbnRpbDogZnVuY3Rpb24oIGVsZW0sIGksIHVudGlsICkge1xuXHRcdHJldHVybiBqUXVlcnkuZGlyKCBlbGVtLCBcInByZXZpb3VzU2libGluZ1wiLCB1bnRpbCApO1xuXHR9LFxuXHRzaWJsaW5nczogZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5zaWJsaW5nKCAoIGVsZW0ucGFyZW50Tm9kZSB8fCB7fSApLmZpcnN0Q2hpbGQsIGVsZW0gKTtcblx0fSxcblx0Y2hpbGRyZW46IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiBqUXVlcnkuc2libGluZyggZWxlbS5maXJzdENoaWxkICk7XG5cdH0sXG5cdGNvbnRlbnRzOiBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5Lm5vZGVOYW1lKCBlbGVtLCBcImlmcmFtZVwiICkgP1xuXHRcdFx0ZWxlbS5jb250ZW50RG9jdW1lbnQgfHwgZWxlbS5jb250ZW50V2luZG93LmRvY3VtZW50IDpcblx0XHRcdGpRdWVyeS5tZXJnZSggW10sIGVsZW0uY2hpbGROb2RlcyApO1xuXHR9XG59LCBmdW5jdGlvbiggbmFtZSwgZm4gKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHVudGlsLCBzZWxlY3RvciApIHtcblx0XHR2YXIgcmV0ID0galF1ZXJ5Lm1hcCggdGhpcywgZm4sIHVudGlsICk7XG5cblx0XHRpZiAoICFydW50aWwudGVzdCggbmFtZSApICkge1xuXHRcdFx0c2VsZWN0b3IgPSB1bnRpbDtcblx0XHR9XG5cblx0XHRpZiAoIHNlbGVjdG9yICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdHJldCA9IGpRdWVyeS5maWx0ZXIoIHNlbGVjdG9yLCByZXQgKTtcblx0XHR9XG5cblx0XHRyZXQgPSB0aGlzLmxlbmd0aCA+IDEgJiYgIWd1YXJhbnRlZWRVbmlxdWVbIG5hbWUgXSA/IGpRdWVyeS51bmlxdWUoIHJldCApIDogcmV0O1xuXG5cdFx0aWYgKCB0aGlzLmxlbmd0aCA+IDEgJiYgcnBhcmVudHNwcmV2LnRlc3QoIG5hbWUgKSApIHtcblx0XHRcdHJldCA9IHJldC5yZXZlcnNlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQsIG5hbWUsIGNvcmVfc2xpY2UuY2FsbCggYXJndW1lbnRzICkuam9pbihcIixcIikgKTtcblx0fTtcbn0pO1xuXG5qUXVlcnkuZXh0ZW5kKHtcblx0ZmlsdGVyOiBmdW5jdGlvbiggZXhwciwgZWxlbXMsIG5vdCApIHtcblx0XHRpZiAoIG5vdCApIHtcblx0XHRcdGV4cHIgPSBcIjpub3QoXCIgKyBleHByICsgXCIpXCI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1zLmxlbmd0aCA9PT0gMSA/XG5cdFx0XHRqUXVlcnkuZmluZC5tYXRjaGVzU2VsZWN0b3IoZWxlbXNbMF0sIGV4cHIpID8gWyBlbGVtc1swXSBdIDogW10gOlxuXHRcdFx0alF1ZXJ5LmZpbmQubWF0Y2hlcyhleHByLCBlbGVtcyk7XG5cdH0sXG5cblx0ZGlyOiBmdW5jdGlvbiggZWxlbSwgZGlyLCB1bnRpbCApIHtcblx0XHR2YXIgbWF0Y2hlZCA9IFtdLFxuXHRcdFx0Y3VyID0gZWxlbVsgZGlyIF07XG5cblx0XHR3aGlsZSAoIGN1ciAmJiBjdXIubm9kZVR5cGUgIT09IDkgJiYgKHVudGlsID09PSB1bmRlZmluZWQgfHwgY3VyLm5vZGVUeXBlICE9PSAxIHx8ICFqUXVlcnkoIGN1ciApLmlzKCB1bnRpbCApKSApIHtcblx0XHRcdGlmICggY3VyLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRtYXRjaGVkLnB1c2goIGN1ciApO1xuXHRcdFx0fVxuXHRcdFx0Y3VyID0gY3VyW2Rpcl07XG5cdFx0fVxuXHRcdHJldHVybiBtYXRjaGVkO1xuXHR9LFxuXG5cdHNpYmxpbmc6IGZ1bmN0aW9uKCBuLCBlbGVtICkge1xuXHRcdHZhciByID0gW107XG5cblx0XHRmb3IgKCA7IG47IG4gPSBuLm5leHRTaWJsaW5nICkge1xuXHRcdFx0aWYgKCBuLm5vZGVUeXBlID09PSAxICYmIG4gIT09IGVsZW0gKSB7XG5cdFx0XHRcdHIucHVzaCggbiApO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByO1xuXHR9XG59KTtcblxuLy8gSW1wbGVtZW50IHRoZSBpZGVudGljYWwgZnVuY3Rpb25hbGl0eSBmb3IgZmlsdGVyIGFuZCBub3RcbmZ1bmN0aW9uIHdpbm5vdyggZWxlbWVudHMsIHF1YWxpZmllciwga2VlcCApIHtcblxuXHQvLyBDYW4ndCBwYXNzIG51bGwgb3IgdW5kZWZpbmVkIHRvIGluZGV4T2YgaW4gRmlyZWZveCA0XG5cdC8vIFNldCB0byAwIHRvIHNraXAgc3RyaW5nIGNoZWNrXG5cdHF1YWxpZmllciA9IHF1YWxpZmllciB8fCAwO1xuXG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHF1YWxpZmllciApICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ3JlcChlbGVtZW50cywgZnVuY3Rpb24oIGVsZW0sIGkgKSB7XG5cdFx0XHR2YXIgcmV0VmFsID0gISFxdWFsaWZpZXIuY2FsbCggZWxlbSwgaSwgZWxlbSApO1xuXHRcdFx0cmV0dXJuIHJldFZhbCA9PT0ga2VlcDtcblx0XHR9KTtcblxuXHR9IGVsc2UgaWYgKCBxdWFsaWZpZXIubm9kZVR5cGUgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5ncmVwKGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRcdHJldHVybiAoIGVsZW0gPT09IHF1YWxpZmllciApID09PSBrZWVwO1xuXHRcdH0pO1xuXG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBxdWFsaWZpZXIgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0dmFyIGZpbHRlcmVkID0galF1ZXJ5LmdyZXAoZWxlbWVudHMsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0cmV0dXJuIGVsZW0ubm9kZVR5cGUgPT09IDE7XG5cdFx0fSk7XG5cblx0XHRpZiAoIGlzU2ltcGxlLnRlc3QoIHF1YWxpZmllciApICkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5maWx0ZXIocXVhbGlmaWVyLCBmaWx0ZXJlZCwgIWtlZXApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRxdWFsaWZpZXIgPSBqUXVlcnkuZmlsdGVyKCBxdWFsaWZpZXIsIGZpbHRlcmVkICk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGpRdWVyeS5ncmVwKGVsZW1lbnRzLCBmdW5jdGlvbiggZWxlbSwgaSApIHtcblx0XHRyZXR1cm4gKCBqUXVlcnkuaW5BcnJheSggZWxlbSwgcXVhbGlmaWVyICkgPj0gMCApID09PSBrZWVwO1xuXHR9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVNhZmVGcmFnbWVudCggZG9jdW1lbnQgKSB7XG5cdHZhciBsaXN0ID0gbm9kZU5hbWVzLnNwbGl0KCBcInxcIiApLFxuXHRzYWZlRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuXHRpZiAoIHNhZmVGcmFnLmNyZWF0ZUVsZW1lbnQgKSB7XG5cdFx0d2hpbGUgKCBsaXN0Lmxlbmd0aCApIHtcblx0XHRcdHNhZmVGcmFnLmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdGxpc3QucG9wKClcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBzYWZlRnJhZztcbn1cblxudmFyIG5vZGVOYW1lcyA9IFwiYWJicnxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJkaXxjYW52YXN8ZGF0YXxkYXRhbGlzdHxkZXRhaWxzfGZpZ2NhcHRpb258ZmlndXJlfGZvb3RlcnxcIiArXG5cdFx0XCJoZWFkZXJ8aGdyb3VwfG1hcmt8bWV0ZXJ8bmF2fG91dHB1dHxwcm9ncmVzc3xzZWN0aW9ufHN1bW1hcnl8dGltZXx2aWRlb1wiLFxuXHRyaW5saW5lalF1ZXJ5ID0gLyBqUXVlcnlcXGQrPVwiKD86bnVsbHxcXGQrKVwiL2csXG5cdHJsZWFkaW5nV2hpdGVzcGFjZSA9IC9eXFxzKy8sXG5cdHJ4aHRtbFRhZyA9IC88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9naSxcblx0cnRhZ05hbWUgPSAvPChbXFx3Ol0rKS8sXG5cdHJ0Ym9keSA9IC88dGJvZHkvaSxcblx0cmh0bWwgPSAvPHwmIz9cXHcrOy8sXG5cdHJub0lubmVyaHRtbCA9IC88KD86c2NyaXB0fHN0eWxlfGxpbmspL2ksXG5cdHJub2NhY2hlID0gLzwoPzpzY3JpcHR8b2JqZWN0fGVtYmVkfG9wdGlvbnxzdHlsZSkvaSxcblx0cm5vc2hpbWNhY2hlID0gbmV3IFJlZ0V4cChcIjwoPzpcIiArIG5vZGVOYW1lcyArIFwiKVtcXFxccy8+XVwiLCBcImlcIiksXG5cdHJjaGVja2FibGVUeXBlID0gL14oPzpjaGVja2JveHxyYWRpbykkLyxcblx0Ly8gY2hlY2tlZD1cImNoZWNrZWRcIiBvciBjaGVja2VkXG5cdHJjaGVja2VkID0gL2NoZWNrZWRcXHMqKD86W149XXw9XFxzKi5jaGVja2VkLikvaSxcblx0cnNjcmlwdFR5cGUgPSAvXFwvKGphdmF8ZWNtYSlzY3JpcHQvaSxcblx0cmNsZWFuU2NyaXB0ID0gL15cXHMqPCEoPzpcXFtDREFUQVxcW3xcXC1cXC0pfFtcXF1cXC1dezJ9PlxccyokL2csXG5cdHdyYXBNYXAgPSB7XG5cdFx0b3B0aW9uOiBbIDEsIFwiPHNlbGVjdCBtdWx0aXBsZT0nbXVsdGlwbGUnPlwiLCBcIjwvc2VsZWN0PlwiIF0sXG5cdFx0bGVnZW5kOiBbIDEsIFwiPGZpZWxkc2V0PlwiLCBcIjwvZmllbGRzZXQ+XCIgXSxcblx0XHR0aGVhZDogWyAxLCBcIjx0YWJsZT5cIiwgXCI8L3RhYmxlPlwiIF0sXG5cdFx0dHI6IFsgMiwgXCI8dGFibGU+PHRib2R5PlwiLCBcIjwvdGJvZHk+PC90YWJsZT5cIiBdLFxuXHRcdHRkOiBbIDMsIFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsIFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCIgXSxcblx0XHRjb2w6IFsgMiwgXCI8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIiBdLFxuXHRcdGFyZWE6IFsgMSwgXCI8bWFwPlwiLCBcIjwvbWFwPlwiIF0sXG5cdFx0X2RlZmF1bHQ6IFsgMCwgXCJcIiwgXCJcIiBdXG5cdH0sXG5cdHNhZmVGcmFnbWVudCA9IGNyZWF0ZVNhZmVGcmFnbWVudCggZG9jdW1lbnQgKSxcblx0ZnJhZ21lbnREaXYgPSBzYWZlRnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikgKTtcblxud3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xud3JhcE1hcC50Ym9keSA9IHdyYXBNYXAudGZvb3QgPSB3cmFwTWFwLmNvbGdyb3VwID0gd3JhcE1hcC5jYXB0aW9uID0gd3JhcE1hcC50aGVhZDtcbndyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG4vLyBJRTYtOCBjYW4ndCBzZXJpYWxpemUgbGluaywgc2NyaXB0LCBzdHlsZSwgb3IgYW55IGh0bWw1IChOb1Njb3BlKSB0YWdzLFxuLy8gdW5sZXNzIHdyYXBwZWQgaW4gYSBkaXYgd2l0aCBub24tYnJlYWtpbmcgY2hhcmFjdGVycyBpbiBmcm9udCBvZiBpdC5cbmlmICggIWpRdWVyeS5zdXBwb3J0Lmh0bWxTZXJpYWxpemUgKSB7XG5cdHdyYXBNYXAuX2RlZmF1bHQgPSBbIDEsIFwiWDxkaXY+XCIsIFwiPC9kaXY+XCIgXTtcbn1cblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdHRleHQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmFjY2VzcyggdGhpcywgZnVuY3Rpb24oIHZhbHVlICkge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgP1xuXHRcdFx0XHRqUXVlcnkudGV4dCggdGhpcyApIDpcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmFwcGVuZCggKCB0aGlzWzBdICYmIHRoaXNbMF0ub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCApLmNyZWF0ZVRleHROb2RlKCB2YWx1ZSApICk7XG5cdFx0fSwgbnVsbCwgdmFsdWUsIGFyZ3VtZW50cy5sZW5ndGggKTtcblx0fSxcblxuXHR3cmFwQWxsOiBmdW5jdGlvbiggaHRtbCApIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBodG1sICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKGkpIHtcblx0XHRcdFx0alF1ZXJ5KHRoaXMpLndyYXBBbGwoIGh0bWwuY2FsbCh0aGlzLCBpKSApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzWzBdICkge1xuXHRcdFx0Ly8gVGhlIGVsZW1lbnRzIHRvIHdyYXAgdGhlIHRhcmdldCBhcm91bmRcblx0XHRcdHZhciB3cmFwID0galF1ZXJ5KCBodG1sLCB0aGlzWzBdLm93bmVyRG9jdW1lbnQgKS5lcSgwKS5jbG9uZSh0cnVlKTtcblxuXHRcdFx0aWYgKCB0aGlzWzBdLnBhcmVudE5vZGUgKSB7XG5cdFx0XHRcdHdyYXAuaW5zZXJ0QmVmb3JlKCB0aGlzWzBdICk7XG5cdFx0XHR9XG5cblx0XHRcdHdyYXAubWFwKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgZWxlbSA9IHRoaXM7XG5cblx0XHRcdFx0d2hpbGUgKCBlbGVtLmZpcnN0Q2hpbGQgJiYgZWxlbS5maXJzdENoaWxkLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdGVsZW0gPSBlbGVtLmZpcnN0Q2hpbGQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZWxlbTtcblx0XHRcdH0pLmFwcGVuZCggdGhpcyApO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHdyYXBJbm5lcjogZnVuY3Rpb24oIGh0bWwgKSB7XG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggaHRtbCApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKSB7XG5cdFx0XHRcdGpRdWVyeSh0aGlzKS53cmFwSW5uZXIoIGh0bWwuY2FsbCh0aGlzLCBpKSApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHZhciBzZWxmID0galF1ZXJ5KCB0aGlzICksXG5cdFx0XHRcdGNvbnRlbnRzID0gc2VsZi5jb250ZW50cygpO1xuXG5cdFx0XHRpZiAoIGNvbnRlbnRzLmxlbmd0aCApIHtcblx0XHRcdFx0Y29udGVudHMud3JhcEFsbCggaHRtbCApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxmLmFwcGVuZCggaHRtbCApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXG5cdHdyYXA6IGZ1bmN0aW9uKCBodG1sICkge1xuXHRcdHZhciBpc0Z1bmN0aW9uID0galF1ZXJ5LmlzRnVuY3Rpb24oIGh0bWwgKTtcblxuXHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oaSkge1xuXHRcdFx0alF1ZXJ5KCB0aGlzICkud3JhcEFsbCggaXNGdW5jdGlvbiA/IGh0bWwuY2FsbCh0aGlzLCBpKSA6IGh0bWwgKTtcblx0XHR9KTtcblx0fSxcblxuXHR1bndyYXA6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnBhcmVudCgpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoICFqUXVlcnkubm9kZU5hbWUoIHRoaXMsIFwiYm9keVwiICkgKSB7XG5cdFx0XHRcdGpRdWVyeSggdGhpcyApLnJlcGxhY2VXaXRoKCB0aGlzLmNoaWxkTm9kZXMgKTtcblx0XHRcdH1cblx0XHR9KS5lbmQoKTtcblx0fSxcblxuXHRhcHBlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmRvbU1hbmlwKGFyZ3VtZW50cywgdHJ1ZSwgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRpZiAoIHRoaXMubm9kZVR5cGUgPT09IDEgfHwgdGhpcy5ub2RlVHlwZSA9PT0gMTEgKSB7XG5cdFx0XHRcdHRoaXMuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHRwcmVwZW5kOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5kb21NYW5pcChhcmd1bWVudHMsIHRydWUsIGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0aWYgKCB0aGlzLm5vZGVUeXBlID09PSAxIHx8IHRoaXMubm9kZVR5cGUgPT09IDExICkge1xuXHRcdFx0XHR0aGlzLmluc2VydEJlZm9yZSggZWxlbSwgdGhpcy5maXJzdENoaWxkICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0YmVmb3JlOiBmdW5jdGlvbigpIHtcblx0XHRpZiAoICFpc0Rpc2Nvbm5lY3RlZCggdGhpc1swXSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCBmYWxzZSwgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHZhciBzZXQgPSBqUXVlcnkuY2xlYW4oIGFyZ3VtZW50cyApO1xuXHRcdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWVyZ2UoIHNldCwgdGhpcyApLCBcImJlZm9yZVwiLCB0aGlzLnNlbGVjdG9yICk7XG5cdFx0fVxuXHR9LFxuXG5cdGFmdGVyOiBmdW5jdGlvbigpIHtcblx0XHRpZiAoICFpc0Rpc2Nvbm5lY3RlZCggdGhpc1swXSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZG9tTWFuaXAoYXJndW1lbnRzLCBmYWxzZSwgZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0XHRcdHRoaXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIGVsZW0sIHRoaXMubmV4dFNpYmxpbmcgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRcdHZhciBzZXQgPSBqUXVlcnkuY2xlYW4oIGFyZ3VtZW50cyApO1xuXHRcdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCBqUXVlcnkubWVyZ2UoIHRoaXMsIHNldCApLCBcImFmdGVyXCIsIHRoaXMuc2VsZWN0b3IgKTtcblx0XHR9XG5cdH0sXG5cblx0Ly8ga2VlcERhdGEgaXMgZm9yIGludGVybmFsIHVzZSBvbmx5LS1kbyBub3QgZG9jdW1lbnRcblx0cmVtb3ZlOiBmdW5jdGlvbiggc2VsZWN0b3IsIGtlZXBEYXRhICkge1xuXHRcdHZhciBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7IChlbGVtID0gdGhpc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0aWYgKCAhc2VsZWN0b3IgfHwgalF1ZXJ5LmZpbHRlciggc2VsZWN0b3IsIFsgZWxlbSBdICkubGVuZ3RoICkge1xuXHRcdFx0XHRpZiAoICFrZWVwRGF0YSAmJiBlbGVtLm5vZGVUeXBlID09PSAxICkge1xuXHRcdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpICk7XG5cdFx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggWyBlbGVtIF0gKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0XHRcdGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWxlbSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZW1wdHk6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlbGVtLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRmb3IgKCA7IChlbGVtID0gdGhpc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRpZiAoIGVsZW0ubm9kZVR5cGUgPT09IDEgKSB7XG5cdFx0XHRcdGpRdWVyeS5jbGVhbkRhdGEoIGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCIqXCIpICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSBhbnkgcmVtYWluaW5nIG5vZGVzXG5cdFx0XHR3aGlsZSAoIGVsZW0uZmlyc3RDaGlsZCApIHtcblx0XHRcdFx0ZWxlbS5yZW1vdmVDaGlsZCggZWxlbS5maXJzdENoaWxkICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0Y2xvbmU6IGZ1bmN0aW9uKCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHRkYXRhQW5kRXZlbnRzID0gZGF0YUFuZEV2ZW50cyA9PSBudWxsID8gZmFsc2UgOiBkYXRhQW5kRXZlbnRzO1xuXHRcdGRlZXBEYXRhQW5kRXZlbnRzID0gZGVlcERhdGFBbmRFdmVudHMgPT0gbnVsbCA/IGRhdGFBbmRFdmVudHMgOiBkZWVwRGF0YUFuZEV2ZW50cztcblxuXHRcdHJldHVybiB0aGlzLm1hcCggZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGpRdWVyeS5jbG9uZSggdGhpcywgZGF0YUFuZEV2ZW50cywgZGVlcERhdGFBbmRFdmVudHMgKTtcblx0XHR9KTtcblx0fSxcblxuXHRodG1sOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0cmV0dXJuIGpRdWVyeS5hY2Nlc3MoIHRoaXMsIGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBlbGVtID0gdGhpc1swXSB8fCB7fSxcblx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdGwgPSB0aGlzLmxlbmd0aDtcblxuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gZWxlbS5ub2RlVHlwZSA9PT0gMSA/XG5cdFx0XHRcdFx0ZWxlbS5pbm5lckhUTUwucmVwbGFjZSggcmlubGluZWpRdWVyeSwgXCJcIiApIDpcblx0XHRcdFx0XHR1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNlZSBpZiB3ZSBjYW4gdGFrZSBhIHNob3J0Y3V0IGFuZCBqdXN0IHVzZSBpbm5lckhUTUxcblx0XHRcdGlmICggdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICFybm9Jbm5lcmh0bWwudGVzdCggdmFsdWUgKSAmJlxuXHRcdFx0XHQoIGpRdWVyeS5zdXBwb3J0Lmh0bWxTZXJpYWxpemUgfHwgIXJub3NoaW1jYWNoZS50ZXN0KCB2YWx1ZSApICApICYmXG5cdFx0XHRcdCggalF1ZXJ5LnN1cHBvcnQubGVhZGluZ1doaXRlc3BhY2UgfHwgIXJsZWFkaW5nV2hpdGVzcGFjZS50ZXN0KCB2YWx1ZSApICkgJiZcblx0XHRcdFx0IXdyYXBNYXBbICggcnRhZ05hbWUuZXhlYyggdmFsdWUgKSB8fCBbXCJcIiwgXCJcIl0gKVsxXS50b0xvd2VyQ2FzZSgpIF0gKSB7XG5cblx0XHRcdFx0dmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCByeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIgKTtcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGZvciAoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIGVsZW1lbnQgbm9kZXMgYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtzXG5cdFx0XHRcdFx0XHRlbGVtID0gdGhpc1tpXSB8fCB7fTtcblx0XHRcdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSApIHtcblx0XHRcdFx0XHRcdFx0alF1ZXJ5LmNsZWFuRGF0YSggZWxlbS5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCIqXCIgKSApO1xuXHRcdFx0XHRcdFx0XHRlbGVtLmlubmVySFRNTCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGVsZW0gPSAwO1xuXG5cdFx0XHRcdC8vIElmIHVzaW5nIGlubmVySFRNTCB0aHJvd3MgYW4gZXhjZXB0aW9uLCB1c2UgdGhlIGZhbGxiYWNrIG1ldGhvZFxuXHRcdFx0XHR9IGNhdGNoKGUpIHt9XG5cdFx0XHR9XG5cblx0XHRcdGlmICggZWxlbSApIHtcblx0XHRcdFx0dGhpcy5lbXB0eSgpLmFwcGVuZCggdmFsdWUgKTtcblx0XHRcdH1cblx0XHR9LCBudWxsLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCApO1xuXHR9LFxuXG5cdHJlcGxhY2VXaXRoOiBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0aWYgKCAhaXNEaXNjb25uZWN0ZWQoIHRoaXNbMF0gKSApIHtcblx0XHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHRoZSBlbGVtZW50cyBhcmUgcmVtb3ZlZCBmcm9tIHRoZSBET00gYmVmb3JlIHRoZXkgYXJlIGluc2VydGVkXG5cdFx0XHQvLyB0aGlzIGNhbiBoZWxwIGZpeCByZXBsYWNpbmcgYSBwYXJlbnQgd2l0aCBjaGlsZCBlbGVtZW50c1xuXHRcdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKSB7XG5cdFx0XHRcdFx0dmFyIHNlbGYgPSBqUXVlcnkodGhpcyksIG9sZCA9IHNlbGYuaHRtbCgpO1xuXHRcdFx0XHRcdHNlbGYucmVwbGFjZVdpdGgoIHZhbHVlLmNhbGwoIHRoaXMsIGksIG9sZCApICk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0dmFsdWUgPSBqUXVlcnkoIHZhbHVlICkuZGV0YWNoKCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBuZXh0ID0gdGhpcy5uZXh0U2libGluZyxcblx0XHRcdFx0XHRwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG5cblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkucmVtb3ZlKCk7XG5cblx0XHRcdFx0aWYgKCBuZXh0ICkge1xuXHRcdFx0XHRcdGpRdWVyeShuZXh0KS5iZWZvcmUoIHZhbHVlICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0alF1ZXJ5KHBhcmVudCkuYXBwZW5kKCB2YWx1ZSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5sZW5ndGggP1xuXHRcdFx0dGhpcy5wdXNoU3RhY2soIGpRdWVyeShqUXVlcnkuaXNGdW5jdGlvbih2YWx1ZSkgPyB2YWx1ZSgpIDogdmFsdWUpLCBcInJlcGxhY2VXaXRoXCIsIHZhbHVlICkgOlxuXHRcdFx0dGhpcztcblx0fSxcblxuXHRkZXRhY2g6IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcblx0XHRyZXR1cm4gdGhpcy5yZW1vdmUoIHNlbGVjdG9yLCB0cnVlICk7XG5cdH0sXG5cblx0ZG9tTWFuaXA6IGZ1bmN0aW9uKCBhcmdzLCB0YWJsZSwgY2FsbGJhY2sgKSB7XG5cblx0XHQvLyBGbGF0dGVuIGFueSBuZXN0ZWQgYXJyYXlzXG5cdFx0YXJncyA9IFtdLmNvbmNhdC5hcHBseSggW10sIGFyZ3MgKTtcblxuXHRcdHZhciByZXN1bHRzLCBmaXJzdCwgZnJhZ21lbnQsIGlOb0Nsb25lLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHR2YWx1ZSA9IGFyZ3NbMF0sXG5cdFx0XHRzY3JpcHRzID0gW10sXG5cdFx0XHRsID0gdGhpcy5sZW5ndGg7XG5cblx0XHQvLyBXZSBjYW4ndCBjbG9uZU5vZGUgZnJhZ21lbnRzIHRoYXQgY29udGFpbiBjaGVja2VkLCBpbiBXZWJLaXRcblx0XHRpZiAoICFqUXVlcnkuc3VwcG9ydC5jaGVja0Nsb25lICYmIGwgPiAxICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiByY2hlY2tlZC50ZXN0KCB2YWx1ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0alF1ZXJ5KHRoaXMpLmRvbU1hbmlwKCBhcmdzLCB0YWJsZSwgY2FsbGJhY2sgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24odmFsdWUpICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbihpKSB7XG5cdFx0XHRcdHZhciBzZWxmID0galF1ZXJ5KHRoaXMpO1xuXHRcdFx0XHRhcmdzWzBdID0gdmFsdWUuY2FsbCggdGhpcywgaSwgdGFibGUgPyBzZWxmLmh0bWwoKSA6IHVuZGVmaW5lZCApO1xuXHRcdFx0XHRzZWxmLmRvbU1hbmlwKCBhcmdzLCB0YWJsZSwgY2FsbGJhY2sgKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmICggdGhpc1swXSApIHtcblx0XHRcdHJlc3VsdHMgPSBqUXVlcnkuYnVpbGRGcmFnbWVudCggYXJncywgdGhpcywgc2NyaXB0cyApO1xuXHRcdFx0ZnJhZ21lbnQgPSByZXN1bHRzLmZyYWdtZW50O1xuXHRcdFx0Zmlyc3QgPSBmcmFnbWVudC5maXJzdENoaWxkO1xuXG5cdFx0XHRpZiAoIGZyYWdtZW50LmNoaWxkTm9kZXMubGVuZ3RoID09PSAxICkge1xuXHRcdFx0XHRmcmFnbWVudCA9IGZpcnN0O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIGZpcnN0ICkge1xuXHRcdFx0XHR0YWJsZSA9IHRhYmxlICYmIGpRdWVyeS5ub2RlTmFtZSggZmlyc3QsIFwidHJcIiApO1xuXG5cdFx0XHRcdC8vIFVzZSB0aGUgb3JpZ2luYWwgZnJhZ21lbnQgZm9yIHRoZSBsYXN0IGl0ZW0gaW5zdGVhZCBvZiB0aGUgZmlyc3QgYmVjYXVzZSBpdCBjYW4gZW5kIHVwXG5cdFx0XHRcdC8vIGJlaW5nIGVtcHRpZWQgaW5jb3JyZWN0bHkgaW4gY2VydGFpbiBzaXR1YXRpb25zICgjODA3MCkuXG5cdFx0XHRcdC8vIEZyYWdtZW50cyBmcm9tIHRoZSBmcmFnbWVudCBjYWNoZSBtdXN0IGFsd2F5cyBiZSBjbG9uZWQgYW5kIG5ldmVyIHVzZWQgaW4gcGxhY2UuXG5cdFx0XHRcdGZvciAoIGlOb0Nsb25lID0gcmVzdWx0cy5jYWNoZWFibGUgfHwgbCAtIDE7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbChcblx0XHRcdFx0XHRcdHRhYmxlICYmIGpRdWVyeS5ub2RlTmFtZSggdGhpc1tpXSwgXCJ0YWJsZVwiICkgP1xuXHRcdFx0XHRcdFx0XHRmaW5kT3JBcHBlbmQoIHRoaXNbaV0sIFwidGJvZHlcIiApIDpcblx0XHRcdFx0XHRcdFx0dGhpc1tpXSxcblx0XHRcdFx0XHRcdGkgPT09IGlOb0Nsb25lID9cblx0XHRcdFx0XHRcdFx0ZnJhZ21lbnQgOlxuXHRcdFx0XHRcdFx0XHRqUXVlcnkuY2xvbmUoIGZyYWdtZW50LCB0cnVlLCB0cnVlIClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIEZpeCAjMTE4MDk6IEF2b2lkIGxlYWtpbmcgbWVtb3J5XG5cdFx0XHRmcmFnbWVudCA9IGZpcnN0ID0gbnVsbDtcblxuXHRcdFx0aWYgKCBzY3JpcHRzLmxlbmd0aCApIHtcblx0XHRcdFx0alF1ZXJ5LmVhY2goIHNjcmlwdHMsIGZ1bmN0aW9uKCBpLCBlbGVtICkge1xuXHRcdFx0XHRcdGlmICggZWxlbS5zcmMgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5hamF4ICkge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuYWpheCh7XG5cdFx0XHRcdFx0XHRcdFx0dXJsOiBlbGVtLnNyYyxcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIkdFVFwiLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGFUeXBlOiBcInNjcmlwdFwiLFxuXHRcdFx0XHRcdFx0XHRcdGFzeW5jOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHRnbG9iYWw6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcdFwidGhyb3dzXCI6IHRydWVcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRqUXVlcnkuZXJyb3IoXCJubyBhamF4XCIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkuZ2xvYmFsRXZhbCggKCBlbGVtLnRleHQgfHwgZWxlbS50ZXh0Q29udGVudCB8fCBlbGVtLmlubmVySFRNTCB8fCBcIlwiICkucmVwbGFjZSggcmNsZWFuU2NyaXB0LCBcIlwiICkgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRcdGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZWxlbSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBmaW5kT3JBcHBlbmQoIGVsZW0sIHRhZyApIHtcblx0cmV0dXJuIGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoIHRhZyApWzBdIHx8IGVsZW0uYXBwZW5kQ2hpbGQoIGVsZW0ub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCB0YWcgKSApO1xufVxuXG5mdW5jdGlvbiBjbG9uZUNvcHlFdmVudCggc3JjLCBkZXN0ICkge1xuXG5cdGlmICggZGVzdC5ub2RlVHlwZSAhPT0gMSB8fCAhalF1ZXJ5Lmhhc0RhdGEoIHNyYyApICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHZhciB0eXBlLCBpLCBsLFxuXHRcdG9sZERhdGEgPSBqUXVlcnkuX2RhdGEoIHNyYyApLFxuXHRcdGN1ckRhdGEgPSBqUXVlcnkuX2RhdGEoIGRlc3QsIG9sZERhdGEgKSxcblx0XHRldmVudHMgPSBvbGREYXRhLmV2ZW50cztcblxuXHRpZiAoIGV2ZW50cyApIHtcblx0XHRkZWxldGUgY3VyRGF0YS5oYW5kbGU7XG5cdFx0Y3VyRGF0YS5ldmVudHMgPSB7fTtcblxuXHRcdGZvciAoIHR5cGUgaW4gZXZlbnRzICkge1xuXHRcdFx0Zm9yICggaSA9IDAsIGwgPSBldmVudHNbIHR5cGUgXS5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRcdGpRdWVyeS5ldmVudC5hZGQoIGRlc3QsIHR5cGUsIGV2ZW50c1sgdHlwZSBdWyBpIF0gKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBtYWtlIHRoZSBjbG9uZWQgcHVibGljIGRhdGEgb2JqZWN0IGEgY29weSBmcm9tIHRoZSBvcmlnaW5hbFxuXHRpZiAoIGN1ckRhdGEuZGF0YSApIHtcblx0XHRjdXJEYXRhLmRhdGEgPSBqUXVlcnkuZXh0ZW5kKCB7fSwgY3VyRGF0YS5kYXRhICk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY2xvbmVGaXhBdHRyaWJ1dGVzKCBzcmMsIGRlc3QgKSB7XG5cdHZhciBub2RlTmFtZTtcblxuXHQvLyBXZSBkbyBub3QgbmVlZCB0byBkbyBhbnl0aGluZyBmb3Igbm9uLUVsZW1lbnRzXG5cdGlmICggZGVzdC5ub2RlVHlwZSAhPT0gMSApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBjbGVhckF0dHJpYnV0ZXMgcmVtb3ZlcyB0aGUgYXR0cmlidXRlcywgd2hpY2ggd2UgZG9uJ3Qgd2FudCxcblx0Ly8gYnV0IGFsc28gcmVtb3ZlcyB0aGUgYXR0YWNoRXZlbnQgZXZlbnRzLCB3aGljaCB3ZSAqZG8qIHdhbnRcblx0aWYgKCBkZXN0LmNsZWFyQXR0cmlidXRlcyApIHtcblx0XHRkZXN0LmNsZWFyQXR0cmlidXRlcygpO1xuXHR9XG5cblx0Ly8gbWVyZ2VBdHRyaWJ1dGVzLCBpbiBjb250cmFzdCwgb25seSBtZXJnZXMgYmFjayBvbiB0aGVcblx0Ly8gb3JpZ2luYWwgYXR0cmlidXRlcywgbm90IHRoZSBldmVudHNcblx0aWYgKCBkZXN0Lm1lcmdlQXR0cmlidXRlcyApIHtcblx0XHRkZXN0Lm1lcmdlQXR0cmlidXRlcyggc3JjICk7XG5cdH1cblxuXHRub2RlTmFtZSA9IGRlc3Qubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuXHRpZiAoIG5vZGVOYW1lID09PSBcIm9iamVjdFwiICkge1xuXHRcdC8vIElFNi0xMCBpbXByb3Blcmx5IGNsb25lcyBjaGlsZHJlbiBvZiBvYmplY3QgZWxlbWVudHMgdXNpbmcgY2xhc3NpZC5cblx0XHQvLyBJRTEwIHRocm93cyBOb01vZGlmaWNhdGlvbkFsbG93ZWRFcnJvciBpZiBwYXJlbnQgaXMgbnVsbCwgIzEyMTMyLlxuXHRcdGlmICggZGVzdC5wYXJlbnROb2RlICkge1xuXHRcdFx0ZGVzdC5vdXRlckhUTUwgPSBzcmMub3V0ZXJIVE1MO1xuXHRcdH1cblxuXHRcdC8vIFRoaXMgcGF0aCBhcHBlYXJzIHVuYXZvaWRhYmxlIGZvciBJRTkuIFdoZW4gY2xvbmluZyBhbiBvYmplY3Rcblx0XHQvLyBlbGVtZW50IGluIElFOSwgdGhlIG91dGVySFRNTCBzdHJhdGVneSBhYm92ZSBpcyBub3Qgc3VmZmljaWVudC5cblx0XHQvLyBJZiB0aGUgc3JjIGhhcyBpbm5lckhUTUwgYW5kIHRoZSBkZXN0aW5hdGlvbiBkb2VzIG5vdCxcblx0XHQvLyBjb3B5IHRoZSBzcmMuaW5uZXJIVE1MIGludG8gdGhlIGRlc3QuaW5uZXJIVE1MLiAjMTAzMjRcblx0XHRpZiAoIGpRdWVyeS5zdXBwb3J0Lmh0bWw1Q2xvbmUgJiYgKHNyYy5pbm5lckhUTUwgJiYgIWpRdWVyeS50cmltKGRlc3QuaW5uZXJIVE1MKSkgKSB7XG5cdFx0XHRkZXN0LmlubmVySFRNTCA9IHNyYy5pbm5lckhUTUw7XG5cdFx0fVxuXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgJiYgcmNoZWNrYWJsZVR5cGUudGVzdCggc3JjLnR5cGUgKSApIHtcblx0XHQvLyBJRTYtOCBmYWlscyB0byBwZXJzaXN0IHRoZSBjaGVja2VkIHN0YXRlIG9mIGEgY2xvbmVkIGNoZWNrYm94XG5cdFx0Ly8gb3IgcmFkaW8gYnV0dG9uLiBXb3JzZSwgSUU2LTcgZmFpbCB0byBnaXZlIHRoZSBjbG9uZWQgZWxlbWVudFxuXHRcdC8vIGEgY2hlY2tlZCBhcHBlYXJhbmNlIGlmIHRoZSBkZWZhdWx0Q2hlY2tlZCB2YWx1ZSBpc24ndCBhbHNvIHNldFxuXG5cdFx0ZGVzdC5kZWZhdWx0Q2hlY2tlZCA9IGRlc3QuY2hlY2tlZCA9IHNyYy5jaGVja2VkO1xuXG5cdFx0Ly8gSUU2LTcgZ2V0IGNvbmZ1c2VkIGFuZCBlbmQgdXAgc2V0dGluZyB0aGUgdmFsdWUgb2YgYSBjbG9uZWRcblx0XHQvLyBjaGVja2JveC9yYWRpbyBidXR0b24gdG8gYW4gZW1wdHkgc3RyaW5nIGluc3RlYWQgb2YgXCJvblwiXG5cdFx0aWYgKCBkZXN0LnZhbHVlICE9PSBzcmMudmFsdWUgKSB7XG5cdFx0XHRkZXN0LnZhbHVlID0gc3JjLnZhbHVlO1xuXHRcdH1cblxuXHQvLyBJRTYtOCBmYWlscyB0byByZXR1cm4gdGhlIHNlbGVjdGVkIG9wdGlvbiB0byB0aGUgZGVmYXVsdCBzZWxlY3RlZFxuXHQvLyBzdGF0ZSB3aGVuIGNsb25pbmcgb3B0aW9uc1xuXHR9IGVsc2UgaWYgKCBub2RlTmFtZSA9PT0gXCJvcHRpb25cIiApIHtcblx0XHRkZXN0LnNlbGVjdGVkID0gc3JjLmRlZmF1bHRTZWxlY3RlZDtcblxuXHQvLyBJRTYtOCBmYWlscyB0byBzZXQgdGhlIGRlZmF1bHRWYWx1ZSB0byB0aGUgY29ycmVjdCB2YWx1ZSB3aGVuXG5cdC8vIGNsb25pbmcgb3RoZXIgdHlwZXMgb2YgaW5wdXQgZmllbGRzXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcImlucHV0XCIgfHwgbm9kZU5hbWUgPT09IFwidGV4dGFyZWFcIiApIHtcblx0XHRkZXN0LmRlZmF1bHRWYWx1ZSA9IHNyYy5kZWZhdWx0VmFsdWU7XG5cblx0Ly8gSUUgYmxhbmtzIGNvbnRlbnRzIHdoZW4gY2xvbmluZyBzY3JpcHRzXG5cdH0gZWxzZSBpZiAoIG5vZGVOYW1lID09PSBcInNjcmlwdFwiICYmIGRlc3QudGV4dCAhPT0gc3JjLnRleHQgKSB7XG5cdFx0ZGVzdC50ZXh0ID0gc3JjLnRleHQ7XG5cdH1cblxuXHQvLyBFdmVudCBkYXRhIGdldHMgcmVmZXJlbmNlZCBpbnN0ZWFkIG9mIGNvcGllZCBpZiB0aGUgZXhwYW5kb1xuXHQvLyBnZXRzIGNvcGllZCB0b29cblx0ZGVzdC5yZW1vdmVBdHRyaWJ1dGUoIGpRdWVyeS5leHBhbmRvICk7XG59XG5cbmpRdWVyeS5idWlsZEZyYWdtZW50ID0gZnVuY3Rpb24oIGFyZ3MsIGNvbnRleHQsIHNjcmlwdHMgKSB7XG5cdHZhciBmcmFnbWVudCwgY2FjaGVhYmxlLCBjYWNoZWhpdCxcblx0XHRmaXJzdCA9IGFyZ3NbIDAgXTtcblxuXHQvLyBTZXQgY29udGV4dCBmcm9tIHdoYXQgbWF5IGNvbWUgaW4gYXMgdW5kZWZpbmVkIG9yIGEgalF1ZXJ5IGNvbGxlY3Rpb24gb3IgYSBub2RlXG5cdC8vIFVwZGF0ZWQgdG8gZml4ICMxMjI2NiB3aGVyZSBhY2Nlc3NpbmcgY29udGV4dFswXSBjb3VsZCB0aHJvdyBhbiBleGNlcHRpb24gaW4gSUU5LzEwICZcblx0Ly8gYWxzbyBkb3VibGVzIGFzIGZpeCBmb3IgIzg5NTAgd2hlcmUgcGxhaW4gb2JqZWN0cyBjYXVzZWQgY3JlYXRlRG9jdW1lbnRGcmFnbWVudCBleGNlcHRpb25cblx0Y29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cdGNvbnRleHQgPSAhY29udGV4dC5ub2RlVHlwZSAmJiBjb250ZXh0WzBdIHx8IGNvbnRleHQ7XG5cdGNvbnRleHQgPSBjb250ZXh0Lm93bmVyRG9jdW1lbnQgfHwgY29udGV4dDtcblxuXHQvLyBPbmx5IGNhY2hlIFwic21hbGxcIiAoMS8yIEtCKSBIVE1MIHN0cmluZ3MgdGhhdCBhcmUgYXNzb2NpYXRlZCB3aXRoIHRoZSBtYWluIGRvY3VtZW50XG5cdC8vIENsb25pbmcgb3B0aW9ucyBsb3NlcyB0aGUgc2VsZWN0ZWQgc3RhdGUsIHNvIGRvbid0IGNhY2hlIHRoZW1cblx0Ly8gSUUgNiBkb2Vzbid0IGxpa2UgaXQgd2hlbiB5b3UgcHV0IDxvYmplY3Q+IG9yIDxlbWJlZD4gZWxlbWVudHMgaW4gYSBmcmFnbWVudFxuXHQvLyBBbHNvLCBXZWJLaXQgZG9lcyBub3QgY2xvbmUgJ2NoZWNrZWQnIGF0dHJpYnV0ZXMgb24gY2xvbmVOb2RlLCBzbyBkb24ndCBjYWNoZVxuXHQvLyBMYXN0bHksIElFNiw3LDggd2lsbCBub3QgY29ycmVjdGx5IHJldXNlIGNhY2hlZCBmcmFnbWVudHMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSB1bmtub3duIGVsZW1zICMxMDUwMVxuXHRpZiAoIGFyZ3MubGVuZ3RoID09PSAxICYmIHR5cGVvZiBmaXJzdCA9PT0gXCJzdHJpbmdcIiAmJiBmaXJzdC5sZW5ndGggPCA1MTIgJiYgY29udGV4dCA9PT0gZG9jdW1lbnQgJiZcblx0XHRmaXJzdC5jaGFyQXQoMCkgPT09IFwiPFwiICYmICFybm9jYWNoZS50ZXN0KCBmaXJzdCApICYmXG5cdFx0KGpRdWVyeS5zdXBwb3J0LmNoZWNrQ2xvbmUgfHwgIXJjaGVja2VkLnRlc3QoIGZpcnN0ICkpICYmXG5cdFx0KGpRdWVyeS5zdXBwb3J0Lmh0bWw1Q2xvbmUgfHwgIXJub3NoaW1jYWNoZS50ZXN0KCBmaXJzdCApKSApIHtcblxuXHRcdC8vIE1hcmsgY2FjaGVhYmxlIGFuZCBsb29rIGZvciBhIGhpdFxuXHRcdGNhY2hlYWJsZSA9IHRydWU7XG5cdFx0ZnJhZ21lbnQgPSBqUXVlcnkuZnJhZ21lbnRzWyBmaXJzdCBdO1xuXHRcdGNhY2hlaGl0ID0gZnJhZ21lbnQgIT09IHVuZGVmaW5lZDtcblx0fVxuXG5cdGlmICggIWZyYWdtZW50ICkge1xuXHRcdGZyYWdtZW50ID0gY29udGV4dC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0alF1ZXJ5LmNsZWFuKCBhcmdzLCBjb250ZXh0LCBmcmFnbWVudCwgc2NyaXB0cyApO1xuXG5cdFx0Ly8gVXBkYXRlIHRoZSBjYWNoZSwgYnV0IG9ubHkgc3RvcmUgZmFsc2Vcblx0XHQvLyB1bmxlc3MgdGhpcyBpcyBhIHNlY29uZCBwYXJzaW5nIG9mIHRoZSBzYW1lIGNvbnRlbnRcblx0XHRpZiAoIGNhY2hlYWJsZSApIHtcblx0XHRcdGpRdWVyeS5mcmFnbWVudHNbIGZpcnN0IF0gPSBjYWNoZWhpdCAmJiBmcmFnbWVudDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4geyBmcmFnbWVudDogZnJhZ21lbnQsIGNhY2hlYWJsZTogY2FjaGVhYmxlIH07XG59O1xuXG5qUXVlcnkuZnJhZ21lbnRzID0ge307XG5cbmpRdWVyeS5lYWNoKHtcblx0YXBwZW5kVG86IFwiYXBwZW5kXCIsXG5cdHByZXBlbmRUbzogXCJwcmVwZW5kXCIsXG5cdGluc2VydEJlZm9yZTogXCJiZWZvcmVcIixcblx0aW5zZXJ0QWZ0ZXI6IFwiYWZ0ZXJcIixcblx0cmVwbGFjZUFsbDogXCJyZXBsYWNlV2l0aFwiXG59LCBmdW5jdGlvbiggbmFtZSwgb3JpZ2luYWwgKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuXHRcdHZhciBlbGVtcyxcblx0XHRcdGkgPSAwLFxuXHRcdFx0cmV0ID0gW10sXG5cdFx0XHRpbnNlcnQgPSBqUXVlcnkoIHNlbGVjdG9yICksXG5cdFx0XHRsID0gaW5zZXJ0Lmxlbmd0aCxcblx0XHRcdHBhcmVudCA9IHRoaXMubGVuZ3RoID09PSAxICYmIHRoaXNbMF0ucGFyZW50Tm9kZTtcblxuXHRcdGlmICggKHBhcmVudCA9PSBudWxsIHx8IHBhcmVudCAmJiBwYXJlbnQubm9kZVR5cGUgPT09IDExICYmIHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMSkgJiYgbCA9PT0gMSApIHtcblx0XHRcdGluc2VydFsgb3JpZ2luYWwgXSggdGhpc1swXSApO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvciAoIDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0ZWxlbXMgPSAoIGkgPiAwID8gdGhpcy5jbG9uZSh0cnVlKSA6IHRoaXMgKS5nZXQoKTtcblx0XHRcdFx0alF1ZXJ5KCBpbnNlcnRbaV0gKVsgb3JpZ2luYWwgXSggZWxlbXMgKTtcblx0XHRcdFx0cmV0ID0gcmV0LmNvbmNhdCggZWxlbXMgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRoaXMucHVzaFN0YWNrKCByZXQsIG5hbWUsIGluc2VydC5zZWxlY3RvciApO1xuXHRcdH1cblx0fTtcbn0pO1xuXG5mdW5jdGlvbiBnZXRBbGwoIGVsZW0gKSB7XG5cdGlmICggdHlwZW9mIGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0cmV0dXJuIGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwiKlwiICk7XG5cblx0fSBlbHNlIGlmICggdHlwZW9mIGVsZW0ucXVlcnlTZWxlY3RvckFsbCAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRyZXR1cm4gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBcIipcIiApO1xuXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG59XG5cbi8vIFVzZWQgaW4gY2xlYW4sIGZpeGVzIHRoZSBkZWZhdWx0Q2hlY2tlZCBwcm9wZXJ0eVxuZnVuY3Rpb24gZml4RGVmYXVsdENoZWNrZWQoIGVsZW0gKSB7XG5cdGlmICggcmNoZWNrYWJsZVR5cGUudGVzdCggZWxlbS50eXBlICkgKSB7XG5cdFx0ZWxlbS5kZWZhdWx0Q2hlY2tlZCA9IGVsZW0uY2hlY2tlZDtcblx0fVxufVxuXG5qUXVlcnkuZXh0ZW5kKHtcblx0Y2xvbmU6IGZ1bmN0aW9uKCBlbGVtLCBkYXRhQW5kRXZlbnRzLCBkZWVwRGF0YUFuZEV2ZW50cyApIHtcblx0XHR2YXIgc3JjRWxlbWVudHMsXG5cdFx0XHRkZXN0RWxlbWVudHMsXG5cdFx0XHRpLFxuXHRcdFx0Y2xvbmU7XG5cblx0XHRpZiAoIGpRdWVyeS5zdXBwb3J0Lmh0bWw1Q2xvbmUgfHwgalF1ZXJ5LmlzWE1MRG9jKGVsZW0pIHx8ICFybm9zaGltY2FjaGUudGVzdCggXCI8XCIgKyBlbGVtLm5vZGVOYW1lICsgXCI+XCIgKSApIHtcblx0XHRcdGNsb25lID0gZWxlbS5jbG9uZU5vZGUoIHRydWUgKTtcblxuXHRcdC8vIElFPD04IGRvZXMgbm90IHByb3Blcmx5IGNsb25lIGRldGFjaGVkLCB1bmtub3duIGVsZW1lbnQgbm9kZXNcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZnJhZ21lbnREaXYuaW5uZXJIVE1MID0gZWxlbS5vdXRlckhUTUw7XG5cdFx0XHRmcmFnbWVudERpdi5yZW1vdmVDaGlsZCggY2xvbmUgPSBmcmFnbWVudERpdi5maXJzdENoaWxkICk7XG5cdFx0fVxuXG5cdFx0aWYgKCAoIWpRdWVyeS5zdXBwb3J0Lm5vQ2xvbmVFdmVudCB8fCAhalF1ZXJ5LnN1cHBvcnQubm9DbG9uZUNoZWNrZWQpICYmXG5cdFx0XHRcdChlbGVtLm5vZGVUeXBlID09PSAxIHx8IGVsZW0ubm9kZVR5cGUgPT09IDExKSAmJiAhalF1ZXJ5LmlzWE1MRG9jKGVsZW0pICkge1xuXHRcdFx0Ly8gSUUgY29waWVzIGV2ZW50cyBib3VuZCB2aWEgYXR0YWNoRXZlbnQgd2hlbiB1c2luZyBjbG9uZU5vZGUuXG5cdFx0XHQvLyBDYWxsaW5nIGRldGFjaEV2ZW50IG9uIHRoZSBjbG9uZSB3aWxsIGFsc28gcmVtb3ZlIHRoZSBldmVudHNcblx0XHRcdC8vIGZyb20gdGhlIG9yaWdpbmFsLiBJbiBvcmRlciB0byBnZXQgYXJvdW5kIHRoaXMsIHdlIHVzZSBzb21lXG5cdFx0XHQvLyBwcm9wcmlldGFyeSBtZXRob2RzIHRvIGNsZWFyIHRoZSBldmVudHMuIFRoYW5rcyB0byBNb29Ub29sc1xuXHRcdFx0Ly8gZ3V5cyBmb3IgdGhpcyBob3RuZXNzLlxuXG5cdFx0XHRjbG9uZUZpeEF0dHJpYnV0ZXMoIGVsZW0sIGNsb25lICk7XG5cblx0XHRcdC8vIFVzaW5nIFNpenpsZSBoZXJlIGlzIGNyYXp5IHNsb3csIHNvIHdlIHVzZSBnZXRFbGVtZW50c0J5VGFnTmFtZSBpbnN0ZWFkXG5cdFx0XHRzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXHRcdFx0ZGVzdEVsZW1lbnRzID0gZ2V0QWxsKCBjbG9uZSApO1xuXG5cdFx0XHQvLyBXZWlyZCBpdGVyYXRpb24gYmVjYXVzZSBJRSB3aWxsIHJlcGxhY2UgdGhlIGxlbmd0aCBwcm9wZXJ0eVxuXHRcdFx0Ly8gd2l0aCBhbiBlbGVtZW50IGlmIHlvdSBhcmUgY2xvbmluZyB0aGUgYm9keSBhbmQgb25lIG9mIHRoZVxuXHRcdFx0Ly8gZWxlbWVudHMgb24gdGhlIHBhZ2UgaGFzIGEgbmFtZSBvciBpZCBvZiBcImxlbmd0aFwiXG5cdFx0XHRmb3IgKCBpID0gMDsgc3JjRWxlbWVudHNbaV07ICsraSApIHtcblx0XHRcdFx0Ly8gRW5zdXJlIHRoYXQgdGhlIGRlc3RpbmF0aW9uIG5vZGUgaXMgbm90IG51bGw7IEZpeGVzICM5NTg3XG5cdFx0XHRcdGlmICggZGVzdEVsZW1lbnRzW2ldICkge1xuXHRcdFx0XHRcdGNsb25lRml4QXR0cmlidXRlcyggc3JjRWxlbWVudHNbaV0sIGRlc3RFbGVtZW50c1tpXSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ29weSB0aGUgZXZlbnRzIGZyb20gdGhlIG9yaWdpbmFsIHRvIHRoZSBjbG9uZVxuXHRcdGlmICggZGF0YUFuZEV2ZW50cyApIHtcblx0XHRcdGNsb25lQ29weUV2ZW50KCBlbGVtLCBjbG9uZSApO1xuXG5cdFx0XHRpZiAoIGRlZXBEYXRhQW5kRXZlbnRzICkge1xuXHRcdFx0XHRzcmNFbGVtZW50cyA9IGdldEFsbCggZWxlbSApO1xuXHRcdFx0XHRkZXN0RWxlbWVudHMgPSBnZXRBbGwoIGNsb25lICk7XG5cblx0XHRcdFx0Zm9yICggaSA9IDA7IHNyY0VsZW1lbnRzW2ldOyArK2kgKSB7XG5cdFx0XHRcdFx0Y2xvbmVDb3B5RXZlbnQoIHNyY0VsZW1lbnRzW2ldLCBkZXN0RWxlbWVudHNbaV0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHNyY0VsZW1lbnRzID0gZGVzdEVsZW1lbnRzID0gbnVsbDtcblxuXHRcdC8vIFJldHVybiB0aGUgY2xvbmVkIHNldFxuXHRcdHJldHVybiBjbG9uZTtcblx0fSxcblxuXHRjbGVhbjogZnVuY3Rpb24oIGVsZW1zLCBjb250ZXh0LCBmcmFnbWVudCwgc2NyaXB0cyApIHtcblx0XHR2YXIgaSwgaiwgZWxlbSwgdGFnLCB3cmFwLCBkZXB0aCwgZGl2LCBoYXNCb2R5LCB0Ym9keSwgbGVuLCBoYW5kbGVTY3JpcHQsIGpzVGFncyxcblx0XHRcdHNhZmUgPSBjb250ZXh0ID09PSBkb2N1bWVudCAmJiBzYWZlRnJhZ21lbnQsXG5cdFx0XHRyZXQgPSBbXTtcblxuXHRcdC8vIEVuc3VyZSB0aGF0IGNvbnRleHQgaXMgYSBkb2N1bWVudFxuXHRcdGlmICggIWNvbnRleHQgfHwgdHlwZW9mIGNvbnRleHQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdGNvbnRleHQgPSBkb2N1bWVudDtcblx0XHR9XG5cblx0XHQvLyBVc2UgdGhlIGFscmVhZHktY3JlYXRlZCBzYWZlIGZyYWdtZW50IGlmIGNvbnRleHQgcGVybWl0c1xuXHRcdGZvciAoIGkgPSAwOyAoZWxlbSA9IGVsZW1zW2ldKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRpZiAoIHR5cGVvZiBlbGVtID09PSBcIm51bWJlclwiICkge1xuXHRcdFx0XHRlbGVtICs9IFwiXCI7XG5cdFx0XHR9XG5cblx0XHRcdGlmICggIWVsZW0gKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb252ZXJ0IGh0bWwgc3RyaW5nIGludG8gRE9NIG5vZGVzXG5cdFx0XHRpZiAoIHR5cGVvZiBlbGVtID09PSBcInN0cmluZ1wiICkge1xuXHRcdFx0XHRpZiAoICFyaHRtbC50ZXN0KCBlbGVtICkgKSB7XG5cdFx0XHRcdFx0ZWxlbSA9IGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIGVsZW0gKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBFbnN1cmUgYSBzYWZlIGNvbnRhaW5lciBpbiB3aGljaCB0byByZW5kZXIgdGhlIGh0bWxcblx0XHRcdFx0XHRzYWZlID0gc2FmZSB8fCBjcmVhdGVTYWZlRnJhZ21lbnQoIGNvbnRleHQgKTtcblx0XHRcdFx0XHRkaXYgPSBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdFx0c2FmZS5hcHBlbmRDaGlsZCggZGl2ICk7XG5cblx0XHRcdFx0XHQvLyBGaXggXCJYSFRNTFwiLXN0eWxlIHRhZ3MgaW4gYWxsIGJyb3dzZXJzXG5cdFx0XHRcdFx0ZWxlbSA9IGVsZW0ucmVwbGFjZShyeGh0bWxUYWcsIFwiPCQxPjwvJDI+XCIpO1xuXG5cdFx0XHRcdFx0Ly8gR28gdG8gaHRtbCBhbmQgYmFjaywgdGhlbiBwZWVsIG9mZiBleHRyYSB3cmFwcGVyc1xuXHRcdFx0XHRcdHRhZyA9ICggcnRhZ05hbWUuZXhlYyggZWxlbSApIHx8IFtcIlwiLCBcIlwiXSApWzFdLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0d3JhcCA9IHdyYXBNYXBbIHRhZyBdIHx8IHdyYXBNYXAuX2RlZmF1bHQ7XG5cdFx0XHRcdFx0ZGVwdGggPSB3cmFwWzBdO1xuXHRcdFx0XHRcdGRpdi5pbm5lckhUTUwgPSB3cmFwWzFdICsgZWxlbSArIHdyYXBbMl07XG5cblx0XHRcdFx0XHQvLyBNb3ZlIHRvIHRoZSByaWdodCBkZXB0aFxuXHRcdFx0XHRcdHdoaWxlICggZGVwdGgtLSApIHtcblx0XHRcdFx0XHRcdGRpdiA9IGRpdi5sYXN0Q2hpbGQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIElFJ3MgYXV0b2luc2VydGVkIDx0Ym9keT4gZnJvbSB0YWJsZSBmcmFnbWVudHNcblx0XHRcdFx0XHRpZiAoICFqUXVlcnkuc3VwcG9ydC50Ym9keSApIHtcblxuXHRcdFx0XHRcdFx0Ly8gU3RyaW5nIHdhcyBhIDx0YWJsZT4sICptYXkqIGhhdmUgc3B1cmlvdXMgPHRib2R5PlxuXHRcdFx0XHRcdFx0aGFzQm9keSA9IHJ0Ym9keS50ZXN0KGVsZW0pO1xuXHRcdFx0XHRcdFx0XHR0Ym9keSA9IHRhZyA9PT0gXCJ0YWJsZVwiICYmICFoYXNCb2R5ID9cblx0XHRcdFx0XHRcdFx0XHRkaXYuZmlyc3RDaGlsZCAmJiBkaXYuZmlyc3RDaGlsZC5jaGlsZE5vZGVzIDpcblxuXHRcdFx0XHRcdFx0XHRcdC8vIFN0cmluZyB3YXMgYSBiYXJlIDx0aGVhZD4gb3IgPHRmb290PlxuXHRcdFx0XHRcdFx0XHRcdHdyYXBbMV0gPT09IFwiPHRhYmxlPlwiICYmICFoYXNCb2R5ID9cblx0XHRcdFx0XHRcdFx0XHRcdGRpdi5jaGlsZE5vZGVzIDpcblx0XHRcdFx0XHRcdFx0XHRcdFtdO1xuXG5cdFx0XHRcdFx0XHRmb3IgKCBqID0gdGJvZHkubGVuZ3RoIC0gMTsgaiA+PSAwIDsgLS1qICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoIGpRdWVyeS5ub2RlTmFtZSggdGJvZHlbIGogXSwgXCJ0Ym9keVwiICkgJiYgIXRib2R5WyBqIF0uY2hpbGROb2Rlcy5sZW5ndGggKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGJvZHlbIGogXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0Ym9keVsgaiBdICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBJRSBjb21wbGV0ZWx5IGtpbGxzIGxlYWRpbmcgd2hpdGVzcGFjZSB3aGVuIGlubmVySFRNTCBpcyB1c2VkXG5cdFx0XHRcdFx0aWYgKCAhalF1ZXJ5LnN1cHBvcnQubGVhZGluZ1doaXRlc3BhY2UgJiYgcmxlYWRpbmdXaGl0ZXNwYWNlLnRlc3QoIGVsZW0gKSApIHtcblx0XHRcdFx0XHRcdGRpdi5pbnNlcnRCZWZvcmUoIGNvbnRleHQuY3JlYXRlVGV4dE5vZGUoIHJsZWFkaW5nV2hpdGVzcGFjZS5leGVjKGVsZW0pWzBdICksIGRpdi5maXJzdENoaWxkICk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZWxlbSA9IGRpdi5jaGlsZE5vZGVzO1xuXG5cdFx0XHRcdFx0Ly8gVGFrZSBvdXQgb2YgZnJhZ21lbnQgY29udGFpbmVyICh3ZSBuZWVkIGEgZnJlc2ggZGl2IGVhY2ggdGltZSlcblx0XHRcdFx0XHRkaXYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZGl2ICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBlbGVtLm5vZGVUeXBlICkge1xuXHRcdFx0XHRyZXQucHVzaCggZWxlbSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0alF1ZXJ5Lm1lcmdlKCByZXQsIGVsZW0gKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBGaXggIzExMzU2OiBDbGVhciBlbGVtZW50cyBmcm9tIHNhZmVGcmFnbWVudFxuXHRcdGlmICggZGl2ICkge1xuXHRcdFx0ZWxlbSA9IGRpdiA9IHNhZmUgPSBudWxsO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0IGRlZmF1bHRDaGVja2VkIGZvciBhbnkgcmFkaW9zIGFuZCBjaGVja2JveGVzXG5cdFx0Ly8gYWJvdXQgdG8gYmUgYXBwZW5kZWQgdG8gdGhlIERPTSBpbiBJRSA2LzcgKCM4MDYwKVxuXHRcdGlmICggIWpRdWVyeS5zdXBwb3J0LmFwcGVuZENoZWNrZWQgKSB7XG5cdFx0XHRmb3IgKCBpID0gMDsgKGVsZW0gPSByZXRbaV0pICE9IG51bGw7IGkrKyApIHtcblx0XHRcdFx0aWYgKCBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwiaW5wdXRcIiApICkge1xuXHRcdFx0XHRcdGZpeERlZmF1bHRDaGVja2VkKCBlbGVtICk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lICE9PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ncmVwKCBlbGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIiksIGZpeERlZmF1bHRDaGVja2VkICk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBBcHBlbmQgZWxlbWVudHMgdG8gYSBwcm92aWRlZCBkb2N1bWVudCBmcmFnbWVudFxuXHRcdGlmICggZnJhZ21lbnQgKSB7XG5cdFx0XHQvLyBTcGVjaWFsIGhhbmRsaW5nIG9mIGVhY2ggc2NyaXB0IGVsZW1lbnRcblx0XHRcdGhhbmRsZVNjcmlwdCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdFx0XHQvLyBDaGVjayBpZiB3ZSBjb25zaWRlciBpdCBleGVjdXRhYmxlXG5cdFx0XHRcdGlmICggIWVsZW0udHlwZSB8fCByc2NyaXB0VHlwZS50ZXN0KCBlbGVtLnR5cGUgKSApIHtcblx0XHRcdFx0XHQvLyBEZXRhY2ggdGhlIHNjcmlwdCBhbmQgc3RvcmUgaXQgaW4gdGhlIHNjcmlwdHMgYXJyYXkgKGlmIHByb3ZpZGVkKSBvciB0aGUgZnJhZ21lbnRcblx0XHRcdFx0XHQvLyBSZXR1cm4gdHJ1dGh5IHRvIGluZGljYXRlIHRoYXQgaXQgaGFzIGJlZW4gaGFuZGxlZFxuXHRcdFx0XHRcdHJldHVybiBzY3JpcHRzID9cblx0XHRcdFx0XHRcdHNjcmlwdHMucHVzaCggZWxlbS5wYXJlbnROb2RlID8gZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBlbGVtICkgOiBlbGVtICkgOlxuXHRcdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGVsZW0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yICggaSA9IDA7IChlbGVtID0gcmV0W2ldKSAhPSBudWxsOyBpKysgKSB7XG5cdFx0XHRcdC8vIENoZWNrIGlmIHdlJ3JlIGRvbmUgYWZ0ZXIgaGFuZGxpbmcgYW4gZXhlY3V0YWJsZSBzY3JpcHRcblx0XHRcdFx0aWYgKCAhKCBqUXVlcnkubm9kZU5hbWUoIGVsZW0sIFwic2NyaXB0XCIgKSAmJiBoYW5kbGVTY3JpcHQoIGVsZW0gKSApICkge1xuXHRcdFx0XHRcdC8vIEFwcGVuZCB0byBmcmFnbWVudCBhbmQgaGFuZGxlIGVtYmVkZGVkIHNjcmlwdHNcblx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZCggZWxlbSApO1xuXHRcdFx0XHRcdGlmICggdHlwZW9mIGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdFx0XHRcdFx0XHQvLyBoYW5kbGVTY3JpcHQgYWx0ZXJzIHRoZSBET00sIHNvIHVzZSBqUXVlcnkubWVyZ2UgdG8gZW5zdXJlIHNuYXBzaG90IGl0ZXJhdGlvblxuXHRcdFx0XHRcdFx0anNUYWdzID0galF1ZXJ5LmdyZXAoIGpRdWVyeS5tZXJnZSggW10sIGVsZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIikgKSwgaGFuZGxlU2NyaXB0ICk7XG5cblx0XHRcdFx0XHRcdC8vIFNwbGljZSB0aGUgc2NyaXB0cyBpbnRvIHJldCBhZnRlciB0aGVpciBmb3JtZXIgYW5jZXN0b3IgYW5kIGFkdmFuY2Ugb3VyIGluZGV4IGJleW9uZCB0aGVtXG5cdFx0XHRcdFx0XHRyZXQuc3BsaWNlLmFwcGx5KCByZXQsIFtpICsgMSwgMF0uY29uY2F0KCBqc1RhZ3MgKSApO1xuXHRcdFx0XHRcdFx0aSArPSBqc1RhZ3MubGVuZ3RoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH0sXG5cblx0Y2xlYW5EYXRhOiBmdW5jdGlvbiggZWxlbXMsIC8qIGludGVybmFsICovIGFjY2VwdERhdGEgKSB7XG5cdFx0dmFyIGRhdGEsIGlkLCBlbGVtLCB0eXBlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRpbnRlcm5hbEtleSA9IGpRdWVyeS5leHBhbmRvLFxuXHRcdFx0Y2FjaGUgPSBqUXVlcnkuY2FjaGUsXG5cdFx0XHRkZWxldGVFeHBhbmRvID0galF1ZXJ5LnN1cHBvcnQuZGVsZXRlRXhwYW5kbyxcblx0XHRcdHNwZWNpYWwgPSBqUXVlcnkuZXZlbnQuc3BlY2lhbDtcblxuXHRcdGZvciAoIDsgKGVsZW0gPSBlbGVtc1tpXSkgIT0gbnVsbDsgaSsrICkge1xuXG5cdFx0XHRpZiAoIGFjY2VwdERhdGEgfHwgalF1ZXJ5LmFjY2VwdERhdGEoIGVsZW0gKSApIHtcblxuXHRcdFx0XHRpZCA9IGVsZW1bIGludGVybmFsS2V5IF07XG5cdFx0XHRcdGRhdGEgPSBpZCAmJiBjYWNoZVsgaWQgXTtcblxuXHRcdFx0XHRpZiAoIGRhdGEgKSB7XG5cdFx0XHRcdFx0aWYgKCBkYXRhLmV2ZW50cyApIHtcblx0XHRcdFx0XHRcdGZvciAoIHR5cGUgaW4gZGF0YS5ldmVudHMgKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggc3BlY2lhbFsgdHlwZSBdICkge1xuXHRcdFx0XHRcdFx0XHRcdGpRdWVyeS5ldmVudC5yZW1vdmUoIGVsZW0sIHR5cGUgKTtcblxuXHRcdFx0XHRcdFx0XHQvLyBUaGlzIGlzIGEgc2hvcnRjdXQgdG8gYXZvaWQgalF1ZXJ5LmV2ZW50LnJlbW92ZSdzIG92ZXJoZWFkXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5LnJlbW92ZUV2ZW50KCBlbGVtLCB0eXBlLCBkYXRhLmhhbmRsZSApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gUmVtb3ZlIGNhY2hlIG9ubHkgaWYgaXQgd2FzIG5vdCBhbHJlYWR5IHJlbW92ZWQgYnkgalF1ZXJ5LmV2ZW50LnJlbW92ZVxuXHRcdFx0XHRcdGlmICggY2FjaGVbIGlkIF0gKSB7XG5cblx0XHRcdFx0XHRcdGRlbGV0ZSBjYWNoZVsgaWQgXTtcblxuXHRcdFx0XHRcdFx0Ly8gSUUgZG9lcyBub3QgYWxsb3cgdXMgdG8gZGVsZXRlIGV4cGFuZG8gcHJvcGVydGllcyBmcm9tIG5vZGVzLFxuXHRcdFx0XHRcdFx0Ly8gbm9yIGRvZXMgaXQgaGF2ZSBhIHJlbW92ZUF0dHJpYnV0ZSBmdW5jdGlvbiBvbiBEb2N1bWVudCBub2Rlcztcblx0XHRcdFx0XHRcdC8vIHdlIG11c3QgaGFuZGxlIGFsbCBvZiB0aGVzZSBjYXNlc1xuXHRcdFx0XHRcdFx0aWYgKCBkZWxldGVFeHBhbmRvICkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgZWxlbVsgaW50ZXJuYWxLZXkgXTtcblxuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICggZWxlbS5yZW1vdmVBdHRyaWJ1dGUgKSB7XG5cdFx0XHRcdFx0XHRcdGVsZW0ucmVtb3ZlQXR0cmlidXRlKCBpbnRlcm5hbEtleSApO1xuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbGVtWyBpbnRlcm5hbEtleSBdID0gbnVsbDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0alF1ZXJ5LmRlbGV0ZWRJZHMucHVzaCggaWQgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pO1xuLy8gTGltaXQgc2NvcGUgcG9sbHV0aW9uIGZyb20gYW55IGRlcHJlY2F0ZWQgQVBJXG4oZnVuY3Rpb24oKSB7XG5cbnZhciBtYXRjaGVkLCBicm93c2VyO1xuXG4vLyBVc2Ugb2YgalF1ZXJ5LmJyb3dzZXIgaXMgZnJvd25lZCB1cG9uLlxuLy8gTW9yZSBkZXRhaWxzOiBodHRwOi8vYXBpLmpxdWVyeS5jb20valF1ZXJ5LmJyb3dzZXJcbi8vIGpRdWVyeS51YU1hdGNoIG1haW50YWluZWQgZm9yIGJhY2stY29tcGF0XG5qUXVlcnkudWFNYXRjaCA9IGZ1bmN0aW9uKCB1YSApIHtcblx0dWEgPSB1YS50b0xvd2VyQ2FzZSgpO1xuXG5cdHZhciBtYXRjaCA9IC8oY2hyb21lKVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuXHRcdC8od2Via2l0KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuXHRcdC8ob3BlcmEpKD86Lip2ZXJzaW9ufClbIFxcL10oW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcblx0XHQvKG1zaWUpIChbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuXHRcdHVhLmluZGV4T2YoXCJjb21wYXRpYmxlXCIpIDwgMCAmJiAvKG1vemlsbGEpKD86Lio/IHJ2OihbXFx3Ll0rKXwpLy5leGVjKCB1YSApIHx8XG5cdFx0W107XG5cblx0cmV0dXJuIHtcblx0XHRicm93c2VyOiBtYXRjaFsgMSBdIHx8IFwiXCIsXG5cdFx0dmVyc2lvbjogbWF0Y2hbIDIgXSB8fCBcIjBcIlxuXHR9O1xufTtcblxubWF0Y2hlZCA9IGpRdWVyeS51YU1hdGNoKCBuYXZpZ2F0b3IudXNlckFnZW50ICk7XG5icm93c2VyID0ge307XG5cbmlmICggbWF0Y2hlZC5icm93c2VyICkge1xuXHRicm93c2VyWyBtYXRjaGVkLmJyb3dzZXIgXSA9IHRydWU7XG5cdGJyb3dzZXIudmVyc2lvbiA9IG1hdGNoZWQudmVyc2lvbjtcbn1cblxuLy8gQ2hyb21lIGlzIFdlYmtpdCwgYnV0IFdlYmtpdCBpcyBhbHNvIFNhZmFyaS5cbmlmICggYnJvd3Nlci5jaHJvbWUgKSB7XG5cdGJyb3dzZXIud2Via2l0ID0gdHJ1ZTtcbn0gZWxzZSBpZiAoIGJyb3dzZXIud2Via2l0ICkge1xuXHRicm93c2VyLnNhZmFyaSA9IHRydWU7XG59XG5cbmpRdWVyeS5icm93c2VyID0gYnJvd3NlcjtcblxualF1ZXJ5LnN1YiA9IGZ1bmN0aW9uKCkge1xuXHRmdW5jdGlvbiBqUXVlcnlTdWIoIHNlbGVjdG9yLCBjb250ZXh0ICkge1xuXHRcdHJldHVybiBuZXcgalF1ZXJ5U3ViLmZuLmluaXQoIHNlbGVjdG9yLCBjb250ZXh0ICk7XG5cdH1cblx0alF1ZXJ5LmV4dGVuZCggdHJ1ZSwgalF1ZXJ5U3ViLCB0aGlzICk7XG5cdGpRdWVyeVN1Yi5zdXBlcmNsYXNzID0gdGhpcztcblx0alF1ZXJ5U3ViLmZuID0galF1ZXJ5U3ViLnByb3RvdHlwZSA9IHRoaXMoKTtcblx0alF1ZXJ5U3ViLmZuLmNvbnN0cnVjdG9yID0galF1ZXJ5U3ViO1xuXHRqUXVlcnlTdWIuc3ViID0gdGhpcy5zdWI7XG5cdGpRdWVyeVN1Yi5mbi5pbml0ID0gZnVuY3Rpb24gaW5pdCggc2VsZWN0b3IsIGNvbnRleHQgKSB7XG5cdFx0aWYgKCBjb250ZXh0ICYmIGNvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgJiYgIShjb250ZXh0IGluc3RhbmNlb2YgalF1ZXJ5U3ViKSApIHtcblx0XHRcdGNvbnRleHQgPSBqUXVlcnlTdWIoIGNvbnRleHQgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4galF1ZXJ5LmZuLmluaXQuY2FsbCggdGhpcywgc2VsZWN0b3IsIGNvbnRleHQsIHJvb3RqUXVlcnlTdWIgKTtcblx0fTtcblx0alF1ZXJ5U3ViLmZuLmluaXQucHJvdG90eXBlID0galF1ZXJ5U3ViLmZuO1xuXHR2YXIgcm9vdGpRdWVyeVN1YiA9IGpRdWVyeVN1Yihkb2N1bWVudCk7XG5cdHJldHVybiBqUXVlcnlTdWI7XG59O1xuXG59KSgpO1xudmFyIGN1ckNTUywgaWZyYW1lLCBpZnJhbWVEb2MsXG5cdHJhbHBoYSA9IC9hbHBoYVxcKFteKV0qXFwpL2ksXG5cdHJvcGFjaXR5ID0gL29wYWNpdHk9KFteKV0qKS8sXG5cdHJwb3NpdGlvbiA9IC9eKHRvcHxyaWdodHxib3R0b218bGVmdCkkLyxcblx0Ly8gc3dhcHBhYmxlIGlmIGRpc3BsYXkgaXMgbm9uZSBvciBzdGFydHMgd2l0aCB0YWJsZSBleGNlcHQgXCJ0YWJsZVwiLCBcInRhYmxlLWNlbGxcIiwgb3IgXCJ0YWJsZS1jYXB0aW9uXCJcblx0Ly8gc2VlIGhlcmUgZm9yIGRpc3BsYXkgdmFsdWVzOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0NTUy9kaXNwbGF5XG5cdHJkaXNwbGF5c3dhcCA9IC9eKG5vbmV8dGFibGUoPyEtY1tlYV0pLispLyxcblx0cm1hcmdpbiA9IC9ebWFyZ2luLyxcblx0cm51bXNwbGl0ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgY29yZV9wbnVtICsgXCIpKC4qKSRcIiwgXCJpXCIgKSxcblx0cm51bW5vbnB4ID0gbmV3IFJlZ0V4cCggXCJeKFwiICsgY29yZV9wbnVtICsgXCIpKD8hcHgpW2EteiVdKyRcIiwgXCJpXCIgKSxcblx0cnJlbE51bSA9IG5ldyBSZWdFeHAoIFwiXihbLStdKT0oXCIgKyBjb3JlX3BudW0gKyBcIilcIiwgXCJpXCIgKSxcblx0ZWxlbWRpc3BsYXkgPSB7fSxcblxuXHRjc3NTaG93ID0geyBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCB2aXNpYmlsaXR5OiBcImhpZGRlblwiLCBkaXNwbGF5OiBcImJsb2NrXCIgfSxcblx0Y3NzTm9ybWFsVHJhbnNmb3JtID0ge1xuXHRcdGxldHRlclNwYWNpbmc6IDAsXG5cdFx0Zm9udFdlaWdodDogNDAwXG5cdH0sXG5cblx0Y3NzRXhwYW5kID0gWyBcIlRvcFwiLCBcIlJpZ2h0XCIsIFwiQm90dG9tXCIsIFwiTGVmdFwiIF0sXG5cdGNzc1ByZWZpeGVzID0gWyBcIldlYmtpdFwiLCBcIk9cIiwgXCJNb3pcIiwgXCJtc1wiIF0sXG5cblx0ZXZlbnRzVG9nZ2xlID0galF1ZXJ5LmZuLnRvZ2dsZTtcblxuLy8gcmV0dXJuIGEgY3NzIHByb3BlcnR5IG1hcHBlZCB0byBhIHBvdGVudGlhbGx5IHZlbmRvciBwcmVmaXhlZCBwcm9wZXJ0eVxuZnVuY3Rpb24gdmVuZG9yUHJvcE5hbWUoIHN0eWxlLCBuYW1lICkge1xuXG5cdC8vIHNob3J0Y3V0IGZvciBuYW1lcyB0aGF0IGFyZSBub3QgdmVuZG9yIHByZWZpeGVkXG5cdGlmICggbmFtZSBpbiBzdHlsZSApIHtcblx0XHRyZXR1cm4gbmFtZTtcblx0fVxuXG5cdC8vIGNoZWNrIGZvciB2ZW5kb3IgcHJlZml4ZWQgbmFtZXNcblx0dmFyIGNhcE5hbWUgPSBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKSxcblx0XHRvcmlnTmFtZSA9IG5hbWUsXG5cdFx0aSA9IGNzc1ByZWZpeGVzLmxlbmd0aDtcblxuXHR3aGlsZSAoIGktLSApIHtcblx0XHRuYW1lID0gY3NzUHJlZml4ZXNbIGkgXSArIGNhcE5hbWU7XG5cdFx0aWYgKCBuYW1lIGluIHN0eWxlICkge1xuXHRcdFx0cmV0dXJuIG5hbWU7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG9yaWdOYW1lO1xufVxuXG5mdW5jdGlvbiBpc0hpZGRlbiggZWxlbSwgZWwgKSB7XG5cdGVsZW0gPSBlbCB8fCBlbGVtO1xuXHRyZXR1cm4galF1ZXJ5LmNzcyggZWxlbSwgXCJkaXNwbGF5XCIgKSA9PT0gXCJub25lXCIgfHwgIWpRdWVyeS5jb250YWlucyggZWxlbS5vd25lckRvY3VtZW50LCBlbGVtICk7XG59XG5cbmZ1bmN0aW9uIHNob3dIaWRlKCBlbGVtZW50cywgc2hvdyApIHtcblx0dmFyIGVsZW0sIGRpc3BsYXksXG5cdFx0dmFsdWVzID0gW10sXG5cdFx0aW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGVsZW1lbnRzLmxlbmd0aDtcblxuXHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdGVsZW0gPSBlbGVtZW50c1sgaW5kZXggXTtcblx0XHRpZiAoICFlbGVtLnN0eWxlICkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdHZhbHVlc1sgaW5kZXggXSA9IGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIgKTtcblx0XHRpZiAoIHNob3cgKSB7XG5cdFx0XHQvLyBSZXNldCB0aGUgaW5saW5lIGRpc3BsYXkgb2YgdGhpcyBlbGVtZW50IHRvIGxlYXJuIGlmIGl0IGlzXG5cdFx0XHQvLyBiZWluZyBoaWRkZW4gYnkgY2FzY2FkZWQgcnVsZXMgb3Igbm90XG5cdFx0XHRpZiAoICF2YWx1ZXNbIGluZGV4IF0gJiYgZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiApIHtcblx0XHRcdFx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IGVsZW1lbnRzIHdoaWNoIGhhdmUgYmVlbiBvdmVycmlkZGVuIHdpdGggZGlzcGxheTogbm9uZVxuXHRcdFx0Ly8gaW4gYSBzdHlsZXNoZWV0IHRvIHdoYXRldmVyIHRoZSBkZWZhdWx0IGJyb3dzZXIgc3R5bGUgaXNcblx0XHRcdC8vIGZvciBzdWNoIGFuIGVsZW1lbnRcblx0XHRcdGlmICggZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIlwiICYmIGlzSGlkZGVuKCBlbGVtICkgKSB7XG5cdFx0XHRcdHZhbHVlc1sgaW5kZXggXSA9IGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIsIGNzc19kZWZhdWx0RGlzcGxheShlbGVtLm5vZGVOYW1lKSApO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkaXNwbGF5ID0gY3VyQ1NTKCBlbGVtLCBcImRpc3BsYXlcIiApO1xuXG5cdFx0XHRpZiAoICF2YWx1ZXNbIGluZGV4IF0gJiYgZGlzcGxheSAhPT0gXCJub25lXCIgKSB7XG5cdFx0XHRcdGpRdWVyeS5fZGF0YSggZWxlbSwgXCJvbGRkaXNwbGF5XCIsIGRpc3BsYXkgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBTZXQgdGhlIGRpc3BsYXkgb2YgbW9zdCBvZiB0aGUgZWxlbWVudHMgaW4gYSBzZWNvbmQgbG9vcFxuXHQvLyB0byBhdm9pZCB0aGUgY29uc3RhbnQgcmVmbG93XG5cdGZvciAoIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KysgKSB7XG5cdFx0ZWxlbSA9IGVsZW1lbnRzWyBpbmRleCBdO1xuXHRcdGlmICggIWVsZW0uc3R5bGUgKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cdFx0aWYgKCAhc2hvdyB8fCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8IGVsZW0uc3R5bGUuZGlzcGxheSA9PT0gXCJcIiApIHtcblx0XHRcdGVsZW0uc3R5bGUuZGlzcGxheSA9IHNob3cgPyB2YWx1ZXNbIGluZGV4IF0gfHwgXCJcIiA6IFwibm9uZVwiO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBlbGVtZW50cztcbn1cblxualF1ZXJ5LmZuLmV4dGVuZCh7XG5cdGNzczogZnVuY3Rpb24oIG5hbWUsIHZhbHVlICkge1xuXHRcdHJldHVybiBqUXVlcnkuYWNjZXNzKCB0aGlzLCBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUgKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgbmFtZSwgdmFsdWUgKSA6XG5cdFx0XHRcdGpRdWVyeS5jc3MoIGVsZW0sIG5hbWUgKTtcblx0XHR9LCBuYW1lLCB2YWx1ZSwgYXJndW1lbnRzLmxlbmd0aCA+IDEgKTtcblx0fSxcblx0c2hvdzogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHNob3dIaWRlKCB0aGlzLCB0cnVlICk7XG5cdH0sXG5cdGhpZGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBzaG93SGlkZSggdGhpcyApO1xuXHR9LFxuXHR0b2dnbGU6IGZ1bmN0aW9uKCBzdGF0ZSwgZm4yICkge1xuXHRcdHZhciBib29sID0gdHlwZW9mIHN0YXRlID09PSBcImJvb2xlYW5cIjtcblxuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHN0YXRlICkgJiYgalF1ZXJ5LmlzRnVuY3Rpb24oIGZuMiApICkge1xuXHRcdFx0cmV0dXJuIGV2ZW50c1RvZ2dsZS5hcHBseSggdGhpcywgYXJndW1lbnRzICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGlmICggYm9vbCA/IHN0YXRlIDogaXNIaWRkZW4oIHRoaXMgKSApIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuc2hvdygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0alF1ZXJ5KCB0aGlzICkuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTtcblxualF1ZXJ5LmV4dGVuZCh7XG5cdC8vIEFkZCBpbiBzdHlsZSBwcm9wZXJ0eSBob29rcyBmb3Igb3ZlcnJpZGluZyB0aGUgZGVmYXVsdFxuXHQvLyBiZWhhdmlvciBvZiBnZXR0aW5nIGFuZCBzZXR0aW5nIGEgc3R5bGUgcHJvcGVydHlcblx0Y3NzSG9va3M6IHtcblx0XHRvcGFjaXR5OiB7XG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdFx0XHQvLyBXZSBzaG91bGQgYWx3YXlzIGdldCBhIG51bWJlciBiYWNrIGZyb20gb3BhY2l0eVxuXHRcdFx0XHRcdHZhciByZXQgPSBjdXJDU1MoIGVsZW0sIFwib3BhY2l0eVwiICk7XG5cdFx0XHRcdFx0cmV0dXJuIHJldCA9PT0gXCJcIiA/IFwiMVwiIDogcmV0O1xuXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Ly8gRXhjbHVkZSB0aGUgZm9sbG93aW5nIGNzcyBwcm9wZXJ0aWVzIHRvIGFkZCBweFxuXHRjc3NOdW1iZXI6IHtcblx0XHRcImZpbGxPcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJmb250V2VpZ2h0XCI6IHRydWUsXG5cdFx0XCJsaW5lSGVpZ2h0XCI6IHRydWUsXG5cdFx0XCJvcGFjaXR5XCI6IHRydWUsXG5cdFx0XCJvcnBoYW5zXCI6IHRydWUsXG5cdFx0XCJ3aWRvd3NcIjogdHJ1ZSxcblx0XHRcInpJbmRleFwiOiB0cnVlLFxuXHRcdFwiem9vbVwiOiB0cnVlXG5cdH0sXG5cblx0Ly8gQWRkIGluIHByb3BlcnRpZXMgd2hvc2UgbmFtZXMgeW91IHdpc2ggdG8gZml4IGJlZm9yZVxuXHQvLyBzZXR0aW5nIG9yIGdldHRpbmcgdGhlIHZhbHVlXG5cdGNzc1Byb3BzOiB7XG5cdFx0Ly8gbm9ybWFsaXplIGZsb2F0IGNzcyBwcm9wZXJ0eVxuXHRcdFwiZmxvYXRcIjogalF1ZXJ5LnN1cHBvcnQuY3NzRmxvYXQgPyBcImNzc0Zsb2F0XCIgOiBcInN0eWxlRmxvYXRcIlxuXHR9LFxuXG5cdC8vIEdldCBhbmQgc2V0IHRoZSBzdHlsZSBwcm9wZXJ0eSBvbiBhIERPTSBOb2RlXG5cdHN0eWxlOiBmdW5jdGlvbiggZWxlbSwgbmFtZSwgdmFsdWUsIGV4dHJhICkge1xuXHRcdC8vIERvbid0IHNldCBzdHlsZXMgb24gdGV4dCBhbmQgY29tbWVudCBub2Rlc1xuXHRcdGlmICggIWVsZW0gfHwgZWxlbS5ub2RlVHlwZSA9PT0gMyB8fCBlbGVtLm5vZGVUeXBlID09PSA4IHx8ICFlbGVtLnN0eWxlICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCB0aGUgcmlnaHQgbmFtZVxuXHRcdHZhciByZXQsIHR5cGUsIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICksXG5cdFx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0XHRuYW1lID0galF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdIHx8ICggalF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIHN0eWxlLCBvcmlnTmFtZSApICk7XG5cblx0XHQvLyBnZXRzIGhvb2sgZm9yIHRoZSBwcmVmaXhlZCB2ZXJzaW9uXG5cdFx0Ly8gZm9sbG93ZWQgYnkgdGhlIHVucHJlZml4ZWQgdmVyc2lvblxuXHRcdGhvb2tzID0galF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gfHwgalF1ZXJ5LmNzc0hvb2tzWyBvcmlnTmFtZSBdO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgd2UncmUgc2V0dGluZyBhIHZhbHVlXG5cdFx0aWYgKCB2YWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0dHlwZSA9IHR5cGVvZiB2YWx1ZTtcblxuXHRcdFx0Ly8gY29udmVydCByZWxhdGl2ZSBudW1iZXIgc3RyaW5ncyAoKz0gb3IgLT0pIHRvIHJlbGF0aXZlIG51bWJlcnMuICM3MzQ1XG5cdFx0XHRpZiAoIHR5cGUgPT09IFwic3RyaW5nXCIgJiYgKHJldCA9IHJyZWxOdW0uZXhlYyggdmFsdWUgKSkgKSB7XG5cdFx0XHRcdHZhbHVlID0gKCByZXRbMV0gKyAxICkgKiByZXRbMl0gKyBwYXJzZUZsb2F0KCBqUXVlcnkuY3NzKCBlbGVtLCBuYW1lICkgKTtcblx0XHRcdFx0Ly8gRml4ZXMgYnVnICM5MjM3XG5cdFx0XHRcdHR5cGUgPSBcIm51bWJlclwiO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCBOYU4gYW5kIG51bGwgdmFsdWVzIGFyZW4ndCBzZXQuIFNlZTogIzcxMTZcblx0XHRcdGlmICggdmFsdWUgPT0gbnVsbCB8fCB0eXBlID09PSBcIm51bWJlclwiICYmIGlzTmFOKCB2YWx1ZSApICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgbnVtYmVyIHdhcyBwYXNzZWQgaW4sIGFkZCAncHgnIHRvIHRoZSAoZXhjZXB0IGZvciBjZXJ0YWluIENTUyBwcm9wZXJ0aWVzKVxuXHRcdFx0aWYgKCB0eXBlID09PSBcIm51bWJlclwiICYmICFqUXVlcnkuY3NzTnVtYmVyWyBvcmlnTmFtZSBdICkge1xuXHRcdFx0XHR2YWx1ZSArPSBcInB4XCI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGEgaG9vayB3YXMgcHJvdmlkZWQsIHVzZSB0aGF0IHZhbHVlLCBvdGhlcndpc2UganVzdCBzZXQgdGhlIHNwZWNpZmllZCB2YWx1ZVxuXHRcdFx0aWYgKCAhaG9va3MgfHwgIShcInNldFwiIGluIGhvb2tzKSB8fCAodmFsdWUgPSBob29rcy5zZXQoIGVsZW0sIHZhbHVlLCBleHRyYSApKSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHQvLyBXcmFwcGVkIHRvIHByZXZlbnQgSUUgZnJvbSB0aHJvd2luZyBlcnJvcnMgd2hlbiAnaW52YWxpZCcgdmFsdWVzIGFyZSBwcm92aWRlZFxuXHRcdFx0XHQvLyBGaXhlcyBidWcgIzU1MDlcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRzdHlsZVsgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRcdH0gY2F0Y2goZSkge31cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgbm9uLWNvbXB1dGVkIHZhbHVlIGZyb20gdGhlcmVcblx0XHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyAmJiAocmV0ID0gaG9va3MuZ2V0KCBlbGVtLCBmYWxzZSwgZXh0cmEgKSkgIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0cmV0dXJuIHJldDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gT3RoZXJ3aXNlIGp1c3QgZ2V0IHRoZSB2YWx1ZSBmcm9tIHRoZSBzdHlsZSBvYmplY3Rcblx0XHRcdHJldHVybiBzdHlsZVsgbmFtZSBdO1xuXHRcdH1cblx0fSxcblxuXHRjc3M6IGZ1bmN0aW9uKCBlbGVtLCBuYW1lLCBudW1lcmljLCBleHRyYSApIHtcblx0XHR2YXIgdmFsLCBudW0sIGhvb2tzLFxuXHRcdFx0b3JpZ05hbWUgPSBqUXVlcnkuY2FtZWxDYXNlKCBuYW1lICk7XG5cblx0XHQvLyBNYWtlIHN1cmUgdGhhdCB3ZSdyZSB3b3JraW5nIHdpdGggdGhlIHJpZ2h0IG5hbWVcblx0XHRuYW1lID0galF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdIHx8ICggalF1ZXJ5LmNzc1Byb3BzWyBvcmlnTmFtZSBdID0gdmVuZG9yUHJvcE5hbWUoIGVsZW0uc3R5bGUsIG9yaWdOYW1lICkgKTtcblxuXHRcdC8vIGdldHMgaG9vayBmb3IgdGhlIHByZWZpeGVkIHZlcnNpb25cblx0XHQvLyBmb2xsb3dlZCBieSB0aGUgdW5wcmVmaXhlZCB2ZXJzaW9uXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXSB8fCBqUXVlcnkuY3NzSG9va3NbIG9yaWdOYW1lIF07XG5cblx0XHQvLyBJZiBhIGhvb2sgd2FzIHByb3ZpZGVkIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZnJvbSB0aGVyZVxuXHRcdGlmICggaG9va3MgJiYgXCJnZXRcIiBpbiBob29rcyApIHtcblx0XHRcdHZhbCA9IGhvb2tzLmdldCggZWxlbSwgdHJ1ZSwgZXh0cmEgKTtcblx0XHR9XG5cblx0XHQvLyBPdGhlcndpc2UsIGlmIGEgd2F5IHRvIGdldCB0aGUgY29tcHV0ZWQgdmFsdWUgZXhpc3RzLCB1c2UgdGhhdFxuXHRcdGlmICggdmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0XHR2YWwgPSBjdXJDU1MoIGVsZW0sIG5hbWUgKTtcblx0XHR9XG5cblx0XHQvL2NvbnZlcnQgXCJub3JtYWxcIiB0byBjb21wdXRlZCB2YWx1ZVxuXHRcdGlmICggdmFsID09PSBcIm5vcm1hbFwiICYmIG5hbWUgaW4gY3NzTm9ybWFsVHJhbnNmb3JtICkge1xuXHRcdFx0dmFsID0gY3NzTm9ybWFsVHJhbnNmb3JtWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuLCBjb252ZXJ0aW5nIHRvIG51bWJlciBpZiBmb3JjZWQgb3IgYSBxdWFsaWZpZXIgd2FzIHByb3ZpZGVkIGFuZCB2YWwgbG9va3MgbnVtZXJpY1xuXHRcdGlmICggbnVtZXJpYyB8fCBleHRyYSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0bnVtID0gcGFyc2VGbG9hdCggdmFsICk7XG5cdFx0XHRyZXR1cm4gbnVtZXJpYyB8fCBqUXVlcnkuaXNOdW1lcmljKCBudW0gKSA/IG51bSB8fCAwIDogdmFsO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9LFxuXG5cdC8vIEEgbWV0aG9kIGZvciBxdWlja2x5IHN3YXBwaW5nIGluL291dCBDU1MgcHJvcGVydGllcyB0byBnZXQgY29ycmVjdCBjYWxjdWxhdGlvbnNcblx0c3dhcDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGNhbGxiYWNrICkge1xuXHRcdHZhciByZXQsIG5hbWUsXG5cdFx0XHRvbGQgPSB7fTtcblxuXHRcdC8vIFJlbWVtYmVyIHRoZSBvbGQgdmFsdWVzLCBhbmQgaW5zZXJ0IHRoZSBuZXcgb25lc1xuXHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRcdG9sZFsgbmFtZSBdID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuXHRcdFx0ZWxlbS5zdHlsZVsgbmFtZSBdID0gb3B0aW9uc1sgbmFtZSBdO1xuXHRcdH1cblxuXHRcdHJldCA9IGNhbGxiYWNrLmNhbGwoIGVsZW0gKTtcblxuXHRcdC8vIFJldmVydCB0aGUgb2xkIHZhbHVlc1xuXHRcdGZvciAoIG5hbWUgaW4gb3B0aW9ucyApIHtcblx0XHRcdGVsZW0uc3R5bGVbIG5hbWUgXSA9IG9sZFsgbmFtZSBdO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH1cbn0pO1xuXG4vLyBOT1RFOiBUbyBhbnkgZnV0dXJlIG1haW50YWluZXIsIHdlJ3ZlIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlXG4vLyBiZWNhdXNlIGpzZG9tIG9uIG5vZGUuanMgd2lsbCBicmVhayB3aXRob3V0IGl0LlxuaWYgKCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSApIHtcblx0Y3VyQ1NTID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0dmFyIHJldCwgd2lkdGgsIG1pbldpZHRoLCBtYXhXaWR0aCxcblx0XHRcdGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoIGVsZW0sIG51bGwgKSxcblx0XHRcdHN0eWxlID0gZWxlbS5zdHlsZTtcblxuXHRcdGlmICggY29tcHV0ZWQgKSB7XG5cblx0XHRcdHJldCA9IGNvbXB1dGVkWyBuYW1lIF07XG5cdFx0XHRpZiAoIHJldCA9PT0gXCJcIiAmJiAhalF1ZXJ5LmNvbnRhaW5zKCBlbGVtLm93bmVyRG9jdW1lbnQsIGVsZW0gKSApIHtcblx0XHRcdFx0cmV0ID0galF1ZXJ5LnN0eWxlKCBlbGVtLCBuYW1lICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEEgdHJpYnV0ZSB0byB0aGUgXCJhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXCJcblx0XHRcdC8vIENocm9tZSA8IDE3IGFuZCBTYWZhcmkgNS4wIHVzZXMgXCJjb21wdXRlZCB2YWx1ZVwiIGluc3RlYWQgb2YgXCJ1c2VkIHZhbHVlXCIgZm9yIG1hcmdpbi1yaWdodFxuXHRcdFx0Ly8gU2FmYXJpIDUuMS43IChhdCBsZWFzdCkgcmV0dXJucyBwZXJjZW50YWdlIGZvciBhIGxhcmdlciBzZXQgb2YgdmFsdWVzLCBidXQgd2lkdGggc2VlbXMgdG8gYmUgcmVsaWFibHkgcGl4ZWxzXG5cdFx0XHQvLyB0aGlzIGlzIGFnYWluc3QgdGhlIENTU09NIGRyYWZ0IHNwZWM6IGh0dHA6Ly9kZXYudzMub3JnL2Nzc3dnL2Nzc29tLyNyZXNvbHZlZC12YWx1ZXNcblx0XHRcdGlmICggcm51bW5vbnB4LnRlc3QoIHJldCApICYmIHJtYXJnaW4udGVzdCggbmFtZSApICkge1xuXHRcdFx0XHR3aWR0aCA9IHN0eWxlLndpZHRoO1xuXHRcdFx0XHRtaW5XaWR0aCA9IHN0eWxlLm1pbldpZHRoO1xuXHRcdFx0XHRtYXhXaWR0aCA9IHN0eWxlLm1heFdpZHRoO1xuXG5cdFx0XHRcdHN0eWxlLm1pbldpZHRoID0gc3R5bGUubWF4V2lkdGggPSBzdHlsZS53aWR0aCA9IHJldDtcblx0XHRcdFx0cmV0ID0gY29tcHV0ZWQud2lkdGg7XG5cblx0XHRcdFx0c3R5bGUud2lkdGggPSB3aWR0aDtcblx0XHRcdFx0c3R5bGUubWluV2lkdGggPSBtaW5XaWR0aDtcblx0XHRcdFx0c3R5bGUubWF4V2lkdGggPSBtYXhXaWR0aDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9O1xufSBlbHNlIGlmICggZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmN1cnJlbnRTdHlsZSApIHtcblx0Y3VyQ1NTID0gZnVuY3Rpb24oIGVsZW0sIG5hbWUgKSB7XG5cdFx0dmFyIGxlZnQsIHJzTGVmdCxcblx0XHRcdHJldCA9IGVsZW0uY3VycmVudFN0eWxlICYmIGVsZW0uY3VycmVudFN0eWxlWyBuYW1lIF0sXG5cdFx0XHRzdHlsZSA9IGVsZW0uc3R5bGU7XG5cblx0XHQvLyBBdm9pZCBzZXR0aW5nIHJldCB0byBlbXB0eSBzdHJpbmcgaGVyZVxuXHRcdC8vIHNvIHdlIGRvbid0IGRlZmF1bHQgdG8gYXV0b1xuXHRcdGlmICggcmV0ID09IG51bGwgJiYgc3R5bGUgJiYgc3R5bGVbIG5hbWUgXSApIHtcblx0XHRcdHJldCA9IHN0eWxlWyBuYW1lIF07XG5cdFx0fVxuXG5cdFx0Ly8gRnJvbSB0aGUgYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1xuXHRcdC8vIGh0dHA6Ly9lcmlrLmVhZS5uZXQvYXJjaGl2ZXMvMjAwNy8wNy8yNy8xOC41NC4xNS8jY29tbWVudC0xMDIyOTFcblxuXHRcdC8vIElmIHdlJ3JlIG5vdCBkZWFsaW5nIHdpdGggYSByZWd1bGFyIHBpeGVsIG51bWJlclxuXHRcdC8vIGJ1dCBhIG51bWJlciB0aGF0IGhhcyBhIHdlaXJkIGVuZGluZywgd2UgbmVlZCB0byBjb252ZXJ0IGl0IHRvIHBpeGVsc1xuXHRcdC8vIGJ1dCBub3QgcG9zaXRpb24gY3NzIGF0dHJpYnV0ZXMsIGFzIHRob3NlIGFyZSBwcm9wb3J0aW9uYWwgdG8gdGhlIHBhcmVudCBlbGVtZW50IGluc3RlYWRcblx0XHQvLyBhbmQgd2UgY2FuJ3QgbWVhc3VyZSB0aGUgcGFyZW50IGluc3RlYWQgYmVjYXVzZSBpdCBtaWdodCB0cmlnZ2VyIGEgXCJzdGFja2luZyBkb2xsc1wiIHByb2JsZW1cblx0XHRpZiAoIHJudW1ub25weC50ZXN0KCByZXQgKSAmJiAhcnBvc2l0aW9uLnRlc3QoIG5hbWUgKSApIHtcblxuXHRcdFx0Ly8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuXHRcdFx0bGVmdCA9IHN0eWxlLmxlZnQ7XG5cdFx0XHRyc0xlZnQgPSBlbGVtLnJ1bnRpbWVTdHlsZSAmJiBlbGVtLnJ1bnRpbWVTdHlsZS5sZWZ0O1xuXG5cdFx0XHQvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG5cdFx0XHRpZiAoIHJzTGVmdCApIHtcblx0XHRcdFx0ZWxlbS5ydW50aW1lU3R5bGUubGVmdCA9IGVsZW0uY3VycmVudFN0eWxlLmxlZnQ7XG5cdFx0XHR9XG5cdFx0XHRzdHlsZS5sZWZ0ID0gbmFtZSA9PT0gXCJmb250U2l6ZVwiID8gXCIxZW1cIiA6IHJldDtcblx0XHRcdHJldCA9IHN0eWxlLnBpeGVsTGVmdCArIFwicHhcIjtcblxuXHRcdFx0Ly8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuXHRcdFx0c3R5bGUubGVmdCA9IGxlZnQ7XG5cdFx0XHRpZiAoIHJzTGVmdCApIHtcblx0XHRcdFx0ZWxlbS5ydW50aW1lU3R5bGUubGVmdCA9IHJzTGVmdDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0ID09PSBcIlwiID8gXCJhdXRvXCIgOiByZXQ7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHNldFBvc2l0aXZlTnVtYmVyKCBlbGVtLCB2YWx1ZSwgc3VidHJhY3QgKSB7XG5cdHZhciBtYXRjaGVzID0gcm51bXNwbGl0LmV4ZWMoIHZhbHVlICk7XG5cdHJldHVybiBtYXRjaGVzID9cblx0XHRcdE1hdGgubWF4KCAwLCBtYXRjaGVzWyAxIF0gLSAoIHN1YnRyYWN0IHx8IDAgKSApICsgKCBtYXRjaGVzWyAyIF0gfHwgXCJweFwiICkgOlxuXHRcdFx0dmFsdWU7XG59XG5cbmZ1bmN0aW9uIGF1Z21lbnRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSwgaXNCb3JkZXJCb3ggKSB7XG5cdHZhciBpID0gZXh0cmEgPT09ICggaXNCb3JkZXJCb3ggPyBcImJvcmRlclwiIDogXCJjb250ZW50XCIgKSA/XG5cdFx0Ly8gSWYgd2UgYWxyZWFkeSBoYXZlIHRoZSByaWdodCBtZWFzdXJlbWVudCwgYXZvaWQgYXVnbWVudGF0aW9uXG5cdFx0NCA6XG5cdFx0Ly8gT3RoZXJ3aXNlIGluaXRpYWxpemUgZm9yIGhvcml6b250YWwgb3IgdmVydGljYWwgcHJvcGVydGllc1xuXHRcdG5hbWUgPT09IFwid2lkdGhcIiA/IDEgOiAwLFxuXG5cdFx0dmFsID0gMDtcblxuXHRmb3IgKCA7IGkgPCA0OyBpICs9IDIgKSB7XG5cdFx0Ly8gYm90aCBib3ggbW9kZWxzIGV4Y2x1ZGUgbWFyZ2luLCBzbyBhZGQgaXQgaWYgd2Ugd2FudCBpdFxuXHRcdGlmICggZXh0cmEgPT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHQvLyB3ZSB1c2UgalF1ZXJ5LmNzcyBpbnN0ZWFkIG9mIGN1ckNTUyBoZXJlXG5cdFx0XHQvLyBiZWNhdXNlIG9mIHRoZSByZWxpYWJsZU1hcmdpblJpZ2h0IENTUyBob29rIVxuXHRcdFx0dmFsICs9IGpRdWVyeS5jc3MoIGVsZW0sIGV4dHJhICsgY3NzRXhwYW5kWyBpIF0sIHRydWUgKTtcblx0XHR9XG5cblx0XHQvLyBGcm9tIHRoaXMgcG9pbnQgb24gd2UgdXNlIGN1ckNTUyBmb3IgbWF4aW11bSBwZXJmb3JtYW5jZSAocmVsZXZhbnQgaW4gYW5pbWF0aW9ucylcblx0XHRpZiAoIGlzQm9yZGVyQm94ICkge1xuXHRcdFx0Ly8gYm9yZGVyLWJveCBpbmNsdWRlcyBwYWRkaW5nLCBzbyByZW1vdmUgaXQgaWYgd2Ugd2FudCBjb250ZW50XG5cdFx0XHRpZiAoIGV4dHJhID09PSBcImNvbnRlbnRcIiApIHtcblx0XHRcdFx0dmFsIC09IHBhcnNlRmxvYXQoIGN1ckNTUyggZWxlbSwgXCJwYWRkaW5nXCIgKyBjc3NFeHBhbmRbIGkgXSApICkgfHwgMDtcblx0XHRcdH1cblxuXHRcdFx0Ly8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgYm9yZGVyIG5vciBtYXJnaW4sIHNvIHJlbW92ZSBib3JkZXJcblx0XHRcdGlmICggZXh0cmEgIT09IFwibWFyZ2luXCIgKSB7XG5cdFx0XHRcdHZhbCAtPSBwYXJzZUZsb2F0KCBjdXJDU1MoIGVsZW0sIFwiYm9yZGVyXCIgKyBjc3NFeHBhbmRbIGkgXSArIFwiV2lkdGhcIiApICkgfHwgMDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gYXQgdGhpcyBwb2ludCwgZXh0cmEgaXNuJ3QgY29udGVudCwgc28gYWRkIHBhZGRpbmdcblx0XHRcdHZhbCArPSBwYXJzZUZsb2F0KCBjdXJDU1MoIGVsZW0sIFwicGFkZGluZ1wiICsgY3NzRXhwYW5kWyBpIF0gKSApIHx8IDA7XG5cblx0XHRcdC8vIGF0IHRoaXMgcG9pbnQsIGV4dHJhIGlzbid0IGNvbnRlbnQgbm9yIHBhZGRpbmcsIHNvIGFkZCBib3JkZXJcblx0XHRcdGlmICggZXh0cmEgIT09IFwicGFkZGluZ1wiICkge1xuXHRcdFx0XHR2YWwgKz0gcGFyc2VGbG9hdCggY3VyQ1NTKCBlbGVtLCBcImJvcmRlclwiICsgY3NzRXhwYW5kWyBpIF0gKyBcIldpZHRoXCIgKSApIHx8IDA7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0V2lkdGhPckhlaWdodCggZWxlbSwgbmFtZSwgZXh0cmEgKSB7XG5cblx0Ly8gU3RhcnQgd2l0aCBvZmZzZXQgcHJvcGVydHksIHdoaWNoIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGJvcmRlci1ib3ggdmFsdWVcblx0dmFyIHZhbCA9IG5hbWUgPT09IFwid2lkdGhcIiA/IGVsZW0ub2Zmc2V0V2lkdGggOiBlbGVtLm9mZnNldEhlaWdodCxcblx0XHR2YWx1ZUlzQm9yZGVyQm94ID0gdHJ1ZSxcblx0XHRpc0JvcmRlckJveCA9IGpRdWVyeS5zdXBwb3J0LmJveFNpemluZyAmJiBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiICkgPT09IFwiYm9yZGVyLWJveFwiO1xuXG5cdC8vIHNvbWUgbm9uLWh0bWwgZWxlbWVudHMgcmV0dXJuIHVuZGVmaW5lZCBmb3Igb2Zmc2V0V2lkdGgsIHNvIGNoZWNrIGZvciBudWxsL3VuZGVmaW5lZFxuXHQvLyBzdmcgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02NDkyODVcblx0Ly8gTWF0aE1MIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDkxNjY4XG5cdGlmICggdmFsIDw9IDAgfHwgdmFsID09IG51bGwgKSB7XG5cdFx0Ly8gRmFsbCBiYWNrIHRvIGNvbXB1dGVkIHRoZW4gdW5jb21wdXRlZCBjc3MgaWYgbmVjZXNzYXJ5XG5cdFx0dmFsID0gY3VyQ1NTKCBlbGVtLCBuYW1lICk7XG5cdFx0aWYgKCB2YWwgPCAwIHx8IHZhbCA9PSBudWxsICkge1xuXHRcdFx0dmFsID0gZWxlbS5zdHlsZVsgbmFtZSBdO1xuXHRcdH1cblxuXHRcdC8vIENvbXB1dGVkIHVuaXQgaXMgbm90IHBpeGVscy4gU3RvcCBoZXJlIGFuZCByZXR1cm4uXG5cdFx0aWYgKCBybnVtbm9ucHgudGVzdCh2YWwpICkge1xuXHRcdFx0cmV0dXJuIHZhbDtcblx0XHR9XG5cblx0XHQvLyB3ZSBuZWVkIHRoZSBjaGVjayBmb3Igc3R5bGUgaW4gY2FzZSBhIGJyb3dzZXIgd2hpY2ggcmV0dXJucyB1bnJlbGlhYmxlIHZhbHVlc1xuXHRcdC8vIGZvciBnZXRDb21wdXRlZFN0eWxlIHNpbGVudGx5IGZhbGxzIGJhY2sgdG8gdGhlIHJlbGlhYmxlIGVsZW0uc3R5bGVcblx0XHR2YWx1ZUlzQm9yZGVyQm94ID0gaXNCb3JkZXJCb3ggJiYgKCBqUXVlcnkuc3VwcG9ydC5ib3hTaXppbmdSZWxpYWJsZSB8fCB2YWwgPT09IGVsZW0uc3R5bGVbIG5hbWUgXSApO1xuXG5cdFx0Ly8gTm9ybWFsaXplIFwiXCIsIGF1dG8sIGFuZCBwcmVwYXJlIGZvciBleHRyYVxuXHRcdHZhbCA9IHBhcnNlRmxvYXQoIHZhbCApIHx8IDA7XG5cdH1cblxuXHQvLyB1c2UgdGhlIGFjdGl2ZSBib3gtc2l6aW5nIG1vZGVsIHRvIGFkZC9zdWJ0cmFjdCBpcnJlbGV2YW50IHN0eWxlc1xuXHRyZXR1cm4gKCB2YWwgK1xuXHRcdGF1Z21lbnRXaWR0aE9ySGVpZ2h0KFxuXHRcdFx0ZWxlbSxcblx0XHRcdG5hbWUsXG5cdFx0XHRleHRyYSB8fCAoIGlzQm9yZGVyQm94ID8gXCJib3JkZXJcIiA6IFwiY29udGVudFwiICksXG5cdFx0XHR2YWx1ZUlzQm9yZGVyQm94XG5cdFx0KVxuXHQpICsgXCJweFwiO1xufVxuXG5cbi8vIFRyeSB0byBkZXRlcm1pbmUgdGhlIGRlZmF1bHQgZGlzcGxheSB2YWx1ZSBvZiBhbiBlbGVtZW50XG5mdW5jdGlvbiBjc3NfZGVmYXVsdERpc3BsYXkoIG5vZGVOYW1lICkge1xuXHRpZiAoIGVsZW1kaXNwbGF5WyBub2RlTmFtZSBdICkge1xuXHRcdHJldHVybiBlbGVtZGlzcGxheVsgbm9kZU5hbWUgXTtcblx0fVxuXG5cdHZhciBlbGVtID0galF1ZXJ5KCBcIjxcIiArIG5vZGVOYW1lICsgXCI+XCIgKS5hcHBlbmRUbyggZG9jdW1lbnQuYm9keSApLFxuXHRcdGRpc3BsYXkgPSBlbGVtLmNzcyhcImRpc3BsYXlcIik7XG5cdGVsZW0ucmVtb3ZlKCk7XG5cblx0Ly8gSWYgdGhlIHNpbXBsZSB3YXkgZmFpbHMsXG5cdC8vIGdldCBlbGVtZW50J3MgcmVhbCBkZWZhdWx0IGRpc3BsYXkgYnkgYXR0YWNoaW5nIGl0IHRvIGEgdGVtcCBpZnJhbWVcblx0aWYgKCBkaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBkaXNwbGF5ID09PSBcIlwiICkge1xuXHRcdC8vIFVzZSB0aGUgYWxyZWFkeS1jcmVhdGVkIGlmcmFtZSBpZiBwb3NzaWJsZVxuXHRcdGlmcmFtZSA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoXG5cdFx0XHRpZnJhbWUgfHwgalF1ZXJ5LmV4dGVuZCggZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKSwge1xuXHRcdFx0XHRmcmFtZUJvcmRlcjogMCxcblx0XHRcdFx0d2lkdGg6IDAsXG5cdFx0XHRcdGhlaWdodDogMFxuXHRcdFx0fSlcblx0XHQpO1xuXG5cdFx0Ly8gQ3JlYXRlIGEgY2FjaGVhYmxlIGNvcHkgb2YgdGhlIGlmcmFtZSBkb2N1bWVudCBvbiBmaXJzdCBjYWxsLlxuXHRcdC8vIElFIGFuZCBPcGVyYSB3aWxsIGFsbG93IHVzIHRvIHJldXNlIHRoZSBpZnJhbWVEb2Mgd2l0aG91dCByZS13cml0aW5nIHRoZSBmYWtlIEhUTUxcblx0XHQvLyBkb2N1bWVudCB0byBpdDsgV2ViS2l0ICYgRmlyZWZveCB3b24ndCBhbGxvdyByZXVzaW5nIHRoZSBpZnJhbWUgZG9jdW1lbnQuXG5cdFx0aWYgKCAhaWZyYW1lRG9jIHx8ICFpZnJhbWUuY3JlYXRlRWxlbWVudCApIHtcblx0XHRcdGlmcmFtZURvYyA9ICggaWZyYW1lLmNvbnRlbnRXaW5kb3cgfHwgaWZyYW1lLmNvbnRlbnREb2N1bWVudCApLmRvY3VtZW50O1xuXHRcdFx0aWZyYW1lRG9jLndyaXRlKFwiPCFkb2N0eXBlIGh0bWw+PGh0bWw+PGJvZHk+XCIpO1xuXHRcdFx0aWZyYW1lRG9jLmNsb3NlKCk7XG5cdFx0fVxuXG5cdFx0ZWxlbSA9IGlmcmFtZURvYy5ib2R5LmFwcGVuZENoaWxkKCBpZnJhbWVEb2MuY3JlYXRlRWxlbWVudChub2RlTmFtZSkgKTtcblxuXHRcdGRpc3BsYXkgPSBjdXJDU1MoIGVsZW0sIFwiZGlzcGxheVwiICk7XG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCggaWZyYW1lICk7XG5cdH1cblxuXHQvLyBTdG9yZSB0aGUgY29ycmVjdCBkZWZhdWx0IGRpc3BsYXlcblx0ZWxlbWRpc3BsYXlbIG5vZGVOYW1lIF0gPSBkaXNwbGF5O1xuXG5cdHJldHVybiBkaXNwbGF5O1xufVxuXG5qUXVlcnkuZWFjaChbIFwiaGVpZ2h0XCIsIFwid2lkdGhcIiBdLCBmdW5jdGlvbiggaSwgbmFtZSApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBuYW1lIF0gPSB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQsIGV4dHJhICkge1xuXHRcdFx0aWYgKCBjb21wdXRlZCApIHtcblx0XHRcdFx0Ly8gY2VydGFpbiBlbGVtZW50cyBjYW4gaGF2ZSBkaW1lbnNpb24gaW5mbyBpZiB3ZSBpbnZpc2libHkgc2hvdyB0aGVtXG5cdFx0XHRcdC8vIGhvd2V2ZXIsIGl0IG11c3QgaGF2ZSBhIGN1cnJlbnQgZGlzcGxheSBzdHlsZSB0aGF0IHdvdWxkIGJlbmVmaXQgZnJvbSB0aGlzXG5cdFx0XHRcdGlmICggZWxlbS5vZmZzZXRXaWR0aCA9PT0gMCAmJiByZGlzcGxheXN3YXAudGVzdCggY3VyQ1NTKCBlbGVtLCBcImRpc3BsYXlcIiApICkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGpRdWVyeS5zd2FwKCBlbGVtLCBjc3NTaG93LCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBnZXRXaWR0aE9ySGVpZ2h0KCBlbGVtLCBuYW1lLCBleHRyYSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNldDogZnVuY3Rpb24oIGVsZW0sIHZhbHVlLCBleHRyYSApIHtcblx0XHRcdHJldHVybiBzZXRQb3NpdGl2ZU51bWJlciggZWxlbSwgdmFsdWUsIGV4dHJhID9cblx0XHRcdFx0YXVnbWVudFdpZHRoT3JIZWlnaHQoXG5cdFx0XHRcdFx0ZWxlbSxcblx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdGV4dHJhLFxuXHRcdFx0XHRcdGpRdWVyeS5zdXBwb3J0LmJveFNpemluZyAmJiBqUXVlcnkuY3NzKCBlbGVtLCBcImJveFNpemluZ1wiICkgPT09IFwiYm9yZGVyLWJveFwiXG5cdFx0XHRcdCkgOiAwXG5cdFx0XHQpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG5pZiAoICFqUXVlcnkuc3VwcG9ydC5vcGFjaXR5ICkge1xuXHRqUXVlcnkuY3NzSG9va3Mub3BhY2l0eSA9IHtcblx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdC8vIElFIHVzZXMgZmlsdGVycyBmb3Igb3BhY2l0eVxuXHRcdFx0cmV0dXJuIHJvcGFjaXR5LnRlc3QoIChjb21wdXRlZCAmJiBlbGVtLmN1cnJlbnRTdHlsZSA/IGVsZW0uY3VycmVudFN0eWxlLmZpbHRlciA6IGVsZW0uc3R5bGUuZmlsdGVyKSB8fCBcIlwiICkgP1xuXHRcdFx0XHQoIDAuMDEgKiBwYXJzZUZsb2F0KCBSZWdFeHAuJDEgKSApICsgXCJcIiA6XG5cdFx0XHRcdGNvbXB1dGVkID8gXCIxXCIgOiBcIlwiO1xuXHRcdH0sXG5cblx0XHRzZXQ6IGZ1bmN0aW9uKCBlbGVtLCB2YWx1ZSApIHtcblx0XHRcdHZhciBzdHlsZSA9IGVsZW0uc3R5bGUsXG5cdFx0XHRcdGN1cnJlbnRTdHlsZSA9IGVsZW0uY3VycmVudFN0eWxlLFxuXHRcdFx0XHRvcGFjaXR5ID0galF1ZXJ5LmlzTnVtZXJpYyggdmFsdWUgKSA/IFwiYWxwaGEob3BhY2l0eT1cIiArIHZhbHVlICogMTAwICsgXCIpXCIgOiBcIlwiLFxuXHRcdFx0XHRmaWx0ZXIgPSBjdXJyZW50U3R5bGUgJiYgY3VycmVudFN0eWxlLmZpbHRlciB8fCBzdHlsZS5maWx0ZXIgfHwgXCJcIjtcblxuXHRcdFx0Ly8gSUUgaGFzIHRyb3VibGUgd2l0aCBvcGFjaXR5IGlmIGl0IGRvZXMgbm90IGhhdmUgbGF5b3V0XG5cdFx0XHQvLyBGb3JjZSBpdCBieSBzZXR0aW5nIHRoZSB6b29tIGxldmVsXG5cdFx0XHRzdHlsZS56b29tID0gMTtcblxuXHRcdFx0Ly8gaWYgc2V0dGluZyBvcGFjaXR5IHRvIDEsIGFuZCBubyBvdGhlciBmaWx0ZXJzIGV4aXN0IC0gYXR0ZW1wdCB0byByZW1vdmUgZmlsdGVyIGF0dHJpYnV0ZSAjNjY1MlxuXHRcdFx0aWYgKCB2YWx1ZSA+PSAxICYmIGpRdWVyeS50cmltKCBmaWx0ZXIucmVwbGFjZSggcmFscGhhLCBcIlwiICkgKSA9PT0gXCJcIiAmJlxuXHRcdFx0XHRzdHlsZS5yZW1vdmVBdHRyaWJ1dGUgKSB7XG5cblx0XHRcdFx0Ly8gU2V0dGluZyBzdHlsZS5maWx0ZXIgdG8gbnVsbCwgXCJcIiAmIFwiIFwiIHN0aWxsIGxlYXZlIFwiZmlsdGVyOlwiIGluIHRoZSBjc3NUZXh0XG5cdFx0XHRcdC8vIGlmIFwiZmlsdGVyOlwiIGlzIHByZXNlbnQgYXQgYWxsLCBjbGVhclR5cGUgaXMgZGlzYWJsZWQsIHdlIHdhbnQgdG8gYXZvaWQgdGhpc1xuXHRcdFx0XHQvLyBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUgaXMgSUUgT25seSwgYnV0IHNvIGFwcGFyZW50bHkgaXMgdGhpcyBjb2RlIHBhdGguLi5cblx0XHRcdFx0c3R5bGUucmVtb3ZlQXR0cmlidXRlKCBcImZpbHRlclwiICk7XG5cblx0XHRcdFx0Ly8gaWYgdGhlcmUgdGhlcmUgaXMgbm8gZmlsdGVyIHN0eWxlIGFwcGxpZWQgaW4gYSBjc3MgcnVsZSwgd2UgYXJlIGRvbmVcblx0XHRcdFx0aWYgKCBjdXJyZW50U3R5bGUgJiYgIWN1cnJlbnRTdHlsZS5maWx0ZXIgKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIG90aGVyd2lzZSwgc2V0IG5ldyBmaWx0ZXIgdmFsdWVzXG5cdFx0XHRzdHlsZS5maWx0ZXIgPSByYWxwaGEudGVzdCggZmlsdGVyICkgP1xuXHRcdFx0XHRmaWx0ZXIucmVwbGFjZSggcmFscGhhLCBvcGFjaXR5ICkgOlxuXHRcdFx0XHRmaWx0ZXIgKyBcIiBcIiArIG9wYWNpdHk7XG5cdFx0fVxuXHR9O1xufVxuXG4vLyBUaGVzZSBob29rcyBjYW5ub3QgYmUgYWRkZWQgdW50aWwgRE9NIHJlYWR5IGJlY2F1c2UgdGhlIHN1cHBvcnQgdGVzdFxuLy8gZm9yIGl0IGlzIG5vdCBydW4gdW50aWwgYWZ0ZXIgRE9NIHJlYWR5XG5qUXVlcnkoZnVuY3Rpb24oKSB7XG5cdGlmICggIWpRdWVyeS5zdXBwb3J0LnJlbGlhYmxlTWFyZ2luUmlnaHQgKSB7XG5cdFx0alF1ZXJ5LmNzc0hvb2tzLm1hcmdpblJpZ2h0ID0ge1xuXHRcdFx0Z2V0OiBmdW5jdGlvbiggZWxlbSwgY29tcHV0ZWQgKSB7XG5cdFx0XHRcdC8vIFdlYktpdCBCdWcgMTMzNDMgLSBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgd3JvbmcgdmFsdWUgZm9yIG1hcmdpbi1yaWdodFxuXHRcdFx0XHQvLyBXb3JrIGFyb3VuZCBieSB0ZW1wb3JhcmlseSBzZXR0aW5nIGVsZW1lbnQgZGlzcGxheSB0byBpbmxpbmUtYmxvY2tcblx0XHRcdFx0cmV0dXJuIGpRdWVyeS5zd2FwKCBlbGVtLCB7IFwiZGlzcGxheVwiOiBcImlubGluZS1ibG9ja1wiIH0sIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGlmICggY29tcHV0ZWQgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY3VyQ1NTKCBlbGVtLCBcIm1hcmdpblJpZ2h0XCIgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHQvLyBXZWJraXQgYnVnOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjkwODRcblx0Ly8gZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIHBlcmNlbnQgd2hlbiBzcGVjaWZpZWQgZm9yIHRvcC9sZWZ0L2JvdHRvbS9yaWdodFxuXHQvLyByYXRoZXIgdGhhbiBtYWtlIHRoZSBjc3MgbW9kdWxlIGRlcGVuZCBvbiB0aGUgb2Zmc2V0IG1vZHVsZSwgd2UganVzdCBjaGVjayBmb3IgaXQgaGVyZVxuXHRpZiAoICFqUXVlcnkuc3VwcG9ydC5waXhlbFBvc2l0aW9uICYmIGpRdWVyeS5mbi5wb3NpdGlvbiApIHtcblx0XHRqUXVlcnkuZWFjaCggWyBcInRvcFwiLCBcImxlZnRcIiBdLCBmdW5jdGlvbiggaSwgcHJvcCApIHtcblx0XHRcdGpRdWVyeS5jc3NIb29rc1sgcHJvcCBdID0ge1xuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCBlbGVtLCBjb21wdXRlZCApIHtcblx0XHRcdFx0XHRpZiAoIGNvbXB1dGVkICkge1xuXHRcdFx0XHRcdFx0dmFyIHJldCA9IGN1ckNTUyggZWxlbSwgcHJvcCApO1xuXHRcdFx0XHRcdFx0Ly8gaWYgY3VyQ1NTIHJldHVybnMgcGVyY2VudGFnZSwgZmFsbGJhY2sgdG8gb2Zmc2V0XG5cdFx0XHRcdFx0XHRyZXR1cm4gcm51bW5vbnB4LnRlc3QoIHJldCApID8galF1ZXJ5KCBlbGVtICkucG9zaXRpb24oKVsgcHJvcCBdICsgXCJweFwiIDogcmV0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9KTtcblx0fVxuXG59KTtcblxuaWYgKCBqUXVlcnkuZXhwciAmJiBqUXVlcnkuZXhwci5maWx0ZXJzICkge1xuXHRqUXVlcnkuZXhwci5maWx0ZXJzLmhpZGRlbiA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXHRcdHJldHVybiAoIGVsZW0ub2Zmc2V0V2lkdGggPT09IDAgJiYgZWxlbS5vZmZzZXRIZWlnaHQgPT09IDAgKSB8fCAoIWpRdWVyeS5zdXBwb3J0LnJlbGlhYmxlSGlkZGVuT2Zmc2V0cyAmJiAoKGVsZW0uc3R5bGUgJiYgZWxlbS5zdHlsZS5kaXNwbGF5KSB8fCBjdXJDU1MoIGVsZW0sIFwiZGlzcGxheVwiICkpID09PSBcIm5vbmVcIik7XG5cdH07XG5cblx0alF1ZXJ5LmV4cHIuZmlsdGVycy52aXNpYmxlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG5cdFx0cmV0dXJuICFqUXVlcnkuZXhwci5maWx0ZXJzLmhpZGRlbiggZWxlbSApO1xuXHR9O1xufVxuXG4vLyBUaGVzZSBob29rcyBhcmUgdXNlZCBieSBhbmltYXRlIHRvIGV4cGFuZCBwcm9wZXJ0aWVzXG5qUXVlcnkuZWFjaCh7XG5cdG1hcmdpbjogXCJcIixcblx0cGFkZGluZzogXCJcIixcblx0Ym9yZGVyOiBcIldpZHRoXCJcbn0sIGZ1bmN0aW9uKCBwcmVmaXgsIHN1ZmZpeCApIHtcblx0alF1ZXJ5LmNzc0hvb2tzWyBwcmVmaXggKyBzdWZmaXggXSA9IHtcblx0XHRleHBhbmQ6IGZ1bmN0aW9uKCB2YWx1ZSApIHtcblx0XHRcdHZhciBpLFxuXG5cdFx0XHRcdC8vIGFzc3VtZXMgYSBzaW5nbGUgbnVtYmVyIGlmIG5vdCBhIHN0cmluZ1xuXHRcdFx0XHRwYXJ0cyA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnNwbGl0KFwiIFwiKSA6IFsgdmFsdWUgXSxcblx0XHRcdFx0ZXhwYW5kZWQgPSB7fTtcblxuXHRcdFx0Zm9yICggaSA9IDA7IGkgPCA0OyBpKysgKSB7XG5cdFx0XHRcdGV4cGFuZGVkWyBwcmVmaXggKyBjc3NFeHBhbmRbIGkgXSArIHN1ZmZpeCBdID1cblx0XHRcdFx0XHRwYXJ0c1sgaSBdIHx8IHBhcnRzWyBpIC0gMiBdIHx8IHBhcnRzWyAwIF07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBleHBhbmRlZDtcblx0XHR9XG5cdH07XG5cblx0aWYgKCAhcm1hcmdpbi50ZXN0KCBwcmVmaXggKSApIHtcblx0XHRqUXVlcnkuY3NzSG9va3NbIHByZWZpeCArIHN1ZmZpeCBdLnNldCA9IHNldFBvc2l0aXZlTnVtYmVyO1xuXHR9XG59KTtcbnZhciByMjAgPSAvJTIwL2csXG5cdHJicmFja2V0ID0gL1xcW1xcXSQvLFxuXHRyQ1JMRiA9IC9cXHI/XFxuL2csXG5cdHJpbnB1dCA9IC9eKD86Y29sb3J8ZGF0ZXxkYXRldGltZXxkYXRldGltZS1sb2NhbHxlbWFpbHxoaWRkZW58bW9udGh8bnVtYmVyfHBhc3N3b3JkfHJhbmdlfHNlYXJjaHx0ZWx8dGV4dHx0aW1lfHVybHx3ZWVrKSQvaSxcblx0cnNlbGVjdFRleHRhcmVhID0gL14oPzpzZWxlY3R8dGV4dGFyZWEpL2k7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRzZXJpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBqUXVlcnkucGFyYW0oIHRoaXMuc2VyaWFsaXplQXJyYXkoKSApO1xuXHR9LFxuXHRzZXJpYWxpemVBcnJheTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50cyA/IGpRdWVyeS5tYWtlQXJyYXkoIHRoaXMuZWxlbWVudHMgKSA6IHRoaXM7XG5cdFx0fSlcblx0XHQuZmlsdGVyKGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5uYW1lICYmICF0aGlzLmRpc2FibGVkICYmXG5cdFx0XHRcdCggdGhpcy5jaGVja2VkIHx8IHJzZWxlY3RUZXh0YXJlYS50ZXN0KCB0aGlzLm5vZGVOYW1lICkgfHxcblx0XHRcdFx0XHRyaW5wdXQudGVzdCggdGhpcy50eXBlICkgKTtcblx0XHR9KVxuXHRcdC5tYXAoZnVuY3Rpb24oIGksIGVsZW0gKXtcblx0XHRcdHZhciB2YWwgPSBqUXVlcnkoIHRoaXMgKS52YWwoKTtcblxuXHRcdFx0cmV0dXJuIHZhbCA9PSBudWxsID9cblx0XHRcdFx0bnVsbCA6XG5cdFx0XHRcdGpRdWVyeS5pc0FycmF5KCB2YWwgKSA/XG5cdFx0XHRcdFx0alF1ZXJ5Lm1hcCggdmFsLCBmdW5jdGlvbiggdmFsLCBpICl7XG5cdFx0XHRcdFx0XHRyZXR1cm4geyBuYW1lOiBlbGVtLm5hbWUsIHZhbHVlOiB2YWwucmVwbGFjZSggckNSTEYsIFwiXFxyXFxuXCIgKSB9O1xuXHRcdFx0XHRcdH0pIDpcblx0XHRcdFx0XHR7IG5hbWU6IGVsZW0ubmFtZSwgdmFsdWU6IHZhbC5yZXBsYWNlKCByQ1JMRiwgXCJcXHJcXG5cIiApIH07XG5cdFx0fSkuZ2V0KCk7XG5cdH1cbn0pO1xuXG4vL1NlcmlhbGl6ZSBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzIG9yIGEgc2V0IG9mXG4vL2tleS92YWx1ZXMgaW50byBhIHF1ZXJ5IHN0cmluZ1xualF1ZXJ5LnBhcmFtID0gZnVuY3Rpb24oIGEsIHRyYWRpdGlvbmFsICkge1xuXHR2YXIgcHJlZml4LFxuXHRcdHMgPSBbXSxcblx0XHRhZGQgPSBmdW5jdGlvbigga2V5LCB2YWx1ZSApIHtcblx0XHRcdC8vIElmIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGludm9rZSBpdCBhbmQgcmV0dXJuIGl0cyB2YWx1ZVxuXHRcdFx0dmFsdWUgPSBqUXVlcnkuaXNGdW5jdGlvbiggdmFsdWUgKSA/IHZhbHVlKCkgOiAoIHZhbHVlID09IG51bGwgPyBcIlwiIDogdmFsdWUgKTtcblx0XHRcdHNbIHMubGVuZ3RoIF0gPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoIHZhbHVlICk7XG5cdFx0fTtcblxuXHQvLyBTZXQgdHJhZGl0aW9uYWwgdG8gdHJ1ZSBmb3IgalF1ZXJ5IDw9IDEuMy4yIGJlaGF2aW9yLlxuXHRpZiAoIHRyYWRpdGlvbmFsID09PSB1bmRlZmluZWQgKSB7XG5cdFx0dHJhZGl0aW9uYWwgPSBqUXVlcnkuYWpheFNldHRpbmdzICYmIGpRdWVyeS5hamF4U2V0dGluZ3MudHJhZGl0aW9uYWw7XG5cdH1cblxuXHQvLyBJZiBhbiBhcnJheSB3YXMgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCBpdCBpcyBhbiBhcnJheSBvZiBmb3JtIGVsZW1lbnRzLlxuXHRpZiAoIGpRdWVyeS5pc0FycmF5KCBhICkgfHwgKCBhLmpxdWVyeSAmJiAhalF1ZXJ5LmlzUGxhaW5PYmplY3QoIGEgKSApICkge1xuXHRcdC8vIFNlcmlhbGl6ZSB0aGUgZm9ybSBlbGVtZW50c1xuXHRcdGpRdWVyeS5lYWNoKCBhLCBmdW5jdGlvbigpIHtcblx0XHRcdGFkZCggdGhpcy5uYW1lLCB0aGlzLnZhbHVlICk7XG5cdFx0fSk7XG5cblx0fSBlbHNlIHtcblx0XHQvLyBJZiB0cmFkaXRpb25hbCwgZW5jb2RlIHRoZSBcIm9sZFwiIHdheSAodGhlIHdheSAxLjMuMiBvciBvbGRlclxuXHRcdC8vIGRpZCBpdCksIG90aGVyd2lzZSBlbmNvZGUgcGFyYW1zIHJlY3Vyc2l2ZWx5LlxuXHRcdGZvciAoIHByZWZpeCBpbiBhICkge1xuXHRcdFx0YnVpbGRQYXJhbXMoIHByZWZpeCwgYVsgcHJlZml4IF0sIHRyYWRpdGlvbmFsLCBhZGQgKTtcblx0XHR9XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIHJlc3VsdGluZyBzZXJpYWxpemF0aW9uXG5cdHJldHVybiBzLmpvaW4oIFwiJlwiICkucmVwbGFjZSggcjIwLCBcIitcIiApO1xufTtcblxuZnVuY3Rpb24gYnVpbGRQYXJhbXMoIHByZWZpeCwgb2JqLCB0cmFkaXRpb25hbCwgYWRkICkge1xuXHR2YXIgbmFtZTtcblxuXHRpZiAoIGpRdWVyeS5pc0FycmF5KCBvYmogKSApIHtcblx0XHQvLyBTZXJpYWxpemUgYXJyYXkgaXRlbS5cblx0XHRqUXVlcnkuZWFjaCggb2JqLCBmdW5jdGlvbiggaSwgdiApIHtcblx0XHRcdGlmICggdHJhZGl0aW9uYWwgfHwgcmJyYWNrZXQudGVzdCggcHJlZml4ICkgKSB7XG5cdFx0XHRcdC8vIFRyZWF0IGVhY2ggYXJyYXkgaXRlbSBhcyBhIHNjYWxhci5cblx0XHRcdFx0YWRkKCBwcmVmaXgsIHYgKTtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gSWYgYXJyYXkgaXRlbSBpcyBub24tc2NhbGFyIChhcnJheSBvciBvYmplY3QpLCBlbmNvZGUgaXRzXG5cdFx0XHRcdC8vIG51bWVyaWMgaW5kZXggdG8gcmVzb2x2ZSBkZXNlcmlhbGl6YXRpb24gYW1iaWd1aXR5IGlzc3Vlcy5cblx0XHRcdFx0Ly8gTm90ZSB0aGF0IHJhY2sgKGFzIG9mIDEuMC4wKSBjYW4ndCBjdXJyZW50bHkgZGVzZXJpYWxpemVcblx0XHRcdFx0Ly8gbmVzdGVkIGFycmF5cyBwcm9wZXJseSwgYW5kIGF0dGVtcHRpbmcgdG8gZG8gc28gbWF5IGNhdXNlXG5cdFx0XHRcdC8vIGEgc2VydmVyIGVycm9yLiBQb3NzaWJsZSBmaXhlcyBhcmUgdG8gbW9kaWZ5IHJhY2snc1xuXHRcdFx0XHQvLyBkZXNlcmlhbGl6YXRpb24gYWxnb3JpdGhtIG9yIHRvIHByb3ZpZGUgYW4gb3B0aW9uIG9yIGZsYWdcblx0XHRcdFx0Ly8gdG8gZm9yY2UgYXJyYXkgc2VyaWFsaXphdGlvbiB0byBiZSBzaGFsbG93LlxuXHRcdFx0XHRidWlsZFBhcmFtcyggcHJlZml4ICsgXCJbXCIgKyAoIHR5cGVvZiB2ID09PSBcIm9iamVjdFwiID8gaSA6IFwiXCIgKSArIFwiXVwiLCB2LCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICggIXRyYWRpdGlvbmFsICYmIGpRdWVyeS50eXBlKCBvYmogKSA9PT0gXCJvYmplY3RcIiApIHtcblx0XHQvLyBTZXJpYWxpemUgb2JqZWN0IGl0ZW0uXG5cdFx0Zm9yICggbmFtZSBpbiBvYmogKSB7XG5cdFx0XHRidWlsZFBhcmFtcyggcHJlZml4ICsgXCJbXCIgKyBuYW1lICsgXCJdXCIsIG9ialsgbmFtZSBdLCB0cmFkaXRpb25hbCwgYWRkICk7XG5cdFx0fVxuXG5cdH0gZWxzZSB7XG5cdFx0Ly8gU2VyaWFsaXplIHNjYWxhciBpdGVtLlxuXHRcdGFkZCggcHJlZml4LCBvYmogKTtcblx0fVxufVxudmFyIC8vIERvY3VtZW50IGxvY2F0aW9uXG5cdGFqYXhMb2NhdGlvbixcblx0Ly8gRG9jdW1lbnQgbG9jYXRpb24gc2VnbWVudHNcblx0YWpheExvY1BhcnRzLFxuXG5cdHJoYXNoID0gLyMuKiQvLFxuXHRyaGVhZGVycyA9IC9eKC4qPyk6WyBcXHRdKihbXlxcclxcbl0qKVxccj8kL21nLCAvLyBJRSBsZWF2ZXMgYW4gXFxyIGNoYXJhY3RlciBhdCBFT0xcblx0Ly8gIzc2NTMsICM4MTI1LCAjODE1MjogbG9jYWwgcHJvdG9jb2wgZGV0ZWN0aW9uXG5cdHJsb2NhbFByb3RvY29sID0gL14oPzphYm91dHxhcHB8YXBwXFwtc3RvcmFnZXwuK1xcLWV4dGVuc2lvbnxmaWxlfHJlc3x3aWRnZXQpOiQvLFxuXHRybm9Db250ZW50ID0gL14oPzpHRVR8SEVBRCkkLyxcblx0cnByb3RvY29sID0gL15cXC9cXC8vLFxuXHRycXVlcnkgPSAvXFw/Lyxcblx0cnNjcmlwdCA9IC88c2NyaXB0XFxiW148XSooPzooPyE8XFwvc2NyaXB0Pik8W148XSopKjxcXC9zY3JpcHQ+L2dpLFxuXHRydHMgPSAvKFs/Jl0pXz1bXiZdKi8sXG5cdHJ1cmwgPSAvXihbXFx3XFwrXFwuXFwtXSs6KSg/OlxcL1xcLyhbXlxcLz8jOl0qKSg/OjooXFxkKyl8KXwpLyxcblxuXHQvLyBLZWVwIGEgY29weSBvZiB0aGUgb2xkIGxvYWQgbWV0aG9kXG5cdF9sb2FkID0galF1ZXJ5LmZuLmxvYWQsXG5cblx0LyogUHJlZmlsdGVyc1xuXHQgKiAxKSBUaGV5IGFyZSB1c2VmdWwgdG8gaW50cm9kdWNlIGN1c3RvbSBkYXRhVHlwZXMgKHNlZSBhamF4L2pzb25wLmpzIGZvciBhbiBleGFtcGxlKVxuXHQgKiAyKSBUaGVzZSBhcmUgY2FsbGVkOlxuXHQgKiAgICAtIEJFRk9SRSBhc2tpbmcgZm9yIGEgdHJhbnNwb3J0XG5cdCAqICAgIC0gQUZURVIgcGFyYW0gc2VyaWFsaXphdGlvbiAocy5kYXRhIGlzIGEgc3RyaW5nIGlmIHMucHJvY2Vzc0RhdGEgaXMgdHJ1ZSlcblx0ICogMykga2V5IGlzIHRoZSBkYXRhVHlwZVxuXHQgKiA0KSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkXG5cdCAqIDUpIGV4ZWN1dGlvbiB3aWxsIHN0YXJ0IHdpdGggdHJhbnNwb3J0IGRhdGFUeXBlIGFuZCBUSEVOIGNvbnRpbnVlIGRvd24gdG8gXCIqXCIgaWYgbmVlZGVkXG5cdCAqL1xuXHRwcmVmaWx0ZXJzID0ge30sXG5cblx0LyogVHJhbnNwb3J0cyBiaW5kaW5nc1xuXHQgKiAxKSBrZXkgaXMgdGhlIGRhdGFUeXBlXG5cdCAqIDIpIHRoZSBjYXRjaGFsbCBzeW1ib2wgXCIqXCIgY2FuIGJlIHVzZWRcblx0ICogMykgc2VsZWN0aW9uIHdpbGwgc3RhcnQgd2l0aCB0cmFuc3BvcnQgZGF0YVR5cGUgYW5kIFRIRU4gZ28gdG8gXCIqXCIgaWYgbmVlZGVkXG5cdCAqL1xuXHR0cmFuc3BvcnRzID0ge30sXG5cblx0Ly8gQXZvaWQgY29tbWVudC1wcm9sb2cgY2hhciBzZXF1ZW5jZSAoIzEwMDk4KTsgbXVzdCBhcHBlYXNlIGxpbnQgYW5kIGV2YWRlIGNvbXByZXNzaW9uXG5cdGFsbFR5cGVzID0gW1wiKi9cIl0gKyBbXCIqXCJdO1xuXG4vLyAjODEzOCwgSUUgbWF5IHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIGFjY2Vzc2luZ1xuLy8gYSBmaWVsZCBmcm9tIHdpbmRvdy5sb2NhdGlvbiBpZiBkb2N1bWVudC5kb21haW4gaGFzIGJlZW4gc2V0XG50cnkge1xuXHRhamF4TG9jYXRpb24gPSBsb2NhdGlvbi5ocmVmO1xufSBjYXRjaCggZSApIHtcblx0Ly8gVXNlIHRoZSBocmVmIGF0dHJpYnV0ZSBvZiBhbiBBIGVsZW1lbnRcblx0Ly8gc2luY2UgSUUgd2lsbCBtb2RpZnkgaXQgZ2l2ZW4gZG9jdW1lbnQubG9jYXRpb25cblx0YWpheExvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJhXCIgKTtcblx0YWpheExvY2F0aW9uLmhyZWYgPSBcIlwiO1xuXHRhamF4TG9jYXRpb24gPSBhamF4TG9jYXRpb24uaHJlZjtcbn1cblxuLy8gU2VnbWVudCBsb2NhdGlvbiBpbnRvIHBhcnRzXG5hamF4TG9jUGFydHMgPSBydXJsLmV4ZWMoIGFqYXhMb2NhdGlvbi50b0xvd2VyQ2FzZSgpICkgfHwgW107XG5cbi8vIEJhc2UgXCJjb25zdHJ1Y3RvclwiIGZvciBqUXVlcnkuYWpheFByZWZpbHRlciBhbmQgalF1ZXJ5LmFqYXhUcmFuc3BvcnRcbmZ1bmN0aW9uIGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlICkge1xuXG5cdC8vIGRhdGFUeXBlRXhwcmVzc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gXCIqXCJcblx0cmV0dXJuIGZ1bmN0aW9uKCBkYXRhVHlwZUV4cHJlc3Npb24sIGZ1bmMgKSB7XG5cblx0XHRpZiAoIHR5cGVvZiBkYXRhVHlwZUV4cHJlc3Npb24gIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRmdW5jID0gZGF0YVR5cGVFeHByZXNzaW9uO1xuXHRcdFx0ZGF0YVR5cGVFeHByZXNzaW9uID0gXCIqXCI7XG5cdFx0fVxuXG5cdFx0dmFyIGRhdGFUeXBlLCBsaXN0LCBwbGFjZUJlZm9yZSxcblx0XHRcdGRhdGFUeXBlcyA9IGRhdGFUeXBlRXhwcmVzc2lvbi50b0xvd2VyQ2FzZSgpLnNwbGl0KCBjb3JlX3JzcGFjZSApLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRsZW5ndGggPSBkYXRhVHlwZXMubGVuZ3RoO1xuXG5cdFx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggZnVuYyApICkge1xuXHRcdFx0Ly8gRm9yIGVhY2ggZGF0YVR5cGUgaW4gdGhlIGRhdGFUeXBlRXhwcmVzc2lvblxuXHRcdFx0Zm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG5cdFx0XHRcdGRhdGFUeXBlID0gZGF0YVR5cGVzWyBpIF07XG5cdFx0XHRcdC8vIFdlIGNvbnRyb2wgaWYgd2UncmUgYXNrZWQgdG8gYWRkIGJlZm9yZVxuXHRcdFx0XHQvLyBhbnkgZXhpc3RpbmcgZWxlbWVudFxuXHRcdFx0XHRwbGFjZUJlZm9yZSA9IC9eXFwrLy50ZXN0KCBkYXRhVHlwZSApO1xuXHRcdFx0XHRpZiAoIHBsYWNlQmVmb3JlICkge1xuXHRcdFx0XHRcdGRhdGFUeXBlID0gZGF0YVR5cGUuc3Vic3RyKCAxICkgfHwgXCIqXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdCA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSA9IHN0cnVjdHVyZVsgZGF0YVR5cGUgXSB8fCBbXTtcblx0XHRcdFx0Ly8gdGhlbiB3ZSBhZGQgdG8gdGhlIHN0cnVjdHVyZSBhY2NvcmRpbmdseVxuXHRcdFx0XHRsaXN0WyBwbGFjZUJlZm9yZSA/IFwidW5zaGlmdFwiIDogXCJwdXNoXCIgXSggZnVuYyApO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuLy8gQmFzZSBpbnNwZWN0aW9uIGZ1bmN0aW9uIGZvciBwcmVmaWx0ZXJzIGFuZCB0cmFuc3BvcnRzXG5mdW5jdGlvbiBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggc3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSLFxuXHRcdGRhdGFUeXBlIC8qIGludGVybmFsICovLCBpbnNwZWN0ZWQgLyogaW50ZXJuYWwgKi8gKSB7XG5cblx0ZGF0YVR5cGUgPSBkYXRhVHlwZSB8fCBvcHRpb25zLmRhdGFUeXBlc1sgMCBdO1xuXHRpbnNwZWN0ZWQgPSBpbnNwZWN0ZWQgfHwge307XG5cblx0aW5zcGVjdGVkWyBkYXRhVHlwZSBdID0gdHJ1ZTtcblxuXHR2YXIgc2VsZWN0aW9uLFxuXHRcdGxpc3QgPSBzdHJ1Y3R1cmVbIGRhdGFUeXBlIF0sXG5cdFx0aSA9IDAsXG5cdFx0bGVuZ3RoID0gbGlzdCA/IGxpc3QubGVuZ3RoIDogMCxcblx0XHRleGVjdXRlT25seSA9ICggc3RydWN0dXJlID09PSBwcmVmaWx0ZXJzICk7XG5cblx0Zm9yICggOyBpIDwgbGVuZ3RoICYmICggZXhlY3V0ZU9ubHkgfHwgIXNlbGVjdGlvbiApOyBpKysgKSB7XG5cdFx0c2VsZWN0aW9uID0gbGlzdFsgaSBdKCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSICk7XG5cdFx0Ly8gSWYgd2UgZ290IHJlZGlyZWN0ZWQgdG8gYW5vdGhlciBkYXRhVHlwZVxuXHRcdC8vIHdlIHRyeSB0aGVyZSBpZiBleGVjdXRpbmcgb25seSBhbmQgbm90IGRvbmUgYWxyZWFkeVxuXHRcdGlmICggdHlwZW9mIHNlbGVjdGlvbiA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGlmICggIWV4ZWN1dGVPbmx5IHx8IGluc3BlY3RlZFsgc2VsZWN0aW9uIF0gKSB7XG5cdFx0XHRcdHNlbGVjdGlvbiA9IHVuZGVmaW5lZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMuZGF0YVR5cGVzLnVuc2hpZnQoIHNlbGVjdGlvbiApO1xuXHRcdFx0XHRzZWxlY3Rpb24gPSBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyhcblx0XHRcdFx0XHRcdHN0cnVjdHVyZSwgb3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUiwgc2VsZWN0aW9uLCBpbnNwZWN0ZWQgKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Ly8gSWYgd2UncmUgb25seSBleGVjdXRpbmcgb3Igbm90aGluZyB3YXMgc2VsZWN0ZWRcblx0Ly8gd2UgdHJ5IHRoZSBjYXRjaGFsbCBkYXRhVHlwZSBpZiBub3QgZG9uZSBhbHJlYWR5XG5cdGlmICggKCBleGVjdXRlT25seSB8fCAhc2VsZWN0aW9uICkgJiYgIWluc3BlY3RlZFsgXCIqXCIgXSApIHtcblx0XHRzZWxlY3Rpb24gPSBpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyhcblx0XHRcdFx0c3RydWN0dXJlLCBvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSLCBcIipcIiwgaW5zcGVjdGVkICk7XG5cdH1cblx0Ly8gdW5uZWNlc3Nhcnkgd2hlbiBvbmx5IGV4ZWN1dGluZyAocHJlZmlsdGVycylcblx0Ly8gYnV0IGl0J2xsIGJlIGlnbm9yZWQgYnkgdGhlIGNhbGxlciBpbiB0aGF0IGNhc2Vcblx0cmV0dXJuIHNlbGVjdGlvbjtcbn1cblxuLy8gQSBzcGVjaWFsIGV4dGVuZCBmb3IgYWpheCBvcHRpb25zXG4vLyB0aGF0IHRha2VzIFwiZmxhdFwiIG9wdGlvbnMgKG5vdCB0byBiZSBkZWVwIGV4dGVuZGVkKVxuLy8gRml4ZXMgIzk4ODdcbmZ1bmN0aW9uIGFqYXhFeHRlbmQoIHRhcmdldCwgc3JjICkge1xuXHR2YXIga2V5LCBkZWVwLFxuXHRcdGZsYXRPcHRpb25zID0galF1ZXJ5LmFqYXhTZXR0aW5ncy5mbGF0T3B0aW9ucyB8fCB7fTtcblx0Zm9yICgga2V5IGluIHNyYyApIHtcblx0XHRpZiAoIHNyY1sga2V5IF0gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdCggZmxhdE9wdGlvbnNbIGtleSBdID8gdGFyZ2V0IDogKCBkZWVwIHx8ICggZGVlcCA9IHt9ICkgKSApWyBrZXkgXSA9IHNyY1sga2V5IF07XG5cdFx0fVxuXHR9XG5cdGlmICggZGVlcCApIHtcblx0XHRqUXVlcnkuZXh0ZW5kKCB0cnVlLCB0YXJnZXQsIGRlZXAgKTtcblx0fVxufVxuXG5qUXVlcnkuZm4ubG9hZCA9IGZ1bmN0aW9uKCB1cmwsIHBhcmFtcywgY2FsbGJhY2sgKSB7XG5cdGlmICggdHlwZW9mIHVybCAhPT0gXCJzdHJpbmdcIiAmJiBfbG9hZCApIHtcblx0XHRyZXR1cm4gX2xvYWQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuXHR9XG5cblx0Ly8gRG9uJ3QgZG8gYSByZXF1ZXN0IGlmIG5vIGVsZW1lbnRzIGFyZSBiZWluZyByZXF1ZXN0ZWRcblx0aWYgKCAhdGhpcy5sZW5ndGggKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHR2YXIgc2VsZWN0b3IsIHR5cGUsIHJlc3BvbnNlLFxuXHRcdHNlbGYgPSB0aGlzLFxuXHRcdG9mZiA9IHVybC5pbmRleE9mKFwiIFwiKTtcblxuXHRpZiAoIG9mZiA+PSAwICkge1xuXHRcdHNlbGVjdG9yID0gdXJsLnNsaWNlKCBvZmYsIHVybC5sZW5ndGggKTtcblx0XHR1cmwgPSB1cmwuc2xpY2UoIDAsIG9mZiApO1xuXHR9XG5cblx0Ly8gSWYgaXQncyBhIGZ1bmN0aW9uXG5cdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHBhcmFtcyApICkge1xuXG5cdFx0Ly8gV2UgYXNzdW1lIHRoYXQgaXQncyB0aGUgY2FsbGJhY2tcblx0XHRjYWxsYmFjayA9IHBhcmFtcztcblx0XHRwYXJhbXMgPSB1bmRlZmluZWQ7XG5cblx0Ly8gT3RoZXJ3aXNlLCBidWlsZCBhIHBhcmFtIHN0cmluZ1xuXHR9IGVsc2UgaWYgKCBwYXJhbXMgJiYgdHlwZW9mIHBhcmFtcyA9PT0gXCJvYmplY3RcIiApIHtcblx0XHR0eXBlID0gXCJQT1NUXCI7XG5cdH1cblxuXHQvLyBSZXF1ZXN0IHRoZSByZW1vdGUgZG9jdW1lbnRcblx0alF1ZXJ5LmFqYXgoe1xuXHRcdHVybDogdXJsLFxuXG5cdFx0Ly8gaWYgXCJ0eXBlXCIgdmFyaWFibGUgaXMgdW5kZWZpbmVkLCB0aGVuIFwiR0VUXCIgbWV0aG9kIHdpbGwgYmUgdXNlZFxuXHRcdHR5cGU6IHR5cGUsXG5cdFx0ZGF0YVR5cGU6IFwiaHRtbFwiLFxuXHRcdGRhdGE6IHBhcmFtcyxcblx0XHRjb21wbGV0ZTogZnVuY3Rpb24oIGpxWEhSLCBzdGF0dXMgKSB7XG5cdFx0XHRpZiAoIGNhbGxiYWNrICkge1xuXHRcdFx0XHRzZWxmLmVhY2goIGNhbGxiYWNrLCByZXNwb25zZSB8fCBbIGpxWEhSLnJlc3BvbnNlVGV4dCwgc3RhdHVzLCBqcVhIUiBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KS5kb25lKGZ1bmN0aW9uKCByZXNwb25zZVRleHQgKSB7XG5cblx0XHQvLyBTYXZlIHJlc3BvbnNlIGZvciB1c2UgaW4gY29tcGxldGUgY2FsbGJhY2tcblx0XHRyZXNwb25zZSA9IGFyZ3VtZW50cztcblxuXHRcdC8vIFNlZSBpZiBhIHNlbGVjdG9yIHdhcyBzcGVjaWZpZWRcblx0XHRzZWxmLmh0bWwoIHNlbGVjdG9yID9cblxuXHRcdFx0Ly8gQ3JlYXRlIGEgZHVtbXkgZGl2IHRvIGhvbGQgdGhlIHJlc3VsdHNcblx0XHRcdGpRdWVyeShcIjxkaXY+XCIpXG5cblx0XHRcdFx0Ly8gaW5qZWN0IHRoZSBjb250ZW50cyBvZiB0aGUgZG9jdW1lbnQgaW4sIHJlbW92aW5nIHRoZSBzY3JpcHRzXG5cdFx0XHRcdC8vIHRvIGF2b2lkIGFueSAnUGVybWlzc2lvbiBEZW5pZWQnIGVycm9ycyBpbiBJRVxuXHRcdFx0XHQuYXBwZW5kKCByZXNwb25zZVRleHQucmVwbGFjZSggcnNjcmlwdCwgXCJcIiApIClcblxuXHRcdFx0XHQvLyBMb2NhdGUgdGhlIHNwZWNpZmllZCBlbGVtZW50c1xuXHRcdFx0XHQuZmluZCggc2VsZWN0b3IgKSA6XG5cblx0XHRcdC8vIElmIG5vdCwganVzdCBpbmplY3QgdGhlIGZ1bGwgcmVzdWx0XG5cdFx0XHRyZXNwb25zZVRleHQgKTtcblxuXHR9KTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8vIEF0dGFjaCBhIGJ1bmNoIG9mIGZ1bmN0aW9ucyBmb3IgaGFuZGxpbmcgY29tbW9uIEFKQVggZXZlbnRzXG5qUXVlcnkuZWFjaCggXCJhamF4U3RhcnQgYWpheFN0b3AgYWpheENvbXBsZXRlIGFqYXhFcnJvciBhamF4U3VjY2VzcyBhamF4U2VuZFwiLnNwbGl0KCBcIiBcIiApLCBmdW5jdGlvbiggaSwgbyApe1xuXHRqUXVlcnkuZm5bIG8gXSA9IGZ1bmN0aW9uKCBmICl7XG5cdFx0cmV0dXJuIHRoaXMub24oIG8sIGYgKTtcblx0fTtcbn0pO1xuXG5qUXVlcnkuZWFjaCggWyBcImdldFwiLCBcInBvc3RcIiBdLCBmdW5jdGlvbiggaSwgbWV0aG9kICkge1xuXHRqUXVlcnlbIG1ldGhvZCBdID0gZnVuY3Rpb24oIHVybCwgZGF0YSwgY2FsbGJhY2ssIHR5cGUgKSB7XG5cdFx0Ly8gc2hpZnQgYXJndW1lbnRzIGlmIGRhdGEgYXJndW1lbnQgd2FzIG9taXR0ZWRcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBkYXRhICkgKSB7XG5cdFx0XHR0eXBlID0gdHlwZSB8fCBjYWxsYmFjaztcblx0XHRcdGNhbGxiYWNrID0gZGF0YTtcblx0XHRcdGRhdGEgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGpRdWVyeS5hamF4KHtcblx0XHRcdHR5cGU6IG1ldGhvZCxcblx0XHRcdHVybDogdXJsLFxuXHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdHN1Y2Nlc3M6IGNhbGxiYWNrLFxuXHRcdFx0ZGF0YVR5cGU6IHR5cGVcblx0XHR9KTtcblx0fTtcbn0pO1xuXG5qUXVlcnkuZXh0ZW5kKHtcblxuXHRnZXRTY3JpcHQ6IGZ1bmN0aW9uKCB1cmwsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiBqUXVlcnkuZ2V0KCB1cmwsIHVuZGVmaW5lZCwgY2FsbGJhY2ssIFwic2NyaXB0XCIgKTtcblx0fSxcblxuXHRnZXRKU09OOiBmdW5jdGlvbiggdXJsLCBkYXRhLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdldCggdXJsLCBkYXRhLCBjYWxsYmFjaywgXCJqc29uXCIgKTtcblx0fSxcblxuXHQvLyBDcmVhdGVzIGEgZnVsbCBmbGVkZ2VkIHNldHRpbmdzIG9iamVjdCBpbnRvIHRhcmdldFxuXHQvLyB3aXRoIGJvdGggYWpheFNldHRpbmdzIGFuZCBzZXR0aW5ncyBmaWVsZHMuXG5cdC8vIElmIHRhcmdldCBpcyBvbWl0dGVkLCB3cml0ZXMgaW50byBhamF4U2V0dGluZ3MuXG5cdGFqYXhTZXR1cDogZnVuY3Rpb24oIHRhcmdldCwgc2V0dGluZ3MgKSB7XG5cdFx0aWYgKCBzZXR0aW5ncyApIHtcblx0XHRcdC8vIEJ1aWxkaW5nIGEgc2V0dGluZ3Mgb2JqZWN0XG5cdFx0XHRhamF4RXh0ZW5kKCB0YXJnZXQsIGpRdWVyeS5hamF4U2V0dGluZ3MgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRXh0ZW5kaW5nIGFqYXhTZXR0aW5nc1xuXHRcdFx0c2V0dGluZ3MgPSB0YXJnZXQ7XG5cdFx0XHR0YXJnZXQgPSBqUXVlcnkuYWpheFNldHRpbmdzO1xuXHRcdH1cblx0XHRhamF4RXh0ZW5kKCB0YXJnZXQsIHNldHRpbmdzICk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblxuXHRhamF4U2V0dGluZ3M6IHtcblx0XHR1cmw6IGFqYXhMb2NhdGlvbixcblx0XHRpc0xvY2FsOiBybG9jYWxQcm90b2NvbC50ZXN0KCBhamF4TG9jUGFydHNbIDEgXSApLFxuXHRcdGdsb2JhbDogdHJ1ZSxcblx0XHR0eXBlOiBcIkdFVFwiLFxuXHRcdGNvbnRlbnRUeXBlOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOFwiLFxuXHRcdHByb2Nlc3NEYXRhOiB0cnVlLFxuXHRcdGFzeW5jOiB0cnVlLFxuXHRcdC8qXG5cdFx0dGltZW91dDogMCxcblx0XHRkYXRhOiBudWxsLFxuXHRcdGRhdGFUeXBlOiBudWxsLFxuXHRcdHVzZXJuYW1lOiBudWxsLFxuXHRcdHBhc3N3b3JkOiBudWxsLFxuXHRcdGNhY2hlOiBudWxsLFxuXHRcdHRocm93czogZmFsc2UsXG5cdFx0dHJhZGl0aW9uYWw6IGZhbHNlLFxuXHRcdGhlYWRlcnM6IHt9LFxuXHRcdCovXG5cblx0XHRhY2NlcHRzOiB7XG5cdFx0XHR4bWw6IFwiYXBwbGljYXRpb24veG1sLCB0ZXh0L3htbFwiLFxuXHRcdFx0aHRtbDogXCJ0ZXh0L2h0bWxcIixcblx0XHRcdHRleHQ6IFwidGV4dC9wbGFpblwiLFxuXHRcdFx0anNvbjogXCJhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHRcIixcblx0XHRcdFwiKlwiOiBhbGxUeXBlc1xuXHRcdH0sXG5cblx0XHRjb250ZW50czoge1xuXHRcdFx0eG1sOiAveG1sLyxcblx0XHRcdGh0bWw6IC9odG1sLyxcblx0XHRcdGpzb246IC9qc29uL1xuXHRcdH0sXG5cblx0XHRyZXNwb25zZUZpZWxkczoge1xuXHRcdFx0eG1sOiBcInJlc3BvbnNlWE1MXCIsXG5cdFx0XHR0ZXh0OiBcInJlc3BvbnNlVGV4dFwiXG5cdFx0fSxcblxuXHRcdC8vIExpc3Qgb2YgZGF0YSBjb252ZXJ0ZXJzXG5cdFx0Ly8gMSkga2V5IGZvcm1hdCBpcyBcInNvdXJjZV90eXBlIGRlc3RpbmF0aW9uX3R5cGVcIiAoYSBzaW5nbGUgc3BhY2UgaW4tYmV0d2Vlbilcblx0XHQvLyAyKSB0aGUgY2F0Y2hhbGwgc3ltYm9sIFwiKlwiIGNhbiBiZSB1c2VkIGZvciBzb3VyY2VfdHlwZVxuXHRcdGNvbnZlcnRlcnM6IHtcblxuXHRcdFx0Ly8gQ29udmVydCBhbnl0aGluZyB0byB0ZXh0XG5cdFx0XHRcIiogdGV4dFwiOiB3aW5kb3cuU3RyaW5nLFxuXG5cdFx0XHQvLyBUZXh0IHRvIGh0bWwgKHRydWUgPSBubyB0cmFuc2Zvcm1hdGlvbilcblx0XHRcdFwidGV4dCBodG1sXCI6IHRydWUsXG5cblx0XHRcdC8vIEV2YWx1YXRlIHRleHQgYXMgYSBqc29uIGV4cHJlc3Npb25cblx0XHRcdFwidGV4dCBqc29uXCI6IGpRdWVyeS5wYXJzZUpTT04sXG5cblx0XHRcdC8vIFBhcnNlIHRleHQgYXMgeG1sXG5cdFx0XHRcInRleHQgeG1sXCI6IGpRdWVyeS5wYXJzZVhNTFxuXHRcdH0sXG5cblx0XHQvLyBGb3Igb3B0aW9ucyB0aGF0IHNob3VsZG4ndCBiZSBkZWVwIGV4dGVuZGVkOlxuXHRcdC8vIHlvdSBjYW4gYWRkIHlvdXIgb3duIGN1c3RvbSBvcHRpb25zIGhlcmUgaWZcblx0XHQvLyBhbmQgd2hlbiB5b3UgY3JlYXRlIG9uZSB0aGF0IHNob3VsZG4ndCBiZVxuXHRcdC8vIGRlZXAgZXh0ZW5kZWQgKHNlZSBhamF4RXh0ZW5kKVxuXHRcdGZsYXRPcHRpb25zOiB7XG5cdFx0XHRjb250ZXh0OiB0cnVlLFxuXHRcdFx0dXJsOiB0cnVlXG5cdFx0fVxuXHR9LFxuXG5cdGFqYXhQcmVmaWx0ZXI6IGFkZFRvUHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycyApLFxuXHRhamF4VHJhbnNwb3J0OiBhZGRUb1ByZWZpbHRlcnNPclRyYW5zcG9ydHMoIHRyYW5zcG9ydHMgKSxcblxuXHQvLyBNYWluIG1ldGhvZFxuXHRhamF4OiBmdW5jdGlvbiggdXJsLCBvcHRpb25zICkge1xuXG5cdFx0Ly8gSWYgdXJsIGlzIGFuIG9iamVjdCwgc2ltdWxhdGUgcHJlLTEuNSBzaWduYXR1cmVcblx0XHRpZiAoIHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRvcHRpb25zID0gdXJsO1xuXHRcdFx0dXJsID0gdW5kZWZpbmVkO1xuXHRcdH1cblxuXHRcdC8vIEZvcmNlIG9wdGlvbnMgdG8gYmUgYW4gb2JqZWN0XG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHR2YXIgLy8gaWZNb2RpZmllZCBrZXlcblx0XHRcdGlmTW9kaWZpZWRLZXksXG5cdFx0XHQvLyBSZXNwb25zZSBoZWFkZXJzXG5cdFx0XHRyZXNwb25zZUhlYWRlcnNTdHJpbmcsXG5cdFx0XHRyZXNwb25zZUhlYWRlcnMsXG5cdFx0XHQvLyB0cmFuc3BvcnRcblx0XHRcdHRyYW5zcG9ydCxcblx0XHRcdC8vIHRpbWVvdXQgaGFuZGxlXG5cdFx0XHR0aW1lb3V0VGltZXIsXG5cdFx0XHQvLyBDcm9zcy1kb21haW4gZGV0ZWN0aW9uIHZhcnNcblx0XHRcdHBhcnRzLFxuXHRcdFx0Ly8gVG8ga25vdyBpZiBnbG9iYWwgZXZlbnRzIGFyZSB0byBiZSBkaXNwYXRjaGVkXG5cdFx0XHRmaXJlR2xvYmFscyxcblx0XHRcdC8vIExvb3AgdmFyaWFibGVcblx0XHRcdGksXG5cdFx0XHQvLyBDcmVhdGUgdGhlIGZpbmFsIG9wdGlvbnMgb2JqZWN0XG5cdFx0XHRzID0galF1ZXJ5LmFqYXhTZXR1cCgge30sIG9wdGlvbnMgKSxcblx0XHRcdC8vIENhbGxiYWNrcyBjb250ZXh0XG5cdFx0XHRjYWxsYmFja0NvbnRleHQgPSBzLmNvbnRleHQgfHwgcyxcblx0XHRcdC8vIENvbnRleHQgZm9yIGdsb2JhbCBldmVudHNcblx0XHRcdC8vIEl0J3MgdGhlIGNhbGxiYWNrQ29udGV4dCBpZiBvbmUgd2FzIHByb3ZpZGVkIGluIHRoZSBvcHRpb25zXG5cdFx0XHQvLyBhbmQgaWYgaXQncyBhIERPTSBub2RlIG9yIGEgalF1ZXJ5IGNvbGxlY3Rpb25cblx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dCA9IGNhbGxiYWNrQ29udGV4dCAhPT0gcyAmJlxuXHRcdFx0XHQoIGNhbGxiYWNrQ29udGV4dC5ub2RlVHlwZSB8fCBjYWxsYmFja0NvbnRleHQgaW5zdGFuY2VvZiBqUXVlcnkgKSA/XG5cdFx0XHRcdFx0XHRqUXVlcnkoIGNhbGxiYWNrQ29udGV4dCApIDogalF1ZXJ5LmV2ZW50LFxuXHRcdFx0Ly8gRGVmZXJyZWRzXG5cdFx0XHRkZWZlcnJlZCA9IGpRdWVyeS5EZWZlcnJlZCgpLFxuXHRcdFx0Y29tcGxldGVEZWZlcnJlZCA9IGpRdWVyeS5DYWxsYmFja3MoIFwib25jZSBtZW1vcnlcIiApLFxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdHN0YXR1c0NvZGUgPSBzLnN0YXR1c0NvZGUgfHwge30sXG5cdFx0XHQvLyBIZWFkZXJzICh0aGV5IGFyZSBzZW50IGFsbCBhdCBvbmNlKVxuXHRcdFx0cmVxdWVzdEhlYWRlcnMgPSB7fSxcblx0XHRcdHJlcXVlc3RIZWFkZXJzTmFtZXMgPSB7fSxcblx0XHRcdC8vIFRoZSBqcVhIUiBzdGF0ZVxuXHRcdFx0c3RhdGUgPSAwLFxuXHRcdFx0Ly8gRGVmYXVsdCBhYm9ydCBtZXNzYWdlXG5cdFx0XHRzdHJBYm9ydCA9IFwiY2FuY2VsZWRcIixcblx0XHRcdC8vIEZha2UgeGhyXG5cdFx0XHRqcVhIUiA9IHtcblxuXHRcdFx0XHRyZWFkeVN0YXRlOiAwLFxuXG5cdFx0XHRcdC8vIENhY2hlcyB0aGUgaGVhZGVyXG5cdFx0XHRcdHNldFJlcXVlc3RIZWFkZXI6IGZ1bmN0aW9uKCBuYW1lLCB2YWx1ZSApIHtcblx0XHRcdFx0XHRpZiAoICFzdGF0ZSApIHtcblx0XHRcdFx0XHRcdHZhciBsbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRcdG5hbWUgPSByZXF1ZXN0SGVhZGVyc05hbWVzWyBsbmFtZSBdID0gcmVxdWVzdEhlYWRlcnNOYW1lc1sgbG5hbWUgXSB8fCBuYW1lO1xuXHRcdFx0XHRcdFx0cmVxdWVzdEhlYWRlcnNbIG5hbWUgXSA9IHZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBSYXcgc3RyaW5nXG5cdFx0XHRcdGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlID09PSAyID8gcmVzcG9uc2VIZWFkZXJzU3RyaW5nIDogbnVsbDtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHQvLyBCdWlsZHMgaGVhZGVycyBoYXNodGFibGUgaWYgbmVlZGVkXG5cdFx0XHRcdGdldFJlc3BvbnNlSGVhZGVyOiBmdW5jdGlvbigga2V5ICkge1xuXHRcdFx0XHRcdHZhciBtYXRjaDtcblx0XHRcdFx0XHRpZiAoIHN0YXRlID09PSAyICkge1xuXHRcdFx0XHRcdFx0aWYgKCAhcmVzcG9uc2VIZWFkZXJzICkge1xuXHRcdFx0XHRcdFx0XHRyZXNwb25zZUhlYWRlcnMgPSB7fTtcblx0XHRcdFx0XHRcdFx0d2hpbGUoICggbWF0Y2ggPSByaGVhZGVycy5leGVjKCByZXNwb25zZUhlYWRlcnNTdHJpbmcgKSApICkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlSGVhZGVyc1sgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSBdID0gbWF0Y2hbIDIgXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWF0Y2ggPSByZXNwb25zZUhlYWRlcnNbIGtleS50b0xvd2VyQ2FzZSgpIF07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBtYXRjaCA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IG1hdGNoO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIE92ZXJyaWRlcyByZXNwb25zZSBjb250ZW50LXR5cGUgaGVhZGVyXG5cdFx0XHRcdG92ZXJyaWRlTWltZVR5cGU6IGZ1bmN0aW9uKCB0eXBlICkge1xuXHRcdFx0XHRcdGlmICggIXN0YXRlICkge1xuXHRcdFx0XHRcdFx0cy5taW1lVHlwZSA9IHR5cGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIENhbmNlbCB0aGUgcmVxdWVzdFxuXHRcdFx0XHRhYm9ydDogZnVuY3Rpb24oIHN0YXR1c1RleHQgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IHN0YXR1c1RleHQgfHwgc3RyQWJvcnQ7XG5cdFx0XHRcdFx0aWYgKCB0cmFuc3BvcnQgKSB7XG5cdFx0XHRcdFx0XHR0cmFuc3BvcnQuYWJvcnQoIHN0YXR1c1RleHQgKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZG9uZSggMCwgc3RhdHVzVGV4dCApO1xuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0Ly8gQ2FsbGJhY2sgZm9yIHdoZW4gZXZlcnl0aGluZyBpcyBkb25lXG5cdFx0Ly8gSXQgaXMgZGVmaW5lZCBoZXJlIGJlY2F1c2UganNsaW50IGNvbXBsYWlucyBpZiBpdCBpcyBkZWNsYXJlZFxuXHRcdC8vIGF0IHRoZSBlbmQgb2YgdGhlIGZ1bmN0aW9uICh3aGljaCB3b3VsZCBiZSBtb3JlIGxvZ2ljYWwgYW5kIHJlYWRhYmxlKVxuXHRcdGZ1bmN0aW9uIGRvbmUoIHN0YXR1cywgbmF0aXZlU3RhdHVzVGV4dCwgcmVzcG9uc2VzLCBoZWFkZXJzICkge1xuXHRcdFx0dmFyIGlzU3VjY2Vzcywgc3VjY2VzcywgZXJyb3IsIHJlc3BvbnNlLCBtb2RpZmllZCxcblx0XHRcdFx0c3RhdHVzVGV4dCA9IG5hdGl2ZVN0YXR1c1RleHQ7XG5cblx0XHRcdC8vIENhbGxlZCBvbmNlXG5cdFx0XHRpZiAoIHN0YXRlID09PSAyICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YXRlIGlzIFwiZG9uZVwiIG5vd1xuXHRcdFx0c3RhdGUgPSAyO1xuXG5cdFx0XHQvLyBDbGVhciB0aW1lb3V0IGlmIGl0IGV4aXN0c1xuXHRcdFx0aWYgKCB0aW1lb3V0VGltZXIgKSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCggdGltZW91dFRpbWVyICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIERlcmVmZXJlbmNlIHRyYW5zcG9ydCBmb3IgZWFybHkgZ2FyYmFnZSBjb2xsZWN0aW9uXG5cdFx0XHQvLyAobm8gbWF0dGVyIGhvdyBsb25nIHRoZSBqcVhIUiBvYmplY3Qgd2lsbCBiZSB1c2VkKVxuXHRcdFx0dHJhbnNwb3J0ID0gdW5kZWZpbmVkO1xuXG5cdFx0XHQvLyBDYWNoZSByZXNwb25zZSBoZWFkZXJzXG5cdFx0XHRyZXNwb25zZUhlYWRlcnNTdHJpbmcgPSBoZWFkZXJzIHx8IFwiXCI7XG5cblx0XHRcdC8vIFNldCByZWFkeVN0YXRlXG5cdFx0XHRqcVhIUi5yZWFkeVN0YXRlID0gc3RhdHVzID4gMCA/IDQgOiAwO1xuXG5cdFx0XHQvLyBHZXQgcmVzcG9uc2UgZGF0YVxuXHRcdFx0aWYgKCByZXNwb25zZXMgKSB7XG5cdFx0XHRcdHJlc3BvbnNlID0gYWpheEhhbmRsZVJlc3BvbnNlcyggcywganFYSFIsIHJlc3BvbnNlcyApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBzdWNjZXNzZnVsLCBoYW5kbGUgdHlwZSBjaGFpbmluZ1xuXHRcdFx0aWYgKCBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCB8fCBzdGF0dXMgPT09IDMwNCApIHtcblxuXHRcdFx0XHQvLyBTZXQgdGhlIElmLU1vZGlmaWVkLVNpbmNlIGFuZC9vciBJZi1Ob25lLU1hdGNoIGhlYWRlciwgaWYgaW4gaWZNb2RpZmllZCBtb2RlLlxuXHRcdFx0XHRpZiAoIHMuaWZNb2RpZmllZCApIHtcblxuXHRcdFx0XHRcdG1vZGlmaWVkID0ganFYSFIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJMYXN0LU1vZGlmaWVkXCIpO1xuXHRcdFx0XHRcdGlmICggbW9kaWZpZWQgKSB7XG5cdFx0XHRcdFx0XHRqUXVlcnkubGFzdE1vZGlmaWVkWyBpZk1vZGlmaWVkS2V5IF0gPSBtb2RpZmllZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bW9kaWZpZWQgPSBqcVhIUi5nZXRSZXNwb25zZUhlYWRlcihcIkV0YWdcIik7XG5cdFx0XHRcdFx0aWYgKCBtb2RpZmllZCApIHtcblx0XHRcdFx0XHRcdGpRdWVyeS5ldGFnWyBpZk1vZGlmaWVkS2V5IF0gPSBtb2RpZmllZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBJZiBub3QgbW9kaWZpZWRcblx0XHRcdFx0aWYgKCBzdGF0dXMgPT09IDMwNCApIHtcblxuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBcIm5vdG1vZGlmaWVkXCI7XG5cdFx0XHRcdFx0aXNTdWNjZXNzID0gdHJ1ZTtcblxuXHRcdFx0XHQvLyBJZiB3ZSBoYXZlIGRhdGFcblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGlzU3VjY2VzcyA9IGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSApO1xuXHRcdFx0XHRcdHN0YXR1c1RleHQgPSBpc1N1Y2Nlc3Muc3RhdGU7XG5cdFx0XHRcdFx0c3VjY2VzcyA9IGlzU3VjY2Vzcy5kYXRhO1xuXHRcdFx0XHRcdGVycm9yID0gaXNTdWNjZXNzLmVycm9yO1xuXHRcdFx0XHRcdGlzU3VjY2VzcyA9ICFlcnJvcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gV2UgZXh0cmFjdCBlcnJvciBmcm9tIHN0YXR1c1RleHRcblx0XHRcdFx0Ly8gdGhlbiBub3JtYWxpemUgc3RhdHVzVGV4dCBhbmQgc3RhdHVzIGZvciBub24tYWJvcnRzXG5cdFx0XHRcdGVycm9yID0gc3RhdHVzVGV4dDtcblx0XHRcdFx0aWYgKCAhc3RhdHVzVGV4dCB8fCBzdGF0dXMgKSB7XG5cdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwiZXJyb3JcIjtcblx0XHRcdFx0XHRpZiAoIHN0YXR1cyA8IDAgKSB7XG5cdFx0XHRcdFx0XHRzdGF0dXMgPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBTZXQgZGF0YSBmb3IgdGhlIGZha2UgeGhyIG9iamVjdFxuXHRcdFx0anFYSFIuc3RhdHVzID0gc3RhdHVzO1xuXHRcdFx0anFYSFIuc3RhdHVzVGV4dCA9IFwiXCIgKyAoIG5hdGl2ZVN0YXR1c1RleHQgfHwgc3RhdHVzVGV4dCApO1xuXG5cdFx0XHQvLyBTdWNjZXNzL0Vycm9yXG5cdFx0XHRpZiAoIGlzU3VjY2VzcyApIHtcblx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZVdpdGgoIGNhbGxiYWNrQ29udGV4dCwgWyBzdWNjZXNzLCBzdGF0dXNUZXh0LCBqcVhIUiBdICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZWplY3RXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQsIGVycm9yIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRcdGpxWEhSLnN0YXR1c0NvZGUoIHN0YXR1c0NvZGUgKTtcblx0XHRcdHN0YXR1c0NvZGUgPSB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICggZmlyZUdsb2JhbHMgKSB7XG5cdFx0XHRcdGdsb2JhbEV2ZW50Q29udGV4dC50cmlnZ2VyKCBcImFqYXhcIiArICggaXNTdWNjZXNzID8gXCJTdWNjZXNzXCIgOiBcIkVycm9yXCIgKSxcblx0XHRcdFx0XHRcdFsganFYSFIsIHMsIGlzU3VjY2VzcyA/IHN1Y2Nlc3MgOiBlcnJvciBdICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbXBsZXRlXG5cdFx0XHRjb21wbGV0ZURlZmVycmVkLmZpcmVXaXRoKCBjYWxsYmFja0NvbnRleHQsIFsganFYSFIsIHN0YXR1c1RleHQgXSApO1xuXG5cdFx0XHRpZiAoIGZpcmVHbG9iYWxzICkge1xuXHRcdFx0XHRnbG9iYWxFdmVudENvbnRleHQudHJpZ2dlciggXCJhamF4Q29tcGxldGVcIiwgWyBqcVhIUiwgcyBdICk7XG5cdFx0XHRcdC8vIEhhbmRsZSB0aGUgZ2xvYmFsIEFKQVggY291bnRlclxuXHRcdFx0XHRpZiAoICEoIC0talF1ZXJ5LmFjdGl2ZSApICkge1xuXHRcdFx0XHRcdGpRdWVyeS5ldmVudC50cmlnZ2VyKCBcImFqYXhTdG9wXCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEF0dGFjaCBkZWZlcnJlZHNcblx0XHRkZWZlcnJlZC5wcm9taXNlKCBqcVhIUiApO1xuXHRcdGpxWEhSLnN1Y2Nlc3MgPSBqcVhIUi5kb25lO1xuXHRcdGpxWEhSLmVycm9yID0ganFYSFIuZmFpbDtcblx0XHRqcVhIUi5jb21wbGV0ZSA9IGNvbXBsZXRlRGVmZXJyZWQuYWRkO1xuXG5cdFx0Ly8gU3RhdHVzLWRlcGVuZGVudCBjYWxsYmFja3Ncblx0XHRqcVhIUi5zdGF0dXNDb2RlID0gZnVuY3Rpb24oIG1hcCApIHtcblx0XHRcdGlmICggbWFwICkge1xuXHRcdFx0XHR2YXIgdG1wO1xuXHRcdFx0XHRpZiAoIHN0YXRlIDwgMiApIHtcblx0XHRcdFx0XHRmb3IgKCB0bXAgaW4gbWFwICkge1xuXHRcdFx0XHRcdFx0c3RhdHVzQ29kZVsgdG1wIF0gPSBbIHN0YXR1c0NvZGVbdG1wXSwgbWFwW3RtcF0gXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dG1wID0gbWFwWyBqcVhIUi5zdGF0dXMgXTtcblx0XHRcdFx0XHRqcVhIUi5hbHdheXMoIHRtcCApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXG5cdFx0Ly8gUmVtb3ZlIGhhc2ggY2hhcmFjdGVyICgjNzUzMTogYW5kIHN0cmluZyBwcm9tb3Rpb24pXG5cdFx0Ly8gQWRkIHByb3RvY29sIGlmIG5vdCBwcm92aWRlZCAoIzU4NjY6IElFNyBpc3N1ZSB3aXRoIHByb3RvY29sLWxlc3MgdXJscylcblx0XHQvLyBXZSBhbHNvIHVzZSB0aGUgdXJsIHBhcmFtZXRlciBpZiBhdmFpbGFibGVcblx0XHRzLnVybCA9ICggKCB1cmwgfHwgcy51cmwgKSArIFwiXCIgKS5yZXBsYWNlKCByaGFzaCwgXCJcIiApLnJlcGxhY2UoIHJwcm90b2NvbCwgYWpheExvY1BhcnRzWyAxIF0gKyBcIi8vXCIgKTtcblxuXHRcdC8vIEV4dHJhY3QgZGF0YVR5cGVzIGxpc3Rcblx0XHRzLmRhdGFUeXBlcyA9IGpRdWVyeS50cmltKCBzLmRhdGFUeXBlIHx8IFwiKlwiICkudG9Mb3dlckNhc2UoKS5zcGxpdCggY29yZV9yc3BhY2UgKTtcblxuXHRcdC8vIERldGVybWluZSBpZiBhIGNyb3NzLWRvbWFpbiByZXF1ZXN0IGlzIGluIG9yZGVyXG5cdFx0aWYgKCBzLmNyb3NzRG9tYWluID09IG51bGwgKSB7XG5cdFx0XHRwYXJ0cyA9IHJ1cmwuZXhlYyggcy51cmwudG9Mb3dlckNhc2UoKSApO1xuXHRcdFx0cy5jcm9zc0RvbWFpbiA9ICEhKCBwYXJ0cyAmJlxuXHRcdFx0XHQoIHBhcnRzWyAxIF0gIT0gYWpheExvY1BhcnRzWyAxIF0gfHwgcGFydHNbIDIgXSAhPSBhamF4TG9jUGFydHNbIDIgXSB8fFxuXHRcdFx0XHRcdCggcGFydHNbIDMgXSB8fCAoIHBhcnRzWyAxIF0gPT09IFwiaHR0cDpcIiA/IDgwIDogNDQzICkgKSAhPVxuXHRcdFx0XHRcdFx0KCBhamF4TG9jUGFydHNbIDMgXSB8fCAoIGFqYXhMb2NQYXJ0c1sgMSBdID09PSBcImh0dHA6XCIgPyA4MCA6IDQ0MyApICkgKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IGRhdGEgaWYgbm90IGFscmVhZHkgYSBzdHJpbmdcblx0XHRpZiAoIHMuZGF0YSAmJiBzLnByb2Nlc3NEYXRhICYmIHR5cGVvZiBzLmRhdGEgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRzLmRhdGEgPSBqUXVlcnkucGFyYW0oIHMuZGF0YSwgcy50cmFkaXRpb25hbCApO1xuXHRcdH1cblxuXHRcdC8vIEFwcGx5IHByZWZpbHRlcnNcblx0XHRpbnNwZWN0UHJlZmlsdGVyc09yVHJhbnNwb3J0cyggcHJlZmlsdGVycywgcywgb3B0aW9ucywganFYSFIgKTtcblxuXHRcdC8vIElmIHJlcXVlc3Qgd2FzIGFib3J0ZWQgaW5zaWRlIGEgcHJlZmlsdGVyLCBzdG9wIHRoZXJlXG5cdFx0aWYgKCBzdGF0ZSA9PT0gMiApIHtcblx0XHRcdHJldHVybiBqcVhIUjtcblx0XHR9XG5cblx0XHQvLyBXZSBjYW4gZmlyZSBnbG9iYWwgZXZlbnRzIGFzIG9mIG5vdyBpZiBhc2tlZCB0b1xuXHRcdGZpcmVHbG9iYWxzID0gcy5nbG9iYWw7XG5cblx0XHQvLyBVcHBlcmNhc2UgdGhlIHR5cGVcblx0XHRzLnR5cGUgPSBzLnR5cGUudG9VcHBlckNhc2UoKTtcblxuXHRcdC8vIERldGVybWluZSBpZiByZXF1ZXN0IGhhcyBjb250ZW50XG5cdFx0cy5oYXNDb250ZW50ID0gIXJub0NvbnRlbnQudGVzdCggcy50eXBlICk7XG5cblx0XHQvLyBXYXRjaCBmb3IgYSBuZXcgc2V0IG9mIHJlcXVlc3RzXG5cdFx0aWYgKCBmaXJlR2xvYmFscyAmJiBqUXVlcnkuYWN0aXZlKysgPT09IDAgKSB7XG5cdFx0XHRqUXVlcnkuZXZlbnQudHJpZ2dlciggXCJhamF4U3RhcnRcIiApO1xuXHRcdH1cblxuXHRcdC8vIE1vcmUgb3B0aW9ucyBoYW5kbGluZyBmb3IgcmVxdWVzdHMgd2l0aCBubyBjb250ZW50XG5cdFx0aWYgKCAhcy5oYXNDb250ZW50ICkge1xuXG5cdFx0XHQvLyBJZiBkYXRhIGlzIGF2YWlsYWJsZSwgYXBwZW5kIGRhdGEgdG8gdXJsXG5cdFx0XHRpZiAoIHMuZGF0YSApIHtcblx0XHRcdFx0cy51cmwgKz0gKCBycXVlcnkudGVzdCggcy51cmwgKSA/IFwiJlwiIDogXCI/XCIgKSArIHMuZGF0YTtcblx0XHRcdFx0Ly8gIzk2ODI6IHJlbW92ZSBkYXRhIHNvIHRoYXQgaXQncyBub3QgdXNlZCBpbiBhbiBldmVudHVhbCByZXRyeVxuXHRcdFx0XHRkZWxldGUgcy5kYXRhO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZXQgaWZNb2RpZmllZEtleSBiZWZvcmUgYWRkaW5nIHRoZSBhbnRpLWNhY2hlIHBhcmFtZXRlclxuXHRcdFx0aWZNb2RpZmllZEtleSA9IHMudXJsO1xuXG5cdFx0XHQvLyBBZGQgYW50aS1jYWNoZSBpbiB1cmwgaWYgbmVlZGVkXG5cdFx0XHRpZiAoIHMuY2FjaGUgPT09IGZhbHNlICkge1xuXG5cdFx0XHRcdHZhciB0cyA9IGpRdWVyeS5ub3coKSxcblx0XHRcdFx0XHQvLyB0cnkgcmVwbGFjaW5nIF89IGlmIGl0IGlzIHRoZXJlXG5cdFx0XHRcdFx0cmV0ID0gcy51cmwucmVwbGFjZSggcnRzLCBcIiQxXz1cIiArIHRzICk7XG5cblx0XHRcdFx0Ly8gaWYgbm90aGluZyB3YXMgcmVwbGFjZWQsIGFkZCB0aW1lc3RhbXAgdG8gdGhlIGVuZFxuXHRcdFx0XHRzLnVybCA9IHJldCArICggKCByZXQgPT09IHMudXJsICkgPyAoIHJxdWVyeS50ZXN0KCBzLnVybCApID8gXCImXCIgOiBcIj9cIiApICsgXCJfPVwiICsgdHMgOiBcIlwiICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBjb3JyZWN0IGhlYWRlciwgaWYgZGF0YSBpcyBiZWluZyBzZW50XG5cdFx0aWYgKCBzLmRhdGEgJiYgcy5oYXNDb250ZW50ICYmIHMuY29udGVudFR5cGUgIT09IGZhbHNlIHx8IG9wdGlvbnMuY29udGVudFR5cGUgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBcIkNvbnRlbnQtVHlwZVwiLCBzLmNvbnRlbnRUeXBlICk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBJZi1Nb2RpZmllZC1TaW5jZSBhbmQvb3IgSWYtTm9uZS1NYXRjaCBoZWFkZXIsIGlmIGluIGlmTW9kaWZpZWQgbW9kZS5cblx0XHRpZiAoIHMuaWZNb2RpZmllZCApIHtcblx0XHRcdGlmTW9kaWZpZWRLZXkgPSBpZk1vZGlmaWVkS2V5IHx8IHMudXJsO1xuXHRcdFx0aWYgKCBqUXVlcnkubGFzdE1vZGlmaWVkWyBpZk1vZGlmaWVkS2V5IF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTW9kaWZpZWQtU2luY2VcIiwgalF1ZXJ5Lmxhc3RNb2RpZmllZFsgaWZNb2RpZmllZEtleSBdICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGpRdWVyeS5ldGFnWyBpZk1vZGlmaWVkS2V5IF0gKSB7XG5cdFx0XHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoIFwiSWYtTm9uZS1NYXRjaFwiLCBqUXVlcnkuZXRhZ1sgaWZNb2RpZmllZEtleSBdICk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSBBY2NlcHRzIGhlYWRlciBmb3IgdGhlIHNlcnZlciwgZGVwZW5kaW5nIG9uIHRoZSBkYXRhVHlwZVxuXHRcdGpxWEhSLnNldFJlcXVlc3RIZWFkZXIoXG5cdFx0XHRcIkFjY2VwdFwiLFxuXHRcdFx0cy5kYXRhVHlwZXNbIDAgXSAmJiBzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWzBdIF0gP1xuXHRcdFx0XHRzLmFjY2VwdHNbIHMuZGF0YVR5cGVzWzBdIF0gKyAoIHMuZGF0YVR5cGVzWyAwIF0gIT09IFwiKlwiID8gXCIsIFwiICsgYWxsVHlwZXMgKyBcIjsgcT0wLjAxXCIgOiBcIlwiICkgOlxuXHRcdFx0XHRzLmFjY2VwdHNbIFwiKlwiIF1cblx0XHQpO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIGhlYWRlcnMgb3B0aW9uXG5cdFx0Zm9yICggaSBpbiBzLmhlYWRlcnMgKSB7XG5cdFx0XHRqcVhIUi5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBzLmhlYWRlcnNbIGkgXSApO1xuXHRcdH1cblxuXHRcdC8vIEFsbG93IGN1c3RvbSBoZWFkZXJzL21pbWV0eXBlcyBhbmQgZWFybHkgYWJvcnRcblx0XHRpZiAoIHMuYmVmb3JlU2VuZCAmJiAoIHMuYmVmb3JlU2VuZC5jYWxsKCBjYWxsYmFja0NvbnRleHQsIGpxWEhSLCBzICkgPT09IGZhbHNlIHx8IHN0YXRlID09PSAyICkgKSB7XG5cdFx0XHRcdC8vIEFib3J0IGlmIG5vdCBkb25lIGFscmVhZHkgYW5kIHJldHVyblxuXHRcdFx0XHRyZXR1cm4ganFYSFIuYWJvcnQoKTtcblxuXHRcdH1cblxuXHRcdC8vIGFib3J0aW5nIGlzIG5vIGxvbmdlciBhIGNhbmNlbGxhdGlvblxuXHRcdHN0ckFib3J0ID0gXCJhYm9ydFwiO1xuXG5cdFx0Ly8gSW5zdGFsbCBjYWxsYmFja3Mgb24gZGVmZXJyZWRzXG5cdFx0Zm9yICggaSBpbiB7IHN1Y2Nlc3M6IDEsIGVycm9yOiAxLCBjb21wbGV0ZTogMSB9ICkge1xuXHRcdFx0anFYSFJbIGkgXSggc1sgaSBdICk7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRyYW5zcG9ydFxuXHRcdHRyYW5zcG9ydCA9IGluc3BlY3RQcmVmaWx0ZXJzT3JUcmFuc3BvcnRzKCB0cmFuc3BvcnRzLCBzLCBvcHRpb25zLCBqcVhIUiApO1xuXG5cdFx0Ly8gSWYgbm8gdHJhbnNwb3J0LCB3ZSBhdXRvLWFib3J0XG5cdFx0aWYgKCAhdHJhbnNwb3J0ICkge1xuXHRcdFx0ZG9uZSggLTEsIFwiTm8gVHJhbnNwb3J0XCIgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0anFYSFIucmVhZHlTdGF0ZSA9IDE7XG5cdFx0XHQvLyBTZW5kIGdsb2JhbCBldmVudFxuXHRcdFx0aWYgKCBmaXJlR2xvYmFscyApIHtcblx0XHRcdFx0Z2xvYmFsRXZlbnRDb250ZXh0LnRyaWdnZXIoIFwiYWpheFNlbmRcIiwgWyBqcVhIUiwgcyBdICk7XG5cdFx0XHR9XG5cdFx0XHQvLyBUaW1lb3V0XG5cdFx0XHRpZiAoIHMuYXN5bmMgJiYgcy50aW1lb3V0ID4gMCApIHtcblx0XHRcdFx0dGltZW91dFRpbWVyID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRqcVhIUi5hYm9ydCggXCJ0aW1lb3V0XCIgKTtcblx0XHRcdFx0fSwgcy50aW1lb3V0ICk7XG5cdFx0XHR9XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdHN0YXRlID0gMTtcblx0XHRcdFx0dHJhbnNwb3J0LnNlbmQoIHJlcXVlc3RIZWFkZXJzLCBkb25lICk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdC8vIFByb3BhZ2F0ZSBleGNlcHRpb24gYXMgZXJyb3IgaWYgbm90IGRvbmVcblx0XHRcdFx0aWYgKCBzdGF0ZSA8IDIgKSB7XG5cdFx0XHRcdFx0ZG9uZSggLTEsIGUgKTtcblx0XHRcdFx0Ly8gU2ltcGx5IHJldGhyb3cgb3RoZXJ3aXNlXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhyb3cgZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBqcVhIUjtcblx0fSxcblxuXHQvLyBDb3VudGVyIGZvciBob2xkaW5nIHRoZSBudW1iZXIgb2YgYWN0aXZlIHF1ZXJpZXNcblx0YWN0aXZlOiAwLFxuXG5cdC8vIExhc3QtTW9kaWZpZWQgaGVhZGVyIGNhY2hlIGZvciBuZXh0IHJlcXVlc3Rcblx0bGFzdE1vZGlmaWVkOiB7fSxcblx0ZXRhZzoge31cblxufSk7XG5cbi8qIEhhbmRsZXMgcmVzcG9uc2VzIHRvIGFuIGFqYXggcmVxdWVzdDpcbiAqIC0gc2V0cyBhbGwgcmVzcG9uc2VYWFggZmllbGRzIGFjY29yZGluZ2x5XG4gKiAtIGZpbmRzIHRoZSByaWdodCBkYXRhVHlwZSAobWVkaWF0ZXMgYmV0d2VlbiBjb250ZW50LXR5cGUgYW5kIGV4cGVjdGVkIGRhdGFUeXBlKVxuICogLSByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXG4gKi9cbmZ1bmN0aW9uIGFqYXhIYW5kbGVSZXNwb25zZXMoIHMsIGpxWEhSLCByZXNwb25zZXMgKSB7XG5cblx0dmFyIGN0LCB0eXBlLCBmaW5hbERhdGFUeXBlLCBmaXJzdERhdGFUeXBlLFxuXHRcdGNvbnRlbnRzID0gcy5jb250ZW50cyxcblx0XHRkYXRhVHlwZXMgPSBzLmRhdGFUeXBlcyxcblx0XHRyZXNwb25zZUZpZWxkcyA9IHMucmVzcG9uc2VGaWVsZHM7XG5cblx0Ly8gRmlsbCByZXNwb25zZVhYWCBmaWVsZHNcblx0Zm9yICggdHlwZSBpbiByZXNwb25zZUZpZWxkcyApIHtcblx0XHRpZiAoIHR5cGUgaW4gcmVzcG9uc2VzICkge1xuXHRcdFx0anFYSFJbIHJlc3BvbnNlRmllbGRzW3R5cGVdIF0gPSByZXNwb25zZXNbIHR5cGUgXTtcblx0XHR9XG5cdH1cblxuXHQvLyBSZW1vdmUgYXV0byBkYXRhVHlwZSBhbmQgZ2V0IGNvbnRlbnQtdHlwZSBpbiB0aGUgcHJvY2Vzc1xuXHR3aGlsZSggZGF0YVR5cGVzWyAwIF0gPT09IFwiKlwiICkge1xuXHRcdGRhdGFUeXBlcy5zaGlmdCgpO1xuXHRcdGlmICggY3QgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdGN0ID0gcy5taW1lVHlwZSB8fCBqcVhIUi5nZXRSZXNwb25zZUhlYWRlciggXCJjb250ZW50LXR5cGVcIiApO1xuXHRcdH1cblx0fVxuXG5cdC8vIENoZWNrIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGtub3duIGNvbnRlbnQtdHlwZVxuXHRpZiAoIGN0ICkge1xuXHRcdGZvciAoIHR5cGUgaW4gY29udGVudHMgKSB7XG5cdFx0XHRpZiAoIGNvbnRlbnRzWyB0eXBlIF0gJiYgY29udGVudHNbIHR5cGUgXS50ZXN0KCBjdCApICkge1xuXHRcdFx0XHRkYXRhVHlwZXMudW5zaGlmdCggdHlwZSApO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBDaGVjayB0byBzZWUgaWYgd2UgaGF2ZSBhIHJlc3BvbnNlIGZvciB0aGUgZXhwZWN0ZWQgZGF0YVR5cGVcblx0aWYgKCBkYXRhVHlwZXNbIDAgXSBpbiByZXNwb25zZXMgKSB7XG5cdFx0ZmluYWxEYXRhVHlwZSA9IGRhdGFUeXBlc1sgMCBdO1xuXHR9IGVsc2Uge1xuXHRcdC8vIFRyeSBjb252ZXJ0aWJsZSBkYXRhVHlwZXNcblx0XHRmb3IgKCB0eXBlIGluIHJlc3BvbnNlcyApIHtcblx0XHRcdGlmICggIWRhdGFUeXBlc1sgMCBdIHx8IHMuY29udmVydGVyc1sgdHlwZSArIFwiIFwiICsgZGF0YVR5cGVzWzBdIF0gKSB7XG5cdFx0XHRcdGZpbmFsRGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmICggIWZpcnN0RGF0YVR5cGUgKSB7XG5cdFx0XHRcdGZpcnN0RGF0YVR5cGUgPSB0eXBlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBPciBqdXN0IHVzZSBmaXJzdCBvbmVcblx0XHRmaW5hbERhdGFUeXBlID0gZmluYWxEYXRhVHlwZSB8fCBmaXJzdERhdGFUeXBlO1xuXHR9XG5cblx0Ly8gSWYgd2UgZm91bmQgYSBkYXRhVHlwZVxuXHQvLyBXZSBhZGQgdGhlIGRhdGFUeXBlIHRvIHRoZSBsaXN0IGlmIG5lZWRlZFxuXHQvLyBhbmQgcmV0dXJuIHRoZSBjb3JyZXNwb25kaW5nIHJlc3BvbnNlXG5cdGlmICggZmluYWxEYXRhVHlwZSApIHtcblx0XHRpZiAoIGZpbmFsRGF0YVR5cGUgIT09IGRhdGFUeXBlc1sgMCBdICkge1xuXHRcdFx0ZGF0YVR5cGVzLnVuc2hpZnQoIGZpbmFsRGF0YVR5cGUgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3BvbnNlc1sgZmluYWxEYXRhVHlwZSBdO1xuXHR9XG59XG5cbi8vIENoYWluIGNvbnZlcnNpb25zIGdpdmVuIHRoZSByZXF1ZXN0IGFuZCB0aGUgb3JpZ2luYWwgcmVzcG9uc2VcbmZ1bmN0aW9uIGFqYXhDb252ZXJ0KCBzLCByZXNwb25zZSApIHtcblxuXHR2YXIgY29udiwgY29udjIsIGN1cnJlbnQsIHRtcCxcblx0XHQvLyBXb3JrIHdpdGggYSBjb3B5IG9mIGRhdGFUeXBlcyBpbiBjYXNlIHdlIG5lZWQgdG8gbW9kaWZ5IGl0IGZvciBjb252ZXJzaW9uXG5cdFx0ZGF0YVR5cGVzID0gcy5kYXRhVHlwZXMuc2xpY2UoKSxcblx0XHRwcmV2ID0gZGF0YVR5cGVzWyAwIF0sXG5cdFx0Y29udmVydGVycyA9IHt9LFxuXHRcdGkgPSAwO1xuXG5cdC8vIEFwcGx5IHRoZSBkYXRhRmlsdGVyIGlmIHByb3ZpZGVkXG5cdGlmICggcy5kYXRhRmlsdGVyICkge1xuXHRcdHJlc3BvbnNlID0gcy5kYXRhRmlsdGVyKCByZXNwb25zZSwgcy5kYXRhVHlwZSApO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGNvbnZlcnRlcnMgbWFwIHdpdGggbG93ZXJjYXNlZCBrZXlzXG5cdGlmICggZGF0YVR5cGVzWyAxIF0gKSB7XG5cdFx0Zm9yICggY29udiBpbiBzLmNvbnZlcnRlcnMgKSB7XG5cdFx0XHRjb252ZXJ0ZXJzWyBjb252LnRvTG93ZXJDYXNlKCkgXSA9IHMuY29udmVydGVyc1sgY29udiBdO1xuXHRcdH1cblx0fVxuXG5cdC8vIENvbnZlcnQgdG8gZWFjaCBzZXF1ZW50aWFsIGRhdGFUeXBlLCB0b2xlcmF0aW5nIGxpc3QgbW9kaWZpY2F0aW9uXG5cdGZvciAoIDsgKGN1cnJlbnQgPSBkYXRhVHlwZXNbKytpXSk7ICkge1xuXG5cdFx0Ly8gVGhlcmUncyBvbmx5IHdvcmsgdG8gZG8gaWYgY3VycmVudCBkYXRhVHlwZSBpcyBub24tYXV0b1xuXHRcdGlmICggY3VycmVudCAhPT0gXCIqXCIgKSB7XG5cblx0XHRcdC8vIENvbnZlcnQgcmVzcG9uc2UgaWYgcHJldiBkYXRhVHlwZSBpcyBub24tYXV0byBhbmQgZGlmZmVycyBmcm9tIGN1cnJlbnRcblx0XHRcdGlmICggcHJldiAhPT0gXCIqXCIgJiYgcHJldiAhPT0gY3VycmVudCApIHtcblxuXHRcdFx0XHQvLyBTZWVrIGEgZGlyZWN0IGNvbnZlcnRlclxuXHRcdFx0XHRjb252ID0gY29udmVydGVyc1sgcHJldiArIFwiIFwiICsgY3VycmVudCBdIHx8IGNvbnZlcnRlcnNbIFwiKiBcIiArIGN1cnJlbnQgXTtcblxuXHRcdFx0XHQvLyBJZiBub25lIGZvdW5kLCBzZWVrIGEgcGFpclxuXHRcdFx0XHRpZiAoICFjb252ICkge1xuXHRcdFx0XHRcdGZvciAoIGNvbnYyIGluIGNvbnZlcnRlcnMgKSB7XG5cblx0XHRcdFx0XHRcdC8vIElmIGNvbnYyIG91dHB1dHMgY3VycmVudFxuXHRcdFx0XHRcdFx0dG1wID0gY29udjIuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRcdFx0aWYgKCB0bXBbIDEgXSA9PT0gY3VycmVudCApIHtcblxuXHRcdFx0XHRcdFx0XHQvLyBJZiBwcmV2IGNhbiBiZSBjb252ZXJ0ZWQgdG8gYWNjZXB0ZWQgaW5wdXRcblx0XHRcdFx0XHRcdFx0Y29udiA9IGNvbnZlcnRlcnNbIHByZXYgKyBcIiBcIiArIHRtcFsgMCBdIF0gfHxcblx0XHRcdFx0XHRcdFx0XHRjb252ZXJ0ZXJzWyBcIiogXCIgKyB0bXBbIDAgXSBdO1xuXHRcdFx0XHRcdFx0XHRpZiAoIGNvbnYgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gQ29uZGVuc2UgZXF1aXZhbGVuY2UgY29udmVydGVyc1xuXHRcdFx0XHRcdFx0XHRcdGlmICggY29udiA9PT0gdHJ1ZSApIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnYgPSBjb252ZXJ0ZXJzWyBjb252MiBdO1xuXG5cdFx0XHRcdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBpbnNlcnQgdGhlIGludGVybWVkaWF0ZSBkYXRhVHlwZVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoIGNvbnZlcnRlcnNbIGNvbnYyIF0gIT09IHRydWUgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdXJyZW50ID0gdG1wWyAwIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhVHlwZXMuc3BsaWNlKCBpLS0sIDAsIGN1cnJlbnQgKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIEFwcGx5IGNvbnZlcnRlciAoaWYgbm90IGFuIGVxdWl2YWxlbmNlKVxuXHRcdFx0XHRpZiAoIGNvbnYgIT09IHRydWUgKSB7XG5cblx0XHRcdFx0XHQvLyBVbmxlc3MgZXJyb3JzIGFyZSBhbGxvd2VkIHRvIGJ1YmJsZSwgY2F0Y2ggYW5kIHJldHVybiB0aGVtXG5cdFx0XHRcdFx0aWYgKCBjb252ICYmIHNbXCJ0aHJvd3NcIl0gKSB7XG5cdFx0XHRcdFx0XHRyZXNwb25zZSA9IGNvbnYoIHJlc3BvbnNlICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gY29udiggcmVzcG9uc2UgKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4geyBzdGF0ZTogXCJwYXJzZXJlcnJvclwiLCBlcnJvcjogY29udiA/IGUgOiBcIk5vIGNvbnZlcnNpb24gZnJvbSBcIiArIHByZXYgKyBcIiB0byBcIiArIGN1cnJlbnQgfTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gVXBkYXRlIHByZXYgZm9yIG5leHQgaXRlcmF0aW9uXG5cdFx0XHRwcmV2ID0gY3VycmVudDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4geyBzdGF0ZTogXCJzdWNjZXNzXCIsIGRhdGE6IHJlc3BvbnNlIH07XG59XG52YXIgb2xkQ2FsbGJhY2tzID0gW10sXG5cdHJxdWVzdGlvbiA9IC9cXD8vLFxuXHRyanNvbnAgPSAvKD0pXFw/KD89JnwkKXxcXD9cXD8vLFxuXHRub25jZSA9IGpRdWVyeS5ub3coKTtcblxuLy8gRGVmYXVsdCBqc29ucCBzZXR0aW5nc1xualF1ZXJ5LmFqYXhTZXR1cCh7XG5cdGpzb25wOiBcImNhbGxiYWNrXCIsXG5cdGpzb25wQ2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjYWxsYmFjayA9IG9sZENhbGxiYWNrcy5wb3AoKSB8fCAoIGpRdWVyeS5leHBhbmRvICsgXCJfXCIgKyAoIG5vbmNlKysgKSApO1xuXHRcdHRoaXNbIGNhbGxiYWNrIF0gPSB0cnVlO1xuXHRcdHJldHVybiBjYWxsYmFjaztcblx0fVxufSk7XG5cbi8vIERldGVjdCwgbm9ybWFsaXplIG9wdGlvbnMgYW5kIGluc3RhbGwgY2FsbGJhY2tzIGZvciBqc29ucCByZXF1ZXN0c1xualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIFwianNvbiBqc29ucFwiLCBmdW5jdGlvbiggcywgb3JpZ2luYWxTZXR0aW5ncywganFYSFIgKSB7XG5cblx0dmFyIGNhbGxiYWNrTmFtZSwgb3ZlcndyaXR0ZW4sIHJlc3BvbnNlQ29udGFpbmVyLFxuXHRcdGRhdGEgPSBzLmRhdGEsXG5cdFx0dXJsID0gcy51cmwsXG5cdFx0aGFzQ2FsbGJhY2sgPSBzLmpzb25wICE9PSBmYWxzZSxcblx0XHRyZXBsYWNlSW5VcmwgPSBoYXNDYWxsYmFjayAmJiByanNvbnAudGVzdCggdXJsICksXG5cdFx0cmVwbGFjZUluRGF0YSA9IGhhc0NhbGxiYWNrICYmICFyZXBsYWNlSW5VcmwgJiYgdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgJiZcblx0XHRcdCEoIHMuY29udGVudFR5cGUgfHwgXCJcIiApLmluZGV4T2YoXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIikgJiZcblx0XHRcdHJqc29ucC50ZXN0KCBkYXRhICk7XG5cblx0Ly8gSGFuZGxlIGlmZiB0aGUgZXhwZWN0ZWQgZGF0YSB0eXBlIGlzIFwianNvbnBcIiBvciB3ZSBoYXZlIGEgcGFyYW1ldGVyIHRvIHNldFxuXHRpZiAoIHMuZGF0YVR5cGVzWyAwIF0gPT09IFwianNvbnBcIiB8fCByZXBsYWNlSW5VcmwgfHwgcmVwbGFjZUluRGF0YSApIHtcblxuXHRcdC8vIEdldCBjYWxsYmFjayBuYW1lLCByZW1lbWJlcmluZyBwcmVleGlzdGluZyB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggaXRcblx0XHRjYWxsYmFja05hbWUgPSBzLmpzb25wQ2FsbGJhY2sgPSBqUXVlcnkuaXNGdW5jdGlvbiggcy5qc29ucENhbGxiYWNrICkgP1xuXHRcdFx0cy5qc29ucENhbGxiYWNrKCkgOlxuXHRcdFx0cy5qc29ucENhbGxiYWNrO1xuXHRcdG92ZXJ3cml0dGVuID0gd2luZG93WyBjYWxsYmFja05hbWUgXTtcblxuXHRcdC8vIEluc2VydCBjYWxsYmFjayBpbnRvIHVybCBvciBmb3JtIGRhdGFcblx0XHRpZiAoIHJlcGxhY2VJblVybCApIHtcblx0XHRcdHMudXJsID0gdXJsLnJlcGxhY2UoIHJqc29ucCwgXCIkMVwiICsgY2FsbGJhY2tOYW1lICk7XG5cdFx0fSBlbHNlIGlmICggcmVwbGFjZUluRGF0YSApIHtcblx0XHRcdHMuZGF0YSA9IGRhdGEucmVwbGFjZSggcmpzb25wLCBcIiQxXCIgKyBjYWxsYmFja05hbWUgKTtcblx0XHR9IGVsc2UgaWYgKCBoYXNDYWxsYmFjayApIHtcblx0XHRcdHMudXJsICs9ICggcnF1ZXN0aW9uLnRlc3QoIHVybCApID8gXCImXCIgOiBcIj9cIiApICsgcy5qc29ucCArIFwiPVwiICsgY2FsbGJhY2tOYW1lO1xuXHRcdH1cblxuXHRcdC8vIFVzZSBkYXRhIGNvbnZlcnRlciB0byByZXRyaWV2ZSBqc29uIGFmdGVyIHNjcmlwdCBleGVjdXRpb25cblx0XHRzLmNvbnZlcnRlcnNbXCJzY3JpcHQganNvblwiXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCAhcmVzcG9uc2VDb250YWluZXIgKSB7XG5cdFx0XHRcdGpRdWVyeS5lcnJvciggY2FsbGJhY2tOYW1lICsgXCIgd2FzIG5vdCBjYWxsZWRcIiApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlc3BvbnNlQ29udGFpbmVyWyAwIF07XG5cdFx0fTtcblxuXHRcdC8vIGZvcmNlIGpzb24gZGF0YVR5cGVcblx0XHRzLmRhdGFUeXBlc1sgMCBdID0gXCJqc29uXCI7XG5cblx0XHQvLyBJbnN0YWxsIGNhbGxiYWNrXG5cdFx0d2luZG93WyBjYWxsYmFja05hbWUgXSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVzcG9uc2VDb250YWluZXIgPSBhcmd1bWVudHM7XG5cdFx0fTtcblxuXHRcdC8vIENsZWFuLXVwIGZ1bmN0aW9uIChmaXJlcyBhZnRlciBjb252ZXJ0ZXJzKVxuXHRcdGpxWEhSLmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdC8vIFJlc3RvcmUgcHJlZXhpc3RpbmcgdmFsdWVcblx0XHRcdHdpbmRvd1sgY2FsbGJhY2tOYW1lIF0gPSBvdmVyd3JpdHRlbjtcblxuXHRcdFx0Ly8gU2F2ZSBiYWNrIGFzIGZyZWVcblx0XHRcdGlmICggc1sgY2FsbGJhY2tOYW1lIF0gKSB7XG5cdFx0XHRcdC8vIG1ha2Ugc3VyZSB0aGF0IHJlLXVzaW5nIHRoZSBvcHRpb25zIGRvZXNuJ3Qgc2NyZXcgdGhpbmdzIGFyb3VuZFxuXHRcdFx0XHRzLmpzb25wQ2FsbGJhY2sgPSBvcmlnaW5hbFNldHRpbmdzLmpzb25wQ2FsbGJhY2s7XG5cblx0XHRcdFx0Ly8gc2F2ZSB0aGUgY2FsbGJhY2sgbmFtZSBmb3IgZnV0dXJlIHVzZVxuXHRcdFx0XHRvbGRDYWxsYmFja3MucHVzaCggY2FsbGJhY2tOYW1lICk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhbGwgaWYgaXQgd2FzIGEgZnVuY3Rpb24gYW5kIHdlIGhhdmUgYSByZXNwb25zZVxuXHRcdFx0aWYgKCByZXNwb25zZUNvbnRhaW5lciAmJiBqUXVlcnkuaXNGdW5jdGlvbiggb3ZlcndyaXR0ZW4gKSApIHtcblx0XHRcdFx0b3ZlcndyaXR0ZW4oIHJlc3BvbnNlQ29udGFpbmVyWyAwIF0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmVzcG9uc2VDb250YWluZXIgPSBvdmVyd3JpdHRlbiA9IHVuZGVmaW5lZDtcblx0XHR9KTtcblxuXHRcdC8vIERlbGVnYXRlIHRvIHNjcmlwdFxuXHRcdHJldHVybiBcInNjcmlwdFwiO1xuXHR9XG59KTtcbi8vIEluc3RhbGwgc2NyaXB0IGRhdGFUeXBlXG5qUXVlcnkuYWpheFNldHVwKHtcblx0YWNjZXB0czoge1xuXHRcdHNjcmlwdDogXCJ0ZXh0L2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2phdmFzY3JpcHQsIGFwcGxpY2F0aW9uL2VjbWFzY3JpcHQsIGFwcGxpY2F0aW9uL3gtZWNtYXNjcmlwdFwiXG5cdH0sXG5cdGNvbnRlbnRzOiB7XG5cdFx0c2NyaXB0OiAvamF2YXNjcmlwdHxlY21hc2NyaXB0L1xuXHR9LFxuXHRjb252ZXJ0ZXJzOiB7XG5cdFx0XCJ0ZXh0IHNjcmlwdFwiOiBmdW5jdGlvbiggdGV4dCApIHtcblx0XHRcdGpRdWVyeS5nbG9iYWxFdmFsKCB0ZXh0ICk7XG5cdFx0XHRyZXR1cm4gdGV4dDtcblx0XHR9XG5cdH1cbn0pO1xuXG4vLyBIYW5kbGUgY2FjaGUncyBzcGVjaWFsIGNhc2UgYW5kIGdsb2JhbFxualF1ZXJ5LmFqYXhQcmVmaWx0ZXIoIFwic2NyaXB0XCIsIGZ1bmN0aW9uKCBzICkge1xuXHRpZiAoIHMuY2FjaGUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRzLmNhY2hlID0gZmFsc2U7XG5cdH1cblx0aWYgKCBzLmNyb3NzRG9tYWluICkge1xuXHRcdHMudHlwZSA9IFwiR0VUXCI7XG5cdFx0cy5nbG9iYWwgPSBmYWxzZTtcblx0fVxufSk7XG5cbi8vIEJpbmQgc2NyaXB0IHRhZyBoYWNrIHRyYW5zcG9ydFxualF1ZXJ5LmFqYXhUcmFuc3BvcnQoIFwic2NyaXB0XCIsIGZ1bmN0aW9uKHMpIHtcblxuXHQvLyBUaGlzIHRyYW5zcG9ydCBvbmx5IGRlYWxzIHdpdGggY3Jvc3MgZG9tYWluIHJlcXVlc3RzXG5cdGlmICggcy5jcm9zc0RvbWFpbiApIHtcblxuXHRcdHZhciBzY3JpcHQsXG5cdFx0XHRoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJoZWFkXCIgKVswXSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0XHRyZXR1cm4ge1xuXG5cdFx0XHRzZW5kOiBmdW5jdGlvbiggXywgY2FsbGJhY2sgKSB7XG5cblx0XHRcdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJzY3JpcHRcIiApO1xuXG5cdFx0XHRcdHNjcmlwdC5hc3luYyA9IFwiYXN5bmNcIjtcblxuXHRcdFx0XHRpZiAoIHMuc2NyaXB0Q2hhcnNldCApIHtcblx0XHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9IHMuc2NyaXB0Q2hhcnNldDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNjcmlwdC5zcmMgPSBzLnVybDtcblxuXHRcdFx0XHQvLyBBdHRhY2ggaGFuZGxlcnMgZm9yIGFsbCBicm93c2Vyc1xuXHRcdFx0XHRzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCBfLCBpc0Fib3J0ICkge1xuXG5cdFx0XHRcdFx0aWYgKCBpc0Fib3J0IHx8ICFzY3JpcHQucmVhZHlTdGF0ZSB8fCAvbG9hZGVkfGNvbXBsZXRlLy50ZXN0KCBzY3JpcHQucmVhZHlTdGF0ZSApICkge1xuXG5cdFx0XHRcdFx0XHQvLyBIYW5kbGUgbWVtb3J5IGxlYWsgaW4gSUVcblx0XHRcdFx0XHRcdHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcblxuXHRcdFx0XHRcdFx0Ly8gUmVtb3ZlIHRoZSBzY3JpcHRcblx0XHRcdFx0XHRcdGlmICggaGVhZCAmJiBzY3JpcHQucGFyZW50Tm9kZSApIHtcblx0XHRcdFx0XHRcdFx0aGVhZC5yZW1vdmVDaGlsZCggc2NyaXB0ICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIERlcmVmZXJlbmNlIHRoZSBzY3JpcHRcblx0XHRcdFx0XHRcdHNjcmlwdCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0XHRcdFx0Ly8gQ2FsbGJhY2sgaWYgbm90IGFib3J0XG5cdFx0XHRcdFx0XHRpZiAoICFpc0Fib3J0ICkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayggMjAwLCBcInN1Y2Nlc3NcIiApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdFx0Ly8gVXNlIGluc2VydEJlZm9yZSBpbnN0ZWFkIG9mIGFwcGVuZENoaWxkICB0byBjaXJjdW12ZW50IGFuIElFNiBidWcuXG5cdFx0XHRcdC8vIFRoaXMgYXJpc2VzIHdoZW4gYSBiYXNlIG5vZGUgaXMgdXNlZCAoIzI3MDkgYW5kICM0Mzc4KS5cblx0XHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoIHNjcmlwdCwgaGVhZC5maXJzdENoaWxkICk7XG5cdFx0XHR9LFxuXG5cdFx0XHRhYm9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICggc2NyaXB0ICkge1xuXHRcdFx0XHRcdHNjcmlwdC5vbmxvYWQoIDAsIDEgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdH1cbn0pO1xudmFyIHhockNhbGxiYWNrcyxcblx0Ly8gIzUyODA6IEludGVybmV0IEV4cGxvcmVyIHdpbGwga2VlcCBjb25uZWN0aW9ucyBhbGl2ZSBpZiB3ZSBkb24ndCBhYm9ydCBvbiB1bmxvYWRcblx0eGhyT25VbmxvYWRBYm9ydCA9IHdpbmRvdy5BY3RpdmVYT2JqZWN0ID8gZnVuY3Rpb24oKSB7XG5cdFx0Ly8gQWJvcnQgYWxsIHBlbmRpbmcgcmVxdWVzdHNcblx0XHRmb3IgKCB2YXIga2V5IGluIHhockNhbGxiYWNrcyApIHtcblx0XHRcdHhockNhbGxiYWNrc1sga2V5IF0oIDAsIDEgKTtcblx0XHR9XG5cdH0gOiBmYWxzZSxcblx0eGhySWQgPSAwO1xuXG4vLyBGdW5jdGlvbnMgdG8gY3JlYXRlIHhocnNcbmZ1bmN0aW9uIGNyZWF0ZVN0YW5kYXJkWEhSKCkge1xuXHR0cnkge1xuXHRcdHJldHVybiBuZXcgd2luZG93LlhNTEh0dHBSZXF1ZXN0KCk7XG5cdH0gY2F0Y2goIGUgKSB7fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVBY3RpdmVYSFIoKSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCggXCJNaWNyb3NvZnQuWE1MSFRUUFwiICk7XG5cdH0gY2F0Y2goIGUgKSB7fVxufVxuXG4vLyBDcmVhdGUgdGhlIHJlcXVlc3Qgb2JqZWN0XG4vLyAoVGhpcyBpcyBzdGlsbCBhdHRhY2hlZCB0byBhamF4U2V0dGluZ3MgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkpXG5qUXVlcnkuYWpheFNldHRpbmdzLnhociA9IHdpbmRvdy5BY3RpdmVYT2JqZWN0ID9cblx0LyogTWljcm9zb2Z0IGZhaWxlZCB0byBwcm9wZXJseVxuXHQgKiBpbXBsZW1lbnQgdGhlIFhNTEh0dHBSZXF1ZXN0IGluIElFNyAoY2FuJ3QgcmVxdWVzdCBsb2NhbCBmaWxlcyksXG5cdCAqIHNvIHdlIHVzZSB0aGUgQWN0aXZlWE9iamVjdCB3aGVuIGl0IGlzIGF2YWlsYWJsZVxuXHQgKiBBZGRpdGlvbmFsbHkgWE1MSHR0cFJlcXVlc3QgY2FuIGJlIGRpc2FibGVkIGluIElFNy9JRTggc29cblx0ICogd2UgbmVlZCBhIGZhbGxiYWNrLlxuXHQgKi9cblx0ZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICF0aGlzLmlzTG9jYWwgJiYgY3JlYXRlU3RhbmRhcmRYSFIoKSB8fCBjcmVhdGVBY3RpdmVYSFIoKTtcblx0fSA6XG5cdC8vIEZvciBhbGwgb3RoZXIgYnJvd3NlcnMsIHVzZSB0aGUgc3RhbmRhcmQgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0XG5cdGNyZWF0ZVN0YW5kYXJkWEhSO1xuXG4vLyBEZXRlcm1pbmUgc3VwcG9ydCBwcm9wZXJ0aWVzXG4oZnVuY3Rpb24oIHhociApIHtcblx0alF1ZXJ5LmV4dGVuZCggalF1ZXJ5LnN1cHBvcnQsIHtcblx0XHRhamF4OiAhIXhocixcblx0XHRjb3JzOiAhIXhociAmJiAoIFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyIClcblx0fSk7XG59KSggalF1ZXJ5LmFqYXhTZXR0aW5ncy54aHIoKSApO1xuXG4vLyBDcmVhdGUgdHJhbnNwb3J0IGlmIHRoZSBicm93c2VyIGNhbiBwcm92aWRlIGFuIHhoclxuaWYgKCBqUXVlcnkuc3VwcG9ydC5hamF4ICkge1xuXG5cdGpRdWVyeS5hamF4VHJhbnNwb3J0KGZ1bmN0aW9uKCBzICkge1xuXHRcdC8vIENyb3NzIGRvbWFpbiBvbmx5IGFsbG93ZWQgaWYgc3VwcG9ydGVkIHRocm91Z2ggWE1MSHR0cFJlcXVlc3Rcblx0XHRpZiAoICFzLmNyb3NzRG9tYWluIHx8IGpRdWVyeS5zdXBwb3J0LmNvcnMgKSB7XG5cblx0XHRcdHZhciBjYWxsYmFjaztcblxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c2VuZDogZnVuY3Rpb24oIGhlYWRlcnMsIGNvbXBsZXRlICkge1xuXG5cdFx0XHRcdFx0Ly8gR2V0IGEgbmV3IHhoclxuXHRcdFx0XHRcdHZhciBoYW5kbGUsIGksXG5cdFx0XHRcdFx0XHR4aHIgPSBzLnhocigpO1xuXG5cdFx0XHRcdFx0Ly8gT3BlbiB0aGUgc29ja2V0XG5cdFx0XHRcdFx0Ly8gUGFzc2luZyBudWxsIHVzZXJuYW1lLCBnZW5lcmF0ZXMgYSBsb2dpbiBwb3B1cCBvbiBPcGVyYSAoIzI4NjUpXG5cdFx0XHRcdFx0aWYgKCBzLnVzZXJuYW1lICkge1xuXHRcdFx0XHRcdFx0eGhyLm9wZW4oIHMudHlwZSwgcy51cmwsIHMuYXN5bmMsIHMudXNlcm5hbWUsIHMucGFzc3dvcmQgKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0eGhyLm9wZW4oIHMudHlwZSwgcy51cmwsIHMuYXN5bmMgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBBcHBseSBjdXN0b20gZmllbGRzIGlmIHByb3ZpZGVkXG5cdFx0XHRcdFx0aWYgKCBzLnhockZpZWxkcyApIHtcblx0XHRcdFx0XHRcdGZvciAoIGkgaW4gcy54aHJGaWVsZHMgKSB7XG5cdFx0XHRcdFx0XHRcdHhoclsgaSBdID0gcy54aHJGaWVsZHNbIGkgXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBPdmVycmlkZSBtaW1lIHR5cGUgaWYgbmVlZGVkXG5cdFx0XHRcdFx0aWYgKCBzLm1pbWVUeXBlICYmIHhoci5vdmVycmlkZU1pbWVUeXBlICkge1xuXHRcdFx0XHRcdFx0eGhyLm92ZXJyaWRlTWltZVR5cGUoIHMubWltZVR5cGUgKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBYLVJlcXVlc3RlZC1XaXRoIGhlYWRlclxuXHRcdFx0XHRcdC8vIEZvciBjcm9zcy1kb21haW4gcmVxdWVzdHMsIHNlZWluZyBhcyBjb25kaXRpb25zIGZvciBhIHByZWZsaWdodCBhcmVcblx0XHRcdFx0XHQvLyBha2luIHRvIGEgamlnc2F3IHB1enpsZSwgd2Ugc2ltcGx5IG5ldmVyIHNldCBpdCB0byBiZSBzdXJlLlxuXHRcdFx0XHRcdC8vIChpdCBjYW4gYWx3YXlzIGJlIHNldCBvbiBhIHBlci1yZXF1ZXN0IGJhc2lzIG9yIGV2ZW4gdXNpbmcgYWpheFNldHVwKVxuXHRcdFx0XHRcdC8vIEZvciBzYW1lLWRvbWFpbiByZXF1ZXN0cywgd29uJ3QgY2hhbmdlIGhlYWRlciBpZiBhbHJlYWR5IHByb3ZpZGVkLlxuXHRcdFx0XHRcdGlmICggIXMuY3Jvc3NEb21haW4gJiYgIWhlYWRlcnNbXCJYLVJlcXVlc3RlZC1XaXRoXCJdICkge1xuXHRcdFx0XHRcdFx0aGVhZGVyc1sgXCJYLVJlcXVlc3RlZC1XaXRoXCIgXSA9IFwiWE1MSHR0cFJlcXVlc3RcIjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBOZWVkIGFuIGV4dHJhIHRyeS9jYXRjaCBmb3IgY3Jvc3MgZG9tYWluIHJlcXVlc3RzIGluIEZpcmVmb3ggM1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRmb3IgKCBpIGluIGhlYWRlcnMgKSB7XG5cdFx0XHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCBpLCBoZWFkZXJzWyBpIF0gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGNhdGNoKCBfICkge31cblxuXHRcdFx0XHRcdC8vIERvIHNlbmQgdGhlIHJlcXVlc3Rcblx0XHRcdFx0XHQvLyBUaGlzIG1heSByYWlzZSBhbiBleGNlcHRpb24gd2hpY2ggaXMgYWN0dWFsbHlcblx0XHRcdFx0XHQvLyBoYW5kbGVkIGluIGpRdWVyeS5hamF4IChzbyBubyB0cnkvY2F0Y2ggaGVyZSlcblx0XHRcdFx0XHR4aHIuc2VuZCggKCBzLmhhc0NvbnRlbnQgJiYgcy5kYXRhICkgfHwgbnVsbCApO1xuXG5cdFx0XHRcdFx0Ly8gTGlzdGVuZXJcblx0XHRcdFx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uKCBfLCBpc0Fib3J0ICkge1xuXG5cdFx0XHRcdFx0XHR2YXIgc3RhdHVzLFxuXHRcdFx0XHRcdFx0XHRzdGF0dXNUZXh0LFxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZUhlYWRlcnMsXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlcyxcblx0XHRcdFx0XHRcdFx0eG1sO1xuXG5cdFx0XHRcdFx0XHQvLyBGaXJlZm94IHRocm93cyBleGNlcHRpb25zIHdoZW4gYWNjZXNzaW5nIHByb3BlcnRpZXNcblx0XHRcdFx0XHRcdC8vIG9mIGFuIHhociB3aGVuIGEgbmV0d29yayBlcnJvciBvY2N1cnJlZFxuXHRcdFx0XHRcdFx0Ly8gaHR0cDovL2hlbHBmdWwua25vYnMtZGlhbHMuY29tL2luZGV4LnBocC9Db21wb25lbnRfcmV0dXJuZWRfZmFpbHVyZV9jb2RlOl8weDgwMDQwMTExXyhOU19FUlJPUl9OT1RfQVZBSUxBQkxFKVxuXHRcdFx0XHRcdFx0dHJ5IHtcblxuXHRcdFx0XHRcdFx0XHQvLyBXYXMgbmV2ZXIgY2FsbGVkIGFuZCBpcyBhYm9ydGVkIG9yIGNvbXBsZXRlXG5cdFx0XHRcdFx0XHRcdGlmICggY2FsbGJhY2sgJiYgKCBpc0Fib3J0IHx8IHhoci5yZWFkeVN0YXRlID09PSA0ICkgKSB7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBPbmx5IGNhbGxlZCBvbmNlXG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBEbyBub3Qga2VlcCBhcyBhY3RpdmUgYW55bW9yZVxuXHRcdFx0XHRcdFx0XHRcdGlmICggaGFuZGxlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGpRdWVyeS5ub29wO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCB4aHJPblVubG9hZEFib3J0ICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgeGhyQ2FsbGJhY2tzWyBoYW5kbGUgXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHQvLyBJZiBpdCdzIGFuIGFib3J0XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCBpc0Fib3J0ICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gQWJvcnQgaXQgbWFudWFsbHkgaWYgbmVlZGVkXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIHhoci5yZWFkeVN0YXRlICE9PSA0ICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR4aHIuYWJvcnQoKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlSGVhZGVycyA9IHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlcyA9IHt9O1xuXHRcdFx0XHRcdFx0XHRcdFx0eG1sID0geGhyLnJlc3BvbnNlWE1MO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBDb25zdHJ1Y3QgcmVzcG9uc2UgbGlzdFxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCB4bWwgJiYgeG1sLmRvY3VtZW50RWxlbWVudCAvKiAjNDk1OCAqLyApIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VzLnhtbCA9IHhtbDtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gV2hlbiByZXF1ZXN0aW5nIGJpbmFyeSBkYXRhLCBJRTYtOSB3aWxsIHRocm93IGFuIGV4Y2VwdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gb24gYW55IGF0dGVtcHQgdG8gYWNjZXNzIHJlc3BvbnNlVGV4dCAoIzExNDI2KVxuXHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VzLnRleHQgPSB4aHIucmVzcG9uc2VUZXh0O1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCggXyApIHtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gRmlyZWZveCB0aHJvd3MgYW4gZXhjZXB0aW9uIHdoZW4gYWNjZXNzaW5nXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBzdGF0dXNUZXh0IGZvciBmYXVsdHkgY3Jvc3MtZG9tYWluIHJlcXVlc3RzXG5cdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzdGF0dXNUZXh0ID0geGhyLnN0YXR1c1RleHQ7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGNhdGNoKCBlICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBXZSBub3JtYWxpemUgd2l0aCBXZWJraXQgZ2l2aW5nIGFuIGVtcHR5IHN0YXR1c1RleHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3RhdHVzVGV4dCA9IFwiXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIEZpbHRlciBzdGF0dXMgZm9yIG5vbiBzdGFuZGFyZCBiZWhhdmlvcnNcblxuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlIHJlcXVlc3QgaXMgbG9jYWwgYW5kIHdlIGhhdmUgZGF0YTogYXNzdW1lIGEgc3VjY2Vzc1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gKHN1Y2Nlc3Mgd2l0aCBubyBkYXRhIHdvbid0IGdldCBub3RpZmllZCwgdGhhdCdzIHRoZSBiZXN0IHdlXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBjYW4gZG8gZ2l2ZW4gY3VycmVudCBpbXBsZW1lbnRhdGlvbnMpXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoICFzdGF0dXMgJiYgcy5pc0xvY2FsICYmICFzLmNyb3NzRG9tYWluICkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzdGF0dXMgPSByZXNwb25zZXMudGV4dCA/IDIwMCA6IDQwNDtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElFIC0gIzE0NTA6IHNvbWV0aW1lcyByZXR1cm5zIDEyMjMgd2hlbiBpdCBzaG91bGQgYmUgMjA0XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCBzdGF0dXMgPT09IDEyMjMgKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHN0YXR1cyA9IDIwNDtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2goIGZpcmVmb3hBY2Nlc3NFeGNlcHRpb24gKSB7XG5cdFx0XHRcdFx0XHRcdGlmICggIWlzQWJvcnQgKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29tcGxldGUoIC0xLCBmaXJlZm94QWNjZXNzRXhjZXB0aW9uICk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Ly8gQ2FsbCBjb21wbGV0ZSBpZiBuZWVkZWRcblx0XHRcdFx0XHRcdGlmICggcmVzcG9uc2VzICkge1xuXHRcdFx0XHRcdFx0XHRjb21wbGV0ZSggc3RhdHVzLCBzdGF0dXNUZXh0LCByZXNwb25zZXMsIHJlc3BvbnNlSGVhZGVycyApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZiAoICFzLmFzeW5jICkge1xuXHRcdFx0XHRcdFx0Ly8gaWYgd2UncmUgaW4gc3luYyBtb2RlIHdlIGZpcmUgdGhlIGNhbGxiYWNrXG5cdFx0XHRcdFx0XHRjYWxsYmFjaygpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoIHhoci5yZWFkeVN0YXRlID09PSA0ICkge1xuXHRcdFx0XHRcdFx0Ly8gKElFNiAmIElFNykgaWYgaXQncyBpbiBjYWNoZSBhbmQgaGFzIGJlZW5cblx0XHRcdFx0XHRcdC8vIHJldHJpZXZlZCBkaXJlY3RseSB3ZSBuZWVkIHRvIGZpcmUgdGhlIGNhbGxiYWNrXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCBjYWxsYmFjaywgMCApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRoYW5kbGUgPSArK3hocklkO1xuXHRcdFx0XHRcdFx0aWYgKCB4aHJPblVubG9hZEFib3J0ICkge1xuXHRcdFx0XHRcdFx0XHQvLyBDcmVhdGUgdGhlIGFjdGl2ZSB4aHJzIGNhbGxiYWNrcyBsaXN0IGlmIG5lZWRlZFxuXHRcdFx0XHRcdFx0XHQvLyBhbmQgYXR0YWNoIHRoZSB1bmxvYWQgaGFuZGxlclxuXHRcdFx0XHRcdFx0XHRpZiAoICF4aHJDYWxsYmFja3MgKSB7XG5cdFx0XHRcdFx0XHRcdFx0eGhyQ2FsbGJhY2tzID0ge307XG5cdFx0XHRcdFx0XHRcdFx0alF1ZXJ5KCB3aW5kb3cgKS51bmxvYWQoIHhock9uVW5sb2FkQWJvcnQgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQvLyBBZGQgdG8gbGlzdCBvZiBhY3RpdmUgeGhycyBjYWxsYmFja3Ncblx0XHRcdFx0XHRcdFx0eGhyQ2FsbGJhY2tzWyBoYW5kbGUgXSA9IGNhbGxiYWNrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGNhbGxiYWNrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblxuXHRcdFx0XHRhYm9ydDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCBjYWxsYmFjayApIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrKDAsMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0fSk7XG59XG52YXIgZnhOb3csIHRpbWVySWQsXG5cdHJmeHR5cGVzID0gL14oPzp0b2dnbGV8c2hvd3xoaWRlKSQvLFxuXHRyZnhudW0gPSBuZXcgUmVnRXhwKCBcIl4oPzooWy0rXSk9fCkoXCIgKyBjb3JlX3BudW0gKyBcIikoW2EteiVdKikkXCIsIFwiaVwiICksXG5cdHJydW4gPSAvcXVldWVIb29rcyQvLFxuXHRhbmltYXRpb25QcmVmaWx0ZXJzID0gWyBkZWZhdWx0UHJlZmlsdGVyIF0sXG5cdHR3ZWVuZXJzID0ge1xuXHRcdFwiKlwiOiBbZnVuY3Rpb24oIHByb3AsIHZhbHVlICkge1xuXHRcdFx0dmFyIGVuZCwgdW5pdCwgcHJldlNjYWxlLFxuXHRcdFx0XHR0d2VlbiA9IHRoaXMuY3JlYXRlVHdlZW4oIHByb3AsIHZhbHVlICksXG5cdFx0XHRcdHBhcnRzID0gcmZ4bnVtLmV4ZWMoIHZhbHVlICksXG5cdFx0XHRcdHRhcmdldCA9IHR3ZWVuLmN1cigpLFxuXHRcdFx0XHRzdGFydCA9ICt0YXJnZXQgfHwgMCxcblx0XHRcdFx0c2NhbGUgPSAxO1xuXG5cdFx0XHRpZiAoIHBhcnRzICkge1xuXHRcdFx0XHRlbmQgPSArcGFydHNbMl07XG5cdFx0XHRcdHVuaXQgPSBwYXJ0c1szXSB8fCAoIGpRdWVyeS5jc3NOdW1iZXJbIHByb3AgXSA/IFwiXCIgOiBcInB4XCIgKTtcblxuXHRcdFx0XHQvLyBXZSBuZWVkIHRvIGNvbXB1dGUgc3RhcnRpbmcgdmFsdWVcblx0XHRcdFx0aWYgKCB1bml0ICE9PSBcInB4XCIgJiYgc3RhcnQgKSB7XG5cdFx0XHRcdFx0Ly8gSXRlcmF0aXZlbHkgYXBwcm94aW1hdGUgZnJvbSBhIG5vbnplcm8gc3RhcnRpbmcgcG9pbnRcblx0XHRcdFx0XHQvLyBQcmVmZXIgdGhlIGN1cnJlbnQgcHJvcGVydHksIGJlY2F1c2UgdGhpcyBwcm9jZXNzIHdpbGwgYmUgdHJpdmlhbCBpZiBpdCB1c2VzIHRoZSBzYW1lIHVuaXRzXG5cdFx0XHRcdFx0Ly8gRmFsbGJhY2sgdG8gZW5kIG9yIGEgc2ltcGxlIGNvbnN0YW50XG5cdFx0XHRcdFx0c3RhcnQgPSBqUXVlcnkuY3NzKCB0d2Vlbi5lbGVtLCBwcm9wLCB0cnVlICkgfHwgZW5kIHx8IDE7XG5cblx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHQvLyBJZiBwcmV2aW91cyBpdGVyYXRpb24gemVyb2VkIG91dCwgZG91YmxlIHVudGlsIHdlIGdldCAqc29tZXRoaW5nKlxuXHRcdFx0XHRcdFx0Ly8gVXNlIGEgc3RyaW5nIGZvciBkb3VibGluZyBmYWN0b3Igc28gd2UgZG9uJ3QgYWNjaWRlbnRhbGx5IHNlZSBzY2FsZSBhcyB1bmNoYW5nZWQgYmVsb3dcblx0XHRcdFx0XHRcdHByZXZTY2FsZSA9IHNjYWxlID0gc2NhbGUgfHwgXCIuNVwiO1xuXG5cdFx0XHRcdFx0XHQvLyBBZGp1c3QgYW5kIGFwcGx5XG5cdFx0XHRcdFx0XHRzdGFydCA9IHN0YXJ0IC8gc2NhbGU7XG5cdFx0XHRcdFx0XHRqUXVlcnkuc3R5bGUoIHR3ZWVuLmVsZW0sIHByb3AsIHN0YXJ0ICsgdW5pdCApO1xuXG5cdFx0XHRcdFx0XHQvLyBVcGRhdGUgc2NhbGUsIHRvbGVyYXRpbmcgemVyb2VzIGZyb20gdHdlZW4uY3VyKClcblx0XHRcdFx0XHRcdHNjYWxlID0gdHdlZW4uY3VyKCkgLyB0YXJnZXQ7XG5cblx0XHRcdFx0XHQvLyBTdG9wIGxvb3BpbmcgaWYgd2UndmUgaGl0IHRoZSBtYXJrIG9yIHNjYWxlIGlzIHVuY2hhbmdlZFxuXHRcdFx0XHRcdH0gd2hpbGUgKCBzY2FsZSAhPT0gMSAmJiBzY2FsZSAhPT0gcHJldlNjYWxlICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0d2Vlbi51bml0ID0gdW5pdDtcblx0XHRcdFx0dHdlZW4uc3RhcnQgPSBzdGFydDtcblx0XHRcdFx0Ly8gSWYgYSArPS8tPSB0b2tlbiB3YXMgcHJvdmlkZWQsIHdlJ3JlIGRvaW5nIGEgcmVsYXRpdmUgYW5pbWF0aW9uXG5cdFx0XHRcdHR3ZWVuLmVuZCA9IHBhcnRzWzFdID8gc3RhcnQgKyAoIHBhcnRzWzFdICsgMSApICogZW5kIDogZW5kO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHR3ZWVuO1xuXHRcdH1dXG5cdH07XG5cbi8vIEFuaW1hdGlvbnMgY3JlYXRlZCBzeW5jaHJvbm91c2x5IHdpbGwgcnVuIHN5bmNocm9ub3VzbHlcbmZ1bmN0aW9uIGNyZWF0ZUZ4Tm93KCkge1xuXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdGZ4Tm93ID0gdW5kZWZpbmVkO1xuXHR9LCAwICk7XG5cdHJldHVybiAoIGZ4Tm93ID0galF1ZXJ5Lm5vdygpICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVR3ZWVucyggYW5pbWF0aW9uLCBwcm9wcyApIHtcblx0alF1ZXJ5LmVhY2goIHByb3BzLCBmdW5jdGlvbiggcHJvcCwgdmFsdWUgKSB7XG5cdFx0dmFyIGNvbGxlY3Rpb24gPSAoIHR3ZWVuZXJzWyBwcm9wIF0gfHwgW10gKS5jb25jYXQoIHR3ZWVuZXJzWyBcIipcIiBdICksXG5cdFx0XHRpbmRleCA9IDAsXG5cdFx0XHRsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblx0XHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrICkge1xuXHRcdFx0aWYgKCBjb2xsZWN0aW9uWyBpbmRleCBdLmNhbGwoIGFuaW1hdGlvbiwgcHJvcCwgdmFsdWUgKSApIHtcblxuXHRcdFx0XHQvLyB3ZSdyZSBkb25lIHdpdGggdGhpcyBwcm9wZXJ0eVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gQW5pbWF0aW9uKCBlbGVtLCBwcm9wZXJ0aWVzLCBvcHRpb25zICkge1xuXHR2YXIgcmVzdWx0LFxuXHRcdGluZGV4ID0gMCxcblx0XHR0d2VlbmVySW5kZXggPSAwLFxuXHRcdGxlbmd0aCA9IGFuaW1hdGlvblByZWZpbHRlcnMubGVuZ3RoLFxuXHRcdGRlZmVycmVkID0galF1ZXJ5LkRlZmVycmVkKCkuYWx3YXlzKCBmdW5jdGlvbigpIHtcblx0XHRcdC8vIGRvbid0IG1hdGNoIGVsZW0gaW4gdGhlIDphbmltYXRlZCBzZWxlY3RvclxuXHRcdFx0ZGVsZXRlIHRpY2suZWxlbTtcblx0XHR9KSxcblx0XHR0aWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgY3VycmVudFRpbWUgPSBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuXHRcdFx0XHRyZW1haW5pbmcgPSBNYXRoLm1heCggMCwgYW5pbWF0aW9uLnN0YXJ0VGltZSArIGFuaW1hdGlvbi5kdXJhdGlvbiAtIGN1cnJlbnRUaW1lICksXG5cdFx0XHRcdHBlcmNlbnQgPSAxIC0gKCByZW1haW5pbmcgLyBhbmltYXRpb24uZHVyYXRpb24gfHwgMCApLFxuXHRcdFx0XHRpbmRleCA9IDAsXG5cdFx0XHRcdGxlbmd0aCA9IGFuaW1hdGlvbi50d2VlbnMubGVuZ3RoO1xuXG5cdFx0XHRmb3IgKCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcblx0XHRcdFx0YW5pbWF0aW9uLnR3ZWVuc1sgaW5kZXggXS5ydW4oIHBlcmNlbnQgKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVmZXJyZWQubm90aWZ5V2l0aCggZWxlbSwgWyBhbmltYXRpb24sIHBlcmNlbnQsIHJlbWFpbmluZyBdKTtcblxuXHRcdFx0aWYgKCBwZXJjZW50IDwgMSAmJiBsZW5ndGggKSB7XG5cdFx0XHRcdHJldHVybiByZW1haW5pbmc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24gXSApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhbmltYXRpb24gPSBkZWZlcnJlZC5wcm9taXNlKHtcblx0XHRcdGVsZW06IGVsZW0sXG5cdFx0XHRwcm9wczogalF1ZXJ5LmV4dGVuZCgge30sIHByb3BlcnRpZXMgKSxcblx0XHRcdG9wdHM6IGpRdWVyeS5leHRlbmQoIHRydWUsIHsgc3BlY2lhbEVhc2luZzoge30gfSwgb3B0aW9ucyApLFxuXHRcdFx0b3JpZ2luYWxQcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzLFxuXHRcdFx0b3JpZ2luYWxPcHRpb25zOiBvcHRpb25zLFxuXHRcdFx0c3RhcnRUaW1lOiBmeE5vdyB8fCBjcmVhdGVGeE5vdygpLFxuXHRcdFx0ZHVyYXRpb246IG9wdGlvbnMuZHVyYXRpb24sXG5cdFx0XHR0d2VlbnM6IFtdLFxuXHRcdFx0Y3JlYXRlVHdlZW46IGZ1bmN0aW9uKCBwcm9wLCBlbmQsIGVhc2luZyApIHtcblx0XHRcdFx0dmFyIHR3ZWVuID0galF1ZXJ5LlR3ZWVuKCBlbGVtLCBhbmltYXRpb24ub3B0cywgcHJvcCwgZW5kLFxuXHRcdFx0XHRcdFx0YW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZ1sgcHJvcCBdIHx8IGFuaW1hdGlvbi5vcHRzLmVhc2luZyApO1xuXHRcdFx0XHRhbmltYXRpb24udHdlZW5zLnB1c2goIHR3ZWVuICk7XG5cdFx0XHRcdHJldHVybiB0d2Vlbjtcblx0XHRcdH0sXG5cdFx0XHRzdG9wOiBmdW5jdGlvbiggZ290b0VuZCApIHtcblx0XHRcdFx0dmFyIGluZGV4ID0gMCxcblx0XHRcdFx0XHQvLyBpZiB3ZSBhcmUgZ29pbmcgdG8gdGhlIGVuZCwgd2Ugd2FudCB0byBydW4gYWxsIHRoZSB0d2VlbnNcblx0XHRcdFx0XHQvLyBvdGhlcndpc2Ugd2Ugc2tpcCB0aGlzIHBhcnRcblx0XHRcdFx0XHRsZW5ndGggPSBnb3RvRW5kID8gYW5pbWF0aW9uLnR3ZWVucy5sZW5ndGggOiAwO1xuXG5cdFx0XHRcdGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuXHRcdFx0XHRcdGFuaW1hdGlvbi50d2VlbnNbIGluZGV4IF0ucnVuKCAxICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyByZXNvbHZlIHdoZW4gd2UgcGxheWVkIHRoZSBsYXN0IGZyYW1lXG5cdFx0XHRcdC8vIG90aGVyd2lzZSwgcmVqZWN0XG5cdFx0XHRcdGlmICggZ290b0VuZCApIHtcblx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlV2l0aCggZWxlbSwgWyBhbmltYXRpb24sIGdvdG9FbmQgXSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdFdpdGgoIGVsZW0sIFsgYW5pbWF0aW9uLCBnb3RvRW5kIF0gKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9KSxcblx0XHRwcm9wcyA9IGFuaW1hdGlvbi5wcm9wcztcblxuXHRwcm9wRmlsdGVyKCBwcm9wcywgYW5pbWF0aW9uLm9wdHMuc3BlY2lhbEVhc2luZyApO1xuXG5cdGZvciAoIDsgaW5kZXggPCBsZW5ndGggOyBpbmRleCsrICkge1xuXHRcdHJlc3VsdCA9IGFuaW1hdGlvblByZWZpbHRlcnNbIGluZGV4IF0uY2FsbCggYW5pbWF0aW9uLCBlbGVtLCBwcm9wcywgYW5pbWF0aW9uLm9wdHMgKTtcblx0XHRpZiAoIHJlc3VsdCApIHtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlVHdlZW5zKCBhbmltYXRpb24sIHByb3BzICk7XG5cblx0aWYgKCBqUXVlcnkuaXNGdW5jdGlvbiggYW5pbWF0aW9uLm9wdHMuc3RhcnQgKSApIHtcblx0XHRhbmltYXRpb24ub3B0cy5zdGFydC5jYWxsKCBlbGVtLCBhbmltYXRpb24gKTtcblx0fVxuXG5cdGpRdWVyeS5meC50aW1lcihcblx0XHRqUXVlcnkuZXh0ZW5kKCB0aWNrLCB7XG5cdFx0XHRhbmltOiBhbmltYXRpb24sXG5cdFx0XHRxdWV1ZTogYW5pbWF0aW9uLm9wdHMucXVldWUsXG5cdFx0XHRlbGVtOiBlbGVtXG5cdFx0fSlcblx0KTtcblxuXHQvLyBhdHRhY2ggY2FsbGJhY2tzIGZyb20gb3B0aW9uc1xuXHRyZXR1cm4gYW5pbWF0aW9uLnByb2dyZXNzKCBhbmltYXRpb24ub3B0cy5wcm9ncmVzcyApXG5cdFx0LmRvbmUoIGFuaW1hdGlvbi5vcHRzLmRvbmUsIGFuaW1hdGlvbi5vcHRzLmNvbXBsZXRlIClcblx0XHQuZmFpbCggYW5pbWF0aW9uLm9wdHMuZmFpbCApXG5cdFx0LmFsd2F5cyggYW5pbWF0aW9uLm9wdHMuYWx3YXlzICk7XG59XG5cbmZ1bmN0aW9uIHByb3BGaWx0ZXIoIHByb3BzLCBzcGVjaWFsRWFzaW5nICkge1xuXHR2YXIgaW5kZXgsIG5hbWUsIGVhc2luZywgdmFsdWUsIGhvb2tzO1xuXG5cdC8vIGNhbWVsQ2FzZSwgc3BlY2lhbEVhc2luZyBhbmQgZXhwYW5kIGNzc0hvb2sgcGFzc1xuXHRmb3IgKCBpbmRleCBpbiBwcm9wcyApIHtcblx0XHRuYW1lID0galF1ZXJ5LmNhbWVsQ2FzZSggaW5kZXggKTtcblx0XHRlYXNpbmcgPSBzcGVjaWFsRWFzaW5nWyBuYW1lIF07XG5cdFx0dmFsdWUgPSBwcm9wc1sgaW5kZXggXTtcblx0XHRpZiAoIGpRdWVyeS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdFx0ZWFzaW5nID0gdmFsdWVbIDEgXTtcblx0XHRcdHZhbHVlID0gcHJvcHNbIGluZGV4IF0gPSB2YWx1ZVsgMCBdO1xuXHRcdH1cblxuXHRcdGlmICggaW5kZXggIT09IG5hbWUgKSB7XG5cdFx0XHRwcm9wc1sgbmFtZSBdID0gdmFsdWU7XG5cdFx0XHRkZWxldGUgcHJvcHNbIGluZGV4IF07XG5cdFx0fVxuXG5cdFx0aG9va3MgPSBqUXVlcnkuY3NzSG9va3NbIG5hbWUgXTtcblx0XHRpZiAoIGhvb2tzICYmIFwiZXhwYW5kXCIgaW4gaG9va3MgKSB7XG5cdFx0XHR2YWx1ZSA9IGhvb2tzLmV4cGFuZCggdmFsdWUgKTtcblx0XHRcdGRlbGV0ZSBwcm9wc1sgbmFtZSBdO1xuXG5cdFx0XHQvLyBub3QgcXVpdGUgJC5leHRlbmQsIHRoaXMgd29udCBvdmVyd3JpdGUga2V5cyBhbHJlYWR5IHByZXNlbnQuXG5cdFx0XHQvLyBhbHNvIC0gcmV1c2luZyAnaW5kZXgnIGZyb20gYWJvdmUgYmVjYXVzZSB3ZSBoYXZlIHRoZSBjb3JyZWN0IFwibmFtZVwiXG5cdFx0XHRmb3IgKCBpbmRleCBpbiB2YWx1ZSApIHtcblx0XHRcdFx0aWYgKCAhKCBpbmRleCBpbiBwcm9wcyApICkge1xuXHRcdFx0XHRcdHByb3BzWyBpbmRleCBdID0gdmFsdWVbIGluZGV4IF07XG5cdFx0XHRcdFx0c3BlY2lhbEVhc2luZ1sgaW5kZXggXSA9IGVhc2luZztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzcGVjaWFsRWFzaW5nWyBuYW1lIF0gPSBlYXNpbmc7XG5cdFx0fVxuXHR9XG59XG5cbmpRdWVyeS5BbmltYXRpb24gPSBqUXVlcnkuZXh0ZW5kKCBBbmltYXRpb24sIHtcblxuXHR0d2VlbmVyOiBmdW5jdGlvbiggcHJvcHMsIGNhbGxiYWNrICkge1xuXHRcdGlmICggalF1ZXJ5LmlzRnVuY3Rpb24oIHByb3BzICkgKSB7XG5cdFx0XHRjYWxsYmFjayA9IHByb3BzO1xuXHRcdFx0cHJvcHMgPSBbIFwiKlwiIF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByb3BzID0gcHJvcHMuc3BsaXQoXCIgXCIpO1xuXHRcdH1cblxuXHRcdHZhciBwcm9wLFxuXHRcdFx0aW5kZXggPSAwLFxuXHRcdFx0bGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG5cdFx0Zm9yICggOyBpbmRleCA8IGxlbmd0aCA7IGluZGV4KysgKSB7XG5cdFx0XHRwcm9wID0gcHJvcHNbIGluZGV4IF07XG5cdFx0XHR0d2VlbmVyc1sgcHJvcCBdID0gdHdlZW5lcnNbIHByb3AgXSB8fCBbXTtcblx0XHRcdHR3ZWVuZXJzWyBwcm9wIF0udW5zaGlmdCggY2FsbGJhY2sgKTtcblx0XHR9XG5cdH0sXG5cblx0cHJlZmlsdGVyOiBmdW5jdGlvbiggY2FsbGJhY2ssIHByZXBlbmQgKSB7XG5cdFx0aWYgKCBwcmVwZW5kICkge1xuXHRcdFx0YW5pbWF0aW9uUHJlZmlsdGVycy51bnNoaWZ0KCBjYWxsYmFjayApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbmltYXRpb25QcmVmaWx0ZXJzLnB1c2goIGNhbGxiYWNrICk7XG5cdFx0fVxuXHR9XG59KTtcblxuZnVuY3Rpb24gZGVmYXVsdFByZWZpbHRlciggZWxlbSwgcHJvcHMsIG9wdHMgKSB7XG5cdHZhciBpbmRleCwgcHJvcCwgdmFsdWUsIGxlbmd0aCwgZGF0YVNob3csIHR3ZWVuLCBob29rcywgb2xkZmlyZSxcblx0XHRhbmltID0gdGhpcyxcblx0XHRzdHlsZSA9IGVsZW0uc3R5bGUsXG5cdFx0b3JpZyA9IHt9LFxuXHRcdGhhbmRsZWQgPSBbXSxcblx0XHRoaWRkZW4gPSBlbGVtLm5vZGVUeXBlICYmIGlzSGlkZGVuKCBlbGVtICk7XG5cblx0Ly8gaGFuZGxlIHF1ZXVlOiBmYWxzZSBwcm9taXNlc1xuXHRpZiAoICFvcHRzLnF1ZXVlICkge1xuXHRcdGhvb2tzID0galF1ZXJ5Ll9xdWV1ZUhvb2tzKCBlbGVtLCBcImZ4XCIgKTtcblx0XHRpZiAoIGhvb2tzLnVucXVldWVkID09IG51bGwgKSB7XG5cdFx0XHRob29rcy51bnF1ZXVlZCA9IDA7XG5cdFx0XHRvbGRmaXJlID0gaG9va3MuZW1wdHkuZmlyZTtcblx0XHRcdGhvb2tzLmVtcHR5LmZpcmUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCAhaG9va3MudW5xdWV1ZWQgKSB7XG5cdFx0XHRcdFx0b2xkZmlyZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRob29rcy51bnF1ZXVlZCsrO1xuXG5cdFx0YW5pbS5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBkb2luZyB0aGlzIG1ha2VzIHN1cmUgdGhhdCB0aGUgY29tcGxldGUgaGFuZGxlciB3aWxsIGJlIGNhbGxlZFxuXHRcdFx0Ly8gYmVmb3JlIHRoaXMgY29tcGxldGVzXG5cdFx0XHRhbmltLmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHRcdFx0aG9va3MudW5xdWV1ZWQtLTtcblx0XHRcdFx0aWYgKCAhalF1ZXJ5LnF1ZXVlKCBlbGVtLCBcImZ4XCIgKS5sZW5ndGggKSB7XG5cdFx0XHRcdFx0aG9va3MuZW1wdHkuZmlyZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIGhlaWdodC93aWR0aCBvdmVyZmxvdyBwYXNzXG5cdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gMSAmJiAoIFwiaGVpZ2h0XCIgaW4gcHJvcHMgfHwgXCJ3aWR0aFwiIGluIHByb3BzICkgKSB7XG5cdFx0Ly8gTWFrZSBzdXJlIHRoYXQgbm90aGluZyBzbmVha3Mgb3V0XG5cdFx0Ly8gUmVjb3JkIGFsbCAzIG92ZXJmbG93IGF0dHJpYnV0ZXMgYmVjYXVzZSBJRSBkb2VzIG5vdFxuXHRcdC8vIGNoYW5nZSB0aGUgb3ZlcmZsb3cgYXR0cmlidXRlIHdoZW4gb3ZlcmZsb3dYIGFuZFxuXHRcdC8vIG92ZXJmbG93WSBhcmUgc2V0IHRvIHRoZSBzYW1lIHZhbHVlXG5cdFx0b3B0cy5vdmVyZmxvdyA9IFsgc3R5bGUub3ZlcmZsb3csIHN0eWxlLm92ZXJmbG93WCwgc3R5bGUub3ZlcmZsb3dZIF07XG5cblx0XHQvLyBTZXQgZGlzcGxheSBwcm9wZXJ0eSB0byBpbmxpbmUtYmxvY2sgZm9yIGhlaWdodC93aWR0aFxuXHRcdC8vIGFuaW1hdGlvbnMgb24gaW5saW5lIGVsZW1lbnRzIHRoYXQgYXJlIGhhdmluZyB3aWR0aC9oZWlnaHQgYW5pbWF0ZWRcblx0XHRpZiAoIGpRdWVyeS5jc3MoIGVsZW0sIFwiZGlzcGxheVwiICkgPT09IFwiaW5saW5lXCIgJiZcblx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgXCJmbG9hdFwiICkgPT09IFwibm9uZVwiICkge1xuXG5cdFx0XHQvLyBpbmxpbmUtbGV2ZWwgZWxlbWVudHMgYWNjZXB0IGlubGluZS1ibG9jaztcblx0XHRcdC8vIGJsb2NrLWxldmVsIGVsZW1lbnRzIG5lZWQgdG8gYmUgaW5saW5lIHdpdGggbGF5b3V0XG5cdFx0XHRpZiAoICFqUXVlcnkuc3VwcG9ydC5pbmxpbmVCbG9ja05lZWRzTGF5b3V0IHx8IGNzc19kZWZhdWx0RGlzcGxheSggZWxlbS5ub2RlTmFtZSApID09PSBcImlubGluZVwiICkge1xuXHRcdFx0XHRzdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcblxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3R5bGUuem9vbSA9IDE7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aWYgKCBvcHRzLm92ZXJmbG93ICkge1xuXHRcdHN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcblx0XHRpZiAoICFqUXVlcnkuc3VwcG9ydC5zaHJpbmtXcmFwQmxvY2tzICkge1xuXHRcdFx0YW5pbS5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRzdHlsZS5vdmVyZmxvdyA9IG9wdHMub3ZlcmZsb3dbIDAgXTtcblx0XHRcdFx0c3R5bGUub3ZlcmZsb3dYID0gb3B0cy5vdmVyZmxvd1sgMSBdO1xuXHRcdFx0XHRzdHlsZS5vdmVyZmxvd1kgPSBvcHRzLm92ZXJmbG93WyAyIF07XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXG5cdC8vIHNob3cvaGlkZSBwYXNzXG5cdGZvciAoIGluZGV4IGluIHByb3BzICkge1xuXHRcdHZhbHVlID0gcHJvcHNbIGluZGV4IF07XG5cdFx0aWYgKCByZnh0eXBlcy5leGVjKCB2YWx1ZSApICkge1xuXHRcdFx0ZGVsZXRlIHByb3BzWyBpbmRleCBdO1xuXHRcdFx0aWYgKCB2YWx1ZSA9PT0gKCBoaWRkZW4gPyBcImhpZGVcIiA6IFwic2hvd1wiICkgKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXHRcdFx0aGFuZGxlZC5wdXNoKCBpbmRleCApO1xuXHRcdH1cblx0fVxuXG5cdGxlbmd0aCA9IGhhbmRsZWQubGVuZ3RoO1xuXHRpZiAoIGxlbmd0aCApIHtcblx0XHRkYXRhU2hvdyA9IGpRdWVyeS5fZGF0YSggZWxlbSwgXCJmeHNob3dcIiApIHx8IGpRdWVyeS5fZGF0YSggZWxlbSwgXCJmeHNob3dcIiwge30gKTtcblx0XHRpZiAoIGhpZGRlbiApIHtcblx0XHRcdGpRdWVyeSggZWxlbSApLnNob3coKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YW5pbS5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRqUXVlcnkoIGVsZW0gKS5oaWRlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0YW5pbS5kb25lKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHByb3A7XG5cdFx0XHRqUXVlcnkucmVtb3ZlRGF0YSggZWxlbSwgXCJmeHNob3dcIiwgdHJ1ZSApO1xuXHRcdFx0Zm9yICggcHJvcCBpbiBvcmlnICkge1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AsIG9yaWdbIHByb3AgXSApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGZvciAoIGluZGV4ID0gMCA7IGluZGV4IDwgbGVuZ3RoIDsgaW5kZXgrKyApIHtcblx0XHRcdHByb3AgPSBoYW5kbGVkWyBpbmRleCBdO1xuXHRcdFx0dHdlZW4gPSBhbmltLmNyZWF0ZVR3ZWVuKCBwcm9wLCBoaWRkZW4gPyBkYXRhU2hvd1sgcHJvcCBdIDogMCApO1xuXHRcdFx0b3JpZ1sgcHJvcCBdID0gZGF0YVNob3dbIHByb3AgXSB8fCBqUXVlcnkuc3R5bGUoIGVsZW0sIHByb3AgKTtcblxuXHRcdFx0aWYgKCAhKCBwcm9wIGluIGRhdGFTaG93ICkgKSB7XG5cdFx0XHRcdGRhdGFTaG93WyBwcm9wIF0gPSB0d2Vlbi5zdGFydDtcblx0XHRcdFx0aWYgKCBoaWRkZW4gKSB7XG5cdFx0XHRcdFx0dHdlZW4uZW5kID0gdHdlZW4uc3RhcnQ7XG5cdFx0XHRcdFx0dHdlZW4uc3RhcnQgPSBwcm9wID09PSBcIndpZHRoXCIgfHwgcHJvcCA9PT0gXCJoZWlnaHRcIiA/IDEgOiAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIFR3ZWVuKCBlbGVtLCBvcHRpb25zLCBwcm9wLCBlbmQsIGVhc2luZyApIHtcblx0cmV0dXJuIG5ldyBUd2Vlbi5wcm90b3R5cGUuaW5pdCggZWxlbSwgb3B0aW9ucywgcHJvcCwgZW5kLCBlYXNpbmcgKTtcbn1cbmpRdWVyeS5Ud2VlbiA9IFR3ZWVuO1xuXG5Ud2Vlbi5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBUd2Vlbixcblx0aW5pdDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIHByb3AsIGVuZCwgZWFzaW5nLCB1bml0ICkge1xuXHRcdHRoaXMuZWxlbSA9IGVsZW07XG5cdFx0dGhpcy5wcm9wID0gcHJvcDtcblx0XHR0aGlzLmVhc2luZyA9IGVhc2luZyB8fCBcInN3aW5nXCI7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLnN0YXJ0ID0gdGhpcy5ub3cgPSB0aGlzLmN1cigpO1xuXHRcdHRoaXMuZW5kID0gZW5kO1xuXHRcdHRoaXMudW5pdCA9IHVuaXQgfHwgKCBqUXVlcnkuY3NzTnVtYmVyWyBwcm9wIF0gPyBcIlwiIDogXCJweFwiICk7XG5cdH0sXG5cdGN1cjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdHJldHVybiBob29rcyAmJiBob29rcy5nZXQgP1xuXHRcdFx0aG9va3MuZ2V0KCB0aGlzICkgOlxuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LmdldCggdGhpcyApO1xuXHR9LFxuXHRydW46IGZ1bmN0aW9uKCBwZXJjZW50ICkge1xuXHRcdHZhciBlYXNlZCxcblx0XHRcdGhvb2tzID0gVHdlZW4ucHJvcEhvb2tzWyB0aGlzLnByb3AgXTtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLmR1cmF0aW9uICkge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IGpRdWVyeS5lYXNpbmdbIHRoaXMuZWFzaW5nIF0oXG5cdFx0XHRcdHBlcmNlbnQsIHRoaXMub3B0aW9ucy5kdXJhdGlvbiAqIHBlcmNlbnQsIDAsIDEsIHRoaXMub3B0aW9ucy5kdXJhdGlvblxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wb3MgPSBlYXNlZCA9IHBlcmNlbnQ7XG5cdFx0fVxuXHRcdHRoaXMubm93ID0gKCB0aGlzLmVuZCAtIHRoaXMuc3RhcnQgKSAqIGVhc2VkICsgdGhpcy5zdGFydDtcblxuXHRcdGlmICggdGhpcy5vcHRpb25zLnN0ZXAgKSB7XG5cdFx0XHR0aGlzLm9wdGlvbnMuc3RlcC5jYWxsKCB0aGlzLmVsZW0sIHRoaXMubm93LCB0aGlzICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBob29rcyAmJiBob29rcy5zZXQgKSB7XG5cdFx0XHRob29rcy5zZXQoIHRoaXMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0VHdlZW4ucHJvcEhvb2tzLl9kZWZhdWx0LnNldCggdGhpcyApO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxufTtcblxuVHdlZW4ucHJvdG90eXBlLmluaXQucHJvdG90eXBlID0gVHdlZW4ucHJvdG90eXBlO1xuXG5Ud2Vlbi5wcm9wSG9va3MgPSB7XG5cdF9kZWZhdWx0OiB7XG5cdFx0Z2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXG5cdFx0XHRpZiAoIHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSAhPSBudWxsICYmXG5cdFx0XHRcdCghdHdlZW4uZWxlbS5zdHlsZSB8fCB0d2Vlbi5lbGVtLnN0eWxlWyB0d2Vlbi5wcm9wIF0gPT0gbnVsbCkgKSB7XG5cdFx0XHRcdHJldHVybiB0d2Vlbi5lbGVtWyB0d2Vlbi5wcm9wIF07XG5cdFx0XHR9XG5cblx0XHRcdC8vIHBhc3NpbmcgYW55IHZhbHVlIGFzIGEgNHRoIHBhcmFtZXRlciB0byAuY3NzIHdpbGwgYXV0b21hdGljYWxseVxuXHRcdFx0Ly8gYXR0ZW1wdCBhIHBhcnNlRmxvYXQgYW5kIGZhbGxiYWNrIHRvIGEgc3RyaW5nIGlmIHRoZSBwYXJzZSBmYWlsc1xuXHRcdFx0Ly8gc28sIHNpbXBsZSB2YWx1ZXMgc3VjaCBhcyBcIjEwcHhcIiBhcmUgcGFyc2VkIHRvIEZsb2F0LlxuXHRcdFx0Ly8gY29tcGxleCB2YWx1ZXMgc3VjaCBhcyBcInJvdGF0ZSgxcmFkKVwiIGFyZSByZXR1cm5lZCBhcyBpcy5cblx0XHRcdHJlc3VsdCA9IGpRdWVyeS5jc3MoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIGZhbHNlLCBcIlwiICk7XG5cdFx0XHQvLyBFbXB0eSBzdHJpbmdzLCBudWxsLCB1bmRlZmluZWQgYW5kIFwiYXV0b1wiIGFyZSBjb252ZXJ0ZWQgdG8gMC5cblx0XHRcdHJldHVybiAhcmVzdWx0IHx8IHJlc3VsdCA9PT0gXCJhdXRvXCIgPyAwIDogcmVzdWx0O1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiggdHdlZW4gKSB7XG5cdFx0XHQvLyB1c2Ugc3RlcCBob29rIGZvciBiYWNrIGNvbXBhdCAtIHVzZSBjc3NIb29rIGlmIGl0cyB0aGVyZSAtIHVzZSAuc3R5bGUgaWYgaXRzXG5cdFx0XHQvLyBhdmFpbGFibGUgYW5kIHVzZSBwbGFpbiBwcm9wZXJ0aWVzIHdoZXJlIGF2YWlsYWJsZVxuXHRcdFx0aWYgKCBqUXVlcnkuZnguc3RlcFsgdHdlZW4ucHJvcCBdICkge1xuXHRcdFx0XHRqUXVlcnkuZnguc3RlcFsgdHdlZW4ucHJvcCBdKCB0d2VlbiApO1xuXHRcdFx0fSBlbHNlIGlmICggdHdlZW4uZWxlbS5zdHlsZSAmJiAoIHR3ZWVuLmVsZW0uc3R5bGVbIGpRdWVyeS5jc3NQcm9wc1sgdHdlZW4ucHJvcCBdIF0gIT0gbnVsbCB8fCBqUXVlcnkuY3NzSG9va3NbIHR3ZWVuLnByb3AgXSApICkge1xuXHRcdFx0XHRqUXVlcnkuc3R5bGUoIHR3ZWVuLmVsZW0sIHR3ZWVuLnByb3AsIHR3ZWVuLm5vdyArIHR3ZWVuLnVuaXQgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHR3ZWVuLmVsZW1bIHR3ZWVuLnByb3AgXSA9IHR3ZWVuLm5vdztcblx0XHRcdH1cblx0XHR9XG5cdH1cbn07XG5cbi8vIFJlbW92ZSBpbiAyLjAgLSB0aGlzIHN1cHBvcnRzIElFOCdzIHBhbmljIGJhc2VkIGFwcHJvYWNoXG4vLyB0byBzZXR0aW5nIHRoaW5ncyBvbiBkaXNjb25uZWN0ZWQgbm9kZXNcblxuVHdlZW4ucHJvcEhvb2tzLnNjcm9sbFRvcCA9IFR3ZWVuLnByb3BIb29rcy5zY3JvbGxMZWZ0ID0ge1xuXHRzZXQ6IGZ1bmN0aW9uKCB0d2VlbiApIHtcblx0XHRpZiAoIHR3ZWVuLmVsZW0ubm9kZVR5cGUgJiYgdHdlZW4uZWxlbS5wYXJlbnROb2RlICkge1xuXHRcdFx0dHdlZW4uZWxlbVsgdHdlZW4ucHJvcCBdID0gdHdlZW4ubm93O1xuXHRcdH1cblx0fVxufTtcblxualF1ZXJ5LmVhY2goWyBcInRvZ2dsZVwiLCBcInNob3dcIiwgXCJoaWRlXCIgXSwgZnVuY3Rpb24oIGksIG5hbWUgKSB7XG5cdHZhciBjc3NGbiA9IGpRdWVyeS5mblsgbmFtZSBdO1xuXHRqUXVlcnkuZm5bIG5hbWUgXSA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApIHtcblx0XHRyZXR1cm4gc3BlZWQgPT0gbnVsbCB8fCB0eXBlb2Ygc3BlZWQgPT09IFwiYm9vbGVhblwiIHx8XG5cdFx0XHQvLyBzcGVjaWFsIGNoZWNrIGZvciAudG9nZ2xlKCBoYW5kbGVyLCBoYW5kbGVyLCAuLi4gKVxuXHRcdFx0KCAhaSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggc3BlZWQgKSAmJiBqUXVlcnkuaXNGdW5jdGlvbiggZWFzaW5nICkgKSA/XG5cdFx0XHRjc3NGbi5hcHBseSggdGhpcywgYXJndW1lbnRzICkgOlxuXHRcdFx0dGhpcy5hbmltYXRlKCBnZW5GeCggbmFtZSwgdHJ1ZSApLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSk7XG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXHRmYWRlVG86IGZ1bmN0aW9uKCBzcGVlZCwgdG8sIGVhc2luZywgY2FsbGJhY2sgKSB7XG5cblx0XHQvLyBzaG93IGFueSBoaWRkZW4gZWxlbWVudHMgYWZ0ZXIgc2V0dGluZyBvcGFjaXR5IHRvIDBcblx0XHRyZXR1cm4gdGhpcy5maWx0ZXIoIGlzSGlkZGVuICkuY3NzKCBcIm9wYWNpdHlcIiwgMCApLnNob3coKVxuXG5cdFx0XHQvLyBhbmltYXRlIHRvIHRoZSB2YWx1ZSBzcGVjaWZpZWRcblx0XHRcdC5lbmQoKS5hbmltYXRlKHsgb3BhY2l0eTogdG8gfSwgc3BlZWQsIGVhc2luZywgY2FsbGJhY2sgKTtcblx0fSxcblx0YW5pbWF0ZTogZnVuY3Rpb24oIHByb3AsIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHZhciBlbXB0eSA9IGpRdWVyeS5pc0VtcHR5T2JqZWN0KCBwcm9wICksXG5cdFx0XHRvcHRhbGwgPSBqUXVlcnkuc3BlZWQoIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICksXG5cdFx0XHRkb0FuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBPcGVyYXRlIG9uIGEgY29weSBvZiBwcm9wIHNvIHBlci1wcm9wZXJ0eSBlYXNpbmcgd29uJ3QgYmUgbG9zdFxuXHRcdFx0XHR2YXIgYW5pbSA9IEFuaW1hdGlvbiggdGhpcywgalF1ZXJ5LmV4dGVuZCgge30sIHByb3AgKSwgb3B0YWxsICk7XG5cblx0XHRcdFx0Ly8gRW1wdHkgYW5pbWF0aW9ucyByZXNvbHZlIGltbWVkaWF0ZWx5XG5cdFx0XHRcdGlmICggZW1wdHkgKSB7XG5cdFx0XHRcdFx0YW5pbS5zdG9wKCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRyZXR1cm4gZW1wdHkgfHwgb3B0YWxsLnF1ZXVlID09PSBmYWxzZSA/XG5cdFx0XHR0aGlzLmVhY2goIGRvQW5pbWF0aW9uICkgOlxuXHRcdFx0dGhpcy5xdWV1ZSggb3B0YWxsLnF1ZXVlLCBkb0FuaW1hdGlvbiApO1xuXHR9LFxuXHRzdG9wOiBmdW5jdGlvbiggdHlwZSwgY2xlYXJRdWV1ZSwgZ290b0VuZCApIHtcblx0XHR2YXIgc3RvcFF1ZXVlID0gZnVuY3Rpb24oIGhvb2tzICkge1xuXHRcdFx0dmFyIHN0b3AgPSBob29rcy5zdG9wO1xuXHRcdFx0ZGVsZXRlIGhvb2tzLnN0b3A7XG5cdFx0XHRzdG9wKCBnb3RvRW5kICk7XG5cdFx0fTtcblxuXHRcdGlmICggdHlwZW9mIHR5cGUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHRnb3RvRW5kID0gY2xlYXJRdWV1ZTtcblx0XHRcdGNsZWFyUXVldWUgPSB0eXBlO1xuXHRcdFx0dHlwZSA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdFx0aWYgKCBjbGVhclF1ZXVlICYmIHR5cGUgIT09IGZhbHNlICkge1xuXHRcdFx0dGhpcy5xdWV1ZSggdHlwZSB8fCBcImZ4XCIsIFtdICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHZhciBkZXF1ZXVlID0gdHJ1ZSxcblx0XHRcdFx0aW5kZXggPSB0eXBlICE9IG51bGwgJiYgdHlwZSArIFwicXVldWVIb29rc1wiLFxuXHRcdFx0XHR0aW1lcnMgPSBqUXVlcnkudGltZXJzLFxuXHRcdFx0XHRkYXRhID0galF1ZXJ5Ll9kYXRhKCB0aGlzICk7XG5cblx0XHRcdGlmICggaW5kZXggKSB7XG5cdFx0XHRcdGlmICggZGF0YVsgaW5kZXggXSAmJiBkYXRhWyBpbmRleCBdLnN0b3AgKSB7XG5cdFx0XHRcdFx0c3RvcFF1ZXVlKCBkYXRhWyBpbmRleCBdICk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvciAoIGluZGV4IGluIGRhdGEgKSB7XG5cdFx0XHRcdFx0aWYgKCBkYXRhWyBpbmRleCBdICYmIGRhdGFbIGluZGV4IF0uc3RvcCAmJiBycnVuLnRlc3QoIGluZGV4ICkgKSB7XG5cdFx0XHRcdFx0XHRzdG9wUXVldWUoIGRhdGFbIGluZGV4IF0gKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yICggaW5kZXggPSB0aW1lcnMubGVuZ3RoOyBpbmRleC0tOyApIHtcblx0XHRcdFx0aWYgKCB0aW1lcnNbIGluZGV4IF0uZWxlbSA9PT0gdGhpcyAmJiAodHlwZSA9PSBudWxsIHx8IHRpbWVyc1sgaW5kZXggXS5xdWV1ZSA9PT0gdHlwZSkgKSB7XG5cdFx0XHRcdFx0dGltZXJzWyBpbmRleCBdLmFuaW0uc3RvcCggZ290b0VuZCApO1xuXHRcdFx0XHRcdGRlcXVldWUgPSBmYWxzZTtcblx0XHRcdFx0XHR0aW1lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHN0YXJ0IHRoZSBuZXh0IGluIHRoZSBxdWV1ZSBpZiB0aGUgbGFzdCBzdGVwIHdhc24ndCBmb3JjZWRcblx0XHRcdC8vIHRpbWVycyBjdXJyZW50bHkgd2lsbCBjYWxsIHRoZWlyIGNvbXBsZXRlIGNhbGxiYWNrcywgd2hpY2ggd2lsbCBkZXF1ZXVlXG5cdFx0XHQvLyBidXQgb25seSBpZiB0aGV5IHdlcmUgZ290b0VuZFxuXHRcdFx0aWYgKCBkZXF1ZXVlIHx8ICFnb3RvRW5kICkge1xuXHRcdFx0XHRqUXVlcnkuZGVxdWV1ZSggdGhpcywgdHlwZSApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTtcblxuLy8gR2VuZXJhdGUgcGFyYW1ldGVycyB0byBjcmVhdGUgYSBzdGFuZGFyZCBhbmltYXRpb25cbmZ1bmN0aW9uIGdlbkZ4KCB0eXBlLCBpbmNsdWRlV2lkdGggKSB7XG5cdHZhciB3aGljaCxcblx0XHRhdHRycyA9IHsgaGVpZ2h0OiB0eXBlIH0sXG5cdFx0aSA9IDA7XG5cblx0Ly8gaWYgd2UgaW5jbHVkZSB3aWR0aCwgc3RlcCB2YWx1ZSBpcyAxIHRvIGRvIGFsbCBjc3NFeHBhbmQgdmFsdWVzLFxuXHQvLyBpZiB3ZSBkb24ndCBpbmNsdWRlIHdpZHRoLCBzdGVwIHZhbHVlIGlzIDIgdG8gc2tpcCBvdmVyIExlZnQgYW5kIFJpZ2h0XG5cdGluY2x1ZGVXaWR0aCA9IGluY2x1ZGVXaWR0aD8gMSA6IDA7XG5cdGZvciggOyBpIDwgNCA7IGkgKz0gMiAtIGluY2x1ZGVXaWR0aCApIHtcblx0XHR3aGljaCA9IGNzc0V4cGFuZFsgaSBdO1xuXHRcdGF0dHJzWyBcIm1hcmdpblwiICsgd2hpY2ggXSA9IGF0dHJzWyBcInBhZGRpbmdcIiArIHdoaWNoIF0gPSB0eXBlO1xuXHR9XG5cblx0aWYgKCBpbmNsdWRlV2lkdGggKSB7XG5cdFx0YXR0cnMub3BhY2l0eSA9IGF0dHJzLndpZHRoID0gdHlwZTtcblx0fVxuXG5cdHJldHVybiBhdHRycztcbn1cblxuLy8gR2VuZXJhdGUgc2hvcnRjdXRzIGZvciBjdXN0b20gYW5pbWF0aW9uc1xualF1ZXJ5LmVhY2goe1xuXHRzbGlkZURvd246IGdlbkZ4KFwic2hvd1wiKSxcblx0c2xpZGVVcDogZ2VuRngoXCJoaWRlXCIpLFxuXHRzbGlkZVRvZ2dsZTogZ2VuRngoXCJ0b2dnbGVcIiksXG5cdGZhZGVJbjogeyBvcGFjaXR5OiBcInNob3dcIiB9LFxuXHRmYWRlT3V0OiB7IG9wYWNpdHk6IFwiaGlkZVwiIH0sXG5cdGZhZGVUb2dnbGU6IHsgb3BhY2l0eTogXCJ0b2dnbGVcIiB9XG59LCBmdW5jdGlvbiggbmFtZSwgcHJvcHMgKSB7XG5cdGpRdWVyeS5mblsgbmFtZSBdID0gZnVuY3Rpb24oIHNwZWVkLCBlYXNpbmcsIGNhbGxiYWNrICkge1xuXHRcdHJldHVybiB0aGlzLmFuaW1hdGUoIHByb3BzLCBzcGVlZCwgZWFzaW5nLCBjYWxsYmFjayApO1xuXHR9O1xufSk7XG5cbmpRdWVyeS5zcGVlZCA9IGZ1bmN0aW9uKCBzcGVlZCwgZWFzaW5nLCBmbiApIHtcblx0dmFyIG9wdCA9IHNwZWVkICYmIHR5cGVvZiBzcGVlZCA9PT0gXCJvYmplY3RcIiA/IGpRdWVyeS5leHRlbmQoIHt9LCBzcGVlZCApIDoge1xuXHRcdGNvbXBsZXRlOiBmbiB8fCAhZm4gJiYgZWFzaW5nIHx8XG5cdFx0XHRqUXVlcnkuaXNGdW5jdGlvbiggc3BlZWQgKSAmJiBzcGVlZCxcblx0XHRkdXJhdGlvbjogc3BlZWQsXG5cdFx0ZWFzaW5nOiBmbiAmJiBlYXNpbmcgfHwgZWFzaW5nICYmICFqUXVlcnkuaXNGdW5jdGlvbiggZWFzaW5nICkgJiYgZWFzaW5nXG5cdH07XG5cblx0b3B0LmR1cmF0aW9uID0galF1ZXJ5LmZ4Lm9mZiA/IDAgOiB0eXBlb2Ygb3B0LmR1cmF0aW9uID09PSBcIm51bWJlclwiID8gb3B0LmR1cmF0aW9uIDpcblx0XHRvcHQuZHVyYXRpb24gaW4galF1ZXJ5LmZ4LnNwZWVkcyA/IGpRdWVyeS5meC5zcGVlZHNbIG9wdC5kdXJhdGlvbiBdIDogalF1ZXJ5LmZ4LnNwZWVkcy5fZGVmYXVsdDtcblxuXHQvLyBub3JtYWxpemUgb3B0LnF1ZXVlIC0gdHJ1ZS91bmRlZmluZWQvbnVsbCAtPiBcImZ4XCJcblx0aWYgKCBvcHQucXVldWUgPT0gbnVsbCB8fCBvcHQucXVldWUgPT09IHRydWUgKSB7XG5cdFx0b3B0LnF1ZXVlID0gXCJmeFwiO1xuXHR9XG5cblx0Ly8gUXVldWVpbmdcblx0b3B0Lm9sZCA9IG9wdC5jb21wbGV0ZTtcblxuXHRvcHQuY29tcGxldGUgPSBmdW5jdGlvbigpIHtcblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHQub2xkICkgKSB7XG5cdFx0XHRvcHQub2xkLmNhbGwoIHRoaXMgKTtcblx0XHR9XG5cblx0XHRpZiAoIG9wdC5xdWV1ZSApIHtcblx0XHRcdGpRdWVyeS5kZXF1ZXVlKCB0aGlzLCBvcHQucXVldWUgKTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIG9wdDtcbn07XG5cbmpRdWVyeS5lYXNpbmcgPSB7XG5cdGxpbmVhcjogZnVuY3Rpb24oIHAgKSB7XG5cdFx0cmV0dXJuIHA7XG5cdH0sXG5cdHN3aW5nOiBmdW5jdGlvbiggcCApIHtcblx0XHRyZXR1cm4gMC41IC0gTWF0aC5jb3MoIHAqTWF0aC5QSSApIC8gMjtcblx0fVxufTtcblxualF1ZXJ5LnRpbWVycyA9IFtdO1xualF1ZXJ5LmZ4ID0gVHdlZW4ucHJvdG90eXBlLmluaXQ7XG5qUXVlcnkuZngudGljayA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgdGltZXIsXG5cdFx0dGltZXJzID0galF1ZXJ5LnRpbWVycyxcblx0XHRpID0gMDtcblxuXHRmb3IgKCA7IGkgPCB0aW1lcnMubGVuZ3RoOyBpKysgKSB7XG5cdFx0dGltZXIgPSB0aW1lcnNbIGkgXTtcblx0XHQvLyBDaGVja3MgdGhlIHRpbWVyIGhhcyBub3QgYWxyZWFkeSBiZWVuIHJlbW92ZWRcblx0XHRpZiAoICF0aW1lcigpICYmIHRpbWVyc1sgaSBdID09PSB0aW1lciApIHtcblx0XHRcdHRpbWVycy5zcGxpY2UoIGktLSwgMSApO1xuXHRcdH1cblx0fVxuXG5cdGlmICggIXRpbWVycy5sZW5ndGggKSB7XG5cdFx0alF1ZXJ5LmZ4LnN0b3AoKTtcblx0fVxufTtcblxualF1ZXJ5LmZ4LnRpbWVyID0gZnVuY3Rpb24oIHRpbWVyICkge1xuXHRpZiAoIHRpbWVyKCkgJiYgalF1ZXJ5LnRpbWVycy5wdXNoKCB0aW1lciApICYmICF0aW1lcklkICkge1xuXHRcdHRpbWVySWQgPSBzZXRJbnRlcnZhbCggalF1ZXJ5LmZ4LnRpY2ssIGpRdWVyeS5meC5pbnRlcnZhbCApO1xuXHR9XG59O1xuXG5qUXVlcnkuZnguaW50ZXJ2YWwgPSAxMztcblxualF1ZXJ5LmZ4LnN0b3AgPSBmdW5jdGlvbigpIHtcblx0Y2xlYXJJbnRlcnZhbCggdGltZXJJZCApO1xuXHR0aW1lcklkID0gbnVsbDtcbn07XG5cbmpRdWVyeS5meC5zcGVlZHMgPSB7XG5cdHNsb3c6IDYwMCxcblx0ZmFzdDogMjAwLFxuXHQvLyBEZWZhdWx0IHNwZWVkXG5cdF9kZWZhdWx0OiA0MDBcbn07XG5cbi8vIEJhY2sgQ29tcGF0IDwxLjggZXh0ZW5zaW9uIHBvaW50XG5qUXVlcnkuZnguc3RlcCA9IHt9O1xuXG5pZiAoIGpRdWVyeS5leHByICYmIGpRdWVyeS5leHByLmZpbHRlcnMgKSB7XG5cdGpRdWVyeS5leHByLmZpbHRlcnMuYW5pbWF0ZWQgPSBmdW5jdGlvbiggZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmdyZXAoalF1ZXJ5LnRpbWVycywgZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0cmV0dXJuIGVsZW0gPT09IGZuLmVsZW07XG5cdFx0fSkubGVuZ3RoO1xuXHR9O1xufVxudmFyIHJyb290ID0gL14oPzpib2R5fGh0bWwpJC9pO1xuXG5qUXVlcnkuZm4ub2Zmc2V0ID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCApIHtcblx0XHRyZXR1cm4gb3B0aW9ucyA9PT0gdW5kZWZpbmVkID9cblx0XHRcdHRoaXMgOlxuXHRcdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKCBpICkge1xuXHRcdFx0XHRqUXVlcnkub2Zmc2V0LnNldE9mZnNldCggdGhpcywgb3B0aW9ucywgaSApO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR2YXIgYm94LCBkb2NFbGVtLCBib2R5LCB3aW4sIGNsaWVudFRvcCwgY2xpZW50TGVmdCwgc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0LCB0b3AsIGxlZnQsXG5cdFx0ZWxlbSA9IHRoaXNbIDAgXSxcblx0XHRkb2MgPSBlbGVtICYmIGVsZW0ub3duZXJEb2N1bWVudDtcblxuXHRpZiAoICFkb2MgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKCAoYm9keSA9IGRvYy5ib2R5KSA9PT0gZWxlbSApIHtcblx0XHRyZXR1cm4galF1ZXJ5Lm9mZnNldC5ib2R5T2Zmc2V0KCBlbGVtICk7XG5cdH1cblxuXHRkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcblxuXHQvLyBNYWtlIHN1cmUgd2UncmUgbm90IGRlYWxpbmcgd2l0aCBhIGRpc2Nvbm5lY3RlZCBET00gbm9kZVxuXHRpZiAoICFqUXVlcnkuY29udGFpbnMoIGRvY0VsZW0sIGVsZW0gKSApIHtcblx0XHRyZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfTtcblx0fVxuXG5cdGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdHdpbiA9IGdldFdpbmRvdyggZG9jICk7XG5cdGNsaWVudFRvcCAgPSBkb2NFbGVtLmNsaWVudFRvcCAgfHwgYm9keS5jbGllbnRUb3AgIHx8IDA7XG5cdGNsaWVudExlZnQgPSBkb2NFbGVtLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG5cdHNjcm9sbFRvcCAgPSB3aW4ucGFnZVlPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxUb3A7XG5cdHNjcm9sbExlZnQgPSB3aW4ucGFnZVhPZmZzZXQgfHwgZG9jRWxlbS5zY3JvbGxMZWZ0O1xuXHR0b3AgID0gYm94LnRvcCAgKyBzY3JvbGxUb3AgIC0gY2xpZW50VG9wO1xuXHRsZWZ0ID0gYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdDtcblxuXHRyZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xufTtcblxualF1ZXJ5Lm9mZnNldCA9IHtcblxuXHRib2R5T2Zmc2V0OiBmdW5jdGlvbiggYm9keSApIHtcblx0XHR2YXIgdG9wID0gYm9keS5vZmZzZXRUb3AsXG5cdFx0XHRsZWZ0ID0gYm9keS5vZmZzZXRMZWZ0O1xuXG5cdFx0aWYgKCBqUXVlcnkuc3VwcG9ydC5kb2VzTm90SW5jbHVkZU1hcmdpbkluQm9keU9mZnNldCApIHtcblx0XHRcdHRvcCAgKz0gcGFyc2VGbG9hdCggalF1ZXJ5LmNzcyhib2R5LCBcIm1hcmdpblRvcFwiKSApIHx8IDA7XG5cdFx0XHRsZWZ0ICs9IHBhcnNlRmxvYXQoIGpRdWVyeS5jc3MoYm9keSwgXCJtYXJnaW5MZWZ0XCIpICkgfHwgMDtcblx0XHR9XG5cblx0XHRyZXR1cm4geyB0b3A6IHRvcCwgbGVmdDogbGVmdCB9O1xuXHR9LFxuXG5cdHNldE9mZnNldDogZnVuY3Rpb24oIGVsZW0sIG9wdGlvbnMsIGkgKSB7XG5cdFx0dmFyIHBvc2l0aW9uID0galF1ZXJ5LmNzcyggZWxlbSwgXCJwb3NpdGlvblwiICk7XG5cblx0XHQvLyBzZXQgcG9zaXRpb24gZmlyc3QsIGluLWNhc2UgdG9wL2xlZnQgYXJlIHNldCBldmVuIG9uIHN0YXRpYyBlbGVtXG5cdFx0aWYgKCBwb3NpdGlvbiA9PT0gXCJzdGF0aWNcIiApIHtcblx0XHRcdGVsZW0uc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG5cdFx0fVxuXG5cdFx0dmFyIGN1ckVsZW0gPSBqUXVlcnkoIGVsZW0gKSxcblx0XHRcdGN1ck9mZnNldCA9IGN1ckVsZW0ub2Zmc2V0KCksXG5cdFx0XHRjdXJDU1NUb3AgPSBqUXVlcnkuY3NzKCBlbGVtLCBcInRvcFwiICksXG5cdFx0XHRjdXJDU1NMZWZ0ID0galF1ZXJ5LmNzcyggZWxlbSwgXCJsZWZ0XCIgKSxcblx0XHRcdGNhbGN1bGF0ZVBvc2l0aW9uID0gKCBwb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiIHx8IHBvc2l0aW9uID09PSBcImZpeGVkXCIgKSAmJiBqUXVlcnkuaW5BcnJheShcImF1dG9cIiwgW2N1ckNTU1RvcCwgY3VyQ1NTTGVmdF0pID4gLTEsXG5cdFx0XHRwcm9wcyA9IHt9LCBjdXJQb3NpdGlvbiA9IHt9LCBjdXJUb3AsIGN1ckxlZnQ7XG5cblx0XHQvLyBuZWVkIHRvIGJlIGFibGUgdG8gY2FsY3VsYXRlIHBvc2l0aW9uIGlmIGVpdGhlciB0b3Agb3IgbGVmdCBpcyBhdXRvIGFuZCBwb3NpdGlvbiBpcyBlaXRoZXIgYWJzb2x1dGUgb3IgZml4ZWRcblx0XHRpZiAoIGNhbGN1bGF0ZVBvc2l0aW9uICkge1xuXHRcdFx0Y3VyUG9zaXRpb24gPSBjdXJFbGVtLnBvc2l0aW9uKCk7XG5cdFx0XHRjdXJUb3AgPSBjdXJQb3NpdGlvbi50b3A7XG5cdFx0XHRjdXJMZWZ0ID0gY3VyUG9zaXRpb24ubGVmdDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyVG9wID0gcGFyc2VGbG9hdCggY3VyQ1NTVG9wICkgfHwgMDtcblx0XHRcdGN1ckxlZnQgPSBwYXJzZUZsb2F0KCBjdXJDU1NMZWZ0ICkgfHwgMDtcblx0XHR9XG5cblx0XHRpZiAoIGpRdWVyeS5pc0Z1bmN0aW9uKCBvcHRpb25zICkgKSB7XG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucy5jYWxsKCBlbGVtLCBpLCBjdXJPZmZzZXQgKTtcblx0XHR9XG5cblx0XHRpZiAoIG9wdGlvbnMudG9wICE9IG51bGwgKSB7XG5cdFx0XHRwcm9wcy50b3AgPSAoIG9wdGlvbnMudG9wIC0gY3VyT2Zmc2V0LnRvcCApICsgY3VyVG9wO1xuXHRcdH1cblx0XHRpZiAoIG9wdGlvbnMubGVmdCAhPSBudWxsICkge1xuXHRcdFx0cHJvcHMubGVmdCA9ICggb3B0aW9ucy5sZWZ0IC0gY3VyT2Zmc2V0LmxlZnQgKSArIGN1ckxlZnQ7XG5cdFx0fVxuXG5cdFx0aWYgKCBcInVzaW5nXCIgaW4gb3B0aW9ucyApIHtcblx0XHRcdG9wdGlvbnMudXNpbmcuY2FsbCggZWxlbSwgcHJvcHMgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3VyRWxlbS5jc3MoIHByb3BzICk7XG5cdFx0fVxuXHR9XG59O1xuXG5cbmpRdWVyeS5mbi5leHRlbmQoe1xuXG5cdHBvc2l0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRpZiAoICF0aGlzWzBdICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBlbGVtID0gdGhpc1swXSxcblxuXHRcdC8vIEdldCAqcmVhbCogb2Zmc2V0UGFyZW50XG5cdFx0b2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQoKSxcblxuXHRcdC8vIEdldCBjb3JyZWN0IG9mZnNldHNcblx0XHRvZmZzZXQgICAgICAgPSB0aGlzLm9mZnNldCgpLFxuXHRcdHBhcmVudE9mZnNldCA9IHJyb290LnRlc3Qob2Zmc2V0UGFyZW50WzBdLm5vZGVOYW1lKSA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiBvZmZzZXRQYXJlbnQub2Zmc2V0KCk7XG5cblx0XHQvLyBTdWJ0cmFjdCBlbGVtZW50IG1hcmdpbnNcblx0XHQvLyBub3RlOiB3aGVuIGFuIGVsZW1lbnQgaGFzIG1hcmdpbjogYXV0byB0aGUgb2Zmc2V0TGVmdCBhbmQgbWFyZ2luTGVmdFxuXHRcdC8vIGFyZSB0aGUgc2FtZSBpbiBTYWZhcmkgY2F1c2luZyBvZmZzZXQubGVmdCB0byBpbmNvcnJlY3RseSBiZSAwXG5cdFx0b2Zmc2V0LnRvcCAgLT0gcGFyc2VGbG9hdCggalF1ZXJ5LmNzcyhlbGVtLCBcIm1hcmdpblRvcFwiKSApIHx8IDA7XG5cdFx0b2Zmc2V0LmxlZnQgLT0gcGFyc2VGbG9hdCggalF1ZXJ5LmNzcyhlbGVtLCBcIm1hcmdpbkxlZnRcIikgKSB8fCAwO1xuXG5cdFx0Ly8gQWRkIG9mZnNldFBhcmVudCBib3JkZXJzXG5cdFx0cGFyZW50T2Zmc2V0LnRvcCAgKz0gcGFyc2VGbG9hdCggalF1ZXJ5LmNzcyhvZmZzZXRQYXJlbnRbMF0sIFwiYm9yZGVyVG9wV2lkdGhcIikgKSB8fCAwO1xuXHRcdHBhcmVudE9mZnNldC5sZWZ0ICs9IHBhcnNlRmxvYXQoIGpRdWVyeS5jc3Mob2Zmc2V0UGFyZW50WzBdLCBcImJvcmRlckxlZnRXaWR0aFwiKSApIHx8IDA7XG5cblx0XHQvLyBTdWJ0cmFjdCB0aGUgdHdvIG9mZnNldHNcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiAgb2Zmc2V0LnRvcCAgLSBwYXJlbnRPZmZzZXQudG9wLFxuXHRcdFx0bGVmdDogb2Zmc2V0LmxlZnQgLSBwYXJlbnRPZmZzZXQubGVmdFxuXHRcdH07XG5cdH0sXG5cblx0b2Zmc2V0UGFyZW50OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgb2Zmc2V0UGFyZW50ID0gdGhpcy5vZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuYm9keTtcblx0XHRcdHdoaWxlICggb2Zmc2V0UGFyZW50ICYmICghcnJvb3QudGVzdChvZmZzZXRQYXJlbnQubm9kZU5hbWUpICYmIGpRdWVyeS5jc3Mob2Zmc2V0UGFyZW50LCBcInBvc2l0aW9uXCIpID09PSBcInN0YXRpY1wiKSApIHtcblx0XHRcdFx0b2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jdW1lbnQuYm9keTtcblx0XHR9KTtcblx0fVxufSk7XG5cblxuLy8gQ3JlYXRlIHNjcm9sbExlZnQgYW5kIHNjcm9sbFRvcCBtZXRob2RzXG5qUXVlcnkuZWFjaCgge3Njcm9sbExlZnQ6IFwicGFnZVhPZmZzZXRcIiwgc2Nyb2xsVG9wOiBcInBhZ2VZT2Zmc2V0XCJ9LCBmdW5jdGlvbiggbWV0aG9kLCBwcm9wICkge1xuXHR2YXIgdG9wID0gL1kvLnRlc3QoIHByb3AgKTtcblxuXHRqUXVlcnkuZm5bIG1ldGhvZCBdID0gZnVuY3Rpb24oIHZhbCApIHtcblx0XHRyZXR1cm4galF1ZXJ5LmFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIG1ldGhvZCwgdmFsICkge1xuXHRcdFx0dmFyIHdpbiA9IGdldFdpbmRvdyggZWxlbSApO1xuXG5cdFx0XHRpZiAoIHZhbCA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRyZXR1cm4gd2luID8gKHByb3AgaW4gd2luKSA/IHdpblsgcHJvcCBdIDpcblx0XHRcdFx0XHR3aW4uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50WyBtZXRob2QgXSA6XG5cdFx0XHRcdFx0ZWxlbVsgbWV0aG9kIF07XG5cdFx0XHR9XG5cblx0XHRcdGlmICggd2luICkge1xuXHRcdFx0XHR3aW4uc2Nyb2xsVG8oXG5cdFx0XHRcdFx0IXRvcCA/IHZhbCA6IGpRdWVyeSggd2luICkuc2Nyb2xsTGVmdCgpLFxuXHRcdFx0XHRcdCB0b3AgPyB2YWwgOiBqUXVlcnkoIHdpbiApLnNjcm9sbFRvcCgpXG5cdFx0XHRcdCk7XG5cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1bIG1ldGhvZCBdID0gdmFsO1xuXHRcdFx0fVxuXHRcdH0sIG1ldGhvZCwgdmFsLCBhcmd1bWVudHMubGVuZ3RoLCBudWxsICk7XG5cdH07XG59KTtcblxuZnVuY3Rpb24gZ2V0V2luZG93KCBlbGVtICkge1xuXHRyZXR1cm4galF1ZXJ5LmlzV2luZG93KCBlbGVtICkgP1xuXHRcdGVsZW0gOlxuXHRcdGVsZW0ubm9kZVR5cGUgPT09IDkgP1xuXHRcdFx0ZWxlbS5kZWZhdWx0VmlldyB8fCBlbGVtLnBhcmVudFdpbmRvdyA6XG5cdFx0XHRmYWxzZTtcbn1cbi8vIENyZWF0ZSBpbm5lckhlaWdodCwgaW5uZXJXaWR0aCwgaGVpZ2h0LCB3aWR0aCwgb3V0ZXJIZWlnaHQgYW5kIG91dGVyV2lkdGggbWV0aG9kc1xualF1ZXJ5LmVhY2goIHsgSGVpZ2h0OiBcImhlaWdodFwiLCBXaWR0aDogXCJ3aWR0aFwiIH0sIGZ1bmN0aW9uKCBuYW1lLCB0eXBlICkge1xuXHRqUXVlcnkuZWFjaCggeyBwYWRkaW5nOiBcImlubmVyXCIgKyBuYW1lLCBjb250ZW50OiB0eXBlLCBcIlwiOiBcIm91dGVyXCIgKyBuYW1lIH0sIGZ1bmN0aW9uKCBkZWZhdWx0RXh0cmEsIGZ1bmNOYW1lICkge1xuXHRcdC8vIG1hcmdpbiBpcyBvbmx5IGZvciBvdXRlckhlaWdodCwgb3V0ZXJXaWR0aFxuXHRcdGpRdWVyeS5mblsgZnVuY05hbWUgXSA9IGZ1bmN0aW9uKCBtYXJnaW4sIHZhbHVlICkge1xuXHRcdFx0dmFyIGNoYWluYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggJiYgKCBkZWZhdWx0RXh0cmEgfHwgdHlwZW9mIG1hcmdpbiAhPT0gXCJib29sZWFuXCIgKSxcblx0XHRcdFx0ZXh0cmEgPSBkZWZhdWx0RXh0cmEgfHwgKCBtYXJnaW4gPT09IHRydWUgfHwgdmFsdWUgPT09IHRydWUgPyBcIm1hcmdpblwiIDogXCJib3JkZXJcIiApO1xuXG5cdFx0XHRyZXR1cm4galF1ZXJ5LmFjY2VzcyggdGhpcywgZnVuY3Rpb24oIGVsZW0sIHR5cGUsIHZhbHVlICkge1xuXHRcdFx0XHR2YXIgZG9jO1xuXG5cdFx0XHRcdGlmICggalF1ZXJ5LmlzV2luZG93KCBlbGVtICkgKSB7XG5cdFx0XHRcdFx0Ly8gQXMgb2YgNS84LzIwMTIgdGhpcyB3aWxsIHlpZWxkIGluY29ycmVjdCByZXN1bHRzIGZvciBNb2JpbGUgU2FmYXJpLCBidXQgdGhlcmVcblx0XHRcdFx0XHQvLyBpc24ndCBhIHdob2xlIGxvdCB3ZSBjYW4gZG8uIFNlZSBwdWxsIHJlcXVlc3QgYXQgdGhpcyBVUkwgZm9yIGRpc2N1c3Npb246XG5cdFx0XHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvcHVsbC83NjRcblx0XHRcdFx0XHRyZXR1cm4gZWxlbS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbIFwiY2xpZW50XCIgKyBuYW1lIF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBHZXQgZG9jdW1lbnQgd2lkdGggb3IgaGVpZ2h0XG5cdFx0XHRcdGlmICggZWxlbS5ub2RlVHlwZSA9PT0gOSApIHtcblx0XHRcdFx0XHRkb2MgPSBlbGVtLmRvY3VtZW50RWxlbWVudDtcblxuXHRcdFx0XHRcdC8vIEVpdGhlciBzY3JvbGxbV2lkdGgvSGVpZ2h0XSBvciBvZmZzZXRbV2lkdGgvSGVpZ2h0XSBvciBjbGllbnRbV2lkdGgvSGVpZ2h0XSwgd2hpY2hldmVyIGlzIGdyZWF0ZXN0XG5cdFx0XHRcdFx0Ly8gdW5mb3J0dW5hdGVseSwgdGhpcyBjYXVzZXMgYnVnICMzODM4IGluIElFNi84IG9ubHksIGJ1dCB0aGVyZSBpcyBjdXJyZW50bHkgbm8gZ29vZCwgc21hbGwgd2F5IHRvIGZpeCBpdC5cblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5tYXgoXG5cdFx0XHRcdFx0XHRlbGVtLmJvZHlbIFwic2Nyb2xsXCIgKyBuYW1lIF0sIGRvY1sgXCJzY3JvbGxcIiArIG5hbWUgXSxcblx0XHRcdFx0XHRcdGVsZW0uYm9keVsgXCJvZmZzZXRcIiArIG5hbWUgXSwgZG9jWyBcIm9mZnNldFwiICsgbmFtZSBdLFxuXHRcdFx0XHRcdFx0ZG9jWyBcImNsaWVudFwiICsgbmFtZSBdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID9cblx0XHRcdFx0XHQvLyBHZXQgd2lkdGggb3IgaGVpZ2h0IG9uIHRoZSBlbGVtZW50LCByZXF1ZXN0aW5nIGJ1dCBub3QgZm9yY2luZyBwYXJzZUZsb2F0XG5cdFx0XHRcdFx0alF1ZXJ5LmNzcyggZWxlbSwgdHlwZSwgdmFsdWUsIGV4dHJhICkgOlxuXG5cdFx0XHRcdFx0Ly8gU2V0IHdpZHRoIG9yIGhlaWdodCBvbiB0aGUgZWxlbWVudFxuXHRcdFx0XHRcdGpRdWVyeS5zdHlsZSggZWxlbSwgdHlwZSwgdmFsdWUsIGV4dHJhICk7XG5cdFx0XHR9LCB0eXBlLCBjaGFpbmFibGUgPyBtYXJnaW4gOiB1bmRlZmluZWQsIGNoYWluYWJsZSwgbnVsbCApO1xuXHRcdH07XG5cdH0pO1xufSk7XG4vLyBFeHBvc2UgalF1ZXJ5IHRvIHRoZSBnbG9iYWwgb2JqZWN0XG53aW5kb3cualF1ZXJ5ID0gd2luZG93LiQgPSBqUXVlcnk7XG5cbi8vIEV4cG9zZSBqUXVlcnkgYXMgYW4gQU1EIG1vZHVsZSwgYnV0IG9ubHkgZm9yIEFNRCBsb2FkZXJzIHRoYXRcbi8vIHVuZGVyc3RhbmQgdGhlIGlzc3VlcyB3aXRoIGxvYWRpbmcgbXVsdGlwbGUgdmVyc2lvbnMgb2YgalF1ZXJ5XG4vLyBpbiBhIHBhZ2UgdGhhdCBhbGwgbWlnaHQgY2FsbCBkZWZpbmUoKS4gVGhlIGxvYWRlciB3aWxsIGluZGljYXRlXG4vLyB0aGV5IGhhdmUgc3BlY2lhbCBhbGxvd2FuY2VzIGZvciBtdWx0aXBsZSBqUXVlcnkgdmVyc2lvbnMgYnlcbi8vIHNwZWNpZnlpbmcgZGVmaW5lLmFtZC5qUXVlcnkgPSB0cnVlLiBSZWdpc3RlciBhcyBhIG5hbWVkIG1vZHVsZSxcbi8vIHNpbmNlIGpRdWVyeSBjYW4gYmUgY29uY2F0ZW5hdGVkIHdpdGggb3RoZXIgZmlsZXMgdGhhdCBtYXkgdXNlIGRlZmluZSxcbi8vIGJ1dCBub3QgdXNlIGEgcHJvcGVyIGNvbmNhdGVuYXRpb24gc2NyaXB0IHRoYXQgdW5kZXJzdGFuZHMgYW5vbnltb3VzXG4vLyBBTUQgbW9kdWxlcy4gQSBuYW1lZCBBTUQgaXMgc2FmZXN0IGFuZCBtb3N0IHJvYnVzdCB3YXkgdG8gcmVnaXN0ZXIuXG4vLyBMb3dlcmNhc2UganF1ZXJ5IGlzIHVzZWQgYmVjYXVzZSBBTUQgbW9kdWxlIG5hbWVzIGFyZSBkZXJpdmVkIGZyb21cbi8vIGZpbGUgbmFtZXMsIGFuZCBqUXVlcnkgaXMgbm9ybWFsbHkgZGVsaXZlcmVkIGluIGEgbG93ZXJjYXNlIGZpbGUgbmFtZS5cbi8vIERvIHRoaXMgYWZ0ZXIgY3JlYXRpbmcgdGhlIGdsb2JhbCBzbyB0aGF0IGlmIGFuIEFNRCBtb2R1bGUgd2FudHMgdG8gY2FsbFxuLy8gbm9Db25mbGljdCB0byBoaWRlIHRoaXMgdmVyc2lvbiBvZiBqUXVlcnksIGl0IHdpbGwgd29yay5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQgJiYgZGVmaW5lLmFtZC5qUXVlcnkgKSB7XG5cdGRlZmluZSggXCJqcXVlcnlcIiwgW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGpRdWVyeTsgfSApO1xufVxuXG5yZXR1cm4galF1ZXJ5O1xuXG59KSggd2luZG93ICk7IH0pKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJjb25zdCBpc19wcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFJFRF9DSEFUX0NPTE9SOiAncmVkJyxcbiAgICBCTFVFX0NIQVRfQ09MT1I6ICdkb2RnZXJibHVlJyxcbiAgICBZRUxMT1dfQ0hBVF9DT0xPUjogJyNmMGUxMzAnLFxuICAgIFNUQVJUSU5HX0dPTEQ6IGlzX3Byb2R1Y3Rpb24gPyAxMDAwIDogMTAwMDAwLFxuICAgIEJVSUxEX1JBTkdFOiAzLFxuICAgIEJVSUxESU5HX1ZJU0lPTl9SQU5HRTogNSxcbiAgICBUSU1FX0lOX1NFQ09ORFNfQkVGT1JFX0dBTUVfU1RBUlQ6IGlzX3Byb2R1Y3Rpb24gPyAxMCA6IDMsXG4gICAgSVNfUFJPRFVDVElPTjogaXNfcHJvZHVjdGlvbixcbiAgICBQUk9CRV9SQU5HRTogMSxcbiAgICBCUlVTSF9WSVNJT046IDIsXG4gICAgTUFQX1RJTEVfRFJBV19YX01VTFRJUExJRVI6IDk2LFxuICAgIE1BUF9USUxFX0RSQVdfWV9NVUxUSVBMSUVSOiAxMTEsXG4gICAgUEhBU0VfQUNUSU9OOiAncGhhc2VfYWN0aW9uJyxcbiAgICBQSEFTRV9QTEFOTklORzogJ3BoYXNlX3BsYW5uaW5nJyxcbiAgICBQTEFOTklOR19USU1FOiBpc19wcm9kdWN0aW9uID8gMjAgOiA1LFxuICAgIEFDVElPTl9NQVhfVElNRTogMTAsXG4gICAgUEVSQ0VOVEFHRV9DTEFJTV9UT19XSU46IDAuMzUsXG4gICAgVElNRV9CRUZPUkVfQUNUSU9OX1RPX1BMQU5OSU5HOiBpc19wcm9kdWN0aW9uID8gMSA6IDBcbn07XG4iLCJjb25zdCBDb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jbGFzcyBUdXBsZSB7XG4gICAgY29uc3RydWN0b3IgKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG5cbiAgICB0b0N1YmVDb29yZGluYXRlcygpIHtcbiAgICAgICAgY29uc3QgY3ViZXggPSB0aGlzLng7XG4gICAgICAgIGNvbnN0IGN1YmV6ID0gdGhpcy55IC0gKHRoaXMueCAtIHRoaXMueCAlIDIpIC8gMjtcbiAgICAgICAgY29uc3QgY3ViZXkgPSAtIGN1YmV4IC0gY3ViZXo7XG4gICAgICAgIHJldHVybiBuZXcgVHJpcGxlKGN1YmV4LCBjdWJleSwgY3ViZXopO1xuICAgIH1cblxuICAgIGVxdWFscyhvdGhlcikge1xuICAgICAgICByZXR1cm4gdGhpcy54ID09PSBvdGhlci54ICYmIHRoaXMueSA9PT0gb3RoZXIueTtcbiAgICB9XG5cbiAgICBoYXNoKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcyk7XG4gICAgfVxuICAgIFxuICAgIGNvcHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVHVwbGUodGhpcy54LCB0aGlzLnkpO1xuICAgIH1cblxuICAgIGRpc3RhbmNlKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvQ3ViZUNvb3JkaW5hdGVzKCkuZGlzdGFuY2UobmV3IFR1cGxlKG90aGVyLngsIG90aGVyLnkpLnRvQ3ViZUNvb3JkaW5hdGVzKCkpO1xuICAgIH1cblxuICAgIHRvVGlsZUNvb3JkKCkge1xuICAgICAgICBjb25zdCBYWVZlcnRleCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBzID0gQ29uc3RhbnRzLk1BUF9USUxFX0RSQVdfWF9NVUxUSVBMSUVSICogKDIgLyAzKTtcbiAgICAgICAgY29uc3QgdCA9IENvbnN0YW50cy5NQVBfVElMRV9EUkFXX1hfTVVMVElQTElFUiAvIDM7XG4gICAgICAgIGNvbnN0IHIgPSBDb25zdGFudHMuTUFQX1RJTEVfRFJBV19ZX01VTFRJUExJRVIgLyAyO1xuICAgICAgICBjb25zdCBoID0gQ29uc3RhbnRzLk1BUF9USUxFX0RSQVdfWV9NVUxUSVBMSUVSO1xuICAgICAgICBsZXQgbXggPSBwYXJzZUludCh0aGlzLngpICsgNjQ7XG4gICAgICAgIGNvbnN0IG15ID0gcGFyc2VJbnQodGhpcy55KSArIDU1O1xuXG4gICAgICAgIC8vY29ycmVjdGlvbiBmb3IgQk9SREVSUyBhbmQgWFlWZXJ0ZXhcbiAgICAgICAgaWYgKFhZVmVydGV4KSBteCArPSB0O1xuXG4gICAgICAgIGxldCB4ID0gcGFyc2VJbnQobXggLyAocyArIHQpKTsgLy90aGlzIGdpdmVzIGEgcXVpY2sgdmFsdWUgZm9yIHguIEl0IHdvcmtzIG9ubHkgb24gb2RkIGNvbHMgYW5kIGRvZXNuJ3QgaGFuZGxlIHRoZSB0cmlhbmdsZSBzZWN0aW9ucy4gSXQgYXNzdW1lcyB0aGF0IHRoZSBoZXhhZ29uIGlzIGEgcmVjdGFuZ2xlIHdpdGggd2lkdGggcyt0ICg9MS41KnMpLlxuICAgICAgICBsZXQgeSA9IHBhcnNlSW50KChteSAtICh4ICUgMikgKiByKSAvIGgpOyAvL3RoaXMgZ2l2ZXMgdGhlIHJvdyBlYXNpbHkuIEl0IG5lZWRzIHRvIGJlIG9mZnNldCBieSBoLzIgKD1yKWlmIGl0IGlzIGluIGFuIGV2ZW4gY29sdW1uXG5cbiAgICAgICAgLyoqKioqKkZJWCBmb3IgY2xpY2tpbmcgaW4gdGhlIHRyaWFuZ2xlIHNwYWNlcyAob24gdGhlIGxlZnQgc2lkZSBvbmx5KSoqKioqKiovXG4gICAgICAgIC8vZHgsZHkgYXJlIHRoZSBudW1iZXIgb2YgcGl4ZWxzIGZyb20gdGhlIGhleCBib3VuZGFyeS4gKGllLiByZWxhdGl2ZSB0byB0aGUgaGV4IGNsaWNrZWQgaW4pXG4gICAgICAgIGNvbnN0IGR4ID0gbXggLSB4ICogKHMgKyB0KTtcbiAgICAgICAgY29uc3QgZHkgPSBteSAtIHkgKiBoO1xuICAgICAgICBsZXQgcmVzdWx0ID0gVHVwbGUuTkVHX09ORTtcbiAgICAgICAgaWYgKG15IC0gKHggJSAyKSAqIHIgPiAwKSB7IC8vcHJldmVudCBjbGlja2luZyBoYWxmIGVtcHR5XG4gICAgICAgICAgICBpZiAoeCAlIDIgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoZHkgPiByKSB7XHQvL2JvdHRvbSBoYWxmIG9mIGhleGVzXG4gICAgICAgICAgICAgICAgICAgIGlmIChkeCAqIHIgLyB0IDwgZHkgLSByKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4LS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGR5IDwgcikge1x0Ly90b3AgaGFsZiBvZiBoZXhlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHQgLSBkeCkgKiByIC8gdCA+IGR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4LS07XG4gICAgICAgICAgICAgICAgICAgICAgICB5LS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHsgIC8vIG9kZCBjb2x1bW5zXG4gICAgICAgICAgICAgICAgaWYgKGR5ID4gaCkge1x0Ly9ib3R0b20gaGFsZiBvZiBoZXhlc1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHggKiByIC8gdCA8IGR5IC0gaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgeSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkeSA8IGgpIHtcdC8vdG9wIGhhbGYgb2YgaGV4ZXNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCh0IC0gZHgpICogciAvIHQgPiBkeSAtIHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHgtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBUdXBsZSh4LCB5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuVHVwbGUuWkVSTyA9IG5ldyBUdXBsZSgwLCAwKTtcblR1cGxlLk5FR19PTkUgPSBuZXcgVHVwbGUoLTEsIC0xKTtcblxubW9kdWxlLmV4cG9ydHMuVHVwbGUgPSBUdXBsZTtcblxuY2xhc3MgVHJpcGxlIHtcbiAgICBjb25zdHJ1Y3RvciAoeCwgeSwgeikge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnogPSB6O1xuICAgIH1cblxuICAgIHRvT2Zmc2V0Q29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IGN1YmV4ID0gdGhpcy54O1xuICAgICAgICBjb25zdCBjdWJleSA9IHRoaXMueiArICh0aGlzLnggLSB0aGlzLnggJSAyKSAvIDI7XG4gICAgICAgIHJldHVybiBuZXcgVHVwbGUoY3ViZXgsIGN1YmV5KTtcbiAgICB9XG5cbiAgICBnZXROZWlnaGJvdXJzKCkge1xuICAgICAgICByZXR1cm4gc3Vycm91bmRpbmdUcmlwbGUodGhpcywgMSk7XG4gICAgfVxuXG4gICAgZXF1YWxzKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggPT09IG90aGVyLnggJiYgdGhpcy55ID09PSBvdGhlci55ICYmIHRoaXMueiA9PT0gb3RoZXIuejtcbiAgICB9XG5cbiAgICBoYXNoKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcyk7XG4gICAgfVxuXG4gICAgZGlzdGFuY2Uob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLmFicyh0aGlzLnggLSBvdGhlci54KSArIE1hdGguYWJzKHRoaXMueSAtIG90aGVyLnkpICsgTWF0aC5hYnModGhpcy56IC0gb3RoZXIueikpIC8gMjtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzLlRyaXBsZSA9IFRyaXBsZTtcblxuZnVuY3Rpb24gc3Vycm91bmRpbmdUcmlwbGUoYSwgd2lkdGgpIHtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgZm9yIChsZXQgZHggPSAtd2lkdGg7IGR4IDw9IHdpZHRoOyBkeCsrKSB7XG4gICAgICAgIGZvciAobGV0IGR5ID0gTWF0aC5tYXgoLXdpZHRoLCAtZHggLSB3aWR0aCk7XG4gICAgICAgICAgICBkeSA8PSBNYXRoLm1pbih3aWR0aCwgLWR4ICsgd2lkdGgpOyBkeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkeiA9IC1keCAtIGR5O1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG5ldyBUcmlwbGUoYS54ICsgZHgsIGEueSArIGR5LCBhLnogKyBkeikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xufVxubW9kdWxlLmV4cG9ydHMuZ2V0U3Vycm91bmRpbmcgPSAoYSwgd2lkdGgpID0+IHtcbiAgICBhID0gbmV3IFR1cGxlKGEueCwgYS55KS50b0N1YmVDb29yZGluYXRlcygpO1xuICAgIHJldHVybiBzdXJyb3VuZGluZ1RyaXBsZShhLCB3aWR0aCkubWFwKG4gPT4gbi50b09mZnNldENvb3JkaW5hdGVzKCkpO1xufTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0UmVhY2hhYmxlID0gKHN0YXJ0LCBtYXgsIGlzQmxvY2spID0+IHtcbiAgICBzdGFydCA9IG5ldyBUdXBsZShzdGFydC54LCBzdGFydC55KS50b0N1YmVDb29yZGluYXRlcygpO1xuICAgIC8qIERpc3RhbmNlIGxpbWl0ZWQgZmxvb2QgZmlsbCAqL1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgdmlzaXRlZC5hZGQoSlNPTi5zdHJpbmdpZnkoc3RhcnQpKTtcbiAgICByZXN1bHQucHVzaChzdGFydC50b09mZnNldENvb3JkaW5hdGVzKCkpO1xuICAgIGNvbnN0IGZyaW5nZXMgPSBbXTtcbiAgICBmcmluZ2VzLnB1c2goW3N0YXJ0XSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgIGZyaW5nZXMucHVzaChbXSk7XG4gICAgICAgIGZyaW5nZXNbaV0uZm9yRWFjaCgoaGV4KSA9PiB7XG4gICAgICAgICAgICBoZXguZ2V0TmVpZ2hib3VycygpLmZvckVhY2goKG5laWdoYm91cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5laWdoYm91clN0cmluZyA9IEpTT04uc3RyaW5naWZ5KG5laWdoYm91cik7XG4gICAgICAgICAgICAgICAgaWYgKCF2aXNpdGVkLmhhcyhuZWlnaGJvdXJTdHJpbmcpICYmXG4gICAgICAgICAgICAgICAgICAgICFpc0Jsb2NrKG5laWdoYm91ci50b09mZnNldENvb3JkaW5hdGVzKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpc2l0ZWQuYWRkKG5laWdoYm91clN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5laWdoYm91ci50b09mZnNldENvb3JkaW5hdGVzKCkpO1xuICAgICAgICAgICAgICAgICAgICBmcmluZ2VzW2kgKyAxXS5wdXNoKG5laWdoYm91cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxubW9kdWxlLmV4cG9ydHMudHVwbGVEaXN0YW5jZSA9IChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBUdXBsZShhLngsIGEueSkuZGlzdGFuY2UoYik7XG59O1xuIiwiY29uc3QgQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3Qgc3RydWN0dXJlcyA9IHtcbiAgICAnQ29tbWFuZCBCYXNlJzoge1xuICAgICAgICAnZGVzY3JpcHRpb24nOiAnTWFpbiBCYXNlLiBEZWZlbmQgeW91cnMgd2hpbGUgZGVzdHJveWluZyBvcHBvbmVudFxcJ3MuJyxcbiAgICAgICAgJ2hlYWx0aCc6IDI1MCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICd3aWR0aCc6IDEsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiAwLFxuICAgICAgICAnb3B0aW9ucyc6XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAnU3Bhd24gU2NvdXQnLFxuICAgICAgICAgICAgICAgICAgICAnY29zdCc6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgJ3ByZXJlcSc6IFtdLFxuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdVbml0JyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ3tTY291dH0nLFxuICAgICAgICAgICAgICAgICAgICAnaWNvbic6ICd7U2NvdXR9JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1hbmQnOiAnc3Bhd24tU2NvdXQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdTcGF3biBFbmdpbmVlcicsXG4gICAgICAgICAgICAgICAgICAgICdjb3N0JzogMzAwLFxuICAgICAgICAgICAgICAgICAgICAncHJlcmVxJzogW10sXG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ1VuaXQnLFxuICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAne0VuZ2luZWVyfScsXG4gICAgICAgICAgICAgICAgICAgICdpY29uJzogJ3tFbmdpbmVlcn0nLFxuICAgICAgICAgICAgICAgICAgICAnY29tbWFuZCc6ICdzcGF3bi1FbmdpbmVlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAndGFyZ2V0YWJsZSc6IGZhbHNlXG4gICAgfSxcbiAgICAnQmFycmFja3MnOiB7XG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdVbml0IHByb2R1Y3Rpb24gYnVpbGRpbmcsIHRyYWlucyB0aWVyIDIgdW5pdHMuJyxcbiAgICAgICAgJ2hlYWx0aCc6IDIwMCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICd3aWR0aCc6IDAsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiAxLFxuICAgICAgICAnb3B0aW9ucyc6XG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAnU3Bhd24gTWFyaW5lJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Nvc3QnOiAyNTAsXG4gICAgICAgICAgICAgICAgICAgICdwcmVyZXEnOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnOiAnVW5pdCcsXG4gICAgICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICd7TWFyaW5lfScsXG4gICAgICAgICAgICAgICAgICAgICdpY29uJzogJ3tNYXJpbmV9JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1hbmQnOiAnc3Bhd24tTWFyaW5lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAnU3Bhd24gR29sZW0nLFxuICAgICAgICAgICAgICAgICAgICAnY29zdCc6IDI1MCxcbiAgICAgICAgICAgICAgICAgICAgJ3ByZXJlcSc6IFtdLFxuICAgICAgICAgICAgICAgICAgICAndHlwZSc6ICdVbml0JyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ3tHb2xlbX0nLFxuICAgICAgICAgICAgICAgICAgICAnaWNvbic6ICd7R29sZW19JyxcbiAgICAgICAgICAgICAgICAgICAgJ2NvbW1hbmQnOiAnc3Bhd24tR29sZW0nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdTcGF3biBSZWF2ZXInLFxuICAgICAgICAgICAgICAgICAgICAnY29zdCc6IDUwMCxcbiAgICAgICAgICAgICAgICAgICAgJ3ByZXJlcSc6IFsnQXV0b21hdGlvbiBGYWN0b3J5J10sXG4gICAgICAgICAgICAgICAgICAgICd0eXBlJzogJ1VuaXQnLFxuICAgICAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAne1JlYXZlcn0nLFxuICAgICAgICAgICAgICAgICAgICAnaWNvbic6ICd7UmVhdmVyfScsXG4gICAgICAgICAgICAgICAgICAgICdjb21tYW5kJzogJ3NwYXduLVJlYXZlcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgfSxcbiAgICAnQXV0b21hdGlvbiBGYWN0b3J5Jzoge1xuICAgICAgICAnZGVzY3JpcHRpb24nOiAnU3VwcG9ydCBmYWNpbGl0eSwgcmVxdWlyZWQgZm9yIGJ1aWxkaW5nIHR1cnJldHMgYW5kIHJlYXZlcnMuJyxcbiAgICAgICAgJ2hlYWx0aCc6IDc1LFxuICAgICAgICAnc2hpZWxkJzogMCxcbiAgICAgICAgJ3dpZHRoJzogMCxcbiAgICAgICAgJ3R1cm5zVG9CdWlsZCc6IDEsXG4gICAgICAgICdvcHRpb25zJzogW11cbiAgICB9LFxuICAgICdUZWNoIExhYic6IHtcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1N1cHBvcnQgZmFjaWxpdHksIHVzZWQgZm9yIGFjY2Vzc2luZyB0aWVyIDMgdW5pdHMuJyxcbiAgICAgICAgJ2hlYWx0aCc6IDEwMCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICd3aWR0aCc6IDAsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiAxLFxuICAgICAgICAnb3B0aW9ucyc6IFtdLFxuICAgIH0sXG4gICAgJ01pbGl0YXJ5IEFjYWRlbXknOiB7XG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdTdXBwb3J0IGZhY2lsaXR5LCB1c2VkIGZvciBhY2Nlc3NpbmcgdGllciA0IHVuaXRzLicsXG4gICAgICAgICdoZWFsdGgnOiAxMDAsXG4gICAgICAgICdzaGllbGQnOiAwLFxuICAgICAgICAnd2lkdGgnOiAwLFxuICAgICAgICAndHVybnNUb0J1aWxkJzogMSxcbiAgICAgICAgJ29wdGlvbnMnOiBbXSxcbiAgICB9LFxuICAgICdEZXBsb3ltZW50IE91dHBvc3QnOiB7XG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdDbGFpbXMgdGVycml0b3J5IGFuZCBhbGxvd3MgZXhwYW5zaW9uIG9mIGJ1aWxkaW5ncyBhd2F5IGZyb20gdGhlIGNvbW1hbmQgY2VudGVyLicsXG4gICAgICAgICdoZWFsdGgnOiAyMDAsXG4gICAgICAgICdzaGllbGQnOiAwLFxuICAgICAgICAnd2lkdGgnOiAwLFxuICAgICAgICAndHVybnNUb0J1aWxkJzogMSxcbiAgICAgICAgJ29wdGlvbnMnOiBbXSxcbiAgICB9LFxuICAgICdFdGhlciBIYXJ2ZXN0ZXInOiB7XG4gICAgICAgIC8vIFRoZSBoYXJ2ZXN0ZXIgaGVhbHRoIHJlcHJlc2VudHMgYW1vdW50IG9mIGdvbGQgcHJvdmlkZWQuXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdIYXJ2ZXN0ZXIgZm9yIHNtYWxsLCBibHVlIG1pbmVyYWxzLicsXG4gICAgICAgICdoZWFsdGgnOiAxMDAwMCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICd3aWR0aCc6IDAsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiAwLFxuICAgICAgICAnb3B0aW9ucyc6IFtdLFxuICAgICAgICAnY3VzdG9tJzoge1xuICAgICAgICAgICAgJ3ZhbHVlJzogMTAwXG4gICAgICAgIH0sXG4gICAgICAgICd0YXJnZXRhYmxlJzogZmFsc2VcbiAgICB9LFxuICAgICdHZW0gSGFydmVzdGVyJzoge1xuICAgICAgICAnZGVzY3JpcHRpb24nOiAnSGFydmVzdGVyIGZvciBsYXJnZSwgcHVycGxlIG1pbmVyYWxzLicsXG4gICAgICAgICdoZWFsdGgnOiAxNTAwMCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICd3aWR0aCc6IDAsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiAwLFxuICAgICAgICAnb3B0aW9ucyc6IFtdLFxuICAgICAgICAnY3VzdG9tJzoge1xuICAgICAgICAgICAgJ3ZhbHVlJzogMjAwXG4gICAgICAgIH0sXG4gICAgICAgICd0YXJnZXRhYmxlJzogZmFsc2VcbiAgICB9LFxuICAgICdTdGltIExhYic6IHtcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1Rha2VzIDIgdHVybnMgdG8gYnVpbGQuIEVuaGFuY2VzIGF0dGFjayBzcGVlZCBvZiBhbGwgYWxsaWVzIGJ5IDI1JS4nLFxuICAgICAgICAnaGVhbHRoJzogMjUwLFxuICAgICAgICAnc2hpZWxkJzogMCxcbiAgICAgICAgJ3dpZHRoJzogMCxcbiAgICAgICAgJ3R1cm5zVG9CdWlsZCc6IENvbnN0YW50cy5JU19QUk9EVUNUSU9OID8gMiA6IDEsXG4gICAgICAgICdvcHRpb25zJzogW10sXG4gICAgICAgICdjdXN0b20nOiB7XG4gICAgICAgICAgICAnYXR0YWNrU3BlZWRNdWx0aXBsaWVyJzogMS4yNVxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIlRoaWV2ZXMnIENhdmVcIjoge1xuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGFrZXMgMiB0dXJucyB0byBidWlsZC4gQWxseSBhdHRhY2tzIGdlbmVyYXRlIGdvbGQgZXF1YWwgdG8gMTUwJSBvZiBkYW1hZ2UgZGVhbHQuJyxcbiAgICAgICAgJ2hlYWx0aCc6IDI1MCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICd3aWR0aCc6IDAsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiBDb25zdGFudHMuSVNfUFJPRFVDVElPTiA/IDIgOiAxLFxuICAgICAgICAnb3B0aW9ucyc6IFtdLFxuICAgICAgICAnY3VzdG9tJzoge1xuICAgICAgICAgICAgJ2F0dGFja0dvbGRHZW4nOiAxLjUwLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkFydGlsbGVyeSBCYXlcIjoge1xuICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGFrZXMgMiB0dXJucyB0byBidWlsZC4gRW5oYW5jZXMgYXR0YWNrIGRhbWFnZSBvZiBhbGwgYWxsaWVzIGJ5IDI1JS4nLFxuICAgICAgICAnaGVhbHRoJzogMjUwLFxuICAgICAgICAnc2hpZWxkJzogMCxcbiAgICAgICAgJ3dpZHRoJzogMCxcbiAgICAgICAgJ3R1cm5zVG9CdWlsZCc6IENvbnN0YW50cy5JU19QUk9EVUNUSU9OID8gMiA6IDEsXG4gICAgICAgICdvcHRpb25zJzogW10sXG4gICAgICAgICdjdXN0b20nOiB7XG4gICAgICAgICAgICAnYXR0YWNrRGFtYWdlTXVsdGlwbGllcic6IDEuMjUsXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiQ2xvdWQgR2F0ZVwiOiB7XG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUYWtlcyAyIHR1cm5zIHRvIGJ1aWxkLiBFbmhhbmNlcyBtb3ZlbWVudCByYW5nZSBvZiBhbGwgYWxsaWVzIGJ5IDMuJyxcbiAgICAgICAgJ2hlYWx0aCc6IDI1MCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICd3aWR0aCc6IDAsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiBDb25zdGFudHMuSVNfUFJPRFVDVElPTiA/IDIgOiAxLFxuICAgICAgICAnb3B0aW9ucyc6IFtdLFxuICAgICAgICAnY3VzdG9tJzoge1xuICAgICAgICAgICAgJ21vdmVSYW5nZURlbHRhJzogMyxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJWaXRhbGl0eSBGb3VudGFpblwiOiB7XG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdUYWtlcyAyIHR1cm5zIHRvIGJ1aWxkLiBFbmhhbmNlcyBoZWFsdGggb2YgYWxsIGFsbGllcyBieSA1MCUuJyxcbiAgICAgICAgJ2hlYWx0aCc6IDI1MCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICd3aWR0aCc6IDAsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiBDb25zdGFudHMuSVNfUFJPRFVDVElPTiA/IDIgOiAxLFxuICAgICAgICAnb3B0aW9ucyc6IFtdLFxuICAgICAgICAnY3VzdG9tJzoge1xuICAgICAgICAgICAgJ2hlYWx0aE11bHRpcGxpZXInOiAxLjUwLFxuICAgICAgICB9XG4gICAgfSxcbiAgICBcIlR1cnJldFwiOiB7XG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdSZXF1aXJlcyBBdXRvbWF0aW9uIEZhY3RvcnkuIFN0YXRpb25hcnksIHNpbmdsZS10YXJnZXQgcmFuZ2VkIHR1cnJldC4nLFxuICAgICAgICAvLyBUaGUgaGVhbHRoIGlzIGlycmVsZXZhbnQgYmVjYXVzZSB0aGlzIGdldHMgY29udmVydGVkIHRvIGFuIEFybWVkIFR1cnJldCBvbiBhY3Rpb25cbiAgICAgICAgLy8gICBzdGFydFxuICAgICAgICAnaGVhbHRoJzogMSxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICd3aWR0aCc6IDAsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiAxLFxuICAgICAgICAnb3B0aW9ucyc6IFtdXG4gICAgfVxufTtcblxuY29uc3QgdW5pdHMgPSB7XG4gICAgJ1Njb3V0Jzoge1xuICAgICAgICAnYXR0YWNrUmFuZ2UnOiAwLFxuICAgICAgICAnYXR0YWNrU3BlZWQnOiAwLFxuICAgICAgICAnZGFtYWdlJzogMCxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1Njb3V0aW5nIHVuaXQsIGhpZ2ggbW92ZW1lbnQgcmFuZ2UsIGNhbm5vdCBhdHRhY2suJyxcbiAgICAgICAgJ2hlYWx0aCc6IDE1LFxuICAgICAgICAnbW92ZVJhbmdlJzogOCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICdzaWdodFJhbmdlJzogNSxcbiAgICAgICAgJ3RpZXInOiAxLFxuICAgICAgICAndHVybnNUb0J1aWxkJzogMSxcbiAgICAgICAgJ29wdGlvbnMnOiBbXVxuICAgIH0sXG4gICAgJ01hcmluZSc6IHtcbiAgICAgICAgJ2F0dGFja1JhbmdlJzogMixcbiAgICAgICAgJ2F0dGFja1NwZWVkJzogMC44LFxuICAgICAgICAnZGFtYWdlJzogNSxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1N0dXJkeSBhbmQgY2hlYXAtdG8tcHJvZHVjZSBpbmZhbnRyeSB1bml0LicsXG4gICAgICAgICdoZWFsdGgnOiA0MCxcbiAgICAgICAgJ21vdmVSYW5nZSc6IDUsXG4gICAgICAgICdzaGllbGQnOiAwLFxuICAgICAgICAnc2lnaHRSYW5nZSc6IDMsXG4gICAgICAgICd0aWVyJzogMSxcbiAgICAgICAgJ3R1cm5zVG9CdWlsZCc6IDEsXG4gICAgICAgICdvcHRpb25zJzogW10sXG4gICAgICAgICdjdXN0b20nOiB7XG4gICAgICAgICAgICAnbXV6emxlJzoge1xuICAgICAgICAgICAgICAgICd4JzogMCxcbiAgICAgICAgICAgICAgICAneSc6IC02NVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICAnRW5naW5lZXInOiB7XG4gICAgICAgICdhdHRhY2tSYW5nZSc6IDAsXG4gICAgICAgICdhdHRhY2tTcGVlZCc6IDAsXG4gICAgICAgICdkYW1hZ2UnOiAwLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnQ29uc3RydWN0cyBidWlsZGluZ3MgZHVyaW5nIHRoZSBwbGFubmluZyBwaGFzZS4nLFxuICAgICAgICAnaGVhbHRoJzogMTIsXG4gICAgICAgICdtb3ZlUmFuZ2UnOiAzLFxuICAgICAgICAnc2hpZWxkJzogMCxcbiAgICAgICAgJ3NpZ2h0UmFuZ2UnOiAzLFxuICAgICAgICAndGllcic6IDEsXG4gICAgICAgICd0dXJuc1RvQnVpbGQnOiAxLFxuICAgICAgICAnb3B0aW9ucyc6IFt7XG4gICAgICAgICAgICAndGl0bGUnOiAnQnVpbGQgRGVwbG95bWVudCBPdXRwb3N0JyxcbiAgICAgICAgICAgICdjb3N0JzogNDAwLFxuICAgICAgICAgICAgJ3ByZXJlcSc6IFtdLFxuICAgICAgICAgICAgJ3R5cGUnOiAnU3RydWN0dXJlJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICd7RGVwbG95bWVudCBPdXRwb3N0fScsXG4gICAgICAgICAgICAnaWNvbic6ICd7RGVwbG95bWVudCBPdXRwb3N0fScsXG4gICAgICAgICAgICAnY29tbWFuZCc6ICdidWlsZC1EZXBsb3ltZW50IE91dHBvc3QnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgICd0aXRsZSc6ICdCdWlsZCBCYXJyYWNrcycsXG4gICAgICAgICAgICAnY29zdCc6IDQwMCxcbiAgICAgICAgICAgICdwcmVyZXEnOiBbXSxcbiAgICAgICAgICAgICd0eXBlJzogJ1N0cnVjdHVyZScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAne0JhcnJhY2tzfScsXG4gICAgICAgICAgICAnaWNvbic6ICd7QmFycmFja3N9JyxcbiAgICAgICAgICAgICdjb21tYW5kJzogJ2J1aWxkLUJhcnJhY2tzJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICAndGl0bGUnOiAnQnVpbGQgQXV0b21hdGlvbiBGYWN0b3J5JyxcbiAgICAgICAgICAgICdjb3N0JzogMTAwLFxuICAgICAgICAgICAgJ3ByZXJlcSc6IFtdLFxuICAgICAgICAgICAgJ3R5cGUnOiAnU3RydWN0dXJlJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICd7QXV0b21hdGlvbiBGYWN0b3J5fScsXG4gICAgICAgICAgICAnaWNvbic6ICd7QXV0b21hdGlvbiBGYWN0b3J5fScsXG4gICAgICAgICAgICAnY29tbWFuZCc6ICdidWlsZC1BdXRvbWF0aW9uIEZhY3RvcnknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgICd0aXRsZSc6ICdCdWlsZCBUdXJyZXQnLFxuICAgICAgICAgICAgJ2Nvc3QnOiAzNTAsXG4gICAgICAgICAgICAncHJlcmVxJzogWydBdXRvbWF0aW9uIEZhY3RvcnknXSxcbiAgICAgICAgICAgICd0eXBlJzogJ1N0cnVjdHVyZScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAne1R1cnJldH0nLFxuICAgICAgICAgICAgJ2ljb24nOiAne1R1cnJldH0nLFxuICAgICAgICAgICAgJ2NvbW1hbmQnOiAnYnVpbGQtVHVycmV0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICAndGl0bGUnOiAnQnVpbGQgU3RpbSBMYWInLFxuICAgICAgICAgICAgJ2Nvc3QnOiAyMDAwLFxuICAgICAgICAgICAgJ3ByZXJlcSc6IFtdLFxuICAgICAgICAgICAgJ3R5cGUnOiAnU3RydWN0dXJlJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICd7U3RpbSBMYWJ9JyxcbiAgICAgICAgICAgICdpY29uJzogJ3tTdGltIExhYn0nLFxuICAgICAgICAgICAgJ2NvbW1hbmQnOiAnYnVpbGQtU3RpbSBMYWInXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgICd0aXRsZSc6IFwiQnVpbGQgVGhpZXZlcycgQ2F2ZVwiLFxuICAgICAgICAgICAgJ2Nvc3QnOiAyMDAwLFxuICAgICAgICAgICAgJ3ByZXJlcSc6IFtdLFxuICAgICAgICAgICAgJ3R5cGUnOiAnU3RydWN0dXJlJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6IFwie1RoaWV2ZXMnIENhdmV9XCIsXG4gICAgICAgICAgICAnaWNvbic6IFwie1RoaWV2ZXMnIENhdmV9XCIsXG4gICAgICAgICAgICAnY29tbWFuZCc6IFwiYnVpbGQtVGhpZXZlcycgQ2F2ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgICd0aXRsZSc6ICdCdWlsZCBBcnRpbGxlcnkgQmF5JyxcbiAgICAgICAgICAgICdjb3N0JzogMjAwMCxcbiAgICAgICAgICAgICdwcmVyZXEnOiBbXSxcbiAgICAgICAgICAgICd0eXBlJzogJ1N0cnVjdHVyZScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAne0FydGlsbGVyeSBCYXl9JyxcbiAgICAgICAgICAgICdpY29uJzogJ3tBcnRpbGxlcnkgQmF5fScsXG4gICAgICAgICAgICAnY29tbWFuZCc6ICdidWlsZC1BcnRpbGxlcnkgQmF5J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICAndGl0bGUnOiAnQnVpbGQgQ2xvdWQgR2F0ZScsXG4gICAgICAgICAgICAnY29zdCc6IDIwMDAsXG4gICAgICAgICAgICAncHJlcmVxJzogW10sXG4gICAgICAgICAgICAndHlwZSc6ICdTdHJ1Y3R1cmUnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ3tDbG91ZCBHYXRlfScsXG4gICAgICAgICAgICAnaWNvbic6ICd7Q2xvdWQgR2F0ZX0nLFxuICAgICAgICAgICAgJ2NvbW1hbmQnOiAnYnVpbGQtQ2xvdWQgR2F0ZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgJ3RpdGxlJzogJ0J1aWxkIFZpdGFsaXR5IEZvdW50YWluJyxcbiAgICAgICAgICAgICdjb3N0JzogMjAwMCxcbiAgICAgICAgICAgICdwcmVyZXEnOiBbXSxcbiAgICAgICAgICAgICd0eXBlJzogJ1N0cnVjdHVyZScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAne1ZpdGFsaXR5IEZvdW50YWlufScsXG4gICAgICAgICAgICAnaWNvbic6ICd7Vml0YWxpdHkgRm91bnRhaW59JyxcbiAgICAgICAgICAgICdjb21tYW5kJzogJ2J1aWxkLVZpdGFsaXR5IEZvdW50YWluJ1xuICAgICAgICB9XG4gICAgXX0sXG4gICAgJ1JlYXZlcic6IHtcbiAgICAgICAgJ2F0dGFja1JhbmdlJzogMCxcbiAgICAgICAgJ2F0dGFja1NwZWVkJzogMCxcbiAgICAgICAgJ2RhbWFnZSc6IDAsXG4gICAgICAgICdkZXNjcmlwdGlvbic6ICdSZXF1aXJlcyBBdXRvbWF0aW9uIEZhY3RvcnkuIFRoZSByZWF2ZXIgZXhwbG9kZXMgd2hlbiBkeWluZywgZGVhbGluZyA1MCBkYW1hZ2UgdG8gYWxsIHVuaXRzIGFyb3VuZCBpdC4nLFxuICAgICAgICAnaGVhbHRoJzogMjAsXG4gICAgICAgICdtb3ZlUmFuZ2UnOiA0LFxuICAgICAgICAnc2hpZWxkJzogMCxcbiAgICAgICAgJ3NpZ2h0UmFuZ2UnOiAyLFxuICAgICAgICAnc3F1YWRzaXplJzogMSxcbiAgICAgICAgJ3RpZXInOiAxLFxuICAgICAgICAndHVybnNUb0J1aWxkJzogMSxcbiAgICAgICAgJ29wdGlvbnMnOiBbXSxcbiAgICAgICAgJ2N1c3RvbSc6IHtcbiAgICAgICAgICAgICdleHBsb2RlRGFtYWdlJzogNTBcbiAgICAgICAgfVxuICAgIH0sXG4gICAgJ0FybWVkIFR1cnJldCc6IHtcbiAgICAgICAgJ2F0dGFja1JhbmdlJzogMyxcbiAgICAgICAgJ2F0dGFja1NwZWVkJzogMS41LFxuICAgICAgICAnZGFtYWdlJzogMyxcbiAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoaXMgaXMgY29uc3RydWN0ZWQgYnkgdGhlIFR1cnJldCBidWlsZGluZy4nLFxuICAgICAgICAnaGVhbHRoJzogMTAwLFxuICAgICAgICAnbW92ZVJhbmdlJzogMCxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICdzaWdodFJhbmdlJzogNCxcbiAgICAgICAgJ3NxdWFkc2l6ZSc6IDEsXG4gICAgICAgICd0aWVyJzogMSxcbiAgICAgICAgJ3R1cm5zVG9CdWlsZCc6IDAsXG4gICAgICAgICdvcHRpb25zJzogW10sXG4gICAgfSxcbiAgICAnR29sZW0nOiB7XG4gICAgICAgICdhdHRhY2tSYW5nZSc6IDEsXG4gICAgICAgICdhdHRhY2tTcGVlZCc6IDAuNSxcbiAgICAgICAgJ2RhbWFnZSc6IDEwLFxuICAgICAgICAnZGVzY3JpcHRpb24nOiAnU2xvdy1tb3ZpbmcgbWVsZWUgdW5pdC4nLFxuICAgICAgICAnaGVhbHRoJzogMTIwLFxuICAgICAgICAnbW92ZVJhbmdlJzogMyxcbiAgICAgICAgJ3NoaWVsZCc6IDAsXG4gICAgICAgICdzaWdodFJhbmdlJzogMixcbiAgICAgICAgJ3NxdWFkc2l6ZSc6IDEsXG4gICAgICAgICd0aWVyJzogMSxcbiAgICAgICAgJ3R1cm5zVG9CdWlsZCc6IDEsXG4gICAgICAgICdvcHRpb25zJzogW11cbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5zdHJ1Y3R1cmVzID0gc3RydWN0dXJlcztcbm1vZHVsZS5leHBvcnRzLnVuaXRzID0gdW5pdHM7XG5tb2R1bGUuZXhwb3J0cy5zdHJ1Y3R1cmVMaXN0ID0gT2JqZWN0LmtleXMoc3RydWN0dXJlcyk7XG5tb2R1bGUuZXhwb3J0cy51bml0TGlzdCA9IE9iamVjdC5rZXlzKHVuaXRzKTtcbm1vZHVsZS5leHBvcnRzLmdldEJhc2VPYmplY3QgPSAobmFtZSkgPT4ge1xuICAgIGlmIChuYW1lIGluIHN0cnVjdHVyZXMpIHtcbiAgICAgICAgcmV0dXJuIHN0cnVjdHVyZXNbbmFtZV07XG4gICAgfVxuICAgIGVsc2UgaWYgKG5hbWUgaW4gdW5pdHMpIHtcbiAgICAgICAgcmV0dXJuIHVuaXRzW25hbWVdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgJ0Nhbm5vdCBmaW5kIG1hcCBvYmplY3QgJyArIG5hbWU7XG4gICAgfVxufTtcbiIsImNsYXNzIFRpbGUge1xuICAgIGNvbnN0cnVjdG9yKGl0ZW0pIHtcbiAgICAgICAgdGhpcy50aWxlVHlwZSA9IHBhcnNlSW50KGl0ZW0pO1xuICAgICAgICB0aGlzLmRpc3BsYXlUeXBlID0gdGhpcy50aWxlVHlwZTtcbiAgICAgICAgdGhpcy5pc0hpZ2hHcm91bmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWdoR3JvdW5kR3JvdXAgPSAtMTtcbiAgICAgICAgdGhpcy5qdW5nbGVEaXN0ID0gLTE7XG4gICAgfVxufVxuXG5jb25zdCBDb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3QgeyBUdXBsZSwgZ2V0U3Vycm91bmRpbmcgfSA9IHJlcXVpcmUoJy4vY29vcmRpbmF0ZXMnKTtcblxuY29uc3QgVGlsZXMgPSB7XG4gICAgTk9ORTogMCxcbiAgICBERUZBVUxUOiAxLFxuICAgIEJSVVNIOiAyLFxuICAgIE1JTkVSQUw6IDMsXG4gICAgQklHX01JTkVSQUw6IDQsXG4gICAgUk9DSzogNSxcbiAgICBISUdIOiA2LFxuICAgIExPVzogN1xufTtcblxuY29uc3Qgc2V0dXBNYXAgPSAobWFwKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0xvYWRpbmcgbWFwLi4uJyk7XG4gICAgaWYgKHR5cGVvZiBtYXAuZGF0YVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWFwLmRhdGEgPSBtYXAuZGF0YS5tYXAocm93ID0+IHJvdy5zcGxpdCgnICcpLm1hcCh0aWxlID0+IG5ldyBUaWxlKHRpbGUpKSk7XG4gICAgICAgIFxuICAgICAgICBtYXAud2l0aGluTWFwID0gKHRpbGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhKHRpbGUueCA8IDAgfHwgdGlsZS55IDwgMCB8fFxuICAgICAgICAgICAgICAgIHRpbGUueCA+PSBtYXAuZGF0YVswXS5sZW5ndGggfHwgdGlsZS55ID49IG1hcC5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyogSW5pdGlhbCBTZXR1cCBmb3IgTWFwIERhdGEgKi9cbiAgICAgICAgbWFwLnRlcnJpdG9yaWFsVGlsZXMgPSAwO1xuICAgICAgICBtYXAuYmlnTWluZXJhbExvY2F0aW9ucyA9IFtdO1xuICAgICAgICBtYXAuc21hbGxNaW5lcmFsTG9jYXRpb25zID0gW107XG5cbiAgICAgICAgbGV0IG5leHRHcm91cCA9IDA7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgbWFwLmRhdGEubGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgbWFwLmRhdGFbMF0ubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gbWFwLmRhdGFbeV1beF0uZGlzcGxheVR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFRpbGVzLkhJR0ggJiYgbWFwLmRhdGFbeV1beF0uaGlnaEdyb3VuZEdyb3VwIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwbHlIaWdoR3JvdW5kR3JvdXAobWFwLCBuZXcgVHVwbGUoeCwgeSksIG5leHRHcm91cCk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRHcm91cCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gVGlsZXMuQlJVU0ggJiZcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAhPT0gVGlsZXMuUk9DSykge1xuICAgICAgICAgICAgICAgICAgICBtYXAudGVycml0b3JpYWxUaWxlcyArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gVGlsZXMuQklHX01JTkVSQUwpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmJpZ01pbmVyYWxMb2NhdGlvbnMucHVzaChuZXcgVHVwbGUoeCwgeSkpO1xuICAgICAgICAgICAgICAgICAgICBtYXAuZGF0YVt5XVt4XS5kaXNwbGF5VHlwZSA9IFRpbGVzLkRFRkFVTFQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFRpbGVzLk1JTkVSQUwpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNtYWxsTWluZXJhbExvY2F0aW9ucy5wdXNoKG5ldyBUdXBsZSh4LCB5KSk7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5kYXRhW3ldW3hdLmRpc3BsYXlUeXBlID0gVGlsZXMuREVGQVVMVDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbn1cblxuLy8gbGV0IG1hcCA9IHNldHVwTWFwKENvbnN0YW50cy5JU19QUk9EVUNUSU9OID8gcmVxdWlyZSgnLi9tYXBzL2JpZycpIDogcmVxdWlyZSgnLi9tYXBzL3NtYWxsJykpO1xubGV0IG1hcCA9IHNldHVwTWFwKHJlcXVpcmUoJy4vbWFwcy9yZWRlc2lnbicpKTtcblxuLyogUmVjdXJzaXZlbHkgYXBwbGllcyB0aGUgZ3JvdXAgdG8gYW55IGhpZ2ggZ3JvdW5kIHN1cnJvdW5kaW5nICovXG5jb25zdCBhcHBseUhpZ2hHcm91bmRHcm91cCA9IChtYXAsIHN0YXJ0LCBncm91cCkgPT4ge1xuICAgIGNvbnN0IG5vZGVzID0gW3N0YXJ0XTtcbiAgICB3aGlsZSAobm9kZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBub2Rlc1swXTtcbiAgICAgICAgbm9kZXMuc3BsaWNlKDAsIDEpO1xuICAgICAgICBjb25zdCB0aWxlID0gbWFwLmRhdGFbY3VycmVudC55XVtjdXJyZW50LnhdO1xuICAgICAgICBpZiAodGlsZS5kaXNwbGF5VHlwZSA9PT0gVGlsZXMuTk9ORSB8fCB0aWxlLmRpc3BsYXlUeXBlID09PSBUaWxlcy5ST0NLIHx8XG4gICAgICAgICAgICB0aWxlLmRpc3BsYXlUeXBlID09PSBUaWxlcy5MT1cgfHwgdGlsZS5oaWdoR3JvdW5kR3JvdXAgPj0gMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkobm9kZXMsIGdldFN1cnJvdW5kaW5nKGN1cnJlbnQsIDEpLmZpbHRlcihtYXAud2l0aGluTWFwKSk7XG4gICAgICAgIGlmICh0aWxlLmRpc3BsYXlUeXBlICE9PSBUaWxlcy5ERUZBVUxUKSB7XG4gICAgICAgICAgICB0aWxlLmlzSGlnaEdyb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdGlsZS5oaWdoR3JvdW5kR3JvdXAgPSBncm91cDtcbiAgICB9XG59O1xuXG5cbmNvbnN0IGdldFZpc2libGUgPSAocG9pbnQsIHNpZ2h0UmFuZ2UpID0+IHtcbiAgICAvKiBSZXR1cm5zIHZpc2liaWxpdHkgbWFwIG9mIGEgZ2l2ZW4gcG9pbnQgKi9cbiAgICAvKiBDaGVja3MgZm9yIEJydXNoLCBIaWdoIEdyb3VuZCBhbmQgSGlnaCBHcm91bmQgR3JvdXBzICovXG4gICAgaWYgKG1hcC5kYXRhW3BvaW50LnldW3BvaW50LnhdLmRpc3BsYXlUeXBlID09PSBUaWxlcy5CUlVTSCkge1xuICAgICAgICBzaWdodFJhbmdlID0gQ29uc3RhbnRzLkJSVVNIX1ZJU0lPTjtcbiAgICB9XG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgVHVwbGUocG9pbnQueCwgcG9pbnQueSkudG9DdWJlQ29vcmRpbmF0ZXMoKTtcbiAgICBjb25zdCB2aXNpdGVkID0gbmV3IFNldCgpO1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBqdW5nRGlzdCA9IHt9O1xuICAgIHZpc2l0ZWQuYWRkKEpTT04uc3RyaW5naWZ5KHN0YXJ0KSk7XG4gICAgcmVzdWx0LnB1c2goc3RhcnQudG9PZmZzZXRDb29yZGluYXRlcygpKTtcbiAgICBjb25zdCBmcmluZ2VzID0gW107XG4gICAgZnJpbmdlcy5wdXNoKFtzdGFydF0pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWdodFJhbmdlOyBpKyspIHtcbiAgICAgICAgZnJpbmdlcy5wdXNoKFtdKTtcbiAgICAgICAgZnJpbmdlc1tpXS5mb3JFYWNoKChoZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1clN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGhleCk7XG4gICAgICAgICAgICBoZXguZ2V0TmVpZ2hib3VycygpLmZvckVhY2goKG5laWdoYm91cikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5fY29vcmQgPSBuZWlnaGJvdXIudG9PZmZzZXRDb29yZGluYXRlcygpO1xuICAgICAgICAgICAgICAgIGlmICghbWFwLndpdGhpbk1hcChuX2Nvb3JkKSB8fFxuICAgICAgICAgICAgICAgICAgICBtYXAuZGF0YVtuX2Nvb3JkLnldW25fY29vcmQueF0uZGlzcGxheVR5cGUgPT09IFRpbGVzLk5PTkUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgZXhwbG9yZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG5laWdoYm91clN0cmluZyA9IEpTT04uc3RyaW5naWZ5KG5laWdoYm91cik7XG4gICAgICAgICAgICAgICAgaWYgKCF2aXNpdGVkLmhhcyhuZWlnaGJvdXJTdHJpbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZWVwRXhwbG9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXAuZGF0YVtuX2Nvb3JkLnldW25fY29vcmQueF0uZGlzcGxheVR5cGUgPT09IFRpbGVzLkJSVVNIKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqdW5nRGlzdFtuZWlnaGJvdXJTdHJpbmddID0gY3VyU3RyaW5nIGluIGp1bmdEaXN0ID8ganVuZ0Rpc3RbY3VyU3RyaW5nXSArIDEgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGp1bmdEaXN0W25laWdoYm91clN0cmluZ10gPj0gQ29uc3RhbnRzLkJSVVNIX1ZJU0lPTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBFeHBsb3JlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcC5kYXRhW3BvaW50LnldW3BvaW50LnhdLmRpc3BsYXlUeXBlID09PSBUaWxlcy5MT1cgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5kYXRhW25fY29vcmQueV1bbl9jb29yZC54XS5pc0hpZ2hHcm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyeWluZyB0byBzZWUgaGlnaCBncm91bmQgZnJvbSBsb3cgZ3JvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBrZWVwRXhwbG9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1hcC5kYXRhW25fY29vcmQueV1bbl9jb29yZC54XS5pc0hpZ2hHcm91bmQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLmRhdGFbbl9jb29yZC55XVtuX2Nvb3JkLnhdLmhpZ2hHcm91bmRHcm91cCAhPT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLmRhdGFbcG9pbnQueV1bcG9pbnQueF0uaGlnaEdyb3VuZEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcnlpbmcgdG8gc2VlIGhpZ2ggZ3JvdW5kIGZyb20gZGlmZmVyZW50IGhpZ2ggZ3JvdW5kIGdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgICBrZWVwRXhwbG9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZpc2l0ZWQuYWRkKG5laWdoYm91clN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZWVwRXhwbG9yZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobl9jb29yZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmluZ2VzW2kgKyAxXS5wdXNoKG5laWdoYm91cik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBmaW5kVGFyZ2V0UG9zID0gKHN0YXRlLCBwb3MpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gc3RhdGUubWFwT2JqZWN0c1twb3MueV1bcG9zLnhdO1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvKiBObyBkaXJlY3QgdGFyZ2V0LCBjaGVjayBmb3Igb2NjdXBpZWQgbWFwcGluZyAqL1xuICAgICAgICBjb25zdCBvY2N1cGllZFBvaW50ID0gc3RhdGUub2NjdXBpZWRbcG9zLnldW3Bvcy54XTtcbiAgICAgICAgaWYgKG9jY3VwaWVkUG9pbnQgJiYgb2NjdXBpZWRQb2ludCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG9jY3VwaWVkUG9pbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBvcztcbn07XG5cbmNvbnN0IGZpbmRUYXJnZXQgPSAoc3RhdGUsIHBvcykgPT4ge1xuICAgIGlmICghbWFwLndpdGhpbk1hcChwb3MpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldFBvcyA9IGZpbmRUYXJnZXRQb3Moc3RhdGUsIHBvcyk7XG4gICAgbGV0IHRhcmdldCA9IHN0YXRlLm1hcE9iamVjdHNbdGFyZ2V0UG9zLnldW3RhcmdldFBvcy54XTtcbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcblxuY29uc3QgcmVwbGVuaXNoU2hpZWxkID0gKG1hcE9iamVjdCkgPT4ge1xuICAgIGNvbnN0IHNoaWVsZFRvUmVwbGVuaXNoID0gTWF0aC5jZWlsKG1hcE9iamVjdC5tYXhTaGllbGQgLyAxMCk7XG4gICAgbWFwT2JqZWN0LmN1cnJlbnRTaGllbGQgKz0gc2hpZWxkVG9SZXBsZW5pc2g7XG4gICAgaWYgKG1hcE9iamVjdC5jdXJyZW50U2hpZWxkID4gbWFwT2JqZWN0Lm1heFNoaWVsZCkge1xuICAgICAgICBtYXBPYmplY3QuY3VycmVudFNoaWVsZCA9IG1hcE9iamVjdC5tYXhTaGllbGQ7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWFwLFxuICAgIFRpbGVzLFxuICAgIGdldFZpc2libGUsXG4gICAgZmluZFRhcmdldFBvcyxcbiAgICBmaW5kVGFyZ2V0LFxuICAgIHJlcGxlbmlzaFNoaWVsZCxcbiAgICBzZXR1cE1hcCxcbiAgICBUaWxlXG59O1xuIiwiY29uc3QgeyBUdXBsZSB9ID0gcmVxdWlyZSgnLi4vY29vcmRpbmF0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGF0YTogW1xuICAgICAgICBcIjAgMCAwIDEgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEgMCAwIDBcIixcbiAgICAgICAgXCIwIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAwXCIsXG4gICAgICAgIFwiMSAxIDEgNyAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgNCAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgNyAxIDEgMVwiLFxuICAgICAgICBcIjEgMSA3IDcgNyAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSA3IDcgNyAxIDFcIixcbiAgICAgICAgXCIxIDEgNyA3IDcgMSAxIDEgMSAxIDEgNSA1IDEgMSAxIDEgMSA1IDUgMSAxIDEgMSAxIDEgNyA3IDcgMSAxXCIsXG4gICAgICAgIFwiMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgNSAxIDEgMSAxIDEgNSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMVwiLFxuICAgICAgICBcIjAgMCAxIDEgMSAxIDEgMSAzIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMyAxIDEgMSAxIDEgMSAwIDBcIixcbiAgICAgICAgXCIwIDAgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMCAwXCIsXG4gICAgICAgIFwiMCAwIDEgMSAxIDEgMSAxIDEgMSAxIDEgNCAxIDEgMSAxIDEgNCAxIDEgMSAxIDEgMSAxIDEgMSAxIDAgMFwiLFxuICAgICAgICBcIjAgMCAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAwIDBcIixcbiAgICAgICAgXCIwIDAgMSAxIDEgMSAxIDEgNSA1IDEgMSAxIDEgMSAxIDEgMSAxIDEgMSA1IDUgMSAxIDEgMSAxIDEgMCAwXCIsXG4gICAgICAgIFwiMCAwIDEgMSAxIDQgMSAxIDUgNSAxIDMgMSAxIDEgNCAxIDEgMSAzIDEgNSA1IDEgMSA0IDEgMSAxIDAgMFwiLFxuICAgICAgICBcIjAgMCAxIDEgMSAxIDEgMSA1IDUgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDUgNSAxIDEgMSAxIDEgMSAwIDBcIixcbiAgICAgICAgXCIwIDAgMSAxIDEgMSAxIDEgNSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDUgMSAxIDEgMSAxIDEgMCAwXCIsXG4gICAgICAgIFwiMCAwIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDAgMFwiLFxuICAgICAgICBcIjAgMCAxIDEgMSAxIDEgMSAxIDEgMSAxIDQgMSAxIDEgMSAxIDQgMSAxIDEgMSAxIDEgMSAxIDEgMSAwIDBcIixcbiAgICAgICAgXCIwIDAgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMCAwXCIsXG4gICAgICAgIFwiMCAxIDEgMSAxIDEgMSAxIDMgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAzIDEgMSAxIDEgMSAxIDEgMFwiLFxuICAgICAgICBcIjEgMSAxIDcgMSAxIDEgMSAxIDEgMSA1IDUgMSAxIDEgMSAxIDUgNSAxIDEgMSAxIDEgMSAxIDcgMSAxIDFcIixcbiAgICAgICAgXCIxIDEgNyA3IDcgMSAxIDEgMSAxIDEgMSA1IDEgMSAxIDEgMSA1IDEgMSAxIDEgMSAxIDEgNyA3IDcgMSAxXCIsXG4gICAgICAgIFwiMSAxIDcgNyA3IDEgMSAxIDEgMSAxIDEgMSAxIDEgNCAxIDEgMSAxIDEgMSAxIDEgMSAxIDcgNyA3IDEgMVwiLFxuICAgICAgICBcIjEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDEgMSAxIDFcIixcbiAgICAgICAgXCIwIDAgMSAxIDEgMCAxIDAgMSAwIDEgMCAxIDAgMSAwIDEgMCAxIDAgMSAwIDEgMCAxIDAgMSAxIDEgMCAwXCIsXG4gICAgICAgIFwiMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMFwiXG4gICAgXSxcbiAgICBjb21tYW5kQ2VudGVyTG9jYXRpb25zOiBbbmV3IFR1cGxlKDMsIDMpLCBuZXcgVHVwbGUoMjcsIDE5KSwgbmV3IFR1cGxlKDI3LCAzKSwgbmV3IFR1cGxlKDMsIDE5KV0sXG4gICAgbW92ZW1lbnQ6IFtuZXcgVHVwbGUoNTAwLCA1MDApLCBuZXcgVHVwbGUoMjUwMCwgMTcwMCksIG5ldyBUdXBsZSg1MDAsIDE3MDApLCBuZXcgVHVwbGUoMjUwMCwgNTAwKV0sXG4gICAgbW92ZW1lbnRJbmRleDogMFxufTtcbiJdfQ==
