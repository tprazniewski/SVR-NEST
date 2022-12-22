import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop([String])
  devices: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
