var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable kuc-v1/no-kuc-class-prefix-1-6-0 */
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { visiblePropConverter } from "../base/converter";
import { validateProps, throwErrorAfterUpdateComplete, validateArrayProperty, validateFieldRequiredInColumnTable, validateFieldUniqueInColumnTable, } from "../base/validator";
import { ERROR_MESSAGE } from "../base/constant";
import { TABLE_CSS } from "./style";
const cellClassName = "kuc-table-1-6-0__table__body__row__cell-data";
const rowClassName = "kuc-table-1-6-0__table__body__row";
const cellActionsClassName = "kuc-table-1-6-0__table__body__row__action";
const btnAddRowClassName = "kuc-table-1-6-0__table__body__row__action-add";
const btnRemoveRowClassName = "kuc-table-1-6-0__table__body__row__action-remove";
const dAdd = "M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM12.0355 8.49997V7.49997H8.50008V3.96454H7.50008V7.49997H3.96443V8.49997H7.50008V12.0356H8.50008V8.49997H12.0355Z";
const fillAdd = "#3498db";
const dRemove = "M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM12.0355 7.49997V8.49997L3.96443 8.49997V7.49997H12.0355Z";
const fillRemove = "#b5b5b5";
let exportTable;
(() => {
    exportTable = window.customElements.get("kuc-table-1-6-0");
    if (exportTable) {
        return;
    }
    class KucTable extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.id = "";
            this.label = "";
            this.columns = [];
            this.data = [];
            this.actionButton = true;
            this.visible = true;
            if (!props)
                return;
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        shouldUpdate(_changedProperties) {
            if (_changedProperties.has("columns")) {
                const errorMessage = this._getErrorMessageWhenValidateColumns();
                if (errorMessage) {
                    throwErrorAfterUpdateComplete(this, errorMessage);
                    return false;
                }
            }
            if (_changedProperties.has("data") && !validateArrayProperty(this.data)) {
                const errorMessage = ERROR_MESSAGE.DATA_TABLE.IS_NOT_ARRAY;
                throwErrorAfterUpdateComplete(this, errorMessage);
                return false;
            }
            return true;
        }
        willUpdate(_changedProperties) {
            if (!this._tBody)
                return;
            this._tBody.innerHTML = "";
        }
        _getErrorMessageWhenValidateColumns() {
            if (!validateArrayProperty(this.columns)) {
                return ERROR_MESSAGE.COLUMNS.IS_NOT_ARRAY;
            }
            if (!validateFieldRequiredInColumnTable(this.columns)) {
                return ERROR_MESSAGE.COLUMNS.FIELD_REQUIRED;
            }
            if (validateFieldUniqueInColumnTable(this.columns)) {
                return ERROR_MESSAGE.COLUMNS.FIELD_UNIQUE;
            }
            return "";
        }
        render() {
            return !this.columns || this.columns.length < 1
                ? html `<table class="kuc-table-1-6-0__table">
            <caption class="kuc-table-1-6-0__table__label" ?hidden="${!this.label}">
              ${this.label}
            </caption>
          </table>`
                : html `
            <table class="kuc-table-1-6-0__table">
              <caption class="kuc-table-1-6-0__table__label" ?hidden="${!this.label}">
                ${this.label}
              </caption>
              <thead class="kuc-table-1-6-0__table__header">
                ${this._getTableHeaderTemplate()}
              </thead>
              <tbody class="kuc-table-1-6-0__table__body"></tbody>
            </table>
          `;
        }
        updated(_changedProperties) {
            if (this.columns.length === 0)
                return;
            for (let i = 0; i < this.data.length; i++) {
                this._addRowToTable(i, this.data[i]);
            }
        }
        _getTableHeaderTemplate() {
            return html `
        <tr>
          ${this.columns.map((column) => this._getColumnHeaderTemplate(column))}
        </tr>
      `;
        }
        _getColumnHeaderTemplate(column) {
            return html `
        <th
          class="kuc-table-1-6-0__table__header__cell"
          ?hidden="${column.visible === false}"
        ><!--
        -->${column.title || ""}<!--
        --><span
            class="kuc-base-label-1-6-0__required-icon"
            ?hidden="${!column.requiredIcon}"
          >*</span
        </th>
      `;
        }
        _getActionsCellWhenRemoveRow(currentRowIndex) {
            let actionsCell = null;
            let i = currentRowIndex;
            while (this.data.length > 1) {
                const currentRow = this._table.rows[i];
                if (!currentRow) {
                    i--;
                }
                else {
                    actionsCell = currentRow.cells[this.columns.length];
                    break;
                }
            }
            return actionsCell;
        }
        _getDefaultDataRow(data) {
            const defaultRowData = {};
            for (const key in data) {
                if (Object.prototype.hasOwnProperty.call(data, key)) {
                    if (Array.isArray(data[key])) {
                        defaultRowData[key] = [];
                        continue;
                    }
                    if (typeof data[key] === "object" && data[key] !== null) {
                        defaultRowData[key] = {};
                        continue;
                    }
                    defaultRowData[key] = "";
                }
            }
            return defaultRowData;
        }
        _addRowToTable(currentRowIndex, defaultRow) {
            var _a;
            const newRow = this._tBody.insertRow(currentRowIndex);
            newRow.classList.add(rowClassName);
            for (let i = 0; i < this.columns.length; i++) {
                const newCell = newRow.insertCell(i);
                const column = this.columns[i];
                newCell.classList.add(cellClassName);
                newCell.addEventListener("change", (event) => {
                    this._handleChangeCell(event, column.field);
                });
                newCell.hidden = !((_a = column.visible) !== null && _a !== void 0 ? _a : true);
                const cellTemplate = column.render
                    ? column.render(defaultRow[column.field], defaultRow, currentRowIndex)
                    : defaultRow[column.field];
                if (cellTemplate && cellTemplate.nodeType) {
                    newCell.appendChild(cellTemplate);
                }
                else {
                    newCell.innerText = cellTemplate || "";
                }
            }
            if (!this.actionButton)
                return;
            this._addActionsCellToNewRow(newRow);
        }
        _handleChangeCell(event, field) {
            event.stopPropagation();
            const oldData = this._deepCloneObject(this.data);
            const currentRow = event.currentTarget
                .parentElement;
            const dataIndex = currentRow.rowIndex - 1;
            const dataRow = this.data[dataIndex];
            if (field in dataRow) {
                let _newValue = event.target.value;
                if ("detail" in event) {
                    _newValue = event.detail.value;
                }
                dataRow[field] = _newValue;
            }
            const data = {
                type: "change-cell",
                rowIndex: dataIndex,
                data: this._deepCloneObject(this.data),
                oldData: oldData,
                field: field,
            };
            this._dispatchChangeEvent(data);
        }
        _handleAddRow(currentRowIndex) {
            const oldData = this._deepCloneObject(this.data);
            const defaultDataRow = this._getDefaultDataRow(this.data[0]);
            this._addRowToTable(currentRowIndex, defaultDataRow);
            this.data.splice(currentRowIndex, 0, defaultDataRow);
            const data = {
                type: "add-row",
                rowIndex: currentRowIndex,
                data: this._deepCloneObject(this.data),
                oldData: oldData,
            };
            this._dispatchChangeEvent(data);
            this._toggleRemoveRowButton();
        }
        _handleRemoveRow(currentRowIndex) {
            if (this.data.length === 1)
                return;
            const dataIndexRemoved = currentRowIndex - 1;
            const oldData = this._deepCloneObject(this.data);
            this._table.deleteRow(currentRowIndex);
            this.data.splice(dataIndexRemoved, 1);
            const data = {
                type: "remove-row",
                rowIndex: dataIndexRemoved,
                data: this._deepCloneObject(this.data),
                oldData: oldData,
            };
            this._dispatchChangeEvent(data);
            this._toggleRemoveRowButton();
            this._focusActionsButtonWhenRemoveRow(currentRowIndex);
        }
        _focusActionsButtonWhenRemoveRow(currentRowIndex) {
            const actionsCell = this._getActionsCellWhenRemoveRow(currentRowIndex);
            if (actionsCell) {
                this._focusRemoveRowButton(actionsCell);
                return;
            }
            this._focusFirstAddRowButton();
        }
        _focusRemoveRowButton(actionsCell) {
            const removeRowButton = actionsCell.querySelector(`.${btnRemoveRowClassName}`);
            removeRowButton.focus();
        }
        _focusFirstAddRowButton() {
            const firstActionsCell = this._table.rows[1].cells[this.columns.length];
            const addRowButton = firstActionsCell.querySelector(`.${btnAddRowClassName}`);
            addRowButton.focus();
        }
        _toggleRemoveRowButton() {
            const removeButtons = this._tBody.querySelectorAll(`.${btnRemoveRowClassName}`);
            const firstRemoveButton = removeButtons[0];
            if (this.data.length === 1) {
                firstRemoveButton.style.display = "none";
                return;
            }
            for (const removeButton of removeButtons) {
                removeButton.style.display = "block";
            }
        }
        _getSvgDOM(fillPath, dPath) {
            const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            iconSvg.setAttribute("fill", "none");
            iconSvg.setAttribute("width", "18");
            iconSvg.setAttribute("height", "18");
            iconSvg.setAttribute("viewBox", "0 0 16 16");
            const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            iconPath.setAttribute("d", dPath);
            iconPath.setAttribute("fill-rule", "evenodd");
            iconPath.setAttribute("clip-rule", "evenodd");
            iconPath.setAttribute("fill", fillPath);
            iconSvg.appendChild(iconPath);
            return iconSvg;
        }
        _addActionsCellToNewRow(newRow) {
            const newCell = newRow.insertCell(this.columns.length);
            newCell.classList.add(cellActionsClassName);
            const btnAddDOM = this._getActionButtonDOM("add", newRow);
            const btnRemoveDOM = this._getActionButtonDOM("remove", newRow);
            newCell.appendChild(btnAddDOM);
            newCell.appendChild(btnRemoveDOM);
            if (this.data.length === 1) {
                btnRemoveDOM.style.display = "none";
            }
        }
        _getActionButtonDOM(type, newRow) {
            const isAdd = type === "add";
            const className = isAdd ? btnAddRowClassName : btnRemoveRowClassName;
            const fillPath = isAdd ? fillAdd : fillRemove;
            const dPath = isAdd ? dAdd : dRemove;
            const svgEl = this._getSvgDOM(fillPath, dPath);
            const buttonAction = document.createElement("button");
            buttonAction.classList.add(className);
            buttonAction.appendChild(svgEl);
            buttonAction.addEventListener("click", () => {
                if (isAdd) {
                    this._handleAddRow(newRow.rowIndex);
                    return;
                }
                this._handleRemoveRow(newRow.rowIndex);
            });
            return buttonAction;
        }
        _deepCloneObject(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        _dispatchChangeEvent(_detail) {
            const detail = _detail;
            dispatchCustomEvent(this, "change", detail);
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucTable.prototype, "className", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucTable.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucTable.prototype, "label", void 0);
    __decorate([
        property({ type: Array })
    ], KucTable.prototype, "columns", void 0);
    __decorate([
        property({ type: Array })
    ], KucTable.prototype, "data", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucTable.prototype, "actionButton", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucTable.prototype, "visible", void 0);
    __decorate([
        query(".kuc-table-1-6-0__table")
    ], KucTable.prototype, "_table", void 0);
    __decorate([
        query(".kuc-table-1-6-0__table__body")
    ], KucTable.prototype, "_tBody", void 0);
    window.customElements.define("kuc-table-1-6-0", KucTable);
    createStyleOnHeader(TABLE_CSS);
    exportTable = KucTable;
})();
const Table = exportTable;
export { Table };
