## HubSpot Serverless Function Examples
This repository contains a collection of serverless functions written by both HubSpot and the community. It serves as a reference to be used when creating new functions, or seeking existing functions to fulfill a specific task.

### What is a serverless function?
Serverless functions provide a way to write server-side code that interacts with HubSpot and third-party services through APIs. APIs requiring authentication are not safe for the front-end of a website, as your credentials would be exposed. Serverless functions can act as an intermediary, enabling you to keep credentials secret. For more info, please see the [HubSpot Serverless Function Docs](https://developers.hubspot.com/docs/cms/features/serverless-functions) or the [HubSpot Serverless Functions: Getting Started guide](https://developers.hubspot.com/docs/cms/guides/getting-started-with-serverless-functions).

### In which ways can serverless functions be used within HubSpot?
Serverless functions were introduced in April 2020 and functionality has been expanded since then to allow custom packages, local testing, and greater visibility into logs to simplify development. Currently, we have serverless function examples that can interact with the following areas of HubSpot:

- [CMS](cms)
- [CRM Extensions](crm-extensions)
