import { makeAddAccountParams, throwError } from '@/tests/domain/mocks'
import { AddAccountRepositorySpy, HasherSpy, LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks'
import { Hasher } from '@/data/protocols/cryptography/hasher'
import { DbAddAccount } from '@/data/use-cases/account/add-account/db-add-account'
import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/use-cases/account/add-account/db-add-account-protocols'
import { AddAccount } from '@/domain/use-cases/account/add-account'

type SutTypes = {
  sut: AddAccount
  hasherSpy: Hasher
  addAccountRepositorySpy: AddAccountRepository
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValue(Promise.resolve(null))
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(hasherSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy)

  return { sut, hasherSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy }
}

describe('DbAddAccount Use case', () => {
  it('Should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const hashSpy = jest.spyOn(hasherSpy, 'hash')
    await sut.add(makeAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()

    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)

    const promise = sut.add(makeAddAccountParams())

    await expect(promise).rejects.toThrow()
  })

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositorySpy, 'add')

    await sut.add(makeAddAccountParams())

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_value'
    })
  })

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()

    jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(makeAddAccountParams())

    await expect(promise).rejects.toThrow()
  })

  it('Should return true on success', async () => {
    const { sut } = makeSut()

    const isValid = await sut.add(makeAddAccountParams())

    expect(isValid).toBe(true)
  })

  it('Should return false if AddAccountRepository returns false', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()

    jest.spyOn(addAccountRepositorySpy, 'add').mockReturnValue(Promise.resolve(false))

    const isValid = await sut.add(makeAddAccountParams())

    expect(isValid).toBe(false)
  })

  it('Should return false if LoadAccountByEmailRepository returns an account', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve({
      id: 'any_id',
      name: 'any_name',
      password: 'hashed_value'
    }))
    const isValid = await sut.add(makeAddAccountParams())

    expect(isValid).toBe(false)
  })

  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
    await sut.add(makeAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
