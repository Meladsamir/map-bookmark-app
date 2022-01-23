import moment from 'moment'
const DATETIME_FORMAT='DD/MM/yyyy, h:mm:ss a'

export const nowTime= ()=>moment().format(DATETIME_FORMAT)
export const getDurationByMill=(was) =>{  
     let now = moment(new Date()); //todays date
     let end = moment(was,DATETIME_FORMAT); // another date
     let duration = moment.duration(now.diff(end));
     const ms = duration.asMilliseconds();
return ms;
}