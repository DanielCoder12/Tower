export class Comment {
    constructor(data){
        this.id = data.id || data._id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.body = data.body
        this.isAttending = data.isAttending
        this.createdAt = new Date(data.createdAt)
        this.creator = data.creator

    }
}

const comment = {
    "_id": "654311359ad93efd8536384c",
    "creatorId": "6541814359b43990cb08b854",
    "eventId": "654311349ad93efd85363847",
    "body": "I can't wait for this event!",
    "isAttending": false,
    "createdAt": "2023-11-02T03:02:13.215Z",
    "updatedAt": "2023-11-02T03:02:13.215Z",
    "__v": 0,
    "creator": {
        "_id": "6541814359b43990cb08b854",
        "subs": [
            "auth0|6541814339444cc3fe9a2299"
        ],
        "email": "minecraft@minecraft.com",
        "name": "minecraft",
        "picture": "https://s.gravatar.com/avatar/c679f0317f1920dc6165123424752ae1?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fmi.png",
        "createdAt": "2023-10-31T22:55:13.377Z",
        "updatedAt": "2023-10-31T22:55:13.377Z",
        "__v": 0,
        "id": "6541814359b43990cb08b854"
    },
    "id": "654311359ad93efd8536384c"
}