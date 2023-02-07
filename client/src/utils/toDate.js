function toDate(num) {
    if (num) {
        num = parseInt(num)
        var date = new Date(num * 1000)
        return date.toLocaleString()
    }
    return ''
}
export default toDate;