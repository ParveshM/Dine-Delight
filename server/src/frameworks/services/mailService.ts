import nodemailer from "nodemailer";
import configKeys from "../../config";
import mailTemplate from "../../utils/mailTemplate";
import sentMail from "../../utils/sendMail";
import schedule from "node-schedule";
import {
  MenuItemInterface,
  SenderListInterface,
} from "../../types/restaurantInterface";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  pool: true,
  auth: {
    user: configKeys.APP_EMAIL,
    pass: configKeys.APP_PASSWORD,
  },
});

export function sendEmails(
  senderData: SenderListInterface,
  data: MenuItemInterface
) {
  const { email } = senderData;
  const emailbody = mailTemplate.generateMailBody(senderData, data).toString();
  sentMail(email, "Exciting Offer Inside! 🎉", emailbody);
}

export function startEmailSendingJob(
  senderList: SenderListInterface[],
  data: MenuItemInterface
) {
  let message_increment = 0;
  const message_job = schedule.scheduleJob("*/5 * * * * *", function () {
    sendEmails(senderList[message_increment], data);
    if (message_increment < senderList.length) {
      message_increment++;
    }
    if (message_increment >= senderList.length) {
      message_job.cancel();
    }
  });
}

export default transporter;
