var rewire = require('rewire');
var should = require('should');
var simplereporter = rewire('../src/simplereporter.js');

module.exports = {
    "Number of discovered tests is written to the console": function() {
        var logMessages = [];
        var revert = simplereporter.__set__({
            console: {
                log: function() { logMessages.push(arguments); }
            }
        });
        
        simplereporter.onBegin(5);

        revert();
        
        should.equal(logMessages.length, 1);
        should.equal(logMessages[0][0], 'Discovered 5 tests.');
    },
    
    "When a test passes, it is logged to the console": function() {
        var logMessages = [];
        var revert = simplereporter.__set__({
            console: {
                log: function() { logMessages.push(arguments); }
            }
        });
        
        simplereporter.onPass('Some test');

        revert();
        
        should.equal(logMessages.length, 1);
        should.equal(logMessages[0][0], 'PASSED - [Some test]');
    },
    
    "When a test fails, it is logged to the console": function() {
        var logMessages = [];
        var revert = simplereporter.__set__({
            console: {
                log: function() { logMessages.push(arguments); }
            }
        });
        
        simplereporter.onFail('Some test', 'someerror');

        revert();
        
        should.equal(logMessages.length, 2);
        should.equal(logMessages[0][0], 'FAILED - [Some test]');
        should.equal(logMessages[1][0], 'someerror');
    }
};