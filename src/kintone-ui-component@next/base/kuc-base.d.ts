import { LitElement } from "lit";
import { FileItem } from "../attachment/type";
declare type CustomEventDetail = {
    data?: any;
    type?: string;
    oldValue?: string | string[];
    value?: string | string[];
    error?: string;
};
declare type AttachmentEventDetail = {
    files?: FileItem[];
    oldFiles?: FileItem[];
    fileIndex?: number[];
    type?: string;
};
export declare abstract class KucBase extends LitElement {
    createRenderRoot(): this;
}
export declare const dispatchCustomEvent: (el: HTMLElement, eventName: string, detail?: CustomEventDetail | AttachmentEventDetail) => boolean;
export declare const createStyleOnHeader: (styleText: string) => void;
export { CustomEventDetail };
export declare const generateGUID: () => string;
