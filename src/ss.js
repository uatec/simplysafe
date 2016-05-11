#!/usr/bin/env node
var fs = require('fs');
var glob = require('glob');
var reporter = require('./simplereporter.js');
var path = require('path');
        
var workingDir = process.argv[1];

// find files in current or target dir
glob(path.join(workingDir, '**/*.test.js'), function (err, items) {
    var testPlan = {};
    // load all these modules
    // build test plan
    for (var i = 0; i < items.length; i++) {
        var testSuite = require(path.join(workingDir, items[i]));
        for (var test in testSuite) {
            testPlan[items[i] + ' > ' + test] = testSuite[test];
        }
    }
    var testCount = Object.keys(testPlan).length;
    reporter.onBegin(testCount);
    // run tests and report
    var failed = 0;
    var j = 0;
    for (var testKey in testPlan) {
        try {
            testPlan[testKey]();
            reporter.onPass(testKey);
        } catch (e) {
            failed++;
            reporter.onFail(testKey, e);
        }
        j++;
    }

    reporter.onEnd(testCount, testCount - failed, failed);

    process.exit(failed);
});
