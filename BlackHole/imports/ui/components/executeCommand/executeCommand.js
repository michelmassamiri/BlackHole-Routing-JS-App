import './addRoute/addRoute.js';
import './showNeighbors/showNeighbors.js';
import './flow/flow.js';
import './eor/eor.js';
import './vpls/vpls.js';
import './executeCommand.html';


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
       const template_value = instance.find('#command').value;
        instance.command_template.set(template_value);
    },
});
