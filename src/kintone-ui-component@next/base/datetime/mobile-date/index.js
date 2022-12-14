var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { state, property, query } from "lit/decorators.js";
import { BaseMobileDateTimeCalendar } from "../mobile-calendar";
import { dispatchCustomEvent, KucBase, createStyleOnHeader, } from "../../kuc-base";
import { formatInputValueToValue, formatValueToInputValue, getTodayStringByLocale, isValidDateFormat, calculateDistanceInput, } from "../utils";
import { BASE_MOBILE_DATE_CSS } from "./style";
export { BaseMobileDateTimeCalendar };
export class BaseMobileDate extends KucBase {
    constructor() {
        super(...arguments);
        this.inputId = "";
        this.language = "en";
        this.value = "";
        this.disabled = false;
        this.inputAriaInvalid = false;
        this.required = false;
        this._dateTimeCalendarVisible = false;
        this._calendarValue = "";
        this._inputValue = "";
    }
    update(changedProperties) {
        if (changedProperties.has("inputId")) {
            this._GUID = this.inputId;
        }
        if (changedProperties.has("value") || changedProperties.has("language")) {
            this._updateValueProp();
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      <div class="kuc-mobile-base-date-1-6-0__group${this._getGroupClass()}">
        <input
          class="kuc-mobile-base-date-1-6-0__group__input"
          type="text"
          id="${this._GUID}-label"
          readonly="readonly"
          .value="${this._inputValue}"
          aria-label="Date"
          aria-describedby="${this._GUID}-error"
          aria-invalid="${this.inputAriaInvalid}"
          aria-required="${this.required}"
          ?disabled="${this.disabled}"
          @click="${this._handleClickOpenCalendar}"
        />
        <button
          type="button"
          class="kuc-mobile-base-date-1-6-0__group__button"
          aria-label="calendar"
          @click="${this._handleClickOpenCalendar}"
          ?disabled="${this.disabled}"
        >
          ${this._getCalendarIconTemplate()}
        </button>
        ${this._getCalendarTemplate()}
      </div>
    `;
    }
    updated(changedProperties) {
        if (this._dateTimeCalendarVisible) {
            this._setCalendarPosition();
        }
        super.updated(changedProperties);
    }
    _setCalendarPosition() {
        const borderWidth = 2;
        const { inputToBottom, inputToTop } = calculateDistanceInput(this);
        const inputHeight = this._inputEl.getBoundingClientRect().height;
        if (inputToBottom >= inputToTop)
            return;
        this._calendarEl.style.bottom = inputHeight + borderWidth + "px";
        this._calendarEl.style.top = "auto";
    }
    _getGroupClass() {
        let groupClass = "";
        if (this.disabled) {
            groupClass += " kuc-mobile-base-date-1-6-0__group--disabled";
        }
        if (this.required) {
            groupClass += " kuc-mobile-base-date-1-6-0__group--required";
        }
        return groupClass;
    }
    _handleClickOpenCalendar(event) {
        if (this._dateTimeCalendarVisible) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        this._calendarValue = this._getNewCalendarValue(this._inputValue || "");
        this._openCalendar();
    }
    _updateValueProp() {
        if (this.value) {
            this._inputValue = formatValueToInputValue(this.language, this.value);
            this._calendarValue = this.value;
            return;
        }
        const today = getTodayStringByLocale();
        this._inputValue = "";
        this._calendarValue = this._calendarValue
            ? this._calendarValue.slice(0, 7) + "-01"
            : today.slice(0, 7);
    }
    _getNewCalendarValue(value) {
        if (isValidDateFormat(this.language, value))
            return formatInputValueToValue(this.language, value);
        let temp = this._calendarValue.slice(0, 7);
        if (value === "")
            temp = this._calendarValue.slice(0, 7) + "-01";
        return temp;
    }
    _closeCalendar() {
        this._dateTimeCalendarVisible = false;
    }
    _openCalendar() {
        this._dateTimeCalendarVisible = true;
    }
    _handleClickCalendarClickDate(event) {
        this._closeCalendar();
        event.detail.oldValue = this.value;
        if (event.detail.oldValue === event.detail.value)
            return;
        this.value = event.detail.value;
        dispatchCustomEvent(this, "kuc:mobile-base-date-change", event.detail);
        this._btnToggleEl.focus();
    }
    _handleClickCalendarFooterButtonNone() {
        this._closeCalendar();
        this._inputValue = "";
        let temp = this.value ? this.value.slice(0, 7) + "-01" : "";
        if (!temp) {
            temp = this._calendarValue.slice(0, 7) + "-01";
        }
        this._calendarValue = temp;
        this._dispathDateChangeCustomEvent("");
    }
    _handleClickCalendarFooterButtonToday() {
        this._closeCalendar();
        const today = getTodayStringByLocale();
        this._dispathDateChangeCustomEvent(today);
    }
    _handleClickCalendarFooterButtonClose() {
        this._closeCalendar();
        this._btnToggleEl.focus();
    }
    _handleCalendarBlurBody(event) {
        event.preventDefault();
        this._dateTimeCalendarVisible = false;
    }
    _dispathDateChangeCustomEvent(newValue) {
        const detail = { value: newValue, oldValue: this.value };
        this.value = newValue;
        dispatchCustomEvent(this, "kuc:mobile-base-date-change", detail);
        this._btnToggleEl.focus();
    }
    _getCalendarTemplate() {
        return this._dateTimeCalendarVisible
            ? html `
          <kuc-base-mobile-datetime-calendar-1-6-0
            class="kuc-base-mobile-date-1-6-0__calendar"
            .language="${this.language}"
            .value="${this._calendarValue}"
            ?hidden="${!this._dateTimeCalendarVisible}"
            @kuc:mobile-calendar-body-click-date="${this
                ._handleClickCalendarClickDate}"
            @kuc:mobile-calendar-footer-click-none="${this
                ._handleClickCalendarFooterButtonNone}"
            @kuc:mobile-calendar-footer-click-today="${this
                ._handleClickCalendarFooterButtonToday}"
            @kuc:mobile-calendar-footer-click-close="${this
                ._handleClickCalendarFooterButtonClose}"
            @kuc:mobile-calendar-body-blur="${this._handleCalendarBlurBody}"
          >
          </kuc-base-mobile-datetime-calendar-1-6-0>
        `
            : "";
    }
    _getCalendarIconTemplate() {
        return html `
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 4C9.44772 4 9 4.44772 9 5V6H6C4.89543 6 4 6.89543 4 8V21C4 22.1046 4.89543 23 6 23H22C23.1046 23 24 22.1046 24 21V8C24 6.89543 23.1046 6 22 6H19V5C19 4.44772 18.5523 4 18 4C17.4477 4 17 4.44772 17 5V6H11V5C11 4.44772 10.5523 4 10 4ZM9 8V9C9 9.55228 9.44772 10 10 10C10.5523 10 11 9.55228 11 9V8H17V9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9V8H22V11H6V8H9ZM6 13V21H22V13H6Z"
          fill="#4b4b4b"
        />
      </svg>
    `;
    }
}
__decorate([
    property({ type: String })
], BaseMobileDate.prototype, "inputId", void 0);
__decorate([
    property({ type: String, attribute: "lang", reflect: true })
], BaseMobileDate.prototype, "language", void 0);
__decorate([
    property({ type: String, reflect: true })
], BaseMobileDate.prototype, "value", void 0);
__decorate([
    property({ type: Boolean })
], BaseMobileDate.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], BaseMobileDate.prototype, "inputAriaInvalid", void 0);
__decorate([
    property({ type: Boolean })
], BaseMobileDate.prototype, "required", void 0);
__decorate([
    query(".kuc-mobile-base-date-1-6-0__group__button")
], BaseMobileDate.prototype, "_btnToggleEl", void 0);
__decorate([
    query(".kuc-mobile-base-date-1-6-0__group__input")
], BaseMobileDate.prototype, "_inputEl", void 0);
__decorate([
    query(".kuc-base-mobile-date-1-6-0__calendar")
], BaseMobileDate.prototype, "_calendarEl", void 0);
__decorate([
    state()
], BaseMobileDate.prototype, "_dateTimeCalendarVisible", void 0);
if (!window.customElements.get("kuc-mobile-base-date-1-6-0")) {
    createStyleOnHeader(BASE_MOBILE_DATE_CSS);
    window.customElements.define("kuc-mobile-base-date-1-6-0", BaseMobileDate);
}
