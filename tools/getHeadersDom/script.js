(function () {
    function addWidgets() {
        const body = document.body;
        if (body.querySelector(":scope > .ptm-headersdom-host")) return;
        
        // Obtener todos los encabezados en orden del DOM
        const allHeaders = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        const data = [];
        
        allHeaders.forEach(header => {
            data.push({
                tag: header.tagName.toLowerCase(),
                text: header.innerText || header.textContent
            });
        });
        
        const host = document.createElement("div");
        host.className = "ptm-headersdom-host";

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
                max-height: 80vh;
                overflow-y: auto;
            }
            .header-item {
                margin: 5px 0;
                padding: 5px;
                background: white;
                border-radius: 3px;
            }
            .header-item.h1 { padding-left: 5px; }
            .header-item.h2 { padding-left: 20px; }
            .header-item.h3 { padding-left: 35px; }
            .header-item.h4 { padding-left: 50px; }
            .header-item.h5 { padding-left: 65px; }
            .header-item.h6 { padding-left: 80px; }
            .header-tag {
                color: rgb(241,95,65);
                font-weight: bold;
                margin-right: 5px;
            }
            .header-text {
                color: #000000;
            }
        `;
        
        const container = document.createElement("div");
        container.className = "container";
        
        data.forEach((item) => {
            const div = document.createElement("div");
            div.className = `header-item ${item.tag}`;
            
            const tag = document.createElement("span");
            tag.className = "header-tag";
            tag.innerText = item.tag.toUpperCase();
            
            const text = document.createElement("span");
            text.className = "header-text";
            text.innerText = item.text;
            
            div.appendChild(tag);
            div.appendChild(text);
            container.appendChild(div);
        });
        
        sr.appendChild(style);
        sr.appendChild(container);
        body.insertBefore(host, body.firstChild);
        return data;
    }

    function removeWidgets() {
        document.querySelectorAll(".ptm-headersdom-host").forEach(el => el.remove());
    }

    PTMWidgetManager.init("headersdom", addWidgets, removeWidgets);
})();