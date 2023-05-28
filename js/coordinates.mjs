function coordinatesGenerator(numAtoms, radio) {
  const coordinates = [];

  const angularIncrement = Math.PI * (3 - Math.sqrt(5));
  const offset = 2 / numAtoms;

  for (let i = 0; i < numAtoms; i++) {
    const y = ((i * offset) - 1) + (offset / 2);
    const radioProjeccion = Math.sqrt(1 - Math.pow(y, 2));
    const phi = i * angularIncrement;

    const x = Math.cos(phi) * radioProjeccion * radio;
    const z = Math.sin(phi) * radioProjeccion * radio;

    coordinates.push([x.toFixed(3), y.toFixed(3), z.toFixed(3)]);
  }

  return coordinates;
}

export default coordinatesGenerator;