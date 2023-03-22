import ActionType from './type';

export const uploadData = (fileName, schema, data) => ({
    type: ActionType.UPLOAD_DATA,
    fileName,
    schema,
    data
})

export const changeData = (fileName) => ({
    type: ActionType.CHANGE_DATA,
    fileName,
})
