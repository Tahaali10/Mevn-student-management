var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    fee:{
        type: String,
        required: true
    },
    isSubmit:{
        type: Boolean,
    }
});

module.exports = mongoose.model('student', studentSchema);
