import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdAt: -1 });
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
