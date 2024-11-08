export type Cast<A1 extends any, A2 extends any> =
    A1 extends A2
    ? A1
    : A2
