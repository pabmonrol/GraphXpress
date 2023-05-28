function cromaticNum(edges) {
  const listEdges = edges.split(',');

  const frequencyLetters = {};

  for (const element of listEdges) {
    for (const letter of element) {
      if (letra in frequencyLetters) {
        frequencyLetters[letter]++;
      } else {
        frequencyLetters[letter] = 1;
      }
    }
  }

  for (const letter in frequencyLetters) {
    if (frequencyLetters[letter] > 12) {
      return true;
    }
  }

  return false;
}
  
export {cromaticNum};