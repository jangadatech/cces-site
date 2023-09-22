export default function createDataUtil(
    id: string,
    driver: string,
    prefix: string,
    odometer: number,
    register_at: string | null,
    status: string,
    description: string | null,
    odometerBefore: number | null,
    travelled_distance: number | null, //current_odometer - prev_odometer
    liter_consumed: number | null,
    destination: string
  ) {
    return {
      id,
      driver,
      prefix,
      odometer,
      register_at,
      status,
      description,
      details: [
        {
          description: description,
          destination: destination,
          travelled_distance: null,
          odometer_before: null,
          liter_consumed: null,
        },
      ],
    };
  }