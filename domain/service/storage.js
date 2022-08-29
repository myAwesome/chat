class Storage {
  constructor() {
    this.rooms = new Map();
    this.participants = new Map();
  }

  createRoom = (room) => {
    this.rooms.set(room.id, room);
    return room;
  };

  updateRoom = (room) => {
    this.rooms.set(room.id, room);
    return room;
  };

  getRoom = (id) => {
    return this.rooms.get(id);
  };

  getRooms = () => {
    return this.rooms;
  };

  deleteRoom = (id) => {
    this.rooms.delete(id);
    return id;
  };

  saveParticipant = (participant) => {
    this.participants.set(participant.id, participant);
    return participant;
  };

  updateParticipant = (participant) => {
    this.participants.set(participant.id, participant);
    return participant;
  };

  getParticipant = (id) => {
    return this.participants.get(id);
  };

  getParticipants = () => {
    return this.participants;
  };

  deleteParticipant = (id) => {
    this.participants.delete(id);
    return id;
  };
}

module.exports = {
  Storage,
};
