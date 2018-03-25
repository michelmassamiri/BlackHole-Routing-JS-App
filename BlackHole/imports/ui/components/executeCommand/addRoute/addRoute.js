import './addRoute.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.addRoute.events({
   'click #submit-btn'(event) {

      let value = true;
      let command_name = "announce route";
      let ip = document.forms["addRoute"].elements["ip"].value;
      if( ip === "" || !Meteor.verifyParams.verifyIP(ip, false) ){ value = false;}
      let next_hop = document.forms["addRoute"].elements["next_hop"].value;
      if(next_hop === "" || !Meteor.verifyParams.verifyIP(next_hop, true) ){  value = false;}
      let pref = document.forms["addRoute"].elements["local-pref"].value;
      let community = document.forms["addRoute"].elements["community"].value;
      //if(community === ""){ value = false;}

      if(!value) {
          alert("ERROR : Please insert a valid IP address, Example :\n IP source :10.52.30.2/24\n next-hop : 123.14.3.20");
          return false;
      }

      next_hop = "next-hop ".concat(next_hop);
      if(pref !== "")
          pref = "local-preference ".concat(pref);
      if(community !=="")
          community = "community ".concat(community);

      let array_of_args = [command_name, ip, next_hop, pref, community];
      Meteor.jsonCoder.initJsonCoder(array_of_args);
      let json_obj = Meteor.jsonCoder.formatToJson();

      Meteor.call('execute.command', json_obj, 'POST', (error, result)=> {
          if(error) {
              alert(error.reason + ' détails : ' + (error.details)? error.details : 'pas de détails');
          }
          else {
              sweetAlert('La route' + ip + ' ' + 'a été bien annoncée !');
          }
      });
    }
});
