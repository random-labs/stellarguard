const passwords = require('./passwords');
const { crypto } = require('../utils');

// interface IUser {
//   id: number,
//   username: string,
//   email: string,
//   isEmailVerified: boolean,
//   passwordHash: string,

//   // relations
//   stellarAccounts: StellarAccount[];
//   authenticator: Authenticator
// }

class User {
  constructor({
    id,
    email,
    isEmailVerified = false,
    passwordHash,
    signerPublicKey,
    signerSecretKey,
    authenticator,
    accounts,
    transactions: transactions
  }) {
    this.id = id;
    this.email = email;
    this.isEmailVerified = isEmailVerified;
    this.passwordHash = passwordHash;
    this.signerPublicKey = signerPublicKey;
    this.signerSecretKey = signerSecretKey;
    this.authenticator = authenticator;
    this.accounts = accounts;
    this.transactions = transactions;
  }

  async verifyPassword(password) {
    return await passwords.compare(password, this.passwordHash);
  }

  get emailVerificationCode() {
    return crypto.getHmac(this.email, 10);
  }

  verifyEmailCode(code) {
    return code === this.emailVerificationCode;
  }

  get transactionVerificationType() {
    if (this.authenticator) {
      return 'authenticator';
    }

    if (this.isEmailVerified) {
      return 'email';
    }

    return 'none';
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      isEmailVerified: this.isEmailVerified,
      signerPublicKey: this.signerPublicKey,
      authenticator: this.authenticator,
      accounts: this.accounts,
      transactionVerificationType: this.transactionVerificationType,
      transactions: this.transactions
    };
  }
}

module.exports = User;
