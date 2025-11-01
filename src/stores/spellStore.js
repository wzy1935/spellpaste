import { create } from 'zustand'


const useSpellStore = create((set, get) => ({
  items: [],
  getSpell(spellId) {
    const spellItems = get().items;
    return spellItems.find(item => item.id === spellId) || null;
  },
  setSpells(spellItems) {
    set(state => ({ items: spellItems }))
  }
}))

export default useSpellStore