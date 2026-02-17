import type { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "Candado de Seguridad para Motos y Bicicleta",
    price: 5.00,
    description: "Cable de acero trenzado de alta resistencia con recubrimiento de vinilo protector para evitar rayaduras. Incluye dos llaves de seguridad.",
    image: "/assets/products/candado-bici.jpg",
    imageHint: "candado para bicicleta o moto de cable multicolor"
  },
  {
    id: 2,
    name: "Candado de Disco para Motocicleta",
    price: 3.00,
    description: "Seguridad compacta fabricada en acero endurecido. Resistente al corte y a impactos, diseñado para bloquear el disco de freno de forma efectiva.",
    image: "/assets/products/candado-moto.jpg",
    imageHint: "candado de disco para moto colores"
  },
  {
    id: 3,
    name: "Selfie Stick Trípode Pro Bluetooth",
    price: 5.00,
    description: "Diseño 2 en 1 extensible con control remoto Bluetooth integrado. Soporte ajustable con rotación de 360° para fotos y videos profesionales.",
    image: "/assets/products/selfie-stick.jpg",
    imageHint: "palo selfie con tripode y control remoto"
  },
  {
    id: 4,
    name: "Set de Bandas de Resistencia para Glúteos",
    price: 7.00,
    description: "Pack de 3 bandas de tela premium con diferentes niveles de resistencia. Diseño antideslizante ideal para tonificar glúteos y piernas de forma efectiva.",
    image: "/assets/products/bandas-resistencia.jpg",
    imageHint: "tres bandas de resistencia de tela colores purpura rosa y verde"
  },
];
