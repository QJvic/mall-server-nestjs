export function splitBase64(val: string) {
  val = val.replace(/^data:image\/\w+;base64,/, '');
  return val;
}

export function table2tree(table, id: string, pid: string) {
  let list = table;
  let tree = [];
  // 将所有的pid的数据加到对应的id数据对象里面去，需要添加一个属性children
  for (let i = 0; i < list.length; i++) {
    let arr = [];
    for (let j = 0; j < list.length; j++) {
      if (list[i][id] === list[j][pid]) {
        list[i].children = arr;
        arr.push(list[j]);
      }
    }
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i][pid] == 0) {
      tree.push(list[i]);
    }
  }
  return tree;
}
