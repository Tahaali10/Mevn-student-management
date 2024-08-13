const studentModel = require("../model/studentModel");

module.exports.getDataFromDbService = async () => {
    try {
        const result = await studentModel.find({});
        return result;
    } catch (error) {
        throw new Error("Some Error in Fetching Student Data");
    }
};

module.exports.createUserDbService = async (userDetails) => {
    try {
        const studentModelData = new studentModel({
            name: userDetails.name,
            address: userDetails.address,
            phone: userDetails.phone,
            course:userDetails.course,
            fee:userDetails.fee,
            isSubmit:userDetails.isSubmit
        });

        const result = await studentModelData.save();
        return result;
    } catch (error) {
        throw new Error("Some Error in Creating User");
    }
};
module.exports.updateUserDbService = async (id, userDetails) => {
    try {
        const userUpdateData = await studentModel.findByIdAndUpdate(id, userDetails, {
            new: true,
        });
        return userUpdateData;
    } catch (error) {
        throw new Error("Some Error in Updating User");
    }
};

module.exports.deleteUserDbService = async (id) => {
    try {
        const userUpdateData = await studentModel.findByIdAndDelete(id, {
            new: true,
        });
        return userUpdateData;
    } catch (error) {
        throw new Error("Some Error in Deleting User");
    }
};