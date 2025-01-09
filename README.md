# wdaily


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="./wdaily-logo.png" alt="Logo" width="80" height="80">
  </a>

  <p align="center">
    <br />
    <a href="#getting-started"><strong>Getting Started »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">Features</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Installation</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Usage</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#initial-setup">Initial Setup</a></li>
        <li><a href="#getting-a-google-app-password">Getting a Google App Password</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
      <li><a href="#usage">Usage</a></li>
        <ul>
          <li><a href="#creating-a-task">Creating a Task</a></li>
          <li><a href="#completing-a-task">Completing a Task</a></li>
          <li><a href="#getting-help">Getting Help</a></li>
          <li><a href="#exiting-the-program">Exiting the Program</a></li>
          <li><a href="#cli-mode">CLI Mode</a></li>
        </ul>
    </li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li><a href="#email-notifications">Email Notifications</a></li>
      <li><a href="#troubleshooting">Troubleshooting</a></li>
        <ul>
          <li><a href="#environment-variables-not-found">Environment Variables Not Found</a></li>
          <li><a href="#email-sending-fails">Email Sending Fails</a></li>
          <li><a href="#permission-denied-when-running-scripts">Permission Denied When Running Script</a></li>
          <li><a href="#after-initial-setup-script">After Initial Setup Script</a></li>
        </ul>
      <li><a href="#gmail-smtp-setup-help">Gmail SMTP Setup Help</a></li>
    </li>
    <li><a href="#development">Development</a></li>
      <ul>
        <li><a href="#project-structure">Project Structure</a></li>
      </ul>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project



<!-- GETTING STARTED -->
## Getting Started


A simple command-line task management tool that helps you track daily tasks and sends email notifications when tasks are completed.


### Prerequisites

Before using wdaily, ensure you have:

- Node.js installed (version 14 or higher)
- A Gmail account
- A Google App Password for your Gmail account (required for SMTP)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/zakmoCA/wdaily.git
cd wdaily
```

2. Install dependencies:

```bash
npm install
```

3. Run the setup script:

```bash
chmod +x user_script.sh
./user_script.sh
```

*`user_script.sh` will call `src/init_user_env_vars.js` which will allow you to set env variables to .env file via command-line input, alternatively feel free to hardcode them in a `.env` file with your IDE. 

### Initial Setup

When you first run the setup script, you'll be prompted to configure your environment variables if they're not already set. The setup process looks like this:

```bash
Environment variables not found. Setting up...? (Y/y)
y
Enter your Gmail email: your.email@gmail.com
Enter your Google App Password: your-app-password
Enter SMTP Host (e.g., smtp.gmail.com): smtp.gmail.com
Enter SMTP Port (e.g., 465): 465
Environment variables saved successfully!
```

### Getting a Google App Password

To use Gmail SMTP, you'll need to create an App Password:

1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. Scroll to the bottom and select "App passwords"
4. Create a new app password for "Mail"
5. Use the generated 16-character password during wdaily setup



<!-- FEATURES EXAMPLES -->
## Features

- Create and track tasks from the command line
- Mark tasks as completed
- Receive email notifications when tasks are completed
- Interactive command-line interface
- Gmail SMTP integration for notifications


<!-- USAGE EXAMPLES -->
## Usage

wdaily can be used in both interactive and command-line modes.

### Interactive Mode

To start the interactive mode (after authorising file permissions):

```bash
./user_script.sh
```

You'll see:

```
welcome to wdaily, type --help for info
enter a command:
```

### Available Commands

#### Creating a Task

```bash
--task <taskname>
```

Example:

```
enter a command: --task "Complete documentation"
the task "Complete documentation" created
```

#### Completing a Task

```bash
--done <taskname>
```

Example:

```
enter a command: --done "Complete documentation"
task "Complete documentation" marked complete
email sent: <message-id>
```

When you mark a task as complete:

1. The task status is updated
2. An email notification is sent to your configured Gmail address
3. The message includes the task name and a completion message

#### Getting Help

```bash
--help
```

Output:

```
Available commands:
--task <taskname>: create a new task
--done <taskname>: mark a task as completed
--help: display this help message
--exit: exit program
```

#### Exiting the Program

```bash
--exit
```

### CLI Mode

You can also use wdaily directly from the command line without entering interactive mode (after authorising file permissions):

```bash
./user_script.sh --task "New task"
./user_script.sh --done "New task"
```

## Environment Variables

The application uses the following environment variables:

```env
MY_EMAIL=your.email@gmail.com
PASS=your-google-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
```

These can be automatically set up via CLI during the initial setup process (after you've grabbed google credentials!), but you can also configure them manually by creating a `.env` file in the root directory.

## Email Notifications

When a task is marked as complete, an email notification is sent using the configured Gmail SMTP settings. The email includes:

- Subject: "⭐️ [Task Name] completed 🚀"
- Body: "gas pedal 🚀"

The notification system is implemented using the `nodemailer` package at `src/app.js`:

```js
async function sendEmail(task) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.PASS,
    },
  })

  const mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: `⭐️ ${task.name} completed 🚀`,
    text: `gas pedal 🚀`,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("email sent: " + info.messageId)
  } catch (error) {
    console.error("error sending email: ", error)
  }
}
```

Feel free to to customise text/emojis in ```Subject: "⭐️ [Task Name] completed 🚀" and Body: "gas pedal 🚀"``` for the email content inside at `src/app.js` inside the `sendEmail` method above.

Gas pedal and 🚀 are simply my choice exhortation and emoji after a win, you can use yours 😆

## Troubleshooting

### Common Issues

#### Environment Variables Not Found

   - Ensure you've run through the setup process
   - *`user_script.sh` will call `src/init_user_env_vars.js` which will allow you to set env variables to `.env` file via command-line input, alternatively feel free to hardcode them in a `.env` file using your IDE. 
   - Check that the `.env` file exists in the root directory
   - Verify the environment variables are correctly set


#### Email Sending Fails

   - Verify your Google App Password is correct
   - Ensure you're using the correct SMTP settings
   - Check your internet connection


#### Permission Denied When Running Scripts

  - Ensure the scripts are executable:

```bash
   chmod +x user_script.sh
```


#### After Initial Setup Script
  - After the initial setup, you won't need to run `user_script.sh` every time you want to use wdaily. The script copies the app.js file to ~/bin/wdaily for easier access.
   - The bin directory in your home directory (~) is a standard location for storing user-specific executable files and the setup script will attempt to put wdaily there
   - If this directory doesn't already exist, `user_scrpt.sh` will create it and authorise permissions with the lines:
   ```bash
   mkdir -p ~/bin
   cp src/app.js ~/bin/wdaily
   chmod +x ~/bin/wdaily
   ```



### Gmail SMTP Setup Help

For detailed information about setting up Gmail SMTP, visit:
https://www.gmass.co/blog/gmail-smtp/#howto
