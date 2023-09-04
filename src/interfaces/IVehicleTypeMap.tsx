import IVehicle from "./IVehicle";

export default interface IVehicleTypeMap {
    [key: string]: { vehicle_type: string; vehicles: IVehicle[] };
  }