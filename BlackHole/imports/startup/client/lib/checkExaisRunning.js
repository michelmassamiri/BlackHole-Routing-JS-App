import { Meteor } from 'meteor/meteor';
import {Session} from 'meteor/session';


Meteor.exaApi = {
    checkExaIsRunning : function () {
        let array_of_args = ['is running'];
        Meteor.jsonCoder.initJsonCoder(array_of_args);
        let json_obj = Meteor.jsonCoder.formatToJson();

        Meteor.call('execute.command', json_obj, 'POST', (error, is_running)=> {
            if(error) {
                Session.set('isExaRunning', false);
                Session.set('ExaError', error.reason);
            }
            else {
                if(is_running.includes('True')) {
                    Session.set('isExaRunning', true);
                }
                else {
                    Session.set('isExaRunning', false);
                }
            }
        });

        return Session.get('isExaRunning');
    },
};