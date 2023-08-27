import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";
import prisma from "@/lib/db";

export default async function Home() {
  const categories = await prisma.category.findMany();
  console.log("categories---------------->", categories);
  return (
    <div>
      <div className="h-full p-4 space-y-2">
        <SearchInput />
        <Categories categories={categories} />
      </div>
    </div>
  );
}
