import { GrpcServer } from 'exotel-twitter';

import { tweetController } from './../controller/tweets';
import { userController } from './../controller/users';

export class RPC {

    private server: GrpcServer;

    constructor(serverIP: string, serverPort: string) {

        this.server = new GrpcServer({
            host: serverIP,
            port: serverPort
        });
    }

    localCall(callee) {
        return function (call, callback) {
            var obj = call.request;
            delete obj['req'];
            callee(call.request).then(
                 (result) => {
                    callback(null, result);
                },
                 (err) => {
                    callback(err);
                }
            );
        };
    }

    startListening(callback) {

        var PROTO_PATH = __dirname + '/proto/twitter.proto';
        var twitterRoute = this.server.loadProto(PROTO_PATH).twitterRoute ;
      
        this.server.addService(twitterRoute.TwitterService.service, {
          createUser : this.localCall(userController.CreateUser),
          getUser : this.localCall(userController.GetUser),
          followUser : this.localCall(userController.FollowUser),
          timelineUser : this.localCall(tweetController.TimelineUser),
          homeUser : this.localCall(tweetController.HomeUser),
          createTweet : this.localCall(tweetController.Createtweet)
        });
        this.server.start(); 

        callback();
    }
}
