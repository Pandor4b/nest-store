import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from 'src/database/PrismaService';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CartController],
  providers: [CartService, PrismaService]
})
export class CartModule {}
