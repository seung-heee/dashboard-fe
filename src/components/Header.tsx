import { FC } from 'react';
import { useNavigate } from 'react-router';

type Props = {
  title: string;
  showBack?: boolean;
};

const Header: FC<Props> = ({ title, showBack = true }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-4xl mx-auto h-16 flex items-center justify-between px-6">
        <div className="flex-1">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 transition-all active:scale-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5 text-slate-600 group-hover:text-sky-500 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}
        </div>

        <h1 className="flex- text-center text-lg font-bold text-slate-800 tracking-tight">
          {title}
        </h1>

        <div className="flex-1" />
      </div>
    </header>
  );
};

export default Header;
