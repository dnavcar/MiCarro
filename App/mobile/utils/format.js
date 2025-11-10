export const formatCurrency = (value) =>
  value.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
