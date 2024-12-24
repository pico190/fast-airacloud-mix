/**
 * Creates a AiraCloud Input
 * @param {String} placeholder - The placeholder of the input
 * @param {String} icon - An icon for the input (list in https://ionic.io/ionicons) 
 * @param {Function} elemsfunc - A function that returns an array of elements:
 * ```js
 * [
 *     {
 *       icon: String, // Can be a lang icon or an AiraCloud Icon (list in https://ionic.io/ionicons)
 *       name: String, // The name of the item
 *       desc: String, // The item description (optional)
 *       click: Function, // A function to execute when click
 *       langIcon: boolean // Defaults to false, if true, the `icon` property is a lang icon (javascript, kotlin...)
 *     }
 * ] 
 * ```
 * @param {Boolean} search - If true, makes the input search between the items.
 * @param {Boolean} searchDesc - If true, makes the search also in item descs
 * @param {String} defaultValue - The input default value
 */
export function createInput(placeholder, icon, elemsfunc, search = false, searchDesc = true, defaultValue = "") {
    var inputdiv = document.querySelector(".inputdiv");
    inputdiv.innerHTML = ``;
    inputdiv.style.opacity = 1;
    inputdiv.style.pointerEvents = "all";

    inputdiv.innerHTML = `

    <div class="account-icon modal-close" onclick='document.querySelector(".inputdiv").remove();'><img lightinvert="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=close&amp;fill=whitesmoke" loading="lazy" alt=""></div>
      <div class="input">
        <img lightinvert="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=${icon}&fill=whitesmoke&regular=true" loading="lazy" alt="">
        <input placeholder="${placeholder}" value="${defaultValue}">
      </div>
      <div class="elems airacloud-scrollable-item"></div>
    `;

    function highlight(text, searchTerm) {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<searched>$1</searched>');
    }

    function loadElems() {
        var elems = document.querySelector(".inputdiv .elems");
        elems.innerHTML = ``;
        const searchTerm = search ? document.querySelector(".inputdiv .input input").value : '';

        var firstChild = true;
        elemsfunc(
            searchTerm,
            document.querySelector(".inputdiv .input")
        ).forEach(elem => {
            if (elem === "separator") {
                elems.appendChild(document.createElement("hr"));
            } else {
                const nameMatches = elem.name.toLowerCase().includes(searchTerm.toLowerCase());
                const descMatches = searchDesc && elem.desc && elem.desc.toLowerCase().includes(searchTerm.toLowerCase());

                if (!search || nameMatches || descMatches) {
                    var dom = document.createElement("div");
                    dom.classList.add("input-element");
                    if (firstChild) {
                        dom.classList.add("first");   
                        firstChild = false;
                    }
                    const highlightedName = highlight(elem.name, searchTerm);
                    const highlightedDesc = highlight(elem.desc ?? "", searchTerm);
                    var smallicon = "";
                    if (elem.smallIcon) {
                        smallicon = `width="20px" height="20px"`
                    }
                    dom.innerHTML = `
                      <div class="input-element-icon">
                      ${
                        !elem.langIcon ? `<img lightinvert="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=${elem.icon}&fill=white&regular=true" loading="lazy" alt="" ${smallicon}>` : `<img src="https://swiftlystatic.vercel.app/airacloud/langicon?icon=${elem.icon}" loading="lazy" alt="" ${smallicon}>`
                      }
                      </div>
                      <div class="input-element-content">
                        <b>${highlightedName}</b>
                        <span style="opacity: 0.8">${searchDesc ? highlightedDesc : elem.desc}</span>
                      </div>
                    `
                    dom.onclick = elem.click;
                    elems.appendChild(dom);
                }
            }
        })
    }

    loadElems();
    document.querySelector(".inputdiv .input input").addEventListener("input", loadElems)
    document.querySelector(".inputdiv .input input").addEventListener("blur", () => {
        document.querySelector(".inputdiv .input").classList.remove("focus")
    })
    document.querySelector(".inputdiv .input input").addEventListener("focus", () => {
        document.querySelector(".inputdiv .input").classList.add("focus")
    })
    document.querySelector(".inputdiv .input input").focus();


            const allowedElements = document.querySelectorAll('.inputdiv .input input, .input-element');
            const allowedElementsArray = Array.from(allowedElements);

            document.querySelectorAll('input, button, a, select, textarea, [tabindex]').forEach(element => {
                if (!allowedElementsArray.includes(element)) {
                    element.setAttribute('tabindex', '-1');
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Tab') {
                    const activeIndex = allowedElementsArray.indexOf(document.activeElement);
                    if (activeIndex === -1) {
                        event.preventDefault();
                        allowedElementsArray[0].focus();
                    } else {
                        event.preventDefault();
                        const nextIndex = (activeIndex + 1) % allowedElementsArray.length;
                        allowedElementsArray[nextIndex].focus();
                    }
                } else if (event.key === 'Escape') {
                    closeInput();
                } else if (event.key === 'ArrowDown') {
                    var ielemf = document.querySelector(".input-element.focus");
                    if (!ielemf) {
                        document.querySelector(".input-element.first").classList.add("focus");
                    } else {
                        ielemf.classList.remove("focus");
                        var elemfocus = null;
                        if (ielemf.nextElementSibling) {
                            if (ielemf.nextElementSibling.tagName === "HR") {
                                elemfocus = ielemf.nextElementSibling.nextElementSibling                          
                            } else {
                                elemfocus = ielemf.nextElementSibling
                            }
                        } else {
                            elemfocus = document.querySelector(".input-element.first")
                        }

                        elemfocus.classList.add("focus");

                        var container = document.querySelector(".inputdiv .elems")
                        container.scrollTop = elemfocus.offsetTop - container.offsetTop;
                    }
                } else if (event.key === 'ArrowUp') {
                    var ielemf = document.querySelector(".input-element.focus");
                    if (!ielemf) {
                        document.querySelector(".input-element:last-child").classList.add("focus");
                    } else {
                        ielemf.classList.remove("focus");
                        var elemfocus = null;
                        if (ielemf.previousElementSibling) {
                            if (ielemf.previousElementSibling.tagName === "HR") {
                                elemfocus = ielemf.previousElementSibling.previousElementSibling                          
                            } else {
                                elemfocus = ielemf.previousElementSibling
                            }
                        } else {
                            elemfocus = document.querySelector(".input-element:last-child")
                        }

                        elemfocus.classList.add("focus");

                        var container = document.querySelector(".inputdiv .elems")
                        container.scrollTop = elemfocus.offsetTop - container.offsetTop;
                    }
                }
            });
}

/**
 * Closes input
 */
export function closeInput() {
    var inputdiv = document.querySelector(".inputdiv");
    inputdiv.innerHTML = ``;
    inputdiv.style.opacity = 0;
    inputdiv.style.pointerEvents = "none";
}
