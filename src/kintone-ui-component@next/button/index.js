var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { visiblePropConverter } from "../base/converter";
import { validateProps } from "../base/validator";
import { BUTTON_CSS } from "./style";
let exportButton;
(() => {
    exportButton = window.customElements.get("kuc-button-1-6-0");
    if (exportButton) {
        return;
    }
    class KucButton extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.id = "";
            this.text = "";
            this.type = "normal";
            this.disabled = false;
            this.visible = true;
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        _handleClickButton(event) {
            event.stopPropagation();
            dispatchCustomEvent(this, "click");
        }
        _getButtonColorType() {
            if (this.type === "normal" ||
                this.type === "submit" ||
                this.type === "alert") {
                return this.type;
            }
            return "normal";
        }
        render() {
            return html `
        <button
          type="button"
          class="kuc-button-1-6-0__button kuc-button-1-6-0__button--${this._getButtonColorType()}"
          ?disabled="${this.disabled}"
          @click="${this._handleClickButton}"
        >
          ${this.text}
        </button>
      `;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucButton.prototype, "className", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucButton.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucButton.prototype, "text", void 0);
    __decorate([
        property({ type: String })
    ], KucButton.prototype, "type", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucButton.prototype, "disabled", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucButton.prototype, "visible", void 0);
    window.customElements.define("kuc-button-1-6-0", KucButton);
    createStyleOnHeader(BUTTON_CSS);
    exportButton = KucButton;
})();
const Button = exportButton;
export { Button };
