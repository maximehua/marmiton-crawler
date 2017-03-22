// Meteor.startup(function () {
//     var Particle = require('particle-api-js');
//     particle = new Particle();
//
//     token = process.env.PARTICLEAUTH;
//     if (typeof token === "undefined") {
//             token = Meteor.settings.PARTICLEAUTH;
//     }
//     console.log(token);
//     deviceId = process.env.PARTICLEDEVICE;
//     if (typeof deviceId === "undefined") {
//             deviceId = Meteor.settings.PARTICLEDEVICE;
//     }
//     console.log(deviceId);
//
//     var devicesPr = particle.listDevices({ auth: token });
//     devicesPr.then(
//       function(devices){
//         console.log('Devices: ', devices);
//       },
//       function(err) {
//         console.log('List devices call failed: ', err);
//       }
//     );
//
//
// });
//
// Meteor.methods({
//     sendToParticle : function( func, param ){
//         console.log("------");
//         console.log(func + " --> " + param);
//         console.log("------");
//         var fnPr = particle.callFunction({
//             deviceId: deviceId,
//             name: func,
//             argument: param,
//             auth: token,
//           });
//
//         fnPr.then(
//           function(data) {
//             console.log('Function called succesfully:', data);
//           }, function(err) {
//             console.log('An error occurred:', err);
//           });
//     }
//
// })
