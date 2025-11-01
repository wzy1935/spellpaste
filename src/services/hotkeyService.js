import { register, unregisterAll } from '@tauri-apps/plugin-global-shortcut';
import windowService from './windowService';
import { invoke } from '@tauri-apps/api/core';
import evaluateService from './evaluateService';
import useSpellStore from '../stores/spellStore';
import spellService from './spellService';

async function refreshAllSpells() {
  await unregisterAll()
  const spellItems = useSpellStore.getState().items
  spellItems.forEach(async item => {
    if (!item.shortcut) return
    console.log(item)
    await register(item.shortcut, async (event) => {
      if (event.state === "Pressed") {

        const content = await spellService.copy()
        console.log(item.id, content)
        await spellService.paste(item.id, content)
      }
    })
  })
}


async function registerHotkeys() {
  return await register('CommandOrControl+Space', async (event) => {
    if (event.state === "Pressed") {
      console.log('Shortcut triggered');
      let result = await invoke('copy')
      result = await evaluateService.safeEval(`
          let formatted = content.replace(/\\s+/g, ' ');
          formatted = formatted.replace(/\\n{2,}/g, ' ');
          formatted;
          `, result)
      await invoke('paste', { content: result })
    }
  });
}


export default {
  refreshAllSpells
}