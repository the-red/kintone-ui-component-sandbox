var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, state, queryAll, query } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { visiblePropConverter } from "../base/converter";
import { getWidthElmByContext } from "../base/context";
import { validateProps, validateItems, validateValueString, validateSelectedIndexNumber, throwErrorAfterUpdateComplete, } from "../base/validator";
import { ERROR_MESSAGE } from "../base/constant";
import { DROPDOWN_CSS } from "./style";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
export { BaseError, BaseLabel };
let exportDropdown;
(() => {
    exportDropdown = window.customElements.get("kuc-dropdown-1-6-0");
    if (exportDropdown) {
        return;
    }
    class KucDropdown extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.error = "";
            this.id = "";
            this.label = "";
            this.value = "";
            this.selectedIndex = -1;
            this.disabled = false;
            this.requiredIcon = false;
            this.visible = true;
            this.items = [];
            this._selectorVisible = false;
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            this._handleClickDocument = this._handleClickDocument.bind(this);
            this._setInitialValue(validProps);
            Object.assign(this, validProps);
        }
        _setInitialValue(validProps) {
            const hasValue = "value" in validProps;
            const hasSelectedIndex = "selectedIndex" in validProps;
            if (!hasValue && hasSelectedIndex) {
                this.value = this._getValue(validProps) || "";
            }
        }
        _getSelectedLabel() {
            const items = this.items.filter((item, index) => this._isCheckedItem(item, index));
            if (items.length === 0)
                return "";
            return items[0].label === undefined ? items[0].value : items[0].label;
        }
        _getToggleIconSvgTemplate() {
            return svg `
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.2122 15.6665L25 16.1392L19.7332 21.4998H18.2668L13 16.1392L13.7878 15.6665L18.765 20.6866H19.235L24.2122 15.6665Z"
          fill="#3498db"/>
      </svg>
    `;
        }
        shouldUpdate(changedProperties) {
            if (changedProperties.has("items")) {
                if (!validateItems(this.items)) {
                    throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.ITEMS.IS_NOT_ARRAY);
                    return false;
                }
            }
            if (changedProperties.has("value")) {
                if (!validateValueString(this.value)) {
                    throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.VALUE.IS_NOT_STRING);
                    return false;
                }
            }
            if (changedProperties.has("selectedIndex")) {
                if (!validateSelectedIndexNumber(this.selectedIndex)) {
                    throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.SELECTED_INDEX.IS_NOT_NUMBER);
                    return false;
                }
            }
            return true;
        }
        willUpdate(changedProperties) {
            if (changedProperties.has("value")) {
                if (this.value !== "")
                    return;
                this.selectedIndex = -1;
            }
        }
        update(changedProperties) {
            if (changedProperties.has("items") ||
                changedProperties.has("value") ||
                changedProperties.has("selectedIndex")) {
                this.selectedIndex = this._getSelectedIndex();
                this.value =
                    this._getValue({
                        items: this.items,
                        selectedIndex: this.selectedIndex,
                    }) || "";
            }
            super.update(changedProperties);
        }
        _getSelectedIndex() {
            if (!this.value) {
                if (this.items[this.selectedIndex])
                    return this.selectedIndex;
                return -1;
            }
            const firstIndex = this.items.findIndex((item) => item.value === this.value);
            if (firstIndex === -1)
                return -1;
            const selectedIndex = this.items.findIndex((item, index) => item.value === this.value && index === this.selectedIndex);
            return selectedIndex > -1 ? selectedIndex : firstIndex;
        }
        _getValue(validProps) {
            const _items = validProps.items || [];
            const _selectedIndex = validProps.selectedIndex === 0 || validProps.selectedIndex
                ? validProps.selectedIndex
                : -1;
            const item = _items[_selectedIndex];
            if (!item)
                return "";
            return item.value;
        }
        render() {
            return html `
        <div class="kuc-dropdown-1-6-0__group">
          <div
            class="kuc-dropdown-1-6-0__group__label"
            id="${this._GUID}-label"
            ?hidden="${!this.label}"
          >
            <kuc-base-label-1-6-0
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-6-0>
          </div>
          <button
            class="kuc-dropdown-1-6-0__group__toggle"
            id="${this._GUID}-toggle"
            type="button"
            aria-haspopup="true"
            aria-labelledby="${this._GUID}-label ${this._GUID}-toggle"
            aria-describedby="${this._GUID}-error"
            aria-required="${this.requiredIcon}"
            ?disabled="${this.disabled}"
            @mouseup="${this._handleMouseUpDropdownToggle}"
            @mousedown="${this._handleMouseDownDropdownToggle}"
            @click="${this._handleClickDropdownToggle}"
            @keydown="${this._handleKeyDownDropdownToggle}"
          >
            <span class="kuc-dropdown-1-6-0__group__toggle__selected-item-label"
              >${this._getSelectedLabel()}</span
            >
            <span class="kuc-dropdown-1-6-0__group__toggle__icon">
              ${this._getToggleIconSvgTemplate()}
            </span>
          </button>
          <ul
            class="kuc-dropdown-1-6-0__group__select-menu"
            role="listbox"
            aria-hidden="${!this._selectorVisible}"
            ?hidden="${!this._selectorVisible}"
            @mouseleave="${this._handleMouseLeaveMenu}"
            @mousedown="${this._handleMouseDownMenu}"
          >
            ${this.items.map((item, number) => this._getItemTemplate(item, number))}
          </ul>
          <kuc-base-error-1-6-0
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
            ariaLive="assertive"
          ></kuc-base-error-1-6-0>
        </div>
      `;
        }
        firstUpdated() {
            window.addEventListener("resize", () => {
                this._actionResizeScrollWindow();
            });
            window.addEventListener("scroll", () => {
                this._actionResizeScrollWindow();
            });
        }
        async updated() {
            await this.updateComplete;
            this._updateContainerWidth();
            if (this._selectorVisible) {
                this._setMenuPosition();
                this._scrollToView();
                setTimeout(() => {
                    document.addEventListener("click", this._handleClickDocument, true);
                }, 1);
            }
            else {
                setTimeout(() => {
                    document.removeEventListener("click", this._handleClickDocument, true);
                }, 1);
            }
        }
        _handleMouseDownDropdownItem(event) {
            const itemEl = event.target;
            const value = itemEl.getAttribute("value");
            const selectedIndex = itemEl.dataset.index || "0";
            this._actionUpdateValue(value, selectedIndex);
        }
        _handleMouseOverDropdownItem(event) {
            const itemEl = event.target;
            this._actionHighlightMenuItem(itemEl);
        }
        _handleMouseLeaveMenu() {
            this._actionClearAllHighlightMenuItem();
        }
        _handleMouseDownMenu(event) {
            event.preventDefault();
        }
        _handleMouseDownDropdownToggle(event) {
            event.preventDefault();
        }
        _handleMouseUpDropdownToggle(event) {
            event.preventDefault();
        }
        _handleClickDropdownToggle(event) {
            event.stopPropagation();
            this._actionToggleMenu();
        }
        _handleClickDocument(event) {
            if (event.target === this._buttonEl ||
                this._buttonEl.contains(event.target)) {
                event.stopPropagation();
            }
            this._actionHideMenu();
        }
        _handleKeyDownDropdownToggle(event) {
            switch (event.key) {
                case "Up": // IE/Edge specific value
                case "ArrowUp": {
                    event.preventDefault();
                    if (!this._selectorVisible) {
                        this._actionShowMenu();
                        break;
                    }
                    this._actionHighlightPrevMenuItem();
                    break;
                }
                case "Tab":
                    if (this._selectorVisible) {
                        this._actionHideMenu();
                    }
                    break;
                case "Down": // IE/Edge specific value
                case "ArrowDown": {
                    event.preventDefault();
                    if (!this._selectorVisible) {
                        this._actionShowMenu();
                        break;
                    }
                    this._actionHighlightNextMenuItem();
                    break;
                }
                case "Enter": {
                    event.preventDefault();
                    if (!this._selectorVisible) {
                        this._actionShowMenu();
                        break;
                    }
                    const itemEl = this._highlightItemEl;
                    if (itemEl === null)
                        break;
                    const value = itemEl.getAttribute("value");
                    const selectedIndex = itemEl.dataset.index || "0";
                    this._actionUpdateValue(value, selectedIndex);
                    this._actionHideMenu();
                    break;
                }
                case "Escape": {
                    event.preventDefault();
                    if (this._selectorVisible) {
                        event.stopPropagation();
                    }
                    this._actionHideMenu();
                    break;
                }
                case "Home": {
                    if (this._selectorVisible) {
                        event.preventDefault();
                        this._actionHighlightFirstMenuItem();
                    }
                    break;
                }
                case "End": {
                    if (this._selectorVisible) {
                        event.preventDefault();
                        this._actionHighlightLastMenuItem();
                    }
                    break;
                }
                default:
                    break;
            }
        }
        _actionShowMenu() {
            this._buttonEl.focus();
            this._selectorVisible = true;
            if (this._selectedItemEl === null)
                return;
            this._setHighlightAndActiveDescendantMenu(this._selectedItemEl);
        }
        _actionHideMenu() {
            this._selectorVisible = false;
            this._actionRemoveActiveDescendant();
        }
        _actionToggleMenu() {
            if (this._selectorVisible) {
                this._actionHideMenu();
                return;
            }
            this._actionShowMenu();
        }
        _actionHighlightFirstMenuItem() {
            this._setHighlightAndActiveDescendantMenu(this._firstItemEl);
        }
        _actionHighlightLastMenuItem() {
            this._setHighlightAndActiveDescendantMenu(this._lastItemEl);
        }
        _actionHighlightPrevMenuItem() {
            let prevItem = null;
            if (this._highlightItemEl !== null) {
                prevItem = this._highlightItemEl
                    .previousElementSibling;
                this._highlightItemEl.classList.remove("kuc-dropdown-1-6-0__group__select-menu__highlight");
            }
            if (prevItem === null) {
                prevItem = this._lastItemEl;
            }
            this._setHighlightAndActiveDescendantMenu(prevItem);
        }
        _actionHighlightNextMenuItem() {
            let nextItem = null;
            if (this._highlightItemEl !== null) {
                nextItem = this._highlightItemEl.nextElementSibling;
                this._highlightItemEl.classList.remove("kuc-dropdown-1-6-0__group__select-menu__highlight");
            }
            if (nextItem === null) {
                nextItem = this._firstItemEl;
            }
            this._setHighlightAndActiveDescendantMenu(nextItem);
        }
        _actionClearAllHighlightMenuItem() {
            this._itemsEl.forEach((itemEl) => {
                itemEl.classList.remove("kuc-dropdown-1-6-0__group__select-menu__highlight");
            });
            this._actionRemoveActiveDescendant();
        }
        _setHighlightAndActiveDescendantMenu(selectedItemEl) {
            this._actionHighlightMenuItem(selectedItemEl);
            this._actionSetActiveDescendant(selectedItemEl.id);
            this._scrollToView();
        }
        _actionHighlightMenuItem(item) {
            this._actionClearAllHighlightMenuItem();
            item.classList.add("kuc-dropdown-1-6-0__group__select-menu__highlight");
        }
        _actionUpdateValue(value, index) {
            const indexNumber = parseInt(index, 10);
            if (this.value === value && this.selectedIndex === indexNumber)
                return;
            const detail = { oldValue: this.value, value: value };
            this.value = value;
            this.selectedIndex = indexNumber;
            dispatchCustomEvent(this, "change", detail);
        }
        _actionSetActiveDescendant(value) {
            if (value !== undefined && this._buttonEl !== null) {
                this._buttonEl.setAttribute("aria-activedescendant", value);
            }
        }
        _actionRemoveActiveDescendant() {
            this._buttonEl.removeAttribute("aria-activedescendant");
        }
        _updateContainerWidth() {
            const MIN_WIDTH = 180;
            let labelWidth = this._labelEl.getBoundingClientRect().width;
            if (labelWidth === 0)
                labelWidth = getWidthElmByContext(this._labelEl);
            labelWidth = labelWidth > MIN_WIDTH ? labelWidth : MIN_WIDTH;
            this._groupEl.style.width = labelWidth + "px";
        }
        _getScrollbarWidthHeight() {
            const scrollDiv = document.createElement("div");
            scrollDiv.style.cssText =
                "overflow: scroll; position: absolute; top: -9999px;";
            document.body.appendChild(scrollDiv);
            const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            const scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
            document.body.removeChild(scrollDiv);
            return { scrollbarWidth, scrollbarHeight };
        }
        _getDistanceToggleButton() {
            const { scrollbarWidth, scrollbarHeight } = this._getScrollbarWidthHeight();
            const isWindowRightScrollbarShow = document.body.scrollHeight > window.innerHeight;
            const isWindowBottomScrollbarShow = document.body.scrollWidth > window.innerWidth;
            const toTop = this._buttonEl.getBoundingClientRect().top;
            const toBottom = window.innerHeight -
                this._buttonEl.getBoundingClientRect().bottom -
                (isWindowBottomScrollbarShow ? scrollbarHeight : 0);
            const toLeft = this._buttonEl.getBoundingClientRect().left;
            const toRight = window.innerWidth -
                this._buttonEl.getBoundingClientRect().left -
                (isWindowRightScrollbarShow ? scrollbarWidth : 0);
            return { toTop, toBottom, toLeft, toRight };
        }
        _setMenuPositionAboveOrBelow() {
            this._menuEl.style.height = "auto";
            this._menuEl.style.bottom = "auto";
            this._menuEl.style.overflowY = "";
            const menuHeight = this._menuEl.getBoundingClientRect().height;
            const distanceToggleButton = this._getDistanceToggleButton();
            if (distanceToggleButton.toBottom >= menuHeight)
                return;
            if (distanceToggleButton.toBottom < distanceToggleButton.toTop) {
                // Above
                const errorHeight = this._errorEl.offsetHeight
                    ? this._errorEl.offsetHeight + 16
                    : 0;
                this._menuEl.style.bottom = `${this._buttonEl.offsetHeight + errorHeight}px`;
                if (distanceToggleButton.toTop >= menuHeight)
                    return;
                this._menuEl.style.height = `${distanceToggleButton.toTop}px`;
                this._menuEl.style.overflowY = "scroll";
            }
            else {
                // Below
                this._menuEl.style.height = `${distanceToggleButton.toBottom}px`;
                this._menuEl.style.overflowY = "scroll";
            }
        }
        _setMenuPositionLeftOrRight() {
            this._menuEl.style.right = "auto";
            const menuWidth = this._menuEl.getBoundingClientRect().width;
            const distanceToggleButton = this._getDistanceToggleButton();
            if (
            // Right
            distanceToggleButton.toRight >= menuWidth ||
                distanceToggleButton.toLeft < menuWidth ||
                distanceToggleButton.toRight < 0)
                return;
            // Left
            const right = this._buttonEl.offsetWidth - distanceToggleButton.toRight;
            this._menuEl.style.right = right > 0 ? `${right}px` : "0px";
        }
        _setMenuPosition() {
            this._setMenuPositionAboveOrBelow();
            this._setMenuPositionLeftOrRight();
        }
        _scrollToView() {
            if (!this._highlightItemEl || !this._menuEl)
                return;
            const menuElClientRect = this._menuEl.getBoundingClientRect();
            const highlightItemClientRect = this._highlightItemEl.getBoundingClientRect();
            if (highlightItemClientRect.top < menuElClientRect.top) {
                this._menuEl.scrollTop -=
                    menuElClientRect.top - highlightItemClientRect.top;
            }
            if (menuElClientRect.bottom < highlightItemClientRect.bottom) {
                this._menuEl.scrollTop +=
                    highlightItemClientRect.bottom - menuElClientRect.bottom;
            }
        }
        _actionResizeScrollWindow() {
            if (this._timeoutID || !this._selectorVisible)
                return;
            this._timeoutID = window.setTimeout(() => {
                this._timeoutID = null;
                this._setMenuPosition();
            }, 50);
        }
        _isCheckedItem(item, index) {
            if (!this.value)
                return this.selectedIndex === index;
            return item.value === this.value && this.selectedIndex === index;
        }
        _getItemTemplate(item, index) {
            const isCheckedItem = this._isCheckedItem(item, index);
            return html `
        <li
          class="kuc-dropdown-1-6-0__group__select-menu__item"
          role="option"
          tabindex="${isCheckedItem ? "0" : "-1"}"
          aria-selected="${isCheckedItem ? "true" : "false"}"
          data-index="${index}"
          value="${item.value !== undefined ? item.value : ""}"
          id="${this._GUID}-menuitem-${index}"
          @mousedown="${this._handleMouseDownDropdownItem}"
          @mouseover="${this._handleMouseOverDropdownItem}"
        >
          ${this._getDropdownIconSvgTemplate(isCheckedItem)}
          ${item.label === undefined ? item.value : item.label}
        </li>
      `;
        }
        _getDropdownIconSvgTemplate(checked) {
            return svg `
      ${checked
                ? svg `<svg
          class="kuc-dropdown-1-6-0__group__select-menu__item__icon"
          width="11"
          height="9"
          viewBox="0 0 11 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 5L1.5 3L4.5 5.5L9.5 0L11 1.5L4.5 8.5L0 5Z"
            fill="#3498db"/>
        </svg>`
                : ""}`;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucDropdown.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucDropdown.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucDropdown.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucDropdown.prototype, "label", void 0);
    __decorate([
        property({ type: String })
    ], KucDropdown.prototype, "value", void 0);
    __decorate([
        property({ type: Number })
    ], KucDropdown.prototype, "selectedIndex", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucDropdown.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucDropdown.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucDropdown.prototype, "visible", void 0);
    __decorate([
        property({ type: Array })
    ], KucDropdown.prototype, "items", void 0);
    __decorate([
        state()
    ], KucDropdown.prototype, "_selectorVisible", void 0);
    __decorate([
        query(".kuc-dropdown-1-6-0__group")
    ], KucDropdown.prototype, "_groupEl", void 0);
    __decorate([
        query(".kuc-dropdown-1-6-0__group__select-menu")
    ], KucDropdown.prototype, "_menuEl", void 0);
    __decorate([
        queryAll(".kuc-dropdown-1-6-0__group__select-menu__item")
    ], KucDropdown.prototype, "_itemsEl", void 0);
    __decorate([
        query("button.kuc-dropdown-1-6-0__group__toggle")
    ], KucDropdown.prototype, "_buttonEl", void 0);
    __decorate([
        query(".kuc-dropdown-1-6-0__group__label")
    ], KucDropdown.prototype, "_labelEl", void 0);
    __decorate([
        query(".kuc-dropdown-1-6-0__group__select-menu__item")
    ], KucDropdown.prototype, "_firstItemEl", void 0);
    __decorate([
        query(".kuc-dropdown-1-6-0__group__select-menu__item:last-child")
    ], KucDropdown.prototype, "_lastItemEl", void 0);
    __decorate([
        query(".kuc-dropdown-1-6-0__group__select-menu__item[aria-selected=true]")
    ], KucDropdown.prototype, "_selectedItemEl", void 0);
    __decorate([
        query(".kuc-dropdown-1-6-0__group__select-menu__highlight")
    ], KucDropdown.prototype, "_highlightItemEl", void 0);
    __decorate([
        query(".kuc-base-error-1-6-0__error")
    ], KucDropdown.prototype, "_errorEl", void 0);
    window.customElements.define("kuc-dropdown-1-6-0", KucDropdown);
    createStyleOnHeader(DROPDOWN_CSS);
    exportDropdown = KucDropdown;
})();
const Dropdown = exportDropdown;
export { Dropdown };
