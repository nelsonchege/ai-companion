import Categories from "@/components/Categories";
import CompanionList from "@/components/CompanionList";
import SearchInput from "@/components/SearchInput";
import prisma from "@/lib/db";

type HomeProps = {
  searchParams: {
    categoryId: string;
    name: string;
  };
};
export default async function Home({ searchParams }: HomeProps) {
  const companions = await prisma.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany();
  return (
    <div>
      <div className="h-full p-4 space-y-2">
        <SearchInput />
        <Categories categories={categories} />
        <CompanionList companions={companions} />
      </div>
    </div>
  );
}
