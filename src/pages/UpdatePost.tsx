import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router'; // 파라미터와 이동을 위해 추가
import Header from '../components/Header.tsx';
import { usePost, useUpdatePost } from '../hooks/usePosts.ts';

interface PostFormData {
  title: string;
  content: string;
  writer: string;
}

const UpdatePost = () => {
  const { id } = useParams<{ id: string }>() || '';
  const { data: post, isLoading, isError } = usePost(id || '');
  const navigate = useNavigate();
  const { mutate, isPending } = useUpdatePost();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>();

  useEffect(() => {
    if (post) {
      reset(post); // 서버에서 온 데이터를 폼의 초기값으로 꽂아넣음
    }
  }, [post, reset]);

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

  const onSubmit = (data: PostFormData) => {
    mutate(
      { id: Number(id), data: data },
      {
        onSuccess: () => {
          alert('수정되었습니다!');
          navigate(`/`);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title={'게시물 수정'} />

      <main className="max-w-2xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* 제목 (Title) */}
          <div className="flex flex-col gap-2">
            <input
              {...register('title', { required: '제목은 필수입니다.' })}
              placeholder="제목을 입력하세요"
              className="text-3xl font-bold text-slate-900 border-none outline-none placeholder:text-slate-300 transition-all"
            />
            <div className="h-[1px] bg-slate-100 w-full" />
            {errors.title && (
              <span className="text-red-400 text-xs ml-1 font-medium">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* 작성자 (Writer) - 수정 페이지에선 보통 읽기 전용으로 두기도 하지만, 폼은 유지했습니다 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-sm font-semibold whitespace-nowrap">
                작성자:
              </span>
              <input
                {...register('writer', { required: '작성자를 입력해주세요.' })}
                placeholder="이름"
                className="flex-1 text-sm font-medium border-none outline-none placeholder:text-slate-300"
              />
            </div>
            {errors.writer && (
              <span className="text-red-400 text-xs font-medium">
                {errors.writer.message}
              </span>
            )}
          </div>

          {/* 내용 (Content) */}
          <div className="flex flex-col gap-2">
            <textarea
              {...register('content', {
                required: '내용을 작성해주세요.',
                minLength: { value: 5, message: '최소 5자 이상 입력해주세요.' },
              })}
              placeholder="당신의 이야기를 들려주세요..."
              rows={12}
              className="w-full text-lg text-slate-700 border-none outline-none resize-none placeholder:text-slate-300 leading-relaxed"
            />
            {errors.content && (
              <span className="text-red-400 text-xs font-medium">
                {errors.content.message}
              </span>
            )}
          </div>

          {/* 하단 버튼: 공통 custom-btn 사용 */}
          <div className="pt-10 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-slate-400 font-medium hover:text-slate-600 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={`custom-btn ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPending ? '등록 중...' : '게시글 등록하기'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdatePost;
