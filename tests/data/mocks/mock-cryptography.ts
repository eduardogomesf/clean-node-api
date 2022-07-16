import { Decrypter, HashComparer, Encrypter, Hasher } from '@/data/protocols'

export class HasherSpy implements Hasher {
  async hash (value: string): Promise<string> {
    return Promise.resolve('hashed_value')
  }
}

export class DecrypterSpy implements Decrypter {
  decrypt (value: string): Promise<string> {
    return Promise.resolve('any_value')
  }
}

export class EncrypterSpy implements Encrypter {
  async encrypt (id: string): Promise<string> {
    return Promise.resolve('any_token')
  }
}

export class HashComparerSpy implements HashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    return Promise.resolve(true)
  }
}
