import {  ErrorCode, MySQL  } from 'exotel-twitter';

import { Query } from './../query/query';

export class userController {


    static async CreateUser(input: any) {
        console.log(input)
        var CreateUserResult = new Promise(function (resolve, reject) {
            MySQL.getInstance().query(Query.CREATE_USER, [input.name,input.username,input.password], function (err, result) {
                if (err) {
                    reject({
                        'result' : 'NULL',
                        'error': '500'
                    });
                } else {
                    resolve({'result' : 'Ok','error':'NULL'})
                }
            });


        });
        return CreateUserResult;
    }

    static async GetUser(input: any) {
        var GetUserResult = new Promise(function (resolve, reject) {
            MySQL.getInstance().query(Query.GET_USER, [input.id], function (err, result) {
                if (err) {
                    reject({
                    });
                } else {
                    if (result.length == 0)
                        reject({});
                    resolve(result[0])
                }
            });


        });
        return GetUserResult;
    }

    static async FollowUser(input: any) {
        var FollowUserResult = new Promise(function (resolve, reject) {
            MySQL.getInstance().query(Query.FOLLOW_USER, [input.id,input.follow], function (err, result) {
                if (err) {
                    reject(
                        {'result' : 'NULL','error':500});
                } else {
                    resolve({'result' : 'Ok','error':'NULL'})
                }
            });


        });
        return FollowUserResult;
    }

}
