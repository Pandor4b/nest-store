import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ProductModule, CartModule],
  controllers: [CartController],
  providers: [CartService],
})
export class AppModule {}
