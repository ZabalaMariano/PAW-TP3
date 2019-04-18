var console = console || {},
  Juego = Juego || {};

Juego.ganador = false;
Juego.jugador = 'x';
Juego.contenedor = "no";
Juego.niveles = [
  {
    modo: "3x3",
    ancho: 3,
    alto: 3
  },
  {
    modo: "4x4",
    ancho: 4,
    alto: 4
  },
  {
    modo: "5x5",
    ancho: 5,
    alto: 5
  },
  {
    modo: "6x6",
    ancho: 6,
    alto: 6
  }
];