# Secure My Future - Alexa Skill

An Alexa skill that provides estate planning tips tailored by age group, sponsored by Amicus Edge.

## Overview

"Secure My Future" is an Alexa skill that helps users get estate planning tips based on their age group:
- 20s: Focuses on naming a healthcare proxy
- 40s: Focuses on updating wills for kids
- 60s+: Focuses on long-term care planning

The skill also allows users to schedule a free consultation with Amicus Edge for more detailed estate planning strategies.

## Skill Flow

1. User invokes the skill: "Alexa, open Secure My Future"
2. Alexa asks for the user's age group
3. User responds with their age group
4. Alexa provides age-appropriate estate planning tips that start with "AmicusEdge.com suggests you..."
5. Alexa asks if the user would like to schedule a free consultation
6. User can respond yes or no
   - If yes: Alexa provides information on how to schedule a consultation
   - If no: Alexa ends the session with a thank you message

## Directory Structure

```
secure-my-future-skill/
├── lambda/
│   ├── custom/
│   │   ├── index.js             # Main Lambda function code
│   │   ├── package.json         # Node.js package configuration
│   │   └── node_modules/        # Dependencies
│   └── secure-my-future-lambda.zip  # Deployment package
├── models/
│   └── en-US.json               # Interaction model
├── skill.json                   # Skill manifest
├── test-script.js               # Test script for the skill
└── README.md                    # This file
```

## Deployment Instructions

### Prerequisites

- Amazon Developer Account
- AWS Account
- ASK CLI (Alexa Skills Kit Command Line Interface)

### Steps to Deploy

1. **Set up ASK CLI**:
   ```
   npm install -g ask-cli
   ask init
   ```

2. **Create a new Lambda function in AWS**:
   - Sign in to the AWS Management Console
   - Navigate to Lambda service
   - Create a new function
   - Choose "Author from scratch"
   - Name: secure-my-future
   - Runtime: Node.js 14.x or later
   - Upload the `lambda/secure-my-future-lambda.zip` file
   - Copy the ARN of your Lambda function

3. **Update the skill.json file**:
   - Replace the placeholder ARN in the `skill.json` file with your Lambda function's ARN:
     ```
     "uri": "arn:aws:lambda:us-east-1:XXXXXXXXXXXX:function:secure-my-future"
     ```

4. **Deploy the skill**:
   ```
   cd secure-my-future-skill
   ask deploy
   ```

5. **Test the skill**:
   - Use the Alexa Developer Console to test your skill
   - Or test on an Alexa-enabled device linked to your developer account

## Testing

The `test-script.js` file contains a series of test cases that cover all the main functionality of the skill. To test the skill:

1. Deploy the skill as described above
2. Use the Alexa Developer Console's Test tab
3. Follow the test cases in the script to verify all functionality

## Customization

To customize the skill:

1. **Update estate planning tips**: Modify the `TIPS` object in `lambda/custom/index.js`
2. **Change branding**: Update references to "Amicus Edge" in the responses
3. **Add more age groups**: Add new entries to the `AgeGroupType` slot type in `models/en-US.json` and corresponding tips in the `TIPS` object

## Maintenance

To update the skill after deployment:

1. Make your changes to the code
2. Repackage the Lambda function:
   ```
   cd lambda/custom
   zip -r ../secure-my-future-lambda.zip * -x "*.git*" "*.zip"
   ```
3. Upload the new zip file to your Lambda function in AWS
4. If you made changes to the interaction model, redeploy using ASK CLI:
   ```
   ask deploy
   ```

## Contact Information

For questions or support regarding this skill, please contact Amicus Edge at:
- Website: AmicusEdge.com
- Email: support@amicusedge.com
- Phone: 555-123-4567
