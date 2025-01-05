import { Dictionary } from '../../src';
import { Forger } from '@artstesh/forger';
import { should } from '@artstesh/it-should';

describe('Dictionary', () => {
  let dictionary: Dictionary<string>;

  beforeEach(() => {
    dictionary = new Dictionary<string>();
  })

  describe('size', () => {
    it('zero size if empty', () => {
      //
      should().number(dictionary.size).equals(0);
    });

    it('size success', () => {
      const key = Forger.create<string>()!;
      const value = Forger.create<string>()!;
      dictionary.put(key, value);
      //
      should().number(dictionary.size).equals(1);
    });
  })

  describe('keys', () => {
    it('zero size if empty', () => {
      //
      should().number(dictionary.keys.length).equals(0);
    });

    it('content is correct', () => {
      const keys = Forger.create<string[]>()!;
      keys.forEach(k => dictionary.put(k, k));
      //
      should().array(dictionary.keys).equal(keys);
    });
  });

  describe('create', () => {
    it('content is correct', () => {
      const size = Forger.create<number>({numberMin: 3, numberMax: 10})!;
      const donor: Record<string, string> = {};
      Array.from({length: size}, (v, i) => {
        donor[Forger.create<string>()!] =  Forger.create<string>()!;
      });
      //
      const clone = Dictionary.create(donor);
      //
      clone.keys.forEach(k => should().string(clone.take(k)).equals(donor[k]));
      should().number(clone.size).equals(Object.keys(donor).length);
    });
  })

  describe('clone', () => {
    it('content is correct', () => {
      const size = Forger.create<number>({numberMin: 3, numberMax: 10})!;
      Array.from({length: size}, (v, i) => {
        dictionary.put(Forger.create<string>()!, Forger.create<string>()!);
      });
      //
      const clone = Dictionary.clone(dictionary);
      //
      clone.keys.forEach(k => should().string(clone.take(k)).equals(dictionary.take(k)));
      should().number(clone.size).equals(dictionary.size);
    });
  })

  describe('find', () => {

    it('success', () => {
      const key = Forger.create<string>()!;
      const value = Forger.create<string>()!;
      dictionary.put(key, value);
      //
      should().string(dictionary.find(e => e === value)).equals(value);
    });

    it('not found - null', () => {
      const key = Forger.create<string>()!;
      const value = Forger.create<string>()!;
      dictionary.put(key, value);
      //
      should().true(dictionary.find(e => e === Forger.create<string>()!) == null);
    });
  })

  describe('has', () => {

    it('success', () => {
      const key = Forger.create<string>()!;
      const value = Forger.create<string>()!;
      dictionary.put(key, value);
      //
      should().true(dictionary.has(key));
    });

    it('not found - null', () => {
      const key = Forger.create<string>()!;
      const value = Forger.create<string>()!;
      dictionary.put(key, value);
      //
      should().false(dictionary.has(Forger.create<string>()!));
    });
  })

  describe('addOrUpdate', () => {
    let dict: Dictionary<number[]>;

    beforeEach(() => {
      dict = new Dictionary<number[]>();
    })

    it('success', () => {
      const key = Forger.create<string>()!;
      const value = Forger.create<number>()!;
      const initial = Forger.create<number[]>()!;
      const expected = initial.length + 1;
      dict.put(key, initial);
      //
      dict.addOrUpdate(key, v => v?.push(value) && v || [value]);
      //
      should().array(dict.take(key)).length(expected);
    });

    it('not found - success', () => {
      const key = Forger.create<string>()!;
      const value = Forger.create<number>()!;
      //
      dict.addOrUpdate(key, v => v?.push(value) && v || [value]);
      //
      should().array(dict.take(key)).length(1);
    });
  })
})
