require('dotenv').config()
var fs = require('fs');
var exports = module.exports = {}
const axios = require('axios').default;
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Ho_Chi_Minh');
const startDayInMonth = moment().startOf('month').format('YYYY-MM-DD');
const endDayInMonth = moment().endOf('month').format('YYYY-MM-DD');
const monthYear = moment().subtract(1, 'month').format('MM/YYYY');
const nowYear = moment().format('MM/YYYY');
var prevMonth = moment().subtract(1, 'month').startOf('month');
var prevMonthDays = prevMonth.daysInMonth();
var fromLastMonth = prevMonth.format('YYYY-MM-') + '01';
var toLastMonth = prevMonth.format('YYYY-MM-') + prevMonthDays;

var vibloPostCollection = null;
const api = axios.create({
    baseURL: 'https://api.viblo.asia/',
    timeout: 10000,
    headers: {'Authorization': `Bearer ${process.env.VIBLO_TOKEN}` }
  });
var CW = require('avengers-chatwork'),
    client = CW();

// initialize.
client.init({
    token: process.env.CHATWORK_API
});

function getDataFromFile() {
    fs.readFileSync('./database/data', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }
        const content = data.split(',');
        return content;
    });
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
        var url = [];
        fs.readFile('./database/data', 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            url = data.split(',');
            console.log(url);
            var template = `[toall][info][title]Thống kê bài viết trên Viblo của Avengers Group (https://viblo.asia/o/avengers-group) tháng ${monthYear}[/title]1. ${result[0].name} (${url[0]}): ${result[0].total_viblo_postviews} Post views (*)
2. ${result[1].name} (${url[1]}): ${result[1].total_viblo_postviews} Post views 
3. ${result[2].name} (${url[2]}): ${result[2].total_viblo_postviews} Post views 
4. ${result[3].name} (${url[3]}): ${result[3].total_viblo_postviews} Post views 
5. ${result[4].name} (${url[4]}): ${result[4].total_viblo_postviews} Post views
[hr] Xin chúc mừng bạn ${result[0].name} (${result[0].url}) đã xuất sắc dẫn đầu số lượng Postviews tháng ${monthYear} và giành phần quà miễn quỹ Group tháng ${nowYear}
[hr]Avengers Group - Be Your Own Hero! (quyettam)[/info]`
            sendMsg(template)
        });
    })
};


function sendMsg(template) {
    client.post(`rooms/${process.env.ROOM_ID}/messages`, {
        body: template
    }, function (err, res) {
        console.log(res.body);
    });
}