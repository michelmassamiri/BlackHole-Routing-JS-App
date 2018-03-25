import { Meteor } from  'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './listCommand.html';


Template.listCommand.onCreated(function getVersion() {
    this.exa_version = new ReactiveVar("");
});

Template.listCommand.helpers({
    showErrorisRunning() {
        return Session.get('ExaError');
    },

   getResult() {
        const instance = Template.instance();
        Meteor.call('execute.command', 'show version', 'GET', (error, response)=> {
           if(error) {
               instance.exa_version.set(error.reason);
           }  else {
               instance.exa_version.set(response);
           }
        });
        return instance.exa_version.get();
   }
});

Template.registerHelper('isExaRunning', () => {
    return Meteor.exaApi.checkExaIsRunning();
});
