import { HttpException, HttpStatus } from '@nestjs/common';
import { MAX_UPLOAD_SIZE } from '../constant';

export function checkSize(file: Express.Multer.File[]) {
  for (let i = 0; i < file.length; i++) {
    const in_mb = file[i].size / 1000000;

    if (in_mb <= MAX_UPLOAD_SIZE) {
      continue;
    } else {
      throw new HttpException(
        `File uploaded is too big. Max size is (${MAX_UPLOAD_SIZE} MB)`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}

export function checkExtension(file: Express.Multer.File[]) {
  for (let i = 0; i < file.length; i++) {
    switch (file[i].mimetype) {
      case 'image/jpeg':
        continue;
      case 'image/png':
        continue;
      case 'image/jpg':
        continue;
      case 'application/pdf':
        continue;
      case 'application/msword':
        continue;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        continue;
      default:
        throw new HttpException(
          'Wrong extension',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
  }
}
