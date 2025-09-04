export type View = 'Group Management' | 'User Management' | 'Rejection History' | 'Audit Log' | 'Global Settings';

export type Timeframe = 'Daily' | 'Weekly' | 'Monthly';

export interface Limits {
    fiat: number;
    crypto: number;
}

export interface Group {
    id: string;
    name: string;
    userCount: number;
    limits: {
        daily: Limits;
        weekly: Limits;
        monthly: Limits;
    };
    isActive: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    group: string;
    usage: {
        daily: Limits;
        weekly: Limits;
        monthly: Limits;
    };
}

export interface RejectionEntry {
    id: string;
    kycName: string;
    asset: string;
    walletAddress: string;
    amountNative: number;
    amountUsd: number;
    amountIdr: number;
    breachReason: 'Exceeded per transaction limit' | 'Exceeded daily total limit';
    createdAt: string;
}

export interface AuditLogEntry {
    id: string;
    timestamp: string;
    adminUser: string;
    action: string;
    oldValue: string;
    newValue: string;
}