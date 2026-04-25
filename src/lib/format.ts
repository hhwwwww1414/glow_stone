const rubFormatter = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
  style: "currency",
  currency: "RUB"
});

export function formatPrice(price: number) {
  return rubFormatter.format(price).replace(/\u00a0/g, " ");
}
