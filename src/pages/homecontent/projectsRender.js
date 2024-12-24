/**
 * It renders the projects DOM
 */

/**
 * It converts a vw value (60vw) to pixels, based on the screen width,
 * @param {String} valueInVw - The vw value. **Example**: "60vw"
 * @returns {Int} - The pixels value.
 */
function vwToPixels(valueInVw) {
  // Obtener el ancho de la ventana en píxeles
  var windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // Eliminar "vw" del valor y convertirlo a un número
  var value = parseFloat(valueInVw);

  // Calcular el valor en píxeles
  var valueInPixels = (value / 100) * windowWidth;

  // Redondear el valor y devolverlo
  return Math.round(valueInPixels);
}

/**
 * A function that rounds the corners of the project box.
 */
function roundCorners() {
  var itemfirst = document.querySelector(".item").offsetTop;
  var items = document.querySelectorAll(".item");
  var itemlast = document.querySelector(
    ".item:nth-of-type(" + items.length + ")"
  ).offsetTop;
  var donefirst = false;
  var donelast = false;
  items.forEach((item) => {
    item.style.borderTopRightRadius = "";
    item.style.borderBottomLeftRadius = "";
    if (item.offsetTop != itemfirst && !donefirst) {
      item.previousElementSibling.style.borderTopRightRadius = "36px";
      donefirst = true;
    }
    if (item.offsetTop == itemlast && !donelast) {
      item.style.borderBottomLeftRadius = "36px";
      donelast = true;
    }
  });
}

/**
 * A function that renders the projects.
 * @param {Array} projects - An array of projects.
 */
export function projectsRender(projects) {
  var container = document.querySelector(".project-grid");
  var vw = getComputedStyle(container).getPropertyValue("--item-size");
  var pixels = vwToPixels(vw);

  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;
  var elementWidth = pixels;
  var elementHeight = pixels;

  var columns = Math.floor(containerWidth / elementWidth);
  var rows = Math.floor(containerHeight / elementHeight);

  var totalElements = columns * rows;
  var actualproject = 0;

  for (var i = 0; i < totalElements; i++) {
    var element = document.createElement("div");
    element.className = "item item-fill animation-box";
    element.style.width = elementWidth + "px";
    element.style.height = elementHeight + "px";
    if (actualproject + 1 <= projects.length) {
      element.className = "item animation-box";
      var iconurl = `https://swiftlystatic.vercel.app/airacloud/langicon?icon=${projects[actualproject].type}`;

      element.innerHTML = `
            <img src=${iconurl} loading="lazy" alt="" width="55%" style="margin-right: 9px">
            <b>${projects[actualproject].name}</b>
            `;
      actualproject++;
    }
    container.appendChild(element);
    setInterval(() => {
      roundCorners();
    }, 10);
  }
}
