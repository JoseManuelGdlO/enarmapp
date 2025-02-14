export interface IVaucher {
    id?: number;
    name: string;
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
    usage: number;
    limit_usage: number;
    expiration_date: string;
}