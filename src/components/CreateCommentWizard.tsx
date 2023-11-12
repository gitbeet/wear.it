import React, { useState } from "react";
import { api } from "~/utils/api";
import Rating from "./Rating";

const CreateReviewWizard = ({ productId }: { productId: string }) => {
  const ctx = api.useUtils();
  const { mutate: post, isLoading: isPosting } =
    api.review.createReview.useMutation({
      onSuccess: () => {
        void ctx.invalidate();
        setComment("");
      },
    });

  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) {
      setErrorMessage("Cannot be blank");
      return;
    }
    post({ productId, comment, rate });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setComment(e.target.value);
  };

  // // if no user rating, you can hover
  // const isHoverable = !!!userRating;

  return (
    <form onSubmit={handleSubmit}>
      <Rating isHoverable={true} averageRating={rate} handleRate={setRate} />
      <div className="flex justify-between">
        <label htmlFor="commentInput">Leave a comment</label>
        <p className="text-sm text-red-500">{errorMessage}</p>
      </div>
      <div className="h-2"></div>
      <textarea
        value={comment}
        onChange={handleChange}
        id="commentInput"
        rows={4}
        className={`${
          errorMessage && "border-red-500"
        } w-full resize-none border`}
      />
      <div className="h-4"></div>
      <button disabled={isPosting} className="w-fit border border-gray-500">
        Post
      </button>
    </form>
  );
};

export default CreateReviewWizard;
