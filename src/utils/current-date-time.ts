import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const getCurrentDateTime = () => {
    const date = new Date();
    const timeZone = 'America/Sao_Paulo';
    const zonedDate = utcToZonedTime(date, timeZone);
    return format(zonedDate, 'yyyy-MM-dd\'T\'HH:mm');
  };

export default getCurrentDateTime