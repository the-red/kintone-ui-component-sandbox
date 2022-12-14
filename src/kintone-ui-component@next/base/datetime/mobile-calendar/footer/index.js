var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../../kuc-base";
import { getLocale } from "../../../datetime/utils";
import { BASE_MOBILE_CALENDAR_FOOTER_CSS } from "./style";
export class BaseMobileDateTimeCalendarFooter extends KucBase {
    constructor() {
        super(...arguments);
        this.language = "en";
        this._locale = getLocale("en");
    }
    update(changedProperties) {
        if (changedProperties.has("language")) {
            this._locale = getLocale(this.language);
        }
        super.update(changedProperties);
    }
    _handleClickCalendarFooterButtonClose(event) {
        event.stopPropagation();
        dispatchCustomEvent(this, "kuc:mobile-calendar-footer-click-close");
    }
    _handleClickCalendarFooterButtonNone(event) {
        event.stopPropagation();
        dispatchCustomEvent(this, "kuc:mobile-calendar-footer-click-none");
    }
    _handleClickCalendarFooterButtonToday(event) {
        event.stopPropagation();
        dispatchCustomEvent(this, "kuc:mobile-calendar-footer-click-today");
    }
    render() {
        return html `
      <div class="kuc-base-mobile-datetime-calendar-footer-1-6-0__group">
        <button
          type="button"
          class="kuc-base-mobile-datetime-calendar-footer-1-6-0__group__button kuc-base-mobile-datetime-calendar-footer-1-6-0__group__button--today"
          @click="${this._handleClickCalendarFooterButtonToday}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.today}
        </button>
        <button
          type="button"
          class="kuc-base-mobile-datetime-calendar-footer-1-6-0__group__button kuc-base-mobile-datetime-calendar-footer-1-6-0__group__button--none"
          @click="${this._handleClickCalendarFooterButtonNone}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.none}
        </button>
        <button
          type="button"
          class="kuc-base-mobile-datetime-calendar-footer-1-6-0__group__button kuc-base-mobile-datetime-calendar-footer-1-6-0__group__button--close"
          @click="${this._handleClickCalendarFooterButtonClose}"
        >
          ${this._locale.CALENDAR_FOOTER_TEXT.close}
        </button>
      </div>
    `;
    }
}
__decorate([
    property({ type: String, attribute: "lang", reflect: true })
], BaseMobileDateTimeCalendarFooter.prototype, "language", void 0);
__decorate([
    state()
], BaseMobileDateTimeCalendarFooter.prototype, "_locale", void 0);
if (!window.customElements.get("kuc-base-mobile-datetime-calendar-footer-1-6-0")) {
    createStyleOnHeader(BASE_MOBILE_CALENDAR_FOOTER_CSS);
    window.customElements.define("kuc-base-mobile-datetime-calendar-footer-1-6-0", BaseMobileDateTimeCalendarFooter);
}
