const env = process.env.NODE_ENV;
let mysql_conf = {
  host:'localhost',
  user:'root',
  password:'**',
  port:'3306',
  database:'**'
};

if(env === 'development'){
  mysql_conf = {
    host:'localhost',
    user:'**',
    password:'**',
    port:'**',
    database:'**'
  }
}

if(env === 'production'){
  mysql_conf = {
    host:'localhost',
    user:'**',
    password:'**',
    port:'**',
    database:'**'
  }
}

module.exports = {
  mysql_conf
};


