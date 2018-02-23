const transactionsRepository = require('./transactionsRepository');
const stellar = require('../stellar');

class TransactionService {
  async getTransaction(id) {
    return await transactionsRepository.getTransaction(id);
  }

  async createTransaction({ userId, xdr }) {
    // TODO - validate -- what validations?
    return await transactionsRepository.createTransaction({
      userId,
      xdr
    });
  }

  async submitTransaction(transaction) {
    // TODO -- record result after it was sent
    const submitResult = await stellar.transactions.submitTransaction(
      transaction.stellarTransaction
    );

    return await transactionsRepository.submitted(transaction);
  }
}

module.exports = new TransactionService();