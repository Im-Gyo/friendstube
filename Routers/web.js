import express from "express";

import wrapper from "../util/wrapper.js";

import webController from "../controller/web.js";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
    // let result = wrapper.asyncWrapper(webController.getUserInfo);
    res.render('videoRoom');
});

export default apiRouter;