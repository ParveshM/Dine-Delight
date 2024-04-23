import configKeys from "../config";
import {
  MenuItemInterface,
  SenderListInterface,
} from "../types/restaurantInterface";
import { calculateDiscountedPrice } from "./utilityFunctions";

export default {
  generateMailBody: function (
    senderData: SenderListInterface,
    data: MenuItemInterface
  ) {
    const { restaurantId, userId, restaurantName, userName } = senderData;
    const { name, price, discount } = data;
    const discountPrice = calculateDiscountedPrice(price, discount);
    return `<!DOCTYPE html>
    <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!--[if mso]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            <o:AllowPNG />
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Chivo" rel="stylesheet" type="text/css" />
      <!--<![endif]-->
      <style>
        /* Your provided styles */
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
        }
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
        p {
          line-height: inherit;
        }
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0px;
          overflow: hidden;
        }
        .image_block img + div {
          display: none;
        }
        @media (max-width: 700px) {
          /* Your responsive styles */
        }
        /* Additional styles for the email template */
        .header {
          background-color: #f8f9fa; /* Light gray background */
          padding: 20px;
          text-align: center;
        }
        .body {
          padding: 20px;
        }
        .footer {
          background-color: #f8f9fa; /* Light gray background */
          padding: 20px;
          text-align: center;
        }
        .footer-content {
          color: #999999;
          font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;
          font-size: 12px;
          line-height: 180%;
          text-align: center;
          mso-line-height-alt: 21.6px;
        }
        .footer-content a {
          text-decoration: underline;
          color: #5b7b7c;
        }
      </style>
    </head>
    <body>
      <!-- Header -->
        <img src="https://res.cloudinary.com/dcoveyjze/image/upload/v1713774887/Restaurant/qovsiok6cukuxuocb6ya.png" alt="Company Logo" style="max-width: 100px; max-height: 100px; " />
    
      <!-- Body -->
      <div class="body">
        <p>Hi, ${userName} <strong>Get ${discount}% OFF on Our Special Dish!</strong></p>
        <p>Visit us today to enjoy our mouthwatering <span style="color: #5b7b7c; direction: ltr; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 24px; font-weight: 400;">${name}</span> at a special discounted price:</p>
        <ul>
          <li>Original Price: ₹${price}</li>
          <li>Discounted Price: ₹${discountPrice}</li>
          <li>You save: ₹${price - discountPrice}</li>
        </ul>
        <p>Don't miss out on this delicious offer! Come and visit ${restaurantName} today.</p>
        <p>Best regards,<br />Dine Delight</p>
      </div>
    
      <!-- Footer -->
      <table border="0" cellpadding="0" cellspacing="0" class="footer" role="presentation" width="100%">
        <tr>
          <td class="pad" style="padding-bottom: 30px; padding-left: 30px; padding-right: 30px;">
            <div class="footer-content">
              <p>You can <a href="#" rel="noopener">update your preferences</a> or <a href="${
                configKeys.CLIENT_PORT
              }/unsubscribe/${restaurantId}/${userId}" rel="noopener">unsubscribe</a> from this list.</p>
              <p>&copy; 2024 DineDelight. All Rights Reserved.</p>
            </div>
          </td>
        </tr>
      </table>
    </body>
    </html>
    
    `;
  },
};
