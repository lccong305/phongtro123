import moment from 'moment'

const formatDate = (timeObj) => {
    let day = timeObj.getDay() === 0 ? 'Chủ nhật' : `Thứ ${timeObj.getDay() + 1}`
    let date = `${timeObj.getDate()}/${timeObj.getMonth() +1 }/${timeObj.getFullYear()}`
    let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`
    return `${day}, ${time} ${date}`
}

const generateDate = () => {
    let today = new Date();
    let dateExpire = moment(today).add(7, 'd').toDate()
   return {
        today: formatDate(today),
        expireDay : formatDate(dateExpire)
   }
}

export default generateDate

