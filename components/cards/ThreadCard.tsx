import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import LikeThread from "../forms/LikeThread";
import ShareThread from "../forms/ShareThread";
import { threadId } from "worker_threads";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  likes: Array<string>;
  isAnonym: boolean;
  author: {
    name: string;
    verif: boolean;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes,
  isAnonym,
}: Props) {
  return (
    <article
      className={`flex w-full flex-col rounded-3xl ${isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
        }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            {isAnonym ? (
              <Link href={'/anonym'} className='relative h-11 w-11'>

                <Image
                  src={'/anonym.png'}
                  alt='user_community_image'
                  fill
                  className='cursor-pointer rounded-full'
                />
              </Link>

            ) : (
              <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>

                <Image
                  src={author.image}
                  alt='user_community_image'
                  fill
                  className='cursor-pointer rounded-full'
                />
              </Link>

            )}
          </div>

          <div className='flex w-full flex-col'>
            {isAnonym ? (
              <>
                <Link href={'/anonym'} className='w-fit'>
                  <div className="row">
                    <h4 className='cursor-pointer text-base-semibold text-light-1'>
                      Анонимный пост
                    </h4>
                    <div className="verif v2"></div>
                  </div>
                </Link></>
            ) : (
              <Link href={`/profile/${author.id}`} className='w-fit'>
                <div className="row">
                  <h4 className='cursor-pointer text-base-semibold text-light-1'>
                    {author.name}
                  </h4>
                  {author.verif === true && (
                    <div className="verif v2"></div>
                  )}
                </div>
              </Link>
            )}


            <p className='mt-2 text-small-regular text-light-2'>{content}</p>


            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className='flex gap-3.5 row'>
                <button className="row">
                  <LikeThread
                    threadId={JSON.stringify(id)}
                    currentUserId={currentUserId}
                    authorId={author.id}
                    parentId={parentId}
                    isComment={isComment}
                    likes={likes}
                  />
                </button>
                <Link href={`/thread/${id}`} className="row">
                  <p className='mt-1 text-subtle-medium text-gray-1 right2px'>
                    {comments.length}
                  </p>
                  <Image
                    src='/assets/reply.svg'
                    alt='reply'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <ShareThread
                  threadId={'https://ecoel.vercel.app/thread/' + id}
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} ответ{comments.length > 1 ? '' : ''}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className='ml-1 mt-3 flex items-center gap-2'>
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comments.length} ответ{comments.length > 1 ? 'а' : ''}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-5 flex items-center'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className='ml-1 rounded-full object-cover'
          />
        </Link>
      )}
    </article>
  );

}


export default ThreadCard;
