require('dotenv').config()
var fs = require('fs');
var exports = module.exports = {}
const axios = require('axios').default;
const moment = require('moment');
moment.locale();
const monthYear = moment().subtract(1, 'month').format('MM/YYYY');
const nowYear = moment().format('MM/YYYY');
var prevMonth = moment().subtract(1, 'month').startOf('month');
var prevMonthDays = prevMonth.daysInMonth();
var fromLastMonth = prevMonth.format('YYYY-MM-') + '01';
var toLastMonth = prevMonth.format('YYYY-MM-') + prevMonthDays;

var vibloPostCollection = null;
const api = axios.create({
    baseURL: 'https://api.viblo.asia/',
    headers: {'Authorization': `Bearer ${process.env.VIBLO_TOKEN}` }
  });

  async function getDataFromCollection(collect) {
    var arrResult = [];
    for (var i = 0; i < collect.length; i++) {
        await api.get(`users/${collect[i].username}/posts?limit=20`)
        .then(function (response) {
            const data = response.data.data.filter((x) => { return moment(x.published_at).format('MM') === prevMonth.format('MM') });
            var result = data.sort((a, b) => (a.views_count < b.views_count) ? 1 : -1);
            arrResult.push(result[0].url)
        })
    }
    fs.writeFileSync('./database/data', arrResult.join(','), 'utf-8'); 
    console.log('Write file done');
  }

  exports.apiViblo = function () {
    api.get('organizations/avengers-group/stats', {
        params: {
            from: fromLastMonth,
            to: toLastMonth
        }
    })
    .then(function (response) {
        vibloPostCollection = response.data.users;
        var result = vibloPostCollection.sort((a, b) => (a.total_viblo_postviews < b.total_viblo_postviews) ? 1 : -1);
        getDataFromCollection(result.slice(0,5));
    })
};
