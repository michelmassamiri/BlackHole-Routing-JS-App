/*
* JsonCoder object has for missions to encode a JS dict in JSON object.
* the JSON string has the followed format :
* {"command": command-name, "arg1": arg1, "arg2": arg2,...,"argn": argn}
* The initJsonCoder is method that initialize an array which has command name followed by the command's args.
* The formatToJson returns a formatted JSON obj
 */
import { Meteor } from 'meteor/meteor';

Meteor.jsonCoder = {
    command_args: "",
    initJsonCoder: function(array_of_args) {
        if (array_of_args.length === 0) {
            this.command_args = null;
            throw new Meteor.Error('Meteor.jsonCoder', 'The array passed to the parameters is null !', 'Please pass a valid array');
        }
        this.command_args = {
            "command":array_of_args[0],
        };

        for(let i = 1; i < array_of_args.length; ++i) {
            this.command_args["arg"+i.toString()] = array_of_args[i];
        }
    },

    formatToJson: function() {
        let json_obj = JSON.stringify(this.command_args);
        return JSON.parse(json_obj);
    }
};

export default testJsonCoder = Meteor.jsonCoder;