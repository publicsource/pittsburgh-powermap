# Board Explorer

Board Explore is a tool from PublicSource to navigate Pittsburgh's unelected power structures. It's powered by a dataset of public authorities and the people that serve on them. Find it at https://boards.publicsource.org/

Board Explorer is built with [GatsbyJS](https://www.gatsbyjs.com/), a static-site generator for React & GraphQL. [Semantic UI React](https://react.semantic-ui.com/) components are used for responsive page layouts and styling. Data is managed in [Airtable](https://airtable.com/), and connected using the [gatsby-source-airtable](https://www.gatsbyjs.com/plugins/gatsby-source-airtable/) plugin. The site is deployed using [Netlify](https://www.gatsbyjs.com/docs/deploying-to-netlify/).

## Develop

### Option 1: Edit directly in your browser using Github

If you're only making small content edits, it may be simplest to edit files directly in Github (requires a user account with write access to this organization & repository).

You can find direct links to files and further instructions for editing specific content areas here: https://github.com/publicsource/pittsburgh-powermap/wiki

Navigate to a file and:
- Click the "edit" icon in the upper right
- Make your change in the web editor
- Add a commit message to describe your change
- **Most importantly** select the option to "Create a new branch for this commit and start a pull request." (do not commit direct to `master`)
- Click the "Propose changes" button

Then you can navigate to your pull request where Netlify will automatically generate a "Deploy preview" link to review your changes before merging them to the live site.

### Option 2: Run the code locally

Requires [Node](https://nodejs.org/en/download/) (> version 10.3), [Yarn](https://classic.yarnpkg.com/en/docs/install), and [Gatsby Client](https://www.gatsbyjs.com/docs/quick-start/) to be installed globally.

Clone this repository, then:
- Copy `.env.example` to `.env.development` & `.env.production` and add an Airtable Personal Access Token with read permissions to your base
- Run `yarn` to install dependencies
- Run `gatsby develop` to start the development server at `localhost:8000` and GraphiQL, an in-browser IDE, to explore our site's data at `http://localhost:8000/___graphql` (especially useful for testing how to query the Airtable schema)

You should be up & running from here! 

Commit your changes to a Github branch (not `master`) and open a PR as usual.

## Deploy

This project is currently hosted and deployed from Netlify, using the ["Git repository setup"](https://www.gatsbyjs.com/docs/deploying-to-netlify/#git-repository-setup) explained here.

Two ways to deploy:
1. Edit and push code changes to a branch in this repository (using either "develop" option above). Opening a Pull Request will automatically generate a Netlify deploy preview of your changes. When your pull request is approved and merged, updates to the `master` branch of this repository are automatically published to production.

2. Edit data in Airtable (no code edits) and manually trigger a deploy on Netlify. From the site overview page navigate to "Deploys" >> "Trigger deploy" button in upper right >> "Clear cache and deploy site". This will show up as `master@HEAD` in the list of deploys. The green "Published" tag indicates it's live. 

If something looks wrong once it's live, you can always "Go to deploy details" of the one prior deploy in the list and click "Publish Deploy" to revert your changes.
