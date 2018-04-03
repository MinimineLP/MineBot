const dir = __dirname;

module.exports = {
  writeMail(to,from,subject,msgHtml,msgPlain) {
    var spawn = require('child_process').spawn,
        py    = spawn('python', [dir+'/compute_input.py']),
        data = [to,from,subject,msgHtml,msgPlain],
        dataString = '';

    py.stdout.on('data', function(data){
      dataString += data.toString();
    });

    py.stdout.on('end', function(){
      console.log(dataString);
    });

    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
  }
}
