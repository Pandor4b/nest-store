import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { AddToWishlistDTO } from './dtos/add-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async add(data: AddToWishlistDTO) {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const exists = await this.prisma.wishlistItem.findFirst({
      where: { productId: data.productId },
      include: { product: true },
    });

    if (exists) return exists;

    return this.prisma.wishlistItem.create({
      data: {
        productId: data.productId,
      },
      include: { product: true },
    });
  }

  async findAll() {
    return this.prisma.wishlistItem.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(wishlistItemId: string) {
    const exists = await this.prisma.wishlistItem.findUnique({
      where: { id: wishlistItemId },
      include: { product: true },
    });

    if (!exists) {
      throw new NotFoundException('Item não encontrado');
    }

    return this.prisma.wishlistItem.delete({
      where: { id: wishlistItemId },
      include: { product: true },
    });
  }
}
