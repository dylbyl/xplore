const remoteURL = "http://localhost:8088"

export default {
  getAllWithInfo() {
    return fetch(`${remoteURL}/routes?_embed=comments&_embed=tag-routes&_expand=location&_expand=user`)
    .then(result => result.json())
  },
  getSingleWithInfo(routeId) {
    return fetch(`${remoteURL}/routes/${routeId}?_embed=comments&_embed=tag-routes&_expand=location&_expand=user`)
    .then(result => result.json())
  },
  getSingleTag(tagId) {
    return fetch(`${remoteURL}/tags/${tagId}`)
    .then(result => result.json())
  }
}