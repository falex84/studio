import type { Product } from "./types";
import { Cpu, HardDrive, Monitor, Mouse, Zap, Box } from "lucide-react";

export const products: Product[] = [
  {
    id: 1,
    name: "SSD NVMe Samsung 980 Pro",
    price: 120.0,
    description: "1TB PCIe 4.0 - 7000MB/s",
    icon: HardDrive,
    color: "from-blue-600/20",
  },
  {
    id: 2,
    name: "RAM Corsair Vengeance",
    price: 155.5,
    description: "32GB DDR5 5200Mhz (2x16GB)",
    icon: Cpu,
    color: "from-purple-600/20",
  },
  {
    id: 3,
    name: "RTX 4070 Founders Edition",
    price: 640.0,
    description: "12GB GDDR6X - Ray Tracing",
    icon: Monitor,
    color: "from-emerald-600/20",
  },
  {
    id: 4,
    name: "Logitech G Pro X Superlight",
    price: 139.99,
    description: "Sensor Hero 25K - White",
    icon: Mouse,
    color: "from-cyan-600/20",
  },
  {
    id: 5,
    name: "Fuente EVGA 750W Gold",
    price: 95.0,
    description: "Certificación 80 Plus Gold",
    icon: Zap,
    color: "from-yellow-600/20",
  },
  {
    id: 6,
    name: "Case NZXT H5 Flow",
    price: 110.0,
    description: "Compact ATX Mid-Tower",
    icon: Box,
    color: "from-orange-600/20",
  },
];
