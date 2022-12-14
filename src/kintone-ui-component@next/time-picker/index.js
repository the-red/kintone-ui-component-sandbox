var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { visiblePropConverter, timeValueConverter, languagePropConverter, } from "../base/converter";
import { getWidthElmByContext } from "../base/context";
import { INVALID_FORMAT_MESSAGE, MAX_MIN_IS_NOT_VALID, TIME_IS_OUT_OF_VALID_RANGE, TIMESTEP_IS_NOT_NUMBER, MIN_TIME, MAX_TIME, } from "../base/datetime/resource/constant";
import { validateProps, validateTimeValue, validateTimeStepNumber, validateTimeStep, throwErrorAfterUpdateComplete, } from "../base/validator";
import "../base/datetime/time";
import { timeCompare } from "../base/datetime/utils";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
import { TIME_PICKER_CSS } from "./style";
export { BaseError, BaseLabel };
let exportTimePicker;
(() => {
    exportTimePicker = window.customElements.get("kuc-time-picker-1-6-0");
    if (exportTimePicker) {
        return;
    }
    class KucTimePicker extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.error = "";
            this.id = "";
            this.label = "";
            this.language = "auto";
            this.max = "";
            this.min = "";
            this.value = "";
            this.disabled = false;
            this.hour12 = false;
            this.requiredIcon = false;
            this.visible = true;
            this.timeStep = 30;
            this._errorText = "";
            this._inputValue = "";
            this._errorInvalid = "";
            this._inputMax = "";
            this._inputMin = "";
            this._inputTimeStep = 30;
            this._valueConverted = "";
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        shouldUpdate(_changedProperties) {
            if (_changedProperties.has("max") || _changedProperties.has("min")) {
                let _inputMinTemp = this._inputMin;
                let _inputMaxTemp = this._inputMax;
                if (this.max === undefined || this.max === "") {
                    _inputMaxTemp = MAX_TIME;
                }
                else {
                    if (!validateTimeValue(this.max)) {
                        throwErrorAfterUpdateComplete(this, INVALID_FORMAT_MESSAGE.MAX);
                        return false;
                    }
                    _inputMaxTemp = this.max = timeValueConverter(this.max);
                }
                if (this.min === undefined || this.min === "") {
                    _inputMinTemp = MIN_TIME;
                }
                else {
                    if (!validateTimeValue(this.min)) {
                        throwErrorAfterUpdateComplete(this, INVALID_FORMAT_MESSAGE.MIN);
                        return false;
                    }
                    _inputMinTemp = this.min = timeValueConverter(this.min);
                }
                if (timeCompare(_inputMaxTemp, _inputMinTemp) < 0) {
                    throwErrorAfterUpdateComplete(this, MAX_MIN_IS_NOT_VALID);
                    return false;
                }
                this._inputMin = _inputMinTemp;
                this._inputMax = _inputMaxTemp;
            }
            if (_changedProperties.has("timeStep")) {
                if (!validateTimeStepNumber(this.timeStep)) {
                    throwErrorAfterUpdateComplete(this, TIMESTEP_IS_NOT_NUMBER);
                    return false;
                }
                if (!validateTimeStep(this.timeStep, this._inputMax, this._inputMin)) {
                    throwErrorAfterUpdateComplete(this, INVALID_FORMAT_MESSAGE.TIME_STEP);
                    return false;
                }
                this._inputTimeStep = this.timeStep;
            }
            if (this.value === undefined || this.value === "")
                return true;
            if (!validateTimeValue(this.value)) {
                throwErrorAfterUpdateComplete(this, INVALID_FORMAT_MESSAGE.VALUE);
                return false;
            }
            this._valueConverted = timeValueConverter(this.value);
            if (_changedProperties.has("value") &&
                (timeCompare(this._valueConverted, this._inputMin) < 0 ||
                    timeCompare(this._inputMax, this._valueConverted) < 0)) {
                throwErrorAfterUpdateComplete(this, TIME_IS_OUT_OF_VALID_RANGE);
                return false;
            }
            return true;
        }
        update(changedProperties) {
            if (changedProperties.has("value")) {
                if (this.value === undefined) {
                    if (this._errorInvalid === "") {
                        this._inputValue = "";
                    }
                }
                else {
                    this.value = this.value === "" ? this.value : this._valueConverted;
                    this._inputValue = this.value;
                }
            }
            if ((changedProperties.has("max") ||
                changedProperties.has("min") ||
                changedProperties.has("value")) &&
                this.value !== undefined) {
                this._errorInvalid = "";
            }
            this._errorText = this._errorInvalid || this.error;
            super.update(changedProperties);
        }
        render() {
            return html `
        <fieldset
          class="kuc-time-picker-1-6-0__group"
          aria-describedby="${this._GUID}-error"
        >
          <legend
            class="kuc-time-picker-1-6-0__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-6-0
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-6-0>
          </legend>
          <kuc-base-time-1-6-0
            class="kuc-time-picker-1-6-0__group__input"
            .value="${this._inputValue}"
            .hour12="${this.hour12}"
            .disabled="${this.disabled}"
            .timeStep="${this._inputTimeStep}"
            .min="${this._inputMin}"
            .max="${this._inputMax}"
            .language="${this._getLanguage()}"
            @kuc:base-time-change="${this._handleTimeChange}"
          >
          </kuc-base-time-1-6-0>
          <kuc-base-error-1-6-0
            .text="${this._errorText}"
            .guid="${this._GUID}"
          ></kuc-base-error-1-6-0>
        </fieldset>
      `;
        }
        updated() {
            this._baseLabelEl.updateComplete.then((_) => {
                this._updateErrorWidth();
            });
        }
        _updateErrorWidth() {
            const labelWidth = getWidthElmByContext(this._baseLabelEl);
            const inputGroupWitdh = 85;
            if (labelWidth > inputGroupWitdh) {
                this._baseErrorEl.style.width = labelWidth + "px";
                return;
            }
            this._baseErrorEl.style.width = inputGroupWitdh + "px";
        }
        _handleTimeChange(event) {
            event.preventDefault();
            event.stopPropagation();
            const detail = {
                value: event.detail.value,
                oldValue: this.value,
            };
            if (event.detail.error) {
                detail.value = undefined;
                this.value = undefined;
                this._errorInvalid = event.detail.error;
                this.error = "";
            }
            else {
                this.value = event.detail.value;
                this._errorInvalid = "";
            }
            this._inputValue = event.detail.value;
            dispatchCustomEvent(this, "change", detail);
        }
        _getLanguage() {
            const languages = ["en", "ja", "zh", "zh-TW"];
            if (languages.indexOf(this.language) !== -1)
                return this.language;
            if (languages.indexOf(document.documentElement.lang) !== -1)
                return document.documentElement.lang;
            return "en";
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucTimePicker.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucTimePicker.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucTimePicker.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucTimePicker.prototype, "label", void 0);
    __decorate([
        property({
            type: String,
            attribute: "lang",
            reflect: true,
            converter: languagePropConverter,
        })
    ], KucTimePicker.prototype, "language", void 0);
    __decorate([
        property({ type: String })
    ], KucTimePicker.prototype, "max", void 0);
    __decorate([
        property({ type: String })
    ], KucTimePicker.prototype, "min", void 0);
    __decorate([
        property({ type: String })
    ], KucTimePicker.prototype, "value", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucTimePicker.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucTimePicker.prototype, "hour12", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucTimePicker.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucTimePicker.prototype, "visible", void 0);
    __decorate([
        property({ type: Number })
    ], KucTimePicker.prototype, "timeStep", void 0);
    __decorate([
        query("kuc-base-label-1-6-0")
    ], KucTimePicker.prototype, "_baseLabelEl", void 0);
    __decorate([
        query("kuc-base-error-1-6-0")
    ], KucTimePicker.prototype, "_baseErrorEl", void 0);
    window.customElements.define("kuc-time-picker-1-6-0", KucTimePicker);
    createStyleOnHeader(TIME_PICKER_CSS);
    exportTimePicker = KucTimePicker;
})();
const TimePicker = exportTimePicker;
export { TimePicker };
