/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3242257869")

  // update collection data
  unmarshal({
    "name": "resource_card"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3242257869")

  // update collection data
  unmarshal({
    "name": "ressource_card"
  }, collection)

  return app.save(collection)
})
