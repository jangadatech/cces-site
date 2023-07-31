export default interface Vehicle {
    _id: string;
    plate: string;
    active: boolean;
    prefix: string;
    vehicle_type: string;
    updated_at: string | null;
    created_at: string;
  }