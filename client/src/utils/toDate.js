function toDate(num) {
    if (num) {
        num = parseInt(num)
        var date = new Date(num)
        return date.toLocaleString()
    }
    return ''
}
export default toDate;