import { PropertyValues } from "lit";
import { KucBase } from "../../kuc-base";
declare type BaseMobileTimeProps = {
    guid?: string;
    language?: string;
    value?: string;
    disabled?: boolean;
    hour12?: boolean;
    required?: boolean;
};
export declare class BaseMobileTime extends KucBase {
    guid: string;
    language: string;
    value: string;
    disabled: boolean;
    hour12: boolean;
    required: boolean;
    /**
     * Please consider name again and change @state to @property when publishing the function.
     */
    private _timeStep;
    private _hours;
    private _minutes;
    private _suffix;
    private _hourOptions;
    private _minuteOptions;
    private _hoursEl;
    private _minutesEl;
    private _locale;
    constructor(props?: BaseMobileTimeProps);
    update(changedProperties: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    updated(changedProperties: PropertyValues): void;
    private _updateInputValue;
    private _setValueToInput;
    private _handleChangeMinutes;
    private _handleChangeHours;
    private _getTimeValueString;
    private _dispatchEventTimeChange;
    private _getOptionsMinuteTemplate;
    private _getOptionsHourTemplate;
}
export {};
