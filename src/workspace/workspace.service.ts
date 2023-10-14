import { Injectable } from "@nestjs/common";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Workspace } from "./schemas/workspace.schema";
import { Model } from "mongoose";

@Injectable()
export class WorkspaceService {
  constructor(@InjectModel(Workspace.name) private workspeaceModel: Model<Workspace>) {
  }

  create(createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspeaceModel.create(createWorkspaceDto);
  }

  findAll() {
    return `This action returns all workspace`;
  }

  findOne(id: string) {
    return `This action returns a #${id} workspace`;
  }

  update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`;
  }

  remove(id: string) {
    return `This action removes a #${id} workspace`;
  }
}
