var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { state, property } from "lit/decorators.js";
import { KucBase, createStyleOnHeader } from "../../kuc-base";
import { getTodayStringByLocale } from "../../datetime/utils";
import "./header";
import "./body";
import "./footer";
import { BASE_MOBILE_CALENDAR } from "./style";
export class BaseMobileDateTimeCalendar extends KucBase {
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
        class="kuc-base-mobile-datetime-calendar-1-6-0__group"
        role="dialog"
        aria-modal="true"
        aria-label="Calender"
        @click="${this._handleClickCalendarGroup}"
      >
        <kuc-base-mobile-datetime-calendar-header-1-6-0
          .year="${this._year}"
          .month="${this._month}"
          .language="${this.language}"
          @kuc:mobile-calendar-header-change="${this
            ._handleCalendarHeaderChange}"
        ></kuc-base-mobile-datetime-calendar-header-1-6-0>
        <kuc-base-mobile-datetime-calendar-body-1-6-0
          .year="${this._year}"
          .month="${this._month}"
          .value="${this.value}"
          .language="${this.language}"
        ></kuc-base-mobile-datetime-calendar-body-1-6-0>
        <kuc-base-mobile-datetime-calendar-footer-1-6-0
          .language="${this.language}"
        ></kuc-base-mobile-datetime-calendar-footer-1-6-0>
      </div>
    `;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
    }
    _handleClickCalendarGroup(event) {
        event.stopPropagation();
    }
    _handleCalendarHeaderChange(event) {
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
], BaseMobileDateTimeCalendar.prototype, "language", void 0);
__decorate([
    property({ type: String, reflect: true })
], BaseMobileDateTimeCalendar.prototype, "value", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendar.prototype, "_month", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendar.prototype, "_year", void 0);
if (!window.customElements.get("kuc-base-mobile-datetime-calendar-1-6-0")) {
    createStyleOnHeader(BASE_MOBILE_CALENDAR);
    window.customElements.define("kuc-base-mobile-datetime-calendar-1-6-0", BaseMobileDateTimeCalendar);
}
