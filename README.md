# Board Explorer

Board Explore is a tool from PublicSource to navigate the networks that call the shots in the Pittsburgh region. It's powered by a dataset of public boards and authorities and the people that serve on them.

Board Explorer is built with GatsbyJS, a static-site generator for React & GraphQL. Data is managed in Airtable.

## Data 

COMING SOON
- Airtable structure (how data columns map to web interface, what we rely on versus where you can freely draft)
- How to edit existing records
- How to add new records
- How to edit tables (add columns, etc)

## Development

### Install dependencies

Requires Node v10.13, Yarn, and Gatsby Client to be installed globally.

```
git clone <this repo>
cd power-map
```

`yarn` will install dependencies
`gatsby develop` will start the development server at `localhost:8000`

### Editing site content

COMING SOON
- About and Contact pages
- Homepage ("About this project", images for callouts)
- Swapping Infogram embed scripts
- Metadata for social media cards

## Deploy

This project is currently hosted and deployed from Netlify.

Two ways to deploy:
1. Edit and push code changes to a branch in this repository. Opening a Pull Request will automatically generate a Netlify deploy preview of your changes. When your pull request is approved and merged, updates to the `master` branch of this repository are automatically published to production.

2. Edit data in Airtable (no code edits) and manually trigger a deploy on Netlify. From the site overview page navigate to "Deploys >> "Trigger deploy" button in upper right >> "Clear cache and deploy site". This will show up as `master@HEAD` in the list of deploys. The green "Published" tag indicates it's live. 

If something looks wrong once it's published, you can always "Go to deploy details" of the one prior deploy in the list and click "Publish Deploy" to revert your changes.
