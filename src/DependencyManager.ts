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

  declare(reference: string, value: any) {
    if (reference in this.storage) {
      throw new Error(`Dependency "${reference}" already declared.`);
    }

    this.storage[reference] = value;
  }

  unset(reference: string) {
    if (!(reference in this.storage)) {
      throw new ReferenceError(`Dependency "${reference}" not found.`);
    }

    delete this.storage[reference];
  }

  wire<T = any>(reference: string): T {
    const value = this.storage[reference];

    if (null == value) {
      throw new ReferenceError(`Dependency "${reference}" not found.`);
    }

    return value;
  }
}
