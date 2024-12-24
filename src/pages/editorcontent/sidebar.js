/**
 * ? Sidebar
 * It loads the sidebar for the editor webpage
 */

import { account } from "../../lib/ui/sidebar info";

/**
 * It loads the editor sidebar.
 * ! **Warning**: This function is experimental and it will change in the future.
 * TODO: Move projectname to project.name
 * @param {String} projectname - **Warning**: This argument is old and it will change in the future | A string with the project name
 */
export default function loadSidebar(project) {
    var sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = `<svg  class="sidebar-bg" viewBox="0 0 582 497" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_f_2033_57)"><ellipse cx="269.5" cy="251" rx="104.5" ry="81" fill="var(--color1)"/></g><g filter="url(#filter1_f_2033_57)"><ellipse cx="312.5" cy="246" rx="104.5" ry="81" fill="var(--color2)"/></g><defs><filter id="filter0_f_2033_57" x="0.199997" y="5.2" width="538.6" height="491.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="82.4" result="effect1_foregroundBlur_2033_57"/></filter><filter id="filter1_f_2033_57" x="43.2" y="0.199997" width="538.6" height="491.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="82.4" result="effect1_foregroundBlur_2033_57"/></filter></defs></svg>
    <div class="SBContent">
            <div class="aira_sb_title">
                <!-- If you were searching here the AiraCloud logo, is in .nav -->
                <h1>${project.name}</h1>
            </div>
        <div class="sb-editor-content" style="scrollbar-width: none;scrollbar-color: transparent;">
            <style id="sb-files"></style>
            <div class="sb-files airacloud-scrollable-item airacloud-component"><div class="sb-files-title"><b>Files</b></div></div>
        </div>
    </div>
    ${account()}`;
}
