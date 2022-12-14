const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { isvalidEmail, checkPassword, validateObjectId } = require('../validators/validator')


const register = async(req, res) => {
    try {
        const data = req.data

        const saveData = await userModel.create(data);
        return res.status(201).send({ status: true, msg: "User created successfully", data: saveData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const loginUser = async(req, res) => {
    try {
        const user = req.body;
        if (Object.keys(user).length === 0) return res.status(400).send({ status: false, message: "enter a field to login" });

        const { email, password } = user

        if (!isvalidEmail.test(email)) return res.status(400).send({ status: false, message: "email must be present and valid" });
        if (!checkPassword.test(password)) return res.status(400).send({ status: false, message: "Please Enter Your's Password" });

        const loggedInUser = await userModel.findOne({ email: email })
        if (!loggedInUser) return res.status(404).send({ status: false, message: "No user Found With The Input Credentials, Please Confirm The Credentials" })

        const isValidPassword = await bcrypt.compare(password.trim(), loggedInUser.password);
        if (!isValidPassword) return res.status(400).send({ status: false, message: "Password is not correct" });

        const token = jwt.sign({ userId: loggedInUser._id }, "project36", { expiresIn: '24h' });
        const data = { userId: loggedInUser._id, token: token }
        return res.status(200).send({ status: true, message: "Success", data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


const getUserById = async(req, res) => {
    try {
        let userId = req.params.userId

        if (!validateObjectId(userId)) return res.status(400).send({ status: false, message: "userId is not valid" })
        const userProfile = await userModel.findById(userId)
        if (!userProfile) return res.status(404).send({ status: false, message: `No user found with this id ${userId}` })

        return res.status(200).send({ status: true, message: "User profile details", data: userProfile })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }

}



const updateUser = async function(req, res) {
    try {
        const filter = req.filter
        const userId = req.params.userId

        const updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {...filter }, { new: true })
        return res.status(200).send({ status: true, message: "User profile updated", data: updatedUser })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}


module.exports = { register, getUserById, updateUser, loginUser, };