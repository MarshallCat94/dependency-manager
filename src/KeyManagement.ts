import crypto from 'node:crypto';
import { InjectionToken } from "./types";
import { Dependency } from './types';

export class KeyManagement {
  protected hash(string: string): string {
    const hash = crypto.createHash('md5');
    hash.write(string);
    return hash.digest().toString('hex');
  }

  get(token: InjectionToken): Dependency {
    if (token instanceof Function) {
      return {
        name: token.name,
        hash: this.hash(token.toString()),
      };
    } else if (typeof token === 'string') {
      return {
        name: token,
        hash: token,
      };
    } else {
      throw TypeError('Token is not a valid type.');
    }
  }
}
