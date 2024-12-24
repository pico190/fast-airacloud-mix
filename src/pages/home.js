/*
  _    _              ___  _                _           __ 
   /_\  (_) _ _  __ _  / __|| | ___  _  _  __| |   __ __ / / 
  / _ \ | || '_|/ _` || (__ | |/ _ \| || |/ _` |   \ V // _ \
 /_/ \_\|_||_|  \__,_| \___||_|\___/ \_,_|\__,_|    \_/ \___/

 Developed By Swiftly. 
 * /home main file

*/

import { account, engineVersion } from "../lib/ui/sidebar info.js";
import { projectsRender } from "./homecontent/projectsRender.js";
import { encode } from "js-base64";
import { createProject } from "../lib/home/create project.js";

/*
! Warning: This page is not documented **for now**
It will be documented soon.
*/

/**
 * Loads the Home page.
 * @param {Array} projects - An array of projects
 */
export default function Home(projects) {
  /**
   * Creates a Button in the home
   * @param {String} children - The html dom
   * @param {String} icon - The icon name
   * @param {Boolean} rightIcon - Right chevron icon?
   * @param {String} id - An id for the button
   * @param {Function} click - A function to run when is clicked
   * @returns {String} - An html string
   */
  function Button(children, icon, rightIcon = true, id, click) {
    var iconurl;
    if (icon.type === "airaicon") {
      iconurl = `https://swiftlystatic.vercel.app/airacloud/langicon?icon=${icon.name}`;
    } else {
      iconurl = `https://swiftlystatic.vercel.app/airacloud/icon?icon=${
        icon.name
      }&fill=${icon.fill ? icon.fill : "white"}&regular=${
        icon.outline ? "true" : "false"
      }`;
    }
    setTimeout(() => {
      document.getElementById(encode(id)).addEventListener("click", () => {
        click();
      });
    }, 500);
    return `
        <div class="default-content-button" id="${encode(id)}">
            <img src=${iconurl} loading="lazy" alt="" width="32px" height="32px" style="margin-right: 9px">
            <b class="content-button-text">
                ${children}
            </b>
            ${
              rightIcon
                ? `<img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=chevron-forward&fill=white&regular=true" loading="lazy" alt="" height="60%">`
                : ""
            } 
        </div>`;
  }

  // region DOM

  // We set the dom
  document.querySelector("#app").innerHTML = `
    <div class="sidebar" id="sidebar">
        <svg  class="sidebar-bg" viewBox="0 0 582 497" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_f_2033_57)"><ellipse cx="269.5" cy="251" rx="104.5" ry="81" fill="var(--color1)"/></g><g filter="url(#filter1_f_2033_57)"><ellipse cx="312.5" cy="246" rx="104.5" ry="81" fill="var(--color2)"/></g><defs><filter id="filter0_f_2033_57" x="0.199997" y="5.2" width="538.6" height="491.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="82.4" result="effect1_foregroundBlur_2033_57"/></filter><filter id="filter1_f_2033_57" x="43.2" y="0.199997" width="538.6" height="491.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="82.4" result="effect1_foregroundBlur_2033_57"/></filter></defs></svg>
            <div class="aira_logo">
                <img width="54px" src="https://swiftlystatic.vercel.app/airacloud/favicon.svg" loading="lazy" alt="">
                <div class="aira_logo_title">
                    <h1 style="height: 30px">AiraCloud</h1>
                    <span>BETA</span>
                </div>
            </div>
        <div class="SBContent airacloud-component">
            ${engineVersion()}
        </div>
        ${account()}
    </div>
    <div class="content">
        <h1 class="contentTitle">Welcome, Pico!</h1>
        <hr style="opacity: 0">
        <div class="home-section">
            <font class="home-section-title">Recent activity</font>
            <div class="recent-activity">
                ${Button(
                  "puchaina",
                  { name: "ts", type: "airaicon" },
                  true,
                  "fadjfhdsjk"
                )}
                ${Button(
                  "gfdag",
                  { name: "jsx", type: "airaicon" },
                  true,
                  "hvxcjvhxc"
                )}
                ${Button(
                  "gdagdfg",
                  { name: "bun", type: "airaicon" },
                  true,
                  "vjhgkjh"
                )}
            </div>
        </div>
        <hr style="opacity: 0">
        <div class="home-section" style="height: 100%;">
            <font class="home-section-title">Projects</font>
            <div class="recent-activity">
                ${Button(
                  "Create project",
                  { name: "add", type: "solid", outline: true },
                  false,
                  "create-project-button-1",
                  () => {
                    createProject();
                  }
                )}
            </div>
            <div class="project-grid"></div>
        </div>
    </div>
`;

  projectsRender(projects);
  var boxes = document.querySelectorAll(".animation-box");
  var delay = 100;

  function fadeIn(element, delay) {
    setTimeout(function () {
      element.style.opacity = 1;
      setTimeout(function () {
        element.classList.remove("animation-box");
      }, 100);
    }, delay);
  }

  for (var i = 0; i < boxes.length; i++) {
    fadeIn(boxes[i], i * delay);
  }
}
