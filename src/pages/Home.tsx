import { useNavigate } from 'react-router';
import PostCard from '../components/PostCard.tsx';
import HomeHeader from '../components/HomeHeader.tsx';
import { useDeletePost, usePosts } from '../hooks/usePosts.ts';
import type { Post } from '../types/post.ts';

const Home = () => {
  const navigate = useNavigate();
  const { data: posts, isLoading, isError } = usePosts();
  const { mutate: deletePost } = useDeletePost();

  if (isLoading)
    return (
      <div className="p-10 text-center text-slate-400">
        데이터를 불러오는 중...
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-center text-red-400">
        데이터를 가져오지 못했습니다.
      </div>
    );

  const handleDelete = (id: number) => {
    if (confirm('이 글을 삭제하시겠습니까?')) {
      deletePost(id);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <HomeHeader />

        <main className="flex flex-col gap-4">
          {posts?.length > 0 ? (
            posts.map((post: Post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
                writer={post.writer}
                onEdit={() => navigate(`/update-post/${post.id}`)}
                onDelete={() => handleDelete(post.id)}
              />
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
              <p className="text-slate-400 font-medium">
                아직 작성된 글이 없습니다.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
