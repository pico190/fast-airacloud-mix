/*
  _    _              ___  _                _           __ 
   /_\  (_) _ _  __ _  / __|| | ___  _  _  __| |   __ __ / / 
  / _ \ | || '_|/ _` || (__ | |/ _ \| || |/ _` |   \ V // _ \
 /_/ \_\|_||_|  \__,_| \___||_|\___/ \_,_|\__,_|    \_/ \___/

 Developed By Swiftly. 
 * /editor main file

*/

import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import loadSidebar from "./editorcontent/sidebar";
import { loadContextMenus } from "../lib/codemirror/loadContextMenus";
import "../editor.css";
import { decode } from "js-base64";
import loadLint from "../lib/codemirror/lints/loadLint";
import { lintmsg } from "../lib/codemirror/lints/lintmsg";
import infolang from "../lib/codemirror/infolang";
import extension from "../lib/codemirror/extensions";
import {
  filesLoadContextMenus,
  renderFiles,
} from "../lib/editorui/files render";
import NotFound from "./editorcontent/projectnotfound";
import { loadFiles, filesOptions } from "./editorcontent/files";
import { console_error, console_info } from "../lib/debug/console";
import { addCss, removeCss } from "../lib/cssManager";
import confetti from "canvas-confetti";
import { createInput } from "../lib/ui/input";
import loadNav from "./editorcontent/nav";
import { toggleZenMode } from "../lib/editorui/appareance";

/**
 * It loads a suggestion
 * @param {Object} state - A codemirror state.
 * @returns {String} - The suggestion
 */
const fetchSuggestion = async (state) => {
  // We edit the file content in the files of the sessionStorage.

  var info = window.ilumic.editor.data;
  var selectedFunction = null;
  var route = document
    .querySelector(".editorcontainer")
    .getAttribute("aira-file-route");
  window.aira.editor.files.editFile(route, info.content);
  document.querySelector(".cm-info-element[saved]").innerText = "Saved";
  loadLint(info.content, (errors) => {
    lintmsg(errors);
  });

  Object.keys(window.aira.editor.suggestions.registered).forEach(
    (suggestionm) => {
      var actualsettings = JSON.parse(
        decode(localStorage.getItem("DATA__SETTINGS"))
      );
      selectedFunction =
        window.aira.editor.suggestions.registered[
          actualsettings.editor.inlineSuggestionManagers
        ];
    }
  );
  return selectedFunction(info);
};

// region Load
/**
 * It sets the loader info message
 * @param {Int} percentage - A number: percentage of the loader bar
 * @param {String} name - The name of the thing is loading.
 */
function setLoaderInfo(percentage, name) {
  var editorProgress = document.getElementById("loader-editor-progress");
  editorProgress.style.width = percentage + "%";
  var editorpgMsg = document.getElementById("loader-editor-progress-message");
  editorpgMsg.innerText = name;
}

/**
 * It loads the editor **page**.
 * @param {Array} projects - An array of projects.
 */
