import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop()
  fullname: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
}

/**
 * id       String @id @default(auto()) @map("_id") @db.ObjectId
  fullname String
  user     User   @relation(fields: [userId], references: [id])
  userId   String @unique @db.ObjectId
 */
export const AdminSchema = SchemaFactory.createForClass(Admin);
