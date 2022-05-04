import { Module } from '@nestjs/common';
import { ForkStrategyService } from './fork-strategy.service';

@Module({
  providers: [ForkStrategyService],
  exports: [ForkStrategyService],
})
export class ForkStrategyModule {}
