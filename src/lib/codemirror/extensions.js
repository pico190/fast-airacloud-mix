import { EditorView, placeholder, Decoration, ViewPlugin } from "@codemirror/view";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";
import { showMinimap } from "@replit/codemirror-minimap";
import { inlineSuggestion } from "codemirror-extension-inline-suggestion";
import { basicSetup } from "../codemirror/basicSetup";
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link";
import { color } from "@uiw/codemirror-extensions-color";
import { addCss, removeCss } from "../cssManager";

/**
 * Bracket Pair Colorization
 */
 const bracketPairColorizationPlugin = ViewPlugin.fromClass(class {
  decorations;

  constructor(view) {
    this.decorations = this.getBracketDecorations(view);
  }

  update(update) {
    if (update.docChanged || update.selectionSet || update.viewportChanged) {
      this.decorations = this.getBracketDecorations(update.view);
    }
  }

  getBracketDecorations(view) {
    const { doc } = view.state;
    const decorations = [];
    const stack = [];
    const colors = [1, 2, 3, 4, 5, 6];

    for (let pos = 0; pos < doc.length; pos += 1) {
      const char = doc.sliceString(pos, pos + 1);
      if (char === '(' || char === '[' || char === '{') {
        stack.push({ type: char, from: pos });
      } else if (char === ')' || char === ']' || char === '}') {
        const open = stack.pop();
        if (open && open.type === this.getMatchingBracket(char)) {
          const color = colors[stack.length % colors.length];
          decorations.push(
            Decoration.mark({ class: `aira-bpc-${color}` }).range(open.from, open.from + 1),
            Decoration.mark({ class: `aira-bpc-${color}` }).range(pos, pos + 1),
          );
        }
      }
    }

    decorations.sort((a, b) => a.from - b.from || a.startSide - b.startSide);

    return Decoration.set(decorations);
  }

  // eslint-disable-next-line class-methods-use-this
  getMatchingBracket(closingBracket) {
    switch (closingBracket) {
      case ')': return '(';
      case ']': return '[';
      case '}': return '{';
      default: return null;
    }
  }
}, {
  decorations: (v) => v.decorations,
});

function bracketPairColorization() {
  return [
    bracketPairColorizationPlugin
  ];
}

/**
 * It loads all CodeMirror extensions (and the extensions **that depend on your settings**.)
 * @param {Object} langpromise - The result of executing langLoader()
 * @param {Object} settings - The user settings that are at localStorage
 * @param {Object} airatheme - The CodeMirror theme. **It is not the AiraCloud theme**. The AiraCloud Theme is coded with CSS. [See more](/docs/airacloud-themes-css.md)
 * @param {Function} updateEvent - A function that runs when the CodeMirror View changes.
 * @param {Function} fetchSuggestion - There is a extension that loads inline suggestions. This function fetches the suggestion.
 * @returns
 */
