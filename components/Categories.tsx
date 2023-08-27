"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  categories: Category[];
};

const Categories = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | undefined) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };
  return (
    <div className="w-full overflow-x-auto space-x-2 flex p-1">
      <button
        className={cn(
          `flex items-center p-4 text-xs md:text-sm py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition`,
          !categoryId ? "bg-primary/25" : "bg-primary/10"
        )}
        onClick={() => onClick(undefined)}
      >
        Newest
      </button>
      {categories.map((category) => (
        <>
          {" "}
          <button
            key={category.id}
            className={cn(
              `flex p-4 items-center text-xs md:text-sm py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition`,
              categoryId === category.name ? "bg-primary/25" : "bg-primary/10"
            )}
            onClick={() => onClick(category.name as string)}
          >
            {category.name}
          </button>
        </>
      ))}
    </div>
  );
};

export default Categories;
