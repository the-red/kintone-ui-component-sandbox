import { PropertyValues } from "lit";
import { KucBase } from "../../../kuc-base";
export declare class BaseMobileDateTimeCalendarFooter extends KucBase {
    language: string;
    private _locale;
    update(changedProperties: PropertyValues): void;
    private _handleClickCalendarFooterButtonClose;
    private _handleClickCalendarFooterButtonNone;
    private _handleClickCalendarFooterButtonToday;
    render(): import("lit-html").TemplateResult<1>;
}
