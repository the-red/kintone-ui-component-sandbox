var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../../kuc-base";
import { getDisplayingDates, getLocale } from "../../utils";
import { BASE_MOBILE_CALENDAR_BODY_CSS } from "./style";
export class BaseMobileDateTimeCalendarBody extends KucBase {
    constructor() {
        super();
        this.month = 1;
        this.year = 2021;
        this.language = "en";
        this.value = "";
        this._month = 1;
        this._year = 2021;
        this._locale = getLocale("en");
        this._handleClickDocument = this._handleClickDocument.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
        setTimeout(() => {
            document.addEventListener("click", this._handleClickDocument);
        }, 1);
    }
    disconnectedCallback() {
        document.removeEventListener("click", this._handleClickDocument);
        super.disconnectedCallback();
    }
    update(changedProperties) {
        changedProperties.forEach((_oldValue, propName) => {
            propName === "language" && (this._locale = getLocale(this.language));
        });
        if (changedProperties.has("month"))
            this._month = this.month;
        if (changedProperties.has("year"))
            this._year = this.year;
        if (changedProperties.has("value")) {
            const { month, year } = this._separateDateValue();
            this._month = parseInt(month, 10);
            this._year = parseInt(year, 10);
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      <table class="kuc-base-mobile-datetime-calendar-body-1-6-0__table" role="grid">
        ${this._getHeaderItemsTemplate()}<!--
        -->${this._getDateItemsTemplate()}
      </table>
    `;
    }
    _handleClickDocument() {
        dispatchCustomEvent(this, "kuc:mobile-calendar-body-blur", {});
    }
    _handleClickDate(event) {
        event.preventDefault();
        event.stopPropagation();
        const itemEl = event.target;
        itemEl.setAttribute("aria-selected", "true");
        const value = itemEl.getAttribute("data-date");
        this._dispatchClickEvent(value);
    }
    _dispatchClickEvent(value) {
        const detail = { oldValue: this.value, value: value };
        dispatchCustomEvent(this, "kuc:mobile-calendar-body-click-date", detail);
        this.value = value;
    }
    _isToday(dateParts) {
        const today = new Date();
        return (parseInt(dateParts[0], 10) === today.getFullYear() &&
            parseInt(dateParts[1], 10) === today.getMonth() + 1 &&
            parseInt(dateParts[2], 10) === today.getDate());
    }
    _separateDateValue(value = this.value) {
        const dates = value.split("-");
        return {
            day: dates[2],
            month: dates[1],
            year: dates[0],
        };
    }
    _getDateClass(dateParts, isThisMonth) {
        if (isThisMonth) {
            const isToday = this._isToday(dateParts);
            if (isToday)
                return " kuc-base-mobile-datetime-calendar-body-1-6-0__table__date--today";
            return "";
        }
        return " kuc-base-mobile-datetime-calendar-body-1-6-0__table__date--other-month";
    }
    _isSameDayOfMoment(dates) {
        const month = parseInt(dates[1], 10);
        const day = parseInt(dates[2], 10);
        const year = parseInt(dates[0], 10);
        let dateFocused = new Date().getDate();
        const currentDay = this.value.split("-")[2];
        if (!currentDay)
            return false;
        if (this.value)
            dateFocused = new Date(this.value).getDate();
        if (dateFocused === day && month === this._month)
            return true;
        const lastDayOfMonth = new Date(year, this._month, 0).getDate();
        if (dateFocused > lastDayOfMonth &&
            lastDayOfMonth === day &&
            month === this._month)
            return true;
        return false;
    }
    _getHeaderItemsTemplate() {
        return html `
      <thead>
        <tr>
          ${this._locale.WEEK_DAYS.map((wday) => {
            return html `
              <th
                class="kuc-base-mobile-datetime-calendar-body-1-6-0__table__header"
                role="columnheader"
                abbr="${wday.abbr}"
              >
                ${wday.text}
              </th>
            `;
        })}
        </tr>
      </thead>
    `;
    }
    _getDateItemsTemplate() {
        const displayingDates = getDisplayingDates(this._year, this._month - 1);
        const monthString = this._locale.MONTH_SELECT[this._month - 1];
        return html `
      <tbody>
        ${displayingDates.map((weeks) => {
            return html `
            <tr>
              ${weeks.map((weekDate) => {
                const dateParts = weekDate.text.split("-");
                const isSameDate = this._isSameDayOfMoment(dateParts);
                const isThisMonth = parseInt(dateParts[1], 10) === this._month;
                const isFocus = (this.value === weekDate.attr || isSameDate) && isThisMonth;
                return html `
                  <td
                    role="gridcell"
                    tabindex="${isFocus ? 0 : -1}"
                    aria-selected="${this.value === weekDate.attr}"
                    aria-current="${this._isToday(dateParts) ? "date" : false}"
                    class="kuc-base-mobile-datetime-calendar-body-1-6-0__table__date${isFocus
                    ? "--selected"
                    : ""}${this._getDateClass(dateParts, isThisMonth)}"
                    data-date="${weekDate.attr}"
                    aria-label="${dateParts[2]} ${monthString}"
                    @click="${this._handleClickDate}"
                  >
                    ${dateParts[2] || ""}
                  </td>
                `;
            })}
            </tr>
          `;
        })}
      </tbody>
    `;
    }
}
__decorate([
    property({ type: Number })
], BaseMobileDateTimeCalendarBody.prototype, "month", void 0);
__decorate([
    property({ type: Number })
], BaseMobileDateTimeCalendarBody.prototype, "year", void 0);
__decorate([
    property({ type: String, attribute: "lang", reflect: true })
], BaseMobileDateTimeCalendarBody.prototype, "language", void 0);
__decorate([
    property({ type: String, reflect: true })
], BaseMobileDateTimeCalendarBody.prototype, "value", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendarBody.prototype, "_month", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendarBody.prototype, "_year", void 0);
if (!window.customElements.get("kuc-base-mobile-datetime-calendar-body-1-6-0")) {
    createStyleOnHeader(BASE_MOBILE_CALENDAR_BODY_CSS);
    window.customElements.define("kuc-base-mobile-datetime-calendar-body-1-6-0", BaseMobileDateTimeCalendarBody);
}
