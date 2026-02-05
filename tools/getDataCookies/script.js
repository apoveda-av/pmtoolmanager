(function () {
    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    function createCookieItem(name, value, container, onDelete) {
        const div = document.createElement("div");
        div.className = "cookie-item";
        Object.assign(div.style, {
            marginBottom: "5px",
            background: "white",
            borderRadius: "3px",
            display: "flex",
            flexDirection: "column"
        });

        const nameSpan = document.createElement("span");
        nameSpan.className = "cookie-name";
        Object.assign(nameSpan.style, {
            padding: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between"
        });
        nameSpan.innerText = name;

        const valueSpan = document.createElement("textarea");
        valueSpan.className = "cookie-value";
        Object.assign(valueSpan.style, {
            color: "#000000",
            fontSize: "12px",
            wordBreak: "break-word",
            display: "none"
        });
        valueSpan.innerText = value;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "Eliminar";
        deleteBtn.onclick = () => {
            onDelete();
            div.remove();
            const remaining = container.querySelectorAll('.cookie-item').length;
            
            if (remaining === 0) {
                container.innerHTML = "";
                container.appendChild(createNoCookiesItem());
            }
        };

        nameSpan.appendChild(deleteBtn);
        div.appendChild(nameSpan);
        div.appendChild(valueSpan);

        nameSpan.addEventListener("click", (e) => {
            if (e.target === deleteBtn) return;
            valueSpan.style.display = valueSpan.style.display === "none" ? "inline" : "none";
        });

        return div;
    }

    function createNoCookiesItem() {
        const div = document.createElement("div");
        div.className = "cookie-item";
        Object.assign(div.style, {
            marginBottom: "5px",
            background: "white",
            borderRadius: "3px",
            display: "flex",
            flexDirection: "column"
        });

        const nameSpan = document.createElement("span");
        nameSpan.className = "cookie-name";
        Object.assign(nameSpan.style, {
            padding: "5px",
            fontWeight: "bold"
        });
        nameSpan.innerText = "No se encontraron cookies en esta página.";
        div.appendChild(nameSpan);

        return div;
    }

    function addWidgets() {
        const body = document.body;
        if (body.querySelector(":scope > .ptm-datacookies-host")) return;

        const cookies = document.cookie.split("; ").filter(Boolean).map(cookie => {
            const [name, value] = cookie.split("=");
            return { name, value };
        });

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
            .delete-all-btn {
                background: rgb(241,95,65);
                color: white;
                border: none;
                border-radius: 3px;
                padding: 5px 10px;
                margin-bottom: 10px;
                cursor: pointer;
                font-size: 13px;
                font-weight: bold;
            }
            .delete-btn {
                background: #e74c3c;
                color: white;
                border: none;
                border-radius: 3px;
                padding: 2px 6px;
                margin-left: 5px;
                cursor: pointer;
                font-size: 11px;
            }
        `;

        const container = document.createElement("div");
        container.className = "container";

        if (cookies.length === 0) {
            container.appendChild(createNoCookiesItem());
        } else {
            // Botón para eliminar todas las cookies
            const deleteAllBtn = document.createElement("button");
            deleteAllBtn.className = "delete-all-btn";
            deleteAllBtn.innerText = "Eliminar todas las cookies";
            deleteAllBtn.onclick = () => {
                cookies.forEach(cookie => deleteCookie(cookie.name));
                container.innerHTML = "";
                container.appendChild(createNoCookiesItem());
            };
            container.appendChild(deleteAllBtn);

            cookies.forEach(({ name, value }) => {
                container.appendChild(
                    createCookieItem(name, value, container, () => deleteCookie(name))
                );
            });
        }

        sr.appendChild(style);
        sr.appendChild(container);
        body.insertBefore(host, body.firstChild);
        return cookies;
    }

    function removeWidgets() {
        document.querySelectorAll(".ptm-datacookies-host").forEach(el => el.remove());
    }

    PTMWidgetManager.init("datacookies", addWidgets, removeWidgets);
})();