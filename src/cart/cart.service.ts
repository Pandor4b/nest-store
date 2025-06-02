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

    async finalizePurchase() {
        const cartItems = await this.prisma.cartItem.findMany({
            include: 
            {
                product: true,
            },
        });

        if (cartItems.length === 0) {
            throw new BadRequestException('Carrinho vazio.');
        }

        const total = cartItems.reduce((sum, item) => {
            return sum + (item.product.price * item.quantity);
        }, 0);

        const purchase = await this.prisma.purchase.create({
            data: {
                total,
                items: {
                    create: cartItems.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    }))
                }
            }
        });

        for (const item of cartItems) {
            await this.prisma.product.update({
                data: {
                    quantity: {
                        decrement: item.quantity
                    }
                },
                where: {
                    id: item.productId,
                },
            })
        }

        await this.prisma.cartItem.deleteMany();

        return purchase;
    }

    async getPurchaseHistory() {
        return this.prisma.purchase.findMany({
            include: { 
                items: true 
            },
            orderBy: { 
                createdAt: 'desc' 
            },
        });
    }

}
