import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
  'post' (url, options) {
    try{
          HTTP.post(url, options);
    }catch (e) {
      console.log(e);
    }

  }
});
