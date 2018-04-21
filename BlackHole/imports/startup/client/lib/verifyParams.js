/*
* VerifyParams is a JS script which defines an verifyParams object.
* the verifyParams object has methods which check the user params.
*
*/
import { Meteor } from 'meteor/meteor';

Meteor.verifyParams = {
    is_ip4: function(ip_address, is_next_hop) {

        let network_part = [];
        if(!is_next_hop) {
            network_part = ip_address.split('/');
            if(isNaN(network_part[1])){
                return false ;
            }

            if(network_part.length > 2 || (parseInt(network_part[1]) > 32))
                return false ;
        }
        else {
            network_part[0] = ip_address;
        }

        let parts = network_part[0].split('.');

        if (parts.length > 4)
            return false;

        for (let i = 0; i < parts.length; i++)
        {
            if (!parts[i].match(/^[0-9]+$/) || parseInt(parts[i]) > 255)
                return false;
        }
        return true;
    },

    is_ip6: function(ip_address) {
        let ipv6 = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/;

        return ipv6.test(ip_address);
    },

    verifyIP: function(ip_address, is_next_hop) {
        //test ipv4
        let bool_ipv4;

        if (this.is_ip4(ip_address, is_next_hop))
            bool_ipv4 = true;
        else
            bool_ipv4 = false;

        //test ipv6
        let bool_ipv6;
        if (this.is_ip6(ip_address))
            bool_ipv6 = true;
        else
            bool_ipv6 = false;

        return bool_ipv4 || bool_ipv6;
    }
};

export default testVerifyParams = Meteor.verifyParams ;