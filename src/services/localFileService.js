import { readTextFile, writeTextFile, create, watch, mkdir, BaseDirectory, exists } from '@tauri-apps/plugin-fs';
import { openPath } from '@tauri-apps/plugin-opener';
import { appDataDir, resolve } from '@tauri-apps/api/path';
import useSpellStore from '../stores/spellStore';
import hotkeyService from './hotkeyService';
import settingService from './settingService';
import useSettingStore from '../stores/settingStore';

async function init() {
  // setup folder
  const base = await appDataDir();
  console.log(base)
  if (!await exists(base)) {
    await mkdir(base)
  }

  // spells
  if (!await exists("spells.json", { baseDir: BaseDirectory.AppData })) {
    await writeTextFile("spells.json", "[]", { baseDir: BaseDirectory.AppData })
  }


  // settings
  if (!await exists("settings.json", { baseDir: BaseDirectory.AppData })) {
    await writeTextFile("settings.json", JSON.stringify(settingService.defaultSettings, null, 2), { baseDir: BaseDirectory.AppData })
  }

}

async function initPerWebview() {
  await loadSpells();
  await watchSpellsSync();
  await loadSettings();
}

async function loadSpells() {
  const spellJsonStr = await readTextFile("spells.json", { baseDir: BaseDirectory.AppData })
  useSpellStore.getState().setSpells(JSON.parse(spellJsonStr))
  hotkeyService.refreshAllSpells()
}

async function loadSettings() {
  const settingJsonStr = await readTextFile("settings.json", { baseDir: BaseDirectory.AppData })
  useSettingStore.getState().setSettings(JSON.parse(settingJsonStr))
}

async function watchSpellsSync() {
  await watch(
    "spells.json",
    (event) => {
      loadSpells()
    },
    {
      baseDir: BaseDirectory.AppData,
      delayMs: 500,
    }
  );
}

async function openSpellFile() {
  const spellPath = await resolve(await appDataDir(), "spells.json")
  await openPath(spellPath)
}



export default {
  init,
  initPerWebview,
  loadSpells,
  openSpellFile
}