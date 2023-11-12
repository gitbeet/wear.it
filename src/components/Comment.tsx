import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { type RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);

interface Props {
  comment: RouterOutputs["comment"]["getCommentsByProductId"][number];
}

const Comment = ({ comment }: Props) => {
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
        <div className="h-4"></div>
        <p className="text-right">
          {dayjs(comment.comment.createdAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default Comment;
