import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const { password } = accountData
    const hashedPassword = await this.encrypter.encrypt(password)
    await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))

    return await new Promise(resolve => resolve({
      ...accountData,
      id: 'any_id',
      password: hashedPassword
    }))
  }
}
