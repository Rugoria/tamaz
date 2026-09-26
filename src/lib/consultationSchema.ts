import { z } from "zod";
import { consultation, locations } from "@/content/site";

export const consultationSchema = z.object({
  firstName: z.string().trim().min(1, consultation.errors.firstName).max(100),
  lastName: z.string().trim().max(100).optional().default(""),
  phone: z
    .string()
    .trim()
    .min(1, consultation.errors.phone)
    .max(40)
    .regex(/^[\d\s()+\-.]{7,}$/, consultation.errors.phone),
  email: z.union([z.literal(""), z.email(consultation.errors.email)]).optional().default(""),
  treatment: z.enum(consultation.treatmentOptions as [string, ...string[]]),
  studio: z.enum(locations.studios.map((s) => s.name) as [string, ...string[]]),
  message: z.string().trim().max(2000).optional().default(""),
});

export type ConsultationRequest = z.infer<typeof consultationSchema>;
