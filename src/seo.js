export const siteUrl = 'https://freelancejobalerts.com';

export function applySeo({title, description, path='/', type='website'}) {
  const absolute = `${siteUrl}${path}`;
  document.title = title;
  const tags = {
    description,
    'og:title': title,
    'og:description': description,
    'og:type': type,
    'og:url': absolute,
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'link:canonical': absolute,
  };
  Object.entries(tags).forEach(([key, value]) => {
    if (key.startsWith('link:')) {
      let el = document.querySelector(`link[rel="canonical"]`);
      if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); }
      el.href = value;
    } else {
      const attr = key.startsWith('og:') || key.startsWith('twitter:') ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.content = value;
    }
  });
}

export const organizationSchema = {
  '@context':'https://schema.org', '@type':'Organization',
  name:'Freelance Job Alerts', url:siteUrl,
  description:'Curated freelance and remote job alerts for independent professionals.',
  sameAs:[]
};

export const websiteSchema = {
  '@context':'https://schema.org', '@type':'WebSite', name:'Freelance Job Alerts', url:siteUrl,
  potentialAction:{'@type':'SearchAction', target:`${siteUrl}/jobs?search={search_term_string}`, 'query-input':'required name=search_term_string'}
};

export function injectSchemas(schemas) {
  document.querySelectorAll('script[data-fja-schema]').forEach(el=>el.remove());
  schemas.forEach(schema=>{ const el=document.createElement('script'); el.type='application/ld+json'; el.dataset.fjaSchema='true'; el.textContent=JSON.stringify(schema); document.head.appendChild(el); });
}
