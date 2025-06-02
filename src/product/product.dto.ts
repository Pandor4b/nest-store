import { IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}
