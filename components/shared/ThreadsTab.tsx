import { redirect } from "next/navigation";

import { fetchUserPosts } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";

interface Result {
  name: string;
  image: string;
  id: string;
  verif: boolean;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    verif: boolean;
    likes: Array<string>
    isAnonym: boolean;
    author: {
      name: string;
      image: string;
      id: string;
      verif: boolean;
    };
    community: {
      id: string;
      name: string;
      image: string;
      verif: boolean;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;
{
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    redirect("/");
  }
    
  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          likes={thread.likes}
          isAnonym={thread.isAnonym}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id, verif: result.verif }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                  verif: thread.author.verif,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );

  }
export default ThreadsTab;
