/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(4);

	var Main = __webpack_require__(6);

	var game = new Phaser.Game(300, 200, Phaser.AUTO, 'gameDiv');
	game.state.add('main', Main);
	game.state.start('main', true, true, { mapName: "00-lobby-day.json" });

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2)(__webpack_require__(3))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript !== "undefined")
			execScript(src);
		else
			eval.call(null, src);
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "/**\r\n* @author       Richard Davey <rich@photonstorm.com>\r\n* @copyright    2016 Photon Storm Ltd.\r\n* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}\r\n*\r\n* @overview\r\n*\r\n* Phaser - http://phaser.io\r\n*\r\n* v2.6.2 \"Kore Springs\" - Built: Mon Oct 03 2016 00:00:00\r\n*\r\n* By Richard Davey http://www.photonstorm.com @photonstorm\r\n*\r\n* Phaser is a fun, free and fast 2D game framework for making HTML5 games\r\n* for desktop and mobile web browsers, supporting Canvas and WebGL rendering.\r\n*\r\n* Phaser uses Pixi.js for rendering, created by Mat Groves http://matgroves.com @Doormat23\r\n* Phaser uses p2.js for full-body physics, created by Stefan Hedman https://github.com/schteppe/p2.js @schteppe\r\n* Phaser contains a port of N+ Physics, converted by Richard Davey, original by http://www.metanetsoftware.com\r\n*\r\n* Many thanks to Adam Saltsman (@ADAMATOMIC) for releasing Flixel, from which both Phaser and my love of framework development originate.\r\n*\r\n* Follow development at http://phaser.io and on our forum\r\n*\r\n* \"If you want your children to be intelligent,  read them fairy tales.\"\r\n* \"If you want them to be more intelligent, read them more fairy tales.\"\r\n*                                                     -- Albert Einstein\r\n*/\r\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n(function(){\n\n    var root = this;\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * The [pixi.js](http://www.pixijs.com/) module/namespace.\n *\n * @module PIXI\n */\n \n/**\n * Namespace-class for [pixi.js](http://www.pixijs.com/).\n *\n * Contains assorted static properties and enumerations.\n *\n * @class PIXI\n * @static\n */\nvar PIXI = PIXI || {};\n\n/**\n * A reference to the Phaser Game instance that owns this Pixi renderer.\n * @property {Phaser.Game} game\n * @static \n */\nPIXI.game = null;\n\n/**\n * @property {Number} WEBGL_RENDERER\n * @protected\n * @static \n */\nPIXI.WEBGL_RENDERER = 0;\n\n/**\n * @property {Number} CANVAS_RENDERER\n * @protected\n * @static\n */\nPIXI.CANVAS_RENDERER = 1;\n\n/**\n * Version of pixi that is loaded.\n * @property {String} VERSION\n * @static \n */\nPIXI.VERSION = \"v2.2.9\";\n\n// used to create uids for various pixi objects.\nPIXI._UID = 0;\n\nif (typeof(Float32Array) != 'undefined')\n{\n    PIXI.Float32Array = Float32Array;\n    PIXI.Uint16Array = Uint16Array;\n\n    // Uint32Array and ArrayBuffer only used by WebGL renderer\n    // We can suppose that if WebGL is supported then typed arrays are supported too\n    // as they predate WebGL support for all browsers:\n    // see typed arrays support: http://caniuse.com/#search=TypedArrays\n    // see WebGL support: http://caniuse.com/#search=WebGL\n    PIXI.Uint32Array = Uint32Array;\n    PIXI.ArrayBuffer = ArrayBuffer;\n}\nelse\n{\n    PIXI.Float32Array = Array;\n    PIXI.Uint16Array = Array;\n}\n\n/**\n * @property {Number} PI_2\n * @static\n */\nPIXI.PI_2 = Math.PI * 2;\n\n/**\n * @property {Number} RAD_TO_DEG\n * @static\n */\nPIXI.RAD_TO_DEG = 180 / Math.PI;\n\n/**\n * @property {Number} DEG_TO_RAD\n * @static\n */\nPIXI.DEG_TO_RAD = Math.PI / 180;\n\n/**\n * @property {String} RETINA_PREFIX\n * @protected\n * @static\n */\nPIXI.RETINA_PREFIX = \"@2x\";\n\n/**\n * The default render options if none are supplied to\n * {{#crossLink \"WebGLRenderer\"}}{{/crossLink}} or {{#crossLink \"CanvasRenderer\"}}{{/crossLink}}.\n *\n * @property {Object} defaultRenderOptions\n * @property {Object} defaultRenderOptions.view=null\n * @property {Boolean} defaultRenderOptions.transparent=false\n * @property {Boolean} defaultRenderOptions.antialias=false\n * @property {Boolean} defaultRenderOptions.preserveDrawingBuffer=false\n * @property {Number} defaultRenderOptions.resolution=1\n * @property {Boolean} defaultRenderOptions.clearBeforeRender=true\n * @property {Boolean} defaultRenderOptions.autoResize=false\n * @static\nPIXI.defaultRenderOptions = {\n    view: null,\n    transparent: false,\n    antialias: false, \n    preserveDrawingBuffer: false,\n    resolution: 1,\n    clearBeforeRender: true,\n    autoResize: false\n};\n */\n\r\n/**\n* @author       Mat Groves http://matgroves.com @Doormat23\n* @author       Richard Davey <rich@photonstorm.com>\n* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}\n*/\n\n/**\n* The base class for all objects that are rendered. Contains properties for position, scaling,\n* rotation, masks and cache handling.\n* \n* This is an abstract class and should not be used on its own, rather it should be extended.\n*\n* It is used internally by the likes of PIXI.Sprite.\n*\n* @class PIXI.DisplayObject\n* @constructor\n*/\nPIXI.DisplayObject = function () {\n\n    /**\n    * The coordinates, in pixels, of this DisplayObject, relative to its parent container.\n    * \n    * The value of this property does not reflect any positioning happening further up the display list.\n    * To obtain that value please see the `worldPosition` property.\n    * \n    * @property {PIXI.Point} position\n    * @default\n    */\n    this.position = new PIXI.Point(0, 0);\n\n    /**\n    * The scale of this DisplayObject. A scale of 1:1 represents the DisplayObject\n    * at its default size. A value of 0.5 would scale this DisplayObject by half, and so on.\n    * \n    * The value of this property does not reflect any scaling happening further up the display list.\n    * To obtain that value please see the `worldScale` property.\n    * \n    * @property {PIXI.Point} scale\n    * @default\n    */\n    this.scale = new PIXI.Point(1, 1);\n\n    /**\n    * The pivot point of this DisplayObject that it rotates around. The values are expressed\n    * in pixel values.\n    * @property {PIXI.Point} pivot\n    * @default\n    */\n    this.pivot = new PIXI.Point(0, 0);\n\n    /**\n    * The rotation of this DisplayObject. The value is given, and expressed, in radians, and is based on\n    * a right-handed orientation.\n    * \n    * The value of this property does not reflect any rotation happening further up the display list.\n    * To obtain that value please see the `worldRotation` property.\n    * \n    * @property {number} rotation\n    * @default\n    */\n    this.rotation = 0;\n\n    /**\n    * The alpha value of this DisplayObject. A value of 1 is fully opaque. A value of 0 is transparent.\n    * Please note that an object with an alpha value of 0 is skipped during the render pass.\n    * \n    * The value of this property does not reflect any alpha values set further up the display list.\n    * To obtain that value please see the `worldAlpha` property.\n    * \n    * @property {number} alpha\n    * @default\n    */\n    this.alpha = 1;\n\n    /**\n    * The visibility of this DisplayObject. A value of `false` makes the object invisible.\n    * A value of `true` makes it visible. Please note that an object with a visible value of\n    * `false` is skipped during the render pass. Equally a DisplayObject with visible false will\n    * not render any of its children.\n    * \n    * The value of this property does not reflect any visible values set further up the display list.\n    * To obtain that value please see the `worldVisible` property.\n    * \n    * @property {boolean} visible\n    * @default\n    */\n    this.visible = true;\n\n    /**\n     * This is the defined area that will pick up mouse / touch events. It is null by default.\n     * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)\n     *\n     * @property hitArea\n     * @type Rectangle|Circle|Ellipse|Polygon\n     */\n    this.hitArea = null;\n\n    /**\n    * Should this DisplayObject be rendered by the renderer? An object with a renderable value of\n    * `false` is skipped during the render pass.\n    * \n    * @property {boolean} renderable\n    * @default\n    */\n    this.renderable = false;\n\n    /**\n    * The parent DisplayObjectContainer that this DisplayObject is a child of.\n    * All DisplayObjects must belong to a parent in order to be rendered.\n    * The root parent is the Stage object. This property is set automatically when the\n    * DisplayObject is added to, or removed from, a DisplayObjectContainer.\n    * \n    * @property {PIXI.DisplayObjectContainer} parent\n    * @default\n    * @readOnly\n    */\n    this.parent = null;\n\n    /**\n    * The multiplied alpha value of this DisplayObject. A value of 1 is fully opaque. A value of 0 is transparent.\n    * This value is the calculated total, based on the alpha values of all parents of this DisplayObjects \n    * in the display list.\n    * \n    * To obtain, and set, the local alpha value, see the `alpha` property.\n    *\n    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until \n    * that happens this property will contain values based on the previous frame. Be mindful of this if\n    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.\n    * \n    * @property {number} worldAlpha\n    * @readOnly\n    */\n    this.worldAlpha = 1;\n\n    /**\n    * The current transform of this DisplayObject.\n    * \n    * This property contains the calculated total, based on the transforms of all parents of this \n    * DisplayObject in the display list.\n    *\n    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until \n    * that happens this property will contain values based on the previous frame. Be mindful of this if\n    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.\n    *\n    * @property {PIXI.Matrix} worldTransform\n    * @readOnly\n    */\n    this.worldTransform = new PIXI.Matrix();\n\n    /**\n    * The coordinates, in pixels, of this DisplayObject within the world.\n    * \n    * This property contains the calculated total, based on the positions of all parents of this \n    * DisplayObject in the display list.\n    *\n    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until \n    * that happens this property will contain values based on the previous frame. Be mindful of this if\n    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.\n    * \n    * @property {PIXI.Point} worldPosition\n    * @readOnly\n    */\n    this.worldPosition = new PIXI.Point(0, 0);\n\n    /**\n    * The global scale of this DisplayObject.\n    * \n    * This property contains the calculated total, based on the scales of all parents of this \n    * DisplayObject in the display list.\n    *\n    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until \n    * that happens this property will contain values based on the previous frame. Be mindful of this if\n    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.\n    * \n    * @property {PIXI.Point} worldScale\n    * @readOnly\n    */\n    this.worldScale = new PIXI.Point(1, 1);\n\n    /**\n    * The rotation, in radians, of this DisplayObject.\n    * \n    * This property contains the calculated total, based on the rotations of all parents of this \n    * DisplayObject in the display list.\n    *\n    * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until \n    * that happens this property will contain values based on the previous frame. Be mindful of this if\n    * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.\n    * \n    * @property {number} worldRotation\n    * @readOnly\n    */\n    this.worldRotation = 0;\n\n    /**\n    * The rectangular area used by filters when rendering a shader for this DisplayObject.\n    *\n    * @property {PIXI.Rectangle} filterArea\n    * @type Rectangle\n    * @default\n    */\n    this.filterArea = null;\n\n    /**\n    * @property {number} _sr - Cached rotation value.\n    * @private\n    */\n    this._sr = 0;\n\n    /**\n    * @property {number} _cr - Cached rotation value.\n    * @private\n    */\n    this._cr = 1;\n\n    /**\n    * @property {PIXI.Rectangle} _bounds - The cached bounds of this object.\n    * @private\n    */\n    this._bounds = new PIXI.Rectangle(0, 0, 0, 0);\n\n    /**\n    * @property {PIXI.Rectangle} _currentBounds - The most recently calculated bounds of this object.\n    * @private\n    */\n    this._currentBounds = null;\n\n    /**\n    * @property {PIXI.Rectangle} _mask - The cached mask of this object.\n    * @private\n    */\n    this._mask = null;\n\n    /**\n    * @property {boolean} _cacheAsBitmap - Internal cache as bitmap flag.\n    * @private\n    */\n    this._cacheAsBitmap = false;\n\n    /**\n    * @property {boolean} _cacheIsDirty - Internal dirty cache flag.\n    * @private\n    */\n    this._cacheIsDirty = false;\n\n};\n\nPIXI.DisplayObject.prototype.constructor = PIXI.DisplayObject;\n\nPIXI.DisplayObject.prototype = {\n\n    /**\n    * Destroy this DisplayObject.\n    *\n    * Removes any cached sprites, sets renderable flag to false, and nulls filters, bounds and mask.\n    *\n    * Also iteratively calls `destroy` on any children.\n    *\n    * @method PIXI.DisplayObject#destroy\n    */\n    destroy: function () {\n\n        if (this.children)\n        {\n            var i = this.children.length;\n\n            while (i--)\n            {\n                this.children[i].destroy();\n            }\n\n            this.children = [];\n        }\n\n        this.hitArea = null;\n        this.parent = null;\n        this.worldTransform = null;\n        this.filterArea = null;\n        this.renderable = false;\n\n        this._bounds = null;\n        this._currentBounds = null;\n        this._mask = null;\n\n        this._destroyCachedSprite();\n\n    },\n\n    /*\n    * Updates the transform matrix this DisplayObject uses for rendering.\n    *\n    * If the object has no parent, and no parent parameter is provided, it will default to \n    * Phaser.Game.World as the parent transform to use. If that is unavailable the transform fails to take place.\n    *\n    * The `parent` parameter has priority over the actual parent. Use it as a parent override.\n    * Setting it does **not** change the actual parent of this DisplayObject.\n    *\n    * Calling this method updates the `worldTransform`, `worldAlpha`, `worldPosition`, `worldScale` \n    * and `worldRotation` properties.\n    *\n    * If a `transformCallback` has been specified, it is called at the end of this method, and is passed\n    * the new, updated, worldTransform property, along with the parent transform used.\n    *\n    * @method PIXI.DisplayObject#updateTransform\n    * @param {PIXI.DisplayObjectContainer} [parent] - Optional parent to calculate this DisplayObjects transform from.\n    * @return {PIXI.DisplayObject} - A reference to this DisplayObject.\n    */\n    updateTransform: function (parent) {\n\n        if (!parent && !this.parent && !this.game)\n        {\n            return this;\n        }\n\n        var p = this.parent;\n\n        if (parent)\n        {\n            p = parent;\n        }\n        else if (!this.parent)\n        {\n            p = this.game.world;\n        }\n\n        // create some matrix refs for easy access\n        var pt = p.worldTransform;\n        var wt = this.worldTransform;\n\n        // temporary matrix variables\n        var a, b, c, d, tx, ty;\n\n        // so if rotation is between 0 then we can simplify the multiplication process..\n        if (this.rotation % PIXI.PI_2)\n        {\n            // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes\n            if (this.rotation !== this.rotationCache)\n            {\n                this.rotationCache = this.rotation;\n                this._sr = Math.sin(this.rotation);\n                this._cr = Math.cos(this.rotation);\n            }\n\n            // get the matrix values of the displayobject based on its transform properties..\n            a  =  this._cr * this.scale.x;\n            b  =  this._sr * this.scale.x;\n            c  = -this._sr * this.scale.y;\n            d  =  this._cr * this.scale.y;\n            tx =  this.position.x;\n            ty =  this.position.y;\n            \n            // check for pivot.. not often used so geared towards that fact!\n            if (this.pivot.x || this.pivot.y)\n            {\n                tx -= this.pivot.x * a + this.pivot.y * c;\n                ty -= this.pivot.x * b + this.pivot.y * d;\n            }\n\n            // concat the parent matrix with the objects transform.\n            wt.a  = a  * pt.a + b  * pt.c;\n            wt.b  = a  * pt.b + b  * pt.d;\n            wt.c  = c  * pt.a + d  * pt.c;\n            wt.d  = c  * pt.b + d  * pt.d;\n            wt.tx = tx * pt.a + ty * pt.c + pt.tx;\n            wt.ty = tx * pt.b + ty * pt.d + pt.ty;\n        }\n        else\n        {\n            // lets do the fast version as we know there is no rotation..\n            a  = this.scale.x;\n            d  = this.scale.y;\n\n            tx = this.position.x - this.pivot.x * a;\n            ty = this.position.y - this.pivot.y * d;\n\n            wt.a  = a  * pt.a;\n            wt.b  = a  * pt.b;\n            wt.c  = d  * pt.c;\n            wt.d  = d  * pt.d;\n            wt.tx = tx * pt.a + ty * pt.c + pt.tx;\n            wt.ty = tx * pt.b + ty * pt.d + pt.ty;\n        }\n\n        //  Set the World values\n        this.worldAlpha = this.alpha * p.worldAlpha;\n        this.worldPosition.set(wt.tx, wt.ty);\n        this.worldScale.set(this.scale.x * Math.sqrt(wt.a * wt.a + wt.c * wt.c), this.scale.y * Math.sqrt(wt.b * wt.b + wt.d * wt.d));\n        this.worldRotation = Math.atan2(-wt.c, wt.d);\n\n        // reset the bounds each time this is called!\n        this._currentBounds = null;\n\n        //  Custom callback?\n        if (this.transformCallback)\n        {\n            this.transformCallback.call(this.transformCallbackContext, wt, pt);\n        }\n\n        return this;\n\n    },\n\n    /**\n    * To be overridden by classes that require it.\n    *\n    * @method PIXI.DisplayObject#preUpdate\n    */\n    preUpdate: function () {\n\n    },\n\n    /**\n    * Generates a RenderTexture based on this DisplayObject, which can they be used to texture other Sprites.\n    * This can be useful if your DisplayObject is static, or complicated, and needs to be reused multiple times.\n    *\n    * Please note that no garbage collection takes place on old textures. It is up to you to destroy old textures,\n    * and references to them, so they don't linger in memory.\n    *\n    * @method PIXI.DisplayObject#generateTexture\n    * @param {number} [resolution=1] - The resolution of the texture being generated.\n    * @param {number} [scaleMode=PIXI.scaleModes.DEFAULT] - See {{#crossLink \"PIXI/scaleModes:property\"}}PIXI.scaleModes{{/crossLink}} for possible values.\n    * @param {PIXI.CanvasRenderer|PIXI.WebGLRenderer} renderer - The renderer used to generate the texture.\n    * @return {PIXI.RenderTexture} - A RenderTexture containing an image of this DisplayObject at the time it was invoked.\n    */\n    generateTexture: function (resolution, scaleMode, renderer) {\n\n        var bounds = this.getLocalBounds();\n\n        var renderTexture = new PIXI.RenderTexture(bounds.width | 0, bounds.height | 0, renderer, scaleMode, resolution);\n        \n        PIXI.DisplayObject._tempMatrix.tx = -bounds.x;\n        PIXI.DisplayObject._tempMatrix.ty = -bounds.y;\n        \n        renderTexture.render(this, PIXI.DisplayObject._tempMatrix);\n\n        return renderTexture;\n\n    },\n\n    /**\n    * If this DisplayObject has a cached Sprite, this method generates and updates it.\n    *\n    * @method PIXI.DisplayObject#updateCache\n    * @return {PIXI.DisplayObject} - A reference to this DisplayObject.\n    */\n    updateCache: function () {\n\n        this._generateCachedSprite();\n\n        return this;\n\n    },\n\n    /**\n    * Calculates the global position of this DisplayObject, based on the position given.\n    *\n    * @method PIXI.DisplayObject#toGlobal\n    * @param {PIXI.Point} position - The global position to calculate from.\n    * @return {PIXI.Point} - A point object representing the position of this DisplayObject based on the global position given.\n    */\n    toGlobal: function (position) {\n\n        this.updateTransform();\n\n        return this.worldTransform.apply(position);\n\n    },\n\n    /**\n    * Calculates the local position of this DisplayObject, relative to another point.\n    *\n    * @method PIXI.DisplayObject#toLocal\n    * @param {PIXI.Point} position - The world origin to calculate from.\n    * @param {PIXI.DisplayObject} [from] - An optional DisplayObject to calculate the global position from.\n    * @return {PIXI.Point} - A point object representing the position of this DisplayObject based on the global position given.\n    */\n    toLocal: function (position, from) {\n\n        if (from)\n        {\n            position = from.toGlobal(position);\n        }\n\n        this.updateTransform();\n\n        return this.worldTransform.applyInverse(position);\n\n    },\n\n    /**\n    * Internal method.\n    *\n    * @method PIXI.DisplayObject#_renderCachedSprite\n    * @private\n    * @param {Object} renderSession - The render session\n    */\n    _renderCachedSprite: function (renderSession) {\n\n        this._cachedSprite.worldAlpha = this.worldAlpha;\n\n        if (renderSession.gl)\n        {\n            PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, renderSession);\n        }\n        else\n        {\n            PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite, renderSession);\n        }\n\n    },\n\n    /**\n    * Internal method.\n    *\n    * @method PIXI.DisplayObject#_generateCachedSprite\n    * @private\n    */\n    _generateCachedSprite: function () {\n\n        this._cacheAsBitmap = false;\n\n        var bounds = this.getLocalBounds();\n\n        //  Round it off and force non-zero dimensions\n        bounds.width = Math.max(1, Math.ceil(bounds.width));\n        bounds.height = Math.max(1, Math.ceil(bounds.height));\n\n        this.updateTransform();\n\n        if (!this._cachedSprite)\n        {\n            var renderTexture = new PIXI.RenderTexture(bounds.width, bounds.height);\n            this._cachedSprite = new PIXI.Sprite(renderTexture);\n            this._cachedSprite.worldTransform = this.worldTransform;\n        }\n        else\n        {\n            this._cachedSprite.texture.resize(bounds.width, bounds.height);\n        }\n\n        //  Remove filters\n        var tempFilters = this._filters;\n\n        this._filters = null;\n        this._cachedSprite.filters = tempFilters;\n\n        PIXI.DisplayObject._tempMatrix.tx = -bounds.x;\n        PIXI.DisplayObject._tempMatrix.ty = -bounds.y;\n\n        this._cachedSprite.texture.render(this, PIXI.DisplayObject._tempMatrix, true);\n        this._cachedSprite.anchor.x = -(bounds.x / bounds.width);\n        this._cachedSprite.anchor.y = -(bounds.y / bounds.height);\n\n        this._filters = tempFilters;\n\n        this._cacheAsBitmap = true;\n\n    },\n\n    /**\n    * Destroys a cached Sprite.\n    *\n    * @method PIXI.DisplayObject#_destroyCachedSprite\n    * @private\n    */\n    _destroyCachedSprite: function () {\n\n        if (!this._cachedSprite)\n        {\n            return;\n        }\n\n        this._cachedSprite.texture.destroy(true);\n\n        this._cachedSprite = null;\n\n    }\n\n};\n\n//  Alias for updateTransform. As used in DisplayObject container, etc.\nPIXI.DisplayObject.prototype.displayObjectUpdateTransform = PIXI.DisplayObject.prototype.updateTransform;\n\nObject.defineProperties(PIXI.DisplayObject.prototype, {\n\n    /**\n    * The horizontal position of the DisplayObject, in pixels, relative to its parent.\n    * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.\n    * @name PIXI.DisplayObject#x\n    * @property {number} x - The horizontal position of the DisplayObject, in pixels, relative to its parent.\n    */\n    'x': {\n\n        get: function () {\n\n            return this.position.x;\n\n        },\n\n        set: function (value) {\n\n            this.position.x = value;\n\n        }\n\n    },\n\n    /**\n    * The vertical position of the DisplayObject, in pixels, relative to its parent.\n    * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.\n    * @name PIXI.DisplayObject#y\n    * @property {number} y - The vertical position of the DisplayObject, in pixels, relative to its parent.\n    */\n    'y': {\n\n        get: function () {\n\n            return this.position.y;\n\n        },\n\n        set: function (value) {\n\n            this.position.y = value;\n\n        }\n\n    },\n\n    /**\n    * Indicates if this DisplayObject is visible, based on it, and all of its parents, `visible` property values.\n    * @name PIXI.DisplayObject#worldVisible\n    * @property {boolean} worldVisible - Indicates if this DisplayObject is visible, based on it, and all of its parents, `visible` property values.\n    */\n    'worldVisible': {\n\n        get: function () {\n\n            if (!this.visible)\n            {\n                return false;\n            }\n            else\n            {\n                var item = this.parent;\n\n                if (!item)\n                {\n                    return this.visible;\n                }\n                else\n                {\n                    do\n                    {\n                        if (!item.visible)\n                        {\n                            return false;\n                        }\n\n                        item = item.parent;\n                    }\n                    while (item);\n\n                }\n\n                return true;\n            }\n\n        }\n\n    },\n\n    /**\n    * Sets a mask for this DisplayObject. A mask is an instance of a Graphics object.\n    * When applied it limits the visible area of this DisplayObject to the shape of the mask.\n    * Under a Canvas renderer it uses shape clipping. Under a WebGL renderer it uses a Stencil Buffer.\n    * To remove a mask, set this property to `null`.\n    * \n    * @name PIXI.DisplayObject#mask\n    * @property {PIXI.Graphics} mask - The mask applied to this DisplayObject. Set to `null` to remove an existing mask.\n    */\n    'mask': {\n\n        get: function () {\n\n            return this._mask;\n\n        },\n\n        set: function (value) {\n\n            if (this._mask)\n            {\n                this._mask.isMask = false;\n            }\n\n            this._mask = value;\n\n            if (value)\n            {\n                this._mask.isMask = true;\n            }\n\n        }\n\n    },\n\n    /**\n    * Sets the filters for this DisplayObject. This is a WebGL only feature, and is ignored by the Canvas\n    * Renderer. A filter is a shader applied to this DisplayObject. You can modify the placement of the filter\n    * using `DisplayObject.filterArea`.\n    * \n    * To remove filters, set this property to `null`.\n    *\n    * Note: You cannot have a filter set, and a MULTIPLY Blend Mode active, at the same time. Setting a \n    * filter will reset this DisplayObjects blend mode to NORMAL.\n    * \n    * @name PIXI.DisplayObject#filters\n    * @property {Array} filters - An Array of PIXI.AbstractFilter objects, or objects that extend them.\n    */\n    'filters': {\n\n        get: function () {\n\n            return this._filters;\n\n        },\n\n        set: function (value) {\n\n            if (Array.isArray(value))\n            {\n                //  Put all the passes in one place.\n                var passes = [];\n\n                for (var i = 0; i < value.length; i++)\n                {\n                    var filterPasses = value[i].passes;\n\n                    for (var j = 0; j < filterPasses.length; j++)\n                    {\n                        passes.push(filterPasses[j]);\n                    }\n                }\n\n                //  Needed any more?\n                this._filterBlock = { target: this, filterPasses: passes };\n            }\n\n            this._filters = value;\n\n            if (this.blendMode && this.blendMode === PIXI.blendModes.MULTIPLY)\n            {\n                this.blendMode = PIXI.blendModes.NORMAL;\n            }\n\n        }\n\n    },\n\n    /**\n    * Sets if this DisplayObject should be cached as a bitmap.\n    *\n    * When invoked it will take a snapshot of the DisplayObject, as it is at that moment, and store it \n    * in a RenderTexture. This is then used whenever this DisplayObject is rendered. It can provide a\n    * performance benefit for complex, but static, DisplayObjects. I.e. those with lots of children.\n    *\n    * Cached Bitmaps do not track their parents. If you update a property of this DisplayObject, it will not\n    * re-generate the cached bitmap automatically. To do that you need to call `DisplayObject.updateCache`.\n    * \n    * To remove a cached bitmap, set this property to `null`.\n    * \n    * @name PIXI.DisplayObject#cacheAsBitmap\n    * @property {boolean} cacheAsBitmap - Cache this DisplayObject as a Bitmap. Set to `null` to remove an existing cached bitmap.\n    */\n    'cacheAsBitmap': {\n\n        get: function () {\n\n            return this._cacheAsBitmap;\n\n        },\n\n        set: function (value) {\n\n            if (this._cacheAsBitmap === value)\n            {\n                return;\n            }\n\n            if (value)\n            {\n                this._generateCachedSprite();\n            }\n            else\n            {\n                this._destroyCachedSprite();\n            }\n\n            this._cacheAsBitmap = value;\n\n        }\n\n    }\n\n});\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * A DisplayObjectContainer represents a collection of display objects.\n * It is the base class of all display objects that act as a container for other objects.\n *\n * @class DisplayObjectContainer\n * @extends DisplayObject\n * @constructor\n */\nPIXI.DisplayObjectContainer = function () {\n\n    PIXI.DisplayObject.call(this);\n\n    /**\n     * [read-only] The array of children of this container.\n     *\n     * @property children\n     * @type Array(DisplayObject)\n     * @readOnly\n     */\n    this.children = [];\n\n    /**\n    * If `ignoreChildInput`  is `false` it will allow this objects _children_ to be considered as valid for Input events.\n    * \n    * If this property is `true` then the children will _not_ be considered as valid for Input events.\n    * \n    * Note that this property isn't recursive: only immediate children are influenced, it doesn't scan further down.\n    * @property {boolean} ignoreChildInput\n    * @default\n    */\n    this.ignoreChildInput = false;\n    \n};\n\nPIXI.DisplayObjectContainer.prototype = Object.create( PIXI.DisplayObject.prototype );\nPIXI.DisplayObjectContainer.prototype.constructor = PIXI.DisplayObjectContainer;\n\n/**\n * Adds a child to the container.\n *\n * @method addChild\n * @param child {DisplayObject} The DisplayObject to add to the container\n * @return {DisplayObject} The child that was added.\n */\nPIXI.DisplayObjectContainer.prototype.addChild = function (child) {\n\n    return this.addChildAt(child, this.children.length);\n\n};\n\n/**\n * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown\n *\n * @method addChildAt\n * @param child {DisplayObject} The child to add\n * @param index {Number} The index to place the child in\n * @return {DisplayObject} The child that was added.\n */\nPIXI.DisplayObjectContainer.prototype.addChildAt = function (child, index) {\n\n    if (index >= 0 && index <= this.children.length)\n    {\n        if (child.parent)\n        {\n            child.parent.removeChild(child);\n        }\n\n        child.parent = this;\n\n        this.children.splice(index, 0, child);\n\n        return child;\n    }\n    else\n    {\n        throw new Error(child + 'addChildAt: The index '+ index +' supplied is out of bounds ' + this.children.length);\n    }\n\n};\n\n/**\n * Swaps the position of 2 Display Objects within this container.\n *\n * @method swapChildren\n * @param child {DisplayObject}\n * @param child2 {DisplayObject}\n */\nPIXI.DisplayObjectContainer.prototype.swapChildren = function (child, child2) {\n\n    if (child === child2)\n    {\n        return;\n    }\n\n    var index1 = this.getChildIndex(child);\n    var index2 = this.getChildIndex(child2);\n\n    if (index1 < 0 || index2 < 0)\n    {\n        throw new Error('swapChildren: Both the supplied DisplayObjects must be a child of the caller.');\n    }\n\n    this.children[index1] = child2;\n    this.children[index2] = child;\n\n};\n\n/**\n * Returns the index position of a child DisplayObject instance\n *\n * @method getChildIndex\n * @param child {DisplayObject} The DisplayObject instance to identify\n * @return {Number} The index position of the child display object to identify\n */\nPIXI.DisplayObjectContainer.prototype.getChildIndex = function (child) {\n\n    var index = this.children.indexOf(child);\n\n    if (index === -1)\n    {\n        throw new Error('The supplied DisplayObject must be a child of the caller');\n    }\n\n    return index;\n\n};\n\n/**\n * Changes the position of an existing child in the display object container\n *\n * @method setChildIndex\n * @param child {DisplayObject} The child DisplayObject instance for which you want to change the index number\n * @param index {Number} The resulting index number for the child display object\n */\nPIXI.DisplayObjectContainer.prototype.setChildIndex = function (child, index) {\n\n    if (index < 0 || index >= this.children.length)\n    {\n        throw new Error('The supplied index is out of bounds');\n    }\n\n    var currentIndex = this.getChildIndex(child);\n\n    this.children.splice(currentIndex, 1); //remove from old position\n    this.children.splice(index, 0, child); //add at new position\n\n};\n\n/**\n * Returns the child at the specified index\n *\n * @method getChildAt\n * @param index {Number} The index to get the child from\n * @return {DisplayObject} The child at the given index, if any.\n */\nPIXI.DisplayObjectContainer.prototype.getChildAt = function (index) {\n\n    if (index < 0 || index >= this.children.length)\n    {\n        throw new Error('getChildAt: Supplied index '+ index +' does not exist in the child list, or the supplied DisplayObject must be a child of the caller');\n    }\n\n    return this.children[index];\n    \n};\n\n/**\n * Removes a child from the container.\n *\n * @method removeChild\n * @param child {DisplayObject} The DisplayObject to remove\n * @return {DisplayObject} The child that was removed.\n */\nPIXI.DisplayObjectContainer.prototype.removeChild = function (child) {\n\n    var index = this.children.indexOf(child);\n\n    if (index === -1)\n    {\n        return;\n    }\n    \n    return this.removeChildAt(index);\n\n};\n\n/**\n * Removes a child from the specified index position.\n *\n * @method removeChildAt\n * @param index {Number} The index to get the child from\n * @return {DisplayObject} The child that was removed.\n */\nPIXI.DisplayObjectContainer.prototype.removeChildAt = function (index) {\n\n    var child = this.getChildAt(index);\n\n    if (child)\n    {\n        child.parent = undefined;\n\n        this.children.splice(index, 1);\n    }\n\n    return child;\n\n};\n\n/**\n* Removes all children from this container that are within the begin and end indexes.\n*\n* @method removeChildren\n* @param beginIndex {Number} The beginning position. Default value is 0.\n* @param endIndex {Number} The ending position. Default value is size of the container.\n*/\nPIXI.DisplayObjectContainer.prototype.removeChildren = function (beginIndex, endIndex) {\n\n    if (beginIndex === undefined) { beginIndex = 0; }\n    if (endIndex === undefined) { endIndex = this.children.length; }\n\n    var range = endIndex - beginIndex;\n\n    if (range > 0 && range <= endIndex)\n    {\n        var removed = this.children.splice(begin, range);\n\n        for (var i = 0; i < removed.length; i++)\n        {\n            var child = removed[i];\n            child.parent = undefined;\n        }\n\n        return removed;\n    }\n    else if (range === 0 && this.children.length === 0)\n    {\n        return [];\n    }\n    else\n    {\n        throw new Error( 'removeChildren: Range Error, numeric values are outside the acceptable range' );\n    }\n\n};\n\n/*\n * Updates the transform on all children of this container for rendering\n *\n * @method updateTransform\n * @private\n */\nPIXI.DisplayObjectContainer.prototype.updateTransform = function () {\n\n    if (!this.visible)\n    {\n        return;\n    }\n\n    this.displayObjectUpdateTransform();\n\n    if (this._cacheAsBitmap)\n    {\n        return;\n    }\n\n    for (var i = 0; i < this.children.length; i++)\n    {\n        this.children[i].updateTransform();\n    }\n\n};\n\n// performance increase to avoid using call.. (10x faster)\nPIXI.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform = PIXI.DisplayObjectContainer.prototype.updateTransform;\n\n/**\n * Retrieves the global bounds of the displayObjectContainer as a rectangle. The bounds calculation takes all visible children into consideration.\n *\n * @method getBounds\n * @param {PIXI.DisplayObject|PIXI.Matrix} [targetCoordinateSpace] Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.\n * @return {Rectangle} The rectangular bounding area\n */\nPIXI.DisplayObjectContainer.prototype.getBounds = function (targetCoordinateSpace) {\n\n    var isTargetCoordinateSpaceDisplayObject = (targetCoordinateSpace && targetCoordinateSpace instanceof PIXI.DisplayObject);\n    var isTargetCoordinateSpaceThisOrParent = true;\n\n    if (!isTargetCoordinateSpaceDisplayObject) \n\t{\n        targetCoordinateSpace = this;\n    } \n\telse if (targetCoordinateSpace instanceof PIXI.DisplayObjectContainer) \n\t{\n        isTargetCoordinateSpaceThisOrParent = targetCoordinateSpace.contains(this);\n    } \n\telse \n\t{\n        isTargetCoordinateSpaceThisOrParent = false;\n    }\n\n    var i;\n\n    if (isTargetCoordinateSpaceDisplayObject)\n    {\n        var matrixCache = targetCoordinateSpace.worldTransform;\n\n        targetCoordinateSpace.worldTransform = PIXI.identityMatrix;\n\n        for (i = 0; i < targetCoordinateSpace.children.length; i++) \n\t\t{\n            targetCoordinateSpace.children[i].updateTransform();\n        }\n    }\n\n    var minX = Infinity;\n    var minY = Infinity;\n\n    var maxX = -Infinity;\n    var maxY = -Infinity;\n\n    var childBounds;\n    var childMaxX;\n    var childMaxY;\n\n    var childVisible = false;\n\n    for (i = 0; i < this.children.length; i++)\n    {\n        var child = this.children[i];\n\n        if (!child.visible)\n        {\n            continue;\n        }\n\n        childVisible = true;\n\n        childBounds = this.children[i].getBounds();\n\n        minX = (minX < childBounds.x) ? minX : childBounds.x;\n        minY = (minY < childBounds.y) ? minY : childBounds.y;\n\n        childMaxX = childBounds.width + childBounds.x;\n        childMaxY = childBounds.height + childBounds.y;\n\n        maxX = (maxX > childMaxX) ? maxX : childMaxX;\n        maxY = (maxY > childMaxY) ? maxY : childMaxY;\n    }\n\n    var bounds = this._bounds;\n\n    if (!childVisible) \n\t{\n        bounds = new PIXI.Rectangle();\n\n        var w0 = bounds.x;\n        var w1 = bounds.width + bounds.x;\n\n        var h0 = bounds.y;\n        var h1 = bounds.height + bounds.y;\n\n        var worldTransform = this.worldTransform;\n\n        var a = worldTransform.a;\n        var b = worldTransform.b;\n        var c = worldTransform.c;\n        var d = worldTransform.d;\n        var tx = worldTransform.tx;\n        var ty = worldTransform.ty;\n\n        var x1 = a * w1 + c * h1 + tx;\n        var y1 = d * h1 + b * w1 + ty;\n\n        var x2 = a * w0 + c * h1 + tx;\n        var y2 = d * h1 + b * w0 + ty;\n\n        var x3 = a * w0 + c * h0 + tx;\n        var y3 = d * h0 + b * w0 + ty;\n\n        var x4 = a * w1 + c * h0 + tx;\n        var y4 = d * h0 + b * w1 + ty;\n\n        maxX = x1;\n        maxY = y1;\n\n        minX = x1;\n        minY = y1;\n\n        minX = x2 < minX ? x2 : minX;\n        minX = x3 < minX ? x3 : minX;\n        minX = x4 < minX ? x4 : minX;\n\n        minY = y2 < minY ? y2 : minY;\n        minY = y3 < minY ? y3 : minY;\n        minY = y4 < minY ? y4 : minY;\n\n        maxX = x2 > maxX ? x2 : maxX;\n        maxX = x3 > maxX ? x3 : maxX;\n        maxX = x4 > maxX ? x4 : maxX;\n\n        maxY = y2 > maxY ? y2 : maxY;\n        maxY = y3 > maxY ? y3 : maxY;\n        maxY = y4 > maxY ? y4 : maxY;\n    }\n\n    bounds.x = minX;\n    bounds.y = minY;\n    bounds.width = maxX - minX;\n    bounds.height = maxY - minY;\n\n    if (isTargetCoordinateSpaceDisplayObject) \n\t{\n        targetCoordinateSpace.worldTransform = matrixCache;\n\n        for (i = 0; i < targetCoordinateSpace.children.length; i++) \n\t\t{\n            targetCoordinateSpace.children[i].updateTransform();\n        }\n    }\n\n    if (!isTargetCoordinateSpaceThisOrParent) \n\t{\n        var targetCoordinateSpaceBounds = targetCoordinateSpace.getBounds();\n\n        bounds.x -= targetCoordinateSpaceBounds.x;\n        bounds.y -= targetCoordinateSpaceBounds.y;\n    }\n\n    return bounds;\n\n};\n\n/**\n * Retrieves the non-global local bounds of the displayObjectContainer as a rectangle without any transformations. The calculation takes all visible children into consideration.\n *\n * @method getLocalBounds\n * @return {Rectangle} The rectangular bounding area\n */\nPIXI.DisplayObjectContainer.prototype.getLocalBounds = function () {\n\n    return this.getBounds(this);\n\n};\n\n/**\n* Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself.\n*\n* @method contains\n* @param {DisplayObject} child\n* @returns {boolean}\n*/\nPIXI.DisplayObjectContainer.prototype.contains = function (child) {\n\n    if (!child)\n    {\n        return false;\n    }\n    else if (child === this) \n\t{\n        return true;\n    }\n    else \n\t{\n        return this.contains(child.parent);\n    }\n};\n\n/**\n* Renders the object using the WebGL renderer\n*\n* @method _renderWebGL\n* @param renderSession {RenderSession} \n* @private\n*/\nPIXI.DisplayObjectContainer.prototype._renderWebGL = function (renderSession) {\n\n    if (!this.visible || this.alpha <= 0)\n    {\n        return;\n    }\n    \n    if (this._cacheAsBitmap)\n    {\n        this._renderCachedSprite(renderSession);\n        return;\n    }\n    \n    var i;\n\n    if (this._mask || this._filters)\n    {\n        // push filter first as we need to ensure the stencil buffer is correct for any masking\n        if (this._filters)\n        {\n            renderSession.spriteBatch.flush();\n            renderSession.filterManager.pushFilter(this._filterBlock);\n        }\n\n        if (this._mask)\n        {\n            renderSession.spriteBatch.stop();\n            renderSession.maskManager.pushMask(this.mask, renderSession);\n            renderSession.spriteBatch.start();\n        }\n\n        // simple render children!\n        for (i = 0; i < this.children.length; i++)\n        {\n            this.children[i]._renderWebGL(renderSession);\n        }\n\n        renderSession.spriteBatch.stop();\n\n        if (this._mask) renderSession.maskManager.popMask(this._mask, renderSession);\n        if (this._filters) renderSession.filterManager.popFilter();\n        \n        renderSession.spriteBatch.start();\n    }\n    else\n    {\n        // simple render children!\n        for (i = 0; i < this.children.length; i++)\n        {\n            this.children[i]._renderWebGL(renderSession);\n        }\n    }\n\n};\n\n/**\n* Renders the object using the Canvas renderer\n*\n* @method _renderCanvas\n* @param renderSession {RenderSession} \n* @private\n*/\nPIXI.DisplayObjectContainer.prototype._renderCanvas = function (renderSession) {\n\n    if (this.visible === false || this.alpha === 0)\n    {\n        return;\n    }\n\n    if (this._cacheAsBitmap)\n    {\n        this._renderCachedSprite(renderSession);\n        return;\n    }\n\n    if (this._mask)\n    {\n        renderSession.maskManager.pushMask(this._mask, renderSession);\n    }\n\n    for (var i = 0; i < this.children.length; i++)\n    {\n        this.children[i]._renderCanvas(renderSession);\n    }\n\n    if (this._mask)\n    {\n        renderSession.maskManager.popMask(renderSession);\n    }\n\n};\n\n/**\n * The width of the displayObjectContainer, setting this will actually modify the scale to achieve the value set\n *\n * @property width\n * @type Number\n */\nObject.defineProperty(PIXI.DisplayObjectContainer.prototype, 'width', {\n\n    get: function() {\n        return this.getLocalBounds().width * this.scale.x;\n    },\n\n    set: function(value) {\n        \n        var width = this.getLocalBounds().width;\n\n        if (width !== 0)\n        {\n            this.scale.x = value / width;\n        }\n        else\n        {\n            this.scale.x = 1;\n        }\n        \n        this._width = value;\n    }\n});\n\n/**\n * The height of the displayObjectContainer, setting this will actually modify the scale to achieve the value set\n *\n * @property height\n * @type Number\n */\nObject.defineProperty(PIXI.DisplayObjectContainer.prototype, 'height', {\n\n    get: function() {\n        return this.getLocalBounds().height * this.scale.y;\n    },\n\n    set: function(value) {\n\n        var height = this.getLocalBounds().height;\n\n        if (height !== 0)\n        {\n            this.scale.y = value / height;\n        }\n        else\n        {\n            this.scale.y = 1;\n        }\n\n        this._height = value;\n    }\n\n});\n\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * The Sprite object is the base for all textured objects that are rendered to the screen\n *\n * @class Sprite\n * @extends DisplayObjectContainer\n * @constructor\n * @param texture {Texture} The texture for this sprite\n */\nPIXI.Sprite = function (texture) {\n\n    PIXI.DisplayObjectContainer.call(this);\n\n    /**\n     * The anchor sets the origin point of the texture.\n     * The default is 0,0 this means the texture's origin is the top left\n     * Setting than anchor to 0.5,0.5 means the textures origin is centered\n     * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right corner\n     *\n     * @property anchor\n     * @type Point\n     */\n    this.anchor = new PIXI.Point();\n\n    /**\n     * The texture that the sprite is using\n     *\n     * @property texture\n     * @type Texture\n     */\n    this.texture = texture || PIXI.Texture.emptyTexture;\n\n    /**\n     * The width of the sprite (this is initially set by the texture)\n     *\n     * @property _width\n     * @type Number\n     * @private\n     */\n    this._width = 0;\n\n    /**\n     * The height of the sprite (this is initially set by the texture)\n     *\n     * @property _height\n     * @type Number\n     * @private\n     */\n    this._height = 0;\n\n    /**\n     * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF will remove any tint effect.\n     *\n     * @property tint\n     * @type Number\n     * @default 0xFFFFFF\n     */\n    this.tint = 0xFFFFFF;\n\n    /**\n     * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF will remove any tint effect.\n     *\n     * @property cachedTint\n     * @private\n     * @type Number\n     * @default -1\n     */\n    this.cachedTint = -1;\n\n    /**\n     * A canvas that contains the tinted version of the Sprite (in Canvas mode, WebGL doesn't populate this)\n     *\n     * @property tintedTexture\n     * @type Canvas\n     * @default null\n     */\n    this.tintedTexture = null;\n\n    /**\n     * The blend mode to be applied to the sprite. Set to PIXI.blendModes.NORMAL to remove any blend mode.\n     *\n     * Warning: You cannot have a blend mode and a filter active on the same Sprite. Doing so will render the sprite invisible.\n     *\n     * @property blendMode\n     * @type Number\n     * @default PIXI.blendModes.NORMAL;\n     */\n    this.blendMode = PIXI.blendModes.NORMAL;\n\n    /**\n     * The shader that will be used to render this Sprite.\n     * Set to null to remove a current shader.\n     *\n     * @property shader\n     * @type AbstractFilter\n     * @default null\n     */\n    this.shader = null;\n\n    /**\n    * Controls if this Sprite is processed by the core Phaser game loops and Group loops.\n    *\n    * @property exists\n    * @type Boolean\n    * @default true\n    */\n    this.exists = true;\n\n    if (this.texture.baseTexture.hasLoaded)\n    {\n        this.onTextureUpdate();\n    }\n\n    this.renderable = true;\n\n};\n\n// constructor\nPIXI.Sprite.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);\nPIXI.Sprite.prototype.constructor = PIXI.Sprite;\n\n/**\n * The width of the sprite, setting this will actually modify the scale to achieve the value set\n *\n * @property width\n * @type Number\n */\nObject.defineProperty(PIXI.Sprite.prototype, 'width', {\n\n    get: function() {\n        return this.scale.x * this.texture.frame.width;\n    },\n\n    set: function(value) {\n        this.scale.x = value / this.texture.frame.width;\n        this._width = value;\n    }\n\n});\n\n/**\n * The height of the sprite, setting this will actually modify the scale to achieve the value set\n *\n * @property height\n * @type Number\n */\nObject.defineProperty(PIXI.Sprite.prototype, 'height', {\n\n    get: function() {\n        return  this.scale.y * this.texture.frame.height;\n    },\n\n    set: function(value) {\n        this.scale.y = value / this.texture.frame.height;\n        this._height = value;\n    }\n\n});\n\n/**\n * Sets the texture of the sprite. Be warned that this doesn't remove or destroy the previous\n * texture this Sprite was using.\n *\n * @method setTexture\n * @param texture {Texture} The PIXI texture that is displayed by the sprite\n * @param [destroy=false] {boolean} Call Texture.destroy on the current texture before replacing it with the new one?\n */\nPIXI.Sprite.prototype.setTexture = function(texture, destroyBase)\n{\n    if (destroyBase !== undefined)\n    {\n        this.texture.baseTexture.destroy();\n    }\n\n    //  Over-ridden by loadTexture as needed\n    this.texture.baseTexture.skipRender = false;\n    this.texture = texture;\n    this.texture.valid = true;\n    this.cachedTint = -1;\n};\n\n/**\n * When the texture is updated, this event will fire to update the scale and frame\n *\n * @method onTextureUpdate\n * @param event\n * @private\n */\nPIXI.Sprite.prototype.onTextureUpdate = function()\n{\n    // so if _width is 0 then width was not set..\n    if (this._width) this.scale.x = this._width / this.texture.frame.width;\n    if (this._height) this.scale.y = this._height / this.texture.frame.height;\n};\n\n/**\n* Returns the bounds of the Sprite as a rectangle.\n* The bounds calculation takes the worldTransform into account.\n*\n* It is important to note that the transform is not updated when you call this method.\n* So if this Sprite is the child of a Display Object which has had its transform\n* updated since the last render pass, those changes will not yet have been applied\n* to this Sprites worldTransform. If you need to ensure that all parent transforms\n* are factored into this getBounds operation then you should call `updateTransform`\n* on the root most object in this Sprites display list first.\n*\n* @method getBounds\n* @param matrix {Matrix} the transformation matrix of the sprite\n* @return {Rectangle} the framing rectangle\n*/\nPIXI.Sprite.prototype.getBounds = function(matrix)\n{\n    var width = this.texture.frame.width;\n    var height = this.texture.frame.height;\n\n    var w0 = width * (1-this.anchor.x);\n    var w1 = width * -this.anchor.x;\n\n    var h0 = height * (1-this.anchor.y);\n    var h1 = height * -this.anchor.y;\n\n    var worldTransform = matrix || this.worldTransform;\n\n    var a = worldTransform.a;\n    var b = worldTransform.b;\n    var c = worldTransform.c;\n    var d = worldTransform.d;\n    var tx = worldTransform.tx;\n    var ty = worldTransform.ty;\n\n    var maxX = -Infinity;\n    var maxY = -Infinity;\n\n    var minX = Infinity;\n    var minY = Infinity;\n\n    if (b === 0 && c === 0)\n    {\n        // scale may be negative!\n        if (a < 0)\n        {\n            a *= -1;\n            var temp = w0;\n            w0 = -w1;\n            w1 = -temp; \n        }\n\n        if (d < 0)\n        {\n            d *= -1;\n            var temp = h0;\n            h0 = -h1;\n            h1 = -temp; \n        }\n\n        // this means there is no rotation going on right? RIGHT?\n        // if thats the case then we can avoid checking the bound values! yay         \n        minX = a * w1 + tx;\n        maxX = a * w0 + tx;\n        minY = d * h1 + ty;\n        maxY = d * h0 + ty;\n    }\n    else\n    {\n        var x1 = a * w1 + c * h1 + tx;\n        var y1 = d * h1 + b * w1 + ty;\n\n        var x2 = a * w0 + c * h1 + tx;\n        var y2 = d * h1 + b * w0 + ty;\n\n        var x3 = a * w0 + c * h0 + tx;\n        var y3 = d * h0 + b * w0 + ty;\n\n        var x4 =  a * w1 + c * h0 + tx;\n        var y4 =  d * h0 + b * w1 + ty;\n\n        minX = x1 < minX ? x1 : minX;\n        minX = x2 < minX ? x2 : minX;\n        minX = x3 < minX ? x3 : minX;\n        minX = x4 < minX ? x4 : minX;\n\n        minY = y1 < minY ? y1 : minY;\n        minY = y2 < minY ? y2 : minY;\n        minY = y3 < minY ? y3 : minY;\n        minY = y4 < minY ? y4 : minY;\n\n        maxX = x1 > maxX ? x1 : maxX;\n        maxX = x2 > maxX ? x2 : maxX;\n        maxX = x3 > maxX ? x3 : maxX;\n        maxX = x4 > maxX ? x4 : maxX;\n\n        maxY = y1 > maxY ? y1 : maxY;\n        maxY = y2 > maxY ? y2 : maxY;\n        maxY = y3 > maxY ? y3 : maxY;\n        maxY = y4 > maxY ? y4 : maxY;\n    }\n\n    var bounds = this._bounds;\n\n    bounds.x = minX;\n    bounds.width = maxX - minX;\n\n    bounds.y = minY;\n    bounds.height = maxY - minY;\n\n    // store a reference so that if this function gets called again in the render cycle we do not have to recalculate\n    this._currentBounds = bounds;\n\n    return bounds;\n};\n\n/**\n * Retrieves the non-global local bounds of the Sprite as a rectangle. The calculation takes all visible children into consideration.\n *\n * @method getLocalBounds\n * @return {Rectangle} The rectangular bounding area\n */\nPIXI.Sprite.prototype.getLocalBounds = function () {\n\n    var matrixCache = this.worldTransform;\n\n    this.worldTransform = PIXI.identityMatrix;\n\n    for (var i = 0; i < this.children.length; i++)\n    {\n        this.children[i].updateTransform();\n    }\n\n    var bounds = this.getBounds();\n\n    this.worldTransform = matrixCache;\n\n    for (i = 0; i < this.children.length; i++)\n    {\n        this.children[i].updateTransform();\n    }\n\n    return bounds;\n\n};\n\n/**\n* Renders the object using the WebGL renderer\n*\n* @method _renderWebGL\n* @param renderSession {RenderSession}\n* @param {Matrix} [matrix] - Optional matrix. If provided the Display Object will be rendered using this matrix, otherwise it will use its worldTransform.\n* @private\n*/\nPIXI.Sprite.prototype._renderWebGL = function(renderSession, matrix)\n{\n    // if the sprite is not visible or the alpha is 0 then no need to render this element\n    if (!this.visible || this.alpha <= 0 || !this.renderable) return;\n\n    //  They provided an alternative rendering matrix, so use it\n    var wt = this.worldTransform;\n\n    if (matrix)\n    {\n        wt = matrix;\n    }\n\n    //  A quick check to see if this element has a mask or a filter.\n    if (this._mask || this._filters)\n    {\n        var spriteBatch = renderSession.spriteBatch;\n\n        // push filter first as we need to ensure the stencil buffer is correct for any masking\n        if (this._filters)\n        {\n            spriteBatch.flush();\n            renderSession.filterManager.pushFilter(this._filterBlock);\n        }\n\n        if (this._mask)\n        {\n            spriteBatch.stop();\n            renderSession.maskManager.pushMask(this.mask, renderSession);\n            spriteBatch.start();\n        }\n\n        // add this sprite to the batch\n        spriteBatch.render(this);\n\n        // now loop through the children and make sure they get rendered\n        for (var i = 0; i < this.children.length; i++)\n        {\n            this.children[i]._renderWebGL(renderSession);\n        }\n\n        // time to stop the sprite batch as either a mask element or a filter draw will happen next\n        spriteBatch.stop();\n\n        if (this._mask) renderSession.maskManager.popMask(this._mask, renderSession);\n        if (this._filters) renderSession.filterManager.popFilter();\n\n        spriteBatch.start();\n    }\n    else\n    {\n        renderSession.spriteBatch.render(this);\n\n        //  Render children!\n        for (var i = 0; i < this.children.length; i++)\n        {\n            this.children[i]._renderWebGL(renderSession, wt);\n        }\n\n    }\n};\n\n/**\n* Renders the object using the Canvas renderer\n*\n* @method _renderCanvas\n* @param renderSession {RenderSession}\n* @param {Matrix} [matrix] - Optional matrix. If provided the Display Object will be rendered using this matrix, otherwise it will use its worldTransform.\n* @private\n*/\nPIXI.Sprite.prototype._renderCanvas = function(renderSession, matrix)\n{\n    // If the sprite is not visible or the alpha is 0 then no need to render this element\n    if (!this.visible || this.alpha === 0 || !this.renderable || this.texture.crop.width <= 0 || this.texture.crop.height <= 0)\n    {\n        return;\n    }\n\n    var wt = this.worldTransform;\n\n    //  If they provided an alternative rendering matrix then use it\n    if (matrix)\n    {\n        wt = matrix;\n    }\n\n    if (this.blendMode !== renderSession.currentBlendMode)\n    {\n        renderSession.currentBlendMode = this.blendMode;\n        renderSession.context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];\n    }\n\n    if (this._mask)\n    {\n        renderSession.maskManager.pushMask(this._mask, renderSession);\n    }\n\n    //  Ignore null sources\n    if (this.texture.valid)\n    {\n        var resolution = this.texture.baseTexture.resolution / renderSession.resolution;\n\n        renderSession.context.globalAlpha = this.worldAlpha;\n\n        //  If smoothingEnabled is supported and we need to change the smoothing property for this texture\n        if (renderSession.smoothProperty && renderSession.scaleMode !== this.texture.baseTexture.scaleMode)\n        {\n            renderSession.scaleMode = this.texture.baseTexture.scaleMode;\n            renderSession.context[renderSession.smoothProperty] = (renderSession.scaleMode === PIXI.scaleModes.LINEAR);\n        }\n\n        //  If the texture is trimmed we offset by the trim x/y, otherwise we use the frame dimensions\n        var dx = (this.texture.trim) ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width;\n        var dy = (this.texture.trim) ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;\n\n        var tx = (wt.tx * renderSession.resolution) + renderSession.shakeX;\n        var ty = (wt.ty * renderSession.resolution) + renderSession.shakeY;\n\n        //  Allow for pixel rounding\n        if (renderSession.roundPixels)\n        {\n            renderSession.context.setTransform(wt.a, wt.b, wt.c, wt.d, tx | 0, ty | 0);\n            dx |= 0;\n            dy |= 0;\n        }\n        else\n        {\n            renderSession.context.setTransform(wt.a, wt.b, wt.c, wt.d, tx, ty);\n        }\n\n        var cw = this.texture.crop.width;\n        var ch = this.texture.crop.height;\n\n        dx /= resolution;\n        dy /= resolution;\n\n        if (this.tint !== 0xFFFFFF)\n        {\n            if (this.texture.requiresReTint || this.cachedTint !== this.tint)\n            {\n                this.tintedTexture = PIXI.CanvasTinter.getTintedTexture(this, this.tint);\n\n                this.cachedTint = this.tint;\n                this.texture.requiresReTint = false;\n            }\n\n            renderSession.context.drawImage(this.tintedTexture, 0, 0, cw, ch, dx, dy, cw / resolution, ch / resolution);\n        }\n        else\n        {\n            var cx = this.texture.crop.x;\n            var cy = this.texture.crop.y;\n            renderSession.context.drawImage(this.texture.baseTexture.source, cx, cy, cw, ch, dx, dy, cw / resolution, ch / resolution);\n        }\n    }\n\n    for (var i = 0; i < this.children.length; i++)\n    {\n        this.children[i]._renderCanvas(renderSession);\n    }\n\n    if (this._mask)\n    {\n        renderSession.maskManager.popMask(renderSession);\n    }\n\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/\n */\n\n/**\n * The SpriteBatch class is a really fast version of the DisplayObjectContainer \n * built solely for speed, so use when you need a lot of sprites or particles.\n * And it's extremely easy to use : \n\n    var container = new PIXI.SpriteBatch();\n \n    for(var i  = 0; i < 100; i++)\n    {\n        var sprite = new PIXI.Sprite.fromImage(\"myImage.png\");\n        container.addChild(sprite);\n    }\n * And here you have a hundred sprites that will be renderer at the speed of light\n *\n * @class SpriteBatch\n * @constructor\n * @param texture {Texture}\n */\nPIXI.SpriteBatch = function(texture)\n{\n    PIXI.DisplayObjectContainer.call( this);\n\n    this.textureThing = texture;\n\n    this.ready = false;\n};\n\nPIXI.SpriteBatch.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);\nPIXI.SpriteBatch.prototype.constructor = PIXI.SpriteBatch;\n\n/*\n * Initialises the spriteBatch\n *\n * @method initWebGL\n * @param gl {WebGLContext} the current WebGL drawing context\n */\nPIXI.SpriteBatch.prototype.initWebGL = function(gl)\n{\n    // TODO only one needed for the whole engine really?\n    this.fastSpriteBatch = new PIXI.WebGLFastSpriteBatch(gl);\n\n    this.ready = true;\n};\n\n/*\n * Updates the object transform for rendering\n *\n * @method updateTransform\n * @private\n */\nPIXI.SpriteBatch.prototype.updateTransform = function()\n{\n    // TODO don't need to!\n    this.displayObjectUpdateTransform();\n    //  PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );\n};\n\n/**\n* Renders the object using the WebGL renderer\n*\n* @method _renderWebGL\n* @param renderSession {RenderSession} \n* @private\n*/\nPIXI.SpriteBatch.prototype._renderWebGL = function(renderSession)\n{\n    if (!this.visible || this.alpha <= 0 || !this.children.length) return;\n\n    if (!this.ready)\n    {\n        this.initWebGL(renderSession.gl);\n    }\n    \n    if (this.fastSpriteBatch.gl !== renderSession.gl)\n    {\n        this.fastSpriteBatch.setContext(renderSession.gl);\n    }\n\n    renderSession.spriteBatch.stop();\n    \n    renderSession.shaderManager.setShader(renderSession.shaderManager.fastShader);\n    \n    this.fastSpriteBatch.begin(this, renderSession);\n    this.fastSpriteBatch.render(this);\n\n    renderSession.spriteBatch.start();\n \n};\n\n/**\n* Renders the object using the Canvas renderer\n*\n* @method _renderCanvas\n* @param renderSession {RenderSession} \n* @private\n*/\nPIXI.SpriteBatch.prototype._renderCanvas = function(renderSession)\n{\n    if (!this.visible || this.alpha <= 0 || !this.children.length) return;\n    \n    var context = renderSession.context;\n\n    context.globalAlpha = this.worldAlpha;\n\n    this.displayObjectUpdateTransform();\n\n    var transform = this.worldTransform;\n       \n    var isRotated = true;\n\n    for (var i = 0; i < this.children.length; i++)\n    {\n        var child = this.children[i];\n\n        if (!child.visible) continue;\n\n        var texture = child.texture;\n        var frame = texture.frame;\n\n        context.globalAlpha = this.worldAlpha * child.alpha;\n\n        if (child.rotation % (Math.PI * 2) === 0)\n        {\n            if (isRotated)\n            {\n                context.setTransform(transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty);\n                isRotated = false;\n            }\n\n            // this is the fastest  way to optimise! - if rotation is 0 then we can avoid any kind of setTransform call\n            context.drawImage(texture.baseTexture.source,\n                                 frame.x,\n                                 frame.y,\n                                 frame.width,\n                                 frame.height,\n                                 ((child.anchor.x) * (-frame.width * child.scale.x) + child.position.x + 0.5 + renderSession.shakeX) | 0,\n                                 ((child.anchor.y) * (-frame.height * child.scale.y) + child.position.y + 0.5 + renderSession.shakeY) | 0,\n                                 frame.width * child.scale.x,\n                                 frame.height * child.scale.y);\n        }\n        else\n        {\n            if (!isRotated) isRotated = true;\n    \n            child.displayObjectUpdateTransform();\n           \n            var childTransform = child.worldTransform;\n            var tx = (childTransform.tx * renderSession.resolution) + renderSession.shakeX;\n            var ty = (childTransform.ty * renderSession.resolution) + renderSession.shakeY;\n\n            // allow for trimming\n           \n            if (renderSession.roundPixels)\n            {\n                context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, tx | 0, ty | 0);\n            }\n            else\n            {\n                context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, tx, ty);\n            }\n\n            context.drawImage(texture.baseTexture.source,\n                                 frame.x,\n                                 frame.y,\n                                 frame.width,\n                                 frame.height,\n                                 ((child.anchor.x) * (-frame.width) + 0.5) | 0,\n                                 ((child.anchor.y) * (-frame.height) + 0.5) | 0,\n                                 frame.width,\n                                 frame.height);\n        }\n    }\n\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n \n/**\n * Converts a hex color number to an [R, G, B] array\n *\n * @method hex2rgb\n * @param hex {Number}\n */\nPIXI.hex2rgb = function(hex) {\n    return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];\n};\n\n/**\n * Converts a color as an [R, G, B] array to a hex number\n *\n * @method rgb2hex\n * @param rgb {Array}\n */\nPIXI.rgb2hex = function(rgb) {\n    return ((rgb[0]*255 << 16) + (rgb[1]*255 << 8) + rgb[2]*255);\n};\n\n/**\n * Checks whether the Canvas BlendModes are supported by the current browser for drawImage\n *\n * @method canUseNewCanvasBlendModes\n * @return {Boolean} whether they are supported\n */\nPIXI.canUseNewCanvasBlendModes = function()\n{\n    if (document === undefined) return false;\n\n    var pngHead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/';\n    var pngEnd = 'AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';\n\n    var magenta = new Image();\n    magenta.src = pngHead + 'AP804Oa6' + pngEnd;\n\n    var yellow = new Image();\n    yellow.src = pngHead + '/wCKxvRF' + pngEnd;\n\n    var canvas = PIXI.CanvasPool.create(this, 6, 1);\n    var context = canvas.getContext('2d');\n    context.globalCompositeOperation = 'multiply';\n    context.drawImage(magenta, 0, 0);\n    context.drawImage(yellow, 2, 0);\n\n    if (!context.getImageData(2,0,1,1))\n    {\n        return false;\n    }\n\n    var data = context.getImageData(2,0,1,1).data;\n\n    PIXI.CanvasPool.remove(this);\n\n    return (data[0] === 255 && data[1] === 0 && data[2] === 0);\n\n};\n\n/**\n * Given a number, this function returns the closest number that is a power of two\n * this function is taken from Starling Framework as its pretty neat ;)\n *\n * @method getNextPowerOfTwo\n * @param number {Number}\n * @return {Number} the closest number that is a power of two\n */\nPIXI.getNextPowerOfTwo = function(number)\n{\n    if (number > 0 && (number & (number - 1)) === 0) // see: http://goo.gl/D9kPj\n        return number;\n    else\n    {\n        var result = 1;\n        while (result < number) result <<= 1;\n        return result;\n    }\n};\n\n/**\n * checks if the given width and height make a power of two texture\n * @method isPowerOfTwo\n * @param width {Number}\n * @param height {Number}\n * @return {Boolean} \n */\nPIXI.isPowerOfTwo = function(width, height)\n{\n    return (width > 0 && (width & (width - 1)) === 0 && height > 0 && (height & (height - 1)) === 0);\n\n};\n\r\n/**\n* @author       Richard Davey <rich@photonstorm.com>\n* @copyright    2016 Photon Storm Ltd.\n* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}\n*/\n\n/**\n* The CanvasPool is a global static object that allows Pixi and Phaser to pool canvas DOM elements.\n*\n* @class CanvasPool\n* @static\n*/\nPIXI.CanvasPool = {\n\n    /**\n    * Creates a new Canvas DOM element, or pulls one from the pool if free.\n    * \n    * @method create\n    * @static\n    * @param parent {any} The parent of the canvas element.\n    * @param width {number} The width of the canvas element.\n    * @param height {number} The height of the canvas element.\n    * @return {HTMLCanvasElement} The canvas element.\n    */\n    create: function (parent, width, height) {\n\n        var idx = PIXI.CanvasPool.getFirst();\n        var canvas;\n\n        if (idx === -1)\n        {\n            var container = {\n                parent: parent,\n                canvas: document.createElement('canvas')\n            }\n\n            PIXI.CanvasPool.pool.push(container);\n\n            canvas = container.canvas;\n        }\n        else\n        {\n            PIXI.CanvasPool.pool[idx].parent = parent;\n\n            canvas = PIXI.CanvasPool.pool[idx].canvas;\n        }\n\n        if (width !== undefined)\n        {\n            canvas.width = width;\n            canvas.height = height;\n        }\n\n        return canvas;\n\n    },\n\n    /**\n    * Gets the first free canvas index from the pool.\n    * \n    * @method getFirst\n    * @static\n    * @return {number}\n    */\n    getFirst: function () {\n\n        var pool = PIXI.CanvasPool.pool;\n\n        for (var i = 0; i < pool.length; i++)\n        {\n            if (!pool[i].parent)\n            {\n                return i;\n            }\n        }\n\n        return -1;\n\n    },\n\n    /**\n    * Removes the parent from a canvas element from the pool, freeing it up for re-use.\n    * \n    * @method remove\n    * @param parent {any} The parent of the canvas element.\n    * @static\n    */\n    remove: function (parent) {\n\n        var pool = PIXI.CanvasPool.pool;\n\n        for (var i = 0; i < pool.length; i++)\n        {\n            if (pool[i].parent === parent)\n            {\n                pool[i].parent = null;\n                pool[i].canvas.width = 1;\n                pool[i].canvas.height = 1;\n            }\n        }\n\n    },\n\n    /**\n    * Removes the parent from a canvas element from the pool, freeing it up for re-use.\n    * \n    * @method removeByCanvas\n    * @param canvas {HTMLCanvasElement} The canvas element to remove\n    * @static\n    */\n    removeByCanvas: function (canvas) {\n\n        var pool = PIXI.CanvasPool.pool;\n\n        for (var i = 0; i < pool.length; i++)\n        {\n            if (pool[i].canvas === canvas)\n            {\n                pool[i].parent = null;\n                pool[i].canvas.width = 1;\n                pool[i].canvas.height = 1;\n            }\n        }\n\n    },\n\n    /**\n    * Gets the total number of used canvas elements in the pool.\n    * \n    * @method getTotal\n    * @static\n    * @return {number} The number of in-use (parented) canvas elements in the pool.\n    */\n    getTotal: function () {\n\n        var pool = PIXI.CanvasPool.pool;\n        var c = 0;\n\n        for (var i = 0; i < pool.length; i++)\n        {\n            if (pool[i].parent)\n            {\n                c++;\n            }\n        }\n\n        return c;\n\n    },\n\n    /**\n    * Gets the total number of free canvas elements in the pool.\n    * \n    * @method getFree\n    * @static\n    * @return {number} The number of free (un-parented) canvas elements in the pool.\n    */\n    getFree: function () {\n\n        var pool = PIXI.CanvasPool.pool;\n        var c = 0;\n\n        for (var i = 0; i < pool.length; i++)\n        {\n            if (!pool[i].parent)\n            {\n                c++;\n            }\n        }\n\n        return c;\n\n    }\n\n};\n\n/**\n * The pool into which the canvas dom elements are placed.\n *\n * @property pool\n * @type Array\n * @static\n */\nPIXI.CanvasPool.pool = [];\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @method initDefaultShaders\n* @static\n* @private\n*/\nPIXI.initDefaultShaders = function()\n{\n};\n\n/**\n* @method CompileVertexShader\n* @static\n* @param gl {WebGLContext} the current WebGL drawing context\n* @param shaderSrc {Array}\n* @return {Any}\n*/\nPIXI.CompileVertexShader = function(gl, shaderSrc)\n{\n    return PIXI._CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);\n};\n\n/**\n* @method CompileFragmentShader\n* @static\n* @param gl {WebGLContext} the current WebGL drawing context\n* @param shaderSrc {Array}\n* @return {Any}\n*/\nPIXI.CompileFragmentShader = function(gl, shaderSrc)\n{\n    return PIXI._CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);\n};\n\n/**\n* @method _CompileShader\n* @static\n* @private\n* @param gl {WebGLContext} the current WebGL drawing context\n* @param shaderSrc {Array}\n* @param shaderType {Number}\n* @return {Any}\n*/\nPIXI._CompileShader = function(gl, shaderSrc, shaderType)\n{\n    var src = shaderSrc;\n\n    if (Array.isArray(shaderSrc))\n    {\n        src = shaderSrc.join(\"\\n\");\n    }\n\n    var shader = gl.createShader(shaderType);\n    gl.shaderSource(shader, src);\n    gl.compileShader(shader);\n\n    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))\n    {\n        window.console.log(gl.getShaderInfoLog(shader));\n        return null;\n    }\n\n    return shader;\n};\n\n/**\n* @method compileProgram\n* @static\n* @param gl {WebGLContext} the current WebGL drawing context\n* @param vertexSrc {Array}\n* @param fragmentSrc {Array}\n* @return {Any}\n*/\nPIXI.compileProgram = function(gl, vertexSrc, fragmentSrc)\n{\n    var fragmentShader = PIXI.CompileFragmentShader(gl, fragmentSrc);\n    var vertexShader = PIXI.CompileVertexShader(gl, vertexSrc);\n\n    var shaderProgram = gl.createProgram();\n\n    gl.attachShader(shaderProgram, vertexShader);\n    gl.attachShader(shaderProgram, fragmentShader);\n    gl.linkProgram(shaderProgram);\n\n    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))\n    {\n        window.console.log(gl.getProgramInfoLog(shaderProgram));\n        window.console.log(\"Could not initialise shaders\");\n    }\n\n    return shaderProgram;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n * @author Richard Davey http://www.photonstorm.com @photonstorm\n */\n\n/**\n* @class PixiShader\n* @constructor\n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.PixiShader = function(gl)\n{\n    /**\n     * @property _UID\n     * @type Number\n     * @private\n     */\n    this._UID = PIXI._UID++;\n\n    /**\n     * @property gl\n     * @type WebGLContext\n     */\n    this.gl = gl;\n\n    /**\n     * The WebGL program.\n     * @property program\n     * @type Any\n     */\n    this.program = null;\n\n    /**\n     * The fragment shader.\n     * @property fragmentSrc\n     * @type Array\n     */\n    this.fragmentSrc = [\n        'precision lowp float;',\n        'varying vec2 vTextureCoord;',\n        'varying vec4 vColor;',\n        'uniform sampler2D uSampler;',\n        'void main(void) {',\n        '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',\n        '}'\n    ];\n\n    /**\n     * A local texture counter for multi-texture shaders.\n     * @property textureCount\n     * @type Number\n     */\n    this.textureCount = 0;\n\n    /**\n     * A local flag\n     * @property firstRun\n     * @type Boolean\n     * @private\n     */\n    this.firstRun = true;\n\n    /**\n     * A dirty flag\n     * @property dirty\n     * @type Boolean\n     */\n    this.dirty = true;\n\n    /**\n     * Uniform attributes cache.\n     * @property attributes\n     * @type Array\n     * @private\n     */\n    this.attributes = [];\n\n    this.init();\n};\n\nPIXI.PixiShader.prototype.constructor = PIXI.PixiShader;\n\n/**\n* Initialises the shader.\n*\n* @method init\n*/\nPIXI.PixiShader.prototype.init = function()\n{\n    var gl = this.gl;\n\n    var program = PIXI.compileProgram(gl, this.vertexSrc || PIXI.PixiShader.defaultVertexSrc, this.fragmentSrc);\n\n    gl.useProgram(program);\n\n    // get and store the uniforms for the shader\n    this.uSampler = gl.getUniformLocation(program, 'uSampler');\n    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');\n    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');\n    this.dimensions = gl.getUniformLocation(program, 'dimensions');\n\n    // get and store the attributes\n    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');\n    this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');\n    this.colorAttribute = gl.getAttribLocation(program, 'aColor');\n\n    // Begin worst hack eva //\n\n    // WHY??? ONLY on my chrome pixel the line above returns -1 when using filters?\n    // maybe its something to do with the current state of the gl context.\n    // I'm convinced this is a bug in the chrome browser as there is NO reason why this should be returning -1 especially as it only manifests on my chrome pixel\n    // If theres any webGL people that know why could happen please help :)\n    if(this.colorAttribute === -1)\n    {\n        this.colorAttribute = 2;\n    }\n\n    this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];\n\n    // End worst hack eva //\n\n    // add those custom shaders!\n    for (var key in this.uniforms)\n    {\n        // get the uniform locations..\n        this.uniforms[key].uniformLocation = gl.getUniformLocation(program, key);\n    }\n\n    this.initUniforms();\n\n    this.program = program;\n};\n\n/**\n* Initialises the shader uniform values.\n*\n* Uniforms are specified in the GLSL_ES Specification: http://www.khronos.org/registry/webgl/specs/latest/1.0/\n* http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf\n*\n* @method initUniforms\n*/\nPIXI.PixiShader.prototype.initUniforms = function()\n{\n    this.textureCount = 1;\n    var gl = this.gl;\n    var uniform;\n\n    for (var key in this.uniforms)\n    {\n        uniform = this.uniforms[key];\n\n        var type = uniform.type;\n\n        if (type === 'sampler2D')\n        {\n            uniform._init = false;\n\n            if (uniform.value !== null)\n            {\n                this.initSampler2D(uniform);\n            }\n        }\n        else if (type === 'mat2' || type === 'mat3' || type === 'mat4')\n        {\n            //  These require special handling\n            uniform.glMatrix = true;\n            uniform.glValueLength = 1;\n\n            if (type === 'mat2')\n            {\n                uniform.glFunc = gl.uniformMatrix2fv;\n            }\n            else if (type === 'mat3')\n            {\n                uniform.glFunc = gl.uniformMatrix3fv;\n            }\n            else if (type === 'mat4')\n            {\n                uniform.glFunc = gl.uniformMatrix4fv;\n            }\n        }\n        else\n        {\n            //  GL function reference\n            uniform.glFunc = gl['uniform' + type];\n\n            if (type === '2f' || type === '2i')\n            {\n                uniform.glValueLength = 2;\n            }\n            else if (type === '3f' || type === '3i')\n            {\n                uniform.glValueLength = 3;\n            }\n            else if (type === '4f' || type === '4i')\n            {\n                uniform.glValueLength = 4;\n            }\n            else\n            {\n                uniform.glValueLength = 1;\n            }\n        }\n    }\n\n};\n\n/**\n* Initialises a Sampler2D uniform (which may only be available later on after initUniforms once the texture has loaded)\n*\n* @method initSampler2D\n*/\nPIXI.PixiShader.prototype.initSampler2D = function(uniform)\n{\n    if (!uniform.value || !uniform.value.baseTexture || !uniform.value.baseTexture.hasLoaded)\n    {\n        return;\n    }\n\n    var gl = this.gl;\n\n    gl.activeTexture(gl['TEXTURE' + this.textureCount]);\n    gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);\n\n    //  Extended texture data\n    if (uniform.textureData)\n    {\n        var data = uniform.textureData;\n\n        // GLTexture = mag linear, min linear_mipmap_linear, wrap repeat + gl.generateMipmap(gl.TEXTURE_2D);\n        // GLTextureLinear = mag/min linear, wrap clamp\n        // GLTextureNearestRepeat = mag/min NEAREST, wrap repeat\n        // GLTextureNearest = mag/min nearest, wrap clamp\n        // AudioTexture = whatever + luminance + width 512, height 2, border 0\n        // KeyTexture = whatever + luminance + width 256, height 2, border 0\n\n        //  magFilter can be: gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR or gl.NEAREST\n        //  wrapS/T can be: gl.CLAMP_TO_EDGE or gl.REPEAT\n\n        var magFilter = (data.magFilter) ? data.magFilter : gl.LINEAR;\n        var minFilter = (data.minFilter) ? data.minFilter : gl.LINEAR;\n        var wrapS = (data.wrapS) ? data.wrapS : gl.CLAMP_TO_EDGE;\n        var wrapT = (data.wrapT) ? data.wrapT : gl.CLAMP_TO_EDGE;\n        var format = (data.luminance) ? gl.LUMINANCE : gl.RGBA;\n\n        if (data.repeat)\n        {\n            wrapS = gl.REPEAT;\n            wrapT = gl.REPEAT;\n        }\n\n        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, !!data.flipY);\n\n        if (data.width)\n        {\n            var width = (data.width) ? data.width : 512;\n            var height = (data.height) ? data.height : 2;\n            var border = (data.border) ? data.border : 0;\n\n            // void texImage2D(GLenum target, GLint level, GLenum internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, ArrayBufferView? pixels);\n            gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, border, format, gl.UNSIGNED_BYTE, null);\n        }\n        else\n        {\n            //  void texImage2D(GLenum target, GLint level, GLenum internalformat, GLenum format, GLenum type, ImageData? pixels);\n            gl.texImage2D(gl.TEXTURE_2D, 0, format, gl.RGBA, gl.UNSIGNED_BYTE, uniform.value.baseTexture.source);\n        }\n\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);\n    }\n\n    gl.uniform1i(uniform.uniformLocation, this.textureCount);\n\n    uniform._init = true;\n\n    this.textureCount++;\n\n};\n\n/**\n* Updates the shader uniform values.\n*\n* @method syncUniforms\n*/\nPIXI.PixiShader.prototype.syncUniforms = function()\n{\n    this.textureCount = 1;\n    var uniform;\n    var gl = this.gl;\n\n    //  This would probably be faster in an array and it would guarantee key order\n    for (var key in this.uniforms)\n    {\n        uniform = this.uniforms[key];\n\n        if (uniform.glValueLength === 1)\n        {\n            if (uniform.glMatrix === true)\n            {\n                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.transpose, uniform.value);\n            }\n            else\n            {\n                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value);\n            }\n        }\n        else if (uniform.glValueLength === 2)\n        {\n            uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y);\n        }\n        else if (uniform.glValueLength === 3)\n        {\n            uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z);\n        }\n        else if (uniform.glValueLength === 4)\n        {\n            uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z, uniform.value.w);\n        }\n        else if (uniform.type === 'sampler2D')\n        {\n            if (uniform._init)\n            {\n                gl.activeTexture(gl['TEXTURE' + this.textureCount]);\n\n                if(uniform.value.baseTexture._dirty[gl.id])\n                {\n                    PIXI.instances[gl.id].updateTexture(uniform.value.baseTexture);\n                }\n                else\n                {\n                    // bind the current texture\n                    gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);\n                }\n\n                //  gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id] || PIXI.createWebGLTexture( uniform.value.baseTexture, gl));\n                gl.uniform1i(uniform.uniformLocation, this.textureCount);\n                this.textureCount++;\n            }\n            else\n            {\n                this.initSampler2D(uniform);\n            }\n        }\n    }\n\n};\n\n/**\n* Destroys the shader.\n*\n* @method destroy\n*/\nPIXI.PixiShader.prototype.destroy = function()\n{\n    this.gl.deleteProgram( this.program );\n    this.uniforms = null;\n    this.gl = null;\n\n    this.attributes = null;\n};\n\n/**\n* The Default Vertex shader source.\n*\n* @property defaultVertexSrc\n* @type String\n*/\nPIXI.PixiShader.defaultVertexSrc = [\n    'attribute vec2 aVertexPosition;',\n    'attribute vec2 aTextureCoord;',\n    'attribute vec4 aColor;',\n\n    'uniform vec2 projectionVector;',\n    'uniform vec2 offsetVector;',\n\n    'varying vec2 vTextureCoord;',\n    'varying vec4 vColor;',\n\n    'const vec2 center = vec2(-1.0, 1.0);',\n\n    'void main(void) {',\n    '   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);',\n    '   vTextureCoord = aTextureCoord;',\n    '   vColor = vec4(aColor.rgb * aColor.a, aColor.a);',\n    '}'\n];\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class PixiFastShader\n* @constructor\n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.PixiFastShader = function(gl)\n{\n    /**\n     * @property _UID\n     * @type Number\n     * @private\n     */\n    this._UID = PIXI._UID++;\n    \n    /**\n     * @property gl\n     * @type WebGLContext\n     */\n    this.gl = gl;\n\n    /**\n     * The WebGL program.\n     * @property program\n     * @type Any\n     */\n    this.program = null;\n\n    /**\n     * The fragment shader.\n     * @property fragmentSrc\n     * @type Array\n     */\n    this.fragmentSrc = [\n        'precision lowp float;',\n        'varying vec2 vTextureCoord;',\n        'varying float vColor;',\n        'uniform sampler2D uSampler;',\n        'void main(void) {',\n        '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',\n        '}'\n    ];\n\n    /**\n     * The vertex shader.\n     * @property vertexSrc\n     * @type Array\n     */\n    this.vertexSrc = [\n        'attribute vec2 aVertexPosition;',\n        'attribute vec2 aPositionCoord;',\n        'attribute vec2 aScale;',\n        'attribute float aRotation;',\n        'attribute vec2 aTextureCoord;',\n        'attribute float aColor;',\n\n        'uniform vec2 projectionVector;',\n        'uniform vec2 offsetVector;',\n        'uniform mat3 uMatrix;',\n\n        'varying vec2 vTextureCoord;',\n        'varying float vColor;',\n\n        'const vec2 center = vec2(-1.0, 1.0);',\n\n        'void main(void) {',\n        '   vec2 v;',\n        '   vec2 sv = aVertexPosition * aScale;',\n        '   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);',\n        '   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);',\n        '   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;',\n        '   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);',\n        '   vTextureCoord = aTextureCoord;',\n      //  '   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;',\n        '   vColor = aColor;',\n        '}'\n    ];\n\n    /**\n     * A local texture counter for multi-texture shaders.\n     * @property textureCount\n     * @type Number\n     */\n    this.textureCount = 0;\n    \n    this.init();\n};\n\nPIXI.PixiFastShader.prototype.constructor = PIXI.PixiFastShader;\n\n/**\n* Initialises the shader.\n* \n* @method init\n*/\nPIXI.PixiFastShader.prototype.init = function()\n{\n    var gl = this.gl;\n\n    var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);\n    \n    gl.useProgram(program);\n\n    // get and store the uniforms for the shader\n    this.uSampler = gl.getUniformLocation(program, 'uSampler');\n\n    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');\n    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');\n    this.dimensions = gl.getUniformLocation(program, 'dimensions');\n    this.uMatrix = gl.getUniformLocation(program, 'uMatrix');\n\n    // get and store the attributes\n    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');\n    this.aPositionCoord = gl.getAttribLocation(program, 'aPositionCoord');\n\n    this.aScale = gl.getAttribLocation(program, 'aScale');\n    this.aRotation = gl.getAttribLocation(program, 'aRotation');\n\n    this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');\n    this.colorAttribute = gl.getAttribLocation(program, 'aColor');\n   \n    // Begin worst hack eva //\n\n    // WHY??? ONLY on my chrome pixel the line above returns -1 when using filters?\n    // maybe its somthing to do with the current state of the gl context.\n    // Im convinced this is a bug in the chrome browser as there is NO reason why this should be returning -1 especially as it only manifests on my chrome pixel\n    // If theres any webGL people that know why could happen please help :)\n    if(this.colorAttribute === -1)\n    {\n        this.colorAttribute = 2;\n    }\n\n    this.attributes = [this.aVertexPosition, this.aPositionCoord,  this.aScale, this.aRotation, this.aTextureCoord, this.colorAttribute];\n    \n    // End worst hack eva //\n\n    this.program = program;\n};\n\n/**\n* Destroys the shader.\n* \n* @method destroy\n*/\nPIXI.PixiFastShader.prototype.destroy = function()\n{\n    this.gl.deleteProgram( this.program );\n    this.uniforms = null;\n    this.gl = null;\n\n    this.attributes = null;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class StripShader\n* @constructor\n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.StripShader = function(gl)\n{\n    /**\n     * @property _UID\n     * @type Number\n     * @private\n     */\n    this._UID = PIXI._UID++;\n    \n    /**\n     * @property gl\n     * @type WebGLContext\n     */\n    this.gl = gl;\n\n    /**\n     * The WebGL program.\n     * @property program\n     * @type Any\n     */\n    this.program = null;\n\n    /**\n     * The fragment shader.\n     * @property fragmentSrc\n     * @type Array\n     */\n    this.fragmentSrc = [\n        'precision mediump float;',\n        'varying vec2 vTextureCoord;',\n     //   'varying float vColor;',\n        'uniform float alpha;',\n        'uniform sampler2D uSampler;',\n\n        'void main(void) {',\n        '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * alpha;',\n      //  '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',//gl_FragColor * alpha;',\n        '}'\n    ];\n\n    /**\n     * The vertex shader.\n     * @property vertexSrc\n     * @type Array\n     */\n    this.vertexSrc  = [\n        'attribute vec2 aVertexPosition;',\n        'attribute vec2 aTextureCoord;',\n        'uniform mat3 translationMatrix;',\n        'uniform vec2 projectionVector;',\n        'uniform vec2 offsetVector;',\n      //  'uniform float alpha;',\n       // 'uniform vec3 tint;',\n        'varying vec2 vTextureCoord;',\n      //  'varying vec4 vColor;',\n\n        'void main(void) {',\n        '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',\n        '   v -= offsetVector.xyx;',\n        '   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);',\n        '   vTextureCoord = aTextureCoord;',\n       // '   vColor = aColor * vec4(tint * alpha, alpha);',\n        '}'\n    ];\n\n    this.init();\n};\n\nPIXI.StripShader.prototype.constructor = PIXI.StripShader;\n\n/**\n* Initialises the shader.\n* \n* @method init\n*/\nPIXI.StripShader.prototype.init = function()\n{\n    var gl = this.gl;\n\n    var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);\n    gl.useProgram(program);\n\n    // get and store the uniforms for the shader\n    this.uSampler = gl.getUniformLocation(program, 'uSampler');\n    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');\n    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');\n    this.colorAttribute = gl.getAttribLocation(program, 'aColor');\n    //this.dimensions = gl.getUniformLocation(this.program, 'dimensions');\n\n    // get and store the attributes\n    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');\n    this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');\n\n    this.attributes = [this.aVertexPosition, this.aTextureCoord];\n\n    this.translationMatrix = gl.getUniformLocation(program, 'translationMatrix');\n    this.alpha = gl.getUniformLocation(program, 'alpha');\n\n    this.program = program;\n};\n\n/**\n* Destroys the shader.\n* \n* @method destroy\n*/\nPIXI.StripShader.prototype.destroy = function()\n{\n    this.gl.deleteProgram( this.program );\n    this.uniforms = null;\n    this.gl = null;\n\n    this.attribute = null;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class PrimitiveShader\n* @constructor\n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.PrimitiveShader = function(gl)\n{\n    /**\n     * @property _UID\n     * @type Number\n     * @private\n     */\n    this._UID = PIXI._UID++;\n \n    /**\n     * @property gl\n     * @type WebGLContext\n     */\n    this.gl = gl;\n\n    /**\n     * The WebGL program.\n     * @property program\n     * @type Any\n     */\n    this.program = null;\n\n    /**\n     * The fragment shader.\n     * @property fragmentSrc\n     * @type Array\n     */\n    this.fragmentSrc = [\n        'precision mediump float;',\n        'varying vec4 vColor;',\n\n        'void main(void) {',\n        '   gl_FragColor = vColor;',\n        '}'\n    ];\n\n    /**\n     * The vertex shader.\n     * @property vertexSrc\n     * @type Array\n     */\n    this.vertexSrc  = [\n        'attribute vec2 aVertexPosition;',\n        'attribute vec4 aColor;',\n        'uniform mat3 translationMatrix;',\n        'uniform vec2 projectionVector;',\n        'uniform vec2 offsetVector;',\n        'uniform float alpha;',\n        'uniform float flipY;',\n        'uniform vec3 tint;',\n        'varying vec4 vColor;',\n\n        'void main(void) {',\n        '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',\n        '   v -= offsetVector.xyx;',\n        '   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);',\n        '   vColor = aColor * vec4(tint * alpha, alpha);',\n        '}'\n    ];\n\n    this.init();\n};\n\nPIXI.PrimitiveShader.prototype.constructor = PIXI.PrimitiveShader;\n\n/**\n* Initialises the shader.\n* \n* @method init\n*/\nPIXI.PrimitiveShader.prototype.init = function()\n{\n    var gl = this.gl;\n\n    var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);\n    gl.useProgram(program);\n\n    // get and store the uniforms for the shader\n    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');\n    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');\n    this.tintColor = gl.getUniformLocation(program, 'tint');\n    this.flipY = gl.getUniformLocation(program, 'flipY');\n\n    // get and store the attributes\n    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');\n    this.colorAttribute = gl.getAttribLocation(program, 'aColor');\n\n    this.attributes = [this.aVertexPosition, this.colorAttribute];\n\n    this.translationMatrix = gl.getUniformLocation(program, 'translationMatrix');\n    this.alpha = gl.getUniformLocation(program, 'alpha');\n\n    this.program = program;\n};\n\n/**\n* Destroys the shader.\n* \n* @method destroy\n*/\nPIXI.PrimitiveShader.prototype.destroy = function()\n{\n    this.gl.deleteProgram( this.program );\n    this.uniforms = null;\n    this.gl = null;\n\n    this.attributes = null;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class ComplexPrimitiveShader\n* @constructor\n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.ComplexPrimitiveShader = function(gl)\n{\n    /**\n     * @property _UID\n     * @type Number\n     * @private\n     */\n    this._UID = PIXI._UID++;\n\n    /**\n     * @property gl\n     * @type WebGLContext\n     */\n    this.gl = gl;\n\n    /**\n     * The WebGL program.\n     * @property program\n     * @type Any\n     */\n    this.program = null;\n\n    /**\n     * The fragment shader.\n     * @property fragmentSrc\n     * @type Array\n     */\n    this.fragmentSrc = [\n\n        'precision mediump float;',\n\n        'varying vec4 vColor;',\n\n        'void main(void) {',\n        '   gl_FragColor = vColor;',\n        '}'\n    ];\n\n    /**\n     * The vertex shader.\n     * @property vertexSrc\n     * @type Array\n     */\n    this.vertexSrc  = [\n        'attribute vec2 aVertexPosition;',\n        //'attribute vec4 aColor;',\n        'uniform mat3 translationMatrix;',\n        'uniform vec2 projectionVector;',\n        'uniform vec2 offsetVector;',\n        \n        'uniform vec3 tint;',\n        'uniform float alpha;',\n        'uniform vec3 color;',\n        'uniform float flipY;',\n        'varying vec4 vColor;',\n\n        'void main(void) {',\n        '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',\n        '   v -= offsetVector.xyx;',\n        '   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);',\n        '   vColor = vec4(color * alpha * tint, alpha);',//\" * vec4(tint * alpha, alpha);',\n        '}'\n    ];\n\n    this.init();\n};\n\nPIXI.ComplexPrimitiveShader.prototype.constructor = PIXI.ComplexPrimitiveShader;\n\n/**\n* Initialises the shader.\n* \n* @method init\n*/\nPIXI.ComplexPrimitiveShader.prototype.init = function()\n{\n    var gl = this.gl;\n\n    var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);\n    gl.useProgram(program);\n\n    // get and store the uniforms for the shader\n    this.projectionVector = gl.getUniformLocation(program, 'projectionVector');\n    this.offsetVector = gl.getUniformLocation(program, 'offsetVector');\n    this.tintColor = gl.getUniformLocation(program, 'tint');\n    this.color = gl.getUniformLocation(program, 'color');\n    this.flipY = gl.getUniformLocation(program, 'flipY');\n\n    // get and store the attributes\n    this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');\n   // this.colorAttribute = gl.getAttribLocation(program, 'aColor');\n\n    this.attributes = [this.aVertexPosition, this.colorAttribute];\n\n    this.translationMatrix = gl.getUniformLocation(program, 'translationMatrix');\n    this.alpha = gl.getUniformLocation(program, 'alpha');\n\n    this.program = program;\n};\n\n/**\n* Destroys the shader.\n* \n* @method destroy\n*/\nPIXI.ComplexPrimitiveShader.prototype.destroy = function()\n{\n    this.gl.deleteProgram( this.program );\n    this.uniforms = null;\n    this.gl = null;\n\n    this.attribute = null;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\nPIXI.glContexts = []; // this is where we store the webGL contexts for easy access.\nPIXI.instances = [];\n\n/**\n * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer\n * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.\n * So no need for Sprite Batches or Sprite Clouds.\n * Don't forget to add the view to your DOM or you will not see anything :)\n *\n * @class WebGLRenderer\n * @constructor\n * @param game {Phaser.Game} A reference to the Phaser Game instance\n */\nPIXI.WebGLRenderer = function(game) {\n\n    /**\n    * @property {Phaser.Game} game - A reference to the Phaser Game instance.\n    */\n    this.game = game;\n\n    if (!PIXI.defaultRenderer)\n    {\n        PIXI.defaultRenderer = this;\n    }\n\n    /**\n     * @property type\n     * @type Number\n     */\n    this.type = PIXI.WEBGL_RENDERER;\n\n    /**\n     * The resolution of the renderer\n     *\n     * @property resolution\n     * @type Number\n     * @default 1\n     */\n    this.resolution = game.resolution;\n\n    /**\n     * Whether the render view is transparent\n     *\n     * @property transparent\n     * @type Boolean\n     */\n    this.transparent = game.transparent;\n\n    /**\n     * Whether the render view should be resized automatically\n     *\n     * @property autoResize\n     * @type Boolean\n     */\n    this.autoResize = false;\n\n    /**\n     * The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.\n     *\n     * @property preserveDrawingBuffer\n     * @type Boolean\n     */\n    this.preserveDrawingBuffer = game.preserveDrawingBuffer;\n\n    /**\n     * This sets if the WebGLRenderer will clear the context texture or not before the new render pass. If true:\n     * If the Stage is NOT transparent, Pixi will clear to alpha (0, 0, 0, 0).\n     * If the Stage is transparent, Pixi will clear to the target Stage's background color.\n     * Disable this by setting this to false. For example: if your game has a canvas filling background image, you often don't need this set.\n     *\n     * @property clearBeforeRender\n     * @type Boolean\n     * @default\n     */\n    this.clearBeforeRender = game.clearBeforeRender;\n\n    /**\n     * The width of the canvas view\n     *\n     * @property width\n     * @type Number\n     */\n    this.width = game.width;\n\n    /**\n     * The height of the canvas view\n     *\n     * @property height\n     * @type Number\n     */\n    this.height = game.height;\n\n    /**\n     * The canvas element that everything is drawn to\n     *\n     * @property view\n     * @type HTMLCanvasElement\n     */\n    this.view = game.canvas;\n\n    /**\n     * @property _contextOptions\n     * @type Object\n     * @private\n     */\n    this._contextOptions = {\n        alpha: this.transparent,\n        antialias: game.antialias,\n        premultipliedAlpha: this.transparent && this.transparent !== 'notMultiplied',\n        stencil: true,\n        preserveDrawingBuffer: this.preserveDrawingBuffer\n    };\n\n    /**\n     * @property projection\n     * @type Point\n     */\n    this.projection = new PIXI.Point();\n\n    /**\n     * @property offset\n     * @type Point\n     */\n    this.offset = new PIXI.Point();\n\n    // time to create the render managers! each one focuses on managing a state in webGL\n\n    /**\n     * Deals with managing the shader programs and their attribs\n     * @property shaderManager\n     * @type WebGLShaderManager\n     */\n    this.shaderManager = new PIXI.WebGLShaderManager();\n\n    /**\n     * Manages the rendering of sprites\n     * @property spriteBatch\n     * @type WebGLSpriteBatch\n     */\n    this.spriteBatch = new PIXI.WebGLSpriteBatch();\n\n    /**\n     * Manages the masks using the stencil buffer\n     * @property maskManager\n     * @type WebGLMaskManager\n     */\n    this.maskManager = new PIXI.WebGLMaskManager();\n\n    /**\n     * Manages the filters\n     * @property filterManager\n     * @type WebGLFilterManager\n     */\n    this.filterManager = new PIXI.WebGLFilterManager();\n\n    /**\n     * Manages the stencil buffer\n     * @property stencilManager\n     * @type WebGLStencilManager\n     */\n    this.stencilManager = new PIXI.WebGLStencilManager();\n\n    /**\n     * Manages the blendModes\n     * @property blendModeManager\n     * @type WebGLBlendModeManager\n     */\n    this.blendModeManager = new PIXI.WebGLBlendModeManager();\n\n    /**\n     * @property renderSession\n     * @type Object\n     */\n    this.renderSession = {};\n\n    //  Needed?\n    this.renderSession.game = this.game;\n    this.renderSession.gl = this.gl;\n    this.renderSession.drawCount = 0;\n    this.renderSession.shaderManager = this.shaderManager;\n    this.renderSession.maskManager = this.maskManager;\n    this.renderSession.filterManager = this.filterManager;\n    this.renderSession.blendModeManager = this.blendModeManager;\n    this.renderSession.spriteBatch = this.spriteBatch;\n    this.renderSession.stencilManager = this.stencilManager;\n    this.renderSession.renderer = this;\n    this.renderSession.resolution = this.resolution;\n\n    // time init the context..\n    this.initContext();\n\n    // map some webGL blend modes..\n    this.mapBlendModes();\n\n};\n\n// constructor\nPIXI.WebGLRenderer.prototype.constructor = PIXI.WebGLRenderer;\n\n/**\n* @method initContext\n*/\nPIXI.WebGLRenderer.prototype.initContext = function()\n{\n    var gl = this.view.getContext('webgl', this._contextOptions) || this.view.getContext('experimental-webgl', this._contextOptions);\n\n    this.gl = gl;\n\n    if (!gl) {\n        // fail, not able to get a context\n        throw new Error('This browser does not support webGL. Try using the canvas renderer');\n    }\n\n    this.glContextId = gl.id = PIXI.WebGLRenderer.glContextId++;\n\n    PIXI.glContexts[this.glContextId] = gl;\n\n    PIXI.instances[this.glContextId] = this;\n\n    // set up the default pixi settings..\n    gl.disable(gl.DEPTH_TEST);\n    gl.disable(gl.CULL_FACE);\n    gl.enable(gl.BLEND);\n\n    // need to set the context for all the managers...\n    this.shaderManager.setContext(gl);\n    this.spriteBatch.setContext(gl);\n    this.maskManager.setContext(gl);\n    this.filterManager.setContext(gl);\n    this.blendModeManager.setContext(gl);\n    this.stencilManager.setContext(gl);\n\n    this.renderSession.gl = this.gl;\n\n    // now resize and we are good to go!\n    this.resize(this.width, this.height);\n};\n\n/**\n * Renders the stage to its webGL view\n *\n * @method render\n * @param stage {Stage} the Stage element to be rendered\n */\nPIXI.WebGLRenderer.prototype.render = function(stage)\n{\n    // no point rendering if our context has been blown up!\n    if (this.contextLost)\n    {\n        return;\n    }\n\n    var gl = this.gl;\n\n    // -- Does this need to be set every frame? -- //\n    gl.viewport(0, 0, this.width, this.height);\n\n    // make sure we are bound to the main frame buffer\n    gl.bindFramebuffer(gl.FRAMEBUFFER, null);\n\n    if (this.game.clearBeforeRender)\n    {\n        gl.clearColor(stage._bgColor.r, stage._bgColor.g, stage._bgColor.b, stage._bgColor.a);\n\n        gl.clear(gl.COLOR_BUFFER_BIT);\n    }\n\n    this.offset.x = this.game.camera._shake.x;\n    this.offset.y = this.game.camera._shake.y;\n\n    this.renderDisplayObject(stage, this.projection);\n};\n\n/**\n * Renders a Display Object.\n *\n * @method renderDisplayObject\n * @param displayObject {DisplayObject} The DisplayObject to render\n * @param projection {Point} The projection\n * @param buffer {Array} a standard WebGL buffer\n */\nPIXI.WebGLRenderer.prototype.renderDisplayObject = function(displayObject, projection, buffer, matrix)\n{\n    this.renderSession.blendModeManager.setBlendMode(PIXI.blendModes.NORMAL);\n\n    // reset the render session data..\n    this.renderSession.drawCount = 0;\n\n    // make sure to flip the Y if using a render texture..\n    this.renderSession.flipY = buffer ? -1 : 1;\n\n    // set the default projection\n    this.renderSession.projection = projection;\n\n    //set the default offset\n    this.renderSession.offset = this.offset;\n\n    // start the sprite batch\n    this.spriteBatch.begin(this.renderSession);\n\n    // start the filter manager\n    this.filterManager.begin(this.renderSession, buffer);\n\n    // render the scene!\n    displayObject._renderWebGL(this.renderSession, matrix);\n\n    // finish the sprite batch\n    this.spriteBatch.end();\n};\n\n/**\n * Resizes the webGL view to the specified width and height.\n *\n * @method resize\n * @param width {Number} the new width of the webGL view\n * @param height {Number} the new height of the webGL view\n */\nPIXI.WebGLRenderer.prototype.resize = function(width, height)\n{\n    this.width = width * this.resolution;\n    this.height = height * this.resolution;\n\n    this.view.width = this.width;\n    this.view.height = this.height;\n\n    if (this.autoResize) {\n        this.view.style.width = this.width / this.resolution + 'px';\n        this.view.style.height = this.height / this.resolution + 'px';\n    }\n\n    this.gl.viewport(0, 0, this.width, this.height);\n\n    this.projection.x =  this.width / 2 / this.resolution;\n    this.projection.y =  -this.height / 2 / this.resolution;\n};\n\n/**\n * Updates and Creates a WebGL texture for the renderers context.\n *\n * @method updateTexture\n * @param texture {Texture} the texture to update\n * @return {boolean} True if the texture was successfully bound, otherwise false.\n */\nPIXI.WebGLRenderer.prototype.updateTexture = function(texture)\n{\n    if (!texture.hasLoaded)\n    {\n        return false;\n    }\n\n    var gl = this.gl;\n\n    if (!texture._glTextures[gl.id])\n    {\n        texture._glTextures[gl.id] = gl.createTexture();\n    }\n\n    gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);\n\n    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultipliedAlpha);\n\n    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);\n\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);\n\n    if (texture.mipmap && PIXI.isPowerOfTwo(texture.width, texture.height))\n    {\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST);\n        gl.generateMipmap(gl.TEXTURE_2D);\n    }\n    else\n    {\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);\n    }\n\n    if (!texture._powerOf2)\n    {\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\n    }\n    else\n    {\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);\n    }\n\n    texture._dirty[gl.id] = false;\n\n    // return texture._glTextures[gl.id];\n    return true;\n\n};\n\n/**\n * Removes everything from the renderer (event listeners, spritebatch, etc...)\n *\n * @method destroy\n */\nPIXI.WebGLRenderer.prototype.destroy = function()\n{\n    PIXI.glContexts[this.glContextId] = null;\n\n    this.projection = null;\n    this.offset = null;\n\n    this.shaderManager.destroy();\n    this.spriteBatch.destroy();\n    this.maskManager.destroy();\n    this.filterManager.destroy();\n\n    this.shaderManager = null;\n    this.spriteBatch = null;\n    this.maskManager = null;\n    this.filterManager = null;\n\n    this.gl = null;\n    this.renderSession = null;\n\n    PIXI.CanvasPool.remove(this);\n\n    PIXI.instances[this.glContextId] = null;\n\n    PIXI.WebGLRenderer.glContextId--;\n};\n\n/**\n * Maps Pixi blend modes to WebGL blend modes.\n *\n * @method mapBlendModes\n */\nPIXI.WebGLRenderer.prototype.mapBlendModes = function()\n{\n    var gl = this.gl;\n\n    if (!PIXI.blendModesWebGL)\n    {\n        var b = [];\n        var modes = PIXI.blendModes;\n\n        b[modes.NORMAL]        = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.ADD]           = [gl.SRC_ALPHA, gl.DST_ALPHA];\n        b[modes.MULTIPLY]      = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.SCREEN]        = [gl.SRC_ALPHA, gl.ONE];\n        b[modes.OVERLAY]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.DARKEN]        = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.LIGHTEN]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.COLOR_DODGE]   = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.COLOR_BURN]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.HARD_LIGHT]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.SOFT_LIGHT]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.DIFFERENCE]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.EXCLUSION]     = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.HUE]           = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.SATURATION]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.COLOR]         = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n        b[modes.LUMINOSITY]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];\n\n        PIXI.blendModesWebGL = b;\n    }\n};\n\nPIXI.WebGLRenderer.glContextId = 0;\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class WebGLBlendModeManager\n* @constructor\n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.WebGLBlendModeManager = function()\n{\n    /**\n     * @property currentBlendMode\n     * @type Number\n     */\n    this.currentBlendMode = 99999;\n};\n\nPIXI.WebGLBlendModeManager.prototype.constructor = PIXI.WebGLBlendModeManager;\n\n/**\n * Sets the WebGL Context.\n *\n * @method setContext\n * @param gl {WebGLContext} the current WebGL drawing context\n */\nPIXI.WebGLBlendModeManager.prototype.setContext = function(gl)\n{\n    this.gl = gl;\n};\n\n/**\n* Sets-up the given blendMode from WebGL's point of view.\n* \n* @method setBlendMode \n* @param blendMode {Number} the blendMode, should be a Pixi const, such as PIXI.BlendModes.ADD\n*/\nPIXI.WebGLBlendModeManager.prototype.setBlendMode = function(blendMode)\n{\n    if(this.currentBlendMode === blendMode)return false;\n\n    this.currentBlendMode = blendMode;\n    \n    var blendModeWebGL = PIXI.blendModesWebGL[this.currentBlendMode];\n\n    if (blendModeWebGL)\n    {\n        this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);\n    }\n    \n    return true;\n};\n\n/**\n* Destroys this object.\n* \n* @method destroy\n*/\nPIXI.WebGLBlendModeManager.prototype.destroy = function()\n{\n    this.gl = null;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class WebGLMaskManager\n* @constructor\n* @private\n*/\nPIXI.WebGLMaskManager = function()\n{\n};\n\nPIXI.WebGLMaskManager.prototype.constructor = PIXI.WebGLMaskManager;\n\n/**\n* Sets the drawing context to the one given in parameter.\n* \n* @method setContext \n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.WebGLMaskManager.prototype.setContext = function(gl)\n{\n    this.gl = gl;\n};\n\n/**\n* Applies the Mask and adds it to the current filter stack.\n* \n* @method pushMask\n* @param maskData {Array}\n* @param renderSession {Object}\n*/\nPIXI.WebGLMaskManager.prototype.pushMask = function(maskData, renderSession)\n{\n    var gl = renderSession.gl;\n\n    if (maskData.dirty)\n    {\n        PIXI.WebGLGraphics.updateGraphics(maskData, gl);\n    }\n\n    if (maskData._webGL[gl.id] === undefined || maskData._webGL[gl.id].data === undefined || maskData._webGL[gl.id].data.length === 0)\n    {\n        return;\n    }\n\n    renderSession.stencilManager.pushStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);\n};\n\n/**\n* Removes the last filter from the filter stack and doesn't return it.\n* \n* @method popMask\n* @param maskData {Array}\n* @param renderSession {Object} an object containing all the useful parameters\n*/\nPIXI.WebGLMaskManager.prototype.popMask = function(maskData, renderSession)\n{\n    var gl = this.gl;\n\n    if (maskData._webGL[gl.id] === undefined || maskData._webGL[gl.id].data === undefined || maskData._webGL[gl.id].data.length === 0)\n    {\n        return;\n    }\n\n    renderSession.stencilManager.popStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);\n\n};\n\n/**\n* Destroys the mask stack.\n* \n* @method destroy\n*/\nPIXI.WebGLMaskManager.prototype.destroy = function()\n{\n    this.gl = null;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class WebGLStencilManager\n* @constructor\n* @private\n*/\nPIXI.WebGLStencilManager = function()\n{\n    this.stencilStack = [];\n    this.reverse = true;\n    this.count = 0;\n};\n\n/**\n* Sets the drawing context to the one given in parameter.\n* \n* @method setContext \n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.WebGLStencilManager.prototype.setContext = function(gl)\n{\n    this.gl = gl;\n};\n\n/**\n* Applies the Mask and adds it to the current filter stack.\n* \n* @method pushMask\n* @param graphics {Graphics}\n* @param webGLData {Array}\n* @param renderSession {Object}\n*/\nPIXI.WebGLStencilManager.prototype.pushStencil = function(graphics, webGLData, renderSession)\n{\n    var gl = this.gl;\n    this.bindGraphics(graphics, webGLData, renderSession);\n\n    if(this.stencilStack.length === 0)\n    {\n        gl.enable(gl.STENCIL_TEST);\n        gl.clear(gl.STENCIL_BUFFER_BIT);\n        this.reverse = true;\n        this.count = 0;\n    }\n\n    this.stencilStack.push(webGLData);\n\n    var level = this.count;\n\n    gl.colorMask(false, false, false, false);\n\n    gl.stencilFunc(gl.ALWAYS,0,0xFF);\n    gl.stencilOp(gl.KEEP,gl.KEEP,gl.INVERT);\n\n    // draw the triangle strip!\n\n    if(webGLData.mode === 1)\n    {\n        gl.drawElements(gl.TRIANGLE_FAN,  webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0 );\n       \n        if(this.reverse)\n        {\n            gl.stencilFunc(gl.EQUAL, 0xFF - level, 0xFF);\n            gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);\n        }\n        else\n        {\n            gl.stencilFunc(gl.EQUAL,level, 0xFF);\n            gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);\n        }\n\n        // draw a quad to increment..\n        gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );\n               \n        if(this.reverse)\n        {\n            gl.stencilFunc(gl.EQUAL,0xFF-(level+1), 0xFF);\n        }\n        else\n        {\n            gl.stencilFunc(gl.EQUAL,level+1, 0xFF);\n        }\n\n        this.reverse = !this.reverse;\n    }\n    else\n    {\n        if(!this.reverse)\n        {\n            gl.stencilFunc(gl.EQUAL, 0xFF - level, 0xFF);\n            gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);\n        }\n        else\n        {\n            gl.stencilFunc(gl.EQUAL,level, 0xFF);\n            gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);\n        }\n\n        gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );\n\n        if(!this.reverse)\n        {\n            gl.stencilFunc(gl.EQUAL,0xFF-(level+1), 0xFF);\n        }\n        else\n        {\n            gl.stencilFunc(gl.EQUAL,level+1, 0xFF);\n        }\n    }\n\n    gl.colorMask(true, true, true, true);\n    gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);\n\n    this.count++;\n};\n\n/**\n * TODO this does not belong here!\n * \n * @method bindGraphics\n * @param graphics {Graphics}\n * @param webGLData {Array}\n * @param renderSession {Object}\n */\nPIXI.WebGLStencilManager.prototype.bindGraphics = function(graphics, webGLData, renderSession)\n{\n    //if(this._currentGraphics === graphics)return;\n    this._currentGraphics = graphics;\n\n    var gl = this.gl;\n\n     // bind the graphics object..\n    var projection = renderSession.projection,\n        offset = renderSession.offset,\n        shader;// = renderSession.shaderManager.primitiveShader;\n\n    if(webGLData.mode === 1)\n    {\n        shader = renderSession.shaderManager.complexPrimitiveShader;\n\n        renderSession.shaderManager.setShader( shader );\n\n        gl.uniform1f(shader.flipY, renderSession.flipY);\n       \n        gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));\n\n        gl.uniform2f(shader.projectionVector, projection.x, -projection.y);\n        gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);\n\n        gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));\n        gl.uniform3fv(shader.color, webGLData.color);\n\n        gl.uniform1f(shader.alpha, graphics.worldAlpha * webGLData.alpha);\n\n        gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);\n\n        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 2, 0);\n\n\n        // now do the rest..\n        // set the index buffer!\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);\n    }\n    else\n    {\n        //renderSession.shaderManager.activatePrimitiveShader();\n        shader = renderSession.shaderManager.primitiveShader;\n        renderSession.shaderManager.setShader( shader );\n\n        gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));\n\n        gl.uniform1f(shader.flipY, renderSession.flipY);\n        gl.uniform2f(shader.projectionVector, projection.x, -projection.y);\n        gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);\n\n        gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));\n\n        gl.uniform1f(shader.alpha, graphics.worldAlpha);\n        \n        gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);\n\n        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);\n        gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);\n\n        // set the index buffer!\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);\n    }\n};\n\n/**\n * @method popStencil\n * @param graphics {Graphics}\n * @param webGLData {Array}\n * @param renderSession {Object}\n */\nPIXI.WebGLStencilManager.prototype.popStencil = function(graphics, webGLData, renderSession)\n{\n\tvar gl = this.gl;\n    this.stencilStack.pop();\n   \n    this.count--;\n\n    if(this.stencilStack.length === 0)\n    {\n        // the stack is empty!\n        gl.disable(gl.STENCIL_TEST);\n\n    }\n    else\n    {\n\n        var level = this.count;\n\n        this.bindGraphics(graphics, webGLData, renderSession);\n\n        gl.colorMask(false, false, false, false);\n    \n        if(webGLData.mode === 1)\n        {\n            this.reverse = !this.reverse;\n\n            if(this.reverse)\n            {\n                gl.stencilFunc(gl.EQUAL, 0xFF - (level+1), 0xFF);\n                gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);\n            }\n            else\n            {\n                gl.stencilFunc(gl.EQUAL,level+1, 0xFF);\n                gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);\n            }\n\n            // draw a quad to increment..\n            gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );\n            \n            gl.stencilFunc(gl.ALWAYS,0,0xFF);\n            gl.stencilOp(gl.KEEP,gl.KEEP,gl.INVERT);\n\n            // draw the triangle strip!\n            gl.drawElements(gl.TRIANGLE_FAN,  webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0 );\n           \n            if(!this.reverse)\n            {\n                gl.stencilFunc(gl.EQUAL,0xFF-(level), 0xFF);\n            }\n            else\n            {\n                gl.stencilFunc(gl.EQUAL,level, 0xFF);\n            }\n\n        }\n        else\n        {\n          //  console.log(\"<<>>\")\n            if(!this.reverse)\n            {\n                gl.stencilFunc(gl.EQUAL, 0xFF - (level+1), 0xFF);\n                gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);\n            }\n            else\n            {\n                gl.stencilFunc(gl.EQUAL,level+1, 0xFF);\n                gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);\n            }\n\n            gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );\n\n            if(!this.reverse)\n            {\n                gl.stencilFunc(gl.EQUAL,0xFF-(level), 0xFF);\n            }\n            else\n            {\n                gl.stencilFunc(gl.EQUAL,level, 0xFF);\n            }\n        }\n\n        gl.colorMask(true, true, true, true);\n        gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);\n\n\n    }\n};\n\n/**\n* Destroys the mask stack.\n* \n* @method destroy\n*/\nPIXI.WebGLStencilManager.prototype.destroy = function()\n{\n    this.stencilStack = null;\n    this.gl = null;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class WebGLShaderManager\n* @constructor\n* @private\n*/\nPIXI.WebGLShaderManager = function()\n{\n    /**\n     * @property maxAttibs\n     * @type Number\n     */\n    this.maxAttibs = 10;\n\n    /**\n     * @property attribState\n     * @type Array\n     */\n    this.attribState = [];\n\n    /**\n     * @property tempAttribState\n     * @type Array\n     */\n    this.tempAttribState = [];\n\n    for (var i = 0; i < this.maxAttibs; i++)\n    {\n        this.attribState[i] = false;\n    }\n\n    /**\n     * @property stack\n     * @type Array\n     */\n    this.stack = [];\n\n};\n\nPIXI.WebGLShaderManager.prototype.constructor = PIXI.WebGLShaderManager;\n\n/**\n* Initialises the context and the properties.\n* \n* @method setContext \n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.WebGLShaderManager.prototype.setContext = function(gl)\n{\n    this.gl = gl;\n    \n    // the next one is used for rendering primitives\n    this.primitiveShader = new PIXI.PrimitiveShader(gl);\n\n    // the next one is used for rendering triangle strips\n    this.complexPrimitiveShader = new PIXI.ComplexPrimitiveShader(gl);\n\n    // this shader is used for the default sprite rendering\n    this.defaultShader = new PIXI.PixiShader(gl);\n\n    // this shader is used for the fast sprite rendering\n    this.fastShader = new PIXI.PixiFastShader(gl);\n\n    // the next one is used for rendering triangle strips\n    this.stripShader = new PIXI.StripShader(gl);\n\n    this.setShader(this.defaultShader);\n};\n\n/**\n* Takes the attributes given in parameters.\n* \n* @method setAttribs\n* @param attribs {Array} attribs \n*/\nPIXI.WebGLShaderManager.prototype.setAttribs = function(attribs)\n{\n    // reset temp state\n    var i;\n\n    for (i = 0; i < this.tempAttribState.length; i++)\n    {\n        this.tempAttribState[i] = false;\n    }\n\n    // set the new attribs\n    for (i = 0; i < attribs.length; i++)\n    {\n        var attribId = attribs[i];\n        this.tempAttribState[attribId] = true;\n    }\n\n    var gl = this.gl;\n\n    for (i = 0; i < this.attribState.length; i++)\n    {\n        if(this.attribState[i] !== this.tempAttribState[i])\n        {\n            this.attribState[i] = this.tempAttribState[i];\n\n            if(this.tempAttribState[i])\n            {\n                gl.enableVertexAttribArray(i);\n            }\n            else\n            {\n                gl.disableVertexAttribArray(i);\n            }\n        }\n    }\n};\n\n/**\n* Sets the current shader.\n* \n* @method setShader\n* @param shader {Any}\n*/\nPIXI.WebGLShaderManager.prototype.setShader = function(shader)\n{\n    if(this._currentId === shader._UID)return false;\n    \n    this._currentId = shader._UID;\n\n    this.currentShader = shader;\n\n    this.gl.useProgram(shader.program);\n    this.setAttribs(shader.attributes);\n\n    return true;\n};\n\n/**\n* Destroys this object.\n* \n* @method destroy\n*/\nPIXI.WebGLShaderManager.prototype.destroy = function()\n{\n    this.attribState = null;\n\n    this.tempAttribState = null;\n\n    this.primitiveShader.destroy();\n\n    this.complexPrimitiveShader.destroy();\n\n    this.defaultShader.destroy();\n\n    this.fastShader.destroy();\n\n    this.stripShader.destroy();\n\n    this.gl = null;\n};\n\r\n/**\n * @author Mat Groves\n * \n * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/\n * for creating the original pixi version!\n * Also a thanks to https://github.com/bchevalier for tweaking the tint and alpha so that they now share 4 bytes on the vertex buffer\n * \n * Heavily inspired by LibGDX's WebGLSpriteBatch:\n * https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/WebGLSpriteBatch.java\n */\n\n /**\n *\n * @class WebGLSpriteBatch\n * @private\n * @constructor\n */\nPIXI.WebGLSpriteBatch = function()\n{\n    /**\n     * @property vertSize\n     * @type Number\n     */\n    this.vertSize = 5;\n\n    /**\n     * The number of images in the SpriteBatch before it flushes\n     * @property size\n     * @type Number\n     */\n    this.size = 2000;//Math.pow(2, 16) /  this.vertSize;\n\n    //the total number of bytes in our batch\n    var numVerts = this.size * 4 * 4 * this.vertSize;\n    //the total number of indices in our batch\n    var numIndices = this.size * 6;\n\n    /**\n    * Holds the vertices\n    *\n    * @property vertices\n    * @type ArrayBuffer\n    */\n    this.vertices = new PIXI.ArrayBuffer(numVerts);\n\n    /**\n    * View on the vertices as a Float32Array\n    *\n    * @property positions\n    * @type Float32Array\n    */\n    this.positions = new PIXI.Float32Array(this.vertices);\n\n    /**\n    * View on the vertices as a Uint32Array\n    *\n    * @property colors\n    * @type Uint32Array\n    */\n    this.colors = new PIXI.Uint32Array(this.vertices);\n\n    /**\n     * Holds the indices\n     *\n     * @property indices\n     * @type Uint16Array\n     */\n    this.indices = new PIXI.Uint16Array(numIndices);\n    \n    /**\n     * @property lastIndexCount\n     * @type Number\n     */\n    this.lastIndexCount = 0;\n\n    for (var i=0, j=0; i < numIndices; i += 6, j += 4)\n    {\n        this.indices[i + 0] = j + 0;\n        this.indices[i + 1] = j + 1;\n        this.indices[i + 2] = j + 2;\n        this.indices[i + 3] = j + 0;\n        this.indices[i + 4] = j + 2;\n        this.indices[i + 5] = j + 3;\n    }\n\n    /**\n     * @property drawing\n     * @type Boolean\n     */\n    this.drawing = false;\n\n    /**\n     * @property currentBatchSize\n     * @type Number\n     */\n    this.currentBatchSize = 0;\n\n    /**\n     * @property currentBaseTexture\n     * @type BaseTexture\n     */\n    this.currentBaseTexture = null;\n\n    /**\n     * @property dirty\n     * @type Boolean\n     */\n    this.dirty = true;\n\n    /**\n     * @property textures\n     * @type Array\n     */\n    this.textures = [];\n\n    /**\n     * @property blendModes\n     * @type Array\n     */\n    this.blendModes = [];\n\n    /**\n     * @property shaders\n     * @type Array\n     */\n    this.shaders = [];\n\n    /**\n     * @property sprites\n     * @type Array\n     */\n    this.sprites = [];\n\n    /**\n     * @property defaultShader\n     * @type AbstractFilter\n     */\n    this.defaultShader = new PIXI.AbstractFilter([\n        'precision lowp float;',\n        'varying vec2 vTextureCoord;',\n        'varying vec4 vColor;',\n        'uniform sampler2D uSampler;',\n        'void main(void) {',\n        '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',\n        '}'\n    ]);\n};\n\n/**\n* @method setContext\n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.WebGLSpriteBatch.prototype.setContext = function(gl)\n{\n    this.gl = gl;\n\n    // create a couple of buffers\n    this.vertexBuffer = gl.createBuffer();\n    this.indexBuffer = gl.createBuffer();\n\n    // 65535 is max index, so 65535 / 6 = 10922.\n\n    //upload the index data\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);\n    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);\n\n    this.currentBlendMode = 99999;\n\n    var shader = new PIXI.PixiShader(gl);\n\n    shader.fragmentSrc = this.defaultShader.fragmentSrc;\n    shader.uniforms = {};\n    shader.init();\n\n    this.defaultShader.shaders[gl.id] = shader;\n};\n\n/**\n* @method begin\n* @param renderSession {Object} The RenderSession object\n*/\nPIXI.WebGLSpriteBatch.prototype.begin = function(renderSession)\n{\n    this.renderSession = renderSession;\n    this.shader = this.renderSession.shaderManager.defaultShader;\n\n    this.start();\n};\n\n/**\n* @method end\n*/\nPIXI.WebGLSpriteBatch.prototype.end = function()\n{\n    this.flush();\n};\n\n/**\n* @method render\n* @param sprite {Sprite} the sprite to render when using this spritebatch\n* @param {Matrix} [matrix] - Optional matrix. If provided the Display Object will be rendered using this matrix, otherwise it will use its worldTransform.\n*/\nPIXI.WebGLSpriteBatch.prototype.render = function(sprite, matrix)\n{\n    var texture = sprite.texture;\n\n    //  They provided an alternative rendering matrix, so use it\n    var wt = sprite.worldTransform;\n\n    if (matrix)\n    {\n        wt = matrix;\n    }\n\n    // check texture..\n    if (this.currentBatchSize >= this.size)\n    {\n        this.flush();\n        this.currentBaseTexture = texture.baseTexture;\n    }\n\n    // get the uvs for the texture\n    var uvs = texture._uvs;\n\n    // if the uvs have not updated then no point rendering just yet!\n    if (!uvs)\n    {\n        return;\n    }\n\n    var aX = sprite.anchor.x;\n    var aY = sprite.anchor.y;\n\n    var w0, w1, h0, h1;\n        \n    if (texture.trim)\n    {\n        // if the sprite is trimmed then we need to add the extra space before transforming the sprite coords.\n        var trim = texture.trim;\n\n        w1 = trim.x - aX * trim.width;\n        w0 = w1 + texture.crop.width;\n\n        h1 = trim.y - aY * trim.height;\n        h0 = h1 + texture.crop.height;\n    }\n    else\n    {\n        w0 = (texture.frame.width) * (1-aX);\n        w1 = (texture.frame.width) * -aX;\n\n        h0 = texture.frame.height * (1-aY);\n        h1 = texture.frame.height * -aY;\n    }\n\n    var i = this.currentBatchSize * 4 * this.vertSize;\n    var resolution = texture.baseTexture.resolution;\n\n    var a = wt.a / resolution;\n    var b = wt.b / resolution;\n    var c = wt.c / resolution;\n    var d = wt.d / resolution;\n    var tx = wt.tx;\n    var ty = wt.ty;\n\n    var colors = this.colors;\n    var positions = this.positions;\n\n    if (this.renderSession.roundPixels)\n    {\n        // xy\n        positions[i] = a * w1 + c * h1 + tx | 0;\n        positions[i+1] = d * h1 + b * w1 + ty | 0;\n\n        // xy\n        positions[i+5] = a * w0 + c * h1 + tx | 0;\n        positions[i+6] = d * h1 + b * w0 + ty | 0;\n\n         // xy\n        positions[i+10] = a * w0 + c * h0 + tx | 0;\n        positions[i+11] = d * h0 + b * w0 + ty | 0;\n\n        // xy\n        positions[i+15] = a * w1 + c * h0 + tx | 0;\n        positions[i+16] = d * h0 + b * w1 + ty | 0;\n    }\n    else\n    {\n        // xy\n        positions[i] = a * w1 + c * h1 + tx;\n        positions[i+1] = d * h1 + b * w1 + ty;\n\n        // xy\n        positions[i+5] = a * w0 + c * h1 + tx;\n        positions[i+6] = d * h1 + b * w0 + ty;\n\n         // xy\n        positions[i+10] = a * w0 + c * h0 + tx;\n        positions[i+11] = d * h0 + b * w0 + ty;\n\n        // xy\n        positions[i+15] = a * w1 + c * h0 + tx;\n        positions[i+16] = d * h0 + b * w1 + ty;\n    }\n    \n    // uv\n    positions[i+2] = uvs.x0;\n    positions[i+3] = uvs.y0;\n\n    // uv\n    positions[i+7] = uvs.x1;\n    positions[i+8] = uvs.y1;\n\n     // uv\n    positions[i+12] = uvs.x2;\n    positions[i+13] = uvs.y2;\n\n    // uv\n    positions[i+17] = uvs.x3;\n    positions[i+18] = uvs.y3;\n\n    // color and alpha\n    var tint = sprite.tint;\n\n    colors[i+4] = colors[i+9] = colors[i+14] = colors[i+19] = (tint >> 16) + (tint & 0xff00) + ((tint & 0xff) << 16) + (sprite.worldAlpha * 255 << 24);\n\n    // increment the batchsize\n    this.sprites[this.currentBatchSize++] = sprite;\n\n};\n\n/**\n* Renders a TilingSprite using the spriteBatch.\n* \n* @method renderTilingSprite\n* @param sprite {TilingSprite} the sprite to render\n*/\nPIXI.WebGLSpriteBatch.prototype.renderTilingSprite = function(sprite)\n{\n    var texture = sprite.tilingTexture;\n\n    // check texture..\n    if (this.currentBatchSize >= this.size)\n    {\n        this.flush();\n        this.currentBaseTexture = texture.baseTexture;\n    }\n\n    // set the textures uvs temporarily\n    if (!sprite._uvs)\n    {\n        sprite._uvs = new PIXI.TextureUvs();\n    }\n\n    var uvs = sprite._uvs;\n\n    var w = texture.baseTexture.width;\n    var h = texture.baseTexture.height;\n\n    // var w = sprite._frame.sourceSizeW;\n    // var h = sprite._frame.sourceSizeH;\n\n    // w = 16;\n    // h = 16;\n\n    sprite.tilePosition.x %= w * sprite.tileScaleOffset.x;\n    sprite.tilePosition.y %= h * sprite.tileScaleOffset.y;\n\n    var offsetX = sprite.tilePosition.x / (w * sprite.tileScaleOffset.x);\n    var offsetY = sprite.tilePosition.y / (h * sprite.tileScaleOffset.y);\n\n    var scaleX = (sprite.width / w) / (sprite.tileScale.x * sprite.tileScaleOffset.x);\n    var scaleY = (sprite.height / h) / (sprite.tileScale.y * sprite.tileScaleOffset.y);\n\n    uvs.x0 = 0 - offsetX;\n    uvs.y0 = 0 - offsetY;\n\n    uvs.x1 = (1 * scaleX) - offsetX;\n    uvs.y1 = 0 - offsetY;\n\n    uvs.x2 = (1 * scaleX) - offsetX;\n    uvs.y2 = (1 * scaleY) - offsetY;\n\n    uvs.x3 = 0 - offsetX;\n    uvs.y3 = (1 * scaleY) - offsetY;\n\n    //  Get the sprites current alpha and tint and combine them into a single color\n    var tint = sprite.tint;\n    var color = (tint >> 16) + (tint & 0xff00) + ((tint & 0xff) << 16) + (sprite.worldAlpha * 255 << 24);\n\n    var positions = this.positions;\n    var colors = this.colors;\n\n    var width = sprite.width;\n    var height = sprite.height;\n\n    // TODO trim??\n    var aX = sprite.anchor.x;\n    var aY = sprite.anchor.y;\n    var w0 = width * (1-aX);\n    var w1 = width * -aX;\n\n    var h0 = height * (1-aY);\n    var h1 = height * -aY;\n\n    var i = this.currentBatchSize * 4 * this.vertSize;\n\n    var resolution = texture.baseTexture.resolution;\n\n    var wt = sprite.worldTransform;\n\n    var a = wt.a / resolution;\n    var b = wt.b / resolution;\n    var c = wt.c / resolution;\n    var d = wt.d / resolution;\n    var tx = wt.tx;\n    var ty = wt.ty;\n\n    // xy\n    positions[i++] = a * w1 + c * h1 + tx;\n    positions[i++] = d * h1 + b * w1 + ty;\n    // uv\n    positions[i++] = uvs.x0;\n    positions[i++] = uvs.y0;\n    // color\n    colors[i++] = color;\n\n    // xy\n    positions[i++] = (a * w0 + c * h1 + tx);\n    positions[i++] = d * h1 + b * w0 + ty;\n    // uv\n    positions[i++] = uvs.x1;\n    positions[i++] = uvs.y1;\n    // color\n    colors[i++] = color;\n    \n    // xy\n    positions[i++] = a * w0 + c * h0 + tx;\n    positions[i++] = d * h0 + b * w0 + ty;\n    // uv\n    positions[i++] = uvs.x2;\n    positions[i++] = uvs.y2;\n    // color\n    colors[i++] = color;\n\n    // xy\n    positions[i++] = a * w1 + c * h0 + tx;\n    positions[i++] = d * h0 + b * w1 + ty;\n    // uv\n    positions[i++] = uvs.x3;\n    positions[i++] = uvs.y3;\n    // color\n    colors[i++] = color;\n\n    // increment the batchsize\n    this.sprites[this.currentBatchSize++] = sprite;\n};\n\n/**\n* Renders the content and empties the current batch.\n*\n* @method flush\n*/\nPIXI.WebGLSpriteBatch.prototype.flush = function()\n{\n    // If the batch is length 0 then return as there is nothing to draw\n    if (this.currentBatchSize === 0)\n    {\n        return;\n    }\n\n    var gl = this.gl;\n    var shader;\n\n    if (this.dirty)\n    {\n        this.dirty = false;\n\n        // bind the main texture\n        gl.activeTexture(gl.TEXTURE0);\n\n        // bind the buffers\n        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);\n\n        shader = this.defaultShader.shaders[gl.id];\n\n        // this is the same for each shader?\n        var stride = this.vertSize * 4;\n        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);\n        gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, stride, 2 * 4);\n\n        // color attributes will be interpreted as unsigned bytes and normalized\n        gl.vertexAttribPointer(shader.colorAttribute, 4, gl.UNSIGNED_BYTE, true, stride, 4 * 4);\n    }\n\n    // upload the verts to the buffer  \n    if (this.currentBatchSize > (this.size * 0.5))\n    {\n        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);\n    }\n    else\n    {\n        var view = this.positions.subarray(0, this.currentBatchSize * 4 * this.vertSize);\n        gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);\n    }\n\n    var nextTexture, nextBlendMode, nextShader;\n    var batchSize = 0;\n    var start = 0;\n\n    var currentBaseTexture = null;\n    var currentBlendMode = this.renderSession.blendModeManager.currentBlendMode;\n    var currentShader = null;\n\n    var blendSwap = false;\n    var shaderSwap = false;\n    var sprite;\n\n    for (var i = 0, j = this.currentBatchSize; i < j; i++) {\n        \n        sprite = this.sprites[i];\n\n        if (sprite.tilingTexture)\n        {\n            nextTexture = sprite.tilingTexture.baseTexture;\n        }\n        else\n        {\n            nextTexture = sprite.texture.baseTexture;\n        }\n\n        nextBlendMode = sprite.blendMode;\n        nextShader = sprite.shader || this.defaultShader;\n\n        blendSwap = currentBlendMode !== nextBlendMode;\n        shaderSwap = currentShader !== nextShader; // should I use _UIDS???\n\n        var skip = nextTexture.skipRender;\n\n        if (skip && sprite.children.length > 0)\n        {\n            skip = false;\n        }\n\n        if ((currentBaseTexture !== nextTexture && !skip) || blendSwap || shaderSwap)\n        {\n            this.renderBatch(currentBaseTexture, batchSize, start);\n\n            start = i;\n            batchSize = 0;\n            currentBaseTexture = nextTexture;\n\n            if (blendSwap)\n            {\n                currentBlendMode = nextBlendMode;\n                this.renderSession.blendModeManager.setBlendMode(currentBlendMode);\n            }\n\n            if (shaderSwap)\n            {\n                currentShader = nextShader;\n                \n                shader = currentShader.shaders[gl.id];\n\n                if (!shader)\n                {\n                    shader = new PIXI.PixiShader(gl);\n\n                    shader.fragmentSrc = currentShader.fragmentSrc;\n                    shader.uniforms = currentShader.uniforms;\n                    shader.init();\n\n                    currentShader.shaders[gl.id] = shader;\n                }\n\n                // set shader function???\n                this.renderSession.shaderManager.setShader(shader);\n\n                if (shader.dirty)\n                {\n                    shader.syncUniforms();\n                }\n                \n                // both these only need to be set if they are changing..\n                // set the projection\n                var projection = this.renderSession.projection;\n                gl.uniform2f(shader.projectionVector, projection.x, projection.y);\n\n                // TODO - this is temporary!\n                var offsetVector = this.renderSession.offset;\n                gl.uniform2f(shader.offsetVector, offsetVector.x, offsetVector.y);\n\n                // set the pointers\n            }\n        }\n\n        batchSize++;\n    }\n\n    this.renderBatch(currentBaseTexture, batchSize, start);\n\n    // then reset the batch!\n    this.currentBatchSize = 0;\n};\n\n/**\n* @method renderBatch\n* @param texture {Texture}\n* @param size {Number}\n* @param startIndex {Number}\n*/\nPIXI.WebGLSpriteBatch.prototype.renderBatch = function(texture, size, startIndex)\n{\n    if (size === 0)\n    {\n        return;\n    }\n\n    var gl = this.gl;\n\n    // check if a texture is dirty..\n    if (texture._dirty[gl.id])\n    {\n        if (!this.renderSession.renderer.updateTexture(texture))\n        {\n            //  If updateTexture returns false then we cannot render it, so bail out now\n            return;\n        }\n    }\n    else\n    {\n        // bind the current texture\n        gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);\n    }\n\n    // now draw those suckas!\n    gl.drawElements(gl.TRIANGLES, size * 6, gl.UNSIGNED_SHORT, startIndex * 6 * 2);\n    \n    // increment the draw count\n    this.renderSession.drawCount++;\n};\n\n/**\n* @method stop\n*/\nPIXI.WebGLSpriteBatch.prototype.stop = function()\n{\n    this.flush();\n    this.dirty = true;\n};\n\n/**\n* @method start\n*/\nPIXI.WebGLSpriteBatch.prototype.start = function()\n{\n    this.dirty = true;\n};\n\n/**\n* Destroys the SpriteBatch.\n* \n* @method destroy\n*/\nPIXI.WebGLSpriteBatch.prototype.destroy = function()\n{\n    this.vertices = null;\n    this.indices = null;\n    \n    this.gl.deleteBuffer(this.vertexBuffer);\n    this.gl.deleteBuffer(this.indexBuffer);\n    \n    this.currentBaseTexture = null;\n    \n    this.gl = null;\n};\r\n/**\n * @author Mat Groves\n * \n * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/\n * for creating the original pixi version!\n *\n * Heavily inspired by LibGDX's WebGLSpriteBatch:\n * https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/WebGLSpriteBatch.java\n */\n\n/**\n* @class WebGLFastSpriteBatch\n* @constructor\n*/\nPIXI.WebGLFastSpriteBatch = function(gl)\n{\n    /**\n     * @property vertSize\n     * @type Number\n     */\n    this.vertSize = 10;\n\n    /**\n     * @property maxSize\n     * @type Number\n     */\n    this.maxSize = 6000;//Math.pow(2, 16) /  this.vertSize;\n\n    /**\n     * @property size\n     * @type Number\n     */\n    this.size = this.maxSize;\n\n    //the total number of floats in our batch\n    var numVerts = this.size * 4 *  this.vertSize;\n\n    //the total number of indices in our batch\n    var numIndices = this.maxSize * 6;\n\n    /**\n     * Vertex data\n     * @property vertices\n     * @type Float32Array\n     */\n    this.vertices = new PIXI.Float32Array(numVerts);\n\n    /**\n     * Index data\n     * @property indices\n     * @type Uint16Array\n     */\n    this.indices = new PIXI.Uint16Array(numIndices);\n    \n    /**\n     * @property vertexBuffer\n     * @type Object\n     */\n    this.vertexBuffer = null;\n\n    /**\n     * @property indexBuffer\n     * @type Object\n     */\n    this.indexBuffer = null;\n\n    /**\n     * @property lastIndexCount\n     * @type Number\n     */\n    this.lastIndexCount = 0;\n\n    for (var i=0, j=0; i < numIndices; i += 6, j += 4)\n    {\n        this.indices[i + 0] = j + 0;\n        this.indices[i + 1] = j + 1;\n        this.indices[i + 2] = j + 2;\n        this.indices[i + 3] = j + 0;\n        this.indices[i + 4] = j + 2;\n        this.indices[i + 5] = j + 3;\n    }\n\n    /**\n     * @property drawing\n     * @type Boolean\n     */\n    this.drawing = false;\n\n    /**\n     * @property currentBatchSize\n     * @type Number\n     */\n    this.currentBatchSize = 0;\n\n    /**\n     * @property currentBaseTexture\n     * @type BaseTexture\n     */\n    this.currentBaseTexture = null;\n   \n    /**\n     * @property currentBlendMode\n     * @type Number\n     */\n    this.currentBlendMode = 0;\n\n    /**\n     * @property renderSession\n     * @type Object\n     */\n    this.renderSession = null;\n    \n    /**\n     * @property shader\n     * @type Object\n     */\n    this.shader = null;\n\n    /**\n     * @property matrix\n     * @type Matrix\n     */\n    this.matrix = null;\n\n    this.setContext(gl);\n};\n\nPIXI.WebGLFastSpriteBatch.prototype.constructor = PIXI.WebGLFastSpriteBatch;\n\n/**\n * Sets the WebGL Context.\n *\n * @method setContext\n * @param gl {WebGLContext} the current WebGL drawing context\n */\nPIXI.WebGLFastSpriteBatch.prototype.setContext = function(gl)\n{\n    this.gl = gl;\n\n    // create a couple of buffers\n    this.vertexBuffer = gl.createBuffer();\n    this.indexBuffer = gl.createBuffer();\n\n    // 65535 is max index, so 65535 / 6 = 10922.\n\n    //upload the index data\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);\n    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);\n};\n\n/**\n * @method begin\n * @param spriteBatch {WebGLSpriteBatch}\n * @param renderSession {Object}\n */\nPIXI.WebGLFastSpriteBatch.prototype.begin = function(spriteBatch, renderSession)\n{\n    this.renderSession = renderSession;\n    this.shader = this.renderSession.shaderManager.fastShader;\n\n    this.matrix = spriteBatch.worldTransform.toArray(true);\n\n    this.start();\n};\n\n/**\n * @method end\n */\nPIXI.WebGLFastSpriteBatch.prototype.end = function()\n{\n    this.flush();\n};\n\n/**\n * @method render\n * @param spriteBatch {WebGLSpriteBatch}\n */\nPIXI.WebGLFastSpriteBatch.prototype.render = function(spriteBatch)\n{\n    var children = spriteBatch.children;\n    var sprite = children[0];\n\n    // if the uvs have not updated then no point rendering just yet!\n    \n    // check texture.\n    if(!sprite.texture._uvs)return;\n   \n    this.currentBaseTexture = sprite.texture.baseTexture;\n    \n    // check blend mode\n    if(sprite.blendMode !== this.renderSession.blendModeManager.currentBlendMode)\n    {\n        this.flush();\n        this.renderSession.blendModeManager.setBlendMode(sprite.blendMode);\n    }\n    \n    for(var i=0,j= children.length; i<j; i++)\n    {\n        this.renderSprite(children[i]);\n    }\n\n    this.flush();\n};\n\n/**\n * @method renderSprite\n * @param sprite {Sprite}\n */\nPIXI.WebGLFastSpriteBatch.prototype.renderSprite = function(sprite)\n{\n    //sprite = children[i];\n    if(!sprite.visible)return;\n    \n    // TODO trim??\n    if(sprite.texture.baseTexture !== this.currentBaseTexture && !sprite.texture.baseTexture.skipRender)\n    {\n        this.flush();\n        this.currentBaseTexture = sprite.texture.baseTexture;\n        \n        if(!sprite.texture._uvs)return;\n    }\n\n    var uvs, vertices = this.vertices, width, height, w0, w1, h0, h1, index;\n\n    uvs = sprite.texture._uvs;\n\n    width = sprite.texture.frame.width;\n    height = sprite.texture.frame.height;\n\n    if (sprite.texture.trim)\n    {\n        // if the sprite is trimmed then we need to add the extra space before transforming the sprite coords..\n        var trim = sprite.texture.trim;\n\n        w1 = trim.x - sprite.anchor.x * trim.width;\n        w0 = w1 + sprite.texture.crop.width;\n\n        h1 = trim.y - sprite.anchor.y * trim.height;\n        h0 = h1 + sprite.texture.crop.height;\n    }\n    else\n    {\n        w0 = (sprite.texture.frame.width ) * (1-sprite.anchor.x);\n        w1 = (sprite.texture.frame.width ) * -sprite.anchor.x;\n\n        h0 = sprite.texture.frame.height * (1-sprite.anchor.y);\n        h1 = sprite.texture.frame.height * -sprite.anchor.y;\n    }\n\n    index = this.currentBatchSize * 4 * this.vertSize;\n\n    // xy\n    vertices[index++] = w1;\n    vertices[index++] = h1;\n\n    vertices[index++] = sprite.position.x;\n    vertices[index++] = sprite.position.y;\n\n    //scale\n    vertices[index++] = sprite.scale.x;\n    vertices[index++] = sprite.scale.y;\n\n    //rotation\n    vertices[index++] = sprite.rotation;\n\n    // uv\n    vertices[index++] = uvs.x0;\n    vertices[index++] = uvs.y1;\n    // color\n    vertices[index++] = sprite.alpha;\n \n\n    // xy\n    vertices[index++] = w0;\n    vertices[index++] = h1;\n\n    vertices[index++] = sprite.position.x;\n    vertices[index++] = sprite.position.y;\n\n    //scale\n    vertices[index++] = sprite.scale.x;\n    vertices[index++] = sprite.scale.y;\n\n     //rotation\n    vertices[index++] = sprite.rotation;\n\n    // uv\n    vertices[index++] = uvs.x1;\n    vertices[index++] = uvs.y1;\n    // color\n    vertices[index++] = sprite.alpha;\n  \n\n    // xy\n    vertices[index++] = w0;\n    vertices[index++] = h0;\n\n    vertices[index++] = sprite.position.x;\n    vertices[index++] = sprite.position.y;\n\n    //scale\n    vertices[index++] = sprite.scale.x;\n    vertices[index++] = sprite.scale.y;\n\n     //rotation\n    vertices[index++] = sprite.rotation;\n\n    // uv\n    vertices[index++] = uvs.x2;\n    vertices[index++] = uvs.y2;\n    // color\n    vertices[index++] = sprite.alpha;\n \n\n\n\n    // xy\n    vertices[index++] = w1;\n    vertices[index++] = h0;\n\n    vertices[index++] = sprite.position.x;\n    vertices[index++] = sprite.position.y;\n\n    //scale\n    vertices[index++] = sprite.scale.x;\n    vertices[index++] = sprite.scale.y;\n\n     //rotation\n    vertices[index++] = sprite.rotation;\n\n    // uv\n    vertices[index++] = uvs.x3;\n    vertices[index++] = uvs.y3;\n    // color\n    vertices[index++] = sprite.alpha;\n\n    // increment the batchs\n    this.currentBatchSize++;\n\n    if(this.currentBatchSize >= this.size)\n    {\n        this.flush();\n    }\n};\n\n/**\n * @method flush\n */\nPIXI.WebGLFastSpriteBatch.prototype.flush = function()\n{\n    // If the batch is length 0 then return as there is nothing to draw\n    if (this.currentBatchSize===0)return;\n\n    var gl = this.gl;\n    \n    // bind the current texture\n\n    if(!this.currentBaseTexture._glTextures[gl.id])this.renderSession.renderer.updateTexture(this.currentBaseTexture, gl);\n\n    gl.bindTexture(gl.TEXTURE_2D, this.currentBaseTexture._glTextures[gl.id]);\n\n    // upload the verts to the buffer\n   \n    if(this.currentBatchSize > ( this.size * 0.5 ) )\n    {\n        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);\n    }\n    else\n    {\n        var view = this.vertices.subarray(0, this.currentBatchSize * 4 * this.vertSize);\n\n        gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);\n    }\n    \n    // now draw those suckas!\n    gl.drawElements(gl.TRIANGLES, this.currentBatchSize * 6, gl.UNSIGNED_SHORT, 0);\n   \n    // then reset the batch!\n    this.currentBatchSize = 0;\n\n    // increment the draw count\n    this.renderSession.drawCount++;\n};\n\n\n/**\n * @method stop\n */\nPIXI.WebGLFastSpriteBatch.prototype.stop = function()\n{\n    this.flush();\n};\n\n/**\n * @method start\n */\nPIXI.WebGLFastSpriteBatch.prototype.start = function()\n{\n    var gl = this.gl;\n\n    // bind the main texture\n    gl.activeTexture(gl.TEXTURE0);\n\n    // bind the buffers\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);\n\n    // set the projection\n    var projection = this.renderSession.projection;\n    gl.uniform2f(this.shader.projectionVector, projection.x, projection.y);\n\n    // set the matrix\n    gl.uniformMatrix3fv(this.shader.uMatrix, false, this.matrix);\n\n    // set the pointers\n    var stride =  this.vertSize * 4;\n\n    gl.vertexAttribPointer(this.shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);\n    gl.vertexAttribPointer(this.shader.aPositionCoord, 2, gl.FLOAT, false, stride, 2 * 4);\n    gl.vertexAttribPointer(this.shader.aScale, 2, gl.FLOAT, false, stride, 4 * 4);\n    gl.vertexAttribPointer(this.shader.aRotation, 1, gl.FLOAT, false, stride, 6 * 4);\n    gl.vertexAttribPointer(this.shader.aTextureCoord, 2, gl.FLOAT, false, stride, 7 * 4);\n    gl.vertexAttribPointer(this.shader.colorAttribute, 1, gl.FLOAT, false, stride, 9 * 4);\n    \n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class WebGLFilterManager\n* @constructor\n*/\nPIXI.WebGLFilterManager = function()\n{\n    /**\n     * @property filterStack\n     * @type Array\n     */\n    this.filterStack = [];\n    \n    /**\n     * @property offsetX\n     * @type Number\n     */\n    this.offsetX = 0;\n\n    /**\n     * @property offsetY\n     * @type Number\n     */\n    this.offsetY = 0;\n};\n\nPIXI.WebGLFilterManager.prototype.constructor = PIXI.WebGLFilterManager;\n\n/**\n* Initialises the context and the properties.\n* \n* @method setContext \n* @param gl {WebGLContext} the current WebGL drawing context\n*/\nPIXI.WebGLFilterManager.prototype.setContext = function(gl)\n{\n    this.gl = gl;\n    this.texturePool = [];\n\n    this.initShaderBuffers();\n};\n\n/**\n* @method begin\n* @param renderSession {RenderSession} \n* @param buffer {ArrayBuffer} \n*/\nPIXI.WebGLFilterManager.prototype.begin = function(renderSession, buffer)\n{\n    this.renderSession = renderSession;\n    this.defaultShader = renderSession.shaderManager.defaultShader;\n\n    var projection = this.renderSession.projection;\n    this.width = projection.x * 2;\n    this.height = -projection.y * 2;\n    this.buffer = buffer;\n};\n\n/**\n* Applies the filter and adds it to the current filter stack.\n* \n* @method pushFilter\n* @param filterBlock {Object} the filter that will be pushed to the current filter stack\n*/\nPIXI.WebGLFilterManager.prototype.pushFilter = function(filterBlock)\n{\n    var gl = this.gl;\n\n    var projection = this.renderSession.projection;\n    var offset = this.renderSession.offset;\n\n    filterBlock._filterArea = filterBlock.target.filterArea || filterBlock.target.getBounds();\n    \n    // >>> modify by nextht\n    filterBlock._previous_stencil_mgr = this.renderSession.stencilManager;\n    this.renderSession.stencilManager = new PIXI.WebGLStencilManager();\n    this.renderSession.stencilManager.setContext(gl);\n    gl.disable(gl.STENCIL_TEST);\n    // <<<  modify by nextht \n   \n    // filter program\n    // OPTIMISATION - the first filter is free if its a simple color change?\n    this.filterStack.push(filterBlock);\n\n    var filter = filterBlock.filterPasses[0];\n\n    this.offsetX += filterBlock._filterArea.x;\n    this.offsetY += filterBlock._filterArea.y;\n\n    var texture = this.texturePool.pop();\n    if(!texture)\n    {\n        texture = new PIXI.FilterTexture(this.gl, this.width * this.renderSession.resolution, this.height * this.renderSession.resolution);\n    }\n    else\n    {\n        texture.resize(this.width * this.renderSession.resolution, this.height * this.renderSession.resolution);\n    }\n\n    gl.bindTexture(gl.TEXTURE_2D,  texture.texture);\n\n    var filterArea = filterBlock._filterArea;// filterBlock.target.getBounds();///filterBlock.target.filterArea;\n\n    var padding = filter.padding;\n    filterArea.x -= padding;\n    filterArea.y -= padding;\n    filterArea.width += padding * 2;\n    filterArea.height += padding * 2;\n\n    // cap filter to screen size..\n    if(filterArea.x < 0)filterArea.x = 0;\n    if(filterArea.width > this.width)filterArea.width = this.width;\n    if(filterArea.y < 0)filterArea.y = 0;\n    if(filterArea.height > this.height)filterArea.height = this.height;\n\n    //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  filterArea.width, filterArea.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);\n    gl.bindFramebuffer(gl.FRAMEBUFFER, texture.frameBuffer);\n\n    // set view port\n    gl.viewport(0, 0, filterArea.width * this.renderSession.resolution, filterArea.height * this.renderSession.resolution);\n\n    projection.x = filterArea.width/2;\n    projection.y = -filterArea.height/2;\n\n    offset.x = -filterArea.x;\n    offset.y = -filterArea.y;\n\n    // update projection\n    // now restore the regular shader..\n    // this.renderSession.shaderManager.setShader(this.defaultShader);\n    //gl.uniform2f(this.defaultShader.projectionVector, filterArea.width/2, -filterArea.height/2);\n    //gl.uniform2f(this.defaultShader.offsetVector, -filterArea.x, -filterArea.y);\n\n    gl.colorMask(true, true, true, true);\n    gl.clearColor(0,0,0, 0);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n\n    filterBlock._glFilterTexture = texture;\n\n};\n\n/**\n* Removes the last filter from the filter stack and doesn't return it.\n* \n* @method popFilter\n*/\nPIXI.WebGLFilterManager.prototype.popFilter = function()\n{\n    var gl = this.gl;\n    var filterBlock = this.filterStack.pop();\n    var filterArea = filterBlock._filterArea;\n    var texture = filterBlock._glFilterTexture;\n    var projection = this.renderSession.projection;\n    var offset = this.renderSession.offset;\n\n    if(filterBlock.filterPasses.length > 1)\n    {\n        gl.viewport(0, 0, filterArea.width * this.renderSession.resolution, filterArea.height * this.renderSession.resolution);\n\n        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);\n\n        this.vertexArray[0] = 0;\n        this.vertexArray[1] = filterArea.height;\n\n        this.vertexArray[2] = filterArea.width;\n        this.vertexArray[3] = filterArea.height;\n\n        this.vertexArray[4] = 0;\n        this.vertexArray[5] = 0;\n\n        this.vertexArray[6] = filterArea.width;\n        this.vertexArray[7] = 0;\n\n        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexArray);\n\n        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);\n        // now set the uvs..\n        this.uvArray[2] = filterArea.width/this.width;\n        this.uvArray[5] = filterArea.height/this.height;\n        this.uvArray[6] = filterArea.width/this.width;\n        this.uvArray[7] = filterArea.height/this.height;\n\n        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvArray);\n\n        var inputTexture = texture;\n        var outputTexture = this.texturePool.pop();\n        if(!outputTexture)outputTexture = new PIXI.FilterTexture(this.gl, this.width * this.renderSession.resolution, this.height * this.renderSession.resolution);\n        outputTexture.resize(this.width * this.renderSession.resolution, this.height * this.renderSession.resolution);\n\n        // need to clear this FBO as it may have some left over elements from a previous filter.\n        gl.bindFramebuffer(gl.FRAMEBUFFER, outputTexture.frameBuffer );\n        gl.clear(gl.COLOR_BUFFER_BIT);\n\n        gl.disable(gl.BLEND);\n\n        for (var i = 0; i < filterBlock.filterPasses.length-1; i++)\n        {\n            var filterPass = filterBlock.filterPasses[i];\n\n            gl.bindFramebuffer(gl.FRAMEBUFFER, outputTexture.frameBuffer );\n\n            // set texture\n            gl.activeTexture(gl.TEXTURE0);\n            gl.bindTexture(gl.TEXTURE_2D, inputTexture.texture);\n\n            // draw texture..\n            //filterPass.applyFilterPass(filterArea.width, filterArea.height);\n            this.applyFilterPass(filterPass, filterArea, filterArea.width, filterArea.height);\n\n            // swap the textures..\n            var temp = inputTexture;\n            inputTexture = outputTexture;\n            outputTexture = temp;\n        }\n\n        gl.enable(gl.BLEND);\n\n        texture = inputTexture;\n        this.texturePool.push(outputTexture);\n    }\n\n    var filter = filterBlock.filterPasses[filterBlock.filterPasses.length-1];\n\n    this.offsetX -= filterArea.x;\n    this.offsetY -= filterArea.y;\n\n    var sizeX = this.width;\n    var sizeY = this.height;\n\n    var offsetX = 0;\n    var offsetY = 0;\n\n    var buffer = this.buffer;\n\n    // time to render the filters texture to the previous scene\n    if(this.filterStack.length === 0)\n    {\n        gl.colorMask(true, true, true, true);//this.transparent);\n    }\n    else\n    {\n        var currentFilter = this.filterStack[this.filterStack.length-1];\n        filterArea = currentFilter._filterArea;\n\n        sizeX = filterArea.width;\n        sizeY = filterArea.height;\n\n        offsetX = filterArea.x;\n        offsetY = filterArea.y;\n\n        buffer =  currentFilter._glFilterTexture.frameBuffer;\n    }\n\n    // TODO need to remove these global elements..\n    projection.x = sizeX/2;\n    projection.y = -sizeY/2;\n\n    offset.x = offsetX;\n    offset.y = offsetY;\n\n    filterArea = filterBlock._filterArea;\n\n    var x = filterArea.x-offsetX;\n    var y = filterArea.y-offsetY;\n\n    // update the buffers..\n    // make sure to flip the y!\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);\n\n    this.vertexArray[0] = x;\n    this.vertexArray[1] = y + filterArea.height;\n\n    this.vertexArray[2] = x + filterArea.width;\n    this.vertexArray[3] = y + filterArea.height;\n\n    this.vertexArray[4] = x;\n    this.vertexArray[5] = y;\n\n    this.vertexArray[6] = x + filterArea.width;\n    this.vertexArray[7] = y;\n\n    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexArray);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);\n\n    this.uvArray[2] = filterArea.width/this.width;\n    this.uvArray[5] = filterArea.height/this.height;\n    this.uvArray[6] = filterArea.width/this.width;\n    this.uvArray[7] = filterArea.height/this.height;\n\n    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvArray);\n\n    gl.viewport(0, 0, sizeX * this.renderSession.resolution, sizeY * this.renderSession.resolution);\n\n    // bind the buffer\n    gl.bindFramebuffer(gl.FRAMEBUFFER, buffer );\n\n    // set the blend mode! \n    //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)\n\n    // set texture\n    gl.activeTexture(gl.TEXTURE0);\n    gl.bindTexture(gl.TEXTURE_2D, texture.texture);\n\n    // >>> modify by nextht\n    if (this.renderSession.stencilManager) {\n        this.renderSession.stencilManager.destroy();\n    }\n    this.renderSession.stencilManager = filterBlock._previous_stencil_mgr;\n    filterBlock._previous_stencil_mgr = null;\n    if (this.renderSession.stencilManager.count > 0) {\n        gl.enable(gl.STENCIL_TEST);\n    }\n    else {\n        gl.disable(gl.STENCIL_TEST);\n    }    \n    // <<< modify by nextht\n\n    // apply!\n    this.applyFilterPass(filter, filterArea, sizeX, sizeY);\n\n    // now restore the regular shader.. should happen automatically now..\n    // this.renderSession.shaderManager.setShader(this.defaultShader);\n    // gl.uniform2f(this.defaultShader.projectionVector, sizeX/2, -sizeY/2);\n    // gl.uniform2f(this.defaultShader.offsetVector, -offsetX, -offsetY);\n\n    // return the texture to the pool\n    this.texturePool.push(texture);\n    filterBlock._glFilterTexture = null;\n};\n\n\n/**\n* Applies the filter to the specified area.\n* \n* @method applyFilterPass\n* @param filter {AbstractFilter} the filter that needs to be applied\n* @param filterArea {Texture} TODO - might need an update\n* @param width {Number} the horizontal range of the filter\n* @param height {Number} the vertical range of the filter\n*/\nPIXI.WebGLFilterManager.prototype.applyFilterPass = function(filter, filterArea, width, height)\n{\n    // use program\n    var gl = this.gl;\n    var shader = filter.shaders[gl.id];\n\n    if(!shader)\n    {\n        shader = new PIXI.PixiShader(gl);\n\n        shader.fragmentSrc = filter.fragmentSrc;\n        shader.uniforms = filter.uniforms;\n        shader.init();\n\n        filter.shaders[gl.id] = shader;\n    }\n\n    // set the shader\n    this.renderSession.shaderManager.setShader(shader);\n\n//    gl.useProgram(shader.program);\n\n    gl.uniform2f(shader.projectionVector, width/2, -height/2);\n    gl.uniform2f(shader.offsetVector, 0,0);\n\n    if(filter.uniforms.dimensions)\n    {\n        filter.uniforms.dimensions.value[0] = this.width;//width;\n        filter.uniforms.dimensions.value[1] = this.height;//height;\n        filter.uniforms.dimensions.value[2] = this.vertexArray[0];\n        filter.uniforms.dimensions.value[3] = this.vertexArray[5];//filterArea.height;\n    }\n\n    shader.syncUniforms();\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);\n    gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);\n    gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);\n    gl.vertexAttribPointer(shader.colorAttribute, 2, gl.FLOAT, false, 0, 0);\n\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);\n\n    // draw the filter...\n    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );\n\n    this.renderSession.drawCount++;\n};\n\n/**\n* Initialises the shader buffers.\n* \n* @method initShaderBuffers\n*/\nPIXI.WebGLFilterManager.prototype.initShaderBuffers = function()\n{\n    var gl = this.gl;\n\n    // create some buffers\n    this.vertexBuffer = gl.createBuffer();\n    this.uvBuffer = gl.createBuffer();\n    this.colorBuffer = gl.createBuffer();\n    this.indexBuffer = gl.createBuffer();\n\n    // bind and upload the vertexs..\n    // keep a reference to the vertexFloatData..\n    this.vertexArray = new PIXI.Float32Array([0.0, 0.0,\n                                         1.0, 0.0,\n                                         0.0, 1.0,\n                                         1.0, 1.0]);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, this.vertexArray, gl.STATIC_DRAW);\n\n    // bind and upload the uv buffer\n    this.uvArray = new PIXI.Float32Array([0.0, 0.0,\n                                     1.0, 0.0,\n                                     0.0, 1.0,\n                                     1.0, 1.0]);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, this.uvArray, gl.STATIC_DRAW);\n\n    this.colorArray = new PIXI.Float32Array([1.0, 0xFFFFFF,\n                                        1.0, 0xFFFFFF,\n                                        1.0, 0xFFFFFF,\n                                        1.0, 0xFFFFFF]);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, this.colorArray, gl.STATIC_DRAW);\n\n    // bind and upload the index\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);\n    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 3, 2]), gl.STATIC_DRAW);\n\n};\n\n/**\n* Destroys the filter and removes it from the filter stack.\n* \n* @method destroy\n*/\nPIXI.WebGLFilterManager.prototype.destroy = function()\n{\n    var gl = this.gl;\n\n    this.filterStack = null;\n    \n    this.offsetX = 0;\n    this.offsetY = 0;\n\n    // destroy textures\n    for (var i = 0; i < this.texturePool.length; i++) {\n        this.texturePool[i].destroy();\n    }\n    \n    this.texturePool = null;\n\n    //destroy buffers..\n    gl.deleteBuffer(this.vertexBuffer);\n    gl.deleteBuffer(this.uvBuffer);\n    gl.deleteBuffer(this.colorBuffer);\n    gl.deleteBuffer(this.indexBuffer);\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n* @class FilterTexture\n* @constructor\n* @param gl {WebGLContext} the current WebGL drawing context\n* @param width {Number} the horizontal range of the filter\n* @param height {Number} the vertical range of the filter\n* @param scaleMode {Number} See {{#crossLink \"PIXI/scaleModes:property\"}}PIXI.scaleModes{{/crossLink}} for possible values\n*/\nPIXI.FilterTexture = function(gl, width, height, scaleMode)\n{\n    /**\n     * @property gl\n     * @type WebGLContext\n     */\n    this.gl = gl;\n\n    // next time to create a frame buffer and texture\n\n    /**\n     * @property frameBuffer\n     * @type Any\n     */\n    this.frameBuffer = gl.createFramebuffer();\n\n    /**\n     * @property texture\n     * @type Any\n     */\n    this.texture = gl.createTexture();\n\n    /**\n     * @property scaleMode\n     * @type Number\n     */\n    scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;\n\n    gl.bindTexture(gl.TEXTURE_2D,  this.texture);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\n    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer );\n\n    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer );\n    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);\n\n    // required for masking a mask??\n    this.renderBuffer = gl.createRenderbuffer();\n    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);\n    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);\n  \n    this.resize(width, height);\n};\n\nPIXI.FilterTexture.prototype.constructor = PIXI.FilterTexture;\n\n/**\n* Clears the filter texture.\n* \n* @method clear\n*/\nPIXI.FilterTexture.prototype.clear = function()\n{\n    var gl = this.gl;\n    \n    gl.clearColor(0,0,0, 0);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n};\n\n/**\n * Resizes the texture to the specified width and height\n *\n * @method resize\n * @param width {Number} the new width of the texture\n * @param height {Number} the new height of the texture\n */\nPIXI.FilterTexture.prototype.resize = function(width, height)\n{\n    if(this.width === width && this.height === height) return;\n\n    this.width = width;\n    this.height = height;\n\n    var gl = this.gl;\n\n    gl.bindTexture(gl.TEXTURE_2D,  this.texture);\n    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  width , height , 0, gl.RGBA, gl.UNSIGNED_BYTE, null);\n    // update the stencil buffer width and height\n    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);\n    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width , height );\n};\n\n/**\n* Destroys the filter texture.\n* \n* @method destroy\n*/\nPIXI.FilterTexture.prototype.destroy = function()\n{\n    var gl = this.gl;\n    gl.deleteFramebuffer( this.frameBuffer );\n    gl.deleteTexture( this.texture );\n\n    this.frameBuffer = null;\n    this.texture = null;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * Creates a Canvas element of the given size.\n *\n * @class CanvasBuffer\n * @constructor\n * @param width {Number} the width for the newly created canvas\n * @param height {Number} the height for the newly created canvas\n */\nPIXI.CanvasBuffer = function(width, height)\n{\n    /**\n     * The width of the Canvas in pixels.\n     *\n     * @property width\n     * @type Number\n     */\n    this.width = width;\n\n    /**\n     * The height of the Canvas in pixels.\n     *\n     * @property height\n     * @type Number\n     */\n    this.height = height;\n\n    /**\n     * The Canvas object that belongs to this CanvasBuffer.\n     *\n     * @property canvas\n     * @type HTMLCanvasElement\n     */\n    this.canvas = PIXI.CanvasPool.create(this, this.width, this.height);\n\n    /**\n     * A CanvasRenderingContext2D object representing a two-dimensional rendering context.\n     *\n     * @property context\n     * @type CanvasRenderingContext2D\n     */\n    this.context = this.canvas.getContext(\"2d\");\n\n    this.canvas.width = width;\n    this.canvas.height = height;\n};\n\nPIXI.CanvasBuffer.prototype.constructor = PIXI.CanvasBuffer;\n\n/**\n * Clears the canvas that was created by the CanvasBuffer class.\n *\n * @method clear\n * @private\n */\nPIXI.CanvasBuffer.prototype.clear = function()\n{\n    this.context.setTransform(1, 0, 0, 1, 0, 0);\n    this.context.clearRect(0,0, this.width, this.height);\n};\n\n/**\n * Resizes the canvas to the specified width and height.\n *\n * @method resize\n * @param width {Number} the new width of the canvas\n * @param height {Number} the new height of the canvas\n */\nPIXI.CanvasBuffer.prototype.resize = function(width, height)\n{\n    this.width = this.canvas.width = width;\n    this.height = this.canvas.height = height;\n};\n\n/**\n * Frees the canvas up for use again.\n *\n * @method destroy\n */\nPIXI.CanvasBuffer.prototype.destroy = function()\n{\n    PIXI.CanvasPool.remove(this);\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * A set of functions used to handle masking.\n *\n * @class CanvasMaskManager\n * @constructor\n */\nPIXI.CanvasMaskManager = function()\n{\n};\n\nPIXI.CanvasMaskManager.prototype.constructor = PIXI.CanvasMaskManager;\n\n/**\n * This method adds it to the current stack of masks.\n *\n * @method pushMask\n * @param maskData {Object} the maskData that will be pushed\n * @param renderSession {Object} The renderSession whose context will be used for this mask manager.\n */\nPIXI.CanvasMaskManager.prototype.pushMask = function(maskData, renderSession) {\n\n\tvar context = renderSession.context;\n\n    context.save();\n    \n    var cacheAlpha = maskData.alpha;\n    var transform = maskData.worldTransform;\n\n    var resolution = renderSession.resolution;\n\n    context.setTransform(transform.a * resolution,\n                         transform.b * resolution,\n                         transform.c * resolution,\n                         transform.d * resolution,\n                         transform.tx * resolution,\n                         transform.ty * resolution);\n\n    PIXI.CanvasGraphics.renderGraphicsMask(maskData, context);\n\n    context.clip();\n\n    maskData.worldAlpha = cacheAlpha;\n};\n\n/**\n * Restores the current drawing context to the state it was before the mask was applied.\n *\n * @method popMask\n * @param renderSession {Object} The renderSession whose context will be used for this mask manager.\n */\nPIXI.CanvasMaskManager.prototype.popMask = function(renderSession)\n{\n    renderSession.context.restore();\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * Utility methods for Sprite/Texture tinting.\n *\n * @class CanvasTinter\n * @static\n */\nPIXI.CanvasTinter = function() {};\n\n/**\n * Basically this method just needs a sprite and a color and tints the sprite with the given color.\n * \n * @method getTintedTexture \n * @static\n * @param sprite {Sprite} the sprite to tint\n * @param color {Number} the color to use to tint the sprite with\n * @return {HTMLCanvasElement} The tinted canvas\n */\nPIXI.CanvasTinter.getTintedTexture = function(sprite, color)\n{\n    var canvas = sprite.tintedTexture || PIXI.CanvasPool.create(this);\n    \n    PIXI.CanvasTinter.tintMethod(sprite.texture, color, canvas);\n\n    return canvas;\n};\n\n/**\n * Tint a texture using the \"multiply\" operation.\n * \n * @method tintWithMultiply\n * @static\n * @param texture {Texture} the texture to tint\n * @param color {Number} the color to use to tint the sprite with\n * @param canvas {HTMLCanvasElement} the current canvas\n */\nPIXI.CanvasTinter.tintWithMultiply = function(texture, color, canvas)\n{\n    var context = canvas.getContext(\"2d\");\n\n    var crop = texture.crop;\n\n    if (canvas.width !== crop.width || canvas.height !== crop.height)\n    {\n        canvas.width = crop.width;\n        canvas.height = crop.height;\n    }\n\n    context.clearRect(0, 0, crop.width, crop.height);\n\n    context.fillStyle = \"#\" + (\"00000\" + (color | 0).toString(16)).substr(-6);\n    context.fillRect(0, 0, crop.width, crop.height);\n\n    context.globalCompositeOperation = \"multiply\";\n    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);\n\n    context.globalCompositeOperation = \"destination-atop\";\n    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);\n\n};\n\n/**\n * Tint a texture pixel per pixel.\n * \n * @method tintPerPixel\n * @static\n * @param texture {Texture} the texture to tint\n * @param color {Number} the color to use to tint the sprite with\n * @param canvas {HTMLCanvasElement} the current canvas\n */ \nPIXI.CanvasTinter.tintWithPerPixel = function(texture, color, canvas)\n{\n    var context = canvas.getContext(\"2d\");\n\n    var crop = texture.crop;\n\n    canvas.width = crop.width;\n    canvas.height = crop.height;\n  \n    context.globalCompositeOperation = \"copy\";\n\n    context.drawImage(texture.baseTexture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);\n\n    var rgbValues = PIXI.hex2rgb(color);\n    var r = rgbValues[0], g = rgbValues[1], b = rgbValues[2];\n\n    var pixelData = context.getImageData(0, 0, crop.width, crop.height);\n\n    var pixels = pixelData.data;\n\n    for (var i = 0; i < pixels.length; i += 4)\n    {\n        pixels[i + 0] *= r;\n        pixels[i + 1] *= g;\n        pixels[i + 2] *= b;\n\n        if (!PIXI.CanvasTinter.canHandleAlpha)\n        {\n            var alpha = pixels[i + 3];\n\n            pixels[i + 0] /= 255 / alpha;\n            pixels[i + 1] /= 255 / alpha;\n            pixels[i + 2] /= 255 / alpha;\n        }\n    }\n\n    context.putImageData(pixelData, 0, 0);\n};\n\n/**\n * Checks if the browser correctly supports putImageData alpha channels.\n * \n * @method checkInverseAlpha\n * @static\n */\nPIXI.CanvasTinter.checkInverseAlpha = function()\n{\n    var canvas = new PIXI.CanvasBuffer(2, 1);\n\n    canvas.context.fillStyle = \"rgba(10, 20, 30, 0.5)\";\n\n    //  Draw a single pixel\n    canvas.context.fillRect(0, 0, 1, 1);\n\n    //  Get the color values\n    var s1 = canvas.context.getImageData(0, 0, 1, 1);\n\n    if (s1 === null)\n    {\n        return false;\n    }\n\n    //  Plot them to x2\n    canvas.context.putImageData(s1, 1, 0);\n\n    //  Get those values\n    var s2 = canvas.context.getImageData(1, 0, 1, 1);\n\n    //  Compare and return\n    return (s2.data[0] === s1.data[0] && s2.data[1] === s1.data[1] && s2.data[2] === s1.data[2] && s2.data[3] === s1.data[3]);\n};\n\n/**\n * If the browser isn't capable of handling tinting with alpha this will be false.\n * This property is only applicable if using tintWithPerPixel.\n *\n * @property canHandleAlpha\n * @type Boolean\n * @static\n */\nPIXI.CanvasTinter.canHandleAlpha = PIXI.CanvasTinter.checkInverseAlpha();\n\n/**\n * Whether or not the Canvas BlendModes are supported, consequently the ability to tint using the multiply method.\n *\n * @property canUseMultiply\n * @type Boolean\n * @static\n */\nPIXI.CanvasTinter.canUseMultiply = PIXI.canUseNewCanvasBlendModes();\n\n/**\n * The tinting method that will be used.\n * \n * @method tintMethod\n * @static\n */\nPIXI.CanvasTinter.tintMethod = PIXI.CanvasTinter.canUseMultiply ? PIXI.CanvasTinter.tintWithMultiply :  PIXI.CanvasTinter.tintWithPerPixel;\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.\n * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)\n *\n * @class CanvasRenderer\n * @constructor\n * @param game {Phaser.Game} A reference to the Phaser Game instance\n */\nPIXI.CanvasRenderer = function (game) {\n\n    /**\n    * @property {Phaser.Game} game - A reference to the Phaser Game instance.\n    */\n    this.game = game;\n\n    if (!PIXI.defaultRenderer)\n    {\n        PIXI.defaultRenderer = this;\n    }\n\n    /**\n     * The renderer type.\n     *\n     * @property type\n     * @type Number\n     */\n    this.type = PIXI.CANVAS_RENDERER;\n\n    /**\n     * The resolution of the canvas.\n     *\n     * @property resolution\n     * @type Number\n     */\n    this.resolution = game.resolution;\n\n    /**\n     * This sets if the CanvasRenderer will clear the canvas or not before the new render pass.\n     * If the Stage is NOT transparent Pixi will use a canvas sized fillRect operation every frame to set the canvas background color.\n     * If the Stage is transparent Pixi will use clearRect to clear the canvas every frame.\n     * Disable this by setting this to false. For example if your game has a canvas filling background image you often don't need this set.\n     *\n     * @property clearBeforeRender\n     * @type Boolean\n     * @default\n     */\n    this.clearBeforeRender = game.clearBeforeRender;\n\n    /**\n     * Whether the render view is transparent\n     *\n     * @property transparent\n     * @type Boolean\n     */\n    this.transparent = game.transparent;\n\n    /**\n     * Whether the render view should be resized automatically\n     *\n     * @property autoResize\n     * @type Boolean\n     */\n    this.autoResize = false;\n\n    /**\n     * The width of the canvas view\n     *\n     * @property width\n     * @type Number\n     * @default 800\n     */\n    this.width = game.width * this.resolution;\n\n    /**\n     * The height of the canvas view\n     *\n     * @property height\n     * @type Number\n     * @default 600\n     */\n    this.height = game.height * this.resolution;\n\n    /**\n     * The canvas element that everything is drawn to.\n     *\n     * @property view\n     * @type HTMLCanvasElement\n     */\n    this.view = game.canvas;\n\n    /**\n     * The canvas 2d context that everything is drawn with\n     * @property context\n     * @type CanvasRenderingContext2D\n     */\n    this.context = this.view.getContext(\"2d\", { alpha: this.transparent } );\n\n    /**\n     * Boolean flag controlling canvas refresh.\n     *\n     * @property refresh\n     * @type Boolean\n     */\n    this.refresh = true;\n\n    /**\n     * Internal var.\n     *\n     * @property count\n     * @type Number\n     */\n    this.count = 0;\n\n    /**\n     * Instance of a PIXI.CanvasMaskManager, handles masking when using the canvas renderer\n     * @property CanvasMaskManager\n     * @type CanvasMaskManager\n     */\n    this.maskManager = new PIXI.CanvasMaskManager();\n\n    /**\n     * The render session is just a bunch of parameter used for rendering\n     * @property renderSession\n     * @type Object\n     */\n    this.renderSession = {\n        context: this.context,\n        maskManager: this.maskManager,\n        scaleMode: null,\n        smoothProperty: Phaser.Canvas.getSmoothingPrefix(this.context),\n\n        /**\n         * If true Pixi will Math.floor() x/y values when rendering, stopping pixel interpolation.\n         * Handy for crisp pixel art and speed on legacy devices.\n         */\n        roundPixels: false\n    };\n\n    this.mapBlendModes();\n    \n    this.resize(this.width, this.height);\n\n};\n\n// constructor\nPIXI.CanvasRenderer.prototype.constructor = PIXI.CanvasRenderer;\n\n/**\n * Renders the DisplayObjectContainer, usually the Phaser.Stage, to this canvas view.\n *\n * @method render\n * @param root {Phaser.Stage|PIXI.DisplayObjectContainer} The root element to be rendered.\n */\nPIXI.CanvasRenderer.prototype.render = function (root) {\n\n    this.context.setTransform(1, 0, 0, 1, 0, 0);\n\n    this.context.globalAlpha = 1;\n\n    this.renderSession.currentBlendMode = 0;\n    this.renderSession.shakeX = this.game.camera._shake.x;\n    this.renderSession.shakeY = this.game.camera._shake.y;\n\n    this.context.globalCompositeOperation = 'source-over';\n\n    if (navigator.isCocoonJS && this.view.screencanvas)\n    {\n        this.context.fillStyle = \"black\";\n        this.context.clear();\n    }\n    \n    if (this.clearBeforeRender)\n    {\n        if (this.transparent)\n        {\n            this.context.clearRect(0, 0, this.width, this.height);\n        }\n        else if (root._bgColor)\n        {\n            this.context.fillStyle = root._bgColor.rgba;\n            this.context.fillRect(0, 0, this.width , this.height);\n        }\n    }\n    \n    this.renderDisplayObject(root);\n\n};\n\n\n/**\n * Removes everything from the renderer and optionally removes the Canvas DOM element.\n *\n * @method destroy\n * @param [removeView=true] {boolean} Removes the Canvas element from the DOM.\n */\nPIXI.CanvasRenderer.prototype.destroy = function (removeView) {\n\n    if (removeView === undefined) { removeView = true; }\n\n    if (removeView && this.view.parent)\n    {\n        this.view.parent.removeChild(this.view);\n    }\n\n    this.view = null;\n    this.context = null;\n    this.maskManager = null;\n    this.renderSession = null;\n\n};\n\n/**\n * Resizes the canvas view to the specified width and height\n *\n * @method resize\n * @param width {Number} the new width of the canvas view\n * @param height {Number} the new height of the canvas view\n */\nPIXI.CanvasRenderer.prototype.resize = function (width, height) {\n\n    this.width = width * this.resolution;\n    this.height = height * this.resolution;\n\n    this.view.width = this.width;\n    this.view.height = this.height;\n\n    if (this.autoResize)\n    {\n        this.view.style.width = this.width / this.resolution + \"px\";\n        this.view.style.height = this.height / this.resolution + \"px\";\n    }\n\n    if (this.renderSession.smoothProperty)\n    {\n        this.context[this.renderSession.smoothProperty] = (this.renderSession.scaleMode === PIXI.scaleModes.LINEAR);\n    }\n\n};\n\n/**\n * Renders a display object\n *\n * @method renderDisplayObject\n * @param displayObject {DisplayObject} The displayObject to render\n * @param context {CanvasRenderingContext2D} the context 2d method of the canvas\n * @param [matrix] {Matrix} Optional matrix to apply to the display object before rendering.\n * @private\n */\nPIXI.CanvasRenderer.prototype.renderDisplayObject = function (displayObject, context, matrix) {\n\n    this.renderSession.context = context || this.context;\n    this.renderSession.resolution = this.resolution;\n    displayObject._renderCanvas(this.renderSession, matrix);\n\n};\n\n/**\n * Maps Pixi blend modes to canvas blend modes.\n *\n * @method mapBlendModes\n * @private\n */\nPIXI.CanvasRenderer.prototype.mapBlendModes = function () {\n\n    if (!PIXI.blendModesCanvas)\n    {\n        var b = [];\n        var modes = PIXI.blendModes;\n        var useNew = PIXI.canUseNewCanvasBlendModes();\n\n        b[modes.NORMAL] = 'source-over';\n        b[modes.ADD] = 'lighter';\n        b[modes.MULTIPLY] = (useNew) ? 'multiply' : 'source-over';\n        b[modes.SCREEN] = (useNew) ? 'screen' : 'source-over';\n        b[modes.OVERLAY] = (useNew) ? 'overlay' : 'source-over';\n        b[modes.DARKEN] = (useNew) ? 'darken' : 'source-over';\n        b[modes.LIGHTEN] = (useNew) ? 'lighten' : 'source-over';\n        b[modes.COLOR_DODGE] = (useNew) ? 'color-dodge' : 'source-over';\n        b[modes.COLOR_BURN] = (useNew) ? 'color-burn' : 'source-over';\n        b[modes.HARD_LIGHT] = (useNew) ? 'hard-light' : 'source-over';\n        b[modes.SOFT_LIGHT] = (useNew) ? 'soft-light' : 'source-over';\n        b[modes.DIFFERENCE] = (useNew) ? 'difference' : 'source-over';\n        b[modes.EXCLUSION] = (useNew) ? 'exclusion' : 'source-over';\n        b[modes.HUE] = (useNew) ? 'hue' : 'source-over';\n        b[modes.SATURATION] = (useNew) ? 'saturation' : 'source-over';\n        b[modes.COLOR] = (useNew) ? 'color' : 'source-over';\n        b[modes.LUMINOSITY] = (useNew) ? 'luminosity' : 'source-over';\n\n        PIXI.blendModesCanvas = b;\n    }\n\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * A texture stores the information that represents an image. All textures have a base texture.\n *\n * @class BaseTexture\n * @uses EventTarget\n * @constructor\n * @param source {String|Canvas} the source object (image or canvas)\n * @param scaleMode {Number} See {{#crossLink \"PIXI/scaleModes:property\"}}PIXI.scaleModes{{/crossLink}} for possible values\n */\nPIXI.BaseTexture = function(source, scaleMode)\n{\n    /**\n     * The Resolution of the texture. \n     *\n     * @property resolution\n     * @type Number\n     */\n    this.resolution = 1;\n    \n    /**\n     * [read-only] The width of the base texture set when the image has loaded\n     *\n     * @property width\n     * @type Number\n     * @readOnly\n     */\n    this.width = 100;\n\n    /**\n     * [read-only] The height of the base texture set when the image has loaded\n     *\n     * @property height\n     * @type Number\n     * @readOnly\n     */\n    this.height = 100;\n\n    /**\n     * The scale mode to apply when scaling this texture\n     * \n     * @property scaleMode\n     * @type {Number}\n     * @default PIXI.scaleModes.LINEAR\n     */\n    this.scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;\n\n    /**\n     * [read-only] Set to true once the base texture has loaded\n     *\n     * @property hasLoaded\n     * @type Boolean\n     * @readOnly\n     */\n    this.hasLoaded = false;\n\n    /**\n     * The image source that is used to create the texture.\n     *\n     * @property source\n     * @type Image\n     */\n    this.source = source;\n\n    /**\n     * Controls if RGB channels should be pre-multiplied by Alpha  (WebGL only)\n     *\n     * @property premultipliedAlpha\n     * @type Boolean\n     * @default true\n     */\n    this.premultipliedAlpha = true;\n\n    // used for webGL\n\n    /**\n     * @property _glTextures\n     * @type Array\n     * @private\n     */\n    this._glTextures = [];\n\n    /**\n     * Set this to true if a mipmap of this texture needs to be generated. This value needs to be set before the texture is used\n     * Also the texture must be a power of two size to work\n     * \n     * @property mipmap\n     * @type {Boolean}\n     */\n    this.mipmap = false;\n\n    /**\n     * @property _dirty\n     * @type Array\n     * @private\n     */\n    this._dirty = [true, true, true, true];\n\n    if (!source)\n    {\n        return;\n    }\n\n    if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height)\n    {\n        this.hasLoaded = true;\n        this.width = this.source.naturalWidth || this.source.width;\n        this.height = this.source.naturalHeight || this.source.height;\n        this.dirty();\n    }\n\n    /**\n     * A BaseTexture can be set to skip the rendering phase in the WebGL Sprite Batch.\n     * \n     * You may want to do this if you have a parent Sprite with no visible texture (i.e. uses the internal `__default` texture)\n     * that has children that you do want to render, without causing a batch flush in the process.\n     * \n     * @property skipRender\n     * @type Boolean\n     */\n    this.skipRender = false;\n\n    /**\n     * @property _powerOf2\n     * @type Boolean\n     * @private\n     */\n    this._powerOf2 = false;\n\n};\n\nPIXI.BaseTexture.prototype.constructor = PIXI.BaseTexture;\n\n/**\n * Forces this BaseTexture to be set as loaded, with the given width and height.\n * Then calls BaseTexture.dirty.\n * Important for when you don't want to modify the source object by forcing in `complete` or dimension properties it may not have.\n *\n * @method forceLoaded\n * @param {number} width - The new width to force the BaseTexture to be.\n * @param {number} height - The new height to force the BaseTexture to be.\n */\nPIXI.BaseTexture.prototype.forceLoaded = function(width, height)\n{\n    this.hasLoaded = true;\n    this.width = width;\n    this.height = height;\n    this.dirty();\n};\n\n/**\n * Destroys this base texture\n *\n * @method destroy\n */\nPIXI.BaseTexture.prototype.destroy = function()\n{\n    if (this.source)\n    {\n        PIXI.CanvasPool.removeByCanvas(this.source);\n    }\n\n    this.source = null;\n\n    this.unloadFromGPU();\n};\n\n/**\n * Changes the source image of the texture\n *\n * @method updateSourceImage\n * @param newSrc {String} the path of the image\n * @deprecated This method is deprecated. Please use Phaser.Sprite.loadTexture instead.\n */\nPIXI.BaseTexture.prototype.updateSourceImage = function(newSrc)\n{\n    console.warn(\"PIXI.BaseTexture.updateSourceImage is deprecated. Use Phaser.Sprite.loadTexture instead.\");\n};\n\n/**\n * Sets all glTextures to be dirty.\n *\n * @method dirty\n */\nPIXI.BaseTexture.prototype.dirty = function()\n{\n    for (var i = 0; i < this._glTextures.length; i++)\n    {\n        this._dirty[i] = true;\n    }\n};\n\n/**\n * Removes the base texture from the GPU, useful for managing resources on the GPU.\n * Atexture is still 100% usable and will simply be reuploaded if there is a sprite on screen that is using it.\n *\n * @method unloadFromGPU\n */\nPIXI.BaseTexture.prototype.unloadFromGPU = function()\n{\n    this.dirty();\n\n    // delete the webGL textures if any.\n    for (var i = this._glTextures.length - 1; i >= 0; i--)\n    {\n        var glTexture = this._glTextures[i];\n        var gl = PIXI.glContexts[i];\n\n        if(gl && glTexture)\n        {\n            gl.deleteTexture(glTexture);\n        }\n        \n    }\n\n    this._glTextures.length = 0;\n\n    this.dirty();\n};\n\n/**\n * Helper function that creates a base texture from the given canvas element.\n *\n * @static\n * @method fromCanvas\n * @param canvas {Canvas} The canvas element source of the texture\n * @param scaleMode {Number} See {{#crossLink \"PIXI/scaleModes:property\"}}PIXI.scaleModes{{/crossLink}} for possible values\n * @return {BaseTexture}\n */\nPIXI.BaseTexture.fromCanvas = function(canvas, scaleMode)\n{\n    if (canvas.width === 0)\n    {\n        canvas.width = 1;\n    }\n\n    if (canvas.height === 0)\n    {\n        canvas.height = 1;\n    }\n\n    return new PIXI.BaseTexture(canvas, scaleMode);\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * TextureSilentFail is a boolean that defaults to `false`. \n * If `true` then `PIXI.Texture.setFrame` will no longer throw an error if the texture dimensions are incorrect. \n * Instead `Texture.valid` will be set to `false` (#1556)\n *\n * @type {boolean}\n */\nPIXI.TextureSilentFail = false;\n\n/**\n * A texture stores the information that represents an image or part of an image. It cannot be added\n * to the display list directly. Instead use it as the texture for a PIXI.Sprite. If no frame is provided then the whole image is used.\n *\n * @class Texture\n * @uses EventTarget\n * @constructor\n * @param baseTexture {BaseTexture} The base texture source to create the texture from\n * @param frame {Rectangle} The rectangle frame of the texture to show\n * @param [crop] {Rectangle} The area of original texture \n * @param [trim] {Rectangle} Trimmed texture rectangle\n */\nPIXI.Texture = function(baseTexture, frame, crop, trim)\n{\n    /**\n     * Does this Texture have any frame data assigned to it?\n     *\n     * @property noFrame\n     * @type Boolean\n     */\n    this.noFrame = false;\n\n    if (!frame)\n    {\n        this.noFrame = true;\n        frame = new PIXI.Rectangle(0,0,1,1);\n    }\n\n    if (baseTexture instanceof PIXI.Texture)\n    {\n        baseTexture = baseTexture.baseTexture;\n    }\n\n    /**\n     * The base texture that this texture uses.\n     *\n     * @property baseTexture\n     * @type BaseTexture\n     */\n    this.baseTexture = baseTexture;\n\n    /**\n     * The frame specifies the region of the base texture that this texture uses\n     *\n     * @property frame\n     * @type Rectangle\n     */\n    this.frame = frame;\n\n    /**\n     * The texture trim data.\n     *\n     * @property trim\n     * @type Rectangle\n     */\n    this.trim = trim;\n\n    /**\n     * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.\n     *\n     * @property valid\n     * @type Boolean\n     */\n    this.valid = false;\n\n    /**\n     * Is this a tiling texture? As used by the likes of a TilingSprite.\n     *\n     * @property isTiling\n     * @type Boolean\n     */\n    this.isTiling = false;\n\n    /**\n     * This will let a renderer know that a texture has been updated (used mainly for webGL uv updates)\n     *\n     * @property requiresUpdate\n     * @type Boolean\n     */\n    this.requiresUpdate = false;\n\n    /**\n     * This will let a renderer know that a tinted parent has updated its texture.\n     *\n     * @property requiresReTint\n     * @type Boolean\n     */\n    this.requiresReTint = false;\n\n    /**\n     * The WebGL UV data cache.\n     *\n     * @property _uvs\n     * @type Object\n     * @private\n     */\n    this._uvs = null;\n\n    /**\n     * The width of the Texture in pixels.\n     *\n     * @property width\n     * @type Number\n     */\n    this.width = 0;\n\n    /**\n     * The height of the Texture in pixels.\n     *\n     * @property height\n     * @type Number\n     */\n    this.height = 0;\n\n    /**\n     * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,\n     * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)\n     *\n     * @property crop\n     * @type Rectangle\n     */\n    this.crop = crop || new PIXI.Rectangle(0, 0, 1, 1);\n\n    if (baseTexture.hasLoaded)\n    {\n        if (this.noFrame) frame = new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height);\n        this.setFrame(frame);\n    }\n\n};\n\nPIXI.Texture.prototype.constructor = PIXI.Texture;\n\n/**\n * Called when the base texture is loaded\n *\n * @method onBaseTextureLoaded\n * @private\n */\nPIXI.Texture.prototype.onBaseTextureLoaded = function()\n{\n    var baseTexture = this.baseTexture;\n\n    if (this.noFrame)\n    {\n        this.frame = new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height);\n    }\n\n    this.setFrame(this.frame);\n};\n\n/**\n * Destroys this texture\n *\n * @method destroy\n * @param destroyBase {Boolean} Whether to destroy the base texture as well\n */\nPIXI.Texture.prototype.destroy = function(destroyBase)\n{\n    if (destroyBase) this.baseTexture.destroy();\n\n    this.valid = false;\n};\n\n/**\n * Specifies the region of the baseTexture that this texture will use.\n *\n * @method setFrame\n * @param frame {Rectangle} The frame of the texture to set it to\n */\nPIXI.Texture.prototype.setFrame = function(frame)\n{\n    this.noFrame = false;\n\n    this.frame = frame;\n    this.width = frame.width;\n    this.height = frame.height;\n\n    this.crop.x = frame.x;\n    this.crop.y = frame.y;\n    this.crop.width = frame.width;\n    this.crop.height = frame.height;\n\n    if (!this.trim && (frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height))\n    {\n        if (!PIXI.TextureSilentFail)\n        {\n            throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);\n        }\n\n        this.valid = false;\n        return;\n    }\n\n    this.valid = frame && frame.width && frame.height && this.baseTexture.source && this.baseTexture.hasLoaded;\n\n    if (this.trim)\n    {\n        this.width = this.trim.width;\n        this.height = this.trim.height;\n        this.frame.width = this.trim.width;\n        this.frame.height = this.trim.height;\n    }\n    \n    if (this.valid) this._updateUvs();\n\n};\n\n/**\n * Updates the internal WebGL UV cache.\n *\n * @method _updateUvs\n * @private\n */\nPIXI.Texture.prototype._updateUvs = function()\n{\n    if(!this._uvs)this._uvs = new PIXI.TextureUvs();\n\n    var frame = this.crop;\n    var tw = this.baseTexture.width;\n    var th = this.baseTexture.height;\n    \n    this._uvs.x0 = frame.x / tw;\n    this._uvs.y0 = frame.y / th;\n\n    this._uvs.x1 = (frame.x + frame.width) / tw;\n    this._uvs.y1 = frame.y / th;\n\n    this._uvs.x2 = (frame.x + frame.width) / tw;\n    this._uvs.y2 = (frame.y + frame.height) / th;\n\n    this._uvs.x3 = frame.x / tw;\n    this._uvs.y3 = (frame.y + frame.height) / th;\n};\n\n/**\n * Helper function that creates a new a Texture based on the given canvas element.\n *\n * @static\n * @method fromCanvas\n * @param canvas {Canvas} The canvas element source of the texture\n * @param scaleMode {Number} See {{#crossLink \"PIXI/scaleModes:property\"}}PIXI.scaleModes{{/crossLink}} for possible values\n * @return {Texture}\n */\nPIXI.Texture.fromCanvas = function(canvas, scaleMode)\n{\n    var baseTexture = PIXI.BaseTexture.fromCanvas(canvas, scaleMode);\n\n    return new PIXI.Texture(baseTexture);\n};\n\nPIXI.TextureUvs = function()\n{\n    this.x0 = 0;\n    this.y0 = 0;\n\n    this.x1 = 0;\n    this.y1 = 0;\n\n    this.x2 = 0;\n    this.y2 = 0;\n\n    this.x3 = 0;\n    this.y3 = 0;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * A RenderTexture is a special texture that allows any Pixi display object to be rendered to it.\n *\n * __Hint__: All DisplayObjects (i.e. Sprites) that render to a RenderTexture should be preloaded otherwise black rectangles will be drawn instead.\n *\n * A RenderTexture takes a snapshot of any Display Object given to its render method. The position and rotation of the given Display Objects is ignored. For example:\n *\n *    var renderTexture = new PIXI.RenderTexture(800, 600);\n *    var sprite = PIXI.Sprite.fromImage(\"spinObj_01.png\");\n *    sprite.position.x = 800/2;\n *    sprite.position.y = 600/2;\n *    sprite.anchor.x = 0.5;\n *    sprite.anchor.y = 0.5;\n *    renderTexture.render(sprite);\n *\n * The Sprite in this case will be rendered to a position of 0,0. To render this sprite at its actual position a DisplayObjectContainer should be used:\n *\n *    var doc = new PIXI.DisplayObjectContainer();\n *    doc.addChild(sprite);\n *    renderTexture.render(doc);  // Renders to center of renderTexture\n *\n * @class RenderTexture\n * @extends Texture\n * @constructor\n * @param width {Number} The width of the render texture\n * @param height {Number} The height of the render texture\n * @param renderer {CanvasRenderer|WebGLRenderer} The renderer used for this RenderTexture\n * @param scaleMode {Number} See {{#crossLink \"PIXI/scaleModes:property\"}}PIXI.scaleModes{{/crossLink}} for possible values\n * @param resolution {Number} The resolution of the texture being generated\n */\nPIXI.RenderTexture = function(width, height, renderer, scaleMode, resolution)\n{\n    /**\n     * The with of the render texture\n     *\n     * @property width\n     * @type Number\n     */\n    this.width = width || 100;\n\n    /**\n     * The height of the render texture\n     *\n     * @property height\n     * @type Number\n     */\n    this.height = height || 100;\n\n    /**\n     * The Resolution of the texture.\n     *\n     * @property resolution\n     * @type Number\n     */\n    this.resolution = resolution || 1;\n\n    /**\n     * The framing rectangle of the render texture\n     *\n     * @property frame\n     * @type Rectangle\n     */\n    this.frame = new PIXI.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);\n\n    /**\n     * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,\n     * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)\n     *\n     * @property crop\n     * @type Rectangle\n     */\n    this.crop = new PIXI.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);\n\n    /**\n     * The base texture object that this texture uses\n     *\n     * @property baseTexture\n     * @type BaseTexture\n     */\n    this.baseTexture = new PIXI.BaseTexture();\n    this.baseTexture.width = this.width * this.resolution;\n    this.baseTexture.height = this.height * this.resolution;\n    this.baseTexture._glTextures = [];\n    this.baseTexture.resolution = this.resolution;\n\n    this.baseTexture.scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;\n\n    this.baseTexture.hasLoaded = true;\n\n    PIXI.Texture.call(this,\n        this.baseTexture,\n        new PIXI.Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution)\n    );\n\n    /**\n     * The renderer this RenderTexture uses. A RenderTexture can only belong to one renderer at the moment if its webGL.\n     *\n     * @property renderer\n     * @type CanvasRenderer|WebGLRenderer\n     */\n    this.renderer = renderer || PIXI.defaultRenderer;\n\n    if (this.renderer.type === PIXI.WEBGL_RENDERER)\n    {\n        var gl = this.renderer.gl;\n        this.baseTexture._dirty[gl.id] = false;\n\n        this.textureBuffer = new PIXI.FilterTexture(gl, this.width, this.height, this.baseTexture.scaleMode);\n        this.baseTexture._glTextures[gl.id] =  this.textureBuffer.texture;\n\n        this.render = this.renderWebGL;\n        this.projection = new PIXI.Point(this.width * 0.5, -this.height * 0.5);\n    }\n    else\n    {\n        this.render = this.renderCanvas;\n        this.textureBuffer = new PIXI.CanvasBuffer(this.width * this.resolution, this.height * this.resolution);\n        this.baseTexture.source = this.textureBuffer.canvas;\n    }\n\n    /**\n     * @property valid\n     * @type Boolean\n     */\n    this.valid = true;\n\n    this.tempMatrix = new Phaser.Matrix();\n\n    this._updateUvs();\n};\n\nPIXI.RenderTexture.prototype = Object.create(PIXI.Texture.prototype);\nPIXI.RenderTexture.prototype.constructor = PIXI.RenderTexture;\n\n/**\n * Resizes the RenderTexture.\n *\n * @method resize\n * @param width {Number} The width to resize to.\n * @param height {Number} The height to resize to.\n * @param updateBase {Boolean} Should the baseTexture.width and height values be resized as well?\n */\nPIXI.RenderTexture.prototype.resize = function(width, height, updateBase)\n{\n    if (width === this.width && height === this.height)return;\n\n    this.valid = (width > 0 && height > 0);\n\n    this.width = width;\n    this.height = height;\n    this.frame.width = this.crop.width = width * this.resolution;\n    this.frame.height = this.crop.height = height * this.resolution;\n\n    if (updateBase)\n    {\n        this.baseTexture.width = this.width * this.resolution;\n        this.baseTexture.height = this.height * this.resolution;\n    }\n\n    if (this.renderer.type === PIXI.WEBGL_RENDERER)\n    {\n        this.projection.x = this.width / 2;\n        this.projection.y = -this.height / 2;\n    }\n\n    if(!this.valid)return;\n\n    this.textureBuffer.resize(this.width, this.height);\n};\n\n/**\n * Clears the RenderTexture.\n *\n * @method clear\n */\nPIXI.RenderTexture.prototype.clear = function()\n{\n    if (!this.valid)\n    {\n        return;\n    }\n\n    if (this.renderer.type === PIXI.WEBGL_RENDERER)\n    {\n        this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer);\n    }\n\n    this.textureBuffer.clear();\n};\n\n/**\n * This function will draw the display object to the texture.\n *\n * @method renderWebGL\n * @param displayObject {DisplayObject} The display object to render this texture on\n * @param [matrix] {Matrix} Optional matrix to apply to the display object before rendering.\n * @param [clear] {Boolean} If true the texture will be cleared before the displayObject is drawn\n * @private\n */\nPIXI.RenderTexture.prototype.renderWebGL = function(displayObject, matrix, clear)\n{\n    if (!this.valid || displayObject.alpha === 0)\n    {\n        return;\n    }\n   \n    //  Let's create a nice matrix to apply to our display object.\n    //  Frame buffers come in upside down so we need to flip the matrix.\n    var wt = displayObject.worldTransform;\n    wt.identity();\n    wt.translate(0, this.projection.y * 2);\n\n    if (matrix)\n    {\n        wt.append(matrix);\n    }\n\n    wt.scale(1, -1);\n\n    //  Time to update all the children of the displayObject with the new matrix.\n    for (var i = 0; i < displayObject.children.length; i++)\n    {\n        displayObject.children[i].updateTransform();\n    }\n    \n    //  Time for the webGL fun stuff!\n    var gl = this.renderer.gl;\n\n    gl.viewport(0, 0, this.width * this.resolution, this.height * this.resolution);\n\n    gl.bindFramebuffer(gl.FRAMEBUFFER, this.textureBuffer.frameBuffer );\n\n    if (clear)\n    {\n        this.textureBuffer.clear();\n    }\n\n    this.renderer.spriteBatch.dirty = true;\n\n    this.renderer.renderDisplayObject(displayObject, this.projection, this.textureBuffer.frameBuffer, matrix);\n\n    this.renderer.spriteBatch.dirty = true;\n\n};\n\n/**\n * This function will draw the display object to the texture.\n *\n * @method renderCanvas\n * @param displayObject {DisplayObject} The display object to render this texture on\n * @param [matrix] {Matrix} Optional matrix to apply to the display object before rendering.\n * @param [clear] {Boolean} If true the texture will be cleared before the displayObject is drawn\n * @private\n */\nPIXI.RenderTexture.prototype.renderCanvas = function(displayObject, matrix, clear)\n{\n    if (!this.valid || displayObject.alpha === 0)\n    {\n        return;\n    }\n\n    //  Let's create a nice matrix to apply to our display object.\n    //  Frame buffers come in upside down so we need to flip the matrix.\n    var wt = displayObject.worldTransform;\n    wt.identity();\n\n    if (matrix)\n    {\n        wt.append(matrix);\n    }\n\n    // Time to update all the children of the displayObject with the new matrix (what new matrix? there isn't one!)\n    for (var i = 0; i < displayObject.children.length; i++)\n    {\n        displayObject.children[i].updateTransform();\n    }\n\n    if (clear)\n    {\n        this.textureBuffer.clear();\n    }\n\n    var realResolution = this.renderer.resolution;\n\n    this.renderer.resolution = this.resolution;\n\n    this.renderer.renderDisplayObject(displayObject, this.textureBuffer.context, matrix);\n\n    this.renderer.resolution = realResolution;\n};\n\n/**\n * Will return a HTML Image of the texture\n *\n * @method getImage\n * @return {Image}\n */\nPIXI.RenderTexture.prototype.getImage = function()\n{\n    var image = new Image();\n    image.src = this.getBase64();\n    return image;\n};\n\n/**\n * Will return a base64 encoded string of this texture. It works by calling RenderTexture.getCanvas and then running toDataURL on that.\n *\n * @method getBase64\n * @return {String} A base64 encoded string of the texture.\n */\nPIXI.RenderTexture.prototype.getBase64 = function()\n{\n    return this.getCanvas().toDataURL();\n};\n\n/**\n * Creates a Canvas element, renders this RenderTexture to it and then returns it.\n *\n * @method getCanvas\n * @return {HTMLCanvasElement} A Canvas element with the texture rendered on.\n */\nPIXI.RenderTexture.prototype.getCanvas = function()\n{\n    if (this.renderer.type === PIXI.WEBGL_RENDERER)\n    {\n        var gl =  this.renderer.gl;\n        var width = this.textureBuffer.width;\n        var height = this.textureBuffer.height;\n\n        var webGLPixels = new Uint8Array(4 * width * height);\n\n        gl.bindFramebuffer(gl.FRAMEBUFFER, this.textureBuffer.frameBuffer);\n        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webGLPixels);\n        gl.bindFramebuffer(gl.FRAMEBUFFER, null);\n\n        var tempCanvas = new PIXI.CanvasBuffer(width, height);\n        var canvasData = tempCanvas.context.getImageData(0, 0, width, height);\n        canvasData.data.set(webGLPixels);\n\n        tempCanvas.context.putImageData(canvasData, 0, 0);\n\n        return tempCanvas.canvas;\n    }\n    else\n    {\n        return this.textureBuffer.canvas;\n    }\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n/**\n * This is the base class for creating a PIXI filter. Currently only webGL supports filters.\n * If you want to make a custom filter this should be your base class.\n * \n * @class AbstractFilter\n * @constructor\n * @param fragmentSrc {Array} The fragment source in an array of strings.\n * @param uniforms {Object} An object containing the uniforms for this filter.\n */\nPIXI.AbstractFilter = function(fragmentSrc, uniforms)\n{\n    /**\n    * An array of passes - some filters contain a few steps this array simply stores the steps in a liniear fashion.\n    * For example the blur filter has two passes blurX and blurY.\n    * @property passes\n    * @type Array\n    * @private\n    */\n    this.passes = [this];\n\n    /**\n    * @property shaders\n    * @type Array\n    * @private\n    */\n    this.shaders = [];\n    \n    /**\n    * @property dirty\n    * @type Boolean\n    */\n    this.dirty = true;\n\n    /**\n    * @property padding\n    * @type Number\n    */\n    this.padding = 0;\n\n    /**\n    * @property uniforms\n    * @type Object\n    * @private\n    */\n    this.uniforms = uniforms || {};\n\n    /**\n    * @property fragmentSrc\n    * @type Array\n    * @private\n    */\n    this.fragmentSrc = fragmentSrc || [];\n};\n\nPIXI.AbstractFilter.prototype.constructor = PIXI.AbstractFilter;\n\n/**\n * Syncs the uniforms between the class object and the shaders.\n *\n * @method syncUniforms\n */\nPIXI.AbstractFilter.prototype.syncUniforms = function()\n{\n    for(var i=0,j=this.shaders.length; i<j; i++)\n    {\n        this.shaders[i].dirty = true;\n    }\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/\n */\n\n /**\n *\n * @class Strip\n * @extends DisplayObjectContainer\n * @constructor\n * @param texture {Texture} The texture to use\n * @param width {Number} the width\n * @param height {Number} the height\n *\n */\nPIXI.Strip = function(texture)\n{\n    PIXI.DisplayObjectContainer.call( this );\n\n\n    /**\n     * The texture of the strip\n     *\n     * @property texture\n     * @type Texture\n     */\n    this.texture = texture;\n\n    // set up the main bits..\n    this.uvs = new PIXI.Float32Array([0, 1,\n                                      1, 1,\n                                      1, 0,\n                                      0, 1]);\n\n    this.vertices = new PIXI.Float32Array([0, 0,\n                                            100, 0,\n                                            100, 100,\n                                            0, 100]);\n\n    this.colors = new PIXI.Float32Array([1, 1, 1, 1]);\n\n    this.indices = new PIXI.Uint16Array([0, 1, 2, 3]);\n\n    /**\n     * Whether the strip is dirty or not\n     *\n     * @property dirty\n     * @type Boolean\n     */\n    this.dirty = true;\n\n    /**\n     * The blend mode to be applied to the sprite. Set to PIXI.blendModes.NORMAL to remove any blend mode.\n     *\n     * @property blendMode\n     * @type Number\n     * @default PIXI.blendModes.NORMAL;\n     */\n    this.blendMode = PIXI.blendModes.NORMAL;\n\n    /**\n     * Triangles in canvas mode are automatically antialiased, use this value to force triangles to overlap a bit with each other.\n     *\n     * @property canvasPadding\n     * @type Number\n     */\n    this.canvasPadding = 0;\n\n    this.drawMode = PIXI.Strip.DrawModes.TRIANGLE_STRIP;\n\n};\n\n// constructor\nPIXI.Strip.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);\nPIXI.Strip.prototype.constructor = PIXI.Strip;\n\nPIXI.Strip.prototype._renderWebGL = function(renderSession)\n{\n    // if the sprite is not visible or the alpha is 0 then no need to render this element\n    if(!this.visible || this.alpha <= 0)return;\n    // render triangle strip..\n\n    renderSession.spriteBatch.stop();\n\n    // init! init!\n    if(!this._vertexBuffer)this._initWebGL(renderSession);\n\n    renderSession.shaderManager.setShader(renderSession.shaderManager.stripShader);\n\n    this._renderStrip(renderSession);\n\n    ///renderSession.shaderManager.activateDefaultShader();\n\n    renderSession.spriteBatch.start();\n\n    //TODO check culling\n};\n\nPIXI.Strip.prototype._initWebGL = function(renderSession)\n{\n    // build the strip!\n    var gl = renderSession.gl;\n\n    this._vertexBuffer = gl.createBuffer();\n    this._indexBuffer = gl.createBuffer();\n    this._uvBuffer = gl.createBuffer();\n    this._colorBuffer = gl.createBuffer();\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER,  this.uvs, gl.STATIC_DRAW);\n\n    gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);\n\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);\n    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);\n};\n\nPIXI.Strip.prototype._renderStrip = function(renderSession)\n{\n    var gl = renderSession.gl;\n    var projection = renderSession.projection,\n        offset = renderSession.offset,\n        shader = renderSession.shaderManager.stripShader;\n\n    var drawMode = this.drawMode === PIXI.Strip.DrawModes.TRIANGLE_STRIP ? gl.TRIANGLE_STRIP : gl.TRIANGLES;\n\n    // gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mat4Real);\n\n    renderSession.blendModeManager.setBlendMode(this.blendMode);\n\n\n    // set uniforms\n    gl.uniformMatrix3fv(shader.translationMatrix, false, this.worldTransform.toArray(true));\n    gl.uniform2f(shader.projectionVector, projection.x, -projection.y);\n    gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);\n    gl.uniform1f(shader.alpha, this.worldAlpha);\n\n    if(!this.dirty)\n    {\n\n        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);\n        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);\n        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);\n\n        // update the uvs\n        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);\n        gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);\n\n        gl.activeTexture(gl.TEXTURE0);\n\n        // check if a texture is dirty..\n        if(this.texture.baseTexture._dirty[gl.id])\n        {\n            renderSession.renderer.updateTexture(this.texture.baseTexture);\n        }\n        else\n        {\n            // bind the current texture\n            gl.bindTexture(gl.TEXTURE_2D, this.texture.baseTexture._glTextures[gl.id]);\n        }\n\n        // dont need to upload!\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);\n\n\n    }\n    else\n    {\n\n        this.dirty = false;\n        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);\n        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);\n        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);\n\n        // update the uvs\n        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);\n        gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);\n        gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);\n\n        gl.activeTexture(gl.TEXTURE0);\n\n        // check if a texture is dirty..\n        if(this.texture.baseTexture._dirty[gl.id])\n        {\n            renderSession.renderer.updateTexture(this.texture.baseTexture);\n        }\n        else\n        {\n            gl.bindTexture(gl.TEXTURE_2D, this.texture.baseTexture._glTextures[gl.id]);\n        }\n\n        // dont need to upload!\n        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);\n        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);\n\n    }\n    //console.log(gl.TRIANGLE_STRIP)\n    //\n    //\n    gl.drawElements(drawMode, this.indices.length, gl.UNSIGNED_SHORT, 0);\n\n\n};\n\n\n\nPIXI.Strip.prototype._renderCanvas = function(renderSession)\n{\n    var context = renderSession.context;\n\n    var transform = this.worldTransform;\n\n    var tx = (transform.tx * renderSession.resolution) + renderSession.shakeX;\n    var ty = (transform.ty * renderSession.resolution) + renderSession.shakeY;\n\n    if (renderSession.roundPixels)\n    {\n        context.setTransform(transform.a, transform.b, transform.c, transform.d, tx | 0, ty | 0);\n    }\n    else\n    {\n        context.setTransform(transform.a, transform.b, transform.c, transform.d, tx, ty);\n    }\n\n    if (this.drawMode === PIXI.Strip.DrawModes.TRIANGLE_STRIP)\n    {\n        this._renderCanvasTriangleStrip(context);\n    }\n    else\n    {\n        this._renderCanvasTriangles(context);\n    }\n};\n\nPIXI.Strip.prototype._renderCanvasTriangleStrip = function(context)\n{\n    // draw triangles!!\n    var vertices = this.vertices;\n    var uvs = this.uvs;\n\n    var length = vertices.length / 2;\n    this.count++;\n\n    for (var i = 0; i < length - 2; i++) {\n        // draw some triangles!\n        var index = i * 2;\n        this._renderCanvasDrawTriangle(context, vertices, uvs, index, (index + 2), (index + 4));\n    }\n};\n\nPIXI.Strip.prototype._renderCanvasTriangles = function(context)\n{\n    // draw triangles!!\n    var vertices = this.vertices;\n    var uvs = this.uvs;\n    var indices = this.indices;\n\n    var length = indices.length;\n    this.count++;\n\n    for (var i = 0; i < length; i += 3) {\n        // draw some triangles!\n        var index0 = indices[i] * 2, index1 = indices[i + 1] * 2, index2 = indices[i + 2] * 2;\n        this._renderCanvasDrawTriangle(context, vertices, uvs, index0, index1, index2);\n    }\n};\n\nPIXI.Strip.prototype._renderCanvasDrawTriangle = function(context, vertices, uvs, index0, index1, index2)\n{\n    var textureSource = this.texture.baseTexture.source;\n    var textureWidth = this.texture.width;\n    var textureHeight = this.texture.height;\n\n    var x0 = vertices[index0], x1 = vertices[index1], x2 = vertices[index2];\n    var y0 = vertices[index0 + 1], y1 = vertices[index1 + 1], y2 = vertices[index2 + 1];\n\n    var u0 = uvs[index0] * textureWidth, u1 = uvs[index1] * textureWidth, u2 = uvs[index2] * textureWidth;\n    var v0 = uvs[index0 + 1] * textureHeight, v1 = uvs[index1 + 1] * textureHeight, v2 = uvs[index2 + 1] * textureHeight;\n\n    if (this.canvasPadding > 0) {\n        var paddingX = this.canvasPadding / this.worldTransform.a;\n        var paddingY = this.canvasPadding / this.worldTransform.d;\n        var centerX = (x0 + x1 + x2) / 3;\n        var centerY = (y0 + y1 + y2) / 3;\n\n        var normX = x0 - centerX;\n        var normY = y0 - centerY;\n\n        var dist = Math.sqrt(normX * normX + normY * normY);\n        x0 = centerX + (normX / dist) * (dist + paddingX);\n        y0 = centerY + (normY / dist) * (dist + paddingY);\n\n        //\n\n        normX = x1 - centerX;\n        normY = y1 - centerY;\n\n        dist = Math.sqrt(normX * normX + normY * normY);\n        x1 = centerX + (normX / dist) * (dist + paddingX);\n        y1 = centerY + (normY / dist) * (dist + paddingY);\n\n        normX = x2 - centerX;\n        normY = y2 - centerY;\n\n        dist = Math.sqrt(normX * normX + normY * normY);\n        x2 = centerX + (normX / dist) * (dist + paddingX);\n        y2 = centerY + (normY / dist) * (dist + paddingY);\n    }\n\n    context.save();\n    context.beginPath();\n\n\n    context.moveTo(x0, y0);\n    context.lineTo(x1, y1);\n    context.lineTo(x2, y2);\n\n    context.closePath();\n\n    context.clip();\n\n    // Compute matrix transform\n    var delta =  (u0 * v1)      + (v0 * u2)      + (u1 * v2)      - (v1 * u2)      - (v0 * u1)      - (u0 * v2);\n    var deltaA = (x0 * v1)      + (v0 * x2)      + (x1 * v2)      - (v1 * x2)      - (v0 * x1)      - (x0 * v2);\n    var deltaB = (u0 * x1)      + (x0 * u2)      + (u1 * x2)      - (x1 * u2)      - (x0 * u1)      - (u0 * x2);\n    var deltaC = (u0 * v1 * x2) + (v0 * x1 * u2) + (x0 * u1 * v2) - (x0 * v1 * u2) - (v0 * u1 * x2) - (u0 * x1 * v2);\n    var deltaD = (y0 * v1)      + (v0 * y2)      + (y1 * v2)      - (v1 * y2)      - (v0 * y1)      - (y0 * v2);\n    var deltaE = (u0 * y1)      + (y0 * u2)      + (u1 * y2)      - (y1 * u2)      - (y0 * u1)      - (u0 * y2);\n    var deltaF = (u0 * v1 * y2) + (v0 * y1 * u2) + (y0 * u1 * v2) - (y0 * v1 * u2) - (v0 * u1 * y2) - (u0 * y1 * v2);\n\n    context.transform(deltaA / delta, deltaD / delta,\n        deltaB / delta, deltaE / delta,\n        deltaC / delta, deltaF / delta);\n\n    context.drawImage(textureSource, 0, 0);\n    context.restore();\n};\n\n\n\n/**\n * Renders a flat strip\n *\n * @method renderStripFlat\n * @param strip {Strip} The Strip to render\n * @private\n */\nPIXI.Strip.prototype.renderStripFlat = function(strip)\n{\n    var context = this.context;\n    var vertices = strip.vertices;\n\n    var length = vertices.length/2;\n    this.count++;\n\n    context.beginPath();\n    for (var i=1; i < length-2; i++)\n    {\n        // draw some triangles!\n        var index = i*2;\n\n        var x0 = vertices[index],   x1 = vertices[index+2], x2 = vertices[index+4];\n        var y0 = vertices[index+1], y1 = vertices[index+3], y2 = vertices[index+5];\n\n        context.moveTo(x0, y0);\n        context.lineTo(x1, y1);\n        context.lineTo(x2, y2);\n    }\n\n    context.fillStyle = '#FF0000';\n    context.fill();\n    context.closePath();\n};\n\n/*\nPIXI.Strip.prototype.setTexture = function(texture)\n{\n    //TODO SET THE TEXTURES\n    //TODO VISIBILITY\n\n    // stop current texture\n    this.texture = texture;\n    this.width   = texture.frame.width;\n    this.height  = texture.frame.height;\n    this.updateFrame = true;\n};\n*/\n\n/**\n * When the texture is updated, this event will fire to update the scale and frame\n *\n * @method onTextureUpdate\n * @param event\n * @private\n */\n\nPIXI.Strip.prototype.onTextureUpdate = function()\n{\n    this.updateFrame = true;\n};\n\n/**\n * Returns the bounds of the mesh as a rectangle. The bounds calculation takes the worldTransform into account.\n *\n * @method getBounds\n * @param matrix {Matrix} the transformation matrix of the sprite\n * @return {Rectangle} the framing rectangle\n */\nPIXI.Strip.prototype.getBounds = function(matrix)\n{\n    var worldTransform = matrix || this.worldTransform;\n\n    var a = worldTransform.a;\n    var b = worldTransform.b;\n    var c = worldTransform.c;\n    var d = worldTransform.d;\n    var tx = worldTransform.tx;\n    var ty = worldTransform.ty;\n\n    var maxX = -Infinity;\n    var maxY = -Infinity;\n\n    var minX = Infinity;\n    var minY = Infinity;\n\n    var vertices = this.vertices;\n    for (var i = 0, n = vertices.length; i < n; i += 2)\n    {\n        var rawX = vertices[i], rawY = vertices[i + 1];\n        var x = (a * rawX) + (c * rawY) + tx;\n        var y = (d * rawY) + (b * rawX) + ty;\n\n        minX = x < minX ? x : minX;\n        minY = y < minY ? y : minY;\n\n        maxX = x > maxX ? x : maxX;\n        maxY = y > maxY ? y : maxY;\n    }\n\n    if (minX === -Infinity || maxY === Infinity)\n    {\n        return PIXI.EmptyRectangle;\n    }\n\n    var bounds = this._bounds;\n\n    bounds.x = minX;\n    bounds.width = maxX - minX;\n\n    bounds.y = minY;\n    bounds.height = maxY - minY;\n\n    // store a reference so that if this function gets called again in the render cycle we do not have to recalculate\n    this._currentBounds = bounds;\n\n    return bounds;\n};\n\n/**\n * Different drawing buffer modes supported\n *\n * @property\n * @type {{TRIANGLE_STRIP: number, TRIANGLES: number}}\n * @static\n */\nPIXI.Strip.DrawModes = {\n    TRIANGLE_STRIP: 0,\n    TRIANGLES: 1\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n * @copyright Mat Groves, Rovanion Luckey\n */\n\n/**\n *\n * @class Rope\n * @constructor\n * @extends Strip\n * @param {Texture} texture - The texture to use on the rope.\n * @param {Array} points - An array of {PIXI.Point}.\n *\n */\nPIXI.Rope = function(texture, points)\n{\n    PIXI.Strip.call( this, texture );\n    this.points = points;\n\n    this.vertices = new PIXI.Float32Array(points.length * 4);\n    this.uvs = new PIXI.Float32Array(points.length * 4);\n    this.colors = new PIXI.Float32Array(points.length * 2);\n    this.indices = new PIXI.Uint16Array(points.length * 2);\n\n\n    this.refresh();\n};\n\n\n// constructor\nPIXI.Rope.prototype = Object.create( PIXI.Strip.prototype );\nPIXI.Rope.prototype.constructor = PIXI.Rope;\n\n/*\n * Refreshes\n *\n * @method refresh\n */\nPIXI.Rope.prototype.refresh = function()\n{\n    var points = this.points;\n    if(points.length < 1) return;\n\n    var uvs = this.uvs;\n\n    var lastPoint = points[0];\n    var indices = this.indices;\n    var colors = this.colors;\n\n    this.count-=0.2;\n\n    uvs[0] = 0;\n    uvs[1] = 0;\n    uvs[2] = 0;\n    uvs[3] = 1;\n\n    colors[0] = 1;\n    colors[1] = 1;\n\n    indices[0] = 0;\n    indices[1] = 1;\n\n    var total = points.length,\n        point, index, amount;\n\n    for (var i = 1; i < total; i++)\n    {\n        point = points[i];\n        index = i * 4;\n        // time to do some smart drawing!\n        amount = i / (total-1);\n\n        if(i%2)\n        {\n            uvs[index] = amount;\n            uvs[index+1] = 0;\n\n            uvs[index+2] = amount;\n            uvs[index+3] = 1;\n        }\n        else\n        {\n            uvs[index] = amount;\n            uvs[index+1] = 0;\n\n            uvs[index+2] = amount;\n            uvs[index+3] = 1;\n        }\n\n        index = i * 2;\n        colors[index] = 1;\n        colors[index+1] = 1;\n\n        index = i * 2;\n        indices[index] = index;\n        indices[index + 1] = index + 1;\n\n        lastPoint = point;\n    }\n};\n\n/*\n * Updates the object transform for rendering\n *\n * @method updateTransform\n * @private\n */\nPIXI.Rope.prototype.updateTransform = function()\n{\n\n    var points = this.points;\n    if(points.length < 1)return;\n\n    var lastPoint = points[0];\n    var nextPoint;\n    var perp = {x:0, y:0};\n\n    this.count-=0.2;\n\n    var vertices = this.vertices;\n    var total = points.length,\n        point, index, ratio, perpLength, num;\n\n    for (var i = 0; i < total; i++)\n    {\n        point = points[i];\n        index = i * 4;\n\n        if(i < points.length-1)\n        {\n            nextPoint = points[i+1];\n        }\n        else\n        {\n            nextPoint = point;\n        }\n\n        perp.y = -(nextPoint.x - lastPoint.x);\n        perp.x = nextPoint.y - lastPoint.y;\n\n        ratio = (1 - (i / (total-1))) * 10;\n\n        if(ratio > 1) ratio = 1;\n\n        perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);\n        num = this.texture.height / 2; //(20 + Math.abs(Math.sin((i + this.count) * 0.3) * 50) )* ratio;\n        perp.x /= perpLength;\n        perp.y /= perpLength;\n\n        perp.x *= num;\n        perp.y *= num;\n\n        vertices[index] = point.x + perp.x;\n        vertices[index+1] = point.y + perp.y;\n        vertices[index+2] = point.x - perp.x;\n        vertices[index+3] = point.y - perp.y;\n\n        lastPoint = point;\n    }\n\n    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );\n};\n/*\n * Sets the texture that the Rope will use\n *\n * @method setTexture\n * @param texture {Texture} the texture that will be used\n */\nPIXI.Rope.prototype.setTexture = function(texture)\n{\n    // stop current texture\n    this.texture = texture;\n    //this.updateFrame = true;\n};\n\r\n/**\n * @author Mat Groves http://matgroves.com/\n */\n\n/**\n * A tiling sprite is a fast way of rendering a tiling image\n *\n * @class TilingSprite\n * @extends Sprite\n * @constructor\n * @param texture {Texture} the texture of the tiling sprite\n * @param width {Number}  the width of the tiling sprite\n * @param height {Number} the height of the tiling sprite\n */\nPIXI.TilingSprite = function(texture, width, height)\n{\n    PIXI.Sprite.call(this, texture);\n\n    /**\n     * The width of the tiling sprite\n     *\n     * @property width\n     * @type Number\n     */\n    this._width = width || 128;\n\n    /**\n     * The height of the tiling sprite\n     *\n     * @property height\n     * @type Number\n     */\n    this._height = height || 128;\n\n    /**\n     * The scaling of the image that is being tiled\n     *\n     * @property tileScale\n     * @type Point\n     */\n    this.tileScale = new PIXI.Point(1, 1);\n\n    /**\n     * A point that represents the scale of the texture object\n     *\n     * @property tileScaleOffset\n     * @type Point\n     */\n    this.tileScaleOffset = new PIXI.Point(1, 1);\n    \n    /**\n     * The offset position of the image that is being tiled\n     *\n     * @property tilePosition\n     * @type Point\n     */\n    this.tilePosition = new PIXI.Point();\n\n    /**\n     * Whether this sprite is renderable or not\n     *\n     * @property renderable\n     * @type Boolean\n     * @default true\n     */\n    this.renderable = true;\n\n    /**\n     * The tint applied to the sprite. This is a hex value\n     *\n     * @property tint\n     * @type Number\n     * @default 0xFFFFFF\n     */\n    this.tint = 0xFFFFFF;\n\n    /**\n     * If enabled a green rectangle will be drawn behind the generated tiling texture, allowing you to visually\n     * debug the texture being used.\n     *\n     * @property textureDebug\n     * @type Boolean\n     */\n    this.textureDebug = false;\n    \n    /**\n     * The blend mode to be applied to the sprite\n     *\n     * @property blendMode\n     * @type Number\n     * @default PIXI.blendModes.NORMAL;\n     */\n    this.blendMode = PIXI.blendModes.NORMAL;\n\n    /**\n     * The CanvasBuffer object that the tiled texture is drawn to.\n     *\n     * @property canvasBuffer\n     * @type PIXI.CanvasBuffer\n     */\n    this.canvasBuffer = null;\n\n    /**\n     * An internal Texture object that holds the tiling texture that was generated from TilingSprite.texture.\n     *\n     * @property tilingTexture\n     * @type PIXI.Texture\n     */\n    this.tilingTexture = null;\n\n    /**\n     * The Context fill pattern that is used to draw the TilingSprite in Canvas mode only (will be null in WebGL).\n     *\n     * @property tilePattern\n     * @type PIXI.Texture\n     */\n    this.tilePattern = null;\n\n    /**\n     * If true the TilingSprite will run generateTexture on its **next** render pass.\n     * This is set by the likes of Phaser.LoadTexture.setFrame.\n     *\n     * @property refreshTexture\n     * @type Boolean\n     * @default true\n     */\n    this.refreshTexture = true;\n\n    this.frameWidth = 0;\n    this.frameHeight = 0;\n\n};\n\nPIXI.TilingSprite.prototype = Object.create(PIXI.Sprite.prototype);\nPIXI.TilingSprite.prototype.constructor = PIXI.TilingSprite;\n\nPIXI.TilingSprite.prototype.setTexture = function(texture)\n{\n    if (this.texture !== texture)\n    {\n        this.texture = texture;\n        this.refreshTexture = true;\n        this.cachedTint = 0xFFFFFF;\n    }\n\n};\n\n/**\n* Renders the object using the WebGL renderer\n*\n* @method _renderWebGL\n* @param renderSession {RenderSession} \n* @private\n*/\nPIXI.TilingSprite.prototype._renderWebGL = function(renderSession)\n{\n    if (!this.visible || !this.renderable || this.alpha === 0)\n    {\n        return;\n    }\n\n    if (this._mask)\n    {\n        renderSession.spriteBatch.stop();\n        renderSession.maskManager.pushMask(this.mask, renderSession);\n        renderSession.spriteBatch.start();\n    }\n\n    if (this._filters)\n    {\n        renderSession.spriteBatch.flush();\n        renderSession.filterManager.pushFilter(this._filterBlock);\n    }\n\n    if (this.refreshTexture)\n    {\n        this.generateTilingTexture(true, renderSession);\n\n        if (this.tilingTexture)\n        {\n            if (this.tilingTexture.needsUpdate)\n            {\n                renderSession.renderer.updateTexture(this.tilingTexture.baseTexture);\n                this.tilingTexture.needsUpdate = false;\n            }\n        }\n        else\n        {\n            return;\n        }\n    }\n    \n    renderSession.spriteBatch.renderTilingSprite(this);\n\n    for (var i = 0; i < this.children.length; i++)\n    {\n        this.children[i]._renderWebGL(renderSession);\n    }\n\n    renderSession.spriteBatch.stop();\n\n    if (this._filters)\n    {\n        renderSession.filterManager.popFilter();\n    }\n\n    if (this._mask)\n    {\n        renderSession.maskManager.popMask(this._mask, renderSession);\n    }\n    \n    renderSession.spriteBatch.start();\n\n};\n\n/**\n* Renders the object using the Canvas renderer\n*\n* @method _renderCanvas\n* @param renderSession {RenderSession} \n* @private\n*/\nPIXI.TilingSprite.prototype._renderCanvas = function(renderSession)\n{\n    if (!this.visible || !this.renderable || this.alpha === 0)\n    {\n        return;\n    }\n    \n    var context = renderSession.context;\n\n    if (this._mask)\n    {\n        renderSession.maskManager.pushMask(this._mask, renderSession);\n    }\n\n    context.globalAlpha = this.worldAlpha;\n    \n    var wt = this.worldTransform;\n    var resolution = renderSession.resolution;\n    var tx = (wt.tx * resolution) + renderSession.shakeX;\n    var ty = (wt.ty * resolution) + renderSession.shakeY;\n\n    context.setTransform(wt.a * resolution, wt.b * resolution, wt.c * resolution, wt.d * resolution, tx, ty);\n\n    if (this.refreshTexture)\n    {\n        this.generateTilingTexture(false, renderSession);\n    \n        if (this.tilingTexture)\n        {\n            this.tilePattern = context.createPattern(this.tilingTexture.baseTexture.source, 'repeat');\n        }\n        else\n        {\n            return;\n        }\n    }\n\n    var sessionBlendMode = renderSession.currentBlendMode;\n\n    //  Check blend mode\n    if (this.blendMode !== renderSession.currentBlendMode)\n    {\n        renderSession.currentBlendMode = this.blendMode;\n        context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];\n    }\n\n    var tilePosition = this.tilePosition;\n    var tileScale = this.tileScale;\n\n    tilePosition.x %= this.tilingTexture.baseTexture.width;\n    tilePosition.y %= this.tilingTexture.baseTexture.height;\n\n    //  Translate\n    context.scale(tileScale.x, tileScale.y);\n    context.translate(tilePosition.x + (this.anchor.x * -this._width), tilePosition.y + (this.anchor.y * -this._height));\n\n    context.fillStyle = this.tilePattern;\n\n    var tx = -tilePosition.x;\n    var ty = -tilePosition.y;\n    var tw = this._width / tileScale.x;\n    var th = this._height / tileScale.y;\n\n    //  Allow for pixel rounding\n    if (renderSession.roundPixels)\n    {\n        tx |= 0;\n        ty |= 0;\n        tw |= 0;\n        th |= 0;\n    }\n\n    context.fillRect(tx, ty, tw, th);\n\n    //  Translate back again\n    context.scale(1 / tileScale.x, 1 / tileScale.y);\n    context.translate(-tilePosition.x + (this.anchor.x * this._width), -tilePosition.y + (this.anchor.y * this._height));\n\n    if (this._mask)\n    {\n        renderSession.maskManager.popMask(renderSession);\n    }\n\n    for (var i = 0; i < this.children.length; i++)\n    {\n        this.children[i]._renderCanvas(renderSession);\n    }\n\n    //  Reset blend mode\n    if (sessionBlendMode !== this.blendMode)\n    {\n        renderSession.currentBlendMode = sessionBlendMode;\n        context.globalCompositeOperation = PIXI.blendModesCanvas[sessionBlendMode];\n    }\n\n};\n\n/**\n * When the texture is updated, this event will fire to update the scale and frame\n *\n * @method onTextureUpdate\n * @param event\n * @private\n */\nPIXI.TilingSprite.prototype.onTextureUpdate = function()\n{\n   // overriding the sprite version of this!\n};\n\n/**\n* \n* @method generateTilingTexture\n* \n* @param forcePowerOfTwo {Boolean} Whether we want to force the texture to be a power of two\n* @param renderSession {RenderSession} \n*/\nPIXI.TilingSprite.prototype.generateTilingTexture = function(forcePowerOfTwo, renderSession)\n{\n    if (!this.texture.baseTexture.hasLoaded)\n    {\n        return;\n    }\n\n    var texture = this.texture;\n    var frame = texture.frame;\n\n    var targetWidth = this._frame.sourceSizeW || this._frame.width;\n    var targetHeight = this._frame.sourceSizeH || this._frame.height;\n\n    var dx = 0;\n    var dy = 0;\n\n    if (this._frame.trimmed)\n    {\n        dx = this._frame.spriteSourceSizeX;\n        dy = this._frame.spriteSourceSizeY;\n    }\n\n    if (forcePowerOfTwo)\n    {\n        targetWidth = PIXI.getNextPowerOfTwo(targetWidth);\n        targetHeight = PIXI.getNextPowerOfTwo(targetHeight);\n    }\n\n    if (this.canvasBuffer)\n    {\n        this.canvasBuffer.resize(targetWidth, targetHeight);\n        this.tilingTexture.baseTexture.width = targetWidth;\n        this.tilingTexture.baseTexture.height = targetHeight;\n        this.tilingTexture.needsUpdate = true;\n    }\n    else\n    {\n        this.canvasBuffer = new PIXI.CanvasBuffer(targetWidth, targetHeight);\n        this.tilingTexture = PIXI.Texture.fromCanvas(this.canvasBuffer.canvas);\n        this.tilingTexture.isTiling = true;\n        this.tilingTexture.needsUpdate = true;\n    }\n\n    if (this.textureDebug)\n    {\n        this.canvasBuffer.context.strokeStyle = '#00ff00';\n        this.canvasBuffer.context.strokeRect(0, 0, targetWidth, targetHeight);\n    }\n\n    //  If a sprite sheet we need this:\n    var w = texture.crop.width;\n    var h = texture.crop.height;\n\n    if (w !== targetWidth || h !== targetHeight)\n    {\n        w = targetWidth;\n        h = targetHeight;\n    }\n\n    this.canvasBuffer.context.drawImage(texture.baseTexture.source,\n                           texture.crop.x,\n                           texture.crop.y,\n                           texture.crop.width,\n                           texture.crop.height,\n                           dx,\n                           dy,\n                           w,\n                           h);\n\n    this.tileScaleOffset.x = frame.width / targetWidth;\n    this.tileScaleOffset.y = frame.height / targetHeight;\n\n    this.refreshTexture = false;\n\n    this.tilingTexture.baseTexture._powerOf2 = true;\n\n};\n\n/**\n* Returns the framing rectangle of the sprite as a PIXI.Rectangle object\n*\n* @method getBounds\n* @return {Rectangle} the framing rectangle\n*/\nPIXI.TilingSprite.prototype.getBounds = function()\n{\n    var width = this._width;\n    var height = this._height;\n\n    var w0 = width * (1-this.anchor.x);\n    var w1 = width * -this.anchor.x;\n\n    var h0 = height * (1-this.anchor.y);\n    var h1 = height * -this.anchor.y;\n\n    var worldTransform = this.worldTransform;\n\n    var a = worldTransform.a;\n    var b = worldTransform.b;\n    var c = worldTransform.c;\n    var d = worldTransform.d;\n    var tx = worldTransform.tx;\n    var ty = worldTransform.ty;\n    \n    var x1 = a * w1 + c * h1 + tx;\n    var y1 = d * h1 + b * w1 + ty;\n\n    var x2 = a * w0 + c * h1 + tx;\n    var y2 = d * h1 + b * w0 + ty;\n\n    var x3 = a * w0 + c * h0 + tx;\n    var y3 = d * h0 + b * w0 + ty;\n\n    var x4 =  a * w1 + c * h0 + tx;\n    var y4 =  d * h0 + b * w1 + ty;\n\n    var maxX = -Infinity;\n    var maxY = -Infinity;\n\n    var minX = Infinity;\n    var minY = Infinity;\n\n    minX = x1 < minX ? x1 : minX;\n    minX = x2 < minX ? x2 : minX;\n    minX = x3 < minX ? x3 : minX;\n    minX = x4 < minX ? x4 : minX;\n\n    minY = y1 < minY ? y1 : minY;\n    minY = y2 < minY ? y2 : minY;\n    minY = y3 < minY ? y3 : minY;\n    minY = y4 < minY ? y4 : minY;\n\n    maxX = x1 > maxX ? x1 : maxX;\n    maxX = x2 > maxX ? x2 : maxX;\n    maxX = x3 > maxX ? x3 : maxX;\n    maxX = x4 > maxX ? x4 : maxX;\n\n    maxY = y1 > maxY ? y1 : maxY;\n    maxY = y2 > maxY ? y2 : maxY;\n    maxY = y3 > maxY ? y3 : maxY;\n    maxY = y4 > maxY ? y4 : maxY;\n\n    var bounds = this._bounds;\n\n    bounds.x = minX;\n    bounds.width = maxX - minX;\n\n    bounds.y = minY;\n    bounds.height = maxY - minY;\n\n    // store a reference so that if this function gets called again in the render cycle we do not have to recalculate\n    this._currentBounds = bounds;\n\n    return bounds;\n};\n\nPIXI.TilingSprite.prototype.destroy = function () {\n\n    PIXI.Sprite.prototype.destroy.call(this);\n\n    if (this.canvasBuffer)\n    {\n        this.canvasBuffer.destroy();\n        this.canvasBuffer = null;\n    }\n\n    this.tileScale = null;\n    this.tileScaleOffset = null;\n    this.tilePosition = null;\n\n    if (this.tilingTexture)\n    {\n        this.tilingTexture.destroy(true);\n        this.tilingTexture = null;\n    }\n\n};\n\n/**\n * The width of the sprite, setting this will actually modify the scale to achieve the value set\n *\n * @property width\n * @type Number\n */\nObject.defineProperty(PIXI.TilingSprite.prototype, 'width', {\n\n    get: function() {\n        return this._width;\n    },\n\n    set: function(value) {\n        this._width = value;\n    }\n\n});\n\n/**\n * The height of the TilingSprite, setting this will actually modify the scale to achieve the value set\n *\n * @property height\n * @type Number\n */\nObject.defineProperty(PIXI.TilingSprite.prototype, 'height', {\n\n    get: function() {\n        return  this._height;\n    },\n\n    set: function(value) {\n        this._height = value;\n    }\n\n});\n\r\n/**\n * @author Mat Groves http://matgroves.com/ @Doormat23\n */\n\n    if (typeof exports !== 'undefined') {\n        if (typeof module !== 'undefined' && module.exports) {\n            exports = module.exports = PIXI;\n        }\n        exports.PIXI = PIXI;\n    } else if (typeof define !== 'undefined' && define.amd) {\n        define('PIXI', (function() { return root.PIXI = PIXI; })() );\n    } else {\n        root.PIXI = PIXI;\n    }\n\n    return PIXI;\n}).call(this);"

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2)(__webpack_require__(5))

/***/ },
/* 5 */
/***/ function(module, exports) {


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ZDepth = __webpack_require__(7);
	var MapImporter = __webpack_require__(8);
	var StressMeter = __webpack_require__(22);
	var TriggerManager = __webpack_require__(23);

	var Player = __webpack_require__(13);
	var Nasty = __webpack_require__(15);
	var Note = __webpack_require__(21);
	var Door = __webpack_require__(20);

	module.exports = {

	      SubStates: {
	            ENTERING: 0,
	            PLAYING: 1,
	            EXITING: 2,
	            DYING: 3
	      },

	      init: function init(params) {
	            // the map file containing the game state.
	            this.mapName = params.mapName;
	            this.debugMode = false;
	      },

	      preload: function preload() {
	            // stops pixel interpolation on rendering.
	            this.game.renderer.renderSession.roundPixels = true;

	            this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
	            this.game.scale.setUserScale(4, 4);
	            this.game.scale.refresh();
	            this.game.stage.backgroundColor = '#000000';

	            var assetContext = __webpack_require__(24);

	            // load assets.
	            Nasty.load(this.game, assetContext);

	            this.game.load.tilemap("map", assetContext('./maps/' + this.mapName), null, Phaser.Tilemap.TILED_JSON);
	            this.game.load.image('key', assetContext('./sprites/key.png'));
	            this.game.load.image('note', assetContext('./sprites/note.png'));
	            this.game.load.image('buzzer', assetContext('./sprites/buzzer.png'));
	            this.game.load.spritesheet('dave', assetContext('./sprites/dave.png'), 16, 32);
	            this.game.load.image('floor', assetContext('./tilesets/office-floor.png'));
	            this.game.load.image('menu', assetContext('./tilesets/menu.png'));
	            this.game.load.image('floor-items', assetContext('./tilesets/floor-items.png'));
	            this.game.load.image('office-divider', assetContext('./tilesets/office-divider.png'));
	            this.game.load.image('window', assetContext('./tilesets/window.png'));
	            this.game.load.image('office-lighting', assetContext('./tilesets/office-lighting.png'));
	            this.game.load.spritesheet('office-worker', assetContext('./sprites/office-worker.png'), 16, 32, 2);
	            this.game.load.image('floor-lighting', assetContext('./tilesets/floor-lighting.png'));
	            this.game.load.image('ceiling-lighting', assetContext('./tilesets/ceiling-lighting.png'));
	            this.game.load.image('floor-numbers', assetContext('./tilesets/floor-numbers.png'));
	            this.game.load.image('hdoor', assetContext('./sprites/hdoor.png'));
	            this.game.load.image('vdoor', assetContext('./sprites/vdoor.png'));
	            this.game.load.image('computer', assetContext('./sprites/computer.png'));
	            this.game.load.image('speaker', assetContext('./sprites/speaker.png'));

	            this.game.load.audio('nasty-ambience', assetContext('./sounds/243045__phinster__cicada-with-dog.mp3'));
	            this.game.load.audio('office-ambience-day', assetContext('./sounds/168596__zabuhailo__office-refrigerator.mp3'));
	            this.game.load.audio('office-ambience-night', assetContext('./sounds/182872__klankbeeld__nightcity-hum-01-130212.mp3'));
	            this.game.load.audio('exit-unlocked', assetContext('./sounds/346425__soneproject__ecofuture3.mp3'));
	            this.game.load.audio('interact', assetContext('./sounds/240943__htn4ever__notif-1.mp3'));
	            this.game.load.audio('player-walk', assetContext('./sounds/189640__yuval__grass-loop-short.mp3'));
	      },

	      create: function create() {
	            var map = this.game.add.tilemap('map');
	            this.map = map;

	            map.addTilesetImage('menu', 'menu');
	            map.addTilesetImage('floor', 'floor');
	            map.addTilesetImage('office-divider', 'office-divider');
	            map.addTilesetImage('floor-items', 'floor-items');
	            map.addTilesetImage('window', 'window');
	            map.addTilesetImage('office-lighting', 'office-lighting');
	            map.addTilesetImage('floor-numbers', 'floor-numbers');
	            map.addTilesetImage('floor-lighting', 'floor-lighting');
	            map.addTilesetImage('ceiling-lighting', 'ceiling-lighting');

	            this.wallLayer = map.createLayer('Walls');
	            var floorLayer = map.createLayer('Floor');
	            var floorLightingLayer = map.createLayer('FloorLighting');
	            var ceilingLightingLayer = map.createLayer('CeilingLighting');
	            var floorItemsLayer = map.createLayer('FloorItems');
	            var ceilingLayer = map.createLayer('Ceiling');

	            this.wallLayer.resizeWorld();
	            // this.wallLayer.debug = this.debugMode;
	            map.setCollisionBetween(0, 100, true, this.wallLayer);

	            var zDepth = new ZDepth(this.game);
	            zDepth.wall.add(this.wallLayer);
	            zDepth.floor.add(floorLayer);
	            zDepth.floorLighting.add(floorLightingLayer);
	            zDepth.floorItems.add(floorItemsLayer);
	            zDepth.ceiling.add(ceilingLayer);
	            zDepth.ceilingLighting.add(ceilingLightingLayer);

	            this.triggerManager = new TriggerManager();

	            var mapImporter = new MapImporter(this.game, this.wallLayer, this.triggerManager, zDepth, map);
	            this.lighting = mapImporter.getLighting(this.wallLayer);
	            this.navMesh = mapImporter.getNavMesh();
	            this.player = mapImporter.getPlayer();
	            this.keys = mapImporter.getKeys();
	            this.enemies = mapImporter.getEnemies();
	            this.exit = mapImporter.getExit();
	            this.doorMap = mapImporter.getDoors();
	            this.doors = [];
	            for (var doorName in this.doorMap) {
	                  this.doors.push(this.doorMap[doorName]);
	            }
	            this.notes = mapImporter.getNotes();

	            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

	            this.game.physics.startSystem(Phaser.Physics.ARCADE);
	            this.game.physics.arcade.enable(this.wallLayer);
	            this.game.physics.arcade.enable(this.player);

	            var stressMeter = new StressMeter(this.game, this.player, this.enemies);
	            zDepth.ceilingLighting.add(stressMeter);

	            var style = { font: "32px verdana", fill: "#ff0044", wordWrap: true, wordWrapWidth: 300, align: "center" };
	            this.deathText = this.game.add.text(0, 0, "You Are Dead.", style);
	            this.deathText.anchor.set(0.5);
	            this.deathText.fixedToCamera = true;
	            this.deathText.cameraOffset.setTo(this.game.camera.view.width / 2, this.game.camera.view.height / 2);
	            this.deathText.visible = false;
	            this.deathText.alpha = 0;

	            this.subState = module.exports.SubStates.PLAYING;

	            this.lighting.recalculateVisibleTiles();
	      },

	      triggerMapTransition: function triggerMapTransition(destinationMapName) {
	            this.player.disableControls();
	            this.subState = module.exports.SubStates.EXITING;
	            this.game.state.start('main', true, false, { mapName: destinationMapName });
	      },

	      update: function update() {
	            // do nothing if the player has died.
	            if (this.subState != module.exports.SubStates.PLAYING) {
	                  return;
	            }

	            this.game.physics.arcade.collide(this.player, this.wallLayer);
	            this.game.physics.arcade.collide(this.player, this.doors);
	            this.game.physics.arcade.collide(this.player, this.enemies);
	            this.game.physics.arcade.collide(this.enemies, this.doors);
	            this.game.physics.arcade.collide(this.enemies, this.wallLayer);
	            this.game.physics.arcade.collide(this.enemies, this.enemies);

	            if (this.exit.isUnlocked()) {
	                  this.game.physics.arcade.overlap(this.player, this.exit, function (player, exit) {
	                        this.triggerMapTransition(exit.getDestinationMapName());
	                  }, null, this);
	            }

	            if (!this.player.isAlive()) {
	                  this.player.disableControls();
	                  this.subState = module.exports.SubStates.DYING;
	                  var textFadeIn = this.game.add.tween(this.deathText);
	                  textFadeIn.to({ alpha: 1.0 }, 500, Phaser.Easing.Linear.None);
	                  textFadeIn.start();
	                  this.deathText.visible = true;

	                  this.game.time.events.add(Phaser.Timer.SECOND * 5, function () {
	                        this.game.state.start('menu');
	                  }, this);
	            }
	      },

	      render: function render() {
	            if (this.debugMode) {
	                  var game = this.game;

	                  game.debug.geom(new Phaser.Circle(this.player.x, this.player.y, 50));

	                  var navPoints = this.navMesh.points;
	                  var game = this.game;
	                  navPoints.forEach(function (point) {
	                        point.attachedIndices.forEach(function (i) {
	                              var line = new Phaser.Line(point.x, point.y, navPoints[i].x, navPoints[i].y);
	                              game.debug.geom(line);
	                        });
	                  });

	                  this.enemies.forEach(function (enemy) {
	                        game.debug.body(enemy);

	                        for (var i = 0; i < enemy.path.length; i++) {
	                              game.debug.geom(new Phaser.Circle(enemy.path[i].x, enemy.path[i].y, 30));
	                        }
	                  }, this);

	                  this.doors.forEach(function (d) {
	                        return game.debug.body(d);
	                  });
	            }
	      }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Represents the z-ordering groups for the game.
	 */
	module.exports = function (game) {

	  /**
	   * This layer is for floor tiles.
	   */
	  this.floor = game.add.group();

	  /**
	   * This layer is for objects which are on the floor (for example debris).
	   */
	  this.floorItems = game.add.group();

	  /**
	   * This is for lighting which highlights objects on the floor (for example the light from the ceiling lamp).
	   */
	  this.floorLighting = game.add.group();

	  /**
	   * Use this for barriers such as walls and other blocking items.
	   */
	  this.wall = game.add.group();

	  /**
	   * This is the layer that sprites such as the player and enemies occupy.
	   */
	  this.sprite = game.add.group();

	  /**
	   * Use this for sprites which are in the ceiling (for example lights hanging from the ceiling).
	   */
	  this.ceiling = game.add.group();

	  /**
	   * Lighting which sits above the ceiling layer (use this to cover all sprites including the room).
	   */
	  this.ceilingLighting = game.add.group();
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Lighting = __webpack_require__(9);
	var NavMesh = __webpack_require__(10);
	var DoorManager = __webpack_require__(12);

	var Player = __webpack_require__(13);
	var Nasty = __webpack_require__(15);
	var NastySpawner = __webpack_require__(16);
	var Key = __webpack_require__(17);
	var Exit = __webpack_require__(19);
	var Door = __webpack_require__(20);
	var Note = __webpack_require__(21);

	/**
	 * Imports a tiled map to create game objects.
	 */
	module.exports = function (game, wallLayer, triggerManager, zDepth, map) {
	  this.game = game;
	  this.triggerManager = triggerManager;
	  this.zDepth = zDepth;
	  var mapRooms = module.exports.getObjectLayer(map, "Rooms");
	  var mapNavMesh = module.exports.getObjectLayer(map, "Nav Mesh");
	  var mapPlayerSpawn = module.exports.getObjectLayer(map, "Player Spawn");
	  var mapKeys = module.exports.getObjectLayer(map, "Keys");
	  var mapEnemySpawn = module.exports.getObjectLayer(map, "Enemy Spawn");
	  var mapExit = module.exports.getObjectLayer(map, "Exit");
	  var mapDoors = module.exports.getObjectLayer(map, "Doors");
	  var mapNotes = module.exports.getObjectLayer(map, "Notes");

	  this.player = this.parsePlayer(mapPlayerSpawn);
	  this.exit = this.parseExit(mapExit);
	  this.keys = this.parseKeys(this.player, mapKeys, this.exit);
	  this.lighting = this.parseLighting(mapRooms, wallLayer, this.player);
	  this.navMesh = this.parseNavMesh(mapNavMesh);
	  this.enemies = this.parseEnemies(mapEnemySpawn, this.player, this.lighting, this.navMesh);
	  this.enemySpawners = this.parseEnemySpawners(mapEnemySpawn, this.triggerManager, this.player, this.lighting, this.navMesh);

	  this.doors = this.parseDoors(mapDoors);
	  this.doorManager = new DoorManager(this.doors);
	  this.notes = this.parseNotes(mapNotes, this.player, this.doors, this.doorManager);
	};

	module.exports.prototype.getLighting = function () {
	  if (this.lighting == undefined) {
	    throw "The lighting has not been created yet.";
	  }

	  return this.lighting;
	};

	module.exports.prototype.parseLighting = function (mapRooms, wallLayer, torchSprite) {
	  if (mapRooms.length > 1) {
	    throw "Layer \"Rooms\" expected to contain at most one object.";
	  }
	  var room = mapRooms[0];
	  var lightingMode = room ? room.properties["mode"] : undefined;

	  var lighting = new Lighting(this.game, wallLayer, torchSprite, lightingMode);
	  this.zDepth.ceilingLighting.add(lighting);
	  return lighting;
	};

	module.exports.prototype.getNavMesh = function () {
	  if (this.navMesh === undefined) {
	    throw "The Nav mesh has not been created yet.";
	  }

	  return this.navMesh;
	};

	module.exports.prototype.parseNavMesh = function (mapNavMesh) {
	  var result = new NavMesh();

	  var lines = [];
	  var points = [];

	  mapNavMesh.forEach(function (o) {
	    if (o.polyline) {
	      lines.push(new Phaser.Line(o.polyline[0][0] + o.x, o.polyline[0][1] + o.y, o.polyline[1][0] + o.x, o.polyline[1][1] + o.y));
	    } else if (o.rectangle) {
	      points.push(new Phaser.Circle(o.x + o.width / 2, o.y + o.height / 2, 16));
	    } else {
	      throw "Unexpected navmesh object: " + o;
	    }
	  });

	  var isOverlapping = function isOverlapping(point, line) {
	    return point.contains(line.start.x, line.start.y) || point.contains(line.end.x, line.end.y);
	  };

	  points.forEach(function (p0, i0) {

	    var overlappingIndices = [];

	    lines.forEach(function (l) {
	      if (isOverlapping(p0, l)) {
	        points.forEach(function (p1, i1) {
	          if (isOverlapping(p1, l)) {
	            overlappingIndices.push(i1);
	          }
	        });
	      }
	    });

	    result.addPoint(p0.x, p0.y, overlappingIndices);
	  });

	  return result;
	};

	module.exports.prototype.getPlayer = function () {
	  if (this.player === undefined) {
	    throw "The Player has not been created yet.";
	  }

	  return this.player;
	};

	module.exports.prototype.parsePlayer = function (mapPlayerSpawn) {
	  if (mapPlayerSpawn.length != 1) {
	    throw "Only one element is permitted in the player spawn layer. Instead, there " + "were " + mapPlayerSpawn.length;
	  }

	  var playerSpawnLocation = mapPlayerSpawn[0];
	  var x = playerSpawnLocation.x + playerSpawnLocation.width / 2;
	  var y = playerSpawnLocation.y + playerSpawnLocation.height / 2;

	  var result = new Player(this.game, x, y);
	  this.zDepth.sprite.add(result);
	  return result;
	};

	module.exports.prototype.getKeys = function () {
	  if (this.keys === undefined) {
	    throw "The Keys have not been created yet.";
	  }

	  return this.keys;
	};

	module.exports.prototype.parseKeys = function (player, mapKeys, exit) {
	  var result = [];

	  for (var i = 0; i < mapKeys.length; i++) {
	    var mapKey = mapKeys[i];
	    var key = new Key(this.game, mapKey.x, mapKey.y, player, exit);
	    this.zDepth.floorItems.add(key);
	    result.push(key);
	  }

	  return result;
	};

	module.exports.prototype.getEnemies = function () {
	  if (this.enemies === undefined) {
	    throw "The Enemy has not been created yet.";
	  }

	  return this.enemies;
	};

	/**
	 * Parses enemies placed on the map.
	 */
	module.exports.prototype.parseEnemies = function (mapEnemySpawn, player, roomManager, navMesh) {
	  var result = [];

	  for (var i = 0; i < mapEnemySpawn.length; i++) {
	    var enemySpawnLocation = mapEnemySpawn[i];
	    if (enemySpawnLocation.name != undefined && enemySpawnLocation.name != "") {
	      continue;
	    }

	    var x = enemySpawnLocation.x + enemySpawnLocation.width / 2;
	    var y = enemySpawnLocation.y + enemySpawnLocation.height / 2;

	    var enemy = new Nasty(this.game, player, roomManager, navMesh, x, y);
	    this.zDepth.sprite.add(enemy);
	    result.push(enemy);
	  }

	  return result;
	};

	/**
	 * Parses enemy spawners.
	 */
	module.exports.prototype.parseEnemySpawners = function (mapEnemySpawn, triggerManager, player, roomManager, navMesh) {
	  var _this = this;

	  var result = [];

	  mapEnemySpawn.filter(function (spawnPoint) {
	    return spawnPoint.name != undefined && spawnPoint.name != "";
	  }).forEach(function (spawnPoint) {
	    var x = spawnPoint.x + spawnPoint.width / 2;
	    var y = spawnPoint.y + spawnPoint.height / 2;
	    var nastySpawner = new NastySpawner(_this.game, player, roomManager, navMesh, _this.zDepth, x, y);
	    triggerManager.registerTriggerable(spawnPoint.name, nastySpawner);
	  });

	  return result;
	};

	module.exports.prototype.getExit = function () {
	  if (this.exit === undefined) {
	    throw "The Exit has not been created yet.";
	  }

	  return this.exit;
	};

	module.exports.prototype.parseExit = function (mapExitLayer) {
	  if (mapExitLayer.length != 1) {
	    throw "Map expected to contain one exit.";
	  }

	  var mapExit = mapExitLayer[0];

	  if (mapExit.properties.keyCount === undefined) {
	    throw "Map Exit object should define custom property \"keyCount\". " + "This value may be zero if the exit is open by default.";
	  }

	  return new Exit(this.game, mapExit.x, mapExit.y, mapExit.width, mapExit.height, mapExit.properties.keyCount, mapExit.name);
	};

	module.exports.prototype.parseDoors = function (mapDoors) {
	  var _this2 = this;

	  var result = {};

	  mapDoors.forEach(function (d) {
	    if (d.name === undefined) {
	      throw "Doors must provide a value for the name property.";
	    }

	    if (result[d.name] != undefined) {
	      throw "Door names must be unique. The door name: \"" + d.name + "\" has already been used in this map.";
	    }

	    var rotation = d.properties.rotation;
	    var isOpen = d.properties.isOpen;

	    if (rotation === undefined || isOpen === undefined) {
	      throw "Doors must provide values for the \"rotation\" and \"isOpen\" properties.";
	    }

	    var door = new Door(_this2.game, d.x + d.width / 2, d.y + d.height / 2, parseInt(rotation), isOpen === "true");
	    _this2.zDepth.wall.add(door);
	    result[d.name] = door;
	  });

	  return result;
	};

	/**
	 * Returns the map of door names to door objects.
	 */
	module.exports.prototype.getDoors = function () {
	  if (this.doors === undefined) {
	    throw "The Doors have not been created yet.";
	  }

	  return this.doors;
	};

	module.exports.prototype.parseNotes = function (mapNotes, player, doors, doorManager) {
	  var _this3 = this;

	  var result = [];

	  mapNotes.forEach(function (mapNote) {

	    var text = mapNote.properties.text;
	    var opens = mapNote.properties["opens"];
	    var closes = mapNote.properties["closes"];
	    var flipsOpenState = mapNote.properties["flipsOpenState"];
	    var triggers = mapNote.properties["triggers"];
	    var destinationMapName = mapNote.properties["triggers-map-transition"];

	    var condition = mapNote.properties["condition"];

	    var onReadCallback = function onReadCallback() {
	      if (destinationMapName != undefined) {
	        _this3.game.state.getCurrentState().triggerMapTransition(destinationMapName);
	      }

	      if (flipsOpenState != undefined) {
	        doorManager.flip(flipsOpenState);
	      }

	      if (opens != undefined) {
	        doorManager.open(opens);
	      }

	      if (closes != undefined) {
	        doorManager.close(closes);
	      }

	      if (triggers != undefined) {
	        triggers.split(",").map(function (t) {
	          return t.trim();
	        }).filter(function (t) {
	          return t != "";
	        }).forEach(function (t) {
	          return _this3.triggerManager.trigger(t);
	        });
	      }
	    };

	    var sprite = mapNote.properties.sprite;
	    sprite = sprite === undefined ? 'note' : sprite;

	    var note = new Note(_this3.game, sprite, mapNote.x, mapNote.y, player, text, onReadCallback);

	    if (condition === "allDoorsOpen") {
	      doorManager.addDoorStateChangeListener(function (d) {
	        note.visible = doorManager.isEveryDoorOpen();
	      });
	    } else if (condition === "!allDoorsOpen") {
	      doorManager.addDoorStateChangeListener(function (d) {
	        note.visible = !doorManager.isEveryDoorOpen();
	      });
	    }

	    _this3.zDepth.floorItems.add(note);

	    result.push();
	  });

	  return result;
	};

	module.exports.prototype.getNotes = function () {
	  if (this.notes === undefined) {
	    throw "The notes have not been created yet.";
	  }

	  return this.notes;
	};

	module.exports.getObjectLayer = function (map, objectLayerName) {
	  var objectLayer = map.objects[objectLayerName];
	  if (objectLayer == undefined) {
	    throw "Map expected to contain object layer: " + objectLayerName;
	  }
	  return objectLayer;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var tileSize = 16;

	/**
	 * The upper bound for lit tiles, in game unit distance from the player.
	 */
	var lightingRange = 80;

	/**
	 * Distance in unit tiles moved by the player after which a visible tile
	 * recalculation should be performed. 1 = once per tile. 2 = twice per tile
	 * etc.
	 */
	var recalculationFrequency = 2;

	var Modes = {

	  DAY: "DAY",

	  NIGHT: "NIGHT",

	  MIDNIGHT: "MIDNIGHT",

	  DEFAULT: "DAY"
	};

	var baseBrightness = {
	  DAY: 0.95,
	  MIDNIGHT: 0,
	  NIGHT: 0
	};

	var darkColor = {
	  DAY: { red: 0, green: 0, blue: 0 },
	  MIDNIGHT: { red: 50, green: 0, blue: 0 },
	  NIGHT: { red: 0, green: 0, blue: 0 }
	};

	var ambientSound = {
	  DAY: { name: 'office-ambience-day', volume: 0.1 },
	  MIDNIGHT: { name: 'office-ambience-night', volume: 0.3 },
	  NIGHT: { name: 'office-ambience-night', volume: 0.3 }
	};

	/**
	 * Maintains the collection of rooms in the game and updates their
	 * state according to the location of lighting sprites.
	 */

	var Lighting = function (_Phaser$Sprite) {
	  _inherits(Lighting, _Phaser$Sprite);

	  function Lighting(game, wallLayer, player, mode) {
	    _classCallCheck(this, Lighting);

	    var bitmap = game.make.bitmapData(game.camera.width + tileSize * 2, game.camera.height + tileSize * 2);

	    var _this = _possibleConstructorReturn(this, (Lighting.__proto__ || Object.getPrototypeOf(Lighting)).call(this, game, 0, 0, bitmap));

	    _this.wallLayer = wallLayer;
	    _this.player = player;
	    _this.xResolution = game.camera.width / tileSize + 2;
	    _this.yResolution = game.camera.height / tileSize + 2;
	    _this.bitmap = bitmap;
	    _this.anchor.setTo(0, 0);

	    mode = mode || Modes.DEFAULT;

	    _this.baseBrightness = baseBrightness[mode];
	    _this.darkColor = darkColor[mode];

	    _this.visibleTiles = {};
	    _this.update();

	    _this.ambientSound = _this.game.add.sound(ambientSound[mode].name, ambientSound[mode].volume, true);
	    _this.ambientSound.play();
	    return _this;
	  }

	  _createClass(Lighting, [{
	    key: "update",
	    value: function update() {
	      var _this2 = this;

	      this.snapToCamera();
	      this.ifPlayerGridCoordsChanged(function () {
	        return _this2.recalculateVisibleTiles();
	      });
	      this.redraw();
	    }

	    /**
	     * Snaps the coordinates of the lighting to the grid coordinate nearest the camera.
	     */

	  }, {
	    key: "snapToCamera",
	    value: function snapToCamera() {
	      this.x = Phaser.Math.snapToFloor(this.game.camera.view.left - tileSize, tileSize);
	      this.y = Phaser.Math.snapToFloor(this.game.camera.view.top - tileSize, tileSize);
	    }

	    /**
	     * If the player's grid coordinates have changed since the last call,
	     * the supplied callback is invoked. The stored player coordinates are
	     * updated if the call is made.
	     */

	  }, {
	    key: "ifPlayerGridCoordsChanged",
	    value: function ifPlayerGridCoordsChanged(callback) {
	      var playerGridX = Phaser.Math.snapTo(this.player.x, tileSize / recalculationFrequency);
	      var playerGridY = Phaser.Math.snapTo(this.player.y, tileSize / recalculationFrequency);

	      if (playerGridX != this.playerGridX || playerGridY != this.playerGridY) {
	        callback();
	        this.playerGridX = playerGridX;
	        this.playerGridY = playerGridY;
	      }
	    }

	    /**
	     * Recalculates the tiles that are visible from the player's line of sight.
	     * This calculation is fairly expensive and should only be made when
	     * necessary (when the player's grid coordinates have changed).
	     */

	  }, {
	    key: "recalculateVisibleTiles",
	    value: function recalculateVisibleTiles() {
	      this.visibleTiles = {};

	      for (var x = -1; x < this.xResolution - 1; x++) {
	        for (var y = -1; y < this.yResolution - 1; y++) {
	          var xCoord = x * tileSize + this.x;
	          var yCoord = y * tileSize + this.y;
	          if (this.hasLineOfSightToTileCorner(xCoord, yCoord, this.player.x, this.player.y)) {
	            this.setTileVisible(x, y);
	          };
	        }
	      }
	    }

	    /**
	     * Sets the visibility of the specified x-y coordinate to true.
	     */

	  }, {
	    key: "setTileVisible",
	    value: function setTileVisible(x, y) {
	      this.visibleTiles[x] = this.visibleTiles[x] || {};
	      this.visibleTiles[x + 1] = this.visibleTiles[x + 1] || {};
	      this.visibleTiles[x - 1] = this.visibleTiles[x - 1] || {};

	      this.visibleTiles[x][y] = true;
	      this.visibleTiles[x + 1][y] = true;
	      this.visibleTiles[x - 1][y] = true;
	      this.visibleTiles[x][y + 1] = true;
	      this.visibleTiles[x][y - 1] = true;
	    }

	    /**
	     * Redraws the shading bitmap.
	     */

	  }, {
	    key: "redraw",
	    value: function redraw() {
	      this.bitmap.cls();
	      for (var x = -1; x < this.xResolution + 1; x++) {
	        for (var y = -1; y < this.yResolution + 1; y++) {
	          if (this.visibleTiles[x] && this.visibleTiles[x][y]) {
	            this.fillTile(x, y, this.player.x, this.player.y);
	          } else {
	            this.fillTile(x, y);
	          }
	        }
	      }
	    }

	    /**
	     * Returns true if the specified playerX and playerY coordinates
	     * have line of sight to the tile specified by the left and top
	     * coordinates.
	     */

	  }, {
	    key: "hasLineOfSightToTileCorner",
	    value: function hasLineOfSightToTileCorner(left, top, playerX, playerY) {
	      var l = left;
	      var r = left + tileSize;
	      var t = top;
	      var b = top + tileSize;

	      return this.hasLineOfSightToTile(l, t, playerX, playerY) || this.hasLineOfSightToTile(r, t, playerX, playerY) || this.hasLineOfSightToTile(l, b, playerX, playerY) || this.hasLineOfSightToTile(r, b, playerX, playerY);
	    }

	    /**
	     * @return true if the playerX, and playerY coordinates have line of sight
	     * to the tile on the specified x and y coordinates.
	     * @param x, y coordinates ON an edge face of the tile.
	     */

	  }, {
	    key: "hasLineOfSightToTile",
	    value: function hasLineOfSightToTile(x, y, playerX, playerY) {
	      var line = new Phaser.Line(x, y, playerX, playerY);

	      var rayCastTiles = this.wallLayer.getRayCastTiles(line);

	      for (var i = 0; i < rayCastTiles.length; i++) {
	        var t = rayCastTiles[i];
	        if (t.index != -1) {
	          return false;
	        }
	      }

	      return true;
	    }

	    /**
	     * Fills the tile at the specified GRID coordinate (-1 ... xResolution)
	     */

	  }, {
	    key: "fillTile",
	    value: function fillTile(x, y, lightSourceX, lightSourceY) {
	      var xCoord = x * tileSize + this.x;
	      var yCoord = y * tileSize + this.y;

	      var alpha;
	      if (lightSourceX != undefined) {
	        alpha = Phaser.Math.distanceSq(xCoord + tileSize / 2, yCoord + tileSize / 2, lightSourceX, lightSourceY);

	        alpha = (1 - this.baseBrightness) * Phaser.Math.clamp(alpha / (lightingRange * lightingRange), 0, 1);
	      } else {
	        alpha = 1 - this.baseBrightness;
	      }

	      this.bitmap.context.fillStyle = 'rgba(' + this.darkColor.red + ', ' + this.darkColor.green + ', ' + this.darkColor.blue + ', ' + alpha + ')';

	      this.bitmap.context.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.ambientSound.destroy();
	      _get(Lighting.prototype.__proto__ || Object.getPrototypeOf(Lighting.prototype), "destroy", this).call(this);
	    }
	  }]);

	  return Lighting;
	}(Phaser.Sprite);

	module.exports = Lighting;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AStar = __webpack_require__(11);

	/**
	 * The navmesh provides navigation functionality for sprites.
	 */
	module.exports = function () {
	  this.points = [];
	};

	/**
	 * Adds a new point to the navmesh.
	 * @param x the x-location of the point.
	 * @param y the y-location of the point.
	 * @param attachedIndices the indices of attached points.
	 * @return the index of the added point.
	 */
	module.exports.prototype.addPoint = function (x, y, attachedIndices) {
	  var index = this.points.length;
	  this.points.push(new module.exports.NavPoint(index, x, y, attachedIndices));
	  return index;
	};

	module.exports.prototype.closestNavPointIndex = function (x, y) {
	  var closestDist;
	  var closestIndex = -1;
	  this.points.forEach(function (point, index) {
	    var dist = Phaser.Math.distanceSq(x, y, point.x, point.y);

	    if (closestIndex === -1 || dist < closestDist) {
	      closestDist = dist;
	      closestIndex = index;
	    }
	  });

	  return closestIndex;
	};

	/**
	 * @return an array of the indices of points attached to the
	 * index i.
	 */
	module.exports.prototype.pointsAttachedTo = function (i) {
	  return this.points[i].attachedIndices;
	};

	/**
	 * @return the path, in nodes, from i0 to i1.
	 * @param the index of the nav point to start the serch from.
	 * @param the index of the destination nav point.
	 * @param navPointFilter filter function which accepts as
	 * a first argument the index of the potential nav point,
	 * and as a second argument an object {x, y} of the nav point
	 * coordinates. This function should return true if the nav point
	 * should be considered in the nav point search.
	 */
	module.exports.prototype.getPath = function (i0, i1, navPointFilter) {
	  var graph = new module.exports.Graph(this.points, navPointFilter);
	  var nodes = AStar.astar.search(graph, this.points[i0], this.points[i1]);
	  nodes.splice(0, 0, this.points[i0]);
	  return nodes;
	};

	module.exports.NavPoint = function (index, x, y, attachedIndices) {
	  this.index = index;
	  this.x = x;
	  this.y = y;
	  this.attachedIndices = attachedIndices;
	};
	module.exports.NavPoint.weight = 1;
	module.exports.NavPoint.prototype.isWall = function () {
	  return this.weight === 0;
	};
	module.exports.NavPoint.prototype.getCost = function (otherNode) {
	  return Phaser.Math.distance(this.x, this.y, otherNode.x, otherNode.y);
	};

	module.exports.Graph = function (nodes, navPointFilter) {
	  this.nodes = nodes;
	  this.navPointFilter = navPointFilter;
	  this.init();
	};

	module.exports.Graph.heuristic = function (node0, node1) {
	  return Phaser.Math.distance(node0.x, node0.y, node1.x, node1.y);
	};

	module.exports.Graph.prototype.init = AStar.Graph.prototype.init;
	module.exports.Graph.prototype.cleanDirty = AStar.Graph.prototype.cleanDirty;
	module.exports.Graph.prototype.markDirty = AStar.Graph.prototype.markDirty;
	module.exports.Graph.prototype.neighbors = function (node) {
	  var result = [];
	  node.attachedIndices.forEach(function (i) {
	    var potentialNode = this.nodes[i];

	    // excludes nodes which the filter does not accept.
	    if (this.navPointFilter(i, potentialNode)) {
	      result.push(this.nodes[i]);
	    }
	  }, this);
	  return result;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// javascript-astar 0.4.1
	// http://github.com/bgrins/javascript-astar
	// Freely distributable under the MIT License.
	// Implements the astar search algorithm in javascript using a Binary Heap.
	// Includes Binary Heap (with modifications) from Marijn Haverbeke.
	// http://eloquentjavascript.net/appendix2.html

	(function(definition) {
	    /* global module, define */
	    if(typeof module === 'object' && typeof module.exports === 'object') {
	        module.exports = definition();
	    } else if(true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else {
	        var exports = definition();
	        window.astar = exports.astar;
	        window.Graph = exports.Graph;
	    }
	})(function() {

	function pathTo(node){
	    var curr = node,
	        path = [];
	    while(curr.parent) {
	        path.unshift(curr);
	        curr = curr.parent;
	    }
	    return path;
	}

	function getHeap() {
	    return new BinaryHeap(function(node) {
	        return node.f;
	    });
	}

	var astar = {
	    /**
	    * Perform an A* Search on a graph given a start and end node.
	    * @param {Graph} graph
	    * @param {GridNode} start
	    * @param {GridNode} end
	    * @param {Object} [options]
	    * @param {bool} [options.closest] Specifies whether to return the
	               path to the closest node if the target is unreachable.
	    * @param {Function} [options.heuristic] Heuristic function (see
	    *          astar.heuristics).
	    */
	    search: function(graph, start, end, options) {
	        graph.cleanDirty();
	        options = options || {};
	        var heuristic = options.heuristic || astar.heuristics.manhattan,
	            closest = options.closest || false;

	        var openHeap = getHeap(),
	            closestNode = start; // set the start node to be the closest if required

	        start.h = heuristic(start, end);

	        openHeap.push(start);

	        while(openHeap.size() > 0) {

	            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
	            var currentNode = openHeap.pop();

	            // End case -- result has been found, return the traced path.
	            if(currentNode === end) {
	                return pathTo(currentNode);
	            }

	            // Normal case -- move currentNode from open to closed, process each of its neighbors.
	            currentNode.closed = true;

	            // Find all neighbors for the current node.
	            var neighbors = graph.neighbors(currentNode);

	            for (var i = 0, il = neighbors.length; i < il; ++i) {
	                var neighbor = neighbors[i];

	                if (neighbor.closed || neighbor.isWall()) {
	                    // Not a valid node to process, skip to next neighbor.
	                    continue;
	                }

	                // The g score is the shortest distance from start to current node.
	                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
	                var gScore = currentNode.g + neighbor.getCost(currentNode),
	                    beenVisited = neighbor.visited;

	                if (!beenVisited || gScore < neighbor.g) {

	                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
	                    neighbor.visited = true;
	                    neighbor.parent = currentNode;
	                    neighbor.h = neighbor.h || heuristic(neighbor, end);
	                    neighbor.g = gScore;
	                    neighbor.f = neighbor.g + neighbor.h;
	                    graph.markDirty(neighbor);
	                    if (closest) {
	                        // If the neighbour is closer than the current closestNode or if it's equally close but has
	                        // a cheaper path than the current closest node then it becomes the closest node
	                        if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
	                            closestNode = neighbor;
	                        }
	                    }

	                    if (!beenVisited) {
	                        // Pushing to heap will put it in proper place based on the 'f' value.
	                        openHeap.push(neighbor);
	                    }
	                    else {
	                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
	                        openHeap.rescoreElement(neighbor);
	                    }
	                }
	            }
	        }

	        if (closest) {
	            return pathTo(closestNode);
	        }

	        // No result was found - empty array signifies failure to find path.
	        return [];
	    },
	    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
	    heuristics: {
	        manhattan: function(pos0, pos1) {
	            var d1 = Math.abs(pos1.x - pos0.x);
	            var d2 = Math.abs(pos1.y - pos0.y);
	            return d1 + d2;
	        },
	        diagonal: function(pos0, pos1) {
	            var D = 1;
	            var D2 = Math.sqrt(2);
	            var d1 = Math.abs(pos1.x - pos0.x);
	            var d2 = Math.abs(pos1.y - pos0.y);
	            return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
	        }
	    },
	    cleanNode:function(node){
	        node.f = 0;
	        node.g = 0;
	        node.h = 0;
	        node.visited = false;
	        node.closed = false;
	        node.parent = null;
	    }
	};

	/**
	* A graph memory structure
	* @param {Array} gridIn 2D array of input weights
	* @param {Object} [options]
	* @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
	*/
	function Graph(gridIn, options) {
	    options = options || {};
	    this.nodes = [];
	    this.diagonal = !!options.diagonal;
	    this.grid = [];
	    for (var x = 0; x < gridIn.length; x++) {
	        this.grid[x] = [];

	        for (var y = 0, row = gridIn[x]; y < row.length; y++) {
	            var node = new GridNode(x, y, row[y]);
	            this.grid[x][y] = node;
	            this.nodes.push(node);
	        }
	    }
	    this.init();
	}

	Graph.prototype.init = function() {
	    this.dirtyNodes = [];
	    for (var i = 0; i < this.nodes.length; i++) {
	        astar.cleanNode(this.nodes[i]);
	    }
	};

	Graph.prototype.cleanDirty = function() {
	    for (var i = 0; i < this.dirtyNodes.length; i++) {
	        astar.cleanNode(this.dirtyNodes[i]);
	    }
	    this.dirtyNodes = [];
	};

	Graph.prototype.markDirty = function(node) {
	    this.dirtyNodes.push(node);
	};

	Graph.prototype.neighbors = function(node) {
	    var ret = [],
	        x = node.x,
	        y = node.y,
	        grid = this.grid;

	    // West
	    if(grid[x-1] && grid[x-1][y]) {
	        ret.push(grid[x-1][y]);
	    }

	    // East
	    if(grid[x+1] && grid[x+1][y]) {
	        ret.push(grid[x+1][y]);
	    }

	    // South
	    if(grid[x] && grid[x][y-1]) {
	        ret.push(grid[x][y-1]);
	    }

	    // North
	    if(grid[x] && grid[x][y+1]) {
	        ret.push(grid[x][y+1]);
	    }

	    if (this.diagonal) {
	        // Southwest
	        if(grid[x-1] && grid[x-1][y-1]) {
	            ret.push(grid[x-1][y-1]);
	        }

	        // Southeast
	        if(grid[x+1] && grid[x+1][y-1]) {
	            ret.push(grid[x+1][y-1]);
	        }

	        // Northwest
	        if(grid[x-1] && grid[x-1][y+1]) {
	            ret.push(grid[x-1][y+1]);
	        }

	        // Northeast
	        if(grid[x+1] && grid[x+1][y+1]) {
	            ret.push(grid[x+1][y+1]);
	        }
	    }

	    return ret;
	};

	Graph.prototype.toString = function() {
	    var graphString = [],
	        nodes = this.grid, // when using grid
	        rowDebug, row, y, l;
	    for (var x = 0, len = nodes.length; x < len; x++) {
	        rowDebug = [];
	        row = nodes[x];
	        for (y = 0, l = row.length; y < l; y++) {
	            rowDebug.push(row[y].weight);
	        }
	        graphString.push(rowDebug.join(" "));
	    }
	    return graphString.join("\n");
	};

	function GridNode(x, y, weight) {
	    this.x = x;
	    this.y = y;
	    this.weight = weight;
	}

	GridNode.prototype.toString = function() {
	    return "[" + this.x + " " + this.y + "]";
	};

	GridNode.prototype.getCost = function(fromNeighbor) {
	    // Take diagonal weight into consideration.
	    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
	        return this.weight * 1.41421;
	    }
	    return this.weight;
	};

	GridNode.prototype.isWall = function() {
	    return this.weight === 0;
	};

	function BinaryHeap(scoreFunction){
	    this.content = [];
	    this.scoreFunction = scoreFunction;
	}

	BinaryHeap.prototype = {
	    push: function(element) {
	        // Add the new element to the end of the array.
	        this.content.push(element);

	        // Allow it to sink down.
	        this.sinkDown(this.content.length - 1);
	    },
	    pop: function() {
	        // Store the first element so we can return it later.
	        var result = this.content[0];
	        // Get the element at the end of the array.
	        var end = this.content.pop();
	        // If there are any elements left, put the end element at the
	        // start, and let it bubble up.
	        if (this.content.length > 0) {
	            this.content[0] = end;
	            this.bubbleUp(0);
	        }
	        return result;
	    },
	    remove: function(node) {
	        var i = this.content.indexOf(node);

	        // When it is found, the process seen in 'pop' is repeated
	        // to fill up the hole.
	        var end = this.content.pop();

	        if (i !== this.content.length - 1) {
	            this.content[i] = end;

	            if (this.scoreFunction(end) < this.scoreFunction(node)) {
	                this.sinkDown(i);
	            }
	            else {
	                this.bubbleUp(i);
	            }
	        }
	    },
	    size: function() {
	        return this.content.length;
	    },
	    rescoreElement: function(node) {
	        this.sinkDown(this.content.indexOf(node));
	    },
	    sinkDown: function(n) {
	        // Fetch the element that has to be sunk.
	        var element = this.content[n];

	        // When at 0, an element can not sink any further.
	        while (n > 0) {

	            // Compute the parent element's index, and fetch it.
	            var parentN = ((n + 1) >> 1) - 1,
	                parent = this.content[parentN];
	            // Swap the elements if the parent is greater.
	            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
	                this.content[parentN] = element;
	                this.content[n] = parent;
	                // Update 'n' to continue at the new position.
	                n = parentN;
	            }
	            // Found a parent that is less, no need to sink any further.
	            else {
	                break;
	            }
	        }
	    },
	    bubbleUp: function(n) {
	        // Look up the target element and its score.
	        var length = this.content.length,
	            element = this.content[n],
	            elemScore = this.scoreFunction(element);

	        while(true) {
	            // Compute the indices of the child elements.
	            var child2N = (n + 1) << 1,
	                child1N = child2N - 1;
	            // This is used to store the new position of the element, if any.
	            var swap = null,
	                child1Score;
	            // If the first child exists (is inside the array)...
	            if (child1N < length) {
	                // Look it up and compute its score.
	                var child1 = this.content[child1N];
	                child1Score = this.scoreFunction(child1);

	                // If the score is less than our element's, we need to swap.
	                if (child1Score < elemScore){
	                    swap = child1N;
	                }
	            }

	            // Do the same checks for the other child.
	            if (child2N < length) {
	                var child2 = this.content[child2N],
	                    child2Score = this.scoreFunction(child2);
	                if (child2Score < (swap === null ? elemScore : child1Score)) {
	                    swap = child2N;
	                }
	            }

	            // If the element needs to be moved, swap it, and continue.
	            if (swap !== null) {
	                this.content[n] = this.content[swap];
	                this.content[swap] = element;
	                n = swap;
	            }
	            // Otherwise, we are done.
	            else {
	                break;
	            }
	        }
	    }
	};

	return {
	    astar: astar,
	    Graph: Graph
	};

	});


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Tracks the state of all doors in a level. This is a convenience 
	 * for sprites which only appear when all doors are open.
	 */
	var DoorManager = function () {
	  function DoorManager(doors) {
	    _classCallCheck(this, DoorManager);

	    this.doors = doors;
	    this.listeners = [];
	  }

	  _createClass(DoorManager, [{
	    key: "isEveryDoorOpen",
	    value: function isEveryDoorOpen() {
	      var _this = this;

	      return Object.keys(this.doors).every(function (k) {
	        return _this.doors[k].isOpen();
	      });
	    }
	  }, {
	    key: "isEveryDoorClosed",
	    value: function isEveryDoorClosed() {
	      var _this2 = this;

	      return Object.keys(this.doors).every(function (k) {
	        return !_this2.doors[k].isOpen();
	      });
	    }
	  }, {
	    key: "open",
	    value: function open(doorNameCsv) {
	      var _this3 = this;

	      this.csvToDoors(doorNameCsv).forEach(function (door) {
	        door.open();
	        _this3.notifyListeners(door);
	      });
	    }
	  }, {
	    key: "close",
	    value: function close(doorNameCsv) {
	      var _this4 = this;

	      this.csvToDoors(doorNameCsv).forEach(function (door) {
	        door.close();
	        _this4.notifyListeners(door);
	      });
	    }
	  }, {
	    key: "flip",
	    value: function flip(doorNameCsv) {
	      var _this5 = this;

	      this.csvToDoors(doorNameCsv).forEach(function (door) {
	        door.flipOpenState();
	        _this5.notifyListeners(door);
	      });
	    }

	    /**
	     * Adds a listener which is notified whenever the state of any door is changed.
	     * @param doorStateChangeListener function accepting a single argument: the 
	     * door with its state changed. 
	     */

	  }, {
	    key: "addDoorStateChangeListener",
	    value: function addDoorStateChangeListener(doorStateChangeListener) {
	      this.listeners.push(doorStateChangeListener);
	    }
	  }, {
	    key: "notifyListeners",
	    value: function notifyListeners(door) {
	      this.listeners.forEach(function (l) {
	        return l(door);
	      });
	    }
	  }, {
	    key: "csvToDoors",
	    value: function csvToDoors(doorNameCsv) {
	      var _this6 = this;

	      return doorNameCsv.split(",").map(function (name) {
	        return name.trim();
	      }).filter(function (name) {
	        return name != "";
	      }).map(function (name) {
	        return _this6.doors[name];
	      });
	    }
	  }]);

	  return DoorManager;
	}();

	module.exports = DoorManager;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var WalkingEntity = __webpack_require__(14);

	/**
	 * Defines the player character.
	 * The player can be in one of two states: Alive and Dead. If dead, the player will
	 * not respond to command input.
	 * The player state can be queried via function isAlive();
	 * The player can be damaged via function damage(amount);
	 */
	module.exports = function (game, x, y) {
	  this.game = game;
	  WalkingEntity.call(this, game, x, y, module.exports.key, {
	    idle: { frames: [0], fps: 1 },
	    walkDown: { frames: [1, 2, 3], fps: 6 },
	    walkUp: { frames: [4, 5, 6], fps: 6 },
	    walkLeft: { frames: [10, 11, 12], fps: 6 },
	    walkRight: { frames: [7, 8, 9], fps: 6 }
	  });
	  this.animations.add('death', [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 16);
	  this.anchor.setTo(0.5, 0.5);

	  this.walkSpeed = 80.0;
	  this.walkAcceleration = 1000;
	  game.physics.arcade.enable(this);
	  this.body.collideWorldBounds = true;
	  this.body.maxVelocity.x = this.walkSpeed;
	  this.body.maxVelocity.y = this.walkSpeed;
	  this.body.drag.x = 1000;
	  this.body.drag.y = 1000;

	  this.controls = {
	    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
	    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
	    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
	    right: game.input.keyboard.addKey(Phaser.Keyboard.D),

	    interact: game.input.keyboard.addKey(Phaser.Keyboard.E)
	  };

	  this.health = module.exports.MaxHealth;
	  this.controlsEnabled = true;

	  this.walkSound = this.game.add.sound('player-walk', 1);
	};

	module.exports.MaxHealth = 100;
	module.exports.key = "dave";

	module.exports.prototype = Object.create(WalkingEntity.prototype);
	module.exports.prototype.constructor = module.exports;

	module.exports.prototype.getHealth = function () {
	  return this.health;
	};

	module.exports.prototype.isAlive = function () {
	  return this.health > 0;
	};

	module.exports.prototype.damage = function (amount) {
	  this.health = Math.max(0, this.health - amount);
	};

	module.exports.prototype.disableControls = function () {
	  if (!this.controlsEnabled) {
	    throw "Player controls have already been disabled.";
	  }

	  this.controlsEnabled = false;
	};

	module.exports.prototype.setInteractiveEntity = function (interactiveEntity) {
	  this.interactiveEntity = interactiveEntity;
	};

	module.exports.prototype.update = function () {

	  // disable controls on death.
	  if (!this.controlsEnabled) {
	    this.body.velocity.x = 0;
	    this.body.velocity.y = 0;

	    if (this.isAlive()) {
	      this.setAnimation('stand');
	    } else {
	      this.setAnimation('death');
	    }
	    return;
	  }

	  if (this.controls.interact.isDown && this.interactiveEntity && this.interactiveEntity.isActive) {
	    this.interactiveEntity.interact();
	    this.interactiveEntity = undefined;
	  }

	  var ddx = 0;
	  var ddy = 0;

	  if (this.controls.left.isDown && !this.body.touching.left) {
	    ddx -= this.walkAcceleration;
	  }

	  if (this.controls.right.isDown && !this.body.touching.right) {
	    ddx += this.walkAcceleration;
	  }

	  if (this.controls.up.isDown && !this.body.touching.up) {
	    ddy -= this.walkAcceleration;
	  }

	  if (this.controls.down.isDown && !this.body.touching.down) {
	    ddy += this.walkAcceleration;
	  }

	  this.body.velocity.x = ddx;
	  this.body.velocity.y = ddy;
	  this.setAnimationToBodyState();

	  if (ddx != 0 || ddy != 0) {
	    if (!this.walkSound.isPlaying) {
	      this.walkSound.play();
	    }
	  } else {
	    this.walkSound.stop();
	  }
	};

	module.exports.prototype.destroy = function () {
	  this.walkSound.destroy();
	  Phaser.Sprite.prototype.destroy.call(this);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WalkingEntity = function (_Phaser$Sprite) {
	  _inherits(WalkingEntity, _Phaser$Sprite);

	  function WalkingEntity(game, x, y, key, frames) {
	    _classCallCheck(this, WalkingEntity);

	    var _this = _possibleConstructorReturn(this, (WalkingEntity.__proto__ || Object.getPrototypeOf(WalkingEntity)).call(this, game, x, y, key));

	    _this.animations.add('idle', frames.idle.frames, frames.idle.fps, true);
	    _this.animations.add('walk-up', frames.walkUp.frames, frames.walkUp.fps, true);
	    _this.animations.add('walk-down', frames.walkDown.frames, frames.walkDown.fps, true);
	    _this.animations.add('walk-left', frames.walkLeft.frames, frames.walkLeft.fps, true);
	    _this.animations.add('walk-right', frames.walkRight.frames, frames.walkRight.fps, true);
	    return _this;
	  }

	  /**
	   * Updates the currently playing animation to match the current body status.
	   */


	  _createClass(WalkingEntity, [{
	    key: 'setAnimationToBodyState',
	    value: function setAnimationToBodyState() {
	      if (this.body.velocity.x > 0) {
	        this.setAnimation('walk-right');
	      } else if (this.body.velocity.x < 0) {
	        this.setAnimation('walk-left');
	      } else if (this.body.velocity.y > 0) {
	        this.setAnimation('walk-down');
	      } else if (this.body.velocity.y < 0) {
	        this.setAnimation('walk-up');
	      } else {
	        this.setAnimation('idle');
	      }
	    }

	    /**
	     * Sets the current animation to the animation specified by animationName,
	     * unless that animation is currently playing. If the animation is currently
	     * playing, no action is taken.
	     */

	  }, {
	    key: 'setAnimation',
	    value: function setAnimation(animationName) {
	      var currentAnimationName = this.animations.currentAnim.name;
	      if (currentAnimationName != animationName) {
	        this.animations.play(animationName);
	      }
	    }
	  }]);

	  return WalkingEntity;
	}(Phaser.Sprite);

	module.exports = WalkingEntity;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var WalkingEntity = __webpack_require__(14);

	/**
	 * Defines an enemy which attacks the player if it is in the same room.
	 * The nasty does not enter lit rooms.
	 *
	 * The behaviour of the enemy is defined by the path queue. At all times
	 * a queue of coordinates is set which the enemy will attempt to move to.
	 */
	module.exports = function (game, player, roomManager, navMesh, x, y) {
	  WalkingEntity.call(this, game, x, y, module.exports.key, {
	    idle: { frames: [0, 1, 2, 3, 4, 5, 6, 7], fps: 1 },
	    walkDown: { frames: [26, 27, 28, 29, 30], fps: 5 },
	    walkUp: { frames: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41], fps: 5 },
	    walkLeft: { frames: [17, 18, 19, 20, 21, 22, 23, 24, 25], fps: 5 },
	    walkRight: { frames: [8, 9, 10, 11, 12, 13, 14, 15, 16], fps: 5 }
	  });

	  this.game = game;
	  this.player = player;
	  this.anchor.setTo(0.5, 0.5);
	  game.physics.arcade.enable(this);
	  this.body.offset.setTo(this.width / 2 - 10, this.height / 2 - 10);
	  this.body.setCircle(10);
	  this.body.friction = 0;
	  this.roomManager = roomManager;
	  this.navMesh = navMesh;

	  this.runSpeed = 100;
	  this.wanderSpeed = 30;

	  // Cooldown between wandering cycles in seconds.
	  this.wanderCooldown = 2;

	  this.state = module.exports.State.WANDERING;

	  // the maximum distance at which to track the player.
	  // if the player is further away than this distance, they
	  // won't be followed.
	  this.maxPlayerDistance = 50;

	  // array of x, y locations which are queued for movement.
	  this.path = [];

	  this.navMeshFilterFunction = function (navPointIndex, navPointNode) {
	    return true;
	  };
	};

	module.exports.State = {

	  /**
	   * Indicates that the nasty is directly chasing the player.
	   */
	  CHASING: 0,

	  /**
	   * The nasty is just idly wandering about.
	   */
	  WANDERING: 1,

	  /**
	   * The nasty is cooling down between wander periods.
	   */
	  WANDER_COOLDOWN: 2
	};

	module.exports.key = "nasty";
	module.exports.load = function (game, assetContext) {
	  game.load.spritesheet(module.exports.key, assetContext("./sprites/nasty.png"), 16, 32);
	};

	module.exports.prototype = Object.create(WalkingEntity.prototype);
	module.exports.prototype.constructor = module.exports;

	/**
	 * Steps the AI for this entity.
	 */
	module.exports.prototype.update = function () {
	  var distanceToPlayer = Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y);

	  var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
	  var playerNavPointIndex = this.navMesh.closestNavPointIndex(this.player.x, this.player.y);

	  if (distanceToPlayer < 30) {
	    this.player.damage(1);
	  }

	  if (this.canFollow(this.player)) {
	    this.path = [{ x: this.player.x, y: this.player.y }];
	    this.state = module.exports.State.CHASING;
	    this.moveToNextNavPoint();
	  } else if (this.state === module.exports.State.CHASING) {
	    this.path = [];
	    this.startWanderCooldown();
	  } else if (this.path.length != 0) {
	    this.moveToNextNavPoint();
	  } else if (this.state != module.exports.State.WANDER_COOLDOWN) {
	    this.startWanderCooldown();
	  }

	  this.setAnimationToBodyState();
	};

	module.exports.prototype.startWanderCooldown = function () {
	  this.state = module.exports.State.WANDER_COOLDOWN;
	  this.game.time.events.add(Phaser.Timer.SECOND * this.wanderCooldown, function () {

	    var path = [];
	    while ((path = this.calculateWanderPath()).length < 2) {}

	    this.path = path;
	    this.state = module.exports.State.WANDERING;
	  }, this);
	};

	/**
	 * @return true if the player can be followed between rooms.
	 */
	module.exports.prototype.canFollow = function (player) {
	  return Phaser.Math.distance(this.body.x, this.body.y, player.x, player.y) < this.maxPlayerDistance;
	};

	/**
	 * Calculates a path which follows the player across multiple rooms.
	 */
	module.exports.prototype.calculateFollowPath = function (player) {
	  var roomManager = this.roomManager;
	  var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
	  var playerNavPointIndex = this.navMesh.closestNavPointIndex(player.x, player.y);

	  return this.navMesh.getPath(currentNavPointIndex, playerNavPointIndex, this.navMeshFilterFunction);
	};

	/**
	 * Calculates a path towards a randomly selected unlit room.
	 * A path containing only the current nav point index is returned
	 * if a path could not be randomly selected.
	 */
	module.exports.prototype.calculateWanderPath = function () {
	  var currentNavPointIndex = this.navMesh.closestNavPointIndex(this.x, this.y);
	  var navPointIndex = Math.floor(Math.random() * (this.navMesh.points.length - 1));
	  if (navPointIndex >= currentNavPointIndex) {
	    navPointIndex = navPointIndex + 1;
	  }

	  return this.navMesh.getPath(currentNavPointIndex, navPointIndex, this.navMeshFilterFunction);
	};

	module.exports.prototype.moveToNextNavPoint = function () {
	  if (this.path.length === 0) {
	    return;
	  }

	  var destination = new Phaser.Point(this.path[0].x, this.path[0].y);
	  var position = new Phaser.Point(this.body.center.x, this.body.center.y);
	  var destinationDistance = Phaser.Math.distance(position.x, position.y, destination.x, destination.y);

	  var speed = this.state === module.exports.State.CHASING ? this.runSpeed * Phaser.Math.clamp(1 - destinationDistance * destinationDistance / this.maxPlayerDistance, 0.1, 1) : this.wanderSpeed;

	  if (destinationDistance < 5) {
	    this.path.splice(0, 1);
	    this.body.velocity.x = 0;
	    this.body.velocity.y = 0;
	    return;
	  }

	  var dx = destination.x - position.x;
	  var dy = destination.y - position.y;

	  var velocity = Phaser.Point.subtract(destination, position).normalize().multiply(speed, speed);

	  this.body.velocity.setTo(velocity.x, velocity.y);
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Nasty = __webpack_require__(15);

	var NastySpawner = function () {
	  function NastySpawner(game, player, roomManager, navMesh, zDepth, x, y) {
	    _classCallCheck(this, NastySpawner);

	    this.game = game;
	    this.player = player;
	    this.roomManager = roomManager;
	    this.navMesh = navMesh;
	    this.zDepth = zDepth;
	    this.x = x;
	    this.y = y;

	    this.hasTriggered = false;
	  }

	  _createClass(NastySpawner, [{
	    key: 'trigger',
	    value: function trigger() {
	      if (this.hasTriggered) {
	        return;
	      }
	      this.hasTriggered = true;

	      this.zDepth.sprite.add(new Nasty(this.game, this.player, this.roomManager, this.navMesh, this.x, this.y));
	    }
	  }]);

	  return NastySpawner;
	}();

	module.exports = NastySpawner;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var InteractiveEntity = __webpack_require__(18);

	/**
	 * Defines an entity which may be interacted with.
	 */
	module.exports = function (game, x, y, player, exit) {
	  InteractiveEntity.call(this, game, module.exports.Key, x, y, player, this.interactionCallback, this);
	  this.game = game;
	  this.exit = exit;
	};

	module.exports.prototype = Object.create(InteractiveEntity.prototype);
	module.exports.prototype.constructor = module.exports;

	module.exports.Key = "key";

	module.exports.prototype.interactionCallback = function () {
	  this.exit.keyPickedUp();
	};

	module.exports.prototype.update = function () {
	  InteractiveEntity.prototype.update.call(this);
	  if (this.exit.isUnlocked() && this.isEnabled) {
	    this.disable();
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Defines an entity which the player may interact with.
	 * A highlight is displayed over the sprite representing that it has become active when the player is near.
	 * The player is then notified of the interactive sprite's presence, and may call the interact() method
	 * to trigger the interaction.
	 */
	/**
	 * @param player the LightsOut.Player object.
	 * @param onInteract callback function which is called exactly once per interaction. 
	 *  This function should return true if the interactive entity should not be destroyed 
	 *  after the interaction.
	 * @param onInteractContext the context in which the onInteract callback will be called.
	 * @param onActivationStatus notified each time there is a change to the activation status
	 *  of this entity. Should accept a single boolean parameter: whether the entity is active.
	 * @param onActivationStatusContext optional context for onActivationStatus.
	 */
	module.exports = function (game, key, x, y, player, onInteract, onInteractContext, onActivationStatus, onActivationStatusContext) {

	  Phaser.Sprite.call(this, game, x, y, key);
	  this.anchor.setTo(0.5, 0.5);
	  game.physics.arcade.enable(this);
	  this.game = game;
	  this.player = player;
	  this.onInteract = onInteract;
	  this.onInteractContext = onInteractContext;

	  /**
	   * Set to true when the player is overlapping this interactive entity.
	   */
	  this.isEnabled = true;
	  this.isActive = false;

	  var highlightRect = game.make.bitmapData(this.width, this.height);
	  highlightRect.rect(0, 0, this.width, this.height, 'rgb(255, 255, 255)');

	  var overlayBitmap = game.make.bitmapData(this.width, this.height);
	  overlayBitmap.alphaMask(highlightRect, key);

	  this.overlaySprite = game.add.sprite(0, 0, overlayBitmap);
	  this.overlaySprite.anchor.setTo(0.5, 0.5);
	  this.overlaySprite.alpha = 0;

	  this.addChild(this.overlaySprite);

	  this.flashTween = game.add.tween(this.overlaySprite).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);

	  this.interactionSound = this.game.add.sound('interact', 0.7);
	  this.interactionSound.allowMultiple = false;
	};

	module.exports.prototype = Object.create(Phaser.Sprite.prototype);
	module.exports.prototype.constructor = module.exports;

	module.exports.prototype.update = function () {
	  var wasActive = this.isActive;
	  this.isActive = false;
	  if (!this.isEnabled) {
	    return;
	  }

	  this.game.physics.arcade.overlap(this.player, this, function () {
	    this.isActive = true;
	    this.player.setInteractiveEntity(this);
	  }, null, this);

	  if (this.isActive) {
	    // ensure tween is running
	    this.flashTween.resume();
	  } else {
	    this.flashTween.pause();
	    this.overlaySprite.alpha = 0;
	  }

	  if (this.isActive != wasActive && this.onActivationStatus != undefined) {
	    this.onActivationStatus.call(this.onActivationStatusContext, this.isActive);
	  }
	};

	/**
	 * Triggers the interaction callback to be called.
	 */
	module.exports.prototype.interact = function () {
	  if (!this.interactionSound.isPlaying) {
	    this.interactionSound.play();
	  }

	  this.player.setInteractiveEntity();
	  var shouldDestroy = !this.onInteract.call(this.onInteractContext);

	  if (shouldDestroy) {
	    this.flashTween.stop();
	    this.destroy();
	  }
	};

	/**
	 * Disables this entity. This prevents the entity from becoming 
	 * active and being interacted with.
	 */
	module.exports.prototype.disable = function () {
	  this.isEnabled = false;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Defines a level transition area. If the player overlaps this area, they should move to
	 * the next level.
	 */
	module.exports = function (game, x, y, width, height, keyCount, destinationMapName) {
	  this.game = game;
	  Phaser.Sprite.call(this, game, x, y);

	  game.physics.arcade.enable(this);

	  this.body.width = width;
	  this.body.height = height;
	  this.body.x = x;
	  this.body.y = y;
	  this.keyCount = parseInt(keyCount);

	  this.destinationMapName = destinationMapName;

	  var style = { font: "32px verdana", fill: "#00ff00", align: "center" };
	  this.unlockText = game.add.text(0, 0, "Exit Unlocked", style);
	  this.unlockText.anchor.set(0.5);
	  this.unlockText.fixedToCamera = true;
	  this.unlockText.cameraOffset.setTo(game.camera.view.width / 2, game.camera.view.height / 2);
	  this.unlockText.visible = false;
	  this.unlockText.alpha = 0;

	  this.unlockSound = this.game.add.sound('exit-unlocked', 1);
	};

	module.exports.prototype = Object.create(Phaser.Sprite.prototype);
	module.exports.prototype.constructor = module.exports;

	/**
	 * Returns the name of the map (including file extension) that this map leads to.
	 */
	module.exports.prototype.getDestinationMapName = function () {
	  return this.destinationMapName;
	};

	module.exports.prototype.keyPickedUp = function () {
	  if (this.isUnlocked()) {
	    return;
	  }

	  this.keyCount -= 1;

	  if (this.isUnlocked()) {
	    this.unlockText.visible = true;
	    var show = this.game.add.tween(this.unlockText).to({ alpha: 1 }, 500, Phaser.Easing.Sinusoidal.InOut);

	    var hide = this.game.add.tween(this.unlockText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, false, 500);

	    show.chain(hide);
	    show.start();
	    this.unlockSound.play();
	  }
	};

	module.exports.prototype.isUnlocked = function () {
	  return this.keyCount === 0;
	};

	module.exports.prototype.destroy = function () {
	  this.unlockSound.destroy();
	  Phaser.Sprite.prototype.destroy.call(this);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Door = function (_Phaser$Sprite) {
	  _inherits(Door, _Phaser$Sprite);

	  /**
	   * @param rotation the rotation of the door from the neutral position facing up.
	   */
	  function Door(game, x, y, rotation, isOpen) {
	    _classCallCheck(this, Door);

	    var _this = _possibleConstructorReturn(this, (Door.__proto__ || Object.getPrototypeOf(Door)).call(this, game, x, y, Door.keyForRotation(rotation)));

	    _this.anchor.setTo(0.5, 0.5);

	    game.physics.arcade.enable(_this);
	    _this.body.immovable = true;
	    _this.body.width = Door.isDoorVertical(rotation) ? 8 : 16;
	    _this.body.height = Door.isDoorVertical(rotation) ? 16 : 8;

	    if (isOpen) {
	      _this.open();
	    } else {
	      _this.close();
	    }
	    return _this;
	  }

	  _createClass(Door, [{
	    key: "open",
	    value: function open() {
	      this.body.enable = false;
	      this.visible = false;
	    }
	  }, {
	    key: "isOpen",
	    value: function isOpen() {
	      return !this.visible;
	    }
	  }, {
	    key: "close",
	    value: function close() {
	      this.body.enable = true;
	      this.visible = true;
	    }
	  }, {
	    key: "flipOpenState",
	    value: function flipOpenState() {
	      this.body.enable = !this.body.enable;
	      this.visible = !this.visible;
	    }
	  }], [{
	    key: "keyForRotation",
	    value: function keyForRotation(rotation) {
	      return Door.isDoorVertical(rotation) ? "vdoor" : "hdoor";
	    }
	  }, {
	    key: "isDoorVertical",
	    value: function isDoorVertical(rotation) {
	      return rotation === -90 || rotation === 90;
	    }
	  }]);

	  return Door;
	}(Phaser.Sprite);

	module.exports = Door;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InteractiveEntity = __webpack_require__(18);

	var Note = function (_InteractiveEntity) {
	  _inherits(Note, _InteractiveEntity);

	  /**
	   * @param text the text to display on the note.
	   * @param onRead called once the player has read and closed the note.
	   * @param onReadContext context for the onRead callback.
	   */
	  function Note(game, key, x, y, player, text, onRead, onReadContext) {
	    _classCallCheck(this, Note);

	    var _this = _possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).call(this, game, key, x, y, player, Note.prototype.onInteract, Note.prototype.onActivationStatus));

	    _this.onInteractContext = _this;
	    _this.onActivationStatusContext = _this;

	    _this.onRead = onRead;
	    _this.onReadContext = onReadContext;

	    _this.game = game;

	    _this.text = game.add.text(0, 0, text, Note.textStyle(game));
	    _this.text.fixedToCamera = true;
	    _this.text.cameraOffset.setTo(4, game.camera.height);
	    _this.text.visible = false;

	    if (_this.text.height > Note.textHeight(_this.game)) {
	      throw "Text for this note is too large to be displayed on screen";
	    }

	    _this.tween = false;
	    _this.isOpen = false;
	    return _this;
	  }

	  _createClass(Note, [{
	    key: 'onInteract',
	    value: function onInteract() {
	      var _this2 = this;

	      // do nothing
	      if (this.tween) {
	        return true;
	      }

	      if (this.isOpen) {
	        this.tween = this.game.add.tween(this.text.cameraOffset);
	        this.tween.to({ y: this.game.camera.height }, 500, Phaser.Easing.Linear.None);
	        this.tween.onComplete.add(function () {
	          _this2.text.visible = false;
	          _this2.tween = false;

	          if (_this2.onRead != undefined) {
	            _this2.onRead.call(_this2.onReadContext);
	          }
	        });
	        this.isOpen = false;
	      } else {
	        this.text.visible = true;
	        this.tween = this.game.add.tween(this.text.cameraOffset);
	        this.tween.to({ y: this.game.camera.height - Note.textHeight(this.game) }, 500, Phaser.Easing.Linear.None);
	        this.tween.onComplete.add(function () {
	          _this2.tween = false;
	        });
	        this.isOpen = true;
	      }

	      this.tween.start();
	      return true;
	    }
	  }, {
	    key: 'onActivationStatus',
	    value: function onActivationStatus(isActive) {
	      if (!isActive && this.isOpen) {
	        if (this.tween) {
	          this.tween.stop();
	          this.tween = false;
	        }

	        this.onInteract();
	      }
	    }
	  }], [{
	    key: 'textHeight',
	    value: function textHeight(game) {
	      return game.camera.height * 0.33;
	    }
	  }, {
	    key: 'textStyle',
	    value: function textStyle(game) {
	      return { font: '8px monospace', fill: "white", backgroundColor: 'black', wordWrap: true, wordWrapWidth: game.camera.width - 8 };
	    }
	  }]);

	  return Note;
	}(InteractiveEntity);

	module.exports = Note;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Player = __webpack_require__(13);

	/**
	 * Visible meter which indicates how stressed the player is.
	 * Stress is a product of enemy proximity and health.
	 */
	module.exports = function (game, player, enemies) {
	  this.game = game;
	  this.player = player;
	  this.enemies = enemies;

	  var stressMeterBitmap = this.game.make.bitmapData(this.game.camera.width, this.game.camera.height);
	  var grad = stressMeterBitmap.context.createRadialGradient(this.game.camera.width / 2, this.game.camera.height / 2, 50, this.game.camera.width / 2, this.game.camera.height / 2, 200);
	  grad.addColorStop(0, 'transparent');
	  grad.addColorStop(1, '#FF0000');
	  stressMeterBitmap.context.fillStyle = grad;
	  stressMeterBitmap.context.fillRect(0, 0, stressMeterBitmap.width, stressMeterBitmap.height);

	  Phaser.Sprite.call(this, this.game, 0, 0, stressMeterBitmap);
	  this.fixedToCamera = true;

	  this.period = 3;
	  this.minAlpha = 0;
	  this.maxAlpha = 0;

	  this.detectionRange = 200;

	  this.ambientSound = this.game.add.audio('nasty-ambience', 0, true);
	  this.ambientSound.play();
	};

	module.exports.prototype = Object.create(Phaser.Sprite.prototype);
	module.exports.prototype.constructor = module.exports;

	module.exports.prototype.update = function () {
	  var closestEnemyDistance = -1;
	  this.enemies.forEach(function (enemy) {
	    var dist = Phaser.Math.distance(this.player.x, this.player.y, enemy.x, enemy.y);
	    if (closestEnemyDistance === -1 || dist < closestEnemyDistance) {
	      closestEnemyDistance = dist;
	    }
	  }, this);

	  this.alpha = closestEnemyDistance < this.detectionRange && closestEnemyDistance != -1 ? (this.detectionRange - closestEnemyDistance) / this.detectionRange : 0;
	  this.ambientSound.volume = this.alpha;
	};

	module.exports.prototype.destroy = function () {
	  Phaser.Sprite.prototype.destroy.call(this);
	  this.ambientSound.destroy();
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TriggerManager = function () {
	  function TriggerManager() {
	    _classCallCheck(this, TriggerManager);

	    this.triggerables = {};
	  }

	  _createClass(TriggerManager, [{
	    key: "registerTriggerable",
	    value: function registerTriggerable(name, triggerable) {
	      if (name === undefined || triggerable === undefined) {
	        throw "Name and triggerable must be supplied.";
	      }

	      if (triggerable["trigger"] === undefined || typeof triggerable["trigger"] != "function") {
	        throw "Triggerables must define a \"trigger\" method.";
	      }

	      if (this.triggerables[name] != undefined) {
	        throw "A triggerable with name: \"" + name + "\" has already been defined.";
	      }

	      this.triggerables[name] = triggerable;
	    }
	  }, {
	    key: "trigger",
	    value: function trigger(name) {
	      if (name === undefined) {
	        throw "Name must be supplied.";
	      }

	      if (this.triggerables[name] === undefined) {
	        throw "A triggerable with name \"" + name + "\" has not been defined.";
	      }

	      this.triggerables[name].trigger();
	    }
	  }]);

	  return TriggerManager;
	}();

	;

	module.exports = TriggerManager;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./maps/00-floor-2-day.json": 25,
		"./maps/00-floor-2-night.json": 26,
		"./maps/00-lobby-day-leaving.json": 27,
		"./maps/00-lobby-day.json": 28,
		"./maps/00-lobby-night.json": 29,
		"./maps/00-stairwell-lvl-2-night.json": 30,
		"./maps/00-stairwell-lvl-2.json": 31,
		"./maps/00-stairwell.json": 32,
		"./maps/00.json": 33,
		"./maps/01-floor-3-day.json": 34,
		"./maps/01-floor-3-night.json": 35,
		"./maps/01-stairwell-lvl-2-day.json": 36,
		"./maps/01-stairwell-lvl-2.json": 37,
		"./maps/01-stairwell-lvl-3-day.json": 38,
		"./maps/01-stairwell-lvl-3-night.json": 39,
		"./maps/01.json": 40,
		"./maps/02-floor-4-day.json": 41,
		"./maps/02-floor-4-night.json": 42,
		"./maps/02-stairwell-lvl-3-day.json": 43,
		"./maps/02-stairwell-lvl-4-day.json": 44,
		"./maps/02-stairwell-lvl-4-night.json": 45,
		"./maps/03-floor-5-day.json": 46,
		"./maps/03-floor-5-night.json": 47,
		"./maps/03-stairwell-lvl-4-day.json": 48,
		"./maps/03-stairwell-lvl-5-day.json": 49,
		"./maps/03-stairwell-lvl-5-night.json": 50,
		"./maps/03-wallspace-lvl-5-night.json": 51,
		"./maps/04-wallspace-lvl-5-dawn.json": 52,
		"./maps/04-wallspace-lvl-5-day.json": 53,
		"./maps/05-office-lvl-5-day.json": 54,
		"./sounds/168596__zabuhailo__office-refrigerator.mp3": 55,
		"./sounds/182872__klankbeeld__nightcity-hum-01-130212.mp3": 56,
		"./sounds/189640__yuval__grass-loop-short.mp3": 86,
		"./sounds/240943__htn4ever__notif-1.mp3": 57,
		"./sounds/243045__phinster__cicada-with-dog.mp3": 58,
		"./sounds/346425__soneproject__ecofuture3.mp3": 59,
		"./sprites/buzzer.png": 60,
		"./sprites/computer.png": 61,
		"./sprites/dave.png": 62,
		"./sprites/floor.png": 63,
		"./sprites/hdoor.png": 64,
		"./sprites/key.png": 65,
		"./sprites/lighting.png": 66,
		"./sprites/nasty.png": 67,
		"./sprites/note.png": 68,
		"./sprites/office-worker.png": 69,
		"./sprites/player.png": 70,
		"./sprites/room.png": 71,
		"./sprites/speaker.png": 72,
		"./sprites/vdoor.png": 73,
		"./sprites/wall.png": 74,
		"./tilesets/ceiling-lighting.png": 75,
		"./tilesets/floor-items.png": 76,
		"./tilesets/floor-lighting.png": 77,
		"./tilesets/floor-numbers.png": 78,
		"./tilesets/lighting.png": 79,
		"./tilesets/menu.png": 80,
		"./tilesets/office-divider.png": 81,
		"./tilesets/office-floor.png": 82,
		"./tilesets/office-lighting.png": 83,
		"./tilesets/window.png": 84
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 24;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "19d646f1a12d71776f8ff4c1f1083808.json";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ca73c89a4dea644af5cf36064a21b5a3.json";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fefc48c8c997e48ccc481dfda9e2b26c.json";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cd960c05aa65115046da08cd06998826.json";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ca1ff08779ae3d89eadcfe14412e4232.json";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "66b31b42a1c3d82cc576826be61cebae.json";

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "0f2d8910d50a89e98f42597a9c9000c0.json";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b06765e458dcd43610abe22566896aae.json";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "294d6e2f9a1484a637f46aa52b51c9bf.json";

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "4ba07d21c702ee29b008900b874b78c3.json";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "69dad10b912d0f33c233a0dede7973bb.json";

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "42a29a05b61287643ddab6f51c903a9d.json";

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3814e405304dca67da23ea50dd9ca29d.json";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a42b53d318950a18fb224c97b0a797b0.json";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8f54b23f920aad031e56887eb7168406.json";

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8bdcc3dba24046fab1fe819ccd612225.json";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "59b0d061db011500504756c57976b7a6.json";

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "5e29c6c5c5c097b632c47af8aabcc9e8.json";

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "09d3df65ebb162d17e306d249f8dc68f.json";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "07d695859b08c7341fb0b07b6572d5e3.json";

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3c131051840d6c89442af8ff31b5e2e0.json";

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "eb8ce44ff499328d45eb5f4fb71d936d.json";

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "afc3df1e79729bcf20fe1b4d48e098f7.json";

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "31df2554bb31ec4d783509cfbf7c6424.json";

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9a3b65cea687e0243a8fcec8357460b5.json";

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "295521fa6ff0427f88f2ac5a64a1fc82.json";

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "415aa0c09ef91a66fa85a7c65d0fbffc.json";

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "0f2139cf11856cd0371248721d7cec0f.json";

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "1f29369841707a8078460ae4984dae14.json";

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "470fa071d9f184f42017f347ff3e180c.json";

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "0be82776b153a42540403b30ee6869f4.mp3";

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "23d2c1bb4f1ef5193ab61366f44766e0.mp3";

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a3250b523cea530d5e43e41395cb7ce5.mp3";

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "60129a186b8b333b7723d0e5b528363c.mp3";

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "25d2c4ab6e84a4cfddd7903fa624f47f.mp3";

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "477d9afd09cf97a3a3bfc7ebf4d19d19.png";

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b8aff57b14d8d7868a2f32367a2c04f6.png";

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6a95af889aeb86bba7a86babe285d489.png";

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "79e3c0438c0fb3ca8a105a120cc5071b.png";

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "7378f0ce3f0514acd256646f904092fb.png";

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f168352c97982104359548dfef51f684.png";

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "9e5a15f0965ac7b2456146981aff0356.png";

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3c3b542cf368fe2d633faa9c5ea72b69.png";

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "c0b0d55481d1b4a055430f332b03aeba.png";

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fd535ec73854e4ce2a7088f50a88273e.png";

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "a173ee3ad70a2ee5c5ee841c2e8e1ff9.png";

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f053e4476ea915416d8fb39e0461e694.png";

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "cc9b4a383a7c2ac30e93fa661ded0f91.png";

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "190e8e4f5bd47eb245d6634e97c5b829.png";

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "93ab9bb2d185582253f469b41acfc375.png";

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "8d056ea69d3e84421d0b17b21f525470.png";

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "afdcc585067408a665367f435c6a861c.png";

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "dd83b6db42c039563636a07a35aceb7f.png";

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "6f88024dc0f3c627ee11cdaf792a545c.png";

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "ec3a42b8490954cc324de5b1ff6b5e3e.png";

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "c99f1227a523ee5dcef4e54d569fb4f6.png";

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "39d1963074adb26704ac09d6b07e5e33.png";

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "df279bfd1563d00ec9625d7fcf2cb194.png";

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "059989a737ab607259d66045645952b5.png";

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "f0225197e072f6ead6db83677bd227b1.png";

/***/ },
/* 85 */,
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "0221cf58379584c2241724e8d9b83db6.mp3";

/***/ }
/******/ ]);