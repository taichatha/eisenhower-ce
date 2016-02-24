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
  if(document.getElementById(priority+task)){
    document.getElementById('errors').innerHTML = "duplicate";
  } else {

    var node = document.createElement("li");
    node.setAttribute('id', priority+task);
    var span = document.createElement("span");
    var deleteButton = document.createElement("button");
    var textNode = document.createTextNode(task);
    var xText = document.createTextNode('X');
    deleteButton.appendChild(xText);
    deleteButton.onclick = (function() {
      
        deleteTask(task);
      
    });
    span.appendChild(textNode);
    span.appendChild(deleteButton);
    node.appendChild(span);
                
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
      document.getElementById('errors').innerHTML = "";
      document.getElementById('taskInput').value = '';
      document.getElementById('priority').value = 1;
  }

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
  //Remove element from ui
  var removeElementFromUI = new Promise(
    function(resolve, reject) {
      chrome.storage.sync.get(toDeleteTask, function(result){
        resolve(result);
      });
    })
  removeElementFromUI.then(function(taskObject) {
    for(key in taskObject){
      if(document.getElementById(taskObject[key] + key)){
        var child = document.getElementById(taskObject[key] + key);
        child.parentNode.removeChild(child);
      }
    }
  }).then( new Promise(
      function(resolve, reject) {
        chrome.storage.sync.remove(toDeleteTask);
        resolve();
      })
  );
  document.getElementById('errors').innerHTML = "";
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
          if(!task) {
            message('Error: No task specified');
            return;
          }
          if(!priority){
            message('Error: No Priority specified');
            return;
          }


          var node = document.createElement("li");
          node.setAttribute('id', priority+task);
          var span = document.createElement("span");
          var deleteButton = document.createElement("button");
          var textNode = document.createTextNode(task);
          var xText = document.createTextNode('X');
          deleteButton.appendChild(xText);
          deleteButton.onclick = (function() {
            deleteTask(task);
          });
          span.appendChild(textNode);
          span.appendChild(deleteButton);
          node.appendChild(span);
                          
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


