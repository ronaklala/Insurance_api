const express = require("express");
const Agent = require("../Models/InsuranceAgentSchema");
const contactAgent = require("../Models/ContactAgentSchema");
const Payment = require("../Models/PaymentModel");
const { default: mongoose } = require("mongoose");
const User = require("../Models/UserSchema");
var nodemailer = require("nodemailer");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51JGN72SBUj7Zk1FJw3eNZPtEhgK7VeDuUAu1rQPlrw1dW8qfFFaTxfUesKFfRRpC0ZTob0aDgzx4FEAk8DPldocF00lzYh1dQB"
);
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "https://insurance-api-five.vercel.app";

router.post("/agent/agent_register", (req, res) => {
  const check = Agent.find({ email: req.body.email }).then((doc) => {
    if (doc.length === 0) {
      const agent = new Agent(req.body);

      agent
        .save()
        .then((doc) => {
          let emails = [];

          Admin.find({}).then((doc) => {
            for (let i = 0; i < doc.length; i++) {
              emails.push(doc[i].email);
            }

            var transporter = nodemailer.createTransport({
              service: "gmail",
              port: 465,
              auth: {
                user: "insuranceproject377@gmail.com",
                pass: "elpgvsftguesyvcy",
              },
            });

            transporter.verify((err, success) => {
              err
                ? console.log(err)
                : console.log(
                    `=== Server is ready to take messages: ${success} ===`
                  );
            });

            var mailOptions = {
              from: "Insurnace Email BOT 👥 <insuranceproject377@gmail.com>",
              to: emails,
              subject: "New Insurance Agent has Registered",
              html: `<!doctype html>
                <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <title>*|MC:SUBJECT|*</title>
                        
                    <style type="text/css">
                        p{
                            margin:10px 0;
                            padding:0;
                        }
                        table{
                            border-collapse:collapse;
                        }
                        h1,h2,h3,h4,h5,h6{
                            display:block;
                            margin:0;
                            padding:0;
                        }
                        img,a img{
                            border:0;
                            height:auto;
                            outline:none;
                            text-decoration:none;
                        }
                        body,#bodyTable,#bodyCell{
                            height:100%;
                            margin:0;
                            padding:0;
                            width:100%;
                        }
                        .mcnPreviewText{
                            display:none !important;
                        }
                        #outlook a{
                            padding:0;
                        }
                        img{
                            -ms-interpolation-mode:bicubic;
                        }
                        table{
                            mso-table-lspace:0pt;
                            mso-table-rspace:0pt;
                        }
                        .ReadMsgBody{
                            width:100%;
                        }
                        .ExternalClass{
                            width:100%;
                        }
                        p,a,li,td,blockquote{
                            mso-line-height-rule:exactly;
                        }
                        a[href^=tel],a[href^=sms]{
                            color:inherit;
                            cursor:default;
                            text-decoration:none;
                        }
                        p,a,li,td,body,table,blockquote{
                            -ms-text-size-adjust:100%;
                            -webkit-text-size-adjust:100%;
                        }
                        .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
                            line-height:100%;
                        }
                        a[x-apple-data-detectors]{
                            color:inherit !important;
                            text-decoration:none !important;
                            font-size:inherit !important;
                            font-family:inherit !important;
                            font-weight:inherit !important;
                            line-height:inherit !important;
                        }
                        .templateContainer{
                            max-width:600px !important;
                        }
                        a.mcnButton{
                            display:block;
                        }
                        .mcnImage,.mcnRetinaImage{
                            vertical-align:bottom;
                        }
                        .mcnTextContent{
                            word-break:break-word;
                        }
                        .mcnTextContent img{
                            height:auto !important;
                        }
                        .mcnDividerBlock{
                            table-layout:fixed !important;
                        }
                    /*
                    @tab Page
                    @section Heading 1
                    @style heading 1
                    */
                        h1{
                            /*@editable*/color:#222222;
                            /*@editable*/font-family:Helvetica;
                            /*@editable*/font-size:40px;
                            /*@editable*/font-style:normal;
                            /*@editable*/font-weight:bold;
                            /*@editable*/line-height:150%;
                            /*@editable*/letter-spacing:normal;
                            /*@editable*/text-align:center;
                        }
                    /*
                    @tab Page
                    @section Heading 2
                    @style heading 2
                    */
                        h2{
                            /*@editable*/color:#222222;
                            /*@editable*/font-family:Helvetica;
                            /*@editable*/font-size:34px;
                            /*@editable*/font-style:normal;
                            /*@editable*/font-weight:bold;
                            /*@editable*/line-height:150%;
                            /*@editable*/letter-spacing:normal;
                            /*@editable*/text-align:left;
                        }
                    /*
                    @tab Page
                    @section Heading 3
                    @style heading 3
                    */
                        h3{
                            /*@editable*/color:#444444;
                            /*@editable*/font-family:Helvetica;
                            /*@editable*/font-size:22px;
                            /*@editable*/font-style:normal;
                            /*@editable*/font-weight:bold;
                            /*@editable*/line-height:150%;
                            /*@editable*/letter-spacing:normal;
                            /*@editable*/text-align:left;
                        }
                    /*
                    @tab Page
                    @section Heading 4
                    @style heading 4
                    */
                        h4{
                            /*@editable*/color:#949494;
                            /*@editable*/font-family:Georgia;
                            /*@editable*/font-size:20px;
                            /*@editable*/font-style:italic;
                            /*@editable*/font-weight:normal;
                            /*@editable*/line-height:125%;
                            /*@editable*/letter-spacing:normal;
                            /*@editable*/text-align:left;
                        }
                    /*
                    @tab Header
                    @section Header Container Style
                    */
                        #templateHeader{
                            /*@editable*/background-color:#8e77ff;
                            /*@editable*/background-image:none;
                            /*@editable*/background-repeat:no-repeat;
                            /*@editable*/background-position:center;
                            /*@editable*/background-size:cover;
                            /*@editable*/border-top:0;
                            /*@editable*/border-bottom:0;
                            /*@editable*/padding-top:45px;
                            /*@editable*/padding-bottom:45px;
                        }
                    /*
                    @tab Header
                    @section Header Interior Style
                    */
                        .headerContainer{
                            /*@editable*/background-color:transparent;
                            /*@editable*/background-image:none;
                            /*@editable*/background-repeat:no-repeat;
                            /*@editable*/background-position:center;
                            /*@editable*/background-size:cover;
                            /*@editable*/border-top:0;
                            /*@editable*/border-bottom:0;
                            /*@editable*/padding-top:0;
                            /*@editable*/padding-bottom:0;
                        }
                    /*
                    @tab Header
                    @section Header Text
                    */
                        .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                            /*@editable*/color:#757575;
                            /*@editable*/font-family:Helvetica;
                            /*@editable*/font-size:16px;
                            /*@editable*/line-height:150%;
                            /*@editable*/text-align:left;
                        }
                    /*
                    @tab Header
                    @section Header Link
                    */
                        .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
                            /*@editable*/color:#007C89;
                            /*@editable*/font-weight:normal;
                            /*@editable*/text-decoration:underline;
                        }
                    /*
                    @tab Body
                    @section Body Container Style
                    */
                        #templateBody{
                            /*@editable*/background-color:#FFFFFF;
                            /*@editable*/background-image:none;
                            /*@editable*/background-repeat:no-repeat;
                            /*@editable*/background-position:center;
                            /*@editable*/background-size:cover;
                            /*@editable*/border-top:0;
                            /*@editable*/border-bottom:0;
                            /*@editable*/padding-top:36px;
                            /*@editable*/padding-bottom:45px;
                        }
                    /*
                    @tab Body
                    @section Body Interior Style
                    */
                        .bodyContainer{
                            /*@editable*/background-color:transparent;
                            /*@editable*/background-image:none;
                            /*@editable*/background-repeat:no-repeat;
                            /*@editable*/background-position:center;
                            /*@editable*/background-size:cover;
                            /*@editable*/border-top:0;
                            /*@editable*/border-bottom:0;
                            /*@editable*/padding-top:0;
                            /*@editable*/padding-bottom:0;
                        }
                    /*
                    @tab Body
                    @section Body Text
                    */
                        .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                            /*@editable*/color:#757575;
                            /*@editable*/font-family:Helvetica;
                            /*@editable*/font-size:16px;
                            /*@editable*/line-height:150%;
                            /*@editable*/text-align:left;
                        }
                    /*
                    @tab Body
                    @section Body Link
                    */
                        .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
                            /*@editable*/color:#007C89;
                            /*@editable*/font-weight:normal;
                            /*@editable*/text-decoration:underline;
                        }
                    /*
                    @tab Footer
                    @section Footer Style
                    */
                        #templateFooter{
                            /*@editable*/background-color:#333333;
                            /*@editable*/background-image:none;
                            /*@editable*/background-repeat:no-repeat;
                            /*@editable*/background-position:center;
                            /*@editable*/background-size:cover;
                            /*@editable*/border-top:0;
                            /*@editable*/border-bottom:0;
                            /*@editable*/padding-top:45px;
                            /*@editable*/padding-bottom:63px;
                        }
                    /*
                    @tab Footer
                    @section Footer Interior Style
                    */
                        .footerContainer{
                            /*@editable*/background-color:transparent;
                            /*@editable*/background-image:none;
                            /*@editable*/background-repeat:no-repeat;
                            /*@editable*/background-position:center;
                            /*@editable*/background-size:cover;
                            /*@editable*/border-top:0;
                            /*@editable*/border-bottom:0;
                            /*@editable*/padding-top:0;
                            /*@editable*/padding-bottom:0;
                        }
                    /*
                    @tab Footer
                    @section Footer Text
                    */
                        .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                            /*@editable*/color:#FFFFFF;
                            /*@editable*/font-family:Helvetica;
                            /*@editable*/font-size:12px;
                            /*@editable*/line-height:150%;
                            /*@editable*/text-align:center;
                        }
                    /*
                    @tab Footer
                    @section Footer Link
                    */
                        .footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
                            /*@editable*/color:#FFFFFF;
                            /*@editable*/font-weight:normal;
                            /*@editable*/text-decoration:underline;
                        }
                    @media only screen and (min-width:768px){
                        .templateContainer{
                            width:600px !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        body,table,td,p,a,li,blockquote{
                            -webkit-text-size-adjust:none !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        body{
                            width:100% !important;
                            min-width:100% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnRetinaImage{
                            max-width:100% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnImage{
                            width:100% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
                            max-width:100% !important;
                            width:100% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnBoxedTextContentContainer{
                            min-width:100% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnImageGroupContent{
                            padding:9px !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                            padding-top:9px !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
                            padding-top:18px !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnImageCardBottomImageContent{
                            padding-bottom:9px !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnImageGroupBlockInner{
                            padding-top:0 !important;
                            padding-bottom:0 !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnImageGroupBlockOuter{
                            padding-top:9px !important;
                            padding-bottom:9px !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnTextContent,.mcnBoxedTextContentColumn{
                            padding-right:18px !important;
                            padding-left:18px !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                            padding-right:18px !important;
                            padding-bottom:0 !important;
                            padding-left:18px !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                        .mcpreview-image-uploader{
                            display:none !important;
                            width:100% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                    /*
                    @tab Mobile Styles
                    @section Heading 1
                    @tip Make the first-level headings larger in size for better readability on small screens.
                    */
                        h1{
                            /*@editable*/font-size:30px !important;
                            /*@editable*/line-height:125% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                    /*
                    @tab Mobile Styles
                    @section Heading 2
                    @tip Make the second-level headings larger in size for better readability on small screens.
                    */
                        h2{
                            /*@editable*/font-size:26px !important;
                            /*@editable*/line-height:125% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                    /*
                    @tab Mobile Styles
                    @section Heading 3
                    @tip Make the third-level headings larger in size for better readability on small screens.
                    */
                        h3{
                            /*@editable*/font-size:20px !important;
                            /*@editable*/line-height:150% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                    /*
                    @tab Mobile Styles
                    @section Heading 4
                    @tip Make the fourth-level headings larger in size for better readability on small screens.
                    */
                        h4{
                            /*@editable*/font-size:18px !important;
                            /*@editable*/line-height:150% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                    /*
                    @tab Mobile Styles
                    @section Boxed Text
                    @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                    */
                        .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                            /*@editable*/font-size:14px !important;
                            /*@editable*/line-height:150% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                    /*
                    @tab Mobile Styles
                    @section Header Text
                    @tip Make the header text larger in size for better readability on small screens.
                    */
                        .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                            /*@editable*/font-size:16px !important;
                            /*@editable*/line-height:150% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                    /*
                    @tab Mobile Styles
                    @section Body Text
                    @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                    */
                        .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                            /*@editable*/font-size:16px !important;
                            /*@editable*/line-height:150% !important;
                        }
                
                }	@media only screen and (max-width: 480px){
                    /*
                    @tab Mobile Styles
                    @section Footer Text
                    @tip Make the footer content text larger in size for better readability on small screens.
                    */
                        .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                            /*@editable*/font-size:14px !important;
                            /*@editable*/line-height:150% !important;
                        }
                
                }</style></head>
                    <body>
          
        
                        <center>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                                <tr>
                                    <td align="center" valign="top" id="bodyCell">
                                        <!-- BEGIN TEMPLATE // -->
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td align="center" valign="top" id="templateHeader" data-template-container   style="
                                                background-color: #8e77ff;
                                                text-align:center;
                                              ">
                                                    <!--[if (gte mso 9)|(IE)]>
                                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                    <tr>
                                                    <td align="center" valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                        <tr>
                                                            <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                    <tbody class="mcnImageBlockOuter">
                            <tr>
                                <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                        <tbody><tr>
                                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                                
                                                    
                                                        <img align="center" alt="" src="*|BRAND:LOGO|*" width="196" style="max-width: 196px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px solid; border-radius: 1%;" class="mcnImage">
                                                    
                                                
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                    </tbody>
                </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                    <tbody class="mcnTextBlockOuter">
                        <tr>
                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                  <!--[if mso]>
                                <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                <tr>
                                <![endif]-->
                                
                                <!--[if mso]>
                                <td valign="top" width="600" style="width:600px;">
                                <![endif]-->
                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                    <tbody><tr>
                                        
                                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                                        
                                            <h1>Hey Admin</h1>
                
                                        </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso]>
                                </td>
                                <![endif]-->
                                
                                <!--[if mso]>
                                </tr>
                                </table>
                                <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table></td>
                                                        </tr>
                                                    </table>
                                                    <!--[if (gte mso 9)|(IE)]>
                                                    </td>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="top" id="templateBody" data-template-container>
                                                    <!--[if (gte mso 9)|(IE)]>
                                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                    <tr>
                                                    <td align="center" valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                        <tr>
                                                            <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                    <tbody class="mcnImageBlockOuter">
                            <tr>
                                <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                        <tbody><tr>
                                            <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                                
                                                    
                                                        <img align="center" alt="" src="https://mcusercontent.com/8a175fbc56041c6920bb9fff5/images/8bf57f3e-38ee-01cb-73e4-de618bc83e8e.png" width="NaN" style="max-width:336px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
                                                    
                                                
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                    </tbody>
                </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                    <tbody class="mcnTextBlockOuter">
                        <tr>
                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                  <!--[if mso]>
                                <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                <tr>
                                <![endif]-->
                                
                                <!--[if mso]>
                                <td valign="top" width="600" style="width:600px;">
                                <![endif]-->
                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                    <tbody><tr>
                                        
                                        <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;text-align:center">
                                        
                                            <span style="font-family:merriweather sans,helvetica neue,helvetica,arial,sans-serif"><span style="font-size:18px;text-align:center"><strong>New Agent Request Has shown Up</strong></span></span><br>
                Name:&nbsp; ${data.name}<br>
                Email:&nbsp; ${data.email}<br>
                Phone Number: ${data.phone}<br>
                City: ${data.city}<br>
                Type: ${data.type}<br>
                Category:&nbsp; ${data.category}
                                        </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso]>
                                </td>
                                <![endif]-->
                                
                                <!--[if mso]>
                                </tr>
                                </table>
                                <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                    <tbody class="mcnDividerBlockOuter">
                        <tr>
                            <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;">
                                    <tbody><tr>
                                        <td>
                                            <span></span>
                                        </td>
                                    </tr>
                                </tbody></table>
                <!--            
                                <td class="mcnDividerBlockInner" style="padding: 18px;">
                                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                -->
                            </td>
                        </tr>
                    </tbody>
                </table></td>
                                                        </tr>
                                                    </table>
                                                    <!--[if (gte mso 9)|(IE)]>
                                                    </td>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="top" id="templateFooter" data-template-container  style="background-color: #333333; text-align: center">
                                                    <!--[if (gte mso 9)|(IE)]>
                                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                    <tr>
                                                    <td align="center" valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                        <tr>
                                                            <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width:100%;">
                    <tbody class="mcnFollowBlockOuter">
                        <tr>
                            <td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width:100%;">
                    <tbody><tr>
                        <td align="center" style="padding-left:9px;padding-right:9px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnFollowContent">
                                <tbody><tr>
                                    <td align="center" valign="top" style="padding-top:9px; padding-right:9px; padding-left:9px;">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0">
                                            <tbody><tr>
                                                <td align="center" valign="top">
                                                    <!--[if mso]>
                                                    <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                    <![endif]-->
                                                    
                                                        <!--[if mso]>
                                                        <td align="center" valign="top">
                                                        <![endif]-->
                                                        
                                                        
                                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                                <tbody><tr>
                                                                    <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                            <tbody><tr>
                                                                                <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                        <tbody><tr>
                                                                                            
                                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                    <a href="http://www.facebook.com" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png" alt="Facebook" style="display:block;" height="24" width="24" class=""></a>
                                                                                                </td>
                                                                                            
                                                                                            
                                                                                        </tr>
                                                                                    </tbody></table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody></table>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                        
                                                        <!--[if mso]>
                                                        </td>
                                                        <![endif]-->
                                                    
                                                        <!--[if mso]>
                                                        <td align="center" valign="top">
                                                        <![endif]-->
                                                        
                                                        
                                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                                <tbody><tr>
                                                                    <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                            <tbody><tr>
                                                                                <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                        <tbody><tr>
                                                                                            
                                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                    <a href="http://www.twitter.com/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-twitter-48.png" alt="Twitter" style="display:block;" height="24" width="24" class=""></a>
                                                                                                </td>
                                                                                            
                                                                                            
                                                                                        </tr>
                                                                                    </tbody></table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody></table>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                        
                                                        <!--[if mso]>
                                                        </td>
                                                        <![endif]-->
                                                    
                                                        <!--[if mso]>
                                                        <td align="center" valign="top">
                                                        <![endif]-->
                                                        
                                                        
                                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                                <tbody><tr>
                                                                    <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                            <tbody><tr>
                                                                                <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                        <tbody><tr>
                                                                                            
                                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                    <a href="http://www.instagram.com/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png" alt="Link" style="display:block;" height="24" width="24" class=""></a>
                                                                                                </td>
                                                                                            
                                                                                            
                                                                                        </tr>
                                                                                    </tbody></table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody></table>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                        
                                                        <!--[if mso]>
                                                        </td>
                                                        <![endif]-->
                                                    
                                                        <!--[if mso]>
                                                        <td align="center" valign="top">
                                                        <![endif]-->
                                                        
                                                        
                                                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                                <tbody><tr>
                                                                    <td valign="top" style="padding-right:0; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                            <tbody><tr>
                                                                                <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                        <tbody><tr>
                                                                                            
                                                                                                <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                    <a href="http://mailchimp.com" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-link-48.png" alt="Website" style="display:block;" height="24" width="24" class=""></a>
                                                                                                </td>
                                                                                            
                                                                                            
                                                                                        </tr>
                                                                                    </tbody></table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody></table>
                                                                    </td>
                                                                </tr>
                                                            </tbody></table>
                                                        
                                                        <!--[if mso]>
                                                        </td>
                                                        <![endif]-->
                                                    
                                                    <!--[if mso]>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
                                                </td>
                                            </tr>
                                        </tbody></table>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                </tbody></table>
                
                            </td>
                        </tr>
                    </tbody>
                </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                    <tbody class="mcnDividerBlockOuter">
                        <tr>
                            <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                                <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #505050;">
                                    <tbody><tr>
                                        <td>
                                            <span></span>
                                        </td>
                                    </tr>
                                </tbody></table>
                <!--            
                                <td class="mcnDividerBlockInner" style="padding: 18px;">
                                <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                -->
                            </td>
                        </tr>
                    </tbody>
                </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                    <tbody class="mcnTextBlockOuter">
                        <tr>
                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                  <!--[if mso]>
                                <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                                <tr>
                                <![endif]-->
                                
                                <!--[if mso]>
                                <td valign="top" width="600" style="width:600px;">
                                <![endif]-->
                                <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                    <tbody><tr>
                                        
                                        <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #FF0000;">
                                        
                                            <em>Copyright © {{Domain}}</em><br>
                &nbsp;
                                        </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso]>
                                </td>
                                <![endif]-->
                                
                                <!--[if mso]>
                                </tr>
                                </table>
                                <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table></td>
                                                        </tr>
                                                    </table>
                                                    <!--[if (gte mso 9)|(IE)]>
                                                    </td>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- // END TEMPLATE -->
                                    </td>
                                </tr>
                            </table>
                        </center>
                    <script type="text/javascript"  src="/f_0wn9/jS/9E/TdpU/_6BYJjrE63ufM/3mYJVXhcaaD5/E0B3bzkhJAE/BDV/gdiBVZxs"></script></body>
                </html>
                `,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log("Error" + error);
              } else {
                console.log("Mail Sent" + info);
              }
            });
          });
          res.status(200).json({ message: "Added" });
        })
        .catch((err) => {
          res.status(400).json({ message: "Internal Server Error" });
        });
    } else {
      res.status(403).json({ message: "Already Exist" });
    }
  });
});

