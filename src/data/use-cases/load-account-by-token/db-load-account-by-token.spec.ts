import { Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

describe('DbLoadAccountByToken UseCase', () => {
  it('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      decrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('any_value'))
      }
    }
    const decrypterStub = new DecrypterStub()
    const sut = new DbLoadAccountByToken(decrypterStub)
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
