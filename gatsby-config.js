require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});
const config = {
    siteMetadata: {
        title: 'Allamaprabhu',
        siteUrl: 'https://www.allamaprabhu.com',
    },
    graphqlTypegen: true,
    plugins: [
        {
            resolve: 'gatsby-source-contentful',
            options: {
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                spaceId: process.env.CONTENTFUL_SPACE_ID,
            },
        },
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sass',
    ],
};
export default config;
