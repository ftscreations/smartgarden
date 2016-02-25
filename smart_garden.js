Tasks = new Mongo.Collection("tasks");

var collectionID = "YS5Y3nDqaojXYXnZz"; 
//localID: 5afHEbWwpT7BoDjXT
//remoteID: YS5Y3nDqaojXYXnZz

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({});
    },
    ledValue: function(){
      var value = true;
      $.getJSON( "http://10.11.17.84:3000/led", function( data ) {
        $.each( data, function( key, val ) {
          console.log("Data is:", key, val);
        });
      });
      if(value){
        return '<button type="button" id="toggleLights" class="btn btn-warning" data-toggle="off"><span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span> Turn Off Lights</button>';
      }else{
        return '<button type="button" id="toggleLights" class="btn btn-warning" data-toggle="on"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Turn On Lights</button>';
      }
    }
  });
  Template.dataNow.helpers({
    lightPercentage: function(){
      console.log(this);
      return "70%";
    },
    realTimeLight: function(){
      var lightValue = parseInt(Tasks.findOne(collectionID).lightSensor)
      return lightValue + "%";
    },
    realTimeLight15: function(){
      var inc = parseInt(Tasks.findOne(collectionID).lightSensor) + 5;
      return inc + "%";
    },
    realTimeTemp: function(){
      return parseInt(Tasks.findOne(collectionID).tempSensor);
    },
    realTimeTempHeight: function(){
      var lightValue = (parseInt(Tasks.findOne(collectionID).tempSensor) / 100) * 262
      return lightValue;
    },
    realTimeSoil: function(){
      var lightValue = parseInt(Tasks.findOne(collectionID).moistureSensor)
      return lightValue + "%";
    },
    realTimeSoil15: function(){
      var inc = parseInt(Tasks.findOne(collectionID).moistureSensor) + 5;
      return inc + "%";
    },
    realTimeWater: function(){
      var waterValue = parseInt(Tasks.findOne(collectionID).waterSensor)
      return waterValue + "%";
    },
    realTimeWater15: function(){
      var inc = parseInt(Tasks.findOne(collectionID).waterSensor) + 5;
      return inc + "%";
    },
  });
  Template.body.events({
    "click #toggleLights":function(event, template){
      var turnTo = $(event.target).data("toggle");
      if(turnTo == "on"){
        $.get( "http://10.11.17.84:3000/led/on", function( data ) {
          alert( "Load was performed." );
        });
        $(event.target).data("toggle", "off");
        $(event.target).html('<span class="glyphicon glyphicon-eye-close" aria-hidden="true"></span> Turn Off Lights');
      }else{
        $.get( "http://10.11.17.84:3000/led/off", function( data ) {
          alert( "Load was performed." );
        });
        $(event.target).data("toggle", "on");
        $(event.target).html('<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Turn On Lights');
      }
    },
    "click #waterPlants":function(event, template){
        $.get( "http://10.11.17.84:3000/water/on", function( data ) {
          alert( "Load was performed." );
        });
    }
  });
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish('tasks', function() {
      return Tasks.find({}); 
    });
  });
}