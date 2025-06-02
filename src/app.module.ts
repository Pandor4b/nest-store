import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [ProductModule, CartModule, WishlistModule],
  controllers: [CartController],
  providers: [CartService],
})
export class AppModule {}
