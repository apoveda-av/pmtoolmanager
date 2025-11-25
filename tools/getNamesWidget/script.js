(function () {
    // marca global por pestaña
    const FLAG = "__rnw_active";
    function addWidgets() {
        // ahora usamos Shadow DOM por widget para encapsular estilo y marcado
        const names = [];
        document.querySelectorAll("#main > .its--container-fluid > .its--row").forEach((el, idx) => {
            // evita insertar duplicados en el mismo elemento (host de shadow)
            if (el.querySelector(":scope > .rnw-widget-host")) return;
            const widgetName = el.classList[1] || `widget-${idx+1}`;

            // host para el shadow root
            const host = document.createElement("div");
            host.className = "rnw-widget-host";

            // attach shadow root (modo open para debug/inspección)
            const sr = host.attachShadow({ mode: "open" });

            // estilo encapsulado dentro del shadow root
            const style = document.createElement("style");
            style.textContent = `
              .name {
                background: antiquewhite;
                color: rgb(241,95,65);
                display: block;
                padding: 6px 10px;
                margin: 0 auto;
                font-size: 24px;
                font-weight: 600;
                border-left: 4px solid rgb(241,95,65);
                border-radius: 3px;
                box-shadow: 0 1px 0 rgba(0,0,0,0.03);
                max-width: 800px;
                position: relative;
                font-family: "Open sans", sans-serif;
                z-index: 9999999;
              }
            `;

            const h3 = document.createElement("h3");
            h3.className = "name";
            h3.innerText = "Nombre del widget: " + widgetName;

            sr.appendChild(style);
            sr.appendChild(h3);

            el.insertBefore(host, el.firstChild);
            names.push(widgetName);
        });
        return names;
    }

    function removeWidgets() {
        // eliminar hosts con shadow
        document.querySelectorAll(".rnw-widget-host").forEach(el => el.remove());
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