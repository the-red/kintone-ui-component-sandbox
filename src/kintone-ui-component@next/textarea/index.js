var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, query } from "lit/decorators.js";
import { KucBase, generateGUID, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { visiblePropConverter } from "../base/converter";
import { validateProps } from "../base/validator";
import { BaseLabel } from "../base/label";
import { BaseError } from "../base/error";
export { BaseError, BaseLabel };
import { TEXTAREA_CSS } from "./style";
let exportTextarea;
(() => {
    exportTextarea = window.customElements.get("kuc-textarea-1-6-0");
    if (exportTextarea) {
        return;
    }
    const TextAreaLayout = {
        MIN_WIDTH: 299,
        MIN_HEIGHT: 125,
    };
    class KucTextArea extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.error = "";
            this.id = "";
            this.label = "";
            this.placeholder = "";
            this.value = "";
            this.disabled = false;
            this.requiredIcon = false;
            this.visible = true;
            this._onResize = false;
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        _handleFocusTextarea(event) {
            const detail = { value: this.value };
            dispatchCustomEvent(this, "focus", detail);
        }
        _handleChangeTextarea(event) {
            event.stopPropagation();
            const targetEl = event.target;
            const detail = { value: "", oldValue: this.value };
            this.value = targetEl.value;
            detail.value = this.value;
            dispatchCustomEvent(this, "change", detail);
        }
        _handleInputTextArea(event) {
            event.stopPropagation();
            const targetEl = event.target;
            const detail = {
                value: targetEl.value,
                data: event.data,
            };
            dispatchCustomEvent(this, "input", detail);
        }
        _handleMouseDownResize() {
            this._onResize = true;
        }
        _handleMouseUpDocument() {
            this._onResize = false;
        }
        _handleMouseMoveDocument(event) {
            if (!this._onResize)
                return;
            const textAreaRect = this._textarea.getBoundingClientRect();
            let textAreaWidth = event.clientX - textAreaRect.left;
            let textAreaHeight = event.clientY - textAreaRect.top;
            if (textAreaWidth < TextAreaLayout.MIN_WIDTH)
                textAreaWidth = TextAreaLayout.MIN_WIDTH;
            if (textAreaHeight < TextAreaLayout.MIN_HEIGHT)
                textAreaHeight = TextAreaLayout.MIN_HEIGHT;
            this.style.width = textAreaWidth + "px";
            this._textarea.style.height = textAreaHeight + "px";
        }
        _getResizerButtonSvgTemplate() {
            return svg `
      <svg height="16" width="16">
        <g fill="none" stroke="#b6b6b6" stroke-width="2">
          <line x1="14" x2="16" y1="15" y2="15" />
          <line x1="14" x2="16" y1="11" y2="11" />
          <line x1="14" x2="16" y1="7" y2="7" />
          <line x1="10" x2="12" y1="15" y2="15" />
          <line x1="6" x2="8" y1="15" y2="15" />
          <line x1="10" x2="12" y1="11" y2="11" />
        </g>
      </svg>
      `;
        }
        firstUpdated() {
            document.addEventListener("mousemove", (event) => this._handleMouseMoveDocument(event));
            document.addEventListener("mouseup", (_) => this._handleMouseUpDocument());
        }
        render() {
            return html `
        <div class="kuc-textarea-1-6-0__group">
          <label
            class="kuc-textarea-1-6-0__group__label"
            ?hidden="${!this.label}"
            for="${this._GUID}-label"
          >
            <kuc-base-label-1-6-0
              .text="${this.label}"
              .requiredIcon="${this.requiredIcon}"
            ></kuc-base-label-1-6-0>
          </label>
          <textarea
            id="${this._GUID}-label"
            class="kuc-textarea-1-6-0__group__textarea"
            placeholder="${this.placeholder}"
            .value="${this.value}"
            aria-describedby="${this._GUID}-error"
            aria-required="${this.requiredIcon}"
            aria-invalid="${this.error !== ""}"
            @change="${this._handleChangeTextarea}"
            @focus="${this._handleFocusTextarea}"
            @input="${this._handleInputTextArea}"
            ?disabled="${this.disabled}"
          >
          </textarea>
          <div
            class="kuc-textarea-1-6-0__group__resizer"
            @mousedown="${this._handleMouseDownResize}"
            ?hidden="${this.disabled}"
          >
            ${this._getResizerButtonSvgTemplate()}
          </div>
          <kuc-base-error-1-6-0
            .text="${this.error}"
            .guid="${this._GUID}"
            ?hidden="${!this.error}"
          ></kuc-base-error-1-6-0>
        </div>
      `;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucTextArea.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucTextArea.prototype, "error", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucTextArea.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucTextArea.prototype, "label", void 0);
    __decorate([
        property({ type: String })
    ], KucTextArea.prototype, "placeholder", void 0);
    __decorate([
        property({ type: String })
    ], KucTextArea.prototype, "value", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucTextArea.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucTextArea.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucTextArea.prototype, "visible", void 0);
    __decorate([
        query(".kuc-textarea-1-6-0__group__textarea")
    ], KucTextArea.prototype, "_textarea", void 0);
    window.customElements.define("kuc-textarea-1-6-0", KucTextArea);
    createStyleOnHeader(TEXTAREA_CSS);
    exportTextarea = KucTextArea;
})();
const TextArea = exportTextarea;
export { TextArea };
