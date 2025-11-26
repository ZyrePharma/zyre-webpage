// lib/strapi.ts
export async function strapiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${process.env.STRAPI_URL}${path}`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
            "Content-Type": "application/json",
        },
        ...options,
    });

    if (!res.ok) {
        const text = await res.text();
        console.error("Strapi fetch failed:", text);
        throw new Error(`Strapi fetch failed: ${res.status}`);
    }

    return res.json() as Promise<T>;
}
