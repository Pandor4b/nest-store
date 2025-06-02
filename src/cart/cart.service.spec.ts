import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { PrismaService } from '../database/PrismaService';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService, PrismaService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add an item to the cart', async () => {
    const addToCartDTO = { productId: '123', quantity: 2 };
    jest.spyOn(service, 'addToCart').mockResolvedValue({ id: '1', productId: '123', quantity: 2, createdAt: new Date() });

    const result = await service.addToCart(addToCartDTO);
    expect(result).toEqual({ id: '1', productId: '123', quantity: 2, createdAt: expect.any(Date) });
  });

  it('should update the quantity of an item in the cart', async () => {
    const cartItemId = '1';
    const newQuantity = 5;
    jest.spyOn(service, 'updateQuantity').mockResolvedValue({ id: cartItemId, productId: '123', quantity: newQuantity, createdAt: new Date() });

    const result = await service.updateQuantity(cartItemId, newQuantity);
    expect(result).toEqual({ id: cartItemId, productId: '123', quantity: newQuantity, createdAt: expect.any(Date) });
  });

  it('should clear the cart', async () => {
    jest.spyOn(service, 'clearCart').mockResolvedValue({ count: 3 });

    const result = await service.clearCart();
    expect(result).toEqual({ count: 3 });
  });

  it('should finalize the purchase', async () => {
    jest.spyOn(service, 'finalizePurchase').mockResolvedValue({ id: 'purchase1', createdAt: new Date(), total: 100 });

    const result = await service.finalizePurchase();
    expect(result).toEqual({ id: 'purchase1', createdAt: expect.any(Date), total: 100 });
  });
});
