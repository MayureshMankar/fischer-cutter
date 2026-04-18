import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email identifier'),
  phone: z.string().min(10, 'Contact number invalid'),
  password: z.string().min(6, 'Security password must be at least 6 characters'),
  termsAndConditions: z.boolean().refine((val) => val === true, {
    message: 'Terms must be acknowledged',
  }),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email identifier'),
  password: z.string().min(1, 'Security password required'),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(5),
});

export const orderSchema = z.object({
  services: z.array(z.string()).min(1, 'Select at least one service'),
  projectSpecifications: z.string().min(1, 'Project specifications are required'),
  files: z.array(z.object({
    filename: z.string(),
    content: z.string()
  })).optional(),
});
