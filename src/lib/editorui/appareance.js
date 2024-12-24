import { enableFullScreen, disableFullScreen } from "../generalfuncs";

export function toggleZenMode() {
    if (window.aira.editor.appareance?.zenMode) {
        disableFullScreen();
        document.querySelector(".content").classList.remove("zen-mode");
        document.querySelector(".view").classList.remove("zen-mode");
    } else {
        enableFullScreen(document.body)
        document.querySelector(".content").classList.add("zen-mode");
        document.querySelector(".view").classList.add("zen-mode");
        window.aira.ui.createModal("Welcome to Zen Mode", `<p style="opacity: 0.8">For exiting Zen-mode you can use <keybind>Esc</keybind> or <keybind>Ctrl + Shift + Z</keybind></p>`);

    }
}