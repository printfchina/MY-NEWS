// 导入静态文件
import './imports';
// 导入头部组件
import Header from '../components/Header';
// 导入导航组件
import NavBar from '../components/NavBar';
// 导入列表组件
import NewsList from '../components/NewsList';
// 导入预加载组件
import PageLoading from '../components/PageLoading';
// 导入触底的组件
import MoreLoading from '../components/MoreLoading';


// 导入数据
import { NEWS_TYPE } from '../data';
// 导入
import service from '../services'; 
// 导入工具库
import { scrollToBottom } from '../libs/utils';

;((doc) => {

    const oApp = doc.querySelector('#app');
    let oListWrapper = null;
    let t = null;

    const config = {
        type: 'top',
        count: 10,
        pageNum: 0,
        // 状态管理
        isLoading: false
    }

    const newsData = {}

// 初始化函数
    const init = async () => {
        render();
        await setNewsList();
        bindEvent();
    }
    function bindEvent () {
        NavBar.bindEvent(setType);
        window.addEventListener('scroll', scrollToBottom.bind(null, getMoreList, false));
    }
// 渲染 头部  导航  列表
    function render () {
        const headerTpl = Header.tpl({
            url: '/',
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        });

        const navBarTpl = NavBar.tpl(NEWS_TYPE)
        const listWrapperTpl = NewsList.wrapperTpl(82);
        oApp.innerHTML += (headerTpl+ navBarTpl + listWrapperTpl);
        // 获取dom 节点
        oListWrapper = oApp.querySelector('.news-list')
    }
    // 渲染列表数据
    function renderList (data) {
        const  { pageNum } = config;
        const newsListTal = NewsList.tpl({
            data,
            pageNum
        });
        MoreLoading.remove(oListWrapper);
        oListWrapper.innerHTML += newsListTal;
        config.isLoading = false;
        NewsList.imgShow();
    }

    async function setNewsList() {
        const { type, count, pageNum} = config;
     // 判断点击其他导航 的时候 启动预加载
        if (newsData[type]){
          renderList(newsData[type][pageNum]);
          return;
        }

        oListWrapper.innerHTML = PageLoading.tpl();
        newsData[type] = await service.getNewsList(type,count);
        setTimeout(() => {
            oListWrapper.innerHTML = '';
            renderList(newsData[type][pageNum]);
        }, 1500)
    }
    function setType (type) {
        config.type = type;
        config.pageNum = 0;
        config.isLoading = false;
        oListWrapper.innerHTML = '';
        setNewsList();
    }

    function getMoreList () {
        console.log('1');
        if (!config.isLoading) {
          config.pageNum ++;
          clearTimeout(t);
          const { pageNum, type } = config;
          if (pageNum >= newsData[type].length) {
            MoreLoading.add(oListWrapper, false);
          } else {
              config.isLoading = true;
              MoreLoading.add(oListWrapper, true);
              t = setTimeout(() => {
                  setNewsList();
              }, 1000)
          }
      }

      setTimeout(() => {
          config.isLoading = false
      },3000)
    }

    init()
})(document);