/*
 * @Author: Lienren
 * @Date: 2019-03-05 10:00:36
 * @Last Modified by: Lienren
 * @Last Modified time: 2019-03-05 10:02:57
 */
'use strict';

const jwt = require('jsonwebtoken');

export default {
  getTokenInfo(token) {
    let decoded = jwt.decode(token, { complete: true })
    return decoded
  }
};
