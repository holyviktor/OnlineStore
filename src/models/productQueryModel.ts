import { querySchema } from './productQueryValidationModel';
import { z } from 'zod';

export type ProductQuery = z.infer<typeof querySchema>;