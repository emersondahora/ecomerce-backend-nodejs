import status_type from '../infra/typeorm/types/status';

export default interface ICreateUpdateProductDTO {
  id: string;
  name: string;
  status?: status_type;
}
