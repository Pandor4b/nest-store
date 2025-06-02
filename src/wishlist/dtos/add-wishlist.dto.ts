import { ApiProperty } from '@nestjs/swagger';

export class AddToWishlistDTO {
  @ApiProperty({ description: 'ID do produto a ser adicionado à lista de desejos' })
  productId: string;
}
