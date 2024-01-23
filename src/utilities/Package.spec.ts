import { expect } from 'chai';
import { Package } from './Package';

describe('Package', () => {
  describe('getNearest', () => {
    it('returns the nearest package info it finds', () => {
      const pkg = Package.getNearest();
      expect(pkg.name).to.equal('dependency-manager');
    });
  });
});
