// tslint:disable-next-line:interface-over-type-literal
export type skinName = string;

// tslint:disable-next-line:interface-over-type-literal
export type skinContribute<buttonStyle> = { readonly skinName: skinName; readonly button: buttonStyle };

// // tslint:disable-next-line:interface-over-type-literal
// export type getSkinContribute<buttonStyle> = () => skinContribute<buttonStyle>;