router.get("/agent/get_agents_data_no_verification", (req, res) => {
  const agents = Agent.find({ is_verified: 0 })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/agent/get_single_agent/:id", (req, res) => {
  const id = req.params.id;

  const agent = Agent.findById(id).then((doc) => {
    res.json(doc);
  });
});

router.post("/admin/agent_login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  const agent = Agent.find({ email: email }).then((doc) => {
    if (doc.length != 0) {
      if (doc[0].password === pass) {
        res.json(doc);
      } else {
        res.status(400).json({ mesage: "Passwords not match" });
      }
    } else {
      res.status(404).json({ message: "No EMailFound" });
    }
  });
});

router.get(
  "/agent/get_clients/:type/:category/:city",
  (req, res) => {
    const posts = contactAgent
      .aggregate([
        {
          $match: {
            result: { $lte: 0 },
            type: req.params.type,
            Category: req.params.category,
            City: req.params.city,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "uid",
            foreignField: "_id",
            as: "user_details",
          },
        },
      ])
      .then((data) => {
        res.json(data);
      });
  },
  []
);

router.post("/agent/StartWork/:id/:agent", (req, res) => {
  contactAgent.findById(req.params.id).then((doc) => {
    if (doc.aid === undefined) {
      contactAgent
        .findByIdAndUpdate(req.params.id, { result: 1, aid: req.params.agent })
        .then((doc) => {
          const data = {
            agent: null,
            client: null,
          };
          res.status(200).json({ message: "Done" });
          Agent.findById(req.params.agent).then((document) => {
            data.agent = document;
            User.findById(doc.uid).then((docs) => {
              data.client = docs;

              /*
              ---------------Mailer-----------------------
              */

              var transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                auth: {
                  user: "insuranceproject377@gmail.com",
                  pass: "elpgvsftguesyvcy",
                },
              });
              transporter.verify((err, success) => {
                err
                  ? console.log(err)
                  : console.log(
                      `=== Server is ready to take messages: ${success} ===`
                    );
              });

              // transporter.use("compile", hbs(handlebarOptions));

              var mailOptions = {
                from: "Insurnace Email BOT 👥 <insuranceproject377@gmail.com>",
                to: data.client.email,
                subject: "Agent Replied",
                html: `<!doctype html>
                <html lang="en-US">
                
                <head>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                    <title>New Account Email Template</title>
                    <meta name="description" content="New Account Email Template.">
                    <style type="text/css">
                        a:hover {
                            text-decoration: underline !important;
                        }
                    </style>
                </head>
                
                <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                    
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                        <tr>
                            <td>
                                <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                                    align="center" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <a href="#" title="logo" target="_blank">
                                                <img width="180"
                                                    src="https://i.ibb.co/KmbwVQg/logo-3e7528cb1aa6be19cf48.png"
                                                    title="logo" alt="logo">
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0 35px;">
                                                        <h1
                                                            style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">
                                                            Congratulations an Agent Has Decided to Work with you. Get the Details Below
                                                        </h1>
                                                        <span
                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                        <p
                                                            style="color:#455056; font-size:18px;line-height:20px; margin:0; font-weight: 500;">
                                                            <strong
                                                                style="display: block;font-size: 13px; margin: 0 0 4px; color:rgba(0,0,0,.64); font-weight:normal;">Name</strong>${data.agent.name}
                                                            <strong
                                                                style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">City</strong>${data.agent.city}
                                                            <strong
                                                                style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Category</strong>${data.agent.category}

                                                                <strong
                                                                style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Phone Number</strong>${data.agent.phone}

                                                                <strong
                                                                style="display: block; font-size: 13px; margin: 24px 0 4px 0; font-weight:normal; color:rgba(0,0,0,.64);">Email Address</strong>${data.agent.email}
                                                        </p>
                
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;You can contact them with the details given above. Thanks For using our Platform</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                </body>
                
                </html>`,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log("Error" + error);
                } else {
                  console.log("Mail Sent" + info);
                }
              });
            });
          });
        });
    } else {
      res.status(405).json({ message: "Already Taken" });
    }
  });
});

