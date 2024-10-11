/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "um8l8ksywm7y9c1",
    "created": "2024-10-11 10:40:36.221Z",
    "updated": "2024-10-11 10:40:36.221Z",
    "name": "todo",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dmppkxql",
        "name": "title",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nsfzknyo",
        "name": "content",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("um8l8ksywm7y9c1");

  return dao.deleteCollection(collection);
})
