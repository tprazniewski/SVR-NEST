const ObjectId = require('mongoose').Types.ObjectId;
export const nameOrIdQuery = (idOrName) => {
  if (ObjectId.isValid(idOrName)) {
    if (String(new ObjectId(idOrName)) === idOrName) {
      return { _id: idOrName };
    }

    return { name: idOrName };
  }
};
