import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import type { Wish } from "@/types/Wish";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { WishForm } from "./WishForm";

type Props = {
  wish: Wish;
  onDelete: (wishId: number) => void;
  onUpdate: (wish: Wish) => void;
};

export const CardWish: React.FC<Props> = ({ wish, onDelete, onUpdate }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [wishName, setWishName] = useState(wish.title);
  const [wishDescription, setWishDescription] = useState(wish.description);
  const [wishImg, setWishImg] = useState(wish.imageUrl);
  const [wishPrice, setWishPrice] = useState(wish.price);

  const handleWishIDChange = (wishId: number) => {
    const newParams = new URLSearchParams(searchParams);

    if (wishId) {
      newParams.set('wishId', wishId.toString());
    } else {
      newParams.delete('wishId');
    }

    setSearchParams(newParams);
  };

  const handleUpdateSubmit = async () => {
    const updatedWish: Wish = {
      ...wish,
      title: wishName,
      description: wishDescription,
      imageUrl: wishImg,
      price: wishPrice,
    };

    await onUpdate(updatedWish);
  };

  const resetFormOnClose = () => {
    setOpenUpdate(false);
    setWishName(wish.title);
    setWishDescription(wish.description);
    setWishImg(wish.imageUrl);
    setWishPrice(wish.price);
  };

  useEffect(() => {
    setWishName(wish.title);
    setWishDescription(wish.description);
    setWishImg(wish.imageUrl);
    setWishPrice(wish.price);
  }, [wish]);

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <img
        src={wish.imageUrl}
        alt={wish.title}
        className="w-full h-48 object-cover"
      />

      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200 line-clamp-2">
          {wish.title}
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
          {wish.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ${wish.price}
          </span>
        </div>

        <div className="flex gap-2">
          <Modal
            open={openDelete}
            setOpen={setOpenDelete}
            buttonTitle="Delete"
            buttonVariant="destructive"
            title="Delete wish?"
            description={`Are you sure you want to delete “${wish.title}”? This action cannot be undone.`}
          >
            {({ onClose }) => (
              <div className="flex gap-3 pt-2">
                <Button
                  title="Cancel"
                  variant="outline"
                  type="button"
                  onClick={onClose}
                />
                <Button
                  title="Yes, delete"
                  variant="destructive"
                  type="button"
                  onClick={async () => {
                    await onDelete(wish.id);
                    onClose();
                  }}
                />
              </div>
            )}
          </Modal>

          <Modal
            open={openUpdate}
            setOpen={setOpenUpdate}
            buttonTitle="Update"
            buttonVariant="outline"
            title="Update wish"
            description="Here you can update your wish"
          >
            {({ onClose }) => (
              <WishForm
                onClose={() => {
                  onClose();
                  resetFormOnClose();
                }}
                onSubmit={handleUpdateSubmit}
                wishName={wishName}
                setWishName={setWishName}
                wishDescription={wishDescription}
                setWishDescription={setWishDescription}
                wishImg={wishImg}
                setWishImg={setWishImg}
                wishPrice={wishPrice}
                setWishPrice={setWishPrice}
                submitButtonTitle="Save Changes"
              />
            )}
          </Modal>

          <Button
            linkTo={`/wish/${wish.id}`}
            title="Details"
            className="text-white bg-indigo-600 hover:bg-indigo-700 font-medium"
            onClick={() => handleWishIDChange(wish.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
