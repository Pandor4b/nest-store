import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Min } from "class-validator";

export class AddToCartDTO{
    @ApiProperty({ description: 'ID do produto a ser adicionado ao carrinho' })
    @IsUUID()
    productId: string;

    @ApiProperty({ description: 'Quantidade do produto a ser adicionada', example: 1 })
    @IsInt()
    @Min(1)
    quantity?: number;
}
