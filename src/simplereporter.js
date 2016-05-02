module.exports = {
  onBegin: function(total) {
     console.log('Discovered ' + total + ' tests.') 
  },
  
  onPass: function(title) {
    console.log('PASSED - [' + title + ']');
  },
  
  onFail: function(title, err) {
    console.log('FAILED - [' + title + ']');
    console.log(err);
  },
  
  onEnd: function(total, passed, failed) {
    console.log('Total: ' + total + ' Passed: ' + passed + ' Failed: ' + failed);      
  }
};