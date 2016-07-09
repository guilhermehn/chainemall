const expect = require('chai').expect
const chainable = require('..')

describe('chainable(target)', () => {
  it('should be an object', () => {
    expect(chainable({})).to.be.a('object')
  })

  it('should throw a TypeError if it receives anything other than a object', () => {
    expect(() => chainable(null)).to.throw(TypeError)
  })

  it('should proxy all the methods from the target', () => {
    const target = {
      logger(x) {
        console.log('LOGGER:', x)
      },

      double(n) {
        return n * 2
      }
    }

    const originalMethods = Object.keys(target)
    const proxyMethods = Object.keys(chainable(target))

    expect(proxyMethods).to.be.deep.equal(originalMethods)
  })

  it('should work with native objects', () => {
    expect(chainable([]).filter).to.be.a('function')
    expect(chainable(Object).keys).to.be.a('function')
    expect(chainable(Math).pow).to.be.a('function')
  })

  it('should pass returned values to the next method in the chain', () => {
    const target = {
      double(n) {
        return n * 2
      },

      mustBe4(value) {
        expect(value).to.be.equal(4)
      }
    }

    chainable(target).double(2).mustBe4()
  })
})
