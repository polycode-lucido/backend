import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allow } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Module } from 'src/content/module/entities/module.schema';
import { ContentCompletionParent } from 'src/user-completion/schemas/content-completion-parent.schema';
import { ContentType } from 'src/user-completion/schemas/content-completion.schema';

export type ModuleCompletionDocument = ModuleCompletion & Document;

@Schema()
export class ModuleCompletion extends ContentCompletionParent {
  type = ContentType.MODULE;

  @Allow()
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Module' })
  module: Module;
}

export const ModuleCompletionSchema =
  SchemaFactory.createForClass(ModuleCompletion);
