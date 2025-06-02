import { ProductDto } from './dtos/product.dto';
import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('products')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiOperation({ summary: 'Create a new product' })
    @Post("create")
    async create(@Body() data:ProductDto ) {
        return this.productService.create(data);
    }

    @ApiOperation({ summary: 'List all products' })
    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @ApiOperation({ summary: 'Get product details by ID' })
    @Get(":id")
    async findById(@Param("id") id: string) {
        return this.productService.findById(id);
    }
    
    @ApiOperation({ summary: 'Update a product by ID' })
    @Put(":id")
    async update(@Param("id") id: string, @Body() data: ProductDto) {
        return this.productService.update(id, data);
    }
    
    @ApiOperation({ summary: 'Delete a product by ID' })
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.productService.delete(id);
    }
    
}
