// import { Meteor } from "meteor/meteor";
// import { Routes } from "./routes.js";
// import { check } from 'meteor/check';
// /* Routes Api goes here */
//
// import { Mongo } from 'meteor/mongo';
// import { Factory } from 'meteor/dburles:factory';
// /*
//  *  This api is accessible from both: client and server.
//  *  This script contains the 'routes' module in order to announce, update, delete routes.
// */
//
// //HERE We have to create a 'Routes' collection with this way :
// /* Define routes collection here */
// export const Routes = new Mongo.Collection('routes');
//
// // Deny all client-side updates since we will be using methods to manage this collection
// Routes.deny({
//     insert() { return true; },
//     update() { return true; },
//     remove() { return true; },
// });
//
// Routes.schema = new SimpleSchema({
//     ip_source: {
//         type: String,
//         regEx: SimpleSchema.RegEx.IP,
//     },
//     next_hop: {
//         type: String,
//         regEx: SimpleSchema.RegEx.IP,
//     },
//     community: {
//         type: String,
//         max: 100,
//         optional: true,
//     },
//     activated: {
//         type: Boolean,
//         defaultValue: true,
//     },
//     created_at: {
//         type: Date,
//         //denyUpdate: true,
//     },
//     modify_at: {
//         type: Date,
//         autoValue: function () {
//             if(this.isUpdate) {
//                 return new Date();
//             }
//         }
//     }
// });
//
// Routes.attachSchema(Routes.schema);
//
// //Define a Factory to generate random routes:
// Factory.define('route', Routes, {
//     ip_source: () => (Math.floor(Math.random() * 255) + 1)+"."+ (Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0),
//     next_hop: () => (Math.floor(Math.random() * 255) + 1)+"."+ (Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0)+"."+(Math.floor(Math.random() * 255) + 0),
//     community: ()=> Math.random().toString(36).substring(7),
//     created_at: ()=> new Date(),
//     modify_at: ()=> null,
// });
//
// Factory.define('route_static', Routes, {
//     ip_source: () => '196.132.16.5',
//     next_hop: () => '192.0.1.2',
//     community: ()=> 'AS652',
//     created_at: ()=> new Date(),
//     modify_at: ()=> new Date(),
// });
//
//
// Routes.helpers({
//     showRoutes() {
//         return Routes.find({_id}, {sort: {cratedAt: -1}});
//     },
//     showIP( ipAddress ) {
//         return Routes.find({ $or: [{ip_source: ipAddress} , {next_hop: ipAddress}] });
//     },
//     showDate( date ) {
//         return Routes.find({ $or: [{created_at: date} , {modify_at: date}] });
//     },
//     sortCommunity() {
//         return Routes.find.sort({community: 1});
//     },
//     sortDate() {
//         return Routes.find.sort({created_at: -1});
//     }
// });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// import { Meteor } from "meteor/meteor";
// import { Routes } from "./routes.js";
// import { check } from 'meteor/check';
// import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//
// Meteor.methods({
//     'validate' : (route) => {
//         return Routes.schema.validate(route);
//     },
//
//     'routes.insert' : (ip_source, next_hop, community) => {
//         if(!Meteor.verifyParams.verifyIP(ip_source, false) || !Meteor.verifyParams.verifyIP(next_hop, true))
//             throw new Meteor.Error('routes.insert', 'IP Source address or next_hop address is not valid');
//         if(community != null)
//             check(community, String);
//
//         const route = {
//             ip_source,
//             next_hop,
//             community,
//             created_at: new Date(),
//             modify_at: null,
//         };
//
//         Routes.schema.validate(route);
//         return Routes.insert(route);
//     },
//
//     'routes.remove' : (selector) => {
//         return Routes.remove(selector);
//     },
//
//     'routes.update_ip' : (id_route, ip) => {
//         new SimpleSchema({
//             ip:
//                 {
//                     type: String,
//                     regEx: SimpleSchema.RegEx.IP,
//                 }
//         }).validate(ip);
//
//         const route = Routes.findOne(id_route);
//         if(route == null){
//             throw new Meteor.Error('routes.update_ip.unauthorized', 'Cannot find the route id or doesn\'t exist');
//         }
//
//         Routes.update(id-route, {$set: {ip_source: ip } });
//     },
//
//     'routes.update_nextHop' : (id_route, nextHop) => {
//         new SimpleSchema({
//             next_hop:
//                 {
//                     type: String,
//                     regEx: SimpleSchema.RegEx.IP,
//                 }
//         }).validate(nextHop);
//
//         const route = Routes.findOne(id_route);
//         if(route == null){
//             throw new Meteor.Error('routes.update_nextHop.unauthorized', 'Cannot find the route id or doesn\'t exist');
//         }
//
//         Routes.update(id-route, {$set: {next_hop: nextHop } });
//     },
//
//     'routes.update_community' : (id_route, Community) => {
//         new SimpleSchema({
//             community:
//                 {
//                     type: String,
//                 }
//         }).validate(Community);
//
//         const route = Routes.findOne(id_route);
//         if(route == null){
//             throw new Meteor.Error('routes.update_community.unauthorized', 'Cannot find the route id or doesn\'t exist');
//         }
//
//         Routes.update(id-route, {$set: {community: Community } });
//     },
//
//     'routes.update_status' : (id_route, Status) => {
//         new SimpleSchema({
//             activated:
//                 {
//                     type: Boolean,
//                 }
//         }).validate(Status);
//
//         const route = Routes.findOne(id_route);
//         if(route == null){
//             throw new Meteor.Error('routes.update_status.unauthorized', 'Cannot find the route id or doesn\'t exist');
//         }
//
//         Routes.update(id_route, {$set: {activated: Status } });
//     },
// });
