const path = require(`path`);

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allContentfulWork {
        nodes {
          roles
          name
        }
      }
    }
  `);

  const temp = path.resolve(`./src/templates/test.tsx`);

  actions.createPage({
    path: 'a',
    component: temp,
    context: {},
  });

  data.allContentfulWork.nodes.forEach((node) => {
    const { roles, name } = node;
    const slug = `works/directing/$`;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/test.tsx`),
      context: { name },
    });
  });
};
