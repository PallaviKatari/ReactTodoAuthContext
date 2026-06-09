import React, {
  useEffect,
  useState
} from "react";

import {
  startConnection
} from "../services/signalrService";

function OnlineUsers() {

  const [users, setUsers] =
    useState([]);
  
  useEffect(() => {
    debugger;
    const userName =
      localStorage.getItem(
        "userName"
      );

    startConnection(
      userName,
      setUsers
    );

  }, []);

  return (

    <div className="card p-3">

      <h5>
        Online Users
      </h5>

      {
        users.map((user) => (

          <div
            key={user}
            className="d-flex align-items-center mb-2"
          >

            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "green",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "10px"
              }}
            />

            {user}

          </div>

        ))
      }

    </div>

  );
}

export default OnlineUsers;