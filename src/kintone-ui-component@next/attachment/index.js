var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, query, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, generateGUID, createStyleOnHeader, } from "../base/kuc-base";
import { languagePropConverter, visiblePropConverter } from "../base/converter";
import { isArrayType, throwErrorAfterUpdateComplete, validatePositiveInteger, validateProps, } from "../base/validator";
import { en, ja, zh, zh_TW } from "../base/attachment/resource/locale";
import { ATTACHMENT_CSS } from "./style";
import { ATTACHMENT_INVALID_SIZE_ERROR, ONE_GB, ONE_KB, ONE_MB, } from "../base/attachment/resource/constant";
import { ERROR_MESSAGE } from "../base/constant";
let exportAttachment;
(() => {
    exportAttachment = window.customElements.get("kuc-attachment-1-6-0");
    if (exportAttachment) {
        return;
    }
    class KucAttachment extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.disabled = false;
            this.error = "";
            this.files = [];
            this.id = "";
            this.label = "";
            this.language = "auto";
            this.requiredIcon = false;
            this.visible = true;
            this._isDraging = false;
            this._dragEnterCounter = 0;
            this._locale = this._getLocale();
            this._dragTextParentPaddingHeight = 16;
            this._dragTextParentBorderWidth = 1;
            this._dragTextBorderWidth = 2;
            this._isFileOrDirectoryDrag = (event) => {
                if (!event.dataTransfer) {
                    return false;
                }
                if (event.dataTransfer.items !== undefined) {
                    for (let i = 0; i < event.dataTransfer.items.length; i++) {
                        if (event.dataTransfer.items[i].kind.toLowerCase() === "file") {
                            return true;
                        }
                    }
                }
                return false;
            };
            this._GUID = generateGUID();
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        shouldUpdate(changedProperties) {
            if (changedProperties.has("files") &&
                !isArrayType(this.files)) {
                throwErrorAfterUpdateComplete(this, ERROR_MESSAGE.FILES.IS_NOT_ARRAY);
                return false;
            }
            return true;
        }
        willUpdate(changedProperties) {
            if (changedProperties.has("language")) {
                this._locale = this._getLocale();
            }
            return true;
        }
        render() {
            return html `
      <div class="kuc-attachment-1-6-0__group">
        <label
          class="kuc-attachment-1-6-0__group__label"
          ?hidden="${!this.label}"
          for="${this._GUID}-input"
          @click="${this._handleClickLabel}"
        >
          <kuc-base-label-1-6-0
            .text="${this.label}"
            .requiredIcon="${this.requiredIcon}"
          ></kuc-base-label-1-6-0>
        </label>
        <div
          class="kuc-attachment-1-6-0__group__files"
          @dragenter="${this._handleDragEnter}"
          @dragover="${this._handleDragOver}"
          @dragleave="${this._handleDragLeave}"
        >
          <div
            class="kuc-attachment-1-6-0__group__files__droppable"
            @drop="${this._handleDragDrop}"
            ?hidden="${!this._isDraging}"
          >
          <div class="kuc-attachment-1-6-0__group__files__droppable__text">${this._locale.ATTACHMENT_DRAG_DROP_ZONE}</div>
          </div>
          <ul
            class="kuc-attachment-1-6-0__group__files__display-area"
            ?hidden="${this._isDraging}"
          >
          ${this.files.map((item, number) => this._getAttachmentItemTemplete(item, number))}
          </ul>
          <div class="kuc-attachment-1-6-0__group__files__browse-button"
          ?hidden="${this._isDraging || this.disabled}">
            <span class="kuc-attachment-1-6-0__group__files__browse-button__text">${this._locale.ATTACHMENT_BROWSE}</span>
            <div class="kuc-attachment-1-6-0__group__files__browse-button__input-container">
              <input class="kuc-attachment-1-6-0__group__files__browse-button__input-container__input" type="file" multiple 
              .id="${this._GUID}-input"
              aria-required="${this.requiredIcon}"
              aria-invalid="${this.error}"
              aria-describedby="${this._GUID}-error"
              @change="${this._handleChangeFiles}"></input>
            </div>
          </div>
        </div>
        <kuc-base-error-1-6-0
          ?hidden="${!this.error}"
          .text="${this.error}"
          .guid="${this._GUID}"
        ></kuc-base-error-1-6-0>
      </div>
    `;
        }
        _getAttachmentItemTemplete(item, index) {
            return html `
        <li class="kuc-attachment-1-6-0__group__files__display-area__item">
          <div
            title="${item.name || ""}"
            class="kuc-attachment-1-6-0__group__files__display-area__item__name"
          >
            ${item.name || ""}
          </div>
          <div
            class="kuc-attachment-1-6-0__group__files__display-area__item__remove-button__container"
            ?hidden="${this.disabled}"
          >
            <button
              class="kuc-attachment-1-6-0__group__files__display-area__item__remove-button__container__button"
              aria-label="Cancel File"
              data-file-index="${index}"
              @click="${this._handleClickFileRemove}"
              tabindex="0"
            >
              ${this._getRemoveButtonIcon()}
            </button>
          </div>
          <span class="kuc-attachment-1-6-0__group__files__display-area__item__size">
            ${this._getFileSize(item.size)}
          </span>
        </li>
      `;
        }
        _getRemoveButtonIcon() {
            return svg `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.93933 7.00001L1.96966 3.03034L1.43933 2.50001L2.49999 1.43935L3.03032 1.96968L6.99999 5.93935L10.9697 1.96968L11.5 1.43935L12.5607 2.50001L12.0303 3.03034L8.06065 7.00001L12.0303 10.9697L12.5607 11.5L11.5 12.5607L10.9697 12.0303L6.99999 8.06067L3.03032 12.0303L2.49999 12.5607L1.43933 11.5L1.96966 10.9697L5.93933 7.00001Z"
          fill="#a8a8a8"
        />
      </svg>`;
        }
        _getLanguage() {
            const langs = ["en", "ja", "zh", "zh-TW"];
            if (langs.indexOf(this.language) !== -1)
                return this.language;
            if (langs.indexOf(document.documentElement.lang) !== -1)
                return document.documentElement.lang;
            return "en";
        }
        _getLocale() {
            const language = this._getLanguage();
            switch (language) {
                case "en":
                    return en;
                case "zh":
                    return zh;
                case "zh-TW":
                    return zh_TW;
                case "ja":
                    return ja;
                default:
                    return en;
            }
        }
        _handleClickFileRemove(event) {
            const removeButtonEl = event.currentTarget;
            const index = parseInt(removeButtonEl.getAttribute("data-file-index"), 10);
            if (this.files) {
                index === this.files.length - 1 && this._inputEl.focus();
                const tempFiles = [...this.files];
                this.files.splice(index, 1);
                const detail = {
                    oldFiles: tempFiles,
                    files: this.files,
                    type: "remove-file",
                    fileIndex: [index],
                };
                dispatchCustomEvent(this, "change", detail);
                this.requestUpdate();
            }
        }
        _handleClickLabel(event) {
            event.preventDefault();
        }
        _handleDragEnter(event) {
            if (this.disabled)
                return;
            this._dragEnterCounter++;
            if (this._dragEnterCounter === 1 && this._isFileOrDirectoryDrag(event)) {
                event.preventDefault();
                this._groupFilesEl.style.height =
                    this._groupFilesEl.offsetHeight -
                        (this._dragTextParentPaddingHeight +
                            this._dragTextParentBorderWidth) *
                            2 +
                        "px";
                this._dragEl.style.width = this._groupFilesEl.offsetWidth + "px";
                this._dragEl.style.height =
                    this._groupFilesEl.offsetHeight -
                        (this._dragTextParentBorderWidth + this._dragTextBorderWidth) * 2 +
                        "px";
                this._isDraging = true;
            }
        }
        _handleDragOver(event) {
            if (this.disabled)
                return;
            event.stopPropagation();
            if (this._isFileOrDirectoryDrag(event)) {
                event.preventDefault();
            }
        }
        _handleDragDrop(event) {
            if (this.disabled)
                return;
            event.preventDefault();
            this._handleDragLeave();
            if (this._isFileDrop(event)) {
                this._addFiles(event);
            }
        }
        _isFileDrop(event) {
            var _a;
            // handle Chrome, Firefox, Edge, Safari
            if (event.dataTransfer && event.dataTransfer.items) {
                for (let i = 0; i < event.dataTransfer.items.length; i++) {
                    if (typeof event.dataTransfer.items[i].webkitGetAsEntry ===
                        "function" &&
                        ((_a = event.dataTransfer.items[i].webkitGetAsEntry()) === null || _a === void 0 ? void 0 : _a.isDirectory)) {
                        return false;
                    }
                }
            }
            return true;
        }
        _handleDragLeave() {
            if (this.disabled)
                return;
            this._dragEnterCounter--;
            if (this._dragEnterCounter === 0) {
                this._groupFilesEl.style.height = "auto";
                this._isDraging = false;
            }
        }
        _handleChangeFiles(event) {
            event.preventDefault();
            event.stopPropagation();
            this._addFiles(event);
        }
        _addFiles(event) {
            if (this.files) {
                let addedFiles = event.dataTransfer
                    ? event.dataTransfer.files
                    : event.target.files;
                addedFiles = Object.keys(addedFiles).map((e) => {
                    return addedFiles[e];
                });
                const tempFileList = [...this.files];
                const fileIndex = addedFiles.map((_item, index) => {
                    return tempFileList.length + index;
                });
                addedFiles.forEach((addedFile) => this.files.push(addedFile));
                const detail = {
                    oldFiles: tempFileList,
                    files: this.files,
                    type: "add-file",
                    fileIndex: fileIndex,
                };
                dispatchCustomEvent(this, "change", detail);
                this.requestUpdate();
            }
            this._inputEl.value = "";
        }
        _getFileSize(size) {
            if (typeof size === "number") {
                return this._formatFileSize(size);
            }
            return validatePositiveInteger(size)
                ? this._formatFileSize(parseInt(size, 10))
                : ATTACHMENT_INVALID_SIZE_ERROR;
        }
        _formatFileSize(size) {
            if (size >= ONE_GB) {
                return Math.round(size / ONE_GB) + " GB";
            }
            else if (size >= ONE_MB) {
                return Math.round(size / ONE_MB) + " MB";
            }
            else if (size >= ONE_KB) {
                return Math.round(size / ONE_KB) + " KB";
            }
            return Math.round(size) + " bytes";
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucAttachment.prototype, "className", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucAttachment.prototype, "disabled", void 0);
    __decorate([
        property({ type: String })
    ], KucAttachment.prototype, "error", void 0);
    __decorate([
        property({
            type: (Array),
        })
    ], KucAttachment.prototype, "files", void 0);
    __decorate([
        property({ type: String, reflect: true, attribute: "id" })
    ], KucAttachment.prototype, "id", void 0);
    __decorate([
        property({ type: String })
    ], KucAttachment.prototype, "label", void 0);
    __decorate([
        property({
            type: String,
            attribute: "lang",
            reflect: true,
            converter: languagePropConverter,
        })
    ], KucAttachment.prototype, "language", void 0);
    __decorate([
        property({ type: Boolean })
    ], KucAttachment.prototype, "requiredIcon", void 0);
    __decorate([
        property({
            type: Boolean,
            attribute: "hidden",
            reflect: true,
            converter: visiblePropConverter,
        })
    ], KucAttachment.prototype, "visible", void 0);
    __decorate([
        state()
    ], KucAttachment.prototype, "_isDraging", void 0);
    __decorate([
        query(".kuc-attachment-1-6-0__group__files")
    ], KucAttachment.prototype, "_groupFilesEl", void 0);
    __decorate([
        query(".kuc-attachment-1-6-0__group__files__droppable__text")
    ], KucAttachment.prototype, "_dragEl", void 0);
    __decorate([
        query(".kuc-attachment-1-6-0__group__files__browse-button__input-container__input")
    ], KucAttachment.prototype, "_inputEl", void 0);
    window.customElements.define("kuc-attachment-1-6-0", KucAttachment);
    createStyleOnHeader(ATTACHMENT_CSS);
    exportAttachment = KucAttachment;
})();
const Attachment = exportAttachment;
export { Attachment };
