import BuyerContacts1 from "@/components/dashboard/exhibitor/buyer_contacts/BuyerContacts1";
import BuyerContactsHero from "@/components/dashboard/exhibitor/buyer_contacts/BuyerContactsHero";
import React from "react";
const BuyerContacts = () => {
    return (
        <div className="pt-3 px-6 bg-[#f4f6fb]">
            <BuyerContactsHero />
            <BuyerContacts1 />
        </div>
    );
};
export default BuyerContacts
