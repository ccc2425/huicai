import Vue from 'vue'
import Router from 'vue-router'

/**
 * 重写路由的push方法
 */
const routerReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error=> error)
}
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import index from '@/view/index'
import business from '@/view/business'
import shop from '@/view/shop'
import release from '@/view/release'
import trade from '@/view/trade'
import mine from '@/view/mine'
import login from '@/view/login'
import jump from '@/view/jump'

//商圈
import myad from '@/view/business/myad'
import ad_detail from '@/view/business/ad_detail'
import createad from '@/view/business/createad'
//我的
import integral from '@/view/mine/integral'
import myteam from '@/view/mine/myteam'
import realname from '@/view/mine/realname'
import transfer from '@/view/mine/transfer'
import record from '@/view/mine/record'
import addres from '@/view/mine/address'
import add_address from '@/view/mine/add_address'
import set_password from '@/view/mine/set_password'
import complaint from '@/view/mine/complaint'
import proposal from '@/view/mine/proposal'
import share from '@/view/mine/share'
import contribution from '@/view/mine/contribution'
import receive from '@/view/mine/receive'
import bindcard from '@/view/mine/bindcard'
//商品
import classfy from '@/view/shop/classfy'
import item from '@/view/shop/item'
import orderSure from '@/view/shop/orderSure'
import orderDetail from '@/view/shop/orderDetail'
import shopCar from '@/view/shop/shopCar'
import item_list from '@/view/shop/item_list'
import service from '@/view/shop/service'
//交易

import purchase from '@/view/trade/purchase'
import tradeDetail from '@/view/trade/tradeDetail'
import buyer from '@/view/trade/buyer'
import myOrder from '@/view/trade/myOrder'
import tradeComplaint from '@/view/trade/tradeComplaint'
import myOrderDetail from '@/view/trade/myOrderDetail'
import tradeRecord from '@/view/trade/tradeRecord'






Vue.use(MintUI)


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/jump",
      name: "jump",
      component: jump,
    },
    {
      path: "/",
      name: "login",
      component: login,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children:[
        {
          path: "/",
          redirect: '/business'
        },
        {
          path: "/business",
          name:"business",
          component: business,
        },
        {
          path: "/shop",
          name:"shop",
          component: shop
        },
        {
          path: "/release",
          name:"release",
          component: release
        },
        {
          path: "/trade",
          name:"trade",
          component: trade
        },
        {
          path: "/mine",
          name:"mine",
          component: mine
        },
      ]
    },
    {
      path: "/business/myad",
      name: "myad",
      component: myad,
    },
    {
      path: "/business/ad_detail",
      name: "ad_detail",
      component: ad_detail,
    },
    {
      path: "/business/createad",
      name: "createad",
      component: createad,
    },
    {
      path: "/mine/integral",
      name: "integral",
      component: integral,
    },
    {
      path: "/mine/myteam",
      name: "myteam",
      component: myteam,
    },
    {
      path: "/mine/realname",
      name: "realname",
      component: realname,
    },
    {
      path: "/mine/transfer",
      name: "transfer",
      component: transfer,
    },
    {
      path: "/mine/record",
      name: "record",
      component: record,
    },
    {
      path: "/mine/address",
      name: "addres",
      component: addres,
    },
    {
      path: "/mine/add_address",
      name: "add_address",
      component: add_address,
    },
    {
      path: "/mine/set_password",
      name: "set_password",
      component: set_password,
    },
    {
      path: "/mine/complaint",
      name: "complaint",
      component: complaint,
    },
    {
      path: "/mine/proposal",
      name: "proposal",
      component: proposal,
    },
    {
      path: "/mine/receive",
      name: "receive",
      component: receive,
    },
    {
      path: "/mine/share",
      name: "share",
      component: share,
    },
    {
      path: "/mine/contribution",
      name: "contribution",
      component: contribution,
    },
    {
      path: "/mine/bindcard",
      name: "bindcard",
      component: bindcard,
    },
    {
      path: "/shop/classfy",
      name: "classfy",
      component: classfy,
    },
    {
      path: "/shop/item",
      name: "item",
      component: item,
    },
    {
      path: "/shop/orderSure",
      name: "orderSure",
      component: orderSure,
    },
    {
      path: "/shop/orderDetail",
      name: "orderDetail",
      component: orderDetail,
    },
    {
      path: "/shop/shopCar",
      name: "shopCar",
      component: shopCar,
    },
    {
      path: "/shop/item_list",
      name: "item_list",
      component: item_list,
    },
    {
      path: "/shop/service",
      name: "service",
      component: service,
    },
    {
      path: "/trade/purchase",
      name: "purchase",
      component: purchase,
    },
    {
      path: "/trade/tradeDetail",
      name: "tradeDetail",
      component: tradeDetail,
    },
    {
      path: "/trade/buyer",
      name: "buyer",
      component: buyer,
    },
    {
      path: "/trade/myOrder",
      name: "myOrder",
      component: myOrder,
    },
    {
      path: "/trade/tradeComplaint",
      name: "tradeComplaint",
      component: tradeComplaint,
    },
    {
      path: "/trade/myOrderDetail",
      name: "myOrderDetail",
      component: myOrderDetail,
    },
    {
      path: "/trade/tradeRecord",
      name: "tradeRecord",
      component: tradeRecord,
    }
  ]
})
