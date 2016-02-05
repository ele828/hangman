// Util tools
export default {
    convertToArray(obj) {
        return Array.prototype.slice.apply(obj);
    },

    genRandStr(len) {
       len = len || 8;
    　　const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
    　　let maxPos = $chars.length;
    　　let str = '';
    　　for (let i = 0; i < len; i++) {
    　　　　str += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return str;
    },

    objectAssign(destObj, originObj) {
        if (Object.assign)
            Object.assign(destObj, originObj);
        else {
            for (let k in originObj) {
                destObj[k] = originObj[k];
            }
        }
    }

};
