import { settingsinfo } from "../../lib/settings info";
import { optionsArray, convertToTitleCase } from "./lib";

/**
 * A function that loads the editor settings page.
 * @param {Object} actualsettings - The actual settings
 */
export default function principalSettings(actualsettings) {
  // We load the dom
  var contenttext = `
            <div class="settings_search">
                <img loading="lazy" lightinvert src="https://swiftlystatic.vercel.app/airacloud/icon?icon=search&fill=white&regular=true" width="20px">
                <input placeholder="Search...">
            </div>
            `;

  // region createSetting
  /**
   * A function for creating a setting element
   * @param {String} key - The setting key (wordWrap, bracketPairColorization, etc.)
   * @param {String} cat - The setting category
   * @param {String} subcat - The subcategory
   */
  function createSetting(key, cat, subcat = false) {
    // We get the element in the settingsinfo
    var elem = subcat ? settingsinfo[cat][subcat][key] : settingsinfo[cat][key];
    var actualsetting = subcat
      ? actualsettings[cat][subcat][key]
      : actualsettings[cat][key];

    // Create a option html string if the setting type is a dropdown
    var options = optionsArray(elem[0]);
    var optionsText = "";
    options.forEach((option) => {
      var selected = actualsetting == option ? " selected" : "";
      optionsText += "<option" + selected + ">" + option + "</option>";
    });

    // We get the description
    var desc = elem[1];

    var value;
    switch (true) {
      // If the setting is type dropdown
      case elem[0].includes("|"):
        value = `<div class="aira-select"><select class="select-option">
                            ${optionsText}
                         </select></div>`;
        break;

      // If is type input, and the subinput types...
      case elem[0] === "input":
        value = `<input class="aira-input" placeholder="Type in..." value="${actualsetting}">`;
        break;
      case elem[0] === "fontFamily":
        value = `<div class="aira-input"><img lightinvert width="30px" loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=text&fill=white&regular=true"><input class="fontFamilyInput" placeholder="Font Family" value="${actualsetting}"></div>`;
        var text = desc;
        desc = text
          .replace(
            /{{{/,
            '<a class="aira-href" href="javascript:void(0)" onclick=\'document.querySelector(".font-list").classList.remove("closed")\'>'
          )
          .replace(/}}}/, "</a>");
        break;
      case elem[0] === "length":
        value = `<div class="aira-input"><img lightinvert width="30px" loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=resize&fill=white&regular=true"><input class="lengthInput" placeholder="Length" value="${actualsetting}"></div>`;
        break;

      // If is checkbox
      case elem[0] === "boolean":
        value = "";
        break;

      // If is another thing
      default:
        value = `Error loading option`;
        break;
    }

    // For the checkbox option
    var checked = actualsetting ? "checked" : "";
    contenttext += `
                        <div class="setting" aira-ubic="${cat}${
      subcat ? "/" + subcat : ""
    }/${key}">
                            <span class="setting-title"><b style="opacity: 0.65">Principal:</b>${
                              subcat
                                ? ` <b style="opacity: 0.8">${convertToTitleCase(
                                    subcat
                                  )}:</b>`
                                : ""
                            } ${convertToTitleCase(key)}</span>
                            <span style="display: flex; gap: 5px;">
                                ${
                                  elem[0] === "boolean"
                                    ? `<label class="checkbox"><input type="checkbox" ${checked} ><div></div></label>`
                                    : ""
                                }
                                <span>${desc}</span>
                            </span>
                            <span>${value}</span>
                        </div>`;
  }

  // A loop for creating the settings.
  Object.keys(settingsinfo.principal).forEach((key) => {
    if (JSON.stringify(settingsinfo.principal[key]).startsWith("[")) {
      createSetting(key, "principal");
    } else {
      contenttext += `<div class="setting-group">`;
      Object.keys(settingsinfo.principal[key]).forEach((keyinside) => {
        createSetting(keyinside, "principal", key);
      });
      contenttext += `</div>`;
    }
  });
  content.innerHTML = contenttext;
}
