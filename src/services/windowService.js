import { Window } from "@tauri-apps/api/window"
import { Webview } from "@tauri-apps/api/webview"


function createWindowOption(center = true, decorations = true, width = 600, height = 400, visible = true) {
  return {
    center,
    decorations,
    width,
    height,
    visible
  }
}

function newWindow(label, url, windowOption, webviewLabel = null) {
  const toComplete = new Promise((resolve, reject) => {
    if (!webviewLabel) webviewLabel = label + ':webview'
    const window = new Window(label, windowOption);
    window.once('tauri://created', () => {
      const webview = new Webview(window, webviewLabel, {
        url: url,
        x: 0,
        y: 0,
      });
      webview.once('tauri://created', function () {
        resolve({
          window,
          webview
        })
      });
      webview.once('tauri://error', function (e) {
        reject(e)
      });
    });
    window.once('tauri://error', (e) => {
      reject(e)
    })
  })
  return toComplete;

}

async function openHome() {
  return await newWindow('home', '/home', createWindowOption())
}


export default {
  createWindowOption,
  newWindow,
  openHome
}