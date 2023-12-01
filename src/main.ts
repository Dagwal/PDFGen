import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  
  app.listen(port, () => {
    console.log(`The sample PDF app is running on port ${port}.`);
});
}
bootstrap();
