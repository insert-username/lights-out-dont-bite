class TriggerManager {
  constructor() {
    this.triggerables = {};
  };

  registerTriggerable(name, triggerable) {
    if (name === undefined || triggerable === undefined) {
      throw "Name and triggerable must be supplied.";
    }

    if (triggerable["trigger"] === undefined || typeof triggerable["trigger"] != "function") {
      throw "Triggerables must define a \"trigger\" method.";
    }

    if (this.triggerables[name] != undefined) {
      throw "A triggerable with name: \"" + name + "\" has already been defined.";
    }

    this.triggerables[name] = triggerable;
  }

  trigger(name) {
    if (name === undefined) {
      throw "Name must be supplied.";
    }

    if (this.triggerables[name] === undefined) {
      throw "A triggerable with name \"" + name + "\" has not been defined.";
    }

    this.triggerables[name].trigger();
  }
};

module.exports = TriggerManager;
