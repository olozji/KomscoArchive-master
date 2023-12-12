export interface ResData {
  head: Head;
  body?: any | null;
}

interface Head {
  resultCode: string;
  resultMsg: string;
}
