/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_user_views")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_user_ressource` ON `user_views` (\n  `user`,\n  `resource`\n)"
    ]
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_4155810780",
    "hidden": false,
    "id": "relation_ressource",
    "maxSelect": 1,
    "minSelect": 1,
    "name": "resource",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_user_views")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_user_ressource` ON `user_views` (\n  `user`,\n  `ressource`\n)"
    ]
  }, collection)

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": true,
    "collectionId": "pbc_4155810780",
    "hidden": false,
    "id": "relation_ressource",
    "maxSelect": 1,
    "minSelect": 1,
    "name": "ressource",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
