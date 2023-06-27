import { themeConfig, themePreset } from "@/themeConfig";

const state = {
  themeMode: themeConfig,
  vuetifyPreset: themePreset
};

const getters = {
  getThemeMode: state => state.themeMode,
  getVuetifyPreset: state => state.vuetifyPreset
};

const actions = {
  changeVerticalSidebarDrawer({ commit }) {
    commit("toggleVerticalSidebarDrawer");
  },
  changeVerticalSaasSidebarDrawer({ commit }) {
    commit("toggleVerticalSaasSidebarDrawer");
  },
  changeVerticalSidebarDrawerColor({ commit }, data) {
    commit("toggleVerticalSidebarDrawerColor", data);
  },
  changeCompactVerticalSidebarDrawer({ commit }) {
    commit("toggleCompactVerticalSidebarDrawer");
  },
  changeThemeLoadingState({ commit }, payload) {
    commit("toggleThemeLoadingState", payload);
  }
};

const mutations = {
  toggleThemeLoadingState(state, payload) {
    state.themeMode.isLoading = payload;
  },
  toggleVerticalSidebarDrawer(state) {
    state.themeMode.verticalSidebarDrawer = !state.themeMode
      .verticalSidebarDrawer;
  },
  toggleVerticalSaasSidebarDrawer(state) {
    state.themeMode.verticalSaasSidebarDrawer = !state.themeMode
      .verticalSaasSidebarDrawer;
  },
  toggleVerticalSidebarDrawerColor(state, data) {
    state.themeMode.verticalSidebarDrawerColor = data;
  },
  toggleCompactVerticalSidebarDrawer(state) {
    state.themeMode.verticalCompactSidebarDrawer = !state.themeMode
      .verticalCompactSidebarDrawer;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};

