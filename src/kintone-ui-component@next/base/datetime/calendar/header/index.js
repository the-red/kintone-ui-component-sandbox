var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../../kuc-base";
import "../../calendar/header/dropdown/year";
import "../../calendar/header/dropdown/month";
import { getLeftArrowIconSvgTemplate, getRightArrowIconSvgTemplate, getLocale, } from "../../utils/";
import { CALENDAR_HEADER_CSS } from "./style";
function isValidMonth(month) {
    return month > 0 && month < 13;
}
function isValidYear(year) {
    return year >= 0 && year < 10000;
}
export class BaseDateTimeCalendarHeader extends KucBase {
    constructor() {
        super(...arguments);
        this.language = "en";
        this.month = 1;
        this.year = 2021;
        this._locale = getLocale("en");
    }
    update(changedProperties) {
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
        }
        super.update(changedProperties);
    }
    render() {
        return html `
      <div class="kuc-base-datetime-calendar-header-1-6-0__group">
        <button
          aria-label="previous month"
          type="button"
          class="kuc-base-datetime-calendar-header-1-6-0__group__button kuc-base-datetime-calendar-header-1-6-0__group__button--previous-month"
          @click="${this._handleClickCalendarPrevMonthBtn}"
          @keydown="${this._handleKeyDownCalendarPrevMonthBtn}"
        >
          ${getLeftArrowIconSvgTemplate()}
        </button>
        <div class="kuc-base-datetime-calendar-header-1-6-0__group__center">
          ${this._getYearMonthTemplate()}
        </div>
        <button
          aria-label="next month"
          type="button"
          class="kuc-base-datetime-calendar-header-1-6-0__group__button kuc-base-datetime-calendar-header-1-6-0__group__button--next-month"
          @click="${this._handleClickCalendarNextMonthBtn}"
        >
          ${getRightArrowIconSvgTemplate()}
        </button>
      </div>
    `;
    }
    _getYearTemplate() {
        return html `
      <kuc-base-datetime-header-year-1-6-0
        class="kuc-base-datetime-calendar-header-1-6-0__year"
        .postfix="${this._locale.YEAR_SELECT_POSTFIX}"
        .year="${this.year}"
        @kuc:year-dropdown-change="${this._handleYearDropdownChange}"
        @kuc:year-dropdown-click="${this._handleYearDropdownClick}"
      >
      </kuc-base-datetime-header-year-1-6-0>
    `;
    }
    _getMonthTemplate() {
        return html `
      <kuc-base-datetime-header-month-1-6-0
        class="kuc-base-datetime-calendar-header-1-6-0__month"
        .month="${this.month}"
        .language="${this.language}"
        @kuc:month-dropdown-change="${this._handleMonthDropdownChange}"
        @kuc:month-dropdown-click="${this._handleMonthDropdownClick}"
      >
      </kuc-base-datetime-header-month-1-6-0>
    `;
    }
    _getYearMonthTemplate() {
        return this.language === "zh" ||
            this.language === "ja" ||
            this.language === "zh-TW"
            ? html ` ${this._getYearTemplate()}${this._getMonthTemplate()} `
            : html ` ${this._getMonthTemplate()}${this._getYearTemplate()} `;
    }
    _handleMonthDropdownChange(event) {
        event.stopPropagation();
        event.preventDefault();
        this.month = parseInt(event.detail.value, 10);
        this._dispatchCalendarHeaderChangeEvent();
    }
    _handleYearDropdownChange(event) {
        event.stopPropagation();
        event.preventDefault();
        this.year = parseInt(event.detail.value, 10);
        this._dispatchCalendarHeaderChangeEvent();
    }
    _handleYearDropdownClick() {
        if (!this._listBoxMonthEl)
            return;
        this._baseDateTimeHeaderMonthEl.closeListBox();
    }
    _handleMonthDropdownClick() {
        if (!this._listBoxYearEl)
            return;
        this._baseDateTimeHeaderYearEl.closeListBox();
    }
    _handleClickCalendarPrevMonthBtn(event) {
        event.stopPropagation();
        const monthSelected = this.month;
        if (monthSelected === 1) {
            this.month = 12;
            this.year--;
        }
        else {
            this.month -= 1;
        }
        this._dispatchCalendarHeaderChangeEvent();
    }
    _handleKeyDownCalendarPrevMonthBtn(event) {
        if (!event.shiftKey || event.key !== "Tab")
            return;
        event.preventDefault();
        dispatchCustomEvent(this, "kuc:calendar-header-previous-shifttab");
    }
    _handleClickCalendarNextMonthBtn(event) {
        event.stopPropagation();
        const monthSelected = this.month;
        if (monthSelected === 12) {
            this.month = 1;
            this.year++;
        }
        else {
            this.month += 1;
        }
        this._dispatchCalendarHeaderChangeEvent();
    }
    _dispatchCalendarHeaderChangeEvent() {
        const year = this.year;
        const month = this.month;
        const detail = { value: `${year}-${month}` };
        dispatchCustomEvent(this, "kuc:calendar-header-change", detail);
    }
}
__decorate([
    property({ type: String, attribute: "lang", reflect: true })
], BaseDateTimeCalendarHeader.prototype, "language", void 0);
__decorate([
    property({
        type: Number,
        hasChanged(newVal) {
            return isValidMonth(newVal);
        },
    })
], BaseDateTimeCalendarHeader.prototype, "month", void 0);
__decorate([
    property({
        type: Number,
        hasChanged(newVal) {
            return isValidYear(newVal);
        },
    })
], BaseDateTimeCalendarHeader.prototype, "year", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-header-1-6-0__month")
], BaseDateTimeCalendarHeader.prototype, "_baseDateTimeHeaderMonthEl", void 0);
__decorate([
    query(".kuc-base-datetime-calendar-header-1-6-0__year")
], BaseDateTimeCalendarHeader.prototype, "_baseDateTimeHeaderYearEl", void 0);
__decorate([
    query(".kuc-base-datetime-header-month-1-6-0__listbox")
], BaseDateTimeCalendarHeader.prototype, "_listBoxMonthEl", void 0);
__decorate([
    query(".kuc-base-datetime-header-year-1-6-0__listbox")
], BaseDateTimeCalendarHeader.prototype, "_listBoxYearEl", void 0);
if (!window.customElements.get("kuc-base-datetime-calendar-header-1-6-0")) {
    createStyleOnHeader(CALENDAR_HEADER_CSS);
    window.customElements.define("kuc-base-datetime-calendar-header-1-6-0", BaseDateTimeCalendarHeader);
}
