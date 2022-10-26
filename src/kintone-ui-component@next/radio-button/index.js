var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, query } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { visiblePropConverter } from "../base/converter";
import { validateProps, validateItems, validateValueString, validateSelectedIndexNumber, throwErrorAfterUpdateComplete, } from "../base/validator";
import { ERROR_MESSAGE } from "../base/constant";
import { getWidthElmByContext } from "../base/context";
import { RADIOBUTTON_CSS } from "./style";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
export { BaseError, BaseLabel };
let exportRadioButton;
(() => {
    exportRadioButton = window.customElements.get("kuc-radio-button-1-6-0");
    if (exportRadioButton) {
        return;
    }
    class KucRadioButton extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.error = "";
            this.id = "";
            this.itemLayout = "horizontal";
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
        _handleFocusInput(event) {
            const inputEl = event.target;
            const menuEl = inputEl.parentNode;
            menuEl.setAttribute("focused", "");
        }
        _handleBlurInput(event) {
            const inputEl = event.target;
            const menuEl = inputEl.parentNode;
            menuEl.removeAttribute("focused");
        }
        _getRadioIconSvgTemplate(disabled, checked) {
            return svg `
    <svg
      class="kuc-radio-button-1-6-0__group__select-menu__item__label__icon"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10.5"
        cy="10.5"
        r="10"
        fill="white"
        stroke="#e3e7e8" stroke-width="1"/>
      ${checked
                ? svg `<circle cx="10.5" cy="10.5" r="6.5" fill="${disabled ? "#e3e7e8" : "#3498db"}"/>`
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
        <div
          class="kuc-radio-button-1-6-0__group__select-menu__item"
          itemLayout="${this.itemLayout}"
        >
          <input
            type="radio"
            aria-checked="${isCheckedItem}"
            aria-describedby="${this._GUID}-error"
            data-index="${index}"
            id="${this._GUID}-item-${index}"
            class="kuc-radio-button-1-6-0__group__select-menu__item__input"
            name="${this._GUID}-group"
            value="${item.value !== undefined ? item.value : ""}"
            tabindex="${this._getTabIndex(index, item, this.items)}"
            aria-required="${this.requiredIcon}"
            ?disabled="${this.disabled}"
            @change="${this._handleChangeInput}"
            @focus="${this._handleFocusInput}"
            @blur="${this._handleBlurInput}"
          />
          <label
            class="kuc-radio-button-1-6-0__group__select-menu__item__label"
            for="${this._GUID}-item-${index}"
            >${this._getRadioIconSvgTemplate(this.disabled, isCheckedItem)}${item.label === undefined ? item.value : item.label}
          </label>
        </div>
      `;
        }
        _getTabIndex(index, currentItem, items) {
            if (index === 0 &&
                items.filter((item) => item.value === this.value).length === 0)
                return "0";
            if (currentItem.value === this.value)
                return "0";
            return "-1";
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
        <div
          class="kuc-radio-button-1-6-0__group"
          role="radiogroup"
          aria-labelledby="${this._GUID}-group"
        >
          <div class="kuc-radio-button-1-6-0__group__label" ?hidden="${!this.label}">
            <kuc-base-label-1-6-0
              .text="${this.label}"
              .guid="${this._GUID}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-6-0>
          </div>
          <div
            class="kuc-radio-button-1-6-0__group__select-menu"
            ?borderVisible="${this.borderVisible}"
            itemLayout="${this.itemLayout}"
          >
            ${this.items.map((item, index) => this._getItemTemplate(item, index))}
          </div>
          <kuc-base-error-1-6-0
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
            ariaLive="assertive"
          ></kuc-base-error-1-6-0>
        </div>
      `;
        }
        async updated() {
            await this.updateComplete;
            this._updateErrorWidth();
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
        _updateErrorWidth() {
            const MIN_WIDTH = 239;
            const labelWidth = getWidthElmByContext(this._labelEl);
            const menuWidth = getWidthElmByContext(this._selectMenuEl);
            let errorWidth = labelWidth > MIN_WIDTH ? labelWidth : MIN_WIDTH;
            if (menuWidth > errorWidth)
                errorWidth = menuWidth;
            this._errorEl.style.width = errorWidth + "px";
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucRadioButton.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucRadioButton.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucRadioButton.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucRadioButton.prototype, "itemLayout", void 0);
    __decorate([
        property({ type: String })
    ], KucRadioButton.prototype, "label", void 0);
    __decorate([
        property({ type: String })
    ], KucRadioButton.prototype, "value", void 0);
    __decorate([
        property({ type: Number })
    ], KucRadioButton.prototype, "selectedIndex", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucRadioButton.prototype, "borderVisible", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucRadioButton.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucRadioButton.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucRadioButton.prototype, "visible", void 0);
    __decorate([
        property({ type: Array })
    ], KucRadioButton.prototype, "items", void 0);
    __decorate([
        query(".kuc-radio-button-1-6-0__group__label")
    ], KucRadioButton.prototype, "_labelEl", void 0);
    __decorate([
        query(".kuc-base-error-1-6-0__error")
    ], KucRadioButton.prototype, "_errorEl", void 0);
    __decorate([
        query(".kuc-radio-button-1-6-0__group__select-menu")
    ], KucRadioButton.prototype, "_selectMenuEl", void 0);
    window.customElements.define("kuc-radio-button-1-6-0", KucRadioButton);
    createStyleOnHeader(RADIOBUTTON_CSS);
    exportRadioButton = KucRadioButton;
})();
const RadioButton = exportRadioButton;
export { RadioButton };
