export function toLocalDate(date: Date) {
  return new Date(date).toLocaleString("ru", { dateStyle: "short" });
}
