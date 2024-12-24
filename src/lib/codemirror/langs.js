export var htmlintelli = ["php", "html", "jsx", "javascript"];

// Lint
export var jslint = [
    "js",
    "javascript",
    "jsx",
    "javascriptreact",
    
    "ts",
    "typescript",
    "tsx",
    "typescriptreact"
];
export var csslint = ["css", "less"];
export var jsonlint = ["json"];
export var phplint = ["php"];
export var pylint = ["python", "py"];

/**
 * Checks if the editor is a lang.
 * @param {Array} array - An array of langs to test if the editor is.
 * @returns
 */
export function editorislang(array) {
    return array.includes(
        document.querySelector(".cm-content").getAttribute("data-language")
    );
}
