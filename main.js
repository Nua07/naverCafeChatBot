const io = require("socket.io-client")

const NID_AUT=""
const NID_SES=""
const channelNo=0
const userId=""

const token = `NID_AUT=${NID_AUT}; NID_SES=${NID_SES};`
const msgList = []

const socket = io(`https://talkwss.cafe.naver.com/chat`, {
    query: {
        "accessToken": token,
        "channelNo": channelNo,
        "userId": userId
    },
    transportOptions: {
        polling: {
            extraHeaders: {
                'Origin': 'https://talk.cafe.naver.com'
            }
        }
    }
})

socket.connect()

function sendText(socket, msg) {
    var msg=String(msg)
    socket.emit("send", { "tempId": 0, "message": msg, "messageTypeCode": 1, "sessionKey": token })
    msgList.push(msg)
}

socket.on("msg", (e) => {
    var msg = String(e.message.contents)
    if (msgList.indexOf(msg) != -1) {
        msgList.splice(msgList.indexOf(msg), 1)
        return
    }
    console.log(msg)
})
