import { TrayIcon } from '@tauri-apps/api/tray';
import { Menu } from '@tauri-apps/api/menu';
import { defaultWindowIcon } from '@tauri-apps/api/app';


const menuOptions = {
  items: [
    {
      id: 'welcome',
      text: 'Open welcome page',
      action: () => {
        console.log('OPEN WELCOME PAGE')
      }
    },
    {
      id: 'settings',
      text: 'Open settings',
      action: () => {
        console.log('OPEN SETTINGS')
      }
    },
    {
      id: 'quit',
      text: 'Quit',
      action: () => {
        console.log('QUIT')
      }
    }
  ],
}

async function initTray() {
  const options = {
    menu: await Menu.new(menuOptions),
    icon: await defaultWindowIcon(),
  };
  const tray = await TrayIcon.new(options);
  return tray;
}

export default {
  initTray
}