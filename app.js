var mod_connect = require('connect');
var mod_http = require('http');
var cookie = require('./src/lib/cookie');
var setting = require('./src/lib/setting');
var mid_task_token = require('./src/task/token');
var mid_task_menu = require('./src/task/menu');

var app = mod_connect();
app.use(mod_connect.query());
app.use(mod_connect.cookieParser());
app.use(mod_connect.session({
  secret: "keyboard cat",
  cookie: {
    maxAge: 24*60*60*1000
  }
}));

/*cookie.set_filter('hasNotifyList');
cookie.set_filter('hasWarningUser');*/

cookie.load(function(cookie_load_result) {
  console.log('cookie_load_result:', cookie_load_result, cookie.getall());
});

setting.load(function(setting_load_result){
  console.log('setting_load_result:', setting_load_result, setting.getall());
});

app.use('/token', mid_task_token);
app.use('/menu/create', mid_task_menu.create);
app.use('/menu/get', mid_task_menu.get);
app.use('/menu/del', mid_task_menu.del);

mod_http.createServer(app).listen(10011);
console.log('Server start: http://localhost:10011/');