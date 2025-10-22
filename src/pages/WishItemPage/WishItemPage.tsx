import {
  getWish,
  deleteWish,
  updateWish,
} from "@/api/wishAPI";
import { Button } from "@/components/Button";
import type { Wish } from "@/types/Wish";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/Modal";
import { WishForm } from "@/components/WishForm";
import { Toaster } from '@/components/ui/sonner';

export const WishItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [wish, setWish] = useState<Wish | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [wishName, setWishName] = useState('');
  const [wishDescription, setWishDescription] = useState('');
  const [wishImg, setWishImg] = useState('');
  const [wishPrice, setWishPrice] = useState(0);

  useEffect(() => {
    if (id) {
      setIsLoading(true);

      getWish(id)
        .then(data => {
          if (data) {
            setWish(data);
            setWishName(data.title);
            setWishDescription(data.description);
            setWishImg(data.imageUrl);
            setWishPrice(data.price);
          } else {
            setWish(null);
            setTimeout(() => navigate("/"), 3000);
          }
        })
        .catch(err => {
          console.error('Failed to fetch wish:', err);
          setTimeout(() => navigate("/"), 3000);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, navigate]);
  
  const handleDelete = async () => {
    if (!wish) return;

    const toastId = toast.loading("Deleting wish...");
    try {
      await deleteWish(wish.id);
      toast.success("Wish deleted!", {
        id: toastId,
        description: "Redirecting to dashboard...",
        duration: 2000,
      });
      setOpenDelete(false);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Failed to delete wish:", error);
      toast.error("Failed to delete", {
        id: toastId,
        description: (error as Error).message || "Could not delete wish."
      });
      throw error;
    }
  };

  const handleUpdateSubmit = async () => {
    if (!wish) return;

    const updatedWish: Wish = {
      ...wish,
      title: wishName,
      description: wishDescription,
      imageUrl: wishImg,
      price: wishPrice,
    };

    const toastId = toast.loading("Updating wish...");
    try {
      const returnedWish = await updateWish(updatedWish);
      
      setWish(returnedWish);
      setWishName(returnedWish.title);
      setWishDescription(returnedWish.description);
      setWishImg(returnedWish.imageUrl);
      setWishPrice(returnedWish.price);

      toast.success("Wish updated!", { id: toastId });
      setOpenUpdate(false); 
    } catch (error) {
      console.error("Failed to update wish:", error);
      toast.error("Update failed", {
        id: toastId,
        description: (error as Error).message || "Could not save changes."
      });
      throw error;
    }
  };

  const resetFormOnClose = () => {
    if (!wish) return;
    setOpenUpdate(false);
    setWishName(wish.title);
    setWishDescription(wish.description);
    setWishImg(wish.imageUrl);
    setWishPrice(wish.price);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className='max-w-4xl mx-auto'>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-6 font-medium"
        >
          <ArrowLeft size={18} />
          Go Back
        </Link>
        
        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <Skeleton className="w-full h-64 md:h-96" />
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <Skeleton className="h-10 w-3/5" />
                <Skeleton className="h-10 w-1/5" />
              </div>
              <Skeleton className="h-6 w-full mt-2" />
              <Skeleton className="h-6 w-full mt-2" />
              <Skeleton className="h-6 w-4/5 mt-2" />
            </div>
          </div>
        ) : wish ? (
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <img
              src={wish.imageUrl}
              alt={wish.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {wish.title}
                </h1>
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                  ${wish.price}
                </span>
              </div>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {wish.description}
              </p>
            </div>
            
            <footer className="bg-gray-50 dark:bg-gray-700/50 p-6 flex justify-end gap-3">
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

                        await handleDelete(); 
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
            </footer>
          </div>
        ) : (
          <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <p className="text-xl dark:text-gray-200">Redirecting to dashboard...</p>
          </div>
        )}
      </div>

      <Toaster richColors position="bottom-center" />
    </div>
  );
}