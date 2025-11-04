import { useOnceEffect } from '@reactuses/core'
import localFileService from '../services/localFileService';
import trayService from '../services/trayService';

async function init() {
  await trayService.init()
  await localFileService.init()
}

function InitPage() {
  useOnceEffect(() => {
    init()
  }, [])


  return (<>
    <div className=" bg-amber-200">
      init page, for dev test only
    </div>
  </>)
}

export default InitPage;