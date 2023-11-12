import React, { useState } from "react";
import { api } from "~/utils/api";

const CreateCommentWizard = ({ productId }: { productId: string }) => {
  const ctx = api.useUtils();
  const { mutate: post, isLoading: isPosting } =
    api.comment.createComment.useMutation({
      onSuccess: () => ctx.invalidate(),
    });

  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post({ productId, content });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="commentInput">Leave a comment</label>
      <textarea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        id="commentInput"
        rows={4}
        className="resize-none border"
      />
      <button disabled={isPosting} className="w-fit border border-gray-500">
        Post
      </button>
    </form>
  );
};

export default CreateCommentWizard;
