/*
  It loads the HTML DOM of the sidebar files
*/

import { filesOptions } from "../../pages/editorcontent/files";
import { editorislang } from "../codemirror/langs";
import { applyCMenu } from "../contextmenu";

/**
 * It generates a random token. It is used for creating random classnames.
 * @returns {String} - The generated token.
 */
function generateRandomToken() {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    const length = 12;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }

    return token;
}

/**
 * It compares files and it sorts them. It is used for showing folders on the top and files on the bottom.
 */
function compareFiles(a, b) {
    if (a.type === "folder") {
        return -1;
    } else if (b.type === "folder") {
        return 1;
    } else {
        return a.age - b.age;
    }
}

/**
 * The function for rendering files.
 * @param {*} filesn
 * @returns {Object} - `renderFiles(...).css` & `renderFiles(...).content`
 */
export function renderFiles(filesn) {
    var content = ``;
    var css = `.sb-files *, .sb-files {--border-pixel-diference: calc(var(--folder-spacing) + 1px);    --border-pixel-left-padding: 4px;    --folder-spacing: 6px;}`;
    var profundity = 1;

    /**
     * A loop for rendering folders and files.
     * @param {Array} filess - An array of files. It can be inside a folder or not.
     */
    function infiniteForEach(filess) {
        var files = filess.sort(compareFiles);
        files.forEach((file) => {
            var iconcolor = `0xfff`;
            var icon = `https://swiftlystatic.vercel.app/airacloud/langicon?icon=${window.aira.editor.languages.langsInfo[file.type] ? window.aira.editor.languages.langsInfo[file.type].iconname : "text"}`;
            if (file.type == "folder") {
                icon =
                    `https://swiftlystatic.vercel.app/airacloud/icon?icon=folder&fill=white` +
                    '" lightinvert="true';
            }

            if (file.extension == "json") {
                if (file.name == "package") {
                    icon = `https://swiftlystatic.vercel.app/airacloud/langicon?icon=npm`;
                } else if (file.name == "vercel") {
                    icon = `https://swiftlystatic.vercel.app/airacloud/langicon?icon=vercel`;
                } else {
                    icon = `https://swiftlystatic.vercel.app/airacloud/langicon?icon=json" lightinvert="true`;
                }
            }

            var layericons = ["src", "build", "dist"];

            if (layericons.includes(file.name)) {
                icon = `https://swiftlystatic.vercel.app/airacloud/icon?icon=layers&fill=white" lightinvert="true`;
            }

            var fonticons = ["fonts"];

            if (fonticons.includes(file.name)) {
                icon = `https://swiftlystatic.vercel.app/airacloud/icon?icon=fonts&fill=white" lightinvert="true`;
            }

            var title = `<span>${file.name}${
                file.type != "folder"
                    ? `<span style="opacity: 0.7">.` +
                      file.extension +
                      `</span>`
                    : ""
            }</span>`;
            content += `<div class="sb-file${
                document
                    .querySelector(".editorcontainer")
                    .getAttribute("aira-file-route") === file.route
                    ? " sbfile-open"
                    : ""
            }" aira-file-name="${file.name}" aira-file-route="${
                file.route
            }" aira-file-type="${file.type}"><img ${
                file.type == "folder" ? `style="opacity: 0.24"` : ""
            } src="${icon}" height="18px" width="18px" loading="lazy" alt=' '>${title}</div>`;

            if (file.type == "folder") {
                profundity += 1;
                var classname = generateRandomToken();
                css += `div[class="${classname}"] .sb-file {
      padding-left: calc(var(--padding) + calc(${profundity} * var(--folder-spacing)));
    }
    div[class="${classname}"] {
      position: relative;
    }
    div[class="${classname}"]::before {
      content: "";
      left: calc(var(--border-pixel-left-padding) + calc(var(--border-pixel-diference) * ${profundity}));
      position: absolute;
      top: 0;
      height: 100%;
      width: 1px;
      background-color: var(--border);
      z-index: 1000000000;
    } 
    `;
                content += `<div class="${classname}">`;
                infiniteForEach(file.content);
                content += `</div>`;
                profundity -= 1;
            }
        });
    }
    infiniteForEach(filesn);

    return {
        content: content,
        css: css,
    };
}

/*
file.addEventListener("click", () => {
                if (file.getAttribute("aira-file-type") != "folder") {
                  document
                    .querySelector(".editorcontainer")
                    .setAttribute(
                      "aira-file-route",
                      file.getAttribute("aira-file-route")
                    );
                  var content = filesoptions.findFile(
                    file.getAttribute("aira-file-route")
                  ).code;
                  console.log(content);
                  editorLang(file.getAttribute("aira-file-type"), content);
                }
              });
            });
*/
/**
 * Loads the context menus for every file element.
 */
export function filesLoadContextMenus(editorLang) {
    document.querySelectorAll(".sb-file").forEach((file) => {
        applyCMenu(file, () => {
            return [
                {
                    label: "Open",
                    icon: "open",
                    fill: "#79b8ff",
                    action: () => {
                        filesOptions().openFile(file, editorLang);
                        filesSet();
                    },
                },
                "separator",
                {
                    label: "Rename",
                    icon: "create",
                    action: () => {
                        filesOptions().renameFile(file);
                    },
                },
                {
                    label: "Delete file",
                    icon: "trash",
                    fill: "#ff6b6b",
                    action: () => {
                        var route = file.getAttribute("aira-file-route");
                        alert(route);
                    },
                },
            ];
        });
    });
}
