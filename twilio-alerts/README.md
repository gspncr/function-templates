# Twilio Integrated Alerts

Send SMS alerts from New Relic, Splunk and Cisco AppDynamics with the power of Twilio.

## Pre-requisites

To use these functions you will need a New Relic or Splunk account.

### Getting a Twilio account and creating a Messaging Service:

**Step 1:** Get a Twilio account [Do that here](https://www.twilio.com/try-twilio)

**Step 2:** Setup a messaging service. [Do that in the console here](https://console.twilio.com/us1/develop/sms/services?frameUrl=%2Fconsole%2Fsms%2Fservices%3Fx-target-region%3Dus1)


### Environment variables

This project requires an environment variable to be set. To keep your tokens and secrets secure, make sure to not commit the `.env` file in git. When setting up the project with `twilio serverless:init ...` the Twilio CLI will create a `.gitignore` file that excludes `.env` from the version history.

In your `.env` file, set the following values:

| Variable | Description | Required |
| :------- | :---------- | :------- |
| MSG_SERVICE_SID | Your Messaging Service SID | Yes |

## Create a new project with the template

1. Install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart#install-twilio-cli)
2. Install the [serverless toolkit](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started)

```shell
twilio plugins:install @twilio-labs/plugin-serverless
```
3. Initiate a new project

```
twilio serverless:init example --template={{name}} && cd twilio-integrated-alerts
```

4. Start the server with the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart):

```
twilio serverless:start
```

5. Open the web page at https://localhost:3000/index.html and follow the instructions to configure with New Relic and/or Splunk.

ℹ️ Check the developer console and terminal for any errors, make sure you've set your environment variables.

## Deploying

Deploy your functions and assets with either of the following commands. Note: you must run these commands from inside your project folder. [More details in the docs.](https://www.twilio.com/docs/labs/serverless-toolkit)

With the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart):

```
twilio serverless:deploy
```
