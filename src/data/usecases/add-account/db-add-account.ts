import { LoadAccountByEmailRepository } from '../authentication/db-authentication-protocols'
import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { password, email } = accountData

    await this.loadAccountByEmailRepository.loadByEmail(email)

    const hashedPassword = await this.hasher.hash(password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))

    return account
  }
}
