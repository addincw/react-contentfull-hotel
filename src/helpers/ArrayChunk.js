export const ArrayChunk = (arr, size) => {
    let i, j, result = [];

    for (i = 0, j = arr.length; i < j; i += size) {
        result.push(arr.slice(i, i + size));
    }

    return result
}