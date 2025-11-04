import { readTextFile, writeTextFile, create, watch, mkdir, BaseDirectory, exists } from '@tauri-apps/plugin-fs';
import { openPath } from '@tauri-apps/plugin-opener';
import { appDataDir, resolve } from '@tauri-apps/api/path';
import useSpellStore from '../stores/spellStore';
import hotkeyService from './hotkeyService';

async function init() {
  const base = await appDataDir();
  console.log(base)
  if (!await exists(base)) {
    await mkdir(base)
  }
  if (!await exists("spells.json", { baseDir: BaseDirectory.AppData })) {
    await writeTextFile("spells.json", "[]", { baseDir: BaseDirectory.AppData })
  }
  await loadSpells();
  await watchSpellsSync();
}

async function loadSpells() {
  const spellJsonStr = await readTextFile("spells.json", { baseDir: BaseDirectory.AppData })
  useSpellStore.getState().setSpells(JSON.parse(spellJsonStr))
  hotkeyService.refreshAllSpells()
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
  loadSpells,
  openSpellFile
}