var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../base/kuc-base";
import { visiblePropConverter } from "../../base/converter";
import { validateProps } from "../../base/validator";
import { MOBILE_BUTTON_CSS } from "./style";
let exportMobileButton;
(() => {
    exportMobileButton = window.customElements.get("kuc-mobile-button-1-6-0");
    if (exportMobileButton) {
        return;
    }
    class KucMobileButton extends KucBase {
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
            if (this.type === "normal" || this.type === "submit") {
                return this.type;
            }
            return "normal";
        }
        render() {
            return html `
        <button
          type="button"
          class="kuc-mobile-button-1-6-0__button kuc-mobile-button-1-6-0__button--${this._getButtonColorType()}"
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
    ], KucMobileButton.prototype, "className", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucMobileButton.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileButton.prototype, "text", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileButton.prototype, "type", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileButton.prototype, "disabled", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucMobileButton.prototype, "visible", void 0);
    window.customElements.define("kuc-mobile-button-1-6-0", KucMobileButton);
    createStyleOnHeader(MOBILE_BUTTON_CSS);
    exportMobileButton = KucMobileButton;
})();
const MobileButton = exportMobileButton;
export { MobileButton };
