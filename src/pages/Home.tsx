import { useState } from 'react';
import { useNavigate } from 'react-router';
import PostCard from '../components/PostCard.tsx';
import HomeHeader from '../components/HomeHeader.tsx';

const initialPosts = [
  {
    id: 1,
    title: '첫 번째 게시물입니다',
    content: 'Vite와 React로 만드는 CRUD 게시판!',
    writer: '제미니',
  },
  {
    id: 2,
    title: 'Tailwind CSS 꿀팁',
    content: 'bg-sky-100은 정말 예쁜 색상이에요.',
    writer: '코딩왕',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);

  // 삭제 로직: 간지나게 confirm 하나 띄워주고 필터링!
  const handleDelete = (id: number) => {
    if (window.confirm('이 소중한 글을 삭제하시겠습니까?')) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <HomeHeader />

        <main className="flex flex-col gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content}
                writer={post.writer}
                // 상세 페이지 이동 (가칭 /post/1)
                onEdit={() => navigate(`/edit/${post.id}`)}
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
