import { getIndex } from "../../generalfuncs";
import { console_custom } from "../../debug/console";

/**
 * Capitalizes the first letter of a message.
 * @param {String} text - The text
 * @returns {String} - The capitalized text
 */
function capitalizeFirstLetter(text) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Styles the codemirror dom to show the error messages.
 * [CODED BY SWIFTLY TEAM - YOU **CAN'T** USE THIS FOR COMERCIAL USE.]
 * @param {Object} errors - All the errors that we get from linter.
 * @returns {boolean}
 */
export function lintmsg(errors) {

  var errorsInfo = {
    warnings: 0,
    errors: 0
  }

  errors.forEach(error => {
    if (error.type === "warning") {
      errorsInfo.warnings++;
    } else if(error.type === "error") {
      errorsInfo.errors++;
    }
  })

  document.querySelector(".cm-info-element[lint]").innerHTML = `
  <img lightinvert="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=alert-circle&amp;fill=whitesmoke&amp;regular=true" loading="lazy" alt="">
  ${errorsInfo.errors} 
  <img lightinvert="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=warning&amp;fill=whitesmoke&amp;regular=true" loading="lazy" alt="">
  ${errorsInfo.warnings}`

  try {
    var cssgenerated = ``;
    var minimaplnes = {};
    console_custom(
      "Linter",
      errors.length + " Errors found.",
      "rgba(163, 8, 8, 0.25)"
    );

    errors.forEach((error) => {
      var ignorefilters = ["Expected RBRACE at"];
      var stop = false;

      ignorefilters.forEach((filter) => {
        if (error.message.includes(filter)) {
          stop = true;
        }
      });
      if (!stop) {
        var type = "error";
        if (error.type === "warning") {
          type = "warn";
        }

        var gutterTop = 0;
        var gutters = document.querySelectorAll(
          ".cm-lineNumbers > .cm-gutterElement"
        )
          ? document.querySelectorAll(".cm-lineNumbers > .cm-gutterElement")
          : false;
        if (gutters) {
          gutters.forEach((gutter) => {
            if (parseInt(gutter.innerText) === error.line) {
              gutterTop = gutter.offsetTop;
            }
          });
        }
        var lines = document.querySelectorAll(".cm-line")
          ? document.querySelectorAll(".cm-line")
          : false;
        if (lines) {
          lines.forEach((line) => {
            var nthtype = getIndex(line, "cm-line", "cm-gap");
            if (line.offsetTop == gutterTop) {
              cssgenerated += `
                                .cm-line:nth-of-type(${nthtype}) {
                                    background-color: var(--cm-${type}LineBg)!important;
                                }
                                .cm-line:nth-of-type(${nthtype})::after {
                                    content: "  - ${capitalizeFirstLetter(
                                      error.message.replaceAll("\n", " ")
                                    )}"!important;
                                    position: absolute;
                                    top: 0px;
                                    color: var(--cm-${type}-gutter)!important;
                                }
                                `;
            }
            // else {
            //   cssgenerated += `
            //                     .cm-line:nth-of-type(${nthtype})::after {
            //                         content: " ${nthtype}"!important;
            //                         position: absolute;
            //                         top: 0px;
            //                     }
            //                     `;
            // }
          });
        }
      }
    });

    var linterElement = document.getElementById("linter")
      ? document.getElementById("linter")
      : null;

    if (linterElement) {
      linterElement.innerHTML = cssgenerated;
    }

    // setMinimapLines([ {...minimaplnes} ])
  } catch (err) {
    return false;
  }
}
