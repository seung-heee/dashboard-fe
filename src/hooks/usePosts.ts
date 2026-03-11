import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import type { PostInput } from '../types/post.ts';

// 1. 목록 조회 훅
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => api.get('/api/posts').then((res) => res.data),
  });
};

// 2. 상세 조회 훅 (UpdatePost용)
export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => api.get(`/api/posts/${id}`).then((res) => res.data),
    enabled: !!id,
  });
};

// 3. 생성 뮤테이션
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: PostInput) => api.post('/api/posts', newPost),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
};

// 5. 수정 뮤테이션
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PostInput }) =>
      api.put(`/api/posts/${id}`, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({
        queryKey: ['posts', String(variables.id)],
      });
    },
  });
};

// 4. 삭제 뮤테이션
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/api/posts/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });
};
