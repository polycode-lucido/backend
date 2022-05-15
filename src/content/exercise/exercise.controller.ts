import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { HTTPErrorFilter } from 'src/errors';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseService } from './exercise.service';

@UseFilters(HTTPErrorFilter)
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    return await this.exerciseService.create(createExerciseDto);
  }

  @Get()
  async findAll() {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.exerciseService.remove(id);
  }
}
