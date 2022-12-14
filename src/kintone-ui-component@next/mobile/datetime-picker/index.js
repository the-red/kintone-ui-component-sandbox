var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { visiblePropConverter, dateValueConverter, timeValueConverter, languagePropConverter, } from "../../base/converter";
import { dispatchCustomEvent, generateGUID, KucBase, createStyleOnHeader, } from "../../base/kuc-base";
import { validateProps, validateDateTimeValue, isValidDate, throwErrorAfterUpdateComplete, } from "../../base/validator";
import { MOBILE_DATETIME_PICKER_CSS } from "./style";
import { INVALID_FORMAT_MESSAGE } from "../../base/datetime/resource/constant";
let exportMobileDateTimePicker;
(() => {
    exportMobileDateTimePicker = window.customElements.get("kuc-mobile-datetime-picker-1-6-0");
    if (exportMobileDateTimePicker) {
        return;
    }
    class KucMobileDateTimePicker extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.error = "";
            this.id = "";
            this.label = "";
            this.language = "auto";
            this.value = "";
            this.disabled = false;
            this.hour12 = false;
            this.requiredIcon = false;
            this.visible = true;
            this._dateConverted = "";
            this._changeDateByUI = false;
            this._changeTimeByUI = false;
            this._previousTimeValue = "";
            this._previousDateValue = "";
            this._dateValue = "";
            this._timeValue = "";
            this._errorFormat = "";
            this._errorText = "";
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        shouldUpdate(_changedProperties) {
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
            return true;
        }
        willUpdate(_changedProperties) {
            const changeByUI = this._changeDateByUI || this._changeTimeByUI;
            if (changeByUI) {
                this._updateValueAndErrorWhenUIChange();
                return;
            }
            this._errorFormat = "";
            this._updateErrorText();
            this._updateValueWhenSetter();
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
            super.update(changedProperties);
        }
        _updateValueWhenSetter() {
            this._errorFormat = "";
            if (this.value === "" || this.value === undefined) {
                this._previousTimeValue = "";
                return;
            }
            this._setDateTimeValueSeparate(this._dateAndTime, this._dateConverted);
            this.value = this._getDateTimeString();
        }
        _setDateTimeValueSeparate(dateTime, dateValue) {
            this._dateValue = dateValue;
            this._timeValue =
                this._dateValue && isValidDate(dateValue)
                    ? timeValueConverter(dateTime.time.slice(0, 5))
                    : this._previousTimeValue;
        }
        _updateValueAndErrorWhenUIChange() {
            const validFormat = this._checkDateTimeFormat();
            this.value = validFormat ? this.value : undefined;
            this._updateErrorText();
        }
        _checkDateTimeFormat() {
            const isMissingDatePart = Boolean(this._timeValue) && !this._dateValue;
            const isMissingTimePart = Boolean(this._dateValue) && !this._timeValue;
            const validFormat = !this._errorFormat && !isMissingDatePart && !isMissingTimePart;
            return validFormat;
        }
        _setUndefinedValue() {
            if (this._changeTimeByUI)
                return;
            if (this._errorFormat) {
                if (this._changeDateByUI)
                    return;
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
                return { date, time: "00:00" };
            const [hours, minutes, seconds] = time.split(":");
            const tempTime = `${hours}:${minutes || "00"}`;
            if (!seconds)
                return { date, time: tempTime };
            return { date, time: `${tempTime}:${seconds}` };
        }
        render() {
            return html `
        <fieldset
          class="kuc-mobile-datetime-picker-1-6-0__group"
          aria-describedby="${this._GUID}-error"
        >
          <legend
            class="kuc-mobile-datetime-picker-1-6-0__group__label"
            ?hidden="${!this.label}"
          >
            <kuc-base-mobile-label-1-6-0
              .requiredIcon="${this.requiredIcon}"
              .text="${this.label}"
            ></kuc-base-mobile-label-1-6-0>
          </legend>
          <div class="kuc-mobile-datetime-picker-1-6-0__group__input">
            <kuc-mobile-base-date-1-6-0
              class="kuc-mobile-datetime-picker-1-6-0__group__input--date"
              .disabled="${this.disabled}"
              .value="${this._dateValue}"
              .inputId="${this._GUID}"
              .inputAriaInvalid="${this.error !== ""}"
              .required="${this.requiredIcon}"
              .language="${this._getLanguage()}"
              @kuc:mobile-base-date-change="${this._handleDateChange}"
            >
            </kuc-mobile-base-date-1-6-0>
            <kuc-base-mobile-time-1-6-0
              class="kuc-mobile-datetime-picker-1-6-0__group__input--time"
              .value="${this._timeValue}"
              .disabled="${this.disabled}"
              .hour12="${this.hour12}"
              .guid="${this._GUID}"
              .language="${this._getLanguage()}"
              .required="${this.requiredIcon}"
              @kuc:base-mobile-time-change="${this._handleTimeChange}"
            ></kuc-base-mobile-time-1-6-0>
          </div>
          <kuc-base-mobile-error-1-6-0
            .guid="${this._GUID}"
            .text="${this._errorText}"
          >
          </kuc-base-mobile-error-1-6-0>
        </fieldset>
      `;
        }
        updated() {
            this._resetState();
        }
        _resetState() {
            this._previousTimeValue = "";
            this._previousDateValue = "";
            this._changeDateByUI = false;
            this._changeTimeByUI = false;
        }
        _updateErrorText() {
            this._errorText = this._errorFormat || this.error;
        }
        _getLanguage() {
            const langs = ["en", "ja", "zh", "zh-TW"];
            if (langs.indexOf(this.language) !== -1)
                return this.language;
            if (langs.indexOf(document.documentElement.lang) !== -1)
                return document.documentElement.lang;
            return "en";
        }
        _handleDateChange(event) {
            event.stopPropagation();
            event.preventDefault();
            if (event.detail.value === this._dateValue)
                return;
            this._changeDateByUI = true;
            let newValue = this._dateValue;
            if (event.detail.error) {
                this._errorFormat = event.detail.error;
                this.error = "";
            }
            else {
                newValue = event.detail.value;
            }
            this._updateDateTimeValue(newValue, "date");
        }
        _handleTimeChange(event) {
            event.preventDefault();
            event.stopPropagation();
            this._changeTimeByUI = true;
            let newValue = this._timeValue;
            if (event.detail.error) {
                this._errorFormat = event.detail.error;
                this.error = "";
            }
            else {
                this._errorFormat = "";
            }
            newValue = event.detail.value;
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
            const newDateTime = this._errorFormat
                ? undefined
                : this._getDateTimeString();
            const _value = this._errorFormat ? undefined : newDateTime;
            this.value = _value;
            const _newValue = this._errorFormat ? undefined : newDateTime;
            this.value = _newValue;
            const detail = {
                value: _value,
                oldValue: oldDateTime,
                changedPart: type,
            };
            dispatchCustomEvent(this, "change", detail);
        }
        _getDateTimeString() {
            if (this._dateValue === "" && this._timeValue === "")
                return "";
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
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucMobileDateTimePicker.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileDateTimePicker.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucMobileDateTimePicker.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucMobileDateTimePicker.prototype, "label", void 0);
    __decorate([
        property({
            type: String,
            attribute: "lang",
            reflect: true,
            converter: languagePropConverter,
        })
    ], KucMobileDateTimePicker.prototype, "language", void 0);
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
    ], KucMobileDateTimePicker.prototype, "value", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileDateTimePicker.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileDateTimePicker.prototype, "hour12", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucMobileDateTimePicker.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucMobileDateTimePicker.prototype, "visible", void 0);
    __decorate([
        state()
    ], KucMobileDateTimePicker.prototype, "_dateValue", void 0);
    __decorate([
        state()
    ], KucMobileDateTimePicker.prototype, "_timeValue", void 0);
    __decorate([
        state()
    ], KucMobileDateTimePicker.prototype, "_errorFormat", void 0);
    __decorate([
        state()
    ], KucMobileDateTimePicker.prototype, "_errorText", void 0);
    window.customElements.define("kuc-mobile-datetime-picker-1-6-0", KucMobileDateTimePicker);
    createStyleOnHeader(MOBILE_DATETIME_PICKER_CSS);
    exportMobileDateTimePicker = KucMobileDateTimePicker;
})();
const MobileDateTimePicker = exportMobileDateTimePicker;
export { MobileDateTimePicker };
