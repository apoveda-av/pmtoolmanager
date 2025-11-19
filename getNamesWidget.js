(function () {
    // marca global por pestaña
    const FLAG = "__rnw_active";

    function injectStyles() {
        if (document.getElementById("rnw-styles")) return;
        const css = `
.rnw-widget-name {
  background: antiquewhite;
  color: rgb(241, 95, 65);
  display: block;
  padding: 6px 10px;
  margin: 0 auto;
  font-size: 24px;
  font-weight: 600;
  border-left: 4px solid rgb(241, 95, 65);
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.03);
  max-width: 800px;
  position: relative;
    z-index: 9999999;
}
`;
        const style = document.createElement("style");
        style.id = "rnw-styles";
        style.appendChild(document.createTextNode(css));
        (document.head || document.documentElement).appendChild(style);
    }

    function addWidgets() {
        injectStyles();
        const names = [];
        document.querySelectorAll("#main > .its--container-fluid > .its--row").forEach((el, idx) => {
            // evita insertar duplicados en el mismo elemento
            if (el.querySelector(":scope > .rnw-widget-name")) return;
            const widgetName = el.classList[1] || `widget-${idx+1}`;
            const h3 = document.createElement("h3");
            h3.className = "rnw-widget-name";
            h3.innerText = "Nombre del widget: " + widgetName;
            el.insertBefore(h3, el.firstChild);
            names.push(widgetName);
        });
        return names;
    }

    function removeWidgets() {
        document.querySelectorAll(".rnw-widget-name").forEach(el => el.remove());
        const style = document.getElementById("rnw-styles");
        if (style) style.remove();
    }

    function toggleWidgets() {
        if (window[FLAG]) {
            removeWidgets();
            window[FLAG] = false;
            console.log("rnw: removed");
        } else {
            const names = addWidgets();
            window[FLAG] = true;
            console.log("rnw: injected", names);
        }
    }

    function init() {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", toggleWidgets, { once: true });
        } else {
            toggleWidgets();
        }
    }

    init();
})();