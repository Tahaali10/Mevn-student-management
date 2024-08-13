const studentServices = require('./studentServices');

const getDataControllerfn = async (req, res) => {
    try {
        const employees = await studentServices.getDataFromDbService();
        res.send({ "status": true, "data": employees });
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error in fetching data" });
    }
};

const createstudentControllerfn = async (req, res) => {
    try {
        const status = await studentServices.createUserDbService(req.body);
        if (status) {
            res.send({ "status": true, "message": "User Created Successfully" });
        } else {
            res.send({ "status": false, "message": "Error in Creating User" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error in Creating User" });
    }
};
const updatestudentControllerfn = async (req, res) => {
    try {
        const status = await studentServices.updateUserDbService(req.params.id,req.body);
        if (status) {
            res.send({ "status": true, "message": "User Update Successfully" });
        } else {
            res.send({ "status": false, "message": "Error in Updating User" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error in Updating User" });
    }
};

const deletestudentControllerfn = async (req, res) => {
    try {
        const status = await studentServices.deleteUserDbService(req.params.id);
        if (status) {
            res.send({ "status": true, "message": "User Deleted Successfully" });
        } else {
            res.send({ "status": false, "message": "Error in Deleting User" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Error in Deleting User" });
    }
};
module.exports = { getDataControllerfn, createstudentControllerfn,updatestudentControllerfn,deletestudentControllerfn };
