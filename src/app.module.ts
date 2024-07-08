import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductsController } from './products/products.controller';
import { envs, PRODUCT_SERVICE } from './config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
    { name: PRODUCT_SERVICE,
      transport: Transport.TCP,
      options: {
        host: envs.productMicroserviceHost,
        port: envs.productMicroservicePort
      } },

  ]),]
})
export class AppModule {}
