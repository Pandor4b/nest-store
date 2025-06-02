import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddToWishlistDTO } from './dtos/add-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('add')
  async addToWishlist(@Body() data: AddToWishlistDTO) {
    return this.wishlistService.add(data);
  }

  @Get()
  async getWishlist() {
    return this.wishlistService.findAll();
  }

  @Delete(':id')
  async removeFromWishlist(@Param('id') id: string) {
    return this.wishlistService.remove(id);
  }
}
