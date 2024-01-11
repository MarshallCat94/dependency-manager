export class DependencyManager {
  private static instances: Record<string, DependencyManager> = {};
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

  protected getKey(identifier: InjectionToken): string {
    return identifier instanceof Function
      ? identifier.name
      : identifier;
  }

  declare(identifier: InjectionToken, value: any) {
    const key = this.getKey(identifier);

    if (key in this.storage) {
      throw new Error(`Dependency "${key}" already declared.`);
    }

    this.storage[key] = value;
  }

  unset(identifier: InjectionToken) {
    const key = this.getKey(identifier);

    if (!(key in this.storage)) {
      throw new ReferenceError(`Dependency "${key}" not found.`);
    }

    delete this.storage[key];
  }

  wire<T = any>(identifier: InjectionToken): T {
    const key = this.getKey(identifier);
    const value = this.storage[key];

    if (!(key in this.storage) || null == value) {
      throw new ReferenceError(`Dependency "${key}" not found.`);
    }

    return this.storage[key];
  }
}
