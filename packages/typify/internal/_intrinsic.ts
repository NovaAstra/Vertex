export type Intrinsic =
    | Function
    | Error
    | Date
    | { readonly [Symbol.toStringTag]: string }
    | RegExp
    | Generator;
