export default function calcPriceWithSale(price: number, sale: number): number {
  return Math.ceil(price * (1 - sale / 100));
}
