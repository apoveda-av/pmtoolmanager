(function () {
    function addWidgets() {
        const body = document.body;
        if (body.querySelector(":scope > .ptm-datacookies-host")) return;
        const data = [];
        
        const cookies = document.cookie.split("; ").map((cookie) => {
            const [name, value] = cookie.split("=");
            return { name, value };
        });

        data.push(...cookies);
        
        const host = document.createElement("div");
        host.className = "ptm-datacookies-host";

        const sr = host.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = `
            .container {
                background: antiquewhite;
                color: rgb(241,95,65);
                display: block;
                padding: 10px;
                font-size: 14px;
                font-weight: 600;
                border-left: 4px solid rgb(241,95,65);
                border-radius: 3px;
                box-shadow: 0 1px 0 rgba(0,0,0,0.03);
                font-family: "Open sans", sans-serif;
                z-index: 9999999;
                position: fixed;
                top: 0;
                left: 0;
                max-width: 400px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
            }
        `;
        
        const container = document.createElement("div");
        container.className = "container";
        data.forEach((item) => {
            const div = document.createElement("div");
            div.className = "cookie-item";
            div.style.marginBottom = "5px";
            div.style.padding = "5px";
            div.style.background = "white";
            div.style.borderRadius = "3px";
            div.style.display = "flex";
            div.style.flexDirection = "column";

            const nameSpan = document.createElement("span");
            nameSpan.className = "cookie-name";
            nameSpan.style.fontWeight = "bold";
            nameSpan.style.cursor = "pointer";
            nameSpan.innerText = item.name;

            const valueSpan = document.createElement("span");
            valueSpan.className = "cookie-value";
            valueSpan.style.color = "#000000";
            valueSpan.style.fontSize = "12px";
            valueSpan.style.wordBreak = "break-word";
            valueSpan.style.display = "none";
            valueSpan.innerText = item.value;

            div.appendChild(nameSpan);
            div.appendChild(valueSpan);

            div.addEventListener("click", () => {
                if (valueSpan.style.display === "none") {
                    valueSpan.style.display = "inline";
                } else {
                    valueSpan.style.display = "none";
                }
            });

            container.appendChild(div);
        });
        
        sr.appendChild(style);
        sr.appendChild(container);
        body.insertBefore(host, body.firstChild);
        return data;
    }
    function removeWidgets() {
        document.querySelectorAll(".ptm-datacookies-host").forEach(el => el.remove());
    }

    PTMWidgetManager.init("datacookies", addWidgets, removeWidgets);
})();