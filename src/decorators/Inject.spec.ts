import { expect } from 'chai';
import { Inject } from './Inject';

describe('Inject', () => {
  it('returns a PropertyDecorator', () => {
    const decorator = Inject('someIdentifier');
    expect(decorator).to.be.an.instanceOf(Function);
  });
});
