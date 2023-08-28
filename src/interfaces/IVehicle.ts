export default interface IVehicle {
    _id?: string;
    plate: string;
    active: boolean | null;
    prefix: string;
    vehicle_type: string;
    updated_at?: string | null;
    created_at?: string;
  }