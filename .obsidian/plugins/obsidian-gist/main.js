/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

let nanoid = (size = 21) =>
  crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
    byte &= 63;
    if (byte < 36) {
      id += byte.toString(36);
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte > 62) {
      id += '-';
    } else {
      id += '_';
    }
    return id
  }, '');

const pluginName = "obsidian-gist";
const obsidianAppOrigin = 'app://obsidian.md';
class GistProcessor {
    constructor(settings) {
        this.messageEventHandler = (messageEvent) => {
            if (messageEvent.origin !== 'null') {
                // a message received from the iFrame with `srcdoc` attribute, the `origin` will be `null`.
                return;
            }
            const sender = messageEvent.data.sender;
            // only process message coming from this plugin
            if (sender === pluginName) {
                const gistUUID = messageEvent.data.gistUUID;
                const contentHeight = messageEvent.data.contentHeight;
                const gistContainer = document.querySelector('iframe#' + gistUUID);
                gistContainer.setAttribute('height', contentHeight);
            }
        };
        this.processor = (sourceString, el) => __awaiter(this, void 0, void 0, function* () {
            const gists = sourceString.trim().split("\n");
            return Promise.all(gists.map((gist) => __awaiter(this, void 0, void 0, function* () {
                return this._processGist(el, gist);
            })));
        });
        this.settings = settings;
    }
    // private
    _processGist(el, gistString) {
        return __awaiter(this, void 0, void 0, function* () {
            const pattern = /(?<protocol>https?:\/\/)?(?<host>gist\.github\.com\/)?((?<username>[\w-]+)\/)?(?<gistID>\w+)(\#(?<filename>.+))?/;
            const matchResult = gistString.match(pattern).groups;
            const gistID = matchResult.gistID;
            if (gistID === undefined) {
                return this._showError(el, gistString, `Could not found a valid Gist ID, please make sure your content and format is correct.`);
            }
            let gistURL = `https://gist.github.com/${gistID}.json`;
            if (matchResult.filename !== undefined) {
                gistURL = `${gistURL}?file=${matchResult.filename}`;
            }
            const urlParam = {
                url: gistURL,
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            };
            try {
                const res = yield obsidian.request(urlParam);
                const gistJSON = JSON.parse(res);
                return this._insertGistElement(el, gistID, gistJSON);
            }
            catch (error) {
                return this._showError(el, gistString, `Could not fetch the Gist from GitHub server. (Error: ${error})`);
            }
        });
    }
    _insertGistElement(el, gistID, gistJSON) {
        return __awaiter(this, void 0, void 0, function* () {
            // generate an uuid for each gist element
            const gistUUID = `${pluginName}-${gistID}-${nanoid()}`;
            // container
            const container = document.createElement('iframe');
            container.id = gistUUID;
            container.classList.add(`${pluginName}-container`);
            container.setAttribute('sandbox', 'allow-scripts allow-top-navigation-by-user-activation');
            container.setAttribute('loading', 'lazy');
            // container.setAttribute('csp', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://github.githubassets.com;")
            // reset the default things on HTML
            const resetStylesheet = `
      <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
        }
      </style>
    `;
            // height adjustment script
            const heightAdjustmentScript = `
      <script>
        deliverHeightMessage = () => {
          const contentHeight = document.body.scrollHeight;

          top.postMessage({
            sender: '${pluginName}',
            gistUUID: '${gistUUID}',
            contentHeight: contentHeight
          }, '${obsidianAppOrigin}');
        }

        window.addEventListener('load', () => {
          deliverHeightMessage();
        })
      </script>
    `;
            // hack to make links open in the parent 
            const parentLinkHack = document.createElement('base');
            parentLinkHack.target = "_parent";
            // load stylesheet as text
            const stylesheetText = yield this._loadStylesheet(el, gistID, gistJSON.stylesheet);
            // custom stylesheet
            let customStylesheet = "";
            if (this.settings.styleSheet && this.settings.styleSheet.length > 0) {
                customStylesheet = this.settings.styleSheet;
            }
            // Inject content into the iframe
            container.srcdoc = `
      <html>
        <head>
          <!-- hack -->
          ${resetStylesheet}
          ${parentLinkHack.outerHTML}
          ${heightAdjustmentScript}

          <!-- gist embedded style -->
          <style>
            ${stylesheetText}
          </style>

          <!-- custom style -->
          <style>
            ${customStylesheet}
          </style>
        </head>

        <body>
          ${gistJSON.div}
        </body>
      </html>
    `;
            // insert container into the DOM
            el.appendChild(container);
        });
    }
    _showError(el, gistIDAndFilename, errorMessage = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const errorText = `
Failed to load the Gist (${gistIDAndFilename}).

Error:

  ${errorMessage}
    `.trim();
            el.createEl('pre', { text: errorText });
        });
    }
    _loadStylesheet(el, gistString, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlParam = {
                url: url,
                method: "GET",
                headers: {
                    "Accept": "text/css"
                }
            };
            try {
                const res = yield obsidian.request(urlParam);
                return res;
            }
            catch (error) {
                return this._showError(el, gistString, `Could not fetch the Gist Style from GitHub server. (Error: ${error})`);
            }
        });
    }
}

const DEFAULT_SETTINGS = {
    styleSheet: null
};
class GistPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            // Settings
            yield this.loadSettings();
            this.addSettingTab(new GistSettingTab(this.app, this));
            // Load the Gist processor
            const gistProcessor = new GistProcessor(this.settings);
            // Register the processor to Obsidian
            this.registerDomEvent(window, "message", gistProcessor.messageEventHandler);
            this.registerMarkdownCodeBlockProcessor("gist", gistProcessor.processor);
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
}
class GistSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for Gist Plugin.' });
        new obsidian.Setting(containerEl)
            .setName('Custom Stylesheet')
            .setDesc('Override the default stylesheet')
            .addTextArea(text => text
            .setPlaceholder('Paste your custom stylesheet here')
            .setValue(this.plugin.settings.styleSheet)
            .onChange((value) => __awaiter(this, void 0, void 0, function* () {
            this.plugin.settings.styleSheet = value;
            yield this.plugin.saveSettings();
        })));
    }
}

module.exports = GistPlugin;


/* nosourcemap */