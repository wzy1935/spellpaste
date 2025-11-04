import { create } from 'zustand'


const useSettingStore = create((set, get) => ({
  settings: {},
  setSettings(settings) {
    set(state => ({ settings: settings }))
  }
}))

export default useSettingStore