'use strict';

/**
 * Test user data handling
 */
// function for generating a test user by http://randomuser.me/
function getNewUser() {
    $.ajax({dataType:'json', url: 'http://api.randomuser.me/', timeout:5000, success:onRssSuccess, error:onRssError, async: false});
}

// handle successful requests
function onRssSuccess(results) {
    var user = results.results[0].user;
    $('#firstname').val(user.name.first);
    $('#lastname').val(user.name.last);

    $('#face').remove();
    $('#facespace').prepend('<img id="face" src="' + user.picture + '" />');

    console.log(user.picture);
}

// handle unsuccessful requests
function onRssError(results) {
    console.log('error');
}

/**
 * Get email handling
 */
function getEmail() {
    $.ajax({dataType:'json', url: 'https://www.guerrillamail.com/ajax.php?f=get_email_address', timeout:5000, success:onEmailRssSuccess, error:onEmailRssError, async: false});
}

function onEmailRssSuccess(result) {
    console.log(result.email_addr);
    $('#email').val(result.email_addr);
}

function onEmailRssError(result) {
    console.log('email cannot be retrieved due to an error');
}

/**
 * Forget email handling
 */
function forgetEmail() {
    $.ajax({dataType:'json', url: 'https://www.guerrillamail.com/ajax.php?f=forget_me', timeout:5000, async: false});
}

/**
 * Just do all calls, when button is clicked
 */
function doCalls() {
    getNewUser();
    forgetEmail();
    getEmail();
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', doCalls);
});