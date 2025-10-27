import { register } from '@tauri-apps/plugin-global-shortcut';
import windowManager from './windowManager';
import { invoke } from '@tauri-apps/api/core';
import sandbox from './sandbox';


async function registerHotkeys() {
  return await register('CommandOrControl+Space', async (event) => {
    if (event.state === "Pressed") {
      console.log('Shortcut triggered');
      let result = await invoke('copy')
      result = await sandbox.evaluate(`
          let formatted = content.replace(/\\s+/g, ' ');
          formatted = formatted.replace(/\\n{2,}/g, ' ');
          formatted;
          `, result)
      await invoke('paste', {content: result})
    }
  });
}


export default {
  registerHotkeys
}