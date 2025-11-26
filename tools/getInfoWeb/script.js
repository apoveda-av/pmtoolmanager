(function () {
    // marca global por pestaña
    const FLAG = "__ptm_infoweb_active";
    function addWidgets() {
        // ahora usamos Shadow DOM por widget para encapsular estilo y marcado
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
        // // host para el shadow root
        const host = document.createElement("div");
        host.className = "ptm-infoweb-host";

        // attach shadow root (modo open para debug/inspección)
        const sr = host.attachShadow({ mode: "open" });

        // estilo encapsulado dentro del shadow root
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
        // eliminar hosts con shadow
        document.querySelectorAll(".ptm-infoweb-host").forEach(el => el.remove());
    }

    function toggleWidgets() {
        if (window[FLAG]) {
            removeWidgets();
            window[FLAG] = false;
            console.log("ptm: removed");
        } else {
            const names = addWidgets();
            window[FLAG] = true;
            console.log("ptm: injected", names);
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