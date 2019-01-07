import {
  tsTransform
} from '../tsTrasform';
import {readFile} from './utils'

describe('tsTransform', () => {
  describe('retun appropriate Json', () => {
    const expected = readFile('./src/lib/__tests__/expected/tsexport.json');
    it('returns empty array', () => {
      const result = tsTransform(`${__dirname}/fixtures/tsexport/index`)
      expect(result).toEqual(JSON.parse(expected));
    });
  });
});
