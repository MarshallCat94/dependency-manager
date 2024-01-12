import { InjectionToken } from './types';
import { KeyManagement } from './KeyManagement';

export class DependencyManager {
  private static instances: Record<string, DependencyManager> = {};
  protected readonly keys: KeyManagement = new KeyManagement();
  protected readonly storage: Record<string, any> = {};

  protected constructor() {}

  static getInstance(
    name: string = 'default',
  ): DependencyManager {
    if (null == this.instances[name]) {
      this.instances[name] = new this();
    }

    return this.instances[name];
  }

  declare(reference: InjectionToken, value: any) {
    const { hash, name } = this.keys.get(reference);

    if (hash in this.storage) {
      throw new Error(`Dependency "${name}" already declared.`);
    }

    this.storage[hash] = value;
  }

  unset(reference: InjectionToken) {
    const { hash, name } = this.keys.get(reference);

    if (!(hash in this.storage)) {
      throw new ReferenceError(`Dependency "${name}" not found.`);
    }

    delete this.storage[hash];
  }

  wire<T = any>(reference: InjectionToken): T {
    const { hash, name } = this.keys.get(reference);
    const value = this.storage[hash];

    if (null == value) {
      throw new ReferenceError(`Dependency "${name}" not found.`);
    }

    return this.storage[hash];
  }
}
