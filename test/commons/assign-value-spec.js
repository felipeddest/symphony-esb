
import { expect } from 'chai'
import assignValue from '../../lib/commons/assign-value'

describe('Commons Assign Value', () => {
  describe('.assignValue', () => {
    it('should assign a value', () => {
      const root = assignValue('salesOrder.number', '123', {})
      expect(root).to.not.be.eq(undefined)
      expect(root.salesOrder.number).to.be.equal('123')
    })

    it('should assign a value in a existing context', () => {
      const context = {salesOrder: {items: [{name: 'Sword', price: 12.4}, {name: 'Shield', price: 20}]}}
      const root = assignValue('salesOrder.number', '123', context)
      expect(root).to.not.be.eq(undefined)
      expect(root.salesOrder.number).to.be.equal('123')
      expect(root.salesOrder.items[1].name).to.be.equal('Shield')
    })

    it('should override a value when assigning', () => {
      const context = {salesOrder: {items: [{name: 'Sword', price: 12.4}, {name: 'Shield', price: 20}]}}
      const root = assignValue('salesOrder.items', [], context)
      expect(root).to.not.be.eq(undefined)
      expect(root.salesOrder.items.length).to.be.equal(0)
    })
  })
})
