export interface Post {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt?: string; // (선택) 생성일자까지 넣어주면 더 완성도 높음
}

// 생성이나 수정 시 사용할 타입 (id 제외)
export type PostInput = Omit<Post, 'id' | 'createdAt'>;
