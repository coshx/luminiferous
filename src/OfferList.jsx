import React, { Component } from 'react';
import Offer from './Offer';
//import Env from './Env';

class OfferList extends Component {

  constructor(props) {
    super(props);
    this.state = { offers: [] }
    //this.state = { offers: props.offers };
    //this.state.env = new Env();
  }

  componentWillMount() {
    this.state.offers = [
      {
        code:"PSECURED01",
        additionalInformationUrl:"http://www.capitalone.com/credit-cards/LP/secured-mastercard-gen-faq",
        priority:1,
        tier:"REBUILDING CREDIT",
        productId:"SBe96d53888fcd48d58e082726b9eddd9e",
        productDisplayName:"Capital One® Secured Mastercard®",
        applyNowLink:"https://goto.capitalone.com/c/mpid/344893/5048?prodsku=SBe96d53888fcd48d58e082726b9eddd9e\u0026p.prodline=USCIR\u0026p.lid=P\u0026u=https%3A%2F%2Fwww.capitalone.com%2Fcredit-cards%2Fsecured-mastercard",
        productType:"ConsumerCard",
        brandName:"Secured",
        images:[
          {imageType:"CardArt",
           height:315,
           width:500,
           alternateText:null,
           url:"https://www.capitalone.com/assets/affiliates/card_art/affiliates-blue-steel-mc-flat-500x315.png"
          }
        ],
        categoryTags: ["Apple Pay","Bad Credit","Best Offers","Capital One","Chip","Chip & Signature","EMV","Limited or No Credit History=only when Limited is mentioned","Mastercard","No Annual Fee","No Foreign Transaction Fees","Rebuilding","Secured Card","Smart Chip"],
        marketingCopy:["No annual fee, and all the credit building benefits with responsible card use","Unlike a prepaid card, it builds credit when used responsibly, with regular reporting to the 3 major credit bureaus","You will get an initial $200 credit line after making a security deposit of $49, $99, or $200, determined based on your creditworthiness","Get access to a higher credit line after making your first 5 monthly payments on time with no additional deposit needed","Easily manage your account 24/7 with online access, by phone or using our mobile app","It's a credit card accepted at millions of locations worldwide"],
        additionalMarketingCopy:["Fraud Coverage - You're covered by $0 Fraud Liability if your card is ever lost or stolen","Travel \u0026 Emergency Assistance - Available 24/7 to help connect you with local emergency and assistance resources when you're away from home","Emergency Card Services - If your credit card is lost or stolen, you can get an emergency card replacement and a cash advance","Extended Warranty - Automatically doubles the original manufacturer's/store's warranty on eligible purchases","MasterRental® Insurance - Use your card to rent an eligible vehicle and you're covered for collision, damage and loss","Master RoadAssist® Service - Take advantage of 24 hour toll-free dispatch to help with services like towing, fuel delivery and more","Price Protection - If you find a lower price on a new item within 60 days of purchase you may be reimbursed for the difference","ID Theft Resolution Service - Available to help should you become the victim of Identity Theft"],
        processingNetwork:"Mastercard®",
        creditRating:["Limited","Bad"],
        activeFrom:"2017-07-19T00:00:00Z",
        rewards:[
          {rewardsTiers:[],
           rewardsBonus:
           {rewardsBonusValue:null,rewardsBonusType:null,rewardsBonusTerms:null}
          }],
        primaryBenefitDescription: "Build credit with responsible use. Refundable deposit of $49, $99 or $200 required to get a $200 initial credit line.",
        balanceTransfer:
        { balanceTransferFeeDescription: "$0",
          balanceTransferFeeValue: 0,
          balanceTransferFeeType:"$"
        },
        introBalanceTransferApr: {
          introBalanceTransferAprDescription:"N/A",
          introBalanceTransferAprValue:null,
          introBalanceTransferAprType:null
        },
        introBalanceTransferAprPeriod: {
          introBalanceTransferAprPeriodDescription:"N/A",
          introBalanceTransferAprPeriodValue:null,
          introBalanceTransferAprPeriodType:null
        },
        balanceTransferApr: {
          balanceTransferAprDescription:"24.99% (Variable)",
          balanceTransferAprValue:"24.99%",
          balanceTransferAprType:"Variable"
        },
        balanceTransferGracePeriod: {
          balanceTransferGracePeriodDescription:"0 days",
          balanceTransferGracePeriodValue:0,
          balanceTransferGracePeriodType:"days"
        },
        introPurchaseApr: {
          introPurchaseAprDescription:"N/A",
          introPurchaseAprValue:null,
          introPurchaseAprType:null
        },
        introPurchaseAprPeriod: {
          introPurchaseAprPeriodDescription:"N/A",
          introPurchaseAprPeriodValue:null,
          introPurchaseAprPeriodType:null},
        purchaseApr: {
          purchaseAprDescription:"24.99% (Variable)",
          purchaseAprValue:"24.99%",
          purchaseAprType:"Variable"
        },
        purchaseGracePeriod: {
          purchaseGracePeriodDescription:"25 days",
          purchaseGracePeriodValue:25,
          purchaseGracePeriodType:"days"
        },
        annualMembershipFee:"$0",
        foreignTransactionFee: {
          foreignTransactionFeeDescription:"None",
          foreignTransactionFeeValue:null,
          foreignTransactionFeeType:null
        },
        fraudCoverage:"You're covered by $0 Fraud Liability if your card is ever lost or stolen",
        latePaymentFee: {
          latePaymentFeeDescription:"Up to $35",
          latePaymentFeeValue:35,
          latePaymentFeeType:"$"
        },
        penaltyApr:{
          penaltyAprDescription:"None",
          penaltyAprValue:null,
          penaltyAprType:null
        },
        cashAdvanceFee:"3% of the amount of the cash advance, but not less than $10",
        cashAdvanceApr:{
          cashAdvanceAprDescription:"24.99% (Variable)",
          cashAdvanceAprValue:"24.49%",
          cashAdvanceAprType:"Variable"
        },
        cashAdvanceGracePeriod:{
          cashAdvanceGracePeriodDescription:"0 days",
          cashAdvanceGracePeriodValue:0,
          cashAdvanceGracePeriodType:"days"
        },
        generalDescription:null,
        promotionalCopy:null,
        overLimitFee:{
          overLimitFeeDescription:"None",
          overLimitFeeValue:null,
          overLimitFeeType:null
        },
        minimumDeposit: "$49, $99 or $200"
      }];

    // console.log('ID: ' + this.state.env.CAPITALONE_CLIENT_ID);
    // fetch('https://api-sandbox.capitalone.com/oauth2/token',
    //       {
    //         method: 'post',
    //         headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         body: 'client_id=' + this.state.env.CAPITALONE_CLIENT_ID
    //           + '&client_secret=' + this.state.env.CAPITALONE_CLIENT_SECRET
    //       })
    //   .then( (data) => {
    //     console.log("Got token!");
    //     console.dir(data);
    //   })
    //   .catch( (err) => {
    //     console.log("Error fetching auth token", err);
    //   });
  }

  render() {
    var offersList = this.state.offers.map( (offer) => {
      return <Offer details={offer} key={offer.code}/>;
    });
    return ( <div className="offerList">{offersList}</div> );
  }
}

export default OfferList;
