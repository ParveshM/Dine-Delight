import nodemailer from "nodemailer";
import configKeys from "../../config";
import mailTemplate from "../../utils/mailTemplate";
import sentMail from "../../utils/sendMail";
import schedule from "node-schedule";
import { SenderListInterface } from "../../types/restaurantInterface";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  pool: true,
  auth: {
    user: configKeys.APP_EMAIL,
    pass: configKeys.APP_PASSWORD,
  },
});

export function sendEmails(senderData: SenderListInterface) {
  const { email, restaurantId, userId } = senderData;
  const emailbody = mailTemplate
    .generateMailBody(restaurantId, userId)
    .toString();
  sentMail(email, "New food item", emailbody);
}

export function startEmailSendingJob(senderList: SenderListInterface[]) {
  let message_increment = 0;
  const message_job = schedule.scheduleJob("*/5 * * * * *", function () {
    sendEmails(senderList[message_increment]);
    if (message_increment < senderList.length) {
      message_increment++;
    }
    if (message_increment >= senderList.length) {
      message_job.cancel();
    }
  });
}

export default transporter;
