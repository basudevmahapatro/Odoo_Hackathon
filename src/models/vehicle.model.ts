import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVehicle extends Document {
  vehicleNumber: string;
  plateNumber: string;
  Model: string;
  capacity: number;
  capacityUnit: "kg" | "ton";
  odometer: number;
  status: "Available" | "On Trip" | "In Shop" | "Retired";
  isActive: boolean;
}

const VehicleSchema: Schema<IVehicle> = new Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
    },

    plateNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    Model: {
      type: String,
      required: true,
      trim: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 0,
    },

    capacityUnit: {
      type: String,
      enum: ["kg", "ton"],
      default: "kg",
    },

    odometer: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Available", "On Trip", "In Shop", "Retired"],
      default: "Available",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Vehicle: Model<IVehicle> =
  mongoose.models.Vehicle ||
  mongoose.model<IVehicle>("Vehicle", VehicleSchema);

export default Vehicle;