import mysql from 'mysql';

const con= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ems'
})

con.connect(function(err){
    if(err) throw err;
    console.log('Connected');
})




export default con;