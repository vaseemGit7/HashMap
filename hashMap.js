class HashMap {
  constructor(capacity, defaultLoadFactor) {
    this.capacity = capacity;
    this.defaultLoadFactor = defaultLoadFactor;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  getBucketIndex(key) {
    let hashCode = this.hash(key);
    return hashCode % this.capacity;
  }

  getEntry(bucketIndex, key) {
    let bucket = this.buckets[bucketIndex];
    for (let entry of bucket)
      if (entry.key === key) {
        return entry;
      }
    return null;
  }

  reHash() {
    let oldBuckets = this.buckets;
    this.capacity = 2 * this.capacity;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.size = 0;

    for (let bucket of oldBuckets) {
      for (let entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }

  set(key, value) {
    let bucketIndex = this.getBucketIndex(key);
    let entry = this.getEntry(bucketIndex, key);
    let loadFactor;

    if (entry) {
      entry.value = value;
      return;
    }
    this.buckets[bucketIndex].push({ key, value });
    this.size++;
    loadFactor = this.size / this.capacity;
    if (loadFactor > this.defaultLoadFactor) {
      this.reHash();
    }
  }

  get(key) {
    let bucketIndex = this.getBucketIndex(key);
    let entry = this.getEntry(bucketIndex, key);
    return entry;
  }

  has(key) {
    let bucketIndex = this.getBucketIndex(key);
    let entry = this.getEntry(bucketIndex, key);
    return entry ? true : false;
  }

  remove(key) {
    let bucketIndex = this.getBucketIndex(key);
    let bucket = this.buckets[bucketIndex];
    let entryIndex = bucket.findIndex((e) => e.key === key);
    if (entryIndex !== -1) {
      bucket.splice(entryIndex, 1);
      this.size--;
      return true;
    }
    return false;
  }

  length() {
    let entriesLength = 0;
    for (let bucket of this.buckets) {
      entriesLength += bucket.length;
    }
    return entriesLength;
  }

  clear() {
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
  }

  keys() {
    let keys = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        keys.push(entry.key);
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        values.push(entry.value);
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        entries.push([entry.key, entry.value]);
      }
    }
    return entries;
  }
}

export default HashMap;
