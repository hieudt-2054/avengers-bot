const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh');

const monthYear = moment().subtract(1, 'month').format('MM/YYYY');
const nowYear = moment().format('MM/YYYY');
var prevMonth = moment().subtract(1, 'month').startOf('month');
var prevMonthDays = prevMonth.daysInMonth();
var fromLastMonth = prevMonth.format('YYYY-MM-') + '01';
var toLastMonth = prevMonth.format('YYYY-MM-') + prevMonthDays;

console.log('Month Year:', monthYear);
console.log('Now Year: ', nowYear);
console.log('Previous Month: ', prevMonth);
console.log('Previous Month Days: ', prevMonthDays);
console.log('From Last Month: ', fromLastMonth);
console.log('To Last Month: ', toLastMonth);