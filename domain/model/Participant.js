class Participant {
  id;
  name;
  rooms;
  directRooms;
  static nextId = 0;
  constructor(name) {
    this.id = ++Participant.nextId;
    this.name = name;
    this.rooms = [];
    this.directRooms = new Map();
  }

  addRoom = (room) => {
    this.rooms.push(room);
  };

  removeRoom = (room) => {
    this.rooms = this.rooms.filter((c) => c !== room);
  };

  hasRoom = (room) => {
    return this.rooms.includes(room);
  };

  addDirectRoom = (room, p2) => {
    this.directRooms.set(p2.id, room);
    this.addRoom(room);
  };

  removeDirectRoom = (room, p2) => {
    this.directRooms.delete(p2.id);
    this.removeRoom(room);
  };

  getDirectRoom = (p2) => {
    return this.directRooms.get(p2.id);
  };
}

module.exports = { Participant };
