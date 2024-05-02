"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEmailSendingJob = exports.sendEmails = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const mailTemplate_1 = __importDefault(require("../../utils/mailTemplate"));
const sendMail_1 = __importDefault(require("../../utils/sendMail"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    pool: true,
    auth: {
        user: config_1.default.APP_EMAIL,
        pass: config_1.default.APP_PASSWORD,
    },
});
function sendEmails(senderData, data) {
    const { email } = senderData;
    const emailbody = mailTemplate_1.default.generateMailBody(senderData, data).toString();
    (0, sendMail_1.default)(email, "Exciting Offer Inside! 🎉", emailbody);
}
exports.sendEmails = sendEmails;
function startEmailSendingJob(senderList, data) {
    let message_increment = 0;
    const message_job = node_schedule_1.default.scheduleJob("*/5 * * * * *", function () {
        sendEmails(senderList[message_increment], data);
        if (message_increment < senderList.length) {
            message_increment++;
        }
        if (message_increment >= senderList.length) {
            message_job.cancel();
        }
    });
}
exports.startEmailSendingJob = startEmailSendingJob;
exports.default = transporter;
