"use strict";

var settingsModal;
var username;
var messageInput;

function initialise() {
    //temp
    //clearcookie();
    username = document.getElementById('username');
    messageInput = document.getElementById('messageInput');
    messageInput.addEventListener("keydown", handleKey, true);
    settingsModal = document.getElementById('popupModal');
    settingsModal.addEventListener('mousedown', modalClick);
    checkCookie();
}

function openSettings() {
    console.log("Open")
    settingsModal.style.display = "block";
}

function modalClick(e) {
    if (e.target === settingsModal) {
        
        updateDetails();
    }
}

function updateDetails() {
    if (username.value !== "" && username.value !== null) {
        setCookie("username", username.value, 365);
        settingsModal.style.display = "none";
    }

    window.location.reload(false);
    //else {
    //    window.location.reload(false);
    //}
}

function handleKey(e) {
    var keycode;
    if (window.event) {
        keycode = window.event.keyCode;
    }
    else if (e) {
        keycode = e.which;
    }
    if (keycode === 13) {
        sendmessage();
    }
}

function clearcookie() {
    setCookie("username", "", 0);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var Hidden1 = document.getElementById('Hidden1');
    var user = getCookie("username");

    if (user !== "" && username.value !== null) {
        //Hidden1.value = user;
        username.value = user;
        initialiseChat();
    }
    else {
        openSettings();
    }
}