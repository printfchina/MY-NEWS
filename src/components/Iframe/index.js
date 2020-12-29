import tpl from './index.tpl';
import { tplReplace } from '../../libs/utils';

export default{
    name: 'NewFrame',
    tpl(url) {
        return tplReplace(tpl, {
            url
        })
    }
}