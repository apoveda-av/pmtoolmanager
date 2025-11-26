// Lista de herramientas disponibles: nombre del archivo y etiqueta del botón
const availableTools = {
    "getNamesWidget": "Nombres Widget",
    "getInfoWeb": "Informacion Web",
    "getMetaSeo": "Meta Seo",
    // Añade más herramientas aquí según las agregues a la carpeta tools/
};

function loadToolButtons() {
    const toolList = document.getElementById("toolList");
    
    Object.keys(availableTools).forEach(toolName => {
        const btn = document.createElement("button");
        btn.id = toolName;
        btn.textContent = availableTools[toolName];
        btn.addEventListener("click", () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: [`./tools/${toolName}/script.js`]
                });
            });
        });
        toolList.appendChild(btn);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadToolButtons);
} else {
    loadToolButtons();
}