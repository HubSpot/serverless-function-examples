### CMS Boilerplate

#### Description
This is a simple function that can be generated through the [HubSpot CLI](https://github.com/HubSpot/hubspot-cli) command `hs create function`.

#### Functionality
This function searches for content matching the `term` value passed to the HubSpot API `contentsearch/v2/search` endpoint. It is hard-coded to use `searchTerm` as the searched term, but this can be changed or modified to be dynamically set.

#### API Endpoints Used
https://api.hubapi.com/contentsearch/v2/search
