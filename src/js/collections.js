import './imports';

import Header from '../components/Header'
import NewsList from '../components/NewsList'
import NoDataTip from '../components/NoDataTip'

;((doc) => {
    const oApp = doc.querySelector('#app');
    const followedList = JSON.parse(localStorage.getItem('followedList') || '[]')
    let oListWrapper = null;
    const init = () => {
        render();
        bindEvent();
    }

    function render () {
        const headerTpl = Header.tpl({
            url: '/',
            title: '我的新闻',
            showLeftIcon: true,
            showRightIcon: false
        });
        // 判断有收藏数 才显示
        if (followedList.length) {
            const listWrapperTpl = NewsList.wrapperTpl(44)
            oApp.innerHTML += (headerTpl + listWrapperTpl);
            oListWrapper = oApp.querySelector('.news-list');
            renderList(followedList);
        } else {
            oApp.innerHTML += (headerTpl + NoDataTip.tpl());
        }
    }
    function renderList (data) {
        const newsListTal = NewsList.tpl({
            data,
            pageNum: -1
        });
        oListWrapper.innerHTML += newsListTal;
        NewsList.imgShow();
    }
    function bindEvent () {
        followedList.length && NewsList.bindEvent(oListWrapper, setCurrentNews);
    }

    function setCurrentNews (options) {
        const { idx } = options;
        const currentNews = followedList[idx];
        localStorage.setItem('currentNews', JSON.stringify(currentNews));

    }
    init();
})(document)