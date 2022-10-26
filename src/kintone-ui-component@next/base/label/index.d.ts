import { KucBase } from "../kuc-base";
export declare class BaseLabel extends KucBase {
    requiredIcon: boolean;
    guid: string;
    text: string;
    render(): import("lit-html").TemplateResult<1>;
    private _getTextTemplate;
}
