var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, query, queryAll, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../../kuc-base";
import { BASE_DATETIME_LISTBOX_CSS } from "./style";
export class BaseDateTimeListBox extends KucBase {
    constructor() {
        super();
        this.value = "";
        this.items = [];
        this.maxHeight = 300;
        this.doFocus = true;
        this._actionKeyboard = false;
        this._firstHighlight = true;
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
    getHighlightItemEl() {
        return this._highlightItemEl;
    }
    render() {
        return html `
      <ul
        style="max-height: ${this.maxHeight}px;"
        class="kuc-base-datetime-listbox-1-6-0__listbox"
        role="listbox"
        @mousedown="${this._handleMouseDownListBox}"
        @click="${this._handleClickListBox}"
      >
        ${this.items.map((item) => this._getListBoxItemTemplate(item))}
      </ul>
    `;
    }
    updated(changedProperties) {
        if (changedProperties.has("value")) {
            this._highlightSelectedItem();
        }
        this._setListBoxPosition();
        this._scrollToView();
        super.updated(changedProperties);
    }
    _handleClickDocument() {
        dispatchCustomEvent(this, "kuc:listbox-blur", {});
    }
    _handleClickListBox(event) {
        event.stopPropagation();
    }
    _handleKeyDownListBox(event) {
        event.preventDefault();
        event.stopPropagation();
        switch (event.key) {
            case "Up":
            case "ArrowUp":
                this._actionKeyboard = true;
                this._highlightPrevItemEl();
                this._focusHighlightItemEl();
                this._scrollToView();
                break;
            case "Down":
            case "ArrowDown":
                this._actionKeyboard = true;
                this._highlightNextItemEl();
                this._focusHighlightItemEl();
                this._scrollToView();
                break;
            case "Home":
                this._actionKeyboard = true;
                this._highlightFirstItem();
                this._focusHighlightItemEl();
                break;
            case "End":
                this._actionKeyboard = true;
                this._highlightLastItem();
                this._focusHighlightItemEl();
                break;
            case "Tab":
                dispatchCustomEvent(this, "kuc:listbox-click", {});
                break;
            case "Escape":
                dispatchCustomEvent(this, "kuc:listbox-escape", {});
                break;
            case " ":
            case "Enter": {
                const highlightValue = this._highlightItemEl.getAttribute("value");
                const detail = { value: highlightValue || "" };
                dispatchCustomEvent(this, "kuc:listbox-click", detail);
                break;
            }
        }
    }
    _handleMouseDownListBox(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.target === event.currentTarget)
            return;
        const itemEl = event.target;
        const value = itemEl.getAttribute("value") || "";
        const detail = { value: value };
        dispatchCustomEvent(this, "kuc:listbox-click", detail);
    }
    _handleMouseOverItem(event) {
        if (this._actionKeyboard) {
            this._actionKeyboard = false;
            return;
        }
        const itemEl = event.target;
        this._setHighlightItemEl(itemEl);
        if (!this.doFocus)
            return;
        this._focusHighlightItemEl(false);
    }
    _setListBoxPosition() {
        const listBoxHeight = this._listBoxEl.getBoundingClientRect().height;
        const parentElement = this._listBoxEl.parentElement;
        if (!parentElement || !this.parentElement)
            return;
        const distanceInputToBottom = window.innerHeight - this.parentElement.getBoundingClientRect().bottom;
        const parentHeight = this.parentElement.offsetHeight;
        this._listBoxEl.style.bottom = "auto";
        this._listBoxEl.style.left = "auto";
        if (distanceInputToBottom >= listBoxHeight)
            return;
        this.parentElement.style.position = "relative";
        this._listBoxEl.style.bottom = parentHeight + "px";
        this._listBoxEl.style.left = "0px";
    }
    _setHighlightItemEl(itemEl) {
        this._removeHighlight();
        itemEl.classList.add("kuc-base-datetime-listbox-1-6-0__listbox--highlight");
        itemEl.setAttribute("tabindex", "0");
    }
    _highlightSelectedItem() {
        if (!this.doFocus)
            return;
        const itemsEl = Array.from(this._itemsEl);
        const itemSelected = itemsEl.filter((item) => item.getAttribute("aria-selected") === "true")[0];
        if (!itemSelected)
            return;
        this._itemSelectedEl = itemSelected;
        this._setHighlightItemEl(itemSelected);
        this._focusHighlightItemEl();
    }
    _highlightFirstItem() {
        this._itemSelectedEl = this._firstItemEl;
        this._setHighlightItemEl(this._firstItemEl);
    }
    _highlightLastItem() {
        this._itemSelectedEl = this._lastItemEl;
        this._setHighlightItemEl(this._lastItemEl);
    }
    _highlightNextItemEl() {
        if (this._highlightItemEl === null || this._iconChecked === null) {
            this._highlightFirstItem();
            return;
        }
        const nextItemEl = this._getNextItemEl();
        if (nextItemEl) {
            this._setHighlightItemEl(nextItemEl);
            this._firstHighlight = false;
            this._itemSelectedEl = nextItemEl;
            return;
        }
        this._highlightFirstItem();
    }
    _getNextItemEl() {
        const itemcheckedEL = this._iconChecked.parentElement;
        if (!this._itemSelectedEl && itemcheckedEL && this._firstHighlight) {
            this._itemSelectedEl = itemcheckedEL;
        }
        let nextItemEl = this._highlightItemEl.nextElementSibling;
        if (!this._itemSelectedEl)
            return nextItemEl;
        if (this._itemSelectedEl.nextElementSibling) {
            nextItemEl = this._itemSelectedEl.nextElementSibling;
            return nextItemEl;
        }
        return this._firstItemEl;
    }
    _highlightPrevItemEl() {
        if (this._highlightItemEl === null || this._iconChecked === null) {
            this._highlightLastItem();
            return;
        }
        const prevItemEl = this._getPreviousItemEl();
        if (prevItemEl) {
            this._setHighlightItemEl(prevItemEl);
            this._firstHighlight = false;
            this._itemSelectedEl = prevItemEl;
            return;
        }
        this._highlightLastItem();
    }
    _getPreviousItemEl() {
        const itemcheckedEL = this._iconChecked.parentElement;
        if (!this._itemSelectedEl && itemcheckedEL && this._firstHighlight) {
            this._itemSelectedEl = itemcheckedEL;
        }
        let prevItemEl = this._highlightItemEl
            .previousElementSibling;
        if (!this._itemSelectedEl)
            return prevItemEl;
        if (this._itemSelectedEl.previousElementSibling) {
            prevItemEl = this._itemSelectedEl.previousElementSibling;
            return prevItemEl;
        }
        return this._lastItemEl;
    }
    _removeHighlight() {
        if (!this._highlightItemEl)
            return;
        this._highlightItemEl.setAttribute("tabindex", "-1");
        this._highlightItemEl.classList.remove("kuc-base-datetime-listbox-1-6-0__listbox--highlight");
    }
    _focusHighlightItemEl(dispatch) {
        const liEl = this._highlightItemEl;
        if (!liEl)
            return;
        liEl.focus({ preventScroll: true });
        if (dispatch === false)
            return;
        this._dispatchListBoxFocusChange();
    }
    _dispatchListBoxFocusChange() {
        const highlightValue = this._highlightItemEl.getAttribute("value") || "";
        const detail = { value: highlightValue };
        dispatchCustomEvent(this, "kuc:listbox-focus-change", detail);
    }
    _scrollToView() {
        const higlightItemEl = this._highlightItemEl || this._getHighlightItemByValue();
        if (!higlightItemEl || !this._listBoxEl) {
            return;
        }
        const lineHeight = higlightItemEl.offsetHeight;
        const offsetItemCount = this._listBoxEl.clientHeight / lineHeight / 2;
        let offsetScrollTop = higlightItemEl.offsetTop - offsetItemCount * lineHeight;
        if (offsetScrollTop < 0)
            offsetScrollTop = 0;
        this._listBoxEl.scrollTop = offsetScrollTop;
    }
    _getHighlightItemByValue() {
        const listLiEl = Array.from(this._listBoxEl.children);
        const itemTimeObj = new Date(Date.parse(`2021/01/01 ${this.value}`));
        let liEl = listLiEl.find((element) => new Date(Date.parse(`2021/01/01 ${element.title}`)) >= itemTimeObj);
        if (!liEl) {
            liEl = listLiEl[listLiEl.length - 1];
        }
        if (!this.doFocus || !liEl)
            return liEl;
        this._setHighlightItemEl(liEl);
        this._focusHighlightItemEl();
        return liEl;
    }
    _getListBoxItemTemplate(item) {
        const isSelected = this.value === item.value && this.doFocus;
        return html `
      <li
        class="kuc-base-datetime-listbox-1-6-0__listbox__item"
        role="option"
        tabindex="${isSelected ? "0" : "-1"}"
        aria-selected="${isSelected}"
        title="${item.label || ""}"
        value="${item.value !== undefined ? item.value : ""}"
        @mouseover="${this._handleMouseOverItem}"
        @keydown="${this._handleKeyDownListBox}"
      >
        ${isSelected ? this._getCheckedIconSvgTemplate() : ""}
        ${item.label === undefined ? item.value : item.label}
      </li>
    `;
    }
    _getCheckedIconSvgTemplate() {
        return svg `<svg
          class="kuc-base-datetime-listbox-1-6-0__listbox__item__icon"
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
            fill="#3498db"
          />
        </svg>`;
    }
}
__decorate([
    property({ type: String })
], BaseDateTimeListBox.prototype, "value", void 0);
__decorate([
    property({ type: Array })
], BaseDateTimeListBox.prototype, "items", void 0);
__decorate([
    property({ type: Number })
], BaseDateTimeListBox.prototype, "maxHeight", void 0);
__decorate([
    property({ type: Boolean })
], BaseDateTimeListBox.prototype, "doFocus", void 0);
__decorate([
    query(".kuc-base-datetime-listbox-1-6-0__listbox")
], BaseDateTimeListBox.prototype, "_listBoxEl", void 0);
__decorate([
    queryAll(".kuc-base-datetime-listbox-1-6-0__listbox__item")
], BaseDateTimeListBox.prototype, "_itemsEl", void 0);
__decorate([
    query(".kuc-base-datetime-listbox-1-6-0__listbox__item")
], BaseDateTimeListBox.prototype, "_firstItemEl", void 0);
__decorate([
    query(".kuc-base-datetime-listbox-1-6-0__listbox__item:last-child")
], BaseDateTimeListBox.prototype, "_lastItemEl", void 0);
__decorate([
    query(".kuc-base-datetime-listbox-1-6-0__listbox--highlight")
], BaseDateTimeListBox.prototype, "_highlightItemEl", void 0);
__decorate([
    query(".kuc-base-datetime-listbox-1-6-0__listbox__item__icon")
], BaseDateTimeListBox.prototype, "_iconChecked", void 0);
__decorate([
    state()
], BaseDateTimeListBox.prototype, "_actionKeyboard", void 0);
__decorate([
    state()
], BaseDateTimeListBox.prototype, "_firstHighlight", void 0);
__decorate([
    state()
], BaseDateTimeListBox.prototype, "_itemSelectedEl", void 0);
if (!window.customElements.get("kuc-base-datetime-listbox-1-6-0")) {
    createStyleOnHeader(BASE_DATETIME_LISTBOX_CSS);
    window.customElements.define("kuc-base-datetime-listbox-1-6-0", BaseDateTimeListBox);
}
