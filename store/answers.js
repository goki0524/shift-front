export default {
  state: () => ({
    stepper: 1,
    questions: null,
  }),

  mutations: {
    setStepper (state, stepper) {
      state.stepper = stepper
    },
    setQuestions (state, questions) {
      state.questions = [...questions]
    },
  },

  getters: {
    stepper (state) {
      return state.stepper
    },
    questions (state) {
      return state.questions
    },
  },
}