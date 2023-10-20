import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, taskSchema } from "./schemas/task.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: taskSchema }])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {
}
