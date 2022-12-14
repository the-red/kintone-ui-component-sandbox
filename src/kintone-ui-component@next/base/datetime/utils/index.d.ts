export declare type WeekDate = {
    attr: string;
    text: string;
};
export declare const getDisplayingDates: (year: number, month: number) => {
    text: string;
    attr: string;
}[][];
export declare const generateTimeOptions: (isHour12: boolean, timeStep: number, min: string, max: string) => {
    label: string;
    value: string;
}[];
export declare const convertTimeValueToMinutes: (value: string) => number;
export declare const timeCompare: (startTime: string, endTime: string) => 1 | -1 | 0;
export declare const formatTimeValueToInputValue: (value: string, hour12: boolean) => {
    hours: string;
    minutes: string;
    suffix: string;
};
export declare const formatTimeValueToInputValueForMobile: (value: string, hour12: boolean) => {
    hours: string;
    minutes: string;
    suffix: string;
};
export declare const convertHour24To12: (hours: number) => number;
export declare const convertSuffix24To12: (hours: number) => string;
export declare const convertTime24To12: (hours: number, minutes: number) => {
    hours: string;
    minutes: string;
    suffix: string;
};
export declare const formatInputValueToTimeValue: (inputValue: string) => string;
export declare const convertTime12To24: (hours: string, suffix: string) => string;
export declare const formatValueToInputValue: (language: string, date?: string) => string | undefined;
export declare const formatInputValueToValue: (language: string, date: string) => string;
export declare const isStringValueEmpty: (value: any) => boolean;
export declare const getTodayStringByLocale: (language?: string) => string;
export declare const isValidDateFormat: (language: string, dateString?: string) => boolean;
export declare const padStart: (filterString: string | number, maxLength?: number) => string;
export declare const getLocale: (language: string) => {
    MONTH_SELECT: string[];
    YEAR_SELECT_POSTFIX: string;
    WEEK_DAYS: {
        text: string;
        abbr: string;
    }[];
    INVALID_FORMAT: string;
    INVALID_TIME_FORMAT: string;
    CALENDAR_FOOTER_TEXT: {
        none: string;
        today: string;
        close: string;
    };
    TIME_IS_OUT_OF_VALID_RANGE: string;
};
export declare const generateMinuteOptions: (timeStep?: number) => {
    value: string;
    label: string;
}[];
export declare const generateHourOptions: (hour12?: boolean) => {
    value: string;
    label: string;
}[];
export declare const generateHour12Options: (ampm: string) => {
    value: string;
    label: string;
}[];
export declare const generateHour24Options: () => {
    value: string;
    label: string;
}[];
export declare const getToggleIconSvgTemplate: () => import("lit-html").TemplateResult<2>;
export declare const getLeftArrowIconSvgTemplate: () => import("lit-html").TemplateResult<2>;
export declare function setListBoxPosition(_this: HTMLElement, position: string): void;
export declare const calculateDistanceInput: (_this: HTMLElement) => {
    inputToBottom: number;
    inputToTop: number;
    inputToRight: number;
    inputToLeft: number;
};
export declare const getRightArrowIconSvgTemplate: () => import("lit-html").TemplateResult<2>;
