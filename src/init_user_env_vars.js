import * as fs from "fs";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";

async function askQuestion(rl, question) {
  try {
    const answer = await rl.question(question);
    return answer.trim();
  } catch (err) {
    console.error("Error during question:", err);
    return null;
  }
}

async function main() {
  const rl = readline.createInterface({ input, output });
  try {
    const email = await askQuestion(rl, "Enter your Gmail email: ");
    if (!email) return;

    const appPassword = await askQuestion(
      rl,
      "Enter your Google App Password: "
    );
    if (!appPassword) return;

    const smtpHost = await askQuestion(
      rl,
      "Enter SMTP Host (e.g., smtp.gmail.com): "
    );
    if (!smtpHost) return;

    const smtpPort = await askQuestion(rl, "Enter SMTP Port (e.g., 465): ");
    if (!smtpPort) return;

    const content = `MY_EMAIL="${email}"\nPASS="${appPassword}"\nSMTP_HOST="${smtpHost}"\nSMTP_PORT="${smtpPort}"\n`; // Add newline for better formatting

    fs.writeFileSync(".env", content, { mode: 0o600 });
    console.log("Environment variables saved successfully!");
  } catch (error) {
    console.error("Error saving environment variables:", error);
  } finally {
    rl.close();
  }
}

main();
