import { ObjectID } from 'mongodb';

const ObjectId = require('mongoose').Types.ObjectId;
export const nameOrObjectIdQuery = (idOrName) => {
  if (ObjectId.isValid(idOrName)) {
    if (String(new ObjectId(idOrName)) === idOrName) {
      return { _id: new ObjectID(idOrName) };
    }
  }
  return { name: idOrName };
};
