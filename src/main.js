/*
  _    _              ___  _                _           __ 
   /_\  (_) _ _  __ _  / __|| | ___  _  _  __| |   __ __ / / 
  / _ \ | || '_|/ _` || (__ | |/ _ \| || |/ _` |   \ V // _ \
 /_/ \_\|_||_|  \__,_| \___||_|\___/ \_,_|\__,_|    \_/ \___/

 Developed By Swiftly. 
 * File loader

*/

const version = "6.8.3-ALPHA";
const cVersion = "0.1.0";

import "./style.css";
import "./accessibility.css"; // accesibilidad
import { urlParser } from "./lib/generalfuncs";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { defaultsettings } from "./lib/default settings.js";
import { encode } from "js-base64";
import { console_start, console_info } from "./lib/debug/console.js";
import { addCss, removeCss } from "./lib/cssManager.js";
import { decode } from "js-base64";
import $ from "jquery";
import changeSettings from "./lib/settings.js";
import { convertToTitleCase } from "./pages/settings/lib.js";
import { closeInput, createInput } from "./lib/ui/input.js";
import { closeModal, createModal } from "./lib/ui/modal.js";
import { createNotification } from "./lib/ui/notification manager.js";

try {
    // Load the default settings
    if (!localStorage.getItem("DATA__SETTINGS")) {
        localStorage.setItem(
            "DATA__SETTINGS",
            encode(JSON.stringify(defaultsettings))
        );
    }

    // Global css settings.
    var settings = JSON.parse(decode(localStorage.getItem("DATA__SETTINGS")));
    var theme = settings.themes.theme;
    if (theme) {
        $.get(
            "https://raw.githubusercontent.com/swiftlygh/airacloud-marketplace/main/themes/" +
                theme +
                ".css",
            (data) => {
                console_info(convertToTitleCase(theme) + ": Theme loaded")
                addCss("theme", data);
            }
        );
        document.body.setAttribute("data-color-scheme", theme);
    } else {
        localStorage.setItem(
            "DATA__SETTINGS",
            encode(JSON.stringify(defaultsettings))
        );
        window.location.reload();
    }

    addCss(
        "settings",
        `
  * {
    --principal-font-family: ${
        settings.principal
            ? settings.principal.fontFamily
            : () => {
                  localStorage.setItem(
                      "DATA__SETTINGS",
                      encode(JSON.stringify(defaultsettings))
                  );
                  window.location.reload();
              }
    };
  }
`
    );

    if (!settings.principal.sidebarColorsBg) {
        addCss("sbColorsBG", `
            .sidebar-bg {
                display: none!important;
            }
            `)
    } else {
        removeCss("sbColorsBG");
    }

    // Vercel Analytics
    injectSpeedInsights();
    inject();

    // We parse the url
    var url = urlParser();

    window.aira = {
        pages: {},
        editor: {
            suggestions: {
                registered: {},
            },
        },
        settings: {
            getSettings: () => {
                return JSON.parse(
                    decode(localStorage.getItem("DATA__SETTINGS"))
                );
            },
            changeSettings: changeSettings,
        },
        engineVersion: version,
        clientVersion: cVersion,
        ui: {
            createInput: createInput,
            closeInput: closeInput,

            createModal: createModal,
            closeModal: closeModal,
            
            createNotification: createNotification
        },
        //partyMode: true,
    };
    var pages = {};


    // Suggestion manager - It has to be an extension that keeps the suggestion manager.
    // -> If the user installs multiple suggestion extensions, it selects wich extension to use at Editor Settings.

    /**
     * It register a suggestion manager. The user selects the suggestion manager in settings.
     *
     * > It has to be registered at the start of the extension or it will not work.
     * @param {Function} event - A function to execute when inline suggestion is required. *Args*: editorInfo
     * @param {String} name - The name in Title Case for registering in settings for user selecting.
     */
    window.aira.editor.suggestions.registerSuggestionManager = (
        name,
        event
    ) => {
        window.aira.editor.suggestions.registered[name] = event;
        return true;
    };

    window.aira.editor.suggestions.registerSuggestionManager("None", (info) => {
        return "";
    });
    window.aira.editor.suggestions.registerSuggestionManager("Pene", (info) => {
        return "pene";
    });
    window.aira.editor.suggestions.registerSuggestionManager(
        "Super IA Gratuita de locos aalkdjalsfjlakf",
        (info) => {
            return "; (no hay ia de autocompletado, esto es mentira, un saludo crack.)";
        }
    );

    var builtinext = ["partyMode"];

    /**
     * Loads the projects
     * @returns {Array} - An array of projects
     */
    function loadProjects() {
        console_info("Projects loaded");
        return [
            {
                name: "Project Test",
                type: "ts",
                token: "Ys9m543tzYn2BMQLiZotz8r",
            },
        ];
    }

    /**
     * A function for detecting when you go offline
     */
    function offlineDetector() {
        var lastOnline = true;
        setInterval(() => {
            if (navigator.onLine != lastOnline) {
                lastOnline = navigator.onLine;
                if (lastOnline) {
                    console_info("You are online again.");
                } else {
                    console_info("You are offline!");
                }
            }
        }, 1);
    }

    // region Page Switch
    switch (url[0]) {
        case "":
        case undefined:
        case null:
            window.location.href = "/home/";
            break;

        // Principal
        case "home":
            document.body.setAttribute("airacloud:in", "home");
            import("./pages/home.js").then((module) => {
                const Load = module.default;
                console_start();
                Load(loadProjects());
                offlineDetector();
            });
            pages.home = "home";
            break;
        case "editor":
            document.body.setAttribute("airacloud:in", "editor");
            import("./pages/editor.js").then((module) => {
                const Load = module.default;
                console_start();
                Load(loadProjects(), url);
                offlineDetector();
            });
            pages.editor = "editor";
            break;
        case "settings":
            document.body.setAttribute("airacloud:in", "settings");
            import("./pages/settings.js").then((module) => {
                const Load = module.default;
                console_start();
                Load();
                offlineDetector();
            });
            pages.settings = "settings";
            break;
        case "explore":
            document.body.setAttribute("airacloud:in", "explore");
            import("./pages/explore.js").then((module) => {
                const Load = module.default;
                Load();
            });
            pages.explore = "explore";
            break;

        // Blog
        case "blog":
            document.body.setAttribute("airacloud:in", "blog");
            switch (url[1]) {
                case "":
                case undefined:
                case null:
                    import("./pages/lost.js").then((module) => {
                        const Load = module.default;
                        Load();
                    });
                    break;

                case "tutorials":
                    import("./pages/blog/blog.js").then((module) => {
                        const Load = module.default;
                        Load(url);
                    });
                    break;

                default:
                    import("./pages/lost.js").then((module) => {
                        const Load = module.default;
                        Load();
                    });
                    break;
            }
            pages.blog = "blog";
            break;

        // Interactive Examples
        /*case "interactive-example-customize-Pe12y4rHvXgN":
            import("./pages/interactiveexamples/customize.js").then(
                (module) => {
                    const Load = module.default;
                    Load();
                }
            );
            break;*/

        // Dev
        case "dev":
            document.body.setAttribute("airacloud:in", "dev");
            switch (url[1]) {
                case "":
                case undefined:
                case null:
                    import("./pages/lost.js").then((module) => {
                        const Load = module.default;
                        Load();
                    });
                    break;

                case "reset-settings":
                    console_start();
                    localStorage.setItem(
                        "DATA__SETTINGS",
                        encode(JSON.stringify(defaultsettings))
                    );
                    document.querySelector("#app").innerHTML =
                        "¡Done! You now can close this page.";
                    console_info(
                        "All settings was reseted to the latest version"
                    );
                    break;

                case "delete-settings":
                    console_start();
                    localStorage.removeItem("DATA__SETTINGS");
                    document.querySelector("#app").innerHTML =
                        "¡Done! You now can close this page.";
                    console_info("All settings were deleted");
                    break;

                default:
                    import("./pages/lost.js").then((module) => {
                        const Load = module.default;
                        Load();
                    });
                    break;
            }
            pages.dev = "dev";
            break;

        // 404
        default:
            document.body.setAttribute("airacloud:in", "lost");
            import("./pages/lost.js").then((module) => {
                const Load = module.default;
                Load();
            });
            pages.default = "default";
            break;
    }

    window.aira.pages = pages;
} catch (err) {
    localStorage.removeItem("DATA__SETTINGS");
    window.location.reload();
}
