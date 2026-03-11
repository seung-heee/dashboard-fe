interface PostCardProps {
  title: string;
  content: string;
  writer: string;
  onEdit: () => void;
  onDelete: () => void;
}

const PostCard = ({
  title,
  content,
  writer,
  onEdit,
  onDelete,
}: PostCardProps) => {
  return (
    <div className="flex items-center justify-between w-full bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow group">
      {/* 왼쪽: 게시글 정보 */}
      <div className="flex flex-col gap-1 overflow-hidden flex-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 bg-sky-100 text-sky-600 rounded-lg">
            {writer}
          </span>
          <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
        </div>
        <p className="text-sm text-gray-500 truncate mt-1">{content}</p>
      </div>

      {/* 오른쪽: 수정/삭제 버튼 (평소엔 흐릿하다가 호버 시 선명해짐) */}
      <div className="flex gap-2 ml-4 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="px-3 py-1.5 text-xs font-semibold text-sky-600 border border-sky-100 rounded-xl hover:bg-sky-50 transition-colors"
        >
          수정
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-500/10 rounded-xl hover:bg-red-50 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default PostCard;
