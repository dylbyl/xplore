const remoteURL = "http://localhost:8088"

export default {
  getDirectionsForRoute(routeId) {
    return fetch(`${remoteURL}/directions?routeId=${routeId}`)
    .then(result => result.json())
  },
  post(newDirection) {
    return fetch(`${remoteURL}/directions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newDirection)
    }).then(data => data.json())
},delete(id) {
  return fetch(`${remoteURL}/directions/${id}`, {
      method: "DELETE"
  })
  .then(result => result.json())
},
update(editedDirection) {
  return fetch(`${remoteURL}/directions/${editedDirection.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedDirection)
  }).then(data => data.json());
},
}