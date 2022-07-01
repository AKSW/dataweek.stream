import { io } from "socket.io-client";

const socket = io("wss://dataweek-chat-a.nate.eccenca.dev");
// const socket = io("ws://localhost:8000");

socket.on('server_message', (data) => {
  let e = document.createElement('p');
  let sp_nick = document.createElement('span');
  let sp_time = document.createElement('span');
  let sp_message = document.createElement('span');
  sp_nick.innerHTML = data.nickname;
  sp_time.innerHTML = data.time;
  sp_time.setAttribute("class", "date");
  sp_message.innerHTML = data.message;
  e.append(sp_time);
  e.append(" ");
  e.append(sp_nick);
  e.append(": ");
  e.append(sp_message);

  document.getElementById('message-box').prepend(e);
});

function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function sendMessage(){
  if (document.getElementById('nickname-input').value.trim() == "") {
    document.getElementById('nickname-input').required = "true";
  } else {
    socket.emit('client_message', {
      'nickname': htmlEntities(document.getElementById('nickname-input').value),
      'message': htmlEntities(document.getElementById('message-input').value)
    });
    document.getElementById('message-input').value = '';
}
}

function isPressingEnter(e){
  let k;
  if(window.event){
    k = e.keyCode;
    if(k===13){
      sendMessage();
    }
  } else if(e.which){
    k = e.which;
    if(k===13){
      sendMessage();
    }
  }
}

window.isPressingEnter = isPressingEnter;
window.sendMessage = sendMessage;
