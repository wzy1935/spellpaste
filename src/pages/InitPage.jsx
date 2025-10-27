import { useOnceEffect } from '@reactuses/core'
import trayManager from '../services/trayManager'
import windowManager from '../services/windowManager'
import hotkeyManager from '../services/hotkeyManager';
import sandbox from '../services/sandbox';
import { invoke } from '@tauri-apps/api/core';
import { Window } from "@tauri-apps/api/window"

async function init() {
  // console.log(await sandbox.evaluate(`
  //   let formatted = content.replace(/\\s+/g, '\\n');
  //   formatted = formatted.replace(/\\n{2,}/g, '\\n');
  //   formatted;
  //   `, 'hello world! This    is my    text   '))
  

  // await trayManager.initTray()
  await hotkeyManager.registerHotkeys()
  // await windowManager.openHome()
}

function InitPage() {
  useOnceEffect(() => {
    init()
  }, [])

  async function boc() {
    console.log('xx')
    await Window.getCurrent().hide()
    console.log('xx2')
    invoke('paste', {content: 'xxx'})
  }


  return (<>
    <div className=" bg-amber-200">
      init page, for dev test only
      <button onClick={boc} className=' cursor-pointer'>test</button>
    </div>
  </>)
}

export default InitPage;