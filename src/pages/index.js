import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from '../components/PostItem';

const IndexPage = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query PostList {
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
  `);

  const postList = allMarkdownRemark.edges;

  return (
    <Layout>
        <SEO title="Home" />
        { postList.map(({ 
            node: { 
                frontmatter: { title, date, description, category, background }, 
                timeToRead,
                fields: { slug }
            }
        }, i) => (
            <PostItem 
                key={i}
                slug={slug}
                background={background}
                category={category}
                date={date}
                timeToRead={timeToRead}
                title={title}
                description={description}
            />)
        )}
    </Layout>
  );
};

export default IndexPage
