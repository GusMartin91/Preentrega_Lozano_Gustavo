import { config } from "./config/envs.config.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
});

export const sendTicketEmail = async (purchaser, ticketData) => {
    try {
        const mailOptions = {
            from: config.EMAIL_USER,
            to: purchaser,
            subject: `Purchase Ticket #${ticketData.code}`,
            html: `
                <h1>Thank you for your purchase</h1>
                <p>Here are the details of your ticket:</p>
                <ul>
                    <li><strong>Ticket Number:</strong> ${ticketData.code}</li>
                    <li><strong>Date:</strong> ${ticketData.purchase_datetime}</li>
                    <li><strong>Email:</strong> ${purchaser}</li>
                    <li><strong>Total Amount:</strong> $${ticketData.amount}</li>
                </ul>
                <p>Thank you for choosing our service!</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
    } catch (error) {
        console.error('Error sending the ticket:', error);
    }
};