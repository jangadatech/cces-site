import { Status } from "@/enum/Status";
import IVehicleType from "./IVehicleType";

export default interface IVehicle {
  _id?: string;
  plate: string;
  active: boolean | null;
  prefix: string;
  vehicle_type_id?: string;
  vehicle_type?: IVehicleType | null;
  status?: Status;
  updated_at?: string | null;
  created_at?: string;
}