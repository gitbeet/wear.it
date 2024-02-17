import type { ProductColor, ProductSize } from "@prisma/client";

export const colorOptions: {
  id: number;
  color: ProductColor;
  colorClass: string;
}[] = [
  { id: 1, color: "PURPLE", colorClass: "bg-purple-500" },
  { id: 2, color: "BLACK", colorClass: "bg-black" },
  { id: 3, color: "RED", colorClass: "bg-red-500" },
  { id: 4, color: "ORANGE", colorClass: "bg-orange-500" },
  { id: 5, color: "BLUE", colorClass: "bg-blue-500" },
  { id: 6, color: "WHITE", colorClass: "bg-white" },
  { id: 7, color: "BROWN", colorClass: "bg-amber-900" },
  { id: 8, color: "GREEN", colorClass: "bg-green-500" },
  { id: 9, color: "PINK", colorClass: "bg-pink-300" },
  { id: 10, color: "YELLOW", colorClass: "bg-yellow-500" },
  { id: 11, color: "GRAY", colorClass: "bg-slate-600" },
  { id: 12, color: "BEIGE", colorClass: "bg-yellow-600" },
];

export const sizeOptions: { id: number; size: ProductSize }[] = [
  { id: 1, size: "XS" },
  { id: 2, size: "S" },
  { id: 3, size: "M" },
  { id: 4, size: "L" },
  { id: 5, size: "XL" },
  { id: 6, size: "XXL" },
  { id: 7, size: "XXXL" },
];

// export const colorOptions: ColorOption[] = [
//     { id: 1, name: "RED", color: "bg-red-500" },
//     { id: 2, name: "PURPLE", color: "bg-purple-500" },
//     { id: 3, name: "BLACK", color: "bg-black" },
//     { id: 4, name: "BLUE", color: "bg-blue-500" },
//     { id: 5, name: "ORANGE", color: "bg-orange-500" },
//     { id: 6, name: "WHITE", color: "bg-white" },
//     { id: 7, name: "GREEN", color: "bg-green-500" },
//     { id: 8, name: "PINK", color: "bg-pink-300" },
//     { id: 9, name: "BROWN", color: "bg-amber-900" },
//     { id: 10, name: "YELLOW", color: "bg-yellow-500" },
//     { id: 11, name: "GRAY", color: "bg-slate-600" },
//     { id: 12, name: "BEIGE", color: "bg-yellow-600" },
//   ];
