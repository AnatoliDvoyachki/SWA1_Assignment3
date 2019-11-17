const getDate5DaysAgo = () =>  {
    var dateOffset = (24 * 60 * 60 * 1000) * 5; // 5 days
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    return myDate
}

const getCurrentDate = () => new Date()

export{getDate5DaysAgo,getCurrentDate}