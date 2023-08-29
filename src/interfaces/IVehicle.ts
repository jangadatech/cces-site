import IVehicleType from "./IVehicleType";

export default interface IVehicle {
  _id?: string;
  plate: string;
  active: boolean | null;
  prefix: string;
  vehicle_type_id: string;
  vehicle_type?: IVehicleType | null;
  updated_at?: string | null;
  created_at?: string;
}