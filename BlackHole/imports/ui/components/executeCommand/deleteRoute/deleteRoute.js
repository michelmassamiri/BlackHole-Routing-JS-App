import './deleteRoute.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.delRoute.events({
    'click #submit-btn'(event) {

        let value = true;
        let command_name = "withdraw route";
        let ip = document.forms["delRoute"].elements["ip"].value;
        if( ip === "" || !Meteor.verifyParams.verifyIP(ip, false) ){ value = false;}
        let next_hop = document.forms["delRoute"].elements["next_hop"].value;
        if(next_hop === "" || !Meteor.verifyParams.verifyIP(next_hop, true) ){  value = false;}

        if(!value) {
            alert("ERROR : Please insert a valid IP address, Example :\n IP source :10.52.30.2/24\n next-hop : 123.14.3.20");
            return false;
        }

        if(next_hop !== "")
            next_hop = "next-hop ".concat(next_hop);

        let array_of_args = [command_name, ip, next_hop];
        Meteor.jsonCoder.initJsonCoder(array_of_args);
        let json_obj = Meteor.jsonCoder.formatToJson();

        Meteor.call('execute.command', json_obj, 'POST', (error, result)=> {
            if(error) {
                alert(error.reason + ' détails : ' + (error.details)? error.details : 'pas de détails');
            }
            else {
                sweetAlert('La route' + ip + ' ' + 'a été bien supprimé (withdraw)!');
            }
        });
    }
});
