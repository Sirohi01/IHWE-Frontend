import React from 'react'
import BSMeetHero from '@/components/buyerSellerMeet/BSMeetHero'
import WhatIsBuyer from '@/components/buyerSellerMeet/WhatIsBuyer'
import WhoShould from '../../components/buyerSellerMeet/WhoShould'
import HowIT from '../../components/buyerSellerMeet/HowIT'
import WhatPar from '../../components/buyerSellerMeet/WhatPar'
import Dont from '../../components/buyerSellerMeet/Dont'

const BuyerSellerMeet = () => {
    return (
        <div>
            <BSMeetHero />
            <WhatIsBuyer />
            <WhoShould />
            <HowIT />
            <WhatPar />
            <Dont />
        </div>
    )
}

export default BuyerSellerMeet