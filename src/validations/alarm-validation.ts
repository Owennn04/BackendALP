import { z } from "zod";

export class AlarmValidation {
  static readonly CREATE = z.object({
    time: z.string().min(1),
    label: z.string().max(100).optional(),
    dayys: z.array(z.boolean()).length(7),
    isActive: z.boolean().optional()
  });

  static readonly  UPDATE = z.object({
    id: z.number().positive(),
    isActive: z.boolean()
  });
}