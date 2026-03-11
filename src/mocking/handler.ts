import { http, HttpResponse } from 'msw';
import { posts } from './mockPosts.ts';
import type { Post } from '../types/post.ts';

const BASE_URL = 'http://localhost:8080';

export const handlers = [
  // 전체 조회
  http.get(`${BASE_URL}/api/posts`, () => {
    return HttpResponse.json(posts);
  }),

  // 상세 조회
  http.get(`${BASE_URL}/api/posts/:id`, ({ params }) => {
    const post = posts.find((p) => p.id === Number(params.id));
    return HttpResponse.json(post);
  }),

  // 게시글 생성
  http.post(`${BASE_URL}/api/posts`, async ({ request }) => {
    const newPost = (await request.json()) as Post;
    const id = posts.length + 1;
    posts.push({ ...newPost, id });
    return HttpResponse.json({ id }, { status: 201 });
  }),

  // 게시글 수정
  http.put(`${BASE_URL}/api/posts/:id`, async ({ request, params }) => {
    const targetId = Number(params.id);
    const updatedData = (await request.json()) as Post;
    const index = posts.findIndex((p) => p.id === targetId);

    if (index !== -1) {
      posts[index] = { ...posts[index], ...updatedData, id: targetId };
    }

    return HttpResponse.json(posts[index]);
  }),

  // 게시글 삭제
  http.delete(`${BASE_URL}/api/posts/:id`, ({ params }) => {
    const targetId = Number(params.id);
    const index = posts.findIndex((p) => p.id === targetId);

    if (index !== -1) {
      posts.splice(index, 1); // 원본 배열(const)의 특정 인덱스 요소를 제거
    }

    return new HttpResponse(null, { status: 200 });
  }),
];
