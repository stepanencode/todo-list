/* eslint-disable quotes */
const normalizePhone = value => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, "");
  if (onlyNums.length === 1 && (onlyNums === "8")) {
    return `+7-`;
  }
  if (onlyNums.length <= 4) {
    return `+${onlyNums.slice(0, 1)}(${onlyNums.slice(1, 4)})${onlyNums.slice(4)}`;
  }
  if (onlyNums.length <= 7) {
    return `+${onlyNums.slice(0, 1)}(${onlyNums.slice(1, 4)})${onlyNums.slice(4)}`;
  }
  return `+${onlyNums.slice(0, 1)}(${onlyNums.slice(1, 4)})${onlyNums.slice(4, 7)}-${onlyNums.slice(7, 11)}`;
};
/* eslint-disable quotes */
export default normalizePhone;
