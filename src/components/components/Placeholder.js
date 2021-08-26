import React from 'react'
import { Skeleton } from '@material-ui/lab';
import PropTypes from "prop-types";

import { 
    Card, 
    CardHeader, 
    CardContent, 
    CardActions 
} from '@material-ui/core';

const CardPlaceholder = ({ classes }) => <Card className={classes.card||""}>
    <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        title={<Skeleton variant="text" />}
        subheader={<Skeleton variant="text" />}
    />
    <CardContent>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
    </CardContent>
    <CardActions className={classes.actions||""}>
        <Skeleton variant="rect" width={25} height={20} />
        <Skeleton variant="rect" width={25} height={20} />
    </CardActions>
</Card>

const Placeholder = ({ count, classes }) => {
    const elements = [];
    for (let c = 0; c < count; c++) {
        elements.push(<CardPlaceholder classes={classes} key={c}/>)
    }
    return (
        <div className={classes.list||""} {...{'data-testid':"placeholder"}}>
            { elements }
        </div>
    )
}

Placeholder.propTypes = {
    count: PropTypes.number.isRequired,
    classes: PropTypes.object,    
}

export default Placeholder