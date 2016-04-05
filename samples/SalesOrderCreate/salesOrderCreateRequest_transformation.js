// Sample transformation

export function transform (input) {
  return {
    'salesOrderNumber': input[0].soNumber * 2,
    'itemDetails': {
      'itemCode': input[0].item.code,
      'qtd': input[0].item.quantity
    },
    'token': input[1].token
  }
}
