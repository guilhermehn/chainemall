const expect = require('chai').expect
const chainemall = require('..')

describe('chainemall(target)', () => {
  it('should be an object', () => {
    expect(chainemall({})).to.be.a('object')
  })

  it('should throw a TypeError if it receives anything other than a object', () => {
    expect(() => chainemall(null)).to.throw(TypeError)
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
    const proxyMethods = Object.keys(chainemall(target))

    expect(proxyMethods).to.be.deep.equal(originalMethods)
  })

  it('should work with native objects', () => {
    expect(chainemall([]).filter).to.be.a('function')
    expect(chainemall(Object).keys).to.be.a('function')
    expect(chainemall(Math).pow).to.be.a('function')
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

    chainemall(target).double(2).mustBe4()
  })
})
