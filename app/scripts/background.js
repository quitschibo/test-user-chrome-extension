'use strict';

//chrome.runtime.onInstalled.addListener(function (details) {
//    console.log('previousVersion', details.previousVersion);
//});
var listLength = 0;

function startRequest() {
    $.ajax({dataType:'json', url: 'https://www.guerrillamail.com/ajax.php?f=get_email_list&offset=100', timeout:5000, success:onCheckEmailSuccess, async: false});

    //https://www.guerrillamail.com/ajax.php?f=check_email&seq=1
    window.setTimeout(startRequest, 5000);
}
startRequest();

function onCheckEmailSuccess(result) {
    if (result.count > listLength) {
        mailReceived();
        listLength = result.count;
    } else if (result.count < listLength) {
        listLength = 0;
    }
}

function mailReceived() {
    var results = JSON.parse(localStorage['TUX.result']);


    var not = webkitNotifications.createNotification(results.results[0].user.picture, "Hey there, I received an email!", "Click here to open my mail account");
    not.addEventListener("click", function () {
        window.open("https://www.guerrillamail.com");
        not.close();
    });
    not.show();
}

//function test(info, tab) {
//    //chrome.tabs.sendMessage(tab.id, info.);
//}

// create context menu with data from local storage
//var parent = chrome.contextMenus.create({"title": "Testuser", "contexts":["editable"]});
//var account = chrome.contextMenus.create(
//    {"title": "Account", "parentId": parent, "contexts":["editable"]});
//var address = chrome.contextMenus.create(
//    {"title": "Address", "parentId": parent, "contexts":["editable"]});
//
//var email = chrome.contextMenus.create(
//    {"title": "Email", "parentId": account, "contexts":["editable"], "onclick": function(info, tab) {
//        chrome.tabs.sendMessage(0, "TestUserExtfirstname");
//    }});