import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [WishlistController],
  providers: [WishlistService, PrismaService]
})
export class WishlistModule {}
