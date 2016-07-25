
console.log("loading index.js...");

var genny = angular.module('genny', ['onsen', 'random-name-generator', 'x2js', 'uuid']).

constant('version', {
    full: '0.1.0',
    major: '0',
    minor: '1',
    dot: '3',
    codeName: "..."
}).

service('dice', function diceCalculator() {
    this.roll = window.dice.roll;
    this.stringify = window.dice.stringify;
    this.statistics = window.dice.statistics;
}).

controller('TabbarCtrl', function TabbarCtrl($scope, version) {
    $scope.genny = { version: version };
}).

controller('HomePageCtrl', ['$scope', function HomePageCtrl($scope) {
    
}]).

controller('DiceBagCtrl', function($scope, dice) {
    var d4 = "d4", d6 = "d6", d8 = "d8", d10 = "d10", d12 = "d12", d20 = "d20", d100 = "d100";
    var validDice = [d4, d6, d8, d10, d12, d20, d100];
    var darkDice = true;
    
    function die2fontChar(dieType, dieFace) {
        dieFace = parseInt(dieFace, 10);
        if (dieType == d4)
            dieFace = (dieFace * 3) - (Math.floor(Math.random() * (3)));

        if (validDice.indexOf(dieType, 0) >= 0) {
            if (dieType == d100) {
                var tens = Math.floor(dieFace / 10) % 10;
                var ones = dieFace % 10;
                dieFace = String.fromCharCode(75 + tens, 65 + ones);
            }
            else {
                if (dieType == d10) dieFace = (dieFace % 10) +1;
                dieFace = String.fromCharCode(64+dieFace);
            }
        }
        else {
            dieFace = dieType + ":" + dieFace;
        }
        return darkDice ? dieFace : dieFace.toLowerCase();
    }
    
    function buildDiceObj(diceString) {
        var regexp = /([\+\-\*\/])|(\d+\b)|((\d+)d(?:\d*\.\.)?(\d+):\[((?:\d\,?\s?)+)\])/g;
        var diceRoll = [];
        var match;
        var op = "";
        while (match = regexp.exec(diceString)) {
            if (match[1]) {
                diceRoll.push(["op", match[1], match[1]]);
            }
            else if (match[2]) {
                diceRoll.push(["", match[2], match[2]]);
            }
            else if (match[3]) {
                var rolls = match[6].toString().split(", ");
                for (var i = 0; i < match[4]; i++) {
                    diceRoll.push(["d" + match[5], rolls[i], die2fontChar("d" + match[5], rolls[i])]);
                }
            }
        }
        return diceRoll;
    }
    
    $scope.diceRoll = {
        string: "",
        scope: {},
        result: "",
        resultString: "",
        roll: []
    };
    
    $scope.rollIt = function() {
        var res;
        try {
            res = dice.roll($scope.diceRoll.string, $scope.diceRoll.scope);
            $scope.diceRoll.result = res;
            $scope.diceRoll.resultString = dice.stringify(res);
            $scope.diceRoll.roll = buildDiceObj(dice.stringify(res));
        } catch(e) {
            console.warn("tried to roll \"" + $scope.diceRoll.string + "\"");
            $scope.diceRoll.result = "";
            $scope.diceRoll.resultString = "";
            $scope.diceRoll.roll = [["","","Bad Roll"]];
            console.log(e);
        }
    };
}).

controller('CharacterPageCtrl', function($scope, dice, nameGenerator, x2js, uuid) {
    $scope.data = {};
    
    $scope.characters = [
        {name: 'Alice', id: 0},
        {name: 'Bob', id: 1}
    ];
    
    $scope.newCharacter = function() { console.log("New Character!") };
    
    var loadData = function(data) {
        $scope.data = data;
        console.log(data);
    };
    
    var initPage = function(event) {
        if (event.index == 2) {
            x2js.init({
//            escapeMode :                true,   //true|false - Escaping XML characters. Default is true from v1.1.0+
//            attributePrefix :           "_",    //"<string>" - Prefix for XML attributes in JSon model. Default is "_"
//            arrayAccessForm :           "none", //"none"|"property" - The array access form (none|property). Use this property if you want X2JS generates additional property _asArray to access in array form for any XML element. Default is none from v1.1.0+
//            emptyNodeForm :             "text", //"text"|"object" - Handling empty nodes (text|object) mode. When X2JS found empty node like it will be transformed to test : '' for 'text' mode, or to Object for 'object' mode. Default is 'text'
//            enableToStringFunc :        true,   //true|false - Enable/disable an auxiliary function in generated JSON objects to print text nodes with text/cdata. Default is true
//            arrayAccessFormPaths :      [],     //[] - Array access paths - use this option to configure paths to XML elements always in "array form". You can configure beforehand paths to all your array elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*.child2/), or a custom function. Default is empty
//            skipEmptyTextNodesForObj :  false,  //true|false - Skip empty text tags for nodes with children. Default is true.
//            stripWhitespaces :          true,   //true|false - Strip whitespaces (trimming text nodes). Default is true.
//            datetimeAccessFormPaths :   [],     //[] - DateTime access paths. Use this option to configure paths to XML elements for XML datetime elements. You can configure beforehand paths to all your datetime elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*.child2/), or a custom function. Default is empty.
//            useDoubleQuotes :           false,  //true|false - Use double quotes for output XML formatting. Default is false.
//            xmlElementsFilter :         [],     //[] - Filter incoming XML elements. You can pass a stringified path (like 'parent.child1.child2'), regexp or function
//            jsonPropertiesFilter :      [],     //[] - Filter JSON properties for output XML. You can pass a stringified path (like 'parent.child1.child2'), regexp or function
            keepCData :                 true   //true|false - If this property defined as false and an XML element has only CData node it will be converted to text without additional property "__cdata". Default is false.    
        });
            x2js.get('./data/Full Compendium.xml', loadData);
            tabbar.off('postchange', initPage);
            console.log(uuid.generate());
        }
    };
    ons.ready(function() {
        tabbar.on('postchange', initPage);
    });
}).

controller('NameListsCtrl', function($scope, nameGenerator) {
    nameGenerator.initialize('components/random-name-generator/dist/names.json');
    $scope.name = "";
    $scope.getName = function() {
        var fi = String.fromCharCode(Math.floor(Math.random() * (26))+64);
        var li = String.fromCharCode(Math.floor(Math.random() * (26))+64);
        var g = Math.floor(Math.random() * 2) ? 'male' : 'female';
        nameGenerator.generateName(fi,li,g).
            then(function(response){
                if (response.search(/undefined/) == -1) {
                    $scope.name = response;
                } else {
                    $scope.getName();
                }
            },function(reason){
                console.log(reason);
            });
    }; 
})
;


//function rad62(num) {
//    if (num === NaN) throw {message: num + "is not a number", name: "UserException"};
//    var chars = [];
//    for (var i = 0; i < 10; chars.push(String(i++)));
//    for (var i = 0; i < 26; chars.push(String.fromCharCode(++i + 64)));
//    for (var i = 0; i < 26; chars.push(String.fromCharCode(++i + 96)));
//    
//    var str = "";
//    while (num > 0) {
//        console.log(num);
//        str = chars[num % 62] + str;
//        num = Math.floor(num/62);
//    }
//    return str;
//}
//









