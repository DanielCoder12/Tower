export class TowerEvent {
    constructor(data){
        this.id = data.id || data._id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate)
        this.isCanceled = data.isCanceled || false
        this.type = data.type
        this.ticketCount = data.ticketCount
        this.isAttending = false
    }
}

const towerEvent = {
    "_id": "65429372321dc368a9ab3f6e",
    "creatorId": "6541814359b43990cb08b854",
    "name": "Mega Marky",
    "description": "Lorem Khaled Ipsum is a major key to success. How’s business? Boomin. The other day the grass was brown, now it’s green because I ain’t give up. Never surrender. To succeed you must believe. When you believe, you will succeed. It’s on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. Lion!",
    "coverImg": "https://images.unsplash.com/photo-1567942712661-82b9b407abbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
    "location": "At The Social Expo Center",
    "capacity": 93,
    "startDate": "2023-11-10T07:00:00.000Z",
    "isCanceled": false,
    "type": "concert",
    "createdAt": "2023-11-01T18:05:38.412Z",
    "updatedAt": "2023-11-01T18:05:38.412Z",
    "__v": 0,
    "ticketCount": 1,
    "id": "65429372321dc368a9ab3f6e"
}