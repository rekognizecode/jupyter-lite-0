"use strict";
(self["webpackChunkjupyterlab_apod"] = self["webpackChunkjupyterlab_apod"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_2__);



;
/**
 * Initialization data for the jupyterlab_apod extension.
 */
const plugin = {
    id: 'jupyterlab-apod',
    description: 'Show a random NASA Astronomy Picture of the Day in a JupyterLab panel.',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette],
    optional: [_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer],
    activate: activate
};
class APODWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_2__.Widget {
    /**
     * Construct a new APOD widget.
     */
    constructor() {
        super();
        this.addClass('my-apodWidget');
        // Add an image element to the panel
        this.img = document.createElement('img');
        this.node.appendChild(this.img);
        // Add a summary element to the panel
        this.summary = document.createElement('p');
        this.node.appendChild(this.summary);
    }
    /**
     * Handle update requests for the widget.
     */
    async updateAPODImage() {
        const randomDate = this.randomDate();
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${randomDate}`);
        if (!response.ok) {
            const data = await response.json();
            if (data.error) {
                this.summary.innerText = data.error.message;
            }
            else {
                this.summary.innerText = response.statusText;
            }
            return;
        }
        const data = await response.json();
        if (data.media_type === 'image') {
            // Populate the image
            this.img.src = data.url;
            const formattedDate = randomDate.slice(2).replace("-", "");
            this.img.onclick = () => open(`https://apod.nasa.gov/apod/ap${formattedDate}.html`);
            this.img.title = data.title;
            this.summary.innerText = data.title;
            console.log("data", data);
            if (data.copyright) {
                this.summary.innerText += ` (Copyright ${data.copyright.replace("<br>", "").replace("\n", "")})`;
            }
            if (data.explanation) {
                this.summary.innerText += `\nExplanation: \n ${data.explanation}`;
            }
        }
        else {
            this.summary.innerText = 'Random APOD fetched was not an image.';
        }
    }
    /**
     * Get a random date string in YYYY-MM-DD format.
     */
    randomDate() {
        const start = new Date(2010, 1, 1);
        const end = new Date();
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toISOString().slice(0, 10);
    }
}
/**
 * Activate the APOD widget extension.
 */
function activate(app, palette, restorer) {
    console.log("JupyterLab extension jupyterlab_apod is activated!");
    // Declare a widget variable
    let widget;
    // Add an application command
    const command = 'apod:open';
    app.commands.addCommand(command, {
        label: 'Random Astronomy Picture',
        execute: () => {
            if (!widget || widget.isDisposed) {
                const content = new APODWidget();
                widget = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.MainAreaWidget({ content });
                widget.id = 'apod-jupyterlab';
                widget.title.label = 'Astronomy Picture';
                widget.title.closable = true;
            }
            if (!tracker.has(widget)) {
                // Track the state of the widget for later restoration
                tracker.add(widget);
            }
            if (!widget.isAttached) {
                // Attach the widget to the main work area if it's not there
                app.shell.add(widget, 'main');
            }
            // Refresh the picture in the widget
            widget.content.updateAPODImage();
            // Activate the widget
            app.shell.activateById(widget.id);
        }
    });
    // Add keyboard shortcut for apod:open
    app.commands.addKeyBinding({
        command: command,
        keys: ['Accel Alt Y'],
        selector: 'body'
    });
    // Add the command to the palette.
    palette.addItem({ command, category: 'Tutorial' });
    // Track and restore the widget state
    let tracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({
        namespace: 'apod'
    });
    if (restorer) {
        restorer.restore(tracker, {
            command,
            name: () => 'apod'
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugin);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.5774bcb52e2f985218ff.js.map