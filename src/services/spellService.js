import useItemStore from "../stores/spellStore"
import evaluateService from "./evaluateService"
import { invoke } from "@tauri-apps/api/core"


async function copy() {
  return await invoke('copy')
}

async function paste(spellId, content) {
  const spell = useItemStore.getState().getSpell(spellId)
  console.log('SSSS', content)

  if (spell.type === 'safe-script') {
    const result = await evaluateService.safeEval(spell.content, content)
    await invoke('paste', { content: result })
  }
  if (spell.type === 'unsafe-script') {
    const result = await evaluateService.unsafeEval(spell.content, content)
    console.log('RRRR', result)
    await invoke('paste', { content: result })
  }
  if (spell.type === 'text') {
    await invoke('paste', { content: spell.content })
  }

}


export default {
  copy,
  paste
}