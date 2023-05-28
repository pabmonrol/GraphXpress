function generarCoordenadas(numAtomos, radio) {
  const coordenadas = [];

  const incrementoAngular = Math.PI * (3 - Math.sqrt(5));
  const offset = 2 / numAtomos;

  for (let i = 0; i < numAtomos; i++) {
    const y = ((i * offset) - 1) + (offset / 2);
    const radioProyeccion = Math.sqrt(1 - Math.pow(y, 2));
    const phi = i * incrementoAngular;

    const x = Math.cos(phi) * radioProyeccion * radio;
    const z = Math.sin(phi) * radioProyeccion * radio;

    coordenadas.push([x.toFixed(3), y.toFixed(3), z.toFixed(3)]);
  }

  return coordenadas;
}

export default generarCoordenadas;