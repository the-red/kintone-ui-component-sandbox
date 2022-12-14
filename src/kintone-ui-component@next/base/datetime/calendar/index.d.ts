import { PropertyValues } from "lit";
import { KucBase } from "../../kuc-base";
import "./header";
import "./body";
import "./footer";
export declare class BaseDateTimeCalendar extends KucBase {
    language: string;
    value: string;
    private _baseCalendarGroupEl;
    private _monthEl;
    private _yearEl;
    private _listBoxMonthEl;
    private _listBoxYearEl;
    _month: number;
    _year: number;
    update(changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    updated(changedProperties: PropertyValues): Promise<void>;
    private _handleKeyDownCalendarGroup;
    private _handleClickCalendarGroup;
    private _calculateBodyCalendarPosition;
    private _calculateCalendarPosition;
    private _setCalendarPosition;
    private _handleCalendarHeaderChange;
    private _handleCalendarBodyChangeDate;
    private _updateValue;
    private _separateValue;
}
