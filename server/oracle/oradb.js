/* Copyright (c) 2015, 2017, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   oradb.js
 *
 * DESCRIPTION
 *   Executes queries to show array and object output formats.
 *   Gets results directly without using a ResultSet.
 *   Uses Oracle's sample HR schema.
 *
 *   Scripts to create the HR schema can be found at:
 *   https://github.com/oracle/db-sample-schemas
 *
 ******************************************************************************/

var oracledb = require('oracledb');
var dbConfig = require('../dbconfig.js');

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

exports.doConnect = function(cb) {
    oracledb.getConnection(
        {
            user          : dbConfig.user,
            password      : dbConfig.password,
            connectString : dbConfig.connectString
        },
        function (err, conn) {
            if (err) {
                console.error(err.message);
                return;
            }
            console.log('ORA connected successfully');
            console.log('ORA server version: ' + conn.oracleServerVersion);
            cb(err, conn);
        });
};

exports.doClose = function(conn) {
    conn.close(function (err) {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('ORA closed connection');
    });
};

exports.doQuery = function (query, type, cb) {
    exports.doConnect(function(err, conn){
        console.log('ORA query: ' + query);
        conn.execute(
            query,
            {}, // A bind variable parameter is needed to disambiguate the following options parameter
            // otherwise you will get Error: ORA-01036: illegal variable name/number
            { outFormat: (type == 'OBJECT' ? oracledb.OBJECT : oracledb.ARRAY) }, // outFormat can be OBJECT or ARRAY.  The default is ARRAY
            function(err, result)
            {
                console.log('ORA query complete');
                if (err) {
                    console.error(err.message);
                    exports.doClose(conn);
                    return cb(result);
                } else {
                    console.log('ORA result: ' + result.rows);
                    exports.doClose(conn);
                    return cb(result);
                }
            });
    });
};