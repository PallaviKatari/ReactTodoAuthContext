import * as signalR from
  "@microsoft/signalr";

let connection;

export const startConnection =
  async (userName, setUsers) => {

    connection =
      new signalR.HubConnectionBuilder()
        .withUrl(
          "https://localhost:7007/presencehub"
        )
        .withAutomaticReconnect()
        .build();

    connection.on(
      "UsersUpdated",
      (users) => {
        setUsers(users);
      }
    );

    await connection.start();

    await connection.invoke(
      "RegisterUser",
      userName
    );
  };