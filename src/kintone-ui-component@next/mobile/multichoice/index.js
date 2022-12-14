var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../../base/kuc-base";
import { visiblePropConverter } from "../../base/converter";
import { validateProps, validateItems, validateValueArray, validateSelectedIndexArray, throwErrorAfterUpdateComplete, } from "../../base/validator";
import { ERROR_MESSAGE } from "../../base/constant";
import { MOBILE_MULTICHOICE_CSS } from "./style";
import { BaseMobileLabel } from "../../base/mobile-label";
import { BaseMobileError } from "../../base/mobile-error";
export { BaseMobileLabel, BaseMobileError };
let exportMobileMultiChoice;
(() => {
    exportMobileMultiChoice = window.customElements.get("kuc-mobile-multi-choice-1-6-0");
    if (exportMobileMultiChoice) {
        return;
    }
    class KucMobileMultiChoice extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.error = "";
            this.id = "";
            this.label = "";
            this.disabled = false;
            this.requiredIcon = false;
            this.visible = true;
            this.items = [];
            this.selectedIndex = [];
            this.value = [];
            this._valueMapping = {};
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            this._setInitialValue(validProps);
            Object.assign(this, validProps);
        }
        _setInitialValue(validProps) {
            const hasValue = "value" in validProps;
            const hasSelectedIndex = "selectedIndex" in validProps;
            const _selectedIndex = validProps.selectedIndex || [];
            if (!hasValue && hasSelectedIndex) {
                if (!validateSelectedIndexArray(_selectedIndex))
                    return;
                const _valueMapping = this._getValueMapping(validProps);
                this.value = this._getValidValue(_valueMapping, _selectedIndex);
            }
        }
        _handleChangeInput(event) {
            event.stopPropagation();
            const selectEl = event.target;
            const oldValue = !this.value ? this.value : [...this.value];
            const newValue = Array.from(selectEl.selectedOptions, (option) => option.value);
            const newSelectedIndex = Array.from(selectEl.selectedOptions, (option) => option.dataset.index);
            const detail = { value: newValue, oldValue: oldValue };
            this.value = newValue;
            this.selectedIndex = newSelectedIndex.map((item) => item ? parseInt(item, 10) : 0);
            dispatchCustomEvent(this, "change", detail);
        }
        shouldUpdate(changedProperties) {
            if (changedProperties.has("items")) {
                if (!validateItems(this.items)) {
                    throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.ITEMS.IS_NOT_ARRAY);
                    return false;
                }
            }
            if (changedProperties.has("value")) {
                if (!validateValueArray(this.value)) {
                    throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.VALUE.IS_NOT_ARRAY);
                    return false;
                }
            }
            if (changedProperties.has("selectedIndex")) {
                if (!validateSelectedIndexArray(this.selectedIndex)) {
                    throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.SELECTED_INDEX.IS_NOT_ARRAY);
                    return false;
                }
            }
            return true;
        }
        willUpdate(changedProperties) {
            if (changedProperties.has("value")) {
                if (this.value.length > 0)
                    return;
                this.selectedIndex = [];
            }
        }
        update(changedProperties) {
            if (changedProperties.has("items") ||
                changedProperties.has("value") ||
                changedProperties.has("selectedIndex")) {
                this._valueMapping = this._getValueMapping({
                    items: this.items,
                    value: this.value,
                    selectedIndex: this.selectedIndex,
                });
                this._setValueAndSelectedIndex();
            }
            super.update(changedProperties);
        }
        _getValueMapping(validProps) {
            const _items = validProps.items || [];
            const _value = validProps.value || [];
            const _selectedIndex = validProps.selectedIndex || [];
            const itemsValue = _items.map((item) => item.value || "");
            const itemsMapping = Object.assign({}, itemsValue);
            const result = {};
            if (_value.length === 0) {
                const value = this._getValidValue(itemsMapping, _selectedIndex);
                _selectedIndex.forEach((key, i) => (result[key] = value[i]));
                return result;
            }
            const validSelectedIndex = this._getValidSelectedIndex(itemsMapping);
            validSelectedIndex.forEach((key, i) => (result[key] = _value[i]));
            return result;
        }
        _getValidValue(itemsMapping, _selectedIndex) {
            return _selectedIndex
                .filter((item) => itemsMapping[item])
                .map((item) => itemsMapping[item]);
        }
        _getValidSelectedIndex(itemsMapping) {
            const validSelectedIndex = [];
            for (let i = 0; i < this.value.length; i++) {
                const selectedIndex = this.selectedIndex[i];
                if (itemsMapping[selectedIndex] === this.value[i]) {
                    validSelectedIndex.push(selectedIndex);
                    continue;
                }
                const firstIndex = this.items.findIndex((item) => item.value === this.value[i]);
                validSelectedIndex.push(firstIndex);
            }
            return validSelectedIndex;
        }
        _setValueAndSelectedIndex() {
            this.value = Object.values(this._valueMapping);
            this.selectedIndex = Object.keys(this._valueMapping).map((key) => parseInt(key, 10));
        }
        _isCheckedItem(item, index) {
            const values = Object.values(this._valueMapping);
            const keys = Object.keys(this._valueMapping);
            const result = values.filter((val, indexVal) => val === item.value && index === parseInt(keys[indexVal], 10));
            return result.length > 0;
        }
        _getItemTemplate(item, index) {
            const isCheckedItem = this._isCheckedItem(item, index);
            return html `
        <option
          value="${item.value || ""}"
          data-index="${index}"
          ?selected="${item.value !== undefined ? isCheckedItem : false}"
        >
          ${item.label === undefined ? item.value : item.label}
        </option>
      `;
        }
        render() {
            return html `
        <label
          class="kuc-mobile-multi-choice-1-6-0__label"
          for="${this._GUID}-label"
          ?hidden="${!this.label}"
        >
          <kuc-base-mobile-label-1-6-0
            .text="${this.label}"
            .requiredIcon="${this.requiredIcon}"
          ></kuc-base-mobile-label-1-6-0>
        </label>
        <div class="kuc-mobile-multi-choice-1-6-0__input-form">
          <div
            class="kuc-mobile-multi-choice-1-6-0__input-form__select
            ${this.requiredIcon ? "kuc--required" : ""}"
          >
            <select
              class="kuc-mobile-multi-choice-1-6-0__input-form__select__input"
              id="${this._GUID}-label"
              aria-describedby="${this._GUID}-error"
              aria-required="${this.requiredIcon}"
              aria-invalid="${this.error !== ""}"
              ?disabled="${this.disabled}"
              multiple
              @change="${this._handleChangeInput}"
            >
              ${this.items.map((item, index) => this._getItemTemplate(item, index))}
            </select>
          </div>
        </div>
        <kuc-base-mobile-error-1-6-0
          .text="${this.error}"
          .guid="${this._GUID}"
          ariaLive="assertive"
        >
        </kuc-base-mobile-error-1-6-0>
      `;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucMobileMultiChoice.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileMultiChoice.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucMobileMultiChoice.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileMultiChoice.prototype, "label", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileMultiChoice.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileMultiChoice.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucMobileMultiChoice.prototype, "visible", void 0);
    __decorate([
        property({ type: Array })
    ], KucMobileMultiChoice.prototype, "items", void 0);
    __decorate([
        property({ type: Array })
    ], KucMobileMultiChoice.prototype, "selectedIndex", void 0);
    __decorate([
        property({ type: Array })
    ], KucMobileMultiChoice.prototype, "value", void 0);
    __decorate([
        state()
    ], KucMobileMultiChoice.prototype, "_valueMapping", void 0);
    window.customElements.define("kuc-mobile-multi-choice-1-6-0", KucMobileMultiChoice);
    createStyleOnHeader(MOBILE_MULTICHOICE_CSS);
    exportMobileMultiChoice = KucMobileMultiChoice;
})();
const MobileMultiChoice = exportMobileMultiChoice;
export { MobileMultiChoice };
