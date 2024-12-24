import { createModal } from "../ui/modal";

/**
 * A function for creating a modal for creating a project
 */
export function createProject() {
  createModal(
    "Create project",
    `
    <div id="create-project-pass-1" class="cp-pass">
        <div class="modal-inputs">
            <div class="modal-input">
                <img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=fonts&fill=white" loading="lazy" alt="">
                <input placeholder="Name your project..." required>   
            </div>
            <div class="modal-input">
                <img src="" loading="lazy" alt="">
                <aira-dropdown>
                    <aira-dropdown-label></aira-dropdown-label>
                    <aira-dropdown-options style="display: none;">
                        <option-section><b>Types</b></option-section>
                        <option value="blank" icon="white">Blank</option>
                        <option value="react" icon="jsx">React</option>
                        <option value="astro" icon="astro">Astro</option>
                        <option value="python" icon="python">Python</option>
                        <option value="php" icon="php">PHP</option>
                        <option value="html" icon="html">Vanilla HTML</option>


                        <option-section><b>Templates</b></option-section>
                        soon
                    </aira-dropdown-options>
                </aira-dropdown>  
            </div>
            <div class="modal-input">
                <img src="" loading="lazy" alt="">
                <aira-dropdown>
                    <aira-dropdown-label></aira-dropdown-label>
                    <aira-dropdown-options style="display: none;">
                        <option value="public" icon="public">Public</option>
                        <option value="private" icon="private">Private</option>
                    </aira-dropdown-options>
                </aira-dropdown>  
            </div>
        </div>
    </div>
    `
  );

  function clickDropdown(dropdown) {
    var dropdownelements = dropdown.querySelector("aira-dropdown-options");
    var label = dropdown.querySelector("aira-dropdown-label");
    dropdownelements.style.display = "";
    dropdownelements.style.top = label.offsetTop + 30 + "px";
    dropdownelements.style.left = label.offsetLeft + "px";
    var dpheight = document.body.offsetHeight - dropdownelements.offsetTop;
    if (dropdownelements.offsetHeight >= dpheight) {
      dropdownelements.style.height = dpheight + "px";
    }

    var airaclose = dropdownelements.querySelector("aira-close");
    var size = dropdownelements.children[1].offsetHeight;
    airaclose.style.width = size + "px";
    airaclose.style.height = size + "px";
    airaclose.style.position = "absolute";
  }
  document.querySelectorAll("aira-dropdown").forEach((dropdown) => {
    var options = dropdown.querySelector("aira-dropdown-options");
    dropdown.parentElement.addEventListener("click", (ev) => {
      if (!options.contains(ev.taget)) {
        clickDropdown(dropdown);
      }
    });

    options.querySelectorAll("option").forEach((option) => {
      if (!option.innerHTML.includes("img")) {
        var img = document.createElement("img");
        img.src =
          "https://swiftlystatic.vercel.app/airacloud/langicon?icon=" +
          option.getAttribute("icon");
        option.prepend(img);
      }
    });

    if (!options.innerHTML.includes("aira-close")) {
      var airaclose = document.createElement("aira-close");
      airaclose.addEventListener("click", () => {
        options.style.display = "none";
      });
      options.prepend(airaclose);
    }

    var label = dropdown.querySelector("aira-dropdown-label");
    if (label.innerText == "") {
      label.innerText = selectedop.innerText;
    }
  });
}
