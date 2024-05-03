import configKeys from "../config";

export const otpEmail = (otp: string, name: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 70%;
        margin: 50px auto;
        padding: 20px 0;
        border-bottom: 1px solid #eee;
      }
      .logo {
        font-size: 1.4em;
        color: #00466a;
        text-decoration: none;
        font-weight: 600;
      }
      .otp-container {
        background: #00466a;
        color: #fff;
        margin: 20px auto;
        width: max-content;
        padding: 10px;
        border-radius: 4px;
      }
      .footer {
        float: right;
        padding: 8px 0;
        color: #aaa;
        font-size: 0.8em;
        line-height: 1;
        font-weight: 300;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div>
        <a href="#" class="logo">Dine Delight</a>
      </div>
      <p>Hi,${name}</p>
      <p>Welcome to Dine Delight. Use the following OTP to complete your Sign Up procedures. OTP is valid for 2 minutes</p>
      <div class="otp-container">${otp}</div>
      <p>Regards,<br />Dine Delight</p>
      <div class="footer">
        <p>Dine Delight Inc</p>
        <p>Kochi, Ernakulam, Kerala</p>
        <p>India</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

export const forgotPasswordEmail = (name: string, verificationCode: string) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
              <td>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                      <tr>
                          <td align="center" bgcolor="#007bff" style="padding: 40px 0;">
                              <h1 style="color: #ffffff;">Password Reset</h1>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#ffffff" style="padding: 40px 30px;">
                              <p>Dear ${name},</p>
                              <p>We have received a request to reset your password. To reset your password, click the button below:</p>
                              <p style="text-align: center;">
                                  <a href="${configKeys.CLIENT_PORT}/user/auth/reset_password/${verificationCode}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
                              </p>
                              <p>If you didn't request a password reset, you can ignore this email. Your password will remain unchanged.</p>
                              <p>Thank you for using our service!</p>
                          </td>
                      </tr>
                      <tr>
                          <td bgcolor="#f4f4f4" style="text-align: center; padding: 20px 0;">
                              <p>&copy; 2023 Craftopia</p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>`;
};
