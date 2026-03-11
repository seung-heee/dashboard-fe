import { useNavigate } from 'react-router';

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-end mb-10">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
          Feed
        </h1>
        <p className="text-slate-500 font-medium mt-1">
          오늘의 생각을 공유해보세요.
        </p>
      </div>
      <button onClick={() => navigate('/create-post')} className="custom-btn ">
        <span className="mr-1 text-lg">+</span> 새 글 작성
      </button>
    </div>
  );
};

export default HomeHeader;
