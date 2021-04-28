"use strict";

var connection; //= new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

function initialiseChat() {
    connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    connection.on("ReceiveMessage", function (message) {
        var li = document.createElement("li");
        li.innerHTML = message;
        document.getElementById("messagesList").appendChild(li);
        li.scrollIntoView();
    });

    connection.start().then(function () {
        document.getElementById("sendButton").disabled = false;
        var user = document.getElementById("username").value;
        connection.invoke("SendHello", user).catch(function (err) {
            return console.error(err.toString());
        });
    }).catch(function (err) {
        return console.error(err.toString());
    });
}

function sendmessage() {
    var user = document.getElementById("username").value;
    var message = document.getElementById("messageInput").value;

    if (message.length === 0) {
        return;
    }

    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
    messageInput.value = "";
}
