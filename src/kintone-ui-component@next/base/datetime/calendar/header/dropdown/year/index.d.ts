import { PropertyValues } from "lit";
import { KucBase } from "../../../../../kuc-base";
export declare class BaseDateTimeHeaderYear extends KucBase {
    year: number;
    postfix: string;
    private _listBoxVisible;
    private _listBoxItems;
    private _toggleEl;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    update(changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    updated(changedProperties: PropertyValues): Promise<void>;
    closeListBox(): void;
    private _handleScrollDocument;
    private _getListBoxTemplate;
    private _handleFocusOutListBox;
    private _handleListBoxEscape;
    private _handleMouseUpDropdownToggle;
    private _handleMouseDownDropdownToggle;
    private _handleClickDropdownYearToggle;
    private _handleKeyDownYearToggle;
    private _openListBoxByKey;
    private _handleChangeListBox;
    private _openListBox;
    private _getYearOptions;
}
