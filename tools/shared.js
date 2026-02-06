/**
 * Módulo compartido para gestionar widgets en todas las herramientas
 */
const PMTWidgetManager = (function () {
    // Registro de todas las herramientas activas
    const registry = new Map();

    /**
     * Limpia todas las herramientas activas excepto la actual
     * @param {string} currentTool - Nombre de la herramienta actual
     */
    function cleanupOthers(currentTool) {
        registry.forEach((removeFn, toolName) => {
            if (toolName !== currentTool) {
                const FLAG = `__pmt_${toolName}_active`;
                if (window[FLAG]) {
                    removeFn();
                    window[FLAG] = false;
                    console.log(`pmt: ${toolName} removed (cleanup)`);
                }
            }
        });
    }

    /**
     * Alterna la visibilidad de widgets
     * @param {string} toolName - Nombre único de la herramienta (ej: "widget", "infoweb", "metaseo")
     * @param {string} currentTool - Nombre de la herramienta actual
     * @param {Function} addFn - Función que agrega los widgets
     * @param {Function} removeFn - Función que elimina los widgets
     */
    function toggle(toolName, addFn, removeFn) {
        const FLAG = `__pmt_${toolName}_active`;
        
        // Registrar la herramienta
        if (!registry.has(toolName)) {
            registry.set(toolName, removeFn);
        }

        // Limpiar otras herramientas antes de alternar la actual
        cleanupOthers(toolName);
        
        if (window[FLAG]) {
            removeFn();
            window[FLAG] = false;
            console.log(`pmt: ${toolName} removed`);
        } else {
            const result = addFn();
            window[FLAG] = true;
            console.log(`pmt: ${toolName} injected`, result);
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