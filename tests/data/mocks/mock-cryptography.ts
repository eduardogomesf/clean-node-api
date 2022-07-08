import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'
import { Hasher } from '@/data/protocols/cryptography/hasher'

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
