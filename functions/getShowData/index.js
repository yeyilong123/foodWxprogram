// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: "test-o4xhh"
})

const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  let showid=event.showid;
  let goodcount=event.goodcount;
  let isgood=event.isgood;

  try {
    return await db.collection('publish-list').doc(showid).update({
      // data 传入需要局部更新的数据
      data: {
        goodCount: goodcount,
        isGood: isgood
      }
    })
  } catch (e) {
    console.error(e)
  }
}