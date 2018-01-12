var oradb = require('./oradb');
var util = require("util");
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var User = require('../models/user');

var IMG_URL = 'https://login.universales.com/files/files/6/%s.jpg';

exports.getUserBySocialId = function (socialId, socialType) {
    var data = {};
    return oradb.doQuery("SELECT * FROM TUSUARIOS WHERE RED_SOCIAL_ID = '" + socialId
        + "' AND TIPO_RED_SOCIAL = '" + socialType + "'", "OBJECT").then(function (result) {
        return new Promise(function (resolve, reject) {
            if (result.rows.length > 0) {
                var row = result.rows[0];
                var user = {
                    id: row["ID_USUARIO"],
                    office: row["OFICINA"],
                    names: row["NOMBRES"],
                    lastNames: row["APELLIDOS"],
                    fullName: row["NOMBRES"] + row["APELLIDOS"],
                    pw: row["CLAVE"],
                    status: row["SITUACION"],
                    userAlias: row["USUARIO"],
                    openId: row["OPENID_SUBJECT"],
                    expirationDate: new Date(row["FECHAEXPIRA"]).getTime(),
                    cveage: row["CVEAGE"],
                    idInsured: row["COD_CONTACTO"],
                    createdBy: row["CREADO_POR"],
                    dateCreated: new Date(row["CREADO_FECHA"]).getTime(),
                    active: row["ACTIVO"],
                    expired: row["EXPIRADO"],
                    blocked: row["BLOQUEADO"],
                    pwExpired: row["PW_EXPIRADO"],
                    socialId: row["RED_SOCIAL_ID"],
                    socialType: row["TIPO_RED_SOCIAL"],
                    isExpired: row["EXPIRADO"] != null && row["EXPIRADO"].trim() == "S"
                };
                console.log("USR user data " + JSON.stringify(user));
                return resolve(user);
            } else {
                return reject('No data');
            }
        }).then(function (user) {
            data.user = user;
            return exports.getUserProperties(data.user.id);
        }).then(function (properties) {
            data.user.properties = properties;
            return exports.getUserServices(data.user.id);
        }).then(function (services) {
            data.user.services = services;
            return data.user;
        });
    });
};

exports.getUserProperties = function (id) {
    var properties = [];
    return oradb.doQuery("SELECT * FROM USER_VARIABLES WHERE USER_ID = '" + id + "'", "OBJECT")
        .then(function (result) {
            return new Promise(function (resolve) {
                for (var i in result.rows) {
                    var row = result.rows[i];
                    var property = {
                        id: row["ID"],
                        userId: row["USER_ID"],
                        key: row["DATA_KEY"],
                        value: this.key == 'img' ? util.format(IMG_URL, row["VALUE"]) : row["VALUE"]
                    };
                    properties.push(property);
                }
                console.log("USR properties count " + properties.length);
                console.log("USR properties " + JSON.stringify(properties));
                resolve(properties);
            });
        });
};

exports.getUserServices = function (id) {
    var services = [];
    return oradb.doQuery("SELECT USER_SERVICES.ID, USER_SERVICES.USER_ID, SERVICES.NAME, SERVICES.LINK_ICON, SERVICES.LINK FROM USER_SERVICES JOIN SERVICES ON SERVICES.ID = USER_SERVICES.SERVICE_ID WHERE USER_ID = '"
        + id + "'", "OBJECT").then(function (result) {
        return new Promise(function (resolve) {
            for (var i in result.rows) {
                var row = result.rows[i];
                var service = {
                    id: row["ID"],
                    userId: row["USER_ID"],
                    name: row["NAME"],
                    iconLink: row["LINK_ICON"],
                    link: row["LINK"]
                };
                services.push(service);
            }
            console.log("USR user services count " + services.length);
            console.log("USR user services " + JSON.stringify(services));
            resolve(services);
        });
    });
};

exports.getUserByToken = function (token) {
    var verify = jwt.verify(token, config.auth.secret);
    User.findById(verify.id, function (err, user) {
        return {verify: verify, user: user};
    });
    return;
};