import { z } from "zod";

export const resturantFormSchema = z.object({
  resturantName: z.string().nonempty({ message: "Resturant name is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
  deliveryTime: z
    .number()
    .min(0, { message: "Delivery Time cannot be negative" }),
  cuisines: z.array(z.string()),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image File is required" }),
});

export type ResturantFormSchema = z.infer<typeof resturantFormSchema>;
