import { IUser } from './user';

export interface IPayloadAuth {
  data: IUser;
  access_token: string;
  refresh_token: string;
}
