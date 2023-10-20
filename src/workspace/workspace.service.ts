import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Workspace } from "./schemas/workspace.schema";
import mongoose, { Model } from "mongoose";
import * as process from "process";

@Injectable()
export class WorkspaceService {
  constructor(@InjectModel(Workspace.name) private workspeaceModel: Model<Workspace>) {
  }

  async create(createWorkspaceDto: CreateWorkspaceDto, userId: string) {
    const project = await this.workspeaceModel.find({ author: userId });
    if (project.length >= +process.env.MAX_PROJECT_LENGTH) {
      throw new BadRequestException("you have rich out max project creation");
    }
    return this.workspeaceModel.create({
      ...createWorkspaceDto,
      author: userId
    });
  }

  findAll(userId: string) {
    return this.workspeaceModel.find({ author: userId });
  }

  findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException("Enter a valid mongodb id");
    }
    return this.workspeaceModel.findOne({ _id: id });
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException("Workspace not found");
    }
    return this.workspeaceModel.findByIdAndUpdate(id, updateWorkspaceDto);
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException("Workspace not found");
    }
    return this.workspeaceModel.findByIdAndDelete(id);
  }
}
