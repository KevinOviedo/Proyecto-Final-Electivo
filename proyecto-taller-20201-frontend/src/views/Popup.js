import React, { useEffect} from 'react'
import { DialogContent, makeStyles} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    dialogWrapper:{ 
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    }
}))


export default function Popup(props){
    
    const {tittle, children, openPopup, setOpenPopup} = props;

    const classes = useStyles();
    
    return(
        <Dialog open={openPopup} maxWidth="md" classes={{paper:classes.dialogWrapper}}>
            <DialogTitle>
                <div>
                    <Typography variant="h6" component="div">
                        {tittle}
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )

}