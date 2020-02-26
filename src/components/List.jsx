import React, { Component } from 'react'
import { List, Container } from 'semantic-ui-react'

import {
  InfoMessage,
} from './Messages'
import intl from 'react-intl-universal'

class ItemsList extends Component {

  constructor() {
    super()
    this.state = {
      itemsOnPage:99999, //para si hay que volver a la paginación, no haya que hacer todo de nuevo
      activePage:1,
    }
  }

  cutItems = items => items.length/this.state.itemsOnPage

  itemsForPage = (items, activePage) => (items.slice((activePage-1) *this.state.itemsOnPage, activePage*this.state.itemsOnPage))

  handleInputChange = (e, { value }) => this.setState({ activePage: value })

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })
  
  render() {

    const {
      items,
      render_item
    } = this.props

    const { activePage } = this.state

    return (
      items.length > 0 ? (
        <div>
          <List verticalAlign='middle' >
            {
              this.itemsForPage(items,activePage).map(render_item)
            }
          </List>
          <Container textAlign='center'>
            {/* <Pagination color='blue' //para el paginado
              activePage={activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={this.cutItems(items)}
              firstItem={null}
              lastItem={null}
              prevItem={null}
              nextItem={null}
            /> */}
          </Container>
        </div>
      ) : <InfoMessage title={intl.get('EMPTY_LIST')} description={intl.get('EMPTY_LIST_MESSAGE')} />
    )
  }
}

export default ItemsList