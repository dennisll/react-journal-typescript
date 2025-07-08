import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"


const list = [
    {
        id: 'string1',
        idUser: 'string',
        timeMorningIn: 'data de tipo number',
        timeMorningOut: 'data de tipo number',
        timeAfternoonIn: 'data de tipo number',
        timeAfternoonOut: 'data de tipo number',
        extraTime: 'data de tipo number'
    },
    {
        id: 'string2',
        idUser: 'string',
        timeMorningIn: 'data de tipo number',
        timeMorningOut: 'data de tipo number',
        timeAfternoonIn: 'data de tipo number',
        timeAfternoonOut: 'data de tipo number',
        extraTime: 'data de tipo number'
    },
    {
        id: 'string3',
        idUser: 'string',
        timeMorningIn: 'data de tipo number',
        timeMorningOut: 'data de tipo number',
        timeAfternoonIn: 'data de tipo number',
        timeAfternoonOut: 'data de tipo number',
        extraTime: 'data de tipo number'
    },
    {
        id: 'string4',
        idUser: 'string',
        timeMorningIn: 'data de tipo number',
        timeMorningOut: 'data de tipo number',
        timeAfternoonIn: 'data de tipo number',
        timeAfternoonOut: 'data de tipo number',
        extraTime: 'data de tipo number'
    }

]

export const ClientSearchView = () => {
  return (
    <Grid>
        { list.map( register => (
            <Grid key={register.id} container sx={{display: 'flex'}}>

               <Typography>{register.timeMorningIn}</Typography>
               <Typography>{register.timeMorningOut}</Typography>
               <Typography>{register.timeAfternoonIn}</Typography>
               <Typography>{register.timeAfternoonOut}</Typography>
               <Typography>{register.extraTime}</Typography>
            </Grid>
            
        ))}
    </Grid>
  )
}
