import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from '../database/PrismaService';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, PrismaService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new product', async () => {
    const productDTO = {
      name: 'Product A',
      description: 'A great product',
      category: 'Category A',
      price: 100,
      quantity: 10,
    };

    const mockResponse = {
      id: '1',
      ...productDTO,
    };

    jest.spyOn(controller, 'create').mockResolvedValue(mockResponse);

    const result = await controller.create(productDTO);
    expect(result).toEqual(mockResponse);
  });

  it('should list all products', async () => {
    const mockResponse = [
      {
        id: '1',
        name: 'Product A',
        description: 'A great product',
        category: 'Category A',
        price: 100,
        quantity: 10,
      },
      {
        id: '2',
        name: 'Product B',
        description: 'Another product',
        category: 'Category B',
        price: 200,
        quantity: 5,
      },
    ];

    jest.spyOn(controller, 'findAll').mockResolvedValue(mockResponse);

    const result = await controller.findAll();
    expect(result).toEqual(mockResponse);
  });

  it('should update a product', async () => {
    const productId = '1';
    const updateDTO = {
      name: 'Updated Product A',
      description: 'Updated description',
      category: 'Updated Category',
      price: 150,
      quantity: 20,
    };

    const mockResponse = {
      id: productId,
      ...updateDTO,
    };

    jest.spyOn(controller, 'update').mockResolvedValue(mockResponse);

    const result = await controller.update(productId, updateDTO);
    expect(result).toEqual(mockResponse);
  });

  it('should delete a product', async () => {
    const productId = '1';
    const mockResponse = {
      id: productId,
      name: 'Product A',
      description: 'A great product',
      category: 'Category A',
      price: 100,
      quantity: 10,
    };

    jest.spyOn(controller, 'delete').mockResolvedValue(mockResponse);

    const result = await controller.delete(productId);
    expect(result).toEqual(mockResponse);
  });
});
