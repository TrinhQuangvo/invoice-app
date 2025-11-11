import { Type } from '@nestjs/common';
import { Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

// Base schema with common fields
export class BaseSchema {
  _id: ObjectId;

  @Virtual({
    get: (doc: BaseSchema) => doc._id.toString(),
  })
  id: string;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;
}

// Override SchemaFactory to include virtuals by default
export const createSchema = <TClass>(target: Type<TClass>) => {
  const schema = SchemaFactory.createForClass(target);
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
  schema.set('timestamps', true);
  schema.set('versionKey', false);
  schema.set('virtuals', true);
  schema.set('toObject', { virtuals: true });
  schema.set('toJSON', { virtuals: true });

  return schema;
};
