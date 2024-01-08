const path = require("path");
const fs = require("fs");

class NodeCache {
  constructor() {
    this._cache = {};

    this._pathToFile = path.resolve(__dirname, "../node-cache");

    if (fs.existsSync(this._pathToFile)) {
      this._cache = this._tryParse(this._pathToFile, {});
    }
  }

  set(key, value) {
    this._cache[key] = value;
  }

  get(key) {
    return this._cache[key];
  }

  remove(key) {
    delete this._cache[key];
  }

  has(key) {
    return this._cache[key] !== undefined;
  }

  values() {
    return Object.values(this._cache);
  }

  keys() {
    return Object.keys(this._cache);
  }

  getAll() {
    return this._cache;
  }

  clearAll() {
    const filePath = path.resolve(__dirname, "../node-cache");

    this._del(filePath);
  }

  persist() {
    this._writeJSON(this._pathToFile, this._cache);
  }

  _writeJSON(filePath, data) {
    fs.mkdirSync(path.dirname(filePath), {
      recursive: true,
    });
    fs.writeFileSync(filePath, JSON.stringify(data));
  }

  _readJSON(filePath) {
    return JSON.parse(
      fs.readFileSync(filePath, {
        encoding: "utf8",
      })
    );
  }

  _tryParse(filePath, defaultValue) {
    let result;
    try {
      result = this._readJSON(filePath);
    } catch (ex) {
      result = defaultValue;
    }
    return result;
  }

  _del(targetPath) {
    try {
      if (!fs.existsSync(targetPath)) {
        return;
      }

      fs.unlinkSync(targetPath);
    } catch (error) {
      console.error(`Error while deleting ${targetPath}: ${error.message}`);
    }
  }
}

const nodeCache = new NodeCache({ maxKeys: 10, cacheFile: "foo" });

nodeCache.set("key", "1");
nodeCache.set("key3", "2");
nodeCache.set("key4", "2");
nodeCache.persist();
console.log(nodeCache.get("key"));
console.log(nodeCache.getAll());
