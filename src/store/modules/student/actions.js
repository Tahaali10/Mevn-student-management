import axios from 'axios';

export default {
  async fetchStudents({ commit }) {
    try {
      const response = await axios.get('http://localhost:5000/user/getAll');
      commit('setStudents', response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  },
  async addStudent({ dispatch }, student) {
    try {
      await axios.post('http://localhost:5000/user/create', student);
      alert('Student Record Saved!');
      dispatch('fetchStudents'); // Fetch updated list
    } catch (error) {
      console.error('Error adding student:', error);
    }
  },
  async updateStudent({ dispatch }, student) {
    try {
      await axios.patch(`http://localhost:5000/user/update/${student._id}`, student);
      alert('Student Record Updated!');
      dispatch('fetchStudents'); // Fetch updated list
    } catch (error) {
      console.error('Error updating student:', error);
    }
  },
  async deleteStudent({ dispatch }, studentId) {
    try {
      await axios.delete(`http://localhost:5000/user/delete/${studentId}`);
      alert('Student Record Deleted!');
      dispatch('fetchStudents'); // Fetch updated list
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  },
};
