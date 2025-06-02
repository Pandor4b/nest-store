import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { PrismaService } from '../database/PrismaService';

describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [CartService, PrismaService],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should add a product to the cart', async () => {
    const addToCartDTO = { productId: '123', quantity: 2 };
    const mockResponse = {
      id: '1',
      productId: '123',
      quantity: 2,
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

    jest.spyOn(controller, 'addToCart').mockResolvedValue(mockResponse);

    const result = await controller.addToCart(addToCartDTO);
    expect(result).toEqual(mockResponse);
  });

  it('should list all cart items', async () => {
    const mockResponse = [
      {
        id: '1',
        productId: '123',
        quantity: 2,
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
        quantity: 1,
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

    jest.spyOn(controller, 'getCart').mockResolvedValue(mockResponse);

    const result = await controller.getCart();
    expect(result).toEqual(mockResponse);
  });

  it('should remove a product from the cart', async () => {
    const cartItemId = '1';
    const mockResponse = {
      id: cartItemId,
      productId: '123',
      quantity: 2,
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

    jest.spyOn(controller, 'removeItem').mockResolvedValue(mockResponse);

    const result = await controller.removeItem(cartItemId);
    expect(result).toEqual(mockResponse);
  });
});
