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
            allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
                edges {
                    node {
                        frontmatter {
                            title
                            date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
                            description
                            category
                            background
                        }
                        timeToRead,
                        fields {
                            slug    
                        }
                    }
                }
            }
        }
    `).then(result => {
        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach(({ node }) => {
            createPage({
                path: node.fields.slug,
                component: path.resolve('./src/templates/blog-post.js'),
                context: {
                   slug: node.fields.slug 
                }
            })
        });

        const postsPerPage = 1;
        const numPages = Math.ceil(posts.length / postsPerPage);
        
        Array.from({ length: numPages}).forEach((_, index) => {
            createPage({
                path: index === 0 ? '/' : `/page/${index + 1}`,
                component: path.resolve('./src/templates/blog-list.js'),
                context: {
                   limit: postsPerPage,
                   skip: index * postsPerPage,
                   numPages,
                   currentPage: index + 1 
                }
            });
        });
    })
}