var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property } from "lit/decorators.js";
import { createStyleOnHeader, KucBase } from "../kuc-base";
import { BASE_ERROR_CSS } from "./style";
export class BaseError extends KucBase {
    constructor() {
        super(...arguments);
        this.ariaLive = "";
        this.guid = "";
        this.text = "";
    }
    render() {
        return html `
      ${this.ariaLive && this.ariaLive !== ""
            ? html `
            <div
              class="kuc-base-error-1-6-0__error"
              .id="${this.guid}-error"
              role="alert"
              aria-live="${this.ariaLive}"
              ?hidden="${!this.text}"
            >
              ${this.text}
            </div>
          `
            : html `
            <div
              class="kuc-base-error-1-6-0__error"
              .id="${this.guid}-error"
              role="alert"
              ?hidden="${!this.text}"
            >
              ${this.text}
            </div>
          `}
    `;
    }
}
__decorate([
    property({ type: String })
], BaseError.prototype, "ariaLive", void 0);
__decorate([
    property({ type: String })
], BaseError.prototype, "guid", void 0);
__decorate([
    property({ type: String })
], BaseError.prototype, "text", void 0);
if (!window.customElements.get("kuc-base-error-1-6-0")) {
    createStyleOnHeader(BASE_ERROR_CSS);
    window.customElements.define("kuc-base-error-1-6-0", BaseError);
}
