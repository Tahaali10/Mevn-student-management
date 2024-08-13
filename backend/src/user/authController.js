const authServices = require('./authServices');

const signupUserfn = async (req, res) => {
    try {
        const user = await authServices.signupUser(req.body);
        res.send({ status: true, message: "User Created Successfully", data: user });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

const loginUserfn = async (req, res) => {
    try {
        const { user, token } = await authServices.loginUser(req.body.email, req.body.password);
        res.send({ status: true, data: { user, token } });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = {
    signupUserfn,
    loginUserfn
};
