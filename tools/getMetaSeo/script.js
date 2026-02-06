(function () {
  function addWidgets() {
    const body = document.body;
    const data = [];
    data.push(
      {
        label: "Meta título",
        content:
          document.querySelector('meta[property="og:title"]')?.content ||
          "No tiene meta título",
      },
      {
        label: "Meta descripción",
        content:
          document.querySelector('meta[property="og:description"]')?.content ||
          "No tiene meta descripción",
      },
      {
        label: "GTM",
        content:
          document.querySelector('meta[name="gtm"]')?.content ||
          "No tiene etiqueta GTM",
      },
    );

    if (body.querySelector(":scope > .pmt-metaseo-host")) return;

    const host = document.createElement("div");
    host.className = "pmt-metaseo-host";

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
    data.forEach((item) => {
      const p = document.createElement("div");
      const span = document.createElement("span");
      p.innerText = item.label + ": ";
      span.innerText = item.content;
      p.appendChild(span);
      div.appendChild(p);
    });
    sr.appendChild(style);
    sr.appendChild(div);
    body.insertBefore(host, body.firstChild);
    return data;
  }

  function removeWidgets() {
    document.querySelectorAll(".pmt-metaseo-host").forEach((el) => el.remove());
  }

  PMTWidgetManager.init("metaseo", addWidgets, removeWidgets);
})();
