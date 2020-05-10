export default {
  state: () => ({
    companyLatestPhysicalScore: {},
    scoreTransitions: {},
    groupsLatestPhysicalScores: [],
  }),

  mutations: {
    setCompanyLatestPhysicalScore (state, companyLatestPhysicalScore) {
      state.companyLatestPhysicalScore = companyLatestPhysicalScore
    },
    setScoreTransitions (state, scoreTransitions) {
      state.scoreTransitions = scoreTransitions
    },
    setGroupsLatestPhysicalScores (state, groupsLatestPhysicalScores) {
      state.groupsLatestPhysicalScores = groupsLatestPhysicalScores
    }
  },

  getters: {
    companyLatestPhysicalScore (state) {
      return state.companyLatestPhysicalScore
    },
    scoreTransitions (state) {
      return state.scoreTransitions
    },
    groupsLatestPhysicalScores (state) {
      return state.groupsLatestPhysicalScores
    }

  },
}