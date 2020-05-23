export default {
  state: () => ({
    stepper: 1,
    questions: null,
    answersArr: [],
    tag:'',
  }),

  mutations: {
    setStepper (state, stepper) {
      state.stepper = stepper
    },
    setQuestions (state, questions) {
      state.questions = [...questions]
    },
    addAnswersArr (state, answer) {
      state.answersArr.push(answer)
    },
    deleteAnswersArr (state, answer) {
      state.answersArr.pop(answer)
    },
    setTag (state, tag) {
      state.tag = tag
    }
  },

  getters: {
    stepper (state) {
      return state.stepper
    },
    questions (state) {
      return state.questions
    },
    questionCount (state) {
      if (state.questions.length) {
        return state.questions.length
      } else {
        return 0
      }
    },
    answersArr (state) {
      return state.answersArr
    },
    tag (state) {
      return state.tag
    }
  },
}