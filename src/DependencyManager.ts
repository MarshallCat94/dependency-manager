import { KeyManagement } from "./KeyManagement";
import { InjectionToken } from "./types";

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

  declare(token: InjectionToken, value: any) {
    const { name, hash } = this.keys.get(token);

    if (hash in this.storage) {
      throw new Error(`Dependency "${name}" already declared.`);
    }

    this.storage[hash] = value;
  }

  unset(token: InjectionToken) {
    const { name, hash } = this.keys.get(token);

    if (!(hash in this.storage)) {
      throw new ReferenceError(`Dependency "${name}" not found.`);
    }

    delete this.storage[hash];
  }

  wire<T = any>(token: InjectionToken): T {
    const { name, hash } = this.keys.get(token);
    const value = this.storage[hash];

    if (null == value) {
      throw new ReferenceError(`Dependency "${name}" not found.`);
    }

    return value;
  }
}
