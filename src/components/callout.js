import React from 'react'
import { Link } from 'gatsby'
import { Item, Image } from 'semantic-ui-react'

import lbf from "../images/lbf_square.jpg"
import wf from "../images/wf_square.jpg"
import lp from "../images/lp_square.jpg"

const Callout = ({ d, key }) => (
  <Item key={key} style={{ background: `#f5f5f5`, borderLeft: `5px solid #418cff`, padding: `.8em` }}>
    <Item.Content>
      <Item.Header as='h3' style={{ margin: 0 }}>
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
      src={d.Image_Name === `lbf_square` ? lbf : d.Image_Name === `wf_square` ? wf : lp} 
      size='small'
      circular />
  </Item>
)

export default Callout
