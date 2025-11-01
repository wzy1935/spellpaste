import { register, unregisterAll } from '@tauri-apps/plugin-global-shortcut';
import useSpellStore from '../stores/spellStore';
import spellService from './spellService';

async function refreshAllSpells() {
  await unregisterAll()
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

export default {
  refreshAllSpells
}