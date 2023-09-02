import * as z from "zod";

export const companionValidator = z.object({
  name: z.string().min(2, { message: "Invalid username" }),
  seed: z
    .string()
    .min(2, { message: "the seed is too short to be effective" })
    .max(3000, { message: "the seed is too long" }),
  instructions: z
    .string()
    .min(200, { message: "instruction  is too short to be effective" })
    .max(2000, { message: "long instruction" }),
  description: z
    .string()
    .min(20, { message: "the description is too short to be effective" })
    .max(1000, { message: "long  description" }),
  src: z.string().min(2, { message: "upload an Image" }),
  categoryId: z.string().min(2, { message: "Invalid category Id" }),
});

export type companionRequest = z.infer<typeof companionValidator>;
