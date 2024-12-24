import { addCss, removeCss } from "../../lib/cssManager";
import $ from "jquery";
import "../../editor.css";
import changeSettings from "../../lib/settings";
import { convertToTitleCase } from "./lib";
import { cmThemeSettings } from "./lib";
import { createNotification } from "../../lib/ui/notification manager";
import { console_error } from "../../lib/debug/console";


export default function themesSettings(actualsettings) {
  let themesData;
  let themes;
  let css = {};
  let currentPage = 0;
  const themesPerPage = 10;

  function loadEditorStyles() {
    addCss("cmSettings", cmThemeSettings);
  }

  function moveKeyToStart(key, obj) {
    if (!obj.hasOwnProperty(key)) {
      console.error("error fachero", key, "a: ", obj);
    }
    let { [key]: value, ...rest } = obj;
    let newObject = { [key]: value, ...rest };
    return newObject;
  }

  function loadStyles(styles) {
    removeCss("themessettingscss");
    addCss("themessettingscss", Object.values(styles).join("\n"));
  }

  async function createEditor(name, by, verified = false, desc, id, group = false, info = true, key) {
    var content = `
    ${group ? `<div class="group-bg" data-color-scheme="${id}" aira-theme="${key}">` : ``}
    <div class="editorcontainer" data-color-scheme="${id}">
      <div class="cm-editor ͼ1 ͼ3 ͼ4 ͼq cm-focused">
        <div tabindex="-1" class="cm-scroller">
          <div class="cm-gutters" aria-hidden="true" style="min-height: 134px; position: sticky;">
            <div class="cm-gutter cm-lineNumbers">
              <div class="cm-gutterElement" style="height: 25.2px; margin-top: 4px;">1</div>
              <div class="cm-gutterElement cm-activeLineGutter" style="height: 25.2px;">2</div>
              <div class="cm-gutterElement" style="height: 25.2px;">3</div>
              <div class="cm-gutterElement" style="height: 25.2px;">4</div>
              <div class="cm-gutterElement" style="height: 25.2px;">5</div>
            </div>
          </div>
          <div style="tab-size: 4; flex-basis: 1750px;" class="cm-content" role="textbox" aria-multiline="true" data-language="javascript" aria-autocomplete="list"><div class="cm-line"><span class="ͼ2p">export</span> <span class="ͼ2n">default</span> <span class="ͼ2o">function</span> <span class="ͼ16 ͼ1e" style="color: var(--cm-variable-name-function) !important;">App</span><span class="aira-bpc-1"><span class="ͼ2c">(</span></span><span class="aira-bpc-1"><span class="ͼ2c">)</span></span> <span class="aira-bpc-1"><span class="ͼ2a">{</span></span></div><div class="cm-indent-markers cm-line cm-activeLine" style="--indent-markers: repeating-linear-gradient(to right, var(--indent-marker-active-bg-color) 0 1px, transparent 1px 2ch) 0.5ch/calc(2ch - 1px) no-repeat;">  <span class="ͼ2n">return</span> <span class="aira-bpc-2"><span class="ͼ2c">(</span></span></div><div class="cm-indent-markers cm-line" style="--indent-markers: repeating-linear-gradient(to right, var(--indent-marker-active-bg-color) 0 1px, transparent 1px 2ch) 0.5ch/calc(2ch - 1px) no-repeat,repeating-linear-gradient(to right, var(--indent-marker-bg-color) 0 1px, transparent 1px 2ch) 2.5ch/calc(2ch - 1px) no-repeat;">       <span class="ͼ1f">&lt;</span><span class="ͼ14">h1</span><span class="ͼ1f">&gt;</span><span class="ͼr">Thanks for using AiraCloud</span><span class="ͼ1f">&lt;/</span><span class="ͼ14">h1</span><span class="ͼ1f">&gt;</span></div><div class="cm-indent-markers cm-line" style="--indent-markers: repeating-linear-gradient(to right, var(--indent-marker-active-bg-color) 0 1px, transparent 1px 2ch) 0.5ch/calc(2ch - 1px) no-repeat;">  <span class="aira-bpc-2"><span class="ͼ2c">)</span></span></div><div class="cm-line"><span class="aira-bpc-1"><span class="ͼ2a">}</span></span></div></div>
          <div class="cm-layer cm-layer-above cm-cursorLayer" aria-hidden="true" style="z-index: 150; animation-duration: 1200ms; animation-name: cm-blink;">
            <div class="cm-cursor cm-cursor-primary" style="left: 170.833px; top: 30.3px; height: 23px;"></div>
          </div>
          <div class="cm-layer cm-selectionLayer" aria-hidden="true" style="z-index: -2;">
            <div class="cm-selectionBackground" style="left: 170.833px; top: 30.29px; width: 1639.57px; height: 23.01px; border-top-left-radius: var(--firefox-selection-border-radius); border-top-right-radius: var(--firefox-selection-border-radius);"></div>
            <div class="cm-selectionBackground" style="left: 60px; top: 53.29px; width: 1750.4px; height: 27.41px; border-top-left-radius: ; border-top-right-radius: ; border-bottom-right-radius: ;border-top-left-radius: var(--firefox-selection-border-radius);"></div>
            <div class="cm-selectionBackground" style="left: 60px; top: 80.69px; width: 33.25px; height: 23.01px; border-bottom-left-radius: var(--firefox-selection-border-radius); border-bottom-right-radius: var(--firefox-selection-border-radius);"></div>
          </div>
        </div>
      </div>
      <div class="cm-info">
        <span><b>${name}</b>${info ? ` | <font style="opacity: 0.5;">by <b>${verified ? `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 116.87" style="width: 18px;transform: translate(3px, 2px);fill: var(--text);"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>verify</title><path class="cls-1" d="M61.37,8.24,80.43,0,90.88,17.78l20.27,4.54-2,20.53,13.73,15.58L109.2,73.87l2,20.68L91,99,80.43,116.87l-18.92-8.25-19.06,8.25L32,99.08,11.73,94.55l2-20.54L0,58.43,13.68,43,11.73,22.32l20.15-4.45L42.45,0,61.37,8.24ZM37.44,64.55c-6.07-6.53,3.25-16.26,10-10.1,2.38,2.17,5.84,5.34,8.24,7.49L74.18,39.18C80.62,32.53,90.79,42.3,84.43,49L61.2,76.72a7.13,7.13,0,0,1-9.91.44C47.35,73.41,41.57,68,37.44,64.55Z"></path></svg>` : ""} ${by}</b></font></span>
        <span style="opacity: 0.7">${desc}</span>` : `</span>`}
      </div>
    </div>
    ${group ? `</div>` : ``}`;
    const data = await $.get(
      "https://raw.githubusercontent.com/swiftlygh/airacloud-marketplace/main/themes/" +
      id +
      ".css"
    );
    css[id] = data;
    return content;
  }

  async function loadMoreThemes(theme) {
    const startIndex = currentPage * themesPerPage;
    const keys = Object.keys(themes).slice(startIndex, startIndex + themesPerPage);

    for (const key of keys) {
      const themeData = themes[key];
        const content = await createEditor(
          convertToTitleCase(key),
          themeData.by,
          themeData.verified,
          themeData.desc,
          themeData.group ? themeData.group[0] : key,
          themeData.group,
          true,
          key
        );
        $('#content').append(content);
    }

    currentPage++;

    if ((startIndex + themesPerPage >= Object.keys(themes).length) && (document.querySelector("#content").lastChild.tagName !== "CENTER")) {
      $('#content').append('<center style="width: 100%;display: flex;justify-content: center;margin: 30px 0px;"><span style="opacity: 0.5;">You arrived to the end of the list.</span></center>');
    }
    loadStyles(moveKeyToStart(theme, css));
    document.querySelectorAll(".editorcontainer").forEach(theme => {
      if (!theme.parentElement.classList.contains("group-bg")) {
        theme.onclick = async () => {
          var themeID = theme.getAttribute("data-color-scheme");
          loadStyles(moveKeyToStart(themeID, css));
          document.body.setAttribute("data-color-scheme", themeID);
          changeSettings(settings => {
            var settings2 = settings;
            settings2.themes.theme = themeID;
            return settings2;
          });
          createNotification("Theme applied", `<font>The <b>${convertToTitleCase(themeID)}</b> theme was applied</font>`);
        }
      }
    });
    document.querySelectorAll(".group-bg").forEach(theme => {
      theme.onclick = async () => {
          var themeID = theme.getAttribute("aira-theme");
          var info = {
            name: convertToTitleCase(themeID),
            by: themes[themeID].by,
            verified: themes[themeID].verified,
            desc: themes[themeID].desc,
            group: themes[themeID].group
          }
          openThemeGroup(info.name, info.by, info.verified, info.desc, info.group)
      }
    });
  }

  async function openThemeGroup(name, by, verified = false, desc, group) {
    var modal = document.createElement("div");
    modal.className = "modal-container themes-sp";
    var content = `
    <div class="account-icon modal-close" onclick='document.querySelector(".modal-container").remove();'><img lightinvert="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=close&amp;fill=whitesmoke" loading="lazy" alt=""></div>
    <div>
      <div class="theme_name">
        <div class="theme_name_title">
          <h1>${name}</h1>
          <span><b>${verified ? `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 116.87" style="width: 18px;transform: translate(3px, 2px);fill: var(--text);"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>verify</title><path class="cls-1" d="M61.37,8.24,80.43,0,90.88,17.78l20.27,4.54-2,20.53,13.73,15.58L109.2,73.87l2,20.68L91,99,80.43,116.87l-18.92-8.25-19.06,8.25L32,99.08,11.73,94.55l2-20.54L0,58.43,13.68,43,11.73,22.32l20.15-4.45L42.45,0,61.37,8.24ZM37.44,64.55c-6.07-6.53,3.25-16.26,10-10.1,2.38,2.17,5.84,5.34,8.24,7.49L74.18,39.18C80.62,32.53,90.79,42.3,84.43,49L61.2,76.72a7.13,7.13,0,0,1-9.91.44C47.35,73.41,41.57,68,37.44,64.55Z"></path></svg>` : ""} ${by}</b></span>
        </div>
        <span style="opacity: 0.7">${desc}</span>
      </div>
    </div>
    <div class="theme-list">`;

    for (const item of group) {
        content += await createEditor(
            convertToTitleCase(item),
            "",
            false,
            "",
            item,
            false,
            false ,
            item
          );
    }
    content += `</div>`;
    modal.innerHTML = content;
    document.body.prepend(modal);
  }

  function handleScroll() {
    const contentDiv = $(".content-display-content");
    const scrollTop = contentDiv.scrollTop();
    const scrollHeight = contentDiv.prop('scrollHeight');
    const clientHeight = contentDiv.prop('clientHeight');

    if (scrollTop + clientHeight >= scrollHeight) {
      loadMoreThemes();
    }
  }

  async function load() {
    const contentDiv = $('#content');
    contentDiv.html(`<br>`);
    $('.content-display-content').on('scroll', handleScroll);

    themesData = await $.get(
      "https://raw.githubusercontent.com/swiftlygh/airacloud-marketplace/main/themes.json"
    );
    themes = JSON.parse(themesData);

    await loadMoreThemes(actualsettings.themes.theme);

    loadEditorStyles();
    removeCss("theme");
  }

  load();
}
