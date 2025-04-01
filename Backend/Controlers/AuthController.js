const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user");
const exportUsersToExcel = require("../Utils/excelExport");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists", success: false });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup Successfully",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        const errorMsg = "Auth failed: email or password is incorrect";

        // Check if user exists
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Generate JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login Successful",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

// Export users to Excel file
const exportUsers = async (req, res) => {
    try {
        await exportUsersToExcel();
        res.status(200).json({
            message: "User data exported successfully",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    signup,
    login,
    exportUsers
};
