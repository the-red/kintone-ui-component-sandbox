var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from "lit";
import { property, state } from "lit/decorators.js";
import { visiblePropConverter } from "../base/converter";
import { ERROR_MESSAGE } from "../base/constant";
import { createStyleOnHeader, KucBase } from "../base/kuc-base";
import { throwErrorAfterUpdateComplete, validateColumns, validateData, validateProps, validateRowsPerPage, } from "../base/validator";
import "../base/pagination";
import { READ_ONLY_TABLE_CSS } from "./style";
let exportReadOnlyTable;
(() => {
    exportReadOnlyTable = window.customElements.get("kuc-readonly-table-1-6-0");
    if (exportReadOnlyTable) {
        return;
    }
    class KucReadOnlyTable extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.id = "";
            this.label = "";
            this.columns = [];
            this.data = [];
            this.pagination = true;
            this.rowsPerPage = 5;
            this.visible = true;
            this._pagePosition = 1;
            this._columnOrder = [];
            if (!props)
                return;
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        shouldUpdate(changedProperties) {
            if (changedProperties.has("columns") && !validateColumns(this.columns)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.COLUMNS.IS_NOT_ARRAY);
                return false;
            }
            if (changedProperties.has("data") && !validateData(this.data)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.DATA.IS_NOT_ARRAY);
                return false;
            }
            if (changedProperties.has("rowsPerPage") &&
                !validateRowsPerPage(this.rowsPerPage)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.ROWS_PER_PAGE.INVALID);
                return false;
            }
            return true;
        }
        willUpdate(changedProperties) {
            if (changedProperties.has("columns")) {
                this._columnOrder = [];
                this.columns.map((col) => this._columnOrder.push(col.field ? col.field : ""));
            }
            if (changedProperties.has("rowsPerPage")) {
                this.rowsPerPage = Math.round(this.rowsPerPage);
            }
        }
        render() {
            const currentPageData = this._createDisplayData();
            return !this.columns || this.columns.length < 1
                ? html `
            <table class="kuc-readonly-table-1-6-0__table">
              <caption
                class="kuc-readonly-table-1-6-0__table__label"
                ?hidden="${!this.label}"
              >
                ${this.label}
              </caption>
            </table>
          `
                : html `
            <table class="kuc-readonly-table-1-6-0__table">
              <caption
                class="kuc-readonly-table-1-6-0__table__label"
                ?hidden="${!this.label}"
              >
                ${this.label}
              </caption>
              <thead class="kuc-readonly-table-1-6-0__table__header">
                <tr>
                  ${this.columns.map((column) => this._getColumnsTemplate(column))}
                </tr>
              </thead>
              <tbody class="kuc-readonly-table-1-6-0__table__body">
                ${currentPageData.map((data, currentIndex) => {
                    return this._getDataTemplate(data, currentIndex);
                })}
              </tbody>
            </table>
            <kuc-base-pagination-1-6-0
              .visible="${this.pagination}"
              .isPrev="${this._toggleDisplayPreviousButton()}"
              .isNext="${this._toggleDisplayNextButton()}"
              @kuc:pagination-click-prev=${this._handleClickPreviousButton}
              @kuc:pagination-click-next=${this._handleClickNextButton}
            ></kuc-base-pagination-1-6-0>
          `;
        }
        _createDisplayData() {
            if (!this.pagination)
                return this.data;
            const firstRow = (this._pagePosition - 1) * this.rowsPerPage + 1;
            const lastRow = this._pagePosition * this.rowsPerPage;
            const displayData = this.data.filter((_element, index) => index >= firstRow - 1 && index <= lastRow - 1);
            return displayData;
        }
        _getColumnsTemplate(column) {
            return html `
        <th
          class="kuc-readonly-table-1-6-0__table__header__cell"
          ?hidden="${column.visible === false}"
        >
          ${column.title || ""}
        </th>
      `;
        }
        _getDataTemplate(data, currentIndex) {
            return html `
        <tr
          class="kuc-readonly-table-1-6-0__table__body__row kuc-readonly-table-1-6-0__table__body__row-${currentIndex}"
        >
          ${this._columnOrder.map((currentCol, colIndex) => {
                var _a;
                const visible = (_a = this.columns[colIndex].visible) !== null && _a !== void 0 ? _a : true;
                const value = data[currentCol];
                /* eslint-disable */
                return html `<td class="kuc-readonly-table-1-6-0__table__body__row__cell-data" ?hidden="${!visible}">${value}</td>`;
                /* eslint-enable */
            })}
        </tr>
      `;
        }
        _toggleDisplayPreviousButton() {
            return this._pagePosition > 1;
        }
        _toggleDisplayNextButton() {
            return this._pagePosition < this.data.length / this.rowsPerPage;
        }
        _handleClickPreviousButton(_event) {
            if (this._pagePosition < 2)
                return;
            if (!validateRowsPerPage(this.rowsPerPage)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.ROWS_PER_PAGE.INVALID);
                return;
            }
            this._pagePosition -= 1;
        }
        _handleClickNextButton(_event) {
            if (!validateRowsPerPage(this.rowsPerPage)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.ROWS_PER_PAGE.INVALID);
                return;
            }
            this._pagePosition += 1;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucReadOnlyTable.prototype, "className", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucReadOnlyTable.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucReadOnlyTable.prototype, "label", void 0);
    __decorate([
        property({ type: Array })
    ], KucReadOnlyTable.prototype, "columns", void 0);
    __decorate([
        property({ type: Array })
    ], KucReadOnlyTable.prototype, "data", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucReadOnlyTable.prototype, "pagination", void 0);
    __decorate([
        property({ type: Number })
    ], KucReadOnlyTable.prototype, "rowsPerPage", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucReadOnlyTable.prototype, "visible", void 0);
    __decorate([
        state()
    ], KucReadOnlyTable.prototype, "_pagePosition", void 0);
    __decorate([
        state()
    ], KucReadOnlyTable.prototype, "_columnOrder", void 0);
    window.customElements.define("kuc-readonly-table-1-6-0", KucReadOnlyTable);
    createStyleOnHeader(READ_ONLY_TABLE_CSS);
    exportReadOnlyTable = KucReadOnlyTable;
})();
const ReadOnlyTable = exportReadOnlyTable;
export { ReadOnlyTable };
