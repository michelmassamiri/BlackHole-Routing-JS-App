import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Routes } from "./routes.js";

/**
* @desc Method which insert document in data base
* @param route: is the new document to be inserted
**/
export const insertRoute = new ValidatedMethod({
  name:'Routes.methods.insert',
  validate:null,
  run(route) {
    Routes.insert(route, {validate: false});
  },
});

/**
* @desc Method wich remove document in data base
* @param route_id: is the document selector to be removed
**/
export const removeRoute = new ValidatedMethod({
  name: 'Routes.methods.remove',
  validate: null,
  run(route_id){
    const route = Routes.findOne(route_id);
    if(route != null)
      Routes.remove(route_id);
  },
});

/**
* @desc Method wich remove document in data base
* @param Route: is the table which contain a selector and the document of update attribut
**/
export const updateRoute = new ValidatedMethod({
  name:'Routes.methods.update',
  validate:null,
  run(Route){
    let id = Route[0];
    let route = Route[1];

    Routes.update(id, {$set: route}, {validate: false});
    let date = new Date();
    Routes.update(route, {$set: {"modify_at": date}}, {validate: false});
  }
});