export default function extension(
  langpromise,
  settings,
  airatheme,
  updateEvent,
  fetchSuggestion
) {
  let create = (v) => {
    const dom = document.createElement("div");
    return { dom };
  };

  function uvent(state) {
    updateEvent(state);

    if (!settings.editor.selectionMatch.highlightWordAroundCursor) {
      var main = document.querySelector(".cm-selectionMatch-main");
      var all = document.querySelectorAll(".cm-selectionMatch");

      if (main) {
        main.setAttribute(
          "style",
          "background: none!important; outline: none!important"
        );

        all.forEach((a) => {
          if (!a.classList.contains("cm-selectionMatch-main")) {
            a.setAttribute(
              "style",
              "background: none!important; outline: none!important"
            );
          }
        });
      }
    }
  }

  var extensions = [
    airatheme, // Theme
    basicSetup,
    hyperLink,
    color,
    placeholder(settings.editor.placeholder),
    EditorView.updateListener.of(uvent),
    indentationMarkers(), // Indetantion markers
    inlineSuggestion({
      fetchFn: fetchSuggestion,
      delay: 1000,
    }),
  ];
  if (langpromise.lang) {
    extensions.push(langpromise.lang);
  }
  if (langpromise.autocomplete) {
    extensions.push(langpromise.autocomplete);
  }
  if (!settings.editor.lineNumbers) {
    addCss(
      "settingsLine",
      `.ͼ1 .cm-gutter.cm-lineNumbers { display: none!important }`
    );
  } else {
    removeCss("settingsLine");
  }
  if (!settings.editor.folding.enabled) {
    addCss(
      "settingsFold",
      `.ͼ1 .cm-gutter.cm-foldGutter { display: none!important }`
    );
  } else {
    removeCss("settingsFold");
  }
  if (settings.editor.folding.show === "mouse-over") {
    addCss(
      "settingsFoldShow",
      `.cm-gutters:hover span[title="Fold line"] {
            opacity: 1;
          }
    
          span[title="Fold line"] {
            opacity: 0;
            transition-duration: 0.1s;
          }`
    );
  } else {
    removeCss("settingsFoldShow");
  }
  if (settings.editor["look&Feel"].cursorRoundCorners) {
    addCss("cursorRoundCorners", `.cm-cursor {border-radius: 100000px;}`);
  } else {
    removeCss("cursorRoundCorners");
  }
  if (settings.editor["look&Feel"].cursorWidth) {
    addCss(
      "cursorWidth",
      `.cm-cursor {
          border-width: ${settings.editor["look&Feel"].cursorWidth}!important;
          }`
    );
  }
  if (settings.editor["look&Feel"].cursorAnimation) {
    addCss(
      "cursorAnimation",
      `.cm-cursor {
            transition-duration: 0.1s
            }`
    );
  } else {
    removeCss("cursorAnimation");
  }
  if (settings.editor["look&Feel"].selectionAnimation) {
    addCss(
      "selectionAnimation",
      `.cm-selectionBackground {
            transition-duration: 0.1s
            }`
    );
  } else {
    removeCss("selectionAnimation");
  }
  if (settings.editor.wordWrap === "always") {
    extensions.push(EditorView.lineWrapping);
  }
  if (settings.editor.minimap.enabled) {
    extensions.push(
      showMinimap.compute(["doc"], (state) => {
        return {
          create,
          displayText: settings.editor.minimap.renderCharacters
            ? "characters"
            : "blocks",
          showOverlay: settings.editor.minimap.showOverlay,
          gutters: [],
        };
      })
    );
  }

  // font ligatures
  if (!settings.editor.fontLigatures) {
    addCss("fontLigatures", `
        .editorcontainer * {
          font-variant-ligatures: none!important;
        }
      `)
  } else {
    removeCss("fontLigatures");
  }



  // cursorBlinking: [
  //   '"blink" | "smooth" | "expand" | "phase" | "solid"',
  //   "Cursor blinking animation"
  // ];
  switch (settings.editor.cursorBlinking) {
    case "blink":
      addCss(
        "cursorBlinking",
        `* {
                --animation-name: aira-blink-smooth;
                --animation-name2: aira-blink-smooth2;
              }
              .cm-cursor {
                animation-timing-function: steps(1);
              }`
      );
      break;

    case "smooth":
      addCss(
        "cursorBlinking",
        `* {
                --animation-name: aira-blink-smooth;
                --animation-name2: aira-blink-smooth2;
              }
              .cm-cursor {
                animation-timing-function: ease-in-out;
              }`
      );
      break;

    case "expand":
      addCss(
        "cursorBlinking",
        `* {
                --animation-name: aira-blink-expand;
                --animation-name2: aira-blink-expand2;
              }
              .cm-cursor {
                animation-timing-function: ease-in-out;
                animation-duration: calc(0.8s + 0.4s);
              }`
      );
      break;
    case "phase":
      addCss(
        "cursorBlinking",
        `* {
                --animation-name: aira-blink-smooth;
                --animation-name2: aira-blink-smooth2;
              }
              .cm-cursor {
                animation-timing-function: linear;
              }`
      );
      break;
  }
  if (settings.editor.bracketPairColorization) {
    extensions.push(bracketPairColorization());
  }
  langpromise.langextensions.forEach((extensionadd) => {
    extensions.push(extensionadd);
  });

  return extensions;
}
