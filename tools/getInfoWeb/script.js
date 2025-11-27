(function () {
    function addWidgets() {
        const body = document.body;
        const data = [];
        const templateContent = document.querySelector('meta[name="template"]').content;
        const versionContent = document.querySelector('meta[name="version"]').content;
        const webnameContent = document.querySelector('meta[name="webname"]').content;
        
        if (body.querySelector(":scope > .ptm-infoweb-host")) return;
        const template = templateContent || "Template desconocida";
        const version = versionContent || "Version desconocida";
        const webname = webnameContent || "Webname desconocido";

        data.push(template, version, webname);
        
        const host = document.createElement("div");
        host.className = "ptm-infoweb-host";

        const sr = host.attachShadow({ mode: "open" });

        const style = document.createElement("style");
        style.textContent = `
            .name {
                background: antiquewhite;
                color: rgb(241,95,65);
                display: block;
                padding: 2px 10px;
                font-size: 18px;
                font-weight: 600;
                border-left: 4px solid rgb(241,95,65);
                border-radius: 3px;
                box-shadow: 0 1px 0 rgba(0,0,0,0.03);
                font-family: "Open sans", sans-serif;
                z-index: 9999999;
                position: fixed;
                top: 0;
                left: 0;
            }
            .name span{
                color: #000000;
            }
        `;
        const div = document.createElement("div");
        div.className = "name";
        data.forEach((item, index) => {
            const p = document.createElement("div");
            const span = document.createElement("span")
            switch(index) {
                case 0:
                    p.innerText = "Plantilla: ";
                    break;
                case 1:
                    p.innerText = "Versión: ";
                    break;
                case 2:
                    p.innerText = "Nombre web: ";
                    break;
                default:
                    p.innerText = "Info adicional: ";
            }   
            span.innerText = item;
            p.appendChild(span);
            div.appendChild(p);
        });
        sr.appendChild(style);
        sr.appendChild(div);
        body.insertBefore(host, body.firstChild);
        return data;
    }

    function removeWidgets() {
        document.querySelectorAll(".ptm-infoweb-host").forEach(el => el.remove());
    }

    PTMWidgetManager.init("infoweb", addWidgets, removeWidgets);
})();