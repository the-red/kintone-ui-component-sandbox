var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, svg } from "lit";
import { property, state } from "lit/decorators.js";
import { KucBase, dispatchCustomEvent, createStyleOnHeader, } from "../base/kuc-base";
import { validateProps } from "../base/validator";
import { NOTIFICATION_CSS } from "./style";
let exportNotification;
(() => {
    exportNotification = window.customElements.get("kuc-notification-1-6-0");
    if (exportNotification) {
        return;
    }
    class KucNotification extends KucBase {
        constructor(props) {
            super();
            this.className = "";
            this.text = "";
            this.type = "danger";
            this.duration = -1;
            this._isOpened = false;
            const validProps = validateProps(props);
            Object.assign(this, validProps);
        }
        _handleClickCloseButton(event) {
            this.close();
        }
        _getCloseButtonColor() {
            switch (this.type) {
                case "info":
                    return "#448aca";
                case "success":
                    return "#9bbc65";
                default:
                    return "#c65040";
            }
        }
        _getCloseButtonSvgTemplate() {
            return svg `
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>close button</title>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
            fill="${this._getCloseButtonColor()}"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.4765 15.7071L20.1229 12.0607L20.4765 11.7071L19.7694 11L19.4158 11.3536L15.7694 15L12.1229 11.3536L11.7694 11L11.0623 11.7071L11.4158 12.0607L15.0623 15.7071L11.3536 19.4158L11 19.7694L11.7071 20.4765L12.0607 20.1229L15.7694 16.4142L19.4781 20.1229L19.8316 20.4765L20.5387 19.7694L20.1852 19.4158L16.4765 15.7071Z"
            fill="white"
          />
        </svg>
      `;
        }
        _setAutoCloseTimer() {
            if (!Number.isFinite(this.duration) || this.duration < 0) {
                return;
            }
            this._clearAutoCloseTimer();
            this._timeoutID = window.setTimeout(() => {
                this.close();
            }, this.duration);
        }
        _clearAutoCloseTimer() {
            this._timeoutID && window.clearTimeout(this._timeoutID);
        }
        open() {
            document.body.appendChild(this);
            this.performUpdate();
            this.classList.remove("kuc-notification-fadeout-1-6-0");
            this.classList.add("kuc-notification-fadein-1-6-0");
            this._isOpened = true;
            this._setAutoCloseTimer();
        }
        close() {
            this._isOpened = false;
            this.classList.remove("kuc-notification-fadein-1-6-0");
            this.classList.add("kuc-notification-fadeout-1-6-0");
            this._clearAutoCloseTimer();
            dispatchCustomEvent(this, "close");
        }
        render() {
            return html `
        <div
          class="kuc-notification-1-6-0__notification kuc-notification-1-6-0__notification--${this
                .type}"
        >
          <pre
            class="kuc-notification-1-6-0__notification__title"
            aria-live="assertive"
            role="${this._isOpened ? "alert" : ""}"
          ><!--
          -->${this.text}</pre>
          <button
            class="kuc-notification-1-6-0__notification__close-button"
            type="button"
            aria-label="close"
            @click="${this._handleClickCloseButton}"
          >
            ${this._getCloseButtonSvgTemplate()}
          </button>
        </div>
      `;
        }
    }
    __decorate([
        property({ type: String, reflect: true, attribute: "class" })
    ], KucNotification.prototype, "className", void 0);
    __decorate([
        property({ type: String })
    ], KucNotification.prototype, "text", void 0);
    __decorate([
        property({ type: String })
    ], KucNotification.prototype, "type", void 0);
    __decorate([
        property({ type: Number })
    ], KucNotification.prototype, "duration", void 0);
    __decorate([
        state()
    ], KucNotification.prototype, "_isOpened", void 0);
    window.customElements.define("kuc-notification-1-6-0", KucNotification);
    createStyleOnHeader(NOTIFICATION_CSS);
    exportNotification = KucNotification;
})();
const Notification = exportNotification;
export { Notification };
