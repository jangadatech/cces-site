export default function createDataUtil(
    driver: string,
    prefix: string,
    odometer: number,
    register_at: string | null,
    status: string,
    description: string | null,
    odometerBefore: number | null,
    travelled_distance: number | null, //current_odometer - prev_odometer
    liter_consumed: number | null,
    destiny: string
  ) {
    return {
      driver,
      prefix,
      odometer,
      register_at,
      status,
      description,
      details: [
        {
          description: description,
          destiny: destiny,
          travelled_distance: null,
          odometer_before: null,
          liter_consumed: null,
        },
      ],
    };
  }