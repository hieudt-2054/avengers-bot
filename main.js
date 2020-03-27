var task = require('./modules/viblo');
var taskTwo = require('./modules/covid');
var cron = require('node-cron');
cron.schedule('0 8 1 * *', () => {
    console.log('running a task viblo top');
    task.apiViblo()
});

cron.schedule('0 8 * * 1-5', () => {
    console.log('running a task covid');
    taskTwo.apiCovid()
});