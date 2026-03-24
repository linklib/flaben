export function toLocalPrice(num?: number) {
  return num?.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });
}
