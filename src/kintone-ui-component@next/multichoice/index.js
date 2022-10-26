var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, queryAll, query, state } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { visiblePropConverter } from "../base/converter";
import { validateProps, validateItems, validateValueArray, validateSelectedIndexArray, throwErrorAfterUpdateComplete, } from "../base/validator";
import { ERROR_MESSAGE } from "../base/constant";
import { MULTICHOICE_CSS } from "./style";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
export { BaseError, BaseLabel };
let exportMultiChoice;
(() => {
    exportMultiChoice = window.customElements.get("kuc-multi-choice-1-6-0");
    if (exportMultiChoice) {
        return;
    }
    class KucMultiChoice extends KucBase {
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
        render() {
            return html `
        <div class="kuc-multi-choice-1-6-0__group">
          <div
            class="kuc-multi-choice-1-6-0__group__label"
            id="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-6-0
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-6-0>
          </div>
          <div
            class="kuc-multi-choice-1-6-0__group__menu"
            role="listbox"
            aria-multiselectable="true"
            aria-describedby="${this._GUID}-error"
            aria-labelledby="${this._GUID}-label"
            ?disabled="${this.disabled}"
            tabindex="${this.disabled ? "-1" : "0"}"
            @keydown="${this._handleKeyDownMultiChoice}"
          >
            ${this.items.map((item, number) => this._getMenuItemTemplate(item, number))}
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
        _handleMouseDownMultiChoiceItem(event) {
            if (this.disabled)
                return;
            const itemEl = event.target;
            const value = itemEl.getAttribute("value");
            const selectedIndex = itemEl.dataset.index || "0";
            this._handleChangeValue(value, selectedIndex);
        }
        _handleMouseOverMultiChoiceItem(event) {
            if (this.disabled)
                return;
            this._itemsEl.forEach((itemEl) => {
                if (itemEl.classList.contains("kuc-multi-choice-1-6-0__group__menu__highlight")) {
                    itemEl.classList.remove("kuc-multi-choice-1-6-0__group__menu__highlight");
                }
            });
            const itemEl = event.currentTarget;
            itemEl.classList.add("kuc-multi-choice-1-6-0__group__menu__highlight");
            this._setActiveDescendant(itemEl.id);
        }
        _handleMouseLeaveMultiChoiceItem(event) {
            if (this.disabled)
                return;
            const itemEl = event.currentTarget;
            itemEl.classList.remove("kuc-multi-choice-1-6-0__group__menu__highlight");
            this._setActiveDescendant();
        }
        _handleKeyDownMultiChoice(event) {
            if (this.disabled)
                return;
            let highLightNumber = 0;
            switch (event.key) {
                case "Up": // IE/Edge specific value
                case "ArrowUp": {
                    event.preventDefault();
                    this._itemsEl.forEach((itemEl, number) => {
                        if (itemEl.classList.contains("kuc-multi-choice-1-6-0__group__menu__highlight")) {
                            itemEl.classList.remove("kuc-multi-choice-1-6-0__group__menu__highlight");
                            highLightNumber = number - 1;
                        }
                    });
                    highLightNumber =
                        highLightNumber <= -1 ? this._itemsEl.length - 1 : highLightNumber;
                    const currentItemEl = this._itemsEl[highLightNumber];
                    currentItemEl.classList.add("kuc-multi-choice-1-6-0__group__menu__highlight");
                    this._setActiveDescendant(currentItemEl.id);
                    break;
                }
                case "Down": // IE/Edge specific value
                case "ArrowDown": {
                    event.preventDefault();
                    this._itemsEl.forEach((itemEl, number) => {
                        if (itemEl.classList.contains("kuc-multi-choice-1-6-0__group__menu__highlight")) {
                            itemEl.classList.remove("kuc-multi-choice-1-6-0__group__menu__highlight");
                            highLightNumber = number + 1;
                        }
                    });
                    highLightNumber =
                        highLightNumber >= this._itemsEl.length ? 0 : highLightNumber;
                    const currentItemEl = this._itemsEl[highLightNumber];
                    currentItemEl.classList.add("kuc-multi-choice-1-6-0__group__menu__highlight");
                    this._setActiveDescendant(currentItemEl.id);
                    break;
                }
                case "Spacebar": // IE/Edge specific value
                case " ": {
                    event.preventDefault();
                    this._itemsEl.forEach((itemEl) => {
                        if (itemEl.classList.contains("kuc-multi-choice-1-6-0__group__menu__highlight")) {
                            const value = itemEl.getAttribute("value");
                            const selectedIndex = itemEl.dataset.index || "0";
                            this._handleChangeValue(value, selectedIndex);
                        }
                    });
                    break;
                }
                default:
                    break;
            }
        }
        _getMultiChoiceCheckedIconSvgTemplate(disabled, checked) {
            return svg `
        ${checked
                ? svg `<svg
            class="kuc-multi-choice-1-6-0__group__menu__item__icon"
            width="11"
            height="9"
            viewBox="0 0 11 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 5L1.5 3L4.5 5.5L9.5 0L11 1.5L4.5 8.5L0 5Z"
              fill="${disabled ? "#888888" : "#3498db"}"
            />
          </svg>`
                : ""}`;
        }
        _isCheckedItem(item, index) {
            const values = Object.values(this._valueMapping);
            const keys = Object.keys(this._valueMapping);
            const result = values.filter((val, indexVal) => val === item.value && index === parseInt(keys[indexVal], 10));
            return result.length > 0;
        }
        _getMenuItemTemplate(item, index) {
            const isCheckedItem = this._isCheckedItem(item, index);
            return html `
        <div
          class="kuc-multi-choice-1-6-0__group__menu__item"
          role="option"
          aria-selected="${isCheckedItem}"
          aria-required="${this.requiredIcon}"
          data-index="${index}"
          value="${item.value !== undefined ? item.value : ""}"
          id="${this._GUID}-menuitem-${index}"
          @mousedown="${this._handleMouseDownMultiChoiceItem}"
          @mouseover="${this._handleMouseOverMultiChoiceItem}"
          @mouseleave="${this._handleMouseLeaveMultiChoiceItem}"
        >
          ${this._getMultiChoiceCheckedIconSvgTemplate(this.disabled, isCheckedItem)}
          ${item.label === undefined ? item.value : item.label}
        </div>
      `;
        }
        _setActiveDescendant(value) {
            value !== undefined && this._menuEl !== null
                ? this._menuEl.setAttribute("aria-activedescendant", value)
                : this._menuEl.removeAttribute("aria-activedescendant");
        }
        _handleChangeValue(value, selectedIndex) {
            const oldValue = !this.value ? this.value : [...this.value];
            const newValueMapping = this._getNewValueMapping(value, selectedIndex);
            const itemsValue = this.items.map((item) => item.value);
            const newValue = Object.values(newValueMapping).filter((item) => itemsValue.indexOf(item) > -1);
            if (newValue === oldValue)
                return;
            const newSelectedIndex = Object.keys(newValueMapping).map((item) => parseInt(item, 10));
            this.value = newValue;
            this.selectedIndex = newSelectedIndex;
            dispatchCustomEvent(this, "change", {
                oldValue,
                value: newValue,
            });
        }
        _getNewValueMapping(value, selectedIndex) {
            const selectedIndexNumber = parseInt(selectedIndex, 10);
            const keys = Object.keys(this._valueMapping);
            const newValue = { ...this._valueMapping };
            if (keys.indexOf(selectedIndex) > -1) {
                delete newValue[selectedIndexNumber];
                return newValue;
            }
            newValue[selectedIndexNumber] = value;
            return newValue;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucMultiChoice.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucMultiChoice.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucMultiChoice.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucMultiChoice.prototype, "label", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMultiChoice.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMultiChoice.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucMultiChoice.prototype, "visible", void 0);
    __decorate([
        property({ type: Array })
    ], KucMultiChoice.prototype, "items", void 0);
    __decorate([
        property({ type: Array })
    ], KucMultiChoice.prototype, "selectedIndex", void 0);
    __decorate([
        property({ type: Array })
    ], KucMultiChoice.prototype, "value", void 0);
    __decorate([
        query(".kuc-multi-choice-1-6-0__group__menu")
    ], KucMultiChoice.prototype, "_menuEl", void 0);
    __decorate([
        queryAll(".kuc-multi-choice-1-6-0__group__menu__item")
    ], KucMultiChoice.prototype, "_itemsEl", void 0);
    __decorate([
        state()
    ], KucMultiChoice.prototype, "_valueMapping", void 0);
    window.customElements.define("kuc-multi-choice-1-6-0", KucMultiChoice);
    createStyleOnHeader(MULTICHOICE_CSS);
    exportMultiChoice = KucMultiChoice;
})();
const MultiChoice = exportMultiChoice;
export { MultiChoice };
