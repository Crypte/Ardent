/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4155810780")

  // remove field
  collection.fields.removeById("json1602912115")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4155810780")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "json1602912115",
    "maxSize": 0,
    "name": "source",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
})
