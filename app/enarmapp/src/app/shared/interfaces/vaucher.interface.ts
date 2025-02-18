export interface IVaucher {
    id?: number;
    name: string;
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
    usage_count: number;
    usage_limit: number;
    expiration_date: string;
}