'use strict'

export default class Counter {

  constructor () {
    this.count = 0
  }

  next () {
    return ++this.count
  }
}
