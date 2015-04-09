/*var mph = {};

importScripts("board.js");


addEventListener("message", function(event) {
    var board = mph.board,
        message = event.data;

    switch (message.command) {
        case "initialize" :
            mph.settings = message.data.settings;
            board.initialize(
                message.data.startmphs, callback
            );
            break;
        case "swap" :
            board.swap(
                message.data.x1,
                message.data.y1,
                message.data.x2,
                message.data.y2,
                callback
            );
            break;
    }

    function callback(data) {
        postMessage({
            id : message.id,
            data : data,
            mphs : board.getBoard()
        });
    }

}, false);*/
