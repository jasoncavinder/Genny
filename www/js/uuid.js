angular.module('uuid', []).

factory('uuid', function() {
    /**
     * Fast UUID generator, RFC4122 version 4 compliant.
     * @author Jeff Ward (jcward.com).
     * @license MIT license
     * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
     **/
    /**
     * Modified by 
     * @author Jason Cavinder (https://github.com/jasoncavinder)
     * to include suggested changes by
     * Dave (http://stackoverflow.com/users/1180785/dave)
     **/
    var self = {};
    var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
    self.generate = function() {
        var d0 = crypto.getRandomValues(new Uint32Array(1))[0]>>>0;
        var d1 = crypto.getRandomValues(new Uint32Array(1))[0]>>>0;
        var d2 = crypto.getRandomValues(new Uint32Array(1))[0]>>>0;
        var d3 = crypto.getRandomValues(new Uint32Array(1))[0]>>>0;
        return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
            lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
            lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
            lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
        };
    return self;
});
