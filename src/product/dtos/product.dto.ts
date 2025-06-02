import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ description: 'Nome do produto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descrição do produto' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Categoria do produto' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'Preço do produto', example: 100 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Quantidade disponível', example: 10 })
  @IsNumber()
  quantity: number;
}
