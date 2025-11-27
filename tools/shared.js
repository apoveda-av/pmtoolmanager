/**
 * Módulo compartido para gestionar widgets en todas las herramientas
 */
const PTMWidgetManager = (function () {
    /**
     * Alterna la visibilidad de widgets
     * @param {string} toolName - Nombre único de la herramienta (ej: "widget", "infoweb", "metaseo")
     * @param {Function} addFn - Función que agrega los widgets
     * @param {Function} removeFn - Función que elimina los widgets
     */
    function toggle(toolName, addFn, removeFn) {
        const FLAG = `__ptm_${toolName}_active`;
        
        if (window[FLAG]) {
            removeFn();
            window[FLAG] = false;
            console.log(`ptm: ${toolName} removed`);
        } else {
            const result = addFn();
            window[FLAG] = true;
            console.log(`ptm: ${toolName} injected`, result);
        }
    }

    /**
     * Inicializa una herramienta esperando a que el DOM esté listo
     * @param {string} toolName - Nombre único de la herramienta
     * @param {Function} addFn - Función que agrega los widgets
     * @param {Function} removeFn - Función que elimina los widgets
     */
    function init(toolName, addFn, removeFn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => {
                toggle(toolName, addFn, removeFn);
            }, { once: true });
        } else {
            toggle(toolName, addFn, removeFn);
        }
    }

    return {
        toggle,
        init
    };
})();