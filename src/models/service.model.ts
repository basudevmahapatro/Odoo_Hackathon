import type { ObjectId } from "mongodb";

export type ServiceStatus = "scheduled" | "in_progress" | "completed";
export type ServiceType = "preventive" | "reactive";

export interface Service {
  _id?: ObjectId;
  vehicleId: ObjectId;
  type: ServiceType;
  description: string;
  cost: number;
  serviceDate: Date;
  status: ServiceStatus;
  createdAt: Date;
  updatedAt?: Date;
}
