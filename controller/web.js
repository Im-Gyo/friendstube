import * as model from "../database/apiModel.js";

const getUserInfo = async (req, res, next) => {
    const { id } = req.param;
    const userInfo = await model.getUserInfo(id);
    
    return userInfo;
};

export default { getUserInfo };
