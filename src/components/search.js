import React, { Component } from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'
import { Search, List } from 'semantic-ui-react'

class SearchAllNodes extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.Name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.Name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch),
      })
    }, 200)
  }

  render() {
    const { isLoading, value, results } = this.state
    
    const resRender = ({ Name, Type, Slug }) => (
      <List.Item>
        <List.Content>
          <Link to={Type === "Board" ? `/board/${Slug}` : `/person/${Slug}`}>
            <List.Header as='a' style={{ fontWeight: 700 }}>{Name}</List.Header>
            <List.Description>{Type}</List.Description>
          </Link>
        </List.Content>
      </List.Item>
    )

    return (
      <Search
        input={{ fluid: true }}
        fluid
        size='big'
        placeholder="Search by name..."
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 200, { leading: true })}
        results={results}
        resultRenderer={resRender}
        value={value}
        {...this.props}
      />
    )
  }
}

export default SearchAllNodes