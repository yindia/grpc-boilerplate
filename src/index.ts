import HeadRush = require('headrush');

import { RPC } from './rpc';

import { MySQL } from 'exotel-twitter';

import  Config  = require('./config/config.json')
import  GrpcConfig  = require('./config/grpcConfig.json')

var headRush = new HeadRush({
  deps: [
    'mysql'
  ]
});

headRush.on('ready',  () => {
  var server: RPC = new RPC(GrpcConfig.twitter.host, GrpcConfig.twitter.port);
  server.startListening(() => {
    console.log('started GRPC server!! ');
  });
})

MySQL.initialize(Config.mysql, function (err) {
  if (err)
    console.log(err);
  else {
    headRush.stun({
      dep: 'mysql'
    })
  }
});

