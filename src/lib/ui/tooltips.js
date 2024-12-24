export default function tooltipElement(elem, type) {
    var tooltipelem = document.createElement("div");
    tooltipelem.classList.add("tootlip")
    tooltipelem.classList.add("tootlip-" + type);
    tooltipelem.style.opacity = 0;

    elem.addEventListener('mouseEnter', () => {
        tooltipelem.style.opacity = 1;
    });
    elem.addEventListener('mouseLeave', () => {
        tooltipelem.style.opacity = 0;
    });
    
}