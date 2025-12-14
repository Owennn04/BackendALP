import { Alarm } from "@prisma/client";

export type AlarmResponse = {
    id: number;
    time: string;
    label: string;
    days: boolean[]; // Array boolean [Minggu, Senin, ..., Sabtu]
    isActive: boolean;
}

export type CreateAlarmRequest = {
    time: string;
    label?: string;
    days: boolean[];
    isActive?: boolean;
}

export type UpdateAlarmRequest = {
    id: number;
    time?: string;
    label?: string;
    days?: boolean[];
    isActive?: boolean;
}

export function toAlarmResponse(alarm: Alarm): AlarmResponse {
    // Parsing JSON dari Prisma ke boolean array
    let daysArray: boolean[] = [];
    
    if (Array.isArray(alarm.days)) {
        daysArray = alarm.days as boolean[];
    } else if (typeof alarm.days === 'string') {
        try {
            daysArray = JSON.parse(alarm.days);
        } catch {
            daysArray = [false, false, false, false, false, false, false];
        }
    }

    return {
        id: alarm.id,
        time: alarm.time,
        label: alarm.label,
        days: daysArray,
        isActive: alarm.isActive
    }
}