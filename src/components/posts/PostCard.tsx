import React from 'react';
import { User } from 'lucide-react';
import Card from '../ui/Card';
import { Post } from '../../hooks/useApi';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="p-6 h-full animate-fade-in" hover>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">User {post.userId}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Post #{post.id}</p>
          </div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
        {post.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-4">
        {post.body}
      </p>
    </Card>
  );
};

export default PostCard;