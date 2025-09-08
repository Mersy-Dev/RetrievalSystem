import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  cta: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, cta }) => {
  return (
    <div className="mx-4 my-4 w-full sm:w-[320px] min-h-[260px] 
      bg-white/30 dark:bg-gray-800/40 
      backdrop-blur-md rounded-2xl shadow-lg 
      transition transform hover:scale-105 hover:shadow-2xl 
      hover:bg-white/40 dark:hover:bg-gray-800/60 
      hover:backdrop-blur-xl p-6 border 
      border-gray-200 dark:border-gray-700 
      hover:border-sky-400 hover:border-[1px] 
      flex flex-col justify-center items-center text-center"
    >
      <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-400">
        {title}
      </h3>
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        {description}
      </p>
      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition">
        {cta} →
      </button>
    </div>
  );
};

export default FeatureCard;
