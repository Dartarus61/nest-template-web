import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './core/constant';
import { PrismaService } from './utils/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5000',
      'https://dobropremia.geryon.space',
      'http://188.225.87.70:3000',
      'https://премиядобра.рф',
      'https://xn--80abidpxqdjg5n.xn--p1ai',
      'https://xn--80abidpxqdjg5n.xn--p1ai/',
    ],
    credentials: true,
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Mediapark-Goodness-Price')
    .setDescription('The backend Node API description')
    .setVersion('1.0.1')
    .addTag('Dartar')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT);
}
bootstrap();
