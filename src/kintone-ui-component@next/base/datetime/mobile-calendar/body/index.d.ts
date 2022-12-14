import { PropertyValues } from "lit";
import { KucBase } from "../../../kuc-base";
export declare class BaseMobileDateTimeCalendarBody extends KucBase {
    month: number;
    year: number;
    language: string;
    value: string;
    _month: number;
    _year: number;
    private _locale;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    update(changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    private _handleClickDocument;
    private _handleClickDate;
    private _dispatchClickEvent;
    private _isToday;
    private _separateDateValue;
    private _getDateClass;
    private _isSameDayOfMoment;
    private _getHeaderItemsTemplate;
    private _getDateItemsTemplate;
}
