import type { Group, User, RejectionEntry, AuditLogEntry } from './types';

export const MOCK_GROUPS: Group[] = [
    {
        id: 'g1',
        name: 'Standard Users',
        userCount: 1250,
        limits: {
            daily: { fiat: 50_000_000, crypto: 50_000_000 },
            weekly: { fiat: 200_000_000, crypto: 200_000_000 },
            monthly: { fiat: 500_000_000, crypto: 500_000_000 },
        },
        isActive: true,
    },
    {
        id: 'g2',
        name: 'High Volume Traders',
        userCount: 150,
        limits: {
            daily: { fiat: 500_000_000, crypto: 500_000_000 },
            weekly: { fiat: 2_000_000_000, crypto: 2_000_000_000 },
            monthly: { fiat: 8_000_000_000, crypto: 8_000_000_000 },
        },
        isActive: true,
    },
    {
        id: 'g3',
        name: 'VIP Clients',
        userCount: 25,
        limits: {
            daily: { fiat: 2_000_000_000, crypto: 2_000_000_000 },
            weekly: { fiat: 10_000_000_000, crypto: 10_000_000_000 },
            monthly: { fiat: 40_000_000_000, crypto: 40_000_000_000 },
        },
        isActive: true,
    },
    {
        id: 'g4',
        name: 'New Users (Restricted)',
        userCount: 432,
        limits: {
            daily: { fiat: 10_000_000, crypto: 10_000_000 },
            weekly: { fiat: 50_000_000, crypto: 50_000_000 },
            monthly: { fiat: 100_000_000, crypto: 100_000_000 },
        },
        isActive: true,
    },
     {
        id: 'g5',
        name: 'Suspended Users',
        userCount: 12,
        limits: {
            daily: { fiat: 0, crypto: 0 },
            weekly: { fiat: 0, crypto: 0 },
            monthly: { fiat: 0, crypto: 0 },
        },
        isActive: false,
    },
];

export const MOCK_USERS: { [key: string]: User } = {
    '123': {
        id: '123',
        name: 'John Doe',
        email: 'john.doe@example.com',
        group: 'Standard Users',
        usage: {
            daily: { fiat: 10_000_000, crypto: 5_000_000 },
            weekly: { fiat: 40_000_000, crypto: 25_000_000 },
            monthly: { fiat: 150_000_000, crypto: 80_000_000 },
        },
    },
    '456': {
        id: '456',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        group: 'High Volume Traders',
        usage: {
            daily: { fiat: 150_000_000, crypto: 200_000_000 },
            weekly: { fiat: 800_000_000, crypto: 1_200_000_000 },
            monthly: { fiat: 3_000_000_000, crypto: 5_000_000_000 },
        },
    },
    '789': {
        id: '789',
        name: 'Vito Corleone',
        email: 'vito.c@genco.com',
        group: 'VIP Clients',
        usage: {
            daily: { fiat: 1_500_000_000, crypto: 0 },
            weekly: { fiat: 5_000_000_000, crypto: 2_000_000_000 },
            monthly: { fiat: 21_000_000_000, crypto: 8_000_000_000 },
        },
    }
};

export const MOCK_REJECTION_LOGS: RejectionEntry[] = [
    {
        id: 'ar1',
        kycName: 'Michael Chen',
        asset: 'BTC',
        walletAddress: 'bc1qxy...wpl4',
        amountNative: 1.5,
        amountUsd: 105000,
        amountIdr: 1_700_000_000,
        breachReason: 'Exceeded daily total limit',
        createdAt: '2024-09-03 14:05:22',
    },
    {
        id: 'ar2',
        kycName: 'Sarah Connor',
        asset: 'ETH',
        walletAddress: '0xAb58...3728',
        amountNative: 25,
        amountUsd: 87500,
        amountIdr: 1_400_000_000,
        breachReason: 'Exceeded per transaction limit',
        createdAt: '2024-09-03 13:45:10',
    },
    {
        id: 'ar3',
        kycName: 'Budi Santoso',
        asset: 'USDT',
        walletAddress: 'TQ1s...kLp3',
        amountNative: 150000,
        amountUsd: 150000,
        amountIdr: 2_400_000_000,
        breachReason: 'Exceeded daily total limit',
        createdAt: '2024-09-03 11:20:00',
    }
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
    {
        id: 'al1',
        timestamp: '2024-09-03 14:00:15',
        adminUser: 'admin@pintu.co.id',
        action: 'Group Limit Change',
        oldValue: 'VIP Clients - Daily Fiat Limit: 1.5B IDR',
        newValue: 'VIP Clients - Daily Fiat Limit: 2B IDR',
    },
    {
        id: 'al2',
        timestamp: '2024-09-03 10:30:05',
        adminUser: 'ops_manager@pintu.co.id',
        action: 'User Group Assignment (CSV)',
        oldValue: 'User IDs: [991, 992, 993] moved from Standard Users',
        newValue: 'User IDs: [991, 992, 993] moved to High Volume Traders',
    },
    {
        id: 'al3',
        timestamp: '2024-09-02 18:15:45',
        adminUser: 'admin@pintu.co.id',
        action: 'Create Group',
        oldValue: 'N/A',
        newValue: 'Group "Suspended Users" created',
    },
     {
        id: 'al4',
        timestamp: '2024-09-02 18:15:45',
        adminUser: 'admin@pintu.co.id',
        action: 'Global Settings Change',
        oldValue: 'Max per transaction (Crypto): 1,500,000,000 IDR',
        newValue: 'Max per transaction (Crypto): 1,600,000,000 IDR',
    }
];