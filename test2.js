/**
 * @param {number} n
 * @return {number[]}
 */

// n = 1
// 0
// 1

// n=2
// 00
// 01
// 11
// 10

// n = 3
// 000  0
// 001  1
// 011  2
// 010  3
// 110  4
// 111  5
// 101  6
// 100  7
var grayCode = function(n) {

    function getGeLei(n){
        if (n === 1) {
            return ['0', '1']
        } else if (n > 1) {
            let prev = getGeLei(n-1)
            let result = []
            let cnt = Math.pow(2, n)
            for (var i=0; i<cnt; i++) {
                if (i >= cnt/2) {
                    break;
                }
                // console.log(i, prev)
                result[i] = '0'+prev[i]
                result[cnt-i-1] = '1'+prev[i]
                console.log(result)
            }
            return result
        }
        return [0]
    }
    let geLei = getGeLei(n), res = [];
    console.log(geLei)
    geLei.forEach((item) => {
        res.push(parseInt(item, 2))
    })
    return res
};
grayCode(3)