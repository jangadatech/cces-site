import IVehicleType from "./IVehicleType";

export const enum StatusVehicle {
  INPUT = 'input',
  OUTPUT = 'output',
}

export default interface IVehicle {
  _id?: string;
  plate: string;
  active: boolean | null;
  prefix: string;
  vehicle_type_id: string;
  vehicle_type?: IVehicleType | null;
  status?: StatusVehicle;
  updated_at?: string | null;
  created_at?: string;
}