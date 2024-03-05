import transporter from "../frameworks/services/mailService";
const sentMail = async (
  email: string,
  emailSubject: string,
  content: string
) => {
  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: '"Dine Delight 🍽️" <dinedelight000@gmail.com>',
      to: email,
      subject: emailSubject,
      html: content,
    });

    console.log(`Email sent to ${email} : `, info.messageId);
  } catch (error) {
    console.log("Error in sending mail:", error);
  }
};
export default sentMail;
