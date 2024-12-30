import { useState } from "react";
import { api } from "~/utils/api";
import Rating from "./Rating";
import Button from "../ui/Button";

const initialErrorMessage = { review: "", rate: "" };

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
  const [rate, setRate] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState({ review: "", rate: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const isThereAWordTooLong =
    //   comment.split(" ").findIndex((word) => word.length > 20) !== -1;
    // let error = false;
    // if (isThereAWordTooLong) {
    //   setErrorMessage((prev) => ({
    //     ...prev,
    //     review: "There's a word that is too long.",
    //   }));
    //   error = true;
    // }
    if (!comment) {
      setErrorMessage((prev) => ({ ...prev, review: "Cannot be blank" }));
      // error = true;
    }
    if (!rate) {
      setErrorMessage((prev) => ({ ...prev, rate: "Please rate the item" }));
      // error = true;
    }
    if (!comment || !rate) return;
    post({ productId, comment, rate });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (errorMessage) {
      setErrorMessage(initialErrorMessage);
    }
    setComment(e.target.value);
  };

  // // if no user rating, you can hover
  // const isHoverable = !!!userRating;

  return (
    <>
      <p className="text-lg font-bold">Write a review</p>
      <div className="h-6"></div>
      <form onSubmit={handleSubmit} className="flex flex-col pl-4 ">
        <div className="flex justify-between">
          <p className="font-semibold">
            Overall rating<span className="pl-1 text-red-500">*</span>
          </p>
          <p className="text-sm text-red-500">{errorMessage.rate}</p>
        </div>
        <div className="h-4"></div>
        <div
          onMouseOver={() => setErrorMessage((prev) => ({ ...prev, rate: "" }))}
          className={errorMessage.rate && " text-red-500"}
        >
          <Rating
            isHoverable={true}
            averageRating={rate ?? 0}
            handleRate={setRate}
          />
        </div>
        <div className="h-6"></div>
        <div className="flex justify-between">
          <label className="font-semibold" htmlFor="commentInput">
            Your review<span className="pl-1 text-red-500">*</span>
          </label>
          <p className="text-sm text-red-500">{errorMessage.review}</p>
        </div>
        <div className="h-4"></div>
        <textarea
          value={comment}
          onChange={handleChange}
          id="commentInput"
          rows={4}
          className={`${
            errorMessage.review && "border-red-500"
          } w-full resize-none border`}
        />
        <div className="h-4"></div>
        <div className="self-end">
          <Button
            size="SM"
            width="FIT"
            text="Submit"
            onClick={() => void 0}
            disabled={isPosting}
            ghost
          />
        </div>
      </form>
    </>
  );
};

export default CreateReviewWizard;
