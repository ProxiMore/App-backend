import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Swagger Doc
    const config = new DocumentBuilder()
        .setTitle('ProxiMore')
        .setDescription('API pour l\'application ProxiMore')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    // const document = SwaggerModule.createDocument(app, config);
    const fileContents = fs.readFileSync('Swagger.yaml', 'utf8');
    const openApiDocument = yaml.load(fileContents);

    SwaggerModule.setup('doc', app, openApiDocument); // document

    // Other settings
    app.setGlobalPrefix('api');
    app.enableCors();

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
