import {
    GET_STUDENT_DATA_GETTER,
    GET_STUDENTS_GETTER,
    GET_ERROR_GETTER,
} from '../../storeconstants';

export default {
    [GET_STUDENT_DATA_GETTER]: (state) => state.studentData,
    [GET_STUDENTS_GETTER]: (state) => state.students,
    [GET_ERROR_GETTER]: (state) => state.error,
};