export default function Editor(projects, url) {
  // region Load DOM

  // It loads the files
  loadFiles(project);

  // Gets the project
  var project = null;
  projects.forEach((project_) => {
    if (url[1] === project_.token) {
      project = project_;
      window.aira.editor.project = project;
    }
  });

  // If the project exists, then run.
  if (project) {
    // We set the dom
    document.querySelector("#app").innerHTML = `
      <div style="position: fixed; opacity: 0; top: 0px; left: 0px;">
        <b style="font-family: var(--editor-font-family)">a</b><font style="font-family: var(--editor-font-family)">a</font><i style="font-family: var(--editor-font-family)">a</i><b><i style="font-family: var(--editor-font-family)">a</i></b>
      </div>
      <div class="loader-editor" id="loader-editor">
          <div class="loader-editor-center">
              <div class="loader-editor-title">
                  <img src='https://swiftlystatic.vercel.app/airacloud/favicon.svg' loading="lazy" alt=""/>
                  <h1>AiraCloud</h1>
              </div>
              <p class="loader-editor-message">Loading your project, <b>${project.name}</b>...</p>
          </div>
          <div class="loader-editor-progress-div">
              <p id="loader-editor-progress-message" class="loader-editor-progress-message"></p>
              <div id="loader-editor-progress" class="loader-editor-progress" style="width: 0%;"></div>
          </div>
      </div>
      <style id="linter"></style>
      <style id="lens"></style>
      <div class="nav"></div>
      <div class="sidebar" id="sidebar"></div>
      <div class="content">
          <svg style="display: none;" id="svgroundcorner"><defs><filter id="selection-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9" result="goo"></feColorMatrix><feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite></filter></defs></svg>
          <div class="view airacloud-component">
            <div class="files"></div>
            <div class="editorcontainer">
                <div class="cm-info"></div>
            </div>
          </div>
      </div>
  `;
    window.aira.editor.appareance = {
      toggleZenMode: toggleZenMode,
      zenMode: false,
    };

    window.aira.editor.displayFiles = [
      {
        open: true,
        key: "airacloud-startpage",
        icon: "airacloud",
        name: "Welcome",
        saved: true,
      },
    ];
    function renderDisplayFiles() {
      var files = window.aira.editor.displayFiles;
      var flsElem = document.querySelector(".content .files");
      flsElem.innerHTML = ``;
      files.forEach((file) => {
        var elemFile = document.createElement("div");
        elemFile.classList.add("file");
        if (file.open) {
          elemFile.classList.add("file-open");
        }

        elemFile.setAttribute("key", file.key);
        elemFile.setAttribute("id", file.key);

        elemFile.innerHTML = `<img src="${
          file.icon === "airacloud"
            ? "https://swiftlystatic.vercel.app/airacloud/favicon.svg"
            : "https://swiftlystatic.vercel.app/airacloud/langicon?icon=" +
              file.icon
        }" loading="lazy" alt="" style="width: 20px;">
                <b>${file.name}</b>
                <span class="file-saved">
                    <div class="unsaved-file" style="opacity: ${
                      file.saved ? "0" : "1"
                    };"></div>
                </span> 
                <span class="file-close">
                    <img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=close&fill=white&regular=true" width="13px" height="13px" loading="lazy" alt="×">
                </span><div class="file-bottom"></div>`;
        flsElem.appendChild(elemFile);
      });
    }

    var lastdFiles = [];
    setInterval(() => {
      if (lastdFiles !== window.aira.editor.displayFiles) {
        renderDisplayFiles();
        lastdFiles = window.aira.editor.displayFiles;
      }
    }, 1);

    var settings = JSON.parse(decode(localStorage.getItem("DATA__SETTINGS")));
    removeCss("editorstyle");
    addCss(
      "editorstyle",
      `* {
                    --editor-font-size: ${settings.editor.fontSize};
                    --editor-font-family: ${settings.editor.fontFamily};
                }`
    );

    window.aira.editor.registerInfo = (id, info, right, click) => {
      var infoElem = document.querySelector(".cm-info");
      var elem = document.createElement("div");
      elem.classList.add("cm-info-element");
      elem.setAttribute(id, "");
      if (!right) {
        elem.classList.add("cm-info-left");
      } else {
        elem.classList.add("cm-info-right");
        if (!document.querySelector(".cm-info-right")) {
          elem.classList.add("cm-info-first-right");
        }
      }

      if (click) {
        elem.classList.add("cm-clickable");
        elem.addEventListener("click", click);
      }

      if (right) {
        infoElem.appendChild(elem);
      } else {
        infoElem.prepend(elem);
      }
      if (info) {
        window.aira.editor.registerUpdateEvent((content) => {
          // auto-generated info update manager
          elem.innerText = info(content, elem);
        });
      }
    };

    /*
              <div class="" selected></div>
              <div class="cm-info-element cm-info-right" pos>Position...</div>
              <div class="cm-info-element" lang>Lang...</div>*/

    // Some variables
    var airatheme;
    var langLoader;
    var loadDetails;

    // Loader info
    var filestoload = 3;
    var filesloaded = 1;

    setLoaderInfo(0, "Downloading Theme Config...");

    // region Imports

    // We import the CodeMirror theme
    import("../lib/codemirror/aira theme").then((module) => {
      airatheme = module.airatheme();
      setLoaderInfo((100 / filestoload) * filesloaded, "Downloading Langs...");
      filesloaded++;

      // We load the langLoader function
      import("../lib/codemirror/lang loader").then((module) => {
        langLoader = module.langLoader;
        setLoaderInfo(
          (100 / filestoload) * filesloaded,
          "Downloading Details..."
        );
        filesloaded++;

        // We load the codemirror details.
        import("../lib/codemirror/load details").then((module) => {
          loadDetails = module.loadDetails;
          setLoaderInfo(100 - 23, "Loading project files...");
          filesloaded++;

          // region User files

          // Files management
          window.aira.editor.files = filesOptions();

          // We load the sidebar
          loadSidebar(project);
          loadNav(project);

          // For detecting changes in the files
          var lastFiles = ``;

          /**
           * A function for loading the Files section in the sidebar.
           */
          function filesSet() {
            var render = renderFiles(window.aira.editor.files.getFiles());
            var sbcontent = document.querySelector(".sb-files");
            sbcontent.innerHTML = `<div class="sb-files-title"><b>Files</b></div>`;
            sbcontent.innerHTML += render.content;
            var stylesbfiles = document.querySelector("#sb-files");
            stylesbfiles.innerHTML = render.css;

            /*
            var filesectionButton = document.createElement("button");
            filesectionButton.innerHTML = `<img height="18px" width="18px" loading="lazy" alt=" " src="https://swiftlystatic.vercel.app/airacloud/icon?icon=refresh&amp;fill=0xfff">`;
            filesectionButton.addEventListener("click", () => {
              filesSet();
            });
            document
              .querySelector(".sb-files-title")
              .appendChild(filesectionButton);*/
            filesLoadContextMenus(editorLang, filesSet);
            document.querySelectorAll(".sb-file").forEach((file) => {
              file.addEventListener("click", () => {
                document.body.classList.add("loading-cursor");
                window.aira.editor.files.openFile(editorLang, file);
                filesSet();
              });
            });
          }
          setInterval(() => {
            if (lastFiles != sessionStorage.getItem("files")) {
              filesSet();
              lastFiles = sessionStorage.getItem("files");
            }
          }, 1);

          window.aira.editor.updateEvents = [integredUpdateEvent];
          window.aira.editor.registerUpdateEvent = (event) => {
            var updateEvents = window.aira.editor.updateEvents;
            updateEvents.push(event);
            window.aira.editor.updateEvents = updateEvents;
          };

          //window.aira.editor.registerInfo("selected", () => { });
          window.aira.editor.registerInfo("lint", null);
          window.aira.editor.registerInfo("saved", (content, elem) => {
            if (content.docChanged) {
              return "Saving...";
            }
            return elem.innerText;
          });
          window.aira.editor.registerInfo("pos", null, true, (data) => {
            createInput(
              "Search for a line",
              "search",
              (value, input) => {
                var split = value.split(":", 2);
                return [
                  {
                    icon: "compass",
                    name: "",
                    desc: `Go to line ${split[0]}${
                      split.length >= 2 ? " and column " + split[1] : ""
                    }`,
                    click: () => {
                      data.view.dispatch({
                        selection: {
                          anchor: split[1] ?? window.aira.editor.info.col,
                          head: split[0],
                        },
                      });
                    },
                    smallIcon: true,
                  },
                ];
              },
              true,
              false,
              window.aira.editor.info.line + ":" + window.aira.editor.info.col
            );
          });
          window.aira.editor.registerInfo("lang", null, true, () => {
            createInput(
              "Select language mode",
              "create",
              () => {
                var actualang = window.aira.editor.languages.actual;
                var langsInfo = window.aira.editor.languages.langsInfo;
                var actualfile = window.aira.editor.files.findFile(
                  document
                    .querySelector(".sbfile-open")
                    .getAttribute("aira-file-route")
                );
                var filetypes = [];

                Object.values(langsInfo).forEach((lang, index) => {
                  var keyname = Object.keys(langsInfo)[index];
                  filetypes.push({
                    icon: lang.iconname,
                    name: lang.label,
                    desc: keyname,
                    click: () => {
                      var actualfile = window.aira.editor.files.findFile(
                        document
                          .querySelector(".sbfile-open")
                          .getAttribute("aira-file-route")
                      );
                      var route = actualfile.route;
                      window.aira.editor.files.editFileInfo(route, (data) => {
                        var newdata = data;
                        newdata.type = keyname;
                        return newdata;
                      });
                      window.aira.editor.displayFiles.forEach((dpf) => {
                        if (dpf.key === route) {
                          dpf.icon = langsInfo[keyname].iconname;
                        }
                      });
                      window.aira.editor.files.openFile(() => {
                        window.aira.editor.loadLanguage(
                          keyname,
                          actualfile.code
                        );
                      }, document.querySelector(".sbfile-open"));
                      window.aira.ui.closeInput();
                    },
                    langIcon: true,
                  });
                });
                return [
                  {
                    icon: "color-wand",
                    name: "",
                    desc: "[SOON] Auto Detect.",
                    click: () => {},
                    smallIcon: true,
                  },
                  {
                    icon: "document",
                    name: "",
                    desc:
                      "[SOON] Configure lang for '." +
                      actualfile.extension +
                      "' files.",
                    click: () => {},
                    smallIcon: true,
                  },
                  {
                    icon: "bag-handle",
                    name: "",
                    desc:
                      "[SOON] Search marketplace extensions for '." +
                      actualfile.extension +
                      "'.",
                    click: () => {},
                    smallIcon: true,
                  },
                  "separator",
                  ...filetypes,
                ];
              },
              true,
              false
            );
          });

          // region Update Event
          /**
           * An event that it runs when the CodeMirror View or State is changed.
           * @param {Object} data - A CodeMirror object (view and state)
           */
          function integredUpdateEvent(data) {
            // An object with the cursor position (line and column)
            var pos = {
              ln: data.state.doc.lineAt(data.state.selection.main.head).number,
              cl:
                data.state.selection.ranges[0].head -
                data.state.doc.lineAt(data.state.selection.main.head).from,
            };

            // The selected content
            var selected = data.state.sliceDoc(
              data.state.selection.main.from,
              data.state.selection.main.to
            );

            // An object with information of the editor. It is saved in sessionStorage
            var info = {
              line: pos.ln,
              col: pos.cl,
              selectedText: selected,
              content: "",
            };

            // We set the .cm-info selection information.
            if (selected) {
              document.querySelector(".cm-info-element[pos]").innerText =
                "Line " +
                pos.ln +
                ", col. " +
                pos.cl +
                " (" +
                selected.length +
                " selected)";
            } else {
              document.querySelector(".cm-info-element[pos]").innerText =
                "Line " + pos.ln + ", col. " + pos.cl;
            }

            // We load the details.
            loadDetails(data.state);

            if (data.docChanged) {
              // We get the editor file content
              var content = "";
              var code = {};
              if (data.state.doc.children) {
                data.state.doc.children.forEach((chunk) => {
                  content += chunk.text.join("\n") + "\n";
                  chunk.text.forEach((line, index) => {
                    code[index + 1] = line;
                  });
                });
              } else {
                content = data.state.doc.text.join("\n");
                data.state.doc.text.forEach((line, index) => {
                  code[index + 1] = line;
                });
              }
              info.content = content;
            } else {
              info.content = window.aira.editor.info.content;
            }

            window.aira.editor.info = info;
          }

          // region Editor load
          /**
           * The principal page.
           */
          function loadPrincipalPage() {
            document.querySelector(".cm-info").style.display = "none";
            var principalpage = document.createElement("div");
            principalpage.classList.add("cm-principalpage");
            principalpage.innerHTML = `
              <h1><img src="https://swiftlystatic.vercel.app/airacloud/favicon.svg" alt="AiraCloud" loading="lazy"></h1>
              <h2>v${window.aira.clientVersion}</h2>
              <h3 style="opacity: 0.6;">ENGINE - v${window.aira.engineVersion}</h3>
              

              <p>Click a file to start</p>
            `;
            document.querySelector(".editorcontainer").prepend(principalpage);
            document.getElementById("loader-editor").style.display = "none";
          }

          loadPrincipalPage();

          /**
           * A function for loading a codemirror lang.
           * @param {String} lang - The string of a lang
           * @param {String} content - The content of the file to open.
           */
          function editorLang(lang, content) {
            // We set a loader in the principal page
            document.querySelector(".cm-principalpage")
              ? (document.querySelector(".cm-principalpage").innerHTML = `
                                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCB0cmFuc2Zvcm09InJvdGF0ZSgtMi41NTY2KSIgZD0ibTQyMS42IDI2Ni43NGExNzcuMzMgMTc3LjMzIDAgMCAxLTEyNS4yNSAxNjkuNTEgMTc3LjMzIDE3Ny4zMyAwIDAgMS0xOTguODItNjkuOTQ4IDE3Ny4zMyAxNzcuMzMgMCAwIDEgOC40NzU5LTIxMC41OSAxNzcuMzMgMTc3LjMzIDAgMCAxIDIwMy44LTUzLjc0NCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjI2ZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMzkuOTMiLz4KPC9zdmc+" class="loader">
                                `)
              : "";

            // We use the langLoader
            var lang = langLoader(lang);
            lang.then((langpromise) => {
              /**
               * A function for reloading the editor if necessary
               * @param {Object} settings - An object of settings
               */
              function reloadEditor(settings) {
                document.querySelector(".cm-info").style.display = "flex";

                // RELOAD MANAGER: We remove the old editor
                document.querySelector(".cm-editor")
                  ? document.querySelector(".cm-editor").remove()
                  : "";

                // We remove the principal page if it exists
                document.querySelector(".cm-principalpage")
                  ? document.querySelector(".cm-principalpage").remove()
                  : "";

                // We set the lang in the .cm-info element
                infolang();
                var code = textToCode(content);

                /**
                 * It converts a code object to a string
                 * @param {Object} code - The code object
                 * @returns {String}
                 */
                function codeToText(code) {
                  if (code) {
                    var text = "";
                    var codeValues = Object.values(code);
                    codeValues.forEach((value, index) => {
                      if (index + 1 === codeValues.length) {
                        text += value;
                      } else {
                        text += value + "\n";
                      }
                    });
                    return text;
                  } else {
                    return "Error parsing file content.";
                  }
                }

                /**
                 * It converts a text string to a code object.
                 * @param {String} text - The string
                 * @returns {Object}
                 */
                function textToCode(text) {
                  try {
                    var textArray = text.split("\n");
                    var code_ = {};
                    textArray.forEach((line, index) => {
                      code_[index + 1] = line;
                    });
                    return code_;
                  } catch (err) {
                    console.error("Error loading file content:", err);
                    return {
                      1: "Error loading file content",
                    };
                  }
                }

                function updateEvent(state) {
                  var updateevents = window.aira.editor.updateEvents;
                  updateevents.forEach((updateEvent) => {
                    updateEvent(state);
                  });
                }

                setInterval(() => {
                  loadDetails(state);
                }, 500);

                // region Create Editor

                // We load the extensions.
                var extensions = extension(
                  langpromise,
                  settings,
                  airatheme,
                  updateEvent,
                  fetchSuggestion
                );

                // We load the EditorState.
                let state = EditorState.create({
                  doc: codeToText(code),
                  extensions: extensions,
                  tabSize: 6,
                });

                // We delete the loader.
                document.getElementById("loader-editor").style.display = "none";

                // We set the editor view in the .editorcontainer
                const view = new EditorView({ state });
                document.querySelector(".editorcontainer").prepend(view.dom);

                // We load the contextmenus
                loadContextMenus();
                document.body.classList.remove("loading-cursor");
              }

              //
              var lastSettings = "";

              function checkSettings() {
                var settings = JSON.parse(
                  decode(localStorage.getItem("DATA__SETTINGS"))
                );
                if (JSON.stringify(lastSettings) !== JSON.stringify(settings)) {
                  removeCss("editorstyle");
                  addCss(
                    "editorstyle",
                    `* {
                                                --editor-font-size: ${settings.editor.fontSize};
                                                --editor-font-family: ${settings.editor.fontFamily};
                                            }`
                  );
                  reloadEditor(settings);
                  lastSettings = settings;
                }
              }
              checkSettings();
              setInterval(checkSettings, 700);
            });
          }
          window.aira.editor.loadLanguage = editorLang;

          /**
           * Gets the editorInfo value from sessionStorage. Wich contains crucial information like
           * cursor position (line and column), the selected Text, the content, the showing lang, intellisense, etc.
           * @returns {Object} - The editor info value
           */
          window.aira.editor.info = {};
        });
      });
    });
  } else {
    NotFound();
  }
}
