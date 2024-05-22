import { User } from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

export const sendVerificationMail = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  sendEmailVerification(user);
};

const sendEmailVerification = (user) => {
  return sendEmail({
    to: user.email,
    subject: "Welcomne to Todo.io",
    html: `<h3>Hi ${user.username}</h3>,
<h4>welcome to Y-App 🎉!!!</h4>
<p>Please enter the below six-digit-code verify your account to be able to login.
${user.sixDigitCode}</p>
<p>See you on the other side :)</p>
<p>- Stefan und Izel from Y-App</p>2
`,
  });
};
