export function range(size) {
    return Array.apply(null, Array(size)).map((value, index) => index);
}