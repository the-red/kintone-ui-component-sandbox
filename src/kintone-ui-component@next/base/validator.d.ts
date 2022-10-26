declare type Item = {
    label?: string;
    value?: string;
};
declare type Column = {
    field?: string;
    headerName?: string;
    visible?: boolean;
};
export declare function validateProps<Type>(props: Type): {};
export declare function validateDateValue(value: string | undefined): boolean;
export declare function validateTimeValue(value: string): boolean;
export declare function validateTimeStepNumber(timeStep: number): boolean;
export declare function validateTimeStep(timeStep: number, max: string, min: string): boolean;
export declare function isValidDate(date: string): boolean;
export declare function validateItems(value: Item[]): boolean;
export declare function isArrayType<T>(value: T[]): boolean;
export declare function validateValueArray(value: string[]): boolean;
export declare function validateValueString(value: string): boolean;
export declare function validateSelectedIndexArray(selectedIndex: number[]): boolean;
export declare function validateSelectedIndexNumber(selectedIndex: number): boolean;
export declare function validateDateTimeValue(date: string, time: string): boolean;
export declare function throwErrorAfterUpdateComplete(_this: any, message: string): Promise<void>;
export declare function validateColumns(columns: Column[]): boolean;
export declare function validateData(data: object[]): boolean;
export declare function validateRowsPerPage(numRows: number): boolean;
export declare const validateFieldRequiredInColumnTable: (columns: object[]) => boolean;
export declare const validateFieldUniqueInColumnTable: (columns: object[]) => boolean;
export declare const validateArrayProperty: (data: object[]) => boolean;
export declare function validatePositiveInteger(data: string): boolean;
export {};