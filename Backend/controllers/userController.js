import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials", success: false })
        }
        const token = createToken(user._id)
        res.status(200).json({ message: "Login successful", success: true, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false })
        }
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.status(409).json({ message: "User already exists", success: false })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format", success: false });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long", success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.status(201).json({ message: "User registered successfully", success: true, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, success: false })
    }
}

export { loginUser, registerUser }