import { Meteor } from  'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './listCommand.html';

Template.listCommand.onCreated(function getVersion() {
    this.exa_version = new ReactiveVar("");
    this.is_exa_running = new ReactiveVar("");

    Meteor.call('execute.get.command', 'show version', (error, response)=> {
      if(error) {
          alert(error);
      }  else {
          this.exa_version.set(response);
      }
    });

    Meteor.call('execute.post.command', 'is running', (error, is_running)=> {
       if(error) {
           alert(error);
       }
       else {
           this.is_exa_running.set(is_running);
       }
    });
});

Template.listCommand.helpers({
    isRunning() {
        const instance = Template.instance();
        return instance.is_exa_running.get() === 'True';
    },

   getResult() {
       const instance = Template.instance();
       return instance.exa_version.get();
   }
});