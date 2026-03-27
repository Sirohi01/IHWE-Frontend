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
}

interface GlobalScripts {
    headerScripts?: string;
    footerScripts?: string;
}

const SeoHelmet = () => {
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

    const displayData = seoData || defaultSeo;
    const fullOgImage = displayData.ogImage ? (displayData.ogImage.startsWith('http') ? displayData.ogImage : `${SERVER_URL}${displayData.ogImage}`) : "";

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

    // Helper to strip script tags from schema markup for injection into ld+json
    const getCleanSchema = (markup: string) => {
        return markup.replace(/<script[^>]*>|<\/script>/gi, '').trim();
    };

    const dynamicMetaTags = parseMetaTags(displayData.openGraphTags);

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
                {displayData.schemaMarkup && (
                    <script type="application/ld+json">
                        {getCleanSchema(displayData.schemaMarkup)}
                    </script>
                )}

                {/* OG Image fallback if not in openGraphTags */}
                {fullOgImage && <meta property="og:image" content={fullOgImage} />}
                {fullOgImage && <meta name="twitter:image" content={fullOgImage} />}

                {/* Header Scripts */}
                {globalScripts?.headerScripts && (
                    <script dangerouslySetInnerHTML={{ __html: globalScripts.headerScripts.replace(/<script>|<\/script>/g, '') }} />
                )}
            </Helmet>

            {/* Footer Scripts in Body as requested (not for SEO, but for tracking/utility) */}
            {globalScripts?.footerScripts && (
                <div id="footer-scripts" style={{ display: 'none' }} dangerouslySetInnerHTML={{ __html: globalScripts.footerScripts }} />
            )}
        </>
    );
};


export default SeoHelmet;
