import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
  @Prop()
  readonly name: string;
  @Prop()
  readonly email: string;
  @Prop()
  readonly password: string;
  @Prop()
  readonly shortBio: string;
}

export const UserSchema = SchemaFactory.createForClass(User);