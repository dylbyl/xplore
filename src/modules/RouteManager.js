const remoteURL = "http://localhost:8088"

export default {
  getAllWithInfo() {
    return fetch(`${remoteURL}/routes?_embed=comments&_expand=tag&_expand=user`)
    .then(result => result.json())
  },
  getSingleWithInfo(routeId) {
    return fetch(`${remoteURL}/routes/${routeId}?_embed=comments&_expand=tag&_expand=user`)
    .then(result => result.json())
  },
  getAllTags() {
    return fetch(`${remoteURL}/tags`)
    .then(result => result.json())
  },
  getSingleTag(tagId) {
    return fetch(`${remoteURL}/tags/${tagId}`)
    .then(result => result.json())
  },
  getAllLocations() {
    return fetch(`${remoteURL}/locations`)
    .then(result => result.json())
  },
  post(newRoute) {
    return fetch(`${remoteURL}/routes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRoute)
    }).then(data => data.json())
},delete(id) {
  return fetch(`${remoteURL}/routes/${id}`, {
      method: "DELETE"
  })
  .then(result => result.json())
},
update(editedRoute) {
  return fetch(`${remoteURL}/routes/${editedRoute.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(editedRoute)
  }).then(data => data.json());
},
}