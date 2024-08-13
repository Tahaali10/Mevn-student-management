<template>
    <div>
        <h2>Student Registration System</h2>
        <form @submit.prevent="save">
            <div class="form-group">
                <label>Name</label>
                <input type="text" v-model="student.name" class="form-control" placeholder="Student Name">
            </div>
            <div class="form-group">
                <label>Address</label>
                <input type="text" v-model="student.address" class="form-control" placeholder="Student Address">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" v-model="student.phone" class="form-control" placeholder="Student Mobile">
            </div>
            <div class="form-group">
                <label>Course</label>
                <input type="text" v-model="student.course" class="form-control" placeholder="Student Course">
            </div>
            <div class="form-group">
                <label>Fee</label>
                <input type="text" v-model="student.fee" class="form-control" placeholder="Student Fee">
            </div>
            <div class="form-group">
                <label>Fee Submitted</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="feeYes" value="true" v-model="student.isSubmit">
                    <label class="form-check-label" for="feeYes">
                        Yes
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="feeNo" value="false" v-model="student.isSubmit">
                    <label class="form-check-label" for="feeNo">
                        No
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    
        <h2>Student View</h2>
        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Course</th>
                    <th scope="col">Fee</th>
                    <th scope="col">Submitted</th>
                    <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in result" :key="student._id">
                    <td>{{ student._id }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.address }}</td>
                    <td>{{ student.phone }}</td>
                    <td>{{ student.course }}</td>

                    <td>{{ student.fee }}</td>
                    <td>{{ student.isSubmit ? 'Yes' : 'No' }}</td>
                    <td>
                        <button type="button" class="btn btn-warning" @click="edit(student)">Edit</button>
                        <button type="button" class="btn btn-danger" @click="remove(student)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </template>
    
    <script>
    import axios from 'axios';
    
    export default {
        name: 'studentForm',
        data() {
            return {
                result: [],
                student: {
                    _id: '',
                    name: '',
                    address: '',
                    phone: '',
                    course: '',
                    fee: '',
                    isSubmit: '',
                },
            };
        },
        created() {
            this.StudentLoad();
        },
        methods: {
            StudentLoad() {
                axios.get('http://localhost:5000/user/getAll')
                    .then(response => {
                        this.result = response.data.data;
                    })
                    .catch(error => {
                        console.error("There was an error fetching the students!", error);
                    });
            },
            save() {
                if (this.student._id === '') {
                    this.saveData();
                } else {
                    this.updateData();
                }
            },
            saveData() {
                axios.post('http://localhost:5000/user/create', this.student)
                    .then(() => {
                        alert('Student Record Saved!');
                        this.StudentLoad();
                        this.resetStudent();
                    })
                    .catch(error => {
                        console.error("There was an error saving the student!", error);
                    });
            },
            edit(student) {
                this.student = {
                    ...student
                };
            },
            updateData() {
                axios.patch(`http://localhost:5000/user/update/${this.student._id}`, this.student)
                    .then(() => {
                        alert('Student Record Updated!!!');
                        this.StudentLoad();
                        this.resetStudent();
                    })
                    .catch(error => {
                        console.error("There was an error updating the student!", error);
                    });
            },
            remove(student) {
                axios.delete(`http://localhost:5000/user/delete/${student._id}`)
                    .then(() => {
                        alert('Student Record Deleted!!!');
                        this.StudentLoad();
                    })
                    .catch(error => {
                        console.error("There was an error deleting the student!", error);
                    });
            },
            resetStudent() {
                this.student = {
                    _id: '',
                    name: '',
                    address: '',
                    phone: '',
                    course: '',
                    fee: '',
                    isSubmit: '',
                };
            },
        },
    };
    </script>
    
    <style scoped></style>
    