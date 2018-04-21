import { Meteor } from 'meteor/meteor';
import {Session} from 'meteor/session';

/*
* This class is used in the Meteor.exaApi in order to test the method 'checkExaIsRunning' in checkExaIsRunning.test.js.
* Session object can't be imported or checked in 'test' mode(Session is undefined in 'test' mode) which why we have Meteor.ExaStatusTest object instead.
* Meteor.exaApi object compose the ExaStatus object (ExaStatus is created when Meteor.exaApi is created)
*/

class ExaStatus {
  constructor() {
      this.test_exa_is_running = false;
      this.test_exa_err_msg = '';
    }

    setTestExaIsRunning(test_exa_is_running) {
        this.test_exa_is_running = test_exa_is_running;
    }

    setTestExaErrMsg(test_exa_err_msg) {
        this.test_exa_err_msg = test_exa_err_msg;
    }

    getTestExaErrMsg() {
        return this.test_exa_err_msg;
    }

    getTestExaIsRunning() {
        return this.test_exa_is_running;
    }
}

Meteor.exaApi = {
    test_exa_api: new ExaStatus(),

    checkExaIsRunning : function () {
        let array_of_args = ['is running'];
        Meteor.jsonCoder.initJsonCoder(array_of_args);
        let json_obj = Meteor.jsonCoder.formatToJson();

        Meteor.call('execute.command', json_obj, 'POST', (error, is_running)=> {
            if(error) {
                Session.set('isExaRunning', false);
                Session.set('ExaError', error.reason);

                if(Meteor.isTest || Meteor.isAppTest) {
                    this.test_exa_api.setTestExaErrMsg(error.reason);
                    this.test_exa_api.setTestExaIsRunning(false);
                }

            }
            else {
                if(is_running.includes('True')) {
                    Session.set('isExaRunning', true);
                    if(Meteor.isTest || Meteor.isAppTest)
                        this.test_exa_api.setTestExaIsRunning(true);
                }
                else {
                    Session.set('isExaRunning', false);
                    Session.set('ExaError', 'ExaBGP is not running (server is running)');
                    if(Meteor.isTest || Meteor.isAppTest) {
                        this.test_exa_api.setTestExaIsRunning(false);
                        this.test_exa_api.setTestExaErrMsg('ExaBGP is not running (server is running)');
                    }
                }
             }
        });

        return Session.get('isExaRunning');
    },
};

export default testCheckExaIsRunning = Meteor.exaApi;