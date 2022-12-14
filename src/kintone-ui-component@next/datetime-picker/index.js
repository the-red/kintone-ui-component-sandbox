var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable kuc-v1/validator-in-should-update */
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { generateGUID, KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { visiblePropConverter, dateValueConverter, timeValueConverter, languagePropConverter, } from "../base/converter";
import { getWidthElmByContext } from "../base/context";
import { validateProps, validateDateTimeValue, isValidDate, validateTimeValue, validateTimeStepNumber, validateTimeStep, throwErrorAfterUpdateComplete, } from "../base/validator";
import { INVALID_FORMAT_MESSAGE, MAX_MIN_IS_NOT_VALID, TIME_IS_OUT_OF_VALID_RANGE, TIMESTEP_IS_NOT_NUMBER, MIN_TIME, MAX_TIME, } from "../base/datetime/resource/constant";
import { timeCompare } from "../base/datetime/utils";
import "../base/datetime/date";
import "../base/datetime/time";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
import { DATE_TIME_PICKER_CSS } from "./style";
export { BaseError, BaseLabel };
let exportDateTimePicker;
(() => {
    exportDateTimePicker = window.customElements.get("kuc-datetime-picker-1-6-0");
    if (exportDateTimePicker) {
        return;
    }
    class KucDateTimePicker extends KucBase {
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
            this._dateValue = "";
            this._timeValue = "";
            this._previousTimeValue = "";
            this._previousDateValue = "";
            this._errorFormat = "";
            this._errorText = "";
            this._dateConverted = "";
            this._changeDateByUI = false;
            this._changeTimeByUI = false;
            this._inputMax = "";
            this._inputMin = "";
            this._timeConverted = "";
            this._errorInvalidTime = "";
            this._inputTimeStep = 30;
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        // eslint-disable-next-line max-statements
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
            if (typeof this.value !== "string") {
                throwErrorAfterUpdateComplete(this, INVALID_FORMAT_MESSAGE.VALUE);
                return false;
            }
            this._dateAndTime = this._getDateTimeValue(this.value);
            this._dateConverted = dateValueConverter(this._dateAndTime.date);
            const isValidValue = validateDateTimeValue(this._dateAndTime.date, this._dateAndTime.time) &&
                isValidDate(this._dateConverted);
            if (!isValidValue) {
                throwErrorAfterUpdateComplete(this, INVALID_FORMAT_MESSAGE.VALUE);
                return false;
            }
            this._timeConverted = timeValueConverter(this._dateAndTime.time.slice(0, 5));
            if (_changedProperties.has("value") &&
                (timeCompare(this._timeConverted, this._inputMin) < 0 ||
                    timeCompare(this._inputMax, this._timeConverted) < 0)) {
                throwErrorAfterUpdateComplete(this, TIME_IS_OUT_OF_VALID_RANGE);
                return false;
            }
            return true;
        }
        willUpdate(_changedProperties) {
            const changeByUI = this._changeDateByUI || this._changeTimeByUI;
            if (changeByUI) {
                this._updateValueChangeByUI();
                return;
            }
            this._updateValueWhenSetter();
        }
        _updateValueChangeByUI() {
            const validFormat = this._validateDateTimeFormat();
            this.value = validFormat ? this.value : undefined;
            if (validFormat && !this._dateValue && !this._timeValue)
                this.value = "";
            const missingOnlyDate = !this._dateValue && this._timeValue;
            const missingOnlyTime = this._dateValue && !this._timeValue;
            if (missingOnlyDate || missingOnlyTime) {
                this._errorText =
                    this.error || this._errorFormat || this._errorInvalidTime;
                return;
            }
            this._errorText = validFormat
                ? this.error
                : this._errorFormat || this._errorInvalidTime;
        }
        _validateDateTimeFormat() {
            const isMissingDatePart = Boolean(this._timeValue) && !this._dateValue;
            const isMissingTimePart = Boolean(this._dateValue) && !this._timeValue;
            const validFormat = !this._errorFormat &&
                !this._errorInvalidTime &&
                !isMissingDatePart &&
                !isMissingTimePart;
            return validFormat;
        }
        _updateValueWhenSetter() {
            this._errorText = this.error;
            if (this.value === "" || this.value === undefined) {
                this._previousTimeValue = "";
                this._errorFormat = "";
                this._errorInvalidTime = "";
                return;
            }
            this._setDateTimeValueSeparate(this._dateAndTime, this._dateConverted);
            this.value = this._getDateTimeString();
        }
        _setDateTimeValueSeparate(dateTime, dateValue) {
            this._dateValue = dateValue || this._dateInput.value;
            this._timeValue =
                this._dateValue && isValidDate(dateValue)
                    ? timeValueConverter(dateTime.time.slice(0, 5))
                    : this._previousTimeValue;
        }
        update(changedProperties) {
            if (changedProperties.has("value")) {
                if (this.value === undefined) {
                    this._setUndefinedValue();
                }
                if (this.value === "") {
                    this._setEmptyValue();
                }
            }
            if ((changedProperties.has("max") ||
                changedProperties.has("min") ||
                changedProperties.has("value")) &&
                this.value !== undefined) {
                this._errorInvalidTime = "";
            }
            super.update(changedProperties);
        }
        _setUndefinedValue() {
            if (this._changeTimeByUI)
                return;
            if (this._errorFormat) {
                if (this._changeDateByUI) {
                    this._dateValue = this._dateInput.value;
                    return;
                }
                this._dateValue = "";
                this._timeValue = "";
                return;
            }
            this._dateValue = this._previousDateValue;
            this._timeValue = this._previousTimeValue;
        }
        _setEmptyValue() {
            this._dateValue = "";
            this._timeValue = "";
            this._previousTimeValue = "";
            this._previousDateValue = "";
            this._errorFormat = "";
            this._errorInvalidTime = "";
        }
        render() {
            return html `
        <fieldset
          class="kuc-datetime-picker-1-6-0__group"
          aria-describedby="${this._GUID}-error"
        >
          <legend
            class="kuc-datetime-picker-1-6-0__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-6-0
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-6-0>
          </legend>
          <div class="kuc-datetime-picker-1-6-0__group__inputs">
            <kuc-base-date-1-6-0
              class="kuc-datetime-picker-1-6-0__group__inputs--date"
              .value="${this._dateValue}"
              .language="${this._getLanguage()}"
              .disabled="${this.disabled}"
              inputAriaLabel="date"
              @kuc:base-date-change="${this._handleDateChange}"
            ></kuc-base-date-1-6-0
            ><kuc-base-time-1-6-0
              class="kuc-datetime-picker-1-6-0__group__inputs--time"
              .value="${this._timeValue}"
              .hour12="${this.hour12}"
              .disabled="${this.disabled}"
              .timeStep="${this._inputTimeStep}"
              .min="${this._inputMin}"
              .max="${this._inputMax}"
              .language="${this._getLanguage()}"
              @kuc:base-time-change="${this._handleTimeChange}"
            ></kuc-base-time-1-6-0>
          </div>
          <kuc-base-error-1-6-0
            .text="${this._errorText}"
            .guid="${this._GUID}"
            ?hidden="${!this._errorText}"
          ></kuc-base-error-1-6-0>
        </fieldset>
      `;
        }
        updated() {
            this._resetState();
            this._baseLabelEl.updateComplete.then((_) => {
                this._updateErrorWidth();
            });
        }
        _resetState() {
            this._previousTimeValue = "";
            this._previousDateValue = "";
            this._changeDateByUI = false;
            this._changeTimeByUI = false;
        }
        _updateErrorWidth() {
            const labelWidth = getWidthElmByContext(this._baseLabelEl);
            const inputGroupWitdh = 185;
            if (labelWidth > inputGroupWitdh) {
                this._baseErrorEl.style.width = labelWidth + "px";
                return;
            }
            this._baseErrorEl.style.width = inputGroupWitdh + "px";
        }
        _handleDateChange(event) {
            event.stopPropagation();
            event.preventDefault();
            this._changeDateByUI = true;
            let newValue = this._dateValue;
            if (event.detail.error) {
                this._errorFormat = event.detail.error;
                this.error = "";
            }
            else {
                newValue = event.detail.value;
                this._errorFormat = "";
            }
            this._updateDateTimeValue(newValue, "date");
        }
        _handleTimeChange(event) {
            event.preventDefault();
            event.stopPropagation();
            this._changeTimeByUI = true;
            const newValue = event.detail.value;
            if (event.detail.error) {
                this._errorInvalidTime = event.detail.error;
                this.error = "";
            }
            else {
                this._errorInvalidTime = "";
            }
            this._updateDateTimeValue(newValue, "time");
        }
        _updateDateTimeValue(newValue, type) {
            const oldDateTime = this.value;
            if (type === "date") {
                this._dateValue = newValue || "";
            }
            else {
                this._timeValue = newValue;
            }
            this._previousTimeValue = this._timeValue;
            this._previousDateValue = this._dateValue;
            const newDateTime = this._errorFormat || this._errorInvalidTime
                ? undefined
                : this._getDateTimeString();
            const _value = this._errorFormat || this._errorInvalidTime ? undefined : newDateTime;
            this.value = _value;
            const validFormat = this._validateDateTimeFormat();
            if (validFormat && !this._dateValue && !this._timeValue) {
                this.value = "";
            }
            const detail = {
                value: this.value,
                oldValue: oldDateTime,
                changedPart: type,
            };
            dispatchCustomEvent(this, "change", detail);
        }
        _getDateTimeString() {
            if (!this._dateValue || !this._timeValue)
                return undefined;
            if (!this.value)
                return `${this._dateValue}T${this._timeValue}:00`;
            const splitValue = this.value.split(":");
            if (splitValue.length === 3) {
                return `${this._dateValue}T${this._timeValue}:${splitValue[2]}`;
            }
            return `${this._dateValue}T${this._timeValue}:00`;
        }
        _getDateTimeValue(value) {
            if (value === "" || value === undefined)
                return { date: "", time: "" };
            const dateTime = value.split("T");
            const date = dateTime[0];
            const time = dateTime[1];
            if (value.indexOf("T") === value.length - 1 || dateTime.length > 2)
                return { date, time: "" };
            if (!time)
                return { date, time: MIN_TIME };
            const [hours, minutes, seconds] = time.split(":");
            if (hours === "" || minutes === "" || seconds === "") {
                return { date, time: time };
            }
            const tempTime = `${hours}:${minutes || "00"}`;
            if (!seconds)
                return { date, time: tempTime };
            return { date, time: `${tempTime}:${seconds}` };
        }
        _getLanguage() {
            const langs = ["en", "ja", "zh", "zh-TW"];
            if (langs.indexOf(this.language) !== -1)
                return this.language;
            if (langs.indexOf(document.documentElement.lang) !== -1)
                return document.documentElement.lang;
            return "en";
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucDateTimePicker.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucDateTimePicker.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucDateTimePicker.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucDateTimePicker.prototype, "label", void 0);
    __decorate([
        property({
            type: String,
            attribute: "lang",
            reflect: true,
            converter: languagePropConverter,
        })
    ], KucDateTimePicker.prototype, "language", void 0);
    __decorate([
        property({ type: String })
    ], KucDateTimePicker.prototype, "max", void 0);
    __decorate([
        property({ type: String })
    ], KucDateTimePicker.prototype, "min", void 0);
    __decorate([
        property({
            type: String,
            hasChanged(newVal, oldVal) {
                if ((newVal === "" || newVal === undefined) && newVal === oldVal) {
                    return true;
                }
                return newVal !== oldVal;
            },
        })
    ], KucDateTimePicker.prototype, "value", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucDateTimePicker.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucDateTimePicker.prototype, "hour12", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucDateTimePicker.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucDateTimePicker.prototype, "visible", void 0);
    __decorate([
        property({ type: Number })
    ], KucDateTimePicker.prototype, "timeStep", void 0);
    __decorate([
        query(".kuc-base-date-1-6-0__input")
    ], KucDateTimePicker.prototype, "_dateInput", void 0);
    __decorate([
        query("kuc-base-label-1-6-0")
    ], KucDateTimePicker.prototype, "_baseLabelEl", void 0);
    __decorate([
        query("kuc-base-error-1-6-0")
    ], KucDateTimePicker.prototype, "_baseErrorEl", void 0);
    window.customElements.define("kuc-datetime-picker-1-6-0", KucDateTimePicker);
    createStyleOnHeader(DATE_TIME_PICKER_CSS);
    exportDateTimePicker = KucDateTimePicker;
})();
const DateTimePicker = exportDateTimePicker;
export { DateTimePicker };
