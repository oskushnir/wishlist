import type { Wish } from "@/types/Wish";

const defaultAPI = "http://localhost:3000";

export const getWishes = async ({
  filterByDate,
  filterByPrice,
}: {
  filterByDate: string;
  filterByPrice: string;
}): Promise<Wish[]> => {
  const res = await fetch(`${defaultAPI}/wishes`);
  if (!res.ok) throw new Error("Failed to fetch wishes");
  const wishes: Wish[] = await res.json();

  const sorted = [...wishes];

  if (filterByPrice === "Price High to Low") {
    sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }

  if (filterByPrice === "Price Low to High") {
    sorted.sort((a, b) => a.price - b.price);
    return sorted;
  }

  if (filterByDate === "Newest") {
    sorted.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sorted;
  }

  if (filterByDate === "Oldest") {
    sorted.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return sorted;
  }

  sorted.sort((a, b) => b.price - a.price);
  return sorted;
};

export const getWish = async (wishId: string) => {
  const res = await fetch(`${defaultAPI}/wishes/${wishId}`);

  return res.json();
}

type NewWish = Omit<Wish, "id" | "createdAt">;

export const addNewWish = async (wish: NewWish) => {
  const res = await fetch(`${defaultAPI}/wishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...wish,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) throw new Error("Failed to create wish");
  return (await res.json()) as Wish;
};

export const deleteWish = async (wishId: number) => {
  const res = await fetch(`${defaultAPI}/wishes/${wishId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete wish");
};

export const updateWish = async (wish: Wish) => {
  const res = await fetch(`${defaultAPI}/wishes/${wish.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(wish),
  });
  if (!res.ok) throw new Error("Failed to update wish");
  return (await res.json()) as Wish;
};
