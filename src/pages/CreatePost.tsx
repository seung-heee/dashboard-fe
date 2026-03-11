import { useForm } from 'react-hook-form';
import Header from '../components/Header.tsx';

interface PostFormData {
  title: string;
  content: string;
  writer: string;
}

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>();

  const onSubmit = (data: PostFormData) => {
    console.log('제출된 데이터: ', data);
    alert('게시글 등록 완료!');
  };

  return (
    <div className="min-h-screen bg-white">
      {' '}
      {/* 전체 배경을 깔끔하게 화이트로 */}
      <Header title={'게시물 생성'} />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8" // 간격을 더 넓게 주어 시원하게 배치
        >
          {/* 제목 (Title) - 가장 중요하므로 맨 위로, 폰트도 크게 */}
          <div className="flex flex-col gap-2">
            <input
              {...register('title', { required: '제목은 필수입니다.' })}
              placeholder="제목을 입력하세요"
              className="text-3xl font-bold text-slate-900 border-none outline-none placeholder:text-slate-300 transition-all"
            />
            <div className="h-[1px] bg-slate-100 w-full" />{' '}
            {/* 가느다란 구분선 */}
            {errors.title && (
              <span className="text-red-400 text-xs ml-1 font-medium">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* 작성자 (Writer) - 작고 깔끔한 라인 스타일 */}
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
          <div className="pt-10 flex justify-end">
            <button type="submit" className="custom-btn">
              게시글 등록하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreatePost;
