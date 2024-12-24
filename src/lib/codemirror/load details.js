/**
 * ? loadDetails
 * It loads codemirror details.
 */

import { spaces, hexToRgb } from "../generalfuncs";
import { decode } from "js-base64";
import $ from "jquery";

/**
 * A function that loads all the CodeMirror details. It should run in an update event at CodeMirror View.
 * @returns {boolean}
 */
export function loadDetails() {

  document.querySelector(".cm-scroller").classList.add("airacloud-scrollable-item")

  // Details
  Array.from(document.querySelectorAll('span[title="Fold line"]')).forEach(
    (elem) => {
      elem.innerHTML = `<img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=chevron-down&fill=white" alt="v" class="foldicon" loading="lazy">`;
    }
  );
  Array.from(document.querySelectorAll('span[title="Unfold line"]')).forEach(
    (elem) => {
      elem.innerHTML = `<img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=chevron-forward&fill=white" alt=">" class="foldicon foldclosed" loading="lazy">`;
    }
  );
  var allvardefinitions = document.querySelectorAll(".ͼ16");
  allvardefinitions.forEach((vdef) => {
    if (vdef.previousElementSibling) {
      if (
        vdef.previousElementSibling.innerText == "function" ||
        vdef.previousElementSibling.innerText == "def"
      ) {
        vdef.style.setProperty(
          "color",
          "var(--cm-variable-name-function)",
          "important"
        );
      }
    }
  });

var linesT = document.querySelectorAll(".cm-gutter.cm-lineNumbers .cm-gutterElement");

  var lines = document.querySelectorAll(".cm-line");

  var lastLine = lines[lines.length - 1];
  var lastlT = linesT[linesT.length - 1]

	linesT.forEach(lnT => {
		lnT.style.opacity = 1;
	}) 

 if(spaces(lastLine.innerText) && !lastlT.classList.contains("cm-activeLineGutter")) {
    lastlT.style.opacity = 0.4
  } else {
    lastlT.style.opacity = 1
  }

  var lang = window.aira.editor.languages.actual;

  if (lang == "javascriptreact" || lang == "typescriptreact") {
    var allvars = document.querySelectorAll(".ͼ15");
    allvars.forEach((vdef) => {
      var vdeffirstletter = vdef.innerText.split("")[0];
      if (vdeffirstletter == vdeffirstletter.toUpperCase()) {
        vdef.style.setProperty("color", "var(--cm-tag-name)", "important");
      }
    });
  }

  switch (window.aira.editor.languages.actual) {
    case "javascript":
    case "typescript":
    case "javascriptreact":
    case "typescriptreact":
      var allvars_ = document.querySelectorAll(".ͼ16");
      allvars_.forEach((var_) => {
        var nelem = var_.nextElementSibling;
        if (nelem) {
          if (
            nelem.innerText.startsWith("(")
          ) {
            var_.classList.add("ͼ17");
          }
        }
      });
      break;
    
    case "css":
      var advCss = document.querySelectorAll(".ͼ18");
      advCss.forEach(cssProp => {
        if (cssProp.innerText.startsWith("--")) {
          cssProp.classList.add("ͼss1");
        } else if (cssProp.innerText.startsWith("-")) {
          cssProp.classList.add("ͼss2");
        }
      })

      var lbNames = document.querySelectorAll(".ͼx");
      lbNames.forEach(labelname => {
        if (labelname.previousElementSibling?.innerText.startsWith("@") || labelname.parentElement?.previousElementSibling?.innerText.startsWith("@")) {
          labelname.classList.add("ͼss3")
        }
      })

    case "kotlin":
      document.querySelectorAll(".ͼ16").forEach((vardef) => {
        var previousElem = vardef.previousElementSibling;
        var nextElem = vardef.nextElementSibling;
        if (previousElem) {
          if (previousElem.innerText === "fun") {
            vardef.classList.add("ͼ17");
          } else if (previousElem.innerText === "class") {
            vardef.classList.add("ͼ1g");
          }
        }
        if (nextElem) {
          if (nextElem.innerText.startsWith("(")) {
            vardef.classList.add("ͼ17");
          }
        }
      });
      document.querySelectorAll(".ͼ15").forEach((vardef) => {
        var nextElem = vardef.nextElementSibling;
        if (nextElem) {
          if (nextElem.innerText.startsWith("(")) {
            vardef.classList.add("ͼ17");
          }
        }
      });
      break;
  }

  var actualsettings = JSON.parse(
    decode(localStorage.getItem("DATA__SETTINGS"))
  );

  if (actualsettings.editor["look&Feel"].hideActiveLineWhenSelection) {
    if (document.querySelector(".cm-selectionBackground")) {
      document.querySelector(".cm-activeLine").style.backgroundColor =
        "transparent";
    }
  }
  if (actualsettings.editor["look&Feel"].selectionRoundCorners) {
    function isFirefox() {
      return navigator.userAgent.indexOf("Firefox") !== -1;
    }

    if (isFirefox()) {
      var selectionElements = document.querySelectorAll(
        ".cm-selectionBackground"
      );
      var selection = selectionElements[0];

      if (selectionElements.length == 1) {
        selection.style.borderRadius = "var(--firefox-selection-border-radius)";
      } else if (selectionElements.length == 2) {
        var left1 = selection.offsetLeft;
        var computedStyle = window.getComputedStyle(
          selection.nextElementSibling
        );
        var left2num = parseInt(computedStyle.getPropertyValue("right"));
        var left2 = Math.abs(left2num);

        if (left1 >= left2) {
          selection.style.borderRadius =
            "var(--firefox-selection-border-radius)";
          selection.nextElementSibling.style.borderRadius =
            "var(--firefox-selection-border-radius)";
        } else {
          selection.style.borderRadius =
            "var(--firefox-selection-border-radius)";
          selection.style.borderBottomLeftRadius = "0px";
          selection.nextElementSibling.style.borderRadius =
            "var(--firefox-selection-border-radius)";
          selection.nextElementSibling.style.borderTopRightRadius = "0px";
        }
      } else if (selectionElements.length == 3) {
        var selection2 = selection.nextElementSibling;
        var selection3 = selection2.nextElementSibling;

        if (selection.offsetLeft > selection2.offsetLeft) {
          selection.style.borderTopLeftRadius =
            "var(--firefox-selection-border-radius)";
          selection.style.borderTopRightRadius =
            "var(--firefox-selection-border-radius)";
          selection2.style.borderRadius =
            "var(--firefox-selection-border-radius)";
          selection2.style.borderBottomLeftRadius = "0px";
        } else {
          selection.style.borderTopLeftRadius =
            "var(--firefox-selection-border-radius)";
          selection.style.borderTopRightRadius =
            "var(--firefox-selection-border-radius)";
          selection2.style.borderRadius =
            "var(--firefox-selection-border-radius)";
          selection2.style.borderBottomLeftRadius = "0px";
          selection2.style.borderTopLeftRadius = "0px";
        }

        if (selection3.offsetWidth <= 5) {
          selection2.style.borderBottomLeftRadius =
            "var(--firefox-selection-border-radius)";
          selection2.style.borderBottomLeftRadius =
            "var(--firefox-selection-border-radius)";
        }

        selection3.style.borderBottomLeftRadius =
          "var(--firefox-selection-border-radius)";
        selection3.style.borderBottomRightRadius =
          "var(--firefox-selection-border-radius)";
      }
    }
  }

  // document.querySelectorAll("span").forEach(span => {
  //     if(span.innerText===">") {
  //         var spanstyle = window.getComputedStyle(span);
  //         var cssvarjson = hexToRgb(spanstyle.getPropertyValue('--cm-md-meta'))
  //         var cssvar = `rgb(${cssvarjson.r}, ${cssvarjson.g}, ${cssvarjson.b})`
  //         if(cssvar === spanstyle.color) {
  //             span.classList.add("cm-md-quote")
  //         }
  //     }
  // })

  // Minimap
  if (navigator.userAgent.indexOf("Firefox") == -1) {
    var scrollbehavior = document.getElementById("scrollbehavior");

    $(".cm-minimap-overlay").mousedown(function () {
      scrollbehavior.innerHTML = `
                    * {
                      --scroll-behavior: unset!important;
                    }
                    `;
    });

    $(".cm-minimap-overlay").mouseup(function () {
      scrollbehavior.innerHTML = `
                    * {
                      --scroll-behavior: smooth!important;
                    }`;
    });
  }

  return true;
}

