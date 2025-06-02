import { AddToCartDTO } from './dtos/add-cart.dto';
import { CartService } from './cart.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateCartItemDTO } from './dtos/update-cart.dto';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    async addToCart(@Body() data: AddToCartDTO) {
        return this.cartService.addToCart(data);
    }

    @Get()
    getCart() {
        return this.cartService.getCartItems();
    }

    @Put(':id')
    updateItem(@Param('id') id: string, @Body() data: UpdateCartItemDTO) {
        return this.cartService.updateQuantity(id, data.quantity);
    }

    @Delete('clear')
    clearCart() {
        return this.cartService.clearCart();
    }
    
    @Delete(':id')
    removeItem(@Param('id') id: string) {
        return this.cartService.removeItem(id);
    }



}
