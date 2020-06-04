import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHasProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 0);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
