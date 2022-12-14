export declare const visiblePropConverter: {
    fromAttribute(value: string | null): boolean;
    toAttribute(value: boolean): "" | null;
};
export declare const languagePropConverter: {
    fromAttribute: (value: string | null) => boolean;
    toAttribute: (value: string) => string;
};
export declare const unsafeHTMLConverter: (element: string | HTMLElement) => import("lit-html/directive").DirectiveResult<typeof import("lit-html/directives/unsafe-html").UnsafeHTMLDirective>;
export declare const dateValueConverter: (date: string | undefined) => string;
export declare const timeValueConverter: (time: string) => string;
