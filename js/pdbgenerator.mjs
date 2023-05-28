import generarCoordenadas from '/js/coordenadas.mjs';

function generarArchivoMol(verticesInput, aristasInput, elementos) {
    let vertices = verticesInput.split(',');
    let adyacencias = aristasInput.split(',');
    let texto = '';
    let numeroDeAtomos = vertices.length;
    let numeroDeEnlaces = adyacencias.length;
    let radio = 2;

    // HEADER
    texto += `HEADER    NONAME 16/5/2023                                              NONE\n`;

    texto += 'TITLE                                                                   NONE\n';
    texto += 'AUTHOR    Chemical Structure Services at http://cactus.nci.nih.gov      NONE\n';
    texto += 'REVDAT    1  23-Apr-10   0                                              NONE\n';

    // ATOM
    let coordenadas = generarCoordenadas(numeroDeAtomos, radio);
    for (let i = 0; i < numeroDeAtomos; i++) {
        // Verificar si el elemento se repite en los elementos adyacentes
        let elementosAdyacentes = adyacencias
        .filter(a => a.includes(vertices[i]))
        .map(a => a.replace(vertices[i], ''))
        .join('');

        let elemento = elementos[i % elementos.length];
        let elementosRepetidos = elementosAdyacentes.split('').filter(e => elementosAdyacentes.indexOf(e) !== elementosAdyacentes.lastIndexOf(e));

        if (elementosRepetidos.includes(elemento)) {
            // Encontrar un nuevo elemento que no esté en elementosAdyacentes
            let nuevoElemento = elementos.find(e => !elementosAdyacentes.includes(e));
            elemento = nuevoElemento;
        }


        texto += `ATOM      ${i + 1}  ${elemento}           0       ${coordenadas[i].join('  ')}  0.00  0.00           \n`;
    }

    // CONECT
      for (let i = 0; i < numeroDeEnlaces; i++) {
        let enlace = adyacencias[i];
        let verticesEnlace = enlace.split('');
        let textoEnlace = `CONECT    ${vertices.indexOf(verticesEnlace[0]) + 1}`;
        
        for (let j = 1; j < verticesEnlace.length; j++) {
          textoEnlace += `    ${vertices.indexOf(verticesEnlace[j]) + 1}`;
        }
        
        textoEnlace += '    0                                         NONE\n';
        texto += textoEnlace;
      }
    

    // END
    texto += 'END ';

    console.log(texto);
    return texto;

}

export { generarArchivoMol };