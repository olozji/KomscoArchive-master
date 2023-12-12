export function numberWithCommas(x) {
  if (typeof x !== 'undefined') {
    if (isNaN(x)) {
      if (x.toString() === 'NaN') {
        return '';
      } else {
        return x;
      }
    }
    // x = (x + '').replace(/[^0-9]/g, '')
    x = x + '';
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return x;
}
