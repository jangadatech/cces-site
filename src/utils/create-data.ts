export default function createDataUtil(
    driver: string,
    prefix: number,
    odometer: number,
    inputDate: string | null,
    outputDate: string | null,
    status: string,
    description: string | null,
    odometerBefore: number,
    travelled_distance: number, //current_odometer - prev_odometer
    liter_consumed: number | null,
    destiny: string
  ) {
    return {
      driver,
      prefix,
      odometer,
      inputDate,
      outputDate,
      status,
      description,
      details: [
        {
          description: description,
          destiny: destiny,
          travelled_distance: travelled_distance,
          odometer_before: odometerBefore,
          liter_consumed: liter_consumed,
        },
      ],
    };
  }