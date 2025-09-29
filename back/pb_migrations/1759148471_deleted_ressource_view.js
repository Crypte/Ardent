/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3017827252");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_y7OH",
        "max": 0,
        "min": 0,
        "name": "title",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "_clone_kdSW",
        "name": "published",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "hidden": false,
        "id": "_clone_dCRm",
        "name": "is_public",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "bool"
      },
      {
        "convertURLs": false,
        "hidden": false,
        "id": "_clone_xRyd",
        "maxSize": 0,
        "name": "content",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "editor"
      },
      {
        "hidden": false,
        "id": "_clone_Wc04",
        "maxSize": 0,
        "name": "source",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "hidden": false,
        "id": "_clone_oAG3",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "_clone_bdF1",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_jtA5",
        "max": 0,
        "min": 0,
        "name": "theme_name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number3891979121",
        "max": null,
        "min": null,
        "name": "view_count",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number3603376980",
        "max": null,
        "min": null,
        "name": "unique_viewers",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "json79845629",
        "maxSize": 1,
        "name": "cards",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_3017827252",
    "indexes": [],
    "listRule": "@request.auth.id != \"\"",
    "name": "ressource_view",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT\n    r.id as id,\n    r.title,\n    r.published,\n    r.is_public,\n    r.content,\n    r.source,\n    r.created,\n    r.updated,\n    t.name AS theme_name,\n    \n    -- Compteurs de vues\n    COUNT(DISTINCT uv.id) as view_count,\n    COUNT(DISTINCT uv.user) as unique_viewers,\n    \n    -- Cartes liées en JSON array\n    COALESCE(\n        '[' || GROUP_CONCAT(\n            CASE \n                WHEN rc.id IS NOT NULL THEN \n                    '{\"id\":\"' || rc.id || \n                    '\",\"type\":\"' || COALESCE(rc.type, '') || \n                    '\",\"title\":\"' || COALESCE(rc.title, '') || \n                    '\",\"content\":\"' || COALESCE(rc.content, '') || \n                    '\",\"metadata\":' || COALESCE(rc.metadata, '{}') || '}'\n                ELSE NULL\n            END\n        ) || ']',\n        '[]'\n    ) AS cards\n  \nFROM ressource r\nLEFT JOIN theme t ON r.theme = t.id\nLEFT JOIN user_views uv ON uv.ressource = r.id\nLEFT JOIN ressource_card rc ON rc.ressource_id = r.id\nGROUP BY r.id, r.title, r.published,r.is_public, r.content, r.source, r.created, r.updated, t.name;",
    "viewRule": "@request.auth.id != \"\""
  });

  return app.save(collection);
})
