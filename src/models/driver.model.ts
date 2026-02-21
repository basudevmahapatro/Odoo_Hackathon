import { ObjectId } from "mongodb";

export type DriverStatus =
  | "On Duty"
  | "On Trip"
  | "Off Duty"
  | "Suspended";

export interface Driver {
  _id?: ObjectId;

  name: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: Date;

  safetyScore: number;

  status: DriverStatus;

  isActive: boolean;

  createdAt: Date;
  updatedAt?: Date;
}