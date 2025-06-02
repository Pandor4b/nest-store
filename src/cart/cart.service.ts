import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { AddToCartDTO } from './dtos/add-cart.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}


    async addToCart(data: AddToCartDTO) {
        const { productId, quantity = 1 } = data;

        const product = await this.prisma.product.findUnique({ where: { id: productId } });

        if (!product) {
            throw new NotFoundException('Produto não encontrado');
        }

        if (product.quantity < quantity) {
            throw new BadRequestException('Quantidade em estoque insuficiente');
        }

        const existingItem = await this.prisma.cartItem.findFirst({
            where: { 
                productId,
            },
        });

        if (existingItem) {
            return this.prisma.cartItem.update({
                where: { 
                    id: existingItem.id 
                },
                data: { 
                    quantity: existingItem.quantity + quantity
                },
            });
        }

        return this.prisma.cartItem.create({
            data: {
                productId,
                quantity
            }
        });
        }


    async getCartItems() {
        return this.prisma.cartItem.findMany({
            include: { 
                product: true 
            },
        });
    }

    async updateQuantity(cartItemId: string, newQuantity: number) {
        const cartItem = await this.prisma.cartItem.findUnique({
            where: {
                id: cartItemId,
            },
            include: {
                product: true,
            },
        });

        if (!cartItem) {
            throw new NotFoundException('Item do carrinho não encontrado.');
        }

        if (cartItem.product.quantity < newQuantity) {
            throw new BadRequestException('Quantidade maior do que o estoque disponível.')
        }

        return this.prisma.cartItem.update({
            data: {
                quantity: newQuantity,
            },
            where: {
                id: cartItemId,
            },

        });
    }   

    async removeItem(cartItemId: string) {
        const itemExists = await this.prisma.cartItem.findUnique({
            where: {
                id: cartItemId,
            },
        });

        if (!itemExists) {
            throw new NotFoundException('Item não encontrado.');
        }

        return this.prisma.cartItem.delete({
            where: {
                id: cartItemId,
            },
        });
    }

    async clearCart() {
        return this.prisma.cartItem.deleteMany();
    }
}
