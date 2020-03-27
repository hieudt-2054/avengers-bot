require('dotenv').config()
const axios = require('axios').default;
const moment = require('moment');
moment.locale();
var CW = require('avengers-chatwork'),
    client = CW();
// initialize.
client.init({
    token: process.env.CHATWORK_API
});

callAPI();

function callAPI() {
    axios.get('https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=VN')
    .then(function (response) {
        console.log(response.data[0]);
        var template = `>> All [info][title]Tình hình dịch bệnh covid tại việt nam ngày ${moment().format('DD/MM/YYYY')}[/title]- Số ca nhiễm thời điểm hiện tại : ${response.data[0].totalConfirmed} người
- Số ca tử vong : ${response.data[0].totalDeaths} người
- Số ca bình phục : ${response.data[0].totalRecovered} người
- Số người có chuyển biến nặng : ${response.data[0].totalCritical} người[/info]
[info][title]Các biện pháp phòng chống COVID – 19[/title]- Hạn chế tiếp xúc trực tiếp với người bị bệnh đường hô hấp cấp tính (sốt, ho, khó thở); khi cần thiết phải đeo khẩu trang y tế đúng cách và giữ khoảng cách trên 02 mét khi tiếp xúc.
- Người có các triệu chứng sốt, ho, khó thở không nên đi du lịch hoặc đến nơi tập trung đông người. Thông báo ngay cho cơ quan y tế khi có các triệu chứng kể trên.
- Giữ ấm cơ thể, tăng cường sức khỏe bằng ăn uống, nghỉ ngơi, sinh hoạt hợp lý, luyện tập thể thao.
- Hiện tại, người dân có thể liên hệ 2 số điện thoại đường dây nóng của Bộ Y tế để cung cấp thông tin về bệnh Viêm đường hô hấp cấp Covid – 19 là: 1900 3228 và 1900 9095.[/info]
Cuối cùng Bot xin chúc toàn thể sunners chúng ta có 1 ngày làm việc vui vẻ (wasshoi)`
        sendMsg(template)
    })
    .catch(function (err) {
        callAPI();
    })
}


function sendMsg(template) {
    client.post(`rooms/${process.env.ROOM_ID}/messages`, {
        body: template
    }, function (err, res) {
        console.log(res.body);
    });
}