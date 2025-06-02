import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) {}

    async create(data: ProductDto) {
        const product = await this.prisma.product.create({
            data
        })

        return product;
    }

    async findAll() {
        return this.prisma.product.findMany();
    }

    async findById(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            throw new NotFoundException('Produto ainda não cadastrado no sistema!');
        }

        return product;
 
    }

    async update(id: string, data: ProductDto) {
        await this.findById(id);

        return this.prisma.product.update({
            data,
            where: {
                id,
            }
        });
    }

    async delete(id: string){
        await this.findById

        return await this.prisma.product.delete({
            where: {
                id,
            }
        });
    }

}
