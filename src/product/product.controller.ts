import { ProductDto } from './dtos/product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post("create")
    async create(@Body() data:ProductDto ) {
        return this.productService.create(data);
    }

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Get(":id")
    async findById(@Param("id") id: string) {
        return this.productService.findById(id);
    }
    
    @Put(":id")
    async update(@Param("id") id: string, @Body() data: ProductDto) {
        return this.productService.update(id, data);
    }
    
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.productService.delete(id);
    }
    
}
