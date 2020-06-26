const remoteURL = "http://localhost:8088"

export default {
  getAllWithInfo(routeId) {
    return fetch(`${remoteURL}/comments?routeId=${routeId}&_expand=user`)
    .then(result => result.json())
  },
  post(newComment) {
    return fetch(`${remoteURL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
    }).then(data => data.json())
},delete(id) {
  return fetch(`${remoteURL}/comments/${id}`, {
      method: "DELETE"
  })
  .then(result => result.json())
},
update(editedComment) {
  return fetch(`${remoteURL}/routes/${editedComment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedComment)
  }).then(data => data.json());
},
}