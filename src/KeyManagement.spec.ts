import { expect } from 'chai';
import { KeyManagement } from './KeyManagement';

describe('KeyManagement', () => {
  const getInstance = (): KeyManagement => new KeyManagement();

  describe('get', () => {
    context('provided a reference to a function', () => {
      const add = (a: number, b: number): number => a + b;

      it('computes a hash based on the code of the function', () => {
        const func = add;
        const instance = getInstance();
        const { hash } = instance.get(func);
        expect(func.toString()).to.equal('(a, b) => a + b');
        expect(hash).to.equal('d9b079950d844265d3550c8930f51649');
      });
    });
  });
});
