import React from 'react';
import {Layout, Dropdown, Menu,Avatar} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined,UserOutlined} from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const {Header} = Layout;
 function TopHeader(props) {

   // 改变收缩
   const changeCollapsed = () =>{
     props.changeCollapsed()
   }

  // const [collapsed, setCollapsed] = useState(false);
  // const changeCollapsed = ()=>{
  //   setCollapsed(!collapsed);
  // }
   const {role: {roleName}, username} = JSON.parse(localStorage.getItem("token"));
  const menu =(
    <Menu>
      <Menu.Item>{roleName}</Menu.Item>
      <Menu.Item danger onClick={()=>{
        localStorage.removeItem("token")
        props.history.replace("/login")
      }}>退出</Menu.Item>
    </Menu>
  )

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: '0 16px'
      }}
    >
      {props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> :<MenuFoldOutlined onClick={changeCollapsed}/>}
      <div style={{float: "right"}}>
        <span>欢迎<span style={{color:"#1890ff"}}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>

  )
}
const mapStateToProps = ({collapsedReducer:{isCollapsed}})=>{
  return {
    isCollapsed
  }
}

const mapDispatchToProps = {
  changeCollapsed(){
    return {
      type: "change_collapsed"
      // payload:
    }//action
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TopHeader))
