import './imports';

import Header from '../components/Header';

;((doc) => {

    const oApp = doc.querySelector('#app');

    const init = () => {
        render();
    }

    function render () {
        const headerTpl = Header.tpl({
            url:'/',
            title:'新闻详情',
            showLeftIcon: true,
            showRightIcon: false
        });
        oApp.innerHTML += headerTpl;
    }
    init();

})(document)