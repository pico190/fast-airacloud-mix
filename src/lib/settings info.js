var isuggestions = "";
Object.keys(window.aira.editor.suggestions.registered).forEach((sm, index) => {
    if (index === 0) {
        isuggestions += '"' + sm + '"';
    } else {
        isuggestions += ' | "' + sm + '"';
    }
});

export var settingsinfo = {
    principal: {
        fontFamily: ["fontFamily", "The principal font family."],
        sidebarColorsBg: ["boolean", "Toggle the sidebar custom colors background."]
    },
    editor: {
        fontSize: ["length", "The font size of the editor"],
        fontFamily: [
            "fontFamily",
            "The font family used by the editor. You can use any font installed on your PC, or one of the fonts we host on our cloud for you. {{{See list}}}",
        ],
        fontLigatures: [
            "boolean",
            "Enable font ligatures."
        ],
        minimap: {
            enabled: [
                "boolean",
                "Toggle to enable or disable the minimap feature",
            ],
            renderCharacters: [
                "boolean",
                "Choose between rendering characters or squares in the minimap",
            ],
            showOverlay: [
                '"mouse-over" | "always"',
                "Select whether to display the position marker only on hover or always",
                '"Only on hover" | "Always"',
            ],
        },
        inlineSuggestionManagers: [
            isuggestions,
            "Select a suggestion manager for inline editor suggestions.",
        ],
        lineNumbers: ["boolean", "Toggle number lines"],
        folding: {
            enabled: ["boolean", "Toggle to enable or disable code folding"],
            show: [
                '"mouse-over" | "always"',
                "Select whether to display fold markers only on hover or always",
                '"Only on hover" | "Always"',
                true,
            ],
        },
        wordWrap: [
            '"auto" | "never" | "always"',
            "Choose the word wrapping behavior: auto, never, or always",
            '"Detect Automatically [Recommended]" | "Never use word wrapping" | "Always"',
        ],
        "look&Feel": {
            cursorWidth: [
                '"1px" | "2px" | "3px" | "4px" | "5px"',
                "Change cursor width. Defaults to 2px",
            ],
            hideActiveLineWhenSelection: [
                "boolean",
                "Hides the active line when you make a selection. Like in VSCode.",
            ],
            cursorAnimation: [
                "boolean",
                "Enables a smooth cursor position animation",
            ],
            selectionAnimation: [
                "boolean",
                "Enables a smooth selection animation (Works much better in Chromium based browsers.)",
            ],
            selectionRoundCorners: [
                "boolean",
                "Use rounded corners for selection. (Works much better in Chromium based browsers.)",
            ],
            cursorRoundCorners: [
                "boolean",
                "Use rounded corners for the cursor."
            ],
        },
        bracketPairColorization: [
            "boolean",
            "Toggle to enable or disable bracket pair colorization",
        ],
        cursorBlinking: [
            '"blink" | "smooth" | "expand" | "phase" | "solid"',
            "Cursor blinking animation",
        ],
        selectionMatch: {
            enabled: ["boolean", "Enable selection matching"],
            highlightWordAroundCursor: [
                "boolean",
                "Highlights also the word at the cursor and all the correspondent matches",
            ],
            onlyWholeWords: ["boolean", "Only highlight whole words."],
        },
        placeholder: ["input", "Set your own custom placeholder"],
    },
};
