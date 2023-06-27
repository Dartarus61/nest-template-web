import { Module } from '@nestjs/common';
import { SendfilesController } from './sendfiles.controller';

@Module({
  controllers: [SendfilesController]
})
export class SendfilesModule {}
