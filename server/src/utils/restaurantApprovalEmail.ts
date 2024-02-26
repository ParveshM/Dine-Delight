export default (name: string) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Add your custom styles here */
        /* Example styles */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    
        h1, h2 {
          color: #333;
          margin-bottom: 20px;
        }
    
        p {
          color: #666;
          margin-bottom: 10px;
        }
    
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
    
        .button:hover {
          background-color: #0056b3;
        }
    
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #888;
        }
    
        .footer a {
          color: #007bff;
          text-decoration: none;
        }
    
        @media screen and (max-width: 600px) {
          .container {
            padding: 10px;
          }
          .button {
            display: block;
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
    
      <div class="container">
        <h1>Welcome to Dine Delight!</h1>
        <p>Dear ${name},</p>
        <p>We're excited to inform you that your restaurant account has been approved by our admin team. You're now part of the Dine Delight family, where diners can discover and reserve tables with ease.</p>
        <p>You can now login to your account and start accepting reservations from eager diners.</p>
        <p>Simply click the button below to confirm your email address and get started:</p>
        <a href="http://localhost:3000/login" class="button" target="_blank">Login to Dine Delight</a>
        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        <div class="footer">
          <p>Best regards,<br>Dine Delight Team</p>
          <p><a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a></p>
        </div>
      </div>    
    </body>
    </html>`;
};

export const restaurantRejectionMail = (name: string) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Add your custom styles here */
        /* Example styles */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    
        h1, h2 {
          color: #333;
          margin-bottom: 20px;
        }
    
        p {
          color: #666;
          margin-bottom: 10px;
        }
    
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #dc3545; /* Rejection color */
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
    
        .button:hover {
          background-color: #c82333; /* Darker shade of rejection color on hover */
        }
    
        .footer {
          margin-top: 30px;
          font-size: 14px;
          color: #888;
        }
    
        .footer a {
          color: #007bff;
          text-decoration: none;
        }
    
        @media screen and (max-width: 600px) {
          .container {
            padding: 10px;
          }
          .button {
            display: block;
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
    
      <div class="container">
        <h1>Welcome to Dine Delight!</h1>
        <p>Dear ${name},</p>
        <p>We regret to inform you that your restaurant account has been rejected by our admin team.</p>
        <p>If you have any questions or need further clarification, please feel free to contact us.</p>
        <div class="footer">
          <p>Best regards,<br>Dine Delight Team</p>
          <p><a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a></p>
        </div>
      </div>    
    </body>
    </html>`;
};
