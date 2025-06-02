import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { AddToWishlistDTO } from './dtos/add-wishlist.dto';

@ApiTags('wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @ApiOperation({ summary: 'Add a product to the wishlist' })
  @Post('add')
  async addToWishlist(@Body() data: AddToWishlistDTO) {
    return this.wishlistService.add(data);
  }

  @ApiOperation({ summary: 'List all wishlist items' })
  @Get()
  async getWishlist() {
    return this.wishlistService.findAll();
  }

  @ApiOperation({ summary: 'Remove a product from the wishlist' })
  @Delete(':id')
  async removeFromWishlist(@Param('id') id: string) {
    return this.wishlistService.remove(id);
  }
}
