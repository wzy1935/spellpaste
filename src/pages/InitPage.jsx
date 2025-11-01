import { useOnceEffect } from '@reactuses/core'
import { invoke } from '@tauri-apps/api/core';
import { Window } from "@tauri-apps/api/window"
import spellService from '../services/spellService';
import hotkeyService from '../services/hotkeyService';

async function init() {
  await hotkeyService.refreshAllSpells()
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