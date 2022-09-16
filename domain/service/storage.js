class StorageInMemory {
  constructor() {
    this.rooms = new Map();
    this.participants = new Map();
    this.messages = new Map();
  }

  createRoom = (room) => {
    this.rooms.set(room.id, room);
    return room;
  };

  updateRoom = (id, room) => {
    this.rooms.set(id, room);
    return room;
  };

  getRoom = (id) => {
    return this.rooms.get(id);
  };

  getRooms = () => {
    return this.rooms.values();
  };

  deleteRoom = (id) => {
    this.rooms.delete(id);
  };

  createMessage = (message) => {
    this.messages.set(message.id, message);
    return message;
  };

  updateMessage = (message) => {
    this.messages.set(message.id, message);
    return message;
  };

  getMessage = (id) => {
    return this.messages.get(id);
  };

  getMessages = () => {
    return this.messages.values();
  };

  deleteMessage = (id) => {
    this.messages.delete(id);
    return id;
  };

  createParticipant = (participant) => {
    this.participants.set(participant.id, participant);
    return participant;
  };

  updateParticipant = (id, participant) => {
    this.participants.set(id, participant);
    return participant;
  };

  getParticipant = (id) => {
    return this.participants.get(id);
  };

  getParticipants = () => {
    return this.participants.values();
  };

  deleteParticipant = (id) => {
    this.participants.delete(id);
    return id;
  };
}

module.exports = {
  StorageInMemory,
};
