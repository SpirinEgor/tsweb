var currentGroup = 'A';

function openGroup(groupName) {
    var folder = 'group' + groupName;
    currentGroup = groupName;
    var content = document.getElementById('content');
    content.innerHTML = '';
    jQuery.get(folder + '/training.html', function(data){
        content.innerHTML = data;
    });
    setGroupStyle();
}

function openMonitor() {
    var folder = 'group' + currentGroup;
    var content = document.getElementById('content');
    content.innerHTML = '';
    jQuery.get(folder + '/monitor.html', function(data){
        content.innerHTML = data;
    });
    setButtonStyle('monitor');
}

function openList() {
    var folder = 'group' + currentGroup;
    var content = document.getElementById('content');
    content.innerHTML = '';
    jQuery.get(folder + '/list.html', function(data){
        content.innerHTML = data;
    });
    setButtonStyle('list');
}

function openTraining() {
    openGroup(currentGroup);
    setButtonStyle('training');
}

function setButtonStyle(buttonName) {
    var buttons = document.getElementsByClassName('nav');
    for (var i = 0; i < buttons.length; ++i) {
        var check = 'nav-' + buttonName;
        if (buttons[i].classList.contains(check)) {
            buttons[i].classList.remove('w3-white');
            buttons[i].classList.add('w3-black');
        } else {
            buttons[i].classList.add('w3-white');
            buttons[i].classList.remove('w3-black');
        }
    }
}

function setGroupStyle() {
    var groups = document.getElementsByClassName('group');
    for (var i = 0; i < groups.length; ++i) {
        var check = 'group-' + currentGroup;
        if (groups[i].classList.contains(check)) {
            groups[i].classList.add('w3-text-teal');
        } else {
            groups[i].classList.remove('w3-text-teal');
        }
    }
}