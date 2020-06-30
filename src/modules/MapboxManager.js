
export default {
  getAddress(lng, lat) {
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoiZHlsYnlsIiwiYSI6ImNrYmh6M2M0YTBhNmcycm04bzF0MGVxNGMifQ.zH776ZxDF0GCyvco-a2WiQ`)
    .then(result => result.json())
  }
}