require("dotenv").config();
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const cors = require('cors'); // You'll need to install this: npm install cors

router.use(cors());
router.use(express.json());


// Log environment variables loading
console.log('Environment variables loaded:', {
  RAZORPAY_KEY_ID_exists: !!process.env.RAZORPAY_KEY_ID,
  RAZORPAY_SECRET_exists: !!process.env.RAZORPAY_SECRET
});

// Initialize Razorpay with proper error handling
let razorpay;
try {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
    console.error('⚠️ ERROR: Razorpay credentials missing in environment variables!');
    // Provide fallback for development (REMOVE IN PRODUCTION)
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_fallback',
      key_secret: process.env.RAZORPAY_SECRET || 'fallback_secret',
    });
  } else {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    console.log('Razorpay initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize Razorpay:', error);
}

// Create order endpoint
router.post('/payment/createorder', async (req, res) => {
  try {
    const { amount, userDetails } = req.body;
    
    // Validation for amount between ₹1 and ₹500,000
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    
    const amountValue = Number(amount);
    
    if (isNaN(amountValue)) {
      return res.status(400).json({ error: 'Invalid amount format' });
    }
    
    if (amountValue < 1) {
      return res.status(400).json({ error: 'Minimum donation amount is ₹1' });
    }
    
    if (amountValue > 500000) {
      return res.status(400).json({ error: 'Maximum donation amount is ₹5,00,000' });
    }

    // FIXED: Convert amount from rupees to paise (multiply by 100)
    const amountInPaise = Math.round(amountValue * 100);
    
    const options = {
      amount: amountInPaise, // Amount in paise (smallest currency unit)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    console.log('Creating order with options:', options);
    
    // Check if Razorpay is properly initialized
    if (!razorpay) {
      throw new Error('Razorpay not initialized properly');
    }
    
    const order = await razorpay.orders.create(options);
    console.log('Order created successfully:', order);
    
    res.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency 
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ 
      error: 'Order creation failed', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Verify payment endpoint
router.post('/api/payment/verify', (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      donorDetails
    } = req.body;
    
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ success: false, message: "Missing required parameters" });
    }

    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpaySignature;

    if (isAuthentic) {
      // ✅ Save payment info to DB here
      // You would typically store donorDetails along with payment information
      console.log('Payment verified successfully. Donor details:', donorDetails);
      
      res.json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Server error during verification",
      details: error.message
    });
  }
});


module.exports = router; // Fixed typo here