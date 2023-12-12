import moment from 'moment';

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

export function dateFormat(type, x) {
  //type 0 = 일
  //type 1= 월
  //type 2= 분기
  //type 3= 반기
  //type 4 = 연
  // type 5=  회차
  // type 6= 누적
  if (typeof x !== 'undefined') {
    let value = x.toString(); // 2022-06 202206
    value = value.replaceAll('-', '');
    if (value.length == 4) {
      return moment(value).format('YYYY');
    }
    if (value.length == 6) {
      if (type == 2) {
        return moment(value).format('YYYY-M분기');
      }
      if (type == 3) {
        if (moment(value).format('MM') == '01') {
          return moment(value).format('YYYY 상반기');
        } else {
          return moment(value).format('YYYY 하반기');
        }
      }
      return moment(value).format('YYYY-MM');
    }
    if (value.length == 8) {
      return moment(value).format('YYYY-MM-DD');
    }
  }

  return null;
}

export function changeFullDate(type, x) {
  console.log('--type:' + type);
  console.log('--x:' + x);
  if (typeof x !== 'undefined') {
    let value = x.toString();
    value = value.replaceAll('-', '');

    if (type == 1) {
      return moment(moment(value).format('YYYYMMDD')).endOf('month').format('YYYYMMDD');
    }
    if (type == 4) {
      return moment(moment(value).format('YYYYMM')).endOf('years').format('YYYYMMDD');
    }

    return value;
  }

  return null;
}
