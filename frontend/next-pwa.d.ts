declare module 'next-pwa' {
    import { NextConfig } from 'next';

    export interface PWAConfig {
        dest: string;
        register?: boolean;
        skipWaiting?: boolean;
        disable?: boolean;
        [key: string]: any;
    }

    export default function withPWA(pwaConfig: PWAConfig): (nextConfig: NextConfig) => NextConfig;
}
