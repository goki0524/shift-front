export default {
  state: () => ({
    companyLatestPhysicalScore: {},
    scoreTransitions: {},
    groupsLatestPhysicalScores: [],
    characteristicValueData: {},
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
    },
    setCharacteristicValueData (state, characteristicValueData) {
      state.characteristicValueData = characteristicValueData
    },
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
    },
    characteristicValueData (state) {
      return state.characteristicValueData
    },

  },
}