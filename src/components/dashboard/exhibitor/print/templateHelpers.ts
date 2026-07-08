export const parseNum = (value: any): number => {
    if (value === null || value === undefined || value === '') return 0;
    const parsed = Number(String(value).replace(/,/g, '').replace(/%/g, '').trim());
    return Number.isFinite(parsed) ? parsed : 0;
};

export const fmtNum = (n: any): string => Math.round(Number(n || 0)).toLocaleString('en-IN');

export const getAreaMultiplier = (...values: any[]): number => {
    for (const value of values) {
        const text = String(value ?? '').replace(/,/g, '').trim();
        const dimensions = text.match(/(\d+(?:\.\d+)?)\s*[xX×*]\s*(\d+(?:\.\d+)?)/);
        if (dimensions) return parseNum(dimensions[1]) * parseNum(dimensions[2]);
        const match = text.match(/\d+(?:\.\d+)?/);
        const number = match ? parseNum(match[0]) : 0;
        if (number > 0) return number;
    }
    return 1;
};

export const getItemAmount = (item: any = {}): number => {
    const qty = parseNum(item.qty ?? item.quantity ?? 1) || 1;
    const rate = parseNum(item.rate ?? item.unit_rate ?? item.price);
    const computedAmount = rate * getAreaMultiplier(item.size, item.area, item.areaSqm, item.area_sqm, item.sqm) * qty;
    const explicitAmount = parseNum(
        item.amount ??
        item.itemValue ??
        item.item_value ??
        item.totalBeforeTax ??
        item.total_before_tax
    );
    if (explicitAmount && computedAmount && explicitAmount < computedAmount * 0.5) return computedAmount;
    return explicitAmount || computedAmount;
};

export const getItemTaxable = (item: any = {}): number => {
    const amount = getItemAmount(item);
    const discountPercent = parseNum(item.discountPct ?? item.discount_percent ?? item.discountPercentage ?? item.disc);
    const discountAmount = parseNum(item.discountAmount ?? item.discount_amount);
    if (discountPercent || discountAmount) {
        return Math.max(0, amount - (discountAmount || ((amount * discountPercent) / 100)));
    }

    const taxValue = parseNum(item.tax);
    const gstRate = getItemGstRate(item);
    const expectedGstFromTaxable = amount && gstRate ? (amount * gstRate) / 100 : 0;
    const taxLooksLikeGstAmount = taxValue && expectedGstFromTaxable && Math.abs(taxValue - expectedGstFromTaxable) < 1;

    const explicitTaxable = parseNum(
        item.taxableValue ??
        item.taxable_value ??
        item.taxable ??
        (taxLooksLikeGstAmount ? 0 : item.tax)
    );
    if (explicitTaxable) return explicitTaxable;

    return amount;
};

export const getItemGstRate = (item: any = {}): number => {
    const directRate = parseNum(
        item.gstPct ??
        item.gstRate ??
        item.gst_rate ??
        item.gst ??
        item.taxRate ??
        item.tax_rate ??
        item.igst_per
    );
    if (directRate) return directRate;

    const cgstRate = parseNum(item.cgst_per);
    return cgstRate ? cgstRate * 2 : 18;
};

export const getItemGstAmount = (item: any = {}): number => {
    const taxable = getItemTaxable(item);
    const gstRate = getItemGstRate(item);
    const computedGstAmount = taxable && gstRate ? (taxable * gstRate) / 100 : 0;
    if (computedGstAmount) return computedGstAmount;

    const explicitGstAmount = parseNum(
        item.gstAmount ??
        item.gst_amount ??
        item.totalTax ??
        item.total_tax ??
        (parseNum(item.cgst) + parseNum(item.sgst) + parseNum(item.igst))
    );
    if (explicitGstAmount) return explicitGstAmount;

    return 0;
};

export const getItemFinalAmount = (item: any = {}): number => {
    return getItemTaxable(item) + getItemGstAmount(item);
};

