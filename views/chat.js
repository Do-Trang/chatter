const socket = io("http://localhost:3001");

const input = $("#message-input");

input.keypress(function (e) {
  if (e.which == 13) {
    if (input.val()) {
      socket.emit("client_send_message", {
        user_id: "anonymous",
        user_name: "Anonymous",
        message: input.val(),
      });
      input.val("");
    }
    return false;
  }
});

socket.on("server_send_message", (msg) => {
  $(".messages-ul").append(
    `<li class="messages-li">${msg?.user_name}: ${msg?.message}</li>`
  );
});

fetch("http://localhost:3001/messages")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data?.forEach((msg) => {
      $(".messages-ul").append(
        `<li class="messages-li">${msg?.user_name}: ${msg?.message}</li>`
      );
    });
  });
