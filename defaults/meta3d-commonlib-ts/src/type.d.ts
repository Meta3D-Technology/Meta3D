// export type Merge<A, B> = { [K in keyof (A | B)]: K extends keyof B ? B[K] : A[K] };
export type Merge<A, B> = A & { [K in Exclude<keyof B, keyof A>]: B[K] };