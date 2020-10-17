<template>
  <div class="Home">
    <!-- 吸顶搜索框模块 -->
    <van-sticky>
      <div class="head-search padding16">
        <p class="search">
          <van-icon name="search" />
          <van-swipe class="search-swipe"
            :autoplay="3000" :show-indicators='false' vertical
            :touchable='false'
          >
            <van-swipe-item v-for="(hot,key) in hotSearch" :key='key'>{{hot}}</van-swipe-item>
          </van-swipe>
        </p>
        <van-icon name="scan" color="#fff"/>
        <van-icon name="chat-o" color="#fff"/>
      </div>
    </van-sticky>
    <!-- 广告轮播图模块 -->
    <van-swipe class="img-swipe" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.src" :alt="image.alt" />
      </van-swipe-item>
    </van-swipe>
    <!-- 分类宫格模块 -->
    <van-swipe class="grid-swipe" :loop='false'>
      <van-swipe-item v-for="(grid, index) in gridList" :key="index">
        <van-grid :gutter='10' :border='false'>
          <van-grid-item
           v-for="(gridItem,key) in grid" :key='key'
          >
            <template #icon>
              <van-icon :name="gridItem.icon" :color="gridItem.color" :size='30'/>
            </template>
            <template #text>
              {{gridItem.name}}
            </template>
          </van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <!-- 榜单模块 -->
    <div class="module">
      <p class="module-title">权威榜单</p>
      <div class="hot-list">
        <div class="hot-item" v-for="(hot,key) in hotList" :key="key">
          <div class="hot-item-info">
            <p>销量榜</p>
            <p>{{hot.name}}</p>
            <p>已下单{{hot.sales}}件</p>
          </div>
          <div class="hot-item-img" :style="{backgroundImage: `url(${hot.img}`}"></div>
        </div>
      </div>
    </div>
    <!-- 商品列表模块 -->
    <div class="module">
      <p class="module-title">推荐</p>
      <div class="goods-list">
        <div class="goods-item" v-for="(goods,key) in goodsList" :key="key">
          <div class="goods-item-img" :style="{backgroundImage: `url(${goods.img}`}"></div>
          <div class="goods-item-info">
            <p class="name">{{goods.name}}</p>
            <p class="describe van-multi-ellipsis--l2">{{goods.describe}}</p>
            <p class="discount">{{goods.discount}}</p>
            <p class="price">￥<span>{{goods.price}}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Sticky,Swipe,SwipeItem,Grid,GridItem } from 'vant'
import Mock from 'mockjs'

const Random = Mock.Random

export default {
  name: 'Home',
  components: {
    vanSticky: Sticky,
    vanSwipe: Swipe,
    vanSwipeItem: SwipeItem,
    vanGrid: Grid,
    vanGridItem: GridItem,
  },
  data () {
    return {
      hotSearch: ['机械键盘','平板电脑','无人机','你不对劲'],
      gridList: [],
      hotList: [],
      goodsList: [],
      images: [],
    }
  },
  created () {
    this.creatGrid()
    this.creatHotList()
    this.creatGoodsList()
    this.$api.getHomeSwipeImg().then(res => {
      console.log('res===',res)
      this.images = [...res.imgList]
    })
  },
  methods: {
    ...mapActions('common',['addCars']),
    creatGrid () {
      const { gridList } = Mock.mock({
        'gridList|14-16': [{
          'name': () => Random.cword(2),
          'icon|1': ['gift-o','vip-card-o','tv-o','warn-o'],
          'color': () => Random.color(),
        }],
      })
      console.log(gridList)
      const trunc = Math.trunc(gridList.length / 8)
      const remainder = gridList.length % 8
      for (let i = 0; i < trunc; i++) {
        this.gridList.push([...gridList.slice(8 * i,8 * (i + 1))])
      }
      this.gridList.push([...gridList.slice(8 * trunc,8 * trunc + remainder)])
    },
    creatHotList () {
      const { hotList } = Mock.mock({
        'hotList|4': [{
          'name': () => Random.cword(2,4),
          'sales|1-10000': 1,
          'img': function () {
            return Random.image('50x80',Random.color(),this.name)
          },
        }],
      })
      console.log(hotList)
      this.hotList = [...hotList]
    },
    creatGoodsList () {
      this.$api.getGoodsList().then(res => {
        console.log(res)
        this.goodsList = [...res.goodsList]
      })
    },
    addCar () {
      this.$api.addCars().then(res => {
        console.log('res===',res)
      })
      // this.addCars(this)
    },
  },
}
</script>

<style lang="less" scoped>
@import url('@/assets/css/globalVar');
.Home{
  position: relative;
  &:after{
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 150px;
    width: 100%;
    background-color: @blue;
    border-radius: 0 0 50px 50px;
  }
}
.module{
  padding: @padding-md;
  .module-title{
    font-size: @font-size-lg;
    font-weight: bold;
    margin-bottom: 8px;
  }
}
.head-search{
  display: flex;
  align-items: center;
  background-color: @blue;
  .search{
    background-color: #fff;
    border-radius: 6px;
    flex: 1;
    padding: 5px 0;
    display: flex;
    align-items: center;
    .search-swipe {
      height: 26px;
      line-height: 26px;
      padding-left: 10px;
    }
  }
  i{
    margin-left: 10px;
  }
}
.img-swipe{
  height: 100px;
  margin: 0 16px;
  border-radius: 6px;
  overflow: hidden;
  img{
    display: block;
    width: 343px;
    height: 100px;
  }
}
.hot-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .hot-item{
    width: 48%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: @gray-1;
    margin-bottom: 8px;
    padding: 8px;
    .hot-item-info{
      p:first-child{
        color: @blue;
      }
      p:last-child{
        color: @gray-7;
        font-size: @font-size-sm;
      }
    }
    .hot-item-img{
      width: 50px;
      height: 80px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
}
.goods-list{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .goods-item{
    width: 48%;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    background-color: @gray-1;
    margin-bottom: 8px;
    padding: 8px;
    .goods-item-img{
      // width: 100%;
      height: 200px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    .goods-item-info{
      .name{
        font-weight: bold;
        font-size: @font-size-lg;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .describe{
        color: @gray-7;
      }
      .discount{
        background-color: @orange;
        padding: 2px 4px;
        display: inline-block;
      }
      .price{
        span{
          font-weight: bold;
          font-size: @font-size-lg;
        }
      }
    }
  }
}
</style>
