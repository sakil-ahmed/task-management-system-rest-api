import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Status {
  TODO = "todo",
  PENDING = "pending",
  COMPLETE = "complete",


}

@Schema({
  timestamps: true,
  versionKey: false
})
export class Task extends Document {
  @Prop()
  readonly title: string;
  @Prop()
  readonly description: string;

  @Prop({ enum: Object.values(Status), default: Status.TODO })
  readonly status: string;
  @Prop()
  readonly createdBy: string;

  @Prop()
  readonly workspace: string;
}

export const taskSchema = SchemaFactory.createForClass(Task);