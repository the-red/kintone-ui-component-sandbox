import { PropertyValues } from "lit";
import { KucBase } from "../../../kuc-base";
export declare class BaseDateTimeCalendarBody extends KucBase {
    month: number;
    year: number;
    language: string;
    value: string;
    _month: number;
    _year: number;
    private _selectedItem;
    private _highlightItem;
    private _focusedItem;
    private _locale;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    update(changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    updated(changedProperties: PropertyValues): void;
    private _handleClickDocument;
    private _handleKeyDownDocument;
    private _handleClickDate;
    private _handleKeyDownDate;
    private _dispatchClickEvent;
    private _isToday;
    private _moveToDate;
    private _separateDateValue;
    private _getSelectedValue;
    private _getValueItemFocused;
    private _getDateClass;
    private _getDateString;
    private _isSameDayOfMoment;
    private _getHeaderItemsTemplate;
    private _getDateItemsTemplate;
    private _focusDateEl;
}
