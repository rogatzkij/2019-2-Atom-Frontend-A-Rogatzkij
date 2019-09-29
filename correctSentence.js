/*
For the input of your function, you will be given one sentence.
You have to return a corrected version,
that starts with a capital letter and ends with a period (dot).

Example:

input (string): "hey, friend"
output (string): "Hey, friend."

Updated first 'h' to 'H', added '.'.

More examples:

correctSentence("greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends.") == "Greetings, friends."
 */

function correctSentence(text) {
  // Первая буква к верхнему регистру
  let str = text.split('')
  str[0] = str[0].toUpperCase()
  str = str.join('')

  // если надо, на конце ставим точку
  if(! str.endsWith('.')){
    str = str.concat('.')
  }
  return str
}

export default correctSentence
