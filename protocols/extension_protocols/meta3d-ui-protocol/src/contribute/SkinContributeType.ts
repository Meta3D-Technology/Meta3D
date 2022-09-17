// tslint:disable-next-line:interface-over-type-literal
export type skinName = string;

// tslint:disable-next-line:interface-over-type-literal
export type skinContribute<skin> = { readonly skinName: skinName; readonly skin: skin };