import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error, Model } from 'mongoose';
import { InvalidArgumentError, NotFoundError, UnknownError } from 'src/errors';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module, ModuleDocument } from './entities/module.schema';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(Module.name) private moduleModel: Model<ModuleDocument>,
  ) {}

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    try {
      const createModule = new this.moduleModel(createModuleDto);
      return await createModule.save();
    } catch (error) {
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async findAll(): Promise<Module[]> {
    try {
      return await this.moduleModel.find().exec();
    } catch (error) {
      throw new UnknownError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.moduleModel.findById(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Module with id ${id} not found`);
      } else if (error instanceof Error.CastError) {
        throw new InvalidArgumentError(`Module id ${id}`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    try {
      return await this.moduleModel
        .findByIdAndUpdate(id, updateModuleDto)
        .exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Module with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.moduleModel.findByIdAndDelete(id).exec();
    } catch (error) {
      if (error instanceof Error.DocumentNotFoundError) {
        throw new NotFoundError(`Module with id ${id} not found`);
      }
      throw new UnknownError(`Unknown error ${error}`);
    }
  }
}
