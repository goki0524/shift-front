export default {
  state: () => ({
    questions: null,
  }),

  mutations: {
    setQuestions (state, questions) {
      state.questions = [...questions]
    },
  },

  getters: {
    questions (state) {
      return state.questions
    },
  },
}