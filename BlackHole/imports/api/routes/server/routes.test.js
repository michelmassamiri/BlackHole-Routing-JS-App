import { Factory } from 'meteor/dburles:factory';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Routes } from '../routes.js';
import { insertRoute, removeRoute, updateRoute } from '../routes-methods.js';

//import './publication.js';

describe('routes', () => {
  describe('methods', () => {
    beforeEach( () => {
      resetDatabase();
    });
    describe('insert', () => {
      it('add routes in dbb', () => {
          const route = {
              ip_source: '192.165.63.50',
              next_hop: '0.0.55.3',
              community: 'AS652',
              activated: true,
              created_at: new Date(),
          };
          try{
              insertRoute.call(route);
          }catch(e){
            assert(false);
          }
          assert.equal(Routes.find().count(), 1);
        });
    });
    describe('remove', () => {
      it('delete a route to dbb', () => {
        removeRoute.call(0);
        assert.equal(Routes.find().count(), 0);
      });
    });
  });
  describe('updateRoute', () => {
    it('changes ip_source attribut', () => {
      const route = {
          ip_source: '192.165.63.50',
          next_hop: '0.0.55.3',
          community: 'AS652',
          activated: true,
          created_at: new Date(),
      };
      try{
          insertRoute.call(route);
      }catch(e){
        assert(false);
      }

      const ip = {"ip_source": "1.1.1.1"};
      updateRoute.call([route, ip]);

      let output = Routes.findOne();

      if(output.ip_source === ip.ip_source){
        assert(true);
      }else{
        assert(false);
      }
    });
    it('changes next_hop attribut', () => {
      const route = {
          ip_source: '1.1.1.1',
          next_hop: '0.0.55.3',
          community: 'AS652',
          activated: true,
      };
      const new_next_hop = {"next_hop": "2.2.2.2"};

      updateRoute.call([route, new_next_hop]);

      let output = Routes.findOne();

      if(output.next_hop === new_next_hop.next_hop){
        assert(true);
      }else{
        assert(false);
      }
    });
    it('changes community', () =>{
      const route = {
          ip_source: '1.1.1.1',
          next_hop: '2.2.2.2',
          community: 'AS652',
          activated: true,
      };
      const new_com = {"community": "64501"};

      updateRoute.call([route, new_com]);

      let output = Routes.findOne();

      if(output.community === new_com.community){
        assert(true);
      }else{
        assert(false);
      }
    });
  });
});
