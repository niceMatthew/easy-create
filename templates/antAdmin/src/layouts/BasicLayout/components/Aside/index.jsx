import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import Auth from '@/components/Auth';
import { asideMenuConfig } from '@/config/menu';
import { Menu, Icon } from 'antd';
import styles from './index.module.scss';

const SubNav = Menu.SubMenu;
const NavItem = Menu.Item;
/**
 * 根据权限决定是否渲染某个表单
 * @param {object} item 菜单项组件
 * @param {*} authorities 菜单项允许权限的数组
 * @return {object} 渲染的菜单项
 */
function renderAuthItem(item, authorities) {
  if(authorities) {
      return Auth({
        children: item,
        authorities,
        hidden: true
      }) 
    }else {
        return item;
    }
}

/**
 * 二级导航
 * @param {} item 
 * @param {*} index 
 */
function getSubMenuOrItem(item, index) {

  // 有二级菜单
  if(item.children && item.children.some(child => child.name)) {
    const childrenItems = getNavMenuItems(item.children);
    if(childrenItems && childrenItems.length > 0 ) {
        const subNav = (
          <SubNav
            key={[item.path]}
            title={
              <span>
                  {item.icon ? <Icon type={item.icon} /> : null}
                  <span> {item.name} </span>
              </span>
            }
          > 
            {childrenItems}
          </SubNav>
        )
        return renderAuthItem(subNav, item.authorities);
    } 
    // 二级菜单为空
    return null;
  }
  // 一级菜单
  const navItem = (
    <NavItem key={item.path}>
        {/* {item.icon ? <Icon type={item.icon} /> : null} */}
            <Link 
                className = { styles.navName }
                to={item.path}>
                <div className = { styles.liWrap }>
                    <span className = { styles['icon-' + item.icon] }></span>
                    {item.name}
                </div>
            </Link>
    </NavItem>
  )
  return renderAuthItem(navItem, item.authorities)
}
/**
 * 获取菜单数据
 * @param {} menusData 
 */
function getNavMenuItems(menusData) {
  if(!menusData) {
    return [];
  }
  return menusData
    .filter(item => item.name && !item.hideInMenu)
    .map((item, index) => {
      return getSubMenuOrItem(item, index)
    })
}

const Aside = withRouter((props) => {
    const [menuConfig] = useState(asideMenuConfig);
    const {location } = props;
    const  {pathname} = location;
    // const [pathname, setPathname] = useState('')
    
      /**
   * 获取默认展开菜单项
   */
  function getDefaultOpenKeys(location = {}) {
    const { pathname } = location;
    const menus = getNavMenuItems(menuConfig);

    let openKeys = [];
    if (Array.isArray(menus)) {
      menuConfig.forEach((item, index) => {
        if (pathname.startsWith(item.path)) {
          openKeys = [item.path];
        }
      });
    }
    return openKeys;
  }


  function onOpenChange(item) {
      if(item.length > 0) {
        item = item.filter((i, index) => index===(item.length - 1))
      } 
      setOpenKeys(item)
  }

  const defaultOpenKeys = getDefaultOpenKeys(location);

  const [openKeys, setOpenKeys] = useState(defaultOpenKeys);
    return  <Menu theme="dark" mode="inline" 
              openKeys={openKeys}
            //   selectedKeys={[pathname]}
              defaultSelectedKeys={[pathname]}
              onOpenChange={onOpenChange}
              multiple={false}
            >
              {getNavMenuItems(asideMenuConfig)}
            </Menu>
})


export default Aside;