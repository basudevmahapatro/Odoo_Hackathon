import { ObjectId } from "mongodb";

export type TripStatus =
  | "Draft"
  | "Dispatched"
  | "On Trip"
  | "Completed"
  | "Cancelled";

export interface Trip {
  _id?: ObjectId;

  vehicleId: ObjectId;   
  driverId: ObjectId;   

  cargoWeight: number;
  origin: string;
  destination: string;

  estimatedFuelCost: number;

  status: TripStatus;

  createdAt: Date;
  updatedAt?: Date;
}