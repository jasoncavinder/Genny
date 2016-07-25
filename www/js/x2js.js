angular.module('x2js', []).

factory('x2js', function($http) {
    var x2js;
    
    var get = function(filePath, callback) {
        $http.get(filePath, {
            transformResponse:function(data) {
               return x2js.xml_str2json(data);
            }
        }).
        success(function(data, status) {
            callback(data);
        });
    };
        
    var init = function(config) {
        x2js = (config !== undefined) ? new X2JS(config) : new X2JS();
        x2js.get = get;
        x2js.init = init;
    };
    
    init();
    
    return x2js;
});

//new X2JS() - to create your own instance to access all library functionality
//new X2JS(config) - to create your own instance with additional config
//<instance>.xml2json - Convert XML specified as DOM Object to JSON
//<instance>.json2xml - Convert JSON to XML DOM Object
//<instance>.xml_str2json - Convert XML specified as string to JSON
//<instance>.json2xml_str - Convert JSON to XML string
//<instance>.asArray - Utility function to work with a JSON field always in array form
//<instance>.asDateTime - Utility function to convert the specified parameter from XML DateTime to JS Date
//<instance>.asXmlDateTime - Utility function to convert the specified parameter to XML DateTime from JS Date or timestamp
//
//escapeMode : true|false - Escaping XML characters. Default is true from v1.1.0+
//attributePrefix : "<string>" - Prefix for XML attributes in JSon model. Default is "_"
//arrayAccessForm : "none"|"property" - The array access form (none|property). Use this property if you want X2JS generates additional property _asArray to access in array form for any XML element. Default is none from v1.1.0+
//emptyNodeForm : "text"|"object" - Handling empty nodes (text|object) mode. When X2JS found empty node like it will be transformed to test : '' for 'text' mode, or to Object for 'object' mode. Default is 'text'
//enableToStringFunc : true|false - Enable/disable an auxiliary function in generated JSON objects to print text nodes with text/cdata. Default is true
//arrayAccessFormPaths : [] - Array access paths - use this option to configure paths to XML elements always in "array form". You can configure beforehand paths to all your array elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*.child2/), or a custom function. Default is empty
//skipEmptyTextNodesForObj : true|false - Skip empty text tags for nodes with children. Default is true.
//stripWhitespaces : true|false - Strip whitespaces (trimming text nodes). Default is true.
//datetimeAccessFormPaths : [] - DateTime access paths. Use this option to configure paths to XML elements for XML datetime elements. You can configure beforehand paths to all your datetime elements based on XSD or your knowledge. Every path could be a simple string (like 'parent.child1.child2'), a regex (like /.*.child2/), or a custom function. Default is empty.
//useDoubleQuotes : true|false - Use double quotes for output XML formatting. Default is false.
//xmlElementsFilter : [] - Filter incoming XML elements. You can pass a stringified path (like 'parent.child1.child2'), regexp or function
//jsonPropertiesFilter : [] - Filter JSON properties for output XML. You can pass a stringified path (like 'parent.child1.child2'), regexp or function
//keepCData : true|false - If this property defined as false and an XML element has only CData node it will be converted to text without additional property "__cdata". Default is false.    
