/**
 * It is used for detecting if a string is only spaces. Should be used for detecting if
 * selectionMatch in codemirror are only spaces and then don't showing the selectionMatch.
 * @param {String} text - The text for detect
 * @returns {boolean}
 */
export function spaces(text) {
  return text.trim().length === 0;
}

/**
 * It converts a hex code #ffffff to an rgb object
 * @param {String} hex - A string with the hex (it may include the #)
 * @returns {Object} - `hexToRgb(...).r` & `hexToRgb(...).g` & `hexToRgb(...).b`
 */
export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * An important function of the main.js. It parses the url for detecting what to load.
 * @returns {Array}
 */
export function urlParser() {
  var urlarray = window.location.href
    .replace("https://", "")
    .split("/")
    .slice(1);
  var response = [];
  urlarray.forEach((element) => {
    if (element !== undefined && element !== "") {
      response.push(element);
    }
  });
  return response;
}

/**
 * A function for copying a text to de clipboard.
 * @param {String} text - The text to copy
 */
export function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text);
}

/**
 * A function that is used for detecting the index of a dom element.
 *
 * ---
 *
 * **Example**:
 * If you have:
 * ```html
 * <parent>
 *     <child class="class2"></child>
 *     <child class="class"></child>
 *     <child class="class"></child>
 *     <child class="class"></child>
 *     <child class="class"></child>
 *     <child class="class"></child>
 *     <child class="class"></child> <------ You have this element in js.
 *     <child class=...></child>
 *     <child class=...></child>
 *     <child class=...></child>
 *     ...
 * </parent>
 * ```
 * It will detect the index of that element. **In this case:** 6
 *
 * ---
 *
 * **For what is this used**?
 * > It is used for detecting in the `.cm-content` element of codemirror, the index of
 * > a line, for styling it. **It is not expected to be used in another occasion**
 * @param {*} element - The element you have in js
 * @param {*} classn - A classname for detecting
 * @param {*} classn2 - Another classname for detecting
 * @returns {Int} - The index
 */
export function getIndex(element, classn, classn2) {
  var index = 1;
  // Iterate through the siblings and count how many are before the current element
  while ((element = element.previousElementSibling) !== null) {
    if (
      element.nodeType === 1 &&
      (element.classList.contains(classn) ||
        element.classList.contains(classn2))
    ) {
      index++;
    }
  }
  return index;
}

/**
 * Enables fullscreen for a specific element.
 * @param {HTMLElement} element 
 */
export function enableFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // firefó
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // chromium
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // tecnologias ancestrales (ie)
        element.msRequestFullscreen();
    }
}

/**
 * Disables fullscreen.
 */
export function disableFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // firefó
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // chromium
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // paleolítico (ie)
        document.msExitFullscreen();
    }
}
