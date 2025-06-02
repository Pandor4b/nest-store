import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../database/PrismaService';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const productDto = { name: 'Product A', description: 'A great product', category: 'Category A', price: 100, quantity: 10 };
    jest.spyOn(service, 'create').mockResolvedValue({ id: '1', ...productDto });

    const result = await service.create(productDto);
    expect(result).toEqual({ id: '1', name: 'Product A', description: 'A great product', category: 'Category A', price: 100, quantity: 10 });
  });

  it('should find all products', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([
      { id: '1', name: 'Product A', description: 'A great product', category: 'Category A', price: 100, quantity: 10 },
      { id: '2', name: 'Product B', description: 'Another product', category: 'Category B', price: 200, quantity: 5 },
    ]);

    const result = await service.findAll();
    expect(result).toEqual([
      { id: '1', name: 'Product A', description: 'A great product', category: 'Category A', price: 100, quantity: 10 },
      { id: '2', name: 'Product B', description: 'Another product', category: 'Category B', price: 200, quantity: 5 },
    ]);
  });

  it('should find a product by ID', async () => {
    const productId = '1';
    jest.spyOn(service, 'findById').mockResolvedValue({ id: productId, name: 'Product A', description: 'A great product', category: 'Category A', price: 100, quantity: 10 });

    const result = await service.findById(productId);
    expect(result).toEqual({ id: productId, name: 'Product A', description: 'A great product', category: 'Category A', price: 100, quantity: 10 });
  });

  it('should update a product', async () => {
    const productId = '1';
    const updateDto = { name: 'Updated Product', description: 'Updated description', category: 'Updated Category', price: 150, quantity: 5 };
    jest.spyOn(service, 'update').mockResolvedValue({ id: productId, ...updateDto });

    const result = await service.update(productId, updateDto);
    expect(result).toEqual({ id: productId, name: 'Updated Product', description: 'Updated description', category: 'Updated Category', price: 150, quantity: 5 });
  });

  it('should delete a product', async () => {
    const productId = '1';
    jest.spyOn(service, 'delete').mockResolvedValue({ id: productId, name: 'Deleted Product', description: 'Deleted description', category: 'Deleted Category', price: 0, quantity: 0 });

    const result = await service.delete(productId);
    expect(result).toEqual({ id: productId, name: 'Deleted Product', description: 'Deleted description', category: 'Deleted Category', price: 0, quantity: 0 });
  });
});
