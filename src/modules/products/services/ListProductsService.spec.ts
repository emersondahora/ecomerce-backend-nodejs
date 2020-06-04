import ListProductsService from './ListProductsService';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';

let listProductsService: ListProductsService;
let fakeProductsRepository: FakeProductsRepository;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProductsService = new ListProductsService(fakeProductsRepository);
  });
  it('should be able to list all products', async () => {
    const product1 = await fakeProductsRepository.create({
      name: 'product 1',
      description: 'description',
      price: 250,
    });
    const product2 = await fakeProductsRepository.create({
      name: 'product 2',
      description: 'description',
      price: 250,
    });
    const product3 = await fakeProductsRepository.create({
      name: 'product 3',
      description: 'description',
      price: 250,
    });

    const products = await listProductsService.execute();

    expect(products).toEqual([product1, product2, product3]);
  });
});
