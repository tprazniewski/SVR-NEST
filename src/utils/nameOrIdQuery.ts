const ObjectId = require('mongoose').Types.ObjectId;
export const nameOrIdQuery = (idOrName) => {
  if (ObjectId.isValid(idOrName)) {
    console.log('yhy');
    if (String(new ObjectId(idOrName)) === idOrName) {
      console.log('weszlo');
      return { _id: idOrName };
    }
  }
  return { name: idOrName };
};
