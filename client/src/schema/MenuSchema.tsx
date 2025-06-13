import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Menu name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  price: z.number().min(0, { message: "Price cannot be negative" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});

export type MenuSchema = z.infer<typeof menuSchema>;
