import fs from 'node:fs';

export class Package {
  public readonly name!: string;
  public readonly author!: string;
  public readonly version!: string;

  protected constructor(properties: Record<string, any>) {
    Object.assign(this, properties);
  }

  protected static determineSeparator(path: string): string {
    const separators = ['\\', '/'];

    for (const char of path) {
      const index = separators.indexOf(char);
      if (index >= 0) return separators.at(index)!;
    }

    throw new Error('Separator not found.');
  }

  protected static *getModulePaths(): Generator<Array<string>, void> {
    for (const path of module.paths) {
      const separator = this.determineSeparator(path);
      const folders = path.split(separator);
      yield folders.slice(0, folders.length - 1);
    }
  }

  static getNearest(): Package {
    for (const path of this.getModulePaths()) {
      const filename = path.join('/') + '/package.json';

      try {
        const content = fs.readFileSync(filename);
        return new this(JSON.parse(content.toString()));
      } catch (e) {
        continue;
      }
    }

    throw new Error('Package not found.');
  }
}
