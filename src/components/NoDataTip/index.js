import tpl  from './index.tpl'
import { tplReplace } from '../../libs/utils'


export default {
    name: 'NoDataTip',
    tpl() {
        return tplReplace(tpl,{
        text: '您还没有收藏新闻'
    })
  }
}