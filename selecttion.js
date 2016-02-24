var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example'));

var userData = {};
function addTask() {
  var task = document.getElementById("taskInput").value;
  var priority = document.getElementById("priority").value;
  if(!task) {
    message('Error: No task specified');
    return;
  }
  if(!priority){
    message('Error: No Priority specified');
    return;
  }

  var node = document.createElement("li");
  var textNode = document.createTextNode(task);
  node.appendChild(textNode)
        
  switch(priority){
      case '1':
        document.getElementById('tasks1').appendChild(node);
        break;
      case '2':
        document.getElementById('tasks2').appendChild(node);
        break;
      case '3':
        document.getElementById('tasks3').appendChild(node);
        break;
      case '4':
        document.getElementById('tasks4').appendChild(node);
        break;
    }
    var obj = {};
    obj[task] = priority;
    chrome.storage.sync.set(obj);
    document.getElementById('taskInput').value = '';
    document.getElementById('priority').value = 1;
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for(key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' + 
                'Old value was "%s", new values is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
})

function deleteTask(toDeleteTask) {
  var p1 = new Promise (
      function(resolve, reject) {
        chrome.storage.sync.remove(toDeleteTask, function(result) {
          console.log(result);

        });
      });
}


function loadUserData() {
    var p1 = new Promise(
        function(resolve, reject) {
            chrome.storage.sync.get(null, function(result) {
              resolve(result);
            });
        });
    p1.then(function(userTasks){
        for(task in userTasks){
          var priority = userTasks[task];
          console.log(task);
          if(!task) {
            message('Error: No task specified');
            return;
          }
          if(!priority){
            message('Error: No Priority specified');
            return;
          }

          var node = document.createElement("li");
          var textNode = document.createTextNode(task);
          node.appendChild(textNode)
          
          switch(priority){
            case '1':
              document.getElementById('tasks1').appendChild(node);
              break;
            case '2':
              document.getElementById('tasks2').appendChild(node);
              break;
            case '3':
              document.getElementById('tasks3').appendChild(node);
              break;
            case '4':
              document.getElementById('tasks4').appendChild(node);
              break;
          }
        }

    })
    .catch(
        // Log the rejection reason
        function(reason) {
            console.log('Handle rejected promise ('+reason+') here.');
        });
}
function logTasks() {
  var p1 = new Promise(
        function(resolve, reject) {
            chrome.storage.sync.get(null, function(result) {
              resolve(result);
            });
        });
    p1.then(function(userTasks){
        for(task in userTasks){
          var priority = userTasks[task];
          console.log(task);
          if(!task) {
            message('Error: No task specified');
            return;
          }
          if(!priority){
            message('Error: No Priority specified');
            return;
          }
        }
    })
    .catch(
        // Log the rejection reason
        function(reason) {
            console.log('Handle rejected promise ('+reason+') here.');
        });
} 

document.addEventListener('DOMContentLoaded', function() {
  loadUserData();
  document.getElementById("submit").addEventListener("click", addTask);

});


