var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, queryAll } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../../base/kuc-base";
import { visiblePropConverter } from "../../base/converter";
import { validateProps, validateValueString, validateSelectedIndexNumber, validateItems, throwErrorAfterUpdateComplete, } from "../../base/validator";
import { ERROR_MESSAGE } from "../../base/constant";
import { MOBILE_RADIO_BUTTON_CSS } from "./style";
import { BaseMobileLabel } from "../../base/mobile-label";
import { BaseMobileError } from "../../base/mobile-error";
export { BaseMobileLabel, BaseMobileError };
let exportMobileRadioButton;
(() => {
    exportMobileRadioButton = window.customElements.get("kuc-mobile-radio-button-1-6-0");
    if (exportMobileRadioButton) {
        return;
    }
    class KucMobileRadioButton extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.error = "";
            this.id = "";
            this.label = "";
            this.value = "";
            this.selectedIndex = -1;
            this.borderVisible = true;
            this.disabled = false;
            this.requiredIcon = false;
            this.visible = true;
            this.items = [];
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            this._setInitialValue(validProps);
            Object.assign(this, validProps);
        }
        _setInitialValue(validProps) {
            const hasValue = "value" in validProps;
            const hasSelectedIndex = "selectedIndex" in validProps;
            if (!hasValue && hasSelectedIndex) {
                this.value = this._getValue(validProps) || "";
            }
        }
        willUpdate(changedProperties) {
            if (changedProperties.has("value")) {
                if (this.value !== "")
                    return;
                this.selectedIndex = -1;
            }
        }
        _handleChangeInput(event) {
            event.stopPropagation();
            const inputEl = event.target;
            const value = inputEl.value;
            const index = inputEl.dataset.index || "0";
            const indexNumber = parseInt(index, 10);
            if (this.value === value && this.selectedIndex === indexNumber)
                return;
            const detail = { oldValue: this.value, value: value };
            this.value = value;
            this.selectedIndex = indexNumber;
            dispatchCustomEvent(this, "change", detail);
        }
        _getRadioIconSvgTemplate(disabled, checked) {
            return svg `
      <svg
        class="kuc-mobile-radio-button-1-6-0__group__select-menu__item__label__icon"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
      <defs>
        <radialGradient id="${this._GUID}-shadow">
          <stop offset="0%" style="stop-color:#5b5b5b;stop-opacity:0" />
          <stop offset="30%" style="stop-color:#5b5b5b;stop-opacity:0" />
          <stop offset="80%" style="stop-color:#5b5b5b;stop-opacity:0.1" />
          <stop offset="90%" style="stop-color:#5b5b5b;stop-opacity:0.15" />
          <stop offset="100%" style="stop-color:#5b5b5b;stop-opacity:0.2" />
        </radialGradient>
      </defs>
        <circle
          fill="url(#shadow)"
          cx="10.5"
          cy="10.5"
          r="10.15"
          stroke="#bbbbbb" stroke-width="1"/>
        ${checked
                ? svg `<circle cx="10.5" cy="10.5" r="6.5" fill="${"#5b5b5b"}"/>`
                : ""}
      </svg>
    `;
        }
        _isCheckedItem(item, index) {
            if (!this.value)
                return this.selectedIndex === index;
            return item.value === this.value && this.selectedIndex === index;
        }
        _getItemTemplate(item, index) {
            const isCheckedItem = this._isCheckedItem(item, index);
            return html `
        <div class="kuc-mobile-radio-button-1-6-0__group__select-menu__item">
          <input
            type="radio"
            aria-describedby="${this._GUID}-error"
            id="${this._GUID}-item-${index}"
            data-index="${index}"
            class="kuc-mobile-radio-button-1-6-0__group__select-menu__item__input"
            name="${this._GUID}-group"
            value="${item.value !== undefined ? item.value : ""}"
            aria-invalid="${this.error !== ""}"
            aria-required="${this.requiredIcon}"
            ?disabled="${this.disabled}"
            @change="${this._handleChangeInput}"
          />
          <label
            class="kuc-mobile-radio-button-1-6-0__group__select-menu__item__label"
            for="${this._GUID}-item-${index}"
            >${this._getRadioIconSvgTemplate(this.disabled, isCheckedItem)}
            <div
              class="kuc-mobile-radio-button-1-6-0__group__select-menu__item__label__value"
            >
              ${item.label === undefined ? item.value : item.label}
            </div>
          </label>
        </div>
      `;
        }
        shouldUpdate(changedProperties) {
            if (changedProperties.has("items")) {
                if (!validateItems(this.items)) {
                    throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.ITEMS.IS_NOT_ARRAY);
                    return false;
                }
            }
            if (changedProperties.has("value")) {
                if (!validateValueString(this.value)) {
                    throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.VALUE.IS_NOT_STRING);
                    return false;
                }
            }
            if (changedProperties.has("selectedIndex")) {
                if (!validateSelectedIndexNumber(this.selectedIndex)) {
                    throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.SELECTED_INDEX.IS_NOT_NUMBER);
                    return false;
                }
            }
            return true;
        }
        update(changedProperties) {
            if (changedProperties.has("items") ||
                changedProperties.has("value") ||
                changedProperties.has("selectedIndex")) {
                this.selectedIndex = this._getSelectedIndex();
                this.value =
                    this._getValue({
                        items: this.items,
                        selectedIndex: this.selectedIndex,
                    }) || "";
            }
            super.update(changedProperties);
        }
        render() {
            return html `
        <div class="kuc-mobile-radio-button-1-6-0__group">
          <div
            class="kuc-mobile-radio-button-1-6-0__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-mobile-label-1-6-0
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-mobile-label-1-6-0>
          </div>
          <div
            class="kuc-mobile-radio-button-1-6-0__group__select-menu"
            ?borderVisible="${this.borderVisible}"
            ?disabled="${this.disabled}"
          >
            ${this.items.map((item, index) => this._getItemTemplate(item, index))}
          </div>
          <kuc-base-mobile-error-1-6-0
            .text="${this.error}"
            .guid="${this._GUID}"
            ariaLive="assertive"
          >
          </kuc-base-mobile-error-1-6-0>
        </div>
      `;
        }
        updated() {
            this._inputEls.forEach((inputEl, idx) => {
                inputEl.checked =
                    this.value === inputEl.value && idx === this.selectedIndex;
            });
        }
        _getSelectedIndex() {
            if (!this.value) {
                if (this.items[this.selectedIndex])
                    return this.selectedIndex;
                return -1;
            }
            const firstIndex = this.items.findIndex((item) => item.value === this.value);
            if (firstIndex === -1)
                return -1;
            const selectedIndex = this.items.findIndex((item, index) => item.value === this.value && index === this.selectedIndex);
            return selectedIndex > -1 ? selectedIndex : firstIndex;
        }
        _getValue(validProps) {
            const _items = validProps.items || [];
            const _selectedIndex = validProps.selectedIndex === 0 || validProps.selectedIndex
                ? validProps.selectedIndex
                : -1;
            const item = _items[_selectedIndex];
            if (!item)
                return "";
            return item.value;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucMobileRadioButton.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileRadioButton.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucMobileRadioButton.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileRadioButton.prototype, "label", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileRadioButton.prototype, "value", void 0);
    __decorate([
        property({ type: Number })
    ], KucMobileRadioButton.prototype, "selectedIndex", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileRadioButton.prototype, "borderVisible", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileRadioButton.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileRadioButton.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucMobileRadioButton.prototype, "visible", void 0);
    __decorate([
        property({ type: Array })
    ], KucMobileRadioButton.prototype, "items", void 0);
    __decorate([
        queryAll(".kuc-mobile-radio-button-1-6-0__group__select-menu__item__input")
    ], KucMobileRadioButton.prototype, "_inputEls", void 0);
    window.customElements.define("kuc-mobile-radio-button-1-6-0", KucMobileRadioButton);
    createStyleOnHeader(MOBILE_RADIO_BUTTON_CSS);
    exportMobileRadioButton = KucMobileRadioButton;
})();
const MobileRadioButton = exportMobileRadioButton;
export { MobileRadioButton };
