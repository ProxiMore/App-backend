import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Swagger Doc
    const config = new DocumentBuilder()
        .setTitle('ProxiMore')
        .setDescription('API pour l\'application ProxiMore')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    // Other settings
    app.setGlobalPrefix('api');
    app.enableCors();

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
