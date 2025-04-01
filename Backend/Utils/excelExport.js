const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");  // ✅ Added for proper file path handling
const UserModel = require("../Models/user");

const exportUsersToExcel = async () => {
    try {
        // Fetch all users from the database (excluding password)
        const users = await UserModel.find({}, "name email");

        // Convert user data to JSON format for Excel
        const usersData = users.map(user => ({
            Name: user.name,
            Email: user.email
        }));

        // Create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(usersData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        // Define the file path (ensure the directory exists)
        const exportDir = path.join(__dirname, "..", "exports");
        if (!fs.existsSync(exportDir)) {
            fs.mkdirSync(exportDir, { recursive: true });  // ✅ Create 'exports/' if missing
        }

        const filePath = path.join(exportDir, "users.xlsx");

        // Write workbook to file
        XLSX.writeFile(workbook, filePath);
        
        console.log("✅ User data exported successfully:", filePath);
        return filePath;
    } catch (err) {
        console.error("❌ Error exporting users to Excel:", err);
        throw err;  // ✅ Throw error so it can be caught by the calling function
    }
};

module.exports = exportUsersToExcel;
