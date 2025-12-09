import { Alarm } from "@prisma/client";
import { $ZodBooleanInternals } from "zod/v4/core";

// Untuk response alarm
export type AlarmResponse = {
    id: number;
    time: string;
    label: string;
    days: boolean[]; // Array hari senin sampai minggu
    isActive: boolean;
}

// Untuk request create alarm
export type CreateAlarmRequest = {
    time: string; // Format HH:mm
    label?: string; // Label alarm
    days: boolean[]; // Array hari senin sampai minggu
    isActive?: boolean; // Status aktif alarm
}

// Untuk request update alarm (toggle)
export type UpdateAlramRequest = {
    id: number;
    isActive: boolean;
}

// Untuk mengubah data alarm dari database ke format response
export function toAlarmResponse(alarm: Alarm): AlarmResponse {
    let daysArray: boolean[] = [];

    if(Array.isArray(alarm.days)){
        daysArray = alarm.days as boolean[];
    }else if (typeof alarm.days === 'string'){
        try{
            daysArray = JSON.parse(alarm.days);
        }catch{
            daysArray = [false, false, false, false, false, false, false];
        }
    }

    return{
        id: alarm.id,
        time: alarm.time,
        label: alarm.label,
        days: daysArray,
        isActive: alarm.isActive
    }
}