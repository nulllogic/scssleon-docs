export function generate_rel_link(Astro, url: string) {
    return new URL(url, import.meta.env.PROD ?
        import.meta.env.SITE + import.meta.env.BASE_URL + '/' :
        Astro.url.protocol + '//' + Astro.url.host);
}