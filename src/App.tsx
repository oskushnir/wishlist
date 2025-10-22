import { Outlet, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addNewWish, deleteWish, getWishes, updateWish } from './api/wishAPI';
import type { Wish } from './types/Wish';
import { CardWish } from './components/CardWish';
import { DropDown } from './components/DropDown';
import { dateSortOptions } from './utils/dateSortOptions';
import { priceSortOptions } from './utils/priceSortOptions';
import { Modal } from './components/Modal';
import { PlusIcon } from './icons/PlusIcon';
import { WishForm } from './components/WishForm';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [wishes, setWishes] = useState<Wish[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const filterByDate = searchParams.get('date') || '';
  const filterByPrice = searchParams.get('price') || '';

  const [wishName, setWishName] = useState<string>("");
  const [wishDescription, setWishDescription] = useState<string>("");
  const [wishImg, setWishImg] = useState<string>("");
  const [wishPrice, setWishPrice] = useState<number>(0);

  const [openNewModal, setOpenNewModal] = useState(false);

  const handleAddWish = async () => {
    const toastId = toast.loading("Adding new wish...");
    try {
      const newWish = await addNewWish({
        title: wishName,
        description: wishDescription,
        imageUrl: wishImg,
        price: wishPrice,
      });

      setWishes((prev) => [newWish, ...prev]);

      setWishName("");
      setWishDescription("");
      setWishImg("");
      setWishPrice(0);

      toast.success("Wish added successfully!", { id: toastId });
      setOpenNewModal(false);
    } catch (error) {
      console.error("Failed to add wish:", error);
      toast.error("Failed to add wish", {
        id: toastId,
        description: (error as Error).message,
      });
      throw error;
    }
  };

  const handleDelete = async (wishId: number) => {
    const toastId = toast.loading("Deleting wish...");
    try {
      await deleteWish(wishId);
      setWishes((prev) => prev.filter((w) => w.id !== wishId));
      toast.success("Wish deleted!", { id: toastId });
    } catch (error) {
      console.error("Failed to delete wish:", error);
      toast.error("Failed to delete wish", {
        id: toastId,
        description: (error as Error).message,
      });
      throw error;
    }
  };

  const handleUpdateWish = async (updatedWish: Wish) => {
    const toastId = toast.loading("Updating wish...");
    try {
      const returnedWish = await updateWish(updatedWish);

      setWishes((prev) =>
        prev.map((w) => (w.id === returnedWish.id ? returnedWish : w))
      );
      toast.success("Wish updated!", { id: toastId });
    } catch (error) {
      console.error("Failed to update wish:", error);
      toast.error("Failed to update wish", {
        id: toastId,
        description: (error as Error).message,
      });
      throw error;
    }
  };

  const handleDateFilterChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('date', value);
      newParams.delete('price');
    } else {
      newParams.delete('date');
    }

    setSearchParams(newParams);
  };

  const handlePriceFilterChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('price', value);
      newParams.delete('date');
    } else {
      newParams.delete('price');
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    getWishes({ filterByDate, filterByPrice })
      .then(wishes => {
        setWishes(wishes);
      })
      .catch(error => {
        console.error("Failed to get wishes:", error);
      });
  }, [filterByDate, filterByPrice]);

  return (
    <main className='min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='max-w-[1400px] mx-auto py-8'>
        <div className='flex flex-col gap-5'>
          <div className='flex gap-5 justify-center'>
            <DropDown setSortOption={handleDateFilterChange} items={dateSortOptions} buttonTitle='Filter By Date' />
            <DropDown setSortOption={handlePriceFilterChange} items={priceSortOptions} buttonTitle='Filter By Price' />
          </div>

          <div className='flex justify-center'>
            <Modal
              open={openNewModal}
              setOpen={setOpenNewModal}
              title='Add New Wish'
              description='Here you can add your new wish'
              hasImg
              img={<PlusIcon className="w-4 h-4 mr-2" />}
              buttonTitle='Add New Wish'
              buttonClassname="text-white bg-indigo-600 hover:bg-indigo-700 font-medium"
            >
              {({ onClose }) => (
                <WishForm
                  onClose={onClose}
                  onSubmit={handleAddWish}
                  wishName={wishName}
                  setWishName={setWishName}
                  wishDescription={wishDescription}
                  setWishDescription={setWishDescription}
                  wishImg={wishImg}
                  setWishImg={setWishImg}
                  wishPrice={wishPrice}
                  setWishPrice={setWishPrice}
                  submitButtonTitle='Add Wish'
                />
              )}
            </Modal>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
          {wishes.map((wish) => (
            <CardWish key={wish.id} wish={wish} onDelete={handleDelete} onUpdate={handleUpdateWish} />
          ))}
        </div>
      </div>

      <Outlet />

      <Toaster richColors position="bottom-center" /> 
    </main>
  );
}

export default App;
