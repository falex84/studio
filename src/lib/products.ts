import type { Product } from "./types";

export const products: Product[] = [
  {
    id: 1,
    name: "SSD NVMe Samsung 980 Pro",
    price: 120.0,
    description: "1TB PCIe 4.0 - 7000MB/s",
    image: "https://picsum.photos/seed/1/400/225",
    imageHint: "ssd nvme"
  },
  {
    id: 2,
    name: "RAM Corsair Vengeance",
    price: 155.5,
    description: "32GB DDR5 5200Mhz White",
    image: "https://picsum.photos/seed/2/400/225",
    imageHint: "ram memory"
  },
  {
    id: 3,
    name: "RTX 4070 Founders Edition",
    price: 640.0,
    description: "12GB GDDR6X - Ray Tracing",
    image: "https://picsum.photos/seed/3/400/225",
    imageHint: "graphics card"
  },
  {
    id: 4,
    name: "Logitech G Pro X Superlight",
    price: 139.99,
    description: "Sensor Hero 25K - Wireless",
    image: "https://picsum.photos/seed/4/400/225",
    imageHint: "gaming mouse"
  },
  {
    id: 5,
    name: "Fuente EVGA 750W Gold",
    price: 95.0,
    description: "Modular 80 Plus Gold",
    image: "https://picsum.photos/seed/5/400/225",
    imageHint: "power supply"
  },
  {
    id: 6,
    name: "Case NZXT H5 Flow White",
    price: 110.0,
    description: "Compact ATX Mid-Tower",
    image: "https://picsum.photos/seed/6/400/225",
    imageHint: "computer case"
  },
];
