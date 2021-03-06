import React, { Component, PropTypes } from 'react'
import { Button, List as MdlList } from 'react-mdl'

export default class List extends Component {
  static propTypes = {
    loadingLabel: PropTypes.string.isRequired,
    pageCount: PropTypes.number,
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onLoadMoreClick: PropTypes.func.isRequired,
    nextPageUrl: PropTypes.string
  }

  static defaultProps = {
    isFetching: true,
    loadingLabel: 'Loading...'
  }

  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props
    return (
      <Button primary onClick={onLoadMoreClick}
        disabled={isFetching}>
        {isFetching ? 'Loading...' : 'Load More'}
      </Button>
    )
  }

  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, loadingLabel
    } = this.props

    const isEmpty = items.length === 0
    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>
    }

    const isLastPage = !nextPageUrl
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <MdlList style={{maxWidth: "600px"}}>
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </MdlList>
    )
  }
}
