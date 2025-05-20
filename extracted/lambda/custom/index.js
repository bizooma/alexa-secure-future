// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

// Constants for age group tips
const TIPS = {
  twenties: "AmicusEdge.com suggests you establish a healthcare proxy and durable power of attorney. At this stage in life, it's important to designate someone who can make medical decisions on your behalf if you're unable to do so. While it may seem early, having these basic documents in place provides a foundation for your estate plan that you can build upon as your life circumstances change.",
  thirties: "AmicusEdge.com suggests you establish a healthcare proxy, durable power of attorney, and consider creating a will. If you have children, naming guardians is essential. This is also a good time to review beneficiary designations on retirement accounts and insurance policies to ensure they align with your current wishes.",
  forties: "AmicusEdge.com suggests you update your will, especially if you have children. At this stage, you should review guardianship provisions, establish trusts for minor children if appropriate, and ensure your estate plan reflects your current family situation. It's also important to review and update beneficiary designations on retirement accounts and insurance policies.",
  fifties: "AmicusEdge.com suggests you review and update your existing estate plan. At this stage, you should consider long-term care planning, review retirement account beneficiaries, and potentially establish a trust to manage assets. This is also a good time to have conversations with adult children about your wishes and the location of important documents.",
  "sixties plus": "AmicusEdge.com suggests you focus on long-term care planning and ensuring your estate plan is current. At this stage, you should review healthcare directives, consider Medicaid planning if appropriate, and ensure your estate plan minimizes probate and taxes. It's also important to communicate your wishes clearly to family members and consider setting up a trust to manage assets."
};

// Disclaimer text
const DISCLAIMER = "Please note that this is just an overview of estate planning considerations for your age group. We'll be able to provide more detailed strategies tailored to your specific situation after our consultation.";

// Launch Request Handler
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakOutput = 'Welcome to Secure My Future, sponsored by Amicus Edge. I can provide estate planning tips based on your age group. What age group are you in? You can say twenties, forties, or sixties plus.';
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

// Get Age Group Intent Handler
const GetAgeGroupIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetAgeGroupIntent';
  },
  handle(handlerInput) {
    const ageGroup = Alexa.getSlotValue(handlerInput.requestEnvelope, 'ageGroup');
    let speakOutput = '';
    
    // Store the age group in session attributes
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.ageGroup = ageGroup;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    
    if (TIPS[ageGroup]) {
      speakOutput = `${TIPS[ageGroup]} ${DISCLAIMER} Would you like to schedule a free consultation with Amicus Edge to discuss your estate planning needs in more detail?`;
    } else {
      speakOutput = `I don't have specific tips for the ${ageGroup} age group, but I can help you with estate planning tips for those in their twenties, forties, or sixties plus. Which would you prefer?`;
      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    }
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt('Would you like to schedule a free consultation with Amicus Edge?')
      .getResponse();
  }
};

// Schedule Consultation Intent Handler
const ScheduleConsultationIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ScheduleConsultationIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'Great! To schedule your free consultation with Amicus Edge, please visit AmicusEdge.com and click on the Schedule Consultation button, or call our office at 555-123-4567. Our estate planning experts are ready to help you secure your future with personalized strategies.';
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withShouldEndSession(true)
      .getResponse();
  }
};

// Yes Intent Handler (for scheduling consultation)
const YesIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'Great! To schedule your free consultation with Amicus Edge, please visit AmicusEdge.com and click on the Schedule Consultation button, or call our office at 555-123-4567. Our estate planning experts are ready to help you secure your future with personalized strategies.';
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withShouldEndSession(true)
      .getResponse();
  }
};

// No Intent Handler (for declining consultation)
const NoIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'Thank you for using Secure My Future by Amicus Edge. Remember, it\'s never too early or too late to start planning for your future. If you have any questions or need estate planning assistance in the future, we\'re here to help. Goodbye!';
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withShouldEndSession(true)
      .getResponse();
  }
};

// Repeat Intent Handler
const RepeatIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const ageGroup = sessionAttributes.ageGroup;
    
    let speakOutput = '';
    
    if (ageGroup && TIPS[ageGroup]) {
      speakOutput = `${TIPS[ageGroup]} ${DISCLAIMER} Would you like to schedule a free consultation with Amicus Edge to discuss your estate planning needs in more detail?`;
    } else {
      speakOutput = 'I can provide estate planning tips based on your age group. What age group are you in? You can say twenties, forties, or sixties plus.';
    }
    
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt('Would you like to schedule a free consultation with Amicus Edge?')
      .getResponse();
  }
};

// Help Intent Handler
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'I can provide estate planning tips based on your age group. Just tell me which age group you\'re in - twenties, forties, or sixties plus. I can also help you schedule a free consultation with Amicus Edge. What would you like to do?';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

// Cancel and Stop Intent Handler
const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
        || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakOutput = 'Thank you for using Secure My Future by Amicus Edge. Remember, it\'s never too early or too late to start planning for your future. Goodbye!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};

// Fallback Intent Handler
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const speakOutput = 'I\'m sorry, I didn\'t understand that. I can provide estate planning tips based on your age group. Please tell me which age group you\'re in - twenties, forties, or sixties plus.';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

// Session Ended Request Handler
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    // Any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

// Error Handler
const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  }
};

// Export the skill handler
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetAgeGroupIntentHandler,
    ScheduleConsultationIntentHandler,
    YesIntentHandler,
    NoIntentHandler,
    RepeatIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
