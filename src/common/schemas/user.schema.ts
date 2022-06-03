import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, default: 'CUSTOMER' })
  role: String;
}

/**
 *   id           String        @id @default(auto()) @map("_id") @db.ObjectId
  email        String        @unique
  username     String?
  password     String
  role         Role          @default(CUSTOMER)
  wallet       Wallet[]
  merchant     Merchant?
  admin        Admin?
  customer     Customer?
  carts        Cart[]
  orders       Order[]
  inboxs       Inbox[]
  transactions Transaction[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
 */

export const UserSchema = SchemaFactory.createForClass(User);
