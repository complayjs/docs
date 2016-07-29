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

					if (node.nodeType !== Node.ELEMENT_NODE) {
						return;
					}

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

					existingRegistryModuleItem.autostart = !!(inst ? inst.autostart : existingRegistryModuleItem.autostart);

					// push if instance not exists
					if (inst && this._modules[index].instances.indexOf(inst) === -1) {
						this._modules[index].instances.push(inst);
					}
				} else if ([_types.SERVICE_TYPE, _types.COMPONENT_TYPE, _types.MODULE_TYPE].indexOf(module.type) > -1) {

					var registryObject = {
						type: module.type,
						module: module,
						instances: inst ? [inst] : [],
						autostart: !!(inst ? inst.autostart : module.autostart),
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

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require('complay/lib/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackgroundArt = function (_Component) {
    _inherits(BackgroundArt, _Component);

    function BackgroundArt() {
        _classCallCheck(this, BackgroundArt);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BackgroundArt).apply(this, arguments));
    }

    _createClass(BackgroundArt, [{
        key: 'initialize',
        value: function initialize() {
            console.log(this + '.initialize()', this.options.app);
        }
    }]);

    return BackgroundArt;
}(_component2.default);

exports.default = BackgroundArt;

},{"complay/lib/component":15}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require('complay/lib/component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_Component) {
    _inherits(Test, _Component);

    function Test() {
        _classCallCheck(this, Test);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Test).apply(this, arguments));
    }

    _createClass(Test, [{
        key: 'initialize',
        value: function initialize() {
            console.log(this + '.initialize()');
        }
    }]);

    return Test;
}(_component2.default);

