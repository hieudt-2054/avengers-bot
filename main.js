var task = require('./modules/viblo');
var taskTwo = require('./modules/covid');
var taskGetPost = require('./modules/getPost');
var cron = require('node-cron');
var fs = require('fs');
cron.schedule('58 13 1 * *', () => {
    console.log('Running a task get posts');
    taskGetPost.apiViblo();
})

cron.schedule('0 14 1 * *', () => {
    console.log('running a task viblo top');
    task.apiViblo()
});

cron.schedule('0 8 * * 1-5', () => {
    console.log('running a task covid');
    taskTwo.apiCovid()
});