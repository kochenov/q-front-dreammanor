/**
 * Количество кустов в одном (горизонтальном) ряду
 * @param {*} bushes количество кустов
 * @param {*} rows количество рядов
 * @returns
 */
export const oneRows = (bushes, rows) => {
  return Math.ceil(Number(bushes) / Number(rows));
};
/**
 * Количество кустов в одном (вертикальном) ряду
 * @param {*} bushes количество кустов
 * @param {*} rows количество рядов
 * @returns
 */
export const oneBushesInRows = (bushes, rows) => {
  return Math.ceil(Number(bushes) / Number(rows));
};
/**
 * Ширина шрядки
 * @param {*} rows количество рядов
 * @param {*} distanceBetweenRows растояние между рядов
 * @returns см
 */
export const width = (bushes, distanceBetweenRows, oneRows) => {
  return (
    Math.ceil(bushes / oneRows) * distanceBetweenRows + distanceBetweenRows
  );
};
/**
 * Длина грядки
 * @param {*} oneRows Количество кустов в одном ряду
 * @param {*} distanceBetweenBushes дистанция между кустов
 * @returns
 */
export const height = (oneRows, distanceBetweenBushes) => {
  return oneRows * distanceBetweenBushes + distanceBetweenBushes;
};
