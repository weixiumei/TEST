class Promise {
  constructor(excutor) {
    if (typeof excutor !== 'function') {
      throw new TypeError('Promise resolver ${excutor} is not a function')
    }
    this.status = 'pending'
    this.value = null
    this.reason = null
    function resolve(value) {
      // 成功后的一系列操作
      console.log('resolve', value)
      if (this.status == 'pending') {
        this.status = 'fulfilled'
        this.value = value
      }
    }
    function reject(reason) {
      // 失败后的一系列操作
      console.log('reject', reason)
      if (this.status == 'pending') {
        this.status == 'rejected'
        this.reason = reason
      }
    }

    try {
      excutor(resolve.bind(this), reject.bind(this))
    } catch (e) {
      reject(e)
    }
  }
}
module.exports = Promise