export let pipe<A>():  = (arg: A) =>  => A;
export let pipe<A, B>(fn: (arg: A) => B):  = (arg: A) =>  => B;
export let pipe<A, B, C>(fn0: (arg: A) => B, fn1: (arg: B) => C):  = (arg: A) =>  => C;
export let pipe<A, B, C, D>(fn0: (arg: A) => B, fn1: (arg: B) => C, fn2: (arg: C) => D):  = (arg: A) =>  => D;
export let pipe<A, B, C, D, E>(fn0: (arg: A) => B, fn1: (arg: B) => C, fn2: (arg: C) => D, fn3: (arg: D) => E):  = (arg: A) =>  => E;
export let pipe<A, B, C, D, E, F>(fn0: (arg: A) => B, fn1: (arg: B) => C, fn2: (arg: C) => D, fn3: (arg: D) => E, fn4: (arg: E) => F):  = (arg: A) =>  => F;
export let pipe<A, B, C, D, E, F, G>(fn0: (arg: A) => B, fn1: (arg: B) => C, fn2: (arg: C) => D, fn3: (arg: D) => E, fn4: (arg: E) => F, fn5: (arg: F) => G):  = (arg: A) =>  => G;
export let pipe<A, B, C, D, E, F, G, H>(fn0: (arg: A) => B, fn1: (arg: B) => C, fn2: (arg: C) => D, fn3: (arg: D) => E, fn4: (arg: E) => F, fn5: (arg: F) => G, fn6: (arg: G) => H):  = (arg: A) =>  => H;
export let pipe<A, B, C, D, E, F, G, H, I>(fn0: (arg: A) => B, fn1: (arg: B) => C, fn2: (arg: C) => D, fn3: (arg: D) => E, fn4: (arg: E) => F, fn5: (arg: F) => G, fn6: (arg: G) => H, fn7: (arg: H) => I):  = (arg: A) =>  => I;
export let pipe = (...fns: any) =>  {
    return (initial: any) => fns.reduce((arg: any, fn: any) => fn(arg), initial);
}

