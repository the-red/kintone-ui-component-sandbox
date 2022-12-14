var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state, query } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../kuc-base";
import { validateProps, validateTimeValue } from "../../validator";
import { generateMinuteOptions, generateHourOptions, formatInputValueToTimeValue, formatTimeValueToInputValueForMobile, getLocale, } from "../../datetime/utils";
import { BASE_MOBILE_TIME_CSS } from "./style";
// eslint-disable-next-line kuc-v1/no-using-generate-guid-function
export class BaseMobileTime extends KucBase {
    constructor(props) {
        super();
        this.guid = "";
        this.language = "en";
        this.value = "";
        this.disabled = false;
        this.hour12 = false;
        this.required = false;
        /**
         * Please consider name again and change @state to @property when publishing the function.
         */
        this._timeStep = 1;
        this._hours = "";
        this._minutes = "";
        this._suffix = "";
        this._locale = getLocale("en");
        const validProps = validateProps(props);
        Object.assign(this, validProps);
    }
    update(changedProperties) {
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
        }
        if (changedProperties.has("hour12")) {
            this._hourOptions = generateHourOptions(this.hour12);
        }
        if (changedProperties.has("_timeStep")) {
            this._minuteOptions = generateMinuteOptions(this._timeStep);
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      <fieldset
        class="kuc-base-mobile-time-1-6-0__group${this.disabled
            ? " kuc-base-mobile-time-1-6-0__group--disabled"
            : ""}${this.required ? " kuc-base-mobile-time-1-6-0__group--required" : ""}"
        aria-label="label-text"
      >
        <select
          class="kuc-base-mobile-time-1-6-0__group__hours"
          aria-label="Hour"
          aria-describedby="${this.guid}-error"
          ?disabled="${this.disabled}"
          @change="${this._handleChangeHours}"
        >
          <option value selected></option>
          ${this._getOptionsHourTemplate()}
        </select>
        <span class="kuc-base-mobile-time-1-6-0__group__colon">:</span>
        <select
          class="kuc-base-mobile-time-1-6-0__group__minutes"
          aria-label="Minute"
          aria-describedby="${this.guid}-error"
          ?disabled="${this.disabled}"
          @change="${this._handleChangeMinutes}"
        >
          <option value selected></option>
          ${this._getOptionsMinuteTemplate()}
        </select>
      </fieldset>
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has("value")) {
            this._updateInputValue();
        }
        super.update(changedProperties);
    }
    _updateInputValue() {
        const times = formatTimeValueToInputValueForMobile(this.value, this.hour12);
        this._hours = times.hours;
        this._minutes = times.minutes;
        this._suffix = times.suffix || "";
        this._setValueToInput(times);
    }
    _setValueToInput(times) {
        this._minutesEl.value = times.minutes;
        if (times.suffix) {
            this._hoursEl.value = times.suffix + " " + times.hours;
            return;
        }
        this._hoursEl.value = times.hours;
    }
    _handleChangeMinutes(event) {
        event.preventDefault();
        event.stopPropagation();
        const oldTime = this._getTimeValueString();
        const target = event.target;
        const minutes = target.value;
        this._minutes = minutes;
        const newTime = this._getTimeValueString();
        this.value = newTime;
        this._dispatchEventTimeChange(newTime, oldTime);
    }
    _handleChangeHours(event) {
        event.preventDefault();
        event.stopPropagation();
        const oldTime = this._getTimeValueString();
        const target = event.target;
        const values = target.value.split(" ");
        if (values.length === 2) {
            this._hours = values[1];
            this._suffix = values[0];
        }
        else {
            this._hours = values[0];
            this._suffix = "";
        }
        const newTime = this._getTimeValueString();
        this.value = newTime;
        this._dispatchEventTimeChange(newTime, oldTime);
    }
    _getTimeValueString() {
        const time = `${this._hours}:${this._minutes}`;
        if (this._suffix)
            return formatInputValueToTimeValue(`${time} ${this._suffix}`);
        return formatInputValueToTimeValue(time);
    }
    _dispatchEventTimeChange(value, oldValue) {
        const tempValue = value === ":" ? "" : value;
        const tempOldValue = oldValue === ":" ? "" : oldValue;
        const detail = {
            value: tempValue,
            oldValue: tempOldValue,
        };
        detail.error = validateTimeValue(tempValue)
            ? ""
            : this._locale.INVALID_TIME_FORMAT;
        dispatchCustomEvent(this, "kuc:base-mobile-time-change", detail);
    }
    _getOptionsMinuteTemplate() {
        return this._minuteOptions.map((min) => html ` <option value="${min.value}">${min.label}</option> `);
    }
    _getOptionsHourTemplate() {
        return this._hourOptions.map((hour) => html ` <option value="${hour.value}">${hour.label}</option> `);
    }
}
__decorate([
    property({ type: String })
], BaseMobileTime.prototype, "guid", void 0);
__decorate([
    property({ type: String, attribute: "lang", reflect: true })
], BaseMobileTime.prototype, "language", void 0);
__decorate([
    property({ type: String })
], BaseMobileTime.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], BaseMobileTime.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], BaseMobileTime.prototype, "hour12", void 0);
__decorate([
    property({ type: Boolean })
], BaseMobileTime.prototype, "required", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_timeStep", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_hours", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_minutes", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_suffix", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_hourOptions", void 0);
__decorate([
    state()
], BaseMobileTime.prototype, "_minuteOptions", void 0);
__decorate([
    query(".kuc-base-mobile-time-1-6-0__group__hours")
], BaseMobileTime.prototype, "_hoursEl", void 0);
__decorate([
    query(".kuc-base-mobile-time-1-6-0__group__minutes")
], BaseMobileTime.prototype, "_minutesEl", void 0);
if (!window.customElements.get("kuc-base-mobile-time-1-6-0")) {
    createStyleOnHeader(BASE_MOBILE_TIME_CSS);
    window.customElements.define("kuc-base-mobile-time-1-6-0", BaseMobileTime);
}
