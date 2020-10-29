import { DateUtil } from '../lib/date-util';

export class ApiUser {
  name: string;
  dob: string;
  city: string;
  email: string;
  phone: string;
  picture: string;

  constructor(apiUser: any = null, dateUtil: DateUtil) {
    if (apiUser) {
      this.name = apiUser.name ?
        `${apiUser.name.title || ''} ${apiUser.name.first || ''} ${apiUser.name.last || ''}` : '';
      this.dob = apiUser.dob ?
        dateUtil.formatDate(apiUser.dob.date, 'YYYY-MM-DD') : '';
      this.city = apiUser.location ? apiUser.location.city : '';
      this.email = apiUser.email;
      this.phone = apiUser.phone;
      this.picture = apiUser.picture ? apiUser.picture.large : '';
    }
  }
}
