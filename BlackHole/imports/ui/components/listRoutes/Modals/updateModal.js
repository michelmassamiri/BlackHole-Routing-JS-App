import './updateModal.html';

Template.updateModal.onRendered( () => {
  var _this = Template.currentData();

  document.getElementById('ip_source').value = _this.ip_source;
  document.getElementById('next-hop').value = _this.next_hop;
  document.getElementById('pref-local').value = _this.local_pref;
  document.getElementById('community').value = _this.community;
});

Template.updateModal.events({
  'click #save-update'(event) {
    var _this = Template.currentData();

    //announced new route update
    let value = true;
    let command_name = "announce route";
    let ip = document.forms["update"].elements["ip_source"].value;
    if( ip === "" || !Meteor.verifyParams.verifyIP(ip, false) ){ value = false;}
    let next_hop = document.forms["update"].elements["next-hop"].value;
    if(next_hop === "" || !Meteor.verifyParams.verifyIP(next_hop, true) ){  value = false;}
    let pref = document.forms["update"].elements["pref-local"].value;
    let community = document.forms["update"].elements["community"].value;

    if(!value) {
        alert("ERROR : Please insertRoute a valid IP address, Example :\n IP source :10.52.30.2/24\n next-hop : 123.14.3.20");
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
            let err_details = (error.details)? error.details : 'pas de détails';
            let msg = error.reason + " détails : " + err_details;
            alert(msg);
        }
    });

    //delete old route
    command_name = "withdraw route";
    let ip_old = _this.ip_source;
    let next_hop_old = _this.next_hop;
    let pref_old = _this.local_pref;
    let community_old = _this.community;

    next_hop_old = "next-hop ".concat(next_hop_old);
    if(pref_old !== "")
        pref_old = "local-preference ".concat(pref_old);
    if(community_old !=="")
        community_old = "community ".concat(community_old);
    array_of_args = [command_name, ip_old, next_hop_old, pref_old, community_old];
    Meteor.jsonCoder.initJsonCoder(array_of_args);
    json_obj = Meteor.jsonCoder.formatToJson();

    Meteor.call('execute.command', json_obj, 'POST', (error, result)=> {
        if(error) {
            let err_details = (error.details)? error.details : 'pas de détails';
            let msg = error.reason + " détails : " + err_details;
            alert(msg);
        }
    });

    //update bdd
    const route = {
      ip_source: ip,
      next_hop: document.forms["update"].elements["next-hop"].value,
      community: document.forms["update"].elements["community"].value,
    };

    let ind;
    if(_this.community === ""){
      ind ={"ip_source":_this.ip_source, "next_hop": _this.next_hop};
    }else {
      ind ={"ip_source":_this.ip_source, "next_hop": _this.next_hop, "community": _this.community};
    }

    Meteor.call('Routes.methods.update', [ind, route]);

    Modal.hide(this);
  },
});
