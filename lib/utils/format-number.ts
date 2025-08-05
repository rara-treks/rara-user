function formatNumber(number: number) {
  const f = new Intl.NumberFormat(undefined, { notation: "compact" });
  return f.format(number);
}

export default formatNumber;
