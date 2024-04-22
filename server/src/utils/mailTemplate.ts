import configKeys from "../config";

export default {
  generateMailBody: function (restaurantId: string, userId: string) {
    return `<!DOCTYPE html>

        <html
          lang="en"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:v="urn:schemas-microsoft-com:vml"
        >
          <head>
            <title></title>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <!--[if mso
              ]><xml
                ><o:OfficeDocumentSettings
                  ><o:PixelsPerInch>96</o:PixelsPerInch
                  ><o:AllowPNG /></o:OfficeDocumentSettings></xml
            ><![endif]-->
            <!--[if !mso]><!-->
            <link
              href="https://fonts.googleapis.com/css?family=Montserrat"
              rel="stylesheet"
              type="text/css"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Chivo"
              rel="stylesheet"
              type="text/css"
            />
            <!--<![endif]-->
            <style>
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
                .desktop_hide table.icons-inner,
                .social_block.desktop_hide .social-table {
                  display: inline-block !important;
                }
        
                .icons-inner {
                  text-align: center;
                }
        
                .icons-inner td {
                  margin: 0 auto;
                }
        
                .mobile_hide {
                  display: none;
                }
        
                .row-content {
                  width: 100% !important;
                }
        
                .stack .column {
                  width: 100%;
                  display: block;
                }
        
                .mobile_hide {
                  min-height: 0;
                  max-height: 0;
                  max-width: 0;
                  overflow: hidden;
                  font-size: 0px;
                }
        
                .desktop_hide,
                .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
                }
              }
            </style>
          </head>
          <body
            style="
              margin: 0;
              background-color: #ffffff;
              padding: 0;
              -webkit-text-size-adjust: none;
              text-size-adjust: none;
            "
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="nl-container"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #ffffff;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-1"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-image: url('images/BG_2.png');
                        background-position: center top;
                        background-repeat: repeat;
                      "
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                background-color: #ffffff;
                                color: #000000;
                                width: 680px;
                                margin: 0 auto;
                              "
                              width="680"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <div
                                      class="spacer_block block-1"
                                      style="
                                        height: 70px;
                                        line-height: 70px;
                                        font-size: 1px;
                                      "
                                    >
                                       
                                    </div>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="heading_block block-2"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            padding-left: 20px;
                                            padding-right: 20px;
                                            text-align: center;
                                            width: 100%;
                                          "
                                        >
                                          <h1
                                            style="
                                              margin: 0;
                                              color: #0d1325;
                                              direction: ltr;
                                              font-family: 'Chivo', Arial, Helvetica,
                                                sans-serif;
                                              font-size: 35px;
                                              font-weight: 400;
                                              letter-spacing: 2px;
                                              line-height: 120%;
                                              text-align: center;
                                              margin-top: 0;
                                              margin-bottom: 0;
                                              mso-line-height-alt: 42px;
                                            "
                                          >
                                            TRY OUR SPECIALS
                                          </h1>
                                        </td>
                                      </tr>
                                    </table>
                                    <div
                                      class="spacer_block block-3"
                                      style="
                                        height: 35px;
                                        line-height: 35px;
                                        font-size: 1px;
                                      "
                                    >
                                       
                                    </div>
                                    <div
                                      class="spacer_block block-4"
                                      style="
                                        height: 20px;
                                        line-height: 20px;
                                        font-size: 1px;
                                      "
                                    >
                                       
                                    </div>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="heading_block block-5"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            padding-left: 20px;
                                            padding-right: 20px;
                                            text-align: center;
                                            width: 100%;
                                          "
                                        >
                                          <h2
                                            style="
                                              margin: 0;
                                              color: #5b7b7c;
                                              direction: ltr;
                                              font-family: Montserrat, Trebuchet MS,
                                                Lucida Grande, Lucida Sans Unicode,
                                                Lucida Sans, Tahoma, sans-serif;
                                              font-size: 24px;
                                              font-weight: 400;
                                              letter-spacing: 2px;
                                              line-height: 120%;
                                              text-align: left;
                                              margin-top: 0;
                                              margin-bottom: 0;
                                              mso-line-height-alt: 28.799999999999997px;
                                            "
                                          >
                                            Shepard's Pie
                                          </h2>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="paragraph_block block-6"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            padding-left: 20px;
                                            padding-right: 20px;
                                          "
                                        >
                                          <div
                                            style="
                                              color: #5b7b7c;
                                              font-family: Montserrat, Trebuchet MS,
                                                Lucida Grande, Lucida Sans Unicode,
                                                Lucida Sans, Tahoma, sans-serif;
                                              font-size: 16px;
                                              line-height: 150%;
                                              text-align: left;
                                              mso-line-height-alt: 24px;
                                            "
                                          >
                                            <p
                                              style="margin: 0; word-break: break-word"
                                            >
                                               
                                            </p>
                                            <p
                                              style="margin: 0; word-break: break-word"
                                            >
                                              <span
                                                >Lorem ipsum dolor sit amet,
                                                consectetuer adipiscing elit, sed diam
                                                nonummy nibh euismod tincidunt ut
                                                laoreet dolore magna aliquam erat
                                                volutpat. </span
                                              >
                                            </p>
                                            <p
                                              style="margin: 0; word-break: break-word"
                                            >
                                               
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-2"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                background-color: #ffffff;
                                color: #000000;
                                width: 680px;
                                margin: 0 auto;
                              "
                              width="680"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <div
                                      class="spacer_block block-1"
                                      style="
                                        height: 70px;
                                        line-height: 70px;
                                        font-size: 1px;
                                      "
                                    >
                                       
                                    </div>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="heading_block block-2"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            padding-left: 20px;
                                            padding-right: 20px;
                                            text-align: center;
                                            width: 100%;
                                          "
                                        >
                                          <h1
                                            style="
                                              margin: 0;
                                              color: #0d1325;
                                              direction: ltr;
                                              font-family: 'Chivo', Arial, Helvetica,
                                                sans-serif;
                                              font-size: 35px;
                                              font-weight: 400;
                                              letter-spacing: 2px;
                                              line-height: 120%;
                                              text-align: center;
                                              margin-top: 0;
                                              margin-bottom: 0;
                                              mso-line-height-alt: 42px;
                                            "
                                          >
                                            BUY ONE, <br />GET ONE HALF PRICE<br />
                                          </h1>
                                        </td>
                                      </tr>
                                    </table>
                                    <div
                                      class="spacer_block block-3"
                                      style="
                                        height: 25px;
                                        line-height: 25px;
                                        font-size: 1px;
                                      "
                                    >
                                       
                                    </div>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="image_block block-4"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            width: 100%;
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                        >
                                          <div
                                            align="center"
                                            class="alignment"
                                            style="line-height: 10px"
                                          >
                                            <div style="max-width: 136px">
                                              <img
                                                alt="leprechaun"
                                                height="auto"
                                                src="https://res.cloudinary.com/dcoveyjze/image/upload/v1713774887/Restaurant/qovsiok6cukuxuocb6ya.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                  width: 100%;
                                                "
                                                title="leprechaun"
                                                width="136"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <div
                                      class="spacer_block block-5"
                                      style="
                                        height: 25px;
                                        line-height: 25px;
                                        font-size: 1px;
                                      "
                                    >
                                       
                                    </div>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="heading_block block-6"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            padding-left: 20px;
                                            padding-right: 20px;
                                            text-align: center;
                                            width: 100%;
                                          "
                                        >
                                          <h3
                                            style="
                                              margin: 0;
                                              color: #5b7b7c;
                                              direction: ltr;
                                              font-family: Montserrat, Trebuchet MS,
                                                Lucida Grande, Lucida Sans Unicode,
                                                Lucida Sans, Tahoma, sans-serif;
                                              font-size: 20px;
                                              font-weight: 400;
                                              letter-spacing: 2px;
                                              line-height: 180%;
                                              text-align: center;
                                              margin-top: 0;
                                              margin-bottom: 0;
                                              mso-line-height-alt: 36px;
                                            "
                                          >
                                            Offer valid on 17th March, online and in
                                            store
                                          </h3>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="divider_block block-7"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td class="pad">
                                          <div align="center" class="alignment">
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                              "
                                              width="40%"
                                            >
                                              <tr>
                                                <td
                                                  class="divider_inner"
                                                  style="
                                                    font-size: 1px;
                                                    line-height: 1px;
                                                    border-top: 1px solid #5b7b7c;
                                                  "
                                                >
                                                  <span> </span>
                                                </td>
                                              </tr>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-3"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                background-color: #ffffff;
                                color: #000000;
                                width: 680px;
                                margin: 0 auto;
                              "
                              width="680"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <div
                                      class="spacer_block block-1"
                                      style="
                                        height: 25px;
                                        line-height: 25px;
                                        font-size: 1px;
                                      "
                                    >
                                       
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-5"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #000000;
                      "
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                color: #000000;
                                width: 680px;
                                margin: 0 auto;
                              "
                              width="680"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      padding-bottom: 5px;
                                      padding-top: 5px;
                                      vertical-align: top;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="paragraph_block block-1"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            padding-left: 30px;
                                            padding-right: 30px;
                                            padding-top: 5px;
                                          "
                                        >
                                          <div
                                            style="
                                              color: #999999;
                                              font-family: Montserrat, Trebuchet MS,
                                                Lucida Grande, Lucida Sans Unicode,
                                                Lucida Sans, Tahoma, sans-serif;
                                              font-size: 14px;
                                              line-height: 180%;
                                              text-align: center;
                                              mso-line-height-alt: 25.2px;
                                            "
                                          >
                                            <p
                                              style="margin: 0; word-break: break-word"
                                            >
                                               
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="paragraph_block block-2"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            padding-bottom: 30px;
                                            padding-left: 30px;
                                            padding-right: 30px;
                                          "
                                        >
                                          <div
                                            style="
                                              color: #999999;
                                              font-family: Montserrat, Trebuchet MS,
                                                Lucida Grande, Lucida Sans Unicode,
                                                Lucida Sans, Tahoma, sans-serif;
                                              font-size: 12px;
                                              line-height: 180%;
                                              text-align: center;
                                              mso-line-height-alt: 21.6px;
                                            "
                                          >
                                            <p
                                              style="margin: 0; word-break: break-word"
                                            >
                                              <span
                                                ><span
                                                  >You can
                                                  <a
                                                    href="#"
                                                    rel="noopener"
                                                    style="
                                                      text-decoration: underline;
                                                      color: #5b7b7c;
                                                    "
                                                    target="_blank"
                                                    >update your preferences</a
                                                  >
                                                  or
                                                  <a
                                                    href="${configKeys.CLIENT_PORT}/unsubscribe/${restaurantId}/${userId}"
                                                    rel="noopener"
                                                    style="
                                                      text-decoration: underline;
                                                      color: #5b7b7c;
                                                    "
                                                    target="_blank"
                                                    >unsubscribe</a
                                                  >
                                                  from this list.</span
                                                ></span
                                              >
                                            </p>
                                            <p
                                              style="margin: 0; word-break: break-word"
                                            >
                                              <span
                                                >© 2024 DineDelight. All Rights
                                                Reserved.</span
                                              >
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-6"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                background-color: #ffffff;
                                background-position: center top;
                                color: #000000;
                                width: 680px;
                                margin: 0 auto;
                              "
                              width="680"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <div
                                      class="spacer_block block-1"
                                      style="
                                        height: 0px;
                                        line-height: 0px;
                                        font-size: 1px;
                                      "
                                    >
                                       
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End -->
          </body>
        </html>
        `;
  },
};
