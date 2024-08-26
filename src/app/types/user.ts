import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly id: number;
  readonly role_id: number | null;
  readonly email: string;
  readonly password: string;
  readonly full_name: string;
  readonly phone_number: string;
  readonly is_active: boolean;
  readonly access_token: string | null;
  readonly birth_date: string | null;
  readonly avatar: string | null;
  readonly address: string | null;
  readonly gender: number;
}
