export type VehicleStatus =
  | "available"
  | "on_trip"
  | "in_shop"
  | "out_of_service";

export type CapacityUnit = "kg" | "ton";

export interface Vehicle {
  _id: string;
  name: string;
  model: string;
  licensePlate: string;
  type: "truck" | "van" | "bike";
  maxCapacity: number;
  capacityUnit: CapacityUnit;
  odometer: number;
  status: VehicleStatus;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVehicleInput {
  name: string;
  model: string;
  licensePlate: string;
  type: "truck" | "van" | "bike";
  maxCapacity: number;
  capacityUnit?: CapacityUnit;
  odometer: number;
  region: string;
}

export interface VehicleQuery {
  status?: VehicleStatus;
  type?: "truck" | "van" | "bike";
  region?: string;
  minCapacity?: number;
  maxCapacity?: number;
}
