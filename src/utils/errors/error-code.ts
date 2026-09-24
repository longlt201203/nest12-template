export enum ErrorCode {
  SUCCESS = 'SUCCESS',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export const ErrorMessage: Record<ErrorCode, string> = {
  [ErrorCode.SUCCESS]: 'Success',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
};
