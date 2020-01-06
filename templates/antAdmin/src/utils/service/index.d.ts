export enum test {
    a = 1
}

export interface  ActionType {
  type: ActionName
  response ?: any,
  error?: string
}

export enum ActionName {
  INIT = 'init',
  SUCCESS = 'success',
  ERROR = 'error'
}