export const getDiscountPercent = (item: any = {}): number => {
    const directPercent = parseNum(item.discountPct ?? item.disc ?? item.discount_percent ?? item.discountPercentage);
    return Number.isFinite(directPercent) ? directPercent : 0;
};

export const formatSize = (value: any): string => {
    if (!value) return '-';
    let valStr = String(value).toLowerCase().replace(/m$/, '').trim();
    return `${valStr.replace(/\s*[xX*]\s*/g, 'X').trim()} m`;
};

export const formatArea = (value: any): string => {
    if (!value) return '-';
    let valStr = String(value).toLowerCase().replace(/sqm$/, '').replace(/sq\.m$/, '').trim();
    return `${valStr} sqm`;
};

export const cleanAddressPart = (value: any): string => {
    if (value === null || value === undefined) return '';

    if (Array.isArray(value)) {
        return joinAddressParts(value);
    }

    if (typeof value === 'object') {
        return joinAddressParts([
            value.address,
            value.company_addr,
            value.companyAddress,
            value.addressLine,
            value.address_line,
            value.city,
            value.district,
            value.state,
            value.country,
            value.pincode,
            value.pinCode,
            value.pin_code,
            value.postalCode,
            value.postal_code,
            value.zipCode,
            value.zip_code,
        ]);
    }

    let text = String(value).trim().replace(/\s+/g, ' ');
    if (!text || text === '—') return '';
    if (['null', 'undefined', 'n/a'].includes(text.toLowerCase())) return '';

    const hasAddressLabels = /(?:^|[,{\s])(?:address|company_addr|companyAddress|addressLine|address_line|city|district|state|country|pincode|pinCode|pin_code|postalCode|postal_code|zipCode|zip_code)\s*:/i.test(text);
    if (hasAddressLabels) {
        const values: string[] = [];
        const regex = /(?:address|company_addr|companyAddress|addressLine|address_line|city|district|state|country|pincode|pinCode|pin_code|postalCode|postal_code|zipCode|zip_code)\s*:\s*['"]?([^,'"}]+)['"]?/gi;
        let match;
        while ((match = regex.exec(text)) !== null) {
            const cleaned = String(match[1] || '')
                .replace(/^['"`{\[]+|['"`}\]]+$/g, '')
                .trim();
            if (cleaned) values.push(cleaned);
        }
        if (values.length) return joinAddressParts(values);
    }

    return text
        .replace(/^['"`{\[]+|['"`}\]]+$/g, '')
        .replace(/,$/, '')
        .trim();
};

export const joinAddressParts = (parts: any[]): string => {
    const used = new Set<string>();
    const out: string[] = [];
    (parts || [])
        .map(cleanAddressPart)
        .flatMap((part) => String(part || '').split(',').map((p) => p.trim()))
        .filter((part) => {
            if (!part) return false;
            const lowered = part.toLowerCase();
            if (lowered === '—' || lowered === 'null' || lowered === 'undefined' || lowered === 'n/a') return false;
            const key = lowered.replace(/[^a-z0-9]/g, '');
            if (!key || used.has(key)) return false;
            used.add(key);
            return true;
        })
        .forEach((part) => {
            if (/^\d{6}$/.test(part) && out.length) {
                out[out.length - 1] = `${out[out.length - 1]} - ${part}`;
                return;
            }
            out.push(part);
        });
    return out.join(', ');
};

export const getFirstAddressValue = (...values: any[]): string => values.find((value) => cleanAddressPart(value)) || '';
export const getFirstCleanValue = (...values: any[]): string => values.find((value) => String(value ?? '').trim()) || '';
export const normalizeContactName = (name: any, titledName: any): string => {
    const clean = (value: any) => String(value || '').replace(/\s+/g, ' ').trim();
    const value = clean(name) || clean(titledName);
    return value ? value.replace(/^(mr|mrs|ms|miss|dr|prof)\.?\s*/i, '').trim() : '—';
};
