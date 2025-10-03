/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4155810780")

  // update collection data
  unmarshal({
    "name": "resource"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4155810780")

  // update collection data
  unmarshal({
    "name": "ressource"
  }, collection)

  return app.save(collection)
})
