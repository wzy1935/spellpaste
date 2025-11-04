import useSpellStore from "../stores/spellStore"
import evaluateService from "./evaluateService"
import { invoke } from "@tauri-apps/api/core"


async function copy() {
  return await invoke('copy')
}

async function paste(spellId, content) {
  const spell = useSpellStore.getState().getSpell(spellId)
  console.log(useSpellStore.getState())

  if (spell.type === 'safe-script') {
    const result = await evaluateService.safeEval(spell.content, content)
    await invoke('paste', { content: result })
  }
  if (spell.type === 'unsafe-script') {
    const result = await evaluateService.unsafeEval(spell.content, content)
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