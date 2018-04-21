import { Meteor } from 'meteor/meteor';

import { Routes } from '../routes.js';
/**
* @desc These methods send the data of MongoDB to miniMongo
**/
Meteor.publish('listsRoutes', function() {
  return Routes.find({}, {sort: {"created_at": -1} ,limit : 20});
});

Meteor.publish('findIP', function( ipAddress ) {
  return Routes.find({ $or: [{ip_source: ipAddress} , {next_hop: ipAddress}] });
});

Meteor.publish('findDate', function( date ) {
  return Routes.find({ $or: [{created_at: date} , {modify_at: date}] });
});

Meteor.publish('sortCommunity', function() {
  return Routes.find.sort({community: 1});
});

Meteor.publish('sortDate', function() {
  return Routes.find.sort({created_at: -1});
});
