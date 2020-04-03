/**
 * Uppercase first letter.
 *
 * @param {String} string
 * @returns {String}
 */
export function uppercaseFirstLetter(string: string) {
  if (!string) return null;

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Get initial two letters from user name.
 *
 * @param {String} string
 * @returns {String}
 */
export function getUserNameInitials(string: string) {
  if (!string) return null;

  return uppercaseFirstLetter(
    string
      .split(' ')
      .slice(0, 2)
      .map(function(item) {
        return item[0];
      })
      .join('')
  );
}

/**
 * Make two digit number
 *
 * @param {String} number
 */
function makeTwoDigit(number: number) {
  if (!number) return null;

  return number.toString().length > 1 ? number : '0' + number;
}

/**
 * Convert seconds into hour and minute format
 *
 * @param {String} secondValue
 */
export function secondsToHms(secondValue: any) {
  if (!secondValue) return null;

  let d = Number(secondValue);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  let hDisplay = h > 0 ? makeTwoDigit(h) + 'h ' : '';
  let mDisplay = m > 0 ? makeTwoDigit(m) + 'm ' : '';
  let sDisplay = s > 0 ? s + 's ' : '';

  return hDisplay + mDisplay + sDisplay;
}

/**
 * Change version to camelcase
 */
export function changeVersionToCamelcase(item: number) {
  let i = item.toString() || '0.5';

  return i.replace('.', '_');
}

/**
 * Check empty object
 *
 * @param obj Object
 */
export function isEmpty(obj: any) {
  return Object.keys(obj).length > 0;
}
