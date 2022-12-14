var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, state, query } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../../kuc-base";
import { getWidthElmByContext } from "../../../context";
import { getLocale } from "../../../datetime/utils";
import { BASE_MOBILE_CALENDAR_HEADER_CSS } from "./style";
function isValidMonth(month) {
    return month > 0 && month < 13;
}
function isValidYear(year) {
    return year >= 0 && year < 10000;
}
export class BaseMobileDateTimeCalendarHeader extends KucBase {
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
        this._monthOptions = this._generateMonthOptions();
        this._yearOptions = this._generateYearOptions();
        super.update(changedProperties);
    }
    render() {
        return html `
      <div class="kuc-base-mobile-datetime-calendar-header-1-6-0__group">
        <button
          aria-label="previous month"
          type="button"
          class="kuc-base-mobile-datetime-calendar-header-1-6-0__group__button kuc-base-mobile-datetime-calendar-header-1-6-0__group__button--previous-month"
          @click="${this._handleClickCalendarPrevMonthBtn}"
        >
          ${this._getLeftArrowIconSvgTemplate()}
        </button>
        <div class="kuc-base-mobile-datetime-calendar-header-1-6-0__group__center">
          ${this._getYearMonthTemplate()}
        </div>
        <button
          aria-label="next month"
          type="button"
          class="kuc-base-mobile-datetime-calendar-header-1-6-0__group__button kuc-base-mobile-datetime-calendar-header-1-6-0__group__button--next-month"
          @click="${this._handleClickCalendarNextMonthBtn}"
        >
          ${this._getRightArrowIconSvgTemplate()}
        </button>
      </div>
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has("month")) {
            this._setSelectMonthWidth(this.month);
        }
        if (changedProperties.has("year")) {
            this._setYearSelectedIndex();
        }
        super.update(changedProperties);
    }
    _setSelectMonthWidth(month) {
        const optionText = this._monthOptions[month - 1].label;
        if (!optionText)
            return;
        const spanContext = document.createElement("span");
        spanContext.innerText = optionText;
        const optionWidth = getWidthElmByContext(spanContext);
        this._selectMonthEl.selectedIndex = this.month - 1;
        this._selectMonthEl.style.width = optionWidth + 35 + "px";
    }
    _setYearSelectedIndex() {
        if (this.year < 100) {
            this._selectYearEl.selectedIndex = this.year;
            return;
        }
        this._selectYearEl.selectedIndex = 100;
    }
    _generateMonthOptions() {
        return this._locale.MONTH_SELECT.map((month, index) => {
            const item = {
                value: `${index + 1}`,
                label: `${month}`,
            };
            return item;
        });
    }
    _generateYearOptions() {
        return this._getYearOptions().map((year) => {
            const item = {
                value: `${year}`,
                label: `${year}${this._locale.YEAR_SELECT_POSTFIX}`,
            };
            return item;
        });
    }
    _getYearOptions() {
        const options = [];
        if (!Number.isInteger(this.year)) {
            this.year = new Date().getFullYear();
        }
        let i = this.year < 100 ? 0 : this.year - 100;
        const maxYear = this.year >= 9999 - 100 ? 9999 : this.year + 100;
        if (i >= maxYear) {
            i = maxYear - 100;
        }
        for (i; i <= maxYear; i++) {
            options.push(i);
        }
        return options;
    }
    _getYearMonthTemplate() {
        return this.language === "zh" ||
            this.language === "ja" ||
            this.language === "zh-TW"
            ? html ` ${this._getYearTemplate()}${this._getMonthTemplate()} `
            : html ` ${this._getMonthTemplate()}${this._getYearTemplate()} `;
    }
    _handleChangeMonthDropdown(event) {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target;
        this.month = parseInt(target.value, 10);
        this._dispatchCalendarHeaderChangeEvent();
    }
    _handleChangeYearDropdown(event) {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target;
        this.year = parseInt(target.value, 10);
        this._dispatchCalendarHeaderChangeEvent();
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
        dispatchCustomEvent(this, "kuc:mobile-calendar-header-change", detail);
    }
    _getOptionsMonthTemplate() {
        return this._monthOptions.map((month) => html `
          <option
            ?selected="${parseInt(month.value, 10) === this.month}"
            value="${month.value}"
          >
            ${month.label}
          </option>
        `);
    }
    _getOptionsYearTemplate() {
        return this._yearOptions.map((year) => html `
          <option
            ?selected="${parseInt(year.value, 10) === this.year}"
            value="${year.value}"
          >
            ${year.label}
          </option>
        `);
    }
    _getMonthTemplate() {
        return html `
      <div
        class="kuc-base-mobile-datetime-calendar-header-1-6-0__group__center__month"
      >
        <select
          class="kuc-base-mobile-datetime-calendar-header-1-6-0__group__center__month__select"
          @change="${this._handleChangeMonthDropdown}"
        >
          ${this._getOptionsMonthTemplate()}
        </select>
      </div>
    `;
    }
    _getYearTemplate() {
        return html `
      <div
        class="kuc-base-mobile-datetime-calendar-header-1-6-0__group__center__year"
      >
        <select
          class="kuc-base-mobile-datetime-calendar-header-1-6-0__group__center__year__select"
          @change="${this._handleChangeYearDropdown}"
        >
          ${this._getOptionsYearTemplate()}
        </select>
      </div>
    `;
    }
    _getLeftArrowIconSvgTemplate() {
        return svg `
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.70788 11.9567C9.0984 12.3472 9.0984 12.9804 8.70788 13.3709C8.31735 13.7614 7.68419 13.7614 7.29366 13.3709L2.34392 8.42118L0.929703 7.00696L2.34392 5.59275L7.29366 0.643003C7.68419 0.25248 8.31735 0.25248 8.70788 0.643003C9.0984 1.03353 9.0984 1.66669 8.70788 2.05722L4.68709 6.07801L14.0718 6.07801C14.6241 6.07801 15.0718 6.52572 15.0718 7.07801C15.0718 7.63029 14.6241 8.07801 14.0718 8.07801L4.82917 8.07801L8.70788 11.9567Z"
        fill="#206694"
      />
    </svg>`;
    }
    _getRightArrowIconSvgTemplate() {
        return svg `
    <svg
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.29396 2.0572C6.90344 1.66668 6.90344 1.03351 7.29396 0.642991C7.68449 0.252466 8.31765 0.252467 8.70817 0.642991L13.6579 5.59274L15.0721 7.00695L13.6579 8.42117L8.70817 13.3709C8.31765 13.7614 7.68448 13.7614 7.29396 13.3709C6.90344 12.9804 6.90344 12.3472 7.29396 11.9567L11.3148 7.93591L1.93 7.93591C1.37772 7.93591 0.93 7.48819 0.93 6.93591C0.93 6.38362 1.37772 5.93591 1.93 5.93591L11.1727 5.93591L7.29396 2.0572Z"
        fill="#206694"
      />
    </svg>`;
    }
}
__decorate([
    property({ type: String, attribute: "lang", reflect: true })
], BaseMobileDateTimeCalendarHeader.prototype, "language", void 0);
__decorate([
    property({
        type: Number,
        hasChanged(newVal) {
            return isValidMonth(newVal);
        },
    })
], BaseMobileDateTimeCalendarHeader.prototype, "month", void 0);
__decorate([
    property({
        type: Number,
        hasChanged(newVal) {
            return isValidYear(newVal);
        },
    })
], BaseMobileDateTimeCalendarHeader.prototype, "year", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendarHeader.prototype, "_monthOptions", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendarHeader.prototype, "_yearOptions", void 0);
__decorate([
    query(".kuc-base-mobile-datetime-calendar-header-1-6-0__group__center__month__select")
], BaseMobileDateTimeCalendarHeader.prototype, "_selectMonthEl", void 0);
__decorate([
    query(".kuc-base-mobile-datetime-calendar-header-1-6-0__group__center__year__select")
], BaseMobileDateTimeCalendarHeader.prototype, "_selectYearEl", void 0);
if (!window.customElements.get("kuc-base-mobile-datetime-calendar-header-1-6-0")) {
    createStyleOnHeader(BASE_MOBILE_CALENDAR_HEADER_CSS);
    window.customElements.define("kuc-base-mobile-datetime-calendar-header-1-6-0", BaseMobileDateTimeCalendarHeader);
}
