export type HTTPMethods = "GET" | "POST" | "DELETE" | "PUT"

export type Countries = {
    [key: string]: Country  
}

export type Country = {
    id: string;
    name: string;
    calling_code: string | number;
    phone_length: string | number;
}

export type TwoFactorAuth = {
    phone_number: number | string | undefined;
    country_id: number | string | undefined;
}