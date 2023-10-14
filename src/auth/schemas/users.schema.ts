import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Workspace } from "../../workspace/schemas/workspace.schema";

@Schema({
  timestamps: true,
  versionKey: false
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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workspace" }] })
  readonly workspace: Workspace[];
}

export const UserSchema = SchemaFactory.createForClass(User);