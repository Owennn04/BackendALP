import { Transaction } from "@prisma/client";

export type TransactionResponse = {
    id: number;
    type: string;
    amount: number;
    category: string;
    date: Date;
}

export type CreateTransactionRequest = {
    type: "INCOME" | "EXPENSE";
    amount: number;
    category: string;
    date: string;
}

export function toTransactionResponse(transaction: Transaction): TransactionResponse {
    return {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        date: transaction.date
    }
}