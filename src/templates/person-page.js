import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

export default ({ data }) => {
  let person = data.airtable.data

  return (
    <Layout>
      <h1>{person.Name}</h1>
      <p>Sits on {person.Number_Board_Positions} board(s)</p>
    </Layout>
  )
}

export const query = graphql`
  query($name: String!) {
    airtable(data: {Name: {eq: $name}}) {
      id
      data {
        Name
        Number_Board_Positions
      }
    }
  }
`