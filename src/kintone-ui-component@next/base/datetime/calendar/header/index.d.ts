import { PropertyValues } from "lit";
import { KucBase } from "../../../kuc-base";
import "../../calendar/header/dropdown/year";
import "../../calendar/header/dropdown/month";
export declare class BaseDateTimeCalendarHeader extends KucBase {
    language: string;
    month: number;
    year: number;
    private _locale;
    private _baseDateTimeHeaderMonthEl;
    private _baseDateTimeHeaderYearEl;
    private _listBoxMonthEl;
    private _listBoxYearEl;
    update(changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    private _getYearTemplate;
    private _getMonthTemplate;
    private _getYearMonthTemplate;
    private _handleMonthDropdownChange;
    private _handleYearDropdownChange;
    private _handleYearDropdownClick;
    private _handleMonthDropdownClick;
    private _handleClickCalendarPrevMonthBtn;
    private _handleKeyDownCalendarPrevMonthBtn;
    private _handleClickCalendarNextMonthBtn;
    private _dispatchCalendarHeaderChangeEvent;
}