// region endDetails

function getDeepestChild(element) {
  let current = element;

  while (current.children.length > 0) {
    current = current.children[0];
  }

  return current;
}

function getCMCSS() {
  var stylecm = document.head.querySelector("style").innerText;
  var css = stylecm
    .split(".ͼr {color: var(--cm-content);}")[1]
    .split(".ͼq .cm-content")[0];
  return cssToJSON(css);
}
function cssToJSON(cssString) {
  const json = {};
  const regex = /\.([\w\u0370-\u03FF]+)\s*\{([^\}]*)\}/g;
  let match;

  while ((match = regex.exec(cssString)) !== null) {
    const className = match[1];
    const styles = match[2]
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    const styleObject = {};

    styles.forEach((style) => {
      const [property, value] = style.split(":").map((s) => s.trim());
      styleObject[property] = value;
    });

    json[className] = styleObject;
  }

  return json;
}
export function getElementType(selectedword) {
  var types = [];
  var tokenstyles = getCMCSS();
  var children = getDeepestChild(selectedword);
  var actualtokencss = children.className.split(" ");
  actualtokencss.forEach((tokentype) => {
    if (tokenstyles[tokentype]) {
      types.push(
        tokenstyles[tokentype].color.replace("var(--cm-", "").replace(")", "")
      );
    }
  });
  return types;
}
export function getPositionType() {
  var selectedword = document.querySelector(".cm-selectionMatch-main");
  if (selectedword) {
    var types = getElementType(selectedword);
    return types;
  }
}
export function getPositionElem() {
  var selectedword = document.querySelector(".cm-selectionMatch-main");
  window.aira.editor.info.selectedWord = selectedword;
  return selectedword;
}
