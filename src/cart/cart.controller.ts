import { AddToCartDTO } from './dtos/add-cart.dto';
import { CartService } from './cart.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateCartItemDTO } from './dtos/update-cart.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @ApiOperation({ summary: 'Finalize purchase' })
    @Post('checkout')
    async finalizePurchase() {
        return this.cartService.finalizePurchase();
    }

    @ApiOperation({ summary: 'Add a product to the cart' })
    @Post('add')
    async addToCart(@Body() data: AddToCartDTO) {
        return this.cartService.addToCart(data);
    }

    @ApiOperation({ summary: 'List all cart items' })
    @Get()
    getCart() {
        return this.cartService.getCartItems();
    }

    @ApiOperation({ summary: 'Get purchase history' })
    @Get('history')
    async getPurchaseHistory() {
        return this.cartService.getPurchaseHistory();
    }

    @ApiOperation({ summary: 'Update cart item quantity' })
    @Put(':id')
    updateItem(@Param('id') id: string, @Body() data: UpdateCartItemDTO) {
        return this.cartService.updateQuantity(id, data.quantity);
    }

    @ApiOperation({ summary: 'Clear the cart' })
    @Delete('clear')
    clearCart() {
        return this.cartService.clearCart();
    }

    @ApiOperation({ summary: 'Remove a product from the cart' })
    @Delete(':id')
    removeItem(@Param('id') id: string) {
        return this.cartService.removeItem(id);
    }
}
