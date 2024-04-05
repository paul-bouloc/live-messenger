export type SocketResponse = {
  success: boolean;
  message: string;
  data: {[key: string]: unknown} | null;
}