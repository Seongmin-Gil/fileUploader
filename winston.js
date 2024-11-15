const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");

const { combine, timestamp, printf, colorize } = winston.format;

const logDir = "logs";

const logFormat = printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  });
  /*
   * Log Level
   * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
   */
  const logger = winston.createLogger({
    format: combine(
      timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      logFormat
    ),
    transports: [
      // info 레벨 로그를 저장할 파일 설정
      new winstonDaily({
        level: "info",
        datePattern: "YYYY-MM-DD",
        dirname: logDir,
        filename: `%DATE%.log`, // file 이름 날짜로 저장
        maxFiles: 30, // 30일치 로그 파일 저장
        zippedArchive: true,
      }),
      // warn 레벨 로그를 저장할 파일 설정
      new winstonDaily({
        level: "warn",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/warn",
        filename: `%DATE%.warn.log`, // file 이름 날짜로 저장
        maxFiles: 30, // 30일치 로그 파일 저장
        zippedArchive: true,
      }),
      // error 레벨 로그를 저장할 파일 설정
      new winstonDaily({
        level: "error",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
        filename: `%DATE%.error.log`,
        maxFiles: 30,
        zippedArchive: true,
      }),
    ],
  });
  
  logger.stream = {
    // morgan wiston 설정
    write: (message) => {
      logger.info(message);
    },
  };
  
  
  module.exports = logger;