var currentGroup = 'A';

function openGroup(groupName) {
    currentGroup = groupName;
    setGroupStyle();
    openTraining();
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
    var folder = 'group' + currentGroup;
    var content = document.getElementById('content');
    content.innerHTML = '';
    jQuery.get(folder + '/training.html', function(data){
        content.innerHTML = data;
    });
    getTrainingPlan();
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

const spreadsheet = {
    'A': '1GgDJsBjx6z4-rdrQWHQBw2p0M3puKdn9uH0uGDFQ0xk',
    'B': '1LHvu2ON0YBfg7SnesLhXFBl8ejQHRqM7-f80h-MILOI',
    'C': '1cDhgxkuxYxn9fivzbt8Sm6VV-Pw3bH6mBrxDDWVOQOA',
    'Teams': '16-uaTSzXq22uV1jyjGzHixIFNvpAQpdBg1VLqheYsxg'
};

function generateCard(title, description, link, date) {
    var template = `
        <div class="w3-card-2 w3-white training">
            <div class="card">
                <div class="card-block text-right w3-padding">
                    <h4 class="card-title">${title}</h4>
                    <p class="card-text">${description}</p>
                    <p class="card-text"><b>${date}</b></p>
                    ${title !== 'No contests yet' ? `<a href="${link}" class="w3-button w3-black margin-bottom">Enter contest</a>`
                            : ''}
                </div>
            </div>
        </div>
    `;
    return template;
}

function getTrainingPlan() {
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheet[currentGroup] + "/od6/public/values?alt=json";
    $.getJSON(url, function(data) {
        var entry = data.feed.entry;
        if ($(entry).length === 0) {
            var card = generateCard('No contests yet', '', '', '');
            $('#training-plan').append(card); 
        }
        $(entry).each(function() {
            var date = this.gsx$date.$t;
            var title = this.gsx$title.$t;
            var description = this.gsx$description.$t;
            var link = this.gsx$link.$t;
            var card = generateCard(title, description, link, date);
            $('#training-plan').prepend(card);
        });
    });

}
