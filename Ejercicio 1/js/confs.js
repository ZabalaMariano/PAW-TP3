var console = console || {},
  Juego = Juego || {};

Juego.contenedor = "no";
Juego.niveles = [
  {
    modo: "Personalizado",
    ancho: null,
    alto: null,
    minas: null
  },
  {
    modo: "Facil",
    ancho: 8,
    alto: 8,
    minas: 10
  },
  {
    modo: "Medio",
    ancho: 16,
    alto: 16,
    minas: 40
  },
  {
    modo: "Dificil",
    ancho: 16,
    alto: 30,
    minas: 99
  }
];
