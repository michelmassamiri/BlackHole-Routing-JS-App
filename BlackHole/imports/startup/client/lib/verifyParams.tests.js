import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import testVerifyParams from './verifyParams.js';

describe('Meteor.exaApi.verifyParams', function () {
   it('is_ip4 method returns true for a valid IP source address', function () {
       let ip_source = '192.21.45.42/24';
       chai.assert.strictEqual(testVerifyParams.is_ip4(ip_source, false), true);
   });

   it('is_ip4 method returns false for an invalid IP source address', function () {
       let ip_source = '123414.23.1245.23/32';
       let ip_source_2 = '192.145.3.22/56';
       let ip_source_3 = '192.44.22.13/error';
       let ip_source_4 = 'error.167.33.22/32';

       chai.assert.strictEqual(testVerifyParams.is_ip4(ip_source, false), false);
       chai.assert.strictEqual(testVerifyParams.is_ip4(ip_source_2, false), false);
       chai.assert.strictEqual(testVerifyParams.is_ip4(ip_source_3, false), false);
       chai.assert.strictEqual(testVerifyParams.is_ip4(ip_source_4, false), false);
   });

   it('is_ip4 method returns true for a valid next-hop IP address', function () {
       let next_hop = '192.168.0.1';
       chai.assert.strictEqual(testVerifyParams.is_ip4(next_hop, true), true);
   });

   it('is_ip4 method returns false for an invalid next-hop IP address', function () {
       let next_hop = '192.21.45.42/24';
       let next_hop_2 = 'error.192.123.45';
       let next_hop_3 = '12345.32.45.22';
       let next_hop_4 = '192.234.12.4.2';

       chai.assert.strictEqual(testVerifyParams.is_ip4(next_hop, true), false);
       chai.assert.strictEqual(testVerifyParams.is_ip4(next_hop_2, true), false);
       chai.assert.strictEqual(testVerifyParams.is_ip4(next_hop_3, true), false);
       chai.assert.strictEqual(testVerifyParams.is_ip4(next_hop_4, true), false);
   });

   it('is_ip6 method returns true for a valid IP6 address', function () {
       let ip6_source = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
       chai.assert.strictEqual(testVerifyParams.is_ip6(ip6_source), true);
   });

   it('is_ip6 method returns false for an invalid IP6 address', function () {
       let ip6_source = '2001:0db8:85a3:0000:0000:8a2e:0370:73sqd34';
       let ip6_source_2 = '2001:error:85a3:0000:0000:8a2e:0370:7334';
       let ip6_source_3 = '2001:0db8:85a3:0000:0000:8a2e:0370:7334.0db8';

       chai.assert.strictEqual(testVerifyParams.is_ip6(ip6_source), false);
       chai.assert.strictEqual(testVerifyParams.is_ip6(ip6_source_2), false);
       chai.assert.strictEqual(testVerifyParams.is_ip6(ip6_source_3), false);
   });

   it('verify_IP method returns true for a valid IP4 source or IP6 source address', function () {
       let ip4_source = '192.21.45.42/24';
       let ip6_source = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';

       chai.assert.strictEqual(testVerifyParams.verifyIP(ip4_source, false), true);
       chai.assert.strictEqual(testVerifyParams.verifyIP(ip6_source, false), true);
   });

   it('verify_IP method returns true for a valid next-hop IP4 or next-hop IP6 address', function () {
       let next_hop_ip4 = '192.168.0.1';
       let next_hop_ip6 = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';

       chai.assert.strictEqual(testVerifyParams.verifyIP(next_hop_ip4, true), true);
       chai.assert.strictEqual(testVerifyParams.verifyIP(next_hop_ip6, true), true);
   });

    it('verify_IP method returns false for an invalid IP4 source or IP6 source address', function () {
        let ip4_source = 'error.167.33.22/32';
        let ip6_source = '2001:0db8:85a3:0000:0000:8a2e:0370:73sqd34'

        chai.assert.strictEqual(testVerifyParams.verifyIP(ip4_source, false), false);
        chai.assert.strictEqual(testVerifyParams.verifyIP(ip6_source, false), false);
    });

    it('verify_IP method returns false for an invalid next-hop IP4 or next-hop IP6 address', function () {
        let next_hop_ip4 = '2001:1:1:1:1:1:255Z255X255Y255';
        let next_hop_ip6 = '2001:error:85a3:0000:0000:8a2e:0370:7334';

        chai.assert.strictEqual(testVerifyParams.verifyIP(next_hop_ip4, true), false);
        //chai.assert.strictEqual(testVerifyParams.is_ip6(next_hop_ip4), false);
        chai.assert.strictEqual(testVerifyParams.verifyIP(next_hop_ip6, true), false);
    });
});