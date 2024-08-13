// import studentForm from './studentForm';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
  studentData: {},
  students: [],
  error: null,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
