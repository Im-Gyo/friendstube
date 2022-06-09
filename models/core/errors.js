'use strict';
import util from 'util';

import constant from '../../util/constant.js';

const { HTTP_STATUS } = constant;

const errors = {
    // 공통 에러
    DbError: { code: 8000, status: HTTP_STATUS.SERVER_ERROR },
    InternalError: { code: 9999, status: HTTP_STATUS.SERVER_ERROR },
};

const entries = Object.entries(errors);
const exports = {};

entries.forEach(([errorName, codeStatus]) => {
    const { code, status } = codeStatus;

    const customError = function errorConstructor(message) {
        Error.captureStackTrace(this, customError);
        this.name = errorName;
        this.code = code;
        this.status = status;
        this.message = message;
    };

    util.inherits(customError, Error);

    exports[errorName] = customError;
});

export default exports;