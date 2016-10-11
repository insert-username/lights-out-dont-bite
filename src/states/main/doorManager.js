/**
 * Tracks the state of all doors in a level. This is a convenience 
 * for sprites which only appear when all doors are open.
 */
class DoorManager {

  constructor(doors) {
    this.doors = doors;
    this.listeners = [];
  }

  isEveryDoorOpen() {
    return Object.keys(this.doors)
      .every(k => this.doors[k].isOpen());
  }

  isEveryDoorClosed() {
    return Object.keys(this.doors)
      .every(k => !this.doors[k].isOpen());
  }

  open(doorNameCsv) {
    this.csvToDoors(doorNameCsv).forEach(door => {
      door.open();
      this.notifyListeners(door);
    });
  }

  close(doorNameCsv) {
    this.csvToDoors(doorNameCsv).forEach(door => {
      door.close();
      this.notifyListeners(door);
    });
  }

  flip(doorNameCsv) {
    this.csvToDoors(doorNameCsv).forEach(door => {
      door.flipOpenState();
      this.notifyListeners(door);
    });
  }

  /**
   * Adds a listener which is notified whenever the state of any door is changed.
   * @param doorStateChangeListener function accepting a single argument: the 
   * door with its state changed. 
   */
  addDoorStateChangeListener(doorStateChangeListener) {
    this.listeners.push(doorStateChangeListener);
  }

  notifyListeners(door) {
    this.listeners.forEach(l => l(door));
  }

  csvToDoors(doorNameCsv) {
    return doorNameCsv.split(",")
      .map(name => name.trim())
      .filter(name => name != "")
      .map(name => this.doors[name]);
  }
}

module.exports = DoorManager;
