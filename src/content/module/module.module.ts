import {
  Module as PolycodeModule,
  ModuleSchema,
} from './entities/module.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PolycodeModule.name, schema: ModuleSchema },
    ]),
  ],
  controllers: [ModuleController],
  providers: [ModuleService],
})
export class ModuleModule {}
