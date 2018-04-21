import './addRoute/addRoute.js';
import './deleteRoute/deleteRoute.js';
import './showNeighbors/showNeighbors.js';
import './flow/flow.js';
import './eor/eor.js';
import './vpls/vpls.js';
import './executeCommand.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.executeCommand.onCreated(function returnTemplate(){
   this.command_template = new ReactiveVar("");
});

Template.executeCommand.helpers({
    showCommandTemplate(){
        const instance = Template.instance();
        const template_name = instance.command_template.get();
        return template_name;
    }
});

Template.executeCommand.events({
   'click #submit-btn'(event, instance) {
       if(!Meteor.exaApi.checkExaIsRunning()){
           alert("ExaBGP is not working !, it is not possible to execute ExaBGP commands");
           return;
       }

       const commands_to_execute = ['restart', 'reload', 'shutdown'];
       const template_value = instance.find('#command').value;
       let command;

       for(let i = 0 ; i < commands_to_execute.length ; ++i) {
           if(template_value === commands_to_execute[i]) {
               command = commands_to_execute[i];
               let array_of_args = [];
               array_of_args[0] = command;

               Meteor.jsonCoder.initJsonCoder(array_of_args);

               Meteor.call('execute.command', Meteor.jsonCoder.formatToJson(), 'POST', (err, res)=> {
                  if(err) {
                      alert(err.reason + 'details : ' + (err.details)? err.details : 'no details');
                  }
                  else {
                      if(command.includes('shutdown') && !Meteor.exaApi.checkExaIsRunning()) {
                          sweetAlert('Done !: '+ command + ' has been successfully executed');
                          return;
                      }

                      sweetAlert('Done !: '+ command + ' has been successfully executed');
                  }
               });
           }

       }
        instance.command_template.set(template_value);
    },
});
