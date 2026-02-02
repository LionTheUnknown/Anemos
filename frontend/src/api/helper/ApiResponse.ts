export class APIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  raw?: any;

  private constructor(success: boolean, message: string, data?: T, raw?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.raw = raw;
  }

  static success<T>(data: T, message: string = 'OK'): APIResponse<T> {
    return new APIResponse<T>(true, message, data);
  }

  static failure<T = any>(message: string, raw?: any): APIResponse<T> {
    return new APIResponse<T>(false, message, undefined, raw);
  }
}
