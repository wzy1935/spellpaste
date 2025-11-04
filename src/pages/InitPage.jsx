import { useOnceEffect } from '@reactuses/core'
import localFileService from '../services/localFileService';
import trayService from '../services/trayService';
import windowService from '../services/windowService';
import hotkeyService from '../services/hotkeyService';

async function init() {
  await trayService.init()
  await localFileService.init()
  await localFileService.initPerWebview()
  await windowService.init()
  await hotkeyService.init()

}

function InitPage() {
  useOnceEffect(() => {
    init()
  }, [])


  return (<>
    <div className=" h-screen w-screen flex justify-center items-center">
      init
    </div>
  </>)
}

export default InitPage;