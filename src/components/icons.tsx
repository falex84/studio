import { cn } from "@/lib/utils";

export const AlexPcLogo = ({ className }: { className?: string }) => (
  <svg
    className={cn("rounded-lg", className)}
    width="45"
    height="45"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="100" height="100" rx="20" fill="#0038A8" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fill="white"
      fontSize="48"
      fontWeight="bold"
      fontFamily="sans-serif"
    >
      A
    </text>
  </svg>
);
