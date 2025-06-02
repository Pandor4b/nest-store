import { Test, TestingModule } from '@nestjs/testing';
import { WishlistService } from './wishlist.service';
import { PrismaService } from '../database/PrismaService';
import { NotFoundException } from '@nestjs/common';

describe('WishlistService', () => {
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishlistService, PrismaService],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add an item to the wishlist', async () => {
    const addToWishlistDTO = { productId: '123' };
    jest.spyOn(service, 'add').mockResolvedValue({
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
    });

    const result = await service.add(addToWishlistDTO);
    expect(result).toEqual({
      id: '1',
      productId: '123',
      createdAt: expect.any(Date),
      product: {
        id: '123',
        name: 'Product A',
        description: 'A great product',
        category: 'Category A',
        price: 100,
        quantity: 10,
      },
    });
  });

  it('should find all wishlist items', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([
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
    ]);

    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: '1',
        productId: '123',
        createdAt: expect.any(Date),
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
        createdAt: expect.any(Date),
        product: {
          id: '456',
          name: 'Product B',
          description: 'Another product',
          category: 'Category B',
          price: 200,
          quantity: 5,
        },
      },
    ]);
  });

  it('should return an empty array when the wishlist is empty', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);

    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should remove an item from the wishlist', async () => {
    const wishlistItemId = '1';
    jest.spyOn(service, 'remove').mockResolvedValue({
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
    });

    const result = await service.remove(wishlistItemId);
    expect(result).toEqual({
      id: wishlistItemId,
      productId: '123',
      createdAt: expect.any(Date),
      product: {
        id: '123',
        name: 'Product A',
        description: 'A great product',
        category: 'Category A',
        price: 100,
        quantity: 10,
      },
    });
  });

  it('should throw an error when trying to remove a non-existent item', async () => {
    const invalidWishlistItemId = '999';
    jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException('Item não encontrado'));

    await expect(service.remove(invalidWishlistItemId)).rejects.toThrow(NotFoundException);
  });
});
