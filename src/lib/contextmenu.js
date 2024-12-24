document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

/**
 * Creates a contextmenu in an element
 * @param {Element} element - A DOM element for creating the contextMenu
 * @param {Function} menuItemsFunc - A function that should return an array when a contextMenu is creating.
 */
export function applyCMenu(element, menuItemsFunc) {
  element.addEventListener("contextmenu", function (event) {
    event.preventDefault();

    const menuItems = menuItemsFunc();

    const contextMenu = document.querySelector(".contextmenu");
    contextMenu.innerHTML = ``;
    contextMenu.style.opacity = 1;
    contextMenu.style.pointerEvents = "all";

    function hide(contextMenu) {
      contextMenu.style.opacity = 0;
      contextMenu.style.pointerEvents = "none";
    }

    menuItems.forEach((item) => {
      if (item === "separator") {
        const menuItem = document.createElement("hr");
        contextMenu.appendChild(menuItem);
      } else {
        const menuItem = document.createElement("div");
        menuItem.innerHTML = `
            <img src="https://swiftlystatic.vercel.app/airacloud/icon?icon=${
              item.icon
            }&fill=${
          item.fill ? item.fill.replace("#", "0x") : "white"
        }&regular=true" alt="" loading="lazy">
            <span style="color: ${item.fill ? item.fill : "white"}">${
          item.label
        }</span>
          `;
        menuItem.className = "contextmenuelement";
        menuItem.addEventListener("click", function () {
          item.action();
          hide(contextMenu);
        });
        contextMenu.appendChild(menuItem);
      }
    });

    const menuWidth = contextMenu.offsetWidth;
    const screenWidth = window.innerWidth;

    if (event.clientX + menuWidth > screenWidth) {
      contextMenu.style.left = `${event.clientX - menuWidth}px`;
    } else {
      contextMenu.style.left = `${event.clientX}px`;
    }

    contextMenu.style.top = `${event.clientY}px`;

    document.addEventListener("click", function (e) {
      if (!contextMenu.contains(e.target)) {
        hide(contextMenu);
      }
    });
  });
}
