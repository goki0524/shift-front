export default {
  state: () => ({
    company: null,
  }),

  mutations: {
    setCompany (state, company) {
      state.company = {...company}
    },
  },

  getters: {
    company (state) {
      return state.company
    },
  },

}