import React from 'react';
import Layout from 'antd/lib/layout';
import Menu from 'antd/lib/menu';
import Breadcrumb from 'antd/lib/breadcrumb';
import Icon from 'antd/lib/icon';
import AddShop from './AddShop'
import AllShop from './AllShop'
import AddCats from './AddCats'
import Addwares from './Addwares'
import { connect } from 'react-redux'
import { Route, Link, withRouter } from 'react-router-dom'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class PageLayoutt extends React.Component{
  componentWillMount(){
    if(!sessionStorage.petadnav){
      sessionStorage.petadnav = JSON.stringify([{title:'店铺列表',path:this.props.location.pathname}])
    }
    this.props.dispatch({type:'NAVLIST',navlist:JSON.parse(sessionStorage.petadnav)})
  }
  render(){
    let pathname = this.props.location.pathname
    let key = pathname==='/' ? ['1'] : pathname==='/addshop' ? ['2'] : ['0']
    return (
      <div>
        <Layout style={{height:'100vh'}}>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={key}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />管理员操作</span>}>
                  <Menu.Item key="1"><Link to='/'>管理店铺</Link></Menu.Item>
                  <Menu.Item key="2"><Link to='/addshop'>添加店铺</Link></Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '12px 0' }}>
                {
                  this.props.navlist.length ? (
                    this.props.navlist.map(item =>
                      <Breadcrumb.Item key={Math.random()}><Link to={item.path} >{item.title}</Link></Breadcrumb.Item>
                    )
                  ) : null
                }
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, position:'relative' }}>
                <Route exact path="/" component={AllShop}/>
                <Route path="/addshop" component={AddShop}/>
                <Route path="/addcats/:id" component={AddCats}/>
                <Route path="/addwares/:id" component={Addwares}/>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  navlist:state.navlist
})
export default withRouter(connect(mapStateToProps)(PageLayoutt))
