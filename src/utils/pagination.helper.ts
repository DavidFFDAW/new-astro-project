import type { AstroGlobal } from "astro";

export function getPaginationDatas(limit: number, searchParams: URLSearchParams) {
    const page = searchParams.get('page') || 1;
    
    return {
        limit,
        offset: (Number(page) - 1) * limit,
        page: Number(page),
    };
}