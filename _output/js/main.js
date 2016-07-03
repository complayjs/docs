(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './extensions/fallback/fallback.js', './extensions/vent/vent.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./extensions/fallback/fallback.js'), require('./extensions/vent/vent.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.fallback, global.vent);
		global.defaultConfig = mod.exports;
	}
})(this, function (exports, _fallback, _vent) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _fallback2 = _interopRequireDefault(_fallback);

	var _vent2 = _interopRequireDefault(_vent);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var defaultConfig = {
		vent: _vent2.default,
		dom: (0, _fallback2.default)('dom'),
		template: (0, _fallback2.default)('template')
	};

	exports.default = defaultConfig;
});


},{"./extensions/fallback/fallback.js":2,"./extensions/vent/vent.js":3}],2:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.fallback = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function (type) {
		return function () {

			var isString = typeof type === 'string';

			if (isString && typeMessagesBroadcasted.indexOf(type) === -1) {
				var msgArray = ['Extension for "' + type + '" is not configured yet.\r\n', 'Please pass an extensions through ApplicationFacade constructor options.' + type + '\r\n', 'or directly through Module, Service or Component via options.app.' + type + '!'];

				console.warn(msgArray.join(''));

				typeMessagesBroadcasted.push(type);
			}

			return arguments[0];
		};
	};

	var typeMessagesBroadcasted = [];
});

},{}],3:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.vent = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Vent;
	var targets = [];
	var events = {};

	function Vent(newTarget) {
		var empty = [];
		var index = targets.indexOf(newTarget);
		var target = targets[index];

		if (index === -1 || !target) {
			target = newTarget || this;

			if (!target.uid) {
				target.uid = Math.random() + '';
			}

			targets.push(target);
			index = targets.length - 1;

			events[targets[index].uid] = {};
		}

		/**
   *  On: listen to events
   */
		target.on = function (type, func, ctx) {
			(events[targets[index].uid][type] = events[targets[index].uid][type] || []).push([func, ctx]);
		};
		/**
   *  Off: stop listening to event / specific callback
   */
		target.off = function (type, func) {
			type || (events[targets[index].uid] = {});
			var list = events[targets[index].uid][type] || empty,
			    i = list.length = func ? list.length : 0;
			while (i--) {
				func == list[i][0] && list.splice(i, 1);
			}
		};
		/** 
   * Trigger: send event, callbacks will be triggered
   */
		target.trigger = function (type) {
			var list = events[targets[index].uid][type] || empty,
			    i = 0,
			    j = void 0;
			while (j = list[i++]) {
				j[0].apply(j[1], empty.slice.call(arguments, 1));
			}
		};

		return targets[index];
	}
});

},{}],4:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.from = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function () {
		if (!Array.from) {
			Array.from = function (object) {
				'use strict';

				return [].slice.call(object);
			};
		}
	}.call(undefined);
});

},{}],5:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.uniques = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = uniques;
	function uniques(arr) {
		var a = [];
		for (var i = 0, l = arr.length; i < l; i++) {
			if (a.indexOf(arr[i]) === -1 && arr[i] !== '') a.push(arr[i]);
		}return a;
	}
});

},{}],6:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', '../array/from'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('../array/from'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.from);
		global.domNodeArray = mod.exports;
	}
})(this, function (exports, _from) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = domNodeArray;

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function domNodeArray(item, ctx) {

		var retArray = [];

		ctx = ctx || document;

		// checks for type of given context
		if (item === ctx) {
			// context is item case
			retArray = [item];
		} else if (item && item.nodeType === Node.ELEMENT_NODE) {
			// dom node case
			retArray = [item];
		} else if (typeof item === 'string') {
			// selector case
			retArray = Array.from(ctx.querySelectorAll(item));
		} else if (item && item.length && Array.from(item).length > 0) {
			// nodelist case
			retArray = Array.from(item);
		}

		return retArray;
	}
});

},{"../array/from":4}],7:[function(require,module,exports){
(function (global){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.getGlobalObject = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = getGlobalObject;
	function getGlobalObject() {
		// Workers don’t have `window`, only `self`
		if (typeof self !== 'undefined') {
			return self;
		}
		if (typeof global !== 'undefined') {
			return global;
		}
		// Not all environments allow eval and Function
		// Use only as a last resort:
		return new Function('return this')();
	}
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.assign = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function () {

		if (!Object.assign) {
			(function () {
				var toObject = function toObject(val) {
					if (val === null || val === undefined) {
						throw new TypeError('Object.assign cannot be called with null or undefined');
					}

					return Object(val);
				};

				var hasOwnProperty = Object.prototype.hasOwnProperty;
				var propIsEnumerable = Object.prototype.propertyIsEnumerable;

				Object.assign = function (target, source) {
					var from;
					var to = toObject(target);
					var symbols;

					for (var s = 1; s < arguments.length; s++) {
						from = Object(arguments[s]);

						for (var key in from) {
							if (hasOwnProperty.call(from, key)) {
								to[key] = from[key];
							}
						}

						if (Object.getOwnPropertySymbols) {
							symbols = Object.getOwnPropertySymbols(from);
							for (var i = 0; i < symbols.length; i++) {
								if (propIsEnumerable.call(from, symbols[i])) {
									to[symbols[i]] = from[symbols[i]];
								}
							}
						}
					}

					return to;
				};
			})();
		}
	}();
});

},{}],9:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.dasherize = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = dasherize;
	function dasherize(str) {
		return str.replace(/[A-Z]/g, function (char, index) {
			return (index !== 0 ? '-' : '') + char.toLowerCase();
		});
	};
});

},{}],10:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.extractObjectName = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var extractObjectName = function () {
		/**
   * extracts name of a class or a function
   * @param  {object} obj a class or a function
   * @return {string} the qualified name of a class or a function
   */
		return function extractObjectName(obj) {

			var funcNameRegex = /^function ([a-zA-Z0-9_]+)\(\)/;
			var results = funcNameRegex.exec(obj.constructor.toString());

			return results && results.length > 1 ? results[1] : '';
		};
	}.call(undefined);

	exports.default = extractObjectName;
});

},{}],11:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './extract-object-name'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./extract-object-name'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.extractObjectName);
		global.namedUid = mod.exports;
	}
})(this, function (exports, _extractObjectName) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _extractObjectName2 = _interopRequireDefault(_extractObjectName);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	var namedUid = function () {
		var counters = {};
		/**
   * adds a number as string to a given id string
   * if an id string created with this method already exists 
   * it increases the number for truly unique id's
   * @param  {mixed} idObject @see extractObjectName which extracts that string
   * @return {string} the uid for identifying an instance, when debugging or 
   *                  for automatic selector creation
   */
		return function nameWithIncreasingId(idObject) {

			var idString = void 0;

			if ((typeof idObject === 'undefined' ? 'undefined' : _typeof(idObject)) === 'object') {
				// could be a class, function or object
				// so try to extract the name
				idString = (0, _extractObjectName2.default)(idObject);
			}

			idString = idObject;

			if (counters[idString]) {

				counters[idString]++;
			} else {

				counters[idString] = 1;
			}

			return idString + '-' + counters[idString];
		};
	}.call(undefined);

	exports.default = namedUid;
});

},{"./extract-object-name":10}],12:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './component', './types', '../helpers/dom/dom-node-array', '../helpers/string/dasherize', '../helpers/array/uniques', '../helpers/array/from', '../helpers/object/assign'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./component'), require('./types'), require('../helpers/dom/dom-node-array'), require('../helpers/string/dasherize'), require('../helpers/array/uniques'), require('../helpers/array/from'), require('../helpers/object/assign'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.component, global.types, global.domNodeArray, global.dasherize, global.uniques, global.from, global.assign);
		global.applicationDomComponent = mod.exports;
	}
})(this, function (exports, _component, _types, _domNodeArray, _dasherize, _uniques, _from, _assign) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _component2 = _interopRequireDefault(_component);

	var _domNodeArray2 = _interopRequireDefault(_domNodeArray);

	var _dasherize2 = _interopRequireDefault(_dasherize);

	var _uniques2 = _interopRequireDefault(_uniques);

	var _from2 = _interopRequireDefault(_from);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var ApplicationDomComponent = function (_Component) {
		_inherits(ApplicationDomComponent, _Component);

		_createClass(ApplicationDomComponent, [{
			key: 'elements',
			set: function set(moduleOptions) {
				var _this2 = this;

				var contexts = [];
				var elements = [];

				this._elements = this._elements || [];
				this._newElements = [];

				// if item has no context, pass application dom context
				if (this.options.context && !moduleOptions.context) {
					// this application facade is limited to a specific dom element
					moduleOptions.context = this.options.context;
					contexts = (0, _domNodeArray2.default)(this.options.context);
				} else if (this.options.context === moduleOptions.context) {
					// if module context is same like app context
					contexts = (0, _domNodeArray2.default)(this.options.context);
				} else if (this.options.context.contains(moduleOptions.context)) {
					// if module context is included in current context
					contexts = (0, _domNodeArray2.default)(moduleOptions.context, this.options.context);
				} else {
					// else if it is not in the dom,
					// create fragment and use this as context
					(0, _domNodeArray2.default)(moduleOptions.context).forEach(function (ctx) {
						var tempCtx = document.createDocumentFragment();
						tempCtx.appendChild(ctx);
						contexts.push(tempCtx);
					});
				}

				contexts.forEach(function (ctx) {
					elements = Array.from(ctx.querySelectorAll(_this2.options.moduleSelector));
					_this2._newElements = elements;
					_this2._elements = (0, _uniques2.default)(_this2._elements.concat(elements));
				});
			},
			get: function get() {

				return this._elements;
			}
		}, {
			key: 'newElements',
			get: function get() {
				return this._newElements;
			}
		}]);

		function ApplicationDomComponent() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			_classCallCheck(this, ApplicationDomComponent);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplicationDomComponent).call(this, options));

			if (options.observe) {
				_this.observe(options);
			}
			return _this;
		}

		_createClass(ApplicationDomComponent, [{
			key: 'startComponents',
			value: function startComponents(item, options) {
				var _this3 = this;

				var elementArray = [];
				var instances = [];

				// handle es5 extends and name property
				if ((!item.name || item.name === 'child') && item.prototype._name) {
					item.es5name = item.prototype._name;
				}

				elementArray = (0, _domNodeArray2.default)(options.el);

				if (elementArray.length === 0) {

					this.elements = options;
					elementArray = this.newElements;
				}

				elementArray.forEach(function (domNode) {

					var itemInstance = _this3.startComponent(item, options, domNode);

					if (itemInstance) {
						instances.push(itemInstance);
					}
				});

				return instances;
			}
		}, {
			key: 'startComponent',
			value: function startComponent(item, options, domNode) {
				var name = item.es5name || item.name;
				var itemInstance = void 0;
				var moduleAttribute = domNode.getAttribute(this.moduleAttribute);

				if (name && moduleAttribute && moduleAttribute.indexOf((0, _dasherize2.default)(name)) !== -1) {
					options.el = domNode;
					options.app = options.app || this.app;
					options.moduleSelector = options.moduleSelector || this.options.moduleSelector;

					itemInstance = new item(options);
				}

				return itemInstance;
			}
		}, {
			key: 'observe',
			value: function observe() {
				var _this4 = this;

				var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


				var config = {
					attributes: true,
					childList: true,
					characterData: true
				};

				var observedNode = this.options.context;

				// cannot observe document
				if (observedNode.contains(document.body)) {
					observedNode = document.body;
				}

				config = Object.assign(options.config || {}, config);

				if (window.MutationObserver) {

					this.observer = new MutationObserver(function (mutations) {
						mutations.forEach(function (mutation) {
							if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {

								console.log(mutation.addedNodes);

								_this4.onAddedNodes(mutation.addedNodes);
							} else if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {

								console.log(mutation.removedNodes);

								_this4.onRemovedNodes(mutation.removedNodes);
							}
						});
					});

					this.observer.observe(observedNode, config);
				} else {

					// @todo: needs test in IE9 & IE10

					this.onAddedNodesCallback = function (e) {
						_this4.onAddedNodes(e.target);
					};
					this.onRemovedNodesCallback = function (e) {
						_this4.onRemovedNodes(e.target);
					};

					observedNode.addEventListener('DOMNodeInserted', this.onAddedNodesCallback, false);
					observedNode.addEventListener('DOMNodeRemoved', this.onRemovedNodesCallback, false);
				}
			}
		}, {
			key: 'onAddedNodes',
			value: function onAddedNodes(addedNodes) {
				var _this5 = this;

				this.app.findMatchingRegistryItems(_types.COMPONENT_TYPE).forEach(function (item) {

					var mod = item.module;

					(0, _domNodeArray2.default)(addedNodes).forEach(function (ctx) {

						console.log('CONTEXT', ctx);

						if (ctx.nodeType === Node.ELEMENT_NODE && _this5.matchesSelector(ctx, _this5.options.moduleSelector)) {
							_this5.app.startComponent(mod, { context: ctx.parentElement });
						} else if (ctx.nodeType === Node.ELEMENT_NODE) {
							_this5.app.startComponent(mod, { context: ctx });
						}
					});
				});
			}
		}, {
			key: 'onRemovedNodes',
			value: function onRemovedNodes(removedNodes) {
				var _this6 = this;

				var componentRegistryItems = this.app.findMatchingRegistryItems(_types.COMPONENT_TYPE);
				var componentNodes = [];

				(0, _domNodeArray2.default)(removedNodes).forEach(function (node) {
					// push outermost if module
					if (_this6.matchesSelector(node, _this6.options.moduleSelector)) {
						componentNodes.push(node);
					}

					// push children if module
					(0, _domNodeArray2.default)(node.querySelectorAll(_this6.options.moduleSelector)).forEach(function (moduleEl) {
						if (_this6.matchesSelector(moduleEl, _this6.options.moduleSelector)) {
							componentNodes.push(moduleEl);
						}
					});
				});

				// iterate over component registry items
				componentRegistryItems.forEach(function (registryItem) {
					// iterate over started instances
					registryItem.instances.forEach(function (inst) {
						// if component el is within removeNodes
						// destroy instance
						if (componentNodes.indexOf(inst.el) > -1) {
							_this6.app.destroy(inst);
						}
					});
				});
			}
		}, {
			key: 'stopObserving',
			value: function stopObserving() {
				if (window.MutationObserver) {
					this.observer.disconnect();
				} else {
					var observedNode = this.options.context || document.body;
					observedNode.removeEventListener("DOMNodeInserted", this.onAddedNodesCallback);
					observedNode.removeEventListener("DOMNodeRemoved", this.onRemovedNodesCallback);
				}
			}
		}]);

		return ApplicationDomComponent;
	}(_component2.default);

	exports.default = ApplicationDomComponent;
});

},{"../helpers/array/from":4,"../helpers/array/uniques":5,"../helpers/dom/dom-node-array":6,"../helpers/object/assign":8,"../helpers/string/dasherize":9,"./component":15,"./types":17}],13:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './module', './types', '../helpers/environment/get-global-object', '../helpers/object/assign'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./module'), require('./types'), require('../helpers/environment/get-global-object'), require('../helpers/object/assign'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.module, global.types, global.getGlobalObject, global.assign);
		global.applicationFacade = mod.exports;
	}
})(this, function (exports, _module, _types, _getGlobalObject, _assign) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _module2 = _interopRequireDefault(_module);

	var _getGlobalObject2 = _interopRequireDefault(_getGlobalObject);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var root = (0, _getGlobalObject2.default)();

	var ApplicationFacade = function (_Module) {
		_inherits(ApplicationFacade, _Module);

		_createClass(ApplicationFacade, [{
			key: 'getModuleInstanceByName',
			value: function getModuleInstanceByName(moduleConstructorName, index) {

				var foundModuleInstances = this.findMatchingRegistryItems(moduleConstructorName);

				if (isNaN(index)) {
					return foundModuleInstances.map(function (inst) {
						return inst.module;
					});
				} else if (foundModuleInstances[index] && foundModuleInstances[index].module) {
					return foundModuleInstances[index].module;
				}
			}
		}, {
			key: 'modules',
			get: function get() {
				return this._modules;
			}
		}]);

		function ApplicationFacade() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			_classCallCheck(this, ApplicationFacade);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplicationFacade).call(this, options));

			_this._modules = [];

			_this.vent = options.vent;
			_this.dom = options.dom;
			_this.template = options.template;

			if (options.AppComponent) {
				_this.appComponent = new options.AppComponent(Object.assign(options, {
					app: _this,
					context: options.context || document,
					moduleSelector: options.moduleSelector || '[data-js-component]'
				}));
			}

			if (options.modules) {
				_this.start.apply(_this, options.modules);
			}
			return _this;
		}

		_createClass(ApplicationFacade, [{
			key: 'findMatchingRegistryItems',
			value: function findMatchingRegistryItems(item) {

				if (item === '*') {
					return this._modules;
				}

				return this._modules.filter(function (mod) {
					if (mod === item || mod.module === item || typeof item === 'string' && mod.module.type === item || typeof item === 'string' && mod.module.name === item || (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item.uid && mod.instances.indexOf(item) > -1) {
						return mod;
					}
				});
			}
		}, {
			key: 'immediate',
			value: function immediate(cb) {
				cb.call(this);

				return this;
			}
		}, {
			key: 'onDomReady',
			value: function onDomReady(cb) {
				if (!root.document || root.document && root.document.readyState === 'interactive') {
					cb.call(this);
				} else {
					document.addEventListener('DOMContentLoaded', cb.bind(this), false);
				}

				return this;
			}
		}, {
			key: 'onWindowLoaded',
			value: function onWindowLoaded(cb) {
				if (!root.document || root.document && root.document.readyState === 'complete') {
					cb.call(this);
				} else {
					root.addEventListener('load', cb.bind(this), false);
				}

				return this;
			}
		}, {
			key: 'start',
			value: function start() {
				var _this2 = this;

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				if (args.length > 1) {
					args.forEach(function (arg) {
						_this2.start(arg);
					});
					return;
				}

				var item = args[0];
				var options = {};
				var optionsKeyNames = ['setup', 'config', 'options'];
				var optionsKey = void 0;
				var moduleKeyNames = [_types.MODULE_TYPE, _types.SERVICE_TYPE, _types.COMPONENT_TYPE];
				var moduleKey = void 0;

				if (Object.getPrototypeOf(item) === Object.prototype) {
					var keys = Object.keys(item);
					moduleKey = keys.filter(function (key) {
						return ~moduleKeyNames.indexOf(key);
					})[0] || keys[0];
					optionsKey = keys.filter(function (key) {
						return ~optionsKeyNames.indexOf(key);
					})[0] || keys[1];
				}

				// if passed like {module: SomeModule, options: {}}
				if (Object.getPrototypeOf(item) === Object.prototype && moduleKey && item[moduleKey]) {

					options = item[optionsKey] || {};
					item = item[moduleKey];
				}

				return this.startModules(item, options);
			}
		}, {
			key: 'stop',
			value: function stop() {
				var _this3 = this;

				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}

				if (args.length > 1) {
					args.forEach(function (arg) {
						_this3.stop(arg);
					});
					return;
				}

				var item = args[0];

				this.findMatchingRegistryItems(item).forEach(function (registryItem) {
					var module = registryItem.module;

					registryItem.instances.forEach(function (inst) {

						if (module.type === _types.COMPONENT_TYPE) {
							// undelegate events if component
							inst.undelegateEvents();
						} else if (module.type === _types.SERVICE_TYPE) {
							// disconnect if service
							inst.disconnect();
						}

						// undelegate vents for all
						inst.undelegateVents();
					});

					// running false
					registryItem.running = false;
				});
			}
		}, {
			key: 'startModules',
			value: function startModules(item, options) {

				options.app = options.app || this;

				if (item.type === _types.COMPONENT_TYPE) {
					this.startComponent(item, options);
				} else if (item.type === _types.SERVICE_TYPE) {
					this.startService(item, options);
				} else if (item.type === _types.MODULE_TYPE) {
					this.startModule(item, options);
				} else {
					throw new Error('Expected Module of type \n\t\t\t\t' + _types.COMPONENT_TYPE + ', ' + _types.SERVICE_TYPE + ' or ' + _types.MODULE_TYPE + ', \n\t\t\t\tModule of type ' + item.type + ' is not allowed.');
				}

				var registryItem = this._modules[this._modules.length - 1];

				registryItem.running = true;

				return registryItem;
			}
		}, {
			key: 'startModule',
			value: function startModule(item, options) {

				var itemInstance = new item(options);

				this.initModule(itemInstance);
				this.register(item, itemInstance, options);
			}
		}, {
			key: 'startComponent',
			value: function startComponent(item, options) {
				var _this4 = this;

				options.appComponent = this.appComponent;

				// register item without instances
				// for later use, if no dom nodes
				// are present yet
				this.register(item, null, options);

				this.appComponent.startComponents(item, options).forEach(function (itemInstance) {
					_this4.initComponent(itemInstance);
					_this4.register(item, itemInstance, itemInstance.options);
				});
			}
		}, {
			key: 'startService',
			value: function startService(item, options) {

				var itemInstance = new item(options);

				this.initService(itemInstance);
				this.register(item, itemInstance, options);
			}
		}, {
			key: 'initModule',
			value: function initModule(module) {

				if (module.type !== _types.MODULE_TYPE) {
					throw new Error('Expected Module instance.');
				}

				module.delegateVents();
			}
		}, {
			key: 'initService',
			value: function initService(module) {

				if (module.type !== _types.SERVICE_TYPE) {
					throw new Error('Expected Service instance.');
				}

				module.delegateVents();
				module.connect();

				if (module.autostart) {
					module.fetch();
				}
			}
		}, {
			key: 'initComponent',
			value: function initComponent(module) {

				if (module.type !== _types.COMPONENT_TYPE) {
					throw new Error('Expected Component instance.');
				}

				module.mount();

				if (module.autostart) {
					module.render();
				}
			}
		}, {
			key: 'register',
			value: function register(module, inst) {
				var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];


				if (arguments.length === 0) {
					throw new Error('Module or module identifier expected');
				}

				var existingRegistryModuleItem = this.findMatchingRegistryItems(module)[0];

				if (existingRegistryModuleItem) {

					var index = this._modules.indexOf(existingRegistryModuleItem);

					// mixin named components using appName
					if (existingRegistryModuleItem.appName && !this[options.appName] && inst) {
						this[options.appName] = inst;
					}

					// push if instance not exists
					if (inst && this._modules[index].instances.indexOf(inst) === -1) {
						this._modules[index].instances.push(inst);
					}
				} else if ([_types.SERVICE_TYPE, _types.COMPONENT_TYPE, _types.MODULE_TYPE].indexOf(module.type) > -1) {

					var registryObject = {
						type: module.type,
						module: module,
						instances: inst ? [inst] : [],
						autostart: !!module.autostart,
						running: false,
						uid: module.uid
					};

					registryObject.appName = options.appName;

					if (options.appName && !this[options.appName] && inst) {
						this[options.appName] = inst;
					}

					this._modules.push(registryObject);
				} else {
					console.error('Expected Module of type \n\t\t\t\t' + _types.COMPONENT_TYPE + ', ' + _types.SERVICE_TYPE + ' or ' + _types.MODULE_TYPE + ', \n\t\t\t\tModule of type ' + module.type + ' cannot be registered.');
				}
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				var _this5 = this;

				for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
					args[_key3] = arguments[_key3];
				}

				if (args.length > 1) {
					args.forEach(function (arg) {
						_this5.destroy(arg);
					});
					return;
				}

				var item = args[0];
				var isInstance = !!((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' && item.uid);
				var registryItems = this.findMatchingRegistryItems(item);

				this.findMatchingRegistryItems(item).forEach(function (registryItem) {

					var module = registryItem.module;
					var iterateObj = isInstance ? [item] : registryItem.instances;

					iterateObj.forEach(function (inst) {

						var moduleInstances = _this5._modules[_this5._modules.indexOf(registryItem)].instances;

						if (moduleInstances.length > 1) {
							_this5._modules[_this5._modules.indexOf(registryItem)].instances.splice(moduleInstances.indexOf(inst), 1);
						} else {
							_this5._modules[_this5._modules.indexOf(registryItem)].instances = [];

							// delete exposed instances
							if (registryItem.appName && _this5[registryItem.appName]) {
								delete _this5[registryItem.appName];
							}
						}

						if (module.type === _types.COMPONENT_TYPE) {
							// undelegate events if component
							inst.unmount();
						} else if (module.type === _types.SERVICE_TYPE) {
							// disconnect if service
							inst.undelegateVents();
							inst.disconnect();
							inst.destroy();
						} else {
							// undelegate vents for all
							inst.undelegateVents();
						}
					});
				});

				if (!isInstance) {
					this.unregister(item);
				}
			}
		}, {
			key: 'unregister',
			value: function unregister(item) {

				var matchingRegisteredItems = this.findMatchingRegistryItems(item);

				for (var i = 0, len = matchingRegisteredItems.length; i < len; i++) {

					var mod = matchingRegisteredItems[i];

					if (this._modules.length > 1) {
						this._modules.splice(this._modules.indexOf(mod), 1);
					} else {

						this._modules = [];
					}
				}
			}
		}]);

		return ApplicationFacade;
	}(_module2.default);

	exports.default = ApplicationFacade;
});

},{"../helpers/environment/get-global-object":7,"../helpers/object/assign":8,"./module":16,"./types":17}],14:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', '../helpers/string/dasherize', '../helpers/string/extract-object-name', '../helpers/string/named-uid', '../helpers/environment/get-global-object', '../default-config', 'plite'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('../helpers/string/dasherize'), require('../helpers/string/extract-object-name'), require('../helpers/string/named-uid'), require('../helpers/environment/get-global-object'), require('../default-config'), require('plite'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.dasherize, global.extractObjectName, global.namedUid, global.getGlobalObject, global.defaultConfig, global.plite);
		global.base = mod.exports;
	}
})(this, function (exports, _dasherize, _extractObjectName, _namedUid, _getGlobalObject, _defaultConfig, _plite) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _dasherize2 = _interopRequireDefault(_dasherize);

	var _extractObjectName2 = _interopRequireDefault(_extractObjectName);

	var _namedUid2 = _interopRequireDefault(_namedUid);

	var _getGlobalObject2 = _interopRequireDefault(_getGlobalObject);

	var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

	var _plite2 = _interopRequireDefault(_plite);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var root = (0, _getGlobalObject2.default)();

	// shim promises
	!root.Promise && (root.Promise = _plite2.default);

	function generateName(obj) {

		if (obj._name) {
			return obj._name;
		}

		return (0, _extractObjectName2.default)(obj);
	}

	function generateDashedName(obj) {

		if (obj._dashedName) {
			return obj._dashedName;
		}

		return (0, _dasherize2.default)(generateName(obj));
	}

	function generateUid(obj) {
		if (obj._uid) {
			return obj._uid;
		}

		return (0, _namedUid2.default)(generateName(obj));
	}

	var Base = function () {
		_createClass(Base, [{
			key: 'vents',
			set: function set(vents) {
				this._vents = vents;
			},
			get: function get() {
				return this._vents;
			}
		}, {
			key: 'autostart',
			set: function set(bool) {
				this._autostart = bool;
			},
			get: function get() {
				return this._autostart;
			}
		}, {
			key: 'name',
			set: function set(name) {
				this._name = name;
			},
			get: function get() {
				return this._name;
			}
		}, {
			key: 'dashedName',
			set: function set(dashedName) {
				this._dashedName = dashedName;
			},
			get: function get() {
				return this._dashedName;
			}
		}, {
			key: 'uid',
			get: function get() {
				return this._uid;
			},
			set: function set(uid) {
				this._uid = uid;
			}
		}]);

		function Base() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			_classCallCheck(this, Base);

			this.name = generateName(this);
			this.dashedName = generateDashedName(this);
			this.uid = generateUid(this);

			this.options = options;

			if (options.app) {
				this.app = options.app;
			}

			this.vents = options.vents || {};

			this.autostart = !!options.autostart;

			if (options.vent) {
				// could be used standalone
				this.vent = options.vent(this);
			} else if (options.app && options.app.vent) {
				// or within an application facade
				this.vent = options.app.vent(options.app);
			} else {
				this.vent = _defaultConfig2.default.vent(this);
			}
		}

		_createClass(Base, [{
			key: 'beforeInitialize',
			value: function beforeInitialize(options) {
				// override and call super.beforeInitialize(options)}
			}
		}, {
			key: 'afterInitialize',
			value: function afterInitialize(options) {
				// override and call super.afterInitialize(options)}
			}
		}, {
			key: 'initialize',
			value: function initialize(options) {
				// override
			}
		}, {
			key: 'bindCustomEvents',
			value: function bindCustomEvents() {
				// override
			}
		}, {
			key: 'delegateVents',
			value: function delegateVents() {

				if (!this.vent) {
					return;
				}

				for (var vent in this.vents) {
					if (this.vents.hasOwnProperty(vent)) {
						var callback = this.vents[vent];

						if (typeof callback !== 'function' && typeof this[callback] === 'function') {
							callback = this[callback];
						} else if (typeof callback !== 'function') {
							throw new Error('Expected callback method');
						}

						this.vent.on(vent, callback, this);
					}
				}

				return this;
			}
		}, {
			key: 'undelegateVents',
			value: function undelegateVents() {

				if (!this.vent) {
					return;
				}

				for (var vent in this.vents) {
					if (this.vents.hasOwnProperty(vent)) {
						var callback = this.vents[vent];

						if (typeof callback !== 'function' && typeof this[callback] === 'function') {
							callback = this[callback];
						} else if (typeof callback !== 'function') {
							throw new Error('Expected callback method');
						}

						this.vent.off(vent, callback, this);
					}
				}

				return this;
			}
		}, {
			key: 'toString',
			value: function toString() {
				return this.uid;
			}
		}]);

		return Base;
	}();

	exports.default = Base;
});

},{"../default-config":1,"../helpers/environment/get-global-object":7,"../helpers/string/dasherize":9,"../helpers/string/extract-object-name":10,"../helpers/string/named-uid":11,"plite":18}],15:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './base', '../helpers/object/assign', '../helpers/array/from', '../helpers/string/dasherize', '../default-config', './types'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./base'), require('../helpers/object/assign'), require('../helpers/array/from'), require('../helpers/string/dasherize'), require('../default-config'), require('./types'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.base, global.assign, global.from, global.dasherize, global.defaultConfig, global.types);
		global.component = mod.exports;
	}
})(this, function (exports, _base, _assign, _from, _dasherize, _defaultConfig, _types) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _base2 = _interopRequireDefault(_base);

	var _assign2 = _interopRequireDefault(_assign);

	var _from2 = _interopRequireDefault(_from);

	var _dasherize2 = _interopRequireDefault(_dasherize);

	var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var DELEGATE_EVENT_SPLITTER = /^(\S+)\s*(.*)$/;

	var _matchesSelector = Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector;

	var Component = function (_Base) {
		_inherits(Component, _Base);

		_createClass(Component, [{
			key: 'type',
			get: function get() {
				return _types.COMPONENT_TYPE;
			}
		}, {
			key: 'events',
			set: function set(events) {
				this._events = events;
			},
			get: function get() {
				return this._events;
			}
		}, {
			key: 'el',
			set: function set(el) {
				this._el = el;
			},
			get: function get() {
				return this._el;
			}
		}, {
			key: 'viewModel',
			set: function set(model) {
				this._viewModel = model;
			},
			get: function get() {
				return this._viewModel;
			}
		}, {
			key: 'model',
			set: function set(model) {
				this._model = model;
			},
			get: function get() {
				return this._model;
			}
		}, {
			key: 'service',
			set: function set(service) {
				this._service = service;
			},
			get: function get() {
				return this._service;
			}
		}], [{
			key: 'type',
			get: function get() {
				return _types.COMPONENT_TYPE;
			}
		}]);

		function Component() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			_classCallCheck(this, Component);

			options.context = options.context || document;

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, options));

			_this.moduleSelector = options.moduleSelector || '[data-js-component*="' + _this.dashedName + '"]';

			if (_this.moduleSelector.indexOf('[data-') === 0) {
				_this.moduleAttribute = _this.moduleSelector.replace(/^(\[)([a-zA-Z-_]+)(.*])$/, '$2');
			}

			if (typeof options.context === 'string') {
				options.context = document.querySelector(options.context);
			}

			_this.ensureElement(options);
			// parse options from markup and merge with existing
			Object.assign(_this.options, _this.parseOptions(_this.el, _this.constructor), options);

			if (options.service) {
				_this.service = options.service;
			}

			if (options.viewModel) {
				_this.viewModel = options.viewModel;
			}

			if (options.model) {
				_this.model = options.model;
			}

			if (options.appComponent) {
				_this.appComponent = options.appComponent;
			}

			if (!options.app) {
				_this.mount();
			}
			return _this;
		}

		_createClass(Component, [{
			key: 'matchesSelector',
			value: function matchesSelector(el, selector) {

				if (arguments.length === 1) {
					selector = el;
					el = this.el;
				}

				return _matchesSelector.call(el, selector);
			}
		}, {
			key: 'willMount',
			value: function willMount() {

				return true;
			}
		}, {
			key: 'mount',
			value: function mount() {

				if (this.willMount() !== false) {

					this.events = this.events || {};

					this.dom = this.options.dom || this.app && this.app.dom || _defaultConfig2.default.dom;

					this.template = this.options.template || this.app && this.app.template || _defaultConfig2.default.template;

					this._domEvents = [];

					// call if extension itemSelectorToMembers is mixed in
					if (typeof this.itemSelectorToMembers === 'function') {
						this.itemSelectorToMembers();
					}

					this.beforeInitialize(this.options);
					this.initialize(this.options);
					this.afterInitialize(this.options);
					this.bindCustomEvents();
					this.bindEvents();
					this.delegateEvents();
					this.delegateVents();
					this.didMount();
				}
			}
		}, {
			key: 'didMount',
			value: function didMount() {}
		}, {
			key: 'willUnmount',
			value: function willUnmount() {
				return true;
			}
		}, {
			key: 'unmount',
			value: function unmount() {

				if (this.willUnmount() !== false) {

					if (this.app && this.app.findMatchingRegistryItems().length > 0) {
						this.app.destroy(this);
					} else {
						this.remove();
					}

					this.didUnmount();
				}
			}
		}, {
			key: 'didUnmount',
			value: function didUnmount() {}
		}, {
			key: 'createDomNode',
			value: function createDomNode(str) {

				var selectedEl = this.options.context.querySelector(str);

				if (selectedEl) {
					return selectedEl;
				}

				var div = document.createElement('div');
				var elNode = void 0;

				div.innerHTML = str;

				Array.from(div.childNodes).forEach(function (node) {
					if (!elNode && node.nodeType === Node.ELEMENT_NODE) {
						elNode = node;
					}
				});

				return elNode || div;
			}
		}, {
			key: 'ensureElement',
			value: function ensureElement() {
				var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


				if (options.el && options.el.nodeType === Node.ELEMENT_NODE) {
					this.el = options.el;
				} else if (typeof options.el === 'string') {
					this.el = this.createDomNode(options.el);
				} else if (options.context && options.context.nodeType === Node.ELEMENT_NODE && this.moduleSelector) {
					this.el = options.context.querySelector(this.moduleSelector);
				}

				if (!this.el) {
					this.el = document.createElement('div');
				}

				if (!this.el.dataset.jsComponent) {
					this.el.dataset.jsComponent = this.dashedName;
				} else if (this.el.dataset.jsComponent.indexOf(this.dashedName) === -1) {
					this.el.dataset.jsComponent = this.el.dataset.jsComponent.length > 0 ? this.el.dataset.jsComponent + ' ' + this.dashedName : '' + this.dashedName;
				}

				if (!this.el.componentUid) {
					this.el.componentUid = [this.uid];
				} else if (this.el.componentUid.indexOf(this.uid) === -1) {
					this.el.componentUid.push(this.uid);
				}

				if (this.dom) {
					this.$el = this.dom(this.el);
				} else if (this.$) {
					this.$el = this.$(this.el);
				}
			}
		}, {
			key: 'setElement',
			value: function setElement(el) {

				this.undelegateEvents();
				this.ensureElement({ el: el });
				this.delegateEvents();

				return this;
			}
		}, {
			key: 'bindEvents',
			value: function bindEvents() {}
		}, {
			key: 'parseOptions',
			value: function parseOptions(el, item) {
				var _this2 = this;

				var options = el && el.dataset.jsOptions;

				if (!options) {

					var jsonScriptBlock = Array.from(el.childNodes).filter(function (child) {
						return child.nodeType === Node.ELEMENT_NODE && _this2.matchesSelector(child, 'script[data-js-options]');
					});

					if (jsonScriptBlock.length) {
						options = jsonScriptBlock[0].innerText;
					}
				}

				if (options && typeof options === 'string') {

					var name = item.name || item.es5name;

					// if <div data-js-options="{'show': true}"> is used,
					// instead of <div data-js-options='{"show": true}'>
					// convert to valid json string and parse to JSON
					options = options.replace(/\\'/g, '\'').replace(/'/g, '"');

					options = JSON.parse(options);
					options = options[(0, _dasherize2.default)(name)] || options[name] || options;
				}

				return options || {};
			}
		}, {
			key: 'delegateEvents',
			value: function delegateEvents(events) {

				if (!(events || (events = this.events))) return this;
				this.undelegateEvents();
				for (var key in events) {
					var method = events[key];
					if (typeof method !== 'function') method = this[events[key]];
					// console.log(key, events, method);
					// if (!method) continue;
					var match = key.match(DELEGATE_EVENT_SPLITTER);
					this.delegate(match[1], match[2], method.bind(this));
				}
				return this;
			}
		}, {
			key: 'delegate',
			value: function delegate(eventName, selector, listener) {

				if (typeof selector === 'function') {
					listener = selector;
					selector = null;
				}

				var root = this.el;
				var handler = selector ? function (e) {
					var node = e.target || e.srcElement;

					for (; node && node != root; node = node.parentNode) {
						if (_matchesSelector.call(node, selector)) {
							e.delegateTarget = node;
							listener(e);
						}
					}
				} : listener;

				Element.prototype.addEventListener.call(this.el, eventName, handler, false);
				this._domEvents.push({ eventName: eventName, handler: handler, listener: listener, selector: selector });
				return handler;
			}
		}, {
			key: 'undelegate',
			value: function undelegate(eventName, selector, listener) {

				if (typeof selector === 'function') {
					listener = selector;
					selector = null;
				}

				if (this.el) {
					var handlers = this._domEvents.slice();
					var i = handlers.length;

					while (i--) {
						var item = handlers[i];

						var match = item.eventName === eventName && (listener ? item.listener === listener : true) && (selector ? item.selector === selector : true);

						if (!match) continue;

						Element.prototype.removeEventListener.call(this.el, item.eventName, item.handler, false);
						this._domEvents.splice(i, 1);
					}
				}

				return this;
			}
		}, {
			key: 'undelegateEvents',
			value: function undelegateEvents() {

				if (this.el) {
					for (var i = 0, len = this._domEvents.length; i < len; i++) {
						var item = this._domEvents[i];
						Element.prototype.removeEventListener.call(this.el, item.eventName, item.handler, false);
					};
					this._domEvents.length = 0;
				}

				return this;
			}
		}, {
			key: 'remove',
			value: function remove() {
				this.undelegateVents();
				this.undelegateEvents();
				if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
			}
		}, {
			key: 'update',
			value: function update() {

				return this;
			}
		}, {
			key: 'render',
			value: function render() {

				return this;
			}
		}]);

		return Component;
	}(_base2.default);

	exports.default = Component;
});

},{"../default-config":1,"../helpers/array/from":4,"../helpers/object/assign":8,"../helpers/string/dasherize":9,"./base":14,"./types":17}],16:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './base', './types'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./base'), require('./types'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.base, global.types);
		global.module = mod.exports;
	}
})(this, function (exports, _base, _types) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Module = function (_Base) {
		_inherits(Module, _Base);

		_createClass(Module, [{
			key: 'type',
			get: function get() {
				return _types.MODULE_TYPE;
			}
		}], [{
			key: 'type',
			get: function get() {
				return _types.MODULE_TYPE;
			}
		}]);

		function Module() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			_classCallCheck(this, Module);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Module).call(this, options));

			_this.beforeInitialize(options);
			_this.initialize(options);
			_this.afterInitialize(options);
			_this.bindCustomEvents();
			_this.delegateVents();
			return _this;
		}

		return Module;
	}(_base2.default);

	exports.default = Module;
});

},{"./base":14,"./types":17}],17:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.types = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var MODULE_TYPE = 'module';
  var SERVICE_TYPE = 'service';
  var COMPONENT_TYPE = 'component';
  var MODEL_TYPE = 'model';

  exports.MODULE_TYPE = MODULE_TYPE;
  exports.SERVICE_TYPE = SERVICE_TYPE;
  exports.COMPONENT_TYPE = COMPONENT_TYPE;
  exports.MODEL_TYPE = MODEL_TYPE;
});

},{}],18:[function(require,module,exports){
function Plite(resolver) {
  var emptyFn = function () {},
      chain = emptyFn,
      resultGetter;

  function processResult(result, callback, reject) {
    if (result && result.then) {
      result.then(function (data) {
        processResult(data, callback, reject);
      }).catch(function (err) {
        processResult(err, reject, reject);
      });
    } else {
      callback(result);
    }
  }

  function setResult(callbackRunner) {
    resultGetter = function (successCallback, failCallback) {
      try {
        callbackRunner(successCallback, failCallback);
      } catch (ex) {
        failCallback(ex);
      }
    };

    chain();
    chain = undefined;
  }

  function setError(err) {
    setResult(function (success, fail) {
      fail(err);
    });
  }

  function setSuccess(data) {
    setResult(function (success) {
      success(data);
    });
  }

  function buildChain(onsuccess, onfailure) {
    var prevChain = chain;
    chain = function () {
      prevChain();
      resultGetter(onsuccess, onfailure);
    };
  }

  var self = {
    then: function (callback) {
      var resolveCallback = resultGetter || buildChain;

      return Plite(function (resolve, reject) {
        resolveCallback(function (data) {
          resolve(callback(data));
        }, reject);
      });
    },

    catch: function (callback) {
      var resolveCallback = resultGetter || buildChain;

      return Plite(function (resolve, reject) {
        resolveCallback(resolve, function (err) {
          reject(callback(err));
        });
      });
    },

    resolve: function (result) {
      !resultGetter && processResult(result, setSuccess, setError);
    },

    reject: function (err) {
      !resultGetter && processResult(err, setError, setError);
    }
  };

  resolver && resolver(self.resolve, self.reject);

  return self;
}

Plite.resolve = function (result) {
  return Plite(function (resolve) {
    resolve(result);
  });
};

Plite.reject = function (err) {
  return Plite(function (resolve, reject) {
    reject(err);
  });
};

Plite.race = function (promises) {
  promises = promises || [];
  return Plite(function (resolve, reject) {
    var len = promises.length;
    if (!len) return resolve();

    for (var i = 0; i < len; ++i) {
      var p = promises[i];
      p && p.then && p.then(resolve).catch(reject);
    }
  });
};

Plite.all = function (promises) {
  promises = promises || [];
  return Plite(function (resolve, reject) {
    var len = promises.length,
        count = len;

    if (!len) return resolve();

    function decrement() {
      --count <= 0 && resolve(promises);
    }

    function waitFor(p, i) {
      if (p && p.then) {
        p.then(function (result) {
          promises[i] = result;
          decrement();
        }).catch(reject);
      } else {
        decrement();
      }
    }

    for (var i = 0; i < len; ++i) {
      waitFor(promises[i], i);
    }
  });
};

if (typeof module === 'object' && typeof define !== 'function') {
  module.exports = Plite;
}

},{}],19:[function(require,module,exports){
'use strict';

var _applicationFacade = require('complay/lib/application-facade');

var _applicationFacade2 = _interopRequireDefault(_applicationFacade);

var _applicationDomComponent = require('complay/lib/application-dom-component');

var _applicationDomComponent2 = _interopRequireDefault(_applicationDomComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Application = function (_ApplicationFacade) {
    _inherits(Application, _ApplicationFacade);

    function Application() {
        _classCallCheck(this, Application);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Application).apply(this, arguments));
    }

    return Application;
}(_applicationFacade2.default);

var app = new Application({
    observe: true,
    AppComponent: _applicationDomComponent2.default
});

app.immediate(function () {});

app.onDomReady(function () {});

},{"complay/lib/application-dom-component":12,"complay/lib/application-facade":13}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9jb21wbGF5L2RlZmF1bHQtY29uZmlnLmpzIiwiLi4vY29tcGxheS9leHRlbnNpb25zL2ZhbGxiYWNrL2ZhbGxiYWNrLmpzIiwiLi4vY29tcGxheS9leHRlbnNpb25zL3ZlbnQvdmVudC5qcyIsIi4uL2NvbXBsYXkvaGVscGVycy9hcnJheS9mcm9tLmpzIiwiLi4vY29tcGxheS9oZWxwZXJzL2FycmF5L3VuaXF1ZXMuanMiLCIuLi9jb21wbGF5L2hlbHBlcnMvZG9tL2RvbS1ub2RlLWFycmF5LmpzIiwiLi4vY29tcGxheS9oZWxwZXJzL2Vudmlyb25tZW50L2dldC1nbG9iYWwtb2JqZWN0LmpzIiwiLi4vY29tcGxheS9oZWxwZXJzL29iamVjdC9hc3NpZ24uanMiLCIuLi9jb21wbGF5L2hlbHBlcnMvc3RyaW5nL2Rhc2hlcml6ZS5qcyIsIi4uL2NvbXBsYXkvaGVscGVycy9zdHJpbmcvZXh0cmFjdC1vYmplY3QtbmFtZS5qcyIsIi4uL2NvbXBsYXkvaGVscGVycy9zdHJpbmcvbmFtZWQtdWlkLmpzIiwiLi4vY29tcGxheS9saWIvYXBwbGljYXRpb24tZG9tLWNvbXBvbmVudC5qcyIsIi4uL2NvbXBsYXkvbGliL2FwcGxpY2F0aW9uLWZhY2FkZS5qcyIsIi4uL2NvbXBsYXkvbGliL2Jhc2UuanMiLCIuLi9jb21wbGF5L2xpYi9jb21wb25lbnQuanMiLCIuLi9jb21wbGF5L2xpYi9tb2R1bGUuanMiLCIuLi9jb21wbGF5L2xpYi90eXBlcy5qcyIsIi4uL2NvbXBsYXkvbm9kZV9tb2R1bGVzL3BsaXRlL3BsaXRlLmpzIiwicmVzb3VyY2VzL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5SUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU0sVzs7Ozs7Ozs7Ozs7O0FBRU4sSUFBTSxNQUFNLElBQUksV0FBSixDQUFnQjtBQUN4QixhQUFTLElBRGU7QUFFeEI7QUFGd0IsQ0FBaEIsQ0FBWjs7QUFLQSxJQUFJLFNBQUosQ0FBYyxZQUFNLENBRW5CLENBRkQ7O0FBSUEsSUFBSSxVQUFKLENBQWUsWUFBTSxDQUVwQixDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnLCAnLi9leHRlbnNpb25zL2ZhbGxiYWNrL2ZhbGxiYWNrLmpzJywgJy4vZXh0ZW5zaW9ucy92ZW50L3ZlbnQuanMnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJy4vZXh0ZW5zaW9ucy9mYWxsYmFjay9mYWxsYmFjay5qcycpLCByZXF1aXJlKCcuL2V4dGVuc2lvbnMvdmVudC92ZW50LmpzJykpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cywgZ2xvYmFsLmZhbGxiYWNrLCBnbG9iYWwudmVudCk7XG5cdFx0Z2xvYmFsLmRlZmF1bHRDb25maWcgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIF9mYWxsYmFjaywgX3ZlbnQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBfZmFsbGJhY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmFsbGJhY2spO1xuXG5cdHZhciBfdmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZW50KTtcblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuXHRcdHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG5cdFx0XHRkZWZhdWx0OiBvYmpcblx0XHR9O1xuXHR9XG5cblx0dmFyIGRlZmF1bHRDb25maWcgPSB7XG5cdFx0dmVudDogX3ZlbnQyLmRlZmF1bHQsXG5cdFx0ZG9tOiAoMCwgX2ZhbGxiYWNrMi5kZWZhdWx0KSgnZG9tJyksXG5cdFx0dGVtcGxhdGU6ICgwLCBfZmFsbGJhY2syLmRlZmF1bHQpKCd0ZW1wbGF0ZScpXG5cdH07XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdENvbmZpZztcbn0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZhdWx0LWNvbmZpZy5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMpO1xuXHRcdGdsb2JhbC5mYWxsYmFjayA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZyc7XG5cblx0XHRcdGlmIChpc1N0cmluZyAmJiB0eXBlTWVzc2FnZXNCcm9hZGNhc3RlZC5pbmRleE9mKHR5cGUpID09PSAtMSkge1xuXHRcdFx0XHR2YXIgbXNnQXJyYXkgPSBbJ0V4dGVuc2lvbiBmb3IgXCInICsgdHlwZSArICdcIiBpcyBub3QgY29uZmlndXJlZCB5ZXQuXFxyXFxuJywgJ1BsZWFzZSBwYXNzIGFuIGV4dGVuc2lvbnMgdGhyb3VnaCBBcHBsaWNhdGlvbkZhY2FkZSBjb25zdHJ1Y3RvciBvcHRpb25zLicgKyB0eXBlICsgJ1xcclxcbicsICdvciBkaXJlY3RseSB0aHJvdWdoIE1vZHVsZSwgU2VydmljZSBvciBDb21wb25lbnQgdmlhIG9wdGlvbnMuYXBwLicgKyB0eXBlICsgJyEnXTtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4obXNnQXJyYXkuam9pbignJykpO1xuXG5cdFx0XHRcdHR5cGVNZXNzYWdlc0Jyb2FkY2FzdGVkLnB1c2godHlwZSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhcmd1bWVudHNbMF07XG5cdFx0fTtcblx0fTtcblxuXHR2YXIgdHlwZU1lc3NhZ2VzQnJvYWRjYXN0ZWQgPSBbXTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmFsbGJhY2suanMubWFwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdGZhY3RvcnkoZXhwb3J0cyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzKTtcblx0XHRnbG9iYWwudmVudCA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHMuZGVmYXVsdCA9IFZlbnQ7XG5cdHZhciB0YXJnZXRzID0gW107XG5cdHZhciBldmVudHMgPSB7fTtcblxuXHRmdW5jdGlvbiBWZW50KG5ld1RhcmdldCkge1xuXHRcdHZhciBlbXB0eSA9IFtdO1xuXHRcdHZhciBpbmRleCA9IHRhcmdldHMuaW5kZXhPZihuZXdUYXJnZXQpO1xuXHRcdHZhciB0YXJnZXQgPSB0YXJnZXRzW2luZGV4XTtcblxuXHRcdGlmIChpbmRleCA9PT0gLTEgfHwgIXRhcmdldCkge1xuXHRcdFx0dGFyZ2V0ID0gbmV3VGFyZ2V0IHx8IHRoaXM7XG5cblx0XHRcdGlmICghdGFyZ2V0LnVpZCkge1xuXHRcdFx0XHR0YXJnZXQudWlkID0gTWF0aC5yYW5kb20oKSArICcnO1xuXHRcdFx0fVxuXG5cdFx0XHR0YXJnZXRzLnB1c2godGFyZ2V0KTtcblx0XHRcdGluZGV4ID0gdGFyZ2V0cy5sZW5ndGggLSAxO1xuXG5cdFx0XHRldmVudHNbdGFyZ2V0c1tpbmRleF0udWlkXSA9IHt9O1xuXHRcdH1cblxuXHRcdC8qKlxuICAgKiAgT246IGxpc3RlbiB0byBldmVudHNcbiAgICovXG5cdFx0dGFyZ2V0Lm9uID0gZnVuY3Rpb24gKHR5cGUsIGZ1bmMsIGN0eCkge1xuXHRcdFx0KGV2ZW50c1t0YXJnZXRzW2luZGV4XS51aWRdW3R5cGVdID0gZXZlbnRzW3RhcmdldHNbaW5kZXhdLnVpZF1bdHlwZV0gfHwgW10pLnB1c2goW2Z1bmMsIGN0eF0pO1xuXHRcdH07XG5cdFx0LyoqXG4gICAqICBPZmY6IHN0b3AgbGlzdGVuaW5nIHRvIGV2ZW50IC8gc3BlY2lmaWMgY2FsbGJhY2tcbiAgICovXG5cdFx0dGFyZ2V0Lm9mZiA9IGZ1bmN0aW9uICh0eXBlLCBmdW5jKSB7XG5cdFx0XHR0eXBlIHx8IChldmVudHNbdGFyZ2V0c1tpbmRleF0udWlkXSA9IHt9KTtcblx0XHRcdHZhciBsaXN0ID0gZXZlbnRzW3RhcmdldHNbaW5kZXhdLnVpZF1bdHlwZV0gfHwgZW1wdHksXG5cdFx0XHQgICAgaSA9IGxpc3QubGVuZ3RoID0gZnVuYyA/IGxpc3QubGVuZ3RoIDogMDtcblx0XHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdFx0ZnVuYyA9PSBsaXN0W2ldWzBdICYmIGxpc3Quc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0LyoqIFxuICAgKiBUcmlnZ2VyOiBzZW5kIGV2ZW50LCBjYWxsYmFja3Mgd2lsbCBiZSB0cmlnZ2VyZWRcbiAgICovXG5cdFx0dGFyZ2V0LnRyaWdnZXIgPSBmdW5jdGlvbiAodHlwZSkge1xuXHRcdFx0dmFyIGxpc3QgPSBldmVudHNbdGFyZ2V0c1tpbmRleF0udWlkXVt0eXBlXSB8fCBlbXB0eSxcblx0XHRcdCAgICBpID0gMCxcblx0XHRcdCAgICBqID0gdm9pZCAwO1xuXHRcdFx0d2hpbGUgKGogPSBsaXN0W2krK10pIHtcblx0XHRcdFx0alswXS5hcHBseShqWzFdLCBlbXB0eS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gdGFyZ2V0c1tpbmRleF07XG5cdH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmVudC5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMpO1xuXHRcdGdsb2JhbC5mcm9tID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHRleHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKCFBcnJheS5mcm9tKSB7XG5cdFx0XHRBcnJheS5mcm9tID0gZnVuY3Rpb24gKG9iamVjdCkge1xuXHRcdFx0XHQndXNlIHN0cmljdCc7XG5cblx0XHRcdFx0cmV0dXJuIFtdLnNsaWNlLmNhbGwob2JqZWN0KTtcblx0XHRcdH07XG5cdFx0fVxuXHR9LmNhbGwodW5kZWZpbmVkKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJvbS5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMpO1xuXHRcdGdsb2JhbC51bmlxdWVzID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblx0ZXhwb3J0cy5kZWZhdWx0ID0gdW5pcXVlcztcblx0ZnVuY3Rpb24gdW5pcXVlcyhhcnIpIHtcblx0XHR2YXIgYSA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0aWYgKGEuaW5kZXhPZihhcnJbaV0pID09PSAtMSAmJiBhcnJbaV0gIT09ICcnKSBhLnB1c2goYXJyW2ldKTtcblx0XHR9cmV0dXJuIGE7XG5cdH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dW5pcXVlcy5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJywgJy4uL2FycmF5L2Zyb20nXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJy4uL2FycmF5L2Zyb20nKSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBnbG9iYWwuZnJvbSk7XG5cdFx0Z2xvYmFsLmRvbU5vZGVBcnJheSA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgX2Zyb20pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXHRleHBvcnRzLmRlZmF1bHQgPSBkb21Ob2RlQXJyYXk7XG5cblx0dmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG5cdFx0cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcblx0XHRcdGRlZmF1bHQ6IG9ialxuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBkb21Ob2RlQXJyYXkoaXRlbSwgY3R4KSB7XG5cblx0XHR2YXIgcmV0QXJyYXkgPSBbXTtcblxuXHRcdGN0eCA9IGN0eCB8fCBkb2N1bWVudDtcblxuXHRcdC8vIGNoZWNrcyBmb3IgdHlwZSBvZiBnaXZlbiBjb250ZXh0XG5cdFx0aWYgKGl0ZW0gPT09IGN0eCkge1xuXHRcdFx0Ly8gY29udGV4dCBpcyBpdGVtIGNhc2Vcblx0XHRcdHJldEFycmF5ID0gW2l0ZW1dO1xuXHRcdH0gZWxzZSBpZiAoaXRlbSAmJiBpdGVtLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuXHRcdFx0Ly8gZG9tIG5vZGUgY2FzZVxuXHRcdFx0cmV0QXJyYXkgPSBbaXRlbV07XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdC8vIHNlbGVjdG9yIGNhc2Vcblx0XHRcdHJldEFycmF5ID0gQXJyYXkuZnJvbShjdHgucXVlcnlTZWxlY3RvckFsbChpdGVtKSk7XG5cdFx0fSBlbHNlIGlmIChpdGVtICYmIGl0ZW0ubGVuZ3RoICYmIEFycmF5LmZyb20oaXRlbSkubGVuZ3RoID4gMCkge1xuXHRcdFx0Ly8gbm9kZWxpc3QgY2FzZVxuXHRcdFx0cmV0QXJyYXkgPSBBcnJheS5mcm9tKGl0ZW0pO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXRBcnJheTtcblx0fVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb20tbm9kZS1hcnJheS5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMpO1xuXHRcdGdsb2JhbC5nZXRHbG9iYWxPYmplY3QgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXHRleHBvcnRzLmRlZmF1bHQgPSBnZXRHbG9iYWxPYmplY3Q7XG5cdGZ1bmN0aW9uIGdldEdsb2JhbE9iamVjdCgpIHtcblx0XHQvLyBXb3JrZXJzIGRvbuKAmXQgaGF2ZSBgd2luZG93YCwgb25seSBgc2VsZmBcblx0XHRpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gZ2xvYmFsO1xuXHRcdH1cblx0XHQvLyBOb3QgYWxsIGVudmlyb25tZW50cyBhbGxvdyBldmFsIGFuZCBGdW5jdGlvblxuXHRcdC8vIFVzZSBvbmx5IGFzIGEgbGFzdCByZXNvcnQ6XG5cdFx0cmV0dXJuIG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldC1nbG9iYWwtb2JqZWN0LmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cyk7XG5cdFx0Z2xvYmFsLmFzc2lnbiA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgdG9PYmplY3QgPSBmdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0XHRcdFx0XHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBPYmplY3QodmFsKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXHRcdFx0XHR2YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblx0XHRcdFx0T2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHRcdFx0XHRcdHZhciBmcm9tO1xuXHRcdFx0XHRcdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdFx0XHRcdFx0dmFyIHN5bWJvbHM7XG5cblx0XHRcdFx0XHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdFx0XHRcdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0XHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0XHRcdFx0XHRzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiB0bztcblx0XHRcdFx0fTtcblx0XHRcdH0pKCk7XG5cdFx0fVxuXHR9KCk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzc2lnbi5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMpO1xuXHRcdGdsb2JhbC5kYXNoZXJpemUgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXHRleHBvcnRzLmRlZmF1bHQgPSBkYXNoZXJpemU7XG5cdGZ1bmN0aW9uIGRhc2hlcml6ZShzdHIpIHtcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL1tBLVpdL2csIGZ1bmN0aW9uIChjaGFyLCBpbmRleCkge1xuXHRcdFx0cmV0dXJuIChpbmRleCAhPT0gMCA/ICctJyA6ICcnKSArIGNoYXIudG9Mb3dlckNhc2UoKTtcblx0XHR9KTtcblx0fTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGFzaGVyaXplLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cyk7XG5cdFx0Z2xvYmFsLmV4dHJhY3RPYmplY3ROYW1lID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHR2YXIgZXh0cmFjdE9iamVjdE5hbWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0LyoqXG4gICAqIGV4dHJhY3RzIG5hbWUgb2YgYSBjbGFzcyBvciBhIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSAge29iamVjdH0gb2JqIGEgY2xhc3Mgb3IgYSBmdW5jdGlvblxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBxdWFsaWZpZWQgbmFtZSBvZiBhIGNsYXNzIG9yIGEgZnVuY3Rpb25cbiAgICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGV4dHJhY3RPYmplY3ROYW1lKG9iaikge1xuXG5cdFx0XHR2YXIgZnVuY05hbWVSZWdleCA9IC9eZnVuY3Rpb24gKFthLXpBLVowLTlfXSspXFwoXFwpLztcblx0XHRcdHZhciByZXN1bHRzID0gZnVuY05hbWVSZWdleC5leGVjKG9iai5jb25zdHJ1Y3Rvci50b1N0cmluZygpKTtcblxuXHRcdFx0cmV0dXJuIHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiAxID8gcmVzdWx0c1sxXSA6ICcnO1xuXHRcdH07XG5cdH0uY2FsbCh1bmRlZmluZWQpO1xuXG5cdGV4cG9ydHMuZGVmYXVsdCA9IGV4dHJhY3RPYmplY3ROYW1lO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leHRyYWN0LW9iamVjdC1uYW1lLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnLCAnLi9leHRyYWN0LW9iamVjdC1uYW1lJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCcuL2V4dHJhY3Qtb2JqZWN0LW5hbWUnKSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBnbG9iYWwuZXh0cmFjdE9iamVjdE5hbWUpO1xuXHRcdGdsb2JhbC5uYW1lZFVpZCA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgX2V4dHJhY3RPYmplY3ROYW1lKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHR2YXIgX2V4dHJhY3RPYmplY3ROYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4dHJhY3RPYmplY3ROYW1lKTtcblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuXHRcdHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG5cdFx0XHRkZWZhdWx0OiBvYmpcblx0XHR9O1xuXHR9XG5cblx0dmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcblx0XHRyZXR1cm4gdHlwZW9mIG9iajtcblx0fSA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuXHR9O1xuXG5cdHZhciBuYW1lZFVpZCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgY291bnRlcnMgPSB7fTtcblx0XHQvKipcbiAgICogYWRkcyBhIG51bWJlciBhcyBzdHJpbmcgdG8gYSBnaXZlbiBpZCBzdHJpbmdcbiAgICogaWYgYW4gaWQgc3RyaW5nIGNyZWF0ZWQgd2l0aCB0aGlzIG1ldGhvZCBhbHJlYWR5IGV4aXN0cyBcbiAgICogaXQgaW5jcmVhc2VzIHRoZSBudW1iZXIgZm9yIHRydWx5IHVuaXF1ZSBpZCdzXG4gICAqIEBwYXJhbSAge21peGVkfSBpZE9iamVjdCBAc2VlIGV4dHJhY3RPYmplY3ROYW1lIHdoaWNoIGV4dHJhY3RzIHRoYXQgc3RyaW5nXG4gICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHVpZCBmb3IgaWRlbnRpZnlpbmcgYW4gaW5zdGFuY2UsIHdoZW4gZGVidWdnaW5nIG9yIFxuICAgKiAgICAgICAgICAgICAgICAgIGZvciBhdXRvbWF0aWMgc2VsZWN0b3IgY3JlYXRpb25cbiAgICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIG5hbWVXaXRoSW5jcmVhc2luZ0lkKGlkT2JqZWN0KSB7XG5cblx0XHRcdHZhciBpZFN0cmluZyA9IHZvaWQgMDtcblxuXHRcdFx0aWYgKCh0eXBlb2YgaWRPYmplY3QgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGlkT2JqZWN0KSkgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdC8vIGNvdWxkIGJlIGEgY2xhc3MsIGZ1bmN0aW9uIG9yIG9iamVjdFxuXHRcdFx0XHQvLyBzbyB0cnkgdG8gZXh0cmFjdCB0aGUgbmFtZVxuXHRcdFx0XHRpZFN0cmluZyA9ICgwLCBfZXh0cmFjdE9iamVjdE5hbWUyLmRlZmF1bHQpKGlkT2JqZWN0KTtcblx0XHRcdH1cblxuXHRcdFx0aWRTdHJpbmcgPSBpZE9iamVjdDtcblxuXHRcdFx0aWYgKGNvdW50ZXJzW2lkU3RyaW5nXSkge1xuXG5cdFx0XHRcdGNvdW50ZXJzW2lkU3RyaW5nXSsrO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjb3VudGVyc1tpZFN0cmluZ10gPSAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gaWRTdHJpbmcgKyAnLScgKyBjb3VudGVyc1tpZFN0cmluZ107XG5cdFx0fTtcblx0fS5jYWxsKHVuZGVmaW5lZCk7XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gbmFtZWRVaWQ7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hbWVkLXVpZC5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJywgJy4vY29tcG9uZW50JywgJy4vdHlwZXMnLCAnLi4vaGVscGVycy9kb20vZG9tLW5vZGUtYXJyYXknLCAnLi4vaGVscGVycy9zdHJpbmcvZGFzaGVyaXplJywgJy4uL2hlbHBlcnMvYXJyYXkvdW5pcXVlcycsICcuLi9oZWxwZXJzL2FycmF5L2Zyb20nLCAnLi4vaGVscGVycy9vYmplY3QvYXNzaWduJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCcuL2NvbXBvbmVudCcpLCByZXF1aXJlKCcuL3R5cGVzJyksIHJlcXVpcmUoJy4uL2hlbHBlcnMvZG9tL2RvbS1ub2RlLWFycmF5JyksIHJlcXVpcmUoJy4uL2hlbHBlcnMvc3RyaW5nL2Rhc2hlcml6ZScpLCByZXF1aXJlKCcuLi9oZWxwZXJzL2FycmF5L3VuaXF1ZXMnKSwgcmVxdWlyZSgnLi4vaGVscGVycy9hcnJheS9mcm9tJyksIHJlcXVpcmUoJy4uL2hlbHBlcnMvb2JqZWN0L2Fzc2lnbicpKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIGdsb2JhbC5jb21wb25lbnQsIGdsb2JhbC50eXBlcywgZ2xvYmFsLmRvbU5vZGVBcnJheSwgZ2xvYmFsLmRhc2hlcml6ZSwgZ2xvYmFsLnVuaXF1ZXMsIGdsb2JhbC5mcm9tLCBnbG9iYWwuYXNzaWduKTtcblx0XHRnbG9iYWwuYXBwbGljYXRpb25Eb21Db21wb25lbnQgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIF9jb21wb25lbnQsIF90eXBlcywgX2RvbU5vZGVBcnJheSwgX2Rhc2hlcml6ZSwgX3VuaXF1ZXMsIF9mcm9tLCBfYXNzaWduKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHR2YXIgX2NvbXBvbmVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb25lbnQpO1xuXG5cdHZhciBfZG9tTm9kZUFycmF5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RvbU5vZGVBcnJheSk7XG5cblx0dmFyIF9kYXNoZXJpemUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGFzaGVyaXplKTtcblxuXHR2YXIgX3VuaXF1ZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdW5pcXVlcyk7XG5cblx0dmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5cdHZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuXHRcdFx0ZGVmYXVsdDogb2JqXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcblx0XHRpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG5cdFx0aWYgKCFzZWxmKSB7XG5cdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG5cdH1cblxuXHR2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuXHRcdGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuXHRcdFx0XHRkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG5cdFx0XHRcdGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0XHRcdFx0aWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG5cdFx0XHRpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuXHRcdFx0aWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG5cdFx0XHRyZXR1cm4gQ29uc3RydWN0b3I7XG5cdFx0fTtcblx0fSgpO1xuXG5cdGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuXHRcdGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuXHRcdH1cblxuXHRcdHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0Y29uc3RydWN0b3I6IHtcblx0XHRcdFx0dmFsdWU6IHN1YkNsYXNzLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcblx0fVxuXG5cdHZhciBBcHBsaWNhdGlvbkRvbUNvbXBvbmVudCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG5cdFx0X2luaGVyaXRzKEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50LCBfQ29tcG9uZW50KTtcblxuXHRcdF9jcmVhdGVDbGFzcyhBcHBsaWNhdGlvbkRvbUNvbXBvbmVudCwgW3tcblx0XHRcdGtleTogJ2VsZW1lbnRzJyxcblx0XHRcdHNldDogZnVuY3Rpb24gc2V0KG1vZHVsZU9wdGlvbnMpIHtcblx0XHRcdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRcdFx0dmFyIGNvbnRleHRzID0gW107XG5cdFx0XHRcdHZhciBlbGVtZW50cyA9IFtdO1xuXG5cdFx0XHRcdHRoaXMuX2VsZW1lbnRzID0gdGhpcy5fZWxlbWVudHMgfHwgW107XG5cdFx0XHRcdHRoaXMuX25ld0VsZW1lbnRzID0gW107XG5cblx0XHRcdFx0Ly8gaWYgaXRlbSBoYXMgbm8gY29udGV4dCwgcGFzcyBhcHBsaWNhdGlvbiBkb20gY29udGV4dFxuXHRcdFx0XHRpZiAodGhpcy5vcHRpb25zLmNvbnRleHQgJiYgIW1vZHVsZU9wdGlvbnMuY29udGV4dCkge1xuXHRcdFx0XHRcdC8vIHRoaXMgYXBwbGljYXRpb24gZmFjYWRlIGlzIGxpbWl0ZWQgdG8gYSBzcGVjaWZpYyBkb20gZWxlbWVudFxuXHRcdFx0XHRcdG1vZHVsZU9wdGlvbnMuY29udGV4dCA9IHRoaXMub3B0aW9ucy5jb250ZXh0O1xuXHRcdFx0XHRcdGNvbnRleHRzID0gKDAsIF9kb21Ob2RlQXJyYXkyLmRlZmF1bHQpKHRoaXMub3B0aW9ucy5jb250ZXh0KTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuY29udGV4dCA9PT0gbW9kdWxlT3B0aW9ucy5jb250ZXh0KSB7XG5cdFx0XHRcdFx0Ly8gaWYgbW9kdWxlIGNvbnRleHQgaXMgc2FtZSBsaWtlIGFwcCBjb250ZXh0XG5cdFx0XHRcdFx0Y29udGV4dHMgPSAoMCwgX2RvbU5vZGVBcnJheTIuZGVmYXVsdCkodGhpcy5vcHRpb25zLmNvbnRleHQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb250ZXh0LmNvbnRhaW5zKG1vZHVsZU9wdGlvbnMuY29udGV4dCkpIHtcblx0XHRcdFx0XHQvLyBpZiBtb2R1bGUgY29udGV4dCBpcyBpbmNsdWRlZCBpbiBjdXJyZW50IGNvbnRleHRcblx0XHRcdFx0XHRjb250ZXh0cyA9ICgwLCBfZG9tTm9kZUFycmF5Mi5kZWZhdWx0KShtb2R1bGVPcHRpb25zLmNvbnRleHQsIHRoaXMub3B0aW9ucy5jb250ZXh0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBlbHNlIGlmIGl0IGlzIG5vdCBpbiB0aGUgZG9tLFxuXHRcdFx0XHRcdC8vIGNyZWF0ZSBmcmFnbWVudCBhbmQgdXNlIHRoaXMgYXMgY29udGV4dFxuXHRcdFx0XHRcdCgwLCBfZG9tTm9kZUFycmF5Mi5kZWZhdWx0KShtb2R1bGVPcHRpb25zLmNvbnRleHQpLmZvckVhY2goZnVuY3Rpb24gKGN0eCkge1xuXHRcdFx0XHRcdFx0dmFyIHRlbXBDdHggPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cdFx0XHRcdFx0XHR0ZW1wQ3R4LmFwcGVuZENoaWxkKGN0eCk7XG5cdFx0XHRcdFx0XHRjb250ZXh0cy5wdXNoKHRlbXBDdHgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29udGV4dHMuZm9yRWFjaChmdW5jdGlvbiAoY3R4KSB7XG5cdFx0XHRcdFx0ZWxlbWVudHMgPSBBcnJheS5mcm9tKGN0eC5xdWVyeVNlbGVjdG9yQWxsKF90aGlzMi5vcHRpb25zLm1vZHVsZVNlbGVjdG9yKSk7XG5cdFx0XHRcdFx0X3RoaXMyLl9uZXdFbGVtZW50cyA9IGVsZW1lbnRzO1xuXHRcdFx0XHRcdF90aGlzMi5fZWxlbWVudHMgPSAoMCwgX3VuaXF1ZXMyLmRlZmF1bHQpKF90aGlzMi5fZWxlbWVudHMuY29uY2F0KGVsZW1lbnRzKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXG5cdFx0XHRcdHJldHVybiB0aGlzLl9lbGVtZW50cztcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICduZXdFbGVtZW50cycsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX25ld0VsZW1lbnRzO1xuXHRcdFx0fVxuXHRcdH1dKTtcblxuXHRcdGZ1bmN0aW9uIEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50KCkge1xuXHRcdFx0dmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXHRcdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50KTtcblxuXHRcdFx0dmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50KS5jYWxsKHRoaXMsIG9wdGlvbnMpKTtcblxuXHRcdFx0aWYgKG9wdGlvbnMub2JzZXJ2ZSkge1xuXHRcdFx0XHRfdGhpcy5vYnNlcnZlKG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF90aGlzO1xuXHRcdH1cblxuXHRcdF9jcmVhdGVDbGFzcyhBcHBsaWNhdGlvbkRvbUNvbXBvbmVudCwgW3tcblx0XHRcdGtleTogJ3N0YXJ0Q29tcG9uZW50cycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gc3RhcnRDb21wb25lbnRzKGl0ZW0sIG9wdGlvbnMpIHtcblx0XHRcdFx0dmFyIF90aGlzMyA9IHRoaXM7XG5cblx0XHRcdFx0dmFyIGVsZW1lbnRBcnJheSA9IFtdO1xuXHRcdFx0XHR2YXIgaW5zdGFuY2VzID0gW107XG5cblx0XHRcdFx0Ly8gaGFuZGxlIGVzNSBleHRlbmRzIGFuZCBuYW1lIHByb3BlcnR5XG5cdFx0XHRcdGlmICgoIWl0ZW0ubmFtZSB8fCBpdGVtLm5hbWUgPT09ICdjaGlsZCcpICYmIGl0ZW0ucHJvdG90eXBlLl9uYW1lKSB7XG5cdFx0XHRcdFx0aXRlbS5lczVuYW1lID0gaXRlbS5wcm90b3R5cGUuX25hbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50QXJyYXkgPSAoMCwgX2RvbU5vZGVBcnJheTIuZGVmYXVsdCkob3B0aW9ucy5lbCk7XG5cblx0XHRcdFx0aWYgKGVsZW1lbnRBcnJheS5sZW5ndGggPT09IDApIHtcblxuXHRcdFx0XHRcdHRoaXMuZWxlbWVudHMgPSBvcHRpb25zO1xuXHRcdFx0XHRcdGVsZW1lbnRBcnJheSA9IHRoaXMubmV3RWxlbWVudHM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlbGVtZW50QXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoZG9tTm9kZSkge1xuXG5cdFx0XHRcdFx0dmFyIGl0ZW1JbnN0YW5jZSA9IF90aGlzMy5zdGFydENvbXBvbmVudChpdGVtLCBvcHRpb25zLCBkb21Ob2RlKTtcblxuXHRcdFx0XHRcdGlmIChpdGVtSW5zdGFuY2UpIHtcblx0XHRcdFx0XHRcdGluc3RhbmNlcy5wdXNoKGl0ZW1JbnN0YW5jZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gaW5zdGFuY2VzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3N0YXJ0Q29tcG9uZW50Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzdGFydENvbXBvbmVudChpdGVtLCBvcHRpb25zLCBkb21Ob2RlKSB7XG5cdFx0XHRcdHZhciBuYW1lID0gaXRlbS5lczVuYW1lIHx8IGl0ZW0ubmFtZTtcblx0XHRcdFx0dmFyIGl0ZW1JbnN0YW5jZSA9IHZvaWQgMDtcblx0XHRcdFx0dmFyIG1vZHVsZUF0dHJpYnV0ZSA9IGRvbU5vZGUuZ2V0QXR0cmlidXRlKHRoaXMubW9kdWxlQXR0cmlidXRlKTtcblxuXHRcdFx0XHRpZiAobmFtZSAmJiBtb2R1bGVBdHRyaWJ1dGUgJiYgbW9kdWxlQXR0cmlidXRlLmluZGV4T2YoKDAsIF9kYXNoZXJpemUyLmRlZmF1bHQpKG5hbWUpKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRvcHRpb25zLmVsID0gZG9tTm9kZTtcblx0XHRcdFx0XHRvcHRpb25zLmFwcCA9IG9wdGlvbnMuYXBwIHx8IHRoaXMuYXBwO1xuXHRcdFx0XHRcdG9wdGlvbnMubW9kdWxlU2VsZWN0b3IgPSBvcHRpb25zLm1vZHVsZVNlbGVjdG9yIHx8IHRoaXMub3B0aW9ucy5tb2R1bGVTZWxlY3RvcjtcblxuXHRcdFx0XHRcdGl0ZW1JbnN0YW5jZSA9IG5ldyBpdGVtKG9wdGlvbnMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGl0ZW1JbnN0YW5jZTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdvYnNlcnZlJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBvYnNlcnZlKCkge1xuXHRcdFx0XHR2YXIgX3RoaXM0ID0gdGhpcztcblxuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cblx0XHRcdFx0dmFyIGNvbmZpZyA9IHtcblx0XHRcdFx0XHRhdHRyaWJ1dGVzOiB0cnVlLFxuXHRcdFx0XHRcdGNoaWxkTGlzdDogdHJ1ZSxcblx0XHRcdFx0XHRjaGFyYWN0ZXJEYXRhOiB0cnVlXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0dmFyIG9ic2VydmVkTm9kZSA9IHRoaXMub3B0aW9ucy5jb250ZXh0O1xuXG5cdFx0XHRcdC8vIGNhbm5vdCBvYnNlcnZlIGRvY3VtZW50XG5cdFx0XHRcdGlmIChvYnNlcnZlZE5vZGUuY29udGFpbnMoZG9jdW1lbnQuYm9keSkpIHtcblx0XHRcdFx0XHRvYnNlcnZlZE5vZGUgPSBkb2N1bWVudC5ib2R5O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uZmlnID0gT2JqZWN0LmFzc2lnbihvcHRpb25zLmNvbmZpZyB8fCB7fSwgY29uZmlnKTtcblxuXHRcdFx0XHRpZiAod2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpIHtcblxuXHRcdFx0XHRcdHRoaXMub2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG5cdFx0XHRcdFx0XHRtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24pIHtcblx0XHRcdFx0XHRcdFx0aWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnICYmIG11dGF0aW9uLmFkZGVkTm9kZXMubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2cobXV0YXRpb24uYWRkZWROb2Rlcyk7XG5cblx0XHRcdFx0XHRcdFx0XHRfdGhpczQub25BZGRlZE5vZGVzKG11dGF0aW9uLmFkZGVkTm9kZXMpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnICYmIG11dGF0aW9uLnJlbW92ZWROb2Rlcy5sZW5ndGggPiAwKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhtdXRhdGlvbi5yZW1vdmVkTm9kZXMpO1xuXG5cdFx0XHRcdFx0XHRcdFx0X3RoaXM0Lm9uUmVtb3ZlZE5vZGVzKG11dGF0aW9uLnJlbW92ZWROb2Rlcyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dGhpcy5vYnNlcnZlci5vYnNlcnZlKG9ic2VydmVkTm9kZSwgY29uZmlnKTtcblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdC8vIEB0b2RvOiBuZWVkcyB0ZXN0IGluIElFOSAmIElFMTBcblxuXHRcdFx0XHRcdHRoaXMub25BZGRlZE5vZGVzQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0X3RoaXM0Lm9uQWRkZWROb2RlcyhlLnRhcmdldCk7XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR0aGlzLm9uUmVtb3ZlZE5vZGVzQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0X3RoaXM0Lm9uUmVtb3ZlZE5vZGVzKGUudGFyZ2V0KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0b2JzZXJ2ZWROb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU5vZGVJbnNlcnRlZCcsIHRoaXMub25BZGRlZE5vZGVzQ2FsbGJhY2ssIGZhbHNlKTtcblx0XHRcdFx0XHRvYnNlcnZlZE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignRE9NTm9kZVJlbW92ZWQnLCB0aGlzLm9uUmVtb3ZlZE5vZGVzQ2FsbGJhY2ssIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ29uQWRkZWROb2RlcycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gb25BZGRlZE5vZGVzKGFkZGVkTm9kZXMpIHtcblx0XHRcdFx0dmFyIF90aGlzNSA9IHRoaXM7XG5cblx0XHRcdFx0dGhpcy5hcHAuZmluZE1hdGNoaW5nUmVnaXN0cnlJdGVtcyhfdHlwZXMuQ09NUE9ORU5UX1RZUEUpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcblxuXHRcdFx0XHRcdHZhciBtb2QgPSBpdGVtLm1vZHVsZTtcblxuXHRcdFx0XHRcdCgwLCBfZG9tTm9kZUFycmF5Mi5kZWZhdWx0KShhZGRlZE5vZGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChjdHgpIHtcblxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ0NPTlRFWFQnLCBjdHgpO1xuXG5cdFx0XHRcdFx0XHRpZiAoY3R4Lm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBfdGhpczUubWF0Y2hlc1NlbGVjdG9yKGN0eCwgX3RoaXM1Lm9wdGlvbnMubW9kdWxlU2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0XHRcdF90aGlzNS5hcHAuc3RhcnRDb21wb25lbnQobW9kLCB7IGNvbnRleHQ6IGN0eC5wYXJlbnRFbGVtZW50IH0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChjdHgubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG5cdFx0XHRcdFx0XHRcdF90aGlzNS5hcHAuc3RhcnRDb21wb25lbnQobW9kLCB7IGNvbnRleHQ6IGN0eCB9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnb25SZW1vdmVkTm9kZXMnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIG9uUmVtb3ZlZE5vZGVzKHJlbW92ZWROb2Rlcykge1xuXHRcdFx0XHR2YXIgX3RoaXM2ID0gdGhpcztcblxuXHRcdFx0XHR2YXIgY29tcG9uZW50UmVnaXN0cnlJdGVtcyA9IHRoaXMuYXBwLmZpbmRNYXRjaGluZ1JlZ2lzdHJ5SXRlbXMoX3R5cGVzLkNPTVBPTkVOVF9UWVBFKTtcblx0XHRcdFx0dmFyIGNvbXBvbmVudE5vZGVzID0gW107XG5cblx0XHRcdFx0KDAsIF9kb21Ob2RlQXJyYXkyLmRlZmF1bHQpKHJlbW92ZWROb2RlcykuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0XHRcdC8vIHB1c2ggb3V0ZXJtb3N0IGlmIG1vZHVsZVxuXHRcdFx0XHRcdGlmIChfdGhpczYubWF0Y2hlc1NlbGVjdG9yKG5vZGUsIF90aGlzNi5vcHRpb25zLm1vZHVsZVNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdFx0Y29tcG9uZW50Tm9kZXMucHVzaChub2RlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBwdXNoIGNoaWxkcmVuIGlmIG1vZHVsZVxuXHRcdFx0XHRcdCgwLCBfZG9tTm9kZUFycmF5Mi5kZWZhdWx0KShub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoX3RoaXM2Lm9wdGlvbnMubW9kdWxlU2VsZWN0b3IpKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVFbCkge1xuXHRcdFx0XHRcdFx0aWYgKF90aGlzNi5tYXRjaGVzU2VsZWN0b3IobW9kdWxlRWwsIF90aGlzNi5vcHRpb25zLm1vZHVsZVNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdFx0XHRjb21wb25lbnROb2Rlcy5wdXNoKG1vZHVsZUVsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gaXRlcmF0ZSBvdmVyIGNvbXBvbmVudCByZWdpc3RyeSBpdGVtc1xuXHRcdFx0XHRjb21wb25lbnRSZWdpc3RyeUl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKHJlZ2lzdHJ5SXRlbSkge1xuXHRcdFx0XHRcdC8vIGl0ZXJhdGUgb3ZlciBzdGFydGVkIGluc3RhbmNlc1xuXHRcdFx0XHRcdHJlZ2lzdHJ5SXRlbS5pbnN0YW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5zdCkge1xuXHRcdFx0XHRcdFx0Ly8gaWYgY29tcG9uZW50IGVsIGlzIHdpdGhpbiByZW1vdmVOb2Rlc1xuXHRcdFx0XHRcdFx0Ly8gZGVzdHJveSBpbnN0YW5jZVxuXHRcdFx0XHRcdFx0aWYgKGNvbXBvbmVudE5vZGVzLmluZGV4T2YoaW5zdC5lbCkgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHRfdGhpczYuYXBwLmRlc3Ryb3koaW5zdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3N0b3BPYnNlcnZpbmcnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHN0b3BPYnNlcnZpbmcoKSB7XG5cdFx0XHRcdGlmICh3aW5kb3cuTXV0YXRpb25PYnNlcnZlcikge1xuXHRcdFx0XHRcdHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhciBvYnNlcnZlZE5vZGUgPSB0aGlzLm9wdGlvbnMuY29udGV4dCB8fCBkb2N1bWVudC5ib2R5O1xuXHRcdFx0XHRcdG9ic2VydmVkTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NTm9kZUluc2VydGVkXCIsIHRoaXMub25BZGRlZE5vZGVzQ2FsbGJhY2spO1xuXHRcdFx0XHRcdG9ic2VydmVkTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiRE9NTm9kZVJlbW92ZWRcIiwgdGhpcy5vblJlbW92ZWROb2Rlc0NhbGxiYWNrKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1dKTtcblxuXHRcdHJldHVybiBBcHBsaWNhdGlvbkRvbUNvbXBvbmVudDtcblx0fShfY29tcG9uZW50Mi5kZWZhdWx0KTtcblxuXHRleHBvcnRzLmRlZmF1bHQgPSBBcHBsaWNhdGlvbkRvbUNvbXBvbmVudDtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwbGljYXRpb24tZG9tLWNvbXBvbmVudC5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJywgJy4vbW9kdWxlJywgJy4vdHlwZXMnLCAnLi4vaGVscGVycy9lbnZpcm9ubWVudC9nZXQtZ2xvYmFsLW9iamVjdCcsICcuLi9oZWxwZXJzL29iamVjdC9hc3NpZ24nXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJy4vbW9kdWxlJyksIHJlcXVpcmUoJy4vdHlwZXMnKSwgcmVxdWlyZSgnLi4vaGVscGVycy9lbnZpcm9ubWVudC9nZXQtZ2xvYmFsLW9iamVjdCcpLCByZXF1aXJlKCcuLi9oZWxwZXJzL29iamVjdC9hc3NpZ24nKSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBnbG9iYWwubW9kdWxlLCBnbG9iYWwudHlwZXMsIGdsb2JhbC5nZXRHbG9iYWxPYmplY3QsIGdsb2JhbC5hc3NpZ24pO1xuXHRcdGdsb2JhbC5hcHBsaWNhdGlvbkZhY2FkZSA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgX21vZHVsZSwgX3R5cGVzLCBfZ2V0R2xvYmFsT2JqZWN0LCBfYXNzaWduKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHR2YXIgX21vZHVsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tb2R1bGUpO1xuXG5cdHZhciBfZ2V0R2xvYmFsT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEdsb2JhbE9iamVjdCk7XG5cblx0dmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuXHRcdHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG5cdFx0XHRkZWZhdWx0OiBvYmpcblx0XHR9O1xuXHR9XG5cblx0dmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcblx0XHRyZXR1cm4gdHlwZW9mIG9iajtcblx0fSA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcblx0XHRpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG5cdFx0aWYgKCFzZWxmKSB7XG5cdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG5cdH1cblxuXHR2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuXHRcdGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuXHRcdFx0XHRkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG5cdFx0XHRcdGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0XHRcdFx0aWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG5cdFx0XHRpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuXHRcdFx0aWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG5cdFx0XHRyZXR1cm4gQ29uc3RydWN0b3I7XG5cdFx0fTtcblx0fSgpO1xuXG5cdGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuXHRcdGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuXHRcdH1cblxuXHRcdHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0Y29uc3RydWN0b3I6IHtcblx0XHRcdFx0dmFsdWU6IHN1YkNsYXNzLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcblx0fVxuXG5cdHZhciByb290ID0gKDAsIF9nZXRHbG9iYWxPYmplY3QyLmRlZmF1bHQpKCk7XG5cblx0dmFyIEFwcGxpY2F0aW9uRmFjYWRlID0gZnVuY3Rpb24gKF9Nb2R1bGUpIHtcblx0XHRfaW5oZXJpdHMoQXBwbGljYXRpb25GYWNhZGUsIF9Nb2R1bGUpO1xuXG5cdFx0X2NyZWF0ZUNsYXNzKEFwcGxpY2F0aW9uRmFjYWRlLCBbe1xuXHRcdFx0a2V5OiAnZ2V0TW9kdWxlSW5zdGFuY2VCeU5hbWUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGdldE1vZHVsZUluc3RhbmNlQnlOYW1lKG1vZHVsZUNvbnN0cnVjdG9yTmFtZSwgaW5kZXgpIHtcblxuXHRcdFx0XHR2YXIgZm91bmRNb2R1bGVJbnN0YW5jZXMgPSB0aGlzLmZpbmRNYXRjaGluZ1JlZ2lzdHJ5SXRlbXMobW9kdWxlQ29uc3RydWN0b3JOYW1lKTtcblxuXHRcdFx0XHRpZiAoaXNOYU4oaW5kZXgpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZvdW5kTW9kdWxlSW5zdGFuY2VzLm1hcChmdW5jdGlvbiAoaW5zdCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGluc3QubW9kdWxlO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGZvdW5kTW9kdWxlSW5zdGFuY2VzW2luZGV4XSAmJiBmb3VuZE1vZHVsZUluc3RhbmNlc1tpbmRleF0ubW9kdWxlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZvdW5kTW9kdWxlSW5zdGFuY2VzW2luZGV4XS5tb2R1bGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdtb2R1bGVzJyxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbW9kdWxlcztcblx0XHRcdH1cblx0XHR9XSk7XG5cblx0XHRmdW5jdGlvbiBBcHBsaWNhdGlvbkZhY2FkZSgpIHtcblx0XHRcdHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cblx0XHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBcHBsaWNhdGlvbkZhY2FkZSk7XG5cblx0XHRcdHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihBcHBsaWNhdGlvbkZhY2FkZSkuY2FsbCh0aGlzLCBvcHRpb25zKSk7XG5cblx0XHRcdF90aGlzLl9tb2R1bGVzID0gW107XG5cblx0XHRcdF90aGlzLnZlbnQgPSBvcHRpb25zLnZlbnQ7XG5cdFx0XHRfdGhpcy5kb20gPSBvcHRpb25zLmRvbTtcblx0XHRcdF90aGlzLnRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZTtcblxuXHRcdFx0aWYgKG9wdGlvbnMuQXBwQ29tcG9uZW50KSB7XG5cdFx0XHRcdF90aGlzLmFwcENvbXBvbmVudCA9IG5ldyBvcHRpb25zLkFwcENvbXBvbmVudChPYmplY3QuYXNzaWduKG9wdGlvbnMsIHtcblx0XHRcdFx0XHRhcHA6IF90aGlzLFxuXHRcdFx0XHRcdGNvbnRleHQ6IG9wdGlvbnMuY29udGV4dCB8fCBkb2N1bWVudCxcblx0XHRcdFx0XHRtb2R1bGVTZWxlY3Rvcjogb3B0aW9ucy5tb2R1bGVTZWxlY3RvciB8fCAnW2RhdGEtanMtY29tcG9uZW50XSdcblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5tb2R1bGVzKSB7XG5cdFx0XHRcdF90aGlzLnN0YXJ0LmFwcGx5KF90aGlzLCBvcHRpb25zLm1vZHVsZXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIF90aGlzO1xuXHRcdH1cblxuXHRcdF9jcmVhdGVDbGFzcyhBcHBsaWNhdGlvbkZhY2FkZSwgW3tcblx0XHRcdGtleTogJ2ZpbmRNYXRjaGluZ1JlZ2lzdHJ5SXRlbXMnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGZpbmRNYXRjaGluZ1JlZ2lzdHJ5SXRlbXMoaXRlbSkge1xuXG5cdFx0XHRcdGlmIChpdGVtID09PSAnKicpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fbW9kdWxlcztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzLl9tb2R1bGVzLmZpbHRlcihmdW5jdGlvbiAobW9kKSB7XG5cdFx0XHRcdFx0aWYgKG1vZCA9PT0gaXRlbSB8fCBtb2QubW9kdWxlID09PSBpdGVtIHx8IHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyAmJiBtb2QubW9kdWxlLnR5cGUgPT09IGl0ZW0gfHwgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnICYmIG1vZC5tb2R1bGUubmFtZSA9PT0gaXRlbSB8fCAodHlwZW9mIGl0ZW0gPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGl0ZW0pKSA9PT0gJ29iamVjdCcgJiYgaXRlbS51aWQgJiYgbW9kLmluc3RhbmNlcy5pbmRleE9mKGl0ZW0pID4gLTEpIHtcblx0XHRcdFx0XHRcdHJldHVybiBtb2Q7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdpbW1lZGlhdGUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGltbWVkaWF0ZShjYikge1xuXHRcdFx0XHRjYi5jYWxsKHRoaXMpO1xuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ29uRG9tUmVhZHknLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIG9uRG9tUmVhZHkoY2IpIHtcblx0XHRcdFx0aWYgKCFyb290LmRvY3VtZW50IHx8IHJvb3QuZG9jdW1lbnQgJiYgcm9vdC5kb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnKSB7XG5cdFx0XHRcdFx0Y2IuY2FsbCh0aGlzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgY2IuYmluZCh0aGlzKSwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnb25XaW5kb3dMb2FkZWQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIG9uV2luZG93TG9hZGVkKGNiKSB7XG5cdFx0XHRcdGlmICghcm9vdC5kb2N1bWVudCB8fCByb290LmRvY3VtZW50ICYmIHJvb3QuZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuXHRcdFx0XHRcdGNiLmNhbGwodGhpcyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cm9vdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2IuYmluZCh0aGlzKSwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnc3RhcnQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuXHRcdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0XHRmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuXHRcdFx0XHRcdGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXJncy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0YXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcpIHtcblx0XHRcdFx0XHRcdF90aGlzMi5zdGFydChhcmcpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBpdGVtID0gYXJnc1swXTtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSB7fTtcblx0XHRcdFx0dmFyIG9wdGlvbnNLZXlOYW1lcyA9IFsnc2V0dXAnLCAnY29uZmlnJywgJ29wdGlvbnMnXTtcblx0XHRcdFx0dmFyIG9wdGlvbnNLZXkgPSB2b2lkIDA7XG5cdFx0XHRcdHZhciBtb2R1bGVLZXlOYW1lcyA9IFtfdHlwZXMuTU9EVUxFX1RZUEUsIF90eXBlcy5TRVJWSUNFX1RZUEUsIF90eXBlcy5DT01QT05FTlRfVFlQRV07XG5cdFx0XHRcdHZhciBtb2R1bGVLZXkgPSB2b2lkIDA7XG5cblx0XHRcdFx0aWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihpdGVtKSA9PT0gT2JqZWN0LnByb3RvdHlwZSkge1xuXHRcdFx0XHRcdHZhciBrZXlzID0gT2JqZWN0LmtleXMoaXRlbSk7XG5cdFx0XHRcdFx0bW9kdWxlS2V5ID0ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIH5tb2R1bGVLZXlOYW1lcy5pbmRleE9mKGtleSk7XG5cdFx0XHRcdFx0fSlbMF0gfHwga2V5c1swXTtcblx0XHRcdFx0XHRvcHRpb25zS2V5ID0ga2V5cy5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIH5vcHRpb25zS2V5TmFtZXMuaW5kZXhPZihrZXkpO1xuXHRcdFx0XHRcdH0pWzBdIHx8IGtleXNbMV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBpZiBwYXNzZWQgbGlrZSB7bW9kdWxlOiBTb21lTW9kdWxlLCBvcHRpb25zOiB7fX1cblx0XHRcdFx0aWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZihpdGVtKSA9PT0gT2JqZWN0LnByb3RvdHlwZSAmJiBtb2R1bGVLZXkgJiYgaXRlbVttb2R1bGVLZXldKSB7XG5cblx0XHRcdFx0XHRvcHRpb25zID0gaXRlbVtvcHRpb25zS2V5XSB8fCB7fTtcblx0XHRcdFx0XHRpdGVtID0gaXRlbVttb2R1bGVLZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuc3RhcnRNb2R1bGVzKGl0ZW0sIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3N0b3AnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG5cdFx0XHRcdHZhciBfdGhpczMgPSB0aGlzO1xuXG5cdFx0XHRcdGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG5cdFx0XHRcdFx0YXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFyZ3MubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG5cdFx0XHRcdFx0XHRfdGhpczMuc3RvcChhcmcpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBpdGVtID0gYXJnc1swXTtcblxuXHRcdFx0XHR0aGlzLmZpbmRNYXRjaGluZ1JlZ2lzdHJ5SXRlbXMoaXRlbSkuZm9yRWFjaChmdW5jdGlvbiAocmVnaXN0cnlJdGVtKSB7XG5cdFx0XHRcdFx0dmFyIG1vZHVsZSA9IHJlZ2lzdHJ5SXRlbS5tb2R1bGU7XG5cblx0XHRcdFx0XHRyZWdpc3RyeUl0ZW0uaW5zdGFuY2VzLmZvckVhY2goZnVuY3Rpb24gKGluc3QpIHtcblxuXHRcdFx0XHRcdFx0aWYgKG1vZHVsZS50eXBlID09PSBfdHlwZXMuQ09NUE9ORU5UX1RZUEUpIHtcblx0XHRcdFx0XHRcdFx0Ly8gdW5kZWxlZ2F0ZSBldmVudHMgaWYgY29tcG9uZW50XG5cdFx0XHRcdFx0XHRcdGluc3QudW5kZWxlZ2F0ZUV2ZW50cygpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChtb2R1bGUudHlwZSA9PT0gX3R5cGVzLlNFUlZJQ0VfVFlQRSkge1xuXHRcdFx0XHRcdFx0XHQvLyBkaXNjb25uZWN0IGlmIHNlcnZpY2Vcblx0XHRcdFx0XHRcdFx0aW5zdC5kaXNjb25uZWN0KCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIHVuZGVsZWdhdGUgdmVudHMgZm9yIGFsbFxuXHRcdFx0XHRcdFx0aW5zdC51bmRlbGVnYXRlVmVudHMoKTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8vIHJ1bm5pbmcgZmFsc2Vcblx0XHRcdFx0XHRyZWdpc3RyeUl0ZW0ucnVubmluZyA9IGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdzdGFydE1vZHVsZXMnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHN0YXJ0TW9kdWxlcyhpdGVtLCBvcHRpb25zKSB7XG5cblx0XHRcdFx0b3B0aW9ucy5hcHAgPSBvcHRpb25zLmFwcCB8fCB0aGlzO1xuXG5cdFx0XHRcdGlmIChpdGVtLnR5cGUgPT09IF90eXBlcy5DT01QT05FTlRfVFlQRSkge1xuXHRcdFx0XHRcdHRoaXMuc3RhcnRDb21wb25lbnQoaXRlbSwgb3B0aW9ucyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBfdHlwZXMuU0VSVklDRV9UWVBFKSB7XG5cdFx0XHRcdFx0dGhpcy5zdGFydFNlcnZpY2UoaXRlbSwgb3B0aW9ucyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBfdHlwZXMuTU9EVUxFX1RZUEUpIHtcblx0XHRcdFx0XHR0aGlzLnN0YXJ0TW9kdWxlKGl0ZW0sIG9wdGlvbnMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgTW9kdWxlIG9mIHR5cGUgXFxuXFx0XFx0XFx0XFx0JyArIF90eXBlcy5DT01QT05FTlRfVFlQRSArICcsICcgKyBfdHlwZXMuU0VSVklDRV9UWVBFICsgJyBvciAnICsgX3R5cGVzLk1PRFVMRV9UWVBFICsgJywgXFxuXFx0XFx0XFx0XFx0TW9kdWxlIG9mIHR5cGUgJyArIGl0ZW0udHlwZSArICcgaXMgbm90IGFsbG93ZWQuJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcmVnaXN0cnlJdGVtID0gdGhpcy5fbW9kdWxlc1t0aGlzLl9tb2R1bGVzLmxlbmd0aCAtIDFdO1xuXG5cdFx0XHRcdHJlZ2lzdHJ5SXRlbS5ydW5uaW5nID0gdHJ1ZTtcblxuXHRcdFx0XHRyZXR1cm4gcmVnaXN0cnlJdGVtO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3N0YXJ0TW9kdWxlJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzdGFydE1vZHVsZShpdGVtLCBvcHRpb25zKSB7XG5cblx0XHRcdFx0dmFyIGl0ZW1JbnN0YW5jZSA9IG5ldyBpdGVtKG9wdGlvbnMpO1xuXG5cdFx0XHRcdHRoaXMuaW5pdE1vZHVsZShpdGVtSW5zdGFuY2UpO1xuXHRcdFx0XHR0aGlzLnJlZ2lzdGVyKGl0ZW0sIGl0ZW1JbnN0YW5jZSwgb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnc3RhcnRDb21wb25lbnQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHN0YXJ0Q29tcG9uZW50KGl0ZW0sIG9wdGlvbnMpIHtcblx0XHRcdFx0dmFyIF90aGlzNCA9IHRoaXM7XG5cblx0XHRcdFx0b3B0aW9ucy5hcHBDb21wb25lbnQgPSB0aGlzLmFwcENvbXBvbmVudDtcblxuXHRcdFx0XHQvLyByZWdpc3RlciBpdGVtIHdpdGhvdXQgaW5zdGFuY2VzXG5cdFx0XHRcdC8vIGZvciBsYXRlciB1c2UsIGlmIG5vIGRvbSBub2Rlc1xuXHRcdFx0XHQvLyBhcmUgcHJlc2VudCB5ZXRcblx0XHRcdFx0dGhpcy5yZWdpc3RlcihpdGVtLCBudWxsLCBvcHRpb25zKTtcblxuXHRcdFx0XHR0aGlzLmFwcENvbXBvbmVudC5zdGFydENvbXBvbmVudHMoaXRlbSwgb3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbUluc3RhbmNlKSB7XG5cdFx0XHRcdFx0X3RoaXM0LmluaXRDb21wb25lbnQoaXRlbUluc3RhbmNlKTtcblx0XHRcdFx0XHRfdGhpczQucmVnaXN0ZXIoaXRlbSwgaXRlbUluc3RhbmNlLCBpdGVtSW5zdGFuY2Uub3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3N0YXJ0U2VydmljZScsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gc3RhcnRTZXJ2aWNlKGl0ZW0sIG9wdGlvbnMpIHtcblxuXHRcdFx0XHR2YXIgaXRlbUluc3RhbmNlID0gbmV3IGl0ZW0ob3B0aW9ucyk7XG5cblx0XHRcdFx0dGhpcy5pbml0U2VydmljZShpdGVtSW5zdGFuY2UpO1xuXHRcdFx0XHR0aGlzLnJlZ2lzdGVyKGl0ZW0sIGl0ZW1JbnN0YW5jZSwgb3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnaW5pdE1vZHVsZScsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdE1vZHVsZShtb2R1bGUpIHtcblxuXHRcdFx0XHRpZiAobW9kdWxlLnR5cGUgIT09IF90eXBlcy5NT0RVTEVfVFlQRSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgTW9kdWxlIGluc3RhbmNlLicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bW9kdWxlLmRlbGVnYXRlVmVudHMoKTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdpbml0U2VydmljZScsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdFNlcnZpY2UobW9kdWxlKSB7XG5cblx0XHRcdFx0aWYgKG1vZHVsZS50eXBlICE9PSBfdHlwZXMuU0VSVklDRV9UWVBFKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBTZXJ2aWNlIGluc3RhbmNlLicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bW9kdWxlLmRlbGVnYXRlVmVudHMoKTtcblx0XHRcdFx0bW9kdWxlLmNvbm5lY3QoKTtcblxuXHRcdFx0XHRpZiAobW9kdWxlLmF1dG9zdGFydCkge1xuXHRcdFx0XHRcdG1vZHVsZS5mZXRjaCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnaW5pdENvbXBvbmVudCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdENvbXBvbmVudChtb2R1bGUpIHtcblxuXHRcdFx0XHRpZiAobW9kdWxlLnR5cGUgIT09IF90eXBlcy5DT01QT05FTlRfVFlQRSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgQ29tcG9uZW50IGluc3RhbmNlLicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bW9kdWxlLm1vdW50KCk7XG5cblx0XHRcdFx0aWYgKG1vZHVsZS5hdXRvc3RhcnQpIHtcblx0XHRcdFx0XHRtb2R1bGUucmVuZGVyKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdyZWdpc3RlcicsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXIobW9kdWxlLCBpbnN0KSB7XG5cdFx0XHRcdHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG5cblxuXHRcdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIG9yIG1vZHVsZSBpZGVudGlmaWVyIGV4cGVjdGVkJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZXhpc3RpbmdSZWdpc3RyeU1vZHVsZUl0ZW0gPSB0aGlzLmZpbmRNYXRjaGluZ1JlZ2lzdHJ5SXRlbXMobW9kdWxlKVswXTtcblxuXHRcdFx0XHRpZiAoZXhpc3RpbmdSZWdpc3RyeU1vZHVsZUl0ZW0pIHtcblxuXHRcdFx0XHRcdHZhciBpbmRleCA9IHRoaXMuX21vZHVsZXMuaW5kZXhPZihleGlzdGluZ1JlZ2lzdHJ5TW9kdWxlSXRlbSk7XG5cblx0XHRcdFx0XHQvLyBtaXhpbiBuYW1lZCBjb21wb25lbnRzIHVzaW5nIGFwcE5hbWVcblx0XHRcdFx0XHRpZiAoZXhpc3RpbmdSZWdpc3RyeU1vZHVsZUl0ZW0uYXBwTmFtZSAmJiAhdGhpc1tvcHRpb25zLmFwcE5hbWVdICYmIGluc3QpIHtcblx0XHRcdFx0XHRcdHRoaXNbb3B0aW9ucy5hcHBOYW1lXSA9IGluc3Q7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gcHVzaCBpZiBpbnN0YW5jZSBub3QgZXhpc3RzXG5cdFx0XHRcdFx0aWYgKGluc3QgJiYgdGhpcy5fbW9kdWxlc1tpbmRleF0uaW5zdGFuY2VzLmluZGV4T2YoaW5zdCkgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9tb2R1bGVzW2luZGV4XS5pbnN0YW5jZXMucHVzaChpbnN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAoW190eXBlcy5TRVJWSUNFX1RZUEUsIF90eXBlcy5DT01QT05FTlRfVFlQRSwgX3R5cGVzLk1PRFVMRV9UWVBFXS5pbmRleE9mKG1vZHVsZS50eXBlKSA+IC0xKSB7XG5cblx0XHRcdFx0XHR2YXIgcmVnaXN0cnlPYmplY3QgPSB7XG5cdFx0XHRcdFx0XHR0eXBlOiBtb2R1bGUudHlwZSxcblx0XHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlLFxuXHRcdFx0XHRcdFx0aW5zdGFuY2VzOiBpbnN0ID8gW2luc3RdIDogW10sXG5cdFx0XHRcdFx0XHRhdXRvc3RhcnQ6ICEhbW9kdWxlLmF1dG9zdGFydCxcblx0XHRcdFx0XHRcdHJ1bm5pbmc6IGZhbHNlLFxuXHRcdFx0XHRcdFx0dWlkOiBtb2R1bGUudWlkXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHJlZ2lzdHJ5T2JqZWN0LmFwcE5hbWUgPSBvcHRpb25zLmFwcE5hbWU7XG5cblx0XHRcdFx0XHRpZiAob3B0aW9ucy5hcHBOYW1lICYmICF0aGlzW29wdGlvbnMuYXBwTmFtZV0gJiYgaW5zdCkge1xuXHRcdFx0XHRcdFx0dGhpc1tvcHRpb25zLmFwcE5hbWVdID0gaW5zdDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLl9tb2R1bGVzLnB1c2gocmVnaXN0cnlPYmplY3QpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0V4cGVjdGVkIE1vZHVsZSBvZiB0eXBlIFxcblxcdFxcdFxcdFxcdCcgKyBfdHlwZXMuQ09NUE9ORU5UX1RZUEUgKyAnLCAnICsgX3R5cGVzLlNFUlZJQ0VfVFlQRSArICcgb3IgJyArIF90eXBlcy5NT0RVTEVfVFlQRSArICcsIFxcblxcdFxcdFxcdFxcdE1vZHVsZSBvZiB0eXBlICcgKyBtb2R1bGUudHlwZSArICcgY2Fubm90IGJlIHJlZ2lzdGVyZWQuJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdkZXN0cm95Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuXHRcdFx0XHR2YXIgX3RoaXM1ID0gdGhpcztcblxuXHRcdFx0XHRmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuXHRcdFx0XHRcdGFyZ3NbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhcmdzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRhcmdzLmZvckVhY2goZnVuY3Rpb24gKGFyZykge1xuXHRcdFx0XHRcdFx0X3RoaXM1LmRlc3Ryb3koYXJnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgaXRlbSA9IGFyZ3NbMF07XG5cdFx0XHRcdHZhciBpc0luc3RhbmNlID0gISEoKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihpdGVtKSkgPT09ICdvYmplY3QnICYmIGl0ZW0udWlkKTtcblx0XHRcdFx0dmFyIHJlZ2lzdHJ5SXRlbXMgPSB0aGlzLmZpbmRNYXRjaGluZ1JlZ2lzdHJ5SXRlbXMoaXRlbSk7XG5cblx0XHRcdFx0dGhpcy5maW5kTWF0Y2hpbmdSZWdpc3RyeUl0ZW1zKGl0ZW0pLmZvckVhY2goZnVuY3Rpb24gKHJlZ2lzdHJ5SXRlbSkge1xuXG5cdFx0XHRcdFx0dmFyIG1vZHVsZSA9IHJlZ2lzdHJ5SXRlbS5tb2R1bGU7XG5cdFx0XHRcdFx0dmFyIGl0ZXJhdGVPYmogPSBpc0luc3RhbmNlID8gW2l0ZW1dIDogcmVnaXN0cnlJdGVtLmluc3RhbmNlcztcblxuXHRcdFx0XHRcdGl0ZXJhdGVPYmouZm9yRWFjaChmdW5jdGlvbiAoaW5zdCkge1xuXG5cdFx0XHRcdFx0XHR2YXIgbW9kdWxlSW5zdGFuY2VzID0gX3RoaXM1Ll9tb2R1bGVzW190aGlzNS5fbW9kdWxlcy5pbmRleE9mKHJlZ2lzdHJ5SXRlbSldLmluc3RhbmNlcztcblxuXHRcdFx0XHRcdFx0aWYgKG1vZHVsZUluc3RhbmNlcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0XHRcdF90aGlzNS5fbW9kdWxlc1tfdGhpczUuX21vZHVsZXMuaW5kZXhPZihyZWdpc3RyeUl0ZW0pXS5pbnN0YW5jZXMuc3BsaWNlKG1vZHVsZUluc3RhbmNlcy5pbmRleE9mKGluc3QpLCAxKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdF90aGlzNS5fbW9kdWxlc1tfdGhpczUuX21vZHVsZXMuaW5kZXhPZihyZWdpc3RyeUl0ZW0pXS5pbnN0YW5jZXMgPSBbXTtcblxuXHRcdFx0XHRcdFx0XHQvLyBkZWxldGUgZXhwb3NlZCBpbnN0YW5jZXNcblx0XHRcdFx0XHRcdFx0aWYgKHJlZ2lzdHJ5SXRlbS5hcHBOYW1lICYmIF90aGlzNVtyZWdpc3RyeUl0ZW0uYXBwTmFtZV0pIHtcblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgX3RoaXM1W3JlZ2lzdHJ5SXRlbS5hcHBOYW1lXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAobW9kdWxlLnR5cGUgPT09IF90eXBlcy5DT01QT05FTlRfVFlQRSkge1xuXHRcdFx0XHRcdFx0XHQvLyB1bmRlbGVnYXRlIGV2ZW50cyBpZiBjb21wb25lbnRcblx0XHRcdFx0XHRcdFx0aW5zdC51bm1vdW50KCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG1vZHVsZS50eXBlID09PSBfdHlwZXMuU0VSVklDRV9UWVBFKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGRpc2Nvbm5lY3QgaWYgc2VydmljZVxuXHRcdFx0XHRcdFx0XHRpbnN0LnVuZGVsZWdhdGVWZW50cygpO1xuXHRcdFx0XHRcdFx0XHRpbnN0LmRpc2Nvbm5lY3QoKTtcblx0XHRcdFx0XHRcdFx0aW5zdC5kZXN0cm95KCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHQvLyB1bmRlbGVnYXRlIHZlbnRzIGZvciBhbGxcblx0XHRcdFx0XHRcdFx0aW5zdC51bmRlbGVnYXRlVmVudHMoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKCFpc0luc3RhbmNlKSB7XG5cdFx0XHRcdFx0dGhpcy51bnJlZ2lzdGVyKGl0ZW0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAndW5yZWdpc3RlcicsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gdW5yZWdpc3RlcihpdGVtKSB7XG5cblx0XHRcdFx0dmFyIG1hdGNoaW5nUmVnaXN0ZXJlZEl0ZW1zID0gdGhpcy5maW5kTWF0Y2hpbmdSZWdpc3RyeUl0ZW1zKGl0ZW0pO1xuXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBtYXRjaGluZ1JlZ2lzdGVyZWRJdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIG1vZCA9IG1hdGNoaW5nUmVnaXN0ZXJlZEl0ZW1zW2ldO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX21vZHVsZXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fbW9kdWxlcy5zcGxpY2UodGhpcy5fbW9kdWxlcy5pbmRleE9mKG1vZCksIDEpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdHRoaXMuX21vZHVsZXMgPSBbXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XSk7XG5cblx0XHRyZXR1cm4gQXBwbGljYXRpb25GYWNhZGU7XG5cdH0oX21vZHVsZTIuZGVmYXVsdCk7XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gQXBwbGljYXRpb25GYWNhZGU7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcGxpY2F0aW9uLWZhY2FkZS5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJywgJy4uL2hlbHBlcnMvc3RyaW5nL2Rhc2hlcml6ZScsICcuLi9oZWxwZXJzL3N0cmluZy9leHRyYWN0LW9iamVjdC1uYW1lJywgJy4uL2hlbHBlcnMvc3RyaW5nL25hbWVkLXVpZCcsICcuLi9oZWxwZXJzL2Vudmlyb25tZW50L2dldC1nbG9iYWwtb2JqZWN0JywgJy4uL2RlZmF1bHQtY29uZmlnJywgJ3BsaXRlJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCcuLi9oZWxwZXJzL3N0cmluZy9kYXNoZXJpemUnKSwgcmVxdWlyZSgnLi4vaGVscGVycy9zdHJpbmcvZXh0cmFjdC1vYmplY3QtbmFtZScpLCByZXF1aXJlKCcuLi9oZWxwZXJzL3N0cmluZy9uYW1lZC11aWQnKSwgcmVxdWlyZSgnLi4vaGVscGVycy9lbnZpcm9ubWVudC9nZXQtZ2xvYmFsLW9iamVjdCcpLCByZXF1aXJlKCcuLi9kZWZhdWx0LWNvbmZpZycpLCByZXF1aXJlKCdwbGl0ZScpKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIGdsb2JhbC5kYXNoZXJpemUsIGdsb2JhbC5leHRyYWN0T2JqZWN0TmFtZSwgZ2xvYmFsLm5hbWVkVWlkLCBnbG9iYWwuZ2V0R2xvYmFsT2JqZWN0LCBnbG9iYWwuZGVmYXVsdENvbmZpZywgZ2xvYmFsLnBsaXRlKTtcblx0XHRnbG9iYWwuYmFzZSA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgX2Rhc2hlcml6ZSwgX2V4dHJhY3RPYmplY3ROYW1lLCBfbmFtZWRVaWQsIF9nZXRHbG9iYWxPYmplY3QsIF9kZWZhdWx0Q29uZmlnLCBfcGxpdGUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBfZGFzaGVyaXplMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Rhc2hlcml6ZSk7XG5cblx0dmFyIF9leHRyYWN0T2JqZWN0TmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHRyYWN0T2JqZWN0TmFtZSk7XG5cblx0dmFyIF9uYW1lZFVpZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9uYW1lZFVpZCk7XG5cblx0dmFyIF9nZXRHbG9iYWxPYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0R2xvYmFsT2JqZWN0KTtcblxuXHR2YXIgX2RlZmF1bHRDb25maWcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdENvbmZpZyk7XG5cblx0dmFyIF9wbGl0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wbGl0ZSk7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuXHRcdFx0ZGVmYXVsdDogb2JqXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcblx0XHRpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcblx0XHR9XG5cdH1cblxuXHR2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuXHRcdGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuXHRcdFx0XHRkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG5cdFx0XHRcdGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0XHRcdFx0aWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG5cdFx0XHRpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuXHRcdFx0aWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG5cdFx0XHRyZXR1cm4gQ29uc3RydWN0b3I7XG5cdFx0fTtcblx0fSgpO1xuXG5cdHZhciByb290ID0gKDAsIF9nZXRHbG9iYWxPYmplY3QyLmRlZmF1bHQpKCk7XG5cblx0Ly8gc2hpbSBwcm9taXNlc1xuXHQhcm9vdC5Qcm9taXNlICYmIChyb290LlByb21pc2UgPSBfcGxpdGUyLmRlZmF1bHQpO1xuXG5cdGZ1bmN0aW9uIGdlbmVyYXRlTmFtZShvYmopIHtcblxuXHRcdGlmIChvYmouX25hbWUpIHtcblx0XHRcdHJldHVybiBvYmouX25hbWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICgwLCBfZXh0cmFjdE9iamVjdE5hbWUyLmRlZmF1bHQpKG9iaik7XG5cdH1cblxuXHRmdW5jdGlvbiBnZW5lcmF0ZURhc2hlZE5hbWUob2JqKSB7XG5cblx0XHRpZiAob2JqLl9kYXNoZWROYW1lKSB7XG5cdFx0XHRyZXR1cm4gb2JqLl9kYXNoZWROYW1lO1xuXHRcdH1cblxuXHRcdHJldHVybiAoMCwgX2Rhc2hlcml6ZTIuZGVmYXVsdCkoZ2VuZXJhdGVOYW1lKG9iaikpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2VuZXJhdGVVaWQob2JqKSB7XG5cdFx0aWYgKG9iai5fdWlkKSB7XG5cdFx0XHRyZXR1cm4gb2JqLl91aWQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICgwLCBfbmFtZWRVaWQyLmRlZmF1bHQpKGdlbmVyYXRlTmFtZShvYmopKTtcblx0fVxuXG5cdHZhciBCYXNlID0gZnVuY3Rpb24gKCkge1xuXHRcdF9jcmVhdGVDbGFzcyhCYXNlLCBbe1xuXHRcdFx0a2V5OiAndmVudHMnLFxuXHRcdFx0c2V0OiBmdW5jdGlvbiBzZXQodmVudHMpIHtcblx0XHRcdFx0dGhpcy5fdmVudHMgPSB2ZW50cztcblx0XHRcdH0sXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3ZlbnRzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ2F1dG9zdGFydCcsXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHNldChib29sKSB7XG5cdFx0XHRcdHRoaXMuX2F1dG9zdGFydCA9IGJvb2w7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9hdXRvc3RhcnQ7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnbmFtZScsXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHNldChuYW1lKSB7XG5cdFx0XHRcdHRoaXMuX25hbWUgPSBuYW1lO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbmFtZTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdkYXNoZWROYW1lJyxcblx0XHRcdHNldDogZnVuY3Rpb24gc2V0KGRhc2hlZE5hbWUpIHtcblx0XHRcdFx0dGhpcy5fZGFzaGVkTmFtZSA9IGRhc2hlZE5hbWU7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9kYXNoZWROYW1lO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3VpZCcsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3VpZDtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHNldCh1aWQpIHtcblx0XHRcdFx0dGhpcy5fdWlkID0gdWlkO1xuXHRcdFx0fVxuXHRcdH1dKTtcblxuXHRcdGZ1bmN0aW9uIEJhc2UoKSB7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cdFx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmFzZSk7XG5cblx0XHRcdHRoaXMubmFtZSA9IGdlbmVyYXRlTmFtZSh0aGlzKTtcblx0XHRcdHRoaXMuZGFzaGVkTmFtZSA9IGdlbmVyYXRlRGFzaGVkTmFtZSh0aGlzKTtcblx0XHRcdHRoaXMudWlkID0gZ2VuZXJhdGVVaWQodGhpcyk7XG5cblx0XHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cblx0XHRcdGlmIChvcHRpb25zLmFwcCkge1xuXHRcdFx0XHR0aGlzLmFwcCA9IG9wdGlvbnMuYXBwO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnZlbnRzID0gb3B0aW9ucy52ZW50cyB8fCB7fTtcblxuXHRcdFx0dGhpcy5hdXRvc3RhcnQgPSAhIW9wdGlvbnMuYXV0b3N0YXJ0O1xuXG5cdFx0XHRpZiAob3B0aW9ucy52ZW50KSB7XG5cdFx0XHRcdC8vIGNvdWxkIGJlIHVzZWQgc3RhbmRhbG9uZVxuXHRcdFx0XHR0aGlzLnZlbnQgPSBvcHRpb25zLnZlbnQodGhpcyk7XG5cdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuYXBwICYmIG9wdGlvbnMuYXBwLnZlbnQpIHtcblx0XHRcdFx0Ly8gb3Igd2l0aGluIGFuIGFwcGxpY2F0aW9uIGZhY2FkZVxuXHRcdFx0XHR0aGlzLnZlbnQgPSBvcHRpb25zLmFwcC52ZW50KG9wdGlvbnMuYXBwKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMudmVudCA9IF9kZWZhdWx0Q29uZmlnMi5kZWZhdWx0LnZlbnQodGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0X2NyZWF0ZUNsYXNzKEJhc2UsIFt7XG5cdFx0XHRrZXk6ICdiZWZvcmVJbml0aWFsaXplJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBiZWZvcmVJbml0aWFsaXplKG9wdGlvbnMpIHtcblx0XHRcdFx0Ly8gb3ZlcnJpZGUgYW5kIGNhbGwgc3VwZXIuYmVmb3JlSW5pdGlhbGl6ZShvcHRpb25zKX1cblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdhZnRlckluaXRpYWxpemUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGFmdGVySW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cdFx0XHRcdC8vIG92ZXJyaWRlIGFuZCBjYWxsIHN1cGVyLmFmdGVySW5pdGlhbGl6ZShvcHRpb25zKX1cblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdpbml0aWFsaXplJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBpbml0aWFsaXplKG9wdGlvbnMpIHtcblx0XHRcdFx0Ly8gb3ZlcnJpZGVcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdiaW5kQ3VzdG9tRXZlbnRzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBiaW5kQ3VzdG9tRXZlbnRzKCkge1xuXHRcdFx0XHQvLyBvdmVycmlkZVxuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ2RlbGVnYXRlVmVudHMnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGRlbGVnYXRlVmVudHMoKSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLnZlbnQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciB2ZW50IGluIHRoaXMudmVudHMpIHtcblx0XHRcdFx0XHRpZiAodGhpcy52ZW50cy5oYXNPd25Qcm9wZXJ0eSh2ZW50KSkge1xuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrID0gdGhpcy52ZW50c1t2ZW50XTtcblxuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdGhpc1tjYWxsYmFja10gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSB0aGlzW2NhbGxiYWNrXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgY2FsbGJhY2sgbWV0aG9kJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRoaXMudmVudC5vbih2ZW50LCBjYWxsYmFjaywgdGhpcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAndW5kZWxlZ2F0ZVZlbnRzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1bmRlbGVnYXRlVmVudHMoKSB7XG5cblx0XHRcdFx0aWYgKCF0aGlzLnZlbnQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciB2ZW50IGluIHRoaXMudmVudHMpIHtcblx0XHRcdFx0XHRpZiAodGhpcy52ZW50cy5oYXNPd25Qcm9wZXJ0eSh2ZW50KSkge1xuXHRcdFx0XHRcdFx0dmFyIGNhbGxiYWNrID0gdGhpcy52ZW50c1t2ZW50XTtcblxuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdGhpc1tjYWxsYmFja10gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sgPSB0aGlzW2NhbGxiYWNrXTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgY2FsbGJhY2sgbWV0aG9kJyk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRoaXMudmVudC5vZmYodmVudCwgY2FsbGJhY2ssIHRoaXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3RvU3RyaW5nJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMudWlkO1xuXHRcdFx0fVxuXHRcdH1dKTtcblxuXHRcdHJldHVybiBCYXNlO1xuXHR9KCk7XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gQmFzZTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZS5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJywgJy4vYmFzZScsICcuLi9oZWxwZXJzL29iamVjdC9hc3NpZ24nLCAnLi4vaGVscGVycy9hcnJheS9mcm9tJywgJy4uL2hlbHBlcnMvc3RyaW5nL2Rhc2hlcml6ZScsICcuLi9kZWZhdWx0LWNvbmZpZycsICcuL3R5cGVzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCcuL2Jhc2UnKSwgcmVxdWlyZSgnLi4vaGVscGVycy9vYmplY3QvYXNzaWduJyksIHJlcXVpcmUoJy4uL2hlbHBlcnMvYXJyYXkvZnJvbScpLCByZXF1aXJlKCcuLi9oZWxwZXJzL3N0cmluZy9kYXNoZXJpemUnKSwgcmVxdWlyZSgnLi4vZGVmYXVsdC1jb25maWcnKSwgcmVxdWlyZSgnLi90eXBlcycpKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIGdsb2JhbC5iYXNlLCBnbG9iYWwuYXNzaWduLCBnbG9iYWwuZnJvbSwgZ2xvYmFsLmRhc2hlcml6ZSwgZ2xvYmFsLmRlZmF1bHRDb25maWcsIGdsb2JhbC50eXBlcyk7XG5cdFx0Z2xvYmFsLmNvbXBvbmVudCA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgX2Jhc2UsIF9hc3NpZ24sIF9mcm9tLCBfZGFzaGVyaXplLCBfZGVmYXVsdENvbmZpZywgX3R5cGVzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHR2YXIgX2Jhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmFzZSk7XG5cblx0dmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuXHR2YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cblx0dmFyIF9kYXNoZXJpemUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGFzaGVyaXplKTtcblxuXHR2YXIgX2RlZmF1bHRDb25maWcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdENvbmZpZyk7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuXHRcdFx0ZGVmYXVsdDogb2JqXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcblx0XHRpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG5cdFx0aWYgKCFzZWxmKSB7XG5cdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG5cdH1cblxuXHR2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuXHRcdGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuXHRcdFx0XHRkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG5cdFx0XHRcdGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0XHRcdFx0aWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG5cdFx0XHRpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuXHRcdFx0aWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG5cdFx0XHRyZXR1cm4gQ29uc3RydWN0b3I7XG5cdFx0fTtcblx0fSgpO1xuXG5cdGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuXHRcdGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuXHRcdH1cblxuXHRcdHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0Y29uc3RydWN0b3I6IHtcblx0XHRcdFx0dmFsdWU6IHN1YkNsYXNzLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcblx0fVxuXG5cdHZhciBERUxFR0FURV9FVkVOVF9TUExJVFRFUiA9IC9eKFxcUyspXFxzKiguKikkLztcblxuXHR2YXIgX21hdGNoZXNTZWxlY3RvciA9IEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yO1xuXG5cdHZhciBDb21wb25lbnQgPSBmdW5jdGlvbiAoX0Jhc2UpIHtcblx0XHRfaW5oZXJpdHMoQ29tcG9uZW50LCBfQmFzZSk7XG5cblx0XHRfY3JlYXRlQ2xhc3MoQ29tcG9uZW50LCBbe1xuXHRcdFx0a2V5OiAndHlwZScsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIF90eXBlcy5DT01QT05FTlRfVFlQRTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdldmVudHMnLFxuXHRcdFx0c2V0OiBmdW5jdGlvbiBzZXQoZXZlbnRzKSB7XG5cdFx0XHRcdHRoaXMuX2V2ZW50cyA9IGV2ZW50cztcblx0XHRcdH0sXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2V2ZW50cztcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdlbCcsXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHNldChlbCkge1xuXHRcdFx0XHR0aGlzLl9lbCA9IGVsO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZWw7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAndmlld01vZGVsJyxcblx0XHRcdHNldDogZnVuY3Rpb24gc2V0KG1vZGVsKSB7XG5cdFx0XHRcdHRoaXMuX3ZpZXdNb2RlbCA9IG1vZGVsO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fdmlld01vZGVsO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ21vZGVsJyxcblx0XHRcdHNldDogZnVuY3Rpb24gc2V0KG1vZGVsKSB7XG5cdFx0XHRcdHRoaXMuX21vZGVsID0gbW9kZWw7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9tb2RlbDtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdzZXJ2aWNlJyxcblx0XHRcdHNldDogZnVuY3Rpb24gc2V0KHNlcnZpY2UpIHtcblx0XHRcdFx0dGhpcy5fc2VydmljZSA9IHNlcnZpY2U7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9zZXJ2aWNlO1xuXHRcdFx0fVxuXHRcdH1dLCBbe1xuXHRcdFx0a2V5OiAndHlwZScsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIF90eXBlcy5DT01QT05FTlRfVFlQRTtcblx0XHRcdH1cblx0XHR9XSk7XG5cblx0XHRmdW5jdGlvbiBDb21wb25lbnQoKSB7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cdFx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29tcG9uZW50KTtcblxuXHRcdFx0b3B0aW9ucy5jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0IHx8IGRvY3VtZW50O1xuXG5cdFx0XHR2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29tcG9uZW50KS5jYWxsKHRoaXMsIG9wdGlvbnMpKTtcblxuXHRcdFx0X3RoaXMubW9kdWxlU2VsZWN0b3IgPSBvcHRpb25zLm1vZHVsZVNlbGVjdG9yIHx8ICdbZGF0YS1qcy1jb21wb25lbnQqPVwiJyArIF90aGlzLmRhc2hlZE5hbWUgKyAnXCJdJztcblxuXHRcdFx0aWYgKF90aGlzLm1vZHVsZVNlbGVjdG9yLmluZGV4T2YoJ1tkYXRhLScpID09PSAwKSB7XG5cdFx0XHRcdF90aGlzLm1vZHVsZUF0dHJpYnV0ZSA9IF90aGlzLm1vZHVsZVNlbGVjdG9yLnJlcGxhY2UoL14oXFxbKShbYS16QS1aLV9dKykoLipdKSQvLCAnJDInKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb25zLmNvbnRleHQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdG9wdGlvbnMuY29udGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5jb250ZXh0KTtcblx0XHRcdH1cblxuXHRcdFx0X3RoaXMuZW5zdXJlRWxlbWVudChvcHRpb25zKTtcblx0XHRcdC8vIHBhcnNlIG9wdGlvbnMgZnJvbSBtYXJrdXAgYW5kIG1lcmdlIHdpdGggZXhpc3Rpbmdcblx0XHRcdE9iamVjdC5hc3NpZ24oX3RoaXMub3B0aW9ucywgX3RoaXMucGFyc2VPcHRpb25zKF90aGlzLmVsLCBfdGhpcy5jb25zdHJ1Y3RvciksIG9wdGlvbnMpO1xuXG5cdFx0XHRpZiAob3B0aW9ucy5zZXJ2aWNlKSB7XG5cdFx0XHRcdF90aGlzLnNlcnZpY2UgPSBvcHRpb25zLnNlcnZpY2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLnZpZXdNb2RlbCkge1xuXHRcdFx0XHRfdGhpcy52aWV3TW9kZWwgPSBvcHRpb25zLnZpZXdNb2RlbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMubW9kZWwpIHtcblx0XHRcdFx0X3RoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy5hcHBDb21wb25lbnQpIHtcblx0XHRcdFx0X3RoaXMuYXBwQ29tcG9uZW50ID0gb3B0aW9ucy5hcHBDb21wb25lbnQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghb3B0aW9ucy5hcHApIHtcblx0XHRcdFx0X3RoaXMubW91bnQoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfdGhpcztcblx0XHR9XG5cblx0XHRfY3JlYXRlQ2xhc3MoQ29tcG9uZW50LCBbe1xuXHRcdFx0a2V5OiAnbWF0Y2hlc1NlbGVjdG9yJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoZWwsIHNlbGVjdG9yKSB7XG5cblx0XHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRzZWxlY3RvciA9IGVsO1xuXHRcdFx0XHRcdGVsID0gdGhpcy5lbDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBfbWF0Y2hlc1NlbGVjdG9yLmNhbGwoZWwsIHNlbGVjdG9yKTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICd3aWxsTW91bnQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHdpbGxNb3VudCgpIHtcblxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdtb3VudCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gbW91bnQoKSB7XG5cblx0XHRcdFx0aWYgKHRoaXMud2lsbE1vdW50KCkgIT09IGZhbHNlKSB7XG5cblx0XHRcdFx0XHR0aGlzLmV2ZW50cyA9IHRoaXMuZXZlbnRzIHx8IHt9O1xuXG5cdFx0XHRcdFx0dGhpcy5kb20gPSB0aGlzLm9wdGlvbnMuZG9tIHx8IHRoaXMuYXBwICYmIHRoaXMuYXBwLmRvbSB8fCBfZGVmYXVsdENvbmZpZzIuZGVmYXVsdC5kb207XG5cblx0XHRcdFx0XHR0aGlzLnRlbXBsYXRlID0gdGhpcy5vcHRpb25zLnRlbXBsYXRlIHx8IHRoaXMuYXBwICYmIHRoaXMuYXBwLnRlbXBsYXRlIHx8IF9kZWZhdWx0Q29uZmlnMi5kZWZhdWx0LnRlbXBsYXRlO1xuXG5cdFx0XHRcdFx0dGhpcy5fZG9tRXZlbnRzID0gW107XG5cblx0XHRcdFx0XHQvLyBjYWxsIGlmIGV4dGVuc2lvbiBpdGVtU2VsZWN0b3JUb01lbWJlcnMgaXMgbWl4ZWQgaW5cblx0XHRcdFx0XHRpZiAodHlwZW9mIHRoaXMuaXRlbVNlbGVjdG9yVG9NZW1iZXJzID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHR0aGlzLml0ZW1TZWxlY3RvclRvTWVtYmVycygpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuYmVmb3JlSW5pdGlhbGl6ZSh0aGlzLm9wdGlvbnMpO1xuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZSh0aGlzLm9wdGlvbnMpO1xuXHRcdFx0XHRcdHRoaXMuYWZ0ZXJJbml0aWFsaXplKHRoaXMub3B0aW9ucyk7XG5cdFx0XHRcdFx0dGhpcy5iaW5kQ3VzdG9tRXZlbnRzKCk7XG5cdFx0XHRcdFx0dGhpcy5iaW5kRXZlbnRzKCk7XG5cdFx0XHRcdFx0dGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuXHRcdFx0XHRcdHRoaXMuZGVsZWdhdGVWZW50cygpO1xuXHRcdFx0XHRcdHRoaXMuZGlkTW91bnQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ2RpZE1vdW50Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkaWRNb3VudCgpIHt9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnd2lsbFVubW91bnQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHdpbGxVbm1vdW50KCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICd1bm1vdW50Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1bm1vdW50KCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLndpbGxVbm1vdW50KCkgIT09IGZhbHNlKSB7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5hcHAgJiYgdGhpcy5hcHAuZmluZE1hdGNoaW5nUmVnaXN0cnlJdGVtcygpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdHRoaXMuYXBwLmRlc3Ryb3kodGhpcyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMucmVtb3ZlKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5kaWRVbm1vdW50KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdkaWRVbm1vdW50Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkaWRVbm1vdW50KCkge31cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdjcmVhdGVEb21Ob2RlJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVEb21Ob2RlKHN0cikge1xuXG5cdFx0XHRcdHZhciBzZWxlY3RlZEVsID0gdGhpcy5vcHRpb25zLmNvbnRleHQucXVlcnlTZWxlY3RvcihzdHIpO1xuXG5cdFx0XHRcdGlmIChzZWxlY3RlZEVsKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNlbGVjdGVkRWw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdHZhciBlbE5vZGUgPSB2b2lkIDA7XG5cblx0XHRcdFx0ZGl2LmlubmVySFRNTCA9IHN0cjtcblxuXHRcdFx0XHRBcnJheS5mcm9tKGRpdi5jaGlsZE5vZGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHRcdFx0aWYgKCFlbE5vZGUgJiYgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcblx0XHRcdFx0XHRcdGVsTm9kZSA9IG5vZGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRyZXR1cm4gZWxOb2RlIHx8IGRpdjtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdlbnN1cmVFbGVtZW50Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBlbnN1cmVFbGVtZW50KCkge1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cblx0XHRcdFx0aWYgKG9wdGlvbnMuZWwgJiYgb3B0aW9ucy5lbC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcblx0XHRcdFx0XHR0aGlzLmVsID0gb3B0aW9ucy5lbDtcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5lbCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHR0aGlzLmVsID0gdGhpcy5jcmVhdGVEb21Ob2RlKG9wdGlvbnMuZWwpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuY29udGV4dCAmJiBvcHRpb25zLmNvbnRleHQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIHRoaXMubW9kdWxlU2VsZWN0b3IpIHtcblx0XHRcdFx0XHR0aGlzLmVsID0gb3B0aW9ucy5jb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGhpcy5tb2R1bGVTZWxlY3Rvcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXRoaXMuZWwpIHtcblx0XHRcdFx0XHR0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXRoaXMuZWwuZGF0YXNldC5qc0NvbXBvbmVudCkge1xuXHRcdFx0XHRcdHRoaXMuZWwuZGF0YXNldC5qc0NvbXBvbmVudCA9IHRoaXMuZGFzaGVkTmFtZTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmVsLmRhdGFzZXQuanNDb21wb25lbnQuaW5kZXhPZih0aGlzLmRhc2hlZE5hbWUpID09PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMuZWwuZGF0YXNldC5qc0NvbXBvbmVudCA9IHRoaXMuZWwuZGF0YXNldC5qc0NvbXBvbmVudC5sZW5ndGggPiAwID8gdGhpcy5lbC5kYXRhc2V0LmpzQ29tcG9uZW50ICsgJyAnICsgdGhpcy5kYXNoZWROYW1lIDogJycgKyB0aGlzLmRhc2hlZE5hbWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIXRoaXMuZWwuY29tcG9uZW50VWlkKSB7XG5cdFx0XHRcdFx0dGhpcy5lbC5jb21wb25lbnRVaWQgPSBbdGhpcy51aWRdO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZWwuY29tcG9uZW50VWlkLmluZGV4T2YodGhpcy51aWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHRoaXMuZWwuY29tcG9uZW50VWlkLnB1c2godGhpcy51aWQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuZG9tKSB7XG5cdFx0XHRcdFx0dGhpcy4kZWwgPSB0aGlzLmRvbSh0aGlzLmVsKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLiQpIHtcblx0XHRcdFx0XHR0aGlzLiRlbCA9IHRoaXMuJCh0aGlzLmVsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3NldEVsZW1lbnQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHNldEVsZW1lbnQoZWwpIHtcblxuXHRcdFx0XHR0aGlzLnVuZGVsZWdhdGVFdmVudHMoKTtcblx0XHRcdFx0dGhpcy5lbnN1cmVFbGVtZW50KHsgZWw6IGVsIH0pO1xuXHRcdFx0XHR0aGlzLmRlbGVnYXRlRXZlbnRzKCk7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnYmluZEV2ZW50cycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gYmluZEV2ZW50cygpIHt9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAncGFyc2VPcHRpb25zJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBwYXJzZU9wdGlvbnMoZWwsIGl0ZW0pIHtcblx0XHRcdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRcdFx0dmFyIG9wdGlvbnMgPSBlbCAmJiBlbC5kYXRhc2V0LmpzT3B0aW9ucztcblxuXHRcdFx0XHRpZiAoIW9wdGlvbnMpIHtcblxuXHRcdFx0XHRcdHZhciBqc29uU2NyaXB0QmxvY2sgPSBBcnJheS5mcm9tKGVsLmNoaWxkTm9kZXMpLmZpbHRlcihmdW5jdGlvbiAoY2hpbGQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgX3RoaXMyLm1hdGNoZXNTZWxlY3RvcihjaGlsZCwgJ3NjcmlwdFtkYXRhLWpzLW9wdGlvbnNdJyk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRpZiAoanNvblNjcmlwdEJsb2NrLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0b3B0aW9ucyA9IGpzb25TY3JpcHRCbG9ja1swXS5pbm5lclRleHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHR2YXIgbmFtZSA9IGl0ZW0ubmFtZSB8fCBpdGVtLmVzNW5hbWU7XG5cblx0XHRcdFx0XHQvLyBpZiA8ZGl2IGRhdGEtanMtb3B0aW9ucz1cInsnc2hvdyc6IHRydWV9XCI+IGlzIHVzZWQsXG5cdFx0XHRcdFx0Ly8gaW5zdGVhZCBvZiA8ZGl2IGRhdGEtanMtb3B0aW9ucz0ne1wic2hvd1wiOiB0cnVlfSc+XG5cdFx0XHRcdFx0Ly8gY29udmVydCB0byB2YWxpZCBqc29uIHN0cmluZyBhbmQgcGFyc2UgdG8gSlNPTlxuXHRcdFx0XHRcdG9wdGlvbnMgPSBvcHRpb25zLnJlcGxhY2UoL1xcXFwnL2csICdcXCcnKS5yZXBsYWNlKC8nL2csICdcIicpO1xuXG5cdFx0XHRcdFx0b3B0aW9ucyA9IEpTT04ucGFyc2Uob3B0aW9ucyk7XG5cdFx0XHRcdFx0b3B0aW9ucyA9IG9wdGlvbnNbKDAsIF9kYXNoZXJpemUyLmRlZmF1bHQpKG5hbWUpXSB8fCBvcHRpb25zW25hbWVdIHx8IG9wdGlvbnM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gb3B0aW9ucyB8fCB7fTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdkZWxlZ2F0ZUV2ZW50cycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZGVsZWdhdGVFdmVudHMoZXZlbnRzKSB7XG5cblx0XHRcdFx0aWYgKCEoZXZlbnRzIHx8IChldmVudHMgPSB0aGlzLmV2ZW50cykpKSByZXR1cm4gdGhpcztcblx0XHRcdFx0dGhpcy51bmRlbGVnYXRlRXZlbnRzKCk7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBldmVudHMpIHtcblx0XHRcdFx0XHR2YXIgbWV0aG9kID0gZXZlbnRzW2tleV07XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBtZXRob2QgIT09ICdmdW5jdGlvbicpIG1ldGhvZCA9IHRoaXNbZXZlbnRzW2tleV1dO1xuXHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKGtleSwgZXZlbnRzLCBtZXRob2QpO1xuXHRcdFx0XHRcdC8vIGlmICghbWV0aG9kKSBjb250aW51ZTtcblx0XHRcdFx0XHR2YXIgbWF0Y2ggPSBrZXkubWF0Y2goREVMRUdBVEVfRVZFTlRfU1BMSVRURVIpO1xuXHRcdFx0XHRcdHRoaXMuZGVsZWdhdGUobWF0Y2hbMV0sIG1hdGNoWzJdLCBtZXRob2QuYmluZCh0aGlzKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnZGVsZWdhdGUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGRlbGVnYXRlKGV2ZW50TmFtZSwgc2VsZWN0b3IsIGxpc3RlbmVyKSB7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGxpc3RlbmVyID0gc2VsZWN0b3I7XG5cdFx0XHRcdFx0c2VsZWN0b3IgPSBudWxsO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHJvb3QgPSB0aGlzLmVsO1xuXHRcdFx0XHR2YXIgaGFuZGxlciA9IHNlbGVjdG9yID8gZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHR2YXIgbm9kZSA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcblxuXHRcdFx0XHRcdGZvciAoOyBub2RlICYmIG5vZGUgIT0gcm9vdDsgbm9kZSA9IG5vZGUucGFyZW50Tm9kZSkge1xuXHRcdFx0XHRcdFx0aWYgKF9tYXRjaGVzU2VsZWN0b3IuY2FsbChub2RlLCBzZWxlY3RvcikpIHtcblx0XHRcdFx0XHRcdFx0ZS5kZWxlZ2F0ZVRhcmdldCA9IG5vZGU7XG5cdFx0XHRcdFx0XHRcdGxpc3RlbmVyKGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSA6IGxpc3RlbmVyO1xuXG5cdFx0XHRcdEVsZW1lbnQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLmVsLCBldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcblx0XHRcdFx0dGhpcy5fZG9tRXZlbnRzLnB1c2goeyBldmVudE5hbWU6IGV2ZW50TmFtZSwgaGFuZGxlcjogaGFuZGxlciwgbGlzdGVuZXI6IGxpc3RlbmVyLCBzZWxlY3Rvcjogc2VsZWN0b3IgfSk7XG5cdFx0XHRcdHJldHVybiBoYW5kbGVyO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3VuZGVsZWdhdGUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHVuZGVsZWdhdGUoZXZlbnROYW1lLCBzZWxlY3RvciwgbGlzdGVuZXIpIHtcblxuXHRcdFx0XHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0bGlzdGVuZXIgPSBzZWxlY3Rvcjtcblx0XHRcdFx0XHRzZWxlY3RvciA9IG51bGw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5lbCkge1xuXHRcdFx0XHRcdHZhciBoYW5kbGVycyA9IHRoaXMuX2RvbUV2ZW50cy5zbGljZSgpO1xuXHRcdFx0XHRcdHZhciBpID0gaGFuZGxlcnMubGVuZ3RoO1xuXG5cdFx0XHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHRcdFx0dmFyIGl0ZW0gPSBoYW5kbGVyc1tpXTtcblxuXHRcdFx0XHRcdFx0dmFyIG1hdGNoID0gaXRlbS5ldmVudE5hbWUgPT09IGV2ZW50TmFtZSAmJiAobGlzdGVuZXIgPyBpdGVtLmxpc3RlbmVyID09PSBsaXN0ZW5lciA6IHRydWUpICYmIChzZWxlY3RvciA/IGl0ZW0uc2VsZWN0b3IgPT09IHNlbGVjdG9yIDogdHJ1ZSk7XG5cblx0XHRcdFx0XHRcdGlmICghbWF0Y2gpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdFx0XHRFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGhpcy5lbCwgaXRlbS5ldmVudE5hbWUsIGl0ZW0uaGFuZGxlciwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0dGhpcy5fZG9tRXZlbnRzLnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICd1bmRlbGVnYXRlRXZlbnRzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1bmRlbGVnYXRlRXZlbnRzKCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLmVsKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX2RvbUV2ZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGl0ZW0gPSB0aGlzLl9kb21FdmVudHNbaV07XG5cdFx0XHRcdFx0XHRFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGhpcy5lbCwgaXRlbS5ldmVudE5hbWUsIGl0ZW0uaGFuZGxlciwgZmFsc2UpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0dGhpcy5fZG9tRXZlbnRzLmxlbmd0aCA9IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdyZW1vdmUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcblx0XHRcdFx0dGhpcy51bmRlbGVnYXRlVmVudHMoKTtcblx0XHRcdFx0dGhpcy51bmRlbGVnYXRlRXZlbnRzKCk7XG5cdFx0XHRcdGlmICh0aGlzLmVsLnBhcmVudE5vZGUpIHRoaXMuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICd1cGRhdGUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9XSk7XG5cblx0XHRyZXR1cm4gQ29tcG9uZW50O1xuXHR9KF9iYXNlMi5kZWZhdWx0KTtcblxuXHRleHBvcnRzLmRlZmF1bHQgPSBDb21wb25lbnQ7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBvbmVudC5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJywgJy4vYmFzZScsICcuL3R5cGVzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCcuL2Jhc2UnKSwgcmVxdWlyZSgnLi90eXBlcycpKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIGdsb2JhbC5iYXNlLCBnbG9iYWwudHlwZXMpO1xuXHRcdGdsb2JhbC5tb2R1bGUgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIF9iYXNlLCBfdHlwZXMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBfYmFzZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iYXNlKTtcblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuXHRcdHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG5cdFx0XHRkZWZhdWx0OiBvYmpcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuXHRcdGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcblx0XHRpZiAoIXNlbGYpIHtcblx0XHRcdHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcblx0fVxuXG5cdHZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG5cdFx0XHRcdGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcblx0XHRcdFx0ZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuXHRcdFx0XHRpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcblx0XHRcdGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG5cdFx0XHRpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcblx0XHRcdHJldHVybiBDb25zdHJ1Y3Rvcjtcblx0XHR9O1xuXHR9KCk7XG5cblx0ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG5cdFx0aWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG5cdFx0fVxuXG5cdFx0c3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG5cdFx0XHRjb25zdHJ1Y3Rvcjoge1xuXHRcdFx0XHR2YWx1ZTogc3ViQ2xhc3MsXG5cdFx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xuXHR9XG5cblx0dmFyIE1vZHVsZSA9IGZ1bmN0aW9uIChfQmFzZSkge1xuXHRcdF9pbmhlcml0cyhNb2R1bGUsIF9CYXNlKTtcblxuXHRcdF9jcmVhdGVDbGFzcyhNb2R1bGUsIFt7XG5cdFx0XHRrZXk6ICd0eXBlJyxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gX3R5cGVzLk1PRFVMRV9UWVBFO1xuXHRcdFx0fVxuXHRcdH1dLCBbe1xuXHRcdFx0a2V5OiAndHlwZScsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIF90eXBlcy5NT0RVTEVfVFlQRTtcblx0XHRcdH1cblx0XHR9XSk7XG5cblx0XHRmdW5jdGlvbiBNb2R1bGUoKSB7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cdFx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgTW9kdWxlKTtcblxuXHRcdFx0dmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKE1vZHVsZSkuY2FsbCh0aGlzLCBvcHRpb25zKSk7XG5cblx0XHRcdF90aGlzLmJlZm9yZUluaXRpYWxpemUob3B0aW9ucyk7XG5cdFx0XHRfdGhpcy5pbml0aWFsaXplKG9wdGlvbnMpO1xuXHRcdFx0X3RoaXMuYWZ0ZXJJbml0aWFsaXplKG9wdGlvbnMpO1xuXHRcdFx0X3RoaXMuYmluZEN1c3RvbUV2ZW50cygpO1xuXHRcdFx0X3RoaXMuZGVsZWdhdGVWZW50cygpO1xuXHRcdFx0cmV0dXJuIF90aGlzO1xuXHRcdH1cblxuXHRcdHJldHVybiBNb2R1bGU7XG5cdH0oX2Jhc2UyLmRlZmF1bHQpO1xuXG5cdGV4cG9ydHMuZGVmYXVsdCA9IE1vZHVsZTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9kdWxlLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBmYWN0b3J5KGV4cG9ydHMpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtb2QgPSB7XG4gICAgICBleHBvcnRzOiB7fVxuICAgIH07XG4gICAgZmFjdG9yeShtb2QuZXhwb3J0cyk7XG4gICAgZ2xvYmFsLnR5cGVzID0gbW9kLmV4cG9ydHM7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxuICB9KTtcbiAgdmFyIE1PRFVMRV9UWVBFID0gJ21vZHVsZSc7XG4gIHZhciBTRVJWSUNFX1RZUEUgPSAnc2VydmljZSc7XG4gIHZhciBDT01QT05FTlRfVFlQRSA9ICdjb21wb25lbnQnO1xuICB2YXIgTU9ERUxfVFlQRSA9ICdtb2RlbCc7XG5cbiAgZXhwb3J0cy5NT0RVTEVfVFlQRSA9IE1PRFVMRV9UWVBFO1xuICBleHBvcnRzLlNFUlZJQ0VfVFlQRSA9IFNFUlZJQ0VfVFlQRTtcbiAgZXhwb3J0cy5DT01QT05FTlRfVFlQRSA9IENPTVBPTkVOVF9UWVBFO1xuICBleHBvcnRzLk1PREVMX1RZUEUgPSBNT0RFTF9UWVBFO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJmdW5jdGlvbiBQbGl0ZShyZXNvbHZlcikge1xuICB2YXIgZW1wdHlGbiA9IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgY2hhaW4gPSBlbXB0eUZuLFxuICAgICAgcmVzdWx0R2V0dGVyO1xuXG4gIGZ1bmN0aW9uIHByb2Nlc3NSZXN1bHQocmVzdWx0LCBjYWxsYmFjaywgcmVqZWN0KSB7XG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudGhlbikge1xuICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgcHJvY2Vzc1Jlc3VsdChkYXRhLCBjYWxsYmFjaywgcmVqZWN0KTtcbiAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgcHJvY2Vzc1Jlc3VsdChlcnIsIHJlamVjdCwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFJlc3VsdChjYWxsYmFja1J1bm5lcikge1xuICAgIHJlc3VsdEdldHRlciA9IGZ1bmN0aW9uIChzdWNjZXNzQ2FsbGJhY2ssIGZhaWxDYWxsYmFjaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2FsbGJhY2tSdW5uZXIoc3VjY2Vzc0NhbGxiYWNrLCBmYWlsQ2FsbGJhY2spO1xuICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgZmFpbENhbGxiYWNrKGV4KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hhaW4oKTtcbiAgICBjaGFpbiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEVycm9yKGVycikge1xuICAgIHNldFJlc3VsdChmdW5jdGlvbiAoc3VjY2VzcywgZmFpbCkge1xuICAgICAgZmFpbChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0U3VjY2VzcyhkYXRhKSB7XG4gICAgc2V0UmVzdWx0KGZ1bmN0aW9uIChzdWNjZXNzKSB7XG4gICAgICBzdWNjZXNzKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGRDaGFpbihvbnN1Y2Nlc3MsIG9uZmFpbHVyZSkge1xuICAgIHZhciBwcmV2Q2hhaW4gPSBjaGFpbjtcbiAgICBjaGFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByZXZDaGFpbigpO1xuICAgICAgcmVzdWx0R2V0dGVyKG9uc3VjY2Vzcywgb25mYWlsdXJlKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIHNlbGYgPSB7XG4gICAgdGhlbjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgcmVzb2x2ZUNhbGxiYWNrID0gcmVzdWx0R2V0dGVyIHx8IGJ1aWxkQ2hhaW47XG5cbiAgICAgIHJldHVybiBQbGl0ZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlc29sdmVDYWxsYmFjayhmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHJlc29sdmUoY2FsbGJhY2soZGF0YSkpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNhdGNoOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgIHZhciByZXNvbHZlQ2FsbGJhY2sgPSByZXN1bHRHZXR0ZXIgfHwgYnVpbGRDaGFpbjtcblxuICAgICAgcmV0dXJuIFBsaXRlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVzb2x2ZUNhbGxiYWNrKHJlc29sdmUsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICByZWplY3QoY2FsbGJhY2soZXJyKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlc29sdmU6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICFyZXN1bHRHZXR0ZXIgJiYgcHJvY2Vzc1Jlc3VsdChyZXN1bHQsIHNldFN1Y2Nlc3MsIHNldEVycm9yKTtcbiAgICB9LFxuXG4gICAgcmVqZWN0OiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAhcmVzdWx0R2V0dGVyICYmIHByb2Nlc3NSZXN1bHQoZXJyLCBzZXRFcnJvciwgc2V0RXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICByZXNvbHZlciAmJiByZXNvbHZlcihzZWxmLnJlc29sdmUsIHNlbGYucmVqZWN0KTtcblxuICByZXR1cm4gc2VsZjtcbn1cblxuUGxpdGUucmVzb2x2ZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgcmV0dXJuIFBsaXRlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZShyZXN1bHQpO1xuICB9KTtcbn07XG5cblBsaXRlLnJlamVjdCA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgcmV0dXJuIFBsaXRlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICByZWplY3QoZXJyKTtcbiAgfSk7XG59O1xuXG5QbGl0ZS5yYWNlID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gIHByb21pc2VzID0gcHJvbWlzZXMgfHwgW107XG4gIHJldHVybiBQbGl0ZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIGxlbiA9IHByb21pc2VzLmxlbmd0aDtcbiAgICBpZiAoIWxlbikgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHZhciBwID0gcHJvbWlzZXNbaV07XG4gICAgICBwICYmIHAudGhlbiAmJiBwLnRoZW4ocmVzb2x2ZSkuY2F0Y2gocmVqZWN0KTtcbiAgICB9XG4gIH0pO1xufTtcblxuUGxpdGUuYWxsID0gZnVuY3Rpb24gKHByb21pc2VzKSB7XG4gIHByb21pc2VzID0gcHJvbWlzZXMgfHwgW107XG4gIHJldHVybiBQbGl0ZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIGxlbiA9IHByb21pc2VzLmxlbmd0aCxcbiAgICAgICAgY291bnQgPSBsZW47XG5cbiAgICBpZiAoIWxlbikgcmV0dXJuIHJlc29sdmUoKTtcblxuICAgIGZ1bmN0aW9uIGRlY3JlbWVudCgpIHtcbiAgICAgIC0tY291bnQgPD0gMCAmJiByZXNvbHZlKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YWl0Rm9yKHAsIGkpIHtcbiAgICAgIGlmIChwICYmIHAudGhlbikge1xuICAgICAgICBwLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHByb21pc2VzW2ldID0gcmVzdWx0O1xuICAgICAgICAgIGRlY3JlbWVudCgpO1xuICAgICAgICB9KS5jYXRjaChyZWplY3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVjcmVtZW50KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgd2FpdEZvcihwcm9taXNlc1tpXSwgaSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZGVmaW5lICE9PSAnZnVuY3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gUGxpdGU7XG59XG4iLCJpbXBvcnQgQXBwbGljYXRpb25GYWNhZGUgZnJvbSAnY29tcGxheS9saWIvYXBwbGljYXRpb24tZmFjYWRlJztcclxuaW1wb3J0IEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50IGZyb20gJ2NvbXBsYXkvbGliL2FwcGxpY2F0aW9uLWRvbS1jb21wb25lbnQnO1xyXG5cclxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBBcHBsaWNhdGlvbkZhY2FkZSB7fVxyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcGxpY2F0aW9uKHtcclxuICAgIG9ic2VydmU6IHRydWUsXHJcbiAgICBBcHBDb21wb25lbnQ6IEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50XHJcbn0pO1xyXG5cclxuYXBwLmltbWVkaWF0ZSgoKSA9PiB7XHJcblxyXG59KTtcclxuXHJcbmFwcC5vbkRvbVJlYWR5KCgpID0+IHtcclxuXHJcbn0pOyJdfQ==
