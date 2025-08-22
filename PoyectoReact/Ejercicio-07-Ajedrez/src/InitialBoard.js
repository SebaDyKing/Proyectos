export const initialBoard = [
  // fila 0 → piezas negras principales
  [
    { tipo: 'R', color: 'black' }, // Torre
    { tipo: 'N', color: 'black' }, // Caballo
    { tipo: 'B', color: 'black' }, // Alfil
    { tipo: 'Q', color: 'black' }, // Reina
    { tipo: 'K', color: 'black' }, // Rey
    { tipo: 'B', color: 'black' }, // Alfil
    { tipo: 'N', color: 'black' }, // Caballo
    { tipo: 'R', color: 'black' }  // Torre
  ],
  // fila 1 → peones negros
  Array(8).fill().map(() => ({ tipo: 'P', color: 'black' })),

  // filas 2,3,4,5 → vacías
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),

  // fila 6 → peones blancos
  Array(8).fill().map(() => ({ tipo: 'P', color: 'white' })),

  // fila 7 → piezas blancas principales
  [
    { tipo: 'R', color: 'white' },
    { tipo: 'N', color: 'white' },
    { tipo: 'B', color: 'white' },
    { tipo: 'Q', color: 'white' },
    { tipo: 'K', color: 'white' },
    { tipo: 'B', color: 'white' },
    { tipo: 'N', color: 'white' },
    { tipo: 'R', color: 'white' }
  ]
]
export default initialBoard
