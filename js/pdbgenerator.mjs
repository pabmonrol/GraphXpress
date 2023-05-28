import coordinatesGenerator from '/js/coordinates.mjs';

function generateGraphFile(verticesInput, edgesInput, elements) {
    let vertices = verticesInput.split(',');
    let edges = edgesInput.split(',');
    let text = '';
    let numAtoms = vertices.length;
    let numEdges = edges.length;
    let radio = 2;

    // HEADER
    text += `HEADER    NONAME 16/5/2023                                              NONE\n`;

    text += 'TITLE                                                                   NONE\n';
    text += 'AUTHOR    Chemical Structure Services at http://cactus.nci.nih.gov      NONE\n';
    text += 'REVDAT    1  23-Apr-10   0                                              NONE\n';

    // ATOM
    let coordinates = coordinatesGenerator(numAtoms, radio);
    for (let i = 0; i < numAtoms; i++) {
        // Check if the element is repeated in the adjacents elements
        let elementsEdges = edges
        .filter(a => a.includes(vertices[i]))
        .map(a => a.replace(vertices[i], ''))
        .join('');

        let element = elements[i % elements.length];
        let elementsRepeated = elementsEdges.split('').filter(e => elementsEdges.indexOf(e) !== elementsEdges.lastIndexOf(e));

        if (elementsRepeated.includes(element)) {
            // Find a new element that is not in elementsEdges
            let newElement = elements.find(e => !elementsEdges.includes(e));
            element = newElement;
        }


        text += `ATOM      ${i + 1}  ${element}           0       ${coordinates[i].join('  ')}  0.00  0.00           \n`;
    }

    // CONECT
      for (let i = 0; i < numEdges; i++) {
        let edge = edges[i];
        let verticesEdge = edge.split('');
        let textEdge = `CONECT    ${vertices.indexOf(verticesEdge[0]) + 1}`;
        
        for (let j = 1; j < verticesEdge.length; j++) {
          textEdge += `    ${vertices.indexOf(verticesEdge[j]) + 1}`;
        }
        
        textEdge += '    0                                         NONE\n';
        text += textEdge;
      }
    

    // END
    text += 'END ';

    return text;

}

export { generateGraphFile };