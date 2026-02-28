import { Params } from 'nestjs-pino';
import { AppConfigService } from './app-config.service';

export const getLoggerConfig = (config: AppConfigService): Params => ({
  pinoHttp: {
    level: config.isProduction ? 'info' : 'debug',
    customProps: () => ({ context: 'HTTP' }),

    customSuccessMessage: (req, res) => `[${req.method}] ${req.url} - ${res.statusCode}`,
    customErrorMessage: (req, res) =>
      `[${req.method}] ${req.url} - ${res.statusCode} - Hiba történt`,

    customLogLevel: (req, res, err) => {
      if (res.statusCode >= 400 && res.statusCode < 500) return 'warn';
      if (res.statusCode >= 500 || err) return 'error';
      return 'info';
    },

    serializers: {
      req: (req) => ({
        ip: req.headers['x-forwarded-for'] || req.remoteAddress,
        userAgent: req.headers['user-agent'],
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },

    transport: config.isProduction
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            singleLine: false,
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
  },
});
