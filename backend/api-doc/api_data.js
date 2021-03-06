define({ "api": [
  {
    "type": "put",
    "url": "/api/rooms/:id/activate",
    "title": "Activate a room",
    "name": "ActivateRoom",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Room activated successfully.\",\n   status: 200,\n   data: {\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (401):",
          "content": "{\n   error: true,\n   message: \"You are not authorized to modify this room\",\n   status: 401,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "post",
    "url": "/api/rooms/",
    "title": "Create a new room",
    "name": "CreateRoom",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Room name. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Room description. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Room created successfully.\",\n   status: 200,\n   data: {\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (409):",
          "content": "{\n   error: true,\n   message: \"Name already exists.\",\n   status: 409,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (422):",
          "content": "{\n   error: true,\n   message: \"Name not provided.\",\n   status: 422,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "put",
    "url": "/api/rooms/:id/deactivate",
    "title": "Deactivate a room",
    "name": "DeactivatedRoom",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Room deactivated successfully.\",\n   status: 200,\n   data: {\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (401):",
          "content": "{\n   error: true,\n   message: \"You are not authorized to modify this room\",\n   status: 401,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "delete",
    "url": "/api/rooms/:id",
    "title": "Delete a room",
    "name": "DeleteRoom",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Room deleted successfully.\",\n   status: 200,\n   data: {\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (401):",
          "content": "{\n   error: true,\n   message: \"You are not authorized to modify this room\",\n   status: 401,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "get",
    "url": "/api/rooms/active",
    "title": "Get all active rooms",
    "name": "GetActiveRooms",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Rooms found.\",\n   status: 200,\n   data: [{\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"No active rooms found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "get",
    "url": "/api/rooms/:id",
    "title": "Get a particular room by Id",
    "name": "GetRoomById",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Room details.\",\n   status: 200,\n   data: {\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "get",
    "url": "/api/rooms/:id/updates",
    "title": "Get all updates of a particular room",
    "name": "GetRoomUpdates",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "defaultValue": "0",
            "description": "<p>Number of updates to skip. (Query Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Number of updates to show after skipping. (Query Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Rooms updates.\",\n   status: 200,\n   data: [{\n     roomId: String,\n     type: String, // 'chat' or 'notification'\n     time: Date,\n     message: String,\n     senderId: String,\n     senderName: String\n   }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"No chats found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "get",
    "url": "/api/rooms/",
    "title": "Get all rooms",
    "name": "GetRooms",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Rooms found.\"\n   status: 200,\n   data: [{\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"No rooms found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "put",
    "url": "/api/rooms/:id/join",
    "title": "Join a room",
    "name": "JoinRoom",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Joined room successfully.\",\n   status: 200,\n   data: {\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (403):",
          "content": "{\n   error: true,\n   message: \"Room is not active.\",\n   status: 403,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (409):",
          "content": "{\n   error: true,\n   message: \"You are already a member of this room.\",\n   status: 409,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "put",
    "url": "/api/rooms/:id/leave",
    "title": "Leave a room",
    "name": "LeaveRoom",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Left room successfully.\",\n   status: 200,\n   data: {\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (409):",
          "content": "{\n   error: true,\n   message: \"You are not a member of this room.\",\n   status: 409,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "post",
    "url": "/api/rooms/:id/send-invite-link",
    "title": "Send invite link to an email",
    "name": "SendInviteLink",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of the receiver. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Link sent successfully.\",\n   status: 200,\n   data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (422):",
          "content": "{\n   error: true,\n   message: \"Email not provided.\",\n   status: 422,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "post",
    "url": "/api/rooms/:id/send-message",
    "title": "Send a message to a room",
    "name": "SendMessage",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Room created successfully.\",\n   status: 200,\n   data: {\n     roomId: String,\n     type: String, // 'chat' or 'notification'\n     time: Date,\n     message: String,\n     senderId: String,\n     senderName: String\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (422):",
          "content": "{\n   error: true,\n   message: \"Message not provided.\",\n   status: 422,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "put",
    "url": "/api/rooms/:id/update-last-viewed",
    "title": "Update lastViewed time of a user",
    "name": "UpdateLastViewed",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "lastViewed",
            "description": "<p>Last viewed time. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Updated successfully.\",\n   status: 200,\n   data: {\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (409):",
          "content": "{\n   error: true,\n   message: \"You are not a member of this room\",\n   status: 409,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "put",
    "url": "/api/rooms/:id",
    "title": "Update details of a room (name & description)",
    "name": "UpdateRoomDetails",
    "group": "Rooms",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Room Id. (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the room. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the room. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Room updated successfully.\",\n   status: 200,\n   data: {\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (401):",
          "content": "{\n   error: true,\n   message: \"You are not authorized to modify this room.\",\n   status: 403,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"Room not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/rooms.js",
    "groupTitle": "Rooms"
  },
  {
    "type": "put",
    "url": "/api/users/activate",
    "title": "Activate the user",
    "name": "ActivateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Activation token. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Account activated successfully.\"\n   status: 200,\n   data: {\n     userId: String,\n     name: String,\n     email: String,\n     username: String,\n     lastLogin: Date\n     friends: [String],\n     verified: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"User not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (409):",
          "content": "{\n   error: true,\n   message: \"Invalid activation token.\",\n   status: 409,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/:username/forgot-password",
    "title": "Forgot Password",
    "name": "ForgotPassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Password Reset mail sent successfully.\"\n   status: 200,\n   data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"User not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (409):",
          "content": "{\n   error: true,\n   message: \"User is not verified.\",\n   status: 409,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/:id/rooms",
    "title": "Get details of rooms where the given user is a member of",
    "name": "GetJoinedRooms",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Rooms found.\"\n   status: 200,\n   data: [{\n     roomId: String,\n     name: String,\n     description: String,\n     creatorId: String,\n     createdAt: String\n     users: [{ userId: String, lastViewed: Date }],\n     lastUpdated: Date,\n     active: Boolean\n   }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"User not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"No rooms found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "Get details of an user by Id",
    "name": "GetUserById",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id. (URL Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"User details.\"\n   status: 200,\n   data: {\n     userId: String,\n     name: String,\n     email: String,\n     username: String,\n     lastLogin: Date\n     friends: [String],\n     verified: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"User not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/api/users/",
    "title": "Get details of the logged in user",
    "name": "GetUserDetails",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"User details.\"\n   status: 200,\n   data: {\n     userId: String,\n     name: String,\n     email: String,\n     username: String,\n     lastLogin: Date\n     friends: [String],\n     verified: Boolean\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"User not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/api/users/:id/reset-password",
    "title": "Reset Password",
    "name": "ResetPassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User Id (URL Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Password reset successful.\"\n   status: 200,\n   data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"User not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/login",
    "title": "User Login",
    "name": "UserLogin",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Login successful.\"\n   status: 200,\n   data: {\n     token: String\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (404):",
          "content": "{\n   error: true,\n   message: \"User not found.\",\n   status: 404,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (409):",
          "content": "{\n   error: true,\n   message: \"User is not verified.\",\n   status: 409,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (422):",
          "content": "{\n   error: true,\n   message: \"Incorrect Password.\",\n   status: 422,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (422):",
          "content": "{\n   error: true,\n   message: \"Some field is empty.\",\n   status: 422,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/signup",
    "title": "User Registration",
    "name": "UserRegistration",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user. (Body Parameter)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (Body Parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Registration successful.\"\n   status: 200,\n   data: {\n     token: String\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (409):",
          "content": "{\n   error: true,\n   message: \"Email already present.\",\n   status: 409,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (409):",
          "content": "{\n   error: true,\n   message: \"Username already exists.\",\n   status: 409,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (422):",
          "content": "{\n   error: true,\n   message: \"Some field is empty.\",\n   status: 422,\n   data: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Something went wrong. Please try again.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        },
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/users/logout",
    "title": "User Logout",
    "name": "UserRegistration",
    "group": "User",
    "permission": [
      {
        "name": "User"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success Response (200):",
          "content": "{\n   error: false,\n   message: \"Logout successful.\"\n   status: 200,\n   data: null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error Response (500):",
          "content": "{\n   error: true,\n   message: \"Error occurred.\",\n   status: 500,\n   date: null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "User"
  }
] });
