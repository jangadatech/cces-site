import IDriver from "./IDriver";
import IVehicle from "./IVehicle";

export default interface IInputOutput {
    _id: string;
    driver: IDriver;
    vehicle: IVehicle;
    register_at: string;
    odometer: number;
    description: string | null;
    destiny: string;
    status: string;
    updated_at: string | null;
    created_at: string;
  }