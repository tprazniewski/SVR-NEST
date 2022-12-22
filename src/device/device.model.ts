import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema()
export class Device {
  @Prop({ required: true, unique: true })
  name: string;
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  files: string[];
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
