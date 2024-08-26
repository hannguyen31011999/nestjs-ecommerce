import {
  BadRequestException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = validationErrors.reduce((acc, error) => {
          acc[error.property] = Object.values(error.constraints)[0];
          return acc;
        }, {});
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          errors,
        });
      },
    }),
  );
  // app.useGlobalFilters(new ValidationExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Swagger E-commerce')
    .setDescription('E-commerce api description')
    .setVersion('1.0')
    .addTag('E-commerce')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/swagger', app, document);

  await app.listen(3000);
}
bootstrap();
