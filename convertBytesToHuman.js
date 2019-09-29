/*
 * Функция `convertBytesToHuman` должна принимать
 * аргумент `bytes` только числового типа.
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

function convertBytesToHuman(bytes) {
  if ( Number.isInteger(bytes) ){
    if ( (bytes >= 0) && (bytes <= 255)){
      return bytes
    }
  }
  return false
}

export default convertBytesToHuman