exports.default = Test;

},{"complay/lib/component":15}],21:[function(require,module,exports){
'use strict';

var _applicationFacade = require('complay/lib/application-facade');

var _applicationFacade2 = _interopRequireDefault(_applicationFacade);

var _applicationDomComponent = require('complay/lib/application-dom-component');

var _applicationDomComponent2 = _interopRequireDefault(_applicationDomComponent);

var _backgroundArt = require('./components/background-art/background-art');

var _backgroundArt2 = _interopRequireDefault(_backgroundArt);

var _test = require('./components/test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// components


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

app.onDomReady(function () {
    app.start({
        component: _backgroundArt2.default,
        options: {
            autostart: true
        }
    });

    app.start({
        component: _test2.default,
        options: {
            autostart: true,
            el: document.querySelector('.js-test')
        }
    });
});

},{"./components/background-art/background-art":19,"./components/test":20,"complay/lib/application-dom-component":12,"complay/lib/application-facade":13}]},{},[21])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9jb21wbGF5L2RlZmF1bHQtY29uZmlnLmpzIiwiLi4vY29tcGxheS9leHRlbnNpb25zL2ZhbGxiYWNrL2ZhbGxiYWNrLmpzIiwiLi4vY29tcGxheS9leHRlbnNpb25zL3ZlbnQvdmVudC5qcyIsIi4uL2NvbXBsYXkvaGVscGVycy9hcnJheS9mcm9tLmpzIiwiLi4vY29tcGxheS9oZWxwZXJzL2FycmF5L3VuaXF1ZXMuanMiLCIuLi9jb21wbGF5L2hlbHBlcnMvZG9tL2RvbS1ub2RlLWFycmF5LmpzIiwiLi4vY29tcGxheS9oZWxwZXJzL2Vudmlyb25tZW50L2dldC1nbG9iYWwtb2JqZWN0LmpzIiwiLi4vY29tcGxheS9oZWxwZXJzL29iamVjdC9hc3NpZ24uanMiLCIuLi9jb21wbGF5L2hlbHBlcnMvc3RyaW5nL2Rhc2hlcml6ZS5qcyIsIi4uL2NvbXBsYXkvaGVscGVycy9zdHJpbmcvZXh0cmFjdC1vYmplY3QtbmFtZS5qcyIsIi4uL2NvbXBsYXkvaGVscGVycy9zdHJpbmcvbmFtZWQtdWlkLmpzIiwiLi4vY29tcGxheS9saWIvYXBwbGljYXRpb24tZG9tLWNvbXBvbmVudC5qcyIsIi4uL2NvbXBsYXkvbGliL2FwcGxpY2F0aW9uLWZhY2FkZS5qcyIsIi4uL2NvbXBsYXkvbGliL2Jhc2UuanMiLCIuLi9jb21wbGF5L2xpYi9jb21wb25lbnQuanMiLCIuLi9jb21wbGF5L2xpYi9tb2R1bGUuanMiLCIuLi9jb21wbGF5L2xpYi90eXBlcy5qcyIsIi4uL2NvbXBsYXkvbm9kZV9tb2R1bGVzL3BsaXRlL3BsaXRlLmpzIiwicmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYmFja2dyb3VuZC1hcnQvYmFja2dyb3VuZC1hcnQuanMiLCJyZXNvdXJjZXMvanMvY29tcG9uZW50cy90ZXN0LmpzIiwicmVzb3VyY2VzL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDclBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeGRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzlJQTs7Ozs7Ozs7Ozs7O0lBRU0sYTs7Ozs7Ozs7Ozs7cUNBRVc7QUFDVCxvQkFBUSxHQUFSLENBQWUsSUFBZixvQkFBb0MsS0FBSyxPQUFMLENBQWEsR0FBakQ7QUFDSDs7Ozs7O2tCQUdVLGE7Ozs7Ozs7Ozs7O0FDVGY7Ozs7Ozs7Ozs7OztJQUVNLEk7Ozs7Ozs7Ozs7O3FDQUNXO0FBQ1Qsb0JBQVEsR0FBUixDQUFlLElBQWY7QUFDSDs7Ozs7O2tCQUdVLEk7Ozs7O0FDUmY7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztJQUdNLFc7Ozs7Ozs7Ozs7OztBQUVOLElBQU0sTUFBTSxJQUFJLFdBQUosQ0FBZ0I7QUFDeEIsYUFBUyxJQURlO0FBRXhCO0FBRndCLENBQWhCLENBQVo7O0FBS0EsSUFBSSxTQUFKLENBQWMsWUFBTSxDQUVuQixDQUZEOztBQUlBLElBQUksVUFBSixDQUFlLFlBQU07QUFDakIsUUFBSSxLQUFKLENBQVU7QUFDTiwwQ0FETTtBQUVOLGlCQUFTO0FBQ0wsdUJBQVc7QUFETjtBQUZILEtBQVY7O0FBT0EsUUFBSSxLQUFKLENBQVU7QUFDTixpQ0FETTtBQUVOLGlCQUFTO0FBQ0wsdUJBQVcsSUFETjtBQUVMLGdCQUFJLFNBQVMsYUFBVCxDQUF1QixVQUF2QjtBQUZDO0FBRkgsS0FBVjtBQU9ILENBZkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cycsICcuL2V4dGVuc2lvbnMvZmFsbGJhY2svZmFsbGJhY2suanMnLCAnLi9leHRlbnNpb25zL3ZlbnQvdmVudC5qcyddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnLi9leHRlbnNpb25zL2ZhbGxiYWNrL2ZhbGxiYWNrLmpzJyksIHJlcXVpcmUoJy4vZXh0ZW5zaW9ucy92ZW50L3ZlbnQuanMnKSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBnbG9iYWwuZmFsbGJhY2ssIGdsb2JhbC52ZW50KTtcblx0XHRnbG9iYWwuZGVmYXVsdENvbmZpZyA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgX2ZhbGxiYWNrLCBfdmVudCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cblx0dmFyIF9mYWxsYmFjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mYWxsYmFjayk7XG5cblx0dmFyIF92ZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlbnQpO1xuXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG5cdFx0cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcblx0XHRcdGRlZmF1bHQ6IG9ialxuXHRcdH07XG5cdH1cblxuXHR2YXIgZGVmYXVsdENvbmZpZyA9IHtcblx0XHR2ZW50OiBfdmVudDIuZGVmYXVsdCxcblx0XHRkb206ICgwLCBfZmFsbGJhY2syLmRlZmF1bHQpKCdkb20nKSxcblx0XHR0ZW1wbGF0ZTogKDAsIF9mYWxsYmFjazIuZGVmYXVsdCkoJ3RlbXBsYXRlJylcblx0fTtcblxuXHRleHBvcnRzLmRlZmF1bHQgPSBkZWZhdWx0Q29uZmlnO1xufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmF1bHQtY29uZmlnLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cyk7XG5cdFx0Z2xvYmFsLmZhbGxiYWNrID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHRleHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAodHlwZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBpc1N0cmluZyA9IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJztcblxuXHRcdFx0aWYgKGlzU3RyaW5nICYmIHR5cGVNZXNzYWdlc0Jyb2FkY2FzdGVkLmluZGV4T2YodHlwZSkgPT09IC0xKSB7XG5cdFx0XHRcdHZhciBtc2dBcnJheSA9IFsnRXh0ZW5zaW9uIGZvciBcIicgKyB0eXBlICsgJ1wiIGlzIG5vdCBjb25maWd1cmVkIHlldC5cXHJcXG4nLCAnUGxlYXNlIHBhc3MgYW4gZXh0ZW5zaW9ucyB0aHJvdWdoIEFwcGxpY2F0aW9uRmFjYWRlIGNvbnN0cnVjdG9yIG9wdGlvbnMuJyArIHR5cGUgKyAnXFxyXFxuJywgJ29yIGRpcmVjdGx5IHRocm91Z2ggTW9kdWxlLCBTZXJ2aWNlIG9yIENvbXBvbmVudCB2aWEgb3B0aW9ucy5hcHAuJyArIHR5cGUgKyAnISddO1xuXG5cdFx0XHRcdGNvbnNvbGUud2Fybihtc2dBcnJheS5qb2luKCcnKSk7XG5cblx0XHRcdFx0dHlwZU1lc3NhZ2VzQnJvYWRjYXN0ZWQucHVzaCh0eXBlKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFyZ3VtZW50c1swXTtcblx0XHR9O1xuXHR9O1xuXG5cdHZhciB0eXBlTWVzc2FnZXNCcm9hZGNhc3RlZCA9IFtdO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mYWxsYmFjay5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMpO1xuXHRcdGdsb2JhbC52ZW50ID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblx0ZXhwb3J0cy5kZWZhdWx0ID0gVmVudDtcblx0dmFyIHRhcmdldHMgPSBbXTtcblx0dmFyIGV2ZW50cyA9IHt9O1xuXG5cdGZ1bmN0aW9uIFZlbnQobmV3VGFyZ2V0KSB7XG5cdFx0dmFyIGVtcHR5ID0gW107XG5cdFx0dmFyIGluZGV4ID0gdGFyZ2V0cy5pbmRleE9mKG5ld1RhcmdldCk7XG5cdFx0dmFyIHRhcmdldCA9IHRhcmdldHNbaW5kZXhdO1xuXG5cdFx0aWYgKGluZGV4ID09PSAtMSB8fCAhdGFyZ2V0KSB7XG5cdFx0XHR0YXJnZXQgPSBuZXdUYXJnZXQgfHwgdGhpcztcblxuXHRcdFx0aWYgKCF0YXJnZXQudWlkKSB7XG5cdFx0XHRcdHRhcmdldC51aWQgPSBNYXRoLnJhbmRvbSgpICsgJyc7XG5cdFx0XHR9XG5cblx0XHRcdHRhcmdldHMucHVzaCh0YXJnZXQpO1xuXHRcdFx0aW5kZXggPSB0YXJnZXRzLmxlbmd0aCAtIDE7XG5cblx0XHRcdGV2ZW50c1t0YXJnZXRzW2luZGV4XS51aWRdID0ge307XG5cdFx0fVxuXG5cdFx0LyoqXG4gICAqICBPbjogbGlzdGVuIHRvIGV2ZW50c1xuICAgKi9cblx0XHR0YXJnZXQub24gPSBmdW5jdGlvbiAodHlwZSwgZnVuYywgY3R4KSB7XG5cdFx0XHQoZXZlbnRzW3RhcmdldHNbaW5kZXhdLnVpZF1bdHlwZV0gPSBldmVudHNbdGFyZ2V0c1tpbmRleF0udWlkXVt0eXBlXSB8fCBbXSkucHVzaChbZnVuYywgY3R4XSk7XG5cdFx0fTtcblx0XHQvKipcbiAgICogIE9mZjogc3RvcCBsaXN0ZW5pbmcgdG8gZXZlbnQgLyBzcGVjaWZpYyBjYWxsYmFja1xuICAgKi9cblx0XHR0YXJnZXQub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGZ1bmMpIHtcblx0XHRcdHR5cGUgfHwgKGV2ZW50c1t0YXJnZXRzW2luZGV4XS51aWRdID0ge30pO1xuXHRcdFx0dmFyIGxpc3QgPSBldmVudHNbdGFyZ2V0c1tpbmRleF0udWlkXVt0eXBlXSB8fCBlbXB0eSxcblx0XHRcdCAgICBpID0gbGlzdC5sZW5ndGggPSBmdW5jID8gbGlzdC5sZW5ndGggOiAwO1xuXHRcdFx0d2hpbGUgKGktLSkge1xuXHRcdFx0XHRmdW5jID09IGxpc3RbaV1bMF0gJiYgbGlzdC5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHQvKiogXG4gICAqIFRyaWdnZXI6IHNlbmQgZXZlbnQsIGNhbGxiYWNrcyB3aWxsIGJlIHRyaWdnZXJlZFxuICAgKi9cblx0XHR0YXJnZXQudHJpZ2dlciA9IGZ1bmN0aW9uICh0eXBlKSB7XG5cdFx0XHR2YXIgbGlzdCA9IGV2ZW50c1t0YXJnZXRzW2luZGV4XS51aWRdW3R5cGVdIHx8IGVtcHR5LFxuXHRcdFx0ICAgIGkgPSAwLFxuXHRcdFx0ICAgIGogPSB2b2lkIDA7XG5cdFx0XHR3aGlsZSAoaiA9IGxpc3RbaSsrXSkge1xuXHRcdFx0XHRqWzBdLmFwcGx5KGpbMV0sIGVtcHR5LnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiB0YXJnZXRzW2luZGV4XTtcblx0fVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZW50LmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cyk7XG5cdFx0Z2xvYmFsLmZyb20gPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXG5cdGV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoIUFycmF5LmZyb20pIHtcblx0XHRcdEFycmF5LmZyb20gPSBmdW5jdGlvbiAob2JqZWN0KSB7XG5cdFx0XHRcdCd1c2Ugc3RyaWN0JztcblxuXHRcdFx0XHRyZXR1cm4gW10uc2xpY2UuY2FsbChvYmplY3QpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0uY2FsbCh1bmRlZmluZWQpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cyk7XG5cdFx0Z2xvYmFsLnVuaXF1ZXMgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXHRleHBvcnRzLmRlZmF1bHQgPSB1bmlxdWVzO1xuXHRmdW5jdGlvbiB1bmlxdWVzKGFycikge1xuXHRcdHZhciBhID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRpZiAoYS5pbmRleE9mKGFycltpXSkgPT09IC0xICYmIGFycltpXSAhPT0gJycpIGEucHVzaChhcnJbaV0pO1xuXHRcdH1yZXR1cm4gYTtcblx0fVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11bmlxdWVzLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnLCAnLi4vYXJyYXkvZnJvbSddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnLi4vYXJyYXkvZnJvbScpKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIGdsb2JhbC5mcm9tKTtcblx0XHRnbG9iYWwuZG9tTm9kZUFycmF5ID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBfZnJvbSkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHMuZGVmYXVsdCA9IGRvbU5vZGVBcnJheTtcblxuXHR2YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuXHRcdFx0ZGVmYXVsdDogb2JqXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGRvbU5vZGVBcnJheShpdGVtLCBjdHgpIHtcblxuXHRcdHZhciByZXRBcnJheSA9IFtdO1xuXG5cdFx0Y3R4ID0gY3R4IHx8IGRvY3VtZW50O1xuXG5cdFx0Ly8gY2hlY2tzIGZvciB0eXBlIG9mIGdpdmVuIGNvbnRleHRcblx0XHRpZiAoaXRlbSA9PT0gY3R4KSB7XG5cdFx0XHQvLyBjb250ZXh0IGlzIGl0ZW0gY2FzZVxuXHRcdFx0cmV0QXJyYXkgPSBbaXRlbV07XG5cdFx0fSBlbHNlIGlmIChpdGVtICYmIGl0ZW0ubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG5cdFx0XHQvLyBkb20gbm9kZSBjYXNlXG5cdFx0XHRyZXRBcnJheSA9IFtpdGVtXTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuXHRcdFx0Ly8gc2VsZWN0b3IgY2FzZVxuXHRcdFx0cmV0QXJyYXkgPSBBcnJheS5mcm9tKGN0eC5xdWVyeVNlbGVjdG9yQWxsKGl0ZW0pKTtcblx0XHR9IGVsc2UgaWYgKGl0ZW0gJiYgaXRlbS5sZW5ndGggJiYgQXJyYXkuZnJvbShpdGVtKS5sZW5ndGggPiAwKSB7XG5cdFx0XHQvLyBub2RlbGlzdCBjYXNlXG5cdFx0XHRyZXRBcnJheSA9IEFycmF5LmZyb20oaXRlbSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJldEFycmF5O1xuXHR9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS1ub2RlLWFycmF5LmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cyk7XG5cdFx0Z2xvYmFsLmdldEdsb2JhbE9iamVjdCA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHMuZGVmYXVsdCA9IGdldEdsb2JhbE9iamVjdDtcblx0ZnVuY3Rpb24gZ2V0R2xvYmFsT2JqZWN0KCkge1xuXHRcdC8vIFdvcmtlcnMgZG9u4oCZdCBoYXZlIGB3aW5kb3dgLCBvbmx5IGBzZWxmYFxuXHRcdGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiBnbG9iYWw7XG5cdFx0fVxuXHRcdC8vIE5vdCBhbGwgZW52aXJvbm1lbnRzIGFsbG93IGV2YWwgYW5kIEZ1bmN0aW9uXG5cdFx0Ly8gVXNlIG9ubHkgYXMgYSBsYXN0IHJlc29ydDpcblx0XHRyZXR1cm4gbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Z2V0LWdsb2JhbC1vYmplY3QuanMubWFwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdGZhY3RvcnkoZXhwb3J0cyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzKTtcblx0XHRnbG9iYWwuYXNzaWduID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHRleHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciB0b09iamVjdCA9IGZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRcdFx0XHRcdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdCh2YWwpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cdFx0XHRcdHZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXHRcdFx0XHRPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdFx0XHRcdFx0dmFyIGZyb207XG5cdFx0XHRcdFx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0XHRcdFx0XHR2YXIgc3ltYm9scztcblxuXHRcdFx0XHRcdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0XHRcdFx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRcdFx0XHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0XHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRcdFx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHRvO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkoKTtcblx0XHR9XG5cdH0oKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXNzaWduLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cyk7XG5cdFx0Z2xvYmFsLmRhc2hlcml6ZSA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cdGV4cG9ydHMuZGVmYXVsdCA9IGRhc2hlcml6ZTtcblx0ZnVuY3Rpb24gZGFzaGVyaXplKHN0cikge1xuXHRcdHJldHVybiBzdHIucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24gKGNoYXIsIGluZGV4KSB7XG5cdFx0XHRyZXR1cm4gKGluZGV4ICE9PSAwID8gJy0nIDogJycpICsgY2hhci50b0xvd2VyQ2FzZSgpO1xuXHRcdH0pO1xuXHR9O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXNoZXJpemUuanMubWFwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdGZhY3RvcnkoZXhwb3J0cyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzKTtcblx0XHRnbG9iYWwuZXh0cmFjdE9iamVjdE5hbWUgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBleHRyYWN0T2JqZWN0TmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0XHQvKipcbiAgICogZXh0cmFjdHMgbmFtZSBvZiBhIGNsYXNzIG9yIGEgZnVuY3Rpb25cbiAgICogQHBhcmFtICB7b2JqZWN0fSBvYmogYSBjbGFzcyBvciBhIGZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge3N0cmluZ30gdGhlIHF1YWxpZmllZCBuYW1lIG9mIGEgY2xhc3Mgb3IgYSBmdW5jdGlvblxuICAgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gZXh0cmFjdE9iamVjdE5hbWUob2JqKSB7XG5cblx0XHRcdHZhciBmdW5jTmFtZVJlZ2V4ID0gL15mdW5jdGlvbiAoW2EtekEtWjAtOV9dKylcXChcXCkvO1xuXHRcdFx0dmFyIHJlc3VsdHMgPSBmdW5jTmFtZVJlZ2V4LmV4ZWMob2JqLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkpO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0cyAmJiByZXN1bHRzLmxlbmd0aCA+IDEgPyByZXN1bHRzWzFdIDogJyc7XG5cdFx0fTtcblx0fS5jYWxsKHVuZGVmaW5lZCk7XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gZXh0cmFjdE9iamVjdE5hbWU7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4dHJhY3Qtb2JqZWN0LW5hbWUuanMubWFwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cycsICcuL2V4dHJhY3Qtb2JqZWN0LW5hbWUnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJy4vZXh0cmFjdC1vYmplY3QtbmFtZScpKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgbW9kID0ge1xuXHRcdFx0ZXhwb3J0czoge31cblx0XHR9O1xuXHRcdGZhY3RvcnkobW9kLmV4cG9ydHMsIGdsb2JhbC5leHRyYWN0T2JqZWN0TmFtZSk7XG5cdFx0Z2xvYmFsLm5hbWVkVWlkID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBfZXh0cmFjdE9iamVjdE5hbWUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBfZXh0cmFjdE9iamVjdE5hbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0cmFjdE9iamVjdE5hbWUpO1xuXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG5cdFx0cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcblx0XHRcdGRlZmF1bHQ6IG9ialxuXHRcdH07XG5cdH1cblxuXHR2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuXHRcdHJldHVybiB0eXBlb2Ygb2JqO1xuXHR9IDogZnVuY3Rpb24gKG9iaikge1xuXHRcdHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG5cdH07XG5cblx0dmFyIG5hbWVkVWlkID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBjb3VudGVycyA9IHt9O1xuXHRcdC8qKlxuICAgKiBhZGRzIGEgbnVtYmVyIGFzIHN0cmluZyB0byBhIGdpdmVuIGlkIHN0cmluZ1xuICAgKiBpZiBhbiBpZCBzdHJpbmcgY3JlYXRlZCB3aXRoIHRoaXMgbWV0aG9kIGFscmVhZHkgZXhpc3RzIFxuICAgKiBpdCBpbmNyZWFzZXMgdGhlIG51bWJlciBmb3IgdHJ1bHkgdW5pcXVlIGlkJ3NcbiAgICogQHBhcmFtICB7bWl4ZWR9IGlkT2JqZWN0IEBzZWUgZXh0cmFjdE9iamVjdE5hbWUgd2hpY2ggZXh0cmFjdHMgdGhhdCBzdHJpbmdcbiAgICogQHJldHVybiB7c3RyaW5nfSB0aGUgdWlkIGZvciBpZGVudGlmeWluZyBhbiBpbnN0YW5jZSwgd2hlbiBkZWJ1Z2dpbmcgb3IgXG4gICAqICAgICAgICAgICAgICAgICAgZm9yIGF1dG9tYXRpYyBzZWxlY3RvciBjcmVhdGlvblxuICAgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24gbmFtZVdpdGhJbmNyZWFzaW5nSWQoaWRPYmplY3QpIHtcblxuXHRcdFx0dmFyIGlkU3RyaW5nID0gdm9pZCAwO1xuXG5cdFx0XHRpZiAoKHR5cGVvZiBpZE9iamVjdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoaWRPYmplY3QpKSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Ly8gY291bGQgYmUgYSBjbGFzcywgZnVuY3Rpb24gb3Igb2JqZWN0XG5cdFx0XHRcdC8vIHNvIHRyeSB0byBleHRyYWN0IHRoZSBuYW1lXG5cdFx0XHRcdGlkU3RyaW5nID0gKDAsIF9leHRyYWN0T2JqZWN0TmFtZTIuZGVmYXVsdCkoaWRPYmplY3QpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZFN0cmluZyA9IGlkT2JqZWN0O1xuXG5cdFx0XHRpZiAoY291bnRlcnNbaWRTdHJpbmddKSB7XG5cblx0XHRcdFx0Y291bnRlcnNbaWRTdHJpbmddKys7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNvdW50ZXJzW2lkU3RyaW5nXSA9IDE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpZFN0cmluZyArICctJyArIGNvdW50ZXJzW2lkU3RyaW5nXTtcblx0XHR9O1xuXHR9LmNhbGwodW5kZWZpbmVkKTtcblxuXHRleHBvcnRzLmRlZmF1bHQgPSBuYW1lZFVpZDtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bmFtZWQtdWlkLmpzLm1hcCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdGRlZmluZShbJ2V4cG9ydHMnLCAnLi9jb21wb25lbnQnLCAnLi90eXBlcycsICcuLi9oZWxwZXJzL2RvbS9kb20tbm9kZS1hcnJheScsICcuLi9oZWxwZXJzL3N0cmluZy9kYXNoZXJpemUnLCAnLi4vaGVscGVycy9hcnJheS91bmlxdWVzJywgJy4uL2hlbHBlcnMvYXJyYXkvZnJvbScsICcuLi9oZWxwZXJzL29iamVjdC9hc3NpZ24nXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJy4vY29tcG9uZW50JyksIHJlcXVpcmUoJy4vdHlwZXMnKSwgcmVxdWlyZSgnLi4vaGVscGVycy9kb20vZG9tLW5vZGUtYXJyYXknKSwgcmVxdWlyZSgnLi4vaGVscGVycy9zdHJpbmcvZGFzaGVyaXplJyksIHJlcXVpcmUoJy4uL2hlbHBlcnMvYXJyYXkvdW5pcXVlcycpLCByZXF1aXJlKCcuLi9oZWxwZXJzL2FycmF5L2Zyb20nKSwgcmVxdWlyZSgnLi4vaGVscGVycy9vYmplY3QvYXNzaWduJykpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cywgZ2xvYmFsLmNvbXBvbmVudCwgZ2xvYmFsLnR5cGVzLCBnbG9iYWwuZG9tTm9kZUFycmF5LCBnbG9iYWwuZGFzaGVyaXplLCBnbG9iYWwudW5pcXVlcywgZ2xvYmFsLmZyb20sIGdsb2JhbC5hc3NpZ24pO1xuXHRcdGdsb2JhbC5hcHBsaWNhdGlvbkRvbUNvbXBvbmVudCA9IG1vZC5leHBvcnRzO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cywgX2NvbXBvbmVudCwgX3R5cGVzLCBfZG9tTm9kZUFycmF5LCBfZGFzaGVyaXplLCBfdW5pcXVlcywgX2Zyb20sIF9hc3NpZ24pIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHRcdHZhbHVlOiB0cnVlXG5cdH0pO1xuXG5cdHZhciBfY29tcG9uZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbXBvbmVudCk7XG5cblx0dmFyIF9kb21Ob2RlQXJyYXkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZG9tTm9kZUFycmF5KTtcblxuXHR2YXIgX2Rhc2hlcml6ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYXNoZXJpemUpO1xuXG5cdHZhciBfdW5pcXVlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91bmlxdWVzKTtcblxuXHR2YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cblx0dmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuXHRcdHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG5cdFx0XHRkZWZhdWx0OiBvYmpcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuXHRcdGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcblx0XHRpZiAoIXNlbGYpIHtcblx0XHRcdHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcblx0fVxuXG5cdHZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG5cdFx0XHRcdGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcblx0XHRcdFx0ZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuXHRcdFx0XHRpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcblx0XHRcdGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG5cdFx0XHRpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcblx0XHRcdHJldHVybiBDb25zdHJ1Y3Rvcjtcblx0XHR9O1xuXHR9KCk7XG5cblx0ZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG5cdFx0aWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG5cdFx0fVxuXG5cdFx0c3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG5cdFx0XHRjb25zdHJ1Y3Rvcjoge1xuXHRcdFx0XHR2YWx1ZTogc3ViQ2xhc3MsXG5cdFx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xuXHR9XG5cblx0dmFyIEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcblx0XHRfaW5oZXJpdHMoQXBwbGljYXRpb25Eb21Db21wb25lbnQsIF9Db21wb25lbnQpO1xuXG5cdFx0X2NyZWF0ZUNsYXNzKEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50LCBbe1xuXHRcdFx0a2V5OiAnZWxlbWVudHMnLFxuXHRcdFx0c2V0OiBmdW5jdGlvbiBzZXQobW9kdWxlT3B0aW9ucykge1xuXHRcdFx0XHR2YXIgX3RoaXMyID0gdGhpcztcblxuXHRcdFx0XHR2YXIgY29udGV4dHMgPSBbXTtcblx0XHRcdFx0dmFyIGVsZW1lbnRzID0gW107XG5cblx0XHRcdFx0dGhpcy5fZWxlbWVudHMgPSB0aGlzLl9lbGVtZW50cyB8fCBbXTtcblx0XHRcdFx0dGhpcy5fbmV3RWxlbWVudHMgPSBbXTtcblxuXHRcdFx0XHQvLyBpZiBpdGVtIGhhcyBubyBjb250ZXh0LCBwYXNzIGFwcGxpY2F0aW9uIGRvbSBjb250ZXh0XG5cdFx0XHRcdGlmICh0aGlzLm9wdGlvbnMuY29udGV4dCAmJiAhbW9kdWxlT3B0aW9ucy5jb250ZXh0KSB7XG5cdFx0XHRcdFx0Ly8gdGhpcyBhcHBsaWNhdGlvbiBmYWNhZGUgaXMgbGltaXRlZCB0byBhIHNwZWNpZmljIGRvbSBlbGVtZW50XG5cdFx0XHRcdFx0bW9kdWxlT3B0aW9ucy5jb250ZXh0ID0gdGhpcy5vcHRpb25zLmNvbnRleHQ7XG5cdFx0XHRcdFx0Y29udGV4dHMgPSAoMCwgX2RvbU5vZGVBcnJheTIuZGVmYXVsdCkodGhpcy5vcHRpb25zLmNvbnRleHQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb250ZXh0ID09PSBtb2R1bGVPcHRpb25zLmNvbnRleHQpIHtcblx0XHRcdFx0XHQvLyBpZiBtb2R1bGUgY29udGV4dCBpcyBzYW1lIGxpa2UgYXBwIGNvbnRleHRcblx0XHRcdFx0XHRjb250ZXh0cyA9ICgwLCBfZG9tTm9kZUFycmF5Mi5kZWZhdWx0KSh0aGlzLm9wdGlvbnMuY29udGV4dCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLmNvbnRleHQuY29udGFpbnMobW9kdWxlT3B0aW9ucy5jb250ZXh0KSkge1xuXHRcdFx0XHRcdC8vIGlmIG1vZHVsZSBjb250ZXh0IGlzIGluY2x1ZGVkIGluIGN1cnJlbnQgY29udGV4dFxuXHRcdFx0XHRcdGNvbnRleHRzID0gKDAsIF9kb21Ob2RlQXJyYXkyLmRlZmF1bHQpKG1vZHVsZU9wdGlvbnMuY29udGV4dCwgdGhpcy5vcHRpb25zLmNvbnRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGVsc2UgaWYgaXQgaXMgbm90IGluIHRoZSBkb20sXG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGZyYWdtZW50IGFuZCB1c2UgdGhpcyBhcyBjb250ZXh0XG5cdFx0XHRcdFx0KDAsIF9kb21Ob2RlQXJyYXkyLmRlZmF1bHQpKG1vZHVsZU9wdGlvbnMuY29udGV4dCkuZm9yRWFjaChmdW5jdGlvbiAoY3R4KSB7XG5cdFx0XHRcdFx0XHR2YXIgdGVtcEN0eCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdFx0XHRcdHRlbXBDdHguYXBwZW5kQ2hpbGQoY3R4KTtcblx0XHRcdFx0XHRcdGNvbnRleHRzLnB1c2godGVtcEN0eCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb250ZXh0cy5mb3JFYWNoKGZ1bmN0aW9uIChjdHgpIHtcblx0XHRcdFx0XHRlbGVtZW50cyA9IEFycmF5LmZyb20oY3R4LnF1ZXJ5U2VsZWN0b3JBbGwoX3RoaXMyLm9wdGlvbnMubW9kdWxlU2VsZWN0b3IpKTtcblx0XHRcdFx0XHRfdGhpczIuX25ld0VsZW1lbnRzID0gZWxlbWVudHM7XG5cdFx0XHRcdFx0X3RoaXMyLl9lbGVtZW50cyA9ICgwLCBfdW5pcXVlczIuZGVmYXVsdCkoX3RoaXMyLl9lbGVtZW50cy5jb25jYXQoZWxlbWVudHMpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXMuX2VsZW1lbnRzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ25ld0VsZW1lbnRzJyxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbmV3RWxlbWVudHM7XG5cdFx0XHR9XG5cdFx0fV0pO1xuXG5cdFx0ZnVuY3Rpb24gQXBwbGljYXRpb25Eb21Db21wb25lbnQoKSB7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cdFx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXBwbGljYXRpb25Eb21Db21wb25lbnQpO1xuXG5cdFx0XHR2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXBwbGljYXRpb25Eb21Db21wb25lbnQpLmNhbGwodGhpcywgb3B0aW9ucykpO1xuXG5cdFx0XHRpZiAob3B0aW9ucy5vYnNlcnZlKSB7XG5cdFx0XHRcdF90aGlzLm9ic2VydmUob3B0aW9ucyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX3RoaXM7XG5cdFx0fVxuXG5cdFx0X2NyZWF0ZUNsYXNzKEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50LCBbe1xuXHRcdFx0a2V5OiAnc3RhcnRDb21wb25lbnRzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzdGFydENvbXBvbmVudHMoaXRlbSwgb3B0aW9ucykge1xuXHRcdFx0XHR2YXIgX3RoaXMzID0gdGhpcztcblxuXHRcdFx0XHR2YXIgZWxlbWVudEFycmF5ID0gW107XG5cdFx0XHRcdHZhciBpbnN0YW5jZXMgPSBbXTtcblxuXHRcdFx0XHQvLyBoYW5kbGUgZXM1IGV4dGVuZHMgYW5kIG5hbWUgcHJvcGVydHlcblx0XHRcdFx0aWYgKCghaXRlbS5uYW1lIHx8IGl0ZW0ubmFtZSA9PT0gJ2NoaWxkJykgJiYgaXRlbS5wcm90b3R5cGUuX25hbWUpIHtcblx0XHRcdFx0XHRpdGVtLmVzNW5hbWUgPSBpdGVtLnByb3RvdHlwZS5fbmFtZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnRBcnJheSA9ICgwLCBfZG9tTm9kZUFycmF5Mi5kZWZhdWx0KShvcHRpb25zLmVsKTtcblxuXHRcdFx0XHRpZiAoZWxlbWVudEFycmF5Lmxlbmd0aCA9PT0gMCkge1xuXG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50cyA9IG9wdGlvbnM7XG5cdFx0XHRcdFx0ZWxlbWVudEFycmF5ID0gdGhpcy5uZXdFbGVtZW50cztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnRBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChkb21Ob2RlKSB7XG5cblx0XHRcdFx0XHR2YXIgaXRlbUluc3RhbmNlID0gX3RoaXMzLnN0YXJ0Q29tcG9uZW50KGl0ZW0sIG9wdGlvbnMsIGRvbU5vZGUpO1xuXG5cdFx0XHRcdFx0aWYgKGl0ZW1JbnN0YW5jZSkge1xuXHRcdFx0XHRcdFx0aW5zdGFuY2VzLnB1c2goaXRlbUluc3RhbmNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiBpbnN0YW5jZXM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnc3RhcnRDb21wb25lbnQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHN0YXJ0Q29tcG9uZW50KGl0ZW0sIG9wdGlvbnMsIGRvbU5vZGUpIHtcblx0XHRcdFx0dmFyIG5hbWUgPSBpdGVtLmVzNW5hbWUgfHwgaXRlbS5uYW1lO1xuXHRcdFx0XHR2YXIgaXRlbUluc3RhbmNlID0gdm9pZCAwO1xuXHRcdFx0XHR2YXIgbW9kdWxlQXR0cmlidXRlID0gZG9tTm9kZS5nZXRBdHRyaWJ1dGUodGhpcy5tb2R1bGVBdHRyaWJ1dGUpO1xuXG5cdFx0XHRcdGlmIChuYW1lICYmIG1vZHVsZUF0dHJpYnV0ZSAmJiBtb2R1bGVBdHRyaWJ1dGUuaW5kZXhPZigoMCwgX2Rhc2hlcml6ZTIuZGVmYXVsdCkobmFtZSkpICE9PSAtMSkge1xuXHRcdFx0XHRcdG9wdGlvbnMuZWwgPSBkb21Ob2RlO1xuXHRcdFx0XHRcdG9wdGlvbnMuYXBwID0gb3B0aW9ucy5hcHAgfHwgdGhpcy5hcHA7XG5cdFx0XHRcdFx0b3B0aW9ucy5tb2R1bGVTZWxlY3RvciA9IG9wdGlvbnMubW9kdWxlU2VsZWN0b3IgfHwgdGhpcy5vcHRpb25zLm1vZHVsZVNlbGVjdG9yO1xuXG5cdFx0XHRcdFx0aXRlbUluc3RhbmNlID0gbmV3IGl0ZW0ob3B0aW9ucyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gaXRlbUluc3RhbmNlO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ29ic2VydmUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIG9ic2VydmUoKSB7XG5cdFx0XHRcdHZhciBfdGhpczQgPSB0aGlzO1xuXG5cdFx0XHRcdHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cblxuXHRcdFx0XHR2YXIgY29uZmlnID0ge1xuXHRcdFx0XHRcdGF0dHJpYnV0ZXM6IHRydWUsXG5cdFx0XHRcdFx0Y2hpbGRMaXN0OiB0cnVlLFxuXHRcdFx0XHRcdGNoYXJhY3RlckRhdGE6IHRydWVcblx0XHRcdFx0fTtcblxuXHRcdFx0XHR2YXIgb2JzZXJ2ZWROb2RlID0gdGhpcy5vcHRpb25zLmNvbnRleHQ7XG5cblx0XHRcdFx0Ly8gY2Fubm90IG9ic2VydmUgZG9jdW1lbnRcblx0XHRcdFx0aWYgKG9ic2VydmVkTm9kZS5jb250YWlucyhkb2N1bWVudC5ib2R5KSkge1xuXHRcdFx0XHRcdG9ic2VydmVkTm9kZSA9IGRvY3VtZW50LmJvZHk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjb25maWcgPSBPYmplY3QuYXNzaWduKG9wdGlvbnMuY29uZmlnIHx8IHt9LCBjb25maWcpO1xuXG5cdFx0XHRcdGlmICh3aW5kb3cuTXV0YXRpb25PYnNlcnZlcikge1xuXG5cdFx0XHRcdFx0dGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcblx0XHRcdFx0XHRcdG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuXHRcdFx0XHRcdFx0XHRpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcgJiYgbXV0YXRpb24uYWRkZWROb2Rlcy5sZW5ndGggPiAwKSB7XG5cblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhtdXRhdGlvbi5hZGRlZE5vZGVzKTtcblxuXHRcdFx0XHRcdFx0XHRcdF90aGlzNC5vbkFkZGVkTm9kZXMobXV0YXRpb24uYWRkZWROb2Rlcyk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcgJiYgbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKG11dGF0aW9uLnJlbW92ZWROb2Rlcyk7XG5cblx0XHRcdFx0XHRcdFx0XHRfdGhpczQub25SZW1vdmVkTm9kZXMobXV0YXRpb24ucmVtb3ZlZE5vZGVzKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHR0aGlzLm9ic2VydmVyLm9ic2VydmUob2JzZXJ2ZWROb2RlLCBjb25maWcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Ly8gQHRvZG86IG5lZWRzIHRlc3QgaW4gSUU5ICYgSUUxMFxuXG5cdFx0XHRcdFx0dGhpcy5vbkFkZGVkTm9kZXNDYWxsYmFjayA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRfdGhpczQub25BZGRlZE5vZGVzKGUudGFyZ2V0KTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHRoaXMub25SZW1vdmVkTm9kZXNDYWxsYmFjayA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRfdGhpczQub25SZW1vdmVkTm9kZXMoZS50YXJnZXQpO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRvYnNlcnZlZE5vZGUuYWRkRXZlbnRMaXN0ZW5lcignRE9NTm9kZUluc2VydGVkJywgdGhpcy5vbkFkZGVkTm9kZXNDYWxsYmFjaywgZmFsc2UpO1xuXHRcdFx0XHRcdG9ic2VydmVkTm9kZS5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlUmVtb3ZlZCcsIHRoaXMub25SZW1vdmVkTm9kZXNDYWxsYmFjaywgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnb25BZGRlZE5vZGVzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBvbkFkZGVkTm9kZXMoYWRkZWROb2Rlcykge1xuXHRcdFx0XHR2YXIgX3RoaXM1ID0gdGhpcztcblxuXHRcdFx0XHR0aGlzLmFwcC5maW5kTWF0Y2hpbmdSZWdpc3RyeUl0ZW1zKF90eXBlcy5DT01QT05FTlRfVFlQRSkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuXG5cdFx0XHRcdFx0dmFyIG1vZCA9IGl0ZW0ubW9kdWxlO1xuXG5cdFx0XHRcdFx0KDAsIF9kb21Ob2RlQXJyYXkyLmRlZmF1bHQpKGFkZGVkTm9kZXMpLmZvckVhY2goZnVuY3Rpb24gKGN0eCkge1xuXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnQ09OVEVYVCcsIGN0eCk7XG5cblx0XHRcdFx0XHRcdGlmIChjdHgubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIF90aGlzNS5tYXRjaGVzU2VsZWN0b3IoY3R4LCBfdGhpczUub3B0aW9ucy5tb2R1bGVTZWxlY3RvcikpIHtcblx0XHRcdFx0XHRcdFx0X3RoaXM1LmFwcC5zdGFydENvbXBvbmVudChtb2QsIHsgY29udGV4dDogY3R4LnBhcmVudEVsZW1lbnQgfSk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGN0eC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcblx0XHRcdFx0XHRcdFx0X3RoaXM1LmFwcC5zdGFydENvbXBvbmVudChtb2QsIHsgY29udGV4dDogY3R4IH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdvblJlbW92ZWROb2RlcycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gb25SZW1vdmVkTm9kZXMocmVtb3ZlZE5vZGVzKSB7XG5cdFx0XHRcdHZhciBfdGhpczYgPSB0aGlzO1xuXG5cdFx0XHRcdHZhciBjb21wb25lbnRSZWdpc3RyeUl0ZW1zID0gdGhpcy5hcHAuZmluZE1hdGNoaW5nUmVnaXN0cnlJdGVtcyhfdHlwZXMuQ09NUE9ORU5UX1RZUEUpO1xuXHRcdFx0XHR2YXIgY29tcG9uZW50Tm9kZXMgPSBbXTtcblxuXHRcdFx0XHQoMCwgX2RvbU5vZGVBcnJheTIuZGVmYXVsdCkocmVtb3ZlZE5vZGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG5cblx0XHRcdFx0XHRpZiAobm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBwdXNoIG91dGVybW9zdCBpZiBtb2R1bGVcblx0XHRcdFx0XHRpZiAoX3RoaXM2Lm1hdGNoZXNTZWxlY3Rvcihub2RlLCBfdGhpczYub3B0aW9ucy5tb2R1bGVTZWxlY3RvcikpIHtcblx0XHRcdFx0XHRcdGNvbXBvbmVudE5vZGVzLnB1c2gobm9kZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gcHVzaCBjaGlsZHJlbiBpZiBtb2R1bGVcblx0XHRcdFx0XHQoMCwgX2RvbU5vZGVBcnJheTIuZGVmYXVsdCkobm9kZS5xdWVyeVNlbGVjdG9yQWxsKF90aGlzNi5vcHRpb25zLm1vZHVsZVNlbGVjdG9yKSkuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlRWwpIHtcblx0XHRcdFx0XHRcdGlmIChfdGhpczYubWF0Y2hlc1NlbGVjdG9yKG1vZHVsZUVsLCBfdGhpczYub3B0aW9ucy5tb2R1bGVTZWxlY3RvcikpIHtcblx0XHRcdFx0XHRcdFx0Y29tcG9uZW50Tm9kZXMucHVzaChtb2R1bGVFbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIGl0ZXJhdGUgb3ZlciBjb21wb25lbnQgcmVnaXN0cnkgaXRlbXNcblx0XHRcdFx0Y29tcG9uZW50UmVnaXN0cnlJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChyZWdpc3RyeUl0ZW0pIHtcblx0XHRcdFx0XHQvLyBpdGVyYXRlIG92ZXIgc3RhcnRlZCBpbnN0YW5jZXNcblx0XHRcdFx0XHRyZWdpc3RyeUl0ZW0uaW5zdGFuY2VzLmZvckVhY2goZnVuY3Rpb24gKGluc3QpIHtcblx0XHRcdFx0XHRcdC8vIGlmIGNvbXBvbmVudCBlbCBpcyB3aXRoaW4gcmVtb3ZlTm9kZXNcblx0XHRcdFx0XHRcdC8vIGRlc3Ryb3kgaW5zdGFuY2Vcblx0XHRcdFx0XHRcdGlmIChjb21wb25lbnROb2Rlcy5pbmRleE9mKGluc3QuZWwpID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0X3RoaXM2LmFwcC5kZXN0cm95KGluc3QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdzdG9wT2JzZXJ2aW5nJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzdG9wT2JzZXJ2aW5nKCkge1xuXHRcdFx0XHRpZiAod2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpIHtcblx0XHRcdFx0XHR0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgb2JzZXJ2ZWROb2RlID0gdGhpcy5vcHRpb25zLmNvbnRleHQgfHwgZG9jdW1lbnQuYm9keTtcblx0XHRcdFx0XHRvYnNlcnZlZE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIkRPTU5vZGVJbnNlcnRlZFwiLCB0aGlzLm9uQWRkZWROb2Rlc0NhbGxiYWNrKTtcblx0XHRcdFx0XHRvYnNlcnZlZE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIkRPTU5vZGVSZW1vdmVkXCIsIHRoaXMub25SZW1vdmVkTm9kZXNDYWxsYmFjayk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XSk7XG5cblx0XHRyZXR1cm4gQXBwbGljYXRpb25Eb21Db21wb25lbnQ7XG5cdH0oX2NvbXBvbmVudDIuZGVmYXVsdCk7XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gQXBwbGljYXRpb25Eb21Db21wb25lbnQ7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcGxpY2F0aW9uLWRvbS1jb21wb25lbnQuanMubWFwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cycsICcuL21vZHVsZScsICcuL3R5cGVzJywgJy4uL2hlbHBlcnMvZW52aXJvbm1lbnQvZ2V0LWdsb2JhbC1vYmplY3QnLCAnLi4vaGVscGVycy9vYmplY3QvYXNzaWduJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0ZmFjdG9yeShleHBvcnRzLCByZXF1aXJlKCcuL21vZHVsZScpLCByZXF1aXJlKCcuL3R5cGVzJyksIHJlcXVpcmUoJy4uL2hlbHBlcnMvZW52aXJvbm1lbnQvZ2V0LWdsb2JhbC1vYmplY3QnKSwgcmVxdWlyZSgnLi4vaGVscGVycy9vYmplY3QvYXNzaWduJykpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBtb2QgPSB7XG5cdFx0XHRleHBvcnRzOiB7fVxuXHRcdH07XG5cdFx0ZmFjdG9yeShtb2QuZXhwb3J0cywgZ2xvYmFsLm1vZHVsZSwgZ2xvYmFsLnR5cGVzLCBnbG9iYWwuZ2V0R2xvYmFsT2JqZWN0LCBnbG9iYWwuYXNzaWduKTtcblx0XHRnbG9iYWwuYXBwbGljYXRpb25GYWNhZGUgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIF9tb2R1bGUsIF90eXBlcywgX2dldEdsb2JhbE9iamVjdCwgX2Fzc2lnbikge1xuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cblx0dmFyIF9tb2R1bGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbW9kdWxlKTtcblxuXHR2YXIgX2dldEdsb2JhbE9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRHbG9iYWxPYmplY3QpO1xuXG5cdHZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuXHRcdFx0ZGVmYXVsdDogb2JqXG5cdFx0fTtcblx0fVxuXG5cdHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBvYmo7XG5cdH0gOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0cmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcblx0fTtcblxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG5cdFx0aWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuXHRcdGlmICghc2VsZikge1xuXHRcdFx0dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xuXHR9XG5cblx0dmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuXHRcdFx0XHRkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdFx0XHRcdGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuXHRcdFx0aWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcblx0XHRcdGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuXHRcdFx0cmV0dXJuIENvbnN0cnVjdG9yO1xuXHRcdH07XG5cdH0oKTtcblxuXHRmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcblx0XHRpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcblx0XHR9XG5cblx0XHRzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcblx0XHRcdGNvbnN0cnVjdG9yOiB7XG5cdFx0XHRcdHZhbHVlOiBzdWJDbGFzcyxcblx0XHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG5cdH1cblxuXHR2YXIgcm9vdCA9ICgwLCBfZ2V0R2xvYmFsT2JqZWN0Mi5kZWZhdWx0KSgpO1xuXG5cdHZhciBBcHBsaWNhdGlvbkZhY2FkZSA9IGZ1bmN0aW9uIChfTW9kdWxlKSB7XG5cdFx0X2luaGVyaXRzKEFwcGxpY2F0aW9uRmFjYWRlLCBfTW9kdWxlKTtcblxuXHRcdF9jcmVhdGVDbGFzcyhBcHBsaWNhdGlvbkZhY2FkZSwgW3tcblx0XHRcdGtleTogJ2dldE1vZHVsZUluc3RhbmNlQnlOYW1lJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBnZXRNb2R1bGVJbnN0YW5jZUJ5TmFtZShtb2R1bGVDb25zdHJ1Y3Rvck5hbWUsIGluZGV4KSB7XG5cblx0XHRcdFx0dmFyIGZvdW5kTW9kdWxlSW5zdGFuY2VzID0gdGhpcy5maW5kTWF0Y2hpbmdSZWdpc3RyeUl0ZW1zKG1vZHVsZUNvbnN0cnVjdG9yTmFtZSk7XG5cblx0XHRcdFx0aWYgKGlzTmFOKGluZGV4KSkge1xuXHRcdFx0XHRcdHJldHVybiBmb3VuZE1vZHVsZUluc3RhbmNlcy5tYXAoZnVuY3Rpb24gKGluc3QpIHtcblx0XHRcdFx0XHRcdHJldHVybiBpbnN0Lm1vZHVsZTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChmb3VuZE1vZHVsZUluc3RhbmNlc1tpbmRleF0gJiYgZm91bmRNb2R1bGVJbnN0YW5jZXNbaW5kZXhdLm1vZHVsZSkge1xuXHRcdFx0XHRcdHJldHVybiBmb3VuZE1vZHVsZUluc3RhbmNlc1tpbmRleF0ubW9kdWxlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnbW9kdWxlcycsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX21vZHVsZXM7XG5cdFx0XHR9XG5cdFx0fV0pO1xuXG5cdFx0ZnVuY3Rpb24gQXBwbGljYXRpb25GYWNhZGUoKSB7XG5cdFx0XHR2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cdFx0XHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgQXBwbGljYXRpb25GYWNhZGUpO1xuXG5cdFx0XHR2YXIgX3RoaXMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQXBwbGljYXRpb25GYWNhZGUpLmNhbGwodGhpcywgb3B0aW9ucykpO1xuXG5cdFx0XHRfdGhpcy5fbW9kdWxlcyA9IFtdO1xuXG5cdFx0XHRfdGhpcy52ZW50ID0gb3B0aW9ucy52ZW50O1xuXHRcdFx0X3RoaXMuZG9tID0gb3B0aW9ucy5kb207XG5cdFx0XHRfdGhpcy50ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGU7XG5cblx0XHRcdGlmIChvcHRpb25zLkFwcENvbXBvbmVudCkge1xuXHRcdFx0XHRfdGhpcy5hcHBDb21wb25lbnQgPSBuZXcgb3B0aW9ucy5BcHBDb21wb25lbnQoT2JqZWN0LmFzc2lnbihvcHRpb25zLCB7XG5cdFx0XHRcdFx0YXBwOiBfdGhpcyxcblx0XHRcdFx0XHRjb250ZXh0OiBvcHRpb25zLmNvbnRleHQgfHwgZG9jdW1lbnQsXG5cdFx0XHRcdFx0bW9kdWxlU2VsZWN0b3I6IG9wdGlvbnMubW9kdWxlU2VsZWN0b3IgfHwgJ1tkYXRhLWpzLWNvbXBvbmVudF0nXG5cdFx0XHRcdH0pKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMubW9kdWxlcykge1xuXHRcdFx0XHRfdGhpcy5zdGFydC5hcHBseShfdGhpcywgb3B0aW9ucy5tb2R1bGVzKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBfdGhpcztcblx0XHR9XG5cblx0XHRfY3JlYXRlQ2xhc3MoQXBwbGljYXRpb25GYWNhZGUsIFt7XG5cdFx0XHRrZXk6ICdmaW5kTWF0Y2hpbmdSZWdpc3RyeUl0ZW1zJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBmaW5kTWF0Y2hpbmdSZWdpc3RyeUl0ZW1zKGl0ZW0pIHtcblxuXHRcdFx0XHRpZiAoaXRlbSA9PT0gJyonKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX21vZHVsZXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbW9kdWxlcy5maWx0ZXIoZnVuY3Rpb24gKG1vZCkge1xuXHRcdFx0XHRcdGlmIChtb2QgPT09IGl0ZW0gfHwgbW9kLm1vZHVsZSA9PT0gaXRlbSB8fCB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgJiYgbW9kLm1vZHVsZS50eXBlID09PSBpdGVtIHx8IHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyAmJiBtb2QubW9kdWxlLm5hbWUgPT09IGl0ZW0gfHwgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihpdGVtKSkgPT09ICdvYmplY3QnICYmIGl0ZW0udWlkICYmIG1vZC5pbnN0YW5jZXMuaW5kZXhPZihpdGVtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbW9kO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnaW1tZWRpYXRlJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBpbW1lZGlhdGUoY2IpIHtcblx0XHRcdFx0Y2IuY2FsbCh0aGlzKTtcblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdvbkRvbVJlYWR5Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBvbkRvbVJlYWR5KGNiKSB7XG5cdFx0XHRcdGlmICghcm9vdC5kb2N1bWVudCB8fCByb290LmRvY3VtZW50ICYmIHJvb3QuZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJykge1xuXHRcdFx0XHRcdGNiLmNhbGwodGhpcyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNiLmJpbmQodGhpcyksIGZhbHNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ29uV2luZG93TG9hZGVkJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBvbldpbmRvd0xvYWRlZChjYikge1xuXHRcdFx0XHRpZiAoIXJvb3QuZG9jdW1lbnQgfHwgcm9vdC5kb2N1bWVudCAmJiByb290LmRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcblx0XHRcdFx0XHRjYi5jYWxsKHRoaXMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJvb3QuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGNiLmJpbmQodGhpcyksIGZhbHNlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3N0YXJ0Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzdGFydCgpIHtcblx0XHRcdFx0dmFyIF90aGlzMiA9IHRoaXM7XG5cblx0XHRcdFx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0XHRcdFx0XHRhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGFyZ3MubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG5cdFx0XHRcdFx0XHRfdGhpczIuc3RhcnQoYXJnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgaXRlbSA9IGFyZ3NbMF07XG5cdFx0XHRcdHZhciBvcHRpb25zID0ge307XG5cdFx0XHRcdHZhciBvcHRpb25zS2V5TmFtZXMgPSBbJ3NldHVwJywgJ2NvbmZpZycsICdvcHRpb25zJ107XG5cdFx0XHRcdHZhciBvcHRpb25zS2V5ID0gdm9pZCAwO1xuXHRcdFx0XHR2YXIgbW9kdWxlS2V5TmFtZXMgPSBbX3R5cGVzLk1PRFVMRV9UWVBFLCBfdHlwZXMuU0VSVklDRV9UWVBFLCBfdHlwZXMuQ09NUE9ORU5UX1RZUEVdO1xuXHRcdFx0XHR2YXIgbW9kdWxlS2V5ID0gdm9pZCAwO1xuXG5cdFx0XHRcdGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaXRlbSkgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcblx0XHRcdFx0XHR2YXIga2V5cyA9IE9iamVjdC5rZXlzKGl0ZW0pO1xuXHRcdFx0XHRcdG1vZHVsZUtleSA9IGtleXMuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB+bW9kdWxlS2V5TmFtZXMuaW5kZXhPZihrZXkpO1xuXHRcdFx0XHRcdH0pWzBdIHx8IGtleXNbMF07XG5cdFx0XHRcdFx0b3B0aW9uc0tleSA9IGtleXMuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB+b3B0aW9uc0tleU5hbWVzLmluZGV4T2Yoa2V5KTtcblx0XHRcdFx0XHR9KVswXSB8fCBrZXlzWzFdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gaWYgcGFzc2VkIGxpa2Uge21vZHVsZTogU29tZU1vZHVsZSwgb3B0aW9uczoge319XG5cdFx0XHRcdGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoaXRlbSkgPT09IE9iamVjdC5wcm90b3R5cGUgJiYgbW9kdWxlS2V5ICYmIGl0ZW1bbW9kdWxlS2V5XSkge1xuXG5cdFx0XHRcdFx0b3B0aW9ucyA9IGl0ZW1bb3B0aW9uc0tleV0gfHwge307XG5cdFx0XHRcdFx0aXRlbSA9IGl0ZW1bbW9kdWxlS2V5XTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzLnN0YXJ0TW9kdWxlcyhpdGVtLCBvcHRpb25zKTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdzdG9wJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzdG9wKCkge1xuXHRcdFx0XHR2YXIgX3RoaXMzID0gdGhpcztcblxuXHRcdFx0XHRmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuXHRcdFx0XHRcdGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhcmdzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRhcmdzLmZvckVhY2goZnVuY3Rpb24gKGFyZykge1xuXHRcdFx0XHRcdFx0X3RoaXMzLnN0b3AoYXJnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgaXRlbSA9IGFyZ3NbMF07XG5cblx0XHRcdFx0dGhpcy5maW5kTWF0Y2hpbmdSZWdpc3RyeUl0ZW1zKGl0ZW0pLmZvckVhY2goZnVuY3Rpb24gKHJlZ2lzdHJ5SXRlbSkge1xuXHRcdFx0XHRcdHZhciBtb2R1bGUgPSByZWdpc3RyeUl0ZW0ubW9kdWxlO1xuXG5cdFx0XHRcdFx0cmVnaXN0cnlJdGVtLmluc3RhbmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0KSB7XG5cblx0XHRcdFx0XHRcdGlmIChtb2R1bGUudHlwZSA9PT0gX3R5cGVzLkNPTVBPTkVOVF9UWVBFKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHVuZGVsZWdhdGUgZXZlbnRzIGlmIGNvbXBvbmVudFxuXHRcdFx0XHRcdFx0XHRpbnN0LnVuZGVsZWdhdGVFdmVudHMoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAobW9kdWxlLnR5cGUgPT09IF90eXBlcy5TRVJWSUNFX1RZUEUpIHtcblx0XHRcdFx0XHRcdFx0Ly8gZGlzY29ubmVjdCBpZiBzZXJ2aWNlXG5cdFx0XHRcdFx0XHRcdGluc3QuZGlzY29ubmVjdCgpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyB1bmRlbGVnYXRlIHZlbnRzIGZvciBhbGxcblx0XHRcdFx0XHRcdGluc3QudW5kZWxlZ2F0ZVZlbnRzKCk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHQvLyBydW5uaW5nIGZhbHNlXG5cdFx0XHRcdFx0cmVnaXN0cnlJdGVtLnJ1bm5pbmcgPSBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnc3RhcnRNb2R1bGVzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzdGFydE1vZHVsZXMoaXRlbSwgb3B0aW9ucykge1xuXG5cdFx0XHRcdG9wdGlvbnMuYXBwID0gb3B0aW9ucy5hcHAgfHwgdGhpcztcblxuXHRcdFx0XHRpZiAoaXRlbS50eXBlID09PSBfdHlwZXMuQ09NUE9ORU5UX1RZUEUpIHtcblx0XHRcdFx0XHR0aGlzLnN0YXJ0Q29tcG9uZW50KGl0ZW0sIG9wdGlvbnMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gX3R5cGVzLlNFUlZJQ0VfVFlQRSkge1xuXHRcdFx0XHRcdHRoaXMuc3RhcnRTZXJ2aWNlKGl0ZW0sIG9wdGlvbnMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gX3R5cGVzLk1PRFVMRV9UWVBFKSB7XG5cdFx0XHRcdFx0dGhpcy5zdGFydE1vZHVsZShpdGVtLCBvcHRpb25zKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIE1vZHVsZSBvZiB0eXBlIFxcblxcdFxcdFxcdFxcdCcgKyBfdHlwZXMuQ09NUE9ORU5UX1RZUEUgKyAnLCAnICsgX3R5cGVzLlNFUlZJQ0VfVFlQRSArICcgb3IgJyArIF90eXBlcy5NT0RVTEVfVFlQRSArICcsIFxcblxcdFxcdFxcdFxcdE1vZHVsZSBvZiB0eXBlICcgKyBpdGVtLnR5cGUgKyAnIGlzIG5vdCBhbGxvd2VkLicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIHJlZ2lzdHJ5SXRlbSA9IHRoaXMuX21vZHVsZXNbdGhpcy5fbW9kdWxlcy5sZW5ndGggLSAxXTtcblxuXHRcdFx0XHRyZWdpc3RyeUl0ZW0ucnVubmluZyA9IHRydWU7XG5cblx0XHRcdFx0cmV0dXJuIHJlZ2lzdHJ5SXRlbTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdzdGFydE1vZHVsZScsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gc3RhcnRNb2R1bGUoaXRlbSwgb3B0aW9ucykge1xuXG5cdFx0XHRcdHZhciBpdGVtSW5zdGFuY2UgPSBuZXcgaXRlbShvcHRpb25zKTtcblxuXHRcdFx0XHR0aGlzLmluaXRNb2R1bGUoaXRlbUluc3RhbmNlKTtcblx0XHRcdFx0dGhpcy5yZWdpc3RlcihpdGVtLCBpdGVtSW5zdGFuY2UsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3N0YXJ0Q29tcG9uZW50Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzdGFydENvbXBvbmVudChpdGVtLCBvcHRpb25zKSB7XG5cdFx0XHRcdHZhciBfdGhpczQgPSB0aGlzO1xuXG5cdFx0XHRcdG9wdGlvbnMuYXBwQ29tcG9uZW50ID0gdGhpcy5hcHBDb21wb25lbnQ7XG5cblx0XHRcdFx0Ly8gcmVnaXN0ZXIgaXRlbSB3aXRob3V0IGluc3RhbmNlc1xuXHRcdFx0XHQvLyBmb3IgbGF0ZXIgdXNlLCBpZiBubyBkb20gbm9kZXNcblx0XHRcdFx0Ly8gYXJlIHByZXNlbnQgeWV0XG5cdFx0XHRcdHRoaXMucmVnaXN0ZXIoaXRlbSwgbnVsbCwgb3B0aW9ucyk7XG5cblx0XHRcdFx0dGhpcy5hcHBDb21wb25lbnQuc3RhcnRDb21wb25lbnRzKGl0ZW0sIG9wdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW1JbnN0YW5jZSkge1xuXHRcdFx0XHRcdF90aGlzNC5pbml0Q29tcG9uZW50KGl0ZW1JbnN0YW5jZSk7XG5cdFx0XHRcdFx0X3RoaXM0LnJlZ2lzdGVyKGl0ZW0sIGl0ZW1JbnN0YW5jZSwgaXRlbUluc3RhbmNlLm9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdzdGFydFNlcnZpY2UnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHN0YXJ0U2VydmljZShpdGVtLCBvcHRpb25zKSB7XG5cblx0XHRcdFx0dmFyIGl0ZW1JbnN0YW5jZSA9IG5ldyBpdGVtKG9wdGlvbnMpO1xuXG5cdFx0XHRcdHRoaXMuaW5pdFNlcnZpY2UoaXRlbUluc3RhbmNlKTtcblx0XHRcdFx0dGhpcy5yZWdpc3RlcihpdGVtLCBpdGVtSW5zdGFuY2UsIG9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ2luaXRNb2R1bGUnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGluaXRNb2R1bGUobW9kdWxlKSB7XG5cblx0XHRcdFx0aWYgKG1vZHVsZS50eXBlICE9PSBfdHlwZXMuTU9EVUxFX1RZUEUpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIE1vZHVsZSBpbnN0YW5jZS4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG1vZHVsZS5kZWxlZ2F0ZVZlbnRzKCk7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnaW5pdFNlcnZpY2UnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGluaXRTZXJ2aWNlKG1vZHVsZSkge1xuXG5cdFx0XHRcdGlmIChtb2R1bGUudHlwZSAhPT0gX3R5cGVzLlNFUlZJQ0VfVFlQRSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgU2VydmljZSBpbnN0YW5jZS4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG1vZHVsZS5kZWxlZ2F0ZVZlbnRzKCk7XG5cdFx0XHRcdG1vZHVsZS5jb25uZWN0KCk7XG5cblx0XHRcdFx0aWYgKG1vZHVsZS5hdXRvc3RhcnQpIHtcblx0XHRcdFx0XHRtb2R1bGUuZmV0Y2goKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ2luaXRDb21wb25lbnQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGluaXRDb21wb25lbnQobW9kdWxlKSB7XG5cblx0XHRcdFx0aWYgKG1vZHVsZS50eXBlICE9PSBfdHlwZXMuQ09NUE9ORU5UX1RZUEUpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIENvbXBvbmVudCBpbnN0YW5jZS4nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG1vZHVsZS5tb3VudCgpO1xuXG5cdFx0XHRcdGlmIChtb2R1bGUuYXV0b3N0YXJ0KSB7XG5cdFx0XHRcdFx0bW9kdWxlLnJlbmRlcigpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAncmVnaXN0ZXInLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyKG1vZHVsZSwgaW5zdCkge1xuXHRcdFx0XHR2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzJdO1xuXG5cblx0XHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSBvciBtb2R1bGUgaWRlbnRpZmllciBleHBlY3RlZCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGV4aXN0aW5nUmVnaXN0cnlNb2R1bGVJdGVtID0gdGhpcy5maW5kTWF0Y2hpbmdSZWdpc3RyeUl0ZW1zKG1vZHVsZSlbMF07XG5cblx0XHRcdFx0aWYgKGV4aXN0aW5nUmVnaXN0cnlNb2R1bGVJdGVtKSB7XG5cblx0XHRcdFx0XHR2YXIgaW5kZXggPSB0aGlzLl9tb2R1bGVzLmluZGV4T2YoZXhpc3RpbmdSZWdpc3RyeU1vZHVsZUl0ZW0pO1xuXG5cdFx0XHRcdFx0Ly8gbWl4aW4gbmFtZWQgY29tcG9uZW50cyB1c2luZyBhcHBOYW1lXG5cdFx0XHRcdFx0aWYgKGV4aXN0aW5nUmVnaXN0cnlNb2R1bGVJdGVtLmFwcE5hbWUgJiYgIXRoaXNbb3B0aW9ucy5hcHBOYW1lXSAmJiBpbnN0KSB7XG5cdFx0XHRcdFx0XHR0aGlzW29wdGlvbnMuYXBwTmFtZV0gPSBpbnN0O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGV4aXN0aW5nUmVnaXN0cnlNb2R1bGVJdGVtLmF1dG9zdGFydCA9ICEhKGluc3QgPyBpbnN0LmF1dG9zdGFydCA6IGV4aXN0aW5nUmVnaXN0cnlNb2R1bGVJdGVtLmF1dG9zdGFydCk7XG5cblx0XHRcdFx0XHQvLyBwdXNoIGlmIGluc3RhbmNlIG5vdCBleGlzdHNcblx0XHRcdFx0XHRpZiAoaW5zdCAmJiB0aGlzLl9tb2R1bGVzW2luZGV4XS5pbnN0YW5jZXMuaW5kZXhPZihpbnN0KSA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdHRoaXMuX21vZHVsZXNbaW5kZXhdLmluc3RhbmNlcy5wdXNoKGluc3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChbX3R5cGVzLlNFUlZJQ0VfVFlQRSwgX3R5cGVzLkNPTVBPTkVOVF9UWVBFLCBfdHlwZXMuTU9EVUxFX1RZUEVdLmluZGV4T2YobW9kdWxlLnR5cGUpID4gLTEpIHtcblxuXHRcdFx0XHRcdHZhciByZWdpc3RyeU9iamVjdCA9IHtcblx0XHRcdFx0XHRcdHR5cGU6IG1vZHVsZS50eXBlLFxuXHRcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGUsXG5cdFx0XHRcdFx0XHRpbnN0YW5jZXM6IGluc3QgPyBbaW5zdF0gOiBbXSxcblx0XHRcdFx0XHRcdGF1dG9zdGFydDogISEoaW5zdCA/IGluc3QuYXV0b3N0YXJ0IDogbW9kdWxlLmF1dG9zdGFydCksXG5cdFx0XHRcdFx0XHRydW5uaW5nOiBmYWxzZSxcblx0XHRcdFx0XHRcdHVpZDogbW9kdWxlLnVpZFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRyZWdpc3RyeU9iamVjdC5hcHBOYW1lID0gb3B0aW9ucy5hcHBOYW1lO1xuXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMuYXBwTmFtZSAmJiAhdGhpc1tvcHRpb25zLmFwcE5hbWVdICYmIGluc3QpIHtcblx0XHRcdFx0XHRcdHRoaXNbb3B0aW9ucy5hcHBOYW1lXSA9IGluc3Q7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fbW9kdWxlcy5wdXNoKHJlZ2lzdHJ5T2JqZWN0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdFeHBlY3RlZCBNb2R1bGUgb2YgdHlwZSBcXG5cXHRcXHRcXHRcXHQnICsgX3R5cGVzLkNPTVBPTkVOVF9UWVBFICsgJywgJyArIF90eXBlcy5TRVJWSUNFX1RZUEUgKyAnIG9yICcgKyBfdHlwZXMuTU9EVUxFX1RZUEUgKyAnLCBcXG5cXHRcXHRcXHRcXHRNb2R1bGUgb2YgdHlwZSAnICsgbW9kdWxlLnR5cGUgKyAnIGNhbm5vdCBiZSByZWdpc3RlcmVkLicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnZGVzdHJveScsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcblx0XHRcdFx0dmFyIF90aGlzNSA9IHRoaXM7XG5cblx0XHRcdFx0Zm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcblx0XHRcdFx0XHRhcmdzW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYXJncy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0YXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcpIHtcblx0XHRcdFx0XHRcdF90aGlzNS5kZXN0cm95KGFyZyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGl0ZW0gPSBhcmdzWzBdO1xuXHRcdFx0XHR2YXIgaXNJbnN0YW5jZSA9ICEhKCh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoaXRlbSkpID09PSAnb2JqZWN0JyAmJiBpdGVtLnVpZCk7XG5cdFx0XHRcdHZhciByZWdpc3RyeUl0ZW1zID0gdGhpcy5maW5kTWF0Y2hpbmdSZWdpc3RyeUl0ZW1zKGl0ZW0pO1xuXG5cdFx0XHRcdHRoaXMuZmluZE1hdGNoaW5nUmVnaXN0cnlJdGVtcyhpdGVtKS5mb3JFYWNoKGZ1bmN0aW9uIChyZWdpc3RyeUl0ZW0pIHtcblxuXHRcdFx0XHRcdHZhciBtb2R1bGUgPSByZWdpc3RyeUl0ZW0ubW9kdWxlO1xuXHRcdFx0XHRcdHZhciBpdGVyYXRlT2JqID0gaXNJbnN0YW5jZSA/IFtpdGVtXSA6IHJlZ2lzdHJ5SXRlbS5pbnN0YW5jZXM7XG5cblx0XHRcdFx0XHRpdGVyYXRlT2JqLmZvckVhY2goZnVuY3Rpb24gKGluc3QpIHtcblxuXHRcdFx0XHRcdFx0dmFyIG1vZHVsZUluc3RhbmNlcyA9IF90aGlzNS5fbW9kdWxlc1tfdGhpczUuX21vZHVsZXMuaW5kZXhPZihyZWdpc3RyeUl0ZW0pXS5pbnN0YW5jZXM7XG5cblx0XHRcdFx0XHRcdGlmIChtb2R1bGVJbnN0YW5jZXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdFx0XHRfdGhpczUuX21vZHVsZXNbX3RoaXM1Ll9tb2R1bGVzLmluZGV4T2YocmVnaXN0cnlJdGVtKV0uaW5zdGFuY2VzLnNwbGljZShtb2R1bGVJbnN0YW5jZXMuaW5kZXhPZihpbnN0KSwgMSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRfdGhpczUuX21vZHVsZXNbX3RoaXM1Ll9tb2R1bGVzLmluZGV4T2YocmVnaXN0cnlJdGVtKV0uaW5zdGFuY2VzID0gW107XG5cblx0XHRcdFx0XHRcdFx0Ly8gZGVsZXRlIGV4cG9zZWQgaW5zdGFuY2VzXG5cdFx0XHRcdFx0XHRcdGlmIChyZWdpc3RyeUl0ZW0uYXBwTmFtZSAmJiBfdGhpczVbcmVnaXN0cnlJdGVtLmFwcE5hbWVdKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIF90aGlzNVtyZWdpc3RyeUl0ZW0uYXBwTmFtZV07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKG1vZHVsZS50eXBlID09PSBfdHlwZXMuQ09NUE9ORU5UX1RZUEUpIHtcblx0XHRcdFx0XHRcdFx0Ly8gdW5kZWxlZ2F0ZSBldmVudHMgaWYgY29tcG9uZW50XG5cdFx0XHRcdFx0XHRcdGluc3QudW5tb3VudCgpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmIChtb2R1bGUudHlwZSA9PT0gX3R5cGVzLlNFUlZJQ0VfVFlQRSkge1xuXHRcdFx0XHRcdFx0XHQvLyBkaXNjb25uZWN0IGlmIHNlcnZpY2Vcblx0XHRcdFx0XHRcdFx0aW5zdC51bmRlbGVnYXRlVmVudHMoKTtcblx0XHRcdFx0XHRcdFx0aW5zdC5kaXNjb25uZWN0KCk7XG5cdFx0XHRcdFx0XHRcdGluc3QuZGVzdHJveSgpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Ly8gdW5kZWxlZ2F0ZSB2ZW50cyBmb3IgYWxsXG5cdFx0XHRcdFx0XHRcdGluc3QudW5kZWxlZ2F0ZVZlbnRzKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmICghaXNJbnN0YW5jZSkge1xuXHRcdFx0XHRcdHRoaXMudW5yZWdpc3RlcihpdGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3VucmVnaXN0ZXInLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIHVucmVnaXN0ZXIoaXRlbSkge1xuXG5cdFx0XHRcdHZhciBtYXRjaGluZ1JlZ2lzdGVyZWRJdGVtcyA9IHRoaXMuZmluZE1hdGNoaW5nUmVnaXN0cnlJdGVtcyhpdGVtKTtcblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gbWF0Y2hpbmdSZWdpc3RlcmVkSXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblxuXHRcdFx0XHRcdHZhciBtb2QgPSBtYXRjaGluZ1JlZ2lzdGVyZWRJdGVtc1tpXTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl9tb2R1bGVzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRcdHRoaXMuX21vZHVsZXMuc3BsaWNlKHRoaXMuX21vZHVsZXMuaW5kZXhPZihtb2QpLCAxKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHR0aGlzLl9tb2R1bGVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fV0pO1xuXG5cdFx0cmV0dXJuIEFwcGxpY2F0aW9uRmFjYWRlO1xuXHR9KF9tb2R1bGUyLmRlZmF1bHQpO1xuXG5cdGV4cG9ydHMuZGVmYXVsdCA9IEFwcGxpY2F0aW9uRmFjYWRlO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHBsaWNhdGlvbi1mYWNhZGUuanMubWFwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cycsICcuLi9oZWxwZXJzL3N0cmluZy9kYXNoZXJpemUnLCAnLi4vaGVscGVycy9zdHJpbmcvZXh0cmFjdC1vYmplY3QtbmFtZScsICcuLi9oZWxwZXJzL3N0cmluZy9uYW1lZC11aWQnLCAnLi4vaGVscGVycy9lbnZpcm9ubWVudC9nZXQtZ2xvYmFsLW9iamVjdCcsICcuLi9kZWZhdWx0LWNvbmZpZycsICdwbGl0ZSddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnLi4vaGVscGVycy9zdHJpbmcvZGFzaGVyaXplJyksIHJlcXVpcmUoJy4uL2hlbHBlcnMvc3RyaW5nL2V4dHJhY3Qtb2JqZWN0LW5hbWUnKSwgcmVxdWlyZSgnLi4vaGVscGVycy9zdHJpbmcvbmFtZWQtdWlkJyksIHJlcXVpcmUoJy4uL2hlbHBlcnMvZW52aXJvbm1lbnQvZ2V0LWdsb2JhbC1vYmplY3QnKSwgcmVxdWlyZSgnLi4vZGVmYXVsdC1jb25maWcnKSwgcmVxdWlyZSgncGxpdGUnKSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBnbG9iYWwuZGFzaGVyaXplLCBnbG9iYWwuZXh0cmFjdE9iamVjdE5hbWUsIGdsb2JhbC5uYW1lZFVpZCwgZ2xvYmFsLmdldEdsb2JhbE9iamVjdCwgZ2xvYmFsLmRlZmF1bHRDb25maWcsIGdsb2JhbC5wbGl0ZSk7XG5cdFx0Z2xvYmFsLmJhc2UgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIF9kYXNoZXJpemUsIF9leHRyYWN0T2JqZWN0TmFtZSwgX25hbWVkVWlkLCBfZ2V0R2xvYmFsT2JqZWN0LCBfZGVmYXVsdENvbmZpZywgX3BsaXRlKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHR2YXIgX2Rhc2hlcml6ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kYXNoZXJpemUpO1xuXG5cdHZhciBfZXh0cmFjdE9iamVjdE5hbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXh0cmFjdE9iamVjdE5hbWUpO1xuXG5cdHZhciBfbmFtZWRVaWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbmFtZWRVaWQpO1xuXG5cdHZhciBfZ2V0R2xvYmFsT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEdsb2JhbE9iamVjdCk7XG5cblx0dmFyIF9kZWZhdWx0Q29uZmlnMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRDb25maWcpO1xuXG5cdHZhciBfcGxpdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGxpdGUpO1xuXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG5cdFx0cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcblx0XHRcdGRlZmF1bHQ6IG9ialxuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG5cdFx0aWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG5cdFx0fVxuXHR9XG5cblx0dmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuXHRcdFx0XHRkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdFx0XHRcdGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuXHRcdFx0aWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcblx0XHRcdGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuXHRcdFx0cmV0dXJuIENvbnN0cnVjdG9yO1xuXHRcdH07XG5cdH0oKTtcblxuXHR2YXIgcm9vdCA9ICgwLCBfZ2V0R2xvYmFsT2JqZWN0Mi5kZWZhdWx0KSgpO1xuXG5cdC8vIHNoaW0gcHJvbWlzZXNcblx0IXJvb3QuUHJvbWlzZSAmJiAocm9vdC5Qcm9taXNlID0gX3BsaXRlMi5kZWZhdWx0KTtcblxuXHRmdW5jdGlvbiBnZW5lcmF0ZU5hbWUob2JqKSB7XG5cblx0XHRpZiAob2JqLl9uYW1lKSB7XG5cdFx0XHRyZXR1cm4gb2JqLl9uYW1lO1xuXHRcdH1cblxuXHRcdHJldHVybiAoMCwgX2V4dHJhY3RPYmplY3ROYW1lMi5kZWZhdWx0KShvYmopO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2VuZXJhdGVEYXNoZWROYW1lKG9iaikge1xuXG5cdFx0aWYgKG9iai5fZGFzaGVkTmFtZSkge1xuXHRcdFx0cmV0dXJuIG9iai5fZGFzaGVkTmFtZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKDAsIF9kYXNoZXJpemUyLmRlZmF1bHQpKGdlbmVyYXRlTmFtZShvYmopKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdlbmVyYXRlVWlkKG9iaikge1xuXHRcdGlmIChvYmouX3VpZCkge1xuXHRcdFx0cmV0dXJuIG9iai5fdWlkO1xuXHRcdH1cblxuXHRcdHJldHVybiAoMCwgX25hbWVkVWlkMi5kZWZhdWx0KShnZW5lcmF0ZU5hbWUob2JqKSk7XG5cdH1cblxuXHR2YXIgQmFzZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRfY3JlYXRlQ2xhc3MoQmFzZSwgW3tcblx0XHRcdGtleTogJ3ZlbnRzJyxcblx0XHRcdHNldDogZnVuY3Rpb24gc2V0KHZlbnRzKSB7XG5cdFx0XHRcdHRoaXMuX3ZlbnRzID0gdmVudHM7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl92ZW50cztcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdhdXRvc3RhcnQnLFxuXHRcdFx0c2V0OiBmdW5jdGlvbiBzZXQoYm9vbCkge1xuXHRcdFx0XHR0aGlzLl9hdXRvc3RhcnQgPSBib29sO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fYXV0b3N0YXJ0O1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ25hbWUnLFxuXHRcdFx0c2V0OiBmdW5jdGlvbiBzZXQobmFtZSkge1xuXHRcdFx0XHR0aGlzLl9uYW1lID0gbmFtZTtcblx0XHRcdH0sXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX25hbWU7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnZGFzaGVkTmFtZScsXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHNldChkYXNoZWROYW1lKSB7XG5cdFx0XHRcdHRoaXMuX2Rhc2hlZE5hbWUgPSBkYXNoZWROYW1lO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZGFzaGVkTmFtZTtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICd1aWQnLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl91aWQ7XG5cdFx0XHR9LFxuXHRcdFx0c2V0OiBmdW5jdGlvbiBzZXQodWlkKSB7XG5cdFx0XHRcdHRoaXMuX3VpZCA9IHVpZDtcblx0XHRcdH1cblx0XHR9XSk7XG5cblx0XHRmdW5jdGlvbiBCYXNlKCkge1xuXHRcdFx0dmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXHRcdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJhc2UpO1xuXG5cdFx0XHR0aGlzLm5hbWUgPSBnZW5lcmF0ZU5hbWUodGhpcyk7XG5cdFx0XHR0aGlzLmRhc2hlZE5hbWUgPSBnZW5lcmF0ZURhc2hlZE5hbWUodGhpcyk7XG5cdFx0XHR0aGlzLnVpZCA9IGdlbmVyYXRlVWlkKHRoaXMpO1xuXG5cdFx0XHR0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG5cdFx0XHRpZiAob3B0aW9ucy5hcHApIHtcblx0XHRcdFx0dGhpcy5hcHAgPSBvcHRpb25zLmFwcDtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy52ZW50cyA9IG9wdGlvbnMudmVudHMgfHwge307XG5cblx0XHRcdHRoaXMuYXV0b3N0YXJ0ID0gISFvcHRpb25zLmF1dG9zdGFydDtcblxuXHRcdFx0aWYgKG9wdGlvbnMudmVudCkge1xuXHRcdFx0XHQvLyBjb3VsZCBiZSB1c2VkIHN0YW5kYWxvbmVcblx0XHRcdFx0dGhpcy52ZW50ID0gb3B0aW9ucy52ZW50KHRoaXMpO1xuXHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLmFwcCAmJiBvcHRpb25zLmFwcC52ZW50KSB7XG5cdFx0XHRcdC8vIG9yIHdpdGhpbiBhbiBhcHBsaWNhdGlvbiBmYWNhZGVcblx0XHRcdFx0dGhpcy52ZW50ID0gb3B0aW9ucy5hcHAudmVudChvcHRpb25zLmFwcCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnZlbnQgPSBfZGVmYXVsdENvbmZpZzIuZGVmYXVsdC52ZW50KHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdF9jcmVhdGVDbGFzcyhCYXNlLCBbe1xuXHRcdFx0a2V5OiAnYmVmb3JlSW5pdGlhbGl6ZScsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gYmVmb3JlSW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cdFx0XHRcdC8vIG92ZXJyaWRlIGFuZCBjYWxsIHN1cGVyLmJlZm9yZUluaXRpYWxpemUob3B0aW9ucyl9XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnYWZ0ZXJJbml0aWFsaXplJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBhZnRlckluaXRpYWxpemUob3B0aW9ucykge1xuXHRcdFx0XHQvLyBvdmVycmlkZSBhbmQgY2FsbCBzdXBlci5hZnRlckluaXRpYWxpemUob3B0aW9ucyl9XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnaW5pdGlhbGl6ZScsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShvcHRpb25zKSB7XG5cdFx0XHRcdC8vIG92ZXJyaWRlXG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnYmluZEN1c3RvbUV2ZW50cycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gYmluZEN1c3RvbUV2ZW50cygpIHtcblx0XHRcdFx0Ly8gb3ZlcnJpZGVcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdkZWxlZ2F0ZVZlbnRzJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkZWxlZ2F0ZVZlbnRzKCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy52ZW50KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgdmVudCBpbiB0aGlzLnZlbnRzKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMudmVudHMuaGFzT3duUHJvcGVydHkodmVudCkpIHtcblx0XHRcdFx0XHRcdHZhciBjYWxsYmFjayA9IHRoaXMudmVudHNbdmVudF07XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHRoaXNbY2FsbGJhY2tdID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrID0gdGhpc1tjYWxsYmFja107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGNhbGxiYWNrIG1ldGhvZCcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLnZlbnQub24odmVudCwgY2FsbGJhY2ssIHRoaXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3VuZGVsZWdhdGVWZW50cycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gdW5kZWxlZ2F0ZVZlbnRzKCkge1xuXG5cdFx0XHRcdGlmICghdGhpcy52ZW50KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgdmVudCBpbiB0aGlzLnZlbnRzKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMudmVudHMuaGFzT3duUHJvcGVydHkodmVudCkpIHtcblx0XHRcdFx0XHRcdHZhciBjYWxsYmFjayA9IHRoaXMudmVudHNbdmVudF07XG5cblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHRoaXNbY2FsbGJhY2tdID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrID0gdGhpc1tjYWxsYmFja107XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGNhbGxiYWNrIG1ldGhvZCcpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLnZlbnQub2ZmKHZlbnQsIGNhbGxiYWNrLCB0aGlzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gdGhpcztcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICd0b1N0cmluZycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnVpZDtcblx0XHRcdH1cblx0XHR9XSk7XG5cblx0XHRyZXR1cm4gQmFzZTtcblx0fSgpO1xuXG5cdGV4cG9ydHMuZGVmYXVsdCA9IEJhc2U7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWJhc2UuanMubWFwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cycsICcuL2Jhc2UnLCAnLi4vaGVscGVycy9vYmplY3QvYXNzaWduJywgJy4uL2hlbHBlcnMvYXJyYXkvZnJvbScsICcuLi9oZWxwZXJzL3N0cmluZy9kYXNoZXJpemUnLCAnLi4vZGVmYXVsdC1jb25maWcnLCAnLi90eXBlcyddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnLi9iYXNlJyksIHJlcXVpcmUoJy4uL2hlbHBlcnMvb2JqZWN0L2Fzc2lnbicpLCByZXF1aXJlKCcuLi9oZWxwZXJzL2FycmF5L2Zyb20nKSwgcmVxdWlyZSgnLi4vaGVscGVycy9zdHJpbmcvZGFzaGVyaXplJyksIHJlcXVpcmUoJy4uL2RlZmF1bHQtY29uZmlnJyksIHJlcXVpcmUoJy4vdHlwZXMnKSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBnbG9iYWwuYmFzZSwgZ2xvYmFsLmFzc2lnbiwgZ2xvYmFsLmZyb20sIGdsb2JhbC5kYXNoZXJpemUsIGdsb2JhbC5kZWZhdWx0Q29uZmlnLCBnbG9iYWwudHlwZXMpO1xuXHRcdGdsb2JhbC5jb21wb25lbnQgPSBtb2QuZXhwb3J0cztcblx0fVxufSkodGhpcywgZnVuY3Rpb24gKGV4cG9ydHMsIF9iYXNlLCBfYXNzaWduLCBfZnJvbSwgX2Rhc2hlcml6ZSwgX2RlZmF1bHRDb25maWcsIF90eXBlcykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdFx0dmFsdWU6IHRydWVcblx0fSk7XG5cblx0dmFyIF9iYXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Jhc2UpO1xuXG5cdHZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cblx0dmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5cdHZhciBfZGFzaGVyaXplMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Rhc2hlcml6ZSk7XG5cblx0dmFyIF9kZWZhdWx0Q29uZmlnMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRDb25maWcpO1xuXG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG5cdFx0cmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcblx0XHRcdGRlZmF1bHQ6IG9ialxuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG5cdFx0aWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuXHRcdGlmICghc2VsZikge1xuXHRcdFx0dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xuXHR9XG5cblx0dmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcblx0XHRcdFx0ZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuXHRcdFx0XHRkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG5cdFx0XHRcdGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuXHRcdFx0aWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcblx0XHRcdGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuXHRcdFx0cmV0dXJuIENvbnN0cnVjdG9yO1xuXHRcdH07XG5cdH0oKTtcblxuXHRmdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcblx0XHRpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcblx0XHR9XG5cblx0XHRzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcblx0XHRcdGNvbnN0cnVjdG9yOiB7XG5cdFx0XHRcdHZhbHVlOiBzdWJDbGFzcyxcblx0XHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHRcdHdyaXRhYmxlOiB0cnVlLFxuXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWVcblx0XHRcdH1cblx0XHR9KTtcblx0XHRpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG5cdH1cblxuXHR2YXIgREVMRUdBVEVfRVZFTlRfU1BMSVRURVIgPSAvXihcXFMrKVxccyooLiopJC87XG5cblx0dmFyIF9tYXRjaGVzU2VsZWN0b3IgPSBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8IEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUub01hdGNoZXNTZWxlY3RvcjtcblxuXHR2YXIgQ29tcG9uZW50ID0gZnVuY3Rpb24gKF9CYXNlKSB7XG5cdFx0X2luaGVyaXRzKENvbXBvbmVudCwgX0Jhc2UpO1xuXG5cdFx0X2NyZWF0ZUNsYXNzKENvbXBvbmVudCwgW3tcblx0XHRcdGtleTogJ3R5cGUnLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBfdHlwZXMuQ09NUE9ORU5UX1RZUEU7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnZXZlbnRzJyxcblx0XHRcdHNldDogZnVuY3Rpb24gc2V0KGV2ZW50cykge1xuXHRcdFx0XHR0aGlzLl9ldmVudHMgPSBldmVudHM7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9ldmVudHM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnZWwnLFxuXHRcdFx0c2V0OiBmdW5jdGlvbiBzZXQoZWwpIHtcblx0XHRcdFx0dGhpcy5fZWwgPSBlbDtcblx0XHRcdH0sXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2VsO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3ZpZXdNb2RlbCcsXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHNldChtb2RlbCkge1xuXHRcdFx0XHR0aGlzLl92aWV3TW9kZWwgPSBtb2RlbDtcblx0XHRcdH0sXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3ZpZXdNb2RlbDtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdtb2RlbCcsXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHNldChtb2RlbCkge1xuXHRcdFx0XHR0aGlzLl9tb2RlbCA9IG1vZGVsO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fbW9kZWw7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnc2VydmljZScsXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uIHNldChzZXJ2aWNlKSB7XG5cdFx0XHRcdHRoaXMuX3NlcnZpY2UgPSBzZXJ2aWNlO1xuXHRcdFx0fSxcblx0XHRcdGdldDogZnVuY3Rpb24gZ2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fc2VydmljZTtcblx0XHRcdH1cblx0XHR9XSwgW3tcblx0XHRcdGtleTogJ3R5cGUnLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBfdHlwZXMuQ09NUE9ORU5UX1RZUEU7XG5cdFx0XHR9XG5cdFx0fV0pO1xuXG5cdFx0ZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuXHRcdFx0dmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXHRcdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvbXBvbmVudCk7XG5cblx0XHRcdG9wdGlvbnMuY29udGV4dCA9IG9wdGlvbnMuY29udGV4dCB8fCBkb2N1bWVudDtcblxuXHRcdFx0dmFyIF90aGlzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgT2JqZWN0LmdldFByb3RvdHlwZU9mKENvbXBvbmVudCkuY2FsbCh0aGlzLCBvcHRpb25zKSk7XG5cblx0XHRcdF90aGlzLm1vZHVsZVNlbGVjdG9yID0gb3B0aW9ucy5tb2R1bGVTZWxlY3RvciB8fCAnW2RhdGEtanMtY29tcG9uZW50Kj1cIicgKyBfdGhpcy5kYXNoZWROYW1lICsgJ1wiXSc7XG5cblx0XHRcdGlmIChfdGhpcy5tb2R1bGVTZWxlY3Rvci5pbmRleE9mKCdbZGF0YS0nKSA9PT0gMCkge1xuXHRcdFx0XHRfdGhpcy5tb2R1bGVBdHRyaWJ1dGUgPSBfdGhpcy5tb2R1bGVTZWxlY3Rvci5yZXBsYWNlKC9eKFxcWykoW2EtekEtWi1fXSspKC4qXSkkLywgJyQyJyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5jb250ZXh0ID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRvcHRpb25zLmNvbnRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuY29udGV4dCk7XG5cdFx0XHR9XG5cblx0XHRcdF90aGlzLmVuc3VyZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0XHQvLyBwYXJzZSBvcHRpb25zIGZyb20gbWFya3VwIGFuZCBtZXJnZSB3aXRoIGV4aXN0aW5nXG5cdFx0XHRPYmplY3QuYXNzaWduKF90aGlzLm9wdGlvbnMsIF90aGlzLnBhcnNlT3B0aW9ucyhfdGhpcy5lbCwgX3RoaXMuY29uc3RydWN0b3IpLCBvcHRpb25zKTtcblxuXHRcdFx0aWYgKG9wdGlvbnMuc2VydmljZSkge1xuXHRcdFx0XHRfdGhpcy5zZXJ2aWNlID0gb3B0aW9ucy5zZXJ2aWNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3B0aW9ucy52aWV3TW9kZWwpIHtcblx0XHRcdFx0X3RoaXMudmlld01vZGVsID0gb3B0aW9ucy52aWV3TW9kZWw7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcHRpb25zLm1vZGVsKSB7XG5cdFx0XHRcdF90aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9wdGlvbnMuYXBwQ29tcG9uZW50KSB7XG5cdFx0XHRcdF90aGlzLmFwcENvbXBvbmVudCA9IG9wdGlvbnMuYXBwQ29tcG9uZW50O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIW9wdGlvbnMuYXBwKSB7XG5cdFx0XHRcdF90aGlzLm1vdW50KCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gX3RoaXM7XG5cdFx0fVxuXG5cdFx0X2NyZWF0ZUNsYXNzKENvbXBvbmVudCwgW3tcblx0XHRcdGtleTogJ21hdGNoZXNTZWxlY3RvcicsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yKGVsLCBzZWxlY3Rvcikge1xuXG5cdFx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0c2VsZWN0b3IgPSBlbDtcblx0XHRcdFx0XHRlbCA9IHRoaXMuZWw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gX21hdGNoZXNTZWxlY3Rvci5jYWxsKGVsLCBzZWxlY3Rvcik7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnd2lsbE1vdW50Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiB3aWxsTW91bnQoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnbW91bnQnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIG1vdW50KCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLndpbGxNb3VudCgpICE9PSBmYWxzZSkge1xuXG5cdFx0XHRcdFx0dGhpcy5ldmVudHMgPSB0aGlzLmV2ZW50cyB8fCB7fTtcblxuXHRcdFx0XHRcdHRoaXMuZG9tID0gdGhpcy5vcHRpb25zLmRvbSB8fCB0aGlzLmFwcCAmJiB0aGlzLmFwcC5kb20gfHwgX2RlZmF1bHRDb25maWcyLmRlZmF1bHQuZG9tO1xuXG5cdFx0XHRcdFx0dGhpcy50ZW1wbGF0ZSA9IHRoaXMub3B0aW9ucy50ZW1wbGF0ZSB8fCB0aGlzLmFwcCAmJiB0aGlzLmFwcC50ZW1wbGF0ZSB8fCBfZGVmYXVsdENvbmZpZzIuZGVmYXVsdC50ZW1wbGF0ZTtcblxuXHRcdFx0XHRcdHRoaXMuX2RvbUV2ZW50cyA9IFtdO1xuXG5cdFx0XHRcdFx0Ly8gY2FsbCBpZiBleHRlbnNpb24gaXRlbVNlbGVjdG9yVG9NZW1iZXJzIGlzIG1peGVkIGluXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiB0aGlzLml0ZW1TZWxlY3RvclRvTWVtYmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdFx0dGhpcy5pdGVtU2VsZWN0b3JUb01lbWJlcnMoKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0aGlzLmJlZm9yZUluaXRpYWxpemUodGhpcy5vcHRpb25zKTtcblx0XHRcdFx0XHR0aGlzLmluaXRpYWxpemUodGhpcy5vcHRpb25zKTtcblx0XHRcdFx0XHR0aGlzLmFmdGVySW5pdGlhbGl6ZSh0aGlzLm9wdGlvbnMpO1xuXHRcdFx0XHRcdHRoaXMuYmluZEN1c3RvbUV2ZW50cygpO1xuXHRcdFx0XHRcdHRoaXMuYmluZEV2ZW50cygpO1xuXHRcdFx0XHRcdHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcblx0XHRcdFx0XHR0aGlzLmRlbGVnYXRlVmVudHMoKTtcblx0XHRcdFx0XHR0aGlzLmRpZE1vdW50KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdkaWRNb3VudCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZGlkTW91bnQoKSB7fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3dpbGxVbm1vdW50Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiB3aWxsVW5tb3VudCgpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAndW5tb3VudCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gdW5tb3VudCgpIHtcblxuXHRcdFx0XHRpZiAodGhpcy53aWxsVW5tb3VudCgpICE9PSBmYWxzZSkge1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuYXBwICYmIHRoaXMuYXBwLmZpbmRNYXRjaGluZ1JlZ2lzdHJ5SXRlbXMoKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmFwcC5kZXN0cm95KHRoaXMpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuZGlkVW5tb3VudCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnZGlkVW5tb3VudCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZGlkVW5tb3VudCgpIHt9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnY3JlYXRlRG9tTm9kZScsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gY3JlYXRlRG9tTm9kZShzdHIpIHtcblxuXHRcdFx0XHR2YXIgc2VsZWN0ZWRFbCA9IHRoaXMub3B0aW9ucy5jb250ZXh0LnF1ZXJ5U2VsZWN0b3Ioc3RyKTtcblxuXHRcdFx0XHRpZiAoc2VsZWN0ZWRFbCkge1xuXHRcdFx0XHRcdHJldHVybiBzZWxlY3RlZEVsO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHR2YXIgZWxOb2RlID0gdm9pZCAwO1xuXG5cdFx0XHRcdGRpdi5pbm5lckhUTUwgPSBzdHI7XG5cblx0XHRcdFx0QXJyYXkuZnJvbShkaXYuY2hpbGROb2RlcykuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0XHRcdGlmICghZWxOb2RlICYmIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG5cdFx0XHRcdFx0XHRlbE5vZGUgPSBub2RlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIGVsTm9kZSB8fCBkaXY7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnZW5zdXJlRWxlbWVudCcsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gZW5zdXJlRWxlbWVudCgpIHtcblx0XHRcdFx0dmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXG5cdFx0XHRcdGlmIChvcHRpb25zLmVsICYmIG9wdGlvbnMuZWwubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG5cdFx0XHRcdFx0dGhpcy5lbCA9IG9wdGlvbnMuZWw7XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuZWwgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0dGhpcy5lbCA9IHRoaXMuY3JlYXRlRG9tTm9kZShvcHRpb25zLmVsKTtcblx0XHRcdFx0fSBlbHNlIGlmIChvcHRpb25zLmNvbnRleHQgJiYgb3B0aW9ucy5jb250ZXh0Lm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiB0aGlzLm1vZHVsZVNlbGVjdG9yKSB7XG5cdFx0XHRcdFx0dGhpcy5lbCA9IG9wdGlvbnMuY29udGV4dC5xdWVyeVNlbGVjdG9yKHRoaXMubW9kdWxlU2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVsKSB7XG5cdFx0XHRcdFx0dGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVsLmRhdGFzZXQuanNDb21wb25lbnQpIHtcblx0XHRcdFx0XHR0aGlzLmVsLmRhdGFzZXQuanNDb21wb25lbnQgPSB0aGlzLmRhc2hlZE5hbWU7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5lbC5kYXRhc2V0LmpzQ29tcG9uZW50LmluZGV4T2YodGhpcy5kYXNoZWROYW1lKSA9PT0gLTEpIHtcblx0XHRcdFx0XHR0aGlzLmVsLmRhdGFzZXQuanNDb21wb25lbnQgPSB0aGlzLmVsLmRhdGFzZXQuanNDb21wb25lbnQubGVuZ3RoID4gMCA/IHRoaXMuZWwuZGF0YXNldC5qc0NvbXBvbmVudCArICcgJyArIHRoaXMuZGFzaGVkTmFtZSA6ICcnICsgdGhpcy5kYXNoZWROYW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCF0aGlzLmVsLmNvbXBvbmVudFVpZCkge1xuXHRcdFx0XHRcdHRoaXMuZWwuY29tcG9uZW50VWlkID0gW3RoaXMudWlkXTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmVsLmNvbXBvbmVudFVpZC5pbmRleE9mKHRoaXMudWlkKSA9PT0gLTEpIHtcblx0XHRcdFx0XHR0aGlzLmVsLmNvbXBvbmVudFVpZC5wdXNoKHRoaXMudWlkKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLmRvbSkge1xuXHRcdFx0XHRcdHRoaXMuJGVsID0gdGhpcy5kb20odGhpcy5lbCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy4kKSB7XG5cdFx0XHRcdFx0dGhpcy4kZWwgPSB0aGlzLiQodGhpcy5lbCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICdzZXRFbGVtZW50Jyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBzZXRFbGVtZW50KGVsKSB7XG5cblx0XHRcdFx0dGhpcy51bmRlbGVnYXRlRXZlbnRzKCk7XG5cdFx0XHRcdHRoaXMuZW5zdXJlRWxlbWVudCh7IGVsOiBlbCB9KTtcblx0XHRcdFx0dGhpcy5kZWxlZ2F0ZUV2ZW50cygpO1xuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ2JpbmRFdmVudHMnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGJpbmRFdmVudHMoKSB7fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ3BhcnNlT3B0aW9ucycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gcGFyc2VPcHRpb25zKGVsLCBpdGVtKSB7XG5cdFx0XHRcdHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdFx0XHRcdHZhciBvcHRpb25zID0gZWwgJiYgZWwuZGF0YXNldC5qc09wdGlvbnM7XG5cblx0XHRcdFx0aWYgKCFvcHRpb25zKSB7XG5cblx0XHRcdFx0XHR2YXIganNvblNjcmlwdEJsb2NrID0gQXJyYXkuZnJvbShlbC5jaGlsZE5vZGVzKS5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIF90aGlzMi5tYXRjaGVzU2VsZWN0b3IoY2hpbGQsICdzY3JpcHRbZGF0YS1qcy1vcHRpb25zXScpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0aWYgKGpzb25TY3JpcHRCbG9jay5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdG9wdGlvbnMgPSBqc29uU2NyaXB0QmxvY2tbMF0uaW5uZXJUZXh0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuXG5cdFx0XHRcdFx0dmFyIG5hbWUgPSBpdGVtLm5hbWUgfHwgaXRlbS5lczVuYW1lO1xuXG5cdFx0XHRcdFx0Ly8gaWYgPGRpdiBkYXRhLWpzLW9wdGlvbnM9XCJ7J3Nob3cnOiB0cnVlfVwiPiBpcyB1c2VkLFxuXHRcdFx0XHRcdC8vIGluc3RlYWQgb2YgPGRpdiBkYXRhLWpzLW9wdGlvbnM9J3tcInNob3dcIjogdHJ1ZX0nPlxuXHRcdFx0XHRcdC8vIGNvbnZlcnQgdG8gdmFsaWQganNvbiBzdHJpbmcgYW5kIHBhcnNlIHRvIEpTT05cblx0XHRcdFx0XHRvcHRpb25zID0gb3B0aW9ucy5yZXBsYWNlKC9cXFxcJy9nLCAnXFwnJykucmVwbGFjZSgvJy9nLCAnXCInKTtcblxuXHRcdFx0XHRcdG9wdGlvbnMgPSBKU09OLnBhcnNlKG9wdGlvbnMpO1xuXHRcdFx0XHRcdG9wdGlvbnMgPSBvcHRpb25zWygwLCBfZGFzaGVyaXplMi5kZWZhdWx0KShuYW1lKV0gfHwgb3B0aW9uc1tuYW1lXSB8fCBvcHRpb25zO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIG9wdGlvbnMgfHwge307XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAnZGVsZWdhdGVFdmVudHMnLFxuXHRcdFx0dmFsdWU6IGZ1bmN0aW9uIGRlbGVnYXRlRXZlbnRzKGV2ZW50cykge1xuXG5cdFx0XHRcdGlmICghKGV2ZW50cyB8fCAoZXZlbnRzID0gdGhpcy5ldmVudHMpKSkgcmV0dXJuIHRoaXM7XG5cdFx0XHRcdHRoaXMudW5kZWxlZ2F0ZUV2ZW50cygpO1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gZXZlbnRzKSB7XG5cdFx0XHRcdFx0dmFyIG1ldGhvZCA9IGV2ZW50c1trZXldO1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgbWV0aG9kICE9PSAnZnVuY3Rpb24nKSBtZXRob2QgPSB0aGlzW2V2ZW50c1trZXldXTtcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhrZXksIGV2ZW50cywgbWV0aG9kKTtcblx0XHRcdFx0XHQvLyBpZiAoIW1ldGhvZCkgY29udGludWU7XG5cdFx0XHRcdFx0dmFyIG1hdGNoID0ga2V5Lm1hdGNoKERFTEVHQVRFX0VWRU5UX1NQTElUVEVSKTtcblx0XHRcdFx0XHR0aGlzLmRlbGVnYXRlKG1hdGNoWzFdLCBtYXRjaFsyXSwgbWV0aG9kLmJpbmQodGhpcykpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdGtleTogJ2RlbGVnYXRlJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiBkZWxlZ2F0ZShldmVudE5hbWUsIHNlbGVjdG9yLCBsaXN0ZW5lcikge1xuXG5cdFx0XHRcdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRsaXN0ZW5lciA9IHNlbGVjdG9yO1xuXHRcdFx0XHRcdHNlbGVjdG9yID0gbnVsbDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciByb290ID0gdGhpcy5lbDtcblx0XHRcdFx0dmFyIGhhbmRsZXIgPSBzZWxlY3RvciA/IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0dmFyIG5vZGUgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG5cblx0XHRcdFx0XHRmb3IgKDsgbm9kZSAmJiBub2RlICE9IHJvb3Q7IG5vZGUgPSBub2RlLnBhcmVudE5vZGUpIHtcblx0XHRcdFx0XHRcdGlmIChfbWF0Y2hlc1NlbGVjdG9yLmNhbGwobm9kZSwgc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0XHRcdGUuZGVsZWdhdGVUYXJnZXQgPSBub2RlO1xuXHRcdFx0XHRcdFx0XHRsaXN0ZW5lcihlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gOiBsaXN0ZW5lcjtcblxuXHRcdFx0XHRFbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyLmNhbGwodGhpcy5lbCwgZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0XHRcdHRoaXMuX2RvbUV2ZW50cy5wdXNoKHsgZXZlbnROYW1lOiBldmVudE5hbWUsIGhhbmRsZXI6IGhhbmRsZXIsIGxpc3RlbmVyOiBsaXN0ZW5lciwgc2VsZWN0b3I6IHNlbGVjdG9yIH0pO1xuXHRcdFx0XHRyZXR1cm4gaGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LCB7XG5cdFx0XHRrZXk6ICd1bmRlbGVnYXRlJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1bmRlbGVnYXRlKGV2ZW50TmFtZSwgc2VsZWN0b3IsIGxpc3RlbmVyKSB7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGxpc3RlbmVyID0gc2VsZWN0b3I7XG5cdFx0XHRcdFx0c2VsZWN0b3IgPSBudWxsO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuZWwpIHtcblx0XHRcdFx0XHR2YXIgaGFuZGxlcnMgPSB0aGlzLl9kb21FdmVudHMuc2xpY2UoKTtcblx0XHRcdFx0XHR2YXIgaSA9IGhhbmRsZXJzLmxlbmd0aDtcblxuXHRcdFx0XHRcdHdoaWxlIChpLS0pIHtcblx0XHRcdFx0XHRcdHZhciBpdGVtID0gaGFuZGxlcnNbaV07XG5cblx0XHRcdFx0XHRcdHZhciBtYXRjaCA9IGl0ZW0uZXZlbnROYW1lID09PSBldmVudE5hbWUgJiYgKGxpc3RlbmVyID8gaXRlbS5saXN0ZW5lciA9PT0gbGlzdGVuZXIgOiB0cnVlKSAmJiAoc2VsZWN0b3IgPyBpdGVtLnNlbGVjdG9yID09PSBzZWxlY3RvciA6IHRydWUpO1xuXG5cdFx0XHRcdFx0XHRpZiAoIW1hdGNoKSBjb250aW51ZTtcblxuXHRcdFx0XHRcdFx0RWxlbWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMuZWwsIGl0ZW0uZXZlbnROYW1lLCBpdGVtLmhhbmRsZXIsIGZhbHNlKTtcblx0XHRcdFx0XHRcdHRoaXMuX2RvbUV2ZW50cy5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAndW5kZWxlZ2F0ZUV2ZW50cycsXG5cdFx0XHR2YWx1ZTogZnVuY3Rpb24gdW5kZWxlZ2F0ZUV2ZW50cygpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5lbCkge1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9kb21FdmVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciBpdGVtID0gdGhpcy5fZG9tRXZlbnRzW2ldO1xuXHRcdFx0XHRcdFx0RWxlbWVudC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMuZWwsIGl0ZW0uZXZlbnROYW1lLCBpdGVtLmhhbmRsZXIsIGZhbHNlKTtcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdHRoaXMuX2RvbUV2ZW50cy5sZW5ndGggPSAwO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAncmVtb3ZlJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG5cdFx0XHRcdHRoaXMudW5kZWxlZ2F0ZVZlbnRzKCk7XG5cdFx0XHRcdHRoaXMudW5kZWxlZ2F0ZUV2ZW50cygpO1xuXHRcdFx0XHRpZiAodGhpcy5lbC5wYXJlbnROb2RlKSB0aGlzLmVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAndXBkYXRlJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fSwge1xuXHRcdFx0a2V5OiAncmVuZGVyJyxcblx0XHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0XHR9XG5cdFx0fV0pO1xuXG5cdFx0cmV0dXJuIENvbXBvbmVudDtcblx0fShfYmFzZTIuZGVmYXVsdCk7XG5cblx0ZXhwb3J0cy5kZWZhdWx0ID0gQ29tcG9uZW50O1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wb25lbnQuanMubWFwIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnZXhwb3J0cycsICcuL2Jhc2UnLCAnLi90eXBlcyddLCBmYWN0b3J5KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgnLi9iYXNlJyksIHJlcXVpcmUoJy4vdHlwZXMnKSk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIG1vZCA9IHtcblx0XHRcdGV4cG9ydHM6IHt9XG5cdFx0fTtcblx0XHRmYWN0b3J5KG1vZC5leHBvcnRzLCBnbG9iYWwuYmFzZSwgZ2xvYmFsLnR5cGVzKTtcblx0XHRnbG9iYWwubW9kdWxlID0gbW9kLmV4cG9ydHM7XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzLCBfYmFzZSwgX3R5cGVzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0XHR2YWx1ZTogdHJ1ZVxuXHR9KTtcblxuXHR2YXIgX2Jhc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYmFzZSk7XG5cblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcblx0XHRyZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuXHRcdFx0ZGVmYXVsdDogb2JqXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcblx0XHRpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7XG5cdFx0aWYgKCFzZWxmKSB7XG5cdFx0XHR0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG5cdH1cblxuXHR2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuXHRcdGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuXHRcdFx0XHRkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG5cdFx0XHRcdGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcblx0XHRcdFx0aWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG5cdFx0XHRpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuXHRcdFx0aWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG5cdFx0XHRyZXR1cm4gQ29uc3RydWN0b3I7XG5cdFx0fTtcblx0fSgpO1xuXG5cdGZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuXHRcdGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpO1xuXHRcdH1cblxuXHRcdHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuXHRcdFx0Y29uc3RydWN0b3I6IHtcblx0XHRcdFx0dmFsdWU6IHN1YkNsYXNzLFxuXHRcdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdFx0d3JpdGFibGU6IHRydWUsXG5cdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcblx0fVxuXG5cdHZhciBNb2R1bGUgPSBmdW5jdGlvbiAoX0Jhc2UpIHtcblx0XHRfaW5oZXJpdHMoTW9kdWxlLCBfQmFzZSk7XG5cblx0XHRfY3JlYXRlQ2xhc3MoTW9kdWxlLCBbe1xuXHRcdFx0a2V5OiAndHlwZScsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcblx0XHRcdFx0cmV0dXJuIF90eXBlcy5NT0RVTEVfVFlQRTtcblx0XHRcdH1cblx0XHR9XSwgW3tcblx0XHRcdGtleTogJ3R5cGUnLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiBnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBfdHlwZXMuTU9EVUxFX1RZUEU7XG5cdFx0XHR9XG5cdFx0fV0pO1xuXG5cdFx0ZnVuY3Rpb24gTW9kdWxlKCkge1xuXHRcdFx0dmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXHRcdFx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vZHVsZSk7XG5cblx0XHRcdHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihNb2R1bGUpLmNhbGwodGhpcywgb3B0aW9ucykpO1xuXG5cdFx0XHRfdGhpcy5iZWZvcmVJbml0aWFsaXplKG9wdGlvbnMpO1xuXHRcdFx0X3RoaXMuaW5pdGlhbGl6ZShvcHRpb25zKTtcblx0XHRcdF90aGlzLmFmdGVySW5pdGlhbGl6ZShvcHRpb25zKTtcblx0XHRcdF90aGlzLmJpbmRDdXN0b21FdmVudHMoKTtcblx0XHRcdF90aGlzLmRlbGVnYXRlVmVudHMoKTtcblx0XHRcdHJldHVybiBfdGhpcztcblx0XHR9XG5cblx0XHRyZXR1cm4gTW9kdWxlO1xuXHR9KF9iYXNlMi5kZWZhdWx0KTtcblxuXHRleHBvcnRzLmRlZmF1bHQgPSBNb2R1bGU7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vZHVsZS5qcy5tYXAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZmFjdG9yeShleHBvcnRzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbW9kID0ge1xuICAgICAgZXhwb3J0czoge31cbiAgICB9O1xuICAgIGZhY3RvcnkobW9kLmV4cG9ydHMpO1xuICAgIGdsb2JhbC50eXBlcyA9IG1vZC5leHBvcnRzO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykge1xuICAndXNlIHN0cmljdCc7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbiAgfSk7XG4gIHZhciBNT0RVTEVfVFlQRSA9ICdtb2R1bGUnO1xuICB2YXIgU0VSVklDRV9UWVBFID0gJ3NlcnZpY2UnO1xuICB2YXIgQ09NUE9ORU5UX1RZUEUgPSAnY29tcG9uZW50JztcbiAgdmFyIE1PREVMX1RZUEUgPSAnbW9kZWwnO1xuXG4gIGV4cG9ydHMuTU9EVUxFX1RZUEUgPSBNT0RVTEVfVFlQRTtcbiAgZXhwb3J0cy5TRVJWSUNFX1RZUEUgPSBTRVJWSUNFX1RZUEU7XG4gIGV4cG9ydHMuQ09NUE9ORU5UX1RZUEUgPSBDT01QT05FTlRfVFlQRTtcbiAgZXhwb3J0cy5NT0RFTF9UWVBFID0gTU9ERUxfVFlQRTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHlwZXMuanMubWFwIiwiZnVuY3Rpb24gUGxpdGUocmVzb2x2ZXIpIHtcbiAgdmFyIGVtcHR5Rm4gPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIGNoYWluID0gZW1wdHlGbixcbiAgICAgIHJlc3VsdEdldHRlcjtcblxuICBmdW5jdGlvbiBwcm9jZXNzUmVzdWx0KHJlc3VsdCwgY2FsbGJhY2ssIHJlamVjdCkge1xuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LnRoZW4pIHtcbiAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHByb2Nlc3NSZXN1bHQoZGF0YSwgY2FsbGJhY2ssIHJlamVjdCk7XG4gICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHByb2Nlc3NSZXN1bHQoZXJyLCByZWplY3QsIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRSZXN1bHQoY2FsbGJhY2tSdW5uZXIpIHtcbiAgICByZXN1bHRHZXR0ZXIgPSBmdW5jdGlvbiAoc3VjY2Vzc0NhbGxiYWNrLCBmYWlsQ2FsbGJhY2spIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNhbGxiYWNrUnVubmVyKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbENhbGxiYWNrKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGZhaWxDYWxsYmFjayhleCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNoYWluKCk7XG4gICAgY2hhaW4gPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRFcnJvcihlcnIpIHtcbiAgICBzZXRSZXN1bHQoZnVuY3Rpb24gKHN1Y2Nlc3MsIGZhaWwpIHtcbiAgICAgIGZhaWwoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFN1Y2Nlc3MoZGF0YSkge1xuICAgIHNldFJlc3VsdChmdW5jdGlvbiAoc3VjY2Vzcykge1xuICAgICAgc3VjY2VzcyhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkQ2hhaW4ob25zdWNjZXNzLCBvbmZhaWx1cmUpIHtcbiAgICB2YXIgcHJldkNoYWluID0gY2hhaW47XG4gICAgY2hhaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcmV2Q2hhaW4oKTtcbiAgICAgIHJlc3VsdEdldHRlcihvbnN1Y2Nlc3MsIG9uZmFpbHVyZSk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBzZWxmID0ge1xuICAgIHRoZW46IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgdmFyIHJlc29sdmVDYWxsYmFjayA9IHJlc3VsdEdldHRlciB8fCBidWlsZENoYWluO1xuXG4gICAgICByZXR1cm4gUGxpdGUoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZXNvbHZlQ2FsbGJhY2soZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICByZXNvbHZlKGNhbGxiYWNrKGRhdGEpKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjYXRjaDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgcmVzb2x2ZUNhbGxiYWNrID0gcmVzdWx0R2V0dGVyIHx8IGJ1aWxkQ2hhaW47XG5cbiAgICAgIHJldHVybiBQbGl0ZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlc29sdmVDYWxsYmFjayhyZXNvbHZlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KGNhbGxiYWNrKGVycikpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICByZXNvbHZlOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAhcmVzdWx0R2V0dGVyICYmIHByb2Nlc3NSZXN1bHQocmVzdWx0LCBzZXRTdWNjZXNzLCBzZXRFcnJvcik7XG4gICAgfSxcblxuICAgIHJlamVjdDogZnVuY3Rpb24gKGVycikge1xuICAgICAgIXJlc3VsdEdldHRlciAmJiBwcm9jZXNzUmVzdWx0KGVyciwgc2V0RXJyb3IsIHNldEVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgcmVzb2x2ZXIgJiYgcmVzb2x2ZXIoc2VsZi5yZXNvbHZlLCBzZWxmLnJlamVjdCk7XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cblBsaXRlLnJlc29sdmUgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gIHJldHVybiBQbGl0ZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgIHJlc29sdmUocmVzdWx0KTtcbiAgfSk7XG59O1xuXG5QbGl0ZS5yZWplY3QgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIHJldHVybiBQbGl0ZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgcmVqZWN0KGVycik7XG4gIH0pO1xufTtcblxuUGxpdGUucmFjZSA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xuICBwcm9taXNlcyA9IHByb21pc2VzIHx8IFtdO1xuICByZXR1cm4gUGxpdGUoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciBsZW4gPSBwcm9taXNlcy5sZW5ndGg7XG4gICAgaWYgKCFsZW4pIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB2YXIgcCA9IHByb21pc2VzW2ldO1xuICAgICAgcCAmJiBwLnRoZW4gJiYgcC50aGVuKHJlc29sdmUpLmNhdGNoKHJlamVjdCk7XG4gICAgfVxuICB9KTtcbn07XG5cblBsaXRlLmFsbCA9IGZ1bmN0aW9uIChwcm9taXNlcykge1xuICBwcm9taXNlcyA9IHByb21pc2VzIHx8IFtdO1xuICByZXR1cm4gUGxpdGUoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciBsZW4gPSBwcm9taXNlcy5sZW5ndGgsXG4gICAgICAgIGNvdW50ID0gbGVuO1xuXG4gICAgaWYgKCFsZW4pIHJldHVybiByZXNvbHZlKCk7XG5cbiAgICBmdW5jdGlvbiBkZWNyZW1lbnQoKSB7XG4gICAgICAtLWNvdW50IDw9IDAgJiYgcmVzb2x2ZShwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2FpdEZvcihwLCBpKSB7XG4gICAgICBpZiAocCAmJiBwLnRoZW4pIHtcbiAgICAgICAgcC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICBwcm9taXNlc1tpXSA9IHJlc3VsdDtcbiAgICAgICAgICBkZWNyZW1lbnQoKTtcbiAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlY3JlbWVudCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHdhaXRGb3IocHJvbWlzZXNbaV0sIGkpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGRlZmluZSAhPT0gJ2Z1bmN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IFBsaXRlO1xufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICdjb21wbGF5L2xpYi9jb21wb25lbnQnO1xuXG5jbGFzcyBCYWNrZ3JvdW5kQXJ0IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXN9LmluaXRpYWxpemUoKWAsIHRoaXMub3B0aW9ucy5hcHApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFja2dyb3VuZEFydDsiLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ2NvbXBsYXkvbGliL2NvbXBvbmVudCc7XG5cbmNsYXNzIFRlc3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXN9LmluaXRpYWxpemUoKWApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVzdDsiLCJpbXBvcnQgQXBwbGljYXRpb25GYWNhZGUgZnJvbSAnY29tcGxheS9saWIvYXBwbGljYXRpb24tZmFjYWRlJztcclxuaW1wb3J0IEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50IGZyb20gJ2NvbXBsYXkvbGliL2FwcGxpY2F0aW9uLWRvbS1jb21wb25lbnQnO1xyXG5cclxuLy8gY29tcG9uZW50c1xyXG5pbXBvcnQgQmFja2dyb3VuZEFydCBmcm9tICcuL2NvbXBvbmVudHMvYmFja2dyb3VuZC1hcnQvYmFja2dyb3VuZC1hcnQnO1xyXG5pbXBvcnQgVGVzdCBmcm9tICcuL2NvbXBvbmVudHMvdGVzdCc7XHJcblxyXG5cclxuY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBBcHBsaWNhdGlvbkZhY2FkZSB7fVxyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcGxpY2F0aW9uKHtcclxuICAgIG9ic2VydmU6IHRydWUsXHJcbiAgICBBcHBDb21wb25lbnQ6IEFwcGxpY2F0aW9uRG9tQ29tcG9uZW50XHJcbn0pO1xyXG5cclxuYXBwLmltbWVkaWF0ZSgoKSA9PiB7XHJcblxyXG59KTtcclxuXHJcbmFwcC5vbkRvbVJlYWR5KCgpID0+IHtcclxuICAgIGFwcC5zdGFydCh7XHJcbiAgICAgICAgY29tcG9uZW50OiBCYWNrZ3JvdW5kQXJ0LFxyXG4gICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgYXV0b3N0YXJ0OiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgYXBwLnN0YXJ0KHtcclxuICAgICAgICBjb21wb25lbnQ6IFRlc3QsXHJcbiAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICBhdXRvc3RhcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIGVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtdGVzdCcpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyJdfQ==
