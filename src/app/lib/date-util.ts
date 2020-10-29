import * as moment from 'moment-timezone';

export class DateUtil {
  formatDate(date, format): string {
    return moment.tz(date, Intl.DateTimeFormat().resolvedOptions().timeZone).format(format);
  }
}
