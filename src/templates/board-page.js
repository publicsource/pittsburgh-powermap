import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default ({ data }) => {
  let board = data.airtable.data

  return (
    <Layout>
      <h1>{board.Name}</h1>
      <h2>{board.Govt_Level}</h2>
      <p>{board.Number_of_Members} members</p>
    </Layout>
  )
}

export const query = graphql`
  query($name: String!) {
    airtable(data: {Name: {eq: $name}}) {
      id
      data {
        Name
        Govt_Level
        Number_of_Members
        Members_in_Master
      }
    }
  }
`