/*
  _    _              ___  _                _           __ 
   /_\  (_) _ _  __ _  / __|| | ___  _  _  __| |   __ __ / / 
  / _ \ | || '_|/ _` || (__ | |/ _ \| || |/ _` |   \ V // _ \
 /_/ \_\|_||_|  \__,_| \___||_|\___/ \_,_|\__,_|    \_/ \___/

 Developed By Swiftly. 
 * /settings page

*/

import editorSettings from "./settings/editor";
import { decode } from "js-base64";
import {addCss, removeCss} from "../lib/cssManager";
import changeSettings from "../lib/settings";
import themesSettings from "./settings/themes";
import $ from "jquery"
import princpalSettings from "./settings/principal";
import confetti from 'canvas-confetti';


/**
 * It loads the settings page
 */
export default function Settings() {
  // region DOM

  // We set the dom
  document.querySelector("#app").innerHTML = `
  <div class="content full">
    <div class="title">
        <img lightinvert loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=settings&fill=0xC5D6FF">
        <h1>Settings</h1>
    </div>
    <style>
      .content {
      transform: none!important;}
    </style>
    <div class="content-display">
        <div class="fcontent-itemselector">
            <div class="itemselector-active"></div>
            <div class="itemselector-hover"></div>

            <div data-name="principal" class="fcontent-item active"><img lightinvert loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=settings&amp;fill=white&amp;regular=true"><span>Principal</span></div>
            <div data-name="editor" class="fcontent-item"><img lightinvert loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=code-slash&amp;fill=white&amp;regular=true"><span>Editor Settings</span></div>
            <div data-name="themes" class="fcontent-item"><img lightinvert loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=brush&amp;fill=white&amp;regular=true"><span>Themes</span></div>
            ${
              window.aira.settings.getSettings().developerMode ? `<div data-name="experiments" class="fcontent-item"><img lightinvert loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=flask&amp;fill=white&amp;regular=true"><span>Experiments</span></div>` : ``
            }
            ${
              window.aira.partyMode ? `<div data-name="partymode" class="fcontent-item"><img lightinvert loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=party&amp;fill=white&amp;regular=true"><span>Party Mode</span></div>` : ``
            }

        </div>
    
        <div class="content-display-content">
            <div class="cdc-info">
                <img lightinvert loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=warning&amp;fill=white&amp;regular=true">
                <div class="cdc-info-content">
                   <b>Warning</b>
                   <span>You have not synced your settings with your Swiftly ID account, click sync or enable <code>settings auto-sync</code></span>
                </div>
                <button>
                    <img lightinvert loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=sync&fill=white&regular=true"> 
                    Sync
                </button>
            </div>
            <font id="content"></font>
        </div>
    </div>
  </div>
  <div class="font-list closed">
    <div class="modal-title">
      <h1>Cloud Font List</h1>
      <button close onclick='document.querySelector(".font-list").classList.add("closed")'>
        <img loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=close&fill=white&regular=true">
      </button>
    </div>
    <p>AiraCloud offer a list of fonts that are hosted on our cloud, so you can use certain fonts on your editor without the need to download them.
    <p>Supported fonts are:</p>
    <ul class="font-list-ul">
      <li><span style="font-family: 'Consolas'">Consolas</span></li>
      <li><span style="font-family: 'Fira Code'">Fira Code</span></li>
      <li><span style="font-family: 'Source Code Pro'">Source Code Pro</span></li>
      <li><span style="font-family: 'Hack'">Hack</span></li>
      <li><span style="font-family: 'JetBrains Mono'">JetBrains Mono</span></li>
    </ul>
  </div>
   `;

  // region Pages content

  // We get the localStorage settings value.
  var actualsettings = JSON.parse(
    decode(localStorage.getItem("DATA__SETTINGS"))
  );

  /**
   * A function that loads the content of a settings page
   */
  function loadContent() {

    var hashes = ["#principal", "#editor", "#themes", "#experiments", "#party"];
    if (!hashes.includes(window.location.hash)) {
      window.location.href = "#principal";
    }

    // We get the content element
    var content = document.getElementById("content");

    // Pages switch
    var hash = window.location.hash;
    if (hash === "#principal") {
      princpalSettings(actualsettings);
    } else if (hash === "#editor") {
      editorSettings(actualsettings);
    } else if (hash === "#themes") { 
      themesSettings(actualsettings)
    } else if (hash === "#party") { 
      confetti({});
    } else {
      content.innerHTML = `<br><br><br>
      <center>
        <img lightinvert loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=albums&fill=white" style="opacity: 0.6; height: 140px;">
        <h3 style="opacity: 0.6">Nothing to see here.</h3>
      </center>`;
    }
    document.querySelectorAll("input, select").forEach((elem) => {
      elem.addEventListener("change", () => {
        var elemInput = elem;

        while (elem && !elem.classList.contains("setting")) {
          elem = elem.parentElement;
        }

        if (elem && elem.classList.contains("setting")) {
          if (elemInput.style.color != "rgb(255, 156, 156)") {
            var values = elem.getAttribute("aira-ubic").split("/");
            var lastValue =
              values.length == 3
                ? actualsettings[values[0]][values[1]][values[2]]
                : actualsettings[values[0]][values[1]];

            var actualValue =
              elemInput.type == "checkbox"
                ? elemInput.checked
                : elemInput.value;

            if (lastValue != actualValue) {
              elem.classList.add("modified");
              changeSettings((settings) => {
                var newsettings = settings;
                values.length == 3
                  ? (newsettings[values[0]][values[1]][values[2]] = actualValue)
                  : (newsettings[values[0]][values[1]] = actualValue);
                return newsettings;
              });
            }
          } else {
            elem.classList.remove("modified");
          }
        } else {
          alert("Error saving settings.");
        }
      });
    });
  }
  loadContent();

  // region Animations

  /**
   * An animation of the selected page
   */
  var loadSelected = () => {
    var elem = document.querySelector(
      "[data-name=" + window.location.hash.replace("#", "") + "]"
    );
    elem.classList.add("active");

    var mouseactive = document.querySelector(".itemselector-active");
    mouseactive.style.width = elem.offsetWidth + "px";
    mouseactive.style.height = elem.offsetHeight + "px";
    mouseactive.style.top = elem.offsetTop + "px";
    mouseactive.style.left = elem.offsetLeft + "px";
  };
  loadSelected();

  setInterval(() => {
    // Detecting the selected page constantly
    var elem = document.querySelector(".fcontent-item.active");
    var mouseactive = document.querySelector(".itemselector-active");
    mouseactive.style.width = elem.offsetWidth + "px";
    mouseactive.style.height = elem.offsetHeight + "px";
    mouseactive.style.top = elem.offsetTop + "px";
    mouseactive.style.left = elem.offsetLeft + "px";

    // Font Family Inputs details
    var fontFamilyInputs = document.querySelectorAll(".fontFamilyInput");
    fontFamilyInputs.forEach((fontInput) => {
      var uifont = getComputedStyle(document.body).getPropertyValue(
        "--principal-font-family"
      );
      fontInput.style.fontFamily = fontInput.value + " , " + uifont;
    });

    // Font Size Length Inputs details
    var lengthInputs = document.querySelectorAll(".lengthInput");
    lengthInputs.forEach((lengthInp) => {
      if (
        ((parseInt(lengthInp.value) <= 60 && lengthInp.value.endsWith("px")) ||
          (parseInt(lengthInp.value) <= 60 && lengthInp.value.endsWith("pt")) ||
          (parseInt(lengthInp.value) <= 7 && lengthInp.value.endsWith("%")) ||
          (parseInt(lengthInp.value) <= 7 && lengthInp.value.endsWith("vw")) ||
          (parseInt(lengthInp.value) <= 9 && lengthInp.value.endsWith("vh")) ||
          (parseInt(lengthInp.value) <= 7 && lengthInp.value.endsWith("svw")) ||
          (parseInt(lengthInp.value) <= 9 && lengthInp.value.endsWith("svh")) ||
          (parseInt(lengthInp.value) <= 7 && lengthInp.value.endsWith("bvw")) ||
          (parseInt(lengthInp.value) <= 9 && lengthInp.value.endsWith("bvh")) ||
          (parseInt(lengthInp.value) <= 7 &&
            lengthInp.value.endsWith("vmax")) ||
          (parseInt(lengthInp.value) <= 9 &&
            lengthInp.value.endsWith("vmin")) ||
          (parseInt(lengthInp.value) <= 8 && lengthInp.value.endsWith("em")) ||
          (parseInt(lengthInp.value) <= 8 && lengthInp.value.endsWith("rem")) ||
          (parseInt(lengthInp.value) <= 10 && lengthInp.value.endsWith("ch")) ||
          (parseInt(lengthInp.value) <= 14 && lengthInp.value.endsWith("ex")) ||
          (parseInt(lengthInp.value) <= 7 && lengthInp.value.endsWith("pc")) ||
          (parseInt(lengthInp.value) <= 1 && lengthInp.value.endsWith("in")) ||
          (parseInt(lengthInp.value) <= 2 && lengthInp.value.endsWith("cm")) ||
          (parseInt(lengthInp.value) <= 30 &&
            lengthInp.value.endsWith("mm"))) &&
        parseInt(lengthInp.value) != NaN &&
        parseInt(lengthInp.value) >= 5
      ) {
        lengthInp.style.color = "var(--text)";
        lengthInp.style.fontSize = lengthInp.value;
      } else {
        lengthInp.style.color = "#ff9c9c";
      }
    });
  }, 100);

  // Mouse Hover animation of the menu settings pages list
  document.querySelectorAll("div.fcontent-item").forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      var mousehover = document.querySelector(".itemselector-hover");
      mousehover.style.opacity = 1;
      mousehover.style.width = elem.offsetWidth + "px";
      mousehover.style.height = elem.offsetHeight + "px";
      mousehover.style.top = elem.offsetTop + "px";
      mousehover.style.left = elem.offsetLeft + "px";

      document
        .querySelectorAll(
          ".content.full, .content-display, .fcontent-itemselector, .content-display-content,  .content-display-content *, .content.full .title, .content.full .title *"
        )
        .forEach((elem) => {
          elem.addEventListener("mouseenter", (ev) => {
            if (!mousehover.contains(ev.target)) {
              mousehover.style.opacity = 0;
            }
          });
        });
    });

    // The page click event
    elem.addEventListener("click", () => {
      var redirect = elem.getAttribute("data-name");

      window.location.replace("#" + redirect);
      window.location.href = "#" + redirect;

      var hash = window.location.hash;
      var elems = document.querySelectorAll("[data-name]");
      elems.forEach((elem) => {
        if ("#" + elem.getAttribute("data-name") === hash) {
          elem.classList.add("active");
        } else {
          elem.classList.remove("active");
        }
      });
      loadContent();
    });
  });
}
