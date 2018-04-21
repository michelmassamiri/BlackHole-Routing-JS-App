import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';
import {Meteor} from "meteor/meteor";


/**
 * @desc : Check if the response from the server has any possible errors.
 * @param  exa_res - ExaBGP response (string).
 * @throws a new Meteor.Error('execute.command') with an error message.
 * @returns an array which contains the error message and error message details if there was an error.
 */
const checkError = function checkError(exa_res) {
    let error_msg, error_msg_details;

    check(exa_res.content, String);
    if(exa_res.statusCode !== 200) {
        error_msg = "You can't send commands to ExaBGP";
        error_msg_details = "ExaBGP server returned message :  " + exa_res.content + " with a ExaServer code :" + exa_res.statusCode ;
        throw new Meteor.Error('execute.command', error_msg, error_msg_details);
    }

    if(exa_res.content.includes('error')) {
        error_msg = "ExaBGP couldn't execute the command";
        throw new Meteor.Error('execute.command', error_msg);
    }

    //check if we ExaBGP has executed the command and returned a valid response
    if(!(exa_res.content.includes('Success')) || !(exa_res.content.includes('done'))) {
        error_msg = "Message from ExaBGP server is incomplete or invalid";
        throw new Meteor.Error('execute.command', error_msg);
    }

};

Meteor.methods({
    'execute.command' : (command, request_method) => {
        let options = {};
        check(request_method, String);
        request_method = request_method.toUpperCase();
        if(request_method === 'POST') {
            check(command, Object);
            options = {
                data: command
            }
        }
        else if(request_method === 'GET') {
            check(command, String);
            options = {
                params: {
                    "command": command,
                }
            }
        }

        try {
            var exa_res = HTTP.call(request_method, 'http://localhost:5001/', options);
            checkError(exa_res);

            let exa_res_msg = exa_res.content.replace("Success:", "");
            exa_res_msg = exa_res_msg.replace("done", "");

            return exa_res_msg;
        }
        catch(e) {
            if(e.error === 'execute.command' && e.reason!== '')
                throw new Meteor.Error('execute.command', e.reason, e.details);

            throw new Meteor.Error('execute.command', "Network Error from HTTP requests : check the ExaBGP server");
        }
    },
});