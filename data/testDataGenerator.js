function generateStar(n) {
    let result = "";

    for (let i = 1; i <= n; i++) {
        result += makeTriple(0, i);
    }

    return result;
}

function generateGrid(w, h) {
    let result = "";

    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            if (i < w - 1) {
                result += makeTriple(`${i}#${j}`, `${i+1}#${j}`);
            }
            if (j < h - 1) {
                result += makeTriple(`${i}#${j}`, `${i}#${j+1}`);
            }
        }
    }

    return result;
}

function generateChain(n) {
    let result = "";

    for (let i = 1; i < n; i++) {
        result += makeTriple(i - 1, i);
    }
    result += makeTriple(n - 1, 0);

    return result;
}

function  makeTriple(s, e) {
    return `_:${s} <test> _:${e} .\n`;
}