(function () {
    function addWidgets() {
        const names = [];
        document.querySelectorAll("#main > .its--container-fluid > .its--row").forEach((el) => {
            if (el.querySelector(":scope > .ptm-widget-host")) return;
            const widgetName = el.classList[1] || "No se identifica el nombre";

            const host = document.createElement("div");
            host.className = "ptm-widget-host";

            const sr = host.attachShadow({ mode: "open" });

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
                .name span{
                    color: #000000;
                }
            `;

            const h3 = document.createElement("h3");
            const span = document.createElement("span");
            h3.className = "name";
            h3.innerText = "Nombre del widget: ";
            span.innerText = widgetName;
            h3.appendChild(span);

            sr.appendChild(style);
            sr.appendChild(h3);

            el.insertBefore(host, el.firstChild);
            names.push(widgetName);
        });
        return names;
    }

    function removeWidgets() {
        document.querySelectorAll(".ptm-widget-host").forEach(el => el.remove());
    }

    PTMWidgetManager.init("widget", addWidgets, removeWidgets);
})();