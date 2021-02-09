### HubDB Module Data Persist
#### Description
This function shows how to use authenticated HubSpot API calls to store submitted form data from an embedded module into HubDB and how to retrieve this persisted data.

#### Setup Instructions
1. Install the HubSpot CLI by running `yarn global add @hubspot/cli` ([Getting started with local development](https://developers.hubspot.com/docs/cms/guides/getting-started-with-local-development))
2. Create the HubDB table that will be used to store data by running `hs hubdb create ./cms/hubdb-module-data-persist/missions_hubdb.json` ([HubDB documentation](https://developers.hubspot.com/docs/cms/features/hubdb))
3. Add the required secret values
  - Run `hs secrets add APIKEY` and add your API key value ([Access your HubSpot API key](https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key#:~:text=Access%20your%20API%20key,Show%20to%20display%20your%20key.))
  - Run `hs secrets add HUBDB_TABLE_NAME` and add the value `missions`
4. Upload the function files and assets to your portal by running `hs upload ./cms/hubdb-module-data-persist hubdb-module-data-persist`
5. Deploy the serverless functions by running `hs functions deploy hubdb-module-data-persist/missions.functions`
6. Create and publish a new website page that uses the "Missions Page Template" ([Create and publish a page](https://knowledge.hubspot.com/cos-pages-editor/create-and-edit-pages-in-hubspot)). *Note:* You may need to select "All of your templates" on the left-hand side to find the template.

Once you have completed these steps, you should be able to navigate to the page that you created and click the "New Mission" button to get a new mission.

#### Functionality
The function will allow you to create a single mission for each contact. The mission is saved into HubDB upon creation and persists through reloading the page. When the mission is completed, the associated row is removed from HubDB and a new mission can then be created.

#### API Endpoints Used
POST https://api.hubspot.com/cms/v3/hubdb/tables/missions/draft/push-live
DELETE https://api.hubspot.com/cms/v3/hubdb/tables/missions/rows/${id}/draft
