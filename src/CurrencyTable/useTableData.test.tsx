import {either} from 'fp-ts';
import {identity} from 'fp-ts/lib/function';
import {parseCurrency} from './useTableData';

// jest test method for parseCurrenty method
describe('parseCurrency method', () => {
  it('should parse currency line', () => {
    const line = 'United States|Dollar|1|USD|1.000';
    const currency = parseCurrency(line);
    expect(either.isRight(currency)).toEqual(true);

    expect(either.fold(identity, identity)(currency)).toEqual({
      country: 'United States',
      currency: 'Dollar',
      amount: 1,
      code: 'USD',
      rate: 1,
    });
  });

  it('should fail to parse currency line', () => {
    const line = '';
    const currency = parseCurrency(line);
    expect(either.isLeft(currency)).toEqual(true);
  });
});
