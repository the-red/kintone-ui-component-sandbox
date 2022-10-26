var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property } from "lit/decorators.js";
import { createStyleOnHeader, dispatchCustomEvent, KucBase } from "../kuc-base";
import { visiblePropConverter } from "../converter";
import { PAGINATION_CSS } from "./style";
let exportPagination;
(() => {
    exportPagination = window.customElements.get("kuc-base-pagination-1-6-0");
    if (exportPagination) {
        return;
    }
    class BasePagination extends KucBase {
        constructor() {
            super(...arguments);
            this.isNext = true;
            this.isPrev = true;
            this.visible = true;
        }
        render() {
            return html `
        <div class="kuc-base-pagination-1-6-0__group" ?hidden="${!this.visible}">
          <button
            title="previous"
            class="kuc-base-pagination-1-6-0__group__pager-prev${this.isPrev
                ? ""
                : " kuc-base-pagination-1-6-0__group__pager-disable"}"
            type="button"
            @click="${this._handleClickPrevButton}"
          >
            ${this._getPrevButtonSvgTemplate()}</button
          ><button
            title="next"
            class="kuc-base-pagination-1-6-0__group__pager-next${this.isNext
                ? ""
                : " kuc-base-pagination-1-6-0__group__pager-disable"}"
            type="button"
            @click="${this._handleClickNextButton}"
          >
            ${this._getNextButtonSvgTemplate()}
          </button>
        </div>
      `;
        }
        _handleClickPrevButton(event) {
            event.stopPropagation();
            dispatchCustomEvent(this, "kuc:pagination-click-prev");
        }
        _handleClickNextButton(event) {
            event.stopPropagation();
            dispatchCustomEvent(this, "kuc:pagination-click-next");
        }
        _getPrevButtonSvgTemplate() {
            return svg `
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.99061 7.5L9 0.0604158L7.06632 0L0 7.5L7.06632 15L9 14.9396L1.99061 7.5Z"
            fill="#888888"
          />
        </svg>
      `;
        }
        _getNextButtonSvgTemplate() {
            return svg `
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.00939 7.5L0 0.0604158L1.93368 0L9 7.5L1.93368 15L0 14.9396L7.00939 7.5Z"
          fill="#888888"
        />
      </svg>
      `;
        }
    }
    __decorate([
        property({ type: Boolean })
    ], BasePagination.prototype, "isNext", void 0);
    __decorate([
        property({ type: Boolean })
    ], BasePagination.prototype, "isPrev", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], BasePagination.prototype, "visible", void 0);
    window.customElements.define("kuc-base-pagination-1-6-0", BasePagination);
    createStyleOnHeader(PAGINATION_CSS);
    exportPagination = BasePagination;
})();
const BasePagination = exportPagination;
export { BasePagination };
