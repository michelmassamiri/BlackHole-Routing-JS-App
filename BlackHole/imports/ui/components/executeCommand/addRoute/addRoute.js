import './addRoute.html';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.addRoute.events({
   'click #submit-btn'(event) {
      var command_name = "announce route";
      var champ1 = document.forms["addRoute"].elements["ip"].value;
      var champ2 = document.forms["addRoute"].elements["next_hop"].value;
      var champ3 = document.forms["addRoute"].elements["local-pref"].value;
      var champ4 = document.forms["addRoute"].elements["community"].value;

      var json =JSON.stringify({
          "command": command_name,
          "ip": champ1,
          "next_hop": champ2,
          "local_pref": champ3,
          "community": champ4,
      });


      console.log(command_name, champ1, champ2, champ3, champ4);
      console.log(json.command);
      console.log(json);

      Meteor.call('post', 'http://localhost:5001/', {data: json});
    }
});
