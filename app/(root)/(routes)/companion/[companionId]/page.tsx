import React from "react";
import prisma from "../../../../../lib/db";
import CompanionForm from "@/components/CompanionForm";
type CompanionpageProps = {
  params: {
    companionId: string;
  };
};

const Companionpage = async ({ params }: CompanionpageProps) => {
  //TODO: Check subscription

  const companion = await prisma.companion.findUnique({
    where: {
      id: params.companionId,
    },
  });

  const categories = await prisma.category.findMany();
  return (
    <div>
      <CompanionForm initialData={companion} categories={categories} />
    </div>
  );
};

export default Companionpage;
