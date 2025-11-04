import useSettingStore from "../stores/settingStore"

const defaultSettings = {
  showOnboardingPage: true,
}

function showOnboadingPage() {
  return useSettingStore.getState().settings?.showOnboardingPage ?? false
}

export default {
  defaultSettings,
  showOnboadingPage,
}