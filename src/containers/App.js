import React, { Component, PropTypes } from 'react'
import {Layout, Navigation, Header, Drawer, Content} from 'react-mdl'

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
            <Header  title="Github Repository Browser">
            </Header>
            <Content>
              <div className="page-content">  
              {children}
              </div>
            </Content>
        </Layout>
    </div>
    )
  }
}

export default App
