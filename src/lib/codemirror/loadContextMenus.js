import { applyCMenu } from "../contextmenu";
import { copyTextToClipboard } from "../generalfuncs";

/**
 * It loades Editor Context Menus (copy, delete lines... etc)
 */
export function loadContextMenus() {
  applyCMenu(document.querySelector(".cm-content"), () => {
    if (document.querySelector(".cm-selectionBackground")) {
      return [
        {
          label: "Copy",
          icon: "copy",
          action: () => {
            var selectedText = window.aira.editor.info.selectedText;
            copyTextToClipboard(selectedText);
          },
        },
        {
          label: "Delete",
          icon: "trash",
          fill: "#ff6b6b",
          action: () => alert("Eliminar"),
        },
      ];
    } else {
      var copylinetext = "Copy Line";
      var deletelinetext = "Delete Line";
      if (document.querySelectorAll(".cm-activeLine").length >= 2) {
        copylinetext = "Copy Lines";
        deletelinetext = "Delete Lines";
      }
      return [
        {
          label: copylinetext,
          icon: "copy",
          action: () => {
            var texttocopy = "";
            document.querySelectorAll(".cm-activeLine").forEach((line) => {
              texttocopy += line.innerText;
            });
            alert(texttocopy);
            copyTextToClipboard(texttocopy);
          },
        },
        {
          label: deletelinetext,
          icon: "trash",
          fill: "#ff6b6b",
          action: () => alert("Eliminar"),
        },
      ];
    }
  });

  applyCMenu(document.querySelector(".cm-minimap-gutter"), () => {
    return [
      {
        label: "Minimap",
        icon: "checkmark",
        action: () => alert("Disable Minimap"),
      },
      "separator",
      {
        label: "Represent characters",
        icon: "checkmark",
        action: () => alert("Disable Characters"),
      },
    ];
  });
}
