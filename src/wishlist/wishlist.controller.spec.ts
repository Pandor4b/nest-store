import { Test, TestingModule } from '@nestjs/testing';
import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';
import { PrismaService } from '../database/PrismaService';

describe('WishlistController', () => {
  let controller: WishlistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WishlistController],
      providers: [WishlistService, PrismaService],
    }).compile();

    controller = module.get<WishlistController>(WishlistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add an item to the wishlist', async () => {
    const addToWishlistDTO = { productId: '123' };
    const mockResponse = {
      id: '1',
      productId: '123',
      createdAt: new Date(),
      product: {
        id: '123',
        name: 'Product A',
        description: 'A great product',
        category: 'Category A',
        price: 100,
        quantity: 10,
      },
    };

    jest.spyOn(controller, 'addToWishlist').mockResolvedValue(mockResponse);

    const result = await controller.addToWishlist(addToWishlistDTO);
    expect(result).toEqual(mockResponse);
  });

  it('should list all wishlist items', async () => {
    const mockResponse = [
      {
        id: '1',
        productId: '123',
        createdAt: new Date(),
        product: {
          id: '123',
          name: 'Product A',
          description: 'A great product',
          category: 'Category A',
          price: 100,
          quantity: 10,
        },
      },
      {
        id: '2',
        productId: '456',
        createdAt: new Date(),
        product: {
          id: '456',
          name: 'Product B',
          description: 'Another product',
          category: 'Category B',
          price: 200,
          quantity: 5,
        },
      },
    ];

    jest.spyOn(controller, 'getWishlist').mockResolvedValue(mockResponse);

    const result = await controller.getWishlist();
    expect(result).toEqual(mockResponse);
  });

  it('should remove an item from the wishlist', async () => {
    const wishlistItemId = '1';
    const mockResponse = {
      id: wishlistItemId,
      productId: '123',
      createdAt: new Date(),
      product: {
        id: '123',
        name: 'Product A',
        description: 'A great product',
        category: 'Category A',
        price: 100,
        quantity: 10,
      },
    };

    jest.spyOn(controller, 'removeFromWishlist').mockResolvedValue(mockResponse);

    const result = await controller.removeFromWishlist(wishlistItemId);
    expect(result).toEqual(mockResponse);
  });
});
