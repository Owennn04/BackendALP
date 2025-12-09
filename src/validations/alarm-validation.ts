import { z } from 'zod';

export const createAlarmSchema = z.object({
  time: z.string().regex(
    /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
    'Format waktu harus HH:mm (contoh: 07:30)'
  ),
  label: z.string().min(1, 'Label alarm harus diisi'),
  days: z.array(z.boolean()).length(7, 'Days harus array 7 boolean')
});

export const toggleAlarmSchema = z.object({
  isActive: z.boolean()
});