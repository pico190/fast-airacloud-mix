import { encode } from "js-base64";

/**
 * A function for creating a Modal
 * @param {*} title - The modal title
 * @param {*} content - The modal HTML content
 */
export function createModal(title, content) {
  var modal = document.createElement("div");
  modal.className = "modal-container";
  modal.id = encode(title);
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-title">
        <h1>${title}</h1>
        <button close onclick='document.getElementById("${encode(
          title
        )}").classList.add("hide")'>
          <img loading="lazy" alt="" src="https://swiftlystatic.vercel.app/airacloud/icon?icon=close&fill=white&regular=true">
        </button>
      </div>
      ${content}
    </div>`;
  document.body.prepend(modal);
  modal.addEventListener("click", (ev) => {
    if (modal === ev.target) {
      modal.classList.add("hide");
      setTimeout(() => {
        modal.remove();
      }, 1000);
    }
  });
}

/**
 * Closes all modals
 */
export function closeModal() {
  document.querySelectorAll(".modal-container").forEach(modal => {
    modal.remove();
  })
}