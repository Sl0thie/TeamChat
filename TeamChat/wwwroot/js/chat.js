"use strict";

var connection; //= new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
//document.getElementById("sendButton").disabled = true;

function initialiseChat() {
    connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    //connection.on("ReceiveMessage", function (user, message) {
    //    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //    var encodedMsg = "[" + user + "] " + msg;
    //    var li = document.createElement("li");
    //    li.textContent = encodedMsg;
    //    document.getElementById("messagesList").appendChild(li);
    //    li.scrollIntoView();
    //});

    connection.on("ReceiveMessage", function (message) {
        //var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        //var encodedMsg = "[" + user + "] " + msg;
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

    //document.getElementById("sendButton").addEventListener("click", function (event) {
    //    var user = document.getElementById("Hidden1").value;
    //    var message = document.getElementById("messageInput").value;
    //    connection.invoke("SendMessage", user, message).catch(function (err) {
    //        return console.error(err.toString());
    //    });
    //    event.preventDefault();
    //});
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
