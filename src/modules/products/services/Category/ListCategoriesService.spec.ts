import ListCategoriesService from './ListCategoriesService';
import FakeCategoriesRepository from '../../repositories/fakes/FakeCategoriesRepository';

let listCategoriesService: ListCategoriesService;
let fakeCategoriesRepository: FakeCategoriesRepository;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategoriesService = new ListCategoriesService(fakeCategoriesRepository);
  });
  it('should be able to list all Categories', async () => {
    const category1 = await fakeCategoriesRepository.create({
      name: 'category 1',
    });
    const category2 = await fakeCategoriesRepository.create({
      name: 'category 2',
    });
    const category3 = await fakeCategoriesRepository.create({
      name: 'category 3',
    });

    const Categories = await listCategoriesService.execute();

    expect(Categories).toEqual([category1, category2, category3]);
  });
});
