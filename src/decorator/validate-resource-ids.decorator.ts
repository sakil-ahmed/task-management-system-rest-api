import {Param} from "@nestjs/common";
import {ParseMongoID} from "../pipes/mongoId";

export const ResourceId = (name = 'id') => Param(name, ParseMongoID);