/* Routes Api goes here */

import { Mongo } from 'meteor/mongo';
import { Factory } from 'meteor/dburles:factory';
/*
 *  This api is accessible from both: client and server.
 *  This script contains the 'routes' module in order to announce, update, delete routes.
*/

//HERE We have to create a 'Routes' collection with this way :
/* Define routes collection here */
export const Routes = new Mongo.Collection('routes');

// Deny all client-side updates since we will be using methods to manage this collection
Routes.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
/**
* @desc schema which filtre document
**/
Routes.schema = new SimpleSchema({
  ip_source: {
    type: String,
    regEx: SimpleSchema.RegEx.IP,
  },
  next_hop: {
    type: String,
    regEx: SimpleSchema.RegEx.IP,
  },
  community: {
    type: String,
    max: 100,
    optional: true,
  },
  activated: {
    type: Boolean,
  },
  created_at: {
    type: Date,
    //denyUpdate: true,
  },
  modify_at: {
    type: Date,
    autoValue: function () {
        if(this.isUpdate) {
          return new Date();
        }
    }
  }
});

Routes.attachSchema(Routes.schema);
