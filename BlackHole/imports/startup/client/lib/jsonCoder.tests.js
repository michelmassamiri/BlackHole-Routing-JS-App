import { chai } from 'meteor/practicalmeteor:chai';
import testJsonCoder from './jsonCoder.js';

describe('Meteor.jsonCoder', function () {
   it('initJsonCoder method should not initialize if the array passed as parameter is null', function () {
       const array_of_args = [];
       try {
           testJsonCoder.initJsonCoder(array_of_args);
       }
       catch(e) {
           chai.assert.strictEqual('Meteor.jsonCoder', e.error);
       }
   });

   it('initJsonCoder method initialize the command_args attribute if the array passed as a parameter has on element', function () {
       const array_of_args = ['this is a test'];
       const expected_value = {
           "command": 'this is a test',
       };
       testJsonCoder.initJsonCoder(array_of_args);

       chai.assert.deepEqual(expected_value, testJsonCoder.command_args);
   });

   it('initJsonCoder method initialize the command_args attribute if the array passed as a parameter has args', function () {
       const array_of_args = ['this is a command', 'first arg', 'second arg'];
       const expected_value = {
           "command": 'this is a command',
           "arg1": 'first arg',
           "arg2": 'second arg'
       };
       testJsonCoder.initJsonCoder(array_of_args);

       chai.assert.deepEqual(expected_value, testJsonCoder.command_args);
   });

   it('formatToJson encodes an array of string in a JSON format object', function () {
       const array_of_args = ['this is a command', 'first arg', 'second arg'];
       testJsonCoder.initJsonCoder(array_of_args);

       const expected_value = {
           command: 'this is a command',
           arg1: 'first arg',
           arg2: 'second arg',
       };

       chai.assert.deepEqual(expected_value, testJsonCoder.formatToJson());
   });
});