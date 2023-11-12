import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { BsTrash } from "react-icons/bs";
import { api, type RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);

interface Props {
  comment: RouterOutputs["comment"]["getCommentsByProductId"][number];
}

const Comment = ({ comment }: Props) => {
  const { user } = useUser();
  const ctx = api.useUtils();
  const { mutate: deleteComment, isLoading: isDeletingComment } =
    api.comment.deleteComment.useMutation({
      onSuccess: () => ctx.invalidate(),
    });
  return (
    <div className="grid grid-cols-[64px,1fr] gap-4">
      <Image
        className="shrink-0"
        src={comment.author.profilePicture}
        width={64}
        height={64}
        alt={`${comment.author.username}'s profile picture`}
      />
      <div>
        <p>{comment.author.username}</p>
        <div className="h-2"></div>
        <p className="font-light">{comment.comment.content}</p>
        <div className="h-2"></div>
        <p className="text-right text-gray-500">
          {dayjs(comment.comment.createdAt).fromNow()}
        </p>
        <div className="h-4"></div>
        {user?.id === comment.author.id && (
          <div className="flex w-full justify-end">
            <button disabled={isDeletingComment}>
              <BsTrash
                onClick={() => deleteComment({ id: comment.comment.id })}
                role="button"
                className="h-5 w-5 text-gray-800"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
