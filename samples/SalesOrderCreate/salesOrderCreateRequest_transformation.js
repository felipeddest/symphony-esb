// Sample transformation

export function transform (input) {
  return {
    "salesOrderNumber": input.soNumber * 2,
    "itemDetails": {
      "itemCode" : input.item.code,
      "qtd": input.item.quantity
    }
  }
}