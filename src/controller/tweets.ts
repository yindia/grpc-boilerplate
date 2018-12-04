import {  ErrorCode, MySQL  } from 'exotel-twitter';

import { Query } from './../query/query';

export class tweetController {


    static async TimelineUser(input: any) {
        var TimelineUserResult = new Promise(function (resolve, reject) {
            MySQL.getInstance().query(Query.GET_TIMELINE, [input.id], function (err, result) {
                if (err) {
                    reject({
                        code: ErrorCode.INTERNAL_ERROR
                    });
                } else {
                    resolve(result)
                }
            });


        });
        return TimelineUserResult;
    }

    static async HomeUser(input: any) {
        var HomeUserResult = new Promise(function (resolve, reject) {
            MySQL.getInstance().query(Query.GET_HOME, [input.id,input.id], function (err, result) {
                if (err) {
                    reject({
                        code: ErrorCode.INTERNAL_ERROR
                    });
                } else {
                    console.log(result)
                    resolve(result)
                }
            });
        });
        return HomeUserResult;
    }

    static async Createtweet(input: any) {
        console.log(input)
        var HomeUserResult = new Promise(function (resolve, reject) {
            MySQL.getInstance().query(Query.CREATE_TWEET, [input.id,input.content,new Date()], function (err, result) {
                if (err) {
                    console.log(err)
                    reject({
                        result : 'NULL',
                        error: '0001'
                    });
                } else {
                    
                    resolve({'result' : 'Ok','error':'NULL'})
                }
            });
        });
        return HomeUserResult;
    }

}


