import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import PostItem from '../components/PostItem';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <PostItem 
        slug='/about/'
        background='red'
        category='Misc'
        date='30 de julho de 2020'
        timeToRead='5'
        title='Consectetur adipisicing'
        description='Elit labore non sint tempor quis.'
    />
  </Layout>
)

export default IndexPage
