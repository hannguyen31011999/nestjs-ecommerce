import { User } from 'src/database/schemas/user.schema';

export interface IPayloadAuth {
  data: User;
  access_token: string;
  refresh_token: string;
}
