import { TrayIcon } from '@tauri-apps/api/tray';
import { Menu } from '@tauri-apps/api/menu';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { exit, relaunch } from '@tauri-apps/plugin-process';
import localFileService from './localFileService';

const menuOptions = {
  items: [
    {
      id: 'spell',
      text: 'Config spells',
      action: async () => {
        await localFileService.openSpellFile()
      }
    },
    // {
    //   id: 'welcome',
    //   text: 'Open welcome page',
    //   action: () => {
    //     console.log('OPEN WELCOME PAGE')
    //   }
    // },
    // {
    //   id: 'settings',
    //   text: 'Open settings',
    //   action: () => {
    //     console.log('OPEN SETTINGS')
    //   }
    // },
    {
      id: 'quit',
      text: 'Quit',
      action: async () => {
        await exit(0)
      }
    }
  ],
}

async function init() {
  try {
    await TrayIcon.removeById('spellpaste')
  } catch (e) {
    console.log('Can not find existing tray. Will create one.')
  }
  const options = {
    id: 'spellpaste',
    menu: await Menu.new(menuOptions),
    icon: await defaultWindowIcon(),
  };
  await TrayIcon.new(options);
}

export default {
  init
}