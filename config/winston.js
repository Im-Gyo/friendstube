/* 
    2022-05-11 winston 로그 설정 by 정민교
 */

import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, printf } = winston.format;

const LOG_PATH = 'logs'; // logs 디렉토리 하위에 로그파일 저장

// log 출력 포맷 정의
const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * log 레벨
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat
    ),
    transports: [
        // info 레벨 로그 설정
        new winston.transports.DailyRotateFile({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: LOG_PATH,
            filename: `%DATE%.log`,
            maxSize: '10m',
            maxFiles: '7d',
            zippedArchive: false,
            json: false,
        }),
        // error 레벨 로그 설정
        new winston.transports.DailyRotateFile({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: LOG_PATH + '/error',
            filename: `%DATE%.error.log`,
            maxSize: '10m',
            maxFiles: '7d',
            zippedArchive: false,
            json: false,
        }),
    ],
});

// Production 환경이 아닌 경우(dev 등)
if(process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(            
            winston.format.simple(),        // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
        )
    }));
}

export { logger };