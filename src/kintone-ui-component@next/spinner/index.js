var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property } from "lit/decorators.js";
import { createStyleOnHeader, KucBase } from "../base/kuc-base";
import { validateProps } from "../base/validator";
import { SPINNER_CSS } from "./style";
let exportSpinner;
(() => {
    exportSpinner = window.customElements.get("kuc-spinner-1-6-0");
    if (exportSpinner) {
        return;
    }
    class KucSpinner extends KucBase {
        constructor(props) {
            super();
            this.text = "";
            this._body = document.getElementsByTagName("BODY")[0];
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        _getSpinnerSvgTemplate() {
            return svg `
        <svg
          class="kuc-spinner-1-6-0__spinner__loader"
          viewBox="0 0 50 50"
          aria-hidden="true"
        >
          <circle r="4" cx="30.43" cy="4.72" opacity="0.3" />
          <circle r="4" cx="39.85" cy="10.15" opacity="0.3" />
          <circle r="4" cx="45.28" cy="19.56" opacity="0.3" />
          <circle r="4" cx="45.28" cy="30.43" opacity="0.3" />
          <circle r="4" cx="39.85" cy="39.85" opacity="0.3" />
          <circle r="4" cx="30.44" cy="45.28" opacity="0.4" />
          <circle r="4" cx="19.56" cy="45.28" opacity="0.5" />
          <circle r="4" cx="10.15" cy="39.85" opacity="0.6" />
          <circle r="4" cx="4.7" cy="30.44" opacity="0.7" />
          <circle r="4" cx="4.7" cy="19.56" opacity="0.8" />
          <circle r="4" cx="10.15" cy="10.15" opacity="0.9" />
          <circle r="4" cx="19.56" cy="4.72" opacity="1" />
        </svg>
      `;
        }
        open() {
            if (this._body.classList.contains("kuc--has-spinner") === false) {
                this._body.classList.add("kuc--has-spinner");
            }
            this._body.appendChild(this);
        }
        close() {
            this._body.classList.remove("kuc--has-spinner");
            this.parentNode && this.parentNode.removeChild(this);
        }
        render() {
            return html `
        <div class="kuc-spinner-1-6-0__spinner" aria-live="assertive" role="alert">
          ${this._getSpinnerSvgTemplate()}
          <div
            class="kuc-spinner-1-6-0__spinner__text${!this.text
                ? " visually-hidden"
                : ""}"
          >
            ${!this.text ? "now loading…" : this.text}
          </div>
        </div>
        <div class="kuc-spinner-1-6-0__mask"></div>
      `;
        }
    }
    __decorate([
        property({ type: String })
    ], KucSpinner.prototype, "text", void 0);
    window.customElements.define("kuc-spinner-1-6-0", KucSpinner);
    createStyleOnHeader(SPINNER_CSS);
    exportSpinner = KucSpinner;
})();
const Spinner = exportSpinner;
export { Spinner };
