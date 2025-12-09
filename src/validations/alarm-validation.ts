import { z } from "zod";

export class AlarmValidation {
  static readonly CREATE = z.object({
    time: z.string().min(1), // time wajib diisi
    label: z.string().max(100).optional(), // label max 100 karakter
    days: z.array(z.boolean()).length(7), // days harus array boolean dengan panjang 7
    isActive: z.boolean().optional() // isActive opsional
  });

  static readonly  UPDATE = z.object({
    id: z.number().positive(), // id harus positif
    isActive: z.boolean() // isActive wajib diisi
  });
}