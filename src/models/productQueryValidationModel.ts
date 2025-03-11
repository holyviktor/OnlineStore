import { z } from "zod";

export const querySchema = z.object({
    search: z.string().optional(),
    priceFrom: z.string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined))
        .refine((val) => val === undefined || !isNaN(val), {
            message: "priceFrom must be a valid number",
        }),
    priceTo: z.string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined))
        .refine((val) => val === undefined || !isNaN(val), {
            message: "priceTo must be a valid number",
        }),
    sort: z.enum(["asc", "desc"]).optional(),
});