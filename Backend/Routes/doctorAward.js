const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const db = require("../Models/postgressdb");

router.use(cors());
router.use(express.json());

// Configure nodemailer with better error handling 

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "globalhealth235@gmail.com", // your Gmail address
        pass: "snul decp usnu cszn",         // your 16-character App Password
    },
});

const mailOptions = {
    from: "globalhealth235@gmail.com",
    to: "recipient@example.com",
    subject: "Test Email",
    text: "Hello! This is a test email sent using Nodemailer and Gmail.",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log("Error:", error);
    }
    console.log("Email sent:", info.response);
});


// Test email configuration on startup
transporter.verify((error, success) => {
    if (error) {
    } else {
        console.log('Email server is ready to send messages');
    }
});

// POST API to save medical registration data
router.post('/medical-registration', async (req, res) => {
    try {
        const {
            fullname,
            gender,
            dob,
            nationality,
            country_pride,
            medical_specialty,
            current_designation_institution,
            medical_registration_number,
            issuing_authority,
            years_of_practice,
            languages_spoken,
            key_achievements,
            signature,
            email,
            phone_number
        } = req.body;

        // Validate required fields
        const requiredFields = [
            'fullname', 'gender', 'dob', 'nationality', 'medical_specialty',
            'current_designation_institution', 'medical_registration_number',
            'issuing_authority', 'years_of_practice', 'email', 'phone_number'
        ];

        for (let field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    message: `Please provide ${field.replace(/_/g, ' ')}`
                });
            }
        }

      

        // Check if medical registration number already exists
        const regNumCheckQuery = 'SELECT id FROM medical_registration WHERE medical_registration_number = $1';
        const existingRegNum = await db.query(regNumCheckQuery, [medical_registration_number]);
        
        if (existingRegNum.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "This medical registration number is already registered. Please verify your registration number."
            });
        }

        // Get current date
        const current_date = new Date();

        // Insert data into medical_registration table
        const query = `
            INSERT INTO medical_registration (
                fullname, gender, dob, nationality, country_pride, 
                medical_specialty, current_designation_institution, 
                medical_registration_number, issuing_authority, 
                years_of_practice, languages_spoken, key_achievements, 
                signature, email, phone_number, registration_date
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING *
        `;

        const result = await db.query(query, [
            fullname, gender, dob, nationality, country_pride,
            medical_specialty, current_designation_institution,
            medical_registration_number, issuing_authority,
            years_of_practice,
            languages_spoken, key_achievements,
            signature, email, phone_number, current_date
        ]);

        // Send confirmation email
        try {
            const mailOptions = {
                from: `"Medical Registration Team" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Medical Registration - Next Steps Required',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #2c5aa0;">Medical Registration Confirmation</h2>
                        <p>Dear Dr. ${fullname},</p>
                        
                        <p>Thank you for submitting your medical registration form. We have successfully received your initial application.</p>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                            <h3 style="color: #dc3545;">Next Steps Required:</h3>
                            <p>To complete your registration, please submit the following documents:</p>
                            <ul>
                                <li>Complete reprint of paper Submitted for consideration for the award</li>
                                <li>Biodata , mentioning academic , professional and research contribution</li>
                             <li>Provide statement giving detils achievement during last 5 year</li>
            <li>Certificate of No objection form all other co-Authors for research work submitted for the award</li>


                            </ul>
                        </div>

                         <div style="max-width:600px;margin:40px auto;padding:20px;border-radius:12px;
            box-shadow:0 4px 15px rgba(0,0,0,0.15);background:#f9fafb;
            font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111;">
  
 

  

 
</div>

                        
                        <p>Please reply to this email with the required documents attached, or upload them through our secure portal.</p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p><strong>Registration Details:</strong></p>
                            <p>Registration ID: ${result.rows[0].id}</p>
                            <p>Submitted on: ${current_date.toDateString()}</p>
                            <p>Medical Specialty: ${medical_specialty}</p>
                            <p>Years of Practice: ${years_of_practice}</p>
                        </div>
                        
                        <p>If you have any questions, please don't hesitate to contact our support team.</p>
                        
                        <p>Best regards,<br>
                        Medical Registration Team</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            console.log('Confirmation email sent successfully to:', email);

            res.status(201).json({
                success: true,
                message: "Registration submitted successfully. Confirmation email sent.",
                data: result.rows[0]
            });

        } catch (emailError) {
            console.error("Email sending error:", emailError);
            
            // Still return success for database insertion, but mention email issue
            res.status(201).json({
                success: true,
                message: "Registration submitted successfully. However, there was an issue sending the confirmation email. Please contact support.",
                data: result.rows[0],
                emailError: "Failed to send confirmation email"
            });
        }

    } catch (error) {
        console.error("Error inserting medical registration:", error.message);

        // Handle specific database errors
        if (error.code === '23505') { // Unique constraint violation
            if (error.constraint === 'medical_registration_email_key') {
                return res.status(409).json({
                    success: false,
                    message: "This email address is already registered."
                });
            }
            if (error.constraint === 'medical_registration_medical_registration_number_key') {
                return res.status(409).json({
                    success: false,
                    message: "This medical registration number is already registered."
                });
            }
        }

        res.status(500).json({
            success: false,
            message: "Error saving registration details",
            error: error.message,
        });
    }
});

// GET API to retrieve medical registration data
router.get('/medical-registration', async (req, res) => {
    try {
        const query = 'SELECT * FROM medical_registration ORDER BY registration_date DESC';
        const result = await db.query(query);

        res.status(200).json({
            success: true,
            message: "Registration details retrieved successfully",
            data: result.rows,
            count: result.rows.length
        });

    } catch (error) {
        console.error("Error retrieving registration details:", error.message);

        res.status(500).json({
            success: false,
            message: "Error retrieving registration details",
            error: error.message,
        });
    }
});

// GET API to retrieve single registration by ID
router.get('/medical-registration/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM medical_registration WHERE id = $1';
        const result = await db.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Registration not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Registration details retrieved successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.error("Error retrieving registration details:", error.message);

        res.status(500).json({
            success: false,
            message: "Error retrieving registration details",
            error: error.message,
        });
    }
});

module.exports = router;