import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';
import {Meteor} from "meteor/meteor";

Meteor.methods({
    'execute.get.command' : (command) => {
        check(command, String);

        var exa_res = HTTP.get('http://localhost:5001/', {
            params: {
                "command": command,
            }
        });

        check(exa_res.content, String);
        if(exa_res.statusCode !== 200) {
            return "Can't send commands to ExaBGP !";
        }

        //check if we ExaBGP has executed the command and returned a valid response
        if(!(exa_res.content.includes("Success") || !(exa_res.content.includes("done")))) {
            //return exa_res.content;
            return 'ExaBGP returned an invalid or incomplete message from the server';
        }
        let exa_res_msg = exa_res.content.replace("Success: ", "");
        exa_res_msg = exa_res_msg.replace("done", "");

        return exa_res_msg;
    },

    'execute.post.command' : (command) => {
        check(command, String);

        var exa_res = HTTP.post('http://localhost:5001/', {
            params: {
                "command": command,
            }
        });

        check(exa_res.content, String);
        if(exa_res.statusCode !== 200) {
            return "Can't send commands to ExaBGP !";
        }

        return exa_res.content;
    }

});