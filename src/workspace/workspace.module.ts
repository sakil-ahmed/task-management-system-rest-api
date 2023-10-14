import { Module } from "@nestjs/common";
import { WorkspaceService } from "./workspace.service";
import { WorkspaceController } from "./workspace.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Workspace, WorkspaceSchema } from "./schemas/workspace.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Workspace.name, schema: WorkspaceSchema }])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService]
})
export class WorkspaceModule {
}
