import '../../stylesheets/listRoutes.css';
import './Modals/updateModal.js';
import './listRoutes.html';


import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Routes } from '../../../api/routes/routes.js';

Template.listRoutes.onCreated( () =>{
    this.isReady = new ReactiveVar("");
    const handle = Meteor.subscribe('listsRoutes');
    Tracker.autorun(() => {
      const isReady = handle.ready();
      console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);
      this.isReady.set(isReady);
    });
});

Template.listRoutes.helpers({
  'routes' : () => {
    if(this.isReady.get()){
        return Routes.find({});
    }else{
        return [];
    }
  },

  'increment': (index) => {
    return index +1;
  },

  'isActivate': (activate) => {
    if(activate){
      return "enable";
    }else{
      return "disable";
    }
  },
});

Template.listRoutes.events({
  'click #search'(event) {
    // let ip = document.getElementById("input-search").value;
    // Meteor.subscribe('findIP', ip);
  },
  'click #reload-btn'(event) {
    // Meteor.subscribe('listsRoutes');
  },
  'click #activate'(event, template) {
    let ip = template.$(event.target).data('ip_source');
    let next_hop = template.$(event.target).data('next-hop');
    let pref = ""//template.$(event.target).data('pref-local');
    let community = template.$(event.target).data('community');
    if(community === undefined)
      community = "";
    let status = template.$(event.target).data('status');
    console.log(status);
    let command_name;
    if(status === true){
      command_name = "withdraw route"
    }else {
      command_name = "announce route"
    }

    //activated or desactivated in exabgp
    let com;
    let next_Hop = "next-hop ".concat(next_hop);
    if(pref !== "")
        pref = "local-preference ".concat(pref);
    if(community !=="")
        com = "community ".concat(community);

    let array_of_args = [command_name, ip, next_Hop, pref, com];
    Meteor.jsonCoder.initJsonCoder(array_of_args);
    let json_obj = Meteor.jsonCoder.formatToJson();

    Meteor.call('execute.command', json_obj, 'POST', (error, result)=> {
        if(error) {
            let err_details = (error.details)? error.details : 'pas de détails';
            let msg = error.reason + " détails : " + err_details;
            alert(msg);
        }
    });

    //update status in dbb

    let ind;
    if(community === ""){
      ind ={"ip_source":ip, "next_hop": next_hop};
    }else {
      ind ={"ip_source":ip, "next_hop": next_hop, "community": community };
    }

    Meteor.call('Routes.methods.updateStatus', [ind, {"activated": !status}]);
  },
  'click #mod-2'(event, template) {
    let ip = template.$(event.target).data('ip_source');
    let next_hop = template.$(event.target).data('next-hop');
    let pref_local = "";//template.$(event.target).data('pref-local');
    let community = template.$(event.target).data('community');
    if(community === undefined)
      community = "";
    let data_contexte = {"ip_source":ip, "next_hop": next_hop, "local_pref":pref_local, "community": community};

    setTimeout(function(){
        Modal.show('updateModal', data_contexte);
    }, 0)
  },
  'click #delete-2'(event) {
    let ip_source = document.getElementById('delete-2').getAttribute('ip_source');
    let next_hop = document.getElementById('delete-2').getAttribute('next-hop');
    let community = document.getElementById('delete-2').getAttribute('community');

    const ind = {"ip_source" : ip_source, "next_hop": next_hop, "community": community};

    Meteor.call('Routes.methods.remove', ind);

  },
})
