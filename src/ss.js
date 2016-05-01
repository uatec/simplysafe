var fs = require('fs'); 

// find files in current or target dir

fs.readdir('./tests', function(err, items) {
    var testPlan = {};
// load all these modules
// build test plan
    for (var i=0; i<items.length; i++) {
        var testSuite = require('../tests/' + items[i]);
        for (var test in testSuite) {
           testPlan[items[i] + '>' + test] = testSuite[test]; 
        }
    }

// run tests and report
    var failed = 0;
    var j = 0;
    for ( var testKey in testPlan ) {
        try {
            testPlan[testKey]();
            console.log('PASSED - ' + j + ': [' + testKey + ']');
        } catch (e) {
            failed++;
            console.log('FAILED - ' + j + ': [' + testKey + ']');
            console.log(e);
        }
        j++;
    }
    
    var testCount = Object.keys(testPlan).length;
    console.log('Total: ' + testCount + ' Passed: ' + (testCount - failed) + ' Failed: ' + failed);
});
