import React from 'react'
import { Link } from 'gatsby'
import { Item, Image } from 'semantic-ui-react'

import fw from "../images/felicity-williams.png"
import jlp from "../images/justin-leavitt-pearl.png"
import at from "../images/aster-teclay.png"

const Callout = ({ d, index }) => (
  <Item key={index} style={{ background: `#f5f5f5`, borderLeft: `5px solid #418cff`, padding: `.8em` }}>
    <Item.Content verticalAlign='middle'>
      <Item.Header as='h3'>
        <Link to={`/person/${d.Person[0].data.Slug}`}>
          {d.Person[0].data.Name}
        </Link>
      </Item.Header>
      <Item.Meta>
        {d.Boards.map((b, i) => (
          <span key={i}>
            {i > 0 ? `& ` : ``}
            <Link to={`/board/${b.data.Slug}`}>
              {b.data.Name}
            </Link>
          </span>
        ))}
      </Item.Meta>
      <Item.Description style={{ fontFamily: `Roboto` }}>{d.Description}</Item.Description>
    </Item.Content>
    <Image 
      src={d.Person[0].data.Name === 'Felicity Williams' ? fw : d.Person[0].data.Name === 'Aster Teclay' ? at : jlp}
      size='small'
      circular />
  </Item>
)

export default Callout
