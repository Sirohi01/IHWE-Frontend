import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { seoApi, SERVER_URL } from '@/lib/api';

interface SeoData {
    metaTitle?: string;
    metaKeywords?: string;
    metaDescription?: string;
    openGraphTags?: string;
    schemaMarkup?: string;
    canonicalTag?: string;
    ogImage?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogType?: string;
    ogUrl?: string;
    siteName?: string;
}

interface GlobalScripts {
    headerScripts?: string;
    footerScripts?: string;
}

const SeoHelmet = ({ data }: { data?: SeoData }) => {
    const location = useLocation();
    const [seoData, setSeoData] = useState<SeoData | null>(null);
    const [globalScripts, setGlobalScripts] = useState<GlobalScripts | null>(null);

    useEffect(() => {
        const fetchSeo = async () => {
            try {
                const path = location.pathname;
                const data = await seoApi.getByPath(path);
                if (data) {
                    setSeoData(data);
                } else {
                    setSeoData(null);
                }

                // Fetch global scripts from advanced SEO settings
                const response = await fetch(`${SERVER_URL}/api/seo-settings/advanced`);
                const scriptData = await response.json();
                if (scriptData.success) {
                    setGlobalScripts({
                        headerScripts: scriptData.data.headerScripts,
                        footerScripts: scriptData.data.footerScripts
                    });
                }
            } catch (error) {
                console.error("Error fetching SEO data:", error);
                setSeoData(null);
            }
        };

        fetchSeo();
    }, [location.pathname]);


    const defaultSeo: SeoData = {
        metaTitle: "Global Health Connect | International Health & Wellness Expo 2026",
        metaDescription: "Global Health Connect - Connecting Healthcare Globally. A global platform for healthcare innovation, wellness solutions and medical excellence.",
        metaKeywords: "health, wellness, expo, medical, innovation",
        ogImage: "/favicon-32x32.png",
        openGraphTags: "",
        canonicalTag: "",
        schemaMarkup: ""
    };

    const displayData = data || seoData || defaultSeo;
    const fullOgImage = displayData.ogImage ? (displayData.ogImage.startsWith('http') ? displayData.ogImage : `${SERVER_URL}${displayData.ogImage}`) : "";

    // Resolved OG/Twitter fields — /api/seo/page already applies this fallback
    // chain server-side, but pages that pass a custom `data` prop directly
    // (e.g. BlogDetail) may not, so it's repeated here defensively.
    const resolvedOgTitle = displayData.ogTitle || displayData.metaTitle || defaultSeo.metaTitle!;
    const resolvedOgDescription = displayData.ogDescription || displayData.metaDescription || defaultSeo.metaDescription!;
    const resolvedOgType = displayData.ogType || "website";
    const resolvedOgUrl = displayData.ogUrl || (typeof window !== "undefined" ? window.location.href : "");
    const resolvedSiteName = displayData.siteName || "International Health & Wellness Expo (IHWE)";

    // Helper to parse meta tags from the openGraphTags string
    const parseMetaTags = (html: string | undefined) => {
        if (!html) return [];
        const metaRegex = /<meta\s+([^>]+)>/gi;
        const tags = [];
        let match;
        while ((match = metaRegex.exec(html)) !== null) {
            const attributes: { [key: string]: string } = {};
            const attrRegex = /([a-z0-9:_-]+)=["']([^"']+)["']/gi;
            let attrMatch;
            while ((attrMatch = attrRegex.exec(match[1])) !== null) {
                attributes[attrMatch[1].toLowerCase()] = attrMatch[2];
            }
            tags.push(attributes);
        }
        return tags;
    };

    // Helper to extract href from canonical tag if it's a full tag, or return as is if it's just a URL
    const getCanonicalHref = (tag: string) => {
        if (tag.includes('<link') && tag.includes('href=')) {
            const match = tag.match(/href=["']([^"']+)["']/);
            return match ? match[1] : tag;
        }
        return tag;
    };

    // Helper to render schema markup blocks correctly
    const renderSchemaMarkup = (markup: string | undefined) => {
        if (!markup) return null;
        
        // If it contains script tags, extract the content of each block
        if (markup.toLowerCase().includes('<script')) {
            const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
            const blocks = [];
            let match;
            while ((match = scriptRegex.exec(markup)) !== null) {
                if (match[1].trim()) {
                    blocks.push(match[1].trim());
                }
            }
            
            if (blocks.length > 0) {
                return blocks.map((content, index) => (
                    <script key={`schema-${index}`} type="application/ld+json">
                        {content}
                    </script>
                ));
            }
        }

        // Fallback if no script tags found or just one block of JSON
        return (
            <script type="application/ld+json">
                {markup.trim()}
            </script>
        );
    };

    // Helper to render header scripts correctly
    const renderHeaderScripts = (scripts: string | undefined) => {
        if (!scripts) return null;
        
        // If it contains script tags, we extract attributes and content
        if (scripts.toLowerCase().includes('<script')) {
            const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
            const extracted = [];
            let match;
            while ((match = scriptRegex.exec(scripts)) !== null) {
                const attrsStr = match[1];
                const content = match[2];
                const attrs: any = {};
                
                const attrRegex = /([a-z0-9:_-]+)=["']([^"']+)["']|([a-z0-9:_-]+)(?=\s|$)/gi;
                let attrMatch;
                while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
                    if (attrMatch[1]) {
                        attrs[attrMatch[1].toLowerCase()] = attrMatch[2];
                    } else if (attrMatch[3]) {
                        attrs[attrMatch[3].toLowerCase()] = true;
                    }
                }
                extracted.push({ attrs, content });
            }

            if (extracted.length > 0) {
                return extracted.map((s, i) => (
                    <script key={`header-script-${i}`} {...s.attrs} dangerouslySetInnerHTML={{ __html: s.content }} />
                ));
            }
        }

        // Fallback if no script tags found
        return <script dangerouslySetInnerHTML={{ __html: scripts }} />;
    };

    const dynamicMetaTags = parseMetaTags(displayData.openGraphTags);
    const hasDynamicTag = (key: string) =>
        dynamicMetaTags.some((tag) => tag.property === key || tag.name === key);

    return (
        <>
            <Helmet>
                <title>{displayData.metaTitle}</title>
                <meta name="description" content={displayData.metaDescription} />
                {displayData.metaKeywords && <meta name="keywords" content={displayData.metaKeywords} />}
                
                {/* Dynamic OG/Twitter Tags from Backend */}
                {dynamicMetaTags.map((tag, index) => {
                    if (tag.property) {
                        return <meta key={index} property={tag.property} content={tag.content} />;
                    }
                    if (tag.name) {
                        return <meta key={index} name={tag.name} content={tag.content} />;
                    }
                    return null;
                })}

                {/* Canonical Tag */}
                {displayData.canonicalTag && (
                    <link rel="canonical" href={getCanonicalHref(displayData.canonicalTag)} />
                )}

                {/* Schema Markup */}
                {renderSchemaMarkup(displayData.schemaMarkup)}

                {/* Open Graph — auto-derived from OG Title/Description (or Meta Title/Description
                    as fallback), skipped for any tag already supplied via the raw openGraphTags field. */}
                {!hasDynamicTag("og:type") && <meta property="og:type" content={resolvedOgType} />}
                {!hasDynamicTag("og:site_name") && <meta property="og:site_name" content={resolvedSiteName} />}
                {!hasDynamicTag("og:title") && <meta property="og:title" content={resolvedOgTitle} />}
                {!hasDynamicTag("og:description") && <meta property="og:description" content={resolvedOgDescription} />}
                {!hasDynamicTag("og:url") && resolvedOgUrl && <meta property="og:url" content={resolvedOgUrl} />}
                {fullOgImage && !hasDynamicTag("og:image") && <meta property="og:image" content={fullOgImage} />}

                {/* Twitter Card */}
                {!hasDynamicTag("twitter:card") && <meta name="twitter:card" content="summary_large_image" />}
                {!hasDynamicTag("twitter:title") && <meta name="twitter:title" content={resolvedOgTitle} />}
                {!hasDynamicTag("twitter:description") && <meta name="twitter:description" content={resolvedOgDescription} />}
                {fullOgImage && !hasDynamicTag("twitter:image") && <meta name="twitter:image" content={fullOgImage} />}

                {/* Header Scripts */}
                {renderHeaderScripts(globalScripts?.headerScripts)}
            </Helmet>

            {/* Footer Scripts in Body as requested (not for SEO, but for tracking/utility) */}
            {globalScripts?.footerScripts && (
                <div id="footer-scripts" style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: globalScripts.footerScripts }} />
            )}
        </>
    );
};


export default SeoHelmet;
