export function generater(count) {
  let arr = createArray(count)
  arr = mixArray(arr)
  return arr
}

function createArray(count) {
  let arr = []

  for (let i = 1; i <= count / 2; i++) {
    for (let j = 0; j < 2; j++) {
      arr.push({
        isFlip: false,
        isShow: true,
        value: i,
      })
    }
  }

  return arr
}

function mixArray(array) {
  let temp
  for (let i = array.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    temp = array[j]
    array[j] = array[i]
    array[i] = temp
    array[i].id = i
  }
  return array
}

export function checkEqualsCards(firstCard, secondCard) {
  if (firstCard.value == secondCard.value) {
    firstCard.isShow = false
    secondCard.isShow = false
  }
}
