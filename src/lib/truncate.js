/* eslint-disable prettier/prettier */
/**
 * Truncate put an ellipsis in middle of the string.
 * @params string str String to be trunctate
 * @params number first Number of chars to lead with
 * @params number last Number chars to end with
 */
const truncate = (str, first, last) => {
  return str.length > first
    ? str.substr(0, first - 1) + String.fromCharCode(0x2026) + str.substr(str.length - last)
    : str;
};

export default truncate;
