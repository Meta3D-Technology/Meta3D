export function pipe(...fns) {
    return (initial) => fns.reduce((arg, fn) => fn(arg), initial);
}
//# sourceMappingURL=Pipe.js.map