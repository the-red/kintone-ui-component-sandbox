var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { state, property, query } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../kuc-base";
import { getTodayStringByLocale, calculateDistanceInput } from "../utils";
import "./header";
import "./body";
import "./footer";
import { CALENDAR_CSS } from "./style";
export class BaseDateTimeCalendar extends KucBase {
    constructor() {
        super(...arguments);
        this.language = "en";
        this.value = "";
        this._month = 1;
        this._year = 2021;
    }
    update(changedProperties) {
        if (changedProperties.has("value"))
            this._updateValue();
        super.update(changedProperties);
    }
    render() {
        return html `
      <div
        class="kuc-base-datetime-calendar-1-6-0__group"
        role="dialog"
        aria-modal="true"
        aria-label="Calender"
        @click="${this._handleClickCalendarGroup}"
        @keydown="${this._handleKeyDownCalendarGroup}"
      >
        <kuc-base-datetime-calendar-header-1-6-0
          .year="${this._year}"
          .month="${this._month}"
          .language="${this.language}"
          @kuc:calendar-header-change="${this._handleCalendarHeaderChange}"
        ></kuc-base-datetime-calendar-header-1-6-0>
        <kuc-base-datetime-calendar-body-1-6-0
          .year="${this._year}"
          .month="${this._month}"
          .value="${this.value}"
          .language="${this.language}"
          @kuc:calendar-body-change-date="${this._handleCalendarBodyChangeDate}"
        ></kuc-base-datetime-calendar-body-1-6-0>
        <kuc-base-datetime-calendar-footer-1-6-0
          .language="${this.language}"
        ></kuc-base-datetime-calendar-footer-1-6-0>
      </div>
    `;
    }
    async updated(changedProperties) {
        await this.updateComplete;
        this._calculateBodyCalendarPosition();
        super.updated(changedProperties);
    }
    _handleKeyDownCalendarGroup(event) {
        if (event.key !== "Escape")
            return;
        event.preventDefault();
        event.stopPropagation();
        dispatchCustomEvent(this, "kuc:calendar-escape", {});
    }
    _handleClickCalendarGroup(event) {
        event.stopPropagation();
        if (this._listBoxMonthEl)
            this._monthEl.closeListBox();
        if (this._listBoxYearEl)
            this._yearEl.closeListBox();
    }
    _calculateBodyCalendarPosition() {
        const { inputToBottom, inputToTop, inputToRight, inputToLeft } = calculateDistanceInput(this);
        const calendarHeight = this._baseCalendarGroupEl.getBoundingClientRect().height;
        if (inputToBottom >= calendarHeight) {
            this._calculateCalendarPosition(inputToRight, inputToLeft, "bottom");
            return;
        }
        if (inputToTop < 0 || inputToBottom > inputToTop) {
            this._calculateCalendarPosition(inputToRight, inputToLeft, "bottom");
            return;
        }
        this._calculateCalendarPosition(inputToRight, inputToLeft, "top");
    }
    _calculateCalendarPosition(inputToRight, inputToLeft, type) {
        if (!this.parentElement)
            return;
        const calendarWidth = 336;
        const inputHeight = 40;
        const inputWidth = 100;
        if (inputToRight < calendarWidth && inputToRight < inputToLeft) {
            const parentWidth = this.parentElement.getBoundingClientRect().width;
            const top = type === "bottom" ? inputHeight : "auto";
            const bottom = type === "bottom" ? "auto" : inputHeight;
            const right = parentWidth > inputWidth ? parentWidth - inputWidth : 0;
            this._setCalendarPosition({
                top,
                bottom,
                right,
            });
            return;
        }
        const top = type === "bottom" ? inputHeight : "auto";
        const bottom = type === "bottom" ? "auto" : inputHeight;
        const left = 0;
        this._setCalendarPosition({
            bottom,
            top,
            left,
        });
    }
    _setCalendarPosition({ top = "auto", left = "auto", right = "auto", bottom = "auto", }) {
        const baseDatetimeCalendarEl = this._baseCalendarGroupEl.parentElement;
        if (!this.parentElement || !baseDatetimeCalendarEl)
            return;
        this.parentElement.style.position = "relative";
        baseDatetimeCalendarEl.style.bottom =
            bottom === "auto" ? bottom : bottom + "px";
        baseDatetimeCalendarEl.style.top = top === "auto" ? top : top + "px";
        baseDatetimeCalendarEl.style.left = left === "auto" ? left : left + "px";
        baseDatetimeCalendarEl.style.right =
            right === "auto" ? right : right + "px";
    }
    _handleCalendarHeaderChange(event) {
        const { year, month } = this._separateValue(event.detail.value);
        this._year = year;
        this._month = month;
    }
    _handleCalendarBodyChangeDate(event) {
        const { year, month } = this._separateValue(event.detail.value);
        this._year = year;
        this._month = month;
    }
    _updateValue() {
        if (this.value === "") {
            this.value = getTodayStringByLocale().slice(0, 7) + "-01";
        }
        const { year, month } = this._separateValue(this.value);
        this._year = year;
        this._month = month;
    }
    _separateValue(value) {
        const dateParts = value.split("-");
        return {
            year: parseInt(dateParts[0], 10),
            month: parseInt(dateParts[1], 10),
        };
    }
}
__decorate([
    property({ type: String, attribute: "lang", reflect: true })
], BaseDateTimeCalendar.prototype, "language", void 0);
__decorate([
    property({ type: String, reflect: true })
], BaseDateTimeCalendar.prototype, "value", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-1-6-0__group")
], BaseDateTimeCalendar.prototype, "_baseCalendarGroupEl", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-header-1-6-0__month")
], BaseDateTimeCalendar.prototype, "_monthEl", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-header-1-6-0__year")
], BaseDateTimeCalendar.prototype, "_yearEl", void 0);
__decorate([
    query(".kuc-base-datetime-header-month-1-6-0__listbox")
], BaseDateTimeCalendar.prototype, "_listBoxMonthEl", void 0);
__decorate([
    query(".kuc-base-datetime-header-year-1-6-0__listbox")
], BaseDateTimeCalendar.prototype, "_listBoxYearEl", void 0);
__decorate([
    state()
], BaseDateTimeCalendar.prototype, "_month", void 0);
__decorate([
    state()
], BaseDateTimeCalendar.prototype, "_year", void 0);
if (!window.customElements.get("kuc-base-datetime-calendar-1-6-0")) {
    createStyleOnHeader(CALENDAR_CSS);
    window.customElements.define("kuc-base-datetime-calendar-1-6-0", BaseDateTimeCalendar);
}
