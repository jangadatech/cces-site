import Vehicle from "./Vehicle";
import Driver from "./driver";

export default interface InputOutput {
    _id: string;
    driver: Driver;
    vehicle: Vehicle;
    register_at: string;
    odometer: number;
    description: string;
    destiny: string;
    status: string;
    updated_at: string | null;
    created_at: string;
  }