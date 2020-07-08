import React from 'react'
import { Link } from 'gatsby'
import { Item, Image } from 'semantic-ui-react'

import eld from "../images/emma-lucas-darby.jpg"
import rrb from "../images/rev-ricky-burgess.jpg"
import tcw from "../images/thomas-c-waters.jpg"

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
      src={d.Person[0].data.Name === 'Emma Lucas-Darby' ? eld : d.Person[0].data.Name === 'Rev. Ricky Burgess' ? rrb : tcw}
      size='small'
      circular />
  </Item>
)

export default Callout
