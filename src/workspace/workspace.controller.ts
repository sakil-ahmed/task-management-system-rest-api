import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { WorkspaceService } from "./workspace.service";
import { CreateWorkspaceDto } from "./dto/create-workspace.dto";
import { UpdateWorkspaceDto } from "./dto/update-workspace.dto";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.gurad";
import { UserId } from "../decorator/custom.decorator";
import mongoose from "mongoose";

@Controller("workspace")
@ApiTags("Workspace")
@ApiSecurity("JWT-auth")
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {
  }

  @Post()
  create(@UserId() userId: string, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    return this.workspaceService.create(createWorkspaceDto, userId);
  }

  @Get()

  findAll(@UserId() userId: string) {
    return this.workspaceService.findAll(userId);
  }

  @Get(":id")

  findOne(@Param("id") id: string) {
    return this.workspaceService.findOne(id);
  }

  @Patch(":id")

  update(@Param("id") id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(":id")

  remove(@Param("id") id: string) {
    return this.workspaceService.remove(id);
  }
}
