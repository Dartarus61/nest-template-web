import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('Send file')
@Controller('sendfile')
export class SendfilesController {
  @Get('/:fileName')
  getPicture(@Param('fileName') fileName: string, @Res() res: Response) {
    return res.sendFile(path.resolve(__dirname, '../upload', fileName));
  }
}
