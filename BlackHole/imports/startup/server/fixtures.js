// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    Meteor.call('execute.post.command', 'is running', (error, result) => {
        if(error) {
            console.log(error.message);
        }
        else {
            if(result === 'True') {
                console.log('ExaBgp is running !\n');
            }
            else {
                console.log(result);
                console.log('ExaBGP is not running :(\n');
            }
        }
    });
});
