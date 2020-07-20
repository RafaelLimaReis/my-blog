const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

// Adiciona o campo slug em todos os posts
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    });

    createNodeField({
      node,
      name: "slug",
      value: `/${slug.slice(12)}`,
    });
  }
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug    
                        }
                    }
                }
            }
        }  
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/blog-post.js'),
                context: {
                   slug: node.fields.slug 
                }
            })
        });
    })
}