import { Meteor } from  'meteor/meteor';
import { Template } from 'meteor/templating';

import './showNeighbors.html';

Template.showNeighbors.events({
    'click #submit-btn'(event, template) {
        event.preventDefault();
        let command = 'show neighbor summary';

        let neighbor_ip = template.find('#neighbor-ip').value;
        if(neighbor_ip !== ""){
            command.concat(' ' + neighbor_ip);
        }

        Meteor.call('execute.command', command, 'GET', (error, res) => {
           if(error) {
               alert(error.reason);
           }
           else {
               template.find('#command-result').innerHTML = res;
           }
        });
    }
});