class Project {
  id = crypto.randomUUID();
  todos = [];

  constructor(name) {
    this.name = name;
  }
}
