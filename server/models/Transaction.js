import mongoose from "mongoose";
import { loadType } from "mongoose-currency";
loadType(mongoose);

const TransactionSchema = new mongoose.Schema(
  {
    buyer: { type: String, required: true },
    amount: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId, // one for many
        ref: "Product",
      },
    ],
  },
  { toJSON: { getters: true }, timestamps: true }
);

export default mongoose.model(
  "Transaction",
  TransactionSchema
);
