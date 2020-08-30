export default interface ICreateUpdateProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  categories_id?: string[];
}
