import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "../../auth/schemas/users.schema";

@Schema({
  timestamps: true,
  versionKey: false
})
export class Workspace extends Document {
  @Prop()
  readonly title: string;

  @Prop()
  readonly description: string;

  @Prop()
  readonly author: string;
}


export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);