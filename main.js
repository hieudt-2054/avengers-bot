var task = require('./modules/viblo');
var taskTwo = require('./modules/covid');
var cron = require('node-cron');
cron.schedule('36 22 * * 1-5', () => {
    console.log('running a task every minute');
    task.apiViblo()
});

cron.schedule('38 22 * * 1-5', () => {
    console.log('running a task every covid');
    taskTwo.apiCovid()
});