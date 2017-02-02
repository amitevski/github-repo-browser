import React, { Component, PropTypes } from 'react'
import { Layout, Header, Content, Footer, FooterLinkList, FooterSection } from 'react-mdl'

class App extends Component {
  static propTypes = {
    // Injected by React Router
    children: PropTypes.node
  }

  render() {
    const { children } = this.props
    return (
      <div >
        <Layout fixedHeader>
          <Header title="Github Repository Browser">
          </Header>
          <Content>
            <div className="page-content">
              {children}
            </div>
          </Content>
          <Footer size="mini">
            <FooterSection type="left" logo="Github Repo Browser">
                <FooterLinkList>
                    <a href="#">Home</a>
                    <a href="#">Privacy & Terms</a>
                </FooterLinkList>
            </FooterSection>
        </Footer>
        </Layout>
      </div>
    )
  }
}

export default App
