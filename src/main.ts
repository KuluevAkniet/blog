import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform: true,
  }));

  const config = new DocumentBuilder()
  .setTitle('BLog')
  .setDescription('The BLOGS API description')
  .setVersion('1.0')
  .addTag('Blogs')
  .addBearerAuth(undefined, 'defaultBearerAuth')
  .build();



  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'defaultBearerAuth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: 'thisIsASampleBearerAuthToken123',
        },
      },
    },
  };

  const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, options);
}
bootstrap();
