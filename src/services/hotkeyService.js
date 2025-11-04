import { register, unregister, unregisterAll, isRegistered } from '@tauri-apps/plugin-global-shortcut';
import useSpellStore from '../stores/spellStore';
import spellService from './spellService';
import windowService from './windowService';

async function refreshAllSpells() {
  await unregisterAll()
  await registerMainShortcut()
  const spellItems = useSpellStore.getState().items
  spellItems.forEach(async item => {
    if (!item.shortcut) return
    await register(item.shortcut, async (event) => {
      if (event.state === "Pressed") {

        const content = await spellService.copy()
        await spellService.paste(item.id, content)
      }
    })
  })
}

async function registerMainShortcut() {
  if (await isRegistered("CommandOrControl+Space")) {
    await unregister("CommandOrControl+Space")
  }
  await register("CommandOrControl+Space", async (event) => {
    if (event.state === "Pressed") {
      await windowService.showSpellPage()
    }
  })
}

async function init() {
  await registerMainShortcut()
}

export default {
  refreshAllSpells,
  init
}