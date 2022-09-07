const ObjectId = require('mongoose').Types.ObjectId;

export const isValidObjectId = (id: string) => {
    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}




// export const isObject = (obj: object) => {
//     if (Array.isArray(obj)) return false;
//     if (typeof obj === 'object') return true;
//     return false;
// }
