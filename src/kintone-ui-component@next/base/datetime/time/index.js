var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../kuc-base";
import { MAX_MINUTES, MAX_HOURS12, MAX_HOURS24, TIME_SUFFIX, } from "../resource/constant";
import { padStart, generateTimeOptions, formatTimeValueToInputValue, formatInputValueToTimeValue, getLocale, timeCompare, } from "../utils";
import { BaseDateTimeListBox } from "../listbox";
import { BASE_TIME_CSS } from "./style";
export { BaseDateTimeListBox };
export class BaseTime extends KucBase {
    constructor() {
        super(...arguments);
        this.language = "en";
        this.max = "";
        this.min = "";
        this.value = "";
        this.disabled = false;
        this.hour12 = false;
        this.timeStep = 30;
        this._listBoxVisible = false;
        this._valueLabel = "";
        this._doFocusListBox = false;
        this._hours = "";
        this._minutes = "";
        this._suffix = "";
        this._valueForReset = "";
        this._locale = getLocale("en");
    }
    update(changedProperties) {
        if (changedProperties.has("hour12") ||
            changedProperties.has("timeStep") ||
            changedProperties.has("max") ||
            changedProperties.has("min")) {
            this._listBoxItems = generateTimeOptions(this.hour12, this.timeStep, this.min, this.max);
            this._updateInputValue();
        }
        if (changedProperties.has("value")) {
            this._updateInputValue();
        }
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      <div class="kuc-base-time-1-6-0__group" @click="${this._handleClickInputGroup}">
        <input
          type="text"
          class="kuc-base-time-1-6-0__group__hours"
          role="spinbutton"
          tabindex="${this._hours ? "0" : "-1"}"
          aria-label="Hour"
          @focus="${this._handleFocusInput}"
          @blur="${this._handleBlurInput}"
          @keydown="${this._handleKeyDownInput}"
          @paste="${this._handlePasteInput}"
          ?disabled="${this.disabled}"
          value="${this._hours}"
        />
        ${this._getColonTemplate()}
        <input
          type="text"
          class="kuc-base-time-1-6-0__group__minutes"
          role="spinbutton"
          tabindex="${this._minutes ? "0" : "-1"}"
          aria-label="Minute"
          @focus="${this._handleFocusInput}"
          @blur="${this._handleBlurInput}"
          @keydown="${this._handleKeyDownInput}"
          @paste="${this._handlePasteInput}"
          ?disabled="${this.disabled}"
          value="${this._minutes}"
        />
        ${this._getSuffixTemplate()}
      </div>
      <button
        aria-haspopup="listbox"
        aria-expanded="${this._listBoxVisible}"
        class="kuc-base-time-1-6-0__assistive-text"
        @keydown="${this._handleKeyDownButton}"
        @focus="${this._handleFocusButton}"
        @blur="${this._handleBlurButton}"
        ?disabled="${this.disabled}"
      >
        show time picker
      </button>
      ${this._getListBoxTemplate()}
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has("disabled")) {
            this._toggleDisabledGroup();
        }
        super.update(changedProperties);
    }
    _handleClickInputGroup(event) {
        if (this.disabled)
            return;
        if (this.value === "") {
            this._toggleEl.focus();
            this._openListBox();
            return;
        }
        const input = event.target;
        this._openListBox();
        if (input.tagName.toUpperCase() === "INPUT") {
            input.select();
            return;
        }
        this._hoursEl.select();
    }
    _handleBlurListBox(event) {
        event.preventDefault();
        if (this._inputFocusEl)
            return;
        this._listBoxVisible = false;
    }
    _toggleDisabledGroup() {
        if (this.disabled)
            return this._inputGroupEl.classList.add("kuc-base-time-1-6-0__group--disabled");
        return this._inputGroupEl.classList.remove("kuc-base-time-1-6-0__group--disabled");
    }
    _updateInputValue() {
        var _a;
        const times = formatTimeValueToInputValue(this.value, this.hour12);
        this._hours = times.hours;
        this._minutes = times.minutes;
        this._suffix = times.suffix || "";
        this._valueLabel = this._getValueLabel(times);
        if (!this._inputGroupEl)
            return;
        this._setValueToInput(times);
        (_a = this._inputFocusEl) === null || _a === void 0 ? void 0 : _a.select();
    }
    _getValueLabel(times) {
        if (!times.hours || !times.minutes)
            return "";
        const newLabel = `${times.hours}:${times.minutes}`;
        if (!times.suffix)
            return newLabel;
        return newLabel + ` ${times.suffix}`;
    }
    _setValueToInput(times) {
        this._hoursEl.value = times.hours;
        this._minutesEl.value = times.minutes;
        if (!this._suffixEl)
            return;
        this._suffixEl.value = times.suffix || "";
    }
    _handleKeyDownButton(event) {
        switch (event.key) {
            case "Tab":
            case "Escape":
                if (event.key === "Escape")
                    event.preventDefault();
                if (!this._listBoxVisible)
                    return;
                this._closeListBox();
                break;
            case "Enter":
            case " ":
            case "ArrowUp":
            case "ArrowDown":
                event.preventDefault();
                event.stopPropagation();
                this._openListBoxByKey();
                break;
            default:
                event.preventDefault();
                event.stopPropagation();
                this._handleDefaultKeyButton(event.key);
                break;
        }
    }
    _handleBlurButton() {
        this._inputGroupEl.classList.remove("kuc-base-time-1-6-0__group--focus");
    }
    _handleFocusButton(event) {
        event.stopPropagation();
        this._inputGroupEl.classList.add("kuc-base-time-1-6-0__group--focus");
    }
    _openListBoxByKey() {
        if (this._listBoxVisible)
            return false;
        this._valueForReset = this.value;
        this._doFocusListBox = true;
        this._listBoxVisible = true;
        this._inputGroupEl.classList.remove("kuc-base-time-1-6-0__group--focus");
        return true;
    }
    _handleListBoxEscape() {
        this._closeListBox();
        this.value = this._valueForReset;
        this._actionUpdateInputValue(this.value);
        if (this.value === "") {
            this._toggleEl.focus();
            return;
        }
        this._hoursEl.select();
    }
    _handleDefaultKeyButton(keyCode) {
        const isNumber = /^[0-9]$/i.test(keyCode);
        if (!isNumber || this.value !== "")
            return;
        const newValue = this._computeNumberKeyValueHours(keyCode);
        this._actionUpdateInputValue(newValue);
        this._hoursEl.select();
    }
    _handleChangeListBox(event) {
        event.preventDefault();
        event.stopPropagation();
        this._closeListBox();
        this._inputFocusEl = this._hoursEl;
        this._hoursEl.select();
        if (!event.detail.value)
            return;
        const listboxVal = event.detail.value;
        this._actionUpdateInputValue(listboxVal);
    }
    _handleListBoxFocusChange(event) {
        const listBoxValue = event.detail.value;
        const times = formatInputValueToTimeValue(listBoxValue);
        this._actionUpdateInputValue(times);
    }
    _handleFocusInput(event) {
        this._inputFocusEl = event.target;
        this._inputFocusEl.select();
        this._inputGroupEl.classList.add("kuc-base-time-1-6-0__group--focus");
    }
    _handleBlurInput(event) {
        this._inputFocusEl = null;
        const newTarget = event.relatedTarget;
        if (newTarget &&
            newTarget instanceof HTMLInputElement &&
            [this._hoursEl, this._minutesEl, this._suffixEl].indexOf(newTarget) > -1)
            return;
        this._closeListBox();
        this._inputGroupEl.classList.remove("kuc-base-time-1-6-0__group--focus");
    }
    _handleTabKey(event) {
        if (event.key === "Tab")
            return true;
        return false;
    }
    _handleKeyDownInput(event) {
        this._closeListBox();
        if (this._handleTabKey(event))
            return;
        this._handleSupportedKey(event);
    }
    _handlePasteInput(event) {
        event.preventDefault();
    }
    _handleSupportedKey(event) {
        event.preventDefault();
        const keyCode = event.key;
        let newValue;
        switch (keyCode) {
            case "Enter":
            case "ArrowRight":
                this._actionSelectNextRange();
                break;
            case "ArrowLeft":
                this._actionSelectPreviousRange();
                break;
            case "ArrowUp":
                newValue = this._computeArrowUpDownValue(1);
                this._actionUpdateInputValue(newValue);
                break;
            case "ArrowDown":
                newValue = this._computeArrowUpDownValue(-1);
                this._actionUpdateInputValue(newValue);
                break;
            case "Backspace":
            case "Delete":
                newValue = this._computeDeleteValue();
                this._actionUpdateInputValue(newValue);
                break;
            default:
                newValue = this._computeDefaultKeyValue(keyCode);
                this._actionUpdateInputValue(newValue);
                break;
        }
    }
    _actionUpdateInputValue(newValue) {
        const oldValue = this.value === "" ? this.value : this._formatKeyDownValue();
        const oldValueProp = formatInputValueToTimeValue(oldValue);
        const newValueProp = formatInputValueToTimeValue(newValue);
        if (oldValueProp === newValueProp)
            return;
        this.value = newValueProp;
        this._dispatchEventTimeChange(newValueProp, oldValueProp);
    }
    _computeDeleteValue() {
        if (this._inputFocusEl === this._minutesEl)
            return this._formatKeyDownValue({ minutes: "00" });
        if (this._inputFocusEl === this._hoursEl)
            return this._formatKeyDownValue({ hours: "00" });
        return this._formatKeyDownValue();
    }
    _computeArrowUpDownValue(changeStep) {
        if (this._inputFocusEl === this._hoursEl)
            return this._computeArrowUpDownHourValue(changeStep);
        if (this._inputFocusEl === this._minutesEl)
            return this._computeArrowUpDownMinuteValue(changeStep);
        return this._computeKeyDownSuffixValue();
    }
    _computeKeyDownSuffixValue(key) {
        if (!key) {
            const newSuffix = this._suffix === TIME_SUFFIX.AM ? TIME_SUFFIX.PM : TIME_SUFFIX.AM;
            return this._formatKeyDownValue({ suffix: newSuffix });
        }
        const supportedKey = ["a", "A", "p", "P"];
        if (supportedKey.indexOf(key) === -1)
            return this._formatKeyDownValue();
        const newSuffix = key === "a" || key === "A" ? TIME_SUFFIX.AM : TIME_SUFFIX.PM;
        if (this.value === "") {
            this._hoursEl.select();
        }
        return this._formatKeyDownValue({ suffix: newSuffix });
    }
    _computeArrowUpDownHourValue(changeStep) {
        const currentHour = parseInt(this._hours, 10);
        let newHours = currentHour + changeStep;
        if (this.hour12) {
            newHours %= MAX_HOURS12;
            newHours = newHours <= 0 ? MAX_HOURS12 : newHours;
        }
        else {
            newHours %= MAX_HOURS24;
            newHours = newHours < 0 ? MAX_HOURS24 - 1 : newHours;
        }
        return this._formatKeyDownValue({ hours: newHours.toString() });
    }
    _computeArrowUpDownMinuteValue(changeStep) {
        const currentMinute = parseInt(this._minutes, 10);
        let newMinutes = currentMinute + changeStep;
        newMinutes %= MAX_MINUTES;
        newMinutes = newMinutes < 0 ? MAX_MINUTES - 1 : newMinutes;
        return this._formatKeyDownValue({ minutes: newMinutes.toString() });
    }
    _computeDefaultKeyValue(key) {
        const isNumber = /^[0-9]$/i.test(key);
        if (isNumber)
            return this._computeNumberKeyValue(key);
        if (this._inputFocusEl === this._suffixEl)
            return this._computeKeyDownSuffixValue(key);
        return this._formatKeyDownValue();
    }
    _computeNumberKeyValue(key) {
        if (this._inputFocusEl === this._minutesEl)
            return this._computeNumberKeyValueMinutes(key);
        if (this._inputFocusEl === this._hoursEl)
            return this._computeNumberKeyValueHours(key);
        return this._formatKeyDownValue();
    }
    _computeNumberKeyValueMinutes(keyCode) {
        const previousMinutes = this._getPreviousMinutes(this._minutes);
        const newMinutes = padStart(previousMinutes + keyCode);
        if (this.value === "") {
            this._hoursEl.select();
            return this._computeNumberKeyValueHours(keyCode);
        }
        return this._formatKeyDownValue({ minutes: newMinutes });
    }
    _computeNumberKeyValueHours(keyCode) {
        const previousHours = this._getPreviousHours(this._hours, keyCode);
        const newHours = padStart(previousHours + keyCode);
        if (this.value === "")
            return this._formatKeyDownValue({ hours: newHours, minutes: "00" });
        return this._formatKeyDownValue({ hours: newHours });
    }
    _getPreviousMinutes(minutes) {
        let previousMinutes;
        previousMinutes =
            parseInt(minutes, 10) > 10 ? ("" + minutes)[1] : "" + minutes;
        previousMinutes = parseInt(previousMinutes, 10) > 5 ? "0" : previousMinutes;
        return previousMinutes;
    }
    _getPreviousHours(hours, key) {
        let previousHours;
        previousHours = parseInt(hours, 10) > 10 ? ("" + hours)[1] : "" + hours;
        const newHours = parseInt(previousHours + key, 10);
        const isMaxHours = (this.hour12 && newHours > MAX_HOURS12) ||
            (!this.hour12 && newHours >= MAX_HOURS24);
        previousHours = isMaxHours ? "0" : previousHours;
        return previousHours;
    }
    _actionSelectNextRange() {
        if (this._inputFocusEl === this._hoursEl) {
            this._minutesEl.select();
            return;
        }
        if (this.hour12 && this._inputFocusEl === this._minutesEl) {
            this._suffixEl.select();
        }
    }
    _actionSelectPreviousRange() {
        if (this._inputFocusEl === this._suffixEl) {
            this._minutesEl.select();
            return;
        }
        if (this._inputFocusEl === this._minutesEl) {
            this._hoursEl.select();
        }
    }
    _dispatchEventTimeChange(value, oldValue) {
        const detail = {
            value: value,
            oldValue: oldValue,
        };
        if (timeCompare(value, this.min) < 0 || timeCompare(this.max, value) < 0) {
            detail.error = this._locale.TIME_IS_OUT_OF_VALID_RANGE;
        }
        dispatchCustomEvent(this, "kuc:base-time-change", detail);
    }
    _formatKeyDownValue(props = { hours: this._hours, minutes: this._minutes, suffix: this._suffix }) {
        const hours = props.hours || this._hours;
        const minutes = props.minutes || this._minutes;
        const suffix = props.suffix || this._suffix;
        const timeStr = `${padStart(hours)}:${padStart(minutes)}`;
        if (!suffix)
            return timeStr;
        return `${timeStr} ${suffix}`;
    }
    _openListBox() {
        if (this._listBoxVisible)
            return;
        this._doFocusListBox = false;
        this._listBoxVisible = true;
    }
    _closeListBox() {
        this._doFocusListBox = false;
        this._listBoxVisible = false;
    }
    _getColonTemplate() {
        return this._hours
            ? html ` <span class="kuc-base-time-1-6-0__group__colon">:</span> `
            : "";
    }
    _getSuffixTemplate() {
        return this.hour12
            ? html `
          <input
            class="kuc-base-time-1-6-0__group__suffix"
            role="spinbutton"
            tabindex="${this._suffix ? "0" : "-1"}"
            aria-label="${this._suffix || "suffix"}"
            @focus="${this._handleFocusInput}"
            @blur="${this._handleBlurInput}"
            @keydown="${this._handleKeyDownInput}"
            @paste="${this._handlePasteInput}"
            ?disabled="${this.disabled}"
            value="${this._suffix}"
          />
        `
            : "";
    }
    _getListBoxTemplate() {
        return this._listBoxVisible
            ? html `
          <kuc-base-datetime-listbox-1-6-0
            maxHeight="165"
            aria-hidden="${!this._listBoxVisible}"
            class="kuc-base-time-1-6-0__group__listbox"
            .items="${this._listBoxItems || []}"
            .value="${this._valueLabel}"
            .doFocus="${this._doFocusListBox}"
            @kuc:listbox-click="${this._handleChangeListBox}"
            @kuc:listbox-blur="${this._handleBlurListBox}"
            @kuc:listbox-focus-change="${this._handleListBoxFocusChange}"
            @kuc:listbox-escape="${this._handleListBoxEscape}"
          ></kuc-base-datetime-listbox-1-6-0>
        `
            : "";
    }
}
__decorate([
    property({ type: String, attribute: "lang", reflect: true })
], BaseTime.prototype, "language", void 0);
__decorate([
    property({ type: String })
], BaseTime.prototype, "max", void 0);
__decorate([
    property({ type: String })
], BaseTime.prototype, "min", void 0);
__decorate([
    property({ type: String })
], BaseTime.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], BaseTime.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], BaseTime.prototype, "hour12", void 0);
__decorate([
    property({ type: Number })
], BaseTime.prototype, "timeStep", void 0);
__decorate([
    state()
], BaseTime.prototype, "_listBoxVisible", void 0);
__decorate([
    state()
], BaseTime.prototype, "_valueLabel", void 0);
__decorate([
    state()
], BaseTime.prototype, "_doFocusListBox", void 0);
__decorate([
    state()
], BaseTime.prototype, "_hours", void 0);
__decorate([
    state()
], BaseTime.prototype, "_minutes", void 0);
__decorate([
    state()
], BaseTime.prototype, "_suffix", void 0);
__decorate([
    state()
], BaseTime.prototype, "_inputFocusEl", void 0);
__decorate([
    query(".kuc-base-time-1-6-0__group__hours")
], BaseTime.prototype, "_hoursEl", void 0);
__decorate([
    query(".kuc-base-time-1-6-0__group__minutes")
], BaseTime.prototype, "_minutesEl", void 0);
__decorate([
    query(".kuc-base-time-1-6-0__group__suffix")
], BaseTime.prototype, "_suffixEl", void 0);
__decorate([
    query(".kuc-base-time-1-6-0__assistive-text")
], BaseTime.prototype, "_toggleEl", void 0);
__decorate([
    query(".kuc-base-time-1-6-0__group")
], BaseTime.prototype, "_inputGroupEl", void 0);
if (!window.customElements.get("kuc-base-time-1-6-0")) {
    createStyleOnHeader(BASE_TIME_CSS);
    window.customElements.define("kuc-base-time-1-6-0", BaseTime);
}
