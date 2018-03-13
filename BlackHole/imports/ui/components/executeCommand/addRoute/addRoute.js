import './addRoute.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.addRoute.events({
   'click #submit-btn'(event) {
      let command_name = "announce route";
      let champ1 = document.forms["addRoute"].elements["ip"].value;
      let champ2 = document.forms["addRoute"].elements["next_hop"].value;
      let champ3 = document.forms["addRoute"].elements["local-pref"].value;
      let champ4 = document.forms["addRoute"].elements["community"].value;

      let json =JSON.stringify({
          "command": command_name,
          "ip": champ1,
          "next_hop": champ2,
          "local_pref": champ3,
          "community": champ4,
      });

      let obj = JSON.parse(json);
      console.log(command_name, champ1, champ2, champ3, champ4);
      console.log(obj.command);
      console.log(json);

      Meteor.call('announceRoute', {data: obj});
    }
});
