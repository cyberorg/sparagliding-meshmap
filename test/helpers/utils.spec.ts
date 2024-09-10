import { expect } from 'chai'
import { AbortError } from 'p-retry'
import { BROADCAST_ADDR, parseProtobuf, secondsAgo, sendToFlyXC, toBigInt } from '#helpers/utils'
import { pgBoss } from '#config/data-source'
import sinon from 'sinon'

describe('Utils', () => {
  describe('toBigInt', () => {
    it('should convert valid hex string to number', () => {
      expect(toBigInt('0x1a')).to.equal(26)
    })

    it('should return undefined for invalid input', () => {
      expect(toBigInt('invalid')).to.be.undefined
      expect(toBigInt(null)).to.be.undefined
      expect(toBigInt(undefined)).to.be.undefined
    })

    it('should return the same number if input is a number', () => {
      expect(toBigInt(123)).to.equal(123)
    })
  })

  describe('secondsAgo', () => {
    it('should return a date object representing the time X seconds ago', () => {
      const now = Date.now()
      const secs = 60
      const date = secondsAgo(secs)
      expect(date).to.be.an.instanceof(Date)
      expect(date.getTime()).to.be.closeTo(now - secs * 1000, 1000)
    })
  })

  describe('parseProtobuf', () => {
    it('should parse protobuf correctly', () => {
      const mockProtobuf = () => ({ foo: 'bar' })
      const result = parseProtobuf(mockProtobuf)
      expect(result).to.deep.equal({foo: 'bar'})
    })

    it('should throw AbortError on parsing error', () => {
      const mockProtobuf = () => {
        throw new Error('Parsing error')
      }
      expect(() => parseProtobuf(mockProtobuf)).to.throw(AbortError, 'Parsing error')
    })
  })

  describe('sendToFlyXC', () => {
    let sendStub: sinon.SinonStub

    beforeEach(() => {
      sendStub = sinon.stub(pgBoss, 'send').resolves()
    })

    afterEach(() => {
      sendStub.restore()
    })

    it('should send payload to FlyXC if API key and URL are set', async () => {
      process.env.FLYXC_API_KEY = 'test-key'
      process.env.FLYXC_API_URL = 'http://test-url'
      const payload = { test: 'data' }

      await sendToFlyXC(payload)
      expect(sendStub.calledOnceWith('fly-xc', payload)).to.be.true
    })

    it('should not send payload if API key or URL are not set', async () => {
      delete process.env.FLYXC_API_KEY
      delete process.env.FLYXC_API_URL
      const payload = { test: 'data' }

      await sendToFlyXC(payload)
      expect(sendStub.notCalled).to.be.true
    })
  })

  describe('BROADCAST_ADDR', () => {
    it('should be equal to 0xffffffff', () => {
      expect(BROADCAST_ADDR).to.equal(0xffffffff)
    })
  })
})