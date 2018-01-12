var oracledb = require('oracledb');
var config = require('../config/config.js');

// Oracledb properties are applicable to all connections and SQL
// executions.  They can also be set or overridden at the individual
// execute() call level

// fetchArraySize can be adjusted to tune the internal data transfer
// from the Oracle Database to node-oracledb.  The value does not
// affect how, or when, rows are returned by node-oracledb to the
// application.  Buffering is handled internally by node-oracledb.
// Benchmark to choose the optimal size for each application or query.
//
// oracledb.fetchArraySize = 100;  // default value is 100

// This script sets outFormat in the execute() call but it could be set here instead:
//
// oracledb.outFormat = oracledb.OBJECT;

exports.doConnect = function (cb) {
    var promise = oracledb.getConnection(
        {
            user: config.oracle.user,
            password: config.oracle.password,
            connectString: config.oracle.connectString
        }
    );
    return promise;
}

exports.doClose = function (conn) {
    return conn.close();
};

exports.doQuery = function (query, type) {
    const vars = {};
    return exports.doConnect().then(function(connection){
        console.log("ORA\x1b[32m connected\x1b[0m");
        console.log("ORA server version " + connection.oracleServerVersion);
        console.log("ORA query " + query);
        vars.connection = connection;
        return vars.connection.execute(
            query,
            {}, // A bind variable parameter is needed to disambiguate the following options
            // parameter
            // otherwise you will get Error: ORA-01036: illegal variable name/number
            {outFormat: (type == 'OBJECT' ? oracledb.OBJECT : oracledb.ARRAY)} // outFormat can be
            // OBJECT or ARRAY.
            //  The default is
            // ARRAY
        );
    }).then(function(result){
        console.log("ORA result rows count " + result.rows.length);
        console.log("ORA result rows " + JSON.stringify(result.rows));
        vars.result = result;
        return exports.doClose(vars.connection)
    }).then(function(){
        console.log("ORA\x1b[32m connection closed\x1b[0m");
        return vars.result;
    });
};