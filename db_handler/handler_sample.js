var pool = require('./mysql_config');

module.exports = {
  get_user: function(req,res) {
         
         pool.getConnection(function(err,connection){
             if (err) {
               connection.release();
               res.json({"code" : 100, "status" : "Error in connection database"});
               return;
             }   
     
             console.log('connected as id ' + connection.threadId);
             
             connection.query("SELECT 'Peter' fname, 'Haha' lname",function(err,rows){
                 connection.release();
                 if(!err) {
                     res.json(rows);
                 }           
             });
     
             connection.on('error', function(err) {      
                   res.json({"code" : 100, "status" : "Error in connection database"});
                   return;     
             });
       });
  },
  get_user_byid: function(req,res) {
         
         pool.getConnection(function(err,connection){
             if (err) {
               connection.release();
               res.json({"code" : 100, "status" : "Error in connection database"});
               return;
             }   
     
             console.log('connected as id ' + connection.threadId);
             
             connection.query("SELECT * FROM my_schema.user where iduser = "+ req.body.iduser,function(err,rows){
                 connection.release();
                 if(!err) {
                     res.json(rows);
                 }           
             });
     
             connection.on('error', function(err) {      
                   res.json({"code" : 100, "status" : "Error in connection database"});
                   return;     
             });
       });
  }
  //Your custom database handler here
};