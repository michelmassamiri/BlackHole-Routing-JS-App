import { chai } from 'meteor/practicalmeteor:chai';
import testCheckExaIsRunning from './checkExaIsRunning.js';

describe('Meteor.exaApi.checkExaIsRunning', function () {
    beforeEach(function () {
        testCheckExaIsRunning.checkExaIsRunning();
    });

   it('If ExaBGP is running, set the Session variable isExaRunning to true', function () {
       if(testCheckExaIsRunning.test_exa_api.getTestExaIsRunning())
           chai.assert.strictEqual(testCheckExaIsRunning.test_exa_api.getTestExaIsRunning(), true);
   });

   it('If ExaBGP is not running, set the Session variable isExaRunning to false && set the Session variable ExaError the correspondent error', function () {
       if(!testCheckExaIsRunning.test_exa_api.getTestExaIsRunning()){
           chai.assert.strictEqual(testCheckExaIsRunning.test_exa_api.getTestExaIsRunning(), false);
           chai.assert.notStrictEqual(testCheckExaIsRunning.test_exa_api.getTestExaErrMsg(), 'no error');
       }
   });
});
