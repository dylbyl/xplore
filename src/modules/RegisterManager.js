const remoteURL = "http://localhost:8088";

const RegisterManager = {
    getAll() {
        return fetch(`${remoteURL}/users`).then((result) => result.json());
      },
    post(newUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((data) => data.json());
  }
}

export default RegisterManager;