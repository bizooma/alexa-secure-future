# Secure My Future - Alexa Skill

An Alexa skill that provides estate planning tips tailored by age group, sponsored by Amicus Edge.

## Executive Summary

"Secure My Future" is a voice-activated Alexa skill designed to help law firms and financial advisors provide valuable estate planning guidance to clients of different age groups. Developed for Amicus Edge, this skill delivers customized estate planning recommendations based on the user's age bracket and offers a pathway to schedule personalized consultations.

### Key Features
- **Age-Specific Guidance**: Tailored estate planning tips for different life stages (20s, 40s, 60s+)
- **Professional Branding**: All responses include Amicus Edge branding
- **Consultation Scheduling**: Built-in functionality to convert users into consultation appointments
- **Simple User Experience**: Intuitive conversation flow with minimal user inputs required

## User Experience

### How It Works

1. **Invocation**: User says "Alexa, open Secure My Future"
2. **Age Group Selection**: Alexa asks "What age group are you in?" and user responds
3. **Personalized Tips**: Alexa provides estate planning tips specific to the user's age group, starting with "AmicusEdge.com suggests you..."
4. **Consultation Opportunity**: Alexa offers to schedule a free consultation
5. **Conversion**: User can accept (get scheduling information) or decline (end session)

### Sample Dialogues

#### For Users in Their 20s:
```
User: "Alexa, open Secure My Future"
Alexa: "Welcome to Secure My Future, sponsored by Amicus Edge. I can provide estate planning tips based on your age group. What age group are you in? You can say twenties, forties, or sixties plus."
User: "Twenties"
Alexa: "AmicusEdge.com suggests you establish a healthcare proxy and durable power of attorney. At this stage in life, it's important to designate someone who can make medical decisions on your behalf if you're unable to do so. While it may seem early, having these basic documents in place provides a foundation for your estate plan that you can build upon as your life circumstances change. Please note that this is just an overview of estate planning considerations for your age group. We'll be able to provide more detailed strategies tailored to your specific situation after our consultation. Would you like to schedule a free consultation with Amicus Edge to discuss your estate planning needs in more detail?"
```

## Technical Implementation

### Directory Structure

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

### Key Components

1. **Interaction Model** (`models/en-US.json`):
   - Defines the skill's invocation name: "secure my future"
   - Contains intents for handling age group selection and consultation scheduling
   - Includes sample utterances for natural language understanding

2. **Lambda Function** (`lambda/custom/index.js`):
   - Implements the skill's business logic
   - Contains age-specific estate planning tips
   - Handles the conversation flow and user responses
   - Includes branding and disclaimer text

3. **Skill Manifest** (`skill.json`):
   - Contains metadata about the skill (name, description, icons)
   - Defines the skill's endpoint (Lambda ARN)
   - Specifies publishing information

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
3. Follow the test cases in the script to verify all functionality:
   - Launch request
   - Age group selection for different age groups
   - Consultation scheduling
   - Help, stop, and cancel intents

## Customization Options

### Content Customization

To customize the skill's content:

1. **Update estate planning tips**: 
   - Modify the `TIPS` object in `lambda/custom/index.js`
   - Each age group has its own entry in this object

   ```javascript
   const TIPS = {
     twenties: "AmicusEdge.com suggests you establish a healthcare proxy and durable power of attorney...",
     forties: "AmicusEdge.com suggests you update your will, especially if you have children...",
     "sixties plus": "AmicusEdge.com suggests you focus on long-term care planning..."
   };
   ```

2. **Change branding**: 
   - Update references to "Amicus Edge" in the responses
   - Modify the disclaimer text as needed

3. **Add more age groups**: 
   - Add new entries to the `AgeGroupType` slot type in `models/en-US.json` 
   - Add corresponding tips in the `TIPS` object in `lambda/custom/index.js`

### Visual Customization

To customize the skill's appearance in the Alexa app:

1. Update the icons and images in the skill manifest
2. Modify the skill description and example phrases
3. Update the privacy policy and terms of use URLs

## Maintenance and Updates

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

## Business Integration

### Marketing Opportunities

- Include the skill in marketing materials for estate planning services
- Create QR codes linking to the skill for print materials
- Mention the skill in client newsletters and social media

### Analytics and Improvement

- Monitor skill usage through the Amazon Developer Console
- Track consultation conversion rates
- Gather feedback from users to improve the skill

## Contact Information

For questions or support regarding this skill, please contact Amicus Edge at:
- Website: AmicusEdge.com
- Email: support@amicusedge.com
- Phone: 555-123-4567

---

© 2025 Amicus Edge. All rights reserved.
