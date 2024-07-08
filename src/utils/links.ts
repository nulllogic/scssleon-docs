export function generate_rel_link(Astro, url: string) {
    return new URL(url, import.meta.env.PROD ?
        import.meta.env.SITE + import.meta.env.BASE_URL + '/' :
        Astro.url.protocol + '//' + Astro.url.host);
}

export function generate_iframe_link(url: string) {
    return import.meta.env.PROD ? new URL('./iframe/' + url, import.meta.env.SITE + import.meta.env.BASE_URL + '/') : '/iframe/' + url;
}