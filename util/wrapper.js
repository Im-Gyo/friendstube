import { logger } from '../config/winston.js';
import constant from './constant.js';

const { SUCCESS } = constant.HTTP_STATUS;

/* ▼ 2022-05-13 async routing handler 데코레이터 패턴 적용 by 정민교 ▼ */
/* async fn은 promise를 반환하기 때문에 라우팅 핸들러 fn에서 사용할 경우 express에서 에러를 잡을 수 없음.
따라서 데코레이터 패턴을 활용해 랩핑함수를 만들어 라우팅 핸들러 fn을 주입받아 try/catch를 활용해 next로 에러 처리를 할 수 있도록 함 */
const asyncWrapper = (fn) => {
    return async function (req, res, next) {
        try {
            const result = await fn(req, res, next);

            return result;
        } catch (err) {
            logger.error("route error : ", err);
            console.log(err);
            const { code, status, message } = err;

            res.status(status).send({ code, message });
        }
    }
}
/* ▲ 2022-05-13 async routing handler 데코레이터 패턴 적용 by 정민교 ▲ */

export default { asyncWrapper };