const express = require('express');
const router = express.Router();
const db = require('../Models/postgressdb');

// Apply the increased limits
router.use(express.json({ limit: '100mb' }));
router.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Route to save PDF to database with enhanced debugging
router.post('/pdf/save', async (req, res) => {
  try {
    console.log("Received PDF save request");
    console.log("Request body keys:", Object.keys(req.body));
    
    // Check request structure 
    if (!req.body) {
      console.error("Request body is empty");
      return res.status(400).json({
        success: false,
        error: 'Empty request body'
      });
    }
    
    // Log what we received
    console.log("Request contains:", {
      hasPdfBase64: !!req.body.pdfBase64,
      hasUserId: !!req.body.userId,
      hasPolicyNumber: !!req.body.policyNumber,
      hasFileName: !!req.body.fileName
    });
    
    const { pdfBase64, userId, policyNumber, fileName } = req.body;
    
    // Detailed validation
    if (!pdfBase64) {
      console.error("Missing pdfBase64 in request");
      return res.status(400).json({
        success: false,
        error: 'Missing required field: pdfBase64'
      });
    }
    
    if (!userId) {
      console.error("Missing userId in request");
      return res.status(400).json({
        success: false,
        error: 'Missing required field: userId'
      });
    }
    
    // Remove the data URI prefix if present (e.g., "data:application/pdf;base64,")
    const base64Data = pdfBase64.includes(',') ? pdfBase64.split(',')[1] : pdfBase64;
    
    // Log the size of data being processed
    console.log(`Processing PDF upload of size: ${(base64Data.length / (1024 * 1024)).toFixed(2)} MB`);
    
    // Insert into database
    const query = `
      INSERT INTO policy_documents (
        user_id, 
        policy_number, 
        file_name, 
        file_data, 
        created_at
      ) VALUES ($1, $2, $3, $4, NOW())
      RETURNING id
    `;
    
    const values = [userId, policyNumber || null, fileName || 'document.pdf', base64Data];
    
    console.log("Executing database query with values:", {
      userId,
      policyNumber: policyNumber || null,
      fileName: fileName || 'document.pdf',
      base64DataLength: base64Data.length
    });
    
    const result = await db.query(query, values);
    
    console.log("Query executed successfully, document ID:", result.rows[0].id);
    
    return res.status(200).json({
      success: true,
      documentId: result.rows[0].id,
      message: 'PDF saved to database successfully'
    });
  } catch (error) {
    console.error('Error saving PDF to database:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Route to get PDF by policy number
router.get('/pdf/policy/:policyNumber', async (req, res) => {
  try {
    console.log("Received PDF fetch request for policy number:", req.params.policyNumber);
    
    const policyNumber = req.params.policyNumber;
    console.log("policynumber is><<<<<<",policyNumber)
    
    if (!policyNumber) {
      console.error("Missing policy number in request");
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: policy number'
      });
    }
    
    // Query to fetch the PDF by policy number
    const query = `
      SELECT id, user_id, policy_number, file_name, created_at 
      FROM policy_documents 
      WHERE policy_number = $1
      ORDER BY created_at DESC
      LIMIT 1
    `;
    
    const result = await db.query(query, [policyNumber]);
    
    // Check if a document was found
    if (result.rows.length === 0) {
      console.log(`No policy document found with policy number: ${policyNumber}`);
      return res.status(404).json({
        success: false,
        error: 'Policy document not found. Please check the policy number and try again.'
      });
    }
    
    const document = result.rows[0];
    console.log(`Found policy document with ID: ${document.id}`);
    
    // Return the document metadata (not including the file_data to keep the response small)
    return res.status(200).json({
      success: true,
      document: {
        id: document.id,
        userId: document.user_id,
        policyNumber: document.policy_number,
        fileName: document.file_name,
        createdAt: document.created_at
      }
    });
  } catch (error) {
    console.error('Error retrieving PDF from database:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Route to download PDF by document ID
router.get('/pdf/download/:id', async (req, res) => {
  try {
    console.log("Received PDF download request for document ID:", req.params.id);
    
    const documentId = req.params.id;
    
    if (!documentId) {
      console.error("Missing document ID in request");
      return res.status(400).json({
        success: false,
        error: 'Missing required parameter: document ID'
      });
    }
    
    // Query to fetch the PDF data by document ID
    const query = `
      SELECT file_data, file_name
      FROM policy_documents 
      WHERE id = $1
    `;
    
    const result = await db.query(query, [documentId]);
    
    // Check if a document was found
    if (result.rows.length === 0) {
      console.log(`No document found with ID: ${documentId}`);
      return res.status(404).json({
        success: false,
        error: 'Document not found. Please check the document ID and try again.'
      });
    }
    
    const document = result.rows[0];
    console.log(`Sending document with filename: ${document.file_name}`);
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${document.file_name}"`);
    
    // Convert base64 data to Buffer
    const buffer = Buffer.from(document.file_data, 'base64');
    
    // Send the PDF
    res.send(buffer);
    
  } catch (error) {
    console.error('Error downloading PDF from database:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;