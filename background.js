// Reemplaza el contenido para MV3 (service worker) usando chrome.action y chrome.scripting
const api = (typeof browser !== "undefined") ? browser : chrome;

// Mantener compatibilidad con código previo que usaba api.browserAction
// pero en MV3 Chrome usa chrome.action
const actionApi = api.action || api.browserAction || api.action;

if (actionApi && typeof chrome !== "undefined" && chrome.scripting) {
  // Chrome MV3: usar chrome.action.onClicked + chrome.scripting.executeScript
  chrome.action.onClicked.addListener((tab) => {
    if (!tab || !tab.id) return;
    chrome.scripting.executeScript(
      { target: { tabId: tab.id }, files: ["getNamesWidget.js"] },
      (results) => {
        if (chrome.runtime && chrome.runtime.lastError) {
          console.error("Inject error:", chrome.runtime.lastError.message);
        }
      }
    );
  });
} else if (api.browserAction && api.browserAction.onClicked) {
  // Fallback (older manifest v2 / Firefox)
  api.browserAction.onClicked.addListener((tab) => {
    const tabsApi = api.tabs;
    if (typeof tabsApi.executeScript === "function") {
      try {
        const res = tabsApi.executeScript(tab.id, { file: "getNamesWidget.js" });
        if (res && res.catch) res.catch(err => console.error("Inject error:", err));
      } catch (e) {
        tabsApi.executeScript(tab.id, { file: "getNamesWidget.js" }, () => {
          if (api.runtime && api.runtime.lastError) console.error("Inject error:", api.runtime.lastError.message);
        });
      }
    }
  });
}