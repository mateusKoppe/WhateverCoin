const SHA256 = require('crypto-js/sha256')

class Block {
  constructor (timestamp, lastHash, hash, data) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
  }

  toString () {
    return `Block -
      Timestamp: ${this.timestamp}
      Last Hash: ${this.lastHash.substring(0, 10)}...
      Hash     : ${this.hash.substring(0, 10)}...
      Data     : ${this.data}
    `
  }

  static genesis () {
    return new this(0, '', 'first-hash', [])
  }

  static generateHash (timestamp, lastHash, data) {
    return SHA256(`${timestamp}${lastHash}${data}`)
  }

  static mineBlock (lastBlock, data) {
    const timestamp = Date.now()
    const lastHash = lastBlock.hash
    const hash = Block.generateHash(timestamp, lastHash, data)
    return new this(timestamp, lastHash, hash, data)
  }
}

module.exports = Block