router.post("/update/agent/", (req, res) => {
  /* Updating the profile image of the agent. */
  Agent.findByIdAndUpdate(req.body.agent_id, {
    profile_img: req.body.image,
  }).then((doc) => {
    res.json({ message: "Done" });
  });
});

router.post("/create-checkout-session/:pid/:plan/:aid", async (req, res) => {
  const session = await stripe.checkout.sessions
    .create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: req.params.pid,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        `${YOUR_DOMAIN}/success_payment/` +
        req.params.plan +
        "/" +
        req.params.aid +
        "/bdc1e778af50d37a791b04decdff766c806ed59c40bc240ef12eaf15a36ce8a75572505f26fa588ad4c9602304b58fce9",
      cancel_url: `${YOUR_DOMAIN}/canceled`,
    })
    .then((doc) => {
      res.redirect(303, doc.url);
    });
});

router.get("/success_payment/:plan/:aid/:rand", (req, res) => {
  if (req.params.plan === "standard") {
    Agent.findByIdAndUpdate(req.params.aid, { $inc: { credit: 20 } }).then(
      (doc) => {
        /* Creating a new payment object and saving it to the database. */
        const payment = new Payment();
        payment.aid = req.params.aid;
        payment.plan = req.params.plan;
        payment.save().then((docs) => {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
              user: "insuranceproject377@gmail.com",
              pass: "elpgvsftguesyvcy",
            },
            secure: true,
            host: "smtp.gmail.com",
          });

          transporter.verify((err, success) => {
            err
              ? console.log(err)
              : console.log(
                  `=== Server is ready to take messages: ${success} ===`
                );
          });

          var mailOptions = {
            from: "Insurnace Email BOT 👥 <insuranceproject377@gmail.com>",
            to: doc.email,
            subject: "Thanks For Purchasing the " + req.params.plan + " Plan",
            html: `<!doctype html>
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                    <!-- NAME: SELL PRODUCTS -->
                    <!--[if gte mso 15]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>*|MC:SUBJECT|*</title>
                    
                <style type="text/css">
                    p{
                        margin:10px 0;
                        padding:0;
                    }
                    table{
                        border-collapse:collapse;
                    }
                    h1,h2,h3,h4,h5,h6{
                        display:block;
                        margin:0;
                        padding:0;
                    }
                    img,a img{
                        border:0;
                        height:auto;
                        outline:none;
                        text-decoration:none;
                    }
                    body,#bodyTable,#bodyCell{
                        height:100%;
                        margin:0;
                        padding:0;
                        width:100%;
                    }
                    .mcnPreviewText{
                        display:none !important;
                    }
                    #outlook a{
                        padding:0;
                    }
                    img{
                        -ms-interpolation-mode:bicubic;
                    }
                    table{
                        mso-table-lspace:0pt;
                        mso-table-rspace:0pt;
                    }
                    .ReadMsgBody{
                        width:100%;
                    }
                    .ExternalClass{
                        width:100%;
                    }
                    p,a,li,td,blockquote{
                        mso-line-height-rule:exactly;
                    }
                    a[href^=tel],a[href^=sms]{
                        color:inherit;
                        cursor:default;
                        text-decoration:none;
                    }
                    p,a,li,td,body,table,blockquote{
                        -ms-text-size-adjust:100%;
                        -webkit-text-size-adjust:100%;
                    }
                    .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
                        line-height:100%;
                    }
                    a[x-apple-data-detectors]{
                        color:inherit !important;
                        text-decoration:none !important;
                        font-size:inherit !important;
                        font-family:inherit !important;
                        font-weight:inherit !important;
                        line-height:inherit !important;
                    }
                    .templateContainer{
                        max-width:600px !important;
                    }
                    a.mcnButton{
                        display:block;
                    }
                    .mcnImage,.mcnRetinaImage{
                        vertical-align:bottom;
                    }
                    .mcnTextContent{
                        word-break:break-word;
                    }
                    .mcnTextContent img{
                        height:auto !important;
                    }
                    .mcnDividerBlock{
                        table-layout:fixed !important;
                    }
                /*
                @tab Page
                @section Heading 1
                @style heading 1
                */
                    h1{
                        /*@editable*/color:#222222;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:40px;
                        /*@editable*/font-style:normal;
                        /*@editable*/font-weight:bold;
                        /*@editable*/line-height:150%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:center;
                    }
                /*
                @tab Page
                @section Heading 2
                @style heading 2
                */
                    h2{
                        /*@editable*/color:#222222;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:34px;
                        /*@editable*/font-style:normal;
                        /*@editable*/font-weight:bold;
                        /*@editable*/line-height:150%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Page
                @section Heading 3
                @style heading 3
                */
                    h3{
                        /*@editable*/color:#444444;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:22px;
                        /*@editable*/font-style:normal;
                        /*@editable*/font-weight:bold;
                        /*@editable*/line-height:150%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Page
                @section Heading 4
                @style heading 4
                */
                    h4{
                        /*@editable*/color:#949494;
                        /*@editable*/font-family:Georgia;
                        /*@editable*/font-size:20px;
                        /*@editable*/font-style:italic;
                        /*@editable*/font-weight:normal;
                        /*@editable*/line-height:125%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Header
                @section Header Container Style
                */
                    #templateHeader{
                        /*@editable*/background-color:#8e77ff;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:45px;
                        /*@editable*/padding-bottom:45px;
                    }
                /*
                @tab Header
                @section Header Interior Style
                */
                    .headerContainer{
                        /*@editable*/background-color:transparent;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:0;
                        /*@editable*/padding-bottom:0;
                    }
                /*
                @tab Header
                @section Header Text
                */
                    .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                        /*@editable*/color:#757575;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:16px;
                        /*@editable*/line-height:150%;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Header
                @section Header Link
                */
                    .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
                        /*@editable*/color:#007C89;
                        /*@editable*/font-weight:normal;
                        /*@editable*/text-decoration:underline;
                    }
                /*
                @tab Body
                @section Body Container Style
                */
                    #templateBody{
                        /*@editable*/background-color:#FFFFFF;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:36px;
                        /*@editable*/padding-bottom:45px;
                    }
                /*
                @tab Body
                @section Body Interior Style
                */
                    .bodyContainer{
                        /*@editable*/background-color:transparent;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:0;
                        /*@editable*/padding-bottom:0;
                    }
                /*
                @tab Body
                @section Body Text
                */
                    .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                        /*@editable*/color:#757575;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:16px;
                        /*@editable*/line-height:150%;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Body
                @section Body Link
                */
                    .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
                        /*@editable*/color:#007C89;
                        /*@editable*/font-weight:normal;
                        /*@editable*/text-decoration:underline;
                    }
                /*
                @tab Footer
                @section Footer Style
                */
                    #templateFooter{
                        /*@editable*/background-color:#333333;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:45px;
                        /*@editable*/padding-bottom:63px;
                    }
                /*
                @tab Footer
                @section Footer Interior Style
                */
                    .footerContainer{
                        /*@editable*/background-color:transparent;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:0;
                        /*@editable*/padding-bottom:0;
                    }
                /*
                @tab Footer
                @section Footer Text
                */
                    .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                        /*@editable*/color:#FFFFFF;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:12px;
                        /*@editable*/line-height:150%;
                        /*@editable*/text-align:center;
                    }
                /*
                @tab Footer
                @section Footer Link
                */
                    .footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
                        /*@editable*/color:#FFFFFF;
                        /*@editable*/font-weight:normal;
                        /*@editable*/text-decoration:underline;
                    }
                @media only screen and (min-width:768px){
                    .templateContainer{
                        width:600px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    body,table,td,p,a,li,blockquote{
                        -webkit-text-size-adjust:none !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    body{
                        width:100% !important;
                        min-width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnRetinaImage{
                        max-width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImage{
                        width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
                        max-width:100% !important;
                        width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnBoxedTextContentContainer{
                        min-width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageGroupContent{
                        padding:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                        padding-top:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
                        padding-top:18px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageCardBottomImageContent{
                        padding-bottom:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageGroupBlockInner{
                        padding-top:0 !important;
                        padding-bottom:0 !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageGroupBlockOuter{
                        padding-top:9px !important;
                        padding-bottom:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnTextContent,.mcnBoxedTextContentColumn{
                        padding-right:18px !important;
                        padding-left:18px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                        padding-right:18px !important;
                        padding-bottom:0 !important;
                        padding-left:18px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcpreview-image-uploader{
                        display:none !important;
                        width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 1
                @tip Make the first-level headings larger in size for better readability on small screens.
                */
                    h1{
                        /*@editable*/font-size:30px !important;
                        /*@editable*/line-height:125% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 2
                @tip Make the second-level headings larger in size for better readability on small screens.
                */
                    h2{
                        /*@editable*/font-size:26px !important;
                        /*@editable*/line-height:125% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 3
                @tip Make the third-level headings larger in size for better readability on small screens.
                */
                    h3{
                        /*@editable*/font-size:20px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 4
                @tip Make the fourth-level headings larger in size for better readability on small screens.
                */
                    h4{
                        /*@editable*/font-size:18px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Boxed Text
                @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                */
                    .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                        /*@editable*/font-size:14px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Header Text
                @tip Make the header text larger in size for better readability on small screens.
                */
                    .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                        /*@editable*/font-size:16px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Body Text
                @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                */
                    .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                        /*@editable*/font-size:16px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Footer Text
                @tip Make the footer content text larger in size for better readability on small screens.
                */
                    .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                        /*@editable*/font-size:14px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }</style></head>
                <body>
                    <center>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                            <tr>
                                <td align="center" valign="top" id="bodyCell">
                                    <!-- BEGIN TEMPLATE // -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="center" valign="top" id="templateHeader" data-template-container style="
                                            background-color: #8e77ff;
                                            text-align:center; ">
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                <![endif]-->
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                    <tr>
                                                        <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                <tbody class="mcnImageBlockOuter">
                        <tr>
                            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                    <tbody><tr>
                                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                            
                                                
                                                    <img align="center" alt="" src="*|BRAND:LOGO|*" width="196" style="max-width: 196px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px solid; border-radius: 1%;" class="mcnImage">
                                                
                                            
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->
                            
                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                                    
                                        <h1>Thanks for Buying our ${req.params.plan} Plan.</h1>
            
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--[if mso]>
                            </td>
                            <![endif]-->
                            
                            <!--[if mso]>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top" id="templateBody" data-template-container>
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                <![endif]-->
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                    <tr>
                                                        <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                <tbody class="mcnImageBlockOuter">
                        <tr>
                            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                    <tbody><tr>
                                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                            
                                                
                                                    <img align="center" alt="" src="https://mcusercontent.com/8a175fbc56041c6920bb9fff5/images/e4854abd-a11a-cd91-14ec-66596769421e.png" width="NaN" style="max-width:328px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
                                                
                                            
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->
                            
                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;text-align:center">
                                    
                                        <h3>Feature of the Selected ${req.params.plan} Plan</h3>
            
            <ul>
                <li>Includes 20 Credits</li>
                <li>Can Purchase More Credits Anytime</li>
                <li>Credits Last 3 years</li>
            </ul>
            
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--[if mso]>
                            </td>
                            <![endif]-->
                            
                            <!--[if mso]>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                <tbody class="mcnDividerBlockOuter">
                    <tr>
                        <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                            <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;">
                                <tbody><tr>
                                    <td>
                                        <span></span>
                                    </td>
                                </tr>
                            </tbody></table>
            <!--            
                            <td class="mcnDividerBlockInner" style="padding: 18px;">
                            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
            -->
                        </td>
                    </tr>
                </tbody>
            </table></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top" id="templateFooter" data-template-container style="background-color: #333333; text-align: center">
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                <![endif]-->
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                    <tr>
                                                        <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width:100%;">
                <tbody class="mcnFollowBlockOuter">
                    <tr>
                        <td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width:100%;">
                <tbody><tr>
                    <td align="center" style="padding-left:9px;padding-right:9px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnFollowContent">
                            <tbody><tr>
                                <td align="center" valign="top" style="padding-top:9px; padding-right:9px; padding-left:9px;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0">
                                        <tbody><tr>
                                            <td align="center" valign="top">
                                                <!--[if mso]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://www.facebook.com" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png" alt="Facebook" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://www.twitter.com/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-twitter-48.png" alt="Twitter" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://www.instagram.com/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png" alt="Link" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:0; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://mailchimp.com" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-link-48.png" alt="Website" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                <!--[if mso]>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            
                        </td>
                    </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                <tbody class="mcnDividerBlockOuter">
                    <tr>
                        <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                            <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #505050;">
                                <tbody><tr>
                                    <td>
                                        <span></span>
                                    </td>
                                </tr>
                            </tbody></table>
            <!--            
                            <td class="mcnDividerBlockInner" style="padding: 18px;">
                            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
            -->
                        </td>
                    </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->
                            
                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #FF0000;">
                                    
                                        <em>Copyright © *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em><br>
            &nbsp;
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--[if mso]>
                            </td>
                            <![endif]-->
                            
                            <!--[if mso]>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- // END TEMPLATE -->
                                </td>
                            </tr>
                        </table>
                    </center>
                <script type="text/javascript"  src="/f_0wn9/jS/9E/TdpU/_6BYJjrE63ufM/3mYJVXhcaaD5/E0B3bzkhJAE/BDV/gdiBVZxs"></script></body>
            </html>
             `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Error" + error);
            } else {
              console.log("Mail Sent" + info);
            }
          });
          res.redirect("https://insurance-agents.vercel.app/Payment-Success");
        });
      }
    );
  } else if (req.params.plan === "Gold") {
    Agent.findByIdAndUpdate(req.params.aid, { $inc: { credit: 50 } }).then(
      (doc) => {
        const payment = new Payment();
        payment.aid = req.params.aid;
        payment.plan = req.params.plan;

        payment.save().then((docs) => {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
              user: "insuranceproject377@gmail.com",
              pass: "elpgvsftguesyvcy",
            },
            secure: true,
            host: "smtp.gmail.com",
          });

          transporter.verify((err, success) => {
            err
              ? console.log(err)
              : console.log(
                  `=== Server is ready to take messages: ${success} ===`
                );
          });

          var mailOptions = {
            from: "Insurnace Email BOT 👥 <insuranceproject377@gmail.com>",
            to: doc.email,
            subject: "Thanks For Purchasing the " + req.params.plan + " Plan",
            html: `<!doctype html>
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                    <!-- NAME: SELL PRODUCTS -->
                    <!--[if gte mso 15]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>*|MC:SUBJECT|*</title>
                    
                <style type="text/css">
                    p{
                        margin:10px 0;
                        padding:0;
                    }
                    table{
                        border-collapse:collapse;
                    }
                    h1,h2,h3,h4,h5,h6{
                        display:block;
                        margin:0;
                        padding:0;
                    }
                    img,a img{
                        border:0;
                        height:auto;
                        outline:none;
                        text-decoration:none;
                    }
                    body,#bodyTable,#bodyCell{
                        height:100%;
                        margin:0;
                        padding:0;
                        width:100%;
                    }
                    .mcnPreviewText{
                        display:none !important;
                    }
                    #outlook a{
                        padding:0;
                    }
                    img{
                        -ms-interpolation-mode:bicubic;
                    }
                    table{
                        mso-table-lspace:0pt;
                        mso-table-rspace:0pt;
                    }
                    .ReadMsgBody{
                        width:100%;
                    }
                    .ExternalClass{
                        width:100%;
                    }
                    p,a,li,td,blockquote{
                        mso-line-height-rule:exactly;
                    }
                    a[href^=tel],a[href^=sms]{
                        color:inherit;
                        cursor:default;
                        text-decoration:none;
                    }
                    p,a,li,td,body,table,blockquote{
                        -ms-text-size-adjust:100%;
                        -webkit-text-size-adjust:100%;
                    }
                    .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
                        line-height:100%;
                    }
                    a[x-apple-data-detectors]{
                        color:inherit !important;
                        text-decoration:none !important;
                        font-size:inherit !important;
                        font-family:inherit !important;
                        font-weight:inherit !important;
                        line-height:inherit !important;
                    }
                    .templateContainer{
                        max-width:600px !important;
                    }
                    a.mcnButton{
                        display:block;
                    }
                    .mcnImage,.mcnRetinaImage{
                        vertical-align:bottom;
                    }
                    .mcnTextContent{
                        word-break:break-word;
                    }
                    .mcnTextContent img{
                        height:auto !important;
                    }
                    .mcnDividerBlock{
                        table-layout:fixed !important;
                    }
                /*
                @tab Page
                @section Heading 1
                @style heading 1
                */
                    h1{
                        /*@editable*/color:#222222;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:40px;
                        /*@editable*/font-style:normal;
                        /*@editable*/font-weight:bold;
                        /*@editable*/line-height:150%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:center;
                    }
                /*
                @tab Page
                @section Heading 2
                @style heading 2
                */
                    h2{
                        /*@editable*/color:#222222;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:34px;
                        /*@editable*/font-style:normal;
                        /*@editable*/font-weight:bold;
                        /*@editable*/line-height:150%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Page
                @section Heading 3
                @style heading 3
                */
                    h3{
                        /*@editable*/color:#444444;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:22px;
                        /*@editable*/font-style:normal;
                        /*@editable*/font-weight:bold;
                        /*@editable*/line-height:150%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Page
                @section Heading 4
                @style heading 4
                */
                    h4{
                        /*@editable*/color:#949494;
                        /*@editable*/font-family:Georgia;
                        /*@editable*/font-size:20px;
                        /*@editable*/font-style:italic;
                        /*@editable*/font-weight:normal;
                        /*@editable*/line-height:125%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Header
                @section Header Container Style
                */
                    #templateHeader{
                        /*@editable*/background-color:#8e77ff;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:45px;
                        /*@editable*/padding-bottom:45px;
                    }
                /*
                @tab Header
                @section Header Interior Style
                */
                    .headerContainer{
                        /*@editable*/background-color:transparent;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:0;
                        /*@editable*/padding-bottom:0;
                    }
                /*
                @tab Header
                @section Header Text
                */
                    .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                        /*@editable*/color:#757575;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:16px;
                        /*@editable*/line-height:150%;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Header
                @section Header Link
                */
                    .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
                        /*@editable*/color:#007C89;
                        /*@editable*/font-weight:normal;
                        /*@editable*/text-decoration:underline;
                    }
                /*
                @tab Body
                @section Body Container Style
                */
                    #templateBody{
                        /*@editable*/background-color:#FFFFFF;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:36px;
                        /*@editable*/padding-bottom:45px;
                    }
                /*
                @tab Body
                @section Body Interior Style
                */
                    .bodyContainer{
                        /*@editable*/background-color:transparent;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:0;
                        /*@editable*/padding-bottom:0;
                    }
                /*
                @tab Body
                @section Body Text
                */
                    .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                        /*@editable*/color:#757575;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:16px;
                        /*@editable*/line-height:150%;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Body
                @section Body Link
                */
                    .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
                        /*@editable*/color:#007C89;
                        /*@editable*/font-weight:normal;
                        /*@editable*/text-decoration:underline;
                    }
                /*
                @tab Footer
                @section Footer Style
                */
                    #templateFooter{
                        /*@editable*/background-color:#333333;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:45px;
                        /*@editable*/padding-bottom:63px;
                    }
                /*
                @tab Footer
                @section Footer Interior Style
                */
                    .footerContainer{
                        /*@editable*/background-color:transparent;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:0;
                        /*@editable*/padding-bottom:0;
                    }
                /*
                @tab Footer
                @section Footer Text
                */
                    .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                        /*@editable*/color:#FFFFFF;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:12px;
                        /*@editable*/line-height:150%;
                        /*@editable*/text-align:center;
                    }
                /*
                @tab Footer
                @section Footer Link
                */
                    .footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
                        /*@editable*/color:#FFFFFF;
                        /*@editable*/font-weight:normal;
                        /*@editable*/text-decoration:underline;
                    }
                @media only screen and (min-width:768px){
                    .templateContainer{
                        width:600px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    body,table,td,p,a,li,blockquote{
                        -webkit-text-size-adjust:none !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    body{
                        width:100% !important;
                        min-width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnRetinaImage{
                        max-width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImage{
                        width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
                        max-width:100% !important;
                        width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnBoxedTextContentContainer{
                        min-width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageGroupContent{
                        padding:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                        padding-top:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
                        padding-top:18px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageCardBottomImageContent{
                        padding-bottom:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageGroupBlockInner{
                        padding-top:0 !important;
                        padding-bottom:0 !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageGroupBlockOuter{
                        padding-top:9px !important;
                        padding-bottom:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnTextContent,.mcnBoxedTextContentColumn{
                        padding-right:18px !important;
                        padding-left:18px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                        padding-right:18px !important;
                        padding-bottom:0 !important;
                        padding-left:18px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcpreview-image-uploader{
                        display:none !important;
                        width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 1
                @tip Make the first-level headings larger in size for better readability on small screens.
                */
                    h1{
                        /*@editable*/font-size:30px !important;
                        /*@editable*/line-height:125% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 2
                @tip Make the second-level headings larger in size for better readability on small screens.
                */
                    h2{
                        /*@editable*/font-size:26px !important;
                        /*@editable*/line-height:125% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 3
                @tip Make the third-level headings larger in size for better readability on small screens.
                */
                    h3{
                        /*@editable*/font-size:20px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 4
                @tip Make the fourth-level headings larger in size for better readability on small screens.
                */
                    h4{
                        /*@editable*/font-size:18px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Boxed Text
                @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                */
                    .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                        /*@editable*/font-size:14px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Header Text
                @tip Make the header text larger in size for better readability on small screens.
                */
                    .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                        /*@editable*/font-size:16px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Body Text
                @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                */
                    .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                        /*@editable*/font-size:16px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Footer Text
                @tip Make the footer content text larger in size for better readability on small screens.
                */
                    .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                        /*@editable*/font-size:14px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }</style></head>
                <body>
                    <center>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                            <tr>
                                <td align="center" valign="top" id="bodyCell">
                                    <!-- BEGIN TEMPLATE // -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="center" valign="top" id="templateHeader" data-template-container style="
                                            background-color: #8e77ff;
                                            text-align:center; ">
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                <![endif]-->
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                    <tr>
                                                        <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                <tbody class="mcnImageBlockOuter">
                        <tr>
                            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                    <tbody><tr>
                                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                            
                                                
                                                    <img align="center" alt="" src="*|BRAND:LOGO|*" width="196" style="max-width: 196px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px solid; border-radius: 1%;" class="mcnImage">
                                                
                                            
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->
                            
                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                                    
                                        <h1>Thanks for Buying our ${req.params.plan} Plan.</h1>
            
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--[if mso]>
                            </td>
                            <![endif]-->
                            
                            <!--[if mso]>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top" id="templateBody" data-template-container>
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                <![endif]-->
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                    <tr>
                                                        <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                <tbody class="mcnImageBlockOuter">
                        <tr>
                            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                    <tbody><tr>
                                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                            
                                                
                                                    <img align="center" alt="" src="https://mcusercontent.com/8a175fbc56041c6920bb9fff5/images/e4854abd-a11a-cd91-14ec-66596769421e.png" width="NaN" style="max-width:328px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
                                                
                                            
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->
                            
                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;text-align:center">
                                    
                                        <h3>Feature of the Selected ${req.params.plan} Plan</h3>
            
            <ul>
                <li>Includes 20 Credits</li>
                <li>Can Purchase More Credits Anytime</li>
                <li>Credits Last 3 years</li>
            </ul>
            
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--[if mso]>
                            </td>
                            <![endif]-->
                            
                            <!--[if mso]>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                <tbody class="mcnDividerBlockOuter">
                    <tr>
                        <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                            <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;">
                                <tbody><tr>
                                    <td>
                                        <span></span>
                                    </td>
                                </tr>
                            </tbody></table>
            <!--            
                            <td class="mcnDividerBlockInner" style="padding: 18px;">
                            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
            -->
                        </td>
                    </tr>
                </tbody>
            </table></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top" id="templateFooter" data-template-container style="background-color: #333333; text-align: center">
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                <![endif]-->
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                    <tr>
                                                        <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width:100%;">
                <tbody class="mcnFollowBlockOuter">
                    <tr>
                        <td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width:100%;">
                <tbody><tr>
                    <td align="center" style="padding-left:9px;padding-right:9px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnFollowContent">
                            <tbody><tr>
                                <td align="center" valign="top" style="padding-top:9px; padding-right:9px; padding-left:9px;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0">
                                        <tbody><tr>
                                            <td align="center" valign="top">
                                                <!--[if mso]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://www.facebook.com" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png" alt="Facebook" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://www.twitter.com/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-twitter-48.png" alt="Twitter" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://www.instagram.com/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png" alt="Link" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:0; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://mailchimp.com" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-link-48.png" alt="Website" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                <!--[if mso]>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            
                        </td>
                    </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                <tbody class="mcnDividerBlockOuter">
                    <tr>
                        <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                            <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #505050;">
                                <tbody><tr>
                                    <td>
                                        <span></span>
                                    </td>
                                </tr>
                            </tbody></table>
            <!--            
                            <td class="mcnDividerBlockInner" style="padding: 18px;">
                            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
            -->
                        </td>
                    </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->
                            
                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #FF0000;">
                                    
                                        <em>Copyright © *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em><br>
            &nbsp;
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--[if mso]>
                            </td>
                            <![endif]-->
                            
                            <!--[if mso]>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- // END TEMPLATE -->
                                </td>
                            </tr>
                        </table>
                    </center>
                <script type="text/javascript"  src="/f_0wn9/jS/9E/TdpU/_6BYJjrE63ufM/3mYJVXhcaaD5/E0B3bzkhJAE/BDV/gdiBVZxs"></script></body>
            </html>
             `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Error" + error);
            } else {
              console.log("Mail Sent" + info);
            }
          });
          res.redirect("https://insurance-agents.vercel.app/Payment-Success");
        });
      }
    );
  } else if (req.params.plan === "Platinum") {
    Agent.findByIdAndUpdate(req.params.aid, { $inc: { credit: 100 } }).then(
      (doc) => {
        const payment = new Payment();
        payment.aid = req.params.aid;
        payment.plan = req.params.plan;

        payment.save().then((docs) => {
          var transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
              user: "insuranceproject377@gmail.com",
              pass: "elpgvsftguesyvcy",
            },
            secure: true,
            host: "smtp.gmail.com",
          });

          transporter.verify((err, success) => {
            err
              ? console.log(err)
              : console.log(
                  `=== Server is ready to take messages: ${success} ===`
                );
          });

          var mailOptions = {
            from: "Insurnace Email BOT 👥 <insuranceproject377@gmail.com>",
            to: doc.email,
            subject: "Thanks For Purchasing the " + req.params.plan + " Plan",
            html: `<!doctype html>
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                    <!-- NAME: SELL PRODUCTS -->
                    <!--[if gte mso 15]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>*|MC:SUBJECT|*</title>
                    
                <style type="text/css">
                    p{
                        margin:10px 0;
                        padding:0;
                    }
                    table{
                        border-collapse:collapse;
                    }
                    h1,h2,h3,h4,h5,h6{
                        display:block;
                        margin:0;
                        padding:0;
                    }
                    img,a img{
                        border:0;
                        height:auto;
                        outline:none;
                        text-decoration:none;
                    }
                    body,#bodyTable,#bodyCell{
                        height:100%;
                        margin:0;
                        padding:0;
                        width:100%;
                    }
                    .mcnPreviewText{
                        display:none !important;
                    }
                    #outlook a{
                        padding:0;
                    }
                    img{
                        -ms-interpolation-mode:bicubic;
                    }
                    table{
                        mso-table-lspace:0pt;
                        mso-table-rspace:0pt;
                    }
                    .ReadMsgBody{
                        width:100%;
                    }
                    .ExternalClass{
                        width:100%;
                    }
                    p,a,li,td,blockquote{
                        mso-line-height-rule:exactly;
                    }
                    a[href^=tel],a[href^=sms]{
                        color:inherit;
                        cursor:default;
                        text-decoration:none;
                    }
                    p,a,li,td,body,table,blockquote{
                        -ms-text-size-adjust:100%;
                        -webkit-text-size-adjust:100%;
                    }
                    .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
                        line-height:100%;
                    }
                    a[x-apple-data-detectors]{
                        color:inherit !important;
                        text-decoration:none !important;
                        font-size:inherit !important;
                        font-family:inherit !important;
                        font-weight:inherit !important;
                        line-height:inherit !important;
                    }
                    .templateContainer{
                        max-width:600px !important;
                    }
                    a.mcnButton{
                        display:block;
                    }
                    .mcnImage,.mcnRetinaImage{
                        vertical-align:bottom;
                    }
                    .mcnTextContent{
                        word-break:break-word;
                    }
                    .mcnTextContent img{
                        height:auto !important;
                    }
                    .mcnDividerBlock{
                        table-layout:fixed !important;
                    }
                /*
                @tab Page
                @section Heading 1
                @style heading 1
                */
                    h1{
                        /*@editable*/color:#222222;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:40px;
                        /*@editable*/font-style:normal;
                        /*@editable*/font-weight:bold;
                        /*@editable*/line-height:150%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:center;
                    }
                /*
                @tab Page
                @section Heading 2
                @style heading 2
                */
                    h2{
                        /*@editable*/color:#222222;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:34px;
                        /*@editable*/font-style:normal;
                        /*@editable*/font-weight:bold;
                        /*@editable*/line-height:150%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Page
                @section Heading 3
                @style heading 3
                */
                    h3{
                        /*@editable*/color:#444444;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:22px;
                        /*@editable*/font-style:normal;
                        /*@editable*/font-weight:bold;
                        /*@editable*/line-height:150%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Page
                @section Heading 4
                @style heading 4
                */
                    h4{
                        /*@editable*/color:#949494;
                        /*@editable*/font-family:Georgia;
                        /*@editable*/font-size:20px;
                        /*@editable*/font-style:italic;
                        /*@editable*/font-weight:normal;
                        /*@editable*/line-height:125%;
                        /*@editable*/letter-spacing:normal;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Header
                @section Header Container Style
                */
                    #templateHeader{
                        /*@editable*/background-color:#8e77ff;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:45px;
                        /*@editable*/padding-bottom:45px;
                    }
                /*
                @tab Header
                @section Header Interior Style
                */
                    .headerContainer{
                        /*@editable*/background-color:transparent;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:0;
                        /*@editable*/padding-bottom:0;
                    }
                /*
                @tab Header
                @section Header Text
                */
                    .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                        /*@editable*/color:#757575;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:16px;
                        /*@editable*/line-height:150%;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Header
                @section Header Link
                */
                    .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
                        /*@editable*/color:#007C89;
                        /*@editable*/font-weight:normal;
                        /*@editable*/text-decoration:underline;
                    }
                /*
                @tab Body
                @section Body Container Style
                */
                    #templateBody{
                        /*@editable*/background-color:#FFFFFF;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:36px;
                        /*@editable*/padding-bottom:45px;
                    }
                /*
                @tab Body
                @section Body Interior Style
                */
                    .bodyContainer{
                        /*@editable*/background-color:transparent;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:0;
                        /*@editable*/padding-bottom:0;
                    }
                /*
                @tab Body
                @section Body Text
                */
                    .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                        /*@editable*/color:#757575;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:16px;
                        /*@editable*/line-height:150%;
                        /*@editable*/text-align:left;
                    }
                /*
                @tab Body
                @section Body Link
                */
                    .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
                        /*@editable*/color:#007C89;
                        /*@editable*/font-weight:normal;
                        /*@editable*/text-decoration:underline;
                    }
                /*
                @tab Footer
                @section Footer Style
                */
                    #templateFooter{
                        /*@editable*/background-color:#333333;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:45px;
                        /*@editable*/padding-bottom:63px;
                    }
                /*
                @tab Footer
                @section Footer Interior Style
                */
                    .footerContainer{
                        /*@editable*/background-color:transparent;
                        /*@editable*/background-image:none;
                        /*@editable*/background-repeat:no-repeat;
                        /*@editable*/background-position:center;
                        /*@editable*/background-size:cover;
                        /*@editable*/border-top:0;
                        /*@editable*/border-bottom:0;
                        /*@editable*/padding-top:0;
                        /*@editable*/padding-bottom:0;
                    }
                /*
                @tab Footer
                @section Footer Text
                */
                    .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                        /*@editable*/color:#FFFFFF;
                        /*@editable*/font-family:Helvetica;
                        /*@editable*/font-size:12px;
                        /*@editable*/line-height:150%;
                        /*@editable*/text-align:center;
                    }
                /*
                @tab Footer
                @section Footer Link
                */
                    .footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
                        /*@editable*/color:#FFFFFF;
                        /*@editable*/font-weight:normal;
                        /*@editable*/text-decoration:underline;
                    }
                @media only screen and (min-width:768px){
                    .templateContainer{
                        width:600px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    body,table,td,p,a,li,blockquote{
                        -webkit-text-size-adjust:none !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    body{
                        width:100% !important;
                        min-width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnRetinaImage{
                        max-width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImage{
                        width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
                        max-width:100% !important;
                        width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnBoxedTextContentContainer{
                        min-width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageGroupContent{
                        padding:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                        padding-top:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
                        padding-top:18px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageCardBottomImageContent{
                        padding-bottom:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageGroupBlockInner{
                        padding-top:0 !important;
                        padding-bottom:0 !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageGroupBlockOuter{
                        padding-top:9px !important;
                        padding-bottom:9px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnTextContent,.mcnBoxedTextContentColumn{
                        padding-right:18px !important;
                        padding-left:18px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                        padding-right:18px !important;
                        padding-bottom:0 !important;
                        padding-left:18px !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                    .mcpreview-image-uploader{
                        display:none !important;
                        width:100% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 1
                @tip Make the first-level headings larger in size for better readability on small screens.
                */
                    h1{
                        /*@editable*/font-size:30px !important;
                        /*@editable*/line-height:125% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 2
                @tip Make the second-level headings larger in size for better readability on small screens.
                */
                    h2{
                        /*@editable*/font-size:26px !important;
                        /*@editable*/line-height:125% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 3
                @tip Make the third-level headings larger in size for better readability on small screens.
                */
                    h3{
                        /*@editable*/font-size:20px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Heading 4
                @tip Make the fourth-level headings larger in size for better readability on small screens.
                */
                    h4{
                        /*@editable*/font-size:18px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Boxed Text
                @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                */
                    .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                        /*@editable*/font-size:14px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Header Text
                @tip Make the header text larger in size for better readability on small screens.
                */
                    .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
                        /*@editable*/font-size:16px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Body Text
                @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
                */
                    .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
                        /*@editable*/font-size:16px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }	@media only screen and (max-width: 480px){
                /*
                @tab Mobile Styles
                @section Footer Text
                @tip Make the footer content text larger in size for better readability on small screens.
                */
                    .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
                        /*@editable*/font-size:14px !important;
                        /*@editable*/line-height:150% !important;
                    }
            
            }</style></head>
                <body>
                    <center>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                            <tr>
                                <td align="center" valign="top" id="bodyCell">
                                    <!-- BEGIN TEMPLATE // -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="center" valign="top" id="templateHeader" data-template-container style="
                                            background-color: #8e77ff;
                                            text-align:center; ">
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                <![endif]-->
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                    <tr>
                                                        <td valign="top" class="headerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                <tbody class="mcnImageBlockOuter">
                        <tr>
                            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                    <tbody><tr>
                                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                            
                                                
                                                    <img align="center" alt="" src="*|BRAND:LOGO|*" width="196" style="max-width: 196px; padding-bottom: 0px; vertical-align: bottom; display: inline !important; border: 1px solid; border-radius: 1%;" class="mcnImage">
                                                
                                            
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->
                            
                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">
                                    
                                        <h1>Thanks for Buying our ${req.params.plan} Plan.</h1>
            
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--[if mso]>
                            </td>
                            <![endif]-->
                            
                            <!--[if mso]>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top" id="templateBody" data-template-container>
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                <![endif]-->
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                    <tr>
                                                        <td valign="top" class="bodyContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width:100%;">
                <tbody class="mcnImageBlockOuter">
                        <tr>
                            <td valign="top" style="padding:9px" class="mcnImageBlockInner">
                                <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width:100%;">
                                    <tbody><tr>
                                        <td class="mcnImageContent" valign="top" style="padding-right: 9px; padding-left: 9px; padding-top: 0; padding-bottom: 0; text-align:center;">
                                            
                                                
                                                    <img align="center" alt="" src="https://mcusercontent.com/8a175fbc56041c6920bb9fff5/images/e4854abd-a11a-cd91-14ec-66596769421e.png" width="NaN" style="max-width:328px; padding-bottom: 0; display: inline !important; vertical-align: bottom;" class="mcnImage">
                                                
                                            
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->
                            
                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;text-align:center">
                                    
                                        <h3>Feature of the Selected ${req.params.plan} Plan</h3>
            
            <ul>
                <li>Includes 20 Credits</li>
                <li>Can Purchase More Credits Anytime</li>
                <li>Credits Last 3 years</li>
            </ul>
            
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--[if mso]>
                            </td>
                            <![endif]-->
                            
                            <!--[if mso]>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                <tbody class="mcnDividerBlockOuter">
                    <tr>
                        <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                            <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;">
                                <tbody><tr>
                                    <td>
                                        <span></span>
                                    </td>
                                </tr>
                            </tbody></table>
            <!--            
                            <td class="mcnDividerBlockInner" style="padding: 18px;">
                            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
            -->
                        </td>
                    </tr>
                </tbody>
            </table></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" valign="top" id="templateFooter" data-template-container style="background-color: #333333; text-align: center">
                                                <!--[if (gte mso 9)|(IE)]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                                <tr>
                                                <td align="center" valign="top" width="600" style="width:600px;">
                                                <![endif]-->
                                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                                                    <tr>
                                                        <td valign="top" class="footerContainer"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width:100%;">
                <tbody class="mcnFollowBlockOuter">
                    <tr>
                        <td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width:100%;">
                <tbody><tr>
                    <td align="center" style="padding-left:9px;padding-right:9px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnFollowContent">
                            <tbody><tr>
                                <td align="center" valign="top" style="padding-top:9px; padding-right:9px; padding-left:9px;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0">
                                        <tbody><tr>
                                            <td align="center" valign="top">
                                                <!--[if mso]>
                                                <table align="center" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://www.facebook.com" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png" alt="Facebook" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://www.twitter.com/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-twitter-48.png" alt="Twitter" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:10px; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://www.instagram.com/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png" alt="Link" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                    <!--[if mso]>
                                                    <td align="center" valign="top">
                                                    <![endif]-->
                                                    
                                                    
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="display:inline;">
                                                            <tbody><tr>
                                                                <td valign="top" style="padding-right:0; padding-bottom:9px;" class="mcnFollowContentItemContainer">
                                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem">
                                                                        <tbody><tr>
                                                                            <td align="left" valign="middle" style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="">
                                                                                    <tbody><tr>
                                                                                        
                                                                                            <td align="center" valign="middle" width="24" class="mcnFollowIconContent">
                                                                                                <a href="http://mailchimp.com" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-link-48.png" alt="Website" style="display:block;" height="24" width="24" class=""></a>
                                                                                            </td>
                                                                                        
                                                                                        
                                                                                    </tr>
                                                                                </tbody></table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody></table>
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->
                                                
                                                <!--[if mso]>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                    </tbody></table>
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
            </tbody></table>
            
                        </td>
                    </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;">
                <tbody class="mcnDividerBlockOuter">
                    <tr>
                        <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                            <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-top: 2px solid #505050;">
                                <tbody><tr>
                                    <td>
                                        <span></span>
                                    </td>
                                </tr>
                            </tbody></table>
            <!--            
                            <td class="mcnDividerBlockInner" style="padding: 18px;">
                            <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
            -->
                        </td>
                    </tr>
                </tbody>
            </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;">
                <tbody class="mcnTextBlockOuter">
                    <tr>
                        <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            <tr>
                            <![endif]-->
                            
                            <!--[if mso]>
                            <td valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%; min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody><tr>
                                    
                                    <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #FF0000;">
                                    
                                        <em>Copyright © *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em><br>
            &nbsp;
                                    </td>
                                </tr>
                            </tbody></table>
                            <!--[if mso]>
                            </td>
                            <![endif]-->
                            
                            <!--[if mso]>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </tbody>
            </table></td>
                                                    </tr>
                                                </table>
                                                <!--[if (gte mso 9)|(IE)]>
                                                </td>
                                                </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- // END TEMPLATE -->
                                </td>
                            </tr>
                        </table>
                    </center>
                <script type="text/javascript"  src="/f_0wn9/jS/9E/TdpU/_6BYJjrE63ufM/3mYJVXhcaaD5/E0B3bzkhJAE/BDV/gdiBVZxs"></script></body>
            </html>
             `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Error" + error);
            } else {
              console.log("Mail Sent" + info);
            }
          });
          res.redirect("https://insurance-agents.vercel.app/Payment-Success");
        });
      }
    );
  }
});

router.get("/agent/get_txn/:id", (req, res) => {
  Payment.find({ aid: req.params.id }).then((doc) => {
    res.json(doc);
  });
});

router.get("/agent/get_headers/:aid", (req, res) => {
  const id = mongoose.mongo.ObjectId(req.params.aid);

  let data = {
    nop: "",
    tca: "",
    tcd: "",
    credits: "",
  };

  Promise.all([
    Payment.find({ aid: id }).count().exec(),
    Agent.find({ _id: id }).exec(),
    contactAgent.count().exec(),
    contactAgent.find({ aid: id }).count().exec(),
  ]).then((counts) => {
    (data.nop = counts[0]),
      (data.tca = counts[2]),
      (data.tcd = counts[3]),
      (data.credits = counts[1][0].credit),
      res.json(data);
  });
});

module.exports = router;
