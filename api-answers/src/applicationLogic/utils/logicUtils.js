function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
            map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

function countGroupsBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, {
                day: key,
                count:1
            });
        } else {
            map.set(key, {
                day: key,
                count: collection.count + 1
            })
        }
    });
    return Array.from(map.values());
}

module.exports.groupBy = groupBy;
module.exports.countGroupsBy = countGroupsBy;