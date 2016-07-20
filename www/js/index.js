console.log("loading index.js...");

//var genny = ons.bootstrap([]);

var genny = angular.module("genny", ["onsen"]).

constant('version', {
    full: '0.1.0',
    major: '0',
    minor: '1',
    dot: '3',
    codeName: "..."
}).

service('diceCalculator', function diceCalculator() {
    var supportedNotations = {
        standard: {common: "AdX+B", valid: "", invalidChars: "[^0-9d%\+\-\*" }
    };
    this.notations = function() { return supportedNotations.keys() };
    
    this.roll = function(dice) {
        console.log("rolling dice");
        console.log(dice);
        dice = (dice == "") ? "0" : dice;
        console.log(dice);
        var roll = 0;
        for (var i = 0; i < arguments.length; i++) {
            var dice = arguments[i].toString().toLowerCase();
            var dPos = dice.indexOf("d");
            var multi = 0, sides = 1;
            if (dPos == -1) {
                multi = parseInt(dice, 10);
            } else {
                multi = parseInt(dice.slice(0, dPos), 10);
                sides = parseInt(dice.slice(dPos+1, dice.length), 10);
            }
            console.log(multi);
            console.log(sides);
            if (Number.isNaN(multi) && Number.isNaN(sides)) {
                return 0;
            }
            multi = Number.isNaN(multi) ? 1 : multi;
            sides = Number.isNaN(sides) ? 1 : sides;
            for (i = 0; i < multi; i++) {
                roll += Math.floor(Math.random() * sides) + 1;
            }
        }
        return roll;
    };
}).

controller('TabbarCtrl', ['$scope', 'version', function TabbarCtrl($scope, version) {
    $scope.genny = { version: version };
}]).

controller('HomePageCtrl', ['$scope', function HomePageCtrl($scope) {
}]).

controller('DiceBagCtrl', function($scope, diceCalculator) {
//controller('DiceBagCtrl', ['$scope', 'diceCalculator', function DiceBagCtrl($scope, diceCalculator) {
    $scope.dice = {
        text: "1d4",
        result: ""
    };
    
    $scope.$watch('dice.text', function() {
        $scope.dice.result = diceCalculator.roll($scope.dice.text);
    });
//    
//    ons.ready(function() {
//        console.log("ready");
//        console.log($scope.dice);
////        $scope.dice.text = "asdf";
//    });
//}])
})
;
