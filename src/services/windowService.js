import { Window } from "@tauri-apps/api/window"
import { Webview } from "@tauri-apps/api/webview"
import { emitTo } from '@tauri-apps/api/event';
import settingService from "./settingService";
import { LogicalSize, PhysicalSize, Size } from '@tauri-apps/api/dpi';


function newWindow(label, url, windowOption, webviewLabel = null) {
  const toComplete = new Promise((resolve, reject) => {
    if (!webviewLabel) webviewLabel = label + ':webview'
    const window = new Window(label, windowOption);
    window.once('tauri://created', () => {
      const webview = new Webview(window, webviewLabel, {
        url: url,
        focus: true,
        x: 0,
        y: 0,
      });
      webview.once('tauri://created', function () {
        webview.setAutoResize(true).then(resp => {
          resolve({
            window,
            webview
          })
        }).catch(e => {
          reject(e)
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

async function openSettingPage() {
  if (await Window.getByLabel('settings')) return;
  return await newWindow('settings', '/settings', {
    center: true,
    width: 800,
    height: 600,
  })
}

async function openOnboardingPage() {
  if (await Window.getByLabel('onboarding')) return;
  return await newWindow('onboarding', '/onboarding', {
    center: true,
    width: 800,
    height: 600,
  })
}

async function openSpellPage() {
  if (await Window.getByLabel('spells')) return;
  const windowBundle = await newWindow('spells', '/spells', {
    width: 800,
    height: 600,
    visible: false,
  })
  await windowBundle.window.setSize(new LogicalSize(500, 50))
  await windowBundle.window.setClosable(false)
  return windowBundle;
}

async function showSpellPage() {
  const spellPage = await Window.getByLabel('spells')
  const spellPageWebview = await Webview.getByLabel('spells:webview')
  if (spellPage) {
    await spellPage.center()
    await spellPage.show()
    await spellPage.unminimize()
    await spellPage.setFocus()
    // await spellPageWebview.setFocus()
    await emitTo('spells', 'set_focus')
  }
}

async function hideSpellPage() {
  const spellPage = await Window.getByLabel('spells')
  await spellPage?.hide()
}

async function init() {
  await openSpellPage()
  const spellPage = await Window.getByLabel('spells')
  spellPage.onFocusChanged(({ payload: focused }) => {
    console.log(Math.random() + " " + focused)
    if (!focused) spellPage.hide()
  })

  console.log(settingService.showOnboadingPage())
  if (settingService.showOnboadingPage()) {
    await openOnboardingPage()
  }
}


export default {
  openOnboardingPage,
  openSettingPage,
  showSpellPage,
  hideSpellPage,
  